import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await context.newPage();

await page.goto('https://crossfitlamola.com/el-box', { waitUntil: 'networkidle' });

// Force-trigger reveal animations
await page.evaluate(async () => {
  await new Promise(resolve => {
    let y = 0;
    const interval = setInterval(() => {
      window.scrollBy(0, 400);
      y += 400;
      if (y >= document.body.scrollHeight) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
});
await page.waitForTimeout(800);

// Find the coaches section: the reveal-stagger inside .sec.ink
const coachSection = await page.evaluateHandle(() => {
  const stags = document.querySelectorAll('.reveal-stagger');
  for (const s of stags) {
    if (s.textContent.includes('Sergi') && s.textContent.includes('Juse') && s.textContent.includes('Eli')) {
      return s;
    }
  }
  return null;
});

if (coachSection) {
  await coachSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await coachSection.screenshot({ path: '.playwright-screenshots/coaches.png' });
  console.log('Coaches section screenshot saved');

  // Get computed positions of each h3 (Sergi/Juse/Eli) and the descriptions
  const positions = await page.evaluate(() => {
    const stags = document.querySelectorAll('.reveal-stagger');
    let target;
    for (const s of stags) {
      if (s.textContent.includes('Sergi') && s.textContent.includes('Juse')) target = s;
    }
    const articles = target.querySelectorAll('article');
    return Array.from(articles).map(a => {
      const h3 = a.querySelector('h3');
      const p = a.querySelector('p');
      return {
        name: h3?.textContent,
        h3Top: h3?.getBoundingClientRect().top,
        pTop: p?.getBoundingClientRect().top,
        articleTop: a.getBoundingClientRect().top,
      };
    });
  });
  console.log('Positions:');
  positions.forEach(p => console.log(JSON.stringify(p)));
}

await browser.close();
