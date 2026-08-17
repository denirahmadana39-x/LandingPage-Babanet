import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { FiArrowRight } from 'react-icons/fi'
import Button from '../../ui/Button/Button'
import { buildWhatsAppMessage, openWhatsApp } from '../../../utils/whatsapp'
import styles from './ComputerLab.module.css'

/* Single primary call-to-action → WhatsApp contact flow. */
function LabCTA({ className }) {
  const { t } = useTranslation()

  return (
    <div className={clsx(styles.ctaRow, className)}>
      <Button
        variant="primary"
        type="button"
        className={styles.cta}
        onClick={() => openWhatsApp(buildWhatsAppMessage(t))}
      >
        {t('lab.cta')}
        <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
      </Button>
      <span className={styles.ctaNote}>{t('lab.ctaNote')}</span>
    </div>
  )
}

export default LabCTA