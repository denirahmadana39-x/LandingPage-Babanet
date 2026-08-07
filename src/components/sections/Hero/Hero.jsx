import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiArrowRight,
  FiCheck,
  FiMonitor,
  FiServer,
  FiShare2,
  FiTool,
  FiVideo,
  FiWifi,
} from 'react-icons/fi'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import Button from '../../ui/Button/Button'
import { openWhatsApp } from '../../../utils/whatsapp'
import styles from './Hero.module.css'

const DOTS = [
  { x: '8%', y: '18%', s: '5px', d: '0s', t: '8s', dx: '20px', dy: '-14px' },
  { x: '26%', y: '12%', s: '4px', d: '1.2s', t: '7s', dx: '-14px', dy: '16px' },
  { x: '44%', y: '24%', s: '3px', d: '.6s', t: '9s', dx: '16px', dy: '12px' },
  { x: '64%', y: '10%', s: '6px', d: '2.1s', t: '7.5s', dx: '-18px', dy: '-10px' },
  { x: '82%', y: '22%', s: '4px', d: '.3s', t: '8.5s', dx: '14px', dy: '18px' },
  { x: '94%', y: '42%', s: '5px', d: '1.7s', t: '7s', dx: '-16px', dy: '-16px' },
  { x: '6%', y: '58%', s: '4px', d: '2.6s', t: '9s', dx: '18px', dy: '14px' },
  { x: '20%', y: '78%', s: '5px', d: '.9s', t: '8s', dx: '-14px', dy: '-18px' },
  { x: '38%', y: '66%', s: '3px', d: '3.1s', t: '7.5s', dx: '12px', dy: '16px' },
  { x: '58%', y: '86%', s: '4px', d: '1.5s', t: '9s', dx: '-16px', dy: '-12px' },
  { x: '76%', y: '72%', s: '3px', d: '2.2s', t: '8s', dx: '14px', dy: '10px' },
  { x: '92%', y: '84%', s: '6px', d: '.4s', t: '7s', dx: '-12px', dy: '-20px' },
]

const TRUST_KEYS = ['hero.trust1', 'hero.trust2', 'hero.trust3', 'hero.trust4']

const RAIL_KEYS = [
  'services.webHosting.title',
  'hero.webdev',
  'services.wifi.title',
  'services.cctv.title',
  'services.lab.title',
  'services.assembly.title',
  'services.repair.title',
  'services.network.title',
  'services.consult.title',
]

const DASH_CARDS = [
  {
    icon: FiServer,
    nameKey: 'services.webHosting.title',
    led: 'ok',
    statusKey: 'dash.hosting.status',
    valueKey: 'dash.hosting.value',
    tx: '-8px',
    ty: '0px',
    depth: '0.05',
  },
  {
    icon: FiWifi,
    nameKey: 'services.wifi.title',
    led: 'blue',
    statusKey: 'dash.wifi.status',
    valueKey: 'dash.wifi.value',
    tx: '10px',
    ty: '-4px',
    depth: '0.07',
  },
  {
    icon: FiVideo,
    nameKey: 'services.cctv.title',
    led: 'blue',
    statusKey: 'dash.cctv.status',
    valueKey: 'dash.cctv.value',
    tx: '-12px',
    ty: '-2px',
    depth: '0.04',
  },
  {
    icon: FiMonitor,
    nameKey: 'services.lab.title',
    led: 'blue',
    statusKey: 'dash.lab.status',
    valueKey: 'dash.lab.value',
    tx: '8px',
    ty: '4px',
    depth: '0.06',
  },
  {
    icon: FiTool,
    nameKey: 'services.repair.title',
    led: 'amber',
    statusKey: 'dash.laptop.status',
    valueKey: 'dash.laptop.value',
    tx: '-6px',
    ty: '-2px',
    depth: '0.05',
  },
  {
    icon: FiShare2,
    nameKey: 'services.network.title',
    led: 'pulse',
    statusKey: 'dash.infra.status',
    valueKey: 'dash.infra.value',
    tx: '12px',
    ty: '2px',
    depth: '0.08',
  },
]

const pad = (n) => String(n).padStart(2, '0')

function Hero() {
  const { t } = useTranslation()
  const dashRef = useRef(null)
  const [clock, setClock] = useState('00:00:00')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setClock(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const heroDash = dashRef.current
    if (!heroDash) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reduced || !finePointer) return undefined

    const dashCards = heroDash.querySelectorAll('[data-depth]')
    if (!dashCards.length) return undefined

    const resetParallax = () => {
      dashCards.forEach((card) => {
        card.style.setProperty('--mx', '0px')
        card.style.setProperty('--my', '0px')
      })
    }

    let rafId = null
    const onMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const rect = heroDash.getBoundingClientRect()
        const cx = (e.clientX - rect.left) / rect.width - 0.5
        const cy = (e.clientY - rect.top) / rect.height - 0.5

        dashCards.forEach((card) => {
          const depth = parseFloat(card.dataset.depth || '0')
          card.style.setProperty('--mx', `${(-cx * depth * 120).toFixed(2)}px`)
          card.style.setProperty('--my', `${(-cy * depth * 90).toFixed(2)}px`)
        })
        rafId = null
      })
    }

    heroDash.addEventListener('mousemove', onMove)
    heroDash.addEventListener('mouseleave', resetParallax)
    return () => {
      heroDash.removeEventListener('mousemove', onMove)
      heroDash.removeEventListener('mouseleave', resetParallax)
    }
  }, [])

  const handleCta = (e) => {
    e.preventDefault()
    openWhatsApp()
  }

  const ledClass = (led) => {
    if (led === 'ok') return styles.ledOk
    if (led === 'amber') return styles.ledAmber
    if (led === 'pulse') return `${styles.ledBlue} ${styles.ledPulse}`
    return styles.ledBlue
  }

  return (
    <section className={styles.hero} id="home">
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.grid} />
        <div className={styles.aurora} />
        <span className={`${styles.blur} ${styles.blurA}`} />
        <span className={`${styles.blur} ${styles.blurB}`} />
        <span className={`${styles.blur} ${styles.blurC}`} />
        {DOTS.map((dot, i) => (
          <span
            key={i}
            className={styles.dot}
            style={{
              '--x': dot.x,
              '--y': dot.y,
              '--s': dot.s,
              '--d': dot.d,
              '--t': dot.t,
              '--dx': dot.dx,
              '--dy': dot.dy,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>{t('hero.badge')}</span>
          </span>

          <h1 className={styles.title}>
            <EmphasizedText text={t('hero.title')} variant="gradient" />
          </h1>

          <p className={styles.subtitle}>{t('hero.desc')}</p>

          <div className={styles.actions}>
            <Button
              href="#contact"
              variant="heroPrimary"
              className={styles.btnHero}
              onClick={handleCta}
            >
              {t('hero.ctaFree')}
              <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
            </Button>
          </div>

          <ul className={styles.trust}>
            {TRUST_KEYS.map((key) => (
              <li key={key}>
                <FiCheck className={`icon ${styles.trustIcon}`} aria-hidden="true" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>

          <div className={styles.rail} aria-label={t('hero.railLabel')}>
            {RAIL_KEYS.map((key) => (
              <span className={styles.railItem} key={key}>
                {t(key)}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.dash} ref={dashRef} aria-label={t('hero.dashLabel')}>
          <div className={styles.dashGlow} aria-hidden="true" />
          <div className={styles.console}>
            <div className={styles.consoleHead}>
              <span className={styles.consoleTitle}>BABA-SOLUTION &middot; NOC</span>
              <span className={styles.consoleLive}>
                <i className={styles.consoleLed} aria-hidden="true" />
                <span>{t('dash.live')}</span>
              </span>
              <span className={styles.consoleClock} aria-hidden="true">
                {clock}
              </span>
            </div>

            <div className={styles.dashGrid}>
              {DASH_CARDS.map((card, i) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.nameKey}
                    className={styles.dashCard}
                    style={{ '--i': i, '--tx': card.tx, '--ty': card.ty }}
                    data-depth={card.depth}
                  >
                    <span className={styles.dashIco}>
                      <Icon className={`icon ${styles.dashIcon}`} aria-hidden="true" />
                    </span>
                    <span className={styles.dashInfo}>
                      <span className={styles.dashName}>{t(card.nameKey)}</span>
                      <span className={styles.dashMeta}>
                        <i
                          className={`${styles.dashLed} ${ledClass(card.led)}`}
                          aria-hidden="true"
                        />
                        <span>{t(card.statusKey)}</span>
                      </span>
                    </span>
                    <span className={styles.dashValue}>{t(card.valueKey)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
