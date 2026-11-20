// ===== EVERYTHING YOU EDIT LIVES IN THIS FILE =====

// Handwritten words. SAMPLE TEXT in a handwriting font for now.
// To use your own hand: save a black-on-white drawing as images/hand/<key>.png and it replaces the word.
const HAND = { hero: 'draws.' };

// Cut-outs on the cutting mat. Save each as images/cutouts/01.png, 02.png ... (transparent background).
// x, y = position on the mat in %, w = width in %, r = tilt in degrees.
// mx, my, mw = position and width on a phone (optional; the width defaults to w × 1.9).
// shape: 'stamp' gives it a perforated postage-stamp edge; leave it out for a plain cut-out.
// "crop" is only the stand-in taken from the old landing drawing until your cut-out exists.
// SAMPLE TEXT: rewrite "label" and "text" with what each thing means to you.
const CUTOUTS = [
  { img: 'cutouts/01', shape: 'stamp', label: 'Sample stamp', x: 74, y: 50, mx: 68, my: 66.5, w: 11, r: -6, crop: [65, 70, 33, 25], text: 'Sample note. What this thing is and why it matters to you.' },
];

// The objects on the cutting mat: hover lifts one, a click shows its note.
// SAMPLE TEXT: rewrite each "text" with what the object is and why it's on your desk.
const DESK = {
  pens: { label: 'Pens', text: 'Sample note. Which pens these are and what you draw with them.' },
  sharpener: { label: 'Sharpener', text: 'Sample note. The story of this sharpener.' },
  ruler: { label: 'Ruler', text: 'Sample note. Why this ruler stays on the desk.' },
  'desk-book': { label: 'Sketchbook', text: 'Sample note. What goes in this sketchbook.' },
};

// The illustration wall at the top of the Portfolio page: different styles side by side.
// Each entry is a project and the pictures of it to show (numbers are 01, 02 ... in images/<slug>/; a name is <name>.webp).
// A click on a picture opens its project.
const WALL = [
  { slug: 'background-paintings', pics: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  { slug: 'character-illustrations', pics: [1, 2, 3, 4, 5, 6] },
  { slug: 'sketchbook', pics: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { slug: 'tano-children-book', pics: [2, 3, 4, 5, 6, 7, 8] },
  { slug: 'bakery-branding', pics: ['stickers'] },
];

// The site's pages, in the same order and layout as the Google Site.
// Each project's pictures go in images/<slug>/ : cover.webp (its tile on the Portfolio page), then 01, 02 ...
// (webp, gif, jpg or png). "rows" lays a page out from top to bottom; the page is 1154 wide, like the Google Site.
// Each row is a list of what sits side by side in it:
//   [1]                          picture 01 across the full width
//   [{ img: 9, w: 562 }]          picture 09, 562 wide, centred
//   [10, 11]                     pictures 10 and 11 side by side, half each
//   [{ embed: 'https://...' }]    a YouTube film, flipbook or map (w and h set its size; it's 16:9 unless h is given)
// "columns" lays the pictures out in two columns instead, each column listed top to bottom.
// "drift" lays them in one row that visitors drag sideways; it glides on when let go.
// "titleLink" makes the title a link; "link" adds a button under the title.
// "next" is the Next project button at the bottom of the page; Back always returns to the Portfolio page.
// hidden: true keeps a page off the Portfolio grid; it's still reached by Back and Next.
const PROJECTS = [
  { slug: 'background-paintings', tile: 'Background & Paintings', title: 'Background & Paintings',
    next: 'sketchbook',
    rows: [[1], [2], [3], [4], [5], [6], [7], [8], [{ img: 9, w: 562 }], [10, 11]] },
  { slug: 'sketchbook', tile: 'Sketchbook', title: 'Sketchbook',
    drift: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { slug: 'character-illustrations', tile: 'Character Illustrations', title: 'Character Illustration',
    columns: [[1, 2, 3], [4, 5, 6]] },
  { slug: 'tano-children-book', tile: "Tano - A Children's Storybook", title: "TANO - A CHILDREN'S STORYBOOK", sub: '( On Going Project )',
    titleLink: 'https://heyzine.com/flip-book/595a05a6fa.html', next: 'bakery-branding',
    rows: [[{ img: 1, w: 562 }], [2, 3], [4], [5, 6], [7, 8], [{ img: 9, w: 760 }]] },
  { slug: 'bakery-branding', tile: 'Terracotta - Bakery Rebranding', title: 'BAKERY REBRANDING - TERRACOTTA',
    link: { text: 'View Process Deck', href: 'https://heyzine.com/flip-book/45f9d2b047.html' }, next: 'cafe-culture-documentary',
    rows: [[{ img: 1, w: 760 }], [2], [{ img: 3, w: 760 }], [{ img: 4, w: 564 }], [{ img: 5, w: 760 }], [{ img: 6, w: 960 }], [{ img: 7, w: 957 }], [{ img: 8, w: 563 }]] },
  { slug: 'cafe-culture-documentary', tile: 'Tranquil - Cafe Culture Documentary', title: 'CAFE CULTURE DOCUMENTARY',
    next: 'bamboo-basketry',
    rows: [[1], [{ embed: 'https://www.youtube.com/embed/48wdswcOfM0' }], [2], [3], [4], [{ img: 5, w: 760 }]] },
  { slug: 'bamboo-basketry', hidden: true, tile: 'Bamboo Basketry', title: 'Bamboo Basketry - Craft Research Documentation',
    next: 'background-paintings',
    rows: [[{ img: 1, w: 562 }], [{ img: 2, w: 266 }, { embed: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d108082.35722324353!2d76.18373437692874!3d32.16180199162335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x391b458198590ddf%3A0xad8e3ff3dfe5b1fe!2sKangra%2C%20Himachal%20Pradesh%20176001!3m2!1d32.101476399999996!2d76.2731465!4m5!1s0x391b5c00e1a5bd9b%3A0x30cc00ca0aa2865c!2sShahpur%2C%20Himachal%20Pradesh!3m2!1d32.2197295!2d76.1728373!5e0!3m2!1sen!2sin', w: 661, h: 453 }], [3], [5], [6], [7],
      [{ embed: 'https://www.youtube.com/embed/l6XWFpuHgkg' }], [{ img: 8, w: 760 }], [9], [{ img: 10, w: 858 }],
      [{ embed: 'https://heyzine.com/flip-book/2cebd81ea4.html', h: 442 }]] },
];

// "Recommend me something interesting...": where visitors' notes are saved. Paste the web app address you get when you
// deploy recommendations.gs (see README.md, "Recommendations"). Until it's set, the note says it isn't connected yet.
const RECOMMENDATIONS_URL = 'https://script.google.com/macros/s/AKfycbz3Hye2M_S_VT1u3G5iZiW41pMEIhk8J--ZrW4mzlaKpC_Ck3uGyd56Gz21vbd0ExLOVg/exec';
