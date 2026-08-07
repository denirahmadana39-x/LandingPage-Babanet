import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

/* Shared state for the 3D lab scene.
   - intro: a ref to { t: 0..1 } driving the 2s entrance choreography.
   - hover: the currently hovered object ({ key, position, title, desc }) or null. */
const LabSceneContext = createContext(null)

export function useLabScene() {
  const ctx = useContext(LabSceneContext)
  if (!ctx) {
    throw new Error('useLabScene must be used inside the LabCanvas provider')
  }
  return ctx
}

/* Intro timeline ref. The actual frame stepping happens inside the Canvas
   (see IntroDriver in LabCanvas) so useFrame stays within the renderer. */
export function useIntroRef(active, reduced, duration = 2) {
  const intro = useRef({ t: reduced ? 1 : 0, done: reduced, duration })

  useEffect(() => {
    if (active) {
      intro.current.t = reduced ? 1 : 0
      intro.current.done = reduced
    }
  }, [active, reduced])

  return intro
}

export function LabSceneProvider({ intro, hover, setHover, children }) {
  const value = useMemo(() => ({ intro, hover, setHover }), [intro, hover, setHover])
  return <LabSceneContext.Provider value={value}>{children}</LabSceneContext.Provider>
}

/* Utility: manage the hover state and cursor on the canvas element. */
export function useHoverState() {
  const [hover, setHoverState] = useState(null)
  const [interacted, setInteracted] = useState(false)

  const setHover = useCallback((key, position) => {
    setHoverState(key && position ? { key, position: Array.from(position) } : null)
    setInteracted(true)
  }, [])

  const markInteracted = useCallback(() => setInteracted(true), [])

  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hover])

  return { hover, setHover, interacted, setInteracted, markInteracted }
}
