// Google Apps Script for the "Recommend me something interesting..." note on the portfolio.
// It keeps every note in a sheet called "Recommendations" (made on first use) in the spreadsheet this script belongs to.
// To hide a note from the site, type anything in its "hidden" column. Setup steps: README.md, "Recommendations".

const SHEET = 'Recommendations';
const KINDS = ['song', 'film', 'rabbit hole'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SHEET);
  if (!s) { s = ss.insertSheet(SHEET); s.appendRow(['time', 'recommendation', 'type', 'recommended by', 'hidden']); s.setFrozenRows(1); }
  return s;
}
const json_ = (data) => ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
// text that starts like a formula is stored as plain text
const plain_ = (v, max) => { const t = String(v || '').trim().slice(0, max); return /^[=+\-@]/.test(t) ? "'" + t : t; };

// the site reads the notes (oldest first; hidden ones left out)
function doGet() {
  const rows = sheet_().getDataRange().getValues().slice(1).filter((r) => r[1] && !r[4]);
  return json_(rows.map((r) => ({ time: r[0], text: String(r[1]), type: String(r[2]), by: String(r[3]) })));
}

// the site sends one note: { text, type, by }
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const text = plain_(d.text, 500);
  if (!text) return json_({ ok: false, error: 'empty' });
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try { sheet_().appendRow([new Date(), text, KINDS.includes(d.type) ? d.type : '', plain_(d.by, 60), '']); }
  finally { lock.releaseLock(); }
  return json_({ ok: true });
}
