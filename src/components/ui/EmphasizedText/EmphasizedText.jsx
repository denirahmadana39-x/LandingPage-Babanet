import clsx from 'clsx'
import styles from './EmphasizedText.module.css'

/* Renders a translated string that may contain a single
   <span class="em">…</span> emphasis segment, e.g.
   "Solusi Teknologi <span class="em">untuk Bisnis Anda.</span>".
   variant="gradient" applies the hero gradient, variant="white" a
   light-on-dark emphasis, otherwise the signal colour. */
function EmphasizedText({ text, variant, className }) {
  const parts = text.split(/<span class="em">|<\/span>/)

  if (parts.length < 3) {
    return <span className={className}>{text}</span>
  }

  const [before, em, after] = parts
  return (
    <span className={className}>
      {before}
      <span className={clsx(styles.em, variant && styles[variant])}>{em}</span>
      {after}
    </span>
  )
}

export default EmphasizedText
