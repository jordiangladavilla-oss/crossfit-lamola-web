/* CrossFit La Mola. — shared behaviour */
(function(){
  // NAV scrolled + bone awareness
  var nav = document.getElementById('nav');
  if (nav){
    var sections = Array.from(document.querySelectorAll('.sec, .hero, .page-hero, .cta-block, footer'));
    function isBoneAtTop(){
      var probeY = nav.offsetHeight + 12;
      for (var i=0;i<sections.length;i++){
        var s = sections[i]; var r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) return s.classList.contains('bone') || s.classList.contains('sec-bone-head');
      }
      return false;
    }
    function onScroll(){
      nav.classList.toggle('scrolled', window.scrollY > 24);
      nav.classList.toggle('on-bone', isBoneAtTop());
    }
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }

  // Reveal
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ io.observe(el); });

  // Forms: local demo submit
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var b = f.querySelector('.form-submit, button[type=submit]');
      if (b){ b.textContent = 'Enviat ✓'; b.style.background = 'var(--accent-hi)'; b.style.color = 'var(--ink)'; }
    });
  });
})();
