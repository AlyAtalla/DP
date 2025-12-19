document.addEventListener('DOMContentLoaded',function(){
  const menuBtn=document.getElementById('menuBtn');
  const dropdown=document.getElementById('dropdown');

  if(menuBtn && dropdown){
    menuBtn.addEventListener('click',function(e){
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', (!expanded).toString());
      if(dropdown.hasAttribute('hidden')) dropdown.removeAttribute('hidden'); else dropdown.setAttribute('hidden','');
    });

    // Close dropdown on outside click
    document.addEventListener('click',function(e){
      if(!menuBtn.contains(e.target) && !dropdown.contains(e.target)){
        dropdown.setAttribute('hidden','');
        menuBtn.setAttribute('aria-expanded','false');
      }
    });
  }

  // Basic contact form handler (demo only)
  const form=document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      alert('Thank you. This example form does not send messages — please configure a backend or mailto link.');
      form.reset();
    });
  }

  // Smooth reveal for sections using IntersectionObserver
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
  } else {
    // fallback: reveal all
    sections.forEach(s=>s.classList.add('in-view'));
  }

  // Subtle parallax on bg-media
  const bg = document.querySelector('.bg-media img');
  if(bg){
    let latestKnownScrollY = 0;
    let ticking = false;
    function onScroll(){
      latestKnownScrollY = window.scrollY;
      requestTick();
    }
    function requestTick(){
      if(!ticking){
        requestAnimationFrame(update);
      }
      ticking = true;
    }
    function update(){
      ticking = false;
      const translate = Math.round(latestKnownScrollY * 0.15);
      bg.style.transform = `translate3d(0, ${translate}px, 0)`;
    }
    window.addEventListener('scroll', onScroll, {passive:true});
  }
});
