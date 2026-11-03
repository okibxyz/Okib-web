/* Shared footer and floating navigation behavior for both pages. */
(() => {
  'use strict';

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.dock-toggle');
  const menu = document.querySelector('.bottom-dock');
  if (!toggle || !menu) return;

  function setMenuOpen(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', event => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia('(max-width:760px)').addEventListener('change', () => {
    setMenuOpen(false);
  });
})();
