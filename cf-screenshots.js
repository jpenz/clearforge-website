const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'http://localhost:3001';
const OUT = '/tmp/cf-shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  '/services/ai-revenue-operations',
  '/services/performance-improvement',
  '/services/pe-value-creation',
  '/services/custom-ai-agents',
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const path of PAGES) {
    const url = BASE + path;
    const name = (path.replace(/\//g, '_') || '_home').slice(1);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(800);
      // Scroll to fire animations
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          const total = document.documentElement.scrollHeight;
          let y = 0;
          const step = () => {
            y += 400;
            window.scrollTo({ top: y, behavior: 'auto' });
            if (y < total + 200) {
              setTimeout(step, 100);
            } else {
              window.scrollTo({ top: 0, behavior: 'auto' });
              setTimeout(resolve, 400);
            }
          };
          step();
        });
      });
      await page.waitForTimeout(600);
      await page.screenshot({
        path: `${OUT}/${name}-v815.jpg`,
        fullPage: true,
        type: 'jpeg',
        quality: 72,
      });
      console.log(`  ${name} done`);
    } catch (e) {
      console.log(`  FAIL ${name}: ${e.message.slice(0, 80)}`);
    }
  }
  await browser.close();
})();
