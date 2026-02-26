"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  DollarSign,
  Clock,
  TrendingUp,
  ShieldCheck,
  Lock,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  calculateROI,
  formatCurrency,
  industries,
  type ROIInputs,
} from "@/lib/roi-calculator";

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <span className="text-sm font-semibold text-blue">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label}: ${format(value)}`}
        className="w-full accent-blue"
        style={{
          background: `linear-gradient(to right, var(--color-blue) 0%, var(--color-blue) ${percentage}%, var(--color-bg-elevated) ${percentage}%, var(--color-bg-elevated) 100%)`,
        }}
      />
      <div className="mt-1 flex justify-between text-xs text-text-muted">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export function ROICalculatorPageClient() {
  const [inputs, setInputs] = useState<ROIInputs>({
    annualRevenue: 25_000_000,
    employees: 100,
    manualHoursPerWeek: 200,
    industry: "manufacturing",
  });

  const [email, setEmail] = useState("");
  const [isGated, setIsGated] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => calculateROI(inputs), [inputs]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/scorecard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          results: { type: "roi-calculator", ...results, inputs },
          segment: results.estimatedAnnualValue > 200_000 ? "A" : "B",
        }),
      });
    } catch {
      // Non-blocking
    }
    setIsGated(false);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-blue">
            ROI Calculator
          </p>
          <h1 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">
            Estimate Your AI Implementation Value
          </h1>
          <p className="mt-4 text-text-secondary">
            See how much value AI-driven automation could unlock for your
            business based on your specific operations.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Inputs */}
            <motion.div
              className="rounded-xl border border-border-subtle bg-bg-card p-6 sm:p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Your Business
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Adjust the sliders to match your operations
              </p>

              <div className="mt-8 space-y-8">
                <Slider
                  label="Annual Revenue"
                  value={inputs.annualRevenue}
                  onChange={(v) =>
                    setInputs((prev) => ({ ...prev, annualRevenue: v }))
                  }
                  min={1_000_000}
                  max={500_000_000}
                  step={1_000_000}
                  format={(v) => formatCurrency(v)}
                />

                <Slider
                  label="Number of Employees"
                  value={inputs.employees}
                  onChange={(v) =>
                    setInputs((prev) => ({ ...prev, employees: v }))
                  }
                  min={10}
                  max={2000}
                  step={10}
                  format={(v) => v.toLocaleString()}
                />

                <Slider
                  label="Manual Process Hours / Week"
                  value={inputs.manualHoursPerWeek}
                  onChange={(v) =>
                    setInputs((prev) => ({ ...prev, manualHoursPerWeek: v }))
                  }
                  min={10}
                  max={2000}
                  step={10}
                  format={(v) => `${v.toLocaleString()} hrs`}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Industry
                  </label>
                  <select
                    value={inputs.industry}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        industry: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 text-sm text-text-primary focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
                  >
                    {industries.map((ind) => (
                      <option key={ind.value} value={ind.value}>
                        {ind.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              className="rounded-xl border border-border-subtle bg-bg-card p-6 sm:p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Estimated Annual Value
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Based on your inputs and industry benchmarks
              </p>

              <motion.div
                className="mt-8 text-center"
                key={results.estimatedAnnualValue}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-5xl font-bold text-text-primary sm:text-6xl">
                  {formatCurrency(results.estimatedAnnualValue)}
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  estimated annual value from AI implementation
                </p>
              </motion.div>

              {/* Metrics */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-bg-elevated p-4 text-center">
                  <Clock className="mx-auto h-5 w-5 text-blue" />
                  <p className="mt-2 text-xl font-bold text-text-primary">
                    {results.timeReclaimed.toLocaleString()}
                  </p>
                  <p className="text-xs text-text-muted">Hours Reclaimed/yr</p>
                </div>
                <div className="rounded-lg bg-bg-elevated p-4 text-center">
                  <ShieldCheck className="mx-auto h-5 w-5 text-emerald" />
                  <p className="mt-2 text-xl font-bold text-text-primary">
                    {results.errorReduction}%
                  </p>
                  <p className="text-xs text-text-muted">Error Reduction</p>
                </div>
                <div className="rounded-lg bg-bg-elevated p-4 text-center">
                  <TrendingUp className="mx-auto h-5 w-5 text-blue" />
                  <p className="mt-2 text-xl font-bold text-text-primary">
                    {results.productivityGain}%
                  </p>
                  <p className="text-xs text-text-muted">
                    Productivity Gain
                  </p>
                </div>
              </div>

              {/* Breakdown preview */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <DollarSign className="h-4 w-4 text-blue" />
                    Labor Cost Savings
                  </span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(results.breakdown.laborSavings)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <DollarSign className="h-4 w-4 text-emerald" />
                    Error Reduction Savings
                  </span>
                  <span className="font-medium text-text-primary">
                    {formatCurrency(results.breakdown.errorSavings)}
                  </span>
                </div>
                {isGated ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-text-muted">
                      <Lock className="h-4 w-4" />
                      Productivity Value
                    </span>
                    <span className="text-text-muted">Unlock below</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-text-secondary">
                      <DollarSign className="h-4 w-4 text-blue" />
                      Productivity Value
                    </span>
                    <span className="font-medium text-text-primary">
                      {formatCurrency(results.breakdown.productivityValue)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Email Gate */}
          {isGated && (
            <motion.div
              className="mt-8 rounded-xl border border-blue/30 bg-gradient-to-br from-blue/5 to-emerald/5 p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Lock className="mx-auto h-8 w-8 text-blue" />
              <h3 className="mt-4 text-xl font-bold text-text-primary">
                Get Your Detailed Breakdown
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
                Enter your email to unlock the full value breakdown with
                implementation recommendations.
              </p>
              <form
                onSubmit={handleEmailSubmit}
                className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? "Unlocking..." : "Unlock Full Report"}
                  <Download className="h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          )}

          {submitted && !isGated && (
            <motion.div
              className="mt-8 rounded-xl border border-emerald/30 bg-emerald/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium text-emerald">
                Full breakdown unlocked! Report sent to {email}.
              </p>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-primary">
            Ready to Capture This Value?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Book a discovery call to discuss how we can help you implement
            AI-driven improvements for your specific business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild>
              <Link href="/contact">
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/scorecard">Take AI Scorecard</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
