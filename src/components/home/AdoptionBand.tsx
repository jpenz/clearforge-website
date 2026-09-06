import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import { Plate } from '@/components/ui/Plate';

/**
 * The adoption target: the canvas inverts to the cinematic band (HDR core,
 * aurora, one slow light sweep) and the 70 percent scales with the
 * viewport, over the adoption-field back plate. It is capped at the size of
 * the measured result numerals (1,181 on the proof band above it): a target
 * must not be the biggest number on the site. No label rail opens the
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
      <div aria-hidden="true" className="cf-plate-pool-mid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="cf-aurora-b" />
      <div aria-hidden="true" className="cf-sweep" />
      <Container gutter="cells" className="relative">
        <div className="grid items-center gap-8 px-5 py-16 md:px-10 md:py-24 lg:min-h-[600px] lg:grid-cols-[auto_1fr] lg:gap-16">
          <p className="font-display tnum text-[clamp(84px,8.2vw,156px)] leading-[0.85] font-medium">
            <CountUp value={70} />
            <span className="align-top text-[0.38em]">%</span>
          </p>
          <div className="max-w-[560px] lg:pb-3">
            <p className="tnum text-[18px] leading-snug text-ghost/90 md:text-[22px]">
              <span className="font-semibold text-ghost">
                Target: 70 percent weekly-active adoption by day 90.
              </span>{' '}
              The system is done when your team uses it every week.
            </p>
            <p className="tnum mt-5 text-[12px] tracking-[0.16em] text-ghost uppercase">
              The target on every engagement · Not a measured result
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
