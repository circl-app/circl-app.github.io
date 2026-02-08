// Scroll-triggered animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.scroll-animate').forEach((el) => {
  observer.observe(el);
});

// Nav background on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Waitlist form
const SUPABASE_URL = 'https://xewbyxqjilgfkgrcaeog.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhld2J5eHFqaWxnZmtncmNhZW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNzQ2NTksImV4cCI6MjA1MzY1MDY1OX0.TtMxOmSB0UYDkiBFMWCgfdiwEuJlmn_FAelKkPSaY8w';

const ctaForm = document.querySelector('.cta-form');
const ctaInput = document.querySelector('.cta-input');
const ctaButton = document.querySelector('.cta-button');
const ctaNote = document.querySelector('.cta-note');

ctaButton.addEventListener('click', async () => {
  const email = ctaInput.value.trim().toLowerCase();
  if (!email || !email.includes('@') || !email.includes('.')) {
    ctaNote.textContent = 'please enter a valid email.';
    ctaNote.style.color = '#D9995A';
    return;
  }

  ctaButton.disabled = true;
  ctaButton.textContent = '...';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      ctaInput.style.display = 'none';
      ctaButton.style.display = 'none';
      ctaNote.textContent = "you're on the list. we'll be in touch.";
      ctaNote.style.color = '#5EBF82';
    } else if (res.status === 409) {
      ctaNote.textContent = "you're already on the list!";
      ctaNote.style.color = '#7EB8D8';
      ctaButton.textContent = 'notify me';
      ctaButton.disabled = false;
    } else {
      throw new Error();
    }
  } catch {
    ctaNote.textContent = 'something went wrong. try again.';
    ctaNote.style.color = '#D47A7A';
    ctaButton.textContent = 'notify me';
    ctaButton.disabled = false;
  }
});

ctaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') ctaButton.click();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
