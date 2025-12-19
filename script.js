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
});
