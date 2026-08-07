import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppMessage, openWhatsApp } from '../../../utils/whatsapp'
import styles from './Footer.module.css'

function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const handleWa = (e) => {
    e.preventDefault()
    openWhatsApp(buildWhatsAppMessage(t))
  }

  return (
    <footer className={styles.footer}>
      <div className={`${styles.rule} container`}>
        <span>BABA-SOLUTION</span>
      </div>

      <div className={`${styles.grid} container`}>
        <div className={styles.about}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandIcon} aria-hidden="true">
              B
            </span>
            <span className={styles.brandText}>
              Baba<strong>Solution</strong>
            </span>
          </Link>
          <p>{t('footer.aboutText')}</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <FiFacebook className={styles.icon} aria-hidden="true" />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <FiInstagram className={styles.icon} aria-hidden="true" />
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <FiLinkedin className={styles.icon} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/6281281640680"
              className={styles.socialLink}
              aria-label="WhatsApp"
              onClick={handleWa}
            >
              <FaWhatsapp className={styles.icon} aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav className={styles.col} aria-label={t('aria.navFooterCompany')}>
          <h4>{t('footer.company')}</h4>
          <ul>
            <li>
              <Link to="/about">{t('footer.companyAbout')}</Link>
            </li>
            <li>
              <Link to="/services">{t('footer.companyServices')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('footer.companyContact')}</Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.col} aria-label={t('aria.navFooterSupport')}>
          <h4>{t('footer.support')}</h4>
          <ul>
            <li>
              <Link to="/contact">{t('footer.supportFaq')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('footer.supportQuote')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('footer.supportReport')}</Link>
            </li>
            <li>
              <a href="https://wa.me/6281281640680" onClick={handleWa}>
                {t('footer.supportWhatsapp')}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`${styles.bottom} container`}>
        <p>
          &copy; {year} Baba Solution Information Technology. {t('footer.rights')}
        </p>
        <p>{t('footer.tagline')}</p>
      </div>
    </footer>
  )
}

export default Footer
