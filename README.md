# Baba Solution Information Technology — Company Profile Website

> Technology Solutions for Business, Education & Home.
> One Partner for All Your IT Needs

A premium, modern, fully responsive company profile website built with **only HTML5, CSS3, and Vanilla JavaScript (ES6+)** — no frameworks, no libraries, no build tools.

---

## ✨ Features

- **Sticky navbar** with blur/glassmorphism on scroll
- **Mobile drawer menu** with keyboard & accessibility support
- **Hero section** with animated statistics, CSS dashboard mockup and floating cards
- **Services** — 8 responsive cards with hover animations
- **Why Choose Us** with feature checklist
- **Work Process** — 6-step visual timeline
- **Computer Laboratory** section with checklist
- **Dark Hosting section** with server-status dashboard mockup
- **FAQ accordion** — pure vanilla JS
- **Contact** — Google Maps embed, info cards, validated form that opens WhatsApp
- **WhatsApp CTAs** — every call-to-action (nav, hero, lab, hosting, FAQ, footer) plus a floating WhatsApp button opens a pre-filled chat
- **Extras**: scroll-reveal animations (Intersection Observer), counter animations, smooth scroll, active nav highlighting, button ripple effect, lazy loading, back-to-top button, footer year auto-update
- **Accessible**: semantic HTML, ARIA attributes, focus states, `prefers-reduced-motion` support
- **Bilingual (i18n)**: 🇮🇩 Bahasa Indonesia (default) & 🇺🇸 English — no page reload, persisted choice, auto-detect, SEO/meta updates

## 🧰 Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Markup       | Semantic HTML5          |
| Styling      | CSS3 (CSS Variables, Flexbox, Grid, `clamp()`, REM, backdrop-filter) |
| Interactivity| Vanilla JavaScript ES6+ |
| Icons        | Inline SVG sprite (`<use href="#icon-...">`) |
| Illustrations| Inline SVG + optional files in `assets/illustrations/` |
| Fonts        | Roboto (Google Fonts)   |

## 📁 Project Structure

```
.
├── index.html
├── css/
│   ├── style.css          # Base design: variables, sections, components
│   ├── responsive.css     # Media queries (laptop / tablet / mobile)
│   └── animation.css      # Keyframes + scroll-reveal transitions
├── js/
│   ├── translations.js     # All UI strings for every language (id, en)
│   ├── language.js         # i18n core: detect, persist, translate, SEO
│   ├── app.js             # Smooth scroll, back-to-top, ripple, lazy-load, form
│   ├── navbar.js          # Sticky header, mobile menu, active nav
│   ├── animation.js       # Scroll reveal (Intersection Observer)
│   ├── counter.js         # Animated statistics
│   └── faq.js             # FAQ accordion
├── assets/
│   ├── images/            # Put your real photos here (empty)
│   ├── icons/logo.svg     # Brand logo mark
│   └── illustrations/     # Reusable SVG illustrations
└── README.md
```

## 🚀 Getting Started

No build step required. Open directly in a browser or serve statically:

```bash
# Option A — just open it
open index.html

# Option B — local static server (Python)
python3 -m http.server 8080

# Option C — local static server (Node)
npx serve .
```

Then visit `http://localhost:8080`.

### Deploy anywhere

Works on any static host: **Nginx, Apache, GitHub Pages, Cloudflare Pages, Netlify, Vercel**.
Just upload the repository root — no configuration needed.

## 🎨 Customization

### Brand colors
All colors live as CSS variables at the top of `css/style.css`:

```css
:root {
  --color-primary: #2563EB;
  --color-secondary: #3B82F6;
  --color-accent: #60A5FA;
  --color-dark: #1E3A8A;
  ...
}
```

### Content
All text is directly in `index.html` — edit the copy, services, FAQ, and contact details there. Place real project photos in `assets/images/` and reference them via `<img>` (with `loading="lazy"`).

> **Note:** Because of the multilingual system, human-facing copy lives in `js/translations.js`, not in the HTML. The text inside `index.html` is only the Indonesian (default) fallback rendered before the scripts run. See [Language & Translation](#-language--translation) below.

### Language & Translation

The site ships with **Bahasa Indonesia (default)** and **English**.

- Every translatable element in `index.html` is marked with a `data-i18n` attribute, e.g. `<h1 data-i18n="hero.title">`. Elements that must keep an inline highlight use `data-i18n-html`; inputs use `data-i18n-placeholder`; ARIA labels use `data-i18n-aria`.
- All strings live in one object in `js/translations.js`:
  ```js
  const translations = {
    id: { 'nav.home': 'Beranda', ... },
    en: { 'nav.home': 'Home', ... }
  };
  ```
- **Language detection** (`js/language.js`): `localStorage['language']` first; otherwise the browser language — starts with `id` → Indonesian, anything else → English.
- **No page reload** — switching applies a smooth fade and re-translates instantly.
- **SEO** — switching updates `<html lang>`, `<title>`, meta description, and Open Graph tags.
- **Adding a new language** (e.g. Japanese): copy the `id` object in `translations.js`, translate every value, keep the same keys, and register the code in `SUPPORTED_LANGS` in `js/language.js`. No HTML changes needed.

### WhatsApp CTAs
Every button with a `data-whatsapp` attribute (nav & hero "Get Started", lab "Consult Our Team", hosting "Start Now", FAQ "Contact Support", footer links, and the floating button) opens WhatsApp with a short pre-filled greeting in the active language. Buttons show a brief loading state while the chat is launched.

### Contact form
The form is a demo (no backend) — on submit it validates every field and opens WhatsApp (`https://wa.me/`) with a pre-filled, formatted message in the currently active language (Indonesian or English). No data is sent to any server.

To change the recipient number, edit the `WHATSAPP_NUMBER` constant at the top of section 5 in `js/app.js` (use the international format without `+`, e.g. `6281281640680`). The number also appears in `translations.js` (`contact.whatsappValue`) and in the floating/footer `wa.me` hrefs.

## 🧪 Scripts

There is no build tooling. The project intentionally ships plain, dependency-free files.

## ✅ Quality Checklist

- [x] Semantic HTML5 & SEO meta tags
- [x] No inline CSS, no `!important` (except reduced-motion accessibility override)
- [x] CSS Variables, Flexbox, Grid, `clamp()`, REM units
- [x] Modular, non-duplicated CSS & JS
- [x] Lazy-loaded media, `loading="lazy"` on iframe/images
- [x] Fully responsive: desktop, laptop, tablet, mobile
- [x] Accessible: ARIA, focus-visible, keyboard navigation, reduced-motion
- [x] Validated vanilla JS with graceful fallbacks

---

© Baba Solution Information Technology. All rights reserved.
