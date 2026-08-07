import { useTranslation } from 'react-i18next'
import styles from './Card.module.css'

/* Portfolio card — category tag, title, description and tag chips. */
function PortfolioCard({ item }) {
  const { t } = useTranslation()

  return (
    <article className={styles.portfolioCard}>
      <div className={styles.portfolioTop}>
        <span className={styles.portfolioTag}>{t(`portfolio.category.${item.category}`)}</span>
      </div>
      <h3>{t(item.titleKey)}</h3>
      <p>{t(item.descKey)}</p>
      <ul className={styles.portfolioTags}>
        {item.tags.map((tag) => (
          <li key={tag}>
            <span>{tag}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default PortfolioCard
