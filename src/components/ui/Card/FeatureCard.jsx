import { useTranslation } from 'react-i18next'
import styles from './Card.module.css'

/* Feature card — used in the Computer Laboratory checklist. */
function FeatureCard({ icon: Icon, titleKey, descKey }) {
  const { t } = useTranslation()

  return (
    <li className={styles.featureCard}>
      <span className={styles.featureIcon}>
        <Icon className={styles.icon} aria-hidden="true" />
      </span>
      <div className={styles.featureInfo}>
        <h3>{t(titleKey)}</h3>
        <p>{t(descKey)}</p>
      </div>
    </li>
  )
}

export default FeatureCard
