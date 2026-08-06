/* ==========================================================================
 * navbar.js — Sticky navbar, header scroll effect, mobile menu, active nav
 * ========================================================================== */
(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  /* ------------------------------------------------------------------
   * 1. Header scroll effect — add .is-scrolled when page is scrolled
   * ---------------------------------------------------------------- */
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
   * 2. Mobile menu — toggle drawer, lock body scroll, update a11y
   * ---------------------------------------------------------------- */
  const setMenuState = (open) => {
    header.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.contains('menu-open');
      setMenuState(!isOpen);
    });
  }

  /* ------------------------------------------------------------------
   * 3. Close mobile menu when a link inside it is clicked
   * ---------------------------------------------------------------- */
  if (navLinks) {
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('.lang-btn')) {
        setMenuState(false);
      }
    });

    /* Close on Escape key */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('menu-open')) {
        setMenuState(false);
      }
    });
  }

  /* ------------------------------------------------------------------
   * 4. Active navigation link — highlight section currently in view
   * ---------------------------------------------------------------- */
  const navItems = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navItems.forEach((link) => {
      const match = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', match);
    });
  };

  const sections = Array.from(navItems)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  /* Use IntersectionObserver when available, fallback to scroll math */
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: `-${Math.round(window.innerHeight * 0.35)}px 0px -55% 0px` }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    const onScrollActive = () => {
      const scrollPos = window.scrollY + header.offsetHeight + 80;
      let current = sections[0] ? sections[0].id : '';
      sections.forEach((section) => {
        if (section.offsetTop <= scrollPos) {
          current = section.id;
        }
      });
      setActiveLink(current);
    };

    window.addEventListener('scroll', onScrollActive, { passive: true });
  }
})();
