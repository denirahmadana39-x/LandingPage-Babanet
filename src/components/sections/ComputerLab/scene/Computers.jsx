import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import { clamp, easeOutCubic } from './math'
import {
  activityLedMat,
  deskMat,
  deskPedestalMat,
  monitorBezelMat,
  screenMat,
  towerLedMat,
  towerMat,
} from './materials'

/* 24 student workstations — 6 columns × 4 rows with a wide centre aisle so
   the layout reads like a real computer laboratory (walking lanes between
   rows, room to move at the back of each desk). Monitors face the front of
   the room (+z). Each workstation is a bundle of instanced meshes (wood desk
   top + metal legs, matte-black monitor, tower + LEDs). The entrance
   choreography grows every workstation up from its floor point, staggered so
   the classroom "wakes up" row by row from the front. */

const COLS = [-4.2, -3.05, -1.9, 1.9, 3.05, 4.2]
const ROWS = [3.95, 1.8, -0.45, -2.7] /* front rows first for the reveal */
const COUNT = COLS.length * ROWS.length

const STAGGER = 0.02
const REVEAL_DUR = 0.5

/* Local part offsets/sizes relative to the workstation floor point */
const PARTS = [
  { mesh: 'deskTop', mat: deskMat, pos: [0, 0.75, 0], size: [0.85, 0.05, 0.8] },
  { mesh: 'legL', mat: deskPedestalMat, pos: [-0.38, 0.375, 0], size: [0.05, 0.75, 0.72] },
  { mesh: 'legR', mat: deskPedestalMat, pos: [0.38, 0.375, 0], size: [0.05, 0.75, 0.72] },
  { mesh: 'beam', mat: deskPedestalMat, pos: [0, 0.14, 0], size: [0.7, 0.05, 0.5] },
  { mesh: 'bezel', mat: monitorBezelMat, pos: [0, 1.22, 0.17], size: [0.64, 0.42, 0.06] },
  { mesh: 'screen', mat: screenMat, pos: [0, 1.22, 0.185], size: [0.6, 0.38, 0.03] },
  { mesh: 'standCol', mat: deskPedestalMat, pos: [0, 0.89, 0.1], size: [0.06, 0.28, 0.06] },
  { mesh: 'standBase', mat: deskMat, pos: [0, 0.79, 0.08], size: [0.3, 0.03, 0.18] },
  { mesh: 'tower', mat: towerMat, pos: [0, 0.42, -0.15], size: [0.3, 0.42, 0.4] },
  { mesh: 'towerLed', mat: towerLedMat, pos: [-0.16, 0.5, 0.055], size: [0.26, 0.05, 0.02] },
  { mesh: 'activity', mat: activityLedMat, pos: [0.22, 0.78, 0.28], size: [0.04, 0.015, 0.04] },
]

const WORKSTATIONS = []
for (const z of ROWS) {
  for (const x of COLS) {
    WORKSTATIONS.push({ x, z })
  }
}

function Computers() {
  const { intro, setHover } = useLabScene()
  const refs = useRef({})
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const lastHover = useRef(null)

  const setMeshRef = (key) => (el) => {
    refs.current[key] = el
  }

  const revealScale = (i, t) => easeOutCubic(clamp((t - i * STAGGER) / REVEAL_DUR, 0, 1))

  /* Hover lives on the wrapping group: pointerover/pointermove bubble up from
     whichever part is hit, and pointerout only fires when leaving all parts.
     The instance guard avoids re-rendering on every pointer move. */
  const handleOver = (e) => {
    if (e.instanceId === undefined) return
    if (lastHover.current === e.instanceId) return
    lastHover.current = e.instanceId
    const { x, z } = WORKSTATIONS[e.instanceId]
    setHover('computer', [x, 0.8, z])
  }

  const handleOut = () => {
    lastHover.current = null
    setHover(null)
  }

  useFrame(({ clock }) => {
    const t = intro.current.t
    const done = intro.current.done

    if (!done) {
      for (const part of PARTS) {
        const mesh = refs.current[part.mesh]
        if (!mesh) continue
        const [lx, ly, lz] = part.pos
        for (let i = 0; i < COUNT; i++) {
          const s = revealScale(i, t)
          const { x, z } = WORKSTATIONS[i]
          dummy.position.set(x + lx * s, ly * s, z + lz * s)
          dummy.scale.setScalar(Math.max(s, 0.0001))
          dummy.updateMatrix()
          mesh.setMatrixAt(i, dummy.matrix)
        }
        mesh.instanceMatrix.needsUpdate = true
      }
    }

    /* Live effects — subtle, always on */
    const time = clock.getElapsedTime()
    screenMat.emissiveIntensity = 0.48 + 0.13 * Math.sin(time * 1.7)
    towerLedMat.emissiveIntensity = 0.75 + 0.5 * Math.sin(time * 2.4)
    activityLedMat.emissiveIntensity =
      0.15 + 0.85 * Math.max(0, Math.sin(time * 5 + Math.floor(time * 2)))
  })

  const hoverProps = {
    onPointerOver: handleOver,
    onPointerMove: handleOver,
    onPointerOut: handleOut,
  }

  return (
    <group {...hoverProps}>
      {PARTS.map((part) => (
        <instancedMesh
          key={part.mesh}
          ref={setMeshRef(part.mesh)}
          args={[undefined, undefined, COUNT]}
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

export default Computers
