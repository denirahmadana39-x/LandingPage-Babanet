import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { LabSceneProvider, useIntroRef, useHoverState } from './scene/state.jsx'
import LabWorld, { IntroDriver } from './scene/LabWorld'
import CameraController from './scene/CameraController'
import { ORBIT, defaultCamera } from './scene/camera'
import { usePrefersReducedMotion } from './useReducedMotion'
import styles from './ComputerLab.module.css'

/* Entrance choreography duration — the room "wakes up" in ~1.2s */
const INTRO_DURATION = 1.2

/* The inline viewer: a single R3F Canvas with drei OrbitControls attached
   directly inside it (rotate / zoom / pan / touch / damping), a shared scene
   (see LabWorld) and a CameraController for the eased reset. Exposes
   `apiRef.current.reset()` so the section's Reset button can re-frame from
   outside the Canvas. */
function LabCanvas({ active, apiRef }) {
  const reduced = usePrefersReducedMotion()
  const [introDone, setIntroDone] = useState(reduced)
  const coarse = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )[0]
  const intro = useIntroRef(active, reduced, INTRO_DURATION)
  const { hover, setHover } = useHoverState()
  const resetFuncRef = useRef(null)

  useEffect(() => {
    if (apiRef) apiRef.current = { reset: () => resetFuncRef.current?.() }
    return () => {
      if (apiRef) apiRef.current = null
    }
  }, [apiRef])

  const cam = defaultCamera(typeof window !== 'undefined' ? window.innerWidth : 1440)

  return (
    <div className={styles.scene}>
      <LabSceneProvider intro={intro} hover={hover} setHover={setHover}>
        <Canvas
          shadows
          frameloop="always"
          dpr={[1, coarse ? 1.5 : 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: cam.position, fov: cam.fov, near: 0.1, far: 200 }}
        >
          <IntroDriver active={active} reduced={reduced} onDone={() => setIntroDone(true)} />
          <LabWorld coarse={coarse} introDone={introDone} />

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
          <CameraController resetRef={resetFuncRef} home={cam.position} homeTarget={cam.target} />
        </Canvas>
      </LabSceneProvider>
    </div>
  )
}

export default LabCanvas