import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-bg-deep">
      <div className="noise-texture absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <span className="metric text-[8rem] leading-none font-bold opacity-20">404</span>
        <h1
          className="-mt-6 text-3xl font-bold text-text-primary lg:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Page not found
        </h1>
        <p className="mt-4 text-base text-text-secondary max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button variant="default" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
