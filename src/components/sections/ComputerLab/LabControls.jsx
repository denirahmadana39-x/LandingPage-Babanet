import { useTranslation } from 'react-i18next'
import { FiRotateCw } from 'react-icons/fi'
import styles from './ComputerLab.module.css'

/* Minimal overlay on the inline 3D viewer: a discreet "3D" badge and a quiet
   reset-camera button. The button nudges a counter that CameraRig watches to
   glide the camera back to its hero angle. */
function LabControls({ onReset, compact = false }) {
  const { t } = useTranslation()

  return (
    <div className={styles.viewerUi}>
      <span className={styles.viewerBadge} aria-hidden="true">
        3D
      </span>
      <button
        type="button"
        className={styles.resetBtn}
        onClick={onReset}
        aria-label={t('lab.resetView')}
        title={t('lab.resetView')}
      >
        <FiRotateCw aria-hidden="true" />
        {!compact && <span>{t('lab.resetView')}</span>}
      </button>
    </div>
  )
}

export default LabControls