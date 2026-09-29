// Prova dels 3 formularis contra el preview local: èxit real (honeypot ple → l'Apps Script descarta
// sense email però respon success:true) i error simulat (endpoint respon 500).
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://127.0.0.1:4321';
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwHm_4Rwt_x9RN5q1PEKxTzXj587hgKYp70WqyNA9DpbETdy-dcUPt2n3YtaZ7KFJinww/exec';
const FORMS = [
  { url: '/contacte', form: '#contact-form', submit: '#contact-submit', msg: '#contact-msg', fill: { name: 'Prova', phone: '600000000', email: 'prova@example.com' } },
  { url: '/', form: '#home-form', submit: '#home-submit', msg: '#home-msg', fill: { name: 'Prova', phone: '600000000', email: 'prova@example.com' } },
  { url: '/opositors', form: '#opo-form', submit: '#opo-submit', msg: '#opo-msg', fill: { name: 'Prova', phone: '600000000' } },
];
const browser = await chromium.launch();
let fails = 0;
for (const mode of ['ok', 'reject', 'fail']) {
  for (const f of FORMS) {
    const page = await browser.newPage();
    await page.addInitScript(() => { window.__ga = []; window.gtag = (...a) => window.__ga.push(a); });
    if (mode === 'fail') await page.route(ENDPOINT, (r) => r.fulfill({ status: 500, body: 'boom' }));
    if (mode === 'reject') await page.route(ENDPOINT, (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: '{"success":false,"error":"missing_fields"}' }));
    if (mode === 'ok') await new Promise((r) => setTimeout(r, 4000)); // evita el límit de ràfega de Google
    await page.goto(BASE + f.url, { waitUntil: 'domcontentloaded' });
    for (const [k, v] of Object.entries(f.fill)) { const el = page.locator(`${f.form} [name="${k}"]`); if (await el.count()) await el.fill(v); }
    await page.locator(`${f.form} [name="website"]`).fill('bot'); // honeypot → mai email
    await page.click(f.submit);
    await page.waitForFunction((sel) => { const m = document.querySelector(sel); return m && m.style.display === 'block'; }, f.msg, { timeout: 20000 });
    const txt = (await page.locator(f.msg).innerText()).trim();
    const ga = await page.evaluate(() => window.__ga.filter((a) => a[1] === 'generate_lead').length);
    const btn = await page.locator(f.submit).isDisabled();
    const isErr = /Error|wrong/i.test(txt);
    const pass = mode === 'ok' ? (!isErr && ga === 1 && !btn) : (isErr && ga === 0 && !btn);
    if (!pass) fails++;
    console.log(`${pass ? '✓' : '✗'} ${mode.padEnd(4)} ${f.url.padEnd(11)} msg="${txt.slice(0, 40)}" generate_lead=${ga} btnDisabled=${btn}`);
    await page.close();
  }
}
await browser.close();
console.log(fails ? `\n${fails} PROVES FALLIDES` : '\nTOTES LES PROVES OK');
process.exit(fails ? 1 : 0);
