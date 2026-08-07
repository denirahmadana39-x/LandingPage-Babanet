import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useTranslation } from 'react-i18next'
import { FiMaximize, FiMinimize, FiRotateCw, FiX } from 'react-icons/fi'
import { LabSceneProvider, useIntroRef, useHoverState } from './scene/state.jsx'
import LabWorld, { IntroDriver } from './scene/LabWorld'
import { usePrefersReducedMotion } from './useReducedMotion'
import styles from './ComputerLab.module.css'

/* Fullscreen modal preview of the 3D laboratory. Renders its own Canvas with
   smooth drei OrbitControls (rotate / pan / zoom, clamped so the room never
   flips upside-down) plus a small toolbar: reset view, browser fullscreen and
   close. ESC closes the preview (first exits browser fullscreen if active). */

const INTRO_DURATION = 1.2

function LabFullPreview({ open, onClose }) {
  const { t } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const coarse = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )[0]
  const intro = useIntroRef(open, reduced, INTRO_DURATION)
  const [introDone, setIntroDone] = useState(reduced)
  const { hover, setHover } = useHoverState()
  const boxRef = useRef(null)
  const controlsRef = useRef(null)
  const [isFs, setIsFs] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (document.fullscreenElement) document.exitFullscreen()
      else onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else boxRef.current?.requestFullscreen?.()
  }

  if (!open) return null

  return createPortal(
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-label={t('lab.fullPreview')}
    >
      <div className={styles.modalBox} ref={boxRef}>
        <LabSceneProvider intro={intro} hover={hover} setHover={setHover}>
          <Canvas
            dpr={[1, coarse ? 1.5 : 2]}
            shadows
            frameloop="always"
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            camera={{ position: [12, 9, 12], fov: 40, near: 0.1, far: 160 }}
          >
            {/* No <SoftShadows> here: it patches the global THREE.ShaderChunk,
                so a second instance would duplicate the PCSS GLSL block and
                break this canvas's shaders. We inherit the inline viewer's
                single-patched chunk, which gives soft shadows for free. */}
            <IntroDriver active={open} reduced={reduced} onDone={() => setIntroDone(true)} />
            <LabWorld coarse={coarse} introDone={introDone} />
            <OrbitControls
              ref={controlsRef}
              makeDefault
              target={[0, 1, 0]}
              enableDamping
              dampingFactor={0.08}
              minDistance={10}
              maxDistance={30}
              minPolarAngle={THREE.MathUtils.degToRad(20)}
              maxPolarAngle={THREE.MathUtils.degToRad(70)}
              enablePan
              panSpeed={0.6}
            />
          </Canvas>
        </LabSceneProvider>

        <div className={styles.modalBar}>
          <button
            type="button"
            className={styles.modalBtn}
            onClick={() => controlsRef.current?.reset()}
            aria-label={t('lab.resetView')}
          >
            <FiRotateCw />
          </button>
          <button
            type="button"
            className={styles.modalBtn}
            onClick={toggleFs}
            aria-label={t('lab.modal.fullscreen')}
          >
            {isFs ? <FiMinimize /> : <FiMaximize />}
          </button>
          <button
            type="button"
            className={styles.modalBtnClose}
            onClick={onClose}
            aria-label={t('lab.modal.exit')}
          >
            <FiX />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LabFullPreview
