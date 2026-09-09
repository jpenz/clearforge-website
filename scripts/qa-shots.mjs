// Capture QA screenshots at the three review widths for a set of routes.
// Usage: node scripts/qa-shots.mjs <baseUrl> <outDir> [route,route,...] [widths]
// Example: node scripts/qa-shots.mjs http://localhost:3008 /tmp/shots /,/services 1920,1440,390
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const [baseUrl = 'http://localhost:3008', outDir = './qa-shots', routesArg, widthsArg] =
  process.argv.slice(2);
const routes = (routesArg ?? '/,/services,/private-equity,/proof,/about').split(',');
const widths = (widthsArg ?? '1920,1440,390').split(',').map(Number);
const heights = { 1920: 1080, 1440: 900, 390: 844 };

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const report = [];

for (const width of widths) {
  const ctx = await browser.newContext({
    viewport: { width, height: heights[width] ?? 900 },
    deviceScaleFactor: 1,
  });
  for (const route of routes) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(baseUrl + route, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1200);
    const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
    await page.screenshot({ path: `${outDir}/${slug}-${width}-fold.png` });
    await page.screenshot({ path: `${outDir}/${slug}-${width}-full.png`, fullPage: true });
    const metrics = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const imgs = [...document.images].map((i) => ({ src: i.currentSrc, w: i.naturalWidth }));
      return {
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
        scrollHeight: document.documentElement.scrollHeight,
        h1px: h1 ? parseFloat(getComputedStyle(h1).fontSize) : null,
        h1Left: h1 ? Math.round(h1.getBoundingClientRect().left) : null,
        images: imgs.length,
      };
    });
    report.push({ route, width, ...metrics, consoleErrors: errors });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(report, null, 2));
