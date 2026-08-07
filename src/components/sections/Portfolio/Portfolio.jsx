import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { FiArrowRight } from 'react-icons/fi'
import { portfolio, portfolioCategories } from '../../../data/portfolio'
import PortfolioCard from '../../ui/Card/PortfolioCard'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import Button from '../../ui/Button/Button'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import styles from './Portfolio.module.css'

/* Portfolio — filterable project grid. Category tabs filter the cards
   client-side; each card is a PortfolioCard. */
function Portfolio({ id }) {
  const { t } = useTranslation()
  const { ref, inView } = useScrollAnimation()
  const [active, setActive] = useState('all')

  const visible =
    active === 'all' ? portfolio : portfolio.filter((item) => item.category === active)

  return (
    <section className={styles.section} id={id}>
      <div className="container">
        <div className={styles.head}>
          <span className={styles.badge}>{t('portfolio.tag')}</span>
          <h2 className={styles.title}>
            <EmphasizedText text={t('portfolio.title')} variant="blue" />
          </h2>
          <p className={styles.desc}>{t('portfolio.desc')}</p>
        </div>

        <ul className={styles.filters} role="tablist" aria-label="Filter portofolio">
          {portfolioCategories.map((cat) => (
            <li key={cat} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={active === cat}
                className={clsx(styles.tab, active === cat && styles.tabActive)}
                onClick={() => setActive(cat)}
              >
                {t(`portfolio.category.${cat}`)}
              </button>
            </li>
          ))}
        </ul>

        <ul className={styles.grid} ref={ref}>
          {visible.map((item, i) => (
            <li
              key={item.id}
              className={clsx(styles.cardWrap, inView && 'revealed')}
              style={{ '--reveal-delay': `${i * 0.06}s` }}
            >
              <PortfolioCard item={item} />
            </li>
          ))}
        </ul>

        <div className={styles.ctaRow}>
          <Button to="/contact" variant="primary" size="lg" className={styles.cta}>
            {t('portfolio.cta')}
            <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
