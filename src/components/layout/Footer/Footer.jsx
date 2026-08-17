import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppMessage, openWhatsApp } from '../../../utils/whatsapp'
import { company } from '../../../data/company'
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
              <img className={styles.brandLogo} src="/images/babasolution-logo.jpg" alt="" />
            </span>
            <span className={styles.brandText} translate="no">
              Baba<strong>Solution</strong>
            </span>
          </Link>
          <p>{t('footer.aboutText')}</p>
          <div className={styles.socials}>
            <a
              href={company.whatsappUrl}
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
              <a href={company.whatsappUrl} onClick={handleWa}>
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
