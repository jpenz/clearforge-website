import { PE_PACK } from '@/data/services';
import { cn } from '@/lib/utils';

interface GapPairProps {
  /** 'dark' renders ghost bars and text for use on a dark band. */
  tone?: 'light' | 'dark';
  /** Print the THIRD-PARTY RESEARCH eyebrow. Off when the band's own rail already says it. */
  eyebrow?: boolean;
  className?: string;
}

/**
 * The sponsor gap drawn as the two-number finding it is: the share of
 * sponsors that have mandated AI over the share of portfolio companies
 * actually implementing, each as a proportional bar. One source, one
 * treatment, on /services and /private-equity.
 */
export function GapPair({ tone = 'light', eyebrow = true, className }: GapPairProps) {
  const dark = tone === 'dark';
  const { pair, source } = PE_PACK.stat;
  return (
    <div className={className}>
      {eyebrow && (
        <p
          className={cn(
            'text-[12px] tracking-[0.16em] uppercase',
            dark ? 'text-ghost/80' : 'text-ink/70',
          )}
        >
          Third-party research
        </p>
      )}
      <dl className={cn('space-y-6', eyebrow && 'mt-5')}>
        {pair.map((row, index) => {
          const accent = index === pair.length - 1;
          // A <dl> may only hold dt/dd groups, optionally wrapped in ONE div
          // (axe definition-list / dlitem). The row is that div, laid out as a
          // grid: figure and label on one baseline, the bar as a second,
          // decorative dd spanning both columns.
          return (
            <div key={row.label} className="grid grid-cols-[auto_1fr] items-baseline gap-x-3">
              <dt
                className={cn(
                  'tnum text-[clamp(44px,3.6vw,64px)] leading-none font-light tracking-tight',
                  accent && (dark ? 'text-cobalt-bright' : 'text-cobalt'),
                )}
              >
                {row.approximate && (
                  <span
                    className={cn(
                      'mr-2 text-[14px] font-normal tracking-normal',
                      dark ? 'text-ghost/70' : 'text-ink/70',
                    )}
                  >
                    about
                  </span>
                )}
                {row.value}
                <span className="align-top text-[0.5em]">%</span>
              </dt>
              <dd
                className={cn(
                  'tnum text-[14px] leading-snug',
                  dark ? 'text-ghost/80' : 'text-ink/75',
                )}
              >
                {row.label}
              </dd>
              <dd
                aria-hidden="true"
                className={cn(
                  'col-span-2 mt-3 h-[6px] w-full',
                  dark ? 'bg-ghost/12' : 'bg-hairline',
                )}
              >
                <div
                  className={cn(
                    'h-full',
                    accent
                      ? dark
                        ? 'bg-cobalt-bright'
                        : 'bg-cobalt'
                      : dark
                        ? 'bg-ghost'
                        : 'bg-ink',
                  )}
                  style={{ width: `${row.value}%` }}
                />
              </dd>
            </div>
          );
        })}
      </dl>
      <p className={cn('tnum mt-5 text-[13px]', dark ? 'text-ghost/70' : 'text-ink/70')}>
        Source:{' '}
        <a
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'underline underline-offset-4',
            dark
              ? 'decoration-ghost/40 hover:text-ghost focus-visible:outline-cobalt-bright'
              : 'decoration-ink/30 hover:text-ink',
          )}
        >
          {source.label}
        </a>
      </p>
    </div>
  );
}
