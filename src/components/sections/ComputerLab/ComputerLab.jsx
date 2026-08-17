import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { FiMaximize, FiMousePointer, FiRotateCw } from 'react-icons/fi'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import { useWebGL } from './useWebGL'
import LabHeroContent from './LabHeroContent'
import LabFeatureList from './LabFeatureList'
import LabCTA from './LabCTA'
import FallbackScene from './FallbackScene'
import styles from './ComputerLab.module.css'

/* Computer Laboratory — a wide, spacious two-column hero (≈45% text /
   55% 3D lab). The 3D viewer is the hero: a live React Three Fiber viewport
   with rotate / zoom / pan, an eased reset and a fullscreen preview. The
   3D chunk is lazy-loaded and the Canvas only mounts once the section scrolls
   into view, so the initial page load stays light. */

const LabCanvas = lazy(() => import('./LabCanvas'))
const LabFullPreview = lazy(() => import('./LabFullPreview'))

/* Mount the WebGL viewer the first time it enters the viewport. */
function useMountInView() {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || mounted) return undefined
    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.04 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted])

  return { ref, mounted }
}

function ComputerLab({ id }) {
  const { t } = useTranslation()
  const { ref, inView } = useScrollAnimation()
  const webgl = useWebGL()
  const apiRef = useRef(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const { ref: viewerRef, mounted } = useMountInView()

  const resetView = () => apiRef.current?.reset()

  return (
    <section className={styles.section} id={id}>
      <div className={clsx('container', styles.wrap)}>
        <div className={styles.grid}>
          {/* LEFT — unified, vertically centered value proposition */}
          <div className={clsx(styles.hero, 'reveal', inView && 'revealed')} ref={ref}>
            <LabHeroContent />
            <LabFeatureList className={styles.features} />
            <LabCTA className={styles.footerCta} />
          </div>

          {/* RIGHT — the 3D laboratory is the main visual */}
          <div className={styles.viewer}>
            <div className={styles.viewport} ref={viewerRef}>
              <div
                className={styles.canvasFrame}
                onDoubleClick={webgl ? resetView : undefined}
                aria-label={t('lab.illustrationAria')}
              >
                {webgl && mounted ? (
                  <Suspense fallback={<SceneLoading />}>
                    <LabCanvas active={inView} apiRef={apiRef} />
                  </Suspense>
                ) : !webgl ? (
                  <FallbackScene className={styles.sceneSvg} />
                ) : (
                  <SceneLoading />
                )}

                {webgl && (
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={resetView}
                    aria-label={t('lab.resetView')}
                  >
                    <FiRotateCw aria-hidden="true" />
                  </button>
                )}
              </div>

              {webgl && (
                <div className={styles.viewerBar}>
                  <p className={styles.hint}>
                    <FiMousePointer aria-hidden="true" />
                    {t('lab.scene.hint')}
                  </p>
                  <button
                    type="button"
                    className={styles.fullBtn}
                    onClick={() => setPreviewOpen(true)}
                  >
                    <FiMaximize aria-hidden="true" />
                    {t('lab.fullPreview')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {webgl && previewOpen && (
        <Suspense fallback={null}>
          <LabFullPreview open onClose={() => setPreviewOpen(false)} />
        </Suspense>
      )}
    </section>
  )
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

export default ComputerLab
