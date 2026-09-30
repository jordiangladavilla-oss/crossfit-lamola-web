// Posa a public/sitemap.xml el <lastmod> real de cada URL: data de l'últim commit del .astro de la
// pàgina (i de les dades que la nodreixen). Executar abans de fer commit quan canviïn pàgines:
//   npm run sitemap
// No s'executa al build de Vercel (clon superficial: git log no és fiable allà).
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const DEPS = { horari: ['src/data/schedule.ts'], tarifes: ['src/data/pricing.ts'], agenda: ['src/data/agenda.ts'] };
const git = (f) => { try { return execSync(`git log -1 --format=%cs -- "${f}"`, { encoding: 'utf8' }).trim(); } catch { return ''; } };

let xml = fs.readFileSync('public/sitemap.xml', 'utf8');
const crlf = xml.includes('\r\n'); if (crlf) xml = xml.replace(/\r\n/g, '\n');
let changed = 0, total = 0;
xml = xml.replace(/<url>\n\s*<loc>https:\/\/crossfitlamola\.com\/([^<]*)<\/loc>([\s\S]*?)<lastmod>([^<]*)<\/lastmod>/g, (m, path, mid, old) => {
  total++;
  const parts = path.replace(/\/$/, '').split('/').filter(Boolean);
  const lang = ['es', 'en'].includes(parts[0]) ? parts.shift() : '';
  const page = parts[0] || 'index';
  const files = [`src/pages/${lang ? lang + '/' : ''}${page}.astro`, ...(DEPS[page] || [])];
  const dates = files.map(git).filter(Boolean);
  if (!dates.length) { console.log('  sense data git:', path || '/'); return m; }
  const d = dates.sort().at(-1);
  if (d !== old) { changed++; console.log(`  ${(path || '/').padEnd(18)} ${old} → ${d}`); }
  return m.replace(`<lastmod>${old}</lastmod>`, `<lastmod>${d}</lastmod>`);
});
fs.writeFileSync('public/sitemap.xml', crlf ? xml.replace(/\n/g, '\r\n') : xml, 'utf8');
console.log(`sitemap: ${total} URL · ${changed} lastmod actualitzats`);
