import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { caseStudies } from "@/data/case-studies";
import { GSAPCounter } from "@/components/home/gsap-counter";
import { GSAPSectionReveal, StaggerRevealGSAP } from "@/components/home/gsap-section-reveal";
import { GSAPStatStrip } from "@/components/home/gsap-stat-strip";
import { HeroCanvas } from "@/components/home/hero-canvas";
import { TransformationAssembly } from "@/components/home/transformation-assembly";

export const metadata = createMetadata({
  title: "ClearForge — AI Strategy & Execution for Mid-Market Companies",
  description:
    "We find where AI should drive growth, build the systems that get you there, and get your people to actually use them. Strategy through production — one partner, no handoffs.",
  path: "",
  keywords: ["AI strategy", "AI execution", "mid-market AI consulting", "AI agents", "PE value creation"],
});

/* ── Data ── */

const stallReasons = [
  { title: "Pilots that never scale", description: "Teams run isolated experiments disconnected from operations. Value stays trapped in demos." },
  { title: "Strategy-execution gap", description: "One partner writes the plan, another attempts delivery. Value is lost in the handoff." },
  { title: "Tech without workforce change", description: "Systems launch but teams aren't prepared. Adoption stalls because people were an afterthought." },
];

const pastAttempts = [
  "You hired a consultancy. They left you with slides.",
  "You tried building internally. Your best engineers are still figuring out infrastructure.",
  "You bought a platform. Adoption peaked at 15%.",
  "Or you haven't started — because nobody could tell you where to begin.",
];

const methodologyPhases = [
  {
    num: "01",
    title: "Find the growth and name the real bottleneck",
    subtitle: "Understand",
    description: "We define growth goals, map your value chain, and quantify where value is leaking — so every decision starts with evidence, not assumptions.",
    details: [
      "Map revenue, operations, and support workflows end to end",
      "Identify AI opportunities tied to clear business metrics",
      "Benchmark readiness across data, technology, and people",
      "Deliver a prioritized action plan with owners and timelines",
    ],
  },
  {
    num: "02",
    title: "Redesign workflows and deploy controlled AI systems",
    subtitle: "Build",
    description: "We build practical AI agents with your operators — working systems with owners, governance, and KPI baselines. Not proofs of concept. Production systems.",
    details: [
      "Redesign workflows before layering AI on top",
      "Deploy AI agents with human-in-the-loop controls",
      "Build dashboards and execution platforms your team uses daily",
      "Establish KPI baselines and feedback loops from day one",
    ],
  },
  {
    num: "03",
    title: "Run, optimize, and reinforce adoption",
    subtitle: "Operate",
    description: "We turn early wins into operating rhythm, train teams on human-plus-agent workflows, and expand what works. Compounding gains, not one-off projects.",
    details: [
      "Managed operations with continuous optimization",
      "Role-based AI training for leadership and frontline teams",
      "Expand proven systems to new divisions and use cases",
      "The system gets smarter every month — compounding precision",
    ],
  },
];

const objections = [
  { q: "We're not big enough for this.", a: "We work with $5M-$500M companies. AI advantage matters more at your scale — you don't have a 50-person data science team. That's exactly why we exist." },
  { q: "We tried AI and it didn't work.", a: "It probably wasn't tied to a business metric. Every system we deploy is measured against revenue, cost, or throughput." },
  { q: "This sounds expensive.", a: "A strategy engagement starts in the low five figures. The real question is what it costs to wait 12 more months." },
  { q: "We don't have the right data.", a: "Almost nobody does at first. That's literally step one. If you had perfect data infrastructure, you wouldn't need us." },
];

export default function Home() {
  const featured = caseStudies.find((cs) => cs.slug === "industrial-manufacturer");

  return (
    <>
      {/* ═══ HERO — Interactive canvas, chaos-to-order ═══ */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-bg-deep">
        <HeroCanvas />

        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-40 lg:px-8 lg:pb-28">
          <p className="section-label opacity-0 animate-fade-in-up">AI Strategy & Execution</p>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,9vw,7rem)] leading-[0.92] tracking-tighter text-text-primary opacity-0 animate-fade-in-up delay-1">
            Find the growth.{" "}
            <em className="accent-gradient-text not-italic">Build the machine.</em>
          </h1>

          <div className="mt-10 max-w-lg opacity-0 animate-fade-in-up delay-2">
            <p className="text-lg leading-relaxed text-text-secondary">
              We find where AI drives growth, build the systems,
              and get your people to actually use them.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 opacity-0 animate-fade-in-up delay-3">
            <Button size="lg" asChild>
              <Link href="/assessment">Get Your AI Readiness Score</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Request a Proposal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ STAT STRIP ═══ */}
      <GSAPStatStrip
        className="bg-bg-primary"
        stats={[
          { value: "$4.4T", label: "AI market by 2030" },
          { value: "72%", label: "Stall at pilot stage" },
          { value: "3.2x", label: "Early mover margin advantage" },
          { value: "<10%", label: "Reach production" },
        ]}
      />

      {/* ═══ WHY AI STALLS — The Core Problem ═══ */}
      <GSAPSectionReveal animation="slide-left">
        <section className="bg-bg-light py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-5">
                <p className="section-label text-accent-dark">Why AI Initiatives Stall</p>
                <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] text-text-on-light">
                  Most programs don&apos;t fail because of the&nbsp;models.
                </h2>
              </div>

              <StaggerRevealGSAP className="lg:col-span-7 mt-14 lg:mt-0 space-y-10" stagger={0.12}>
                {stallReasons.map((r, i) => (
                  <div key={r.title} className="flex items-baseline gap-6">
                    <span className="metric text-sm text-accent-dark shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-xl font-bold text-text-on-light" style={{ fontFamily: "var(--font-heading)" }}>
                        {r.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-text-on-light-sub font-medium">{r.description}</p>
                    </div>
                  </div>
                ))}
                <p className="text-lg font-semibold text-accent-dark mt-6 border-l-2 border-accent pl-6">
                  Disconnected execution turns promising pilots into expensive programs that never ship.
                </p>
              </StaggerRevealGSAP>
            </div>
          </div>
        </section>
      </GSAPSectionReveal>

      {/* ═══ SOUND FAMILIAR — What You've Already Tried ═══ */}
      <GSAPSectionReveal animation="scale-up">
        <section className="bg-bg-deep py-20 lg:py-32 noise-texture relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-2xl px-6 lg:px-8">
            <p className="section-label">Sound Familiar?</p>
            <div className="mt-10 space-y-8">
              {pastAttempts.map((attempt, i) => (
                <p
                  key={attempt}
                  className="text-xl leading-snug text-text-secondary"
                  style={{ fontFamily: "var(--font-heading)", opacity: 1 - i * 0.12 }}
                >
                  {attempt}
                </p>
              ))}
            </div>
            <div className="mt-14 gradient-divider" />
            <p className="mt-10 text-[clamp(1.5rem,4vw,2.25rem)] text-text-primary leading-tight tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              The problem was never the technology.
            </p>
            <p className="mt-3 text-base text-text-muted">
              It was the gap between strategy and execution — and forgetting
              that people have to actually change how they work.
            </p>
          </div>
        </section>
      </GSAPSectionReveal>

      {/* ═══ HOW WE WORK — Section header ═══ */}
      <GSAPSectionReveal animation="fade-up">
        <section className="bg-bg-deep pt-20 pb-10 lg:pt-32 lg:pb-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="section-label">How We Work</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-text-primary">
              Strategy through production.{" "}
              <span className="text-text-muted">One partner, no handoffs.</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl">
              Every engagement follows three phases — each with clear owners,
              measurable outcomes, and the same team from start to finish.
            </p>
          </div>
        </section>
      </GSAPSectionReveal>

      {/* ═══ METHODOLOGY — Scroll-driven assembly (Understand → Build → Operate) ═══ */}
      <TransformationAssembly phases={methodologyPhases} />

      {/* ═══ PEOPLE CAPABILITY — Accent callout ═══ */}
      <section className="bg-bg-deep py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="border-l-2 border-accent pl-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
              People Capability — Every Phase
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              Role-based AI training for leadership and frontline teams.
              Human-plus-agent operating playbooks so adoption sticks.
              Manager coaching and governance rhythm to reinforce behavior change.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ RESULTS — Case study proof ═══ */}
      {featured && (
        <GSAPSectionReveal animation="scale-up">
          <section className="bg-bg-deep py-20 lg:py-32 relative noise-texture overflow-hidden">
            <Image src="/images/abstract-network.png" alt="" fill className="object-cover opacity-15" />
            <div className="absolute inset-0 bg-bg-deep/85 pointer-events-none" />
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
              <p className="section-label">Results</p>
              <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3rem)] text-text-primary">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-base text-text-secondary">{featured.excerpt}</p>

              <div className="mt-14 grid grid-cols-2 gap-10 lg:grid-cols-4">
                {featured.outcomes.slice(0, 4).map((o) => (
                  <div key={o.description}>
                    <GSAPCounter value={o.metric} className="metric text-[clamp(2.5rem,5vw,4rem)] font-bold" />
                    <p className="mt-2 text-sm text-text-muted">{o.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button variant="secondary" asChild>
                  <Link href={`/case-studies/${featured.slug}`}>
                    Read the Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </GSAPSectionReveal>
      )}

      {/* ═══ ASSESSMENT CTA ═══ */}
      <GSAPSectionReveal animation="fade-up">
        <section className="bg-bg-light py-20 lg:py-32 relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 800" preserveAspectRatio="none" aria-hidden>
            <path d="M -72,680 Q 288,600 576,640 Q 864,680 1152,624 Q 1440,560 1512,600" fill="none" stroke="rgba(5,158,135,0.06)" strokeWidth="1" />
            <path d="M -72,560 Q 360,480 648,544 Q 936,600 1224,520 Q 1440,440 1512,480" fill="none" stroke="rgba(5,158,135,0.05)" strokeWidth="1" />
            <path d="M -72,440 Q 432,360 720,416 Q 1008,480 1296,384 Q 1512,304 1584,336" fill="none" stroke="rgba(5,158,135,0.04)" strokeWidth="1" />
          </svg>
          <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center">
              <p className="section-label text-accent-dark">Free AI Readiness Report</p>
              <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] text-text-on-light">
                Find out where you stand — and where to focus first.
              </h2>
              <p className="mt-6 text-lg text-text-on-light-sub font-medium">
                20 questions. 5 minutes. Get a customized AI readiness report
                with a prioritized action plan for your business.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Benchmark your readiness", description: "See how your AI maturity compares across strategy, data, technology, and people." },
                { title: "Get a prioritized plan", description: "We score each dimension and show you exactly where to focus for maximum impact." },
                { title: "No commitment required", description: "It's free. No sales call needed. Just clarity on where you are and where to go." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-bold text-text-on-light" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-on-light-sub font-medium leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link href="/assessment">
                  Get Your AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </GSAPSectionReveal>

      {/* ═══ OBJECTIONS — Concerns and How to Handle Them ═══ */}
      <GSAPSectionReveal animation="slide-right">
        <section className="bg-bg-deep py-20 lg:py-32 noise-texture relative">
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-4">
                <p className="section-label">Honest Answers</p>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] text-text-primary">
                  Questions we get in every first&nbsp;call.
                </h2>
              </div>

              <div className="lg:col-span-8 mt-12 lg:mt-0 space-y-0">
                {objections.map((o, i) => (
                  <div key={o.q}>
                    <div className="py-8">
                      <p className="text-xl text-text-primary leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                        &ldquo;{o.q}&rdquo;
                      </p>
                      <p className="mt-3 text-base leading-relaxed text-text-secondary">{o.a}</p>
                    </div>
                    {i < objections.length - 1 && <div className="gradient-divider" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </GSAPSectionReveal>

      {/* ═══ FINAL CTA — Recommended Next Decision ═══ */}
      <section className="bg-bg-light py-20 lg:py-32 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 800" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="ctaBeam" x1="1" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#059E87" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#059E87" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="1440,0 576,520 864,520 1440,40" fill="url(#ctaBeam)" />
        </svg>
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] text-text-on-light">
            One conversation to find&nbsp;out.
          </h2>
          <p className="mt-6 text-base text-text-on-light-sub font-medium">
            Tell us about your business. We&apos;ll be honest about whether we
            can help — and if so, how.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-8 text-sm text-text-on-light-muted">
            <span><strong className="text-accent-dark">01</strong> — We listen</span>
            <span><strong className="text-accent-dark">02</strong> — We&apos;re honest about fit</span>
            <span><strong className="text-accent-dark">03</strong> — We scope it</span>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Request a Proposal</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border-light text-text-on-light hover:bg-bg-light-alt hover:text-text-on-light" asChild>
              <Link href="mailto:james@clearforge.ai">Email Us Directly</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
