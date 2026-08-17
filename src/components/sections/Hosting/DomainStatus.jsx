import { FiGlobe } from 'react-icons/fi'
import StatusRow from './StatusRow'

function DomainStatus() {
  return (
    <StatusRow
      icon={FiGlobe}
      labelKey="hosting.dash.domain"
      value="babasti.my.id"
      badgeKey="hosting.dash.done"
      tone="blue"
    />
  )
}

export default DomainStatus
