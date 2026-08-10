import { useCallback, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import { clamp, easeOutCubic } from './math'

/* Custom smooth camera rig (OrbitControls-style):
   - rotate: one-finger drag on touch, left-drag on mouse. Free 360° orbit;
     the elevation stays clamped so the room never tips upside-down or sinks
     below the floor line.
   - zoom: mouse wheel or two-finger pinch (distance factor 0.55× – 1.9×)
   - pan: right-drag on desktop, two-finger drag on touch
   - reset: double-click, or an external `resetSignal` counter (reset button)
   - idle: damp back to the hero angle + a soft floating drift */

const TARGET = new THREE.Vector3(0, 1.0, 0.1)
const BASE_ELEV = THREE.MathUtils.degToRad(35)
const BASE_AZIM = THREE.MathUtils.degToRad(45)
const BASE_RADIUS = 17.5
const MIN_ELEV = THREE.MathUtils.degToRad(7)
const MAX_ELEV = Math.PI / 2 - THREE.MathUtils.degToRad(8)
const MAX_TILT = THREE.MathUtils.degToRad(25)
const MIN_DIST = 0.55
const MAX_DIST = 1.9
const MAX_PAN = 5
const IDLE_MS = 4000
const SNAP_BACK_SPIN = THREE.MathUtils.degToRad(60)
const DAMP = 4.2

const dir = new THREE.Vector3()
const targetPos = new THREE.Vector3()

function CameraRig({ reduced, resetSignal = 0 }) {
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
    pinch: 0,
    pinchMidX: 0,
    pinchMidY: 0,
    px: 0,
    py: 0,
    pxNorm: 0,
    pyNorm: 0,
  })
  const pointers = useRef(new Map())

  const resetState = useCallback(() => {
    const st = state.current
    st.yaw = 0
    st.pitch = 0
    st.dist = 1
    st.panX = 0
    st.panY = 0
    st.dragging = false
    st.panning = false
    st.pinch = 0
    pointers.current.clear()
    st.last = performance.now()
  }, [])

  /* External reset request (reset button): return to the hero angle and let
     the frame loop damp the camera smoothly back. */
  useEffect(() => {
    if (resetSignal > 0) {
      resetState()
      invalidate()
    }
  }, [resetSignal, resetState, invalidate])

  useEffect(() => {
    const el = gl.domElement
    const st = state.current
    st.last = performance.now()

    const onDown = (e) => {
      markInteracted()
      st.last = performance.now()
      st.px = e.clientX
      st.py = e.clientY
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pointers.current.size >= 2) {
        /* second finger lands → pinch-to-zoom + two-finger pan */
        const [a, b] = [...pointers.current.values()]
        st.pinch = Math.hypot(a.x - b.x, a.y - b.y)
        st.pinchMidX = (a.x + b.x) / 2
        st.pinchMidY = (a.y + b.y) / 2
        st.panning = true
        st.dragging = false
      } else if (e.button === 2) {
        st.panning = true
      } else {
        st.dragging = true
      }
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0) {
        st.pxNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1
        st.pyNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1
      }
      invalidate()

      const point = pointers.current.get(e.pointerId)
      if (point) {
        point.x = e.clientX
        point.y = e.clientY
      }

      if (pointers.current.size >= 2) {
        const [a, b] = [...pointers.current.values()]
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (st.pinch > 0 && dist > 0) {
          st.dist = clamp(st.dist * (dist / st.pinch), MIN_DIST, MAX_DIST)
        }
        st.pinch = dist
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        st.panX = clamp(st.panX + (mx - st.pinchMidX) * 0.012, -MAX_PAN, MAX_PAN)
        st.panY = clamp(st.panY - (my - st.pinchMidY) * 0.012, -MAX_PAN, MAX_PAN)
        st.pinchMidX = mx
        st.pinchMidY = my
        st.last = performance.now()
        return
      }

      if (st.panning) {
        st.panX = clamp(st.panX + (e.clientX - st.px) * 0.006, -MAX_PAN, MAX_PAN)
        st.panY = clamp(st.panY - (e.clientY - st.py) * 0.006, -MAX_PAN, MAX_PAN)
        st.px = e.clientX
        st.py = e.clientY
        st.last = performance.now()
        return
      }
      if (!st.dragging) return
      st.yaw += (e.clientX - st.px) * 0.004
      st.pitch = clamp(st.pitch - (e.clientY - st.py) * 0.004, -MAX_TILT, MAX_TILT)
      st.px = e.clientX
      st.py = e.clientY
      st.last = performance.now()
    }

    const onUp = (e) => {
      pointers.current.delete(e.pointerId)
      if (pointers.current.size >= 2) {
        const [a, b] = [...pointers.current.values()]
        st.pinch = Math.hypot(a.x - b.x, a.y - b.y)
        st.pinchMidX = (a.x + b.x) / 2
        st.pinchMidY = (a.y + b.y) / 2
        return
      }
      if (pointers.current.size === 1) {
        /* one finger remains → keep orbiting with it */
        const [p] = pointers.current.values()
        st.px = p.x
        st.py = p.y
        st.dragging = true
        st.panning = false
        return
      }
      st.dragging = false
      st.panning = false
    }

    const onWheel = (e) => {
      e.preventDefault()
      st.dist = clamp(st.dist + e.deltaY * 0.0013, MIN_DIST, MAX_DIST)
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
    window.addEventListener('pointercancel', onUp)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('dblclick', onDbl)
    el.addEventListener('contextmenu', onCtx)

    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
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
    const interacting = st.dragging || st.panning || pointers.current.size > 0

    /* Return to the hero angle after a quiet moment. Yaw only snaps back for
       small spins, so a deliberately rotated view stays where the user left
       it — the reset button always brings it home. */
    if (!interacting && !reduced) {
      const d = DAMP * (0.5 + idleF * 0.5)
      if (Math.abs(st.yaw) <= SNAP_BACK_SPIN) {
        st.yaw = THREE.MathUtils.damp(st.yaw, 0, d, delta)
      }
      st.pitch = THREE.MathUtils.damp(st.pitch, 0, d, delta)
      st.dist = THREE.MathUtils.damp(st.dist, 1, d, delta)
      st.panX = THREE.MathUtils.damp(st.panX, 0, d * 0.6, delta)
      st.panY = THREE.MathUtils.damp(st.panY, 0, d * 0.6, delta)
    }

    const et = reduced ? 1 : easeOutCubic(intro.current.t)
    const radius = BASE_RADIUS * st.dist * (1.35 - 0.35 * et)

    let elev = clamp(BASE_ELEV + st.pitch, MIN_ELEV, MAX_ELEV)
    let azim = BASE_AZIM + st.yaw

    /* Subtle hover parallax + soft floating once the camera is resting */
    if (!interacting && !reduced) {
      if (idleF > 0.2) {
        const f = (idleF - 0.2) / 0.8
        elev -= st.pyNorm * 0.016 * f
        azim += st.pxNorm * 0.024 * f
      }
      if (idleF > 0.6) {
        const f = (idleF - 0.6) / 0.4
        elev += 0.004 * Math.sin(t * 0.35) * f
        azim += 0.006 * Math.sin(t * 0.22 + 1.3) * f
      }
    }

    elev = clamp(elev, MIN_ELEV, MAX_ELEV)
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