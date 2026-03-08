import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <span className="metric-display text-6xl">404</span>
        <h1 className="mt-4 text-2xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>Page not found</h1>
        <p className="mt-2 text-base text-text-tertiary">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Button className="mt-8" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
