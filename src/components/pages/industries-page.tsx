import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { broadIndustries, deepIndustries } from "@/data/industries";
import { industryIcons } from "@/lib/icons";

export function IndustriesPage() {
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">Industries</span>
          <h1 className="mt-4 text-4xl font-bold text-slate-navy sm:text-5xl">AI operating frameworks that travel across industries.</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            We apply the same strategy-to-operations model across sectors, with deepest execution experience in four verticals.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-navy">Where we go deepest</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {deepIndustries.map((industry) => {
              const Icon = industryIcons[industry.icon];
              return (
                <article key={industry.slug} className="rounded-xl border border-gray-200 bg-white p-6">
                  <Icon className="mb-3 h-8 w-8 text-teal" aria-hidden />
                  <h3 className="text-xl font-bold text-slate-navy">{industry.name}</h3>
                  <p className="mt-3 text-base text-slate-600">{industry.hero}</p>
                  <Button variant="link" className="mt-4 px-0" asChild>
                    <Link href={`/industries/${industry.slug}`}>
                      Explore industry playbook <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>

          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-xl font-bold text-slate-navy">We also serve</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {broadIndustries.map((industry) => (
                <div key={industry} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-navy py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Want a recommendation mapped to your industry context?</h2>
          <p className="mt-4 text-lg text-slate-200">Use the advisor to get a tailored path across solutions, engagement model, and likely time-to-impact.</p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/advisor">Get Your AI Recommendation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
