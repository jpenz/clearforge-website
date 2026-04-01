import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'About ClearForge — We Build Production AI',
  description:
    'Strategy consulting discipline meets AI engineering depth. We build production AI, train your team to run it, and make ourselves replaceable.',
  path: '/about',
});

const values = [
  {
    title: 'Strategy must end in execution',
    desc: 'Every engagement produces a working system, not a report. If we cannot build it, we do not recommend it.',
  },
  {
    title: 'Senior-led teams',
    desc: 'The people who scope your engagement are the people who deliver it. No bait-and-switch with junior consultants.',
  },
  {
    title: 'Engineering + operating discipline',
    desc: 'We combine management consulting rigor with production engineering standards. Systems are tested, documented, and built to last.',
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
      'DataRobot and Dataiku are powerful — if you already have a team to build, validate, and maintain models. Most mid-market companies do not.',
  },
  {
    question: 'Platforms solve the tool problem, not the business problem',
    answer:
      'Buying a platform is like buying a CNC machine without a machinist. The tool is only as good as the people operating it and the process around it.',
  },
  {
    question: 'We build AND train',
    answer:
      'We deploy production AI and train your team to run it. When we leave, the system works and your people own it. No ongoing license dependency.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-48">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">About ClearForge</p>
          <h1
            className="mt-6 text-display max-w-3xl text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            We build production AI. Not strategy decks.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            We build, we ship, we deploy. The same team that diagnoses the
            problem engineers the solution and trains your people to run it.
          </p>
        </div>
      </section>

      {/* — Builder Identity — */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">What Makes Us Different</p>
              <h2 className="mt-6 text-display">
                We build AND train your team to run it.
              </h2>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                Most AI firms sell you a roadmap and leave. Others build
                something and create a dependency so you cannot operate without
                them. We do neither. Every ClearForge engagement ends with a
                working system in production and a team that knows how to
                maintain and extend it.
              </p>
              <p className="mt-6 text-body-lg text-warm-gray">
                Built for mid-market and growth-stage companies who need AI that
                works — not another vendor relationship that drains budget
                without delivering results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* — Founder — */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">Leadership</p>
              <h2 className="mt-6 text-display">James Penz</h2>
              <p className="mt-2 text-body-lg text-warm-gray">
                Founder &amp; Managing Partner
              </p>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                Before founding ClearForge, James spent over a decade in
                management consulting and technology transformation at Bain,
                EY, and Capgemini — advising mid-market and Fortune 500
                companies on operations, AI strategy, and digital
                transformation.
              </p>
              <p className="mt-6 text-body text-warm-gray">
                He built ClearForge because he kept seeing the same problem:
                companies spent millions on AI strategy that never made it to
                production. The gap was not insight — it was execution. ClearForge
                exists to close that gap with a team that diagnoses, builds, and
                operates AI systems end to end.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-8 border-t border-divider pt-8">
                <div>
                  <p className="metric text-brass">Bain</p>
                  <p className="mt-1 text-body-sm text-warm-gray">Strategy</p>
                </div>
                <div>
                  <p className="metric text-brass">EY</p>
                  <p className="mt-1 text-body-sm text-warm-gray">
                    Transformation
                  </p>
                </div>
                <div>
                  <p className="metric text-brass">Capgemini</p>
                  <p className="mt-1 text-body-sm text-warm-gray">
                    Technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — Values — */}
      <section className="bg-recessed py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Principles</p>
          <h2 className="mt-6 text-display max-w-2xl">
            What we believe shapes every engagement.
          </h2>

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
      <section className="border-t border-divider bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Honest Answer</p>
              <h2 className="mt-6 text-display">
                Why not just buy a platform?
              </h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0 space-y-0">
              {platformReasons.map((item, i) => (
                <div key={item.question}>
                  <div className="py-8">
                    <h3 className="text-h4">{item.question}</h3>
                    <p className="mt-3 text-body text-warm-gray">
                      {item.answer}
                    </p>
                  </div>
                  {i < platformReasons.length - 1 && (
                    <div className="h-px bg-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* — CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-40">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2
            className="text-display text-bone"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            One conversation to find&nbsp;out.
          </h2>
          <p className="mt-6 text-body-lg text-stone">
            Tell us about your business. We will be honest about whether we can
            help — and if so, exactly how.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/discover">
                Get My Free AI Readiness Score <ArrowRight className="ml-2 h-4 w-4" />
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
