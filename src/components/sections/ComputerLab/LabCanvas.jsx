import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { SoftShadows } from '@react-three/drei'
import { useTranslation } from 'react-i18next'
import { LabSceneProvider, useIntroRef, useHoverState } from './scene/state.jsx'
import CameraRig from './scene/CameraRig'
import LabWorld, { IntroDriver } from './scene/LabWorld'
import { usePrefersReducedMotion } from './useReducedMotion'
import LabControls from './LabControls'
import styles from './ComputerLab.module.css'

/* Entrance choreography duration — the room "wakes up" in ~1.2s */
const INTRO_DURATION = 1.2

/* The inline viewer. The scene runs on an always-on frameloop so orbit,
   zoom and pan stay smooth and responsive on mouse and touch alike. */
function LabCanvas({ active }) {
  const { t } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const [introDone, setIntroDone] = useState(reduced)
  const [resetSignal, setResetSignal] = useState(0)
  const coarse = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )[0]
  const intro = useIntroRef(active, reduced, INTRO_DURATION)
  const { hover, setHover, markInteracted } = useHoverState()

  return (
    <div className={styles.scene}>
      <LabSceneProvider intro={intro} hover={hover} setHover={setHover} markInteracted={markInteracted}>
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
          <CameraRig reduced={reduced} resetSignal={resetSignal} />
        </Canvas>
      </LabSceneProvider>
      <LabControls onReset={() => setResetSignal((s) => s + 1)} />
      <p className={styles.viewerHint} aria-hidden="true">
        {t('lab.scene.hint')}
      </p>
    </div>
  )
}

export default LabCanvas