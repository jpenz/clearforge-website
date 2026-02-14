"use client";

import { motion } from "framer-motion";
import { FileText, Wrench, Target } from "lucide-react";

export function Problem() {
  return (
    <section className="border-t border-border-subtle py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            Strategy firms give you decks.
            <br />
            Tech shops give you tools.
            <br />
            <span className="text-text-muted">Neither gives you results.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: FileText,
              label: "Strategy Firms",
              desc: "Beautiful roadmaps that collect dust. No implementation, no accountability.",
              color: "text-red-400",
            },
            {
              icon: Target,
              label: "ClearForge",
              desc: "Strategy + Engineering in one team. We build what we recommend and measure the results.",
              color: "text-emerald",
              highlight: true,
            },
            {
              icon: Wrench,
              label: "Tech Shops",
              desc: "Tools without strategy. Custom builds that don't align with business goals.",
              color: "text-orange-400",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className={`rounded-xl border p-6 text-center ${
                item.highlight
                  ? "border-emerald/30 bg-emerald/5"
                  : "border-border-subtle bg-bg-card"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <item.icon className={`mx-auto h-8 w-8 ${item.color}`} />
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                {item.label}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
