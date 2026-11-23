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

// The project pages, section by section, as on the Google Site.
// Each project's pictures go in images/<slug>/ : cover.webp (its tile on the Portfolio page), hero.webp or hero.mp4
// (the wide picture the page opens with), then 01, 02 ... (webp; animated ones are animated webp).
// "parts" lays the page out from top to bottom. Each part may say its background: bg: 'black' or 'clay' (white otherwise);
// parts in a row with the same background share one band. The page column is 1154 wide, like the Google Site.
//   { hero: 'hero.webp', h: 695 }            the opening picture (or hero.mp4, a looping film), full width, h tall
//   { title: '...', sub: '...' }              the project's name, and a line under it
//   { details: { 'Project Type': '...', ... }, link: { text, href }, heading: '...', about: ['...', '...'] }
//                                             the facts on the left (and a link under them), the write-up on the right
//   { row: [1] }                              picture 01 across the full width
//   { row: [{ img: 9, w: 562 }] }             picture 09, 562 wide, centred
//   { row: [10, 11] }                         pictures 10 and 11 side by side, half each
//   { row: [{ embed: 'https://...', w, h }] } a YouTube film, flipbook or map (16:9 unless h is given)
//   { link: { text, href } }                  a link on its own line, centred
//   { heading: '...' }                        a small heading, centred
//   { caption: '...' }                        a caption under the picture above
//   { note: ['...', '...'] }                  closing lines, centred
//   { feature: '...', text: '...' }           a green heading with a paragraph under it
//   { columns: [[1, 2], [3, 4]] }             two columns of pictures, each listed top to bottom
//   { drift: [1, 2, 3] }                      one row of pictures that visitors drag sideways
//   { case: 'terracotta' }                    a designed section, full width: cases/terracotta.css and .js fill it
// "software" lists the programs used, shown as small logos with the details (names as in images/software/<name>.svg).
// "next" is the Next project button at the bottom of the page; Back always returns to the Portfolio page.
// hidden: true keeps a page off the Portfolio grid; it's still reached by Back and Next.
const PROJECTS = [
  { slug: 'background-paintings', tile: 'Background & Paintings', next: 'sketchbook', parts: [
    { title: 'Background & Paintings' },
    { row: [1] }, { row: [2] }, { row: [3] }, { row: [4] }, { row: [5] }, { row: [6] }, { row: [7] }, { row: [8] },
    { row: [{ img: 9, w: 562 }] }, { row: [10, 11] },
  ] },
  { slug: 'sketchbook', tile: 'Sketchbook', parts: [
    { title: 'Sketchbook' },
    { drift: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  ] },
  { slug: 'character-illustrations', tile: 'Character Illustrations', parts: [
    { title: 'Character Illustration' },
    { columns: [[1, 2, 3], [4, 5, 6]], bg: 'black' },
  ] },
  { slug: 'tano-children-book', tile: "Tano - A Children's Storybook", next: 'bakery-branding', software: [], parts: [
    { hero: 'hero.webp', h: 695 },
    { title: "TANO - A CHILDREN'S STORYBOOK", sub: '( On Going Project )', bg: 'black' },
    { details: { 'Project Type': "Children's Book Design", Client: 'Academic Project', Duration: '2 weeks (Nov-Dec 2024)' },
      heading: 'What is Tano?',
      about: [
        'Tano is simply boiled white rice eaten with salt. A plain, humble staple meal of the Juanga tribe from the Gonasika hills of Odisha.',
        "The story is set in the same place and follows Mina-jhi, a beloved elder of the Juanga tribe, who gathers children under a Mahua tree and narrates the legend behind the Tano Feast - a celebration of simple, humble food. Through the story, children learn how a wasteful king was taught the true value of every grain by a young farmer's daughter.",
        'Tano uses folklore, vibrant illustration to invite young readers to appreciate food, reduce waste, and recognize the dignity of a simple meal.',
      ] },
    { row: [{ img: 1, w: 562 }] },
    { link: { text: 'Check out older version of Tano here', href: 'https://heyzine.com/flip-book/595a05a6fa.html' } },
    { heading: 'New Illustration Spreads', bg: 'black' },
    { row: [2, 3], bg: 'black' }, { row: [4], bg: 'black' }, { row: [5, 6], bg: 'black' }, { row: [7, 8], bg: 'black' },
    { row: [{ img: 9, w: 760 }], bg: 'black' },
    { caption: 'Process', bg: 'black' },
    { note: ['This project is currently in its refinement phase,', 'character designs and visual language are being further developed.', 'Thank you for viewing.'], bg: 'black' },
  ] },
  { slug: 'bakery-branding', tile: 'Terracotta - Bakery Rebranding', next: 'cafe-culture-documentary', software: [], parts: [
    { hero: 'hero.mp4', w: 900 },
    { title: 'BAKERY REBRANDING - TERRACOTTA', bg: 'black' },
    { details: { 'Project Type': 'Branding & Identity • Print & Packaging', Client: 'Terracotta - The Bake Studio', Duration: '4 weeks (Nov-Dec 2025)' },
      link: { text: 'View Process Deck', href: 'https://heyzine.com/flip-book/45f9d2b047.html' },
      about: [
        "This is a rebranding visual identity project for an artisanal bakery nestled in Rakkar, Dharamshala, Himachal Pradesh, a place rooted in slow-made food, clay-oven heritage, and no-shortcut cooking. The project began with identifying a clear gap: the existing identity failed to reflect the brand's warmth, craft, and authenticity. From a deep brand audit, user personas, and client research.",
        'We built a cohesive visual system from the ground up encompassing a redrawn logo, a curated typographic system pairing vintage serif with modern sans-serif, and a signature sketchy illustration style inspired by the organic imperfection of handcrafted pottery.',
        'Every design decision was guided by a single intention, to make the brand feel as honest and handmade as the food it serves.',
      ] },
    { case: 'terracotta' }, // the brand identity sections: cases/terracotta.css + .js
  ] },
  { slug: 'cafe-culture-documentary', tile: 'Tranquil - Cafe Culture Documentary', next: 'bamboo-basketry', software: [], parts: [
    { hero: 'hero.webp', h: 430 },
    { title: 'CAFE CULTURE DOCUMENTARY', bg: 'black' },
    { details: { 'Project Type': 'Documentary • Visual Research', Client: 'Academic Project', Duration: '2 weeks (Nov 2025)' },
      about: ['Tranquil is a visual documentary that cuts through the cafes of McLeodganj, capturing culture, character, and community in motion. Through architecture, people, food, and everyday moments, the project pieces together the living identity of these spaces and the Himalayan town they belong to. Rich in detail, honest in approach, unfiltered.'] },
    { row: [{ embed: 'https://www.youtube.com/embed/48wdswcOfM0', w: 957, h: 534 }], bg: 'black' },
    { row: [1], bg: 'black' }, { row: [2], bg: 'black' }, { row: [3], bg: 'black' }, { row: [4], bg: 'black' },
    { row: [{ img: 5, w: 760 }], bg: 'black' },
    { note: ['THANKS FOR VIEWING!'], bg: 'black' },
  ] },
  { slug: 'bamboo-basketry', hidden: true, tile: 'Bamboo Basketry', next: 'background-paintings', software: [], parts: [
    { hero: 'hero.mp4', h: 340 },
    { title: 'Bamboo Basketry | Craft Research Documentation', bg: 'black' },
    { details: { 'Project Type': 'Craft Research Documentation • Micro Branding • Documentary', Client: 'Academic Project', Duration: '4 weeks (June-July 2025)' },
      about: [
        'This project explores the art of bamboo basketry in the Kangra district of Himachal Pradesh. Using a qualitative methodology, semi-structured interviews and narrative analysis. The team spent 5 days observing artisans and understanding their emotional connection to their craft, offering an honest look at the stakeholders who impact bamboo basketry.',
        'The project delivered two key solutions: a documentary following two bamboo artisans from Shahpur, HP, capturing their life and livelihood, and a digital brand identity ("Tokaraan") to help the artisans shift from nameless products to a recognizable craft brand.',
      ] },
    { row: [{ img: 1, w: 562 }], bg: 'clay' },
    { row: [{ img: 2, w: 266 }, { embed: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d108082.35722324353!2d76.18373437692874!3d32.16180199162335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x391b458198590ddf%3A0xad8e3ff3dfe5b1fe!2sKangra%2C%20Himachal%20Pradesh%20176001!3m2!1d32.101476399999996!2d76.2731465!4m5!1s0x391b5c00e1a5bd9b%3A0x30cc00ca0aa2865c!2sShahpur%2C%20Himachal%20Pradesh!3m2!1d32.2197295!2d76.1728373!5e0!3m2!1sen!2sin', w: 661, h: 453 }], bg: 'clay' },
    { row: [3] },
    { row: [5], bg: 'clay' },
    { row: [6] },
    { row: [7], bg: 'clay' },
    { feature: 'SOLUTION 1 - DOCUMENTARY', text: "This film captures the story of two bamboo artisans hailing from Shahpur, Himachal Pradesh. The documentary goes beyond the bamboo basketry process to explore the human narrative of their lives and reveals the unpredictability of an artisan's livelihood. By showcasing both their family and craft-oriented life, from preparation to finished products, it makes visible the skill, patience, and cultural value embedded in each piece. This visibility can influence how customers perceive and value handmade work, helping to create a fairer market and stronger demand. By capturing the lived reality of the artisans, their work environment, their personal ambitions, and their adaptability; it becomes a resource for training, advocacy, and policy making.", bg: 'clay' },
    { row: [{ embed: 'https://www.youtube.com/embed/l6XWFpuHgkg' }], bg: 'black' },
    { feature: 'SOLUTION 2 - DIGITAL IDENTITY', text: "To create value, trust, and help them shift nameless products to recognizable craft. A logo is a suitable collateral, which will help them shape their distinct identity- symbolizing their skills, and the place where they come from. A stylised uppercase letter 'T' was taken from the name 'Tokaraan' and helped form the skeleton of the overall logo.", bg: 'clay' },
    { row: [{ img: 8, w: 760 }], bg: 'clay' }, { row: [9], bg: 'clay' }, { row: [{ img: 10, w: 858 }], bg: 'clay' },
    { feature: 'A REMINDER THAT BEHIND EVERY CRAFT IS A FAMILY.', center: true, bg: 'clay' },
    { row: [{ embed: 'https://heyzine.com/flip-book/2cebd81ea4.html', h: 442 }], bg: 'clay' },
    { feature: 'THANKS FOR VIEWING!', center: true, bg: 'clay' },
  ] },
];

// "Recommend me something interesting...": where visitors' notes are saved. Paste the web app address you get when you
// deploy recommendations.gs (see README.md, "Recommendations"). Until it's set, the note says it isn't connected yet.
const RECOMMENDATIONS_URL = 'https://script.google.com/macros/s/AKfycbz3Hye2M_S_VT1u3G5iZiW41pMEIhk8J--ZrW4mzlaKpC_Ck3uGyd56Gz21vbd0ExLOVg/exec';
