import * as THREE from 'three'

/* Shared, reusable materials for the low-poly lab. Module-level singletons so
   instanced meshes all point at one material (one GPU program each) and the
   live effects (screen glow, LED blink) animate a single instance. */

const BLUE = 0x2563eb
const BLUE_SOFT = 0x3b82f6

/* Student desk top — light wood, softly matte so it reads natural without
   harsh highlights. */
export const deskMat = new THREE.MeshStandardMaterial({
  color: 0xd8b995,
  roughness: 0.55,
  metalness: 0.03,
})

/* Desk legs / frames — brushed light metal */
export const deskPedestalMat = new THREE.MeshStandardMaterial({
  color: 0x9aa7b4,
  roughness: 0.32,
  metalness: 0.65,
})

/* Matte black monitor bezel */
export const monitorBezelMat = new THREE.MeshStandardMaterial({
  color: 0x171b1f,
  roughness: 0.85,
  metalness: 0.1,
})

export const towerMat = new THREE.MeshStandardMaterial({
  color: 0x1e293b,
  roughness: 0.45,
  metalness: 0.35,
})

export const screenMat = new THREE.MeshStandardMaterial({
  color: 0x0f172a,
  emissive: BLUE_SOFT,
  emissiveIntensity: 0.5,
  roughness: 0.3,
  metalness: 0.1,
})

export const towerLedMat = new THREE.MeshStandardMaterial({
  color: BLUE,
  emissive: BLUE,
  emissiveIntensity: 1.2,
})

export const activityLedMat = new THREE.MeshStandardMaterial({
  color: 0x0fa958,
  emissive: 0x0fa958,
  emissiveIntensity: 0.6,
})

export const trayMat = new THREE.MeshStandardMaterial({
  color: 0xcdd6e0,
  roughness: 0.6,
  metalness: 0.35,
})

export const lightPanelMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xdfe7f5,
  emissiveIntensity: 0.55,
  roughness: 0.4,
})

export const rackMat = new THREE.MeshStandardMaterial({
  color: 0x1e293b,
  roughness: 0.5,
  metalness: 0.45,
})

export const rackTrimMat = new THREE.MeshStandardMaterial({
  color: 0x0f172a,
  roughness: 0.55,
  metalness: 0.3,
})

export const switchMat = new THREE.MeshStandardMaterial({
  color: 0x475569,
  roughness: 0.5,
  metalness: 0.4,
})

export const apMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.4,
  metalness: 0.05,
})

export const apLedMat = new THREE.MeshStandardMaterial({
  color: 0x22c55e,
  emissive: 0x22c55e,
  emissiveIntensity: 1,
})

export const teacherDeskMat = new THREE.MeshStandardMaterial({
  color: 0x4a3626,
  roughness: 0.5,
  metalness: 0.02,
})

export const wifiMat = new THREE.MeshBasicMaterial({
  color: BLUE,
  transparent: true,
  opacity: 0.55,
  side: THREE.DoubleSide,
  depthWrite: false,
})

export const wallMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.95,
  metalness: 0,
})

export const ceilingMat = new THREE.MeshStandardMaterial({
  color: 0xf1f5f9,
  roughness: 1,
  metalness: 0,
})

export const windowFrameMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.6,
  metalness: 0,
})

export const windowGlassMat = new THREE.MeshStandardMaterial({
  color: 0xbfdbfe,
  emissive: 0x93c5fd,
  emissiveIntensity: 0.28,
  roughness: 0.12,
  metalness: 0.25,
  transparent: true,
  opacity: 0.92,
})

export const projectorMat = new THREE.MeshStandardMaterial({
  color: 0x1e293b,
  roughness: 0.45,
  metalness: 0.4,
})

export const projectorLedMat = new THREE.MeshStandardMaterial({
  color: 0xf87171,
  emissive: 0xf87171,
  emissiveIntensity: 0.9,
})

export const clockFaceMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.7,
  metalness: 0,
})

export const clockHandMat = new THREE.MeshStandardMaterial({
  color: 0x0f172a,
  roughness: 0.4,
  metalness: 0.3,
})

export const exitBodyMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.5,
  metalness: 0.05,
})

export const exitSignMat = new THREE.MeshStandardMaterial({
  color: 0x16a34a,
  emissive: 0x22c55e,
  emissiveIntensity: 0.85,
  roughness: 0.4,
})

export const outletMat = new THREE.MeshStandardMaterial({
  color: 0xe2e8f0,
  roughness: 0.6,
  metalness: 0.1,
})

export const conduitMat = new THREE.MeshStandardMaterial({
  color: 0xcbd5e1,
  roughness: 0.7,
  metalness: 0.3,
})

export const plantPotMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.6,
  metalness: 0,
})

export const plantLeafMat = new THREE.MeshStandardMaterial({
  color: 0x22c55e,
  roughness: 0.85,
  metalness: 0,
  side: THREE.DoubleSide,
})

export const chairMat = new THREE.MeshStandardMaterial({
  color: 0xe2e8f0,
  roughness: 0.7,
  metalness: 0.05,
})

/* Student chair — light grey seat/backrest + dark steel legs */
export const chairSeatMat = new THREE.MeshStandardMaterial({
  color: 0xdbe4ee,
  roughness: 0.6,
  metalness: 0.06,
})

export const chairLegMat = new THREE.MeshStandardMaterial({
  color: 0x2b333d,
  roughness: 0.4,
  metalness: 0.55,
})

/* Keyboard + mouse — matte dark hardware */
export const keyboardMat = new THREE.MeshStandardMaterial({
  color: 0x232a33,
  roughness: 0.5,
  metalness: 0.25,
})

export const mouseMat = new THREE.MeshStandardMaterial({
  color: 0x1d242c,
  roughness: 0.45,
  metalness: 0.3,
})

/* Wall-mounted main display (flat panel next to the whiteboard) */
export const displayMat = new THREE.MeshStandardMaterial({
  color: 0x131a21,
  roughness: 0.55,
  metalness: 0.3,
})

export const displayScreenMat = new THREE.MeshStandardMaterial({
  color: 0x0b1220,
  emissive: BLUE_SOFT,
  emissiveIntensity: 0.55,
  roughness: 0.3,
  metalness: 0.1,
})

/* Floor trunking / patch cables */
export const trunkingMat = new THREE.MeshStandardMaterial({
  color: 0x9aa6b3,
  roughness: 0.55,
  metalness: 0.3,
})

export const cableMat = new THREE.MeshStandardMaterial({
  color: 0x1f2937,
  roughness: 0.6,
  metalness: 0.2,
})

/* Whiteboard — bright white writing surface with a slim aluminium frame */
export const whiteboardMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.42,
  metalness: 0.05,
  emissive: 0xeef4ff,
  emissiveIntensity: 0.12,
})

export const whiteboardFrameMat = new THREE.MeshStandardMaterial({
  color: 0x64748b,
  roughness: 0.35,
  metalness: 0.5,
})

/* Air conditioner unit + vents */
export const acMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.5,
  metalness: 0.04,
})

export const acVentMat = new THREE.MeshStandardMaterial({
  color: 0x475569,
  roughness: 0.6,
  metalness: 0.2,
})

export const acLedMat = new THREE.MeshStandardMaterial({
  color: 0x22c55e,
  emissive: 0x22c55e,
  emissiveIntensity: 1,
})

/* Classroom door */
export const doorMat = new THREE.MeshStandardMaterial({
  color: 0xf1f5f9,
  roughness: 0.55,
  metalness: 0.02,
})

export const doorFrameMat = new THREE.MeshStandardMaterial({
  color: 0xcbd5e1,
  roughness: 0.5,
  metalness: 0.15,
})

export const doorHandleMat = new THREE.MeshStandardMaterial({
  color: 0x94a3b8,
  roughness: 0.2,
  metalness: 0.85,
})

/* Wall skirting — slim baseboard strips */
export const skirtingMat = new THREE.MeshStandardMaterial({
  color: 0xe2e8f0,
  roughness: 0.6,
  metalness: 0.02,
})
