import { useLabScene } from './state.jsx'
import { doorFrameMat, monitorBezelMat, rackTrimMat, screenMat, teacherDeskMat } from './materials'
import { TEACHER_DESK_POS } from './layout.js'
import { Chair } from './Chair'

/* Teacher's station at the back-centre of the room: dark-wood desk with a
   larger monitor facing the rows (+z), keyboard, rollable side table and
   chair. */

function TeacherDesk() {
  const { setHover } = useLabScene()
  const [dx, dy, dz] = TEACHER_DESK_POS

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover('teacher', [dx, dy, dz])
      }}
      onPointerOut={() => setHover(null)}
    >
      <group>
        {/* desk top */}
        <mesh position={[dx, dy, 0]} material={teacherDeskMat} receiveShadow castShadow>
          <boxGeometry args={[2.2, 0.08, 0.95]} />
        </mesh>
        {/* pedestal */}
        <mesh position={[0, dy - 0.42, 0]} material={teacherDeskMat}>
          <boxGeometry args={[0.22, 0.76, 0.75]} />
        </mesh>
        {/* larger monitor facing +z */}
        <mesh position={[0, dy + 0.48, dz + 0.2]} material={monitorBezelMat} castShadow>
          <boxGeometry args={[1.2, 0.7, 0.06]} />
        </mesh>
        <mesh position={[0, dy + 0.48, dz + 0.232]} material={screenMat}>
          <boxGeometry args={[1.14, 0.64, 0.02]} />
        </mesh>
        <mesh position={[0, dy + 0.22, dz + 0.2]} material={rackTrimMat}>
          <boxGeometry args={[0.07, 0.26, 0.07]} />
        </mesh>
        <mesh position={[0, dy + 0.12, dz + 0.2]} material={teacherDeskMat}>
          <boxGeometry args={[0.42, 0.04, 0.2]} />
        </mesh>
        {/* keyboard */}
        <mesh position={[0, dy + 0.045, dz + 0.36]} material={rackTrimMat}>
          <boxGeometry args={[0.7, 0.025, 0.22]} />
        </mesh>
        {/* rollable side table */}
        <mesh position={[1.4, dy - 0.05, dz - 0.1]} material={doorFrameMat}>
          <boxGeometry args={[0.5, 0.03, 0.36]} />
        </mesh>
        <mesh position={[1.4, dy - 0.28, dz - 0.1]} material={doorFrameMat}>
          <boxGeometry args={[0.06, 0.45, 0.06]} />
        </mesh>
        <mesh position={[1.4, dy - 0.5, dz - 0.1]} material={doorFrameMat}>
          <boxGeometry args={[0.3, 0.03, 0.3]} />
        </mesh>
        {/* teacher chair */}
        <Chair position={[0.65, 0, dz + 0.62]} rotationY={Math.PI} />
      </group>
    </group>
  )
}

export default TeacherDesk