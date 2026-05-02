#!/usr/bin/env node

import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

const budgets = [
  { file: 'public/videos/hero.mp4', maxKb: 900 },
  { file: 'public/videos/hero.webm', maxKb: 900, optional: true },
  { file: 'public/images/hero-bg.webp', maxKb: 180 },
];

const useCaseSlugs = [
  'ai-sales-pipeline-acceleration',
  'ai-customer-service-excellence',
  'ai-operations-efficiency-machine',
  'ai-knowledge-work-automation',
  'ai-quality-control-exception-management',
  'pe-portfolio-ai-value-creation',
];

for (const slug of useCaseSlugs) {
  budgets.push(
    { file: `public/videos/use-cases/${slug}.mp4`, maxKb: 1200 },
    { file: `public/videos/use-cases/${slug}.webm`, maxKb: 1200, optional: true },
    { file: `public/images/use-cases/${slug}.webp`, maxKb: 180 },
  );
}

let failed = false;

for (const budget of budgets) {
  const absolutePath = path.join(process.cwd(), budget.file);

  if (!existsSync(absolutePath)) {
    if (!budget.optional) {
      console.error(`Missing required media asset: ${budget.file}`);
      failed = true;
    }
    continue;
  }

  const sizeKb = statSync(absolutePath).size / 1024;
  const label = `${budget.file}: ${sizeKb.toFixed(1)}KB / ${budget.maxKb}KB`;

  if (sizeKb > budget.maxKb) {
    console.error(`Media budget exceeded: ${label}`);
    failed = true;
  } else {
    console.log(`Media budget ok: ${label}`);
  }
}

if (failed) {
  process.exitCode = 1;
}
