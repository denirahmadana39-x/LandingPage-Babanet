import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import styles from './Hosting.module.css'

/* One animated resource meter (CPU / RAM / SSD). The fill width animates
   from 0 to the current value when the dashboard enters view, then tracks
   live updates as the value drifts. */
function ResourceMetric({ labelKey, value, active, tone = 'blue' }) {
  const { t } = useTranslation()

  return (
    <div className={styles.metric}>
      <div className={styles.metricHead}>
        <span className={styles.metricLabel}>{t(labelKey)}</span>
        <span className={styles.metricValue}>{value}%</span>
      </div>
      <div className={styles.meter}>
        <i
          className={clsx(styles.meterBar, styles[tone])}
          style={{ width: active ? `${value}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default ResourceMetric
