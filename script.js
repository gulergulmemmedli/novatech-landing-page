document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------
     Footer year
  ------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------
     Mobile navigation toggle
  ------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  const closeNav = () => {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after clicking a link (mobile)
  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* -------------------------------------------------
     Smooth scroll to section (vanilla JS)
  ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Move focus to the section for keyboard/screen-reader users
      targetEl.setAttribute('tabindex', '-1');
      targetEl.focus({ preventScroll: true });
    });
  });

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  /* -------------------------------------------------
     Contact form validation
  ------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const fields = {
    fullName: {
      el: document.getElementById('fullName'),
      errorEl: document.getElementById('fullName-error'),
      validate: (value) => value.trim().length >= 2 ? '' : 'Zəhmət olmasa adınızı və soyadınızı daxil edin.'
    },
    email: {
      el: document.getElementById('email'),
      errorEl: document.getElementById('email-error'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Zəhmət olmasa düzgün email ünvanı daxil edin.'
    },
    message: {
      el: document.getElementById('message'),
      errorEl: document.getElementById('message-error'),
      validate: (value) => value.trim().length >= 10 ? '' : 'Mesajınız ən azı 10 simvol olmalıdır.'
    }
  };

  const validateField = (key) => {
    const { el, errorEl, validate } = fields[key];
    const errorText = validate(el.value);
    const group = el.closest('.form-group');

    if (errorText) {
      group.classList.add('has-error');
      errorEl.textContent = errorText;
      el.setAttribute('aria-invalid', 'true');
    } else {
      group.classList.remove('has-error');
      errorEl.textContent = '';
      el.removeAttribute('aria-invalid');
    }
    return !errorText;
  };

  // Live validation on blur
  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('blur', () => validateField(key));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const results = Object.keys(fields).map(validateField);
    const isValid = results.every(Boolean);

    if (!isValid) {
      formStatus.textContent = 'Zəhmət olmasa formdakı xətaları düzəldin.';
      formStatus.classList.remove('success');
      // Move focus to first invalid field
      const firstInvalidKey = Object.keys(fields).find((key) =>
        fields[key].el.getAttribute('aria-invalid') === 'true'
      );
      if (firstInvalidKey) fields[firstInvalidKey].el.focus();
      return;
    }

    // Simulate successful submission (no backend yet)
    formStatus.textContent = 'Mesajınız uğurla göndərildi. Təşəkkür edirik!';
    formStatus.classList.add('success');
    form.reset();
  });

});