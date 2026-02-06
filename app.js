// CloudPulse - Landing Page
// UX Enhancements

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active section highlight in navbar
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ===== CTA Modal =====
  const ctaButton = document.getElementById('cta-button');
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('cta-modal');
  const closeBtn = document.getElementById('modal-close');

  function openModal() {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  ctaButton.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  // Close with close button
  closeBtn.addEventListener('click', closeModal);

  // Close by clicking backdrop
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // ===== Form Validation =====
  const form = document.getElementById('cta-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    nameInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Name is required.';
      nameInput.classList.add('invalid');
      valid = false;
    }

    if (!emailInput.value.trim()) {
      emailError.textContent = 'Email is required.';
      emailInput.classList.add('invalid');
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('invalid');
      valid = false;
    }

    if (valid) {
      alert('Thanks for signing up, ' + nameInput.value.trim() + '!');
      form.reset();
      closeModal();
    }
  });
});
