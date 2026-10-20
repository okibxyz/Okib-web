const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if(event.matches) closeMenu(); });
const navLinks = [...navigation.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main > section')];
function updateNavigation() { let current = sections[0]; for (const section of sections) { if (section.getBoundingClientRect().top <= 160) current = section; } if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) current = sections.at(-1); navLinks.forEach(link => { const active = link.hash === '#' + current.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }
window.addEventListener('scroll', updateNavigation, {passive:true});
updateNavigation();
document.querySelector('#year').textContent = new Date().getFullYear();
