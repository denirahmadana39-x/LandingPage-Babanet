import { useEffect, useRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import styles from './Card.module.css'

/* Accessible FAQ accordion item — single-open behaviour is managed by the
   parent. Recomputes the answer height when the language or open state
   changes (ports js/faq.js). */
function FAQItem({ index, open, onToggle, questionKey, answerKey }) {
  const { t } = useTranslation()
  const answerRef = useRef(null)

  const number = String(index + 1).padStart(2, '0')

  useEffect(() => {
    const answer = answerRef.current
    if (!answer) return
    if (open) {
      answer.style.maxHeight = `${answer.scrollHeight}px`
    } else {
      answer.style.maxHeight = ''
    }
  }, [open, t])

  return (
    <div className={clsx(styles.faqItem, open && styles.active)}>
      <button type="button" className={styles.faqQuestion} aria-expanded={open} onClick={onToggle}>
        <span className={styles.faqQnum}>Q-{number}</span>
        <span>{t(questionKey)}</span>
        <FiChevronDown className={styles.icon} aria-hidden="true" />
      </button>
      <div className={styles.faqAnswer} ref={answerRef}>
        <p>{t(answerKey)}</p>
      </div>
    </div>
  )
}

export default FAQItem
