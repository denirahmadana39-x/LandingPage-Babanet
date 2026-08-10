import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'

/* Soft blue selection outline rendered around whichever object is hovered.
   Each hotspot key maps to a box size + center height; the outline breathes
   gently so it feels alive. The server gets a hotter cyan tint. */

const OUTLINES = {
  computer: { size: [1.1, 1.5, 1.05], y: 0.8, color: 0x3b82f6 },
  server: { size: [0.78, 2.05, 0.66], y: 0.97, color: 0x60a5fa },
  teacher: { size: [2.4, 1.6, 1.2], y: 0.8, color: 0x3b82f6 },
  ap: { size: [0.95, 0.2, 0.95], y: 2.55, color: 0x3b82f6 },
  switch: { size: [0.7, 0.22, 0.55], y: 1.99, color: 0x3b82f6 },
  projector: { size: [0.7, 0.35, 0.7], y: 2.5, color: 0x3b82f6 },
  display: { size: [1.15, 0.75, 0.25], y: 1.65, color: 0x3b82f6 },
}

const OUTLINE_GEO = Object.entries(OUTLINES).reduce((acc, [key, { size }]) => {
  acc[key] = new THREE.EdgesGeometry(new THREE.BoxGeometry(...size))
  return acc
}, {})

function HoverOutline() {
  const { hover } = useLabScene()
  const matRef = useRef(null)

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const t = clock.getElapsedTime()
    matRef.current.opacity = 0.72 + 0.16 * Math.sin(t * 3.2)
  })

  const spec = useMemo(() => {
    if (!hover) return null
    const s = OUTLINES[hover.key]
    if (!s) return null
    return {
      geometry: OUTLINE_GEO[hover.key],
      position: [hover.position[0], s.y, hover.position[2]],
      color: s.color,
    }
  }, [hover])

  if (!spec) return null

  return (
    <lineSegments geometry={spec.geometry} position={spec.position}>
      <lineBasicMaterial ref={matRef} color={spec.color} transparent opacity={0.85} />
    </lineSegments>
  )
}

export default HoverOutline
