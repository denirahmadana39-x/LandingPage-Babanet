import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import { FiClock, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { company } from '../../../data/company'
import EmphasizedText from '../../ui/EmphasizedText/EmphasizedText'
import Button from '../../ui/Button/Button'
import { openWhatsApp } from '../../../utils/whatsapp'
import styles from './Contact.module.css'

/* Contact — ports section 12. Left: info cards. Right: the estimate form
   that posts to WhatsApp. Validation, the conditional School field and
   the message builder replicate js/app.js. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^[+]?[\d\s\-().]{7,20}$/

const INFO_CARDS = [
  { key: 'contact.address', icon: FiMapPin, valueKey: 'contact.addressValue' },
  { key: 'contact.email', icon: FiMail, valueKey: 'contact.emailValue' },
  { key: 'contact.whatsapp', icon: FaWhatsapp, valueKey: 'contact.whatsappValue', filled: true },
  { key: 'contact.hours', icon: FiClock, valueKey: 'contact.hoursValue' },
]

const FORM_FIELDS = ['name', 'email', 'phone', 'service', 'school', 'message']

const OPTIONS = [
  { value: 'webhosting', labelKey: 'services.webHosting.title' },
  { value: 'wifi', labelKey: 'services.wifi.title' },
  { value: 'cctv', labelKey: 'services.cctv.title' },
  { value: 'assembly', labelKey: 'services.assembly.title' },
  { value: 'laptop', labelKey: 'contact.form.service.laptop' },
  { value: 'pc', labelKey: 'contact.form.service.pc' },
  { value: 'repair', labelKey: 'services.repair.title' },
  { value: 'lab', labelKey: 'contact.form.service.lab' },
  { value: 'network', labelKey: 'services.network.title' },
  { value: 'consult', labelKey: 'services.consult.title' },
  { value: 'other', labelKey: 'contact.form.service.other' },
]

const OPTION_VALUES = OPTIONS.map((o) => o.value)
const LAB_SERVICE = 'lab'

function Contact({ id }) {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const initialService = useMemo(() => {
    const fromQuery = searchParams.get('service')
    return OPTION_VALUES.includes(fromQuery) ? fromQuery : ''
  }, [searchParams])

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    school: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [schoolVisible, setSchoolVisible] = useState(() => initialService === LAB_SERVICE)
  const [schoolHidden, setSchoolHidden] = useState(() => initialService !== LAB_SERVICE)
  const [submitting, setSubmitting] = useState(false)
  const hideTimer = useRef(null)

  useEffect(() => () => window.clearTimeout(hideTimer.current), [])

  const isLab = values.service === LAB_SERVICE

  const isRequired = (field) => field !== 'email' && !(field === 'school' && !isLab)

  const validateField = (field) => {
    const value = (values[field] || '').trim()
    let valid = true
    if (isRequired(field)) valid = value !== ''
    if (valid && field === 'email' && value !== '') valid = EMAIL_PATTERN.test(value)
    if (valid && field === 'phone' && value !== '') valid = PHONE_PATTERN.test(value)

    setErrors((e) => {
      const next = { ...e }
      if (valid) delete next[field]
      else next[field] = true
      return next
    })
    return valid
  }

  const handleBlur = (field) => () => validateField(field)
  const handleInput = (field) => (e) => {
    const value = e.target.value
    if (field === 'service') {
      if (value === LAB_SERVICE) {
        setSchoolHidden(false)
        requestAnimationFrame(() => setSchoolVisible(true))
      } else {
        setSchoolVisible(false)
        setValues((v) => (v.school ? { ...v, school: '' } : v))
        setErrors((prev) => {
          if (!prev.school) return prev
          const next = { ...prev }
          delete next.school
          return next
        })
        window.clearTimeout(hideTimer.current)
        hideTimer.current = window.setTimeout(() => setSchoolHidden(true), 350)
      }
    }
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) validateField(field)
  }

  const generateWhatsAppMessage = () => {
    const clean = (v) => (v || '').trim()
    const selected = OPTIONS.find((o) => o.value === values.service)
    const serviceLabel = selected ? t(selected.labelKey) : ''

    const lines = [
      t('contact.whatsapp.greeting'),
      '',
      t('contact.whatsapp.intro'),
      '',
      `${t('contact.whatsapp.name')} ${clean(values.name)}`,
    ]

    if (isLab) {
      lines.push(`${t('contact.whatsapp.school')} ${clean(values.school)}`)
    }

    lines.push(
      `${t('contact.whatsapp.email')} ${clean(values.email) || '-'}`,
      `${t('contact.whatsapp.phone')} ${clean(values.phone)}`,
      `${t('contact.whatsapp.service')} ${serviceLabel}`,
      `${t('contact.whatsapp.message')} ${clean(values.message)}`,
      '',
      t('contact.whatsapp.footer')
    )

    return lines.join('\n')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let allValid = true
    let firstInvalid = null
    FORM_FIELDS.forEach((field) => {
      if (!validateField(field)) {
        allValid = false
        if (!firstInvalid) firstInvalid = field
      }
    })

    if (!allValid) {
      const el = document.getElementById(firstInvalid)
      if (el) el.focus()
      return
    }

    setSubmitting(true)
    openWhatsApp(generateWhatsAppMessage())

    window.setTimeout(() => {
      setSubmitting(false)
      setValues({ name: '', email: '', phone: '', service: '', school: '', message: '' })
      setErrors({})
      setSchoolVisible(false)
      setSchoolHidden(true)
    }, 350)
  }

  return (
    <section className={styles.section} id={id}>
      <div className="container">
        <div className="section-head reveal">
          <div className="head-rule">
            <span>CT-01</span>
          </div>
          <span className="tape">{t('contact.tag')}</span>
          <h2 className="section-title">
            <EmphasizedText text={t('contact.title')} />
          </h2>
          <p className="section-desc">{t('contact.desc')}</p>
        </div>

        <div className={styles.grid}>
          <div className={clsx(styles.info, 'reveal')}>
            {INFO_CARDS.map((card) => (
              <div className={styles.card} key={card.key}>
                <span className={styles.iconBox}>
                  <card.icon
                    className={clsx(styles.icon, card.filled && styles.iconFilled)}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <strong>{t(card.key)}</strong>
                  <p>{t(card.valueKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <form className={clsx(styles.form, 'reveal')} onSubmit={handleSubmit} noValidate>
            <div className={styles.formHead}>
              <span className={styles.formCode}>FR-01 / ESTIMASI</span>
              <span className={styles.formLed}>
                <i />
                <span>{t('contact.form.formNote')}</span>
              </span>
            </div>

            <div className={clsx(styles.group, errors.name && styles.invalid)}>
              <label htmlFor="name">{t('contact.form.nameLabel')}</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t('contact.form.namePlaceholder')}
                autoComplete="name"
                value={values.name}
                onChange={handleInput('name')}
                onBlur={handleBlur('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              <span className={styles.error} id="name-error" role="alert">
                {t('contact.form.nameError')}
              </span>
            </div>

            <div className={styles.row}>
              <div className={clsx(styles.group, errors.email && styles.invalid)}>
                <label htmlFor="email">{t('contact.form.emailLabel')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  value={values.email}
                  onChange={handleInput('email')}
                  onBlur={handleBlur('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <span className={styles.error} id="email-error" role="alert">
                  {t('contact.form.emailError')}
                </span>
              </div>
              <div className={clsx(styles.group, errors.phone && styles.invalid)}>
                <label htmlFor="phone">{t('contact.form.phoneLabel')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t('contact.form.phonePlaceholder')}
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={handleInput('phone')}
                  onBlur={handleBlur('phone')}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                <span className={styles.error} id="phone-error" role="alert">
                  {t('contact.form.phoneError')}
                </span>
              </div>
            </div>

            <div className={clsx(styles.group, errors.service && styles.invalid)}>
              <label htmlFor="service">{t('contact.form.serviceLabel')}</label>
              <select
                id="service"
                name="service"
                value={values.service}
                onChange={handleInput('service')}
                onBlur={handleBlur('service')}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? 'service-error' : undefined}
              >
                <option value="" disabled>
                  {t('contact.form.servicePlaceholder')}
                </option>
                {OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.labelKey)}
                  </option>
                ))}
              </select>
              <span className={styles.error} id="service-error" role="alert">
                {t('contact.form.serviceError')}
              </span>
            </div>

            <div
              className={clsx(styles.group, styles.schoolField, schoolVisible && styles.visible)}
              hidden={schoolHidden}
            >
              <label htmlFor="school">{t('contact.form.schoolLabel')}</label>
              <input
                type="text"
                id="school"
                name="school"
                placeholder={t('contact.form.schoolPlaceholder')}
                autoComplete="organization"
                value={values.school}
                onChange={handleInput('school')}
                onBlur={handleBlur('school')}
                aria-invalid={!!errors.school}
                aria-describedby={errors.school ? 'school-error' : undefined}
              />
              <span className={styles.error} id="school-error" role="alert">
                {t('contact.form.schoolError')}
              </span>
            </div>

            <div className={clsx(styles.group, errors.message && styles.invalid)}>
              <label htmlFor="message">{t('contact.form.messageLabel')}</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder={t('contact.form.messagePlaceholder')}
                autoComplete="off"
                value={values.message}
                onChange={handleInput('message')}
                onBlur={handleBlur('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              <span className={styles.error} id="message-error" role="alert">
                {t('contact.form.messageError')}
              </span>
            </div>

            <Button
              type="submit"
              variant="whatsapp"
              block
              ripple
              loading={submitting}
              className={styles.submit}
            >
              <span>{t('contact.form.submit')}</span>
              <FaWhatsapp className={styles.submitIcon} aria-hidden="true" />
            </Button>
          </form>
        </div>

        <div className={clsx(styles.map, 'reveal')}>
          <iframe
            src={company.mapsEmbedUrl}
            title={t('contact.address')}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
