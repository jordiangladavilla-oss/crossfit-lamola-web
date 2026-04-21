import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', title: 'CrossFit La Mola · Box a Terrassa' },
  { path: '/classes', title: 'Classes' },
  { path: '/horari', title: 'Horari' },
  { path: '/tarifes', title: 'Tarifes' },
  { path: '/el-box', title: 'El box' },
  { path: '/agenda', title: 'Agenda' },
  { path: '/contacte', title: 'Contacte' },
];

for (const page of pages) {
  test(`${page.path} - carrega correctament`, async ({ page: p }) => {
    const response = await p.goto(page.path);
    expect(response?.status()).toBe(200);
    await expect(p).toHaveTitle(new RegExp(page.title, 'i'));
  });

  test(`${page.path} - nav funciona`, async ({ page: p }) => {
    await p.goto(page.path);
    await expect(p.locator('nav.nav')).toBeVisible();
    await expect(p.locator('nav .mark img')).toBeVisible();
  });

  test(`${page.path} - footer present`, async ({ page: p }) => {
    await p.goto(page.path);
    await expect(p.locator('footer')).toBeVisible();
  });
}

test('Home - hero carrega', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero')).toBeVisible();
  await expect(page.locator('.hero-logo')).toBeVisible();
});

test('Home - seccions principals', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#manifest')).toBeVisible();
  await expect(page.locator('#disciplines')).toBeVisible();
  await expect(page.locator('#coaches')).toBeVisible();
  await expect(page.locator('#faq')).toBeVisible();
});

test('Home - formulari contacte', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#contact form')).toBeVisible();
  await expect(page.locator('#contact input[name="name"]')).toBeVisible();
  await expect(page.locator('#contact input[name="email"]')).toBeVisible();
});

test('Contacte - formulari Formspree', async ({ page }) => {
  await page.goto('/contacte');
  const form = page.locator('form[action*="formspree"]');
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('action', 'https://formspree.io/f/xlgonajg');
  await expect(form).toHaveAttribute('method', 'POST');
});

test('Nav - links funcionen', async ({ page }) => {
  await page.goto('/');

  await page.click('nav ul a[href="/classes"]');
  await expect(page).toHaveURL(/\/classes/);

  await page.click('nav ul a[href="/tarifes"]');
  await expect(page).toHaveURL(/\/tarifes/);
});

test('CTA - links a contacte', async ({ page }) => {
  await page.goto('/');
  const cta = page.locator('.hero-cta');
  await expect(cta).toHaveAttribute('href', '/contacte');
});

test('Responsive - menu mobile apareix', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.locator('.nav-toggle')).toBeVisible();
});

test('Visual - screenshot home', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('home.png', { fullPage: true, maxDiffPixelRatio: 0.1 });
});
