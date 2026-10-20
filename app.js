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

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = [...document.querySelectorAll('.about-copy, .portrait-wrap, .timeline-item, .paper, .contact-image, .contact-copy, .experience > h2, .publications > .section-heading')];
let revealObserver;
function stopReveals() {
 if (revealObserver) revealObserver.disconnect();
 revealTargets.forEach(element => element.classList.remove('reveal-pending', 'reveal-visible'));
}
if (!motionPreference.matches && 'IntersectionObserver' in window) {
 revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add('reveal-visible');
    revealObserver.unobserve(entry.target);
   }
  });
 }, {threshold: 0.08});
 revealTargets.forEach(element => {
  if (element.getBoundingClientRect().top > window.innerHeight) {
   element.classList.add('reveal-pending');
   revealObserver.observe(element);
  }
 });
 document.addEventListener('focusin', event => {
  const target = event.target.closest('.reveal-pending');
  if (target) target.classList.add('reveal-visible');
 });
}
motionPreference.addEventListener('change', stopReveals);

const helloText = document.querySelector('#hello-typed');
if (helloText) {
 const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
 let helloTimer;
 let position = 0;
 let deleting = false;
 const word = 'Hello';
 function tickHello() {
  position += deleting ? -1 : 1;
  helloText.textContent = word.slice(0, position);
  let delay = deleting ? 100 : 180;
  if (position === word.length) { deleting = true; delay = 2400; }
  else if (position === 0) { deleting = false; delay = 800; }
  helloTimer = window.setTimeout(tickHello, delay);
 }
 function resetHello() {
  window.clearTimeout(helloTimer);
  helloText.textContent = word;
  position = word.length;
  deleting = true;
  if (!preference.matches) helloTimer = window.setTimeout(tickHello, 2400);
 }
 preference.addEventListener('change', resetHello);
 resetHello();
}

const sageShapes = document.querySelectorAll('.sage-shape');
if (sageShapes.length) {
 const sageMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 let sageFrame = 0;
 function paintSage() {
  sageFrame = 0;
  const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  sageShapes.forEach((shape, index) => {
   shape.style.transform = sageMotion.matches ? 'none' : 'translate3d(0,' + (progress * (index === 0 ? -140 : -290)) + 'px,0)';
  });
 }
 function queueSage() {
  if (!sageMotion.matches && !sageFrame) sageFrame = window.requestAnimationFrame(paintSage);
 }
 window.addEventListener('scroll', queueSage, {passive:true});
 window.addEventListener('resize', queueSage, {passive:true});
 sageMotion.addEventListener('change', paintSage);
 paintSage();
}
