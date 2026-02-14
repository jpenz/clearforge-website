# CLAUDE.md — ClearForge.ai Build Instructions

## RALPH BUILD LOOP
You are building ClearForge.ai using the RALPH BUILD LOOP pattern.

### Read PRD.json first
Read PRD.json to understand the full project scope and all tasks.

### Loop
1. Pick the highest-priority incomplete task (status: "pending")
2. Read existing files if relevant
3. Build the task per acceptance_criteria
4. Test: `npm run build` must pass after every task
5. Git commit with task ID: `git add -A && git commit -m "TASK-ID: description"`
6. Mark task as complete in PRD.json (update "st": "complete")
7. Repeat until all tasks done

### Priority Order
00_security → 01_setup → 02_core → 03_api → 04_test

## Design Requirements

### Brand
- **Tagline:** "Strategy that ships. AI that performs."
- **Aesthetic:** Dark mode SaaS (Linear/Vercel quality). Clean, modern, premium but approachable.
- **NO:** Stock photos, corporate blue, jargon, flashy animations

### Color Palette
```css
--navy: #0F172A;
--blue: #3B82F6;
--emerald: #10B981;
--bg-dark: #0A0A0A;
--bg-card: #111111;
--bg-elevated: #1A1A1A;
--border-subtle: #1E293B;
--border-medium: #334155;
--text-primary: #F8FAFC;
--text-secondary: #94A3B8;
--text-muted: #64748B;
/* Light mode equivalents */
--bg-light: #FAFAFA;
--text-light-primary: #0F172A;
```

### Typography
- Geist Sans (headlines + body) + Geist Mono (code/technical)
- Use next/font/local or next/font/google

### Components
- Use Radix UI primitives with Tailwind styling
- Framer Motion for scroll animations (subtle fade-in, slide-up)
- Recharts for radar chart in scorecard
- Lucide React for icons
- React Hook Form + Zod for all forms

### Performance (Vercel Best Practices)
- Use Server Components by default, Client Components only when needed
- Dynamic import heavy components (Recharts, Framer Motion animations)
- Optimize images with next/image
- Preload critical fonts
- Target Lighthouse 95+

## Content Guidelines

### Services
1. **AI Revenue Operations** — Sales automation, intent signals, pipeline analytics
2. **Performance Improvement** — Process mining, operational diagnostics, custom automation
3. **PE Value Creation** — 90-day sprints, portfolio AI playbooks, EBITDA improvement
4. **Custom AI Agents** — Bespoke agents for sales, ops, finance, workflow orchestration

### Pricing
- AI Readiness Audit: $15K, 2 weeks
- Performance Sprint: $50K-$100K, 6-8 weeks
- AI Agent Retainer: $15K/mo, ongoing

### Case Studies (Anonymized)
- Use C-S-O-S framework: Challenge → Solution → Outcome → Scale
- Never name clients
- Focus on quantified results

### AI Readiness Scorecard (18 Questions)
**Pillar 1: Data Maturity (30%)**
Q1: Key business data in centralized systems (not spreadsheets)
Q2: We trust our data quality
Q3: Clear data governance policies exist
Q4: Systems can share data easily

**Pillar 2: Team Capability (25%)**
Q5: Leadership understands AI capabilities and limitations
Q6: Team is open to new technology and workflows
Q7: We have (or could hire) people with data skills
Q8: There is a clear AI champion/sponsor

**Pillar 3: Process Documentation (20%)**
Q9: Core business processes are documented
Q10: We track KPIs for important processes
Q11: We can identify time-consuming/error-prone workflows
Q12: Significant manual/repetitive work exists

**Pillar 4: Tech Infrastructure (15%)**
Q13: We use cloud-based tools at least partially
Q14: Systems are modern enough for API integrations
Q15: Adequate cybersecurity measures in place

**Pillar 5: Budget Alignment (10%)**
Q16: Budget allocated for AI/technology improvement
Q17: We expect ROI within 6-18 months (realistic)
Q18: AI is a strategic priority for leadership

**Scoring:** composite = (data × 0.30) + (team × 0.25) + (process × 0.20) + (tech × 0.15) + (budget × 0.10)

**Maturity Levels:**
- 0-40: Foundation Building → Recommend Audit
- 41-55: Emerging → Recommend Audit
- 56-70: Developing → Recommend Sprint
- 71-85: Implemented → Recommend Implementation
- 86-100: Leader → Recommend Retainer

## Git
- Commit after every task with format: "TASK-ID: description"
- Push to remote when setup

## Important
- Run `npm run build` after EVERY task to verify no errors
- Do NOT skip tasks or change priority order
- Update PRD.json status after each task completion
- Mobile-first responsive design on every page
