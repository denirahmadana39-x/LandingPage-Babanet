import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import { useHostingMetrics } from './useHostingMetrics'
import DashboardHeader from './DashboardHeader'
import ResourceMetric from './ResourceMetric'
import SSLStatus from './SSLStatus'
import DomainStatus from './DomainStatus'
import BackupStatus from './BackupStatus'
import styles from './Hosting.module.css'

/* The interactive hosting dashboard — a real React component (no image).
   Shows the server id + live status up top, animated resource meters, and
   a group of status rows for SSL / Domain / Backup. */
function HostingDashboard() {
  const { inView } = useScrollAnimation({ threshold: 0.2 })
  const { cpu, ram, ssd } = useHostingMetrics(inView)

  return (
    <div className={styles.panel}>
      <DashboardHeader />
      <div className={styles.panelBody}>
        <ResourceMetric labelKey="hosting.dash.cpu" value={cpu} active={inView} tone="blue" />
        <ResourceMetric labelKey="hosting.dash.ram" value={ram} active={inView} tone="violet" />
        <ResourceMetric labelKey="hosting.dash.ssd" value={ssd} active={inView} tone="green" />

        <div className={styles.statusGroup}>
          <SSLStatus />
          <DomainStatus />
          <BackupStatus />
        </div>
      </div>
    </div>
  )
}

export default HostingDashboard
