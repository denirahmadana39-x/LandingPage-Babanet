import SEO from '../components/seo/SEO'
import Portfolio from '../components/sections/Portfolio/Portfolio'
import Contact from '../components/sections/Contact/Contact'

/* Portfolio — the filterable project grid and a CTA. */
function PortfolioPage() {
  return (
    <>
      <SEO />
      <Portfolio id="portfolio" />
      <Contact id="contact" />
    </>
  )
}

export default PortfolioPage
