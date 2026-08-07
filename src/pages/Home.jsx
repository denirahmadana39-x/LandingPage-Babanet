import SEO from '../components/seo/SEO'
import Hero from '../components/sections/Hero/Hero'
import StatsBand from '../components/sections/Hero/StatsBand'
import Services from '../components/sections/Services/Services'
import WhyChooseUs from '../components/sections/WhyChooseUs/WhyChooseUs'
import Process from '../components/sections/WhyChooseUs/Process'
import ComputerLab from '../components/sections/ComputerLab/ComputerLab'
import Hosting from '../components/sections/Hosting/Hosting'
import FAQ from '../components/sections/FAQ/FAQ'
import Contact from '../components/sections/Contact/Contact'

/* Home — the full original one-page layout, kept in the same section
   order as the vanilla site. */
function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <StatsBand />
      <Services id="services" />
      <WhyChooseUs id="about" />
      <Process id="process" />
      <ComputerLab id="lab" />
      <Hosting id="hosting" />
      <FAQ id="faq" />
      <Contact id="contact" />
    </>
  )
}

export default Home
