"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight, Database, Brain, Workflow, Users, TrendingUp, DollarSign, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { questions, questionOptions, calculateScore, type Answers } from "@/lib/scorecard-new";

const categoryIcons: Record<string, React.ElementType> = {
  database: Database,
  brain: Brain,
  workflow: Workflow,
  users: Users,
  trending: TrendingUp,
  dollar: DollarSign,
};

const categoryInfo: Record<string, { name: string; icon: string }> = {
  data: { name: "Data Infrastructure", icon: "database" },
  adoption: { name: "AI Adoption", icon: "brain" },
  automation: { name: "Process Automation", icon: "workflow" },
  team: { name: "Team Readiness", icon: "users" },
  competition: { name: "Competitive Pressure", icon: "trending" },
  budget: { name: "Budget Allocation", icon: "dollar" },
};

type Step = "intro" | "questions" | "lead-form";

export function ScorecardPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [leadForm, setLeadForm] = useState({ name: "", email: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const question = questions[currentQuestion];
  const category = categoryInfo[question.category];
  const Icon = categoryIcons[category.icon];
  const options = questionOptions[currentQuestion];

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const canContinue = answers[question.id] !== undefined;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (!canContinue) return;
    if (isLastQuestion) {
      setStep("lead-form");
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === "lead-form") {
      setStep("questions");
      return;
    }
    if (currentQuestion === 0) {
      setStep("intro");
      return;
    }
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = calculateScore(answers);

    try {
      await fetch("/api/scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          answers,
          score: result.percentage,
          tier: result.tier,
        }),
      });
    } catch {
      // Intentionally non-blocking in case API is unavailable in preview/dev.
    }

    sessionStorage.setItem("scorecard-result", JSON.stringify(result));
    sessionStorage.setItem("scorecard-lead", JSON.stringify(leadForm));
    setIsSubmitting(false);
    router.push("/scorecard/results");
  };

  if (step === "intro") {
    return (
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="section-label">AI Readiness Scorecard</span>
            <h1 className="mt-4 text-4xl leading-tight text-midnight sm:text-5xl lg:text-6xl">
              How ready is your organization for applied AI?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Answer seven structured questions to benchmark your current readiness and identify your highest-value
              next move.
            </p>
            <p className="mt-3 text-sm text-stone">Takes under three minutes.</p>

            <Button size="lg" className="mt-8" onClick={() => setStep("questions")}>
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(categoryInfo).map(([key, info]) => {
              const CategoryIcon = categoryIcons[info.icon];
              return (
                <div key={key} className="border border-fog bg-ivory p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-fog bg-white text-midnight">
                      <CategoryIcon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-midnight">{info.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (step === "lead-form") {
    return (
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8 text-center">
              <span className="section-label">Final Step</span>
              <h2 className="mt-4 text-4xl leading-tight text-midnight">Get your full score and recommendations</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                We&apos;ll show your score immediately and send a copy to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 border border-fog bg-ivory p-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={leadForm.email}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  type="text"
                  required
                  value={leadForm.company}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, company: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Calculating..." : "See My Results"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button variant="link" onClick={handleBack}>
                <ChevronRight className="mr-1 h-4 w-4 rotate-180" /> Back to questions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-stone">
            <span>
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-fog">
            <motion.div
              className="h-full bg-midnight"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6 flex items-center gap-2 text-sm text-stone">
              <div className="flex h-8 w-8 items-center justify-center border border-fog bg-ivory text-midnight">
                <Icon className="h-4 w-4" />
              </div>
              <span>{category.name}</span>
            </div>

            <h2 className="mb-7 text-3xl leading-tight text-midnight">{question.text}</h2>

            <div className="space-y-3">
              {options.map((option) => {
                const selected = answers[question.id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full border px-4 py-4 text-left transition-colors ${
                      selected
                        ? "border-midnight bg-midnight text-white"
                        : "border-fog bg-white text-midnight hover:border-stone"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 items-center justify-center border ${
                          selected ? "border-white bg-brass" : "border-fog"
                        }`}
                      >
                        {selected && <CheckCircle className="h-4 w-4 text-white" />}
                      </span>
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack}>
            <ChevronRight className="mr-1 h-4 w-4 rotate-180" /> Back
          </Button>
          <Button onClick={handleNext} disabled={!canContinue}>
            {isLastQuestion ? "Continue" : "Next"} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-stone">
          Prefer to discuss live instead? <Link href="/contact" className="underline">Book a discovery call</Link>.
        </p>
      </div>
    </section>
  );
}
