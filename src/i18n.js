import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import id from './locales/id/common.json'
import en from './locales/en/common.json'

const STORAGE_KEY = 'language'
const SUPPORTED_LANGS = ['id', 'en']
const DEFAULT_LANG = 'id'

function detectBrowserLanguage() {
  const raw = navigator.language || (navigator.languages && navigator.languages[0]) || ''
  return raw.toLowerCase().startsWith('id') ? 'id' : 'en'
}

function loadLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED_LANGS.indexOf(stored) !== -1) return stored
  } catch {
    /* localStorage unavailable — ignore */
  }
  return detectBrowserLanguage()
}

i18n.use(initReactI18next).init({
  resources: {
    id: { common: id },
    en: { common: en },
  },
  lng: loadLanguage(),
  fallbackLng: DEFAULT_LANG,
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
})

/* Number formatting per locale: "99,9" (id) vs "99.9" (en). */
export function formatNumber(value, decimals) {
  const sep = i18n.language === 'id' ? ',' : '.'
  return decimals > 0
    ? Number(value).toFixed(decimals).replace('.', sep)
    : Math.round(Number(value)).toString()
}

export default i18n
