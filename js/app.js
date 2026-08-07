/* ==========================================================================
 * app.js — Main application logic
 *   • Smooth scroll for same-page anchors
 *   • Back to top button
 *   • Button ripple effect
 *   • Services bento filter + card tilt
 *   • Hero NOC live clock
 *   • Hero dashboard mouse parallax
 *   • Image lazy loading (native + fallback)
 *   • WhatsApp CTAs + contact form validation
 *   • Dynamic footer year
 * ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
   * 1. Smooth scroll — enhanced native smooth scrolling for anchors
   * ---------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ------------------------------------------------------------------
   * 2. Back to top button
   * ---------------------------------------------------------------- */
  const backToTop = document.getElementById('back-to-top');

  const onScroll = () => {
    if (!backToTop) return;
    backToTop.classList.toggle('show', window.scrollY > 600);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
   * 3. Button ripple effect
   * ---------------------------------------------------------------- */
  const rippleButtons = document.querySelectorAll('.btn-ripple');

  rippleButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;

      btn.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
  });

  /* ------------------------------------------------------------------
   * 4. Services grid — scoped fade-up reveal (0.5s, 100ms stagger)
   * ---------------------------------------------------------------- */
  const svcCards = Array.from(document.querySelectorAll('.services-card'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (svcCards.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      svcCards.forEach((card) => card.classList.add('is-in-view'));
    } else {
      svcCards.forEach((card, i) => {
        card.style.setProperty('--svc-delay', `${i * 0.1}s`);
      });

      const svcObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in-view');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );

      svcCards.forEach((card) => svcObserver.observe(card));
    }
  }

  /* ------------------------------------------------------------------
   * 5. Hero NOC live clock — the dashboard header reads the current time
   * ---------------------------------------------------------------- */
  const dashClock = document.getElementById('dash-clock');

  if (dashClock) {
    const pad = (n) => String(n).padStart(2, '0');
    const tickClock = () => {
      const now = new Date();
      dashClock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };
    tickClock();
    window.setInterval(tickClock, 1000);
  }

  /* ------------------------------------------------------------------
   * 6. Hero dashboard parallax — cards drift gently with the mouse
   * ---------------------------------------------------------------- */
  const heroDash = document.querySelector('.hero-dash');

  if (heroDash) {
    const dashCards = heroDash.querySelectorAll('.dash-card');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (dashCards.length > 0 && !reduced && finePointer) {
      const resetParallax = () => {
        dashCards.forEach((card) => {
          card.style.setProperty('--mx', '0px');
          card.style.setProperty('--my', '0px');
        });
      };

      let rafId = null;
      heroDash.addEventListener('mousemove', (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const rect = heroDash.getBoundingClientRect();
          const cx = (e.clientX - rect.left) / rect.width - 0.5;
          const cy = (e.clientY - rect.top) / rect.height - 0.5;

          dashCards.forEach((card) => {
            const depth = parseFloat(card.dataset.depth || '0');
            card.style.setProperty('--mx', `${(-cx * depth * 120).toFixed(2)}px`);
            card.style.setProperty('--my', `${(-cy * depth * 90).toFixed(2)}px`);
          });
          rafId = null;
        });
      });

      heroDash.addEventListener('mouseleave', resetParallax);
    }
  }

  /* ------------------------------------------------------------------
   * 7. Image lazy loading — native `loading=lazy` is preferred;
   *    this JS toggles a fade-in class once an image is ready
   * ---------------------------------------------------------------- */
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('loaded');
          obs.unobserve(img);
        });
      },
      { rootMargin: '200px 0px' }
    );

    images.forEach((img) => imgObserver.observe(img));
  } else {
    images.forEach((img) => {
      if (img.dataset.src) img.src = img.dataset.src;
    });
  }

  /* ------------------------------------------------------------------
   * 8. WhatsApp — one shared helper + every WhatsApp CTA on the page
   *    No backend: any trigger with a data-whatsapp attribute (plus the
   *    contact form) opens WhatsApp with a pre-filled message.
   *    Change the number below to update the recipient.
   * ---------------------------------------------------------------- */
  const WHATSAPP_NUMBER = '6281281640680';

  /* Generic greeting used by the standalone WhatsApp buttons */
  const buildWhatsAppMessage = () => {
    const I18n = window.I18n;
    return `${I18n.t('contact.whatsapp.greeting')}\n${I18n.t('contact.whatsapp.intro')}`;
  };

  /* Open WhatsApp (app on mobile, WhatsApp Web on desktop) */
  const openWhatsApp = (message) => {
    const text = encodeURIComponent(message || buildWhatsAppMessage());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    return window.open(url, '_blank');
  };

  /* Expose the helpers so anything (inline handlers, other scripts) can reuse them */
  window.buildWhatsAppMessage = buildWhatsAppMessage;
  window.openWhatsApp = openWhatsApp;

  /* Wire up every [data-whatsapp] trigger with a brief loading state */
  document.querySelectorAll('[data-whatsapp]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (trigger.dataset.busy === '1') return;
      trigger.dataset.busy = '1';
      trigger.classList.add('is-loading');
      if (trigger.tagName === 'BUTTON') trigger.disabled = true;

      openWhatsApp();

      /* Let the loading state render, then restore the trigger */
      window.setTimeout(() => {
        trigger.dataset.busy = '';
        trigger.classList.remove('is-loading');
        if (trigger.tagName === 'BUTTON') trigger.disabled = false;
      }, 350);
    });
  });

  const form = document.getElementById('contact-form');

  if (form) {
    const inputs = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      phone: document.getElementById('phone'),
      service: document.getElementById('service'),
      school: document.getElementById('school'),
      message: document.getElementById('message')
    };

    const schoolGroup = inputs.school ? inputs.school.closest('.form-group') : null;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phonePattern = /^[+]?[\d\s\-().]{7,20}$/;

    /* The lab service reveals the conditional School Name field */
    const isLabService = () => inputs.service && inputs.service.value === 'lab';

    /* Show / hide the School Name field with a fade + slide animation.
       After the fade-out finishes the field leaves the layout entirely. */
    const toggleSchoolField = (show) => {
      if (!schoolGroup || !inputs.school) return;

      inputs.school.disabled = !show;

      if (show) {
        schoolGroup.hidden = false;
        void schoolGroup.offsetHeight;
        schoolGroup.classList.add('visible');
      } else {
        schoolGroup.classList.remove('visible');
        window.setTimeout(() => {
          if (!schoolGroup.classList.contains('visible')) {
            schoolGroup.hidden = true;
          }
        }, 350);
      }
    };

    /* Clear + revalidate the School field when its service is deselected */
    const syncSchoolField = () => {
      const lab = isLabService();
      if (!lab && inputs.school) {
        inputs.school.value = '';
        schoolGroup.classList.remove('invalid');
      }
      toggleSchoolField(lab);
    };

    /* Only these fields are mandatory; email & school (when not lab) are optional */
    const isRequired = (field) =>
      field !== 'email' && !(field === 'school' && !isLabService());

    /* Validate a single field: trim, check required + format, toggle error UI */
    const validateField = (field) => {
      const input = inputs[field];
      const group = input.closest('.form-group');
      const value = input.value.trim();
      input.value = value;

      let valid = true;
      if (isRequired(field)) valid = value !== '';
      if (valid && field === 'email' && value !== '') valid = emailPattern.test(value);
      if (valid && field === 'phone' && value !== '') valid = phonePattern.test(value);

      group.classList.toggle('invalid', !valid);
      return valid;
    };

    /* Live validation on blur — clear the error as the user types */
    Object.keys(inputs).forEach((field) => {
      const input = inputs[field];
      if (!input) return;
      input.addEventListener('blur', () => validateField(field));
      input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('invalid')) {
          validateField(field);
        }
      });
    });

    /* Keep the conditional School field in sync with the selected service */
    if (inputs.service) {
      inputs.service.addEventListener('change', syncSchoolField);
    }

    const updateValidation = () => {
      let allValid = true;
      Object.keys(inputs).forEach((field) => {
        if (!validateField(field)) allValid = false;
      });
      return allValid;
    };

    /* Assemble the form message in the currently active language */
    const generateWhatsAppMessage = () => {
      const I18n = window.I18n;
      const clean = (value) => (value || '').trim();
      const selected = inputs.service.options[inputs.service.selectedIndex];
      const serviceLabel = selected ? selected.textContent.trim() : '';

      const lines = [
        I18n.t('contact.whatsapp.greeting'),
        '',
        I18n.t('contact.whatsapp.intro'),
        '',
        `${I18n.t('contact.whatsapp.name')} ${clean(inputs.name.value)}`
      ];

      /* School Name only appears for the laboratory service */
      if (isLabService()) {
        lines.push(`${I18n.t('contact.whatsapp.school')} ${clean(inputs.school.value)}`);
      }

      lines.push(
        `${I18n.t('contact.whatsapp.email')} ${clean(inputs.email.value) || '-'}`,
        `${I18n.t('contact.whatsapp.phone')} ${clean(inputs.phone.value)}`,
        `${I18n.t('contact.whatsapp.service')} ${serviceLabel}`,
        `${I18n.t('contact.whatsapp.message')} ${clean(inputs.message.value)}`,
        '',
        I18n.t('contact.whatsapp.footer')
      );

      return lines.join('\n');
    };

    const resetButton = (btn) => {
      btn.disabled = false;
      btn.classList.remove('is-loading');
    };

    /* Clear every field and the validation / school state for the next request */
    const resetForm = () => {
      form.reset();
      form.querySelectorAll('.form-group.invalid').forEach((group) => {
        group.classList.remove('invalid');
      });
      syncSchoolField();
    };

    /* Start hidden, disabled and out of the layout until the lab service is chosen */
    syncSchoolField();

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!updateValidation()) {
        const firstInvalid = form.querySelector(
          '.form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea'
        );
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.classList.add('is-loading');

      openWhatsApp(generateWhatsAppMessage());

      /* Let the loading state render, then restore the button + reset the form */
      window.setTimeout(() => {
        resetButton(btn);
        resetForm();
      }, 350);
    });
  }

  /* ------------------------------------------------------------------
   * 9. Dynamic footer year
   * ---------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
