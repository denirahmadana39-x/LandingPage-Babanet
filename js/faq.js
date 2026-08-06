/* ==========================================================================
 * faq.js — FAQ accordion (accessible, single-open behavior)
 * ========================================================================== */
(() => {
  'use strict';

  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length === 0) return;

  /* Close every open item and reset the button + answer heights */
  const closeAll = () => {
    faqItems.forEach((item) => {
      item.classList.remove('active');
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (question) question.setAttribute('aria-expanded', 'false');
      if (answer) answer.style.maxHeight = '';
    });
  };

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      /* Accordion behavior: only one item open at a time */
      closeAll();

      if (!isOpen) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  /* Recalculate open answer height on resize (content can reflow) */
  window.addEventListener('resize', () => {
    faqItems.forEach((item) => {
      if (item.classList.contains('active')) {
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  }, { passive: true });
})();
