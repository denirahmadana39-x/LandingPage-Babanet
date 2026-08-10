/* Physical layout of the computer laboratory — all dimensions in metres.
   The room is 12m × 10.5m (a realistic school lab); +z is the front of the
   room (the open cutaway side, where the page "visitor" stands), -z the back
   wall holding the whiteboard, projector screen and teacher's area. */

export const ROOM_W = 12
export const ROOM_D = 10.5
export const WALL_H = 2.7
export const BACK = -ROOM_D / 2
export const LEFT = -ROOM_W / 2

/* Student workstation — a 0.9m × 0.8m desk at 0.75m height.
   Columns pitch 1.5m (desk 0.9 wide → 0.6m clearance, one 0.42m chair fits
   comfortably between neighbours). Rows pitch 2.0m: 0.8m desk depth +
   0.55m chair zone + ~0.65m walking aisle between rows. */
export const DESK_W = 0.9
export const DESK_D = 0.8
export const DESK_H = 0.75

/* 6 columns in two blocks of 3 with a 1.5m centre walking aisle */
export const COLS = [-3.75, -2.25, -0.75, 0.75, 2.25, 3.75]
/* 4 rows, front rows first for the wake-up reveal */
export const ROWS = [3.9, 1.9, -0.1, -2.1]

export const WORKSTATIONS = ROWS.flatMap((z) => COLS.map((x) => ({ x, z })))
export const WORKSTATION_COUNT = WORKSTATIONS.length

/* Chair zone: seat sits just in front of the desk top, tucked under it */
export const CHAIR_Z_OFFSET = 0.55
export const CHAIR_W = 0.42

/* Teacher area / back-room positions */
export const TEACHER_DESK_POS = [0, 0.8, -4.2]
export const RACK_POS = [4.6, 0, -5.0]
