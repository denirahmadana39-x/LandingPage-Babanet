import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import styles from './Hosting.module.css'

/* Eyebrow + headline + description. The headline tail ("website Anda
   nyala.") is tinted with a light-blue accent for contrast on the dark
   blue background. */
function HostingContent() {
  const { t } = useTranslation()

  return (
    <div className={styles.head}>
      <span className={styles.eyebrow}>{t('hosting.tag')}</span>
      <h2 className={clsx('section-title', styles.title)}>
        <EmphasizedText text={t('hosting.title')} variant="sky" />
      </h2>
      <p className={clsx('section-desc', styles.desc)}>{t('hosting.desc')}</p>
    </div>
  )
}

export default HostingContent
