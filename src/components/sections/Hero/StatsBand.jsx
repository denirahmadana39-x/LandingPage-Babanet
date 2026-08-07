import { useTranslation } from 'react-i18next'
import StatCard from '../../ui/Card/StatCard'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import clsx from 'clsx'
import styles from './StatsBand.module.css'

function StatsBand() {
  const { t } = useTranslation()
  const { ref, inView } = useScrollAnimation()

  return (
    <section className={styles.band} aria-label={t('stats.label')}>
      <div className={clsx('container', styles.inner, 'reveal', inView && 'revealed')} ref={ref}>
        <span className={styles.eyebrow}>{t('stats.eyebrow')}</span>
        <div className={styles.grid}>
          <StatCard counter={500} suffix="+" label={t('stats.projects')} />
          <StatCard counter={300} suffix="+" label={t('stats.clients')} />
          <StatCard counter={99.9} decimals={1} suffix="%" label={t('stats.satisfaction')} />
          <StatCard staticText="24/7" label={t('stats.support')} />
        </div>
      </div>
      <svg
        className={styles.divider}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 64 C 240 92, 480 18, 720 34 C 960 50, 1200 86, 1440 42 L1440 90 L0 90 Z" />
      </svg>
    </section>
  )
}

export default StatsBand
