import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Stagger, StaggerItem } from '@/components/ui/animate';
import { Button } from '@/components/ui/button';
import { forgeProducts } from '@/data/forge-products';
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Pricing — Transparent Investment | ClearForge',
  description:
    'Transparent pricing for the Forge Method. Forge Diagnostic ($15K), Forge Sprint ($75K-$200K), Forge Scale ($5K-$15K/mo). No surprises.',
  path: '/pricing',
});

const faqs = [
  {
    question: 'How much does this actually cost?',
    answer:
      'Forge Diagnostic is $15K fixed. Forge Sprint ranges from $75K-$200K depending on complexity and scope. Forge Scale is $5K-$15K/month depending on the level of engagement. No hidden fees, no scope creep surprises.',
  },
  {
    question: 'What is the timeline to see results?',
    answer:
      'Forge Diagnostic delivers a build plan in 4 weeks. Forge Sprint produces a working production system in 10-14 weeks. We set baseline metrics before launch so the review cadence can compare actual workflow performance after deployment.',
  },
  {
    question: 'What if our data is not ready?',
    answer:
      'Most companies think their data is worse than it actually is. The Forge Diagnostic includes a data readiness assessment. If there are gaps, we identify them and build data preparation into the Sprint scope. You do not need perfect data to start.',
  },
  {
    question: 'Is our company big enough for this?',
    answer:
      'We work with mid-market and growth-stage companies. If you have repeatable workflows, operating data, and a team owner who can adopt the new process, the Diagnostic will show whether a build is worth pursuing.',
  },
  {
    question: 'Why not just buy DataRobot or Dataiku?',
    answer:
      'Platforms can help when you already have a data science team to build, validate, and maintain models. We build the workflow, integrate it with your systems, and train the operating team that will own it.',
  },
  {
    question: 'How is this different from hiring a consultant?',
    answer:
      'We do not stop at recommendations. The same senior team that diagnoses the workflow engineers the release, trains the owner, and sets the operating review cadence.',
  },
  {
    question: 'What is the payment structure?',
    answer:
      'Diagnostic and Sprint are billed 50% upfront, 50% on completion. Operations is billed monthly. We are flexible on structure for larger engagements — the goal is to align incentives around results.',
  },
  {
    question: 'Can you scope a custom engagement?',
    answer:
      'Yes. Our named products cover the most common needs, but we regularly design custom engagements for larger or more complex projects. Start with a discovery call and we will scope something that fits.',
  },
];

const faqLd = faqJsonLd(faqs);
const breadcrumbLd = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
]);

export default function PricingPage() {
  return (
    <>
      <JsonLdScript data={faqLd} />
      <JsonLdScript data={breadcrumbLd} />
      {/* — Hero with atmospheric bg — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <Image
          src="/images/abstract-value-creation.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.22] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Pricing</p>
          <h1
            className="mt-6 text-display max-w-3xl text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            Transparent Investment. No Surprises.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            Every engagement is scoped around a named workflow, a baseline, an owner, and a review
            cadence for measured value after launch.
          </p>
        </div>
      </section>

      {/* — Tiers — editorial ruled-line — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <Stagger className="" stagger={0.12}>
            {forgeProducts.map((product, i) => (
              <StaggerItem key={product.name}>
                <div
                  className={`relative border-t border-divider py-12 lg:py-16 ${
                    product.featured ? 'bg-brass/[0.03] -mx-6 px-6 lg:-mx-10 lg:px-10' : ''
                  }`}
                >
                  <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Left: number, name, price, ideal for */}
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3">
                        <span className="metric text-sm text-brass">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {product.featured && (
                          <span className="overline text-[10px]">Most chosen</span>
                        )}
                      </div>
                      <h3 className="mt-3 font-display text-[1.75rem] leading-[1.08] sm:text-[2.25rem] lg:text-[2.75rem]">
                        {product.name}
                      </h3>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span
                          className="metric text-3xl text-anthracite"
                          style={{ fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
                        >
                          {product.price}
                        </span>
                        <span className="text-body-sm text-warm-gray">{product.period}</span>
                      </div>
                      <p className="mt-1 text-body-sm text-warm-gray">{product.timeline}</p>
                      <p className="mt-6 text-body-sm text-warm-gray italic max-w-xs">
                        {product.idealFor}
                      </p>
                    </div>

                    {/* Right: description, what's included, CTA */}
                    <div className="mt-8 lg:col-span-7 lg:mt-0">
                      <p className="text-body-lg text-warm-gray">{product.description}</p>
                      <p className="mt-8 text-xs font-semibold text-anthracite uppercase">
                        What&apos;s Included
                      </p>
                      <ul className="mt-4 space-y-3">
                        {product.whatsIncluded.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-body-sm text-anthracite"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
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

      {/* — Value Framing — */}
      <section className="bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">Measured Value</p>
              <h2 className="mt-6 text-display">Know what will be measured before you build.</h2>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                We do not ask you to approve a build on vague upside. The Diagnostic documents the
                workflow, current baseline, data gaps, owner decisions, and value assumptions. The
                Sprint then tracks adoption and operating metrics against that baseline after
                launch.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-8 border-t border-divider pt-8">
                <div>
                  <p className="metric-lg text-brass">4 weeks</p>
                  <p className="mt-2 text-body-sm text-warm-gray">Diagnostic build plan</p>
                </div>
                <div>
                  <p className="metric-lg text-brass">10-14</p>
                  <p className="mt-2 text-body-sm text-warm-gray">Weeks to production release</p>
                </div>
                <div>
                  <p className="metric-lg text-brass">100%</p>
                  <p className="mt-2 text-body-sm text-warm-gray">You own everything we build</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — FAQ — */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">FAQ</p>
              <h2 className="mt-6 text-display">Common questions.</h2>
            </div>
            <Stagger className="mt-12 lg:col-span-8 lg:mt-0" stagger={0.06}>
              {faqs.map((faq, i) => (
                <StaggerItem key={faq.question}>
                  <div className="py-8">
                    <h3 className="text-h4">{faq.question}</h3>
                    <p className="mt-3 text-body text-warm-gray">{faq.answer}</p>
                  </div>
                  {i < faqs.length - 1 && <div className="h-px bg-divider" />}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* — CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Ready to inspect the workflow?</h2>
          <p className="mt-6 text-body-lg text-stone">
            The Forge Diagnostic gives you a clear build plan in four weeks. If the workflow,
            baseline, or adoption path is not strong enough, we will tell you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Map the Workflow <ArrowRight className="ml-2 h-4 w-4" />
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
