import { PageFrame } from "@/components/ui/PageFrame";
import { HeroAgent } from "@/components/functional/HeroAgent";
import { BookCallButton } from "@/components/functional/BookCallButton";

/**
 * Beat (a): the core statement plus the live agent card as proof of craft.
 */
export function HeroSection() {
  return (
    <PageFrame aria-label="Introduction">
      <div className="grid lg:grid-cols-[1fr_500px]">
        {/* Left: the core statement */}
        <div className="flex flex-col border-hairline lg:border-r">
          <div className="border-b border-hairline px-5 py-5 md:px-10">
            <p className="tnum text-[12px] tracking-[0.14em] text-ink/70 uppercase">
              Founder-led AI consulting and build, for mid-market companies
              $20M to $500M and PE operating teams
            </p>
          </div>
          <div className="grow px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14">
            <h1 className="font-display max-w-[15ch] text-[40px] leading-[1.12] font-medium tracking-[-0.01em] md:text-[72px] md:leading-[1.08]">
              ClearForge builds AI systems your team{" "}
              <em className="text-cobalt italic">actually uses.</em>
            </h1>
          </div>
          <div className="grid border-t border-hairline md:grid-cols-[1fr_auto]">
            <div className="flex items-center border-hairline px-5 py-6 md:border-r md:px-10 md:py-8">
              <p className="max-w-[44ch] text-[16px] leading-snug text-ink/80">
                Engagements start with a{" "}
                <span className="tnum font-semibold text-ink">$15K</span>{" "}
                fixed-price diagnostic.{" "}
                <span className="tnum font-semibold text-ink">2 weeks.</span>
              </p>
            </div>
            <div className="flex items-center border-t border-hairline px-5 pt-5 pb-6 md:border-t-0 md:px-10 md:py-0">
              <BookCallButton size="lg" />
            </div>
          </div>
        </div>

        {/* Right: Instrument 01, the live agent card */}
        <div className="flex flex-col border-t border-hairline lg:border-t-0">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-5 md:px-8">
            <span className="tnum text-[11px] tracking-[0.18em] text-ink/60 uppercase">
              Instrument 01
            </span>
            <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
              Live preview
            </span>
          </div>
          <div className="flex grow flex-col p-5 md:p-8">
            <HeroAgent />
          </div>
          <div className="border-t border-hairline px-5 py-5 md:px-8">
            <p className="text-[12px] leading-relaxed text-ink/60">
              Founder James Penz. Background: Bain AI and Automation practice,
              EY, Capgemini.
            </p>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
