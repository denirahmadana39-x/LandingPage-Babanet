import { useCallback, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import { clamp, easeOutCubic } from './math'

/* Custom smooth camera rig (OrbitControls-style):
   - rotate: drag (clamped to ±20° so the room never tips upside-down)
   - zoom: wheel (distance factor 1× – 1.5×)
   - pan: right-drag, gently clamped
   - reset: double-click or the exposed resetRef callback
   - idle: damp back to the hero angle + a soft floating drift
   The rig exposes `resetRef.current()` so the section's Reset View button can
   snap the camera home without reaching into the Canvas. */

const TARGET = new THREE.Vector3(0, 1.0, 0.1)
const BASE_ELEV = THREE.MathUtils.degToRad(35)
const BASE_AZIM = THREE.MathUtils.degToRad(45)
const BASE_RADIUS = 17.5
const MAX_TILT = THREE.MathUtils.degToRad(20)
const MIN_DIST = 1.0
const MAX_DIST = 1.5
const MAX_PAN = 2.5
const IDLE_MS = 4000
const DAMP = 4.2

const dir = new THREE.Vector3()
const targetPos = new THREE.Vector3()

function CameraRig({ reduced, resetRef }) {
  const { intro, markInteracted } = useLabScene()
  const camera = useThree((s) => s.camera)
  const gl = useThree((s) => s.gl)
  const invalidate = useThree((s) => s.invalidate)

  const state = useRef({
    yaw: 0,
    pitch: 0,
    dist: 1,
    panX: 0,
    panY: 0,
    last: 0,
    dragging: false,
    panning: false,
    px: 0,
    py: 0,
    ppx: 0,
    ppy: 0,
    pxNorm: 0,
    pyNorm: 0,
  })

  const resetState = useCallback(() => {
    const st = state.current
    st.yaw = 0
    st.pitch = 0
    st.dist = 1
    st.panX = 0
    st.panY = 0
    st.dragging = false
    st.panning = false
    st.last = performance.now()
  }, [])

  useEffect(() => {
    if (resetRef) resetRef.current = resetState
    return () => {
      if (resetRef) resetRef.current = null
    }
  }, [resetRef, resetState])

  useEffect(() => {
    const el = gl.domElement
    const st = state.current
    st.last = performance.now()

    const onDown = (e) => {
      markInteracted()
      st.last = performance.now()
      if (e.button === 2) {
        st.panning = true
        st.ppx = e.clientX
        st.ppy = e.clientY
      } else {
        st.dragging = true
        st.px = e.clientX
        st.py = e.clientY
      }
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0) {
        st.pxNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1
        st.pyNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1
      }
      /* In frameloop="demand" (mobile static render) the parallax still moves
         the camera, but only one frame is drawn per pointer move. */
      invalidate()

      if (st.panning) {
        st.panX = clamp(st.panX + (e.clientX - st.ppx) * 0.006, -MAX_PAN, MAX_PAN)
        st.panY = clamp(st.panY - (e.clientY - st.ppy) * 0.006, -MAX_PAN, MAX_PAN)
        st.ppx = e.clientX
        st.ppy = e.clientY
        st.last = performance.now()
        return
      }
      if (!st.dragging) return
      st.yaw = clamp(st.yaw + (e.clientX - st.px) * 0.004, -MAX_TILT, MAX_TILT)
      st.pitch = clamp(st.pitch - (e.clientY - st.py) * 0.004, -MAX_TILT, MAX_TILT)
      st.px = e.clientX
      st.py = e.clientY
      st.last = performance.now()
    }

    const onUp = () => {
      st.dragging = false
      st.panning = false
    }

    const onWheel = (e) => {
      e.preventDefault()
      st.dist = clamp(st.dist + e.deltaY * 0.0012, MIN_DIST, MAX_DIST)
      st.last = performance.now()
      markInteracted()
    }

    const onDbl = (e) => {
      e.preventDefault()
      resetState()
      markInteracted()
    }

    const onCtx = (e) => e.preventDefault()

    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('dblclick', onDbl)
    el.addEventListener('contextmenu', onCtx)

    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('dblclick', onDbl)
      el.removeEventListener('contextmenu', onCtx)
    }
  }, [gl, markInteracted, invalidate, resetState, reduced])

  useFrame(({ clock }, delta) => {
    const st = state.current
    const t = clock.getElapsedTime()
    const now = performance.now()
    const idleF = clamp((now - st.last) / IDLE_MS, 0, 1)

    /* Return to the hero angle after a quiet moment */
    if (!st.dragging && !st.panning && !reduced) {
      const d = DAMP * (0.5 + idleF * 0.5)
      st.yaw = THREE.MathUtils.damp(st.yaw, 0, d, delta)
      st.pitch = THREE.MathUtils.damp(st.pitch, 0, d, delta)
      st.dist = THREE.MathUtils.damp(st.dist, 1, d, delta)
      st.panX = THREE.MathUtils.damp(st.panX, 0, d * 0.6, delta)
      st.panY = THREE.MathUtils.damp(st.panY, 0, d * 0.6, delta)
    }

    const et = reduced ? 1 : easeOutCubic(intro.current.t)
    const radius = BASE_RADIUS * st.dist * (1.35 - 0.35 * et)

    let elev = BASE_ELEV + st.pitch - st.pyNorm * 0.016
    let azim = BASE_AZIM + st.yaw + st.pxNorm * 0.024

    /* Soft floating animation once the camera is resting */
    if (!reduced && idleF > 0.6) {
      const f = (idleF - 0.6) / 0.4
      elev += 0.004 * Math.sin(t * 0.35) * f
      azim += 0.006 * Math.sin(t * 0.22 + 1.3) * f
    }

    dir.set(Math.cos(elev) * Math.sin(azim), Math.sin(elev), Math.cos(elev) * Math.cos(azim))
    targetPos.set(TARGET.x + st.panX, TARGET.y, TARGET.z + st.panY)

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetPos.x + dir.x * radius,
      DAMP,
      delta
    )
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetPos.y + dir.y * radius,
      DAMP,
      delta
    )
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetPos.z + dir.z * radius,
      DAMP,
      delta
    )
    camera.lookAt(targetPos)
  })

  return null
}

export default CameraRig
