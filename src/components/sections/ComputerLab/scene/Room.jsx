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

/* The room shell — a bright classroom (12m × 10.5m interior) with a glossy
   ceramic floor, a back teaching wall, and a left wall carrying windows, a
   door and the exit sign. Cut open on the front/right so the page background
   stays visible. */

const ROOM_W = 12
const ROOM_D = 10.5
const WALL_H = 2.7
const BACK = -ROOM_D / 2
const LEFT = -ROOM_W / 2

/* Floor — light ceramic tiles with subtle grout lines, gently glossy */
function useFloorTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 256
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 256, 256)
    ctx.fillStyle = '#f9fbfd'
    ctx.fillRect(0, 0, 256, 256)
    /* faint per-tile tint for a natural ceramic finish */
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        ctx.fillStyle = `rgba(59, 130, 246, ${0.01 + 0.012 * ((i * 7 + j * 13) % 5)})`
        ctx.fillRect(i * 64 + 2, j * 64 + 2, 60, 60)
      }
    }
    /* grout lines */
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)'
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
    /* ~0.6m ceramic tiles across the 12m × 10.5m floor */
    tex.repeat.set(5, 4.375)
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
        roughness: 0.3,
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

/* Back wall (z = -5.25) and left wall (x = -6), plus white skirting */
function Walls() {
  return (
    <group>
      <mesh position={[0, WALL_H / 2, BACK - 0.075]} material={wallMat} receiveShadow castShadow>
        <boxGeometry args={[ROOM_W + 0.15, WALL_H, 0.15]} />
      </mesh>
      <mesh position={[LEFT - 0.075, WALL_H / 2, 0]} material={wallMat} receiveShadow castShadow>
        <boxGeometry args={[0.15, WALL_H, ROOM_D + 0.15]} />
      </mesh>
      {/* wall skirting / baseboards */}
      <mesh position={[0, 0.06, BACK + 0.015]} material={skirtingMat}>
        <boxGeometry args={[ROOM_W - 0.02, 0.12, 0.03]} />
      </mesh>
      <mesh position={[LEFT + 0.015, 0.06, 0]} material={skirtingMat}>
        <boxGeometry args={[0.03, 0.12, ROOM_D - 0.02]} />
      </mesh>
    </group>
  )
}

/* Large window: glass pane + white frame + center mullion */
function Window({ x = 0, z = 0, rotY = 0, w = 2.4, h = 1.15, y = 1.575 }) {
  return (
    <group position={[x, y, z]} rotation={[0, rotY, 0]}>
      <mesh material={windowGlassMat}>
        <boxGeometry args={[w * 0.94, h * 0.94, 0.02]} />
      </mesh>
      <mesh position={[0, h / 2 + 0.02, 0]} material={windowFrameMat} castShadow>
        <boxGeometry args={[w, 0.05, 0.05]} />
      </mesh>
      <mesh position={[0, -h / 2 - 0.02, 0]} material={windowFrameMat} castShadow>
        <boxGeometry args={[w, 0.05, 0.05]} />
      </mesh>
      <mesh position={[-w / 2 - 0.02, 0, 0]} material={windowFrameMat} castShadow>
        <boxGeometry args={[0.05, h, 0.05]} />
      </mesh>
      <mesh position={[w / 2 + 0.02, 0, 0]} material={windowFrameMat} castShadow>
        <boxGeometry args={[0.05, h, 0.05]} />
      </mesh>
      <mesh material={windowFrameMat} castShadow>
        <boxGeometry args={[0.04, h * 0.94, 0.04]} />
      </mesh>
    </group>
  )
}

function Windows() {
  return (
    <group>
      {/* back wall — flanking the whiteboard */}
      <Window x={-3.4} z={BACK + 0.03} w={2.2} h={1.2} />
      <Window x={3.4} z={BACK + 0.03} w={2.2} h={1.2} />
      {/* left wall */}
      <Window x={LEFT + 0.03} z={-2.4} rotY={Math.PI / 2} />
      <Window x={LEFT + 0.03} z={0.4} rotY={Math.PI / 2} />
    </group>
  )
}

/* Classroom door with frame + handle on the left wall */
function Door() {
  return (
    <group position={[LEFT + 0.045, 0, 2.9]}>
      <mesh position={[0, 1.12, 0]} material={doorFrameMat} castShadow>
        <boxGeometry args={[0.07, 2.25, 1.15]} />
      </mesh>
      <mesh position={[0, 1.05, 0.03]} material={doorMat} castShadow>
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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
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

/* Emergency exit sign with a steady green glow — faces the door below */
function ExitSign({ position }) {
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
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
  const crossZ = [-2.7, -0.45, 1.8, 3.95]
  return (
    <group>
      {/* backbone along the back wall */}
      <mesh position={[0, 2.3, BACK + 0.35]} material={trayMat} castShadow>
        <boxGeometry args={[11.4, 0.07, 0.2]} />
      </mesh>
      {/* cross runs above each row */}
      {crossZ.map((z) => (
        <mesh key={z} position={[0, 2.36, z]} material={trayMat} castShadow>
          <boxGeometry args={[11.4, 0.06, 0.14]} />
        </mesh>
      ))}
      {/* vertical drop from the backbone down to the server rack (back-right) */}
      <mesh position={[4.5, 1.55, BACK + 0.35]} material={conduitMat}>
        <boxGeometry args={[0.07, 1.55, 0.07]} />
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

  useFrame(({ clock }) => {
    const et = easeOutCubic(intro.current.t)
    lightPanelMat.emissiveIntensity = 0.1 + et * 0.6 + 0.07 * Math.sin(clock.getElapsedTime() * 2.2)
    windowGlassMat.emissiveIntensity = 0.05 + et * 0.28
  })

  const panels = []
  for (const x of [-3, 0, 3]) {
    for (const z of [-2.2, 2.0]) {
      panels.push([x, z])
    }
  }

  return (
    <group>
      {panels.map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 2.58, z]} material={lightPanelMat}>
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
      <ExitSign position={[LEFT + 0.03, 2.35, 2.9]} />
      <Outlet position={[-1.7, 0.4, BACK + 0.03]} />
      <Outlet position={[0.5, 0.4, BACK + 0.03]} />
      <Outlet position={[LEFT + 0.03, 0.4, -3.8]} rotY={Math.PI / 2} />
      <Outlet position={[LEFT + 0.03, 0.4, 1.8]} rotY={Math.PI / 2} />
      <CableTray />
      <CeilingLights />
    </group>
  )
}

export default Room
