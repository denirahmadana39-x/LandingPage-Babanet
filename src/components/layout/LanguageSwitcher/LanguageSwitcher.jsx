import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useLanguage } from '../../../contexts/LanguageContext'
import styles from './LanguageSwitcher.module.css'

const LANGS = [
  { code: 'id', flag: '\u{1F1EE}\u{1F1E9}' },
  { code: 'en', flag: '\u{1F1FA}\u{1F1F8}' },
]

/* Segmented ID / EN switcher — ports the .lang-switcher markup and
   active-state behaviour from js/language.js. `full` renders the
   drawer variant (equal-width buttons). */
function LanguageSwitcher({ full = false }) {
  const { lang, setLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <div
      className={clsx(styles.switcher, full && styles.switcherFull)}
      role="group"
      aria-label={t('aria.chooseLanguage')}
    >
      {LANGS.map(({ code, flag }) => (
        <button
          key={code}
          type="button"
          className={clsx(styles.btn, full && styles.btnFull, lang === code && styles.active)}
          aria-pressed={lang === code}
          onClick={() => setLanguage(code)}
        >
          <span className={styles.flag} aria-hidden="true">
            {flag}
          </span>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
