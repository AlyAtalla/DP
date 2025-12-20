document.addEventListener('DOMContentLoaded',function(){
  const menuBtn=document.getElementById('menuBtn');
  const dropdown=document.getElementById('dropdown');

  if(menuBtn && dropdown){
    menuBtn.addEventListener('click',function(e){
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', (!expanded).toString());
      if(dropdown.hasAttribute('hidden')) dropdown.removeAttribute('hidden'); else dropdown.setAttribute('hidden','');
    });

    document.addEventListener('click',function(e){
      if(!menuBtn.contains(e.target) && !dropdown.contains(e.target)){
        dropdown.setAttribute('hidden','');
        menuBtn.setAttribute('aria-expanded','false');
      }
    });
  }

  const sections = document.querySelectorAll('main section, .hero');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
        }
      });
    },{threshold:0.15});
    sections.forEach(s=>obs.observe(s));
  } else { sections.forEach(s=>s.classList.add('in-view')); }

  const bg = document.querySelector('.bg-media img');
  if(bg){
    let latestKnownScrollY = 0;
    let ticking = false;
    function onScroll(){ latestKnownScrollY = window.scrollY; requestTick(); }
    function requestTick(){ if(!ticking){ requestAnimationFrame(update); } ticking = true; }
    function update(){
      ticking = false;
      const translate = Math.round(latestKnownScrollY * 0.15);
      bg.style.transform = `translate3d(0, ${translate}px, 0)`;
    }
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptAllBtn = document.getElementById('accept-all');
  const rejectAllBtn = document.getElementById('reject-all');
  const customizeBtn = document.getElementById('customize');
  const saveSettingsBtn = document.getElementById('save-settings');
  const cookieSettings = document.getElementById('cookie-settings');
  const analyticsCheckbox = document.getElementById('analytics');
  const marketingCheckbox = document.getElementById('marketing');

  function saveConsent(necessary, analytics, marketing) {
    const consent = { necessary:true, analytics, marketing, consentDate:new Date().toISOString() };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    cookieBanner.style.display='none';
  }

  function loadConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      const data = JSON.parse(consent);
      analyticsCheckbox.checked = data.analytics;
      marketingCheckbox.checked = data.marketing;
      return data;
    }
    return null;
  }

  if(cookieBanner){
    const existingConsent = loadConsent();
    if(!existingConsent) cookieBanner.style.display='block';

    acceptAllBtn.addEventListener('click', ()=>saveConsent(true,true,true));
    rejectAllBtn.addEventListener('click', ()=>saveConsent(true,false,false));
    customizeBtn.addEventListener('click', ()=>cookieSettings.classList.toggle('hidden'));
    saveSettingsBtn.addEventListener('click', ()=>{
      saveConsent(true, analyticsCheckbox.checked, marketingCheckbox.checked);
    });

    const manageCookiesLink = document.getElementById('manage-cookies');
    if(manageCookiesLink){
      manageCookiesLink.addEventListener('click', (e)=>{
        e.preventDefault();
        cookieBanner.style.display='block';
        cookieSettings.classList.remove('hidden');
      });
    }
  }
});
