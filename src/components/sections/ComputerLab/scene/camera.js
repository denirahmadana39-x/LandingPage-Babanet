import * as THREE from 'three'

/* Shared camera configuration for every 3D lab viewport (inline viewer and
   fullscreen preview). The default is a three-quarter / isometric-ish view
   that frames the whole classroom — student desks, teacher area, server rack,
   windows and ceiling — without starting too close or directly overhead.

   OrbitControls clamps:
   - minDistance / maxDistance keep the room fully framed when zooming (never
     lets the camera slip inside the building),
   - minPolarAngle / maxPolarAngle prevent the camera from flipping upside
     down or sliding below the floor. */

export const HOME_POS = new THREE.Vector3(9.0, 8.8, 13.8)
export const HOME_TARGET = new THREE.Vector3(0, 1.0, -0.45)

export const ORBIT = {
  minDistance: 8,
  maxDistance: 34,
  minPolarAngle: THREE.MathUtils.degToRad(22),
  maxPolarAngle: THREE.MathUtils.degToRad(87),
  rotateSpeed: 0.62,
  zoomSpeed: 0.9,
  panSpeed: 0.55,
  dampingFactor: 0.08,
}

/* Narrow (portrait / mobile) viewports get a slightly higher fov and a view
   pulled back a touch so the whole room still fits on screen. */
export function defaultCamera(width) {
  const narrow = width < 900
  return {
    position: narrow ? new THREE.Vector3(7.2, 8.4, 14.2) : HOME_POS.clone(),
    target: HOME_TARGET,
    fov: narrow ? 50 : 40,
  }
}

export const RESET_DURATION_MS = 950
