import { lazy, Suspense, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  FiActivity,
  FiArrowRight,
  FiBookOpen,
  FiGrid,
  FiMaximize,
  FiMonitor,
  FiMousePointer,
  FiRadio,
  FiRotateCw,
  FiServer,
  FiSettings,
  FiShield,
} from 'react-icons/fi'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import Button from '../../ui/Button/Button'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import FallbackScene from './FallbackScene'
import { useWebGL } from './useWebGL'
import styles from './ComputerLab.module.css'

/* Computer Laboratory — the left column is an interactive 3D miniature
   classroom (React Three Fiber, lazy-loaded). The original isometric SVG is
   kept as the WebGL fallback so the section degrades gracefully. A controls
   bar below the viewer offers reset + a fullscreen modal preview. */

const LabCanvas = lazy(() => import('./LabCanvas'))
const LabFullPreview = lazy(() => import('./LabFullPreview'))

const FEATURES = [
  { key: 'lab.feat1', Icon: FiGrid },
  { key: 'lab.feat2', Icon: FiRadio },
  { key: 'lab.feat3', Icon: FiServer },
  { key: 'lab.feat4', Icon: FiActivity },
  { key: 'lab.feat5', Icon: FiMonitor },
  { key: 'lab.feat6', Icon: FiSettings },
  { key: 'lab.feat7', Icon: FiBookOpen },
  { key: 'lab.feat8', Icon: FiShield },
]

/* Premium checklist — each row slides in from the right in sequence once the
   section is in view, matching the 3D scene's wake-up choreography. */
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 26 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
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
  const apiRef = useRef(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <section className={styles.section} id={id}>
      <div className="container">
        <div className={styles.grid}>
          <div className={clsx(styles.visual, 'reveal', inView && 'revealed')} ref={ref}>
            <div className={styles.frame}>
              {webgl ? (
                <Suspense fallback={<SceneLoading />}>
                  <LabCanvas active={inView} apiRef={apiRef} />
                </Suspense>
              ) : (
                <FallbackScene className={styles.sceneSvg} />
              )}
            </div>

            {webgl && (
              <div className={styles.controls}>
                <p className={styles.hintText} aria-hidden="true">
                  <FiMousePointer />
                  {t('lab.scene.hint')}
                </p>
                <div className={styles.controlsActions}>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    className={styles.controlBtn}
                    onClick={() => setPreviewOpen(true)}
                  >
                    <FiMaximize className="icon" aria-hidden="true" />
                    {t('lab.fullPreview')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    className={styles.controlBtn}
                    onClick={() => apiRef.current?.reset()}
                  >
                    <FiRotateCw className="icon" aria-hidden="true" />
                    {t('lab.resetView')}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.content}>
            <motion.span
              className={styles.badge}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {t('lab.tag')}
            </motion.span>
            <h2 className={styles.title}>
              <EmphasizedText text={t('lab.title')} variant="blue" />
            </h2>
            <p className={styles.desc}>{t('lab.desc')}</p>

            <motion.ul
              className={styles.features}
              variants={listVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              aria-label={t('lab.featuresAria')}
            >
              {FEATURES.map(({ key, Icon }) => (
                <motion.li key={key} className={styles.feature} variants={itemVariants}>
                  <span className={styles.featureIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <span>{t(key)}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className={styles.ctaRow}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.95, ease: 'easeOut' }}
            >
              <Button to="/contact" variant="primary" size="lg" className={styles.cta}>
                {t('lab.cta')}
                <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
              </Button>
              {webgl && (
                <Button
                  variant="outline"
                  size="lg"
                  type="button"
                  className={styles.ctaOutline}
                  onClick={() => setPreviewOpen(true)}
                >
                  <FiMaximize className="icon" aria-hidden="true" />
                  {t('lab.ctaSecondary')}
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {webgl && (
        <Suspense fallback={null}>
          <LabFullPreview open={previewOpen} onClose={() => setPreviewOpen(false)} />
        </Suspense>
      )}
    </section>
  )
}

export default ComputerLab
