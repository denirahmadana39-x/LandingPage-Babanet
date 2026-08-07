import SEO from '../components/seo/SEO'
import Hosting from '../components/sections/Hosting/Hosting'
import FAQ from '../components/sections/FAQ/FAQ'
import Contact from '../components/sections/Contact/Contact'

/* Hosting — the server dashboard, support log and CTA. */
function HostingPage() {
  return (
    <>
      <SEO />
      <Hosting id="hosting" />
      <FAQ id="faq" />
      <Contact id="contact" />
    </>
  )
}

export default HostingPage
