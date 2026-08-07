import { useTranslation } from 'react-i18next'
import {
  FiArrowRight,
  FiAward,
  FiClock,
  FiDollarSign,
  FiHeadphones,
  FiShield,
} from 'react-icons/fi'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import Button from '../../ui/Button/Button'
import styles from './WhyChooseUs.module.css'

const FEATURES = [
  { icon: FiAward, titleKey: 'about.feat1.title', descKey: 'about.feat1.desc' },
  { icon: FiClock, titleKey: 'about.feat2.title', descKey: 'about.feat2.desc' },
  { icon: FiShield, titleKey: 'about.feat3.title', descKey: 'about.feat3.desc' },
  { icon: FiDollarSign, titleKey: 'about.feat4.title', descKey: 'about.feat4.desc' },
  { icon: FiHeadphones, titleKey: 'about.feat5.title', descKey: 'about.feat5.desc' },
]

const BAR = [
  { value: '5+', labelKey: 'about.statYears' },
  { value: '500+', labelKey: 'about.statProjects' },
  { value: '300+', labelKey: 'about.statClients' },
  { value: '24/7', labelKey: 'about.statSupport' },
]

function WhyChooseUs({ id }) {
  const { t } = useTranslation()

  return (
    <section className={styles.section} id={id}>
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.copy} reveal`}>
          <span className={styles.badge}>{t('about.tag')}</span>
          <h2 className={styles.title}>
            <EmphasizedText text={t('about.title')} variant="blue" />
          </h2>
          <p className={styles.desc}>{t('about.desc')}</p>

          <Button to="/contact" variant="primary" size="lg" className={styles.cta}>
            {t('about.cta')}
            <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Button>
        </div>

        <div className={styles.side}>
          <ul className={styles.list} aria-label={t('about.featuresAria')}>
            {FEATURES.map(({ icon: Icon, titleKey, descKey }) => (
              <li className={`${styles.card} reveal`} key={titleKey}>
                <span className={styles.ico}>
                  <Icon className={`icon ${styles.icoIcon}`} aria-hidden="true" />
                </span>
                <div className={styles.info}>
                  <h3>{t(titleKey)}</h3>
                  <p>{t(descKey)}</p>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  <FiArrowRight className={`icon ${styles.arrowIcon}`} />
                </span>
              </li>
            ))}
          </ul>

          <ul className={styles.bar} aria-label={t('about.statsAria')}>
            {BAR.map((stat) => (
              <li className={styles.stat} key={stat.labelKey}>
                <strong>{stat.value}</strong>
                <span>{t(stat.labelKey)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
