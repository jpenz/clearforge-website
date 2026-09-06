import { BookCallButton } from '@/components/functional/BookCallButton';
import { HeroAgent } from '@/components/functional/HeroAgent';
import { Container } from '@/components/ui/Container';

/**
 * Beat (a): the core statement plus the live agent card as proof of craft.
 * V13: a full-bleed cinematic band (HDR core, drifting aurora, one slow
 * light sweep, all CSS) that fills the first viewport at lg and up. The
 * left 58 percent carries eyebrow, statement, diagnostic line, and the
 * booking button; the agent card floats on the right with the cobalt
 * glow, offset down so the band shows above it. The back plate
 * (public/renders/hero-forge.jpg) drops in at the marked slot. Entrance
 * is a one-time load stagger; reduced motion renders everything instantly.
 */
export function HeroSection() {
  return (
    <section aria-label="Introduction" className="cf-dark-band overflow-hidden">
      {/* Plate slot: next/image back plate + legibility overlay go here, before the aurora. */}
      <div aria-hidden="true" className="cf-aurora" />
      <div aria-hidden="true" className="cf-aurora-b" />
      <div aria-hidden="true" className="cf-sweep" />
      <Container className="relative flex flex-col lg:min-h-[min(82svh,1000px)]">
        <div className="grid grow gap-y-12 pt-10 pb-12 md:pt-14 md:pb-16 lg:grid-cols-[58fr_42fr] lg:gap-x-12 lg:pt-16 xl:gap-x-20">
          {/* Left: the core statement */}
          <div className="flex flex-col justify-center">
            <p className="cf-enter tnum max-w-[64ch] text-[12px] tracking-[0.14em] text-ghost/60 uppercase">
              Founder-led AI consulting and build, for mid-market companies $20M to $500M and PE
              operating teams
            </p>
            <h1
              className="cf-enter font-display mt-8 max-w-[15ch] text-[clamp(44px,5.4vw,104px)] leading-[1.02] font-medium tracking-[-0.01em] md:mt-10"
              style={{ '--d': '80ms' } as React.CSSProperties}
            >
              ClearForge builds AI systems your team actually uses and your bottom line{' '}
              <em className="text-cobalt-bright italic">actually feels.</em>
            </h1>
            <p
              className="cf-enter mt-8 max-w-[44ch] text-[17px] leading-snug text-ghost/80 md:text-[18px]"
              style={{ '--d': '180ms' } as React.CSSProperties}
            >
              Engagements start with a{' '}
              <span className="font-semibold text-ghost">fixed-fee diagnostic.</span>{' '}
              <span className="tnum font-semibold text-ghost">Two weeks, one workflow.</span>
            </p>
            <div
              className="cf-enter mt-8 md:mt-10"
              style={{ '--d': '260ms' } as React.CSSProperties}
            >
              <BookCallButton size="lg" />
            </div>
          </div>

          {/* Right: Instrument 01, the live agent card floating on the band */}
          <div className="flex flex-col lg:self-end lg:pt-20">
            <div
              className="cf-enter flex items-center justify-between pb-4"
              style={{ '--d': '320ms' } as React.CSSProperties}
            >
              <span className="tnum text-[11px] tracking-[0.18em] text-ghost/60 uppercase">
                Instrument 01
              </span>
              <span className="text-[11px] tracking-[0.18em] text-cobalt-bright uppercase">
                Live preview
              </span>
            </div>
            <div className="cf-enter cf-glow" style={{ '--d': '380ms' } as React.CSSProperties}>
              <HeroAgent />
            </div>
            <p
              className="cf-enter pt-4 text-[12px] leading-relaxed text-ghost/60"
              style={{ '--d': '440ms' } as React.CSSProperties}
            >
              Founder James Penz. Background: Bain AI and Automation practice, EY, Capgemini.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
