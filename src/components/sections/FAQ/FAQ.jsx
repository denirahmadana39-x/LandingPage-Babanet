import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { FiArrowRight, FiHeadphones } from 'react-icons/fi'
import { faqItems } from '../../../data/faq'
import FAQItem from '../../ui/Card/FAQItem'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import { buildWhatsAppMessage, openWhatsApp } from '../../../utils/whatsapp'
import styles from './FAQ.module.css'

/* FAQ — single-open accordion (ports section 11). Left: intro + support
   card. Right: FAQItem list with a controlled open index. */
function FAQ({ id }) {
  const { t } = useTranslation()
  const { ref, inView } = useScrollAnimation()
  const [openIndex, setOpenIndex] = useState(0)

  const handleWhatsApp = (e) => {
    e.preventDefault()
    openWhatsApp(buildWhatsAppMessage(t))
  }

  return (
    <section className={clsx('section section-paper', styles.section)} id={id}>
      <div className={clsx('container', styles.grid)}>
        <div className={clsx(styles.intro, 'reveal', inView && 'revealed')} ref={ref}>
          <div className="head-rule head-rule-left">
            <span>SUP/05</span>
          </div>
          <span className="tape">{t('faq.tag')}</span>
          <h2 className="section-title">
            <EmphasizedText text={t('faq.title')} />
          </h2>
          <p className="section-desc">{t('faq.desc')}</p>

          <div className={styles.support}>
            <span className={styles.supportLed}>
              <FiHeadphones className={styles.icon} aria-hidden="true" />
            </span>
            <div>
              <strong>{t('faq.supportTitle')}</strong>
              <p>{t('faq.supportDesc')}</p>
              <a
                href="#contact"
                className={clsx('text-link', styles.supportLink)}
                onClick={handleWhatsApp}
              >
                <span>{t('faq.contactSupport')}</span>
                <FiArrowRight className={styles.icon} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <ul className={styles.list}>
          {faqItems.map((item, i) => (
            <li key={item.id}>
              <FAQItem
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                questionKey={item.questionKey}
                answerKey={item.answerKey}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FAQ
