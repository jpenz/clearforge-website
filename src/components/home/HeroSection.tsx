import { BookCallButton } from "@/components/functional/BookCallButton";
import { HeroAgent } from "@/components/functional/HeroAgent";
import { PageFrame } from "@/components/ui/PageFrame";

/**
 * Beat (a): the core statement plus the live agent card as proof of craft.
 * V12.1 atmosphere: cinematic dark band (deep ink + drifting cobalt aurora,
 * CSS only), light editorial interior below. Entrance is a one-time load
 * stagger; reduced-motion renders everything instantly.
 */
export function HeroSection() {
  return (
    <PageFrame aria-label="Introduction" className="border-none md:border-x-0">
      <div className="cf-dark-band relative overflow-hidden">
        <div aria-hidden="true" className="cf-aurora" />
        <div aria-hidden="true" className="cf-aurora-b" />
        <div className="relative grid lg:grid-cols-[1fr_500px]">
          {/* Left: the core statement */}
          <div className="flex flex-col border-hairline-ghost lg:border-r">
            <div className="cf-enter border-b border-hairline-ghost px-5 py-5 md:px-10">
              <p className="tnum text-[12px] tracking-[0.14em] text-ghost/60 uppercase">
                Founder-led AI consulting and build, for mid-market companies
                $20M to $500M and PE operating teams
              </p>
            </div>
            <div className="grow px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14">
              <h1
                className="cf-enter font-display max-w-[15ch] text-[40px] leading-[1.12] font-medium tracking-[-0.01em] md:text-[72px] md:leading-[1.08]"
                style={{ "--d": "80ms" } as React.CSSProperties}
              >
                ClearForge builds AI systems your team{" "}
                <em className="text-cobalt-bright italic">actually uses.</em>
              </h1>
            </div>
            <div className="grid border-t border-hairline-ghost md:grid-cols-[1fr_auto]">
              <div
                className="cf-enter flex items-center border-hairline-ghost px-5 py-6 md:border-r md:px-10 md:py-8"
                style={{ "--d": "180ms" } as React.CSSProperties}
              >
                <p className="max-w-[44ch] text-[16px] leading-snug text-ghost/80">
                  Engagements start with a{" "}
                  <span className="tnum font-semibold text-ghost">$15K</span>{" "}
                  fixed-price diagnostic.{" "}
                  <span className="tnum font-semibold text-ghost">
                    2 weeks.
                  </span>
                </p>
              </div>
              <div
                className="cf-enter flex items-center border-t border-hairline-ghost px-5 pt-5 pb-6 md:border-t-0 md:px-10 md:py-0"
                style={{ "--d": "260ms" } as React.CSSProperties}
              >
                <BookCallButton size="lg" />
              </div>
            </div>
          </div>

          {/* Right: Instrument 01, the live agent card */}
          <div className="flex flex-col border-t border-hairline-ghost lg:border-t-0">
            <div className="cf-enter flex items-center justify-between border-b border-hairline-ghost px-5 py-5 md:px-8">
              <span className="tnum text-[11px] tracking-[0.18em] text-ghost/60 uppercase">
                Instrument 01
              </span>
              <span className="text-[11px] tracking-[0.18em] text-cobalt-bright uppercase">
                Live preview
              </span>
            </div>
            <div
              className="cf-enter flex grow flex-col p-5 md:p-8"
              style={{ "--d": "320ms" } as React.CSSProperties}
            >
              <div className="cf-glow flex grow flex-col">
                <HeroAgent />
              </div>
            </div>
            <div className="border-t border-hairline-ghost px-5 py-5 md:px-8">
              <p className="text-[12px] leading-relaxed text-ghost/60">
                Founder James Penz. Background: Bain AI and Automation
                practice, EY, Capgemini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
