import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import {
  acLedMat,
  acMat,
  acVentMat,
  apLedMat,
  apMat,
  chairMat,
  doorFrameMat,
  monitorBezelMat,
  plantLeafMat,
  plantPotMat,
  projectorMat,
  rackMat,
  rackTrimMat,
  screenMat,
  switchMat,
  teacherDeskMat,
  whiteboardFrameMat,
  whiteboardMat,
  wifiMat,
} from './materials'

/* Small glowing LED — each has its own material so they blink on their own
   phases. `boost` makes them blink faster/brighter on hover. */
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

/* Wrapper that makes a group hoverable for a labelled tooltip */
function Interactive({ hoverKey, position, children }) {
  const { setHover } = useLabScene()
  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(hoverKey, position)
      }}
      onPointerOut={() => setHover(null)}
    >
      {children}
    </group>
  )
}

/* Server rack tucked into the back-right corner, small and clear of the last
   desk row. A wall conduit (see Room) routes cables from the backbone into
   the rack, and from here to the switch. Blue glow turns on when hovered. */
function ServerRack({ hovered }) {
  const glow = useRef(null)

  useFrame((_, delta) => {
    if (glow.current) {
      glow.current.intensity = THREE.MathUtils.damp(
        glow.current.intensity,
        hovered ? 0.9 : 0,
        6,
        delta
      )
    }
  })

  const ledColor = hovered ? 0x60a5fa : 0x2563eb

  return (
    <Interactive hoverKey="server" position={[4.5, 0.75, -5.0]}>
      <group position={[4.5, 0, -5.0]}>
        <mesh position={[0, 0.375, 0]} material={rackMat} castShadow>
          <boxGeometry args={[0.5, 0.75, 0.3]} />
        </mesh>
        <mesh position={[0, 0.79, 0]} material={rackTrimMat}>
          <boxGeometry args={[0.54, 0.05, 0.34]} />
        </mesh>
        <mesh position={[0, 0.025, 0]} material={rackTrimMat}>
          <boxGeometry args={[0.54, 0.05, 0.34]} />
        </mesh>
        <mesh position={[0.26, 0.375, 0]} material={rackTrimMat}>
          <boxGeometry args={[0.04, 0.75, 0.3]} />
        </mesh>
        {/* front LEDs */}
        <Led position={[0.28, 0.28, -0.1]} color={ledColor} speed={2.2} phase={0} boost={hovered} />
        <Led
          position={[0.28, 0.28, 0.1]}
          color={ledColor}
          speed={2.2}
          phase={2.4}
          boost={hovered}
        />
        <Led
          position={[0.28, 0.55, -0.1]}
          color={ledColor}
          speed={1.6}
          phase={4.1}
          boost={hovered}
        />
        <Led
          position={[0.28, 0.55, 0.1]}
          color={ledColor}
          speed={1.6}
          phase={1.2}
          boost={hovered}
        />
        <pointLight
          ref={glow}
          position={[0, 0.55, 0.35]}
          intensity={0}
          color={0x60a5fa}
          distance={3.5}
        />
      </group>
    </Interactive>
  )
}

/* Managed switch mounted on top of the rack — blinking link LEDs, faster on
   hover. */
function Switch({ hovered }) {
  const leds = [
    { z: -0.1, phase: 0, color: 0x22c55e },
    { z: -0.03, phase: 1.9, color: 0x22c55e },
    { z: 0.03, phase: 3.1, color: 0x22c55e },
    { z: 0.1, phase: 0.8, color: 0xf2a93b },
  ]
  return (
    <Interactive hoverKey="switch" position={[4.5, 0.95, -5.0]}>
      <group position={[4.5, 0.83, -5.0]}>
        <mesh material={switchMat} castShadow>
          <boxGeometry args={[0.5, 0.07, 0.3]} />
        </mesh>
        <mesh position={[0, 0.04, 0]} material={rackTrimMat}>
          <boxGeometry args={[0.54, 0.02, 0.34]} />
        </mesh>
        {leds.map(({ z, phase, color }) => (
          <Led
            key={z}
            position={[0.25, 0, z]}
            color={color}
            phase={phase}
            speed={2.6}
            size={[0.04, 0.02, 0.045]}
            boost={hovered}
          />
        ))}
      </group>
    </Interactive>
  )
}

/* WiFi access point hanging from the ceiling with animated signal arcs */
function AccessPoint({ hovered }) {
  const arcs = useRef([])
  const boost = hovered ? 1 : 0

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * (1 + boost * 1.6)
    arcs.current.forEach((m, i) => {
      if (!m) return
      const phase = i * 2.1
      const s = 0.9 + 0.28 * Math.sin(t + phase)
      m.scale.setScalar(s)
    })
    apLedMat.emissiveIntensity =
      0.4 + 0.6 * Math.max(0, Math.sin(clock.getElapsedTime() * (2 + boost * 2)))
  })

  const arcRefs = (i) => (el) => {
    arcs.current[i] = el
  }

  return (
    <Interactive hoverKey="ap" position={[0, 2.4, 0.6]}>
      <group position={[0, 0, 0.6]}>
        {/* mount rod up to the ceiling */}
        <mesh position={[0, 2.62, 0]} material={rackTrimMat}>
          <boxGeometry args={[0.06, 0.16, 0.06]} />
        </mesh>
        <mesh position={[0, 2.52, 0]} material={apMat} castShadow>
          <cylinderGeometry args={[0.4, 0.44, 0.06, 28]} />
        </mesh>
        <mesh position={[0, 2.46, 0]} material={apLedMat}>
          <boxGeometry args={[0.05, 0.02, 0.05]} />
        </mesh>
        <mesh
          ref={arcRefs(0)}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.4, 0]}
          material={wifiMat}
        >
          <ringGeometry args={[0.5, 0.6, 48, 1, 0, Math.PI * 1.5]} />
        </mesh>
        <mesh
          ref={arcRefs(1)}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.34, 0]}
          material={wifiMat}
        >
          <ringGeometry args={[0.8, 0.9, 48, 1, 0, Math.PI * 1.5]} />
        </mesh>
        <mesh
          ref={arcRefs(2)}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.28, 0]}
          material={wifiMat}
        >
          <ringGeometry args={[1.1, 1.2, 48, 1, 0, Math.PI * 1.5]} />
        </mesh>
      </group>
    </Interactive>
  )
}

/* Whiteboard on the teaching wall + ceiling projector aiming a light cone at
   it. The projector is its own hover hotspot. */
function Projector() {
  const coneMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xdbeafe,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  )

  /* cone pointing from the projector down toward the whiteboard */
  const cone = useMemo(() => {
    const from = new THREE.Vector3(0, 2.5, 0)
    const to = new THREE.Vector3(0, 1.7, -5.18)
    const apexDir = new THREE.Vector3().subVectors(from, to).normalize()
    const length = from.distanceTo(to)
    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5)
    return {
      position: mid.toArray(),
      rotationX: Math.atan2(apexDir.z, apexDir.y),
      length,
    }
  }, [])

  return (
    <group>
      {/* whiteboard on the back wall */}
      <group position={[0, 1.7, -5.18]}>
        <mesh material={whiteboardFrameMat} castShadow>
          <boxGeometry args={[3.2, 1.4, 0.07]} />
        </mesh>
        <mesh position={[0, 0, 0.045]} material={whiteboardMat}>
          <boxGeometry args={[3.0, 1.2, 0.02]} />
        </mesh>
        <mesh position={[0, -0.72, 0.03]} material={doorFrameMat}>
          <boxGeometry args={[1.5, 0.03, 0.08]} />
        </mesh>
      </group>

      {/* ceiling projector */}
      <Interactive hoverKey="projector" position={[0, 2.5, 0]}>
        <group>
          <mesh position={[0, 2.56, 0]} material={rackTrimMat}>
            <boxGeometry args={[0.05, 0.14, 0.05]} />
          </mesh>
          <mesh
            position={[0, 2.44, 0]}
            rotation={[THREE.MathUtils.degToRad(-83), 0, 0]}
            material={projectorMat}
            castShadow
          >
            <boxGeometry args={[0.55, 0.18, 0.42]} />
          </mesh>
          {/* status LED on the side */}
          <Led
            position={[0.3, 2.44, 0.03]}
            color={0xf87171}
            speed={1.4}
            size={[0.04, 0.02, 0.02]}
          />
          {/* light cone toward the whiteboard */}
          <mesh position={cone.position} rotation={[cone.rotationX, 0, 0]} material={coneMat}>
            <coneGeometry args={[1.7, cone.length, 32, 1, true]} />
          </mesh>
        </group>
      </Interactive>
    </group>
  )
}

/* Teacher desk in dark wood with a larger monitor facing the students */
function TeacherDesk() {
  return (
    <Interactive hoverKey="teacher" position={[0, 0.8, -4.2]}>
      <group>
        <mesh position={[0, 0.8, -4.2]} material={teacherDeskMat} receiveShadow castShadow>
          <boxGeometry args={[2.2, 0.08, 0.95]} />
        </mesh>
        <mesh position={[0, 0.38, -4.2]} material={teacherDeskMat}>
          <boxGeometry args={[0.22, 0.76, 0.75]} />
        </mesh>
        {/* monitor facing the room (+z) */}
        <mesh position={[0, 1.28, -4.0]} material={monitorBezelMat} castShadow>
          <boxGeometry args={[1.15, 0.66, 0.06]} />
        </mesh>
        <mesh position={[0, 1.28, -3.975]} material={screenMat}>
          <boxGeometry args={[1.09, 0.6, 0.02]} />
        </mesh>
        <mesh position={[0, 1.04, -4.0]} material={rackTrimMat}>
          <boxGeometry args={[0.07, 0.26, 0.07]} />
        </mesh>
        <mesh position={[0, 0.93, -4.0]} material={teacherDeskMat}>
          <boxGeometry args={[0.4, 0.04, 0.2]} />
        </mesh>
        <mesh position={[0, 0.85, -3.7]} material={doorFrameMat}>
          <boxGeometry args={[0.5, 0.03, 0.18]} />
        </mesh>
        {/* teacher chair behind the desk */}
        <group position={[0.6, 0, -4.5]}>
          <mesh position={[0, 0.48, 0]} material={chairMat} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
          </mesh>
          <mesh position={[0, 0.78, -0.22]} material={chairMat}>
            <boxGeometry args={[0.5, 0.55, 0.06]} />
          </mesh>
          <mesh position={[0, 0.44, 0]} material={chairMat}>
            <boxGeometry args={[0.07, 0.44, 0.07]} />
          </mesh>
          <mesh position={[0, 0.02, 0]} material={chairMat}>
            <boxGeometry args={[0.36, 0.04, 0.36]} />
          </mesh>
        </group>
      </group>
    </Interactive>
  )
}

/* Air conditioner mounted above the classroom door */
function AirConditioner() {
  return (
    <group position={[-5.85, 2.3, 2.9]} rotation={[0, -Math.PI / 2, 0]}>
      <mesh material={acMat} castShadow>
        <boxGeometry args={[1.2, 0.38, 0.28]} />
      </mesh>
      <mesh position={[0, 0, 0.15]} material={acVentMat}>
        <boxGeometry args={[0.95, 0.16, 0.02]} />
      </mesh>
      <mesh position={[0.42, -0.14, 0.15]} material={acLedMat}>
        <boxGeometry args={[0.04, 0.02, 0.01]} />
      </mesh>
    </group>
  )
}

/* Small indoor plant: white pot + a few leafy spheres */
function Plant({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.11, 0]} material={plantPotMat} castShadow>
        <cylinderGeometry args={[0.14, 0.18, 0.22, 20]} />
      </mesh>
      <mesh position={[0, 0.5, 0]} material={plantLeafMat}>
        <sphereGeometry args={[0.28, 16, 12]} />
      </mesh>
      <mesh position={[0.18, 0.34, 0.1]} material={plantLeafMat}>
        <sphereGeometry args={[0.14, 12, 10]} />
      </mesh>
      <mesh position={[-0.16, 0.36, -0.08]} material={plantLeafMat}>
        <sphereGeometry args={[0.12, 12, 10]} />
      </mesh>
    </group>
  )
}

function Infrastructure() {
  const { hover } = useLabScene()

  const serverHovered = hover?.key === 'server'
  const switchHovered = hover?.key === 'switch'
  const apHovered = hover?.key === 'ap'

  return (
    <group>
      <ServerRack hovered={serverHovered} />
      <Switch hovered={switchHovered} />
      <AccessPoint hovered={apHovered} />
      <Projector />
      <TeacherDesk />
      <AirConditioner />
      <Plant position={[-5.35, 0, -5.0]} />
      <Plant position={[5.35, 0, 4.8]} />
      <Plant position={[-5.5, 0, 4.6]} />
    </group>
  )
}

export default Infrastructure
