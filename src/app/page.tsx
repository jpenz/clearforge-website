import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { caseStudies } from "@/data/case-studies";
import { GSAPCounter } from "@/components/home/gsap-counter";
import { GSAPSectionReveal, StaggerRevealGSAP } from "@/components/home/gsap-section-reveal";
import { GSAPMarquee } from "@/components/home/gsap-marquee";
import { GSAPStatStrip } from "@/components/home/gsap-stat-strip";
import { GSAPPinnedPhases } from "@/components/home/gsap-pinned-phases";
import { AnalyzeVisual, SystemVisual, DashboardVisual } from "@/components/home/execution-visuals";

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

const phases = [
  { num: "01", title: "Prepare", description: "Set priorities, define ownership, baseline the metrics that matter." },
  { num: "02", title: "Modernize", description: "Redesign workflows and clean up data before layering AI." },
  { num: "03", title: "Build", description: "Deploy production AI agents with controls, governance, and KPI baselines." },
  { num: "04", title: "Scale", description: "Expand what works. Train teams. Build internal capability that compounds." },
];

const engines = [
  {
    title: "Growth Strategy Engine",
    subtitle: "Where to win",
    description: "Market intelligence and business strategy to identify where to grow, defend, and win first.",
    items: ["Map industry tailwinds and demand pockets", "Prioritize markets for profitable expansion", "Translate strategy into a 12-month growth plan"],
  },
  {
    title: "Performance Improvement Engine",
    subtitle: "How to win",
    description: "AI agents and workflow redesign to increase capacity, reduce friction, and run more efficiently.",
    items: ["Find bottlenecks across revenue, ops, and support", "Deploy human-plus-agent workflows with controls", "Build capability so improvements compound"],
  },
];

const executionSteps = [
  { phase: "Understand", title: "Find the value and name the real bottleneck", description: "We define growth goals, capture the pain in your language, and quantify where value is leaking." },
  { phase: "Build", title: "Redesign workflows and build controlled AI systems", description: "We build practical AI workflows with your operators. Working systems with owners, controls, and KPI baselines." },
  { phase: "Operate", title: "Run, optimize, and reinforce adoption", description: "We turn early wins into operating rhythm and reinforce execution discipline. Compounding gains." },
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
      {/* ═══ HERO — Full bleed, massive type, left-aligned ═══ */}
      <section className="relative min-h-[100vh] flex items-end overflow-hidden bg-bg-deep">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-network.png"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/70 to-bg-deep/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/80 via-transparent to-transparent" />
        </div>

        {/* Teal glow orb — atmospheric */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-8 lg:pb-28">
          <p className="section-label opacity-0 animate-fade-in-up">AI Strategy & Execution</p>

          <h1 className="mt-6 max-w-4xl text-[clamp(3.5rem,9vw,7rem)] leading-[0.92] tracking-tighter text-text-primary opacity-0 animate-fade-in-up delay-1">
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

      {/* ═══ STAT STRIP — Oversized, scroll-scrubbed ═══ */}
      <GSAPStatStrip
        className="bg-bg-primary"
        stats={[
          { value: "$4.4T", label: "AI market by 2030" },
          { value: "72%", label: "Stall at pilot stage" },
          { value: "3.2x", label: "Early mover margin advantage" },
          { value: "<10%", label: "Reach production" },
        ]}
      />

      {/* ═══ WHY AI STALLS — Light, asymmetric split ═══ */}
      <GSAPSectionReveal animation="slide-left">
        <section className="bg-bg-light py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-5">
                <p className="section-label text-accent-dark">Why AI Initiatives Stall</p>
                <h2 className="mt-4 text-[clamp(2.5rem,5vw,3.5rem)] text-text-on-light">
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

      {/* ═══ SOUND FAMILIAR — Dark, centered, atmospheric ═══ */}
      <GSAPSectionReveal animation="scale-up">
        <section className="bg-bg-deep py-28 lg:py-36 noise-texture relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
          {/* Scattered fragments — visual chaos before clarity */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
            <line x1="10%" y1="15%" x2="25%" y2="20%" stroke="rgba(0,229,195,0.06)" strokeWidth="1" />
            <line x1="70%" y1="10%" x2="85%" y2="18%" stroke="rgba(0,229,195,0.04)" strokeWidth="1" />
            <line x1="60%" y1="75%" x2="75%" y2="80%" stroke="rgba(0,229,195,0.05)" strokeWidth="1" />
            <line x1="5%" y1="60%" x2="18%" y2="55%" stroke="rgba(0,229,195,0.04)" strokeWidth="1" />
            <line x1="80%" y1="40%" x2="95%" y2="45%" stroke="rgba(0,229,195,0.06)" strokeWidth="1" />
            <line x1="30%" y1="85%" x2="45%" y2="90%" stroke="rgba(0,229,195,0.03)" strokeWidth="1" />
            <line x1="50%" y1="5%" x2="55%" y2="12%" stroke="rgba(0,229,195,0.05)" strokeWidth="1" />
            <line x1="15%" y1="40%" x2="22%" y2="35%" stroke="rgba(0,229,195,0.04)" strokeWidth="1" />
            <line x1="88%" y1="65%" x2="95%" y2="72%" stroke="rgba(0,229,195,0.03)" strokeWidth="1" />
          </svg>
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

      {/* ═══ MARQUEE ═══ */}
      <GSAPMarquee text="Prepare / Modernize / Build / Scale" className="bg-bg-primary" />

      {/* ═══ TRANSFORMATION MODEL — Light, pinned phases ═══ */}
      <section className="bg-bg-light py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="section-label text-accent-dark">Our Transformation Model</p>
          <h2 className="mt-4 max-w-4xl text-[clamp(2.5rem,5vw,3.5rem)] text-text-on-light">
            Modernize the business and the workforce&nbsp;together.
          </h2>

          <div className="mt-16">
            <GSAPPinnedPhases phases={phases} />
          </div>

          {/* People Track */}
          <div className="mt-16 border-l-2 border-accent pl-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-dark mb-4">
              People Capability Track — Every Phase
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                "Role-based AI skills training for leadership, managers, and frontline teams",
                "Human-plus-agent operating playbooks so adoption sticks",
                "Manager coaching and governance rhythm to reinforce behavior change",
              ].map((item) => (
                <p key={item} className="text-sm text-text-on-light-sub font-medium leading-relaxed">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DUAL ENGINE — Dark, split layout ═══ */}
      <GSAPSectionReveal animation="slide-right">
        <section className="bg-bg-deep py-28 lg:py-36 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/network-nodes.png"
              alt=""
              fill
              className="object-cover opacity-15"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-bg-deep via-bg-deep/90 to-bg-deep/70 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <p className="section-label">Two Engines, One Transformation</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,3.5rem)] text-text-primary">
              Find where you should grow.
            </h2>
            <p className="mt-3 text-xl text-text-secondary" style={{ fontFamily: "var(--font-heading)" }}>
              Then build the machine that gets you there.
            </p>

            {/* Engine visual */}
            <div className="mt-14 relative">
              <Image
                src="/images/dual-engines.png"
                alt="Two precision systems — strategy and execution — connected by teal energy"
                width={1344}
                height={768}
                className="w-full max-w-4xl mx-auto rounded-sm opacity-80"
              />
            </div>

            {/* Engine details — editorial split */}
            <div className="mt-16 grid gap-16 md:grid-cols-2">
              {engines.map((engine) => (
                <div key={engine.title}>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{engine.subtitle}</p>
                  <h3 className="mt-2 text-2xl text-text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                    {engine.title}
                  </h3>
                  <div className="mt-3 h-0.5 w-12 bg-accent/40" />
                  <p className="mt-4 text-base leading-relaxed text-text-secondary">{engine.description}</p>
                  <ul className="mt-6 space-y-3">
                    {engine.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                        <svg className="mt-1 h-4 w-4 shrink-0 text-accent" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </GSAPSectionReveal>

      {/* ═══ EXECUTION — Light, alternating left/right ═══ */}
      <section className="bg-bg-light py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <GSAPSectionReveal animation="clip-reveal">
            <div className="text-center mb-20">
              <p className="section-label text-accent-dark">How We Execute</p>
              <h2 className="mt-4 text-[clamp(2.5rem,5vw,3.5rem)] text-text-on-light">
                Understand. Build. Operate.
              </h2>
            </div>
          </GSAPSectionReveal>

          <div className="space-y-24 lg:space-y-32">
            {executionSteps.map((step, i) => {
              const Visual = [AnalyzeVisual, SystemVisual, DashboardVisual][i];
              const isOdd = i % 2 !== 0;
              return (
                <GSAPSectionReveal key={step.phase} animation={isOdd ? "slide-right" : "slide-left"}>
                  <div className={`lg:grid lg:grid-cols-12 lg:gap-16 items-center ${isOdd ? "lg:text-right" : ""}`}>
                    {/* Text column */}
                    <div className={`${isOdd ? "lg:col-start-7 lg:col-span-6 lg:order-2" : "lg:col-span-5"}`}>
                      <div className={`flex items-baseline gap-4 ${isOdd ? "lg:justify-end" : ""}`}>
                        <span className="metric text-3xl lg:text-5xl text-accent/30 font-bold">{String(i + 1).padStart(2, "0")}</span>
                        <p className="text-lg font-bold uppercase tracking-wider text-accent-dark" style={{ fontFamily: "var(--font-heading)" }}>
                          {step.phase}
                        </p>
                      </div>
                      <h3 className="mt-4 text-2xl lg:text-3xl text-text-on-light tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        {step.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-text-on-light-sub font-medium">
                        {step.description}
                      </p>
                    </div>
                    {/* Visual column */}
                    <div className={`mt-10 lg:mt-0 ${isOdd ? "lg:col-span-5 lg:order-1" : "lg:col-start-7 lg:col-span-6"}`}>
                      <div className="max-w-sm mx-auto lg:max-w-none">
                        <Visual />
                      </div>
                    </div>
                  </div>
                </GSAPSectionReveal>
              );
            })}
          </div>

          <GSAPSectionReveal animation="fade-up">
            <p className="mt-20 text-center text-2xl lg:text-3xl text-text-on-light tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              One partner accountable for the full transformation.
            </p>
          </GSAPSectionReveal>
        </div>
      </section>

      {/* ═══ RESULTS — Dark, big metrics ═══ */}
      {featured && (
        <GSAPSectionReveal animation="scale-up">
          <section className="bg-bg-deep py-28 lg:py-36 relative noise-texture">
            <div className="absolute inset-0 bg-bg-deep/90 pointer-events-none" />
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
              <p className="section-label">Results</p>
              <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3rem)] text-text-primary">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-base text-text-secondary">{featured.excerpt}</p>

              {/* Metrics — large, no boxes */}
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

      {/* ═══ ASSESSMENT CTA — Light, centered ═══ */}
      <GSAPSectionReveal animation="fade-up">
        <section className="bg-bg-light py-28 lg:py-36 relative overflow-hidden">
          {/* Subtle contour map background — "your terrain awaits" */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
            <path d="M -5%,85% Q 20%,75% 40%,80% Q 60%,85% 80%,78% Q 100%,70% 105%,75%" fill="none" stroke="rgba(5,158,135,0.06)" strokeWidth="1" />
            <path d="M -5%,70% Q 25%,60% 45%,68% Q 65%,75% 85%,65% Q 100%,55% 105%,60%" fill="none" stroke="rgba(5,158,135,0.05)" strokeWidth="1" />
            <path d="M -5%,55% Q 30%,45% 50%,52% Q 70%,60% 90%,48% Q 105%,38% 110%,42%" fill="none" stroke="rgba(5,158,135,0.04)" strokeWidth="1" />
            <path d="M -5%,40% Q 35%,30% 55%,38% Q 75%,45% 95%,32% Q 105%,22% 110%,28%" fill="none" stroke="rgba(5,158,135,0.03)" strokeWidth="1" />
          </svg>
          <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center">
              <p className="section-label text-accent-dark">Free AI Readiness Report</p>
              <h2 className="mt-4 text-[clamp(2.5rem,5vw,3.5rem)] text-text-on-light">
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

      {/* ═══ MARQUEE ═══ */}
      <GSAPMarquee text="Understand / Build / Operate" className="bg-bg-primary" />

      {/* ═══ OBJECTIONS — Dark, asymmetric ═══ */}
      <GSAPSectionReveal animation="slide-right">
        <section className="bg-bg-deep py-28 lg:py-36 noise-texture relative">
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

      {/* ═══ FINAL CTA — Light, centered ═══ */}
      <section className="bg-bg-light py-28 lg:py-36 relative overflow-hidden">
        {/* Lighthouse beam — pointing toward the viewer / CTAs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          <defs>
            <linearGradient id="ctaBeam" x1="1" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#059E87" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#059E87" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="100%,0% 40%,65% 60%,65% 100%,5%" fill="url(#ctaBeam)" />
        </svg>
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center lg:px-8">
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] text-text-on-light">
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
