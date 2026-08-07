import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

/* SEO — updates <title>, meta description and Open Graph tags in the
   active language (ports js/language.js applySeo). */
export default function SEO({
  titleKey = 'meta.title',
  descriptionKey = 'meta.description',
  ogTitleKey = 'meta.ogTitle',
  ogDescriptionKey = 'meta.ogDescription',
}) {
  const { t, i18n } = useTranslation()

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t(titleKey)}</title>
      <meta name="description" content={t(descriptionKey)} />
      <meta property="og:title" content={t(ogTitleKey)} />
      <meta property="og:description" content={t(ogDescriptionKey)} />
    </Helmet>
  )
}
