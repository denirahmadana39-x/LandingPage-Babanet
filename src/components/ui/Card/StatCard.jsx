import { useRef } from 'react'
import { useCounter } from '../../../hooks/useCounter'
import styles from './Card.module.css'

/* Animated statistic cell — ports .stat-cell with the counter behaviour
   from js/counter.js. Pass staticText to render a fixed value. */
function StatCard({ counter, decimals = 0, suffix = '', label, staticText }) {
  const elementRef = useRef(null)
  const value = useCounter({ target: counter ?? 0, decimals, suffix, elementRef })

  if (staticText != null) {
    return (
      <div className={styles.statCell}>
        <span className={styles.statNum}>{staticText}</span>
        <span className={styles.statLabel}>{label}</span>
      </div>
    )
  }

  return (
    <div className={styles.statCell}>
      <span ref={elementRef} className={styles.statNum}>
        {value}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

export default StatCard
