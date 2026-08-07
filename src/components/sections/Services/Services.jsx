import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { services } from '../../../data/services'
import ServiceCard from '../../ui/Card/ServiceCard'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import styles from './Services.module.css'

/* Services grid — rebuilt from translations.js keys + the original
   section CSS. Cards fade up with a 100ms stagger once in view. */
function Services({ showMore = true, id }) {
  const { t } = useTranslation()
  const { ref, inView } = useScrollAnimation()

  return (
    <section className={styles.section} id={id}>
      <div className="container">
        <div className={styles.head}>
          <span className={styles.badge}>{t('services.tag')}</span>
          <h2 className={styles.title}>
            <EmphasizedText text={t('services.title')} variant="blue" />
          </h2>
          <p className={styles.desc}>{t('services.desc')}</p>
        </div>

        <ul className={styles.grid} ref={ref}>
          {services.map((service, i) => (
            <li
              key={service.id}
              className={clsx(styles.cardWrap, inView && styles.inView)}
              style={{ '--svc-delay': `${i * 0.1}s` }}
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        {showMore && (
          <div className={styles.more}>
            <a href="#contact" className={styles.btn}>
              {t('services.more')}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default Services
