import { useEffect, useState } from 'react'

/* Sticky header + mobile drawer — ports js/navbar.js.
   Handles the .is-scrolled header state and the slide-in menu with
   body scroll lock and Escape-to-close. */
export function useNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const openMenu = () => {
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  return { scrolled, menuOpen, openMenu, closeMenu, toggleMenu }
}

export default useNavbar
