import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FiArrowUp } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import styles from './ScrollToTop.module.css'

/* Two behaviours in one component (ports js/app.js + SPA routing):
   - scrolls to the top of the page on every route change
   - shows a back-to-top button once the user scrolls past 600px
*/
function ScrollToTop() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={clsx(styles.backToTop, show && styles.show)}
      aria-label={t('aria.backToTop')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <FiArrowUp className={styles.icon} aria-hidden="true" />
    </button>
  )
}

export default ScrollToTop
