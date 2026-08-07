import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import {
  FiArrowRight,
  FiCheck,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiHardDrive,
  FiLock,
  FiRefreshCw,
} from 'react-icons/fi'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import Button from '../../ui/Button/Button'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import { useCounter } from '../../../hooks/useCounter'
import { buildWhatsAppMessage, openWhatsApp } from '../../../utils/whatsapp'
import styles from './Hosting.module.css'

/* Hosting — ports the server-room dashboard (ports section 10). Left:
   copy + checks + animated stats + WhatsApp CTA. Right: server panel
   with animated CPU/RAM/SSD meters and status rows. */
const CHECKS = [
  'hosting.check1',
  'hosting.check2',
  'hosting.check3',
  'hosting.check4',
  'hosting.check5',
  'hosting.check6',
]

const DASH_ROWS = [
  { icon: FiCpu, labelKey: 'hosting.dash.cpu', value: '42%', meter: 's1' },
  { icon: FiDatabase, labelKey: 'hosting.dash.ram', value: '68%', meter: 's2' },
  { icon: FiHardDrive, labelKey: 'hosting.dash.ssd', value: '55%', meter: 's3' },
  {
    icon: FiLock,
    labelKey: 'hosting.dash.ssl',
    valueKey: 'hosting.dash.sslValue',
    spillKey: 'hosting.dash.secure',
  },
  {
    icon: FiGlobe,
    labelKey: 'hosting.dash.domain',
    value: 'yourdomain.com',
    spillKey: 'hosting.dash.done',
  },
  {
    icon: FiRefreshCw,
    labelKey: 'hosting.dash.backup',
    valueKey: 'hosting.dash.backupValue',
    spillKey: 'hosting.dash.ok',
  },
]

function Hosting({ id }) {
  const { t } = useTranslation()
  const { ref, inView } = useScrollAnimation()
  const uptime = useCounter({ target: 99.9, decimals: 1, suffix: '%' })
  const ssl = useCounter({ target: 1, suffix: 'GB' })
  const monitor = useCounter({ target: 24, suffix: '/7' })
  const handleWhatsApp = (e) => {
    e.preventDefault()
    openWhatsApp(buildWhatsAppMessage(t))
  }

  return (
    <section className={styles.section} id={id}>
      <div className={clsx('container', styles.inner)}>
        <div className={styles.grid}>
          <div className={clsx(styles.content, 'reveal', inView && 'revealed')} ref={ref}>
            <div className={clsx('head-rule', styles.headRule)}>
              <span>SRV/24</span>
            </div>
            <span className={clsx('tape', styles.tape)}>{t('hosting.tag')}</span>
            <h2 className={clsx('section-title', styles.title)}>
              <EmphasizedText text={t('hosting.title')} className={styles.em} />
            </h2>
            <p className={clsx('section-desc', styles.desc)}>{t('hosting.desc')}</p>

            <ul className={styles.checks}>
              {CHECKS.map((key) => (
                <li key={key} className={styles.checkItem}>
                  <span className={styles.checkMark}>
                    <FiCheck className={styles.icon} aria-hidden="true" />
                  </span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{uptime}</span>
                <span className={styles.statLabel}>{t('hosting.statUptime')}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{ssl}</span>
                <span className={styles.statLabel}>{t('hosting.statFreeSsl')}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{monitor}</span>
                <span className={styles.statLabel}>{t('hosting.statMonitoring')}</span>
              </div>
            </div>

            <Button
              variant="light"
              size="lg"
              className={styles.cta}
              onClick={handleWhatsApp}
              ripple
            >
              {t('hosting.cta')}
              <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
            </Button>
          </div>

          <div className={clsx(styles.visual, 'reveal', inView && 'revealed')} aria-hidden="true">
            <div className={styles.panel}>
              <div className={styles.panelTop}>
                <span className={styles.panelHost}>SRV-BABA-01</span>
                <span className={styles.panelDot} />
                <span className={styles.panelTitle}>{t('hosting.dash.title')}</span>
                <span className={styles.panelOnline}>{t('hosting.dash.online')}</span>
              </div>
              <div className={styles.panelBody}>
                {DASH_ROWS.map((row) => (
                  <div className={styles.row} key={row.labelKey}>
                    <span className={styles.rowIc}>
                      <row.icon className={styles.icon} aria-hidden="true" />
                    </span>
                    <div className={styles.rowMeta}>
                      <span className={styles.rowLabel}>{t(row.labelKey)}</span>
                      <span className={styles.rowVal}>
                        {row.valueKey ? t(row.valueKey) : row.value}
                      </span>
                    </div>
                    {row.meter ? (
                      <span className={styles.meter}>
                        <i className={clsx(styles.meterBar, styles[row.meter])} />
                      </span>
                    ) : (
                      <span className={styles.spill}>{t(row.spillKey)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hosting
