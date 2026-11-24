// The parts every page shares, laid out like the Google Site: the header with its links, the footer,
// the Portfolio grid (portfolio.html) and a project page (project.html?p=<slug>). What goes in them is PROJECTS in content.js.
{
  const RESUME = 'https://drive.google.com/file/d/19noLYeYdHfVgPYiuQA0uA7cxckN0msNu/view?usp=sharing';
  const EMAIL = 'harshaldraws.work@gmail.com';
  const SOCIAL = [
    ['Behance', 'https://www.behance.net/harshaldraws', '<path d="M9.6 11.4c.9-.4 1.4-1.1 1.4-2.1C11 7.3 9.5 6.5 7.7 6.5H3v11h4.9c1.9 0 3.6-.9 3.6-3 0-1.3-.7-2.4-1.9-2.7Zm-4.4-3h2.1c.8 0 1.5.2 1.5 1.1 0 .8-.6 1.1-1.3 1.1H5.2V8.4Zm2.3 7.2H5.2v-2.9h2.4c1 0 1.6.4 1.6 1.5 0 1-.8 1.4-1.7 1.4ZM14.4 7.3h5.2v1.3h-5.2zM17 9.6c-2.3 0-3.9 1.7-3.9 4s1.5 4 3.9 4c1.8 0 3-.8 3.6-2.6h-1.9c-.2.6-1 .9-1.6.9-1.2 0-1.8-.6-1.8-1.8H21c.2-2.4-1.1-4.5-4-4.5Zm-1.7 3.2c.1-1 .7-1.6 1.7-1.6s1.5.6 1.6 1.6h-3.3Z"/>'],
    ['Instagram', 'https://www.instagram.com/harshaldraws/', '<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3.5c-2.3 0-2.6 0-3.5.1-3.2.1-4.8 1.7-4.9 4.9 0 .9-.1 1.2-.1 3.5s0 2.6.1 3.5c.1 3.2 1.7 4.8 4.9 4.9.9 0 1.2.1 3.5.1s2.6 0 3.5-.1c3.2-.1 4.8-1.7 4.9-4.9 0-.9.1-1.2.1-3.5s0-2.6-.1-3.5c-.1-3.2-1.7-4.8-4.9-4.9-.9-.1-1.2-.1-3.5-.1Zm0 1.5c2.3 0 2.5 0 3.4.1 2.3.1 3.4 1.2 3.5 3.5 0 .9.1 1.1.1 3.4s0 2.5-.1 3.4c-.1 2.3-1.2 3.4-3.5 3.5-.9 0-1.1.1-3.4.1s-2.5 0-3.4-.1c-2.3-.1-3.4-1.2-3.5-3.5 0-.9-.1-1.1-.1-3.4s0-2.5.1-3.4C5.2 6.2 6.3 5.1 8.6 5c.9 0 1.1-.1 3.4-.1Z"/>'],
    ['LinkedIn', 'https://www.linkedin.com/in/harshal-tholambia-92059a281/', '<path d="M6.9 8.9H3.8V20h3.1V8.9ZM5.3 3.9a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm6.4 5H8.8V20h3v-5.5c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.1v-6.1c0-3-.6-5.2-4.1-5.2-1.7 0-2.8.9-3.2 1.8h-.1V8.9Z"/>'],
  ];
  const page = document.body.dataset.page; // welcome | portfolio | project
  const html = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const two = (n) => String(n).padStart(2, '0');
  const href = (slug) => (slug === 'welcome' ? './' : `project.html?p=${slug}`);

  document.querySelector('.skip').insertAdjacentHTML('afterend', `
    <header class="site-head">
      <a class="site-home" href="./"${page === 'welcome' ? ' aria-current="page"' : ''}>Harshal Tholambia</a>
      <nav class="site-nav" aria-label="Main">
        <a href="portfolio.html"${page === 'portfolio' || page === 'project' ? ' aria-current="page"' : ''}>Portfolio</a>
        <a href="wall.html"${page === 'wall' ? ' aria-current="page"' : ''}>Illustration Wall</a>
        <a href="${RESUME}" target="_blank" rel="noopener">View Resume</a>
      </nav>
      <button type="button" class="theme-switch" role="switch" aria-checked="false" aria-label="Dark mode"><span class="ts-track" aria-hidden="true"><span class="ts-knob"></span></span></button>
    </header>`);
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="site-foot">
      <p class="social">${SOCIAL.map(([name, url, d]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${name}"><svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg></a>`).join('')}</p>
      <p>Harshal Tholambia © 2026</p>
      <p><a class="foot-mail" href="mailto:${EMAIL}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/></svg>${EMAIL}</a></p>
    </footer>`);

  // dark mode for the whole site: data-theme on <html> (set before the first paint in each page's head). The switch in the top bar
  // also works the lamp on the cutting mat; the choice is saved as "lamp"; the About and Skills frames redraw to match
  {
    const root = document.documentElement, btn = document.querySelector('.theme-switch');
    // the About and Skills frames: each is loaded twice, a light copy and a dark one (the mode is in its address, so it works
    // however the page was opened), stacked in one place. Switching shows the other copy at once and pauses the hidden one
    const stacks = [...document.querySelectorAll('.gs-embed[data-src]')].map((f) => {
      const box = document.createElement('div'); box.className = 'embed-stack'; f.before(box);
      return ['light', 'dark'].map((t) => {
        const c = t === 'light' ? f : f.cloneNode(false);
        c.dataset.theme = t; c.src = `${f.dataset.src}?theme=${t}`;
        c.addEventListener('load', () => c.contentWindow.postMessage(c.classList.contains('on') ? 'play' : 'pause', '*'));
        box.append(c); return c;
      });
    });
    const frames = () => stacks.flat().forEach((c) => {
      const on = c.dataset.theme === root.dataset.theme;
      c.classList.toggle('on', on); c.tabIndex = on ? 0 : -1;
      c.contentWindow?.postMessage(on ? 'play' : 'pause', '*');
    });
    const show = () => { const d = root.dataset.theme === 'dark'; btn.setAttribute('aria-checked', String(d)); btn.title = d ? 'Dark mode on' : 'Dark mode off'; };
    window.setTheme = (dark) => {
      const t = dark ? 'dark' : 'light';
      if (root.dataset.theme === t) return show();
      root.dataset.theme = t; show(); frames();
    };
    btn.addEventListener('click', () => {
      if (window.toggleLamp) return toggleLamp(); // on the Welcome page the lamp on the mat answers too, with its flicker
      const dark = root.dataset.theme !== 'dark';
      try { localStorage.setItem('lamp', dark ? 'on' : 'off'); } catch {}
      setTheme(dark);
    });
    addEventListener('storage', (e) => { if (e.key === 'lamp' && e.newValue && !window.toggleLamp) setTheme(e.newValue === 'on'); });
    show(); frames();
  }

  // a picture: images/<slug>/<nn>.webp (or <name>.webp), with a small loading circle until it has arrived
  const loaded = (img) => img.parentNode.classList.remove('loading');
  window.picLoaded = loaded;
  const pic = (slug, n, alt) => `<span class="pic loading"><img src="images/${slug}/${typeof n === 'number' ? two(n) : n}.webp" alt="${html(alt)}" loading="lazy" draggable="false" onload="picLoaded(this)" onerror="picLoaded(this)"></span>`;

  // a phrase cut from paper, letter by letter, from the medium-weight cut alphabet (cutalphabet.js); the plain text stays for screen readers
  const cutWords = (text) => `<span class="sr">${html(text)}</span><span class="cut-words" aria-hidden="true">${text.split(' ').map((w) => `<span class="cw">${[...w].map((c) => {
    const L = CUT_ALPHABET[c];
    if (!L) throw new Error(`"${c}" is not in the cut alphabet (cutalphabet.js); add it to CHARS in tools/cutalphabet.py`);
    const r = (n) => ((Math.random() * 2 - 1) * n).toFixed(2), x = -150, w = L.adv + 300;
    return `<span class="ch" style="width:${L.adv / 1000}em;--j:${r(2.2)}deg;--jy:${r(0.02)}em"><svg class="cutl" viewBox="${x} -1000 ${w} 1300" style="left:${x / 1000}em;width:${w / 1000}em"><g filter="url(#paper)">${L.d.map((d) => `<path d="${d}"/>`).join('')}</g></svg></span>`;
  }).join('')}</span>`).join(' ')}</span>`;

  // ---- Portfolio, by category: two tiles a row, a cover with its name under it ----
  const grid = document.getElementById('grid');
  if (grid) {
    grid.innerHTML = PROJECTS.filter((p) => !p.hidden).map((p) => `
      <a class="tile" href="${href(p.slug)}">${pic(p.slug, 'cover', '')}<span class="name">${cutWords(p.tile)}</span></a>`).join('');
  }

  // ---- the Illustration Wall: different styles scattered like a collage of prints on a table, around the title.
  // Drag it around (it keeps gliding when let go); a print lifts under the cursor, a click opens its project.
  // Scroll (or pinch on a phone) to zoom in and out. One sheet of prints repeats in every direction. ----
  const wall = document.getElementById('wall');
  if (wall) {
    const prints = WALL.flatMap((w) => w.pics.map((n) => ({ p: PROJECTS.find((x) => x.slug === w.slug), n })));
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = prints.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [prints[i], prints[j]] = [prints[j], prints[i]]; } // neighbours from different projects
    const k = innerWidth < 700 ? 0.6 : 1;                // on a phone the whole table is smaller
    const AREA = 350 * 260 * k * k, GAP = 14 * k;         // every print covers about this much, wide or tall; the gap between prints
    const CAP = 52;                                        // room under a print for its name on hover: 8px down, two lines of 14px type
    const touch = matchMedia('(pointer: coarse)').matches;
    wall.innerHTML = '<div class="wall-layer">' + prints.map(({ p, n }) => `<a class="print" href="${href(p.slug)}" draggable="false">
        ${pic(p.slug, n, `${p.tile}, picture ${n}`)}<span class="cap">${html(p.tile)}</span></a>`).join('')
      + `<div class="wall-title"><p class="t1">Various styles in one place.</p><p class="t2">Drag to explore, ${touch ? 'pinch' : 'scroll'} to zoom</p></div></div>`;
    const layer = wall.querySelector('.wall-layer');
    wall.classList.add('laying');
    const items = [...wall.querySelectorAll('.print')], title = wall.querySelector('.wall-title');
    const mod = (a, n) => ((a % n) + n) % n;
    // ox, oy: where the sheet sits, in the sheet's own pixels; Z: the zoom. The layer holding the prints is scaled by Z
    // from the wall's top left corner, so a point of the sheet shows on screen at Z * (its spot + ox, oy)
    let PW = 1, PH = 1, ox = 0, oy = 0, vx = 0, vy = 0, drag = null, moved = 0, last = 0, Z = 1, ZMIN = 1;
    const ZMAX = 3, ZLOW = 0.85, EDGE = 500; // ZLOW: how far out it can zoom, just a little past how it opens, so the whole table never shows // EDGE: a print can hang this far off the sheet's edge before it wraps round
    const moving = [...items, title];
    const place = () => {
      layer.style.scale = Z;
      moving.forEach((t) => {
        const mx = Math.max(260, t.offsetWidth), my = Math.max(260, t.offsetHeight);
        t.style.translate = `${mod(t._x + ox + mx, PW) - mx}px ${mod(t._y + oy + my, PH) - my}px`;
      });
    };
    // zoom to z, keeping the point under (cx, cy) on the wall still. Zooming out stops while one sheet still fills the wall,
    // since each print is on the sheet only once
    const zoomAt = (z, cx, cy) => {
      z = Math.min(ZMAX, Math.max(ZMIN, z));
      ox += cx / z - cx / Z; oy += cy / z - cy / Z; Z = z; place();
    };

    // lay the collage out once every print's shape is known
    const shapes = items.map((a) => new Promise((done) => { const im = a.querySelector('img'); if (im.complete && im.naturalWidth) done(); else { im.addEventListener('load', done, { once: true }); im.addEventListener('error', done, { once: true }); } }));
    Promise.all([...shapes, document.fonts.ready]).then(() => {
      const boxes = items.map((a) => {
        const im = a.querySelector('img'), ar = im.naturalWidth / im.naturalHeight || 1.4;
        const w = Math.sqrt(AREA * ar), h = w / ar, r = (rnd() - 0.5) * 8, rad = Math.abs(r) * Math.PI / 180;
        a.style.width = `${w.toFixed(0)}px`; a.style.setProperty('--r', `${r.toFixed(1)}deg`);
        const bw = w * Math.cos(rad) + h * Math.sin(rad), bh = w * Math.sin(rad) + h * Math.cos(rad); // the tilted print
        // its footprint: the tilted print, the room its name needs under it on hover (up to two lines), and the 8% it grows on hover
        return { a, w, h, top: bh * 0.04 + 4, bw: bw * 1.08, bh: bh * 1.08 + CAP };
      });
      // grow the collage out from the title as a 3:2 block: each print takes the free spot that keeps the block smallest.
      // Then the repeating sheet is made exactly the size of the block, so the copies meet with no empty corners.
      const tw = title.offsetWidth + 50 * k, th = title.offsetHeight + 36 * k;
      const placed = [{ x: -tw / 2, y: -th / 2, w: tw, h: th }];
      const clash = (x, y, w, h) => placed.some((q) => x < q.x + q.w + GAP && q.x < x + w + GAP && y < q.y + q.h + GAP && q.y < y + h + GAP);
      const size = (x, y, w, h) => Math.max(Math.max(Math.abs(x), Math.abs(x + w)) / 1.5, Math.abs(y), Math.abs(y + h));
      boxes.sort((a, b) => b.bw * b.bh - a.bw * a.bh); // big ones first, small ones fill the gaps
      boxes.forEach((b) => {
        let best = null;
        const ext = placed.reduce((m, q) => Math.max(m, size(q.x, q.y, q.w, q.h)), 0) + Math.max(b.bw, b.bh) + GAP;
        for (let t = 0; t < 5000; t++) {
          const x = (rnd() * 2 - 1) * ext * 1.5 - b.bw / 2, y = (rnd() * 2 - 1) * ext - b.bh / 2;
          if (clash(x, y, b.bw, b.bh)) continue;
          const score = size(x, y, b.bw, b.bh) + rnd() * 25 * k; // a little chance in it, so the edges stay loose like a collage
          if (!best || score < best.score) best = { x, y, score };
        }
        if (!best) throw new Error('Illustration wall: no free spot for a print near the collage.');
        placed.push({ x: best.x, y: best.y, w: b.bw, h: b.bh });
        b.a._x = best.x + (b.bw - b.w) / 2; b.a._y = best.y + b.top + ((b.bh - CAP - b.top * 2) - b.h) / 2; // the print at the top of its footprint, its name's room below
      });
      const L = Math.min(...placed.map((q) => q.x)), T = Math.min(...placed.map((q) => q.y));
      PW = Math.max(...placed.map((q) => q.x + q.w)) - L + GAP; PH = Math.max(...placed.map((q) => q.y + q.h)) - T + GAP;
      boxes.forEach((b) => { b.a._x -= L; b.a._y -= T; });
      // centre the title between the nearest prints left and right of its main line, so it sits in the middle of its clearing
      const t1 = title.querySelector('.t1'), top1 = -title.offsetHeight / 2 + t1.offsetTop, bot1 = top1 + t1.offsetHeight; // the main line
      const band = placed.slice(1).filter((q) => q.y < bot1 && q.y + q.h > top1);
      const lefts = band.filter((q) => q.x + q.w / 2 < 0).map((q) => q.x + q.w), rights = band.filter((q) => q.x + q.w / 2 >= 0).map((q) => q.x);
      const mid = lefts.length && rights.length ? (Math.max(...lefts) + Math.min(...rights)) / 2 : 0; // with nothing on one side it stays put
      title._x = mid - title.offsetWidth / 2 - L; title._y = -title.offsetHeight / 2 - T;
      const cx = -L, cy = -T; // the title's centre on the sheet
      ox = wall.clientWidth / 2 - cx; oy = wall.clientHeight / 2 - cy; // open with the title in the middle of the screen
      // so the wall can zoom out to ZLOW: where one sheet is too small for that (on a phone), repeat its prints in a grid
      // of sheets, making one bigger sheet (each copy with its title, so no copy has an empty clearing)
      const nx = Math.ceil((wall.clientWidth / ZLOW + EDGE) / PW), ny = Math.ceil((wall.clientHeight / ZLOW + EDGE) / PH);
      for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
        if (!i && !j) continue;
        [...items, title].forEach((a) => { const c = a.cloneNode(true); c._x = a._x + i * PW; c._y = a._y + j * PH; c.tabIndex = -1; c.setAttribute('aria-hidden', 'true'); layer.append(c); moving.push(c); });
      }
      PW *= nx; PH *= ny;
      ZMIN = Math.min(1, Math.max(ZLOW, wall.clientWidth / (PW - EDGE), wall.clientHeight / (PH - EDGE)));
      place(); wall.classList.remove('laying');
    });
    // the fingers (or mouse) on the wall: one drags it, two pinch to zoom around the point between them
    const fingers = new Map();
    let pinch = null;
    const spot = (e) => { const b = wall.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const pair = () => { const [a, b] = [...fingers.values()]; return { d: Math.hypot(a[0] - b[0], a[1] - b[1]), x: (a[0] + b[0]) / 2, y: (a[1] + b[1]) / 2 }; };
    wall.addEventListener('pointerdown', (e) => {
      fingers.set(e.pointerId, spot(e));
      if (fingers.size === 2) { pinch = pair(); drag = null; moved = 99; vx = vy = 0; wall.classList.add('dragging'); return; } // a pinch is never a click
      drag = { x: e.clientX, y: e.clientY }; moved = 0; vx = vy = 0; last = performance.now();
    });
    wall.addEventListener('pointermove', (e) => {
      if (fingers.has(e.pointerId)) fingers.set(e.pointerId, spot(e));
      if (pinch && fingers.size === 2) {
        const now = pair();
        ox += (now.x - pinch.x) / Z; oy += (now.y - pinch.y) / Z; // the fingers moving together slide the wall
        zoomAt(Z * (now.d / pinch.d), now.x, now.y); pinch = now; return;
      }
      if (!drag) return;
      if (!e.buttons) { release(e); return; } // the press ended somewhere else
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(1, now - last);
      moved += Math.abs(dx) + Math.abs(dy); ox += dx / Z; oy += dy / Z;
      vx = (dx / Z / dt) * 16; vy = (dy / Z / dt) * 16; // speed per frame, for the glide after letting go
      drag = { x: e.clientX, y: e.clientY }; last = now;
      if (moved > 6 && !wall.classList.contains('dragging')) { wall.classList.add('dragging'); wall.setPointerCapture(e.pointerId); } // a real drag: keep it even off the wall
      place();
    });
    function release(e) {
      fingers.delete(e.pointerId);
      if (pinch) { if (fingers.size < 2) { pinch = null; setTimeout(() => wall.classList.remove('dragging')); } return; } // lifting one finger of a pinch doesn't start a drag
      if (!drag) return; drag = null; setTimeout(() => wall.classList.remove('dragging')); if (moved > 6) glide();
    }
    wall.addEventListener('pointerup', release); wall.addEventListener('pointercancel', release);
    // the scroll wheel zooms: up in, down out, around the cursor. Fully zoomed out, scrolling on down moves the page as usual
    let zTarget = 1, zAt = [0, 0], zooming = false;
    wall.addEventListener('wheel', (e) => {
      const out = e.deltaY > 0;
      if ((out && Z <= ZMIN + 1e-3) || (!out && Z >= ZMAX - 1e-3)) return; // at the end of the zoom: let the page scroll
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? wall.clientHeight : 1; // lines or pages, in pixels
      zTarget = Math.min(ZMAX, Math.max(ZMIN, (zooming ? zTarget : Z) * Math.exp(-e.deltaY * unit * 0.0018)));
      zAt = spot(e);
      if (!zooming) { zooming = true; requestAnimationFrame(function ease() { // ease towards it, so a notched mouse wheel glides too
        const z = Z + (zTarget - Z) * 0.25;
        zoomAt(Math.abs(zTarget - z) < 0.002 ? zTarget : z, zAt[0], zAt[1]);
        if (Z !== zTarget) requestAnimationFrame(ease); else zooming = false;
      }); }
    }, { passive: false });
    wall.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true); // a drag is not a click
    wall.addEventListener('keydown', (e) => {
      const k = { ArrowLeft: [120, 0], ArrowRight: [-120, 0], ArrowUp: [0, 120], ArrowDown: [0, -120] }[e.key];
      if (k && e.target === wall) { e.preventDefault(); vx = k[0] / 8 / Z; vy = k[1] / 8 / Z; glide(); }
      const z = { '+': 1.25, '=': 1.25, '-': 0.8 }[e.key]; // + and - zoom from the middle
      if (z && e.target === wall) { e.preventDefault(); zoomAt(Z * z, wall.clientWidth / 2, wall.clientHeight / 2); }
    });
    // let go: it keeps moving and slows down, like a sheet slid across a table
    let gliding = false;
    function glide() {
      if (gliding) return; gliding = true;
      (function step() {
        if (drag || (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05)) { gliding = false; return; }
        ox += vx; oy += vy; vx *= 0.94; vy *= 0.94; place(); requestAnimationFrame(step);
      })();
    }
  }

  // ---- a project page ----
  const host = document.getElementById('project');
  if (host) {
    const slug = new URLSearchParams(location.search).get('p');
    const p = PROJECTS.find((x) => x.slug === slug);
    if (!p) throw new Error(`No project "${slug}" in PROJECTS (content.js)`);
    document.title = `${p.tile} - Harshal Tholambia`;
    // one item in a row: a picture or an embed, its width out of the page's 1154
    const item = (it, share) => {
      const o = typeof it === 'number' ? { img: it } : it;
      const w = o.w ? `${(o.w / 1154) * 100}%` : share;
      if (o.embed) return `<iframe class="item embed" src="${html(o.embed)}" style="--w:${w};aspect-ratio:${o.w || 1154} / ${o.h || ((o.w || 1154) * 9) / 16}" title="${html(p.tile)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`; // YouTube refuses to play (Error 153) without the page's address, which this policy sends
      return `<div class="item" style="--w:${w}">${pic(p.slug, o.img, `${p.tile}, picture ${o.img}`)}</div>`;
    };
    // a fact in the details: text, or a list of logos (each with its name, a link, and a second picture for dark mode)
    const fact = (v) => typeof v === 'string' ? html(v) : `<span class="logos">${v.map((l) => {
      const img = (src, cls) => `<img class="${cls}" src="images/logos/${src}" alt="${html(l.name)}" title="${html(l.name)}">`;
      const pics = l.dark ? img(l.src, 'on-light') + img(l.dark, 'on-dark') : img(l.src, '');
      return l.href ? `<a href="${html(l.href)}" target="_blank" rel="noopener">${pics}</a>` : pics;
    }).join('')}</span><span class="logo-names">${v.map((l) => html(l.name)).join(' and ')}</span>`;
    const ext = (u) => `<a href="${html(u.href)}" target="_blank" rel="noopener">${html(u.text)}</a>`;
    // one part of the page (see PROJECTS in content.js)
    const part = (t) => {
      if (t.hero) return t.hero.endsWith('.mp4')
        ? `<video class="hero-pic${t.w ? ' framed' : ''}" style="--h:${t.h}px;--w:${t.w}px" src="images/${p.slug}/${t.hero}" autoplay muted loop playsinline aria-hidden="true"></video>`
        : `<img class="hero-pic" style="--h:${t.h}px" src="images/${p.slug}/${t.hero}" alt="">`;
      if (t.title) return `<h1 class="proj-title">${html(t.title)}</h1>${t.sub ? `<p class="proj-sub">${html(t.sub)}</p>` : ''}`;
      if (t.details) return `<div class="details">
          <div class="facts"><dl>${Object.entries(t.details).map(([k, v]) => `<dt>${html(k)}:</dt><dd>${fact(v)}</dd>`).join('')}
          ${p.software && p.software.length ? `<dt>Software:</dt><dd class="software">${p.software.map((n) => `<img src="images/software/${n}.svg" alt="${html(n)}" title="${html(n)}">`).join('')}</dd>` : ''}</dl>
          ${t.link ? `<p class="d-link">${ext(t.link)}</p>` : ''}</div>
          <div class="about">${t.heading ? `<h2>${html(t.heading)}</h2>` : ''}${t.about.map((x) => `<p>${html(x)}</p>`).join('')}</div>
        </div>`;
      if (t.row) return `<div class="row">${t.row.map((it) => item(it, t.row.length === 1 ? '100%' : `calc((100% - ${t.row.length - 1} * var(--gap)) / ${t.row.length})`)).join('')}</div>`;
      if (t.link) return `<p class="p-link">${ext(t.link)}</p>`;
      if (t.heading) return `<h2 class="p-heading">${html(t.heading)}</h2>`;
      if (t.caption) return `<p class="p-caption">${html(t.caption)}</p>`;
      if (t.note) return `<div class="p-note">${t.note.map((x) => `<p>${html(x)}</p>`).join('')}</div>`;
      if (t.feature) return `<div class="p-feature${t.center ? ' center' : ''}"><h2>${html(t.feature)}</h2>${t.text ? `<p>${html(t.text)}</p>` : ''}</div>`;
      if (t.columns) return `<div class="cols">${t.columns.map((col) => `<div class="col">${col.map((n) => pic(p.slug, n, `${p.tile}, picture ${n}`)).join('')}</div>`).join('')}</div>`;
      if (t.case) return '<div id="tc-host"></div>';
      if (t.boards) return `<div class="boards" aria-label="${html(p.tile)}: storyboard backgrounds">
          <div class="boards-wall" tabindex="0">${t.boards.map((lab, i) => `<figure class="board">
            <span class="board-frame">${pic(`${p.slug}/boards`, i + 1, `${p.tile}, ${lab}`)}</span>
            <figcaption><b>${String(i + 1).padStart(2, '0')}</b> ${html(lab)}</figcaption></figure>`).join('')}</div>
          <p class="boards-nav"><button type="button" class="proc-arrow prev" aria-label="Previous panels"></button>
            <span class="boards-count" aria-live="polite"></span>
            <button type="button" class="proc-arrow next" aria-label="Next panels"></button></p>
        </div>`;
      if (t.process) {
        const dir = `${p.slug}/${t.process}`, steps = Array.from({ length: t.slides }, (_, i) => i + 1);
        return `<div class="process" aria-label="${html(p.tile)}: a finished background and the steps that made it">
          <div class="proc-view">
            <div class="proc-track">
              <figure class="proc-slide">${pic(dir, 'cover', `${p.tile}, the finished background`)}</figure>
              ${steps.map((n) => `<figure class="proc-slide">${pic(dir, n, `${p.tile}, process step ${n}`)}</figure>`).join('')}
            </div>
            <button type="button" class="proc-arrow prev" aria-label="Previous step"></button>
            <button type="button" class="proc-arrow next" aria-label="Next step"></button>
          </div>
          <p class="proc-open"><span class="proc-count" aria-live="polite"></span><button type="button" class="gs-btn proc-toggle" aria-expanded="false"><span>Show process</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg></button></p>
        </div>`;
      }
      if (t.drift) return `<div class="drift" tabindex="0" aria-label="${html(p.tile)}: drag sideways, or use the arrow keys"><div class="drift-track">${t.drift.map((n) => pic(p.slug, n, `${p.tile}, page ${n}`)).join('')}</div></div>`;
      throw new Error(`Unknown part in ${p.slug}: ${JSON.stringify(t)}`);
    };
    // parts in a row with the same background share one full-width band; the opening picture runs edge to edge
    const bands = [];
    for (const t of p.parts) {
      const bg = t.hero ? 'hero' : t.case ? 'case' : t.bg || 'white', last = bands[bands.length - 1];
      if (last && last.bg === bg && bg !== 'hero') last.parts.push(t); else bands.push({ bg, parts: [t] });
    }
    host.innerHTML = bands.map((b) => b.bg === 'hero' || b.bg === 'case'
      ? `<section class="band ${b.bg}">${part(b.parts[0])}</section>`
      : `<section class="band ${b.bg}"><div class="wrap">${b.parts.map(part).join('')}</div></section>`).join('')
      + `<div class="wrap"><p class="proj-nav"><a class="gs-btn" href="portfolio.html" data-dir="back">Back</a>${p.next ? `<a class="gs-btn" href="${href(p.next)}" data-dir="forward">Next project</a>` : ''}</p></div>`;
    // a designed part (cases/<name>.css + .js) fills its own #tc-host, full width
    const designed = p.parts.find((t) => t.case);
    if (designed) {
      document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="cases/${designed.case}.css">`);
      const s = document.createElement('script'); s.src = `cases/${designed.case}.js`; document.body.append(s);
    }
    // the opening picture: short enough that the project's title under it shows on the first screen, so visitors
    // know to scroll; it blurs as the page scrolls past it
    const hero = host.querySelector('.band.hero > .hero-pic');
    if (hero) {
      const title = hero.parentElement.nextElementSibling;
      const fit = () => {
        const last = title.querySelector('.proj-sub') || title.querySelector('.proj-title');
        const below = last.getBoundingClientRect().bottom - title.getBoundingClientRect().top + 28; // the title band down to its last line, and some air
        const cs = getComputedStyle(hero), around = parseFloat(cs.marginTop) + parseFloat(cs.marginBottom); // a framed film sits with room around it
        hero.style.setProperty('--fit', `${Math.max(180, innerHeight - document.querySelector('.site-head').offsetHeight - below - around)}px`);
      };
      const blur = () => {
        const b = Math.min(1, scrollY / hero.offsetHeight) * 12;
        hero.style.filter = b ? `blur(${b.toFixed(1)}px)` : '';
        if (!hero.classList.contains('framed')) hero.style.transform = b ? `scale(${1 + b / 200})` : '';  // hides the soft edges the blur leaves
      };
      fit(); blur();
      addEventListener('resize', fit);
      addEventListener('scroll', () => requestAnimationFrame(blur), { passive: true });
    }
    // the storyboard wall: the panels grouped into sheets read like a storyboard page, left to right then down (3 x 2,
    // or 1 on a phone); the sheets sit side by side and the arrows slide one sheet at a time
    host.querySelectorAll('.boards').forEach((box) => {
      const wall = box.querySelector('.boards-wall'), panels = [...wall.children];
      const prev = box.querySelector('.prev'), next = box.querySelector('.next'), count = box.querySelector('.boards-count');
      const phone = matchMedia('(max-width: 700px)');
      let per = 0, at = 0;
      const show = () => {
        const sheets = Math.ceil(panels.length / per);
        at = Math.max(0, Math.min(sheets - 1, at));
        wall.scrollTo({ left: at * wall.clientWidth, behavior: 'smooth' });
        count.textContent = per === 1 ? `${at + 1} of ${panels.length}` : `${at * per + 1}–${Math.min(panels.length, (at + 1) * per)} of ${panels.length}`;
        prev.disabled = at === 0; next.disabled = at === sheets - 1;
      };
      const pack = () => {
        const n = phone.matches ? 1 : 6;
        if (n === per) return;
        const first = at * per; per = n; at = Math.floor(first / per);
        wall.replaceChildren(...Array.from({ length: Math.ceil(panels.length / per) }, (_, k) => {
          const sheet = document.createElement('div'); sheet.className = 'board-sheet';
          sheet.append(...panels.slice(k * per, (k + 1) * per)); return sheet;
        }));
        show();
      };
      prev.addEventListener('click', () => { at--; show(); });
      next.addEventListener('click', () => { at++; show(); });
      wall.addEventListener('keydown', (e) => { const k = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (k) { e.preventDefault(); at += k; show(); } });
      wall.addEventListener('scroll', () => { // a swipe moves it too: follow whichever sheet it settles on
        clearTimeout(wall._t); wall._t = setTimeout(() => { const k = Math.round(wall.scrollLeft / wall.clientWidth); if (k !== at) { at = k; show(); } }, 120);
      }, { passive: true });
      phone.addEventListener('change', pack);
      addEventListener('resize', () => wall.scrollTo({ left: at * wall.clientWidth }));
      pack();
    });

    // a process carousel: the finished picture first; Show process opens the steps, which slide left and right with the
    // arrows, the arrow keys or a swipe. Slide 0 is the finished picture, 1 onwards the steps
    host.querySelectorAll('.process').forEach((box) => {
      const track = box.querySelector('.proc-track'), slides = [...track.children], last = slides.length - 1;
      const prev = box.querySelector('.prev'), next = box.querySelector('.next'), count = box.querySelector('.proc-count');
      const toggle = box.querySelector('.proc-toggle');
      let at = 0;
      const show = (i) => {
        at = Math.max(0, Math.min(last, i));
        track.style.translate = `${-at * 100}% 0`;
        slides.forEach((s, k) => { s.inert = k !== at; });
        prev.disabled = at === 0; next.disabled = at === last;
        count.textContent = at === 0 ? 'Finished background' : `Step ${at} of ${last}`;
      };
      const open = (o) => {
        box.classList.toggle('open', o); toggle.setAttribute('aria-expanded', String(o));
        toggle.firstElementChild.textContent = o ? 'Hide process' : 'Show process';
        show(o ? 1 : 0);
      };
      toggle.addEventListener('click', () => open(!box.classList.contains('open')));
      prev.addEventListener('click', () => show(at - 1));
      next.addEventListener('click', () => show(at + 1));
      box.addEventListener('keydown', (e) => {
        const k = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
        if (k && box.classList.contains('open')) { e.preventDefault(); show(at + k); }
      });
      let from = null; // a sideways swipe on the picture steps too
      const view = box.querySelector('.proc-view');
      view.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; from = e.clientX; });
      view.addEventListener('pointerup', (e) => {
        if (from === null || !box.classList.contains('open')) { from = null; return; }
        const dx = e.clientX - from; from = null;
        if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1));
      });
      view.addEventListener('pointercancel', () => { from = null; });
      show(0);
    });

    // the drifting row: drag it sideways and it glides on, slowing to a stop; it can't run past either end
    const drift = host.querySelector('.drift');
    if (drift) {
      const track = drift.firstElementChild;
        let x = 0, v = 0, grab = null, last = 0, gliding = false;
      const min = () => Math.min(0, drift.clientWidth - track.scrollWidth);
      const put = () => { x = Math.max(min(), Math.min(0, x)); track.style.translate = `${x}px 0`; };
      const glide = () => {
        if (gliding) return; gliding = true;
        (function step() {
          if (grab || Math.abs(v) < 0.05) { gliding = false; return; }
          x += v; v *= 0.94; put(); requestAnimationFrame(step);
        })();
      };
      drift.addEventListener('pointerdown', (e) => { grab = e.clientX; v = 0; last = performance.now(); drift.setPointerCapture(e.pointerId); drift.classList.add('dragging'); });
      drift.addEventListener('pointermove', (e) => {
        if (grab === null) return;
        const dx = e.clientX - grab, now = performance.now();
        x += dx; v = (dx / Math.max(1, now - last)) * 16; grab = e.clientX; last = now; put();
      });
      const let_go = () => { if (grab === null) return; grab = null; drift.classList.remove('dragging'); glide(); };
      drift.addEventListener('pointerup', let_go); drift.addEventListener('pointercancel', let_go);
      drift.addEventListener('keydown', (e) => { const k = { ArrowLeft: 30, ArrowRight: -30 }[e.key]; if (k) { e.preventDefault(); v = k; glide(); } });
      new ResizeObserver(put).observe(drift);
    }
  }

  // ---- the top bar turns to frosted glass once the page scrolls under it ----
  const head = document.querySelector('.site-head');
  const glass = () => head.classList.toggle('scrolled', scrollY > 4);
  addEventListener('scroll', glass, { passive: true }); glass();

  // ---- pages slide sideways into each other: Welcome is on the left, then Portfolio, the Illustration Wall, and the projects on the right.
  // The link clicked decides the direction; the next page reads it in its <head> as it appears (@view-transition in site.css) ----
  const PLACE = { welcome: 0, portfolio: 1, wall: 2, project: 3 };
  const placeOf = (url) => ({ 'portfolio.html': 1, 'wall.html': 2, 'project.html': 3 }[url.pathname.split('/').pop()] ?? 0);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    const dir = a.dataset.dir || (placeOf(url) >= PLACE[page] ? 'forward' : 'back');
    sessionStorage.setItem('slide', dir);
  });
}
