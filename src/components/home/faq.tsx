/**
 * Homepage FAQ — the pre-sale questions buyers ask before booking, in the
 * editorial ruled-row register. Mirrored 1:1 into FAQPage JSON-LD on the
 * page (AEO: the #1 first-party source AI answers quote). House rule: no
 * em dashes in this copy.
 */

export const homeFaqs = [
  {
    question: 'What does ClearForge actually cost?',
    answer:
      'Pricing is published on our pricing page: the Forge Diagnostic is $15K fixed, a Forge Sprint runs $75K to $200K depending on scope, and Forge Scale is $5K to $15K per month. Scope is fixed before we start, with no surprise fees.',
  },
  {
    question: 'How fast will we see something working?',
    answer:
      'The Diagnostic delivers a build plan leadership can approve in 4 weeks. A Sprint puts a working system into production in 10 to 14 weeks, with baseline metrics tracked from day one.',
  },
  {
    question: 'Do you advise, or do you actually build?',
    answer:
      'We build. The senior person who scopes your engagement engineers the system, ships it into production, and stays through adoption until your team runs it without us.',
  },
  {
    question: 'Will our team actually use it?',
    answer:
      'Adoption is scoped into every Sprint through The Adoption Mile: a named operator on your team, a weekly working cadence, and a live adoption scoreboard. The bar we build to is 70% weekly-active usage by day 90.',
  },
  {
    question: 'Is our data safe with AI in production?',
    answer:
      'Systems are built in your environment wherever possible, with least-privilege access and human approval gates on consequential actions. Our AI providers operate under enterprise API terms that exclude your data from model training. Full details are on our Security page.',
  },
  {
    question: 'Who will we actually work with?',
    answer:
      'ClearForge is founder-led. James Penz, formerly of the Bain AI and Automation practice, scopes every engagement and delivers it with senior operators only. You can meet him before you sign anything.',
  },
  {
    question: 'What if we are not sure we are ready?',
    answer:
      'Start with the free tools. The scorecard gives you a readiness readout in ten questions, and Forge Intelligence drafts a diagnostic from your website in about a minute. No signup, no sales call required.',
  },
];

export function HomeFaq() {
  return (
    <section className="border-t border-divider bg-parchment py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="overline">Before You Book</p>
            <h2 className="mt-6 text-display">The questions buyers ask first.</h2>
          </div>
          <div className="mt-12 lg:col-span-8 lg:mt-0">
            {homeFaqs.map((faq, i) => (
              <div key={faq.question}>
                <div className="py-7">
                  <h3 className="text-h4">{faq.question}</h3>
                  <p className="mt-3 max-w-3xl text-body leading-relaxed text-warm-gray">
                    {faq.answer}
                  </p>
                </div>
                {i < homeFaqs.length - 1 && <div className="h-px bg-divider" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
