import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-parchment">
      <div className="text-center px-6">
        <span className="metric-xl text-brass/20">404</span>
        <h1 className="text-display -mt-4">Page not found.</h1>
        <p className="mt-4 text-body-lg text-warm-gray">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8">
          <Button asChild><Link href="/">Go Home</Link></Button>
        </div>
      </div>
    </section>
  );
}
