// Optimització d'imatges (executar quan s'afegeixin fotos grans):  node scripts/images-optimize.mjs
//  1. Genera variants -800/-1200 (WebP q80) de les fotos de ≥1600 px que es fan servir en <img>,
//     i posa src (1200) + srcset + sizes a l'etiqueta.
//  2. Converteix RAQ_7644.jpg (448 KB) a WebP.
//  3. Afegeix width/height intrínsecs a totes les <img> que no en tenen (evita CLS).
//  4. Genera imatges Open Graph en JPG 1200×630 (≤200 KB) per a la home i les pàgines amb ogImage propi.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const pages = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : e.name.endsWith('.astro') && pages.push(p); } })(path.join(ROOT, 'src'));

const meta = new Map();
async function dims(src) { if (!meta.has(src)) { const p = path.join(ROOT, 'public', src); meta.set(src, fs.existsSync(p) ? await sharp(p).metadata() : null); } return meta.get(src); }

// 1+2. Variants per a fotos grans
const BIG = 1600; const WIDTHS = [800, 1200];
const variants = new Map(); // src → { w1200: '/assets/x-1200.webp', srcset: '...' }
const srcs = new Set();
for (const f of pages) for (const m of fs.readFileSync(f, 'utf8').matchAll(/<img\b[^>]*\bsrc="(\/assets\/[^"]+)"/g)) srcs.add(m[1]);
for (const src of srcs) {
  const m = await dims(src); if (!m) { console.log('  ⚠ no existeix', src); continue; }
  const abs = path.join(ROOT, 'public', src);
  if (/\.jpe?g$/i.test(src) && fs.statSync(abs).size > 150e3) {
    // JPG pesat → WebP
    const out = src.replace(/\.jpe?g$/i, '.webp');
    if (!fs.existsSync(path.join(ROOT, 'public', out))) await sharp(abs).webp({ quality: 82 }).toFile(path.join(ROOT, 'public', out));
    variants.set(src, { replace: out, w: m.width, h: m.height });
    console.log('  jpg→webp', src, '→', out, Math.round(fs.statSync(path.join(ROOT, 'public', out)).size / 1024) + 'KB');
    continue;
  }
  if (m.width >= BIG) {
    const base = src.replace(/\.webp$/, ''); const set = [];
    for (const w of WIDTHS) {
      const out = `${base}-${w}.webp`; const outAbs = path.join(ROOT, 'public', out);
      if (!fs.existsSync(outAbs)) await sharp(abs).resize({ width: w }).webp({ quality: 80 }).toFile(outAbs);
      set.push(`${out} ${w}w`);
    }
    set.push(`${src} ${m.width}w`);
    const h1200 = Math.round(m.height * 1200 / m.width);
    variants.set(src, { replace: `${base}-1200.webp`, srcset: set.join(', '), w: 1200, h: h1200 });
    console.log('  variants', src, m.width + 'x' + m.height, '→ 800/1200 +', Math.round(fs.statSync(abs).size / 1024) + 'KB original');
  }
}

// 3. Reescriu les <img> a les pàgines
let tagsFixed = 0, tagsSrcset = 0;
for (const f of pages) {
  let raw = fs.readFileSync(f, 'utf8'); const crlf = raw.includes('\r\n'); let s = crlf ? raw.replace(/\r\n/g, '\n') : raw; const before = s;
  const tags = [...s.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  for (const tag of tags) {
    const src = (tag.match(/\bsrc="(\/assets\/[^"]+)"/) || [])[1]; if (!src) continue;
    let t = tag; const v = variants.get(src); let w, h;
    if (v) {
      t = t.replace(`src="${src}"`, `src="${v.replace}"`);
      if (v.srcset && !/\bsrcset=/.test(t)) { t = t.replace(/<img\b/, `<img srcset="${v.srcset}" sizes="(min-width: 1100px) 50vw, (min-width: 700px) 60vw, 100vw"`); tagsSrcset++; }
      w = v.w; h = v.h;
    } else { const m = await dims(src); if (!m) continue; w = m.width; h = m.height; }
    if (!/\bwidth=/.test(t)) t = t.replace(/\s*\/?>$/, (e) => ` width="${w}" height="${h}"${e}`);
    if (t !== tag) { s = s.replace(tag, t); tagsFixed++; }
  }
  if (s !== before) fs.writeFileSync(f, crlf ? s.replace(/\n/g, '\r\n') : s, 'utf8');
}
console.log(`<img> actualitzades: ${tagsFixed} (amb srcset: ${tagsSrcset})`);

// 4. Open Graph JPG 1200×630
const OG = [['hero-still.webp', 'og-default.jpg'], ['opositors-hero.webp', 'og-opositors.jpg'], ['recovery-sauna.webp', 'og-recovery.jpg'], ['detail-dumbbells.webp', 'og-partners.jpg']];
fs.mkdirSync(path.join(ROOT, 'public/assets/og'), { recursive: true });
for (const [from, to] of OG) {
  const out = path.join(ROOT, 'public/assets/og', to);
  let q = 82, size = Infinity;
  while (q >= 60) { await sharp(path.join(ROOT, 'public/assets', from)).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: q, mozjpeg: true }).toFile(out); size = fs.statSync(out).size; if (size <= 200e3) break; q -= 6; }
  console.log('  og', to, Math.round(size / 1024) + 'KB', 'q' + q);
}
