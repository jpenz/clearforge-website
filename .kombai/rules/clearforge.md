# ClearForge — Kombai project rules

Read `CLAUDE.md` at the repo root first; it is the source of truth for design
doctrine, editorial rules, and QA gates. These rules bind every Kombai session.

## Stack

Next.js 16 App Router · React 19 · TypeScript 5 strict · Tailwind CSS v4
(`@theme inline` in `src/app/globals.css`). No animation libraries — motion is
CSS + IntersectionObserver/rAF only.

## Design system (V12 "Swiss Hairline")

- Tokens live ONLY in `src/app/globals.css`. Use existing tokens; NEVER
  introduce new hex values, new colors, gradients-as-decoration, or shadows.
- Palette: ghost-white canvas (`--color-ghost`), ink text (`--color-ink`),
  vivid cobalt as the ONLY accent (`--color-cobalt`), 1px hairlines. Zero
  border-radius, zero box-shadows.
- The `--color-brass`/`warm-white`/`recessed` legacy token block is scoped to
  `src/components/revenue-ops/` only — never use those names elsewhere.
- Display font utility `font-display` (Newsreader); body Hanken Grotesk;
  numbers always tabular (`tnum`). Never reference theme vars via inline
  `style={{...var(--...)}}` — they don't exist at runtime.
- Reuse components from `src/components/{ui,layout,functional,home}` before
  creating new ones. Page data lives in `src/data/`.

## Scope constraints

- Writable: `src/components/**`, `src/app/**/page.tsx`, `src/data/**`,
  `src/app/globals.css` (additive token-safe edits only).
- NEVER modify: `src/app/api/**`, `src/lib/**`, `next.config.ts`,
  `.github/**`, `supabase/**`, `package.json`, `middleware`, robots/sitemap.
- `src/app/revenue-ops/` + `src/components/revenue-ops/` are a synthetic,
  noindex client demo (samuel.clearforge.ai). Keep it fully local: no fetch,
  no storage, no env access, no external links into the marketing nav, and
  preserve its human-approval / dry-run-only semantics.

## Hard rules (violating these has shipped real bugs)

- No `'use client'` on pages; client components only where interaction demands.
- No `color` on bare element selectors in globals.
- Canonical CTA labels only: "Book a 30-min intro" · "Map the Workflow" ·
  "Take the scorecard". Never invent metrics or real client names.
- Content renders instantly: no scroll-hiding reveals, pinned sections, Lenis,
  or custom cursors. `prefers-reduced-motion` respected.
- WCAG AA: axe-core must report zero serious/critical (E2E enforces this).
- Keep `e2e/` specs updated WITH any UI you change; CI runs them.
