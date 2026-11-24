const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const still = matchMedia('(prefers-reduced-motion:reduce)').matches;

// ---- image slots: show images/<name>.(jpg|jpeg|png|webp|gif) if it exists, else a labelled placeholder ----
const EXTS = ['webp', 'gif', 'jpg', 'jpeg', 'png'];
function slot(el) {
  let i = 0;
  const img = new Image();
  img.alt = el.dataset.alt || ''; img.draggable = false;
  el.dataset.label = `images/${el.dataset.img}.jpg`;
  img.onload = () => { el.classList.add('filled'); el.append(img); };
  img.onerror = () => { if (++i < EXTS.length) img.src = `images/${el.dataset.img}.${EXTS[i]}`; };
  img.src = `images/${el.dataset.img}.${EXTS[0]}`;
}
const slots = (root = document) => $$('[data-img]', root).forEach(slot);

// ---- hand-drawn marks, cut out of images/marks.webp (563 x 1000). [x, y, width, height] of each mark on the sheet ----
const MARKS = {
  arrow: [22, 18, 158, 98], hash: [98, 104, 94, 78], loops: [204, 22, 154, 146], blob: [368, 18, 180, 100],
  arrowCurl: [352, 142, 196, 116], ball: [18, 192, 170, 162], ovals: [218, 182, 180, 122], bars: [202, 312, 196, 46],
  burst: [402, 258, 146, 136], wave: [192, 372, 206, 46], zigzag: [18, 376, 170, 132], coil: [208, 428, 180, 106],
  knot: [398, 398, 146, 136], rainbow: [22, 526, 162, 122], star: [182, 540, 156, 128], ring: [342, 540, 206, 80],
  scribble: [18, 660, 176, 134], arrowLong: [246, 638, 172, 80], dot: [392, 642, 156, 166], hatch: [182, 732, 186, 96],
  arrowBack: [362, 802, 176, 82], cross: [28, 816, 146, 152], mess: [188, 826, 164, 148], curls: [372, 878, 176, 90],
};
$$('[data-mark]').forEach((el) => {
  const [x, y, w, h] = MARKS[el.dataset.mark];
  el.style.aspectRatio = `${w}/${h}`;
  el.style.backgroundSize = `${(563 / w) * 100}% auto`;
  el.style.backgroundPosition = `${(x / (563 - w)) * 100}% ${(y / (1000 - h)) * 100}%`;
});

// ---- handwriting: sample text now, your own drawing once images/hand/<key>.png exists ----
$$('[data-hand]').forEach((el) => {
  el.textContent = HAND[el.dataset.hand];
  const img = new Image();
  img.onload = () => { el.textContent = ''; el.classList.add('drawn'); el.style.setProperty('--hand', `url("${img.src}")`); el.style.aspectRatio = `${img.naturalWidth}/${img.naturalHeight}`; };
  img.src = `images/hand/${el.dataset.hand}.png`;
});

// ---- the name, cut from paper: each letter keeps its real text (invisible, for layout) and gets its cut shapes
// from cutletters.js; --i = landing order, --r0 = how crooked it lands, --j / --jy = how crooked it lies ----
{
  let i = 0;
  $$('h1 .ln').forEach((ln, n) => {
    ln.innerHTML = [...ln.textContent].map((c, k) => {
      const cut = CUT_LETTERS.lines[n][k], x = -150, w = cut.adv + 300, rnd = (r) => (Math.random() * 2 - 1) * r;
      const svg = `<svg class="cutl" viewBox="${x} -1000 ${w} 1300" style="left:${x / 1000}em;width:${w / 1000}em" aria-hidden="true"><g filter="url(#paper)">${cut.d.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`;
      return `<span class="ch" style="--i:${i++};--r0:${rnd(8).toFixed(1)}deg;--j:${rnd(2.4).toFixed(2)}deg;--jy:${rnd(0.018).toFixed(3)}em"><span class="tx">${esc(c)}</span>${svg}</span>`;
    }).join('');
  });
  // where the baseline falls inside a letter, so the cut shapes stand on it: the line box ends at the baseline
  document.fonts.ready.then(() => {
    const ln = $('h1 .ln'), ch = ln.querySelector('.ch');
    $('h1').style.setProperty('--bl', ((ln.offsetHeight - ch.offsetTop) / parseFloat(getComputedStyle(ln).fontSize)).toFixed(4));
  });
}

// ---- the spiky oval edge of the "draws." cut-out: points alternate between the oval and a little inside it ----
{
  const n = 34, pts = [];
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2, r = k % 2 ? 0.8 + Math.random() * 0.05 : 1;
    pts.push(`${(50 + 50 * r * Math.cos(a)).toFixed(2)}% ${(50 + 50 * r * Math.sin(a)).toFixed(2)}%`);
  }
  $('.draws-paper').style.clipPath = `polygon(${pts.join(',')})`;
  $('.draws').addEventListener('animationend', (e) => e.target.classList.add('landed'), { once: true }); // so a later drop doesn't replay the landing
}


// ---- cut-outs on the mat ----
$('#cutouts').innerHTML = CUTOUTS.map((c) => {
  const [x, y, w, h] = c.crop, side = c.x + c.w / 2 > 66 ? ' r' : c.x + c.w / 2 < 34 ? ' l' : '';
  const pic = `<span class="cut-img" data-img="${c.img}" data-alt="" style="aspect-ratio:${(w * 1712) / (h * 1081)};background-size:${10000 / w}% auto;background-position:${(x / (100 - w)) * 100}% ${(y / (100 - h)) * 100}%"></span>`;
  return `<button type="button" class="cut${side}${c.shape ? ' ' + c.shape : ''}" style="--x:${c.x}%;--y:${c.y}%;--mx:${c.mx ?? c.x}%;--my:${c.my ?? c.y}%;--w:${c.w}%;--mw:${c.mw ?? c.w * 1.9}%;--r:${c.r}deg" aria-label="${esc(c.label)}: ${esc(c.text)}">
    ${c.shape === 'stamp' ? `<span class="paper">${pic}</span>` : pic}
    <span class="note"><b>${esc(c.label)}</b>${esc(c.text)}</span></button>`;
}).join('');

slots();

// ---- the shadow of a paper cut-out under the lamp: it points away from the lamp, which hangs above and to the left of
// the pool's centre; in daylight it falls down and right. The light itself is the .light layer. ----
const lampOn = (el) => {
  const hero = $('.hero');
  if (!hero.classList.contains('lamp')) { ['--sx', '--sy'].forEach((k) => el.style.removeProperty(k)); return; }
  const h = hero.getBoundingClientRect(), r = el.getBoundingClientRect(), cs = getComputedStyle(hero);
  const x = (r.left + r.width / 2 - h.left) / h.width, y = (r.top + r.height / 2 - h.top) / h.height;
  const lx = parseFloat(cs.getPropertyValue('--lx')) / 100, ly = parseFloat(cs.getPropertyValue('--ly')) / 100;
  // the lamp head swings much further than its pool of light drifts: 8 times, from where the pool rests
  const lx0 = parseFloat(hero.dataset.lx0 ?? lx * 100) / 100, ly0 = parseFloat(hero.dataset.ly0 ?? ly * 100) / 100;
  const hx = lx0 - 0.16 + (lx - lx0) * 8, hy = ly0 - 0.5 + (ly - ly0) * 8;
  const dx = (x - hx) * h.width, dy = (y - hy) * h.height, len = Math.hypot(dx, dy) || 1;
  const k = Math.min(14, 3 + len * 0.012); // further from the lamp, the longer the shadow
  if (el.classList.contains('photo')) { // line its copy of the warm pool up with the desk under it
    el.style.setProperty('--hw', `${h.width}px`); el.style.setProperty('--hh', `${h.height}px`);
    el.style.setProperty('--px', `${h.left - r.left}px`); el.style.setProperty('--py', `${h.top - r.top}px`);
  }
  el.style.setProperty('--sx', `${((dx / len) * k).toFixed(1)}px`); el.style.setProperty('--sy', `${((dy / len) * k).toFixed(1)}px`);
};
const lampOnAll = () => { $$('.hero .cut, .hero .draws, .hero .pad, .hero .sharpener, .hero .ruler, .hero .pens, .hero .desk-book').forEach(lampOn); rulerLight(); };

// ---- the ruler under the lamp: as the lamp sways, its reflection moves. --rf picks between the four photos (0..3) by where
// the lamp is in its sway ----
function rulerLight() {
  const hero = $('.hero'), ruler = $('.hero .ruler');
  if (!ruler || !hero.classList.contains('lamp')) return;
  ruler.style.setProperty('--rf', Math.max(0, Math.min(3, Math.round(1 + 2 * parseFloat(hero.dataset.swing ?? 0))))); // 0..3: which photo; rests on the second
}

// ---- the desk lamp: on at first if the visitor's device is in dark mode; the dark mode switch in the top bar turns it on and off ----
{
  const hero = $('.hero'), dark = matchMedia('(prefers-color-scheme: dark)');
  let chosen = null; // set once the visitor uses the switch; until then the lamp follows the device
  try { chosen = localStorage.getItem('lamp'); } catch {}
  const set = (on) => { setTheme(on); hero.classList.toggle('lamp', on); hero.dispatchEvent(new Event('lamp')); lampOnAll(); };
  dark.addEventListener('change', (e) => { if (chosen) return; if (e.matches) set(true); else switchOff(); });
  new ResizeObserver(lampOnAll).observe(hero);
  // switching the lamp on: a beat, the bulb catches with a flicker, then the jolt of the switch sets the lamp head
  // swaying; the pool of light (--lx, --ly) swings to and fro and settles in about two seconds
  let run = 0;
  const flicker = (on, ms) => new Promise((done) => setTimeout(() => { hero.classList.toggle('flick', on); hero.dispatchEvent(new Event('lamp')); done(); }, ms));
  // the lamp's motion just after it is switched on: a hard swing (about 1.6 swings a second) that dies away and stops after
  // about two seconds. swing (-1..1) is where the head is, scaled by how much swing is left; the ruler shows its four
  // photos in turn with it and comes to rest on one.
  function sway(id, x0, y0) {
    const t0 = performance.now();
    const step = (now) => {
      if (id !== run) return;
      const t = (now - t0) / 1000, fade = Math.exp(-t / 0.45), phase = (t * 2 * Math.PI) / 0.62;
      if (fade < 0.01) { // still: the pool back where it rests, the ruler on its resting photo
        hero.style.removeProperty('--lx'); hero.style.removeProperty('--ly'); delete hero.dataset.swing;
        hero.dispatchEvent(new Event('lamp')); lampOnAll(); return;
      }
      hero.style.setProperty('--lx', `${(x0 + 2.4 * fade * Math.sin(phase)).toFixed(3)}%`);
      hero.style.setProperty('--ly', `${(y0 + 1.1 * fade * Math.sin(phase + 1.2)).toFixed(3)}%`);
      hero.dataset.swing = (fade * Math.sin(phase)).toFixed(3);
      hero.dispatchEvent(new Event('lamp')); lampOnAll();
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  async function switchOn() {
    const id = ++run, cs = getComputedStyle(hero), x0 = parseFloat(cs.getPropertyValue('--lx')), y0 = parseFloat(cs.getPropertyValue('--ly'));
    hero.dataset.lx0 = x0; hero.dataset.ly0 = y0; // where the pool rests, for the shadows
    hero.classList.add('flick'); set(true);
    for (const [on, ms] of [[false, 70], [true, 45], [false, 60], [true, 35], [false, 40]]) { await flicker(on, ms); if (id !== run) return; }
    sway(id, x0, y0);
  }
  function switchOff() {
    run++; delete hero.dataset.lx0; delete hero.dataset.ly0; delete hero.dataset.swing; hero.classList.remove('flick'); hero.style.removeProperty('--lx'); hero.style.removeProperty('--ly'); set(false);
  }

  // the switch's sounds: dark mode on plays the "lights off" sound, dark mode off the "lights on" one. They're decoded once
  // and played through Web Audio, whose output stays open after the visitor's first tap anywhere on the page, so the
  // click is instant even after a long pause (a plain <audio> lets the speakers fall asleep, and the first click lags)
  let ctx = null; const buf = {};
  function wake() {
    if (ctx) return ctx.state === 'suspended' && ctx.resume();
    try { ctx = new AudioContext({ latencyHint: 'interactive' }); } catch { return; }
    for (const [k, b64] of Object.entries(SOUNDS)) {
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      ctx.decodeAudioData(bytes.buffer).then((d) => { buf[k] = d; });
    }
  }
  ['pointerdown', 'keydown'].forEach((t) => addEventListener(t, wake, { passive: true }));
  function clack(on) {
    wake();
    const d = buf[on ? 'lights-off' : 'lights-on'];
    if (!ctx || !d) return; // not decoded yet (only on a very first, instant tap)
    const src = ctx.createBufferSource(); src.buffer = d; src.connect(ctx.destination); src.start();
  }

  set(chosen ? chosen === 'on' : dark.matches); // the lamp's starting state: the visitor's last choice, else their device

  // the dark mode switch in the top bar (site.js) turns the lamp on and off, flicker and sound included
  window.toggleLamp = () => {
    const on = !hero.classList.contains('lamp');
    chosen = on ? 'on' : 'off';
    clack(on);
    if (on && !still) switchOn(); else if (on) set(true); else switchOff();
    try { localStorage.setItem('lamp', chosen); } catch {}
  };
}

// ---- letters lift off the mat as the cursor passes over them ----
if (!still && matchMedia('(hover:hover)').matches) {
  const hero = $('.hero'), chars = $$('h1 .ch');
  let spots = [], reach = 1, frame = 0, mx = 0, my = 0;
  const measure = () => { // letter centres relative to the hero, measured at rest
    const h = hero.getBoundingClientRect();
    reach = (h.width / getComputedStyle(hero).getPropertyValue('--cols')) * 2.2; // a little over two squares
    spots = chars.map((c) => { const r = c.parentElement.getBoundingClientRect(); return [r.left - h.left + c.offsetLeft + c.offsetWidth / 2, r.top - h.top + r.height / 2]; }); // from layout, so a letter mid-animation still measures at rest
  };
  const update = () => {
    frame = 0;
    chars.forEach((c, k) => {
      const dx = spots[k][0] - mx, dy = spots[k][1] - my, lift = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
      c.style.setProperty('--lift', lift.toFixed(3)); c.style.setProperty('--tilt', ((dx / reach) * lift * 9).toFixed(2));
      c.classList.toggle('boil', lift > 0.35); // the letters right under the cursor jitter
    });
  };
  hero.addEventListener('pointermove', (e) => {
    if (!spots.length) measure();
    const h = hero.getBoundingClientRect(); mx = e.clientX - h.left; my = e.clientY - h.top;
    frame ||= requestAnimationFrame(update);
  });
  hero.addEventListener('pointerleave', () => chars.forEach((c) => { c.style.setProperty('--lift', 0); c.style.setProperty('--tilt', 0); c.classList.remove('boil'); }));
  new ResizeObserver(() => (spots = [])).observe(hero);
}

// ---- paper cut-outs can be picked up and moved around the mat; a drag never counts as a click ----
$$('.hero .cut, .hero .draws, .hero .pad').forEach((el) => {
  let grab = null, dx = 0, dy = 0, droppedAt = 0;
  el.addEventListener('pointerdown', (e) => {
    if (e.button) return;
    grab = { x: e.clientX, y: e.clientY, dx, dy, moved: false };
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', (e) => {
    if (!grab) return;
    const mx = e.clientX - grab.x, my = e.clientY - grab.y;
    if (!grab.moved && Math.hypot(mx, my) < 5) return;
    grab.moved = true; el.classList.add('lifted');
    dx = grab.dx + mx; dy = grab.dy + my; el.style.translate = `${dx}px ${dy}px`;
    lampOn(el);
  });
  const drop = () => {
    if (!grab) return;
    if (grab.moved) {
      el.classList.remove('lifted'); el.classList.add('dropped'); droppedAt = performance.now();
      setTimeout(() => { el.classList.remove('dropped'); lampOn(el); }, 400);
    }
    grab = null;
  };
  el.addEventListener('pointerup', drop); el.addEventListener('pointercancel', drop);
  el.addEventListener('click', (e) => { if (performance.now() - droppedAt < 300) { e.preventDefault(); e.stopPropagation(); } }, true);
});

// ---- the grid lights up around the cursor ----
if (matchMedia('(hover:hover)').matches) {
  const hero = $('.hero'), mat = $('.mat');
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    mat.style.setProperty('--mx', `${e.clientX - r.left}px`); mat.style.setProperty('--my', `${e.clientY - r.top}px`);
    hero.classList.add('lit');
  });
  hero.addEventListener('pointerleave', () => hero.classList.remove('lit'));
}

