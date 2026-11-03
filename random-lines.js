document.querySelector('#year').textContent = new Date().getFullYear();
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
