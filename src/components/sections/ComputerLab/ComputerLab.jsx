import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiBookOpen,
  FiCpu,
  FiGrid,
  FiRadio,
  FiServer,
  FiSettings,
  FiShare2,
} from 'react-icons/fi'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import Button from '../../ui/Button/Button'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import FallbackScene from './FallbackScene'
import { useWebGL } from './useWebGL'
import { WHATSAPP_NUMBER } from '../../../utils/whatsapp'
import styles from './ComputerLab.module.css'

/* Computer Laboratory — the left column is an interactive 3D classroom
   (React Three Fiber, lazy-loaded), the right column carries the value
   proposition, a compact service list and a single WhatsApp CTA. The SVG
   diorama stays as the WebGL fallback so the section degrades gracefully. */

const LabCanvas = lazy(() => import('./LabCanvas'))

const SERVICES = [
  { key: 'lab.feat1', Icon: FiGrid },
  { key: 'lab.feat2', Icon: FiRadio },
  { key: 'lab.feat3', Icon: FiServer },
  { key: 'lab.feat4', Icon: FiShare2 },
  { key: 'lab.feat5', Icon: FiCpu },
  { key: 'lab.feat6', Icon: FiSettings },
  { key: 'lab.feat7', Icon: FiBookOpen },
]

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 22 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function SceneLoading() {
  const { t } = useTranslation()
  return (
    <div className={styles.loading} role="status">
      <span className={styles.loadingBar} />
      <span className={styles.loadingText}>{t('lab.scene.loading')}</span>
    </div>
  )
}

function ComputerLab({ id }) {
  const { t } = useTranslation()
  const { ref, inView } = useScrollAnimation()
  const webgl = useWebGL()
  /* `inView` is monotonic (the observer unobserves once triggered), so the
     heavy three.js chunk is fetched only when the section scrolls into view. */
  const sceneOn = webgl && inView

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t('lab.whatsapp.message')
  )}`

  return (
    <section className={styles.section} id={id}>
      <div className="container">
        <div className={styles.grid}>
          {/* copy top: eyebrow, heading, description */}
          <div className={styles.contentTop}>
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {t('lab.tag')}
            </motion.span>
            <h2 className={styles.title}>
              <EmphasizedText text={t('lab.title')} variant="blue" />
            </h2>
            <p className={styles.desc}>{t('lab.desc')}</p>
          </div>

          {/* visual: the 3D laboratory */}
          <div className={clsx(styles.visual, 'reveal', inView && 'revealed')} ref={ref}>
            <div className={styles.frame}>
              {sceneOn ? (
                <Suspense fallback={<SceneLoading />}>
                  <LabCanvas active={inView} />
                </Suspense>
              ) : (
                <FallbackScene className={styles.sceneSvg} />
              )}
            </div>
          </div>

          {/* services + CTA */}
          <div className={styles.contentBottom}>
            <motion.ul
              className={styles.services}
              variants={listVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              aria-label={t('lab.featuresAria')}
            >
              {SERVICES.map(({ key, Icon }) => (
                <motion.li key={key} className={styles.service} variants={itemVariants}>
                  <span className={styles.serviceIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <span className={styles.serviceText}>{t(key)}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className={styles.ctaRow}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
            >
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className={styles.cta}
              >
                {t('lab.cta')}
                <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComputerLab