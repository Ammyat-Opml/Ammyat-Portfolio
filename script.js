/* ============================================
   AUNG MYINT MYAT · PORTFOLIO v5
   Single-page app interactions
   - No external dependencies
   - No tracking
   ============================================ */
(function () {
  'use strict';

  /* --------------------------------------------
     Project data. Each project renders into the
     detail panel on demand.
  -------------------------------------------- */
  var PROJECTS = {
    vex: {
      num: '01',
      kicker: 'Robotics · Sep to Dec 2025',
      title: 'Autonomous Sorting Robot',
      deck: 'A VEX IQ robot that tries to sort mixed objects by size and colour on its own. It handles startup, sensing, navigation, sorting, and shutdown, all written in C++.',
      tags: ['Robotics', 'Embedded C++', 'Sensor integration', 'Mechanism design'],
      feature: { type: 'video', src: 'vex-demo.mp4', poster: 'vex-video-poster.jpg',
                 cap: 'A short demo of the full workflow: startup, sense, navigate, sort, shutdown.' },
      overview: 'This was a course project built on the VEX IQ platform. The goal was to put together a robot that could run a full autonomous routine on its own, so it powers on, looks around, drives toward objects, makes a guess about what each one is, and drops it into the right bin before shutting down. The workflow is written in C++ on VEXcode IQ, and I tried to build the mechanical side around what the sensors could actually see.',
      worked: [
        'Wrote the full workflow in C++, which helped reduce classification errors and made runs feel more consistent during testing.',
        'Hooked up bumper, optical, distance, and Touch LED sensors so the robot could tell objects apart by size and colour in mixed scenarios.',
        'Designed a chain-driven sizing mechanism, a custom shaft coupler, and a sorting arm with enough torque to move things reliably.'
      ],
      technical: ['C++', 'VEXcode IQ', 'Sensor fusion', 'State machines', 'Mechanism design', 'Chain drives', 'Torque calculation', 'Autonomous control', 'Debugging'],
      skills: ['Problem-solving', 'Iterative testing', 'Attention to detail', 'Self-directed learning'],
      gallery: [
        { src: 'vex-robot-1.jpg', tag: 'Fig. 02', cap: 'Chain drive, distance sensor, brain mount.' },
        { src: 'vex-robot-2.jpg', tag: 'Fig. 03', cap: 'Front view, sorting arm and intake.' },
        { src: 'vex-robot-3.jpg', tag: 'Fig. 04', cap: 'Top view, drivetrain and motor placement.' }
      ]
    },

    capstone: {
      num: '02',
      kicker: 'Capstone · Jan to Apr 2024',
      title: 'Golf Ball Picker',
      deck: 'A team capstone where we tried to design a small mechanism for picking up golf balls. We took it from a rough idea to a working prototype, a written report, and a presentation to faculty.',
      tags: ['Capstone', 'Mechanism design', 'SolidWorks', 'Prototyping'],
      feature: { type: 'image', src: 'golfball-prototype.jpg',
                 cap: 'The final prototype on the bench. Worm-gear actuation, a swinging arm, and a capture cup.' },
      overview: 'For our capstone, my team set out to design a small mechanism that could pick up golf balls. Most existing tools are either bulky or imprecise, so we wanted to try something more compact and repeatable that we could actually build, test, and present within the time and budget we had. We combined mechanical design, CAD modelling, and a fair amount of shop time to put together a working prototype, then wrote a technical report and presented the work to faculty.',
      worked: [
        'Helped design the mechanism in SolidWorks and worked through the gear ratios, geometry, and tolerances with the team.',
        'Did hands-on shop work to machine, assemble, and refine the prototype across about three rounds of bench testing.',
        'Contributed to the technical report and the final presentation to faculty and peers.'
      ],
      technical: ['SolidWorks', 'Mechanism design', 'Worm gear drive', 'CAD modelling', 'Tolerance analysis', 'Prototyping', 'Machining', 'Bench testing', 'Technical writing'],
      skills: ['Team collaboration', 'Iterative design', 'Time management', 'Technical presentation', 'Adaptability'],
      gallery: [
        { src: 'golfball-team.jpg', tag: 'Fig. 02', cap: 'The capstone team and our supervisor after final assembly review.' },
        { src: 'vex-cad.png', tag: 'Fig. 03', cap: 'Engineering drawing of the mechanism. Top, front, side, and isometric views.', paper: true }
      ]
    },

    sandwich: {
      num: '03',
      kicker: 'Tool Design · Sep to Dec 2023',
      title: 'Sandwich Drill Jig',
      deck: 'A small fixture for drilling holes through several stacked parts at once, designed to keep everything aligned without needing a lot of operator skill.',
      tags: ['Jig and fixture design', 'SolidWorks', 'GD&T'],
      feature: { type: 'image', src: 'sandwich-drill-drawing.png', paper: true,
                 cap: 'Assembly drawing with BOM, dimensioning, and tolerance block.' },
      overview: 'When you are drilling through several stacked parts, keeping the holes lined up across every layer is harder than it sounds. Manual clamping and eyeballing the position tends to cause drift, especially with thin layered materials. For this course project, I designed a drill jig that holds the workpieces in a sandwich arrangement, so an operator can load the parts the same way every time and get the same hole pattern back.',
      worked: [
        'Designed the jig in SolidWorks with locating pins, hardened drill bushings, and rigid top and base plates.',
        'Worked through tolerances, dimensioning, and a bill of materials for the full assembly and detail drawings.',
        'Produced a fully annotated GA drawing with a tolerance block, ready for shop interpretation.'
      ],
      technical: ['SolidWorks', 'Jig and fixture design', 'GD&T', 'Tolerance analysis', 'Drill bushings', 'Locating pins', 'Bill of materials', 'Assembly drawings', 'Detail drawings'],
      skills: ['Attention to detail', 'Design for manufacturability', 'Process thinking', 'Technical documentation'],
      gallery: [
        { src: 'sandwich-drill-3d.png', tag: 'Fig. 02', cap: '3D assembly view. Top plate, base plate, spring stop buttons.', paper: true }
      ]
    },

    tooldesign: {
      num: '04',
      kicker: 'Tool Design coursework · 2023',
      title: 'Drill Jig & Press Tooling',
      deck: 'A foundational tool design course where I worked on jigs, fixtures, and basic press dies, with the deliverable being a set of fully annotated SolidWorks drawings.',
      tags: ['Tool design', 'Press dies', 'SolidWorks', 'CAD drawings'],
      feature: { type: 'image', src: 'tool-design-drawing.png', paper: true,
                 cap: 'Assembly drawing. Base plate, knee crank, locating pins.' },
      overview: 'This course was an introduction to tool design, with a focus on jig and fixture design and die design. We covered drilling and milling fixtures, holding and assembly jigs, and basic pressworking dies like blanking and piercing tools. For my main deliverable, I designed a drill jig in SolidWorks meant to keep hole alignment and depth consistent while holding the workpiece securely. The drawing set details the locating pins, bushings, clamps, and base plate, along with the calculations and material choices behind them.',
      worked: [
        'Designed a custom drill jig and produced fully dimensioned assembly and detail drawings in SolidWorks.',
        'Worked through the calculations and material research, then validated the design before drafting.',
        'Studied basic press die design, including blanking and piercing tools, alongside the jig work.'
      ],
      technical: ['SolidWorks', 'Tool design', 'Jig and fixture design', 'Die design', 'Blanking and piercing', 'Drill bushings', 'Material selection', 'Engineering calculations', 'Assembly drawings'],
      skills: ['Precision focus', 'Design validation', 'Technical research', 'Safety mindset'],
      gallery: [
        { src: 'tool-design-3d.png', tag: 'Fig. 02', cap: '3D model. Crank arm, clamping cylinder, base plate.', paper: true }
      ]
    }
  };

  var ORDER = ['vex', 'capstone', 'sandwich', 'tooldesign'];

  /* --------------------------------------------
     Small helpers
  -------------------------------------------- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* --------------------------------------------
     Build the project detail markup
  -------------------------------------------- */
  function renderProject(key) {
    var p = PROJECTS[key];
    if (!p) return '';

    var html = '';

    // Hero
    html += '<div class="pd-hero">';
    html += '<div class="pd-eyebrow"><span class="pd-num">' + esc(p.num) + '</span><span>' + esc(p.kicker) + '</span></div>';
    html += '<h2 class="pd-title">' + esc(p.title) + '</h2>';
    html += '<p class="pd-deck">' + esc(p.deck) + '</p>';
    html += '<div class="pd-tags">';
    p.tags.forEach(function (t) { html += '<span>' + esc(t) + '</span>'; });
    html += '</div>';
    html += '</div>';

    // Feature media
    if (p.feature) {
      if (p.feature.type === 'video') {
        html += '<figure class="pd-feature pd-feature-video">';
        html += '<video src="' + esc(p.feature.src) + '" poster="' + esc(p.feature.poster) + '" autoplay muted loop playsinline preload="metadata" aria-label="Project demonstration"></video>';
        html += '</figure>';
      } else {
        html += '<figure class="pd-feature">';
        html += '<div class="pd-shot-img' + (p.feature.paper ? ' is-paper' : '') + '" style="aspect-ratio:auto;padding:0;border:none;border-radius:0;">';
        html += '<img src="' + esc(p.feature.src) + '" alt="' + esc(p.title) + '" />';
        html += '</div>';
        html += '</figure>';
      }
      if (p.feature.cap) {
        html += '<p class="pd-caption"><span class="cap-tag">Fig. 01</span><span>' + esc(p.feature.cap) + '</span></p>';
      }
    }

    // Two-column copy
    html += '<div class="pd-cols">';
    html += '<div class="pd-col"><h3>Overview</h3><p>' + esc(p.overview) + '</p></div>';
    html += '<div class="pd-col"><h3>What I worked on</h3><ul class="pd-list">';
    p.worked.forEach(function (w) { html += '<li><span>' + esc(w) + '</span></li>'; });
    html += '</ul></div>';
    html += '</div>';

    // Keywords
    html += '<div class="pd-keywords">';
    html += '<div class="pd-kw-row"><span class="pd-kw-label">Technical</span><ul class="pd-kw-list">';
    p.technical.forEach(function (t) { html += '<li>' + esc(t) + '</li>'; });
    html += '</ul></div>';
    html += '<div class="pd-kw-row"><span class="pd-kw-label">Skills</span><ul class="pd-kw-list">';
    p.skills.forEach(function (s) { html += '<li>' + esc(s) + '</li>'; });
    html += '</ul></div>';
    html += '</div>';

    // Gallery
    if (p.gallery && p.gallery.length) {
      html += '<p class="pd-section-label">Gallery</p>';
      var gcls = p.gallery.length >= 3 ? 'pd-gallery-3' : (p.gallery.length === 2 ? 'pd-gallery-2' : 'pd-gallery-2');
      html += '<div class="pd-gallery ' + gcls + '">';
      p.gallery.forEach(function (g) {
        html += '<figure class="pd-shot">';
        html += '<div class="pd-shot-img' + (g.paper ? ' is-paper' : '') + '"><img src="' + esc(g.src) + '" alt="' + esc(g.cap) + '" loading="lazy" /></div>';
        html += '<figcaption><span class="cap-tag">' + esc(g.tag) + '</span><span>' + esc(g.cap) + '</span></figcaption>';
        html += '</figure>';
      });
      html += '</div>';
    }

    return html;
  }

  /* --------------------------------------------
     Panel control
  -------------------------------------------- */
  var panel = document.getElementById('panel');
  var panelBody = document.getElementById('panel-body');
  var aboutPanel = document.getElementById('about-panel');
  var contactPanel = document.getElementById('contact-panel');
  var lastFocus = null;

  function lockScroll(on) {
    document.body.style.overflow = on ? 'hidden' : '';
  }

  function openProject(key) {
    if (!PROJECTS[key]) return;
    lastFocus = document.activeElement;
    panelBody.innerHTML = renderProject(key);
    panelBody.scrollTop = 0;
    var sheet = panel.querySelector('.panel-sheet');
    if (sheet) sheet.scrollTop = 0;

    // Mark active in switcher
    panel.querySelectorAll('.panel-switch button').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-jump') === key);
    });

    panel.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    var closeBtn = panel.querySelector('.panel-close');
    if (closeBtn) closeBtn.focus();

    // Update hash for shareable links / back button
    history.replaceState(null, '', '#' + key);
  }

  function closeProject() {
    panel.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    history.replaceState(null, '', location.pathname);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    // Pause video to save resources
    var v = panelBody.querySelector('video');
    if (v) { try { v.pause(); } catch (e) {} }
  }

  function openMini(p) {
    lastFocus = document.activeElement;
    p.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    var closeBtn = p.querySelector('.panel-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeMini(p) {
    p.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* --------------------------------------------
     Wire up events
  -------------------------------------------- */
  // Project cards
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
      openProject(card.getAttribute('data-project'));
    });
  });

  // In-panel project switcher
  document.querySelectorAll('.panel-switch button').forEach(function (b) {
    b.addEventListener('click', function () {
      openProject(b.getAttribute('data-jump'));
    });
  });

  // Close project panel
  document.querySelectorAll('[data-close-panel]').forEach(function (b) {
    b.addEventListener('click', closeProject);
  });

  // About panel
  document.querySelectorAll('[data-open-about]').forEach(function (b) {
    b.addEventListener('click', function () { openMini(aboutPanel); });
  });
  document.querySelectorAll('[data-close-about]').forEach(function (b) {
    b.addEventListener('click', function () { closeMini(aboutPanel); });
  });

  // Contact panel
  document.querySelectorAll('[data-open-contact]').forEach(function (b) {
    b.addEventListener('click', function () { openMini(contactPanel); });
  });
  document.querySelectorAll('[data-close-contact]').forEach(function (b) {
    b.addEventListener('click', function () { closeMini(contactPanel); });
  });

  // Escape key closes whatever is open
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (panel.getAttribute('aria-hidden') === 'false') closeProject();
    else if (aboutPanel.getAttribute('aria-hidden') === 'false') closeMini(aboutPanel);
    else if (contactPanel.getAttribute('aria-hidden') === 'false') closeMini(contactPanel);
  });

  // Open project from URL hash on load (shareable deep links)
  function checkHash() {
    var h = (location.hash || '').replace('#', '');
    if (PROJECTS[h]) openProject(h);
  }
  checkHash();

  /* --------------------------------------------
     Footer year
  -------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------------------------------------------
     Email reveal — Base64-fragmented anti-scrape.
     Current value: ammyat@uwaterloo.ca
  -------------------------------------------- */
  var emailBtn = document.getElementById('emailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      var u = atob('YW1teWF0');             // 'ammyat'
      var d = atob('dXdhdGVybG9vLmNh');     // 'uwaterloo.ca'
      var addr = u + '@' + d;

      emailBtn.innerHTML = '';
      var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('width', '16');
      icon.setAttribute('height', '16');
      icon.setAttribute('aria-hidden', 'true');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '1.7');
      path.setAttribute('d', 'M8 6h10a2 2 0 012 2v10M16 6L4 18');
      icon.appendChild(path);
      var span = document.createElement('span');
      span.textContent = addr;

      emailBtn.appendChild(icon);
      emailBtn.appendChild(span);
      emailBtn.dataset.revealed = 'true';
      emailBtn.setAttribute('aria-label', 'Open email: ' + addr);

      emailBtn.onclick = function () {
        window.location.href = 'mailto:' + addr;
      };
    }, { once: true });
  }

})();
