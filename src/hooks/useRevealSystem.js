import { useEffect, useRef } from 'react'

/* Page-level scroll-reveal driver — ports js/animation.js verbatim.
   Call once per page. Observes every element with the global `.reveal`
   class and reveals it (plus staggered children) when it enters the
   viewport. Respects prefers-reduced-motion. Pass a `pathname` so the
   scan re-runs on route changes (lazy pages render after mount). */
export function useRevealSystem(pathname) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const revealEls = Array.from(root.querySelectorAll('.reveal'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add('revealed'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return
          const parent = entry.target
          parent.querySelectorAll('.reveal').forEach((child, i) => {
            child.style.setProperty('--reveal-delay', `${i * 0.09}s`)
          })
          entry.target.style.setProperty('--reveal-delay', `${index * 0.05}s`)
          entry.target.classList.add('revealed')
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    revealEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return rootRef
}

export default useRevealSystem
