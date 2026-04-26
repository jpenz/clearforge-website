import {
  ArrowRight,
  Activity,
  AlertTriangle,
  BarChart3,
  Beaker,
  BookOpen,
  Boxes,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  Car,
  CheckCircle,
  Code,
  Compass,
  DollarSign,
  Eye,
  FileSearch,
  FileText,
  Globe,
  HardHat,
  Headphones,
  Heart,
  Lightbulb,
  Map,
  Megaphone,
  Network,
  Package,
  Phone,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Stethoscope,
  Store,
  Tag,
  Target,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  Wrench,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { caseStudies } from '@/data/case-studies';
import { getIndustry, industries } from '@/data/industries-value-chains';
import type { ActivityType } from '@/data/industries-value-chains';
import { createMetadata } from '@/lib/metadata';

// ─────────────────────────────────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return createMetadata({ title: 'Industry — ClearForge', description: 'AI agents and automation by industry.', path: `/industries/${slug}` });

  return createMetadata({
    title: `AI Agents & Automation for ${industry.name} | ClearForge`,
    description: `${industry.oneLiner} ${industry.overview[0].slice(0, 120)}`,
    path: `/industries/${industry.slug}`,
    keywords: [
      `${industry.shortName.toLowerCase()} AI`,
      `${industry.shortName.toLowerCase()} automation`,
      `AI agents ${industry.shortName.toLowerCase()}`,
      `${industry.shortName.toLowerCase()} value chain`,
    ],
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Icon registry — keeps the [slug] template simple while letting the data
// reference Lucide icons by string.
// ─────────────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity, AlertTriangle, BarChart3, Beaker, BookOpen, Boxes, Briefcase,
  Building2, Calculator, Calendar, Car, CheckCircle, Code, Compass,
  DollarSign, Eye, FileSearch, FileText, Globe, HardHat, Headphones,
  Heart, Lightbulb, Map, Megaphone, Network, Package, Phone, Search,
  Settings, Shield, ShieldCheck, ShoppingBag, ShoppingCart, Stethoscope,
  Store, Tag, Target, TrendingUp, Truck, Users, Warehouse, Wrench, Zap,
};

const TYPE_LABEL: Record<ActivityType, string> = {
  automation: 'Workflow automation',
  agent: 'AI agent',
  model: 'Predictive model',
  copilot: 'Copilot',
};

const TYPE_BADGE_CLASS: Record<ActivityType, string> = {
  automation: 'border-divider text-warm-gray',
  agent: 'border-brass/40 text-brass',
  model: 'border-divider text-warm-gray',
  copilot: 'border-divider text-warm-gray',
};

// ─────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const caseStudy = industry.caseStudySlug ? caseStudies.find((c) => c.slug === industry.caseStudySlug) : undefined;

  // For "view all activities" total
  const totalActivities = industry.valueChain.reduce((acc, fn) => acc + fn.activities.length, 0);

  return (
    <>
      {/* ── Hero ── editorial two-column with optional video bg ── */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        {industry.videoBackground ? (
          <div className="absolute inset-0 pointer-events-none">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/abstract-network.webp"
              className="absolute inset-0 w-full h-full object-cover opacity-55"
            >
              <source src={industry.videoBackground} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-forge-black via-forge-black/50 to-forge-black/60" />
          </div>
        ) : (
          <>
            <Image
              src="/images/abstract-network.webp"
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover opacity-[0.22] pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />
          </>
        )}

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="overline">{industry.category}</p>
                <h1
                  className="mt-6 text-display max-w-3xl text-bone"
                  style={{ fontFamily: 'var(--font-instrument-serif)' }}
                >
                  AI Agents &amp; Automation for {industry.name}
                </h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-6 max-w-xl text-body-lg text-stone">{industry.hero}</p>
                <p className="mt-4 max-w-xl text-body text-stone">{industry.oneLiner}</p>
                <div className="mt-10">
                  <Button size="lg" asChild>
                    <Link href="/discover">
                      Get a Custom Value Chain <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right: market context stats */}
            <div className="mt-16 lg:col-span-5 lg:mt-0">
              <FadeIn delay={0.25}>
                <div className="border-l border-brass/40 pl-8 lg:pl-10">
                  <p className="overline text-brass-light text-[10px]">Market Context</p>
                  <ul className="mt-4 space-y-5">
                    {industry.marketContext.map((item) => (
                      <li key={item.label}>
                        <span
                          className="metric"
                          style={{
                            fontFamily: 'var(--font-jetbrains-mono, monospace)',
                            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                            color: 'var(--color-brass-light)',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {item.stat}
                        </span>
                        <p className="mt-1 text-body-sm text-stone max-w-xs">{item.label}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">Industry View</p>
              <h2 className="mt-6 text-display">Where AI changes the operating model.</h2>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0 space-y-6">
              {industry.overview.map((p) => (
                <p key={p} className="text-body-lg text-warm-gray">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE CHAIN ── the editorial centerpiece ── */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-end">
            <div className="lg:col-span-7">
              <p className="overline">{industry.shortName} Value Chain</p>
              <h2
                className="mt-6 text-display text-bone"
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
              >
                Every function. Every activity. Where AI fits.
              </h2>
              <p className="mt-6 max-w-2xl text-body-lg text-stone">
                The full operating value chain for {industry.shortName.toLowerCase()} — and the specific
                activities ClearForge automates or runs as AI agents inside each function.
                {totalActivities} addressable activities across {industry.valueChain.length} functions.
              </p>
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[11px] text-stone">
                <div className="flex items-center gap-2">
                  <span className="block h-px w-4 bg-brass" /> AI agent
                </div>
                <div className="flex items-center gap-2">
                  <span className="block h-px w-4 bg-stone" /> Predictive model
                </div>
                <div className="flex items-center gap-2">
                  <span className="block h-px w-4 bg-stone" /> Copilot
                </div>
                <div className="flex items-center gap-2">
                  <span className="block h-px w-4 bg-stone" /> Workflow automation
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-16 lg:space-y-24">
            {industry.valueChain.map((fn, i) => {
              const Icon = ICONS[fn.icon] ?? Settings;
              return (
                <div key={fn.function} className="border-t border-divider-dark pt-10">
                  <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Left: function header */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-3">
                        <span className="metric text-sm text-brass">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <Icon className="h-4 w-4 text-brass" />
                      </div>
                      <h3
                        className="mt-3 text-h2 text-bone"
                        style={{ fontFamily: 'var(--font-instrument-serif)' }}
                      >
                        {fn.function}
                      </h3>
                      <p className="mt-4 text-body text-stone max-w-md">{fn.description}</p>
                    </div>

                    {/* Right: activities — ruled-line list */}
                    <div className="mt-10 lg:col-span-8 lg:mt-0">
                      <ul className="divide-y divide-divider-dark">
                        {fn.activities.map((act) => (
                          <li key={act.name} className="py-6 lg:py-7">
                            <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2 lg:gap-6">
                              <h4 className="text-body-lg text-bone font-medium">{act.name}</h4>
                              <span
                                className={`shrink-0 inline-flex items-center text-[10px] uppercase tracking-widest border px-2 py-1 ${TYPE_BADGE_CLASS[act.type]}`}
                              >
                                {TYPE_LABEL[act.type]}
                              </span>
                            </div>
                            <p className="mt-3 text-body text-stone">{act.aiImpact}</p>
                            <p className="mt-2 text-body-sm text-brass-light font-medium">{act.impact}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Industry Challenges ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Industry Challenges</p>
          <h2 className="mt-6 text-display max-w-3xl">Where {industry.shortName.toLowerCase()} operators are losing margin today</h2>
          <Stagger className="mt-16 lg:grid lg:grid-cols-2 lg:gap-x-16" stagger={0.1}>
            {industry.challenges.map((ch) => (
              <StaggerItem key={ch.title} className="border-t border-divider py-10 lg:py-12">
                <div className="flex flex-1 flex-col">
                  <h3 className="text-h3">{ch.title}</h3>
                  <p className="mt-3 text-body text-warm-gray max-w-lg">{ch.description}</p>
                  <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                    <span className="metric text-2xl text-anthracite" style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}>
                      {ch.metric}
                    </span>
                    <span className="text-xs text-warm-gray leading-snug">{ch.metricLabel}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="border-t border-divider" />
        </div>
      </section>

      {/* ── Forge Method application ── */}
      <section className="bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">The Forge Method</p>
              <h2 className="mt-6 text-display">How ClearForge ships AI in {industry.shortName.toLowerCase()}.</h2>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">{industry.forgeApplication}</p>
              <div className="mt-10 grid grid-cols-3 gap-8 border-t border-divider pt-8">
                <div>
                  <p className="metric-lg text-brass">4 wks</p>
                  <p className="mt-2 text-body-sm text-warm-gray">Forge Diagnostic</p>
                </div>
                <div>
                  <p className="metric-lg text-brass">10 wks</p>
                  <p className="mt-2 text-body-sm text-warm-gray">Forge Sprint to production</p>
                </div>
                <div>
                  <p className="metric-lg text-brass">Ongoing</p>
                  <p className="mt-2 text-body-sm text-warm-gray">Forge Scale operating cadence</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/services">See Capabilities <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Linked case study (if present) ── */}
      {caseStudy && (
        <section className="border-t border-divider bg-parchment py-24 lg:py-40">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <p className="overline">Related Case Study</p>
            <Link
              href={`/case-studies/${caseStudy.slug}`}
              className="group block mt-6 lg:grid lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-8">
                <h3 className="text-h2 group-hover:text-brass transition-colors" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
                  {caseStudy.title}
                </h3>
                <p className="mt-4 text-body-lg text-warm-gray max-w-2xl">{caseStudy.excerpt}</p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-brass">
                  Read the case <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </div>
              <div className="mt-8 lg:col-span-4 lg:mt-0 lg:flex lg:items-end lg:justify-end">
                <div className="text-right">
                  <span
                    className="metric text-3xl text-brass"
                    style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
                  >
                    {caseStudy.heroMetric}
                  </span>
                  <p className="mt-1 text-body-sm text-warm-gray max-w-[200px] ml-auto">{caseStudy.heroMetricLabel}</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            Get a custom value chain for your business.
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            Forge Intelligence™ generates a personalized AI value chain from your website — every
            function, every activity, with the specific automations we&apos;d ship first.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Generate My Custom Value Chain <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/contact">Schedule a Confidential Discussion</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
