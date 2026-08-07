import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { SoftShadows } from '@react-three/drei'
import { LabSceneProvider, useIntroRef, useHoverState } from './scene/state.jsx'
import CameraRig from './scene/CameraRig'
import LabWorld, { IntroDriver } from './scene/LabWorld'
import { usePrefersReducedMotion } from './useReducedMotion'
import styles from './ComputerLab.module.css'

/* Entrance choreography duration — the room "wakes up" in ~1.2s */
const INTRO_DURATION = 1.2

/* On small touch screens the scene renders once, then freezes into a static
   diorama with light parallax (see CameraRig invalidate on pointer move). */
function FrameloopGate({ mobile, introDone }) {
  const set = useThree((s) => s.set)
  useEffect(() => {
    if (mobile && introDone) set({ frameloop: 'demand' })
  }, [mobile, introDone, set])
  return null
}

/* The inline viewer. Exposes `apiRef.current.reset()` so the section's Reset
   View button can snap the camera home from outside the Canvas. */
function LabCanvas({ active, apiRef }) {
  const reduced = usePrefersReducedMotion()
  const [introDone, setIntroDone] = useState(reduced)
  const coarse = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )[0]
  const mobile = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(pointer: coarse)').matches &&
      window.matchMedia('(max-width: 767px)').matches
    )
  })[0]
  const intro = useIntroRef(active, reduced, INTRO_DURATION)
  const { hover, setHover } = useHoverState()
  const resetViewRef = useRef(null)

  useEffect(() => {
    if (apiRef) apiRef.current = { reset: () => resetViewRef.current?.() }
    return () => {
      if (apiRef) apiRef.current = null
    }
  }, [apiRef])

  return (
    <div className={styles.scene}>
      <LabSceneProvider intro={intro} hover={hover} setHover={setHover}>
        <Canvas
          dpr={[1, coarse ? 1.5 : 2]}
          shadows
          frameloop="always"
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [9, 7, 11], fov: 35, near: 0.1, far: 120 }}
        >
          {!coarse && <SoftShadows size={32} samples={10} focus={0.6} />}
          <IntroDriver active={active} reduced={reduced} onDone={() => setIntroDone(true)} />
          <LabWorld coarse={coarse} introDone={introDone} />
          <CameraRig reduced={reduced} resetRef={resetViewRef} />
          <FrameloopGate mobile={mobile} introDone={introDone} />
        </Canvas>
      </LabSceneProvider>
    </div>
  )
}

export default LabCanvas
