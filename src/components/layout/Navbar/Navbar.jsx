import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { FiMenu, FiX } from 'react-icons/fi'
import { useNavbar } from '../../../hooks/useNavbar'
import { buildWhatsAppMessage, openWhatsApp } from '../../../utils/whatsapp'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import Button from '../../ui/Button/Button'
import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/services', labelKey: 'nav.services' },
  { to: '/hosting', labelKey: 'nav.hosting' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
]

function Navbar() {
  const { t } = useTranslation()
  const { scrolled, menuOpen, closeMenu, toggleMenu } = useNavbar()
  const location = useLocation()
  const navigate = useNavigate()

  const handleCta = () => {
    closeMenu()
    navigate('/contact')
    openWhatsApp(buildWhatsAppMessage(t))
  }

  const isActive = (item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)

  return (
    <header
      className={clsx(styles.header, scrolled && styles.scrolled, menuOpen && styles.menuOpen)}
    >
      <nav className={clsx(styles.navbar, 'container')} aria-label={t('aria.nav')}>
        <NavLink to="/" className={styles.brand} aria-label={t('aria.brand')} onClick={closeMenu}>
          <span className={styles.brandIcon} aria-hidden="true">
            <img className={styles.brandLogo} src="/images/babasolution-logo.jpg" alt="" />
          </span>
          <span className={styles.brandText} translate="no">
            Baba<strong>Solution</strong>
          </span>
        </NavLink>

        <ul className={styles.navLinks} id="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={clsx(styles.navLink, isActive(item) && styles.active)}
                onClick={closeMenu}
              >
                {t(item.labelKey)}
              </NavLink>
            </li>
          ))}
          <li className={styles.navCtaMobile}>
            <Button variant="primary" size="sm" className={styles.btn} onClick={handleCta}>
              {t('nav.getStarted')}
            </Button>
          </li>
          <li className={styles.navLang}>
            <LanguageSwitcher full />
          </li>
        </ul>

        <Button
          variant="primary"
          size="sm"
          className={clsx(styles.navCtaDesktop, styles.btn)}
          onClick={handleCta}
        >
          {t('nav.getStarted')}
        </Button>

        <div className={clsx(styles.langDesktop)}>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className={styles.navToggle}
          aria-label={t('aria.toggle')}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={toggleMenu}
        >
          <FiMenu className={clsx(styles.icon, styles.iconMenu)} aria-hidden="true" />
          <FiX className={clsx(styles.icon, styles.iconClose)} aria-hidden="true" />
        </button>
      </nav>
    </header>
  )
}

export default Navbar
