import { FiRefreshCw } from 'react-icons/fi'
import StatusRow from './StatusRow'

function BackupStatus() {
  return (
    <StatusRow
      icon={FiRefreshCw}
      labelKey="hosting.dash.backup"
      valueKey="hosting.dash.backupValue"
      badgeKey="hosting.dash.ok"
      tone="green"
    />
  )
}

export default BackupStatus
