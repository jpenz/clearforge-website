# Premium Visual System Brief

Date: 2026-05-06

## Decision

ClearForge should not chase heavier hero video as the primary quality move. The best direction is an editorial-grade, high-resolution still or poster as the first paint, with optional motion only after the still passes visual review. Bain, BCG, and McKinsey read premium because their visuals feel art-directed, specific, and restrained; the motion supports the story instead of carrying it.

CellCog reached the same core conclusion in chat `69facb91b69e11028af82528`: the website should behave like ClearForge's first AI transformation engagement. Its strongest recommendation is to pair editorial typography with an AI Value Map-style visualization, because interactive/product proof is more distinctive than another generic AI transformation background.

## What This Means For ClearForge

- Use a crisp hero still as the LCP asset. It should have calm left-side negative space, sharp right-side visual proof, no baked-in text, and no fake dashboard labels.
- Treat the current generated hero still as a bridge asset. The better final state is a stylized AI Value Map / benefits-realization surface built from real ClearForge UI patterns.
- Generate still candidates first. Reject anything with gibberish text, humanoid AI tropes, generic people, soft focus, or decorative sci-fi circuitry.
- If video is used, animate from an approved still/storyboard and serve it as progressive enhancement only. The poster must stand on its own.
- Use procedural HTML/SVG/Excalidraw-style diagrams for precise workflow stories. Do not ask image models to render readable process maps.
- Keep use-case visuals business-specific: revenue pipeline dashboards, service quality queues, operating exception flows, knowledge-work review surfaces, and benefits-realization scorecards.

## Production Asset Pipeline

1. Research the page intent and buyer job.
2. Generate 2-4 still candidates with KIE models suited to the task.
3. Upscale only the best candidate.
4. Compress into responsive WebP/AVIF-friendly sources.
5. Add media budgets before wiring the asset into React.
6. Verify desktop and mobile screenshots, text contrast, and console errors.
7. Only then generate optional video from the approved still.

## Artifact Standards

- Logos, icons, and precise methodology diagrams should be SVG or code-native vector components.
- Editorial imagery, generated hero art, dashboards, and photographic surfaces should be responsive raster assets delivered through Next Image.
- Hero/LCP imagery should use versioned filenames, explicit `sizes`, eager loading, and `fetchPriority="high"`.
- Below-fold imagery should lazy-load, stay under the media budget, and avoid layout shift with stable dimensions.
- Video should be muted, local, short, optimized, controlled by a visible pause/play affordance when meaningful, and backed by a static poster.
- Cursor and motion polish should be desktop-only, disabled for coarse pointers, and disabled when the user prefers reduced motion.

## Model Guidance

- `nano-banana-pro`: strongest KIE option for high-fidelity 2K/4K structured brand visuals.
- `google/imagen4-ultra`: best candidate for photoreal/editorial scenes.
- `flux-kontext-max`: useful for editing or reworking an existing candidate.
- `recraft/crisp-upscale`: useful when the composition is right but the source needs sharper detail.
- `veo3` / `veo3_fast`: use for short, muted, local hero loops only after the still direction is approved.

## Implementation Notes

- Next.js image `sizes` must be explicit for fill/responsive images.
- Above-the-fold hero images should load eagerly with `fetchPriority="high"`.
- AVIF can be enabled with WebP fallback; version hero filenames when replacing important media so image optimizer and CDN caches cannot serve stale derivatives.
- Keep raw generated assets in `artifacts/generated-images` and commit only optimized production assets in `public/images`.

## CellCog Follow-On Priorities

1. Promote the AI Value Map from supporting CTA into visual proof: a stylized, angled preview in the hero or first proof section.
2. Redesign case studies as metric-forward editorial stories with charts, before/after states, and one dominant hero metric.
3. Build Excalidraw-style Forge Method diagrams as precise process visuals for services and operating-model pages.
4. Keep CTA architecture premium and intent-based; use executive language where the buyer is C-suite or PE.
5. Run any future redesign through a migration checklist so URL changes, high-performing insights, and case-study traffic are preserved.

## Sources

- Bain AI consulting positioning: https://www.bain.com/vector-digital/ai-insights-and-solutions/artificial-intelligence/
- BCG AI at Scale positioning: https://www.bcg.com/capabilities/artificial-intelligence
- web.dev LCP guidance: https://web.dev/articles/lcp
- web.dev image performance guidance: https://web.dev/learn/performance/image-performance
- Next.js Image component guidance: https://nextjs.org/docs/app/api-reference/components/image
- KIE Nano Banana Pro docs: https://old-docs.kie.ai/market/google/pro-image-to-image
- KIE Imagen4 Ultra docs: https://old-docs.kie.ai/market/google/imagen4-ultra
- KIE Recraft Crisp Upscale docs: https://docs.kie.ai/market/recraft/crisp-upscale
- KIE Veo3.1 quickstart: https://docs.kie.ai/cn/veo3-api/quickstart
- CellCog generated brief: /Users/agentmac/.cellcog/chats/69facb91b69e11028af82528/ClearForge_Website_Redesign_Executive_Brief.pdf
