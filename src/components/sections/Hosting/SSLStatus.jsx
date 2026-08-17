import { FiLock } from 'react-icons/fi'
import StatusRow from './StatusRow'

function SSLStatus() {
  return (
    <StatusRow
      icon={FiLock}
      labelKey="hosting.dash.ssl"
      valueKey="hosting.dash.sslValue"
      badgeKey="hosting.dash.secure"
      tone="green"
    />
  )
}

export default SSLStatus
