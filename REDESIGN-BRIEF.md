# ClearForge v2 Redesign Brief — "The Forge + Signal Hybrid"

## CRITICAL: This is a ZERO-BASE redesign. Replace ALL styling and visual approach.

## Brand Direction: 70% Forge + 20% Signal + 10% Bridge

### Color Palette (REPLACE ALL EXISTING COLORS)
```css
/* Primary */
--forge-navy: #0B1D33;
--molten-amber: #C8963E;
--tempered-gold: #E8D5B5;
--deep-steel: #1A3A5C;

/* Backgrounds — LIGHT MODE DEFAULT (not dark!) */
--warm-white: #F5F3EF;
--canvas: #FFFFFF;
--carbon: #1A1A1A;

/* Data accent (from Signal concept) */
--signal-blue: #0074D9;

/* Borders */
--border-subtle: #EDEDED;
--border-accent: #C8963E;
```

### Typography (REPLACE Geist with these)
- **Headlines:** DM Serif Display (Google Fonts) — elegant serif with industrial weight
- **Body/UI:** Inter — clean, precise, geometric
- **Data/Metrics:** JetBrains Mono or IBM Plex Mono — for numbers and data displays
- **Scale:** Display 48px, H1 36px, H2 24px, Body 15px/1.8, Small 13px, Labels 11px/1.5px tracking

### Design Principles
1. **LIGHT MODE DEFAULT** — warm white (#F5F3EF) backgrounds. Dark is the anti-pattern.
2. **Sharp corners** — radius: 0px everywhere. Industrial precision, not friendly SaaS.
3. **No shadows** — flat design. Let typography and color do the work.
4. **Ruled lines** — 1px #EDEDED separators between sections instead of cards
5. **Asymmetric grids** — 60/40 and 70/30 splits, NOT equal columns
6. **120px+ side margins** on desktop — generous white space signals confidence
7. **Crosshatch patterns** — subtle diagonal-line patterns at 5-8% opacity as section backgrounds
8. **No gradient blobs** — NO mesh gradients, NO glassmorphism, NO generic dark-mode effects
9. **No card grids** — use editorial layouts, ruled separators, asymmetric compositions
10. **No stock photos** — abstract textures, data visualizations, crosshatch patterns only
11. **Monospace numerals** — ALL metrics/numbers in monospace font at large scale
12. **Amber accents** — hover states use thin amber line extending left-to-right
13. **Linear animations only** — no springy/bouncy motion. Precision, like machinery.
14. **Editorial feel** — like Kinfolk magazine meets precision manufacturing

### Section-by-Section Redesign

#### Homepage Hero
- Warm white background (#F5F3EF)
- "Strategy that ships. AI that performs." in DM Serif Display, 72px
- Subheadline in Inter 18px
- 2 CTAs: "Book Discovery Call" (amber bg, navy text) + "Take AI Scorecard" (outlined amber)
- NO animated gradient background. Use subtle crosshatch pattern.
- Impact metrics bar below hero: "23% Avg. Cost Reduction | 90d Time to Impact | $4.2M Avg. Value Created" in monospace

#### Problem Statement
- "Strategy firms give you decks. Tech shops give you tools. Neither gives you results."
- Split-screen layout (from Bridge concept) — left: the problem, right: ClearForge solution
- Ruled line separators

#### Services
- NOT card grids. Editorial layout with asymmetric 60/40 splits
- Each service: large serif heading + description + outcome metrics in monospace
- Thin amber line under active/hovered service
- Service detail pages use ruled separators, NOT boxes

#### Results/Metrics
- Large monospace numbers (120px) as visual focal points
- "30%" becomes a design element, not just text
- Amber accent on the numbers
- Clean white background, numbers breathe

#### AI Readiness Scorecard
- "Temperature gauge" metaphor — questions heat up the score
- Progress bar styled as a heat gradient (cool blue → warm amber → hot)
- Clean, spacious question layout — one question visible at a time
- Results: radar chart with Forge Navy + Amber palette
- "Forge Report Card" styling on results page

#### Pricing
- NOT three-column checkmark grid
- Narrative engagement descriptions with outcomes
- Ruled separators between tiers
- Large serif headings for package names

#### About/Founder
- Full-width editorial layout
- "Forging" narrative — career as gathering raw materials → mastering craft → lighting the forge
- Placeholder for editorial-quality photo (NOT circular crop)

#### Blog/Insights
- Magazine-style editorial layout
- Large featured post + smaller cards below
- Category labels in uppercase Inter 600 with tracking

### Anti-Patterns to AVOID
1. ❌ Dark mode default
2. ❌ Gradient blobs / mesh gradients
3. ❌ Equal card grids / bento layouts
4. ❌ Glassmorphism / frosted glass
5. ❌ Stock photography
6. ❌ Rounded corners (use sharp 0px)
7. ❌ Shadows (use flat design)
8. ❌ Bouncy/spring animations
9. ❌ "AI-Powered" hero with trust badges
10. ❌ Hamburger menu on desktop
11. ❌ Identical pricing table with checkmarks
12. ❌ Generic team grid with circular headshots

### CSS Global Reset Approach
Strip ALL Tailwind defaults that create the "template" look:
- Remove default border-radius
- Remove default shadows
- Custom spacing scale (not Tailwind defaults)
- Custom color tokens (replace entire Tailwind palette)
