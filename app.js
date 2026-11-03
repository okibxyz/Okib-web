/* Homepage behavior: section tracking, scroll reveals, and the Hello greeting. */
(() => {
  'use strict';

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

  initializeSectionTracking();
  initializeScrollReveals();
  initializeGreeting();

  function initializeSectionTracking() {
    const sections = [...document.querySelectorAll('main > section[id]')];
    const links = [...document.querySelectorAll('.bottom-dock a')];
    if (!sections.length) return;

    function updateNavigation() {
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 160) current = section;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
        current = sections.at(-1);
      }
      links.forEach(link => {
        const active = link.hash === `#${current.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    window.addEventListener('scroll', updateNavigation, { passive: true });
    updateNavigation();
  }

  function initializeScrollReveals() {
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;

    const targets = [...document.querySelectorAll([
      '.about-copy', '.portrait-wrap', '.timeline-item', '.paper',
      '.contact-image', '.contact-copy', '.experience > h2',
      '.publications > .section-heading'
    ].join(', '))];

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    targets.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-pending');
        observer.observe(element);
      }
    });

    document.addEventListener('focusin', event => {
      event.target.closest('.reveal-pending')?.classList.add('reveal-visible');
    });

    motionPreference.addEventListener('change', () => {
      observer.disconnect();
      targets.forEach(element => element.classList.remove('reveal-pending', 'reveal-visible'));
    });
  }

  function initializeGreeting() {
    const element = document.querySelector('#hello-typed');
    if (!element) return;

    const greeting = 'Hello';
    const timing = { type: 350, delete: 220, visible: 5000, empty: 1600 };
    let timer;
    let position = greeting.length;
    let deleting = true;

    function tick() {
      position += deleting ? -1 : 1;
      element.textContent = greeting.slice(0, position);
      let delay = deleting ? timing.delete : timing.type;
      if (position === greeting.length) {
        deleting = true;
        delay = timing.visible;
      } else if (position === 0) {
        deleting = false;
        delay = timing.empty;
      }
      timer = window.setTimeout(tick, delay);
    }

    function reset() {
      window.clearTimeout(timer);
      element.textContent = greeting;
      position = greeting.length;
      deleting = true;
      if (!motionPreference.matches) timer = window.setTimeout(tick, timing.visible);
    }

    motionPreference.addEventListener('change', reset);
    reset();
  }
})();
