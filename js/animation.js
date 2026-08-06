/* ==========================================================================
 * animation.js — Scroll reveal via IntersectionObserver with stagger
 * ========================================================================== */
(() => {
  'use strict';

  const revealEls = document.querySelectorAll('.reveal');

  /* Respect users who prefer reduced motion — show everything immediately */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          /* Stagger children inside a revealed container */
          const parent = entry.target;
          const staggerables = parent.querySelectorAll('.reveal');
          staggerables.forEach((child, i) => {
            child.style.setProperty('--reveal-delay', `${i * 0.09}s`);
          });

          /* Small delay offset per entry keeps multi-card grids organic */
          entry.target.style.setProperty('--reveal-delay', `${index * 0.05}s`);
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
