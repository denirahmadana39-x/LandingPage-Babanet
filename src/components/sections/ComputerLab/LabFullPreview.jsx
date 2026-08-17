import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useTranslation } from 'react-i18next'
import { FiMaximize, FiMinimize, FiRotateCw, FiX } from 'react-icons/fi'
import clsx from 'clsx'
import { LabSceneProvider, useIntroRef, useHoverState } from './scene/state.jsx'
import LabWorld, { IntroDriver } from './scene/LabWorld'
import CameraController from './scene/CameraController'
import { defaultCamera, ORBIT } from './scene/camera'
import { usePrefersReducedMotion } from './useReducedMotion'
import styles from './ComputerLab.module.css'

/* Fullscreen modal preview of the 3D laboratory. Renders its own Canvas with
   the same drei OrbitControls (rotate / zoom / pan / touch / damping) plus a
   small toolbar: reset view, browser fullscreen and close. ESC closes the
   preview (first exits browser fullscreen if active). */

const INTRO_DURATION = 1.2

/* The modal's Canvas unmounts whenever the preview closes, so every piece of
   per-open scene state (hover cursor/tooltip, intro-done flag) must live
   inside this component tree — mounting inside the Canvas means it resets
   naturally on every open. */
function PreviewScene({ intro, reduced, coarse }) {
  const { hover, setHover } = useHoverState()
  const [introDone, setIntroDone] = useState(reduced)

  return (
    <LabSceneProvider intro={intro} hover={hover} setHover={setHover}>
      <IntroDriver active reduced={reduced} onDone={() => setIntroDone(true)} />
      <LabWorld coarse={coarse} introDone={introDone} />
    </LabSceneProvider>
  )
}

function LabFullPreview({ open, onClose }) {
  const { t } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const coarse = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )[0]
  const [cam] = useState(() =>
    defaultCamera(typeof window !== 'undefined' ? window.innerWidth : 1440)
  )
  const intro = useIntroRef(open, reduced, INTRO_DURATION)
  const boxRef = useRef(null)
  const closeRef = useRef(null)
  const resetRef = useRef(null)
  const [isFs, setIsFs] = useState(false)

  useEffect(() => {
    if (!open) return
    const root = document.getElementById('root')
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    const rootWasInert = root?.inert ?? false

    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
        else onClose()
        return
      }

      if (e.key !== 'Tab') return
      const buttons = boxRef.current?.querySelectorAll('button:not([disabled])')
      if (!buttons?.length) return
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    if (root) root.inert = true
    const focusId = requestAnimationFrame(() => closeRef.current?.focus())

    return () => {
      cancelAnimationFrame(focusId)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (root) root.inert = rootWasInert
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const toggleFs = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await boxRef.current?.requestFullscreen?.()
    } catch {
      setIsFs(false)
    }
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
        <Canvas
          shadows
          dpr={[1, coarse ? 1.5 : 2]}
          frameloop="always"
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: cam.position, fov: cam.fov, near: 0.1, far: 200 }}
        >
          <PreviewScene intro={intro} reduced={reduced} coarse={coarse} />

          <OrbitControls
            makeDefault
            target={cam.target}
            enableDamping
            dampingFactor={ORBIT.dampingFactor}
            enableRotate
            enableZoom
            enablePan
            minDistance={ORBIT.minDistance}
            maxDistance={ORBIT.maxDistance}
            minPolarAngle={ORBIT.minPolarAngle}
            maxPolarAngle={ORBIT.maxPolarAngle}
            rotateSpeed={ORBIT.rotateSpeed}
            zoomSpeed={ORBIT.zoomSpeed}
            panSpeed={ORBIT.panSpeed}
            touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
          />
          <CameraController resetRef={resetRef} home={cam.position} homeTarget={cam.target} />
        </Canvas>

        <div className={styles.modalBar}>
          <button
            type="button"
            className={styles.modalBtn}
            onClick={() => resetRef.current?.()}
            aria-label={t('lab.resetView')}
          >
            <FiRotateCw aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.modalBtn}
            onClick={toggleFs}
            aria-label={t('lab.modal.fullscreen')}
          >
            {isFs ? <FiMinimize aria-hidden="true" /> : <FiMaximize aria-hidden="true" />}
          </button>
          <button
            type="button"
            ref={closeRef}
            className={clsx(styles.modalBtn, styles.modalBtnClose)}
            onClick={onClose}
            aria-label={t('lab.modal.exit')}
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LabFullPreview
