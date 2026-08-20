import type { Metadata } from "next";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { BookCallButton } from "@/components/functional/BookCallButton";
import {
  ADOPTION_MILE_POINTS,
  FIRST_TWO_WEEKS,
  PRICING_TIERS,
  UNPUBLISHED_TIER,
} from "@/data/pricing";
import { PRICING_FAQS } from "@/data/faqs";
import { faqJsonLd, JsonLdScriptProps, pricingJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Engagements",
  description:
    "How ClearForge engagements work: a fixed-fee two-week diagnostic first, then a build sprint scoped before you commit, then adoption and managed operations retainers.",
};

const ROW_GRID =
  "lg:grid-cols-[64px_1fr_200px_240px_220px] lg:items-center lg:gap-0";

export default function PricingPage() {
  return (
    <>
      <script {...JsonLdScriptProps(pricingJsonLd())} />
      <script {...JsonLdScriptProps(faqJsonLd(PRICING_FAQS))} />
      {/* Intro + why public */}
      <PageFrame aria-label="Pricing introduction">
        <SectionBand
          left="Engagements"
          right="Scoped before you commit"
        />
        <div className="cf-dark-band relative overflow-hidden grid lg:grid-cols-[1fr_420px]">
          <div aria-hidden="true" className="cf-aurora-b" />
          <div className="relative border-hairline-ghost px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 lg:border-r">
            <h1 className="font-display max-w-[19ch] text-[36px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[56px] md:leading-[1.08]">
              The first step is a{" "}
              <span className="text-cobalt-bright italic">fixed-fee diagnostic.</span>{" "}
              Everything after it is scoped there.
            </h1>
          </div>
          <div className="relative flex flex-col justify-end border-t border-hairline-ghost px-5 py-8 md:px-10 md:py-14 lg:border-t-0">
            <p className="text-[11px] tracking-[0.18em] text-ghost/55 uppercase">
              How pricing works
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ghost/80">
              The diagnostic is a fixed fee, agreed before we start. It ends
              with a scoped, priced plan for the build. Nothing after it is
              open-ended.
            </p>
          </div>
        </div>
      </PageFrame>

      {/* The tiers ledger */}
      <PageFrame aria-label="The tiers">
        <SectionBand left="The engagements" right="Six ways in" />
        <div
          className={`hidden border-b border-hairline px-10 py-3 lg:grid ${ROW_GRID}`}
          aria-hidden="true"
        >
          <span className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            No.
          </span>
          <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            Engagement
          </span>
          <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            Term
          </span>
          <span className="text-right text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            Price
          </span>
          <span className="text-right text-[11px] tracking-[0.14em] text-ink/60 uppercase">
            Next step
          </span>
        </div>
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`grid gap-3 border-b border-hairline px-5 py-6 transition-colors hover:bg-white md:px-10 md:py-8 ${ROW_GRID}`}
          >
            <span className="tnum text-[12px] text-ink/60">{tier.index}</span>
            <div className="lg:pr-8">
              <h3 className="text-[18px] leading-[1.35] font-semibold md:text-[19px]">
                {tier.name}
              </h3>
              <p className="tnum mt-1.5 max-w-[52ch] text-[14px] leading-relaxed text-ink/70">
                {tier.subtitle}
              </p>
            </div>
            <span className="tnum text-[12px] tracking-[0.14em] text-ink/60 uppercase">
              {tier.term}
            </span>
            <div className="lg:text-right">
              <span className="tnum block text-[26px] font-semibold">
                {tier.price}
              </span>
              {tier.priceDetail && (
                <span className="tnum mt-0.5 block text-[12px] text-ink/60">
                  {tier.priceDetail}
                </span>
              )}
            </div>
            <div className="flex lg:justify-end">
              <BookCallButton size="md" className="whitespace-nowrap" />
            </div>
          </div>
        ))}
        {/* Unnumbered final row */}
        <div
          className={`grid gap-3 border-t border-hairline-strong bg-white px-5 py-6 md:px-10 md:py-8 ${ROW_GRID}`}
        >
          <span
            aria-hidden="true"
            className="inline-block size-[9px] bg-cobalt"
          />
          <div className="lg:pr-8">
            <h3 className="text-[18px] leading-[1.35] font-semibold italic md:text-[19px]">
              {UNPUBLISHED_TIER.name}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink/70">
              {UNPUBLISHED_TIER.subtitle}
            </p>
          </div>
          <span className="text-[12px] tracking-[0.14em] text-ink/60 uppercase">
            {UNPUBLISHED_TIER.term}
          </span>
          <span className="text-[12px] tracking-[0.14em] text-ink/60 uppercase lg:text-right">
            {UNPUBLISHED_TIER.price}
          </span>
          <div className="flex lg:justify-end">
            <BookCallButton size="md" className="whitespace-nowrap" />
          </div>
        </div>
      </PageFrame>

      {/* The first two weeks */}
      <PageFrame aria-label="The first two weeks">
        <SectionBand
          left="The first two weeks"
          right="Forge Diagnostic · fixed fee"
        />
        <div className="grid lg:grid-cols-[1fr_560px]">
          <div className="flex flex-col border-b border-hairline px-5 py-10 md:px-10 md:py-14 lg:border-r lg:border-b-0">
            <h2 className="font-display max-w-[16ch] text-[32px] leading-[1.1] font-medium md:text-[44px]">
              What happens in the first{" "}
              <span className="tnum text-cobalt italic">2 weeks</span>
            </h2>
            <p className="tnum mt-6 max-w-[46ch] text-[16px] leading-relaxed text-ink/80">
              The Diagnostic is $15K, fixed price. It ends with a decision you
              can price, not a report you file.
            </p>
            <div className="mt-auto pt-10">
              <div className="flex max-w-[46ch] items-baseline justify-between gap-6 border-t border-hairline pt-4">
                <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                  Forge Diagnostic
                </span>
                <span className="tnum text-[14px] font-semibold">
                  2 weeks · $15K fixed
                </span>
              </div>
            </div>
          </div>
          <div className="px-5 py-10 md:px-10 md:py-14">
            <ol className="border-t border-hairline">
              {FIRST_TWO_WEEKS.map((step) => (
                <li
                  key={step.label}
                  className="grid gap-2 border-b border-hairline py-6 md:grid-cols-[110px_1fr] md:gap-6"
                >
                  <span className="tnum text-[11px] tracking-[0.14em] text-ink/60 uppercase md:pt-1">
                    {step.label}
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold">{step.title}</p>
                    <p className="tnum mt-1.5 text-[14px] leading-relaxed text-ink/70">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </PageFrame>

      {/* The Adoption Mile */}
      <PageFrame aria-label="The Adoption Mile">
        <SectionBand
          left="The Adoption Mile"
          right="Part of Forge Scale · $5K to $15K per month"
        />
        <div className="grid lg:grid-cols-[560px_1fr]">
          <div className="flex items-baseline gap-6 border-b border-hairline px-5 py-10 md:px-10 md:py-14 lg:border-r lg:border-b-0">
            <p className="font-display tnum text-[96px] leading-none font-medium md:text-[160px]">
              70%
            </p>
            <p className="tnum text-[14px] leading-snug text-ink/70">
              weekly-active adoption
              <br />
              by day 90
            </p>
          </div>
          <div className="flex flex-col justify-center px-5 py-10 md:px-10 md:py-14">
            <h2 className="font-display text-[28px] leading-[1.2] md:text-[34px]">
              The Adoption Mile
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink/80">
              A named operator. A weekly working cadence. A live adoption
              scoreboard. The system is not done when it ships. It is done when
              your team uses it.
            </p>
            <ul className="mt-6 border-t border-hairline text-[14px]">
              {ADOPTION_MILE_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 border-b border-hairline py-3"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block size-[7px] shrink-0 bg-cobalt"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageFrame>

      {/* FAQ */}
      <PageFrame aria-label="Common questions">
        <SectionBand left="Common questions" right="5 answers" />
        <div className="grid lg:grid-cols-[420px_1fr]">
          <div className="border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <h2 className="font-display max-w-[14ch] text-[28px] leading-[1.2] md:text-[34px]">
              Questions buyers ask before the call.
            </h2>
            <p className="tnum mt-4 max-w-[34ch] text-[14px] leading-relaxed text-ink/70">
              If yours is not here, the 30 minutes with the founder will cover
              it.
            </p>
          </div>
          <div className="px-5 py-8 md:px-10">
            <FaqAccordion items={PRICING_FAQS} />
          </div>
        </div>
      </PageFrame>

      {/* Closing booking strip */}
      <PageFrame bottomRule={false} aria-label="Book an intro">
        <div className="flex flex-col items-start gap-8 px-5 py-10 md:px-10 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div>
            <h2 className="font-display text-[32px] leading-[1.1] md:text-[44px]">
              Start with the{" "}
              <span className="tnum text-cobalt italic">$15K</span> Diagnostic.
            </h2>
            <p className="tnum mt-3 text-[14px] text-ink/70">
              Fixed price. 2 weeks. Where every engagement starts.
            </p>
          </div>
          <BookCallButton size="lg" className="shrink-0 whitespace-nowrap" />
        </div>
      </PageFrame>
    </>
  );
}
