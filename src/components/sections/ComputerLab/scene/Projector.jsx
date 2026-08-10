import { useMemo } from 'react'
import * as THREE from 'three'
import { useLabScene } from './state.jsx'
import {
  displayMat,
  displayScreenMat,
  doorFrameMat,
  projectorMat,
  rackTrimMat,
  whiteboardFrameMat,
  whiteboardMat,
} from './materials'
import { Led } from './ServerRack'

/* Teaching wall: a wide whiteboard in the centre, a ceiling projector aiming
   a soft light cone at it, and a wall-mounted flat main display to the side.
   Both the projector and the main display are hover hotspots. */

function Projector() {
  const { setHover } = useLabScene()

  const coneMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xdbeafe,
        transparent: true,
        opacity: 0.07,
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

      {/* wall-mounted main display, right of the whiteboard */}
      <group
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover('display', [2.5, 1.65, -5.16])
        }}
        onPointerOut={() => setHover(null)}
      >
        <group position={[2.5, 1.65, -5.16]}>
          <mesh material={displayMat} castShadow>
            <boxGeometry args={[1.0, 0.58, 0.06]} />
          </mesh>
          <mesh position={[0, 0, 0.04]} material={displayScreenMat}>
            <boxGeometry args={[0.94, 0.52, 0.02]} />
          </mesh>
          <mesh position={[-0.44, -0.28, -0.02]} material={rackTrimMat}>
            <boxGeometry args={[0.1, 0.1, 0.05]} />
          </mesh>
          <Led position={[0.45, 0.26, 0.035]} color={0x22c55e} speed={1.4} size={[0.03, 0.02, 0.02]} />
        </group>
      </group>

      {/* ceiling projector */}
      <group
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover('projector', [0, 2.5, 0])
        }}
        onPointerOut={() => setHover(null)}
      >
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
      </group>
    </group>
  )
}

export default Projector