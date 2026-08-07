import { useState } from 'react'

/* Detect WebGL support once per page. Used to decide between the
   interactive 3D scene and the SVG fallback. */
function detectWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const attrs = { failIfMajorPerformanceCaveat: true }
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2', attrs) || canvas.getContext('webgl', attrs))
    )
  } catch {
    return false
  }
}

let cached

export function useWebGL() {
  const [supported] = useState(() => {
    if (cached === undefined) cached = detectWebGL()
    return cached
  })
  return supported
}
