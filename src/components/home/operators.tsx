import { SectionReveal, StaggerReveal } from '@/components/home/homepage-animations';
import { operators } from '@/data/homepage';

/**
 * Operators — dark band. "The humans on your engagement, by name."
 * 2-col: lede left, 2×2 bordered grid of 4 points right.
 */
export function Operators() {
  return (
    <section id="operators" className="dark-section scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Lead */}
          <SectionReveal animation="slide-left">
            <p className="overline">{operators.eyebrow}</p>
            <h2 className="mt-5 text-display text-bone">
              {operators.headline.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < operators.headline.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="mt-7 max-w-md text-body-lg text-stone">{operators.lede}</p>
          </SectionReveal>

          {/* 2×2 grid */}
          <StaggerReveal className="grid border-t border-l border-divider-dark sm:grid-cols-2">
            {operators.points.map((p, i) => (
              <div key={p.k} className="border-b border-r border-divider-dark p-6 lg:p-8">
                <div className="metric text-xs text-brass-light">— 0{i + 1}</div>
                <h3 className="mt-3 text-h4 text-bone">{p.k}</h3>
                <p className="mt-2 text-body-sm text-stone">{p.v}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
