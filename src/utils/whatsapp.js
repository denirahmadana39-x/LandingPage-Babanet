import { company } from '../data/company'

export const WHATSAPP_NUMBER = company.phone

/* Generic greeting used by the standalone WhatsApp buttons. */
export function buildWhatsAppMessage(t) {
  return [t('contact.whatsapp.greeting'), t('contact.whatsapp.intro')].join('\n')
}

/* Open WhatsApp (app on mobile, WhatsApp Web on desktop). */
export function openWhatsApp(message) {
  const text = encodeURIComponent(message || '')
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  return window.open(url, '_blank')
}
