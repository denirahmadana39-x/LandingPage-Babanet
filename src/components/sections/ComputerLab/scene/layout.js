/* Shared spatial constants for the lab scene — single source of truth so the
   room shell, workstations, infrastructure and the camera all agree on where
   everything sits. Units are metres on a roughly 1:1 floor plan, +z is the
   front of the room (away from the teaching wall), -z is the teaching wall.

   Student workstations are built from one shared description: every desk
   column/row spawns an identical DESK + COMPUTER + CHAIR group whose chair is
   derived from the desk origin, so alignment can never drift. */

export const ROOM_W = 12.0
export const ROOM_D = 10.4
export const WALL_H = 3.0
export const BACK = -ROOM_D / 2 // teaching wall (whiteboard)
export const LEFT = -ROOM_W / 2 // window wall
export const DOOR_Z = -4.25

/* ------------------------------------------------------------------- desk */
/* Training desk with a shallow light-wood top on a slim steel frame. */
export const DESK_W = 1.12
export const DESK_D = 0.68
export const DESK_TOP_Y = 0.78 // top surface height

/* Monitor sits near the back edge of the desk, screen facing the student. */
export const MONITOR_W = 0.6
export const MONITOR_H = 0.4

/* ------------------------------------------------------------------ grid */
/* 5 columns × 4 rows. The grid is shifted slightly left to create a wide
   service lane beside the server rack, while the larger gap between columns
   two and three reads as the main aisle. Row pitch leaves roughly 80 cm
   between a chair frame and the next desk. */
export const COLS = [-4.1, -2.55, -0.35, 1.2, 2.75]
export const ROWS = [-2.05, -0.1, 1.85, 3.8]

/* Chair derived from the desk origin: the student chairs sits on the desk's
   +z side facing the monitor. CHAIR_Z is the offset of the seat centre from
   the desk centre; the backrest itself extends further +z. */
export const CHAIR_Z = 0.57
export const CHAIR_W = 0.48
export const CHAIR_SEAT_H = 0.46

/* Server rack + service corner near the back-right wall — kept well clear of
   the student grid (last column x = 2.8) so the cabinet reads as
   infrastructure, not a workstation. */
export const RACK_X = 5.1
export const RACK_Z = -4.0

/* Teacher area between the last row and the whiteboard */
export const TEACHER_X = -0.35
export const TEACHER_Z = -4.0

/* Data-driven workstation plan. Position and orientation live together, so
   rotating a station always rotates its desk, computer and chair as one. */
export const WORKSTATIONS = ROWS.flatMap((z, row) =>
  COLS.map((x, column) => ({
    id: `student-${row + 1}-${column + 1}`,
    row,
    column,
    position: [x, 0, z],
    rotation: 0,
  }))
)
