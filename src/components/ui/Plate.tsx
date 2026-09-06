import Image from 'next/image';
import { cn } from '@/lib/utils';

type Overlay = 'strong' | 'strong-right' | 'soft';

interface PlateProps {
  /** Same-origin render under public/renders. */
  src: string;
  /** Empty (the default) marks the plate decorative. */
  alt?: string;
  /** The LCP plate only: preloaded and fetched at high priority. */
  priority?: boolean;
  /** CSS object-position, so a right-weighted render stays in frame on narrow crops. */
  position?: string;
  /**
   * Legibility scrim. 'strong' (default) is the left-heavy band scrim for
   * text-bearing dark bands; 'strong-right' adds a shadow pool behind a
   * right-hand text column (hero label row, interior title blocks) so
   * small labels clear 4.5:1 on the render's bright zone; 'soft' is the
   * bottom-heavy scrim for image cards whose text sits at the foot.
   */
  overlay?: Overlay;
  /** Responsive sizes hint; defaults to the full viewport. */
  sizes?: string;
  className?: string;
}

const OVERLAY_CLASS: Record<Overlay, string> = {
  strong: 'cf-plate-overlay',
  'strong-right': 'cf-plate-overlay',
  soft: 'cf-plate-overlay-soft',
};

/**
 * A full-bleed back plate for a dark band: the render (sized 112 percent
 * tall so the scroll-driven parallax never exposes an edge), then the
 * legibility overlay. The band's own film grain paints on top of both.
 * Place it first inside a positioned band, before the aurora layers.
 */
export function Plate({
  src,
  alt = '',
  priority = false,
  position = '50% 50%',
  overlay = 'strong',
  sizes = '100vw',
  className,
}: PlateProps) {
  return (
    <div
      aria-hidden={alt === '' || undefined}
      className={cn('pointer-events-none absolute inset-0 overflow-clip', className)}
    >
      <div className="cf-plate-parallax absolute inset-x-0 top-[-6%] h-[112%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={72}
          priority={priority}
          fetchPriority={priority ? 'high' : undefined}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <div className={cn('absolute inset-0', OVERLAY_CLASS[overlay])} />
      {overlay === 'strong-right' && <div className="cf-plate-pool absolute inset-0" />}
    </div>
  );
}
