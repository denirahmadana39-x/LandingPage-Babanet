import { useEffect, useRef, useState } from 'react'

const BASE = { cpu: 42, ram: 68, ssd: 55 }

/* Simulated, local-only server metrics for the hosting dashboard.
   Values drift slightly around a baseline so the panel feels alive, but
   stay within a trustworthy range. Swap this hook's return with real
   fetched data later to connect a live hosting API. */
export function useHostingMetrics(active) {
  const [metrics, setMetrics] = useState({ ...BASE })
  const timer = useRef(null)

  useEffect(() => {
    if (!active) return undefined

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const drift = (value, min, max, step) => {
      const next = value + (Math.random() - 0.5) * step
      return Math.min(max, Math.max(min, Math.round(next)))
    }

    timer.current = setInterval(() => {
      setMetrics((m) => ({
        cpu: drift(m.cpu, 34, 52, 6),
        ram: drift(m.ram, 60, 76, 5),
        ssd: BASE.ssd,
      }))
    }, 2200)

    return () => clearInterval(timer.current)
  }, [active])

  return metrics
}

export default useHostingMetrics
