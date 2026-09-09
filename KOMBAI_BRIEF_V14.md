# Kombai brief: three bands, design mode only

Paste the prompt at the bottom into Kombai. Everything above it is context for
whoever is driving.

## Rules of engagement

- **Design mode only.** Do not let Kombai write into `main` or into
  `feat/v13-widescreen-hdr`. Branch it: `kombai/v14-bands`.
- Kombai auto-reads `AGENTS.md` in this repo on every thread. That file carries
  the frozen tokens, the component inventory, the editorial rules, and the
  measured gate. Do not restate them in the prompt; point at the file.
- `@Files`-mention this brief in the kickoff message, because an arbitrary
  markdown file is not read automatically.
- Attach two reference screenshots: a McKinsey.com fold and the current
  ClearForge homepage fold at 1920, both in
  `/Users/agentmac/Projects/clearforge-reviews/shots-2026-09-06-v13-final/`.
- Leave the **High Creativity toggle OFF.** It biases toward heavy animation,
  which contradicts the motion doctrine in `AGENTS.md`.
- Pick the frontier model explicitly for round one, not a router. Round one sets
  the direction every later band inherits.

## Why only three bands

Two critics scored the branch on ten dimensions. Seven of them are at 8 or
above and should not be touched. Three sit at 7.5, and all three are
composition taste rather than defects, which is exactly what a second design
engine is good for. Everything else that is still open needs facts from the
owner or a decision from him, and no design tool moves those.

## The three targets

**1. Interior band rhythm on /proof and /private-equity.**
The home page alternates well: dark plate, dotted light, four-column light,
image-card proof, dark adoption plate, cards, serif close, dark footer. The
interior routes inherit the frame but flatten into consecutive light bands
opened by the same label rail. /proof now has one dark room in the middle,
which helped, and it still reads as a corridor either side of it. Wanted: a
rhythm for a route that has three case blocks plus a pattern list plus a close,
where no two adjacent bands share a treatment and the strongest number in the
route lands in a dark room.

**2. The /services journey band.**
Four stages, each with a conclusion heading, a stage label, a duration, and two
to three catalog rows. It is currently a long vertical list of hairline rows.
It is honest and scannable and it is the least designed band on the site.
Wanted: a treatment that makes four stages feel like a sequence a buyer can
hold in one view, without cards for text and without inventing a metric.

**3. The mobile header at 390.**
All six nav links plus the brand plus the booking button currently occupy a
two-tier sticky bar 126px tall, which is about 15 percent of the viewport at
every scroll position. Nothing hides behind a hamburger today and that was
deliberate. Wanted: options that keep every destination reachable while
returning most of that vertical space.

## What to do with the output

Kombai returns design directions and first-pass code. Do not merge that code.
Take the direction, rebuild it inside the existing primitives listed in
`AGENTS.md`, then run the full gate: typecheck, lint, unit, build, end-to-end,
axe, and the pixel-sampled contrast check over every plate. Any band that
carries text over a render has to be re-measured, because a scrim tuned for one
composition is wrong for the next one.

Then re-run `/design-review-panel` against the result and compare the scorecard
to `design-review-2026-09-06-v13-final.md`.

---

## The prompt

> Read AGENTS.md in this repo before anything else. It carries the design
> system, the frozen tokens, the component inventory, the editorial rules, and
> the constraints I cannot break. Also read @KOMBAI_BRIEF_V14.md.
>
> This is a founder-led AI consulting and build firm for mid-market companies
> and private equity operating teams. The reader is a chief executive or an
> operating partner who has seen McKinsey, Bain, and BCG sites for years and
> decides in about eight seconds whether a firm is serious. The register is
> already set and I am not changing it: full-bleed dark canvases with luminous
> cobalt renders, a large serif voice, editorial hairlines, one accent, numbers
> tied to named things.
>
> Do not redesign the site. I want three bands explored, and for each one give
> me three genuinely different directions, not three variations of the same
> idea.
>
> First, the interior band rhythm on /proof and /private-equity. Both routes
> open on a dark plate and then run consecutive light bands opened by an
> identical label rail, so they read as a corridor. Show me rhythms where no
> two adjacent bands share a treatment and the strongest number in the route
> sits in a dark room.
>
> Second, the /services journey band. Four stages, each with a conclusion
> heading, a stage label, a duration, and two or three catalog rows underneath.
> It is a long vertical list of hairline rows today. Make four stages read as
> one sequence a buyer can hold in a single view. No cards for text.
>
> Third, the mobile header at 390 wide. Six nav links, a brand, and a booking
> button currently take a two-tier sticky bar 126 pixels tall, which is about
> 15 percent of the viewport at all times. Every destination has to stay
> reachable. Give me back most of that height.
>
> Constraints that are not negotiable: the tokens in AGENTS.md, no new colors,
> no second accent, no gradients as decoration, no cards for text content, no
> stock photography of people, no animation library, content visible at first
> paint, and no invented numbers. Any text sitting over a render has to stay
> legible against a dark scrim.
>
> Work on a branch named kombai/v14-bands. Do not touch main or
> feat/v13-widescreen-hdr.
