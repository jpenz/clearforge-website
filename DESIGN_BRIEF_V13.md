# DESIGN BRIEF V13: Widescreen, high dynamic range, McKinsey-grade

Read this whole file before touching code. It is the standing prompt for the V13
pass and for every agent in the loop that builds, verifies, and scores it. It
sits on top of CLAUDE.md, which still governs stack, security, editorial rules,
and commands. Where this brief amends CLAUDE.md, it says so explicitly.

Owner verdict on the current site (2026-09-05): "it could be more widescreen and
look more HDR and be as smooth and impactful as McKinsey.com, not as sterile as
it is now." The owner is a former Bain consultant, 35, running a tech strategy
and AI build firm. The site must read at that level.

---

## 1. Who reads this site

One first-time reader at a time, on a 27-inch monitor or a 14-inch laptop,
usually between meetings:

- A CEO, COO, or CFO of a $20M to $500M company who has been burned by an AI
  pilot that nobody used. They have seen McKinsey, Bain, and BCG sites for years
  and calibrate "serious firm" against them.
- A PE operating partner or VP of value creation scanning ten vendor sites in an
  afternoon. They decide in eight seconds whether the firm is credible enough
  to book a call.

What convinces them: scale of presence, a working product in the hero, real
numbers tied to named engagements, a founder with a top-tier lineage, and one
clear next step. What repels them: template feel, agency theatrics, stock
photos of people in offices, invented metrics, and small boxed layouts that
look like an internal tool.

## 2. The register in one line

McKinsey.com's dynamic range and confidence, executed by a founder-led AI build
firm: full-bleed dark canvases with luminous renders, a large serif voice,
editorial hairlines, one cobalt accent, a live product in the hero, and numbers
in every viewport. Restraint is the mark of the register. Scale is what was
missing.

Reference sites (steal the register, never the layout): mckinsey.com (dynamic
range, full-bleed rhythm, image-led modules), bain.com (serif confidence,
whitespace), anthropic.com (calm product-first credibility). Anti-references:
casperstudios.com (agency showpiece; we are not that), any Webflow template
with pastel gradients and icon cards.

## 3. What the evidence shows (1920 x 1080 captures, 2026-09-05)

McKinsey.com at 1920:
- The canvas is deep navy edge to edge. There is no framed column; content sits
  in a roughly 1440px grid with 240px margins that read as margins, not gutters.
- Every module carries a large image: 3D renders with luminous color on dark
  (colored light tubes, light trails, wave meshes) or cinematic photography.
  The imagery IS the dynamic range: near-black shadows with saturated highlights.
- The headline is a very large serif (about 80px) with an asymmetric indent.
- Band rhythm changes color: navy, then a full-bleed photographic band, then an
  electric blue gradient band. No two adjacent bands share a treatment.
- Cards are image cards with text over a gradient. Hover is a slow scale.

clearforge.ai at 1920 (current):
- A 1360px hairline-framed column with about 280px of empty ghost white on each
  side, visible side rules, and a boxed hero. This is the "sterile" read.
- No imagery anywhere on the site. Every band is type on white or type on ink.
- The dark hero is flat: the aurora is faint, there is no highlight core, no
  vignette, so it reads as a navy rectangle rather than light in a dark room.
- Interior bands are the same white hairline grid repeated six times. The 01/02/03
  watermark numerals are washed out. The footer is flat ink.
- Motion is limited to the load stagger and CountUp; nothing responds to scroll.

The system itself (tokens, serif, hairlines, cobalt, live agent card) is right.
The container, the dynamic range, the imagery, and the scroll feel are wrong.

## 4. The moves, ranked by impact

Each move has an acceptance test. The verifier checks them; the critics score them.

### Move 1: Full-bleed canvas (fixes "not widescreen")
- `PageFrame` stops being a 1360px box with side rules. It becomes a full-bleed
  section (background spans the viewport) with an inner container:
  `mx-auto w-full max-w-[1440px] 2xl:max-w-[1600px] px-5 md:px-10 xl:px-14`.
  Horizontal hairline rules span the full viewport width. Vertical dividers
  inside grids stay. No vertical side rules on the column.
- Every band that has its own background (`.cf-dark-band`, image plates) paints
  edge to edge and puts its content in the same container.
- Header is full-bleed and sticky: `bg-[#030b13]/85 backdrop-blur-md` with ghost
  text and the cobalt button, on every page. Inner container matches.
- Accept: at 1920 the widest content edge sits within 260px of the viewport
  edge; no side rules; header and every dark band reach both edges.

### Move 2: High dynamic range atmosphere (fixes "not HDR")
- Upgrade `.cf-dark-band` with a luminous core and a vignette, all
  compositor-safe: a top-right radial highlight
  (`rgba(122,151,255,.55) 0%, rgba(36,84,255,.22) 22%, transparent 60%`), a
  bottom vignette (`linear-gradient(180deg, transparent 55%, #030b13 100%)`),
  and a one-pixel specular top edge (`rgba(248,248,255,.18)`). Keep the grain.
- Aurora blobs get brighter cores (peak alpha about .5) and one additional slow
  light sweep (transform-only). Reduced motion disables all of it.
- Light bands stop being flat: the ghost canvas gets a barely visible top-down
  gradient (`#ffffff` to `#f8f8ff`) and dark bands cast a soft shadow onto the
  band below. Depth, not decoration.
- Accept: in the 1920 hero screenshot the darkest pixels are near `#030b13` and
  there is a visible bloom of cobalt light; the adoption band and footer show the
  same core. Contrast of ghost text on the plate is at least 4.5:1 (axe passes).

### Move 3: Imagery program (fixes "no dynamic range in the interior")
- AI-generated renders only (CLAUDE.md rule), palette-locked to ink and cobalt,
  no people, no text, no logos. Produced with KIE `nano-banana-pro`, 16:9,
  saved as optimized JPEG in `public/renders/` (2560px wide, quality about 72,
  under 260KB each), served through `next/image` with AVIF.
- Plates and where they go:
  - `hero-forge.jpg`: homepage hero back plate, right-weighted, dark left third.
  - `proof-threads.jpg`: featured proof image card (Case A) on the homepage.
  - `adoption-field.jpg`: adoption band back plate behind the 70 percent.
  - `services-anvil.jpg`: /services dark title block.
  - `pe-monoliths.jpg`: /private-equity hero.
- Every plate sits under a legibility overlay
  (`linear-gradient(90deg, rgba(3,11,19,.96) 0%, rgba(3,11,19,.82) 38%,
  rgba(3,11,19,.35) 70%, rgba(3,11,19,.15) 100%)`) and the film grain.
- The homepage hero plate is the LCP image: `priority`, `fetchPriority="high"`,
  explicit `sizes`, and no layout shift.
- Accept: at least four plates in place, each under 260KB, text over them passes
  contrast, total image bytes on the homepage under 900KB, and the LCP element
  is the hero plate or the h1.

### Move 4: Scroll feel (fixes "not smooth")
Amendment to the CLAUDE.md motion doctrine, deliberately narrow: CSS
scroll-driven animation is allowed on background plates only, because it never
hides content and needs no JS.
- Plates get a gentle parallax: inside `@supports (animation-timeline: view())`,
  animate the plate from `translateY(-6%)` to `translateY(6%)` with
  `animation-timeline: view()`; the plate is sized 112% tall so edges never show.
- Image cards scale from 1 to 1.04 over 700ms on hover with a
  `cubic-bezier(0.2,0.7,0.2,1)` curve. Links and buttons keep 200ms transitions.
- The header blurs what scrolls under it. No Lenis, no pinned sections, no
  opacity-0 reveals, no custom cursor. Content is visible at first paint.
- Accept: no element starts at opacity 0 except the existing `.cf-enter`
  load stagger; scrolling at 1920 shows the hero plate moving slower than the
  page; `prefers-reduced-motion` removes the parallax.

### Move 5: Type scale for wide viewports (fixes "small in a big room")
- h1 on the homepage: `text-[clamp(44px,5.4vw,104px)] leading-[1.02]`. Interior
  page titles: `clamp(38px,4.2vw,76px)`. Section display headings:
  `clamp(30px,3vw,56px)`. Hero stats and the 70 percent: scale with `vw` too.
- Body copy stays 15 to 17px with measure caps; only the display register grows.
- Accept: the homepage h1 measures at least 88px at 1920 and at least 40px at 390.

### Move 6: Band rhythm (fixes "sterile repetition")
Homepage order stays; treatments alternate so no two adjacent bands match:
1. Hero: dark plate, agent card floating over it with the glow.
2. Lineage: light, dotted texture, tightened.
3. Engagements: light, three columns, luminous numerals (cobalt at 6 percent,
   not ink at 4.5 percent).
4. Proof: light band containing one image card (Case A over `proof-threads.jpg`,
   large serif headline and "Read the case") beside the five-stat rail.
5. Adoption: dark plate with the HDR core behind the 70 percent.
6. Tools: light, two cards with a cobalt glow on hover.
7. Booking: light, large serif statement, calendar CTA.
8. Footer: dark with the HDR core and aurora.
- Accept: a critic reading the 1920 full-page capture can name a different
  treatment for each adjacent pair.

### Move 7: Hero composition
- At `lg` and up the hero is at least `min-h-[82svh]` with a 1000px cap. Left
  58 percent: eyebrow, h1, one-line diagnostic statement, the booking button.
  Right: the live agent card floating on the plate with the cobalt glow, offset
  down so the plate shows above it.
- The h1 keeps the approved copy exactly: "ClearForge builds AI systems your
  team actually uses and your bottom line actually feels." with the italic
  accent on "actually feels."
- Accept: at 1920 the hero fills the first viewport and the plate is visible
  to the right of and above the agent card.

### Move 8: Interior pages inherit
- /services, /private-equity, /proof, /about, /pricing, /contact, /start,
  /insights, /industries, /security, /privacy, /terms all inherit the full-bleed
  frame and the sticky dark header with no per-page work beyond the plates named
  in Move 3. Check each for a white card on dark that lost its `text-ink` reset.

### Move 9: Performance and accessibility stay best in class
- `next.config.ts` gets `images.qualities: [60, 72, 85]` and nothing else
  changes there. CSP is untouched (renders are same-origin).
- Fonts unchanged. No new dependencies. No animation library.
- Accept: build green, Biome clean, 28 unit tests green, 26 e2e green (update
  specs only where the UI changed deliberately), axe zero serious or critical on
  our DOM, no console errors, no horizontal overflow at 390, 1440, or 1920.

## 5. Hard constraints (never trade these for looks)

- No em dashes in any public copy. No published prices anywhere, including
  structured data. No real client names. Never invent a metric. The parked
  guarantee language and any "Adoption Rescue" SKU do not ship.
- Canonical CTA labels only: "Book a 30-min intro", "Map the Workflow",
  "Take the scorecard".
- Do not modify `src/app/actions.ts`, `src/lib/url-safety.ts`,
  `src/lib/uploads.ts`, `src/lib/rate-limit.ts`, `src/lib/leads.ts`,
  `src/lib/supabase.ts`, or the CSP block. Security invariants are frozen.
- Tokens are frozen: cobalt `#2454ff`, cobalt-bright `#7a97ff` on dark, ink
  `#010b13`, ghost `#f8f8ff`. No new hues. Highlights are cobalt-bright light,
  not new colors.
- Never put `color` on bare element selectors; never reference theme vars in
  inline styles; a white card inside a dark band resets `text-ink`.
- `'use client'` only where interaction demands it. Pages stay server components.
- Commit on `feat/v13-widescreen-hdr` with conventional messages. Never push,
  never touch `main`, never rebase.

## 6. Scoring rubric (each 0 to 10; pass = mean 8.0 or higher and no dimension below 7)

1. Widescreen use at 1920 (Move 1 acceptance).
2. Dynamic range (Move 2 acceptance).
3. Imagery (Move 3 acceptance, plus: renders look cinematic and palette-locked,
   not clip art; no people; text legible).
4. Scroll and hover feel (Move 4 acceptance; nothing janky in the capture set).
5. Hierarchy and scale (Move 5 acceptance; one number in every viewport).
6. Band rhythm (Move 6 acceptance).
7. Register fit: would a former Bain partner believe this is a best-in-class
   tech strategy firm, not an agency and not a template? Compare against the
   McKinsey captures in the shots folder.
8. Performance (Move 9 numbers; homepage image bytes, LCP candidate).
9. Accessibility (axe, contrast on plates, focus states visible on dark).
10. House rules and invariants (section 5, every line).

Critics score from the round's screenshots plus a read of the diff. They cite
the screenshot file and the exact defect for anything below 8, and they give
the builder one concrete fix per defect.

## 7. Team loop protocol

Roles, each a separate agent with fresh context:
- Imagery producer: generates and optimizes the plates. Runs in parallel with
  the foundation builder; touches only `public/renders/` and a manifest.
- Foundation builder: Moves 1, 2, 4 (CSS only), 5, 6 without images.
- Integration builder: Moves 3, 7, 8 using the plates.
- QA verifier: runs typecheck, lint, unit, build, prod server, e2e, axe, crawl
  for overflow and console errors, and captures screenshots at 1920, 1440, and
  390 for /, /services, /private-equity, /proof, /about. Fixes spec breakage
  caused by deliberate UI changes only.
- Two critics with different lenses: a design director who has shipped
  McKinsey-class sites, and a former Bain partner evaluating a vendor.
- Fix builder: takes the merged critique and ships the fixes.

Loop: build, verify, critique, fix, up to three rounds, stop early on pass.
The final report lists scores per round, what changed, what is still below 8,
and the exact commit range for review.

## 8. Render prompts (KIE nano-banana-pro, 16:9, 4K, then downsized)

Shared suffix for every prompt: "Deep navy-black void background, hex 030b13.
Electric cobalt light, hex 2454ff, with soft periwinkle highlights, hex 7a97ff.
Photoreal 3D render, volumetric light, high dynamic range, fine film grain, no
text, no letters, no logos, no people, no hands, no faces, wide 16:9 composition."

- hero-forge: "A single sheet of molten cobalt-blue light being forged between
  two dark obsidian plates, seen from a low angle; the light sheet blooms into
  haze on the right; the left third is empty dark space."
- proof-threads: "Thousands of hair-thin cobalt light threads flowing through a
  dark glass conduit and braiding into one thick luminous cable, shallow depth
  of field, the braid point in the right half."
- adoption-field: "A vast field of tiny light points on a dark plane rising
  toward a horizon, most of them lit cobalt and a scattered minority still
  unlit, a soft glow on the horizon, camera low and wide."
- services-anvil: "An obsidian anvil on a dark floor, a thin ribbon of electric
  blue light striking its surface, sparks as soft blue bokeh, strong rim light."
- pe-monoliths: "Twelve tall dark glass monoliths on a navy plane in a grid,
  three of them glowing cobalt from within, thin reflections on the floor,
  camera at chest height looking across the grid."

Reject any render with text, faces, hands, purple or magenta casts, or a
gray-blue washed look; regenerate until the shadows are near black and the
highlights bloom.
