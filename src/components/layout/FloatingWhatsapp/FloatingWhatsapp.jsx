import { FaWhatsapp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { buildWhatsAppMessage, openWhatsApp } from '../../../utils/whatsapp'
import styles from './FloatingWhatsapp.module.css'

/* Floating WhatsApp button — ports the .wa-float button. Opens WhatsApp
   with the shared greeting (no backend). */
function FloatingWhatsapp() {
  const { t } = useTranslation()

  return (
    <a
      href="https://wa.me/6281281640680"
      className={styles.float}
      aria-label="WhatsApp"
      onClick={(e) => {
        e.preventDefault()
        openWhatsApp(buildWhatsAppMessage(t))
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className={styles.icon} aria-hidden="true" />
    </a>
  )
}

export default FloatingWhatsapp
