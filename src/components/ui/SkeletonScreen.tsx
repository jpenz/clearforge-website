import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/** Animated pulse placeholder for a single element */
function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded bg-bg-surface', className)}
      aria-hidden="true"
    />
  );
}

/** Full-page skeleton matching the Hero → Services → Trust layout */
export function SkeletonScreen() {
  return (
    <div aria-busy="true" aria-label="Loading page content" role="status">
      {/* Hero skeleton */}
      <section className="relative min-h-[100svh] bg-bg-deep flex items-end px-6 lg:px-8 pb-28 pt-40">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-20 w-3/4 max-w-2xl" />
          <Skeleton className="h-6 w-96 max-w-full" />
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-12 w-52 rounded-lg" />
            <Skeleton className="h-12 w-44 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Stat strip skeleton */}
      <div className="bg-bg-primary py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <div key={i} className="space-y-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Services skeleton */}
      <section className="bg-bg-light py-20 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-4 w-24 mb-6" />
          <Skeleton className="h-12 w-80 mb-12" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <div key={i} className="rounded-xl bg-bg-surface p-8 space-y-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-28 mt-4" />
                <Skeleton className="h-10 w-full rounded-lg mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust skeleton */}
      <section className="bg-bg-deep py-20 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-4 w-32 mb-6" />
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 mb-16">
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <div key={i} className="space-y-2">
                <Skeleton className="h-14 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <div key={i} className="rounded-xl bg-bg-surface p-6 space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
