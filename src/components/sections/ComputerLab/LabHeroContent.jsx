import { useTranslation } from 'react-i18next'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import styles from './ComputerLab.module.css'

/* Section label + headline + one-liner. The emphasized tail of the headline
   ("Dirancang untuk Masa Depan.") is tinted blue by EmphasizedText. */
function LabHeroContent() {
  const { t } = useTranslation()

  return (
    <div className={styles.heroContent}>
      <span className={styles.eyebrow}>{t('lab.tag')}</span>
      <h2 className={styles.headline}>
        <EmphasizedText text={t('lab.title')} />
      </h2>
      <p className={styles.desc}>{t('lab.desc')}</p>
    </div>
  )
}

export default LabHeroContent