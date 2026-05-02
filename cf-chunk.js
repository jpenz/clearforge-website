// Splits tall audit screenshots into Claude-readable chunks (max ~2200px tall each).
// Reads from /tmp/cf-audit, writes to /tmp/cf-audit-chunks.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IN = '/tmp/cf-audit';
const OUT = '/tmp/cf-audit-chunks';
const MAX_H = 2200; // keep well under any 8k dimension cap
const MAX_W_DESKTOP = 1200; // downscale desktop 1460 → 1200 to reduce file size

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const files = fs.readdirSync(IN).filter((f) => f.endsWith('.jpg'));
  for (const f of files) {
    const src = path.join(IN, f);
    const meta = await sharp(src).metadata();
    const { width, height } = meta;
    const isMobile = f.startsWith('mobile_');
    const targetW = isMobile ? width : Math.min(width, MAX_W_DESKTOP);

    const base = f.replace(/\.jpg$/, '');

    if (height <= MAX_H) {
      await sharp(src)
        .resize({ width: targetW })
        .jpeg({ quality: 72 })
        .toFile(path.join(OUT, `${base}.jpg`));
      console.log(`  = ${base} (single ${targetW}x${height})`);
      continue;
    }

    const chunks = Math.ceil(height / MAX_H);
    const chunkH = Math.ceil(height / chunks);
    for (let i = 0; i < chunks; i++) {
      const top = i * chunkH;
      const h = Math.min(chunkH, height - top);
      const out = path.join(OUT, `${base}_p${i + 1}.jpg`);
      await sharp(src)
        .extract({ left: 0, top, width, height: h })
        .resize({ width: targetW })
        .jpeg({ quality: 72 })
        .toFile(out);
    }
    console.log(`  ÷ ${base} → ${chunks} chunks (${targetW}x~${chunkH})`);
  }

  const outFiles = fs.readdirSync(OUT);
  console.log(`\nWrote ${outFiles.length} files to ${OUT}`);
})();
