const header = document.querySelector('[data-header]');
const nav = document.querySelector('#site-navigation');
const toggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];

const setMenu = (open) => {
  if (!nav || !toggle) return;
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
};

toggle?.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-22% 0px -58% 0px', threshold: [0.08, 0.35, 0.65] });

  sections.forEach((section) => observer.observe(section));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
