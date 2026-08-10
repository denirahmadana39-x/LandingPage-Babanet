import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useLabScene } from './state.jsx'
import { apLedMat, apMat, rackTrimMat, wifiMat } from './materials'

/* Ceiling-mounted Wi-Fi access points with animated signal arcs. Two units —
   one over the centre of the room, one over the back-left corner — so coverage
   reads as a planned deployment. */

function AccessPointUnit({ position, hovered, onHover, onClear, arcsRef }) {
  const boost = hovered ? 1 : 0

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * (1 + boost * 1.6)
    arcsRef.current.forEach((m, i) => {
      if (!m) return
      const phase = i * 2.1 + position[0]
      const s = 0.92 + 0.26 * Math.sin(t + phase)
      m.scale.setScalar(s)
    })
    apLedMat.emissiveIntensity =
      0.4 + 0.6 * Math.max(0, Math.sin(clock.getElapsedTime() * (2 + boost * 2)))
  })

  const arcRefs = (i) => (el) => {
    arcsRef.current[i] = el
  }

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover([position[0], 2.4, position[2]])
      }}
      onPointerOut={onClear}
    >
      <group position={position}>
        {/* mount rod up to the ceiling */}
        <mesh position={[0, 2.56, 0]} material={rackTrimMat}>
          <boxGeometry args={[0.06, 0.16, 0.06]} />
        </mesh>
        {/* dome */}
        <mesh position={[0, 2.47, 0]} material={apMat} castShadow>
          <cylinderGeometry args={[0.4, 0.44, 0.06, 28]} />
        </mesh>
        <mesh position={[0, 2.4, 0]} material={apLedMat}>
          <boxGeometry args={[0.05, 0.02, 0.05]} />
        </mesh>
        {/* animated wifi arcs */}
        <mesh
          ref={arcRefs(0)}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.34, 0]}
          material={wifiMat}
        >
          <ringGeometry args={[0.5, 0.6, 48, 1, 0, Math.PI * 1.5]} />
        </mesh>
        <mesh
          ref={arcRefs(1)}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.28, 0]}
          material={wifiMat}
        >
          <ringGeometry args={[0.8, 0.92, 48, 1, 0, Math.PI * 1.5]} />
        </mesh>
        <mesh
          ref={arcRefs(2)}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.22, 0]}
          material={wifiMat}
        >
          <ringGeometry args={[1.1, 1.22, 48, 1, 0, Math.PI * 1.5]} />
        </mesh>
      </group>
    </group>
  )
}

function AccessPoint() {
  const { setHover, hover } = useLabScene()
  const hovered = hover?.key === 'ap'
  const centerArcs = useRef([])
  const cornerArcs = useRef([])

  const clearHover = () => setHover(null)

  return (
    <group>
      <AccessPointUnit
        position={[0, 0, 0.6]}
        hovered={hovered}
        onHover={(p) => setHover('ap', p)}
        arcsRef={centerArcs}
        onClear={clearHover}
      />
      <AccessPointUnit
        position={[-2.6, 0, -3.4]}
        hovered={hovered}
        onHover={(p) => setHover('ap', p)}
        arcsRef={cornerArcs}
        onClear={clearHover}
      />
    </group>
  )
}

export default AccessPoint