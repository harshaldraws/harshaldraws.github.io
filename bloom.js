// Watercolour blooms: as the cursor moves over an element marked data-bloom, drops of colour land under it,
// spread, mix with each other where they overlap, and slowly dry away. Drawn on a canvas laid inside the element.
{
  const INKS = ['#F2499B', '#F6A51F', '#1F3FB8', '#9BE25C', '#E8343A', '#9DB5EA', '#176B80'];
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;

  document.querySelectorAll('[data-bloom]').forEach((host) => {
    if (still) return;
    const cv = document.createElement('canvas');
    cv.className = 'bloom';
    cv.setAttribute('aria-hidden', 'true');
    host.prepend(cv);
    const ctx = cv.getContext('2d');
    const drops = [], strength = parseFloat(host.dataset.bloom) || 1; // data-bloom=".5" for a lighter wash
    let ink = Math.floor(Math.random() * INKS.length), last = null, running = false;

    const size = () => {
      const r = host.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    new ResizeObserver(size).observe(host);

    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      if (last && Math.hypot(x - last.x, y - last.y) < 18) return; // a drop every few steps of the cursor, not every pixel
      last = { x, y };
      const big = Math.min(r.width, r.height);
      ink = (ink + 1 + (Math.random() < 0.3 ? 1 : 0)) % INKS.length;
      drops.push({ x, y, born: performance.now(), r: big * (0.35 + Math.random() * 0.3), c: INKS[ink], wob: Math.random() * 6.28 });
      if (drops.length > 60) drops.shift();
      if (!running) { running = true; requestAnimationFrame(paint); }
    });
    host.addEventListener('pointerleave', () => (last = null));

    // one drop: a soft wash with a darker rim where the pigment gathers, like watercolour drying on paper
    const drop = (d, t) => {
      const age = (t - d.born) / 1000, grow = 1 - Math.exp(-age * 3.2), fade = Math.max(0, 1 - age / 2.6);
      if (fade <= 0) return false;
      const R = d.r * (0.25 + 0.75 * grow);
      ctx.save();
      ctx.translate(d.x, d.y); ctx.rotate(d.wob); ctx.scale(1, 0.8 + 0.15 * Math.sin(d.wob));
      const g = ctx.createRadialGradient(0, 0, R * 0.05, 0, 0, R);
      g.addColorStop(0, d.c + '80'); g.addColorStop(0.72, d.c + '66'); g.addColorStop(0.9, d.c + 'a6'); g.addColorStop(1, d.c + '00');
      ctx.globalAlpha = fade * strength;
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      return true;
    };
    function paint(t) {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.globalCompositeOperation = 'multiply'; // overlapping colours mix like paint
      for (let i = drops.length - 1; i >= 0; i--) if (!drop(drops[i], t)) drops.splice(i, 1);
      if (drops.length) requestAnimationFrame(paint); else running = false;
    }
  });
}
