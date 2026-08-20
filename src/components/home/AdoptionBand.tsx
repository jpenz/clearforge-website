import { CountUp } from "@/components/ui/CountUp";
/**
 * The one deliberate grid break on the homepage. The hairline frame
 * drops away, the canvas inverts to ink, and the adoption bar takes
 * the full viewport width.
 */
export function AdoptionBand() {
  return (
    <section aria-label="The adoption bar" className="cf-dark-band relative overflow-hidden text-ghost">
      <div aria-hidden="true" className="cf-aurora-b" />
      <div className="relative mx-auto max-w-[1360px]">
        <div className="flex items-center justify-between gap-4 border-b border-[rgba(248,248,255,0.18)] px-5 py-5 md:px-10">
          <span className="text-[11px] tracking-[0.18em] text-ghost/60 uppercase">
            The bar every build is held to
          </span>
          <span className="tnum text-[11px] tracking-[0.18em] text-ghost/60 uppercase">
            Day 90
          </span>
        </div>
        <div className="grid items-end gap-8 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[auto_1fr] lg:gap-16">
          <p className="font-display tnum text-[110px] leading-[0.85] font-medium md:text-[200px]">
            <CountUp value={70} /><span className="align-top text-[44px] md:text-[76px]">%</span>
          </p>
          <div className="max-w-[560px] lg:pb-3">
            <p className="text-[18px] leading-snug text-ghost/90 md:text-[22px]">
              Weekly-active adoption by day 90, tracked on a live adoption
              scoreboard. The system is done when your team uses it every
              week.
            </p>
            <p className="tnum mt-5 text-[12px] tracking-[0.14em] text-ghost/60 uppercase">
              Measured on every engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
