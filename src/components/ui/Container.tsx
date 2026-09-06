import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Gutter = 'page' | 'cells';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * 'page' (default): the container carries the horizontal gutter
   * (px-5 md:px-10 xl:px-14). Use it when the children have no gutter of
   * their own: Header, Footer, the hero.
   *
   * 'cells': the children carry a px-5 md:px-10 gutter themselves (every
   * PageFrame cell on the site does). The container then adds only the
   * 16px the page gutter gains at xl, so content edges stay aligned with
   * the header and footer at every breakpoint.
   */
  gutter?: Gutter;
}

/**
 * The V13 content container. Bands paint edge to edge; this is the
 * measure their content sits in: 1440px, 1600px on 2xl screens, so at
 * 1920 the widest content edge is about 216px from the viewport edge.
 */
export function Container({ children, className, gutter = 'page' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1440px] 2xl:max-w-[1600px]',
        gutter === 'page' ? 'px-5 md:px-10 xl:px-14' : 'xl:px-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
