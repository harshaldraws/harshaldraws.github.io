// "Recommend me something interesting...": visitors write a recommendation on the sticky note and send it;
// everyone's notes are kept in your Google Sheet (RECOMMENDATIONS_URL in content.js) and shown in the pile.
// Only real notes from the sheet are ever shown.
{
  const mat = $('.hero .pad'), rec = $('.rec'), card = $('.rec-card'), front = $('.rec-face.front'), back = $('.rec-face.back');
  const text = front.elements.text, by = back.elements.by, msg = $('.rec-msg');
  const pile = $('.pile'), board = $('.pile-board'), pileMsg = $('.pile-msg');
  let notes = null; // the sheet's notes once loaded

  // ---- the note leaves the mat and comes up to the screen (and goes back): the lifted card starts exactly over the
  // note on the mat, at its size and tilt, and travels to the middle ----
  const fly = (toScreen) => {
    const a = mat.getBoundingClientRect(), b = card.getBoundingClientRect();
    const from = `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${a.width / b.width}) rotate(-8deg)`;
    const frames = [{ transform: from }, { transform: 'none' }];
    return card.animate(toScreen ? frames : frames.reverse(), { duration: still ? 0 : 520, easing: 'cubic-bezier(.3,.7,.2,1)', fill: 'both' }).finished;
  };
  async function open() {
    rec.hidden = false; mat.style.visibility = 'hidden';
    rec.animate([{ background: 'rgba(10,14,12,0)' }, { background: 'rgba(10,14,12,.45)' }], { duration: 400 });
    await fly(true);
    text.focus({ preventScroll: true });
  }
  async function close() {
    if (card.classList.contains('flipped')) await flip(false);
    rec.animate([{ background: 'rgba(10,14,12,.45)' }, { background: 'rgba(10,14,12,0)' }], { duration: 450, fill: 'forwards' });
    await fly(false);
    rec.hidden = true; mat.style.visibility = ''; mat.focus({ preventScroll: true });
  }
  // ---- the page turns: front (the recommendation) to back (who it's from) ----
  const flip = (toBack) => new Promise((done) => {
    card.classList.toggle('flipped', toBack);
    front.inert = toBack; back.inert = !toBack;
    setTimeout(() => { (toBack ? by : text).focus({ preventScroll: true }); done(); }, still ? 0 : 700);
  });

  // the note grows with what's written on it
  const grow = () => { text.style.height = 'auto'; text.style.height = `${text.scrollHeight}px`; };
  text.addEventListener('input', grow);
  text.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); front.requestSubmit(); } });

  front.addEventListener('submit', (e) => { e.preventDefault(); if (text.value.trim()) flip(true); else text.focus({ preventScroll: true }); });
  $('.back-btn', back).addEventListener('click', () => flip(false));
  $('.put-back', front).addEventListener('click', close); // returns the note to the mat; clicks outside an embed never reach it
  back.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!RECOMMENDATIONS_URL) { msg.textContent = 'This note isn’t connected to the sheet yet.'; return; }
    const note = { text: text.value.trim(), by: by.value.trim() };
    msg.textContent = 'sending…'; back.inert = true;
    try {
      const r = await fetch(RECOMMENDATIONS_URL, { method: 'POST', body: JSON.stringify(note) }); // sent as plain text, so no preflight
      if (!r.ok || !(await r.json()).ok) throw new Error('not saved');
    } catch {
      msg.textContent = 'Couldn’t send it. Check your connection and press send again.'; back.inert = false; return;
    }
    msg.textContent = '';
    if (notes) notes.unshift({ ...note, time: new Date().toISOString() });
    await close();
    text.value = ''; by.value = ''; grow(); back.inert = true; front.inert = false;
    mat.querySelector('.pad-thanks').textContent = 'sent, thank you!';
    mat.classList.add('thanked'); setTimeout(() => mat.classList.remove('thanked'), 2600);
  });

  mat.addEventListener('click', open);
  rec.addEventListener('click', (e) => { if (e.target === rec) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!rec.hidden) close(); else if (!pile.hidden) closePile();
  });

  // ---- the pile of everyone's notes ----
  const rnd = (r) => (Math.random() * 2 - 1) * r;
  function show() {
    if (!notes.length) {
      board.innerHTML = '';
      pileMsg.innerHTML = 'No recommendations yet. <button type="button">Be the first</button>';
      pileMsg.querySelector('button').onclick = () => { closePile(); open(); };
      return;
    }
    pileMsg.textContent = '';
    board.innerHTML = notes.map((n) => `<article class="pile-note" style="--r:${rnd(4).toFixed(1)}deg;--dy:${rnd(14).toFixed(0)}px"><div>
      <p class="ink">${esc(n.text)}</p>${n.by ? `<p class="who ink">— ${esc(n.by)}</p>` : ''}</div></article>`).join('');
  }
  async function openPile() {
    pile.hidden = false; $('.pile-close').focus({ preventScroll: true });
    if (notes) return show();
    board.innerHTML = '';
    if (!RECOMMENDATIONS_URL) { pileMsg.textContent = 'The notes aren’t connected to the sheet yet.'; return; }
    pileMsg.textContent = 'collecting the notes…';
    try {
      const r = await fetch(RECOMMENDATIONS_URL);
      if (!r.ok) throw new Error(r.status);
      notes = (await r.json()).reverse(); // newest first
      show();
    } catch {
      pileMsg.innerHTML = 'Couldn’t load the notes. <button type="button">Try again</button>';
      pileMsg.querySelector('button').onclick = openPile;
    }
  }
  function closePile() { pile.hidden = true; $('.peek').focus({ preventScroll: true }); }
  $('.peek').addEventListener('click', openPile);
  $('.pile-close').addEventListener('click', closePile);

  // glide through the pile: drag it sideways, or scroll
  let drag = null;
  board.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; drag = { x: e.clientX, s: board.scrollLeft }; board.classList.add('dragging'); board.setPointerCapture(e.pointerId); });
  board.addEventListener('pointermove', (e) => { if (drag) board.scrollLeft = drag.s - (e.clientX - drag.x); });
  const stop = () => { drag = null; board.classList.remove('dragging'); };
  board.addEventListener('pointerup', stop); board.addEventListener('pointercancel', stop);
  // an up/down wheel moves the pile sideways while it still can; at either end it scrolls the page as usual
  board.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const end = board.scrollWidth - board.clientWidth;
    if ((e.deltaY < 0 && board.scrollLeft <= 0) || (e.deltaY > 0 && board.scrollLeft >= end - 1)) return;
    board.scrollLeft += e.deltaY; e.preventDefault();
  }, { passive: false });
}
