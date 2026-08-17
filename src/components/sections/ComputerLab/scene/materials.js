import * as THREE from 'three'

/* Shared, reusable materials for the low-poly lab. Module-level singletons so
   instanced meshes all point at one material (one GPU program each) and the
   live effects (screen glow, LED blink) animate a single instance. */

const BLUE = 0x2563eb
const BLUE_SOFT = 0x3b82f6
const BLUE_LIGHT = 0xbfdbfe
const BLUE_PALE = 0xdbeafe
const BLUE_MIST = 0xeff6ff
const BLUE_SLATE = 0x315b96
const BLUE_DARK = 0x123574
const BLUE_DEEP = 0x081f4f

/* White-and-blue lab palette: bright work surfaces, blue equipment and
   blue-tinted structural finishes. */
export const deskMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.55,
  metalness: 0.03,
})

/* Desk legs / frames — brushed light metal */
export const deskPedestalMat = new THREE.MeshStandardMaterial({
  color: BLUE_LIGHT,
  roughness: 0.32,
  metalness: 0.65,
})

/* Deep-blue monitor bezel */
export const monitorBezelMat = new THREE.MeshStandardMaterial({
  color: BLUE_DEEP,
  roughness: 0.85,
  metalness: 0.1,
})

export const towerMat = new THREE.MeshStandardMaterial({
  color: BLUE_DARK,
  roughness: 0.45,
  metalness: 0.35,
})

export const screenMat = new THREE.MeshStandardMaterial({
  color: BLUE_DEEP,
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
  color: BLUE_SOFT,
  emissive: BLUE_SOFT,
  emissiveIntensity: 0.6,
})

export const trayMat = new THREE.MeshStandardMaterial({
  color: BLUE_PALE,
  roughness: 0.6,
  metalness: 0.35,
})

export const lightPanelMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  toneMapped: false,
  side: THREE.DoubleSide,
})

export const rackMat = new THREE.MeshStandardMaterial({
  color: BLUE_DARK,
  roughness: 0.5,
  metalness: 0.45,
})

export const rackTrimMat = new THREE.MeshStandardMaterial({
  color: BLUE_DEEP,
  roughness: 0.55,
  metalness: 0.3,
})

export const switchMat = new THREE.MeshStandardMaterial({
  color: BLUE_SLATE,
  roughness: 0.5,
  metalness: 0.4,
})

export const apMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.4,
  metalness: 0.05,
})

export const apLedMat = new THREE.MeshStandardMaterial({
  color: BLUE_SOFT,
  emissive: BLUE_SOFT,
  emissiveIntensity: 1,
})

export const teacherDeskMat = new THREE.MeshStandardMaterial({
  color: BLUE,
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
  color: BLUE_MIST,
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
  color: BLUE_DARK,
  roughness: 0.45,
  metalness: 0.4,
})

export const projectorLedMat = new THREE.MeshStandardMaterial({
  color: BLUE_SOFT,
  emissive: BLUE_SOFT,
  emissiveIntensity: 0.9,
})

export const clockFaceMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.7,
  metalness: 0,
})

export const clockHandMat = new THREE.MeshStandardMaterial({
  color: BLUE_DEEP,
  roughness: 0.4,
  metalness: 0.3,
})

export const exitBodyMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.5,
  metalness: 0.05,
})

export const exitSignMat = new THREE.MeshStandardMaterial({
  color: BLUE,
  emissive: BLUE_SOFT,
  emissiveIntensity: 0.85,
  roughness: 0.4,
})

export const outletMat = new THREE.MeshStandardMaterial({
  color: BLUE_PALE,
  roughness: 0.6,
  metalness: 0.1,
})

export const conduitMat = new THREE.MeshStandardMaterial({
  color: BLUE_LIGHT,
  roughness: 0.7,
  metalness: 0.3,
})

export const plantPotMat = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.6,
  metalness: 0,
})

export const plantLeafMat = new THREE.MeshStandardMaterial({
  color: BLUE_SOFT,
  roughness: 0.85,
  metalness: 0,
  side: THREE.DoubleSide,
})

export const chairMat = new THREE.MeshStandardMaterial({
  color: BLUE_PALE,
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
  color: BLUE_SLATE,
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
  color: BLUE_SLATE,
  roughness: 0.6,
  metalness: 0.2,
})

export const acLedMat = new THREE.MeshStandardMaterial({
  color: BLUE_SOFT,
  emissive: BLUE_SOFT,
  emissiveIntensity: 1,
})

/* Classroom door */
export const doorMat = new THREE.MeshStandardMaterial({
  color: BLUE_MIST,
  roughness: 0.55,
  metalness: 0.02,
})

export const doorFrameMat = new THREE.MeshStandardMaterial({
  color: BLUE_LIGHT,
  roughness: 0.5,
  metalness: 0.15,
})

export const doorHandleMat = new THREE.MeshStandardMaterial({
  color: BLUE_SLATE,
  roughness: 0.2,
  metalness: 0.85,
})

/* Wall skirting — slim baseboard strips */
export const skirtingMat = new THREE.MeshStandardMaterial({
  color: BLUE_PALE,
  roughness: 0.6,
  metalness: 0.02,
})

/* Peripherals — dark desk kit: keyboard tray + mouse + monitor stand */
export const keyboardMat = new THREE.MeshStandardMaterial({
  color: BLUE_DARK,
  roughness: 0.55,
  metalness: 0.25,
})

export const keycapMat = new THREE.MeshStandardMaterial({
  color: BLUE_DEEP,
  roughness: 0.3,
  metalness: 0.3,
})

export const mouseMat = new THREE.MeshStandardMaterial({
  color: BLUE_DARK,
  roughness: 0.48,
  metalness: 0.2,
})

export const monitorStandMat = new THREE.MeshStandardMaterial({
  color: BLUE_DARK,
  roughness: 0.5,
  metalness: 0.3,
})

/* Student chair — soft-edged light grey shell + small darker accents */
export const chairSeatMat = new THREE.MeshStandardMaterial({
  color: BLUE_MIST,
  roughness: 0.6,
  metalness: 0.02,
})

export const chairAccentMat = new THREE.MeshStandardMaterial({
  color: BLUE_SOFT,
  roughness: 0.55,
  metalness: 0.05,
})

export const chairLegMat = new THREE.MeshStandardMaterial({
  color: BLUE_SLATE,
  roughness: 0.35,
  metalness: 0.6,
})

/* Modern student chair — charcoal cantilever frame (the two side profiles)
   and a neutral, softly plastic foam seat/back. Frame keeps a faint blue-grey
   so it reads as Baba-neutral rather than pure black. */
export const chairFrameMat = new THREE.MeshStandardMaterial({
  color: BLUE_DARK,
  roughness: 0.55,
  metalness: 0.35,
})

export const chairPadMat = new THREE.MeshStandardMaterial({
  color: BLUE_SLATE,
  roughness: 0.82,
  metalness: 0.03,
})

/* Slim metal side frame of the training desks */
export const deskSideMat = new THREE.MeshStandardMaterial({
  color: BLUE_LIGHT,
  roughness: 0.35,
  metalness: 0.68,
})

/* Floor trim / threshold accents */
export const trimMat = new THREE.MeshStandardMaterial({
  color: BLUE_PALE,
  roughness: 0.7,
  metalness: 0.15,
})
