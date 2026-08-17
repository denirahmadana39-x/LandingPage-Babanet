import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import {
  FiBookOpen,
  FiCpu,
  FiGrid,
  FiLink,
  FiServer,
  FiSettings,
  FiWifi,
} from 'react-icons/fi'
import styles from './ComputerLab.module.css'

/* Compact, scannable feature list under the hero copy. Rows use small icons,
   hairline separators and clean typography — deliberately not cards. */
const FEATURES = [
  { key: 'lab.svc1', Icon: FiGrid },
  { key: 'lab.svc2', Icon: FiWifi },
  { key: 'lab.svc3', Icon: FiServer },
  { key: 'lab.svc4', Icon: FiLink },
  { key: 'lab.svc5', Icon: FiCpu },
  { key: 'lab.svc6', Icon: FiSettings },
  { key: 'lab.svc7', Icon: FiBookOpen },
]

function LabFeatureList({ className }) {
  const { t } = useTranslation()

  return (
    <ul className={clsx(styles.featureList, className)} aria-label={t('lab.featuresAria')}>
      {FEATURES.map(({ key, Icon }) => (
        <li key={key} className={styles.feature}>
          <span className={styles.featureIcon} aria-hidden="true">
            <Icon />
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

export default LabFeatureList