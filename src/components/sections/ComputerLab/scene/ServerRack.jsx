import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import { rackMat, rackTrimMat, switchMat } from './materials'
import { RACK_POS } from './layout.js'

/* 15U server rack tucked into the back-right corner with a managed switch
   mounted on top. Front faces the room (+z). LEDs blink in their own phases
   and speed up slightly on hover; a faint blue glow lights the corner. */

function Led({ position, color, size = [0.05, 0.05, 0.02], speed = 3, phase = 0, boost }) {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.35,
      }),
    [color]
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const s = speed * (boost ? 3.2 : 1)
    const v = Math.max(0, Math.sin(t * s + phase))
    mat.emissiveIntensity = 0.12 + (0.55 + boost * 0.9) * v
  })

  return (
    <mesh position={position} material={mat}>
      <boxGeometry args={size} />
    </mesh>
  )
}

function ServerRack({ hovered }) {
  const { setHover } = useLabScene()
  const glow = useRef(null)

  useFrame((_, delta) => {
    if (glow.current) {
      glow.current.intensity = THREE.MathUtils.damp(glow.current.intensity, hovered ? 1.0 : 0, 6, delta)
    }
  })

  const ledColor = hovered ? 0x60a5fa : 0x2563eb

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover('server', [RACK_POS[0], 0.9, RACK_POS[2]])
      }}
      onPointerOut={() => setHover(null)}
    >
      <group position={RACK_POS}>
        {/* cabinet */}
        <mesh position={[0, 0.92, 0]} material={rackMat} castShadow receiveShadow>
          <boxGeometry args={[0.62, 1.84, 0.5]} />
        </mesh>
        {/* top / bottom trims */}
        <mesh position={[0, 1.86, 0]} material={rackTrimMat}>
          <boxGeometry args={[0.66, 0.04, 0.54]} />
        </mesh>
        <mesh position={[0, 0.02, 0]} material={rackTrimMat}>
          <boxGeometry args={[0.66, 0.04, 0.54]} />
        </mesh>
        {/* front face frame */}
        <mesh position={[0, 0.92, 0.26]} material={rackTrimMat}>
          <boxGeometry args={[0.6, 1.8, 0.04]} />
        </mesh>
        {/* front vent panel with LED strip */}
        <mesh position={[0, 0.86, 0.285]} material={rackTrimMat}>
          <boxGeometry args={[0.5, 0.6, 0.02]} />
        </mesh>
        <Led position={[0.19, 0.99, 0.3]} color={ledColor} speed={2.2} phase={0} boost={hovered} />
        <Led position={[0.05, 0.99, 0.3]} color={ledColor} speed={2.2} phase={2.4} boost={hovered} />
        <Led position={[-0.09, 0.99, 0.3]} color={0x22c55e} speed={1.6} phase={4.1} boost={hovered} />
        {/* power strip LEDs */}
        <Led position={[0.19, 0.35, 0.3]} color={0x22c55e} speed={1.9} phase={1.2} />
        <Led position={[0.05, 0.35, 0.3]} color={0x22c55e} speed={1.9} phase={3.3} />
        {/* managed switch on top — its own hover hotspot */}
        <group
          onPointerOver={(e) => {
            e.stopPropagation()
            setHover('switch', [RACK_POS[0], 2.0, RACK_POS[2]])
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            setHover(null)
          }}
        >
          <mesh position={[0, 1.95, 0]} material={switchMat} castShadow>
            <boxGeometry args={[0.55, 0.07, 0.4]} />
          </mesh>
          <mesh position={[0, 1.99, 0]} material={rackTrimMat}>
            <boxGeometry args={[0.59, 0.02, 0.44]} />
          </mesh>
          <Led position={[0.25, 1.95, -0.14]} color={0x22c55e} speed={2.6} phase={0} size={[0.04, 0.02, 0.04]} boost={hovered} />
          <Led position={[0.25, 1.95, -0.06]} color={0x22c55e} speed={2.6} phase={1.9} size={[0.04, 0.02, 0.04]} boost={hovered} />
          <Led position={[0.25, 1.95, 0.02]} color={0x22c55e} speed={2.6} phase={3.1} size={[0.04, 0.02, 0.04]} boost={hovered} />
          <Led position={[0.25, 1.95, 0.1]} color={0xf2a93b} speed={2.6} phase={0.8} size={[0.04, 0.02, 0.04]} boost={hovered} />
        </group>
        {/* patch cables dropping from the switch to the wall conduit */}
        <mesh position={[-0.2, 1.6, 0.27]} material={switchMat}>
          <boxGeometry args={[0.018, 0.75, 0.018]} />
        </mesh>
        <mesh position={[-0.24, 1.6, 0.25]} material={switchMat}>
          <boxGeometry args={[0.018, 0.75, 0.018]} />
        </mesh>
        {/* blue glow filling the corner when hovered */}
        <pointLight
          ref={glow}
          position={[0, 1.0, 0.6]}
          intensity={0}
          color={0x60a5fa}
          distance={4}
          decay={2}
        />
      </group>
    </group>
  )
}

export default ServerRack
export { Led }