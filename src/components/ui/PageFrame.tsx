import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

interface PageFrameProps {
  children: ReactNode;
  id?: string;
  className?: string;
  'aria-label'?: string;
  /** Draw the full-width bottom hairline rule. Defaults to true. */
  bottomRule?: boolean;
  /**
   * Canvas tone. 'light' (default) is the ghost canvas with the V13 depth
   * gradient; 'dark' is the cinematic band with the HDR core.
   */
  tone?: 'light' | 'dark';
}

/**
 * The V13 page frame: a full-bleed section whose background and bottom
 * hairline span the viewport, with the content in the shared Container.
 * No side rules. Cells inside keep their own px-5 md:px-10 gutter and
 * their vertical dividers; only the frame changed.
 */
export function PageFrame({
  children,
  id,
  className,
  bottomRule = true,
  tone = 'light',
  ...rest
}: PageFrameProps) {
  const dark = tone === 'dark';
  return (
    <section
      id={id}
      aria-label={rest['aria-label']}
      className={cn(
        dark ? 'cf-dark-band' : 'cf-light-band',
        bottomRule && 'border-b',
        bottomRule && (dark ? 'border-hairline-ghost' : 'border-hairline'),
        className,
      )}
    >
      <Container gutter="cells">{children}</Container>
    </section>
  );
}
