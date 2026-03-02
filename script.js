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

// Demo cascade animation
const demoSection = document.getElementById('demo');
if (demoSection) {
  const demoElements = demoSection.querySelectorAll('.demo-animate');
  let demoTriggered = false;

  const demoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !demoTriggered) {
          demoTriggered = true;
          demoElements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('in-view');
            }, i * 300);
          });
          demoObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  demoObserver.observe(demoSection);
}

// Demo 2 (groups) cascade animation
const demoGroupsElements = document.querySelectorAll('.demo-groups-animate');
if (demoGroupsElements.length) {
  let demoGroupsTriggered = false;
  const demoGroupsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !demoGroupsTriggered) {
          demoGroupsTriggered = true;
          demoGroupsElements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('in-view');
            }, i * 300);
          });
          demoGroupsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  demoGroupsObserver.observe(demoGroupsElements[0]);
}

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
