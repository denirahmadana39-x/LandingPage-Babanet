import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import HostingContent from './HostingContent'
import HostingFeatures from './HostingFeatures'
import HostingStats from './HostingStats'
import HostingCTA from './HostingCTA'
import HostingDashboard from './HostingDashboard'
import styles from './Hosting.module.css'

const panelVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Hosting — premium cloud-hosting product section. Left: copy + feature
   list + stats + CTA on a deep blue infrastructure background. Right: a
   live, interactive server-health dashboard (real React UI, no image). */
function Hosting({ id }) {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className={styles.section} id={id}>
      <div className={clsx('container', styles.inner)}>
        <div className={styles.grid}>
          <div
            className={clsx(styles.content, 'reveal', inView && 'revealed')}
            ref={ref}
          >
            <HostingContent />
            <HostingFeatures />
            <HostingStats />
            <HostingCTA />
          </div>

          <motion.div
            className={styles.visual}
            variants={panelVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            aria-hidden="true"
          >
            <HostingDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hosting
