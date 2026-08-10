import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import { chairLegMat, chairSeatMat } from './materials'
import { clamp, easeOutCubic } from './math'
import { CHAIR_W, CHAIR_Z_OFFSET, WORKSTATION_COUNT, WORKSTATIONS } from './layout.js'

/* Student chair — school style: four steel legs, flat seat, slim backrest.
   Rendered as instanced meshes (one draw call per part for all 24 chairs).
   0.42m wide × 0.42m deep, which is the generic class-room chair footprint,
   so every workstation keeps a realistic seat clearance. */

const SEAT_W = CHAIR_W
const SEAT_D = CHAIR_W
const SEAT_H = 0.06
const SEAT_Y = 0.46
const LEG_H = SEAT_Y - 0.02
const BACK_H = 0.34
const BACK_Y = SEAT_Y + BACK_H / 2 + 0.02

/* Local part definitions relative to the chair floor point (centred seat) */
const PARTS = [
  { mesh: 'seat', mat: chairSeatMat, pos: [0, SEAT_Y, 0], size: [SEAT_W, SEAT_H, SEAT_D] },
  { mesh: 'back', mat: chairSeatMat, pos: [0, BACK_Y, -SEAT_D / 2 + 0.02], size: [SEAT_W * 0.9, BACK_H, 0.035] },
  { mesh: 'leg1', mat: chairLegMat, pos: [-SEAT_W / 2 + 0.05, LEG_H / 2, SEAT_D / 2 - 0.05], size: [0.035, LEG_H, 0.035] },
  { mesh: 'leg2', mat: chairLegMat, pos: [SEAT_W / 2 - 0.05, LEG_H / 2, SEAT_D / 2 - 0.05], size: [0.035, LEG_H, 0.035] },
  { mesh: 'leg3', mat: chairLegMat, pos: [-SEAT_W / 2 + 0.05, LEG_H / 2, -SEAT_D / 2 + 0.05], size: [0.035, LEG_H, 0.035] },
  { mesh: 'leg4', mat: chairLegMat, pos: [SEAT_W / 2 - 0.05, LEG_H / 2, -SEAT_D / 2 + 0.05], size: [0.035, LEG_H, 0.035] },
  { mesh: 'foot', mat: chairLegMat, pos: [0, 0.05, 0], size: [0.3, 0.03, 0.1] },
]

export const CHAIR_SCALE = 1

/* Instanced student chairs — one chair per workstation, tucked under the desk */
function StudentChairs() {
  const { intro } = useLabScene()
  const refs = useRef({})
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const setMeshRef = (key) => (el) => {
    refs.current[key] = el
  }

  const revealScale = (i, t) =>
    easeOutCubic(clamp((t - i * 0.015 - 0.16) / 0.5, 0, 1))

  useFrame(() => {
    const t = intro.current.t
    const done = intro.current.done
    if (done) return
    for (const part of PARTS) {
      const mesh = refs.current[part.mesh]
      if (!mesh) continue
      const [lx, ly, lz] = part.pos
      for (let i = 0; i < WORKSTATION_COUNT; i++) {
        const s = revealScale(i, t)
        const { x, z } = WORKSTATIONS[i]
        dummy.position.set(x + lx * s, ly * s, z + CHAIR_Z_OFFSET + lz * s)
        dummy.scale.setScalar(Math.max(s, 0.0001))
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group>
      {PARTS.map((part) => (
        <instancedMesh
          key={part.mesh}
          ref={setMeshRef(part.mesh)}
          args={[undefined, undefined, WORKSTATION_COUNT]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={part.size} />
          <primitive object={part.mat} attach="material" />
        </instancedMesh>
      ))}
    </group>
  )
}

/* Single non-instanced chair (teacher area, meeting corner) */
function Chair({ position = [0, 0, 0], rotationY = 0, scale = 1 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {PARTS.map((part) => (
        <mesh key={part.mesh} position={part.pos} material={part.mat} castShadow receiveShadow>
          <boxGeometry args={part.size} />
        </mesh>
      ))}
    </group>
  )
}

export default StudentChairs
export { Chair }