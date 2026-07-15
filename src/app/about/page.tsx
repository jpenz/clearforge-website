import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BookCallButton } from '@/components/booking/book-call';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'About ClearForge — Founder-Led Production AI',
  description:
    'Founded by James Penz (ex-Bain, EY, Capgemini). We build production AI and stay through The Adoption Mile™ until your team runs it without us.',
  path: '/about',
});

const values = [
  {
    title: 'Strategy must end in execution',
    desc: 'Every engagement produces a working system, not a report. If we cannot build it, we do not recommend it.',
  },
  {
    title: 'Senior-led, end to end',
    desc: 'The person who scopes your engagement is the person who delivers it — and can make tradeoffs in the room.',
  },
  {
    title: 'Adoption is the deliverable',
    desc: 'A system nobody uses is a write-off. We put a named operator, a weekly cadence, and a visible scoreboard on every launch.',
  },
  {
    title: 'Build capability, not dependency',
    desc: 'Everything we build transfers. We train your people, document the systems, and make ourselves replaceable. That is the goal.',
  },
];

const platformReasons = [
  {
    question: 'Platforms require a data science team',
    answer:
      'DataRobot and Dataiku can help if you already have a team to build, validate, and maintain models. Most mid-market companies do not.',
  },
  {
    question: 'Platforms solve the tool problem, not the business problem',
    answer:
      'Buying a platform is like buying a CNC machine without a machinist. The tool is only as good as the people operating it and the process around it.',
  },
  {
    question: 'We build AND run the adoption',
    answer:
      'We deploy production AI, train your team, and stay on a weekly cadence until usage holds. When we leave, the system works and your people own it. No ongoing license dependency.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-44">
        <Image
          src="/images/abstract-network.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.22] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forge-black via-forge-black/80 to-forge-black/40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">About ClearForge</p>
          <h1 className="mt-6 text-display max-w-3xl text-bone">
            We build production AI.{' '}
            <span className="display-accent">And stay until it sticks.</span>
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            The same senior team diagnoses the workflow, engineers the system, ships it to
            production — and runs the adoption until your people work in it every week.
          </p>
        </div>
      </section>

      {/* — Founder — the face behind the firm, first — */}
      <section className="bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] border border-divider bg-surface">
                <Image
                  src="/images/james-penz.jpg"
                  alt="James Penz, Founder & Managing Partner of ClearForge"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
              <p className="metric mt-4 text-[11px] uppercase tracking-[0.14em] text-warm-gray">
                James Penz · Founder &amp; Managing Partner
              </p>
              <a
                href="https://www.linkedin.com/in/jamespenz/"
                target="_blank"
                rel="noreferrer"
                className="metric mt-2 inline-block text-[11px] uppercase tracking-[0.14em] text-brass underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass-hover"
              >
                Connect on LinkedIn
              </a>
            </div>

            <div className="lg:col-span-7">
              <p className="overline">The Founder</p>
              <h2 className="mt-6 text-display">James Penz</h2>
              <p className="mt-6 text-body-lg text-warm-gray">
                Before ClearForge, James spent over a decade in management consulting and enterprise
                technology — at Bain &amp; Company, EY, and Capgemini — advising mid-market and
                Fortune 500 companies on operations, AI strategy, and large-scale delivery.
              </p>
              <p className="mt-6 text-body text-warm-gray">
                Across those years he kept watching the same failure: companies spend millions on AI
                strategy that never survives contact with the people who have to use it. The gap was
                never insight. It was execution — and adoption. So he built the firm he could not
                find in the market: senior enough to scope the problem honestly, technical enough to
                ship working systems, and stubborn enough to stay through The Adoption Mile™ until
                the team runs it without us.
              </p>
              <p className="mt-6 text-body text-warm-gray">
                Based in Southeast Michigan. Serving clients nationally.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-6 border-t border-divider pt-8 sm:grid-cols-3 sm:gap-8">
                <div>
                  <p className="metric text-brass">Bain &amp; Company</p>
                  <p className="mt-1 text-body-sm text-warm-gray">Strategy &amp; AI practice</p>
                </div>
                <div>
                  <p className="metric text-brass">EY</p>
                  <p className="mt-1 text-body-sm text-warm-gray">Enterprise delivery</p>
                </div>
                <div>
                  <p className="metric text-brass">Capgemini</p>
                  <p className="mt-1 text-body-sm text-warm-gray">Technology at scale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — The operating belief — */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">The Operating Belief</p>
              <h2 className="mt-6 text-display">
                Shipping is half the job. <span className="display-accent">Adoption</span> is the
                other half.
              </h2>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                Most AI firms sell a roadmap and leave. Some build something and create a dependency
                you cannot operate without. We do neither. Every ClearForge engagement ends with a
                working system in production, a named operator on your team, and a weekly adoption
                rhythm we run together until usage holds.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-8 border-t border-divider pt-8 sm:grid-cols-3">
                <div>
                  <p className="metric-lg text-brass">70%</p>
                  <p className="mt-2 text-body-sm text-warm-gray">
                    Weekly-active usage — the adoption bar we build to by day 90
                  </p>
                </div>
                <div>
                  <p className="metric-lg text-brass">1 owner</p>
                  <p className="mt-2 text-body-sm text-warm-gray">
                    Named on your team before we write a line of code
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="metric-lg text-brass">100%</p>
                  <p className="mt-2 text-body-sm text-warm-gray">
                    You own everything we build — code, docs, runbooks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Principles — */}
      <section className="bg-recessed py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Principles</p>
          <h2 className="mt-6 text-display max-w-2xl">What we believe shapes every engagement.</h2>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="border-t border-divider pt-6">
                <h3 className="text-h4">{v.title}</h3>
                <p className="mt-2 text-body-sm text-warm-gray">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* — Why Not Just Buy a Platform? — */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Honest Answer</p>
              <h2 className="mt-6 text-display">Why not just buy a platform?</h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0 space-y-0">
              {platformReasons.map((item, i) => (
                <div key={item.question}>
                  <div className="py-8">
                    <h3 className="text-h4">{item.question}</h3>
                    <p className="mt-3 text-body text-warm-gray">{item.answer}</p>
                  </div>
                  {i < platformReasons.length - 1 && <div className="h-px bg-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* — CTA — light band; the global footer band supplies the dark close */}
      <section className="border-t border-divider bg-recessed py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display">One conversation to find&nbsp;out.</h2>
          <p className="mt-6 text-body-lg text-warm-gray">
            Bring one stuck workflow. We will be honest about whether it is worth building — and if
            so, exactly how.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <BookCallButton size="lg" analytics="about_book_call" />
            <Button size="lg" variant="secondary" asChild>
              <Link href="/discover">
                Map the Workflow <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
