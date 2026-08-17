import { useTranslation } from 'react-i18next'
import { FiArrowRight } from 'react-icons/fi'
import Button from '../../ui/Button/Button'
import { buildWhatsAppMessage, openWhatsApp } from '../../../utils/whatsapp'
import styles from './Hosting.module.css'

/* Single primary CTA — routes into the existing hosting WhatsApp flow. */
function HostingCTA() {
  const { t } = useTranslation()

  const handleClick = (e) => {
    e.preventDefault()
    openWhatsApp(buildWhatsAppMessage(t))
  }

  return (
    <div className={styles.ctaWrap}>
      <Button
        variant="light"
        size="lg"
        className={styles.cta}
        onClick={handleClick}
        ripple
      >
        {t('hosting.cta')}
        <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
      </Button>
    </div>
  )
}

export default HostingCTA
