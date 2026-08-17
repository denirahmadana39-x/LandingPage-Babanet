import { memo } from 'react'
import { CHAIR_Z, DESK_D, DESK_TOP_Y, DESK_W } from './layout'
import { CHAIR_SUPPORT_X } from './chair'

/* One logical workstation. Every object is positioned relative to this
   group, so position/rotation changes can never separate the chair from its
   desk or turn it away from the monitor. The mesh components come from
   drei's Merged instancing pool in Computers.jsx. */
function StudentWorkstation({ parts, position, rotation = 0, onPointerOver, onPointerOut }) {
  const {
    ActivityLed,
    ChairBack,
    ChairSeat,
    ChairSupport,
    Cpu,
    CpuLed,
    DeskBeam,
    DeskSide,
    DeskTop,
    Keyboard,
    MonitorBase,
    MonitorBezel,
    MonitorPost,
    MonitorScreen,
    Mouse,
  } = parts

  return (
    <group
      position={position}
      rotation={[0, rotation, 0]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <DeskTop position={[0, DESK_TOP_Y, 0]} />
      <DeskSide position={[-DESK_W / 2 + 0.065, 0.4, 0]} />
      <DeskSide position={[DESK_W / 2 - 0.065, 0.4, 0]} />
      <DeskBeam position={[0, 0.18, DESK_D / 2 - 0.06]} />

      <MonitorBase position={[0, DESK_TOP_Y + 0.055, -0.14]} />
      <MonitorPost position={[0, DESK_TOP_Y + 0.16, -0.14]} />
      <MonitorBezel position={[0, DESK_TOP_Y + 0.37, -0.14]} />
      <MonitorScreen position={[0, DESK_TOP_Y + 0.37, -0.113]} />
      <Keyboard position={[-0.03, DESK_TOP_Y + 0.055, 0.13]} />
      <Mouse position={[0.25, DESK_TOP_Y + 0.06, 0.12]} />
      <ActivityLed position={[-0.29, DESK_TOP_Y + 0.055, -0.01]} />

      <Cpu position={[DESK_W / 2 - 0.16, 0.3, -0.04]} />
      <CpuLed position={[DESK_W / 2 - 0.16, 0.39, 0.157]} />

      <ChairSupport position={[-CHAIR_SUPPORT_X, 0.002, CHAIR_Z]} />
      <ChairSupport position={[CHAIR_SUPPORT_X, 0.002, CHAIR_Z]} />
      <ChairSeat position={[0, 0.46, CHAIR_Z]} />
      <ChairBack position={[0, 0.77, CHAIR_Z + 0.205]} rotation={[-0.07, 0, 0]} />
    </group>
  )
}

export default memo(StudentWorkstation)
