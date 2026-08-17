import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import styles from './Hosting.module.css'

/* Generic status row used by SSL / Domain / Backup. Communicates state
   with both a text value and a coloured badge — never colour alone. */
function StatusRow({ icon: Icon, labelKey, value, valueKey, badgeKey, tone = 'green' }) {
  const { t } = useTranslation()

  return (
    <div className={styles.statusRow}>
      <span className={styles.statusIc} aria-hidden="true">
        <Icon className={styles.icon} />
      </span>
      <div className={styles.statusMeta}>
        <span className={styles.statusLabel}>{t(labelKey)}</span>
        <span className={styles.statusValue}>{valueKey ? t(valueKey) : value}</span>
      </div>
      <span className={clsx(styles.badge, styles[`badge_${tone}`])}>{t(badgeKey)}</span>
    </div>
  )
}

export default StatusRow
