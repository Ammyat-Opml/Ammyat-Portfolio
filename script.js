/* ============================================================
   Aung Myint Myat — Portfolio interactions
   No external dependencies · no tracking · all wired here
   ============================================================ */
(function () {
  'use strict';

  // JS is active — CSS reveals stay visible if this file ever fails to load.
  document.documentElement.classList.add('js');

  /* ---------- project data ---------- */
  var LEG_CALC = {
    basis: 'Joint torques were sized from anthropometric body proportions for a 1.6 m, 50 kg build. Each joint was checked across standing, walking, stair-landing, and trip loads, and walking at 1.5 times body weight sets the design point. The figures below are the peaks each actuator has to clear.',
    peaks: [
      ['Ankle pitch (FFE)', '153.2 mm', '112.7 N·m', 'Walking push-off'],
      ['Ankle roll (FAA)', '44.0 mm', '32.4 N·m', 'Lateral balance'],
      ['Knee (KFE), walking', '101.9 mm', '75.0 N·m', 'Knee bent 15°'],
      ['Knee (KFE), stairs', '196.0 mm', '144.2 N·m', 'Stair climbing']
    ],
    actuators: [
      ['Ankle', '2 × RobStride RS03 (60 N·m each), differential', '1.06× pitch · 1.85× roll'],
      ['Knee', '1 × RobStride RS04 (120 N·m)', '1.60× walking · 0.83× stairs']
    ],
    full: [
      ['1 — Body segment dimensions', ['H = 1.6 m     m = 50.0 kg     (joint centres from ground)', 'L_foot  = 0.152 × H = 0.2432 m   (243.2 mm)', 'W_foot  = 0.055 × H = 0.0880 m   (88.0 mm)', 'h_ankle = 0.039 × H = 0.0624 m   (62.4 mm)', 'h_knee  = 0.285 × H = 0.4560 m   (456.0 mm)', 'L_shank = 0.246 × H = 0.3936 m   (393.6 mm)', 'L_thigh = 0.245 × H = 0.3920 m   (392.0 mm)']],
      ['2 — Ankle position and moment arms', ['Ankle sits at 37% of foot length from the heel', 'x_ankle = 0.37 × L_foot = 0.0900 m   (90.0 mm)', 'r_FFE = L_foot − x_ankle = 0.1532 m  (153.2 mm)', 'r_FAA = W_foot / 2 = 0.0440 m        (44.0 mm)']],
      ['3 — Ground reaction force', ['BW = m × g = 50.0 × 9.81 = 490.50 N', 'Standing   1.0 × BW =  490.50 N', 'Walking    1.5 × BW =  735.75 N   ← design basis', 'Landing    2.5 × BW = 1226.25 N', 'Trip       3.5 × BW = 1716.75 N', '(the 1.5× walking factor is real load, not a margin)']],
      ['4 — Ankle pitch torque (FFE)', ['τ = F × r_FFE', 'Walking    735.75 × 0.1532 = 112.72 N·m   ← governs', 'Landing   1226.25 × 0.1532 = 187.86 N·m', 'Trip      1716.75 × 0.1532 = 263.01 N·m', 'Peak required: 112.72 N·m']],
      ['5 — Ankle roll torque (FAA)', ['τ = F_walking × (W_foot / 2)', '  = 735.75 × 0.0440 = 32.37 N·m', 'Cross-check (40% rule): 0.40 × 112.72 = 45.09 N·m', 'Peak required: 32.37 N·m']],
      ['6 — Differential coupling (two motors)', ['Both motors same direction   → pitch (torques add)', 'Motors opposite directions   → roll  (one motor)', 'Pitch shares over two motors:  each ≥ 112.72 / 2 = 56.36 N·m', 'Roll on one motor:             each ≥ 32.37 N·m', 'Per-motor requirement: 56.36 N·m  (pitch sharing governs)']],
      ['7 — Knee moment arm (geometry)', ['The knee shifts off the GRF line as it bends:', 'd_knee = L_shank × sin(θ)', 'Walking (θ = 15°):   0.3936 × 0.2588 = 0.1019 m   (101.9 mm)', 'Stairs (half-thigh): L_thigh / 2 = 0.1960 m       (196.0 mm)']],
      ['8 — Knee torque (KFE)', ['τ_knee = F_walking × d_knee', 'Walking   735.75 × 0.1019 =  74.97 N·m', 'Stairs    735.75 × 0.1960 = 144.21 N·m']],
      ['9 — Knee torque vs bend angle', ['θ =  0°    d =   0.0 mm    τ =   0.0 N·m   (mid-stance)', 'θ = 15°    d = 101.9 mm    τ =  75.0 N·m   (walking)', 'θ = 30°    d = 196.8 mm    τ = 144.8 N·m   (fast walk)', 'θ = 45°    d = 278.3 mm    τ = 204.8 N·m   (steep stair)', 'θ = 90°    d = 393.6 mm    τ = 289.6 N·m   (deep squat)']],
      ['10 — Actuator selection', ['Ankle: 2 × RobStride RS03 (60 N·m each), differential', '  pitch     120 / 112.72 = 1.06×   (both motors)', '  roll       60 /  32.37 = 1.85×   (single motor)', '  per-motor  60 /  56.36 = 1.06×', 'Knee: 1 × RobStride RS04 (120 N·m)', '  walking   120 /  74.97 = 1.60×', '  stairs    120 / 144.21 = 0.83×   (gentle stairs)', 'High-ratio gearboxes (AK80-64) are not backdrivable,', 'so they are avoided for leg joints.']],
      ['11 — Actuator mass (per robot)', ['Ankles   4 × RS03  @ 880 g   = 3,520 g', 'Knees    2 × RS04  @ 1,420 g = 2,840 g', 'Total (6 actuators)          = 6,360 g  (6.36 kg)']]
    ]
  };

  var PROJECTS = {
    leg: {
      num: '01', kicker: 'WATonomous · Humanoid Autonomy · 2026', title: 'Humanoid Knee &amp; Ankle',
      role: 'Hardware Designer · my own leg design, sized from first principles',
      deck: 'A two degree of freedom ankle and a one degree of freedom knee for a humanoid leg. I sized every joint from anthropometric body proportions, drove the actuator choice from the load cases, and packaged the result into a differential ankle that keeps the foot light.',
      lead: { kind: 'float', src: 'leg-hero.png', cap: 'Ankle and knee assembly: shin housing, differential linkage, and foot.' },
      overview: 'This is my lower-limb design for a humanoid robot, covering three degrees of freedom: a two-DOF ankle that pitches front to back and rolls side to side, plus a one-DOF knee. I built it as part of my hardware work with WATonomous, where I also designed the forearm structure. I sized each joint from the ground up, locating the joint centres from body proportions and working out the moment arms and peak torques across the full range of motion, from standing through walking push-off to stair landing and trip loads. Those load cases drove the actuator choice rather than the other way around.',
      worked: [
        'Sized the ankle and knee joints from first-principles torque analysis, scaling the ground reaction force to body weight across standing, walking, stair-landing, and trip loads to find the governing case for each degree of freedom.',
        'Designed a <b>differential ankle drive</b> where two motors produce pitch when they turn together and roll when they turn against each other, so both ankle axes share one actuator pair mounted high on the shank.',
        'Selected actuators against the calculated peaks, landing on two <b>RobStride RS03</b> per ankle (1.06× on pitch) and one <b>RS04</b> per knee, and ruled out non-backdrivable high-ratio gearboxes since a leg joint has to give under load.',
        'Modelled the full leg assembly in <b>SolidWorks</b> (shin housing, differential linkage, and foot) and carried the joint geometry into the team’s revision-controlled build pipeline.'
      ],
      technical: ['SolidWorks', 'OnShape', 'Differential drive', 'Torque analysis', 'Anthropometric scaling', 'Ground reaction force', 'Moment-arm analysis', 'Actuator selection', 'Backdrivability', 'Kinematics', 'GD&amp;T'],
      skills: ['First-principles analysis', 'Requirements-driven design', 'Design trade-offs', 'Systems thinking'],
      media: [
        { kind: 'float', src: 'leg-detail.png', cap: 'Three-quarter view of the ankle differential and the foot linkage.' },
        { kind: 'light', src: 'leg-joints.png', cap: 'Joint-layout concept: the A and B motors drive pitch together and roll opposed, through a differential.' }
      ],
      calc: LEG_CALC,
      sub: {
        k: 'Also on this team', h: 'Humanoid Forearm Structure',
        points: [
          'Designed the forearm actuator housing and joint geometry from structural load calculations in SolidWorks and OnShape.',
          'Applied GD&amp;T and tolerance stack-up analysis and released revision-controlled 2D drawings into the team build pipeline, coordinating mounting and wiring with the firmware and electrical teams.'
        ],
        media: [
          { kind: 'dark', src: 'forearm-1.png', cap: 'Forearm actuator housing: mounting face, output boss, and tapered body.' },
          { kind: 'dark', src: 'forearm-2.png', cap: 'Alternate view: cylindrical actuator body and end-cap fastener ring.' }
        ]
      }
    },

    vex: {
      num: '02', kicker: 'VEX Robotics · 2025', title: 'Autonomous Sorting Robot',
      deck: 'A VEX IQ robot that sorts mixed objects by size and colour on its own, from startup through sensing, navigation, sorting, and shutdown. The workflow is written in C++ and built around what the sensors could actually see.',
      lead: { kind: 'video', src: 'vex-demo.mp4', poster: 'vex-poster.jpg', cap: 'Full autonomous run: start up, sense, navigate, sort, and shut down.' },
      overview: 'This was a course project on the VEX IQ platform. The goal was a robot that could run a full autonomous routine on its own, so it powers on, looks around, drives toward objects, makes a guess about what each one is, and drops it into the right bin before shutting down. I wrote the control loop in C++ on VEXcode IQ and built the mechanical side around the sensing.',
      worked: [
        'Achieved <b>zero classification errors</b> by designing a chain-driven sorting mechanism and writing a full C++ control loop that integrates four sensor types.',
        'Resolved an intermittent failure by root-causing an <b>interrupt-latency race condition</b> in C++ and restructuring the sensor priority logic.',
        'Built the mechanical side around the sensing: a chain-driven sizing stage, a custom shaft coupler, and a sorting arm with enough torque to move parts reliably.'
      ],
      technical: ['C++', 'VEXcode IQ', 'Sensor fusion', 'State machines', 'Interrupt handling', 'Chain drives', 'Mechanism design', 'Torque calculation', 'Debugging'],
      skills: ['Problem-solving', 'Root-cause analysis', 'Iterative testing'],
      media: [
        { kind: 'photo', src: 'vex-1.jpg', cap: 'Chain drive, distance sensor, and brain mount.' },
        { kind: 'photo', src: 'vex-2.jpg', cap: 'Front view: sorting arm and intake.' },
        { kind: 'photo', src: 'vex-3.jpg', cap: 'Top view: drivetrain and motor placement.' }
      ]
    },

    capstone: {
      num: '03', kicker: 'Capstone · 2024', title: 'Golf Ball Picker',
      deck: 'A team capstone: an automated mechanism for retrieving golf balls, taken from concept to a working prototype, a technical report, and a live demo to faculty.',
      lead: { kind: 'photo', src: 'golf-proto.jpg', cap: 'The final prototype: worm-gear actuation, a swinging arm, and a capture cup.' },
      overview: 'For our capstone, my team set out to design a mechanism that could pick up golf balls. Many existing tools are bulky or imprecise, so we wanted something compact and repeatable that we could build, test, and present within the time and budget we had. I worked as the mechanical lead, combining CAD, tolerance work, and a fair amount of shop time to put together a working prototype.',
      worked: [
        'Designed and fabricated an automated retrieval prototype in <b>SolidWorks</b> and <b>Inventor</b> using GD&amp;T, tolerance analysis, and lathe, milling, and 3D printing.',
        'Validated every spec through <b>failure-analysis testing</b> and delivered a live demo that was accepted without redline items.',
        'Worked as the mechanical lead through the gear ratios, geometry, and tolerances with the team across several rounds of bench testing.'
      ],
      technical: ['SolidWorks', 'Autodesk Inventor', 'Worm gear drive', 'GD&amp;T', 'Tolerance analysis', 'Prototyping', 'Machining', 'Failure analysis', 'Technical writing'],
      skills: ['Team collaboration', 'Iterative design', 'Technical presentation'],
      media: [
        { kind: 'photo', src: 'golf-team.jpg', cap: 'The capstone team and our supervisor after the final assembly review.' },
        { kind: 'light', src: 'golf-drawing.png', cap: 'Engineering drawing: dimensioned views of the retrieval mechanism.' }
      ]
    },

    sandwich: {
      num: '04', kicker: 'Tool Design · 2023', title: 'Sandwich Drill Jig',
      deck: 'A precision fixture that holds stacked parts in a sandwich so an operator gets the same hole pattern every time, without relying on skill.',
      lead: { kind: 'float', src: 'sandwich-3d.png', cap: '3D assembly: top plate, base plate, and spring stop buttons.' },
      overview: 'When you are drilling through several stacked parts, keeping the holes lined up across every layer is harder than it sounds. Manual clamping and eyeballing the position tends to cause drift, especially with thin layered materials. For this course project, I designed a drill jig that holds the workpieces in a sandwich arrangement, so the parts load the same way every time and the same hole pattern comes back.',
      worked: [
        'Designed the jig in <b>SolidWorks</b> with locating pins, hardened <b>drill bushings</b>, and rigid top and base plates to hold hole alignment across layers.',
        'Worked through tolerances, dimensioning, and a bill of materials for the full assembly and detail drawings.',
        'Produced a fully annotated GA drawing with a tolerance block, ready for shop interpretation.'
      ],
      technical: ['SolidWorks', 'Jig &amp; fixture design', 'GD&amp;T', 'Tolerance analysis', 'Drill bushings', 'Locating pins', 'Bill of materials', 'Detail drawings'],
      skills: ['Attention to detail', 'DFM', 'Technical documentation'],
      media: [
        { kind: 'light', src: 'sandwich-drawing.png', cap: 'Assembly drawing with BOM, dimensioning, and tolerance block.' }
      ]
    },

    tooldesign: {
      num: '05', kicker: 'Tool Design coursework · 2023', title: 'Drill Jig &amp; Press Tooling',
      deck: 'Foundational tool design coursework in jig, fixture, and press-die design. The main deliverable was a custom drill jig with fully dimensioned SolidWorks drawings.',
      lead: { kind: 'float', src: 'tool-3d.png', cap: '3D model: crank arm, clamping cylinder, and base plate.' },
      overview: 'This course was an introduction to tool design, with a focus on jig and fixture design and die design. We covered drilling and milling fixtures, holding and assembly jigs, and pressworking dies like blanking and piercing tools. For my main deliverable, I designed a drill jig meant to keep hole alignment and depth consistent while holding the workpiece securely.',
      worked: [
        'Designed a custom drill jig and produced fully dimensioned assembly and detail drawings in <b>SolidWorks</b>.',
        'Backed the design with <b>engineering calculations</b> and material selection, then validated it before drafting.',
        'Studied press-die design, including blanking and piercing tools, alongside the jig work.'
      ],
      technical: ['SolidWorks', 'Tool design', 'Jig &amp; fixture design', 'Die design', 'Blanking &amp; piercing', 'Material selection', 'Engineering calculations', 'Detail drawings'],
      skills: ['Precision focus', 'Design validation', 'Safety mindset'],
      media: [
        { kind: 'light', src: 'tool-drawing.png', cap: 'Assembly drawing: base plate, knee crank, and locating pins.' }
      ]
    }
  };
  var ORDER = ['leg', 'vex', 'capstone', 'sandwich', 'tooldesign'];

  /* ---------- render helpers ---------- */
  function figHTML(m) {
    var inner = (m.kind === 'video')
      ? '<video controls preload="metadata" poster="' + m.poster + '"><source src="' + m.src + '" type="video/mp4"></video>'
      : '<img src="' + m.src + '" alt="" loading="lazy" />';
    var cap = m.cap ? '<figcaption class="pd-cap">' + m.cap + '</figcaption>' : '';
    return '<figure class="pd-fig ' + m.kind + '">' + inner + cap + '</figure>';
  }

  function calcHTML(c) {
    var h = '<p class="pd-h">Design calculations</p>';
    h += '<p class="pd-calc-basis">' + c.basis + '</p>';
    // peaks
    h += '<p class="pd-h" style="margin-top:0">Peak torque per joint</p><div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>Joint</th><th>Moment arm</th><th>Peak torque</th><th>Governing case</th></tr></thead><tbody>';
    c.peaks.forEach(function (r) { h += '<tr><td>' + r[0] + '</td><td class="num">' + r[1] + '</td><td class="num">' + r[2] + '</td><td>' + r[3] + '</td></tr>'; });
    h += '</tbody></table></div>';
    // actuators
    h += '<p class="pd-h">Actuator selection</p><div class="pd-table-wrap"><table class="pd-table"><thead><tr><th>Joint</th><th>Actuator</th><th>Safety factor</th></tr></thead><tbody>';
    c.actuators.forEach(function (r) { h += '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td class="num">' + r[2] + '</td></tr>'; });
    h += '</tbody></table></div>';
    // full derivation
    var steps = '';
    c.full.forEach(function (s) {
      steps += '<div class="pd-step"><div class="pd-step-h">' + s[0] + '</div><div class="pd-pre">' + s[1].join('\n') + '</div></div>';
    });
    h += '<details class="pd-details"><summary>Full derivation (11 steps)</summary><div class="pd-steps">' + steps + '</div></details>';
    h += '<p class="pd-note">Sizing basis: a 1.6 m, 50 kg build, walking at 1.5× body weight. Peaks shown are the continuous requirement; landing and trip loads sit inside each actuator’s peak rating.</p>';
    h += '<a class="pd-report" href="ankle-knee-calculations.pdf" target="_blank" rel="noopener">'
      + '<span class="pd-report-ic"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM14 3v5h5"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M9 13h6M9 16h6M9 10h2"/></svg></span>'
      + '<span class="pd-report-tx"><b>Full torque calculation (PDF)</b><span>Peak-torque analysis &amp; actuator selection · 4 pages</span></span>'
      + '<svg class="pd-report-dl" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 3v12M8 11l4 4 4-4M5 21h14"/></svg></a>';
    return h;
  }

  function renderProject(key) {
    var p = PROJECTS[key];
    var h = '';
    h += '<p class="pd-kicker">' + p.kicker + '</p>';
    h += '<div class="pd-head"><span class="pd-num">' + p.num + '</span><h2 class="pd-title">' + p.title + '</h2></div>';
    if (p.role) h += '<p class="pd-role">' + p.role + '</p>';
    h += '<p class="pd-deck">' + p.deck + '</p>';
    if (p.lead) h += '<div class="pd-media">' + figHTML(p.lead) + '</div>';
    h += '<hr class="pd-rule" />';
    h += '<p class="pd-h" style="margin-top:0">Overview</p><p class="pd-body-text">' + p.overview + '</p>';
    h += '<p class="pd-h">What I did</p><ul class="pd-worked">';
    p.worked.forEach(function (w) { h += '<li>' + w + '</li>'; });
    h += '</ul>';
    h += '<p class="pd-tagrow"><span class="k">Technical</span><b>' + p.technical.join('</b> · <b>') + '</b></p>';
    h += '<p class="pd-tagrow"><span class="k">Skills</span>' + p.skills.join(' · ') + '</p>';
    if (p.calc) h += calcHTML(p.calc);
    if (p.media && p.media.length) {
      h += '<p class="pd-h">Gallery</p><div class="pd-media">';
      p.media.forEach(function (m) { h += figHTML(m); });
      h += '</div>';
    }
    if (p.sub) {
      h += '<div class="pd-sub"><p class="pd-sub-k">' + p.sub.k + '</p><h3 class="pd-sub-h">' + p.sub.h + '</h3>';
      h += '<ul class="pd-worked" style="margin-top:.8rem">';
      p.sub.points.forEach(function (w) { h += '<li>' + w + '</li>'; });
      h += '</ul><div class="pd-media" style="margin-top:1rem">';
      p.sub.media.forEach(function (m) { h += figHTML(m); });
      h += '</div></div>';
    }
    h += '<div class="pd-cta"><button class="btn btn-solid" data-scroll="contact" data-from-panel type="button"><span>Get in touch</span></button></div>';
    return h;
  }

  /* ---------- panel control ---------- */
  var panel = document.getElementById('panel');
  var panelBody = document.getElementById('panel-body');
  var panelSheet = panel ? panel.querySelector('.panel-sheet') : null;
  var lastFocus = null;

  function openProject(key) {
    if (!PROJECTS[key] || !panel) return;
    panelBody.innerHTML = renderProject(key);
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (panelSheet) panelSheet.scrollTop = 0;
    document.querySelectorAll('.panel-switch [data-jump]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-jump') === key);
    });
    lastFocus = document.activeElement;
    var close = panel.querySelector('.panel-close'); if (close) close.focus();
  }
  function closeProject() {
    if (!panel) return;
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // open from any [data-project]
  document.querySelectorAll('[data-project]').forEach(function (el) {
    el.addEventListener('click', function () { openProject(el.getAttribute('data-project')); });
  });
  // switch inside panel
  document.querySelectorAll('.panel-switch [data-jump]').forEach(function (b) {
    b.addEventListener('click', function () { openProject(b.getAttribute('data-jump')); if (panelSheet) panelSheet.scrollTop = 0; });
  });
  document.querySelectorAll('[data-close-panel]').forEach(function (el) {
    el.addEventListener('click', closeProject);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel && panel.getAttribute('aria-hidden') === 'false') closeProject();
  });

  /* ---------- smooth scroll (nav, hero, CTAs) ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-scroll]') : null;
    if (!el) return;
    var target = document.getElementById(el.getAttribute('data-scroll'));
    if (!target) return;
    e.preventDefault();
    if (el.hasAttribute('data-from-panel')) closeProject();
    setTimeout(function () {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }, el.hasAttribute('data-from-panel') ? 180 : 0);
  });

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- nav scrolled state ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- hero parallax (monochrome, pointer devices only) ---------- */
  var stage = document.querySelector('.hero-stage');
  if (stage && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var hero = document.querySelector('.hero');
    var raf = 0;
    hero.addEventListener('mousemove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = hero.getBoundingClientRect();
        var mx = (e.clientX - r.left) / r.width - 0.5;
        var my = (e.clientY - r.top) / r.height - 0.5;
        stage.style.setProperty('--mx', mx.toFixed(3));
        stage.style.setProperty('--my', my.toFixed(3));
      });
    });
    hero.addEventListener('mouseleave', function () {
      stage.style.setProperty('--mx', '0'); stage.style.setProperty('--my', '0');
    });
  }

  /* ---------- email reveal (Base64, assembled on click) ---------- */
  var emailBtn = document.getElementById('emailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      var addr = atob('YW1teWF0') + atob('QHV3YXRlcmxvby5jYQ==');
      var span = emailBtn.querySelector('span');
      if (span) span.textContent = addr;
      emailBtn.setAttribute('aria-label', addr);
      window.location.href = 'mailto:' + addr;
    }, { once: true });
  }

  /* ---------- year ---------- */
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

})();
