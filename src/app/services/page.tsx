import { ArrowRight, Factory, Landmark, HeartPulse, Code2, Briefcase, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { forgeProducts } from '@/data/forge-products';
import { services } from '@/data/services';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'The Forge Method — How We Build | ClearForge',
  description:
    'Three named products with transparent pricing. Forge Diagnostic, Forge Sprint, and Forge Scale — built for mid-market and growth-stage companies.',
  path: '/services',
});

const industries = [
  {
    icon: Factory,
    name: 'Manufacturing',
    problem: 'Manual quoting, siloed sales data, and blind spots across divisions',
    outcome: '1,181 qualified opportunities identified in 6 months',
    href: '/industries/manufacturing',
  },
  {
    icon: Landmark,
    name: 'Financial Services',
    problem: 'Compliance bottlenecks and manual document processing drain margin',
    outcome: '95% reduction in processing errors with automated workflows',
    href: '/industries/financial-services',
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    problem: 'Revenue cycle leakage and administrative burden on clinical staff',
    outcome: '40% reduction in claim processing time',
    href: '/industries/healthcare',
  },
  {
    icon: Code2,
    name: 'SaaS',
    problem: 'Scaling customer success and support without scaling headcount',
    outcome: '80% of workflow steps automated with custom AI agents',
    href: '/industries/saas',
  },
  {
    icon: Briefcase,
    name: 'PE Portfolio',
    problem: 'No shared framework to identify AI value levers across portfolio companies',
    outcome: '10% average EBITDA lift within 90-day sprint cycles',
    href: '/industries/private-equity',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* — Hero with atmospheric bg — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <Image
          src="/images/abstract-forge-progression.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.22] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeIn>
            <p className="overline">How We Work</p>
            <h1
              className="mt-6 text-display max-w-3xl text-bone"
              style={{ fontFamily: 'var(--font-instrument-serif)' }}
            >
              The Forge Method™
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-xl text-body-lg text-stone">
              Three named products. Transparent pricing. Built for mid-market
              and growth-stage companies who need AI that works in production
              — not a strategy deck that sits in a drawer.
            </p>
            <p className="mt-4 max-w-xl text-body text-stone">
              We build, we ship, we deploy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* — Three Forge Products — editorial ruled-line — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Named Products</p>
          <h2 className="mt-6 text-display max-w-2xl">
            Three engagements. One accountable team.
          </h2>

          <Stagger className="mt-16" stagger={0.12}>
            {forgeProducts.map((product, i) => (
              <StaggerItem key={product.name}>
                <div
                  className={`relative border-t border-divider py-12 lg:py-16 ${
                    product.featured
                      ? 'bg-brass/[0.03] -mx-6 px-6 lg:-mx-10 lg:px-10'
                      : ''
                  }`}
                >
                  <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Left: number, name, price, timeline */}
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3">
                        <span className="metric text-sm text-brass">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {product.featured && (
                          <span className="overline text-[10px]">Most chosen</span>
                        )}
                      </div>
                      <h3
                        className="mt-3"
                        style={{
                          fontFamily: 'var(--font-instrument-serif)',
                          fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                          lineHeight: 1.08,
                          letterSpacing: '-0.02em',
                          fontWeight: 400,
                        }}
                      >
                        {product.name}
                      </h3>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span
                          className="metric text-3xl text-anthracite"
                          style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
                        >
                          {product.price}
                        </span>
                        <span className="text-body-sm text-warm-gray">
                          {product.period}
                        </span>
                      </div>
                      <p className="mt-1 text-body-sm text-warm-gray">
                        {product.timeline}
                      </p>
                    </div>

                    {/* Right: description, included list, CTA */}
                    <div className="mt-8 lg:col-span-7 lg:mt-0">
                      <p className="text-body-lg text-warm-gray">
                        {product.description}
                      </p>
                      <ul className="mt-8 space-y-3">
                        {product.whatsIncluded.slice(0, 5).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-body-sm text-anthracite"
                          >
                            <span className="mt-[0.7em] h-px w-3 bg-brass shrink-0" />
                            <span className="flex-1 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <Button
                          variant={product.featured ? 'default' : 'secondary'}
                          size="lg"
                          asChild
                        >
                          <Link href={product.href}>
                            {product.cta} <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="border-t border-divider" />
        </div>
      </section>

      {/* — Industry Focus — */}
      <section className="border-t border-divider bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Industry Focus</p>
          <h2 className="mt-6 text-display max-w-2xl">
            We solve specific problems in specific industries.
          </h2>

          <Stagger className="mt-16" stagger={0.08}>
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
              <StaggerItem key={ind.name}>
                <Link
                  href={ind.href}
                  className="group block border-t border-divider py-8 sm:py-10"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <Icon className="h-5 w-5 text-brass shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-h3 group-hover:text-brass transition-colors duration-300">
                          {ind.name}
                        </h3>
                        <p className="mt-2 text-body text-warm-gray max-w-md">
                          {ind.problem}
                        </p>
                        <p className="mt-3 text-body-sm font-medium text-anthracite">
                          {ind.outcome}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-warm-gray group-hover:text-brass group-hover:translate-x-2 transition-all duration-300 shrink-0" />
                  </div>
                </Link>
              </StaggerItem>
              );
            })}
          </Stagger>
          <div className="border-t border-divider" />
        </div>
      </section>

      {/* — All Services — */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">What We Build</p>
          <h2 className="mt-6 text-display max-w-2xl">
            Four capabilities. One team.
          </h2>

          <div className="mt-16 grid gap-0 lg:grid-cols-2">
            {services.map((svc, i) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group border-t border-divider py-10 pr-8 transition-colors hover:bg-surface"
              >
                <span className="metric text-sm text-brass">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-h3 group-hover:text-brass transition-colors">
                  {svc.title}
                </h3>
                <p className="mt-3 text-body text-warm-gray max-w-md">
                  {svc.tagline}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-brass opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* — Platform vs. Partner — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline">Platform vs. Partner</p>
          <h2 className="mt-6 text-display text-bone max-w-2xl">
            Why not just buy a platform?
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-stone">
            Platforms like DataRobot and Dataiku are powerful tools — but they
            require your team to build, validate, deploy, and maintain every
            model. If you have a mature data science team, they make sense. If
            you need production AI and the capability to run it, you need a
            partner.
          </p>

          <div className="mt-14 border-t border-divider-dark pt-8">
            <p className="text-body-lg text-bone max-w-2xl">
              We build production AI AND train your team to run it. When we
              leave, the system works and your people own it.
            </p>
          </div>
        </div>
      </section>

      {/* — Guarantee — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <Shield className="h-8 w-8 text-brass mx-auto mb-6" />
          <h2 className="text-display">The ClearForge Guarantee</h2>
          <p className="mt-6 text-body-lg text-warm-gray">
            If our Forge Diagnostic doesn&apos;t identify at least 3 actionable
            AI opportunities with clear ROI projections, we refund your
            investment. No questions asked.
          </p>
        </div>
      </section>

      {/* — CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">
            Ready to see what AI can do for your business?
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            The Forge Diagnostic gives you a clear picture of your
            highest-value opportunities in four weeks. No commitment beyond that.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/contact">Book a 15-Min Diagnostic Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
