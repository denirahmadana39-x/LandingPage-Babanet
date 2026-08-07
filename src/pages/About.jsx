import SEO from '../components/seo/SEO'
import StatsBand from '../components/sections/Hero/StatsBand'
import WhyChooseUs from '../components/sections/WhyChooseUs/WhyChooseUs'
import Process from '../components/sections/WhyChooseUs/Process'
import Contact from '../components/sections/Contact/Contact'

/* About — the "why choose us" story: trust points, work process,
   headline stats and a contact CTA. */
function About() {
  return (
    <>
      <SEO />
      <StatsBand />
      <WhyChooseUs id="about" />
      <Process id="process" />
      <Contact id="contact" />
    </>
  )
}

export default About
