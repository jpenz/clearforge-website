import { marqueeItems } from '@/data/homepage';

/**
 * Slot #2 proof marquee — CSS-keyframe only, numbers tied to names
 * (anonymized-safe outcome chips in place of uncleared client logos).
 */
export function TrustMarquee() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === 'b'}>
      {marqueeItems.map((item) => (
        <span
          key={`${key}-${item.stat}-${item.label}`}
          className="flex items-baseline gap-2.5 whitespace-nowrap px-7"
        >
          <span className="metric text-lg text-brass">{item.stat}</span>
          <span className="text-sm text-warm-gray">{item.label}</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="border-y border-divider bg-warm-white py-5" aria-label="Client outcomes">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max">
          {row('a')}
          {row('b')}
        </div>
      </div>
    </section>
  );
}
