import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import {
  clockFaceMat,
  clockHandMat,
  conduitMat,
  doorFrameMat,
  doorHandleMat,
  doorMat,
  exitBodyMat,
  exitSignMat,
  lightPanelMat,
  outletMat,
  skirtingMat,
  trayMat,
  wallMat,
  windowFrameMat,
  windowGlassMat,
} from './materials'
import { easeOutCubic } from './math'
import { BACK, DOOR_Z, LEFT, RACK_X, ROOM_D, ROOM_W, WALL_H } from './layout'

/* The room shell — a bright, buildable computer classroom (11.4m × 9m) with a
   ceramic floor, a teaching wall at the back (z = -4.5), a window wall on the
   left and the viewer open on the front/right so the page background stays
   visible. Student rows run from +z (front) toward the teacher at the back. */

/* Floor — light ceramic tiles with subtle grout lines, gently glossy */
function useFloorTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 256
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 256, 256)
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        ctx.fillStyle = `rgba(59, 130, 246, ${0.008 + 0.01 * ((i * 7 + j * 13) % 5)})`
        ctx.fillRect(i * 64 + 2, j * 64 + 2, 60, 60)
      }
    }
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.35)'
    ctx.lineWidth = 2
    for (let i = 0; i <= 4; i++) {
      const p = i * 64
      ctx.beginPath()
      ctx.moveTo(p, 0)
      ctx.lineTo(p, 256)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, p)
      ctx.lineTo(256, p)
      ctx.stroke()
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(ROOM_W / 2.4, ROOM_D / 2.4)
    tex.anisotropy = 8
    return tex
  }, [])
}

function Floor() {
  const map = useFloorTexture()
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.28,
        metalness: 0.08,
        map,
      }),
    [map]
  )
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={mat}>
      <planeGeometry args={[ROOM_W, ROOM_D]} />
    </mesh>
  )
}

/* Back (teaching) wall + left wall, with slim skirting */
function Walls() {
  return (
    <group>
      <mesh position={[0, WALL_H / 2, BACK - 0.075]} material={wallMat} receiveShadow>
        <boxGeometry args={[ROOM_W + 0.15, WALL_H, 0.15]} />
      </mesh>
      <mesh position={[LEFT - 0.075, WALL_H / 2, 0]} material={wallMat} receiveShadow>
        <boxGeometry args={[0.15, WALL_H, ROOM_D + 0.15]} />
      </mesh>
      {/* skirting along the back wall */}
      <mesh position={[0, 0.06, BACK + 0.015]} material={skirtingMat}>
        <boxGeometry args={[ROOM_W - 0.02, 0.12, 0.03]} />
      </mesh>
      {/* skirting along the left wall */}
      <mesh position={[LEFT + 0.015, 0.06, 0]} material={skirtingMat}>
        <boxGeometry args={[0.03, 0.12, ROOM_D - 0.02]} />
      </mesh>
    </group>
  )
}

/* Large window: glass pane + white frame + centre mullion */
function Window({ x = 0, z = 0, rotY = 0, w = 2.4, h = 1.15, y = 1.575 }) {
  return (
    <group position={[x, y, z]} rotation={[0, rotY, 0]}>
      <mesh material={windowGlassMat}>
        <boxGeometry args={[w * 0.94, h * 0.94, 0.02]} />
      </mesh>
      <mesh position={[0, h / 2 + 0.02, 0]} material={windowFrameMat}>
        <boxGeometry args={[w, 0.05, 0.05]} />
      </mesh>
      <mesh position={[0, -h / 2 - 0.02, 0]} material={windowFrameMat}>
        <boxGeometry args={[w, 0.05, 0.05]} />
      </mesh>
      <mesh position={[-w / 2 - 0.02, 0, 0]} material={windowFrameMat}>
        <boxGeometry args={[0.05, h, 0.05]} />
      </mesh>
      <mesh position={[w / 2 + 0.02, 0, 0]} material={windowFrameMat}>
        <boxGeometry args={[0.05, h, 0.05]} />
      </mesh>
      <mesh material={windowFrameMat}>
        <boxGeometry args={[0.04, h * 0.94, 0.04]} />
      </mesh>
    </group>
  )
}

function Windows() {
  return (
    <group>
      {/* left wall — long daylight windows */}
      <Window x={LEFT + 0.035} z={-2.3} rotY={Math.PI / 2} w={2} />
      <Window x={LEFT + 0.035} z={0.1} rotY={Math.PI / 2} w={2} />
      <Window x={LEFT + 0.035} z={2.7} rotY={Math.PI / 2} w={2} />
      {/* back wall — narrow windows flanking the whiteboard */}
      <Window x={-5.05} z={BACK + 0.035} w={1.25} h={0.9} y={1.9} />
      <Window x={5.05} z={BACK + 0.035} w={1.25} h={0.9} y={1.9} />
    </group>
  )
}

/* Classroom door with frame + handle on the left wall */
function Door() {
  return (
    <group position={[LEFT + 0.045, 0, DOOR_Z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh position={[0, 1.12, 0]} material={doorFrameMat}>
        <boxGeometry args={[0.07, 2.25, 1.15]} />
      </mesh>
      <mesh position={[0, 1.05, 0.03]} material={doorMat}>
        <boxGeometry args={[0.03, 2.1, 0.9]} />
      </mesh>
      <mesh position={[0, 1.0, 0.05]} material={doorHandleMat}>
        <boxGeometry args={[0.03, 0.04, 0.12]} />
      </mesh>
      <mesh position={[0, 1.35, 0.05]} material={doorHandleMat}>
        <boxGeometry args={[0.03, 0.04, 0.12]} />
      </mesh>
    </group>
  )
}

/* Wall clock with slowly moving hands */
function Clock({ position }) {
  const minute = useRef(null)
  const hour = useRef(null)

  useFrame((state) => {
    const t = state.elapsedTime
    if (minute.current) minute.current.rotation.z = -t * 0.052
    if (hour.current) hour.current.rotation.z = -t * 0.0043
  })

  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={clockFaceMat}>
        <cylinderGeometry args={[0.19, 0.19, 0.03, 32]} />
      </mesh>
      <mesh ref={minute} material={clockHandMat}>
        <boxGeometry args={[0.02, 0.15, 0.025]} />
      </mesh>
      <mesh ref={hour} material={clockHandMat}>
        <boxGeometry args={[0.02, 0.1, 0.028]} />
      </mesh>
    </group>
  )
}

/* Emergency exit sign with a steady blue glow — above the door */
function ExitSign({ position }) {
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      <mesh material={exitBodyMat}>
        <boxGeometry args={[0.6, 0.26, 0.05]} />
      </mesh>
      <mesh position={[0, 0, -0.032]} material={exitSignMat}>
        <boxGeometry args={[0.48, 0.16, 0.02]} />
      </mesh>
    </group>
  )
}

/* Electrical outlet boxes on the walls */
function Outlet({ position, rotY = 0 }) {
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      <mesh material={outletMat}>
        <boxGeometry args={[0.09, 0.15, 0.03]} />
      </mesh>
      <mesh position={[0, 0, -0.022]} material={wallMat}>
        <boxGeometry args={[0.05, 0.07, 0.02]} />
      </mesh>
    </group>
  )
}

/* LAN cable trays near the ceiling + conduit drops routing toward the rack */
function CableTray() {
  const crossZ = [-3.2, -0.8, 1.6, 3.8]
  return (
    <group>
      {/* backbone along the back wall */}
      <mesh position={[0, 2.7, BACK + 0.35]} material={trayMat}>
        <boxGeometry args={[ROOM_W - 1, 0.07, 0.2]} />
      </mesh>
      {/* cross runs above each aisle */}
      {crossZ.map((z) => (
        <mesh key={z} position={[0, 2.76, z]} material={trayMat}>
          <boxGeometry args={[ROOM_W - 1, 0.06, 0.14]} />
        </mesh>
      ))}
      {/* vertical drop from the backbone down to the server rack (back-right) */}
      <mesh position={[RACK_X, 1.8, BACK + 0.35]} material={conduitMat}>
        <boxGeometry args={[0.07, 1.9, 0.07]} />
      </mesh>
      {/* horizontal conduit run along the back wall */}
      <mesh position={[0.4, 1.0, BACK + 0.35]} material={conduitMat}>
        <boxGeometry args={[8.8, 0.06, 0.06]} />
      </mesh>
    </group>
  )
}

/* Ceiling LED panels that breathe and fade in with the entrance */
function CeilingLights() {
  const { intro } = useLabScene()

  useFrame(() => {
    const et = easeOutCubic(intro.current.t)
    lightPanelMat.opacity = 0.82 + et * 0.18
    windowGlassMat.emissiveIntensity = 0.05 + et * 0.28
  })

  const panels = []
  for (const x of [-3.7, 0, 3.7]) {
    for (const z of [-3.4, -1.1, 1.2, 3.5]) {
      panels.push([x, z])
    }
  }

  return (
    <group>
      {panels.map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 2.85, z]} material={lightPanelMat}>
          <boxGeometry args={[1.6, 0.05, 0.7]} />
        </mesh>
      ))}
    </group>
  )
}

function Room() {
  return (
    <group>
      <Floor />
      <Walls />
      <Windows />
      <Door />
      <Clock position={[4.8, 2.25, BACK + 0.06]} />
      <ExitSign position={[LEFT + 0.04, 2.35, DOOR_Z]} />
      <Outlet position={[-1.7, 0.4, BACK + 0.03]} />
      <Outlet position={[1.9, 0.4, BACK + 0.03]} />
      <Outlet position={[LEFT + 0.035, 0.4, 0.2]} rotY={Math.PI / 2} />
      <CableTray />
      <CeilingLights />
    </group>
  )
}

export default Room
