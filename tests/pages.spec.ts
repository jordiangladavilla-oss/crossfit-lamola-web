import { test, expect } from '@playwright/test';
import fs from 'node:fs';

// Totes les URL indexables surten del sitemap: si s'afegeix una pàgina, queda coberta sola.
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>https:\/\/crossfitlamola\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1]);

test('el sitemap té les 39 URL esperades', () => {
  expect(urls.length).toBeGreaterThanOrEqual(39);
});

for (const path of urls) {
  test(`${path} · 200, un sol h1, id="main", canonical sense barra, sense enllaços amb barra final`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#main')).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();
    if (path !== '/') expect(canonical!.endsWith('/')).toBeFalsy();
    // Regla crítica del projecte (trailingSlash: never): cap enllaç intern amb barra final
    const badLinks = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')!).filter((h) => h.length > 1 && /\/(#.*)?$/.test(h.split('?')[0]) && !h.startsWith('/_')));
    expect(badLinks, `enllaços amb barra final: ${badLinks.join(', ')}`).toEqual([]);
    // hreflang recíproc ×3 + x-default
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
    await expect(page.locator('nav.nav')).toBeVisible();
    await expect(page.locator('footer')).toBeAttached();
  });
}

test('títols de les tres homes', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/CrossFit La Mola \| Box i Entrenament Funcional a Terrassa/);
  await page.goto('/es');
  await expect(page).toHaveTitle(/CrossFit La Mola \| Box y Entrenamiento Funcional en Terrassa/);
  await page.goto('/en');
  await expect(page).toHaveTitle(/CrossFit La Mola \| Functional Training Box in Terrassa/);
});

test('la home enllaça cada disciplina a la seva àncora de /classes i el bloc de serveis existeix', async ({ page }) => {
  await page.goto('/');
  for (const id of ['wod', 'weightlifting', 'hybrid', 'bodyweight', 'strength', 'abs-cals', 'the-program', 'running']) {
    await expect(page.locator(`a.disc-card[href="/classes#${id}"]`)).toHaveCount(1);
  }
  await expect(page.locator('#serveis a[href="/recovery"]')).toHaveCount(1);
  await expect(page.locator('#serveis a[href="/opositors"]')).toHaveCount(1);
  await expect(page.locator('#serveis a[href="/classes#entrenament-funcional"]')).toHaveCount(1);
  await page.goto('/classes');
  for (const id of ['wod', 'running', 'entrenament-funcional']) await expect(page.locator(`#${id}`)).toHaveCount(1);
});

for (const [path, form] of [['/', '#home-form'], ['/contacte', '#contact-form'], ['/opositors', '#opo-form']] as const) {
  test(`formulari de leads a ${path}: camps, honeypot i nota RGPD`, async ({ page }) => {
    await page.goto(path);
    const f = page.locator(form);
    await expect(f).toBeAttached();
    await expect(f.locator('input[name="name"]')).toBeAttached();
    await expect(f.locator('input[name="phone"]')).toBeAttached();
    await expect(f.locator('input[name="website"]')).toBeAttached(); // honeypot
    await expect(f.locator('button[type="submit"]')).toBeAttached();
    await expect(page.locator('.privacy-note')).toContainText('TERRAWOD FITNESS');
  });
}

test('el formulari mostra error si el servidor rebutja (no un "Gràcies" fals)', async ({ page }) => {
  await page.route(/script\.google\.com\/macros/, (r) => r.fulfill({ status: 500, body: 'boom', headers: { 'Access-Control-Allow-Origin': '*' } }));
  await page.goto('/contacte');
  await page.fill('#contact-form [name="name"]', 'Test');
  await page.fill('#contact-form [name="phone"]', '600000000');
  await page.fill('#contact-form [name="email"]', 'test@example.com');
  await page.click('#contact-submit');
  await expect(page.locator('#contact-msg')).toContainText(/Error/, { timeout: 15_000 });
});

test('la graella d\'horari és al HTML (sense JavaScript)', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/horari');
  await expect(page.locator('.day')).toHaveCount(7);
  expect(await page.locator('.slot').count()).toBeGreaterThan(50);
  await ctx.close();
});

test('la 404 respon 404 amb la pàgina pròpia', async ({ page }) => {
  const res = await page.goto('/aquesta-pagina-no-existeix');
  expect(res?.status()).toBe(404);
  await expect(page).toHaveTitle(/no trobada/);
  await expect(page.locator('#main a[href="/contacte"]')).toHaveCount(1);
});

test('JSON-LD vàlid i FAQPage igual a les FAQ visibles', async ({ page }) => {
  for (const path of ['/', '/classes', '/tarifes', '/opositors', '/recovery']) {
    await page.goto(path);
    const blocks = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => x.textContent || ''));
    const faqs: string[] = [];
    for (const b of blocks) { const o = JSON.parse(b); if (o['@type'] === 'FAQPage') faqs.push(...o.mainEntity.map((q: { name: string }) => q.name)); }
    const visible = await page.$$eval('.faq details summary', (s) => s.map((x) => (x.textContent || '').trim()));
    expect(faqs.sort()).toEqual(visible.sort());
  }
});

test('menú mòbil', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.locator('.nav-toggle')).toBeVisible();
});

test('llms*.txt coherents amb src/data/site.ts (telèfon, email, adreça, horari)', async () => {
  const { SITE } = await import('../src/data/site');
  for (const f of ['public/llms.txt', 'public/llms-es.txt', 'public/llms-en.txt']) {
    const txt = fs.readFileSync(f, 'utf8');
    expect(txt, `${f}: telèfon`).toContain(SITE.phone);
    expect(txt, `${f}: email`).toContain(SITE.email);
    expect(txt, `${f}: adreça`).toContain(SITE.address.streetLong);
    for (const r of SITE.hours) expect(txt, `${f}: horari ${r.opens}–${r.closes}`).toContain(`${r.opens}–${r.closes}`);
  }
});

test('la tira d\'horari de la home i el JSON-LD surten de site.ts', async ({ page }) => {
  const { hoursStrip, SITE } = await import('../src/data/site');
  await page.goto('/');
  await expect(page.locator('.status-strip span').nth(1)).toHaveText(hoursStrip('ca'));
  const ld = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent || '{}')));
  const org = ld.find((o) => o['@id'] === 'https://crossfitlamola.com/#organization');
  expect(org.email).toBe(SITE.email);
  expect(org.telephone).toBe(SITE.phoneIntl);
  expect(org.openingHoursSpecification).toHaveLength(SITE.hours.length);
});
