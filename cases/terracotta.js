// Terracotta, The Bake Studio: the designed case-study page for project.html?p=bakery-branding.
// site.js loads this file (and terracotta.css) only for that project, and it fills the #tc-host part (content.js) with the brand identity sections. Copy uses facts from content.js and the project images.
{
  const IMG = 'images/bakery-branding/';
  const DECK = 'https://heyzine.com/flip-book/45f9d2b047.html';
  const NEXT = 'project.html?p=cafe-culture-documentary';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const arrow = '<span class="tc-arrow" aria-hidden="true">→</span>';
  const ext = `href="${DECK}" target="_blank" rel="noopener"`;

  const APPS = [
    ['application_02', 'Baguette bands', 'Paper bands with the horizontal lockup wrapped around two baguettes', 1176, 750],
    ['application_04', 'Takeaway boxes', 'Rust and peach takeaway pastry boxes with the mark and illustrations', 1176, 676],
    ['application_05_motion', 'Social stories', 'Instagram stories set in the serif, with bake photos and an illustration', 1280, 737],
    ['application_05_still', 'Counter card', 'A Rust card with the reversed arch mark held up inside the bakery', 1173, 482],
    ['application_06', 'Billboard', 'A street billboard reading Where Fillings Meet Feeling on a brick wall', 1176, 706],
    ['application_07', 'Bags and cups', 'Branded paper pastry bags and a takeaway cup beside a croissant', 1176, 619],
    ['application_08', 'Apron', 'A baker kneading dough in a white apron with the stacked lockup', 1176, 901],
  ];
  const SWATCH = (name, hex, role, cls) => `<button type="button" class="tc-swatch ${cls}" data-hex="${hex}" data-reveal="rise">
      <span class="tc-swatch-name">${name}</span><span class="tc-swatch-meta tc-label">${role} · ${hex}</span></button>`;
  const CHIP = (name, hex, cls) => `<button type="button" class="tc-chip" data-hex="${hex}"><span class="tc-chip-dot ${cls}" aria-hidden="true"></span>
      <span><span class="tc-chip-name">${name}</span><span class="tc-label">${hex}</span></span></button>`;
  const ROWS = [
    ['Wordmark', 'serif', `<img class="tc-specimen-img" src="${IMG}brand/wordmark_crop.webp" width="1200" height="300" alt="Terracotta type pairing: MADE Mirage Medium serif and Söhne Leicht sans, shown as Aa specimens in Rust">
       <p>The vintage serif wordmark, drawn wide and light for signage and packaging, sits beside a quiet modern sans.</p>`],
    ['Headlines', 'serif', `<p class="tc-specimen-serif">Freshly baked, every morning.</p><p>A vintage serif for names, menus and big moments.</p>`],
    ['Body text', 'sans', `<p class="tc-specimen-sans">Terracotta bakes handmade breads, fresh bakes and café dishes from scratch, with no shortcuts, no preservatives and no pre-mixes.</p><p>A modern sans for menus, labels and everything people need to read quickly.</p>`],
  ];

  document.getElementById('tc-host').innerHTML = `<div class="tc">
        <section class="tc-sec tc-construct" id="logo_construction" aria-labelledby="tc-mark">
    <div class="tc-wrap tc-head-center">
      <p class="tc-label" data-reveal="rise">Logo</p>
      <h2 id="tc-mark" class="tc-h2" data-reveal="rise" data-reveal-delay="70">One mark, <em class="tc-em">three honest parts.</em></h2>
      <p class="tc-body" data-reveal="rise" data-reveal-delay="140">Each part of the new mark comes from something you can find inside the bakery.</p>
    </div>
    <div class="tc-wrap">
      <figure class="tc-anatomy" aria-label="The Terracotta mark, with arrows to its three parts">
        <img class="tc-anat-logo" data-reveal="media" src="${IMG}brand/logo_original.png" width="563" height="596" alt="The Terracotta mark: a rust arch holding an uneven off-white circle with a whisk">
        <svg class="tc-arrows" viewBox="0 0 1100 560" aria-hidden="true"><defs><filter id="tc-hand"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="1" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter></defs>
          <g filter="url(#tc-hand)"><g class="tc-arrow-draw" style="--d:0ms"><path pathLength="1" d="M290 150 C326 118 356 148 366 196"/><path pathLength="1" class="tc-head" d="M372.2 179.1 L366 196 L353.5 183.0"/></g><g class="tc-arrow-draw" style="--d:140ms"><path pathLength="1" d="M812 92 C742 52 662 118 613 186"/><path pathLength="1" class="tc-head" d="M629.7 179.2 L613 186 L614.2 168.0"/></g><g class="tc-arrow-draw" style="--d:280ms"><path pathLength="1" d="M812 392 C762 440 690 414 636 367"/><path pathLength="1" class="tc-head" d="M641.3 384.2 L636 367 L653.8 369.8"/></g></g></svg>
        <div class="tc-note tc-note--window" data-reveal="rise" data-reveal-delay="0"><p class="tc-step-tag"><span class="tc-pill">01</span></p><h3 class="tc-note-title">The circular window</h3><p>The arch frames the circular window, the most recognisable feature of the bakery's interior.</p></div>
        <div class="tc-note tc-note--circle" data-reveal="rise" data-reveal-delay="160"><p class="tc-step-tag"><span class="tc-pill">02</span></p><h3 class="tc-note-title">An uneven circle</h3><p>Borrowed from the bakery's handmade tableware, where imperfection is the point.</p></div>
        <div class="tc-note tc-note--whisk" data-reveal="rise" data-reveal-delay="80"><p class="tc-step-tag"><span class="tc-pill">03</span></p><h3 class="tc-note-title">The whisk</h3><p>The whisk stays from the original branding, a link to the bakery's history.</p></div>
      </figure>
    </div>
  </section>

  <section class="tc-mosaic-sec" id="logo_system" aria-labelledby="tc-lockups">
    <div class="tc-mosaic">
      <div class="tc-tile tc-tile--text tc-b-lock" data-reveal="rise">
        <p class="tc-label">Lockups</p>
        <h3 id="tc-lockups" class="tc-h2">Stacked or<br>in a line.</h3>
        <p class="tc-body">Two lockups and a standalone mark cover signage, packaging and small print.</p>
      </div>
      <figure class="tc-tile tc-tile--contain tc-b-grid"><img data-reveal="media" src="${IMG}brand/logo_grid.webp" width="455" height="352" alt="The stacked lockup on its construction grid with proportion markers"><figcaption class="tc-label">Construction grid</figcaption></figure>
      <figure class="tc-tile tc-tile--lockups tc-b-lockups">
        <img data-reveal="media" src="${IMG}brand/logo_lockup_horizontal.png" width="930" height="280" alt="Horizontal lockup: the mark beside TERRACOTTA, The Bake Studio">
        <img data-reveal="media" data-reveal-delay="80" src="${IMG}brand/logo_lockup_stacked.png" width="700" height="560" alt="Stacked lockup: the mark above TERRACOTTA, The Bake Studio">
      </figure>
      <div class="tc-tile tc-b-scale">
        <div class="tc-scale-copy" data-reveal="rise"><p class="tc-label">Scalability</p><h3 class="tc-h2">Clear at every size.</h3><p class="tc-body">The mark keeps its shape from shop signage down to a small sticker.</p></div>
        <div class="tc-scale-set"><div class="tc-scale-item" style="--s:3" data-reveal="rise" data-reveal-delay="0"><img src="${IMG}brand/logo_original.png" width="563" height="596" alt="The mark at 3x"><span class="tc-scale-x">3x</span></div><div class="tc-scale-item" style="--s:2" data-reveal="rise" data-reveal-delay="80"><img src="${IMG}brand/logo_original.png" width="563" height="596" alt="The mark at 2x"><span class="tc-scale-x">2x</span></div><div class="tc-scale-item" style="--s:1" data-reveal="rise" data-reveal-delay="160"><img src="${IMG}brand/logo_original.png" width="563" height="596" alt="The mark at 1x"><span class="tc-scale-x">1x</span></div></div>
      </div>
    </div>
  </section>

  <section class="tc-sec tc-type" id="typography" aria-labelledby="tc-typo">
    <div class="tc-wrap tc-head-center">
      <p class="tc-label tc-label--ruled" data-reveal="rise">Typography</p>
      <h2 id="tc-typo" class="tc-h2" data-reveal="rise" data-reveal-delay="70">A vintage serif, a <em class="tc-em">modern sans.</em></h2>
      <p class="tc-body" data-reveal="rise" data-reveal-delay="140">The pairing keeps the brand warm in headlines and clear in small print.</p>
    </div>
    <div class="tc-wrap">
      <ul class="tc-disclosure">${ROWS.map(([t, face, body], i) => `
        <li class="tc-row${i === 0 ? ' is-open' : ''}" data-reveal="rise" data-reveal-delay="${Math.min(i * 60, 180)}">
          <h3><button type="button" class="tc-row-head" aria-expanded="${i === 0}" aria-controls="tc-panel-${i}" id="tc-head-${i}">
            <span class="tc-aa tc-aa--${face}" aria-hidden="true">${face === 'label' ? 'AA' : 'Aa'}</span><span class="tc-row-title">${t}</span><span class="tc-plus" aria-hidden="true"></span></button></h3>
          <div class="tc-panel" id="tc-panel-${i}" role="region" aria-labelledby="tc-head-${i}"${i === 0 ? '' : ' inert'}><div class="tc-panel-inner">${body}</div></div>
        </li>`).join('')}
      </ul>
      <div class="tc-more"><p class="tc-label tc-ruled">Still curious?</p><a class="tc-btn tc-btn--primary" ${ext}>View process deck ${arrow}</a></div>
    </div>
  </section>

  <section class="tc-sec tc-palette" id="palette" aria-labelledby="tc-colour">
    <p class="tc-label tc-palette-top" data-reveal="rise">Colour</p>
    <div class="tc-palette-grid">
      ${SWATCH('Rust', '#BA5427', 'Primary', 'tc-swatch--rust')}
      <div class="tc-card tc-palette-text" data-reveal="rise" data-reveal-delay="70">
        <p class="tc-label">Five colours</p>
        <h2 id="tc-colour" class="tc-h2">Colours of <em class="tc-em">clay</em> and crumb.</h2>
        <p class="tc-body">Rust leads, like fired clay. Deep Teal steadies it, while Pale Pink and Taupe soften the edges and White keeps everything clean.</p>
        <span class="tc-rule" aria-hidden="true"></span>
        <div class="tc-chips">${CHIP('White', '#FFFFFF', 'tc-c-white')}${CHIP('Pale Pink', '#EAC8C6', 'tc-c-pink')}</div>
        <p class="tc-hint">Select a swatch to copy its hex.</p>
        <p class="tc-status tc-label" role="status" aria-live="polite"></p>
      </div>
      <div class="tc-palette-side">
        ${SWATCH('Deep Teal', '#496468', 'Secondary', 'tc-swatch--teal')}
        ${SWATCH('Taupe', '#D3B59F', 'Tertiary', 'tc-swatch--taupe')}
      </div>
    </div>
  </section>

  <section class="tc-illus" id="illustration" aria-labelledby="tc-ill">
    <div class="tc-illus-pin">
      <div class="tc-wrap tc-illus-head">
        <p class="tc-label" data-reveal="rise">Illustration</p>
        <h2 id="tc-ill" class="tc-h1" data-reveal="rise" data-reveal-delay="70">Regulars, drawn like family.</h2>
        <p class="tc-body" data-reveal="rise" data-reveal-delay="140">We drew the people who visit the bakery most. The staff greet them like part of one family, so the illustrations show a love for the food through its customers.</p>
      </div>
      <div class="tc-illus-run"><div class="tc-illus-track"><img class="tc-sticker" src="${IMG}stickers/01.webp" alt="Bakery regular cycling with pretzel wheels" draggable="false"><img class="tc-sticker" src="${IMG}stickers/02.webp" alt="Monk meditating on a doughnut" draggable="false"><img class="tc-sticker" src="${IMG}stickers/03.webp" alt="Two regulars riding in a bread-loaf cable car" draggable="false"><img class="tc-sticker" src="${IMG}stickers/04.webp" alt="Woman at the potter's stool with clay pots and a cake" draggable="false"><img class="tc-sticker" src="${IMG}stickers/05.webp" alt="Old man with a cane and a baguette under his arm" draggable="false"><img class="tc-sticker" src="${IMG}stickers/06.webp" alt="Girl photographing a cupcake" draggable="false"><img class="tc-sticker" src="${IMG}stickers/07.webp" alt="Woman stretched out on a slice of bread" draggable="false"><img class="tc-sticker" src="${IMG}stickers/08.webp" alt="Woman with a giant coffee cup" draggable="false"><img class="tc-sticker" src="${IMG}stickers/09.webp" alt="Girl surrounded by croissant flowers" draggable="false"></div></div>
    </div>
  </section>
  <section class="tc-sec tc-menu" id="menu" aria-labelledby="tc-menu-h">
    <div class="tc-wrap tc-head-center">
      <p class="tc-label" data-reveal="rise">Menu</p>
      <h2 id="tc-menu-h" class="tc-h2" data-reveal="rise" data-reveal-delay="70">The new menu.</h2>
      <p class="tc-body" data-reveal="rise" data-reveal-delay="140">Seven pages in the new identity, with the regulars drawn between the bakes.</p>
    </div>
    <div class="tc-book" tabindex="0" aria-label="The Terracotta menu: use the left and right arrow keys to turn the pages" data-reveal="rise">
      <div class="tc-book-inner"><div class="tc-leaf"><div class="tc-face tc-face--front"><img src="${IMG}menu/01.webp" width="1001" height="1415" alt="Menu page 1: Cover" draggable="false"></div><div class="tc-face tc-face--back"><img src="${IMG}menu/02.webp" width="1001" height="1415" alt="Menu page 2: Mini bites and puff pastry" draggable="false"></div></div><div class="tc-leaf"><div class="tc-face tc-face--front"><img src="${IMG}menu/03.webp" width="1001" height="1415" alt="Menu page 3: Coffee and tea" draggable="false"></div><div class="tc-face tc-face--back"><img src="${IMG}menu/04.webp" width="1001" height="1415" alt="Menu page 4: Desserts" draggable="false"></div></div><div class="tc-leaf"><div class="tc-face tc-face--front"><img src="${IMG}menu/05.webp" width="1001" height="1415" alt="Menu page 5: Dry cakes" draggable="false"></div><div class="tc-face tc-face--back"><img src="${IMG}menu/06.webp" width="1001" height="1415" alt="Menu page 6: Tarts, pies, cheese and accompaniments" draggable="false"></div></div><div class="tc-leaf"><div class="tc-face tc-face--front"><img src="${IMG}menu/07.webp" width="1001" height="1415" alt="Menu page 7: Breads" draggable="false"></div><div class="tc-face tc-face--back"></div></div></div>
    </div>
    <ol class="tc-menu-strip" aria-label="The Terracotta menu, one page at a time"><li><img src="${IMG}menu/01.webp" width="1001" height="1415" alt="Menu page 1: Cover" draggable="false"></li><li><img src="${IMG}menu/02.webp" width="1001" height="1415" alt="Menu page 2: Mini bites and puff pastry" draggable="false"></li><li><img src="${IMG}menu/03.webp" width="1001" height="1415" alt="Menu page 3: Coffee and tea" draggable="false"></li><li><img src="${IMG}menu/04.webp" width="1001" height="1415" alt="Menu page 4: Desserts" draggable="false"></li><li><img src="${IMG}menu/05.webp" width="1001" height="1415" alt="Menu page 5: Dry cakes" draggable="false"></li><li><img src="${IMG}menu/06.webp" width="1001" height="1415" alt="Menu page 6: Tarts, pies, cheese and accompaniments" draggable="false"></li><li><img src="${IMG}menu/07.webp" width="1001" height="1415" alt="Menu page 7: Breads" draggable="false"></li></ol>
    <div class="tc-book-nav">
      <button type="button" class="tc-btn tc-btn--secondary tc-book-prev"><span class="tc-arrow tc-arrow--back" aria-hidden="true">←</span> Previous</button>
      <span class="tc-label tc-book-at" aria-live="polite">Cover</span>
      <button type="button" class="tc-btn tc-btn--secondary tc-book-next">Next <span class="tc-arrow" aria-hidden="true">→</span></button>
    </div>
    <p class="tc-menu-pdf"><a href="${IMG}menu/terracotta-menu.pdf" target="_blank" rel="noopener">Open the full menu (PDF)</a></p>
  </section>

  <section class="tc-sec tc-apps" id="applications" aria-labelledby="tc-apps-h">
    <div class="tc-wrap tc-head-center">
      <h2 id="tc-apps-h" class="tc-h2" data-reveal="rise">The identity <em class="tc-em">at work.</em></h2>
      <p class="tc-label" data-reveal="rise" data-reveal-delay="70">Print &amp; Packaging</p>
      <p class="tc-body" data-reveal="rise" data-reveal-delay="140">Print and packaging for Terracotta, The Bake Studio. Drag, scroll or use the arrows to move through the set.</p>
    </div>
    <ul class="tc-app-row" tabindex="0" aria-label="Applications: scroll sideways or use the arrow keys">
      ${APPS.map(([f, cap, alt, w, h], i) => `<li class="tc-app tc-card"${i < 3 ? ` data-reveal="rise" data-reveal-delay="${i * 70}"` : ''}>
        <p class="tc-app-head"><span class="tc-label">${String(i + 1).padStart(2, '0')}</span><span class="tc-app-cap">${cap}</span></p>
        <div class="tc-app-media"><img src="${IMG}brand/${f}.webp" width="${w}" height="${h}" alt="${alt}" loading="lazy" draggable="false"></div></li>`).join('')}
    </ul>
    <div class="tc-app-controls">
      <button type="button" class="tc-btn tc-btn--secondary tc-prev" aria-label="Previous application"><span class="tc-arrow tc-arrow--back" aria-hidden="true">←</span> Previous</button>
      <p class="tc-label tc-counter" aria-live="polite"><span class="tc-now">01</span> / ${String(APPS.length).padStart(2, '0')}</p>
      <button type="button" class="tc-btn tc-btn--secondary tc-next" aria-label="Next application">Next ${arrow}</button>
    </div>
  </section>

  </div>`;

  const root = document.querySelector('.tc');
  const EASE = 'cubic-bezier(0.2, 0.7, 0.1, 1)';

  // ---- scroll reveals: rise (text), media (an image settling inside its frame), and the logo parts assembling.
  // Visible by default; only groups still below the fold are prepared, each plays once and keeps its end state. ----
  const FROM = {
    rise: ['translateY(24px)', 600, EASE],
    media: ['translateY(40px) scale(1.08)', 720, 'cubic-bezier(0.16, 1, 0.3, 1)'],
    arch: ['translateY(40px)', 560, EASE],
    circle: ['translateY(-24px)', 560, EASE],
    whisk: ['translateX(32px) rotate(12deg)', 600, 'cubic-bezier(0.34, 1.3, 0.64, 1)'],
  };
  function installReferenceReveals(scope) {
    const animations = new Map();
    let active = true;
    const elements = [...scope.querySelectorAll('[data-reveal]')];
    const finish = (el) => { el.dataset.revealPlayed = 'true'; animations.get(el)?.cancel(); animations.delete(el); };
    const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver((entries) => {
      if (!active) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        observer.unobserve(el); el.dataset.revealPlayed = 'true';
        if (reduced.matches || document.visibilityState === 'hidden' || entry.boundingClientRect.bottom <= 0) finish(el);
        else animations.get(el)?.play();
      }
    }, { threshold: 0, rootMargin: '0px 0px 96px 0px' }) : undefined;
    const stop = () => { observer?.disconnect(); elements.forEach(finish); };
    const onPreference = () => { if (reduced.matches) stop(); };
    reduced.addEventListener('change', onPreference);
    for (const el of elements) {
      if (el.dataset.revealPlayed === 'true') continue;
      const rect = el.getBoundingClientRect();
      if (reduced.matches || !observer || !el.animate || rect.top < innerHeight || document.visibilityState === 'hidden') { finish(el); continue; }
      const [transform, duration, easing] = FROM[el.dataset.reveal] || FROM.rise;
      const delay = Math.min(Number(el.dataset.revealDelay) || 0, 240);
      const a = el.animate([{ opacity: 0, transform }, { opacity: 1, transform: 'none' }], { duration, delay, easing, fill: 'backwards' });
      a.pause(); a.onfinish = () => finish(el);
      animations.set(el, a); observer.observe(el);
    }
    return () => { active = false; observer?.disconnect(); for (const a of animations.values()) { a.onfinish = null; a.cancel(); } animations.clear(); reduced.removeEventListener('change', onPreference); };
  }
  installReferenceReveals(root);

  // ---- logo anatomy: the hand-drawn arrows draw themselves once the mark is in view ----
  const anatomy = root.querySelector('.tc-anatomy');
  if (reduced.matches || typeof IntersectionObserver !== 'function') anatomy.classList.add('is-drawn');
  else new IntersectionObserver((entries, o) => { if (entries[0].isIntersecting) { anatomy.classList.add('is-drawn'); o.disconnect(); } }, { threshold: 0.35 }).observe(anatomy);

  // ---- typography: one disclosure row open at a time ----
  const heads = [...root.querySelectorAll('.tc-row-head')];
  heads.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      heads.forEach((b) => { const on = b === btn && open; b.setAttribute('aria-expanded', String(on)); b.closest('.tc-row').classList.toggle('is-open', on); document.getElementById(b.getAttribute('aria-controls')).inert = !on; });
    });
    btn.addEventListener('keydown', (e) => {
      const k = { ArrowDown: 1, ArrowUp: -1 }[e.key];
      if (k) { e.preventDefault(); heads[(i + k + heads.length) % heads.length].focus(); }
    });
  });

  // ---- illustration: the section holds still while the regulars run across it, bobbing and tilting as they go,
  // the one passing the middle a little bigger. One page scroll moves them one screen; phones and reduced motion get a plain swipe row ----
  const illus = root.querySelector('.tc-illus'), track = illus.querySelector('.tc-illus-track'), stickers = [...track.children];
  const runs = matchMedia('(min-width: 761px)');
  let illusTicking = false;
  const runFrame = () => {
    illusTicking = false;
    if (!runs.matches || reduced.matches) return;
    const start = innerWidth * 0.55, end = -(track.scrollWidth - innerWidth * 0.45);
    const p = Math.max(0, Math.min(1, -illus.getBoundingClientRect().top / (illus.offsetHeight - innerHeight)));
    const x = start + (end - start) * p;
    track.style.transform = `translateX(${x.toFixed(1)}px)`;
    stickers.forEach((el, i) => {
      const mid = x + el.offsetLeft + el.offsetWidth / 2 - innerWidth / 2;
      const near = Math.max(0, 1 - Math.abs(mid) / (innerWidth * 0.5));
      const tilt = (i % 2 ? 4 : -4) + Math.sin(p * 14 + i * 1.7) * 5;
      const bob = Math.sin(p * 11 + i * 1.3) * 22;
      el.style.transform = `translateY(${bob.toFixed(1)}px) rotate(${tilt.toFixed(2)}deg) scale(${(1 + near * 0.14).toFixed(3)})`;
    });
  };
  const sizeIllus = () => {
    const on = runs.matches && !reduced.matches;
    illus.classList.toggle('is-running', on);
    illus.style.height = on ? `${track.scrollWidth + innerWidth * 0.1 + innerHeight}px` : '';
    if (!on) { track.style.transform = ''; stickers.forEach((el) => { el.style.transform = ''; }); }
    runFrame();
  };
  addEventListener('scroll', () => { if (!illusTicking) { illusTicking = true; requestAnimationFrame(runFrame); } }, { passive: true });
  addEventListener('resize', sizeIllus);
  runs.addEventListener('change', sizeIllus); reduced.addEventListener('change', sizeIllus);
  Promise.all(stickers.map((el) => el.decode().catch(() => {}))).then(sizeIllus);
  sizeIllus();

  // ---- menu: a book of four leaves turning on the spine. Closed it shows the cover alone, centred; open, two pages side by side.
  // The leaf being turned rides on top; turned leaves stack on the left, waiting ones on the right ----
  const book = root.querySelector('.tc-book'), leaves = [...book.querySelectorAll('.tc-leaf')];
  const bookAt = root.querySelector('.tc-book-at'), bookPrev = root.querySelector('.tc-book-prev'), bookNext = root.querySelector('.tc-book-next');
  const LAST = leaves.length - 1; // the last leaf's back is blank, so it never turns
  let opened = 0;
  const stackLeaves = (moving) => leaves.forEach((leaf, i) => {
    leaf.classList.toggle('is-turned', i < opened);
    leaf.style.zIndex = i === moving ? 50 : i < opened ? i + 1 : leaves.length - i;
  });
  const turn = (to) => {
    to = Math.max(0, Math.min(LAST, to));
    if (to === opened) return;
    const moving = to > opened ? opened : to;
    opened = to; book.dataset.open = String(opened);
    stackLeaves(moving);
    const t = setTimeout(() => stackLeaves(-1), reduced.matches ? 0 : 900);
    bookAt.textContent = opened === 0 ? 'Cover' : `Pages ${opened * 2} and ${opened * 2 + 1}`;
    bookPrev.disabled = opened === 0; bookNext.disabled = opened === LAST;
  };
  book.dataset.open = '0'; stackLeaves(-1); bookPrev.disabled = true;
  bookPrev.addEventListener('click', () => turn(opened - 1));
  bookNext.addEventListener('click', () => turn(opened + 1));
  book.addEventListener('click', (e) => { const r = book.getBoundingClientRect(); turn(opened + (e.clientX > r.left + r.width / 2 ? 1 : -1)); });
  book.addEventListener('keydown', (e) => { const k = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (k) { e.preventDefault(); turn(opened + k); } });

  // ---- palette: every swatch copies its hex and says so ----
  const status = root.querySelector('.tc-status');
  let statusTimer;
  root.querySelectorAll('[data-hex]').forEach((b) => b.addEventListener('click', async () => {
    const hex = b.dataset.hex;
    try { await navigator.clipboard.writeText(hex); status.textContent = `Copied ${hex}`; } catch { status.textContent = `${hex} (copy it from here)`; }
    clearTimeout(statusTimer); statusTimer = setTimeout(() => { status.textContent = ''; }, 1600);
  }));

  // ---- applications: a native scroll-snap row; the centred card is featured, pictures drift slightly against the scroll,
  // arrows and keys move one card, and a mouse can drag it ----
  const row = root.querySelector('.tc-app-row'), cards = [...row.children], now = root.querySelector('.tc-now');
  const prev = root.querySelector('.tc-prev'), next = root.querySelector('.tc-next');
  let current = -1, ticking = false;
  const update = () => {
    ticking = false;
    const mid = row.scrollLeft + row.clientWidth / 2;
    let best = 0, dist = Infinity;
    cards.forEach((c, i) => {
      const center = c.offsetLeft + c.offsetWidth / 2, d = center - mid;
      if (Math.abs(d) < dist) { dist = Math.abs(d); best = i; }
      if (!reduced.matches) c.querySelector('img').style.transform = `translateX(${Math.max(-24, Math.min(24, (-d / row.clientWidth) * 48)).toFixed(1)}px)`;
      else c.querySelector('img').style.transform = '';
    });
    if (best !== current) {
      current = best;
      cards.forEach((c, i) => c.classList.toggle('is-active', i === best));
      now.textContent = String(best + 1).padStart(2, '0');
      prev.disabled = best === 0; next.disabled = best === cards.length - 1;
    }
  };
  const go = (i) => {
    const c = cards[Math.max(0, Math.min(cards.length - 1, i))];
    row.scrollTo({ left: c.offsetLeft + c.offsetWidth / 2 - row.clientWidth / 2, behavior: reduced.matches ? 'auto' : 'smooth' });
  };
  row.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  prev.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  row.addEventListener('keydown', (e) => { const k = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (k) { e.preventDefault(); go(current + k); } });
  let drag = null;
  row.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag = { x: e.clientX, left: row.scrollLeft, moved: 0 }; });
  addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x; drag.moved = Math.max(drag.moved, Math.abs(dx));
    if (drag.moved > 4) { row.classList.add('is-dragging'); row.scrollLeft = drag.left - dx; }
  });
  addEventListener('pointerup', () => { if (!drag) return; const was = drag.moved > 4; drag = null; if (was) { row.classList.remove('is-dragging'); requestAnimationFrame(() => { update(); go(current); }); } });
  update(); // the row's side padding already centres the first card
}
