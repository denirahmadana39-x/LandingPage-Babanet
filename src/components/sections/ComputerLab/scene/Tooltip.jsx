import { Html } from '@react-three/drei'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useLabScene } from './state.jsx'

/* HTML tooltip anchored to the hovered object. `distanceFactor` keeps it
   proportional as the camera zooms; the position is nudged up so it reads as
   a callout above the element. */
const LABELS = {
  teacher: 'lab.scene.teacher',
  computer: 'lab.scene.computer',
  server: 'lab.scene.server',
  ap: 'lab.scene.ap',
  switch: 'lab.scene.switch',
  projector: 'lab.scene.projector',
  display: 'lab.scene.display',
}

const DESCRIPTIONS = {
  teacher: 'lab.scene.teacherDesc',
  computer: 'lab.scene.computerDesc',
  server: 'lab.scene.serverDesc',
  ap: 'lab.scene.apDesc',
  switch: 'lab.scene.switchDesc',
  projector: 'lab.scene.projectorDesc',
  display: 'lab.scene.displayDesc',
}

function LabTooltip() {
  const { hover } = useLabScene()
  const { t } = useTranslation()

  if (!hover) return null

  const [x, y, z] = hover.position
  const titleKey = LABELS[hover.key]
  const descKey = DESCRIPTIONS[hover.key]

  return (
    <Html position={[x, y + 1.1, z]} center distanceFactor={9} zIndexRange={[30, 0]}>
      <motion.div
        className="lab-tooltip"
        initial={{ opacity: 0, y: 8, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        <strong>{t(titleKey)}</strong>
        {descKey && <span>{t(descKey)}</span>}
      </motion.div>
    </Html>
  )
}

export default LabTooltip
