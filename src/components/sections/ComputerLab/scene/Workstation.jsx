import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import { clamp, easeOutCubic } from './math'
import { WORKSTATION_COUNT, WORKSTATIONS } from './layout.js'
import {
  activityLedMat,
  deskMat,
  deskPedestalMat,
  keyboardMat,
  monitorBezelMat,
  mouseMat,
  screenMat,
  towerLedMat,
  towerMat,
} from './materials'

/* 24 student workstations — 4 rows × 6 columns in two blocks of three with a
   1.5m centre aisle. Each station: 0.9m wood desk, matte monitor, keyboard,
   mouse and a floor tower. Everything is instanced and shares module-level
   materials, so the whole block is ~12 draw calls. The entrance choreography
   grows stations up from the floor, front rows first. */

/* Local part offsets relative to the workstation floor point */
const PARTS = [
  { mesh: 'deskTop', mat: deskMat, pos: [0, 0.75, 0], size: [0.9, 0.05, 0.8] },
  { mesh: 'legL', mat: deskPedestalMat, pos: [-0.4, 0.375, 0], size: [0.05, 0.75, 0.76] },
  { mesh: 'legR', mat: deskPedestalMat, pos: [0.4, 0.375, 0], size: [0.05, 0.75, 0.76] },
  { mesh: 'beam', mat: deskPedestalMat, pos: [0, 0.14, 0], size: [0.72, 0.05, 0.5] },
  { mesh: 'bezel', mat: monitorBezelMat, pos: [0, 1.21, 0.17], size: [0.62, 0.4, 0.06] },
  { mesh: 'screen', mat: screenMat, pos: [0, 1.21, 0.185], size: [0.58, 0.36, 0.03] },
  { mesh: 'standCol', mat: deskPedestalMat, pos: [0, 0.92, 0.1], size: [0.06, 0.26, 0.06] },
  { mesh: 'standBase', mat: deskMat, pos: [0, 0.81, 0.08], size: [0.28, 0.03, 0.16] },
  { mesh: 'keyboard', mat: keyboardMat, pos: [0, 0.776, 0.22], size: [0.45, 0.02, 0.14] },
  { mesh: 'mouse', mat: mouseMat, pos: [0.15, 0.776, 0.14], size: [0.1, 0.02, 0.07] },
  { mesh: 'tower', mat: towerMat, pos: [0, 0.42, -0.16], size: [0.32, 0.44, 0.36] },
  { mesh: 'towerLed', mat: towerLedMat, pos: [-0.15, 0.51, 0.05], size: [0.22, 0.05, 0.02] },
  { mesh: 'activity', mat: activityLedMat, pos: [0.22, 0.78, 0.28], size: [0.04, 0.015, 0.04] },
]

const STAGGER = 0.02
const REVEAL_DUR = 0.5

function Workstation() {
  const { intro, setHover } = useLabScene()
  const refs = useRef({})
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const lastHover = useRef(null)

  const setMeshRef = (key) => (el) => {
    refs.current[key] = el
  }

  const revealScale = (i, t) => easeOutCubic(clamp((t - i * STAGGER) / REVEAL_DUR, 0, 1))

  /* Hover lives on the wrapping group: pointer events bubble up from whichever
     part is hit; the instance guard avoids re-rendering on every move. */
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
        for (let i = 0; i < WORKSTATION_COUNT; i++) {
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

export default Workstation