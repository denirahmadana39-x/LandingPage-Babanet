import { useEffect, useState } from 'react'
import { formatNumber } from '../i18n'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/* Animated statistic — ports js/counter.js. Triggers once when the
   element passes `elementRef` scrolls into view (IntersectionObserver,
   threshold 0.5). Returns the formatted value string. */
export function useCounter({ target, decimals = 0, suffix = '', duration = 1800, elementRef }) {
  const [value, setValue] = useState(() => formatNumber(0, decimals) + suffix)

  useEffect(() => {
    const el = elementRef ? elementRef.current : null
    if (!el) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId = null
    let observer = null

    const setFinal = () => setValue(formatNumber(target, decimals) + suffix)

    const animate = () => {
      if (reduced) {
        setFinal()
        return
      }
      const startTime = performance.now()
      const tick = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        setValue(formatNumber(target * easeOutCubic(progress), decimals) + suffix)
        if (progress < 1) {
          rafId = requestAnimationFrame(tick)
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    if (!('IntersectionObserver' in window)) {
      animate()
      return undefined
    }

    observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate()
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(el)

    return () => {
      if (observer) observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [target, decimals, suffix, duration, elementRef])

  return value
}

export default useCounter
