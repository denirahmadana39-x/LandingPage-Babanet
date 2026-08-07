import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatNumber } from '../i18n'

const STORAGE_KEY = 'language'
const SUPPORTED_LANGS = ['id', 'en']

/* Language switching — ports js/language.js. Persists the choice to
   localStorage and applies a smooth fade (respects reduced motion). */
export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language)

  const setLanguage = useCallback(
    (lng) => {
      if (SUPPORTED_LANGS.indexOf(lng) === -1 || lng === lang) return
      try {
        localStorage.setItem(STORAGE_KEY, lng)
      } catch {
        /* quota / privacy errors — ignore */
      }

      const apply = () => {
        i18n.changeLanguage(lng)
        setLang(lng)
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        apply()
        return
      }

      document.body.classList.add('lang-switching')
      window.setTimeout(() => {
        apply()
        window.setTimeout(() => {
          document.body.classList.remove('lang-switching')
        }, 150)
      }, 150)
    },
    [i18n, lang]
  )

  const value = useMemo(() => ({ lang, setLanguage, formatNumber }), [lang, setLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

export default LanguageProvider
