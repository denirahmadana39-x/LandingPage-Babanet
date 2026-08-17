import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Merged } from '@react-three/drei'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import StudentWorkstation from './StudentWorkstation'
import {
  chairSupportGeometry,
  CHAIR_BACK_H,
  CHAIR_SEAT_D,
  CHAIR_SEAT_W,
  CHAIR_TUBE_RADIUS,
} from './chair'
import { CHAIR_Z, DESK_D, DESK_TOP_Y, DESK_W, WORKSTATIONS } from './layout'
import {
  activityLedMat,
  chairFrameMat,
  chairPadMat,
  deskMat,
  deskSideMat,
  keyboardMat,
  monitorBezelMat,
  monitorStandMat,
  mouseMat,
  screenMat,
  towerLedMat,
  towerMat,
} from './materials'

const makeMesh = (geometry, material) => new THREE.Mesh(geometry, material)

/* Source meshes for drei's Merged pool. Merged creates one InstancedMesh per
   part type, while StudentWorkstation composes those instances into a single
   reusable desk/computer/chair unit. */
const WORKSTATION_PARTS = {
  DeskTop: makeMesh(new RoundedBoxGeometry(DESK_W, 0.065, DESK_D, 3, 0.025), deskMat),
  DeskSide: makeMesh(new THREE.BoxGeometry(0.065, 0.74, DESK_D - 0.1), deskSideMat),
  DeskBeam: makeMesh(new THREE.BoxGeometry(DESK_W - 0.2, 0.045, 0.045), deskSideMat),
  MonitorBase: makeMesh(new RoundedBoxGeometry(0.29, 0.025, 0.19, 2, 0.012), monitorStandMat),
  MonitorPost: makeMesh(new THREE.BoxGeometry(0.055, 0.2, 0.055), monitorStandMat),
  MonitorBezel: makeMesh(new RoundedBoxGeometry(0.64, 0.41, 0.045, 3, 0.018), monitorBezelMat),
  MonitorScreen: makeMesh(new THREE.BoxGeometry(0.59, 0.355, 0.012), screenMat),
  Keyboard: makeMesh(new RoundedBoxGeometry(0.48, 0.025, 0.17, 2, 0.012), keyboardMat),
  Mouse: makeMesh(new RoundedBoxGeometry(0.08, 0.035, 0.12, 3, 0.025), mouseMat),
  ActivityLed: makeMesh(new THREE.BoxGeometry(0.012, 0.012, 0.012), activityLedMat),
  Cpu: makeMesh(new RoundedBoxGeometry(0.2, 0.52, 0.38, 2, 0.018), towerMat),
  CpuLed: makeMesh(new THREE.BoxGeometry(0.04, 0.025, 0.012), towerLedMat),
  ChairSupport: makeMesh(chairSupportGeometry(), chairFrameMat),
  ChairSeat: makeMesh(
    new RoundedBoxGeometry(CHAIR_SEAT_W, 0.065, CHAIR_SEAT_D, 3, 0.03),
    chairPadMat
  ),
  ChairBack: makeMesh(
    new RoundedBoxGeometry(CHAIR_SEAT_W, CHAIR_BACK_H, 0.06, 3, 0.03),
    chairPadMat
  ),
}

const COUNT = WORKSTATIONS.length
const CHAIR_BOUNDS = {
  zmin: CHAIR_Z - CHAIR_SEAT_D / 2,
  zmax: CHAIR_Z + 0.22 + CHAIR_TUBE_RADIUS,
  ymin: 0,
  ymax: 0.77 + CHAIR_BACK_H / 2,
}

function Computers() {
  const { setHover } = useLabScene()
  const lastHover = useRef(null)

  useEffect(() => {
    if (!import.meta.env.DEV) return
    window.__labLayout = WORKSTATIONS.map(({ id, position: [x, , z], rotation }) => ({
      id,
      x,
      z,
      rotation,
      supports: 2,
      desk: {
        xmin: x - DESK_W / 2,
        xmax: x + DESK_W / 2,
        zmin: z - DESK_D / 2,
        zmax: z + DESK_D / 2,
        top: DESK_TOP_Y,
      },
      monitor: { x, z: z - 0.14, facing: '-z' },
      chair: {
        x,
        z: z + CHAIR_Z,
        zmin: z + CHAIR_BOUNDS.zmin,
        zmax: z + CHAIR_BOUNDS.zmax,
        ymin: CHAIR_BOUNDS.ymin,
        ymax: CHAIR_BOUNDS.ymax,
        facing: '-z',
      },
    }))
  }, [])

  useFrame((state) => {
    const t = state.elapsedTime
    screenMat.emissiveIntensity = 0.54 + 0.08 * Math.sin(t * 1.25)
    towerLedMat.emissiveIntensity = 0.65 + 0.3 * Math.sin(t * 2)
    activityLedMat.emissiveIntensity = 0.35 + 0.35 * Math.max(0, Math.sin(t * 3.4))
  })

  const over = (station) => (event) => {
    event.stopPropagation()
    if (lastHover.current === station.id) return
    lastHover.current = station.id
    const [x, , z] = station.position
    setHover('computer', [x, 0.86, z + CHAIR_Z * 0.45])
  }

  const out = (event) => {
    event.stopPropagation()
    lastHover.current = null
    setHover(null)
  }

  return (
    <Merged meshes={WORKSTATION_PARTS} limit={COUNT * 2} frames={2} castShadow receiveShadow>
      {(parts) => (
        <group>
          {WORKSTATIONS.map((station) => (
            <StudentWorkstation
              key={station.id}
              parts={parts}
              position={station.position}
              rotation={station.rotation}
              onPointerOver={over(station)}
              onPointerOut={out}
            />
          ))}
        </group>
      )}
    </Merged>
  )
}

export { WORKSTATION_PARTS }
export default Computers
