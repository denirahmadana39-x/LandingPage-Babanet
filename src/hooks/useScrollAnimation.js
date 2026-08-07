import { useEffect, useRef, useState } from 'react'

/* Generic scroll-reveal observer — ports the IntersectionObserver logic
   from js/animation.js. Reveals the element once (fade-up 34px) and
   unobserves it. Respects prefers-reduced-motion. */
export function useScrollAnimation(options = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -8% 0px' } = options
  const ref = useRef(null)
  const [inView, setInView] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
  })

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return undefined

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, rootMargin, inView])

  return { ref, inView }
}

export default useScrollAnimation
