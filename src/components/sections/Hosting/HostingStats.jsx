import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useCounter } from '../../../hooks/useCounter'
import styles from './Hosting.module.css'

/* Three compact typographic statistics. The numeric uptime counts up when
   the row scrolls into view; the other two are fixed labels. */
function HostingStats() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const uptime = useCounter({ target: 99.9, decimals: 1, suffix: '%', elementRef: ref })

  return (
    <div className={styles.stats} ref={ref}>
      <div className={styles.stat}>
        <span className={styles.statValue}>{uptime}</span>
        <span className={styles.statLabel}>{t('hosting.statUptime')}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statValue}>SSD</span>
        <span className={styles.statLabel}>{t('hosting.statStorage')}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.statValue}>24/7</span>
        <span className={styles.statLabel}>{t('hosting.statMonitoring')}</span>
      </div>
    </div>
  )
}

export default HostingStats
