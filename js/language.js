/* ==========================================================================
 * language.js — i18n core (no libraries, vanilla JS only)
 * --------------------------------------------------------------------------
 * Responsibilities:
 *   • Language detection (localStorage first, then browser language)
 *   • Persisting the choice to localStorage
 *   • Translating every [data-i18n] / [data-i18n-html] /
 *     [data-i18n-placeholder] / [data-i18n-aria] element
 *   • Updating <html lang>, <title> and meta/OG tags for SEO
 *   • Smooth fade transition when switching (no page reload)
 * --------------------------------------------------------------------------
 * Reusable API exposed on window:
 *   I18n.currentLang, I18n.t(key), I18n.formatNumber(value, decimals)
 *   setLanguage(lang), translatePage(), loadLanguage(), saveLanguage(),
 *   detectBrowserLanguage()
 * ========================================================================== */
(() => {
  'use strict';

  const STORAGE_KEY = 'language';
  const DEFAULT_LANG = 'id';
  const SUPPORTED_LANGS = ['id', 'en'];

  const I18n = {
    currentLang: DEFAULT_LANG,

    /* Look up a key in the current language, falling back to the default. */
    t(key) {
      const current = translations[I18n.currentLang];
      if (current && current[key] !== undefined) return current[key];
      const fallback = translations[DEFAULT_LANG];
      return fallback && fallback[key] !== undefined ? fallback[key] : undefined;
    },

    /* Number formatting per locale: "99,9" (id) vs "99.9" (en). */
    formatNumber(value, decimals) {
      const sep = I18n.currentLang === 'id' ? ',' : '.';
      return decimals > 0
        ? value.toFixed(decimals).replace('.', sep)
        : Math.round(value).toString();
    }
  };

  /* ------------------------------------------------------------------
   * Language detection & persistence
   * ---------------------------------------------------------------- */
  function detectBrowserLanguage() {
    const raw = navigator.language || (navigator.languages && navigator.languages[0]) || '';
    return raw.toLowerCase().startsWith('id') ? 'id' : 'en';
  }

  function loadLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    } catch (err) {
      /* localStorage unavailable (e.g. privacy mode) — ignore */
    }
    return detectBrowserLanguage();
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* silently ignore quota / privacy errors */
    }
  }

  /* ------------------------------------------------------------------
   * SEO & <html lang>
   * ---------------------------------------------------------------- */
  function applySeo() {
    document.documentElement.lang = I18n.currentLang;
    document.title = I18n.t('meta.title') || document.title;

    const setMeta = (kind, name, key) => {
      const el = document.head.querySelector(`meta[${kind}="${name}"]`);
      const value = I18n.t(key);
      if (el && value !== undefined) el.setAttribute('content', value);
    };

    setMeta('name', 'description', 'meta.description');
    setMeta('property', 'og:title', 'meta.ogTitle');
    setMeta('property', 'og:description', 'meta.ogDescription');
  }

  /* ------------------------------------------------------------------
   * Switcher active state
   * ---------------------------------------------------------------- */
  function updateSwitcher() {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const isActive = btn.dataset.lang === I18n.currentLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  /* ------------------------------------------------------------------
   * Translate the whole page
   * ---------------------------------------------------------------- */
  function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = I18n.t(el.getAttribute('data-i18n'));
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = I18n.t(el.getAttribute('data-i18n-html'));
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = I18n.t(el.getAttribute('data-i18n-placeholder'));
      if (value !== undefined) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const value = I18n.t(el.getAttribute('data-i18n-aria'));
      if (value !== undefined) el.setAttribute('aria-label', value);
    });

    /* Refresh animated counter final values to the active locale */
    document.querySelectorAll('[data-counter]').forEach((el) => {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimal || '0', 10);
      el.textContent = I18n.formatNumber(target, decimals) + suffix;
    });

    updateSwitcher();
    applySeo();

    /* Re-measure any open FAQ answer after the text swaps */
    requestAnimationFrame(() => {
      document.querySelectorAll('.faq-item.active .faq-answer').forEach((answer) => {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      });
    });
  }

  /* ------------------------------------------------------------------
   * Switch language with a smooth fade (respects reduced motion)
   * ---------------------------------------------------------------- */
  function setLanguage(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
    if (lang === I18n.currentLang) return;

    I18n.currentLang = lang;
    saveLanguage(lang);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      translatePage();
      return;
    }

    document.body.classList.add('lang-switching');
    window.setTimeout(() => {
      translatePage();
      window.setTimeout(() => {
        document.body.classList.remove('lang-switching');
      }, 150);
    }, 150);
  }

  /* ------------------------------------------------------------------
   * Wire up switcher buttons + initial translation
   * ---------------------------------------------------------------- */
  function init() {
    I18n.currentLang = loadLanguage();

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    translatePage();
  }

  /* Scripts run at the end of <body>, so the DOM is already available */
  init();

  /* Public API */
  window.I18n = I18n;
  window.setLanguage = setLanguage;
  window.translatePage = translatePage;
  window.loadLanguage = loadLanguage;
  window.saveLanguage = saveLanguage;
  window.detectBrowserLanguage = detectBrowserLanguage;
})();
