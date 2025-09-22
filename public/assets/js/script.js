// Mobile drawer toggle
    const btnHamburger = document.getElementById('btnHamburger');
    btnHamburger?.addEventListener('click', () => {
      const open = !document.body.classList.contains('drawer-open');
      document.body.classList.toggle('drawer-open', open);
      btnHamburger.setAttribute('aria-expanded', open ? 'true':'false');
    });
    document.addEventListener('click', (e)=>{
      if(window.matchMedia('(max-width:1023.98px)').matches){
        const sb = document.getElementById('sidebar');
        if(document.body.classList.contains('drawer-open') && !sb.contains(e.target) && e.target !== btnHamburger){
          document.body.classList.remove('drawer-open');
          btnHamburger.setAttribute('aria-expanded','false');
        }
      }
    });

    // Sidebar expand/collapse for items with submenu
    document.querySelectorAll('.nav > li > a.has-children').forEach(a => {
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        const li = a.parentElement;
        li.classList.toggle('open');
      });
    });

    // Card collapse buttons
    document.querySelectorAll('[data-collapse-target]').forEach(btn => {
      btn.addEventListener('click', ()=>{
        const sel = btn.getAttribute('data-collapse-target');
        const box = document.querySelector(sel);
        if(!box) return;
        const isHidden = box.style.display === 'none';
        box.style.display = isHidden ? '' : 'none';
        btn.innerHTML = isHidden ? '<i class="bi bi-caret-up-fill"></i>' : '<i class="bi bi-caret-down-fill"></i>';
      });
    });

    // Keep active look stable when hovering other items (handled by CSS already)
    // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()