import { StaggerReveal } from '@/components/home/homepage-animations';
import { pillars } from '@/data/homepage';

/**
 * PillarStrip — three objection-neutralizing bullets, ordered by how often the
 * objection comes up. Each headline is the literal buyer objection; the line
 * beneath is the rebuttal. Bordered grid, hairline dividers.
 */
export function Objections() {
  return (
    <section className="border-b border-divider bg-parchment">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <StaggerReveal className="grid border-divider lg:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.objection}
              className={`py-8 lg:py-10 ${
                i > 0 ? 'border-t border-divider lg:border-t-0 lg:border-l lg:pl-10' : 'lg:pr-10'
              } ${i === 1 ? 'lg:px-10' : ''}`}
            >
              <h3
                className="text-anthracite"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                &ldquo;{p.objection}&rdquo;
              </h3>
              <p className="mt-3 text-body text-warm-gray">{p.rebuttal}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
