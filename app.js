const navLinks = [...document.querySelectorAll('.bottom-dock a')];
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

const dockToggle = document.querySelector('.dock-toggle');
const quickDock = document.querySelector('.bottom-dock');
function closeQuickDock() {
 quickDock.classList.remove('is-open');
 dockToggle.setAttribute('aria-expanded','false');
 dockToggle.setAttribute('aria-label','Open navigation');
}
dockToggle.addEventListener('click',()=>{
 const open = dockToggle.getAttribute('aria-expanded') !== 'true';
 quickDock.classList.toggle('is-open',open);
 dockToggle.setAttribute('aria-expanded',String(open));
 dockToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
});
quickDock.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeQuickDock));
document.addEventListener('click',event=>{if(!quickDock.contains(event.target)&&!dockToggle.contains(event.target))closeQuickDock();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&dockToggle.getAttribute('aria-expanded')==='true'){closeQuickDock();dockToggle.focus();}});
window.matchMedia('(max-width:760px)').addEventListener('change',closeQuickDock);
