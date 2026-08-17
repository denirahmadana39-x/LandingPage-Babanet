import { useCallback, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { easeInOutCubic } from './math'
import { RESET_DURATION_MS } from './camera'

const TARGET_LIMITS = {
  x: [-4.8, 4.8],
  y: [0.35, 2.1],
  z: [-4.2, 4.2],
}

/* Drives a smooth, eased camera reset. Exposes `resetRef.current()` so a
   button (or double-click) anywhere outside the Canvas can ease the camera
   back to the default angle instead of snapping.

   Because drei's OrbitControls derives its spherical state from the camera's
   current world position on every `update()`, animating the camera (and the
   controls target) each frame is safe — the controls simply follow along and
   keep their damping behaviour. */

function CameraController({ home, homeTarget, resetRef }) {
  const camera = useThree((s) => s.camera)
  const controls = useThree((s) => s.controls)
  const rafId = useRef(null)

  const startReset = useCallback(() => {
    if (!controls) return
    if (rafId.current) cancelAnimationFrame(rafId.current)

    const fromPos = camera.position.clone()
    const fromTarget = controls.target.clone()
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / RESET_DURATION_MS)
      const k = easeInOutCubic(t)
      camera.position.lerpVectors(fromPos, home, k)
      controls.target.lerpVectors(fromTarget, homeTarget, k)
      controls.update()
      rafId.current = t < 1 ? requestAnimationFrame(tick) : null
    }

    rafId.current = requestAnimationFrame(tick)
  }, [camera, controls, home, homeTarget])

  useEffect(() => {
    if (resetRef) resetRef.current = startReset
    const cancelReset = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    controls?.addEventListener('start', cancelReset)
    return () => {
      if (resetRef) resetRef.current = null
      if (rafId.current) cancelAnimationFrame(rafId.current)
      controls?.removeEventListener('start', cancelReset)
    }
  }, [controls, resetRef, startReset])

  /* Dev hook: expose the live camera so the automated interaction test can
     assert that rotate / zoom / pan / reset actually move the view. */
  useFrame(() => {
    if (controls) {
      controls.target.x = THREE.MathUtils.clamp(
        controls.target.x,
        TARGET_LIMITS.x[0],
        TARGET_LIMITS.x[1]
      )
      controls.target.y = THREE.MathUtils.clamp(
        controls.target.y,
        TARGET_LIMITS.y[0],
        TARGET_LIMITS.y[1]
      )
      controls.target.z = THREE.MathUtils.clamp(
        controls.target.z,
        TARGET_LIMITS.z[0],
        TARGET_LIMITS.z[1]
      )
    }

    if (!import.meta.env.DEV) return
    const c = camera.position
    const t = controls ? controls.target : null
    window.__labCam = {
      x: c.x,
      y: c.y,
      z: c.z,
      tx: t ? t.x : 0,
      ty: t ? t.y : 0,
      tz: t ? t.z : 0,
    }
  })

  return null
}

export default CameraController
