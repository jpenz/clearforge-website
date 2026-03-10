"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getCaseStudy } from "@/data/case-studies";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  MapPin,
  Users,
  BarChart3,
  Building2,
  Globe,
  RefreshCw,
  TrendingUp,
  Zap,
  Send,
  Target,
  Clock,
  Layers,
  Percent,
  Factory,
  Shield,
  Crosshair,
  LayoutDashboard,
  BookOpen,
  UserCheck,
  LineChart,
  GitBranch,
  CheckCircle2,
  ChevronRight,
  Activity,
  Gauge,
  Database,
  Search,
  Filter,
  Kanban,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay: 0.08 * i },
});

export function IndustrialManufacturerPage() {
  const cs = getCaseStudy("industrial-manufacturer")!;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-bg-deep pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> All Case Studies
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                {cs.industry}
              </span>
              <span className="text-xs text-text-muted">·</span>
              <span className="text-xs text-text-muted">{cs.service}</span>
            </div>
            <h1
              className="text-3xl text-text-primary sm:text-4xl lg:text-5xl xl:text-6xl max-w-5xl leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cs.title}
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-3xl leading-relaxed lg:text-xl">
              {cs.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== METRICS STRIP ===== */}
      <section className="bg-bg-light border-y border-border-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-border-light">
            {cs.outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.metric}
                {...stagger(i)}
                className="py-8 px-4 text-center lg:py-10"
              >
                <div
                  className="text-3xl font-bold text-accent-dark lg:text-4xl"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {outcome.metric}
                </div>
                <p className="mt-2 text-xs text-text-on-light-muted leading-snug uppercase tracking-wide">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENT PROFILE ===== */}
      <section className="bg-bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label">The Client</p>
            <h2
              className="mt-4 text-2xl text-text-primary sm:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A $4 billion industrial conglomerate with a century of market leadership.
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Building2,
                  label: "Scale",
                  value: "$4B+ Revenue",
                  detail: "16 divisions, 70+ manufacturing facilities across North America",
                },
                {
                  icon: Factory,
                  label: "Sectors",
                  value: "Pressure Vessels · Automation · Metals",
                  detail:
                    "Serving energy, pharmaceutical, automotive, aerospace, food processing, and infrastructure markets",
                },
                {
                  icon: Globe,
                  label: "Coverage",
                  value: "20+ U.S. States",
                  detail:
                    "Southeastern hub expanding into Gulf Coast, Midwest, and Mid-Atlantic industrial corridors",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  {...stagger(i)}
                  className="border border-border-subtle bg-bg-surface p-6"
                >
                  <item.icon className="h-5 w-5 text-accent mb-3" />
                  <p className="text-xs uppercase tracking-widest text-text-muted mb-1">
                    {item.label}
                  </p>
                  <p className="text-base font-semibold text-text-primary">{item.value}</p>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== THE CHALLENGE ===== */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label text-accent-dark">The Challenge</p>
            <h2
              className="mt-4 text-2xl text-text-on-light sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Sixteen divisions. Zero shared intelligence.
            </h2>
            <p className="mt-6 text-lg text-text-on-light-sub leading-relaxed">{cs.challenge}</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "No unified view of capital projects or market signals across divisions",
                "Manual prospecting untethered from actual product capabilities",
                "Cross-sell opportunities between divisions completely invisible",
                "Commercial model unchanged as market and buyer behavior evolved",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...stagger(i)}
                  className="flex items-start gap-3 p-4 border border-border-light bg-white/60"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-red-50 rounded-full mt-0.5">
                    <span className="text-red-500 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-text-on-light-sub leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== THE APPROACH — 3 PHASES ===== */}
      <section className="bg-bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label">The Approach</p>
            <h2
              className="mt-4 text-2xl text-text-primary sm:text-3xl lg:text-4xl max-w-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Three phases. Intelligence first, then execution, then transformation.
            </h2>
          </motion.div>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                phase: "01",
                title: "AI Intelligence Engine",
                subtitle: "Months 1–3",
                icon: Brain,
                items: [
                  "Deployed proprietary AI agents calibrated to the client's exact product lines and industrial capabilities",
                  "Built 24 active intelligence triggers scanning capital projects, industrial demand, and competitive movements",
                  "Generated 1,181 scored opportunities across Pressure Vessel, Automation, and Data Center divisions",
                  "Produced 631+ tailored sales playbooks with entry strategies and competitive analysis",
                ],
              },
              {
                phase: "02",
                title: "Sales Execution Platform",
                subtitle: "Months 3–5",
                icon: LayoutDashboard,
                items: [
                  "Built SightForge — a purpose-built sales intelligence dashboard deployed at a dedicated subdomain",
                  "Dual-view pipeline management (table + Kanban) with advanced filtering and saved views",
                  "AI playbook rendering with structured 4-dimension feedback loops",
                  "Contact enrichment, performance scorecards, and territory assignment intelligence",
                ],
              },
              {
                phase: "03",
                title: "Commercial Model Design",
                subtitle: "Month 6+",
                icon: GitBranch,
                items: [
                  "Diagnostic-first framework measuring Sales ROI Ratio against 4–6x industrial benchmarks",
                  "Account segmentation by margin contribution — identifying over-served, under-served, and white space",
                  "Role architecture redesign: Account Managers, Hunters, and BDRs aligned to margin growth",
                  "Structured cold calling program with 90-day pilot and clear pass/fail criteria",
                ],
              },
            ].map((phase, i) => (
              <motion.div
                key={phase.phase}
                {...stagger(i)}
                className="border border-border-subtle bg-bg-surface p-8 relative"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center bg-accent/10 border border-accent/20">
                    <phase.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest text-accent"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Phase {phase.phase}
                    </p>
                    <p className="text-xs text-text-muted">{phase.subtitle}</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">{phase.title}</h3>
                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTION DETAIL ===== */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label text-accent-dark">The Intelligence Engine</p>
            <h2
              className="mt-4 text-2xl text-text-on-light sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              24 AI triggers. 20+ states. Real-time precision.
            </h2>
            <p className="mt-4 text-base text-text-on-light-muted max-w-3xl">
              ClearForge&apos;s proprietary AI agents continuously scan market signals, score
              opportunities by relevance, and generate actionable playbooks — calibrated specifically
              to the client&apos;s product lines and geographic footprint.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Crosshair,
                title: "Capital Project Intelligence",
                stat: "37.6%",
                detail:
                  "Monitors FID announcements, EPC contract awards, FEED commencements, refinery turnarounds, and LNG terminal construction — capturing the earliest actionable signals for equipment procurement.",
              },
              {
                icon: Shield,
                title: "Specialized Solution Demand",
                stat: "30.2%",
                detail:
                  "Detects pharmaceutical facility expansions, water treatment projects, hydrogen infrastructure, food processing investments, and specialty chemical construction — niche industrial demand matched to specific capabilities.",
              },
              {
                icon: Activity,
                title: "Strategic Market Intelligence",
                stat: "12.9%",
                detail:
                  "Early-warning signals on competitor capacity changes, M&A activity, regulatory shifts, trade policy disruptions, and supply chain volatility — creating buy-domestic opportunities.",
              },
              {
                icon: Gauge,
                title: "Technology & Process Demand",
                stat: "19.3%",
                detail:
                  "Identifies EV and battery plant construction, robotics adoption, machine vision systems, production line modernization, and conveyor automation — cross-category triggers surfacing multi-signal opportunities.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...stagger(i)}
                className="border border-border-light bg-white p-6 flex gap-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent/10">
                  <item.icon className="h-6 w-6 text-accent-dark" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-text-on-light">{item.title}</h3>
                    <span
                      className="text-sm font-bold text-accent-dark"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.stat}
                    </span>
                  </div>
                  <p className="text-sm text-text-on-light-muted leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SIGHTFORGE PLATFORM ===== */}
      <section className="bg-bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label">The Platform</p>
            <h2
              className="mt-4 text-2xl text-text-primary sm:text-3xl lg:text-4xl max-w-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              We didn&apos;t just find opportunities. We built the system to act on them.
            </h2>
            <p className="mt-4 text-base text-text-secondary max-w-3xl">
              SightForge is a purpose-built sales intelligence dashboard — deployed on a dedicated
              subdomain for the client&apos;s sales team. It transforms AI-generated intelligence
              into structured, accountable sales execution.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Kanban,
                title: "Pipeline Management",
                items: [
                  "Dual-view: Table + Kanban",
                  "Advanced filtering by territory, group, and score",
                  "Saved views and command palette (Cmd+K)",
                  "Drag-and-drop stage progression",
                ],
              },
              {
                icon: BookOpen,
                title: "AI Sales Playbooks",
                items: [
                  "Auto-generated per opportunity",
                  "Entry strategy + competitive analysis",
                  "1–5 star feedback across 4 dimensions",
                  "Rich HTML with annotations",
                ],
              },
              {
                icon: UserCheck,
                title: "Contact Intelligence",
                items: [
                  "Multi-source enrichment (Apollo, LeadMagic)",
                  "Email, phone, LinkedIn for decision-makers",
                  "One-click outreach actions",
                  "Decision-maker hierarchy mapping",
                ],
              },
              {
                icon: LineChart,
                title: "Metrics & Analytics",
                items: [
                  "Discovery quality tracking",
                  "Playbook effectiveness ratings",
                  "Override tracking (AI vs. human)",
                  "Win rate and days-to-close dashboards",
                ],
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                {...stagger(i)}
                className="border border-border-subtle bg-bg-surface p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-accent/10 border border-accent/20 mb-4">
                  <pillar.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-3">{pillar.title}</h3>
                <ul className="space-y-2">
                  {pillar.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS DEEP DIVE ===== */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label text-accent-dark">The Results</p>
            <h2
              className="mt-4 text-2xl text-text-on-light sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Six months. Three divisions. Exponential compounding.
            </h2>
          </motion.div>

          <div className="mt-12 space-y-6">
            {[
              {
                metric: "1,181",
                label: "Qualified Opportunities",
                detail:
                  "Across Pressure Vessel (954), Automation (123), and Data Center (50) — each scored, enriched, and matched to the client's specific product capabilities. The top 10 opportunities alone represent over $20 billion in combined capital investment.",
              },
              {
                metric: "99.8%",
                label: "Match Rate",
                detail:
                  "Only 2 of 1,181 identified opportunities fell outside the client's addressable market. ClearForge's proprietary targeting models are calibrated to the client's exact product lines, geographies, and industrial verticals — not generic industry data.",
              },
              {
                metric: "32x",
                label: "Monthly Scaling",
                detail:
                  "The system ramped from 19 opportunities in October to 613 at peak in December — a 32x increase as the AI models learned the client's market. After seasonal adjustment in January, the system rebounded and continues to grow.",
              },
              {
                metric: "631+",
                label: "Sales Playbooks Generated",
                detail:
                  "Each playbook includes an executive summary, entry strategy, key talking points, competitive analysis, and risk assessment — tailored to the specific opportunity, vertical, and buyer persona. Not templates. Custom intelligence.",
              },
            ].map((result, i) => (
              <motion.div
                key={result.label}
                {...stagger(i)}
                className="flex flex-col sm:flex-row items-start gap-6 p-6 border border-border-light bg-white"
              >
                <div className="sm:w-32 shrink-0 text-center sm:text-right">
                  <div
                    className="text-3xl font-bold text-accent-dark lg:text-4xl"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {result.metric}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-text-on-light-muted mt-1">
                    {result.label}
                  </p>
                </div>
                <div className="border-l border-border-light pl-6">
                  <p className="text-sm text-text-on-light-sub leading-relaxed">{result.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTINUOUS MODEL ===== */}
      {cs.continuousModel && (
        <section className="bg-bg-deep py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div {...fadeUp}>
              <p className="section-label">Continuous Intelligence</p>
              <h2
                className="mt-4 text-2xl text-text-primary sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The system gets exponentially smarter every month.
              </h2>
              <p className="mt-4 text-base text-text-secondary max-w-3xl">
                ClearForge&apos;s AI agents don&apos;t just execute — they learn. Every market
                signal processed, every opportunity scored, and every playbook rated feeds back into
                the intelligence model.
              </p>
              <div className="mt-10 space-y-4">
                {cs.continuousModel.map((item, i) => {
                  const icons = [RefreshCw, TrendingUp, Zap, Send];
                  const Icon = icons[i % icons.length];
                  return (
                    <motion.div
                      key={i}
                      {...stagger(i)}
                      className="flex items-start gap-4 border border-border-subtle bg-bg-surface p-6"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10 border border-accent/20">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <p className="text-base text-text-secondary leading-relaxed">{item}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== WHAT'S NEXT — EXPANSION ===== */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label text-accent-dark">What&apos;s Next</p>
            <h2
              className="mt-4 text-2xl text-text-on-light sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Five additional divisions. Commercial model transformation. The intelligence compounds.
            </h2>
            <p className="mt-4 text-base text-text-on-light-muted max-w-3xl">
              The architecture built for the first three divisions transfers directly — new
              deployments accelerate faster than the last because the base model has already learned
              the client&apos;s market.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Roll Form Group",
                detail: "IIJA infrastructure creating demand for roll-formed steel products across highway, bridge, and transit construction",
                triggers: "8 trigger categories · 12 states",
              },
              {
                title: "Sierra Aluminum",
                detail: "Nearshoring wave driving demand for domestically sourced aluminum extrusions across automotive and construction",
                triggers: "6 trigger categories · 170+ buyers identified",
              },
              {
                title: "Advanced Fabrication",
                detail: "Direct architecture transfer from Pressure Vessel — capital projects and industrial demand triggers validated and ready",
                triggers: "10 trigger categories · 8 states",
              },
              {
                title: "Stainless Tubing",
                detail: "Pharmaceutical cleanroom and semiconductor fab construction creating demand for high-purity stainless systems",
                triggers: "5 trigger categories · 7 states",
              },
              {
                title: "Packaging Systems",
                detail: "E-commerce volume driving unprecedented demand for automated packaging equipment across fulfillment and pharma",
                triggers: "7 trigger categories · High-volume, short-cycle",
              },
              {
                title: "Commercial Model Redesign",
                detail: "Diagnostic-first approach to aligning sales structure, compensation, and AI tools to margin-focused growth across the enterprise",
                triggers: "Phase 1 diagnostic · 4–6 week engagement",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...stagger(i)}
                className="p-5 border border-border-light bg-white"
              >
                <h3 className="text-base font-semibold text-text-on-light">{item.title}</h3>
                <p className="mt-2 text-sm text-text-on-light-muted leading-relaxed">
                  {item.detail}
                </p>
                <p
                  className="mt-3 text-xs text-accent-dark font-medium"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.triggers}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCALE ===== */}
      <section className="bg-bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label">The Scale</p>
            <blockquote className="mt-6">
              <p
                className="text-xl text-text-primary leading-relaxed lg:text-2xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;What started as a two-division pilot became an enterprise-wide intelligence
                system in under six months — with a custom platform the sales team uses daily and a
                roadmap to transform the commercial model entirely.&rdquo;
              </p>
            </blockquote>
            <p className="mt-8 text-base text-text-secondary leading-relaxed">{cs.scale}</p>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-bg-deep py-20 lg:py-28 hero-glow">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label">Your Move</p>
            <h2
              className="mt-4 text-3xl text-text-primary sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              This is what ClearForge builds.
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Not slide decks. Not proofs of concept. Working intelligence systems that generate
              pipeline, enable sales teams, and compound over time. One conversation to find out what
              this looks like for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Request a Proposal</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/case-studies">
                  More Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
