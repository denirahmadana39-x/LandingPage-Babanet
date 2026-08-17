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
  const { pathname, hash } = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return undefined
    }

    let attempts = 0
    let timer
    const scrollToHash = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
      if (attempts < 10) {
        attempts += 1
        timer = window.setTimeout(scrollToHash, 50)
      }
    }

    scrollToHash()
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

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
