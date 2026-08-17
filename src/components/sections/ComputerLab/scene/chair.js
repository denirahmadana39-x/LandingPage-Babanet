import * as THREE from 'three'

/* A believable cantilever chair uses two identical side tubes. Each tube is
   one continuous support: a floor runner curves upward beneath the seat and
   continues behind the backrest. Two mirrored copies form the complete
   structure—never four independent legs. */

export const CHAIR_SUPPORT_X = 0.215
export const CHAIR_TUBE_RADIUS = 0.024
export const CHAIR_SEAT_W = 0.48
export const CHAIR_SEAT_D = 0.42
export const CHAIR_BACK_H = 0.43

const SUPPORT_POINTS = [
  [0, 0.025, -0.22],
  [0, 0.025, 0.1],
  [0, 0.04, 0.22],
  [0, 0.18, 0.22],
  [0, 0.42, 0.14],
  [0, 0.58, 0.19],
  [0, 0.98, 0.21],
]

let supportGeo = null

export function chairSupportGeometry() {
  if (supportGeo) return supportGeo
  const curve = new THREE.CatmullRomCurve3(
    SUPPORT_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,
    'centripetal'
  )
  supportGeo = new THREE.TubeGeometry(curve, 28, CHAIR_TUBE_RADIUS, 8, false)
  supportGeo.computeVertexNormals()
  return supportGeo
}

export { SUPPORT_POINTS }
