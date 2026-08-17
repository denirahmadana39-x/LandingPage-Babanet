import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { useLabScene } from './state.jsx'
import LabRoom from './LabRoom'
import Workstation from './Workstation'
import StudentChairs from './Chair.jsx'
import Infrastructure from './Infrastructure'
import HoverOutline from './HoverOutline'
import LabTooltip from './Tooltip'
import { easeOutCubic } from './math'

/* Shared scene content for the lab — used by the inline viewer (LabCanvas).
   Everything reads the intro timeline + hover state from the nearest
   LabSceneProvider, so each Canvas gets its own independent wake-up
   choreography. */

/* Advances the shared intro timeline once the section is active */
export function IntroDriver({ active, reduced, onDone }) {
  const { intro } = useLabScene()
  useFrame((_, delta) => {
    if (!active || intro.current.done || reduced) return
    intro.current.t = Math.min(1, intro.current.t + delta / intro.current.duration)
    if (intro.current.t >= 1) {
      intro.current.done = true
      onDone()
    }
  })
  return null
}

/* Lighting — soft studio set: ambient + key + blue rim + gentle front fill. */
function Lights({ coarse }) {
  const { intro } = useLabScene()
  const ambient = useRef(null)
  const key = useRef(null)
  const rim = useRef(null)
  const fill = useRef(null)

  useFrame(() => {
    const et = easeOutCubic(intro.current.t)
    if (ambient.current) ambient.current.intensity = 0.85 * et
    if (key.current) key.current.intensity = 1.25 * et
    if (rim.current) rim.current.intensity = 0.55 * et
    if (fill.current) fill.current.intensity = 0.45 * et
  })

  const shadowSize = coarse ? 512 : 2048

  return (
    <>
      <ambientLight ref={ambient} intensity={0} />
      <directionalLight
        ref={key}
        position={[6, 11, 5]}
        intensity={0}
        castShadow
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-near={1}
        shadow-camera-far={32}
        shadow-bias={-0.0004}
      />
      <directionalLight ref={rim} position={[-9, 6, -8]} intensity={0} color="#3b82f6" />
      <directionalLight ref={fill} position={[-4, 4, 7]} intensity={0} color="#dbeafe" />
    </>
  )
}

function LabWorld({ coarse, introDone }) {
  return (
    <>
      <Lights coarse={coarse} />
      <LabRoom />
      <Workstation />
      <StudentChairs />
      <Infrastructure />
      <HoverOutline />
      <LabTooltip />
      {!coarse && (
        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={0.45}
          scale={20}
          blur={2.4}
          far={6}
          resolution={1024}
          color="#071e4e"
          frames={introDone ? 1 : Infinity}
        />
      )}
    </>
  )
}

export default LabWorld