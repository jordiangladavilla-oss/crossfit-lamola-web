// Genera public/llms-full.txt (convenció llmstxt.org) concatenant els tres fitxers per idioma.
// Executar després d'editar qualsevol llms*.txt:  npm run llms
import fs from 'node:fs';
const parts = [['llms.txt', 'CATALÀ'], ['llms-es.txt', 'ESPAÑOL'], ['llms-en.txt', 'ENGLISH']]
  .map(([f, l]) => `# ===== ${l} · https://crossfitlamola.com/${f} =====\n\n${fs.readFileSync('public/' + f, 'utf8').trim()}\n`);
const head = `# CrossFit La Mola — llms-full.txt (CA · ES · EN)\n# Terrassa, Barcelona · https://crossfitlamola.com · Generat ${new Date().toISOString().slice(0, 10)}\n\n`;
fs.writeFileSync('public/llms-full.txt', head + parts.join('\n'), 'utf8');
console.log('llms-full.txt:', fs.statSync('public/llms-full.txt').size, 'bytes');
