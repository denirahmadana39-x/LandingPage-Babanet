import { useTranslation } from 'react-i18next'
import { FiCheck } from 'react-icons/fi'
import styles from './Hosting.module.css'

/* Compact vertical feature list — small check icon, title, and a short
   supporting line. Deliberately not cards. */
const FEATURES = ['hosting.feat1', 'hosting.feat2', 'hosting.feat3', 'hosting.feat4', 'hosting.feat5', 'hosting.feat6']

function HostingFeatures() {
  const { t } = useTranslation()

  return (
    <ul className={styles.features}>
      {FEATURES.map((key) => (
        <li key={key} className={styles.feature}>
          <span className={styles.featureIcon} aria-hidden="true">
            <FiCheck className={styles.icon} />
          </span>
          <div className={styles.featureText}>
            <strong>{t(`${key}.title`)}</strong>
            <span>{t(`${key}.desc`)}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default HostingFeatures
