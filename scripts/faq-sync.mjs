// Sincronitza el JSON-LD FAQPage amb les FAQ visibles (<div class="faq"> ... <details><summary>Q</summary><p>A</p></details>)
// de totes les pàgines de src/pages (CA, ES, EN).
//
//   node scripts/faq-sync.mjs            → comprova (surt amb codi 1 si hi ha desajustos)
//   node scripts/faq-sync.mjs --write    → reescriu el mainEntity del FAQPage amb les FAQ visibles
//   node scripts/faq-sync.mjs --dist     → comprova el dist/ (HTML final) en lloc de src/
//
// Regla Google: el contingut marcat com a FAQPage ha de ser visible a la pàgina i coincidir-hi.
import fs from 'node:fs';
import path from 'node:path';

const WRITE = process.argv.includes('--write');
const DIST = process.argv.includes('--dist');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (DIST ? e.name === 'index.html' : e.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ' };
function text(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (m) => ENT[m])
    .replace(/\s+/g, ' ')
    .trim();
}

function visibleFaq(src) {
  const start = src.search(/<div class="faq[\s">]/);
  if (start < 0) return null;
  const end = src.indexOf('</section>', start);
  const block = src.slice(start, end < 0 ? undefined : end);
  const items = [];
  for (const m of block.matchAll(/<details(?:\s[^>]*)?>\s*<summary(?:\s[^>]*)?>([\s\S]*?)<\/summary>\s*<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)) {
    items.push({ q: text(m[1]), a: text(m[2]) });
  }
  return items;
}

const FAQ_RE = /("@type":\s*"FAQPage",\s*"mainEntity":\s*\[)([\s\S]*?)(\n\s*\]\s*\n\s*\}\s*\n?\s*<\/script>)/;

function jsonFaq(src) {
  const m = src.match(FAQ_RE);
  if (!m) return null;
  const items = [];
  for (const q of m[2].matchAll(/"name":\s*"((?:[^"\\]|\\.)*)"[\s\S]*?"text":\s*"((?:[^"\\]|\\.)*)"/g)) {
    items.push({ q: JSON.parse('"' + q[1] + '"'), a: JSON.parse('"' + q[2] + '"') });
  }
  return items;
}

const root = DIST ? 'dist' : path.join('src', 'pages');
let problems = 0, written = 0, checked = 0;
for (const file of walk(root)) {
  const raw = fs.readFileSync(file, 'utf8');
  const crlf = raw.includes('\r\n');
  const src = crlf ? raw.replace(/\r\n/g, '\n') : raw;
  const json = jsonFaq(src);
  const vis = visibleFaq(src);
  if (!json && !vis) continue;
  checked++;
  const rel = path.relative('.', file);
  if (json && !vis) { console.log(`✗ ${rel}: FAQPage al JSON-LD però cap <div class="faq"> visible`); problems++; continue; }
  if (!json && vis) { console.log(`· ${rel}: ${vis.length} FAQ visibles sense FAQPage (ok, no marcat)`); continue; }
  const same = json.length === vis.length && json.every((j, i) => j.q === vis[i].q && j.a === vis[i].a);
  if (same) { console.log(`✓ ${rel}: ${vis.length} FAQ iguals`); continue; }
  if (!WRITE || DIST) {
    problems++;
    console.log(`✗ ${rel}: JSON ${json.length} vs visibles ${vis.length}`);
    const jq = new Set(json.map((x) => x.q)), vq = new Set(vis.map((x) => x.q));
    for (const x of json) if (!vq.has(x.q)) console.log(`     només al JSON : ${x.q}`);
    for (const x of vis) if (!jq.has(x.q)) console.log(`     només visible : ${x.q}`);
    for (const x of vis) { const j = json.find((y) => y.q === x.q); if (j && j.a !== x.a) console.log(`     resposta difereix: ${x.q}`); }
    continue;
  }
  const entries = vis.map((x) => `        {"@type": "Question", "name": ${JSON.stringify(x.q)}, "acceptedAnswer": {"@type": "Answer", "text": ${JSON.stringify(x.a)}}}`).join(',\n');
  const out = src.replace(FAQ_RE, (_, a, __, c) => `${a}\n${entries}${c}`);
  fs.writeFileSync(file, crlf ? out.replace(/\n/g, '\r\n') : out, 'utf8');
  written++;
  console.log(`✎ ${rel}: JSON-LD reescrit amb ${vis.length} FAQ visibles (abans ${json.length})`);
}
console.log(`\n${checked} pàgines amb FAQ · ${written} reescrites · ${problems} desajustos`);
process.exit(problems && !WRITE ? 1 : 0);
