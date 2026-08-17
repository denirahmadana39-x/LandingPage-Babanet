import { useTranslation } from 'react-i18next'
import {
  FiActivity,
  FiBriefcase,
  FiClipboard,
  FiHeadphones,
  FiSearch,
  FiTool,
} from 'react-icons/fi'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import styles from './Process.module.css'

const STEPS = [
  { num: '01', icon: FiBriefcase, titleKey: 'process.step1.title', descKey: 'process.step1.desc' },
  { num: '02', icon: FiSearch, titleKey: 'process.step2.title', descKey: 'process.step2.desc' },
  { num: '03', icon: FiClipboard, titleKey: 'process.step3.title', descKey: 'process.step3.desc' },
  { num: '04', icon: FiTool, titleKey: 'process.step4.title', descKey: 'process.step4.desc' },
  { num: '05', icon: FiActivity, titleKey: 'process.step5.title', descKey: 'process.step5.desc' },
  { num: '06', icon: FiHeadphones, titleKey: 'process.step6.title', descKey: 'process.step6.desc' },
]

function Process({ id }) {
  const { t } = useTranslation()

  return (
    <section className={`section section-paper ${styles.section}`} id={id}>
      <div className="container">
        <div className={`section-head reveal`}>
          <div className="head-rule" />
          <span className="tape">{t('process.tag')}</span>
          <h2 className="section-title">
            <EmphasizedText text={t('process.title')} />
          </h2>
          <p className="section-desc">{t('process.desc')}</p>
        </div>

        <ol className={styles.grid}>
          {STEPS.map(({ num, icon: Icon, titleKey, descKey }) => (
            <li className={`${styles.step} reveal`} key={num}>
              <span className={styles.num}>{num}</span>
              <span className={styles.icon}>
                <Icon className={styles.ico} aria-hidden="true" />
              </span>
              <h3>{t(titleKey)}</h3>
              <p>{t(descKey)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
