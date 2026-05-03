# Extra Research Brief: AI Search, Executive Conversion, And Visual Proof

Date: 2026-05-03

## What Changed The Backlog

The research reinforced one principle: ClearForge should behave like its own first case study. The site should make the operating method visible, keep claims evidence-bound, and give AI answer engines clean entity, author, article, and methodology signals.

## Findings

### AI Search / GEO / AEO

- AI answer engines favor pages with clear entity definitions, answer-first sections, visible author context, freshness signals, crawlable HTML, and structured data that matches visible content.
- `llms.txt`, permissive AI crawler rules, Organization/Person/Article/FAQ schema, and concise "best pages to cite" summaries are useful supporting signals.
- The site should avoid unsupported ROI, savings, production-rate, or benchmark claims. Claims that are not sourced should be framed as hypotheses, baselines, or evidence needs.

### Executive Buyer Conversion

- CEO, COO, PE, and owner audiences need fast trust formation: who is behind the work, how the method works, what gets built, what gets measured, and how risk is controlled.
- Boutique AI transformation positioning should lean into independence, senior ownership, operating cadence, and production workflow proof rather than broad "AI transformation" claims.
- Case and use-case pages should read like operating stories: constraint, diagnosis, build, adoption, controls, measurement.

### Animation And Visual Proof

- Motion should clarify the operating story, not decorate it. The strongest visuals are dashboards, workflow desks, process maps, exception queues, owner views, and before/after operating states.
- Background video should be lightweight, non-essential, muted, and paired with a static fallback. If it does not show business proof, a crisp interactive/data visual is usually stronger.
- All motion should respect reduced-motion preferences and preserve Core Web Vitals.

## Implemented From This Research

- Added visible article dates on the insights index and detail pages.
- Added an editorial-standard note to insight detail pages.
- Expanded Article schema with `BlogPosting`, `mainEntityOfPage`, `dateModified`, `image`, `articleSection`, `keywords`, and founder linkage.
- Added ProfilePage schema for the About page / ClearForge entity.
- Fixed date formatting so date-only strings do not shift by timezone.

## Next Best Improvements

1. Add a "Research & Evidence Standard" page that explains how ClearForge handles claims, assumptions, baselines, and sourced facts.
2. Add a small source-trail component for articles that contain external statistics or third-party claims.
3. Add a lightweight interactive maturity self-assessment that routes to the scorecard or diagnostic.
4. Replace remaining decorative abstract imagery on secondary pages with workflow-specific dashboard/process visuals.
5. Add a monthly insight freshness review so the AIO/GEO corpus stays current without fake date changes.

## Reference Sources

- Google Search Central: Creating helpful, reliable, people-first content - https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central: Structured data introduction - https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central: Article structured data - https://developers.google.com/search/docs/appearance/structured-data/article
- Google Search Central: ProfilePage structured data - https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Google Search Central: Organization structured data - https://developers.google.com/search/docs/appearance/structured-data/organization
- web.dev: Core Web Vitals - https://web.dev/articles/vitals
- W3C WCAG 2.2: Pause, Stop, Hide - https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
