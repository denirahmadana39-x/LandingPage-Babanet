export const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
