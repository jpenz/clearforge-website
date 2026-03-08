"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getCaseStudy } from "@/data/case-studies";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  MapPin,
  Users,
  BarChart3,
  Building2,
  Globe,
  RefreshCw,
  TrendingUp,
  Zap,
  Send,
  Target,
  Clock,
  Layers,
  Percent,
} from "lucide-react";

const solutionIcons = [Brain, MapPin, Users, BarChart3, Building2, Globe];
const continuousIcons = [RefreshCw, TrendingUp, Zap, Send];
const outcomeIcons = [Target, Layers, Clock, TrendingUp, Percent, Building2];

export function IndustrialManufacturerPage() {
  const cs = getCaseStudy("industrial-manufacturer")!;

  return (
    <>
      {/* Hero */}
      <section className="bg-bg-deep pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/case-studies" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> All Case Studies
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">{cs.industry}</span>
              <span className="text-xs text-text-muted">·</span>
              <span className="text-xs text-text-muted">{cs.service}</span>
            </div>
            <h1
              className="text-3xl text-text-primary sm:text-4xl lg:text-5xl max-w-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cs.title}
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-3xl leading-relaxed">{cs.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Bar — Light */}
      <section className="bg-bg-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px bg-border-light">
            {cs.outcomes.map((outcome, i) => {
              const Icon = outcomeIcons[i % outcomeIcons.length];
              return (
                <motion.div
                  key={outcome.metric}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                  className="bg-bg-light p-6 text-center"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="h-5 w-5 text-accent-dark" />
                  </div>
                  <div className="metric text-2xl font-bold text-accent-dark lg:text-3xl">{outcome.metric}</div>
                  <p className="mt-1 text-sm text-text-on-light-muted">{outcome.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="bg-bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">The Challenge</p>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">{cs.challenge}</p>
          </motion.div>
        </div>
      </section>

      {/* Solution — Light */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label text-accent-dark">The Solution</p>
            <h2
              className="mt-4 text-2xl text-text-on-light sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ClearForge Proprietary AI Platform
            </h2>
            <div className="mt-10 space-y-4">
              {cs.solution.map((item, i) => {
                const Icon = solutionIcons[i % solutionIcons.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.08 * i }}
                    className="flex items-start gap-4 border border-border-light bg-white/50 p-6"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10">
                      <Icon className="h-5 w-5 text-accent-dark" />
                    </div>
                    <p className="text-base text-text-on-light-sub leading-relaxed">{item}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Continuous Model */}
      {cs.continuousModel && (
        <section className="bg-bg-deep py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-label">Continuous Intelligence</p>
              <h2
                className="mt-4 text-2xl text-text-primary sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The system gets smarter every month.
              </h2>
              <div className="mt-10 space-y-4">
                {cs.continuousModel.map((item, i) => {
                  const Icon = continuousIcons[i % continuousIcons.length];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.08 * i }}
                      className="flex items-start gap-4 border border-border-subtle bg-bg-surface p-6"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10 border border-accent/20">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <p className="text-base text-text-secondary leading-relaxed">{item}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Scale */}
      <section className="bg-bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">The Scale</p>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">{cs.scale}</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-deep py-20 lg:py-28 hero-glow">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2
            className="text-3xl text-text-primary sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for results like these?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Every engagement starts with understanding your specific challenges.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Request a Proposal</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/case-studies">
                More Case Studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
