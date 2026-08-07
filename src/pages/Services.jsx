import SEO from '../components/seo/SEO'
import Services from '../components/sections/Services/Services'
import ComputerLab from '../components/sections/ComputerLab/ComputerLab'
import Hosting from '../components/sections/Hosting/Hosting'
import Contact from '../components/sections/Contact/Contact'

/* Services — every service card plus the related infra showcases. */
function ServicesPage() {
  return (
    <>
      <SEO />
      <Services id="services" />
      <ComputerLab id="lab" />
      <Hosting id="hosting" />
      <Contact id="contact" />
    </>
  )
}

export default ServicesPage
