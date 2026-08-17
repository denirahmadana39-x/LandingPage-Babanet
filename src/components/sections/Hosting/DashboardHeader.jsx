import { useTranslation } from 'react-i18next'
import styles from './Hosting.module.css'

/* Dashboard top bar: server id + status server label on the left, a
   pulsing Online status pill on the right. */
function DashboardHeader() {
  const { t } = useTranslation()

  return (
    <div className={styles.panelTop}>
      <div className={styles.panelId}>
        <span className={styles.panelHost}>SRV-BABA-01</span>
        <span className={styles.panelLabel}>{t('hosting.dash.title')}</span>
      </div>
      <span className={styles.statusPill}>
        <span className={styles.statusDot} aria-hidden="true" />
        {t('hosting.dash.online')}
      </span>
    </div>
  )
}

export default DashboardHeader
