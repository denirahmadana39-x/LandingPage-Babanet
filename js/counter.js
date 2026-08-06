/* ==========================================================================
 * counter.js — Animated statistics (hero + hosting)
 * ========================================================================== */
(() => {
  'use strict';

  const counters = document.querySelectorAll('[data-counter]');

  if (counters.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Ease-out cubic — starts fast, decelerates near the end */
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  /* Number formatting follows the active locale ("99,9" id / "99.9" en) */
  const formatNumber = (value, decimalPlaces) =>
    window.I18n
      ? I18n.formatNumber(value, decimalPlaces)
      : decimalPlaces > 0
        ? value.toFixed(decimalPlaces).replace('.', ',')
        : Math.round(value).toString();

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1800;

    if (prefersReducedMotion) {
      el.textContent = formatNumber(target, decimals) + suffix;
      return;
    }

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = target * easeOutCubic(progress);
      el.textContent = formatNumber(current, decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
})();
