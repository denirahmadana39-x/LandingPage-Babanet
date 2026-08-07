import { useRef } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Button.module.css'

/* Reusable Button with the site's variant set:
   primary | outline | light | whatsapp | heroPrimary | heroSecondary.
   Renders a router <Link> when given `to`, an <a> when given `href`,
   otherwise a <button>. Supports an optional onClick ripple and a
   loading state. */
function Button({
  to,
  href,
  variant = 'primary',
  size,
  block = false,
  loading = false,
  ripple = false,
  className,
  children,
  onClick,
  type,
  ...rest
}) {
  const ref = useRef(null)

  const classes = clsx(
    styles.btn,
    styles[variant],
    size && styles[size],
    block && styles.block,
    loading && styles.loading,
    className
  )

  const handleClick = (e) => {
    if (ripple && ref.current) {
      const btn = ref.current
      const rect = btn.getBoundingClientRect()
      const diameter = Math.max(rect.width, rect.height)
      const radius = diameter / 2

      const rippleEl = document.createElement('span')
      rippleEl.className = 'ripple'
      rippleEl.style.width = rippleEl.style.height = `${diameter}px`
      rippleEl.style.left = `${e.clientX - rect.left - radius}px`
      rippleEl.style.top = `${e.clientY - rect.top - radius}px`

      btn.appendChild(rippleEl)
      rippleEl.addEventListener('animationend', () => rippleEl.remove(), { once: true })
    }
    if (onClick) onClick(e)
  }

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} onClick={handleClick} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} onClick={handleClick} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={type || 'button'}
      className={classes}
      onClick={handleClick}
      disabled={loading}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
