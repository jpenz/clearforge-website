import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import { Plate } from '@/components/ui/Plate';

/**
 * The adoption target: the canvas inverts to the cinematic band (HDR core,
 * aurora, one slow light sweep) and the 70 percent scales with the
 * viewport, over the adoption-field back plate. No label rail opens the
 * band; the number is the opener, and its caption names it as the target
 * every build is held to, never as a measurement. At lg the band is at
 * least 600px deep so it reads as a dark plate between the light bands;
 * the plate sits on its bottom crop so the horizon glow rises above the
 * numeral.
 */
export function AdoptionBand() {
  return (
    <section aria-label="The adoption target" className="cf-dark-band overflow-clip text-ghost">
      <Plate src="/renders/adoption-field.jpg" position="50% 100%" />
      <div aria-hidden="true" className="cf-aurora-b" />
      <div aria-hidden="true" className="cf-sweep" />
      <Container gutter="cells" className="relative">
        <div className="grid items-center gap-8 px-5 py-16 md:px-10 md:py-24 lg:min-h-[600px] lg:grid-cols-[auto_1fr] lg:gap-16">
          <p className="font-display tnum text-[clamp(110px,12.5vw,240px)] leading-[0.85] font-medium">
            <CountUp value={70} />
            <span className="align-top text-[0.38em]">%</span>
          </p>
          <div className="max-w-[560px] lg:pb-3">
            <p className="text-[18px] leading-snug text-ghost/90 md:text-[22px]">
              Weekly-active adoption by day 90, tracked on a live adoption scoreboard. The system is
              done when your team uses it every week.
            </p>
            <p className="tnum mt-5 text-[12px] tracking-[0.16em] text-ghost/70 uppercase">
              The target on every engagement · Day 90
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
