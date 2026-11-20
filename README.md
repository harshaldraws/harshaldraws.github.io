# harshaldraws

Portfolio of Harshal Tholambia. Plain HTML, CSS and JS: no build step.

## Preview

Double-click `index.html`, or run a local server in this folder.

## Pages

Laid out like the Google Site it replaces:

- `index.html` (Welcome!): the cutting mat, About, View Projects, Core Skills & Toolkit
- `portfolio.html`: the project tiles
- `project.html?p=<slug>`: one project's page

The header, footer and project pages are drawn by `site.js` from `PROJECTS` in `content.js`.
To add or change a project, edit `PROJECTS` there (how is explained above it) and put its pictures in
`images/<slug>/`: `cover.webp` for its tile, then `01.webp`, `02.webp` ... (animated pictures are animated webp).
The About and Core Skills boxes are `embeds/about.html` and `embeds/skills.html`.

## What else to fill in

| What | Where |
| --- | --- |
| Handwritten "draws." | `HAND` in `content.js`. To use your own hand, save a black-on-white drawing as `images/hand/hero.png` |
| Cut-outs on the cutting mat | `CUTOUTS` in `content.js`. Save each as `images/cutouts/01.png`, `02.png` ... with a transparent background |
| Colours and fonts | `site.css` for the pages, `style.css` for the cutting mat |

## The hero

The grid is 24 squares across (8 on a phone) and the heading sits on its lines; the sizes are at the top of the hero section in `style.css`.
The Lights switch turns the room dark and the desk lamp on; the lamp starts on when the visitor's device is in dark mode.

## Recommendations

Visitors tap the sticky note, write a recommendation, say who it's from and press send. Every note is saved in a
Google Sheet of yours and shows up in "see what others recommended" straight away.

One-time setup (about 5 minutes):

1. Make a new Google Sheet (sheets.new), named anything.
2. In the sheet: Extensions > Apps Script. Delete what's there, paste in all of `recommendations.gs`, and save.
3. Deploy > New deployment > type: Web app. Execute as: Me. Who has access: Anyone. Deploy, and allow access when asked.
4. Copy the Web app URL (it ends in `/exec`) and paste it into `RECOMMENDATIONS_URL` in `content.js`.

The notes appear in a "Recommendations" tab of the sheet. To hide one from the site, type anything in its `hidden` column;
to remove it for good, delete the row. If you change the script later, use Deploy > Manage deployments > Edit > New version,
so the URL stays the same.
