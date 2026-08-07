import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import styles from './Card.module.css'

/* Service card — links to the contact page with the service preselected. */
function ServiceCard({ service }) {
  const { t } = useTranslation()
  const Icon = service.icon

  return (
    <Link to={`/contact?service=${service.id}`} className={styles.serviceCard}>
      <span className={styles.serviceIcon}>
        <Icon className={styles.icon} aria-hidden="true" />
      </span>
      <h3 className={styles.serviceName}>{t(service.titleKey)}</h3>
      <p className={styles.serviceText}>{t(service.descKey)}</p>
      <span className={styles.serviceArrow} aria-hidden="true">
        <FiArrowRight className={styles.icon} />
      </span>
    </Link>
  )
}

export default ServiceCard
