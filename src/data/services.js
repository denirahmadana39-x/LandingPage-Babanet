import {
  FiServer,
  FiCode,
  FiWifi,
  FiVideo,
  FiMonitor,
  FiCpu,
  FiTool,
  FiShare2,
  FiMessageCircle,
} from 'react-icons/fi'

export const services = [
  {
    id: 'webhosting',
    icon: FiServer,
    titleKey: 'services.webHosting.title',
    descKey: 'services.webHosting.desc',
  },
  {
    id: 'webdev',
    icon: FiCode,
    titleKey: 'services.webdev.title',
    descKey: 'services.webdev.desc',
  },
  {
    id: 'wifi',
    icon: FiWifi,
    titleKey: 'services.wifi.title',
    descKey: 'services.wifi.desc',
  },
  {
    id: 'cctv',
    icon: FiVideo,
    titleKey: 'services.cctv.title',
    descKey: 'services.cctv.desc',
  },
  {
    id: 'lab',
    icon: FiMonitor,
    titleKey: 'services.lab.title',
    descKey: 'services.lab.desc',
  },
  {
    id: 'assembly',
    icon: FiCpu,
    titleKey: 'services.assembly.title',
    descKey: 'services.assembly.desc',
  },
  {
    id: 'repair',
    icon: FiTool,
    titleKey: 'services.repair.title',
    descKey: 'services.repair.desc',
  },
  {
    id: 'network',
    icon: FiShare2,
    titleKey: 'services.network.title',
    descKey: 'services.network.desc',
  },
  {
    id: 'consult',
    icon: FiMessageCircle,
    titleKey: 'services.consult.title',
    descKey: 'services.consult.desc',
  },
]

export default services
