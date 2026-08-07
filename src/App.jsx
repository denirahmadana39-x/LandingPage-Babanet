import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import FloatingWhatsapp from './components/layout/FloatingWhatsapp/FloatingWhatsapp'
import ScrollToTop from './components/layout/ScrollToTop/ScrollToTop'
import { useRevealSystem } from './hooks/useRevealSystem'

/* Route code-splitting: every page is a lazy chunk. */
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const ServicesPage = lazy(() => import('./pages/Services'))
const HostingPage = lazy(() => import('./pages/Hosting'))
const PortfolioPage = lazy(() => import('./pages/Portfolio'))
const ContactPage = lazy(() => import('./pages/Contact'))

/* Drives the page-level `.reveal` scroll system. Keyed by pathname so a
   fresh scan runs after every route change. */
function RevealScope({ children }) {
  const { pathname } = useLocation()
  const rootRef = useRevealSystem(pathname)
  return <div ref={rootRef}>{children}</div>
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <RevealScope>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/hosting" element={<HostingPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </RevealScope>
        </Suspense>
      </main>
      <FloatingWhatsapp />
      <Footer />
    </>
  )
}

export default App
