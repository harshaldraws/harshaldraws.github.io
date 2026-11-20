// The parts every page shares, laid out like the Google Site: the header with its links, the footer,
// the Portfolio grid (portfolio.html) and a project page (project.html?p=<slug>). What goes in them is PROJECTS in content.js.
{
  const RESUME = 'https://drive.google.com/file/d/1mZcOKCzq3N4GQ8IayMUodFR_9-F1n4WE/view?usp=sharing';
  const EMAIL = 'harshal.tholambia@nift.ac.in';
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
    <header class="site-head" data-bloom=".6">
      <a class="site-home" href="./" aria-label="Home">🏠</a>
      <nav class="site-nav" aria-label="Main">
        <a href="./"${page === 'welcome' ? ' aria-current="page"' : ''}>Welcome!</a>
        <a href="portfolio.html"${page !== 'welcome' ? ' aria-current="page"' : ''}>Portfolio</a>
        <a href="${RESUME}" target="_blank" rel="noopener">View Resume</a>
      </nav>
    </header>`);
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="site-foot">
      <p class="social">${SOCIAL.map(([name, url, d]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${name}"><svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg></a>`).join('')}</p>
      <p>Harshal Tholambia © 2026</p>
      <p><a href="mailto:${EMAIL}">✉️ ${EMAIL}</a></p>
    </footer>`);

  // a picture: images/<slug>/<nn>.webp (animated ones are animated webp)
  const pic = (slug, n, alt) => `<img src="images/${slug}/${two(n)}.webp" alt="${html(alt)}" loading="lazy">`;

  // ---- Portfolio: two tiles a row, a cover with its name under it ----
  const grid = document.getElementById('grid');
  if (grid) {
    grid.innerHTML = PROJECTS.filter((p) => !p.hidden).map((p) => `
      <a class="tile" href="${href(p.slug)}"><img src="images/${p.slug}/cover.webp" alt="" loading="lazy"><span>${html(p.tile)}</span></a>`).join('');
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
      if (o.embed) return `<iframe class="item embed" src="${html(o.embed)}" style="--w:${w};aspect-ratio:${o.w || 1154} / ${o.h || ((o.w || 1154) * 9) / 16}" title="${html(p.title)}" loading="lazy" allowfullscreen></iframe>`;
      return `<div class="item" style="--w:${w}">${pic(p.slug, o.img, `${p.tile}, picture ${o.img}`)}</div>`;
    };
    const body = p.columns
      ? `<div class="cols">${p.columns.map((col) => `<div class="col">${col.map((n) => pic(p.slug, n, `${p.tile}, picture ${n}`)).join('')}</div>`).join('')}</div>`
      : p.rows.map((row) => `<div class="row">${row.map((it) => item(it, row.length === 1 ? '100%' : `calc((100% - ${row.length - 1} * var(--gap)) / ${row.length})`)).join('')}</div>`).join('');
    const title = p.titleLink ? `<a href="${p.titleLink}" target="_blank" rel="noopener">${html(p.title)}</a>` : html(p.title);
    host.innerHTML = `
      <h1 class="proj-title">${title}</h1>
      ${p.sub ? `<p class="proj-sub">${html(p.sub)}</p>` : ''}
      ${p.link ? `<p class="proj-link"><a class="gs-btn" href="${p.link.href}" target="_blank" rel="noopener">${html(p.link.text)}</a></p>` : ''}
      ${body}
      ${p.back || p.next ? `<p class="proj-nav">${p.back ? `<a class="gs-btn" href="${href(p.back)}" data-dir="back">Back</a>` : '<span></span>'}${p.next ? `<a class="gs-btn" href="${href(p.next)}" data-dir="forward">Next</a>` : ''}</p>` : ''}`;
  }

  // ---- a spiky cut-paper edge, like the "draws." badge on the mat ----
  document.querySelectorAll('.spiky-paper').forEach((el) => {
    const n = 30, pts = [];
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2, r = k % 2 ? 0.82 + Math.random() * 0.05 : 1;
      pts.push(`${(50 + 50 * r * Math.cos(a)).toFixed(2)}% ${(50 + 50 * r * Math.sin(a)).toFixed(2)}%`);
    }
    el.style.clipPath = `polygon(${pts.join(',')})`;
  });

  // ---- the top bar turns to frosted glass once the page scrolls under it ----
  const head = document.querySelector('.site-head');
  const glass = () => head.classList.toggle('scrolled', scrollY > 4);
  addEventListener('scroll', glass, { passive: true }); glass();

  // ---- pages slide sideways into each other: Welcome is on the left, Portfolio in the middle, projects on the right.
  // The link clicked decides the direction; the next page reads it in its <head> as it appears (@view-transition in site.css) ----
  const PLACE = { welcome: 0, portfolio: 1, project: 2 };
  const placeOf = (url) => (/portfolio\.html$/.test(url.pathname) ? 1 : /project\.html$/.test(url.pathname) ? 2 : 0);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    const dir = a.dataset.dir || (placeOf(url) >= PLACE[page] ? 'forward' : 'back');
    sessionStorage.setItem('slide', dir);
  });
}
