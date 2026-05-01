# Hero Video Automation

ClearForge uses a locally hosted, muted, looped hero video with a static poster fallback. The website copy carries the message; the video should stay decorative, dark enough for text, and free of readable text or logos.

## Generate Candidates

Put `KIE_API_KEY` in `.env.local`, `.env`, or pass a private env file:

```bash
npm run video:hero -- generate --provider=veo --variants=all
npm run video:hero -- status
npm run video:hero -- download
```

For lower-cost exploration:

```bash
npm run video:hero -- generate --provider=veo --variant=value-chain-scan --model=veo3_fast
```

## Install A Candidate

After reviewing downloaded raw candidates in `artifacts/generated-video/raw`, compress one into production assets:

```bash
npm run video:hero -- optimize --input=artifacts/generated-video/raw/example.mp4
npm run media:check
```

This writes:

- `public/videos/hero.mp4`
- `public/videos/hero.webm`
- `public/images/hero-bg.webp`

## Production Constraints

- Keep the loop 6-10 seconds and under the media budget.
- Keep all text as HTML, never baked into video.
- Preserve `muted`, `playsInline`, and local hosting.
- Keep the pause/play control and `prefers-reduced-motion` behavior.
- Run a mobile and desktop screenshot before merging visual asset changes.
