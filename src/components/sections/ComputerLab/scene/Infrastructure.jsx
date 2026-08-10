import { acLedMat, acMat, acVentMat, cableMat, plantLeafMat, plantPotMat, trunkingMat } from './materials'
import ServerRack from './ServerRack'
import AccessPoint from './AccessPoint'
import Projector from './Projector'
import TeacherDesk from './TeacherDesk'
import { COLS, ROWS } from './layout.js'

/* Assembled backroom + infrastructure: server rack, managed switch, WiFi
   access points, projector wall, teacher station, plus the small props
   (AC unit, plants) and the floor cable trunking that runs each row's
   cabling back to the rack. */

/* Floor trunking: one run per row behind the desks, a spine along the back
   wall and a drop into the rack corner. Reads as planned network cabling. */
function CableRuns() {
  return (
    <group>
      {ROWS.map((z) => (
        <mesh
          key={`run-${z}`}
          position={[0.6, 0.03, z - 0.5]}
          material={trunkingMat}
          receiveShadow
        >
          <boxGeometry args={[COLS.length * 1.6, 0.05, 0.12]} />
        </mesh>
      ))}
      {/* wall spine along the back wall, feeding the rack */}
      <mesh position={[2.2, 0.03, -5.05]} material={trunkingMat} receiveShadow>
        <boxGeometry args={[4.4, 0.05, 0.12]} />
      </mesh>
      {/* short patch cables under the rack corner */}
      <mesh position={[4.6, 0.02, -4.6]} material={cableMat} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.015, 0.02]} />
      </mesh>
      <mesh position={[4.2, 0.02, -4.9]} material={cableMat} rotation={[0, -0.6, 0]}>
        <boxGeometry args={[0.5, 0.015, 0.02]} />
      </mesh>
    </group>
  )
}

function WallsAndAccents() {
  return (
    <group>
      {/* air conditioner above the door (left wall) */}
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

      {/* indoor plants */}
      <group position={[-5.35, 0, -5.0]}>
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
      <group position={[5.35, 0, 4.8]}>
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
      <group position={[-5.5, 0, 4.6]}>
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
    </group>
  )
}

function Infrastructure() {
  return (
    <group>
      <CableRuns />
      <ServerRack />
      <AccessPoint />
      <Projector />
      <TeacherDesk />
      <WallsAndAccents />
    </group>
  )
}

export default Infrastructure