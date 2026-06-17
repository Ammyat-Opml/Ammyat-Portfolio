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
    leg: {
      num: '01',
      kicker: 'Robotics · 2026 to Present',
      title: 'Humanoid Knee & Ankle',
      deck: 'A two degree of freedom ankle and a one degree of freedom knee for a humanoid leg. The joint torques are sized from anthropometric body proportions, and the actuator choice follows from the load cases rather than the other way around.',
      tags: ['Robotics', 'Mechanism design', 'Torque analysis', 'Actuator selection', 'SolidWorks'],
      feature: { type: 'image', src: 'humanoid-leg-draft.png',
                 cap: 'Draft layout of the ankle differential drive. The A and B motors near the knee drive the pitch and roll joints at the foot through push-rods. Full CAD assembly in progress.' },
      overview: 'This is a lower-limb design for a humanoid robot, covering three degrees of freedom: a two-DOF ankle that pitches front to back and rolls side to side, plus a one-DOF knee. I sized every joint from the ground up, starting from anthropometric body proportions for a 1.6 m, 50 kg build, locating each joint centre, and working out the moment arms and peak torques across the full range of motion, from standing through walking push-off to stair landing and trip loads. Those load cases drove the actuator choice rather than the other way around. The ankle runs on a differential drive: two motors that produce pitch when they turn together and roll when they turn against each other, which keeps both ankle axes on one shared pair of actuators and lets them sit high on the shank so the foot stays light.',
      worked: [
        'Derived the body-segment dimensions and joint centres from anthropometric proportions, then calculated the moment arms at the ankle and the knee.',
        'Worked out the peak joint torques across standing, walking, stair-landing, and trip loads, scaling the ground reaction force to body weight and confirming which case governs each joint.',
        'Designed a differential ankle drive where two motors give pitch when they turn together and roll when they turn against each other, covering both ankle axes with one shared pair of actuators mounted high on the shank to keep the foot light.',
        'Selected actuators against the calculated peaks with a safety factor for each case, landing on two RobStride RS03 per ankle and one RobStride RS04 per knee, and ruled out non-backdrivable high-ratio gearboxes since a leg joint needs to give under load.'
      ],
      technical: ['SolidWorks', 'Mechanism design', 'Differential drive', 'Torque analysis', 'Anthropometric scaling', 'Ground reaction force', 'Moment arm', 'Actuator selection', 'Backdrivability', 'Degrees of freedom', 'Gait analysis'],
      skills: ['First-principles analysis', 'Design trade-offs', 'Requirements-driven selection', 'Systems thinking'],
      calc: {
        basis: 'Joint torques sized from anthropometric body proportions for a 1.6 m, 50 kg build. Each joint was checked across standing, walking, stair-landing, and trip loads, and walking (1.5 times body weight) sets the design point. The figures below are the peaks each actuator has to clear.',
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
          { h: '1 — Body segment dimensions', lines: [
            'H = 1.6 m     m = 50.0 kg     (joint centres from ground)',
            'L_foot  = 0.152 × H = 0.2432 m   (243.2 mm)',
            'W_foot  = 0.055 × H = 0.0880 m   (88.0 mm)',
            'h_ankle = 0.039 × H = 0.0624 m   (62.4 mm)',
            'h_knee  = 0.285 × H = 0.4560 m   (456.0 mm)',
            'L_shank = 0.246 × H = 0.3936 m   (393.6 mm)',
            'L_thigh = 0.245 × H = 0.3920 m   (392.0 mm)'
          ] },
          { h: '2 — Ankle position and moment arms', lines: [
            'Ankle sits at 37% of foot length from the heel',
            'x_ankle = 0.37 × L_foot = 0.0900 m   (90.0 mm)',
            'r_FFE = L_foot − x_ankle = 0.1532 m  (153.2 mm)   push-off arm, ankle to toe',
            'r_FAA = W_foot / 2 = 0.0440 m        (44.0 mm)    side-tilt arm, ankle to foot edge'
          ] },
          { h: '3 — Ground reaction force', lines: [
            'BW = m × g = 50.0 × 9.81 = 490.50 N',
            'Standing   1.0 × BW =  490.50 N',
            'Walking    1.5 × BW =  735.75 N   <- design basis',
            'Landing    2.5 × BW = 1226.25 N',
            'Trip       3.5 × BW = 1716.75 N',
            '(the 1.5x walking factor is the real load, not a safety margin)'
          ] },
          { h: '4 — Ankle pitch torque (FFE, front-back)', lines: [
            'τ = F × r_FFE',
            'Walking    735.75 × 0.1532 = 112.72 N·m   <- governs',
            'Landing   1226.25 × 0.1532 = 187.86 N·m',
            'Trip      1716.75 × 0.1532 = 263.01 N·m',
            'Peak required: 112.72 N·m'
          ] },
          { h: '5 — Ankle roll torque (FAA, side-to-side)', lines: [
            'τ = F_walking × (W_foot / 2)',
            '  = 735.75 × 0.0440 = 32.37 N·m',
            'Cross-check (40% rule): 0.40 × 112.72 = 45.09 N·m',
            'Peak required: 32.37 N·m'
          ] },
          { h: '6 — Differential coupling (two motors)', lines: [
            'Both motors same direction   -> pitch (torques add)',
            'Motors opposite directions   -> roll  (single-motor effort)',
            'Pitch shares over two motors:  each ≥ 112.72 / 2 = 56.36 N·m',
            'Roll on one motor:             each ≥ 32.37 N·m',
            'Per-motor requirement: 56.36 N·m  (pitch sharing governs)'
          ] },
          { h: '7 — Knee moment arm (geometry)', lines: [
            'The knee shifts off the GRF line as it bends:',
            'd_knee = L_shank × sin(θ)',
            'Walking (θ = 15°):   0.3936 × 0.2588 = 0.1019 m   (101.9 mm)',
            'Stairs (half-thigh): L_thigh / 2 = 0.1960 m       (196.0 mm)'
          ] },
          { h: '8 — Knee torque (KFE)', lines: [
            'τ_knee = F_walking × d_knee',
            'Walking   735.75 × 0.1019 =  74.97 N·m',
            'Stairs    735.75 × 0.1960 = 144.21 N·m'
          ] },
          { h: '9 — Knee torque vs bend angle', lines: [
            'θ =  0°    d =   0.0 mm    τ =   0.0 N·m   (mid-stance)',
            'θ = 15°    d = 101.9 mm    τ =  75.0 N·m   (normal walking)',
            'θ = 30°    d = 196.8 mm    τ = 144.8 N·m   (fast walking)',
            'θ = 45°    d = 278.3 mm    τ = 204.8 N·m   (steep stair)',
            'θ = 90°    d = 393.6 mm    τ = 289.6 N·m   (deep squat, max)'
          ] },
          { h: '10 — Actuator selection', lines: [
            'Ankle: 2 × RobStride RS03 (60 N·m each), differential',
            '  pitch     120 / 112.72 = 1.06x   (combined, both motors)',
            '  roll       60 /  32.37 = 1.85x   (single motor)',
            '  per-motor  60 /  56.36 = 1.06x',
            'Knee: 1 × RobStride RS04 (120 N·m)',
            '  walking   120 /  74.97 = 1.60x',
            '  stairs    120 / 144.21 = 0.83x   (gentle stairs only)',
            'High-ratio gearboxes such as the AK80-64 are not',
            'backdrivable, so they are avoided for leg joints.'
          ] },
          { h: '11 — Actuator mass (per robot)', lines: [
            'Ankles   4 × RS03  @ 880 g   = 3,520 g',
            'Knees    2 × RS04  @ 1,420 g = 2,840 g',
            'Total (6 actuators)          = 6,360 g  (6.36 kg)'
          ] }
        ]
      }
    },

    vex: {
      num: '02',
      kicker: 'Robotics · Sep to Dec 2025',
      title: 'Autonomous Sorting Robot',
      deck: 'A VEX IQ robot that tries to sort mixed objects by size and colour on its own. It handles startup, sensing, navigation, sorting, and shutdown, all written in C++.',
      tags: ['Robotics', 'Embedded C++', 'Sensor integration', 'Mechanism design'],
      feature: { type: 'video', src: 'vex-demo.mp4', poster: 'vex-video-poster.jpg',
                 cap: 'A short demo of the full workflow: startup, sense, navigate, sort, shutdown.' },
      overview: 'This was a course project built on the VEX IQ platform. The goal was to put together a robot that could run a full autonomous routine on its own, so it powers on, looks around, drives toward objects, makes a guess about what each one is, and drops it into the right bin before shutting down. The workflow is written in C++ on VEXcode IQ, and I built the mechanical side around what the sensors could actually see.',
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
      num: '03',
      kicker: 'Capstone · Jan to Apr 2024',
      title: 'Golf Ball Picker',
      deck: 'A team capstone where we set out to design a mechanism for picking up golf balls. We took it from a rough idea to a working prototype, a written report, and a presentation to faculty.',
      tags: ['Capstone', 'Mechanism design', 'SolidWorks', 'Prototyping'],
      feature: { type: 'image', src: 'golfball-prototype.jpg',
                 cap: 'The final prototype on the bench. Worm-gear actuation, a swinging arm, and a capture cup.' },
      overview: 'For our capstone, my team set out to design a mechanism that could pick up golf balls. Many existing tools are either bulky or imprecise, so we wanted to develop something more compact and repeatable that we could build, test, and present within the time and budget we had. We combined mechanical design, CAD modelling, and a fair amount of shop time to put together a working prototype, then wrote a technical report and presented the work to faculty.',
      worked: [
        'Designed the mechanism in SolidWorks as the mechanical lead, working through the gear ratios, geometry, and tolerances with the team.',
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
      num: '04',
      kicker: 'Tool Design · Sep to Dec 2023',
      title: 'Sandwich Drill Jig',
      deck: 'A precision fixture for drilling holes through several stacked parts at once, designed to keep everything aligned without needing a lot of operator skill.',
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
      num: '05',
      kicker: 'Tool Design coursework · 2023',
      title: 'Drill Jig & Press Tooling',
      deck: 'A foundational tool design course where I worked on jigs, fixtures, and press dies, with the deliverable being a set of fully annotated SolidWorks drawings.',
      tags: ['Tool design', 'Press dies', 'SolidWorks', 'CAD drawings'],
      feature: { type: 'image', src: 'tool-design-drawing.png', paper: true,
                 cap: 'Assembly drawing. Base plate, knee crank, locating pins.' },
      overview: 'This course was an introduction to tool design, with a focus on jig and fixture design and die design. We covered drilling and milling fixtures, holding and assembly jigs, and pressworking dies like blanking and piercing tools. For my main deliverable, I designed a drill jig in SolidWorks meant to keep hole alignment and depth consistent while holding the workpiece securely. The drawing set details the locating pins, bushings, clamps, and base plate, along with the calculations and material choices behind them.',
      worked: [
        'Designed a custom drill jig and produced fully dimensioned assembly and detail drawings in SolidWorks.',
        'Worked through the calculations and material research, then validated the design before drafting.',
        'Studied press die design, including blanking and piercing tools, alongside the jig work.'
      ],
      technical: ['SolidWorks', 'Tool design', 'Jig and fixture design', 'Die design', 'Blanking and piercing', 'Drill bushings', 'Material selection', 'Engineering calculations', 'Assembly drawings'],
      skills: ['Precision focus', 'Design validation', 'Technical research', 'Safety mindset'],
      gallery: [
        { src: 'tool-design-3d.png', tag: 'Fig. 02', cap: '3D model. Crank arm, clamping cylinder, base plate.', paper: true }
      ]
    },

    watonomous: {
      num: '06',
      kicker: 'WATonomous Design Team · May 2026 to Present',
      title: 'Humanoid Forearm Structure',
      deck: 'Forearm and joint structures for a humanoid robot on the WATonomous Humanoid Autonomy team. The work covers the actuator housing, joint geometry, and the structural load path that holds it all together.',
      tags: ['Robotics', 'Actuator housing design', 'SolidWorks', 'OnShape', 'GD&T'],
      feature: { type: 'image', src: 'watonomous-forearm-1.png',
                 cap: 'Forearm actuator housing. Mounting face with bolt pattern, central output boss, and tapered structural body.' },
      overview: 'As a Hardware Designer on the WATonomous Humanoid Autonomy team, I work on the forearm structure for a humanoid robot. The goal is a housing that holds the actuator securely, gives the joint its range of motion, and carries the loads through the arm without flexing. I size the housing and joint geometry from structural load calculations in SolidWorks and OnShape, then take the models through GD&T tolerance stack-up and into the team build pipeline as revision-controlled parts.',
      worked: [
        'Designed the forearm and joint structure to enable validated proof-of-concept builds with confirmed range-of-motion and structural integrity, by running structural load calculations to define actuator housing dimensions, joint geometry, and force constraints in SolidWorks and OnShape.',
        'Eliminated assembly fit failures across prototype builds, by applying GD&T tolerance stack-up analysis to the manufacturing drawings and delivering revision-controlled models directly into the team build pipeline.',
        'Accelerated cross-disciplinary integration with zero redesign iterations from electrical conflicts, by coordinating housing geometry, sensor mounting points, and wiring clearances with the firmware and electrical teams during joint design reviews.'
      ],
      technical: ['SolidWorks', 'OnShape', 'Actuator housing design', 'Joint mechanisms', 'GD&T', 'Tolerance stack-up', 'Structural load analysis', 'Revision-controlled CAD', 'DFM'],
      skills: ['Cross-functional collaboration', 'Design reviews', 'Attention to detail', 'Documentation', 'Communication'],
      gallery: [
        { src: 'watonomous-forearm-2.png', tag: 'Fig. 02', cap: 'Alternate view. Cylindrical actuator body, end cap with fastener ring, and the mounting tab.' }
      ]
    }
  };

  var ORDER = ['leg', 'watonomous' , 'vex', 'capstone', 'sandwich', 'tooldesign'];

  /* --------------------------------------------
     Helper functions
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
     Build the calculations block (optional).
     Shows a compact results summary, plus a
     click-to-expand full breakdown via <details>.
  -------------------------------------------- */
  function renderCalc(c) {
    var h = '';
    h += '<section class="pd-calc">';
    h += '<p class="pd-section-label">Calculations</p>';
    if (c.basis) h += '<p class="pd-calc-basis">' + esc(c.basis) + '</p>';

    h += '<div class="pd-calc-tables">';

    if (c.peaks && c.peaks.length) {
      h += '<div class="pd-calc-block">';
      h += '<h4>Peak torque per joint</h4>';
      h += '<table class="pd-table"><thead><tr>';
      h += '<th>Joint</th><th>Moment arm</th><th>Peak torque</th><th>Governing case</th>';
      h += '</tr></thead><tbody>';
      c.peaks.forEach(function (r) {
        h += '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) +
             '</td><td class="pd-num-cell">' + esc(r[2]) + '</td><td>' + esc(r[3]) + '</td></tr>';
      });
      h += '</tbody></table></div>';
    }

    if (c.actuators && c.actuators.length) {
      h += '<div class="pd-calc-block">';
      h += '<h4>Actuator selection</h4>';
      h += '<table class="pd-table"><thead><tr>';
      h += '<th>Joint</th><th>Actuator</th><th>Safety factor</th>';
      h += '</tr></thead><tbody>';
      c.actuators.forEach(function (r) {
        h += '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) +
             '</td><td class="pd-num-cell">' + esc(r[2]) + '</td></tr>';
      });
      h += '</tbody></table></div>';
    }

    h += '</div>';

    if (c.full && c.full.length) {
      h += '<details class="pd-calc-full">';
      h += '<summary><span class="pd-calc-summary-main">View full calculations</span>';
      h += '<span class="pd-calc-chev"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M6 9l6 6 6-6"/></svg></span></summary>';
      h += '<div class="pd-calc-full-body">';
      c.full.forEach(function (sec) {
        h += '<div class="pd-calc-sec"><h5>' + esc(sec.h) + '</h5>';
        var body = sec.lines.map(function (ln) { return esc(ln); }).join('\n');
        h += '<pre class="pd-calc-pre">' + body + '</pre></div>';
      });
      h += '</div></details>';
    }

    h += '</section>';
    return h;
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

    // Calculations (only rendered if the project supplies them)
    if (p.calc) html += renderCalc(p.calc);

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
