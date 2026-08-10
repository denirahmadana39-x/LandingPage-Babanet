# Baba Solution Information Technology — Company Profile Website

> Technology Solutions for Business, Education & Home.
> One Partner for All Your IT Needs

A premium, modern, fully responsive company profile website built with **React 19 + Vite + Tailwind CSS**. React Three Fiber powers an interactive 3D computer-lab showcase that degrades gracefully to an SVG fallback.

## ✨ Features

- **Multi-page SPA** — Home, About, Services, Hosting, Portfolio, Contact (React Router, lazy-loaded route chunks)
- **Sticky navbar** with blur/glassmorphism, active-link highlighting, and a keyboard-accessible mobile drawer
- **Hero section** with animated statistics and dashboard mockup
- **Services** — responsive cards with hover animations
- **Why Choose Us** with feature checklist and a 6-step work process timeline
- **Computer Laboratory** — interactive 3D miniature classroom (React Three Fiber) with soft shadows, entrance choreography, and an SVG fallback when WebGL is unavailable
- **Hosting** section with a server-status dashboard mockup and support log
- **FAQ accordion**
- **Portfolio** — filterable project grid
- **Contact** — Google Maps embed, info cards, and a validated form that opens WhatsApp
- **WhatsApp CTAs** — every call-to-action plus a floating WhatsApp button opens a pre-filled chat
- **Bilingual (i18n)** — 🇮🇩 Bahasa Indonesia (default) & 🇺🇸 English via i18next; persisted choice, auto-detect, and SEO/meta updates with no page reload
- **Extras** — scroll-reveal animations (Intersection Observer), animated counters, smooth scroll, back-to-top, lazy loading
- **Accessible** — semantic HTML, ARIA attributes, focus states, `prefers-reduced-motion` support
- **Performance** — route-level code-splitting; the three.js 3D scene is lazy-loaded only when scrolled into view

## 🧰 Tech Stack

| Layer            | Technology                                        |
|------------------|---------------------------------------------------|
| Framework        | React 19                                          |
| Build tool       | Vite 8                                            |
| Styling          | Tailwind CSS 4 + scoped CSS Modules (design tokens in `src/styles/globals.css`) |
| Routing          | React Router 7 (lazy routes)                      |
| 3D scene         | @react-three/fiber + drei + three (lazy-loaded)   |
| Animation        | framer-motion                                     |
| i18n             | i18next + react-i18next (`src/locales/{id,en}`)   |
| Icons            | react-icons (Feather set)                         |
| SEO              | react-helmet-async (`<SEO />` component)          |

## 📁 Project Structure

```
src/
├── main.jsx                  # Entry: providers (i18n, Helmet, Language, Router)
├── App.jsx                   # Layout + lazy route table
├── i18n.js                   # i18next init
├── contexts/
│   └── LanguageContext.jsx   # Language switching + persistence
├── pages/                    # Home, About, Services, Hosting, Portfolio, Contact
├── components/
│   ├── layout/               # Navbar, Footer, FloatingWhatsapp, LanguageSwitcher, ScrollToTop
│   ├── sections/             # Hero, Services, WhyChooseUs, ComputerLab, Hosting, FAQ, Contact, Portfolio
│   │   └── ComputerLab/      # R3F scene + scene/ internals, SVG FallbackScene, fullscreen preview
│   ├── seo/SEO.jsx           # Title/meta/OG in the active language
│   └── ui/                   # Button, Card, EmphasizedText, FAQItem, StatCard, ...
├── data/                     # company, services, portfolio, faq
├── hooks/                    # useCounter, useRevealSystem, useScrollAnimation, useNavbar, ...
├── locales/{id,en}/          # JSON translation files
├── styles/globals.css        # Design tokens + base styles
└── utils/whatsapp.js         # WhatsApp deep-link helpers
```

## 🚀 Getting Started

```bash
npm install
npm run dev        # start the dev server
```

Then visit the URL printed by Vite (default `http://localhost:5173`).

### Scripts

| Script            | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | ESLint over `src/`                   |
| `npm run format`  | Prettier write over `src/`           |
| `npm run format:check` | Prettier check                  |

### Deploy

This is a standard Vite SPA — build with `npm run build` and deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, Nginx). Add a SPA fallback so `history` routes (e.g. `/services`) resolve to `index.html`.

## 🎨 Customization

### Brand colors

All design tokens (palette, spacing, typography) live as CSS variables at the top of `src/styles/globals.css`:

```css
:root {
  --ink: #171b21;        /* graphite — primary text */
  --bench: #eef0f2;      /* cool technical base */
  --brand: #2455e6;      /* cable blue — the CTA */
  --cable: #f05a22;      /* ethernet orange — bright accent */
  --ok: #0fa958;         /* link-active green — status only */
  ...
}
```

### Content

- **Copy / translations** — human-facing strings live in `src/locales/id/common.json` and `src/locales/en/common.json`. Add a language by adding a locale folder, translating each key, and registering it in `src/i18n.js`.
- **Services, portfolio, FAQ** — structured data in `src/data/`.
- **WhatsApp number** — update the number in `src/utils/whatsapp.js` and anywhere the `wa.me` href appears (floating button, footer).

## ✅ Quality Checklist

- [x] Semantic HTML5 & SEO meta tags (per-language via react-helmet-async)
- [x] Design tokens in CSS variables; scoped CSS Modules; Tailwind for layout utilities
- [x] Fully responsive: desktop, laptop, tablet, mobile
- [x] Accessible: ARIA, focus-visible, keyboard navigation, reduced-motion
- [x] Route-level code-splitting; WebGL scene lazy-loaded on scroll into view
- [x] ESLint clean; Prettier formatted

---

© Baba Solution Information Technology. All rights reserved.
