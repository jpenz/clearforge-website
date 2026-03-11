"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getCaseStudy } from "@/data/case-studies";
import { CaseStudyScrollStory } from "./case-study-scroll-story";
import { ArrowLeft, ArrowRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function IndustrialManufacturerPage() {
  const cs = getCaseStudy("industrial-manufacturer")!;

  return (
    <>
      {/* ===== INTRO ===== */}
      <section className="relative bg-bg-deep pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-30" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 z-10">
          <motion.div {...fadeUp}>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" /> All Case Studies
            </Link>
            <p className="section-label mb-6">Case Study</p>
            <h1
              className="text-3xl text-text-primary sm:text-4xl lg:text-5xl xl:text-[3.5rem] max-w-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              A multi-billion dollar enterprise deployed AI across its
              commercial organization — and built the growth engine
              it never had.
            </h1>
            <p className="mt-8 text-lg text-text-secondary max-w-2xl leading-relaxed lg:text-xl">
              Multiple divisions. Decades of market leadership. No shared intelligence,
              no unified pipeline, and no system to find revenue growth hiding across
              the portfolio. ClearForge changed that in six months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SCROLL-DRIVEN STORY ANIMATION ===== */}
      <CaseStudyScrollStory />

      {/* ===== METRICS ===== */}
      <section className="bg-bg-deep py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label mb-6">The Numbers</p>
          </motion.div>

          <div className="space-y-20 mt-12">
            {[
              {
                metric: "1,181",
                label: "qualified opportunities identified in six months",
                body: "Each one scored, enriched, and matched to the client\u2019s actual capabilities. Not scraped leads. Not bought lists. AI-discovered, precision-matched revenue opportunities the sales team had never seen.",
              },
              {
                metric: "99.8%",
                label: "match rate to addressable market",
                body: "Two mismatches out of 1,181. The intelligence model was calibrated to the client\u2019s exact product lines, geographies, and verticals \u2014 not generic industry data. Precision that sales teams trust.",
              },
              {
                metric: "32x",
                label: "ramp in monthly pipeline velocity",
                body: "From 19 opportunities in month one to 613 at peak. The system learned the market as it ran \u2014 every signal processed, every score refined, every trigger sharpened. Compounding, not linear.",
              },
              {
                metric: "631+",
                label: "AI-generated sales playbooks",
                body: "Custom intelligence for every opportunity. Entry strategies, competitive positioning, key talking points, risk assessments \u2014 briefs a rep can act on in minutes. Not templates. Not decks. Working intelligence.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    className="text-5xl lg:text-7xl font-bold text-accent"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.metric}
                  </span>
                  <span className="text-base lg:text-lg text-text-secondary">
                    {item.label}
                  </span>
                </div>
                <p className="text-base text-text-muted max-w-2xl leading-relaxed pl-1">
                  {item.body}
                </p>
                {i < 3 && (
                  <div className="mt-16 h-px bg-gradient-to-r from-border-subtle via-border-subtle/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE CHALLENGE — narrative, no cards ===== */}
      <section className="bg-bg-light py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label text-accent-dark mb-6">The Starting Point</p>
            <h2
              className="text-2xl text-text-on-light sm:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Growth was there. The system to find it wasn&apos;t.
            </h2>
            <div className="mt-10 space-y-6 text-base text-text-on-light-sub leading-[1.8]">
              <p>
                The organization had operated for decades on relationships and reputation.
                Each group ran its own sales motion — different tools, different processes,
                different definitions of a qualified lead. There was no shared view of where
                capital was flowing, which accounts were under-served, or where the real white
                space existed across the portfolio.
              </p>
              <p>
                Prospecting was manual and untethered from what the business actually sells.
                Cross-division opportunities were invisible. The commercial model hadn&apos;t
                evolved even as the market, the tools, and buyer behavior had fundamentally changed.
              </p>
              <p>
                Leadership knew the growth was there. They needed a system to surface it,
                a platform to act on it, and an operating model that could scale without
                adding headcount.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW WE WORK — narrative flow, no cards ===== */}
      <section className="bg-bg-deep py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label mb-6">How It Works</p>
            <h2
              className="text-2xl text-text-primary sm:text-3xl lg:text-4xl mb-16"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              AI agents do the work. Your team orchestrates the growth.
            </h2>
          </motion.div>

          {/* Phase by phase — large type, no boxes */}
          <div className="space-y-24">
            <motion.div {...fadeUp}>
              <p
                className="text-xs uppercase tracking-[0.2em] text-accent mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Intelligence Engine
              </p>
              <h3
                className="text-xl text-text-primary sm:text-2xl lg:text-3xl mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Proprietary AI agents scan the market continuously.
              </h3>
              <p className="text-base text-text-secondary leading-[1.8] max-w-2xl">
                Calibrated to the client&apos;s exact capabilities, the agents monitor
                capital projects, demand signals, and competitive movements across
                20+ states. Every opportunity is scored, enriched, and matched in
                real time. The model gets sharper with every signal it processes.
              </p>
            </motion.div>

            <motion.div {...fadeUp}>
              <p
                className="text-xs uppercase tracking-[0.2em] text-accent mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Sales Execution Platform
              </p>
              <h3
                className="text-xl text-text-primary sm:text-2xl lg:text-3xl mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A purpose-built platform your team uses every day.
              </h3>
              <p className="text-base text-text-secondary leading-[1.8] max-w-2xl">
                Pipeline management, AI-generated playbooks, automated contact
                discovery, performance analytics — deployed on a dedicated instance
                for the client&apos;s sales organization. Not a dashboard they log into
                once. A system they run their business from. Structured feedback loops
                ensure every interaction makes the AI smarter.
              </p>
            </motion.div>

            <motion.div {...fadeUp}>
              <p
                className="text-xs uppercase tracking-[0.2em] text-accent mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Commercial Model Design
              </p>
              <h3
                className="text-xl text-text-primary sm:text-2xl lg:text-3xl mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Then we redesign the commercial engine around the intelligence.
              </h3>
              <p className="text-base text-text-secondary leading-[1.8] max-w-2xl">
                Diagnostic-first. Revenue assessment, account segmentation by margin
                contribution, role architecture aligned to where the growth is. The AI
                tells you where to aim. The commercial model ensures the organization
                is structured to get there. No guessing. No adding bodies. Just precision.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== THE LOOP — continuous intelligence ===== */}
      <section className="bg-bg-light py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label text-accent-dark mb-6">The Compounding Loop</p>
            <h2
              className="text-2xl text-text-on-light sm:text-3xl lg:text-4xl mb-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The system doesn&apos;t plateau. It compounds.
            </h2>
            <div className="space-y-6 text-base text-text-on-light-sub leading-[1.8]">
              <p>
                AI agents monitor thousands of market signals daily. Every closed-won
                and closed-lost data point refines the scoring model. Precision compounds
                month over month.
              </p>
              <p>
                New territories and groups are added continuously. The intelligence
                architecture scales horizontally — each deployment accelerates faster
                than the last because the base model has already learned the market.
              </p>
              <p>
                Structured feedback on every playbook creates a closed-loop system.
                Sales reps rate quality across four dimensions. The AI improves automatically.
                Market shifts are captured within hours, not weeks — ensuring the team
                always has first-mover advantage.
              </p>
              <p className="text-text-on-light font-medium">
                By month twelve, the precision and coverage will be fundamentally
                different from month one. That&apos;s the design.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SCALE — full-bleed quote ===== */}
      <section className="bg-bg-deep py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <blockquote>
              <p
                className="text-2xl text-text-primary leading-[1.4] lg:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;What started as a pilot across a few groups became an
                enterprise-wide intelligence system in under six months — with a
                custom platform the sales team uses daily, a pipeline that didn&apos;t
                exist before, and a roadmap to transform the commercial model
                entirely.&rdquo;
              </p>
            </blockquote>
            <p className="mt-10 text-base text-text-secondary leading-relaxed max-w-3xl">
              The architecture now covers multiple groups with over a thousand active
              opportunities — and additional divisions ready for deployment. The system
              gets exponentially smarter every month. ClearForge is now designing a
              commercial model transformation to align the client&apos;s sales structure,
              compensation, and coverage model to the intelligence the AI is generating.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-bg-deep py-24 lg:py-32 hero-glow">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.div {...fadeUp}>
            <p className="section-label mb-6">Your Move</p>
            <h2
              className="text-3xl text-text-primary sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              This is what ClearForge builds.
            </h2>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Not slide decks. Not proofs of concept. Working intelligence systems
              that generate pipeline, enable sales teams, and compound over time.
              One conversation to find out what this looks like for your business.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
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
