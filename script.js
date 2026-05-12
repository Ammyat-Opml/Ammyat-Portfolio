/* ============================================
   Portfolio scripts
   - No external dependencies
   - No tracking
   - Defensive against tampering
   ============================================ */
(function () {
  'use strict';

  // Year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------------------------------------------
     Email reveal — basic anti-scrape protection.
     The address is stored as Base64-decoded
     fragments assembled only when the user
     clicks the button. Not encryption, but
     it defeats most automated harvesters.
     Current value: ammyat@uwaterloo.ca
  -------------------------------------------- */
  var emailBtn = document.getElementById('emailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      var u = atob('YW1teWF0');             // 'ammyat'
      var d = atob('dXdhdGVybG9vLmNh');     // 'uwaterloo.ca'
      var addr = u + '@' + d;

      // Update label and create mailto on demand
      emailBtn.innerHTML = '';
      var span = document.createElement('span');
      span.textContent = addr;
      var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('width', '14');
      icon.setAttribute('height', '14');
      icon.setAttribute('aria-hidden', 'true');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '1.6');
      path.setAttribute('d', 'M8 6h10a2 2 0 012 2v10M16 6L4 18');
      icon.appendChild(path);

      emailBtn.appendChild(span);
      emailBtn.appendChild(icon);
      emailBtn.dataset.revealed = 'true';
      emailBtn.setAttribute('aria-label', 'Open email: ' + addr);

      // Replace button behaviour with mailto navigation
      emailBtn.onclick = function () {
        window.location.href = 'mailto:' + addr;
      };
    }, { once: true });
  }

  /* --------------------------------------------
     Intersection-observer reveal animations.
     Honours reduced-motion preferences.
  -------------------------------------------- */
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.project-header, .copy-grid, .keywords, .frame, .feature-image, .feature-video, .section-eyebrow, .about-headline, .about-main, .about-side, .contact-headline, .contact-sub, .contact-actions'
    );

    targets.forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------
     Smooth-scroll polyfill assist + offset for
     sticky header on anchor clicks.
  -------------------------------------------- */
  var headerOffset = 70;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });
})();
