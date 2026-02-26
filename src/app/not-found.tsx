import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-white py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <span className="metric-display text-6xl">404</span>
        <h1 className="mt-4 text-3xl text-midnight" style={{ fontFamily: "var(--font-libre-bodoni)" }}>
          Page not found
        </h1>
        <p className="mt-2 text-base text-stone">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
