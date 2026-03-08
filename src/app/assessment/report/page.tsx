"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MarkdownContent } from "@/components/markdown-content";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_REPORT_STORAGE_KEY, type AssessmentReportPayload } from "@/lib/assessment-report";

function isAssessmentPayload(value: unknown): value is AssessmentReportPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<AssessmentReportPayload>;
  return (
    typeof payload.generatedAt === "string" &&
    typeof payload.clientName === "string" &&
    typeof payload.clientEmail === "string" &&
    typeof payload.clientCompany === "string" &&
    typeof payload.clientRole === "string" &&
    typeof payload.industry === "string" &&
    typeof payload.challenge === "string" &&
    typeof payload.closerReport === "string" &&
    typeof payload.companyResearch === "string" &&
    typeof payload.industryBestInClass === "string" &&
    Array.isArray(payload.suggestedSolutions) &&
    typeof payload.suggestedEngagement === "string" &&
    !!payload.scorecard
  );
}

export default function AssessmentReportPage() {
  const [report, setReport] = useState<AssessmentReportPayload | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(ASSESSMENT_REPORT_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as unknown;
      if (isAssessmentPayload(parsed)) {
        setReport(parsed);
      }
    } catch (error) {
      console.error("Failed to load assessment report", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!report) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.print();
    }, 650);

    return () => window.clearTimeout(timer);
  }, [report]);

  const reportDate = useMemo(() => {
    if (!report) return "";
    const date = new Date(report.generatedAt);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [report]);

  if (!loaded) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 text-center text-text-secondary">
        Preparing your report...
      </main>
    );
  }

  if (!report) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-text">No report found</h1>
        <p className="mt-3 text-base text-text-secondary">Run the assessment first, then download your report.</p>
        <Button asChild className="mt-6">
          <Link href="/assessment">Go to Assessment</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-8 print:bg-white print:p-0">
      <style jsx global>{`
        @page {
          size: A4;
          margin: 14mm;
        }
        @media print {
          html,
          body {
            background: #ffffff !important;
          }
          .report-actions {
            display: none !important;
          }
          .report-shell {
            margin: 0 auto !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            min-height: auto !important;
            width: 100% !important;
            max-width: none !important;
          }
          .report-prose .prose-content {
            max-width: 100% !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <div className="report-actions mx-auto mb-4 flex w-full max-w-[900px] flex-wrap justify-end gap-3">
        <Button onClick={() => window.print()}>Print / Save as PDF</Button>
        <Button asChild variant="outline">
          <Link href="/assessment">Back to Assessment</Link>
        </Button>
      </div>

      <article
        className="report-shell mx-auto w-full rounded-2xl border border-border bg-white p-6 shadow-2xl sm:p-10"
        style={{ maxWidth: "210mm", minHeight: "297mm" }}
      >
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">ClearForge.ai</p>
              <h1 className="mt-2 text-3xl font-bold text-text">AI Readiness & Opportunity Report</h1>
              <p className="mt-2 text-sm text-text-secondary">
                Strategy plan for leadership decision and execution alignment.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface px-4 py-3 text-right text-sm text-text-secondary">
              <p className="font-semibold text-text">Report Date</p>
              <p>{reportDate}</p>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-4 border-b border-border pb-8 text-sm text-text-secondary sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-text-tertiary">Client</p>
            <p className="mt-1 font-semibold text-text">{report.clientName}</p>
            <p>{report.clientRole}</p>
            <p>{report.clientCompany}</p>
            <p>{report.clientEmail}</p>
            {report.clientPhone && <p>{report.clientPhone}</p>}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-text-tertiary">Assessment Context</p>
            <p className="mt-1">
              <span className="font-semibold text-text">Industry:</span> {report.industry}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-text">Pain point:</span> {report.challenge}
            </p>
            {report.companyUrl && (
              <p className="mt-1 break-all">
                <span className="font-semibold text-text">Company URL:</span> {report.companyUrl}
              </p>
            )}
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          <article className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-lg font-bold text-text">Readiness Score</h2>
            <p className="metric-display mt-3 text-4xl">{report.scorecard.compositeScore}</p>
            <p className="mt-2 text-sm text-text-secondary">{report.scorecard.maturityLevel}</p>
            <p className="mt-2 text-sm text-text-secondary">{report.scorecard.maturityDescription}</p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-lg font-bold text-text">Recommended Engagement</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{report.suggestedEngagement}</p>
          </article>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-text">Pillar Breakdown</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {report.scorecard.pillarScores.map((pillar) => (
              <div key={pillar.key} className="rounded-lg border border-border bg-white p-4">
                <p className="text-sm font-semibold text-text">{pillar.name}</p>
                <p className="mt-1 text-sm text-text-secondary">{Math.round(pillar.percentage)}% readiness</p>
              </div>
            ))}
          </div>
        </section>

        <section className="report-prose mt-8">
          <h2 className="text-2xl font-bold text-text">Strategy Plan</h2>
          <div className="mt-4 rounded-xl border border-border bg-white p-6">
            <MarkdownContent markdown={report.closerReport} />
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-lg font-bold text-text">Company Research Snapshot</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{report.companyResearch}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-lg font-bold text-text">Industry Best-in-Class Reference</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">{report.industryBestInClass}</p>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-bold text-text">Recommended Solutions</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
            {report.suggestedSolutions.map((solution) => (
              <li key={solution}>{solution}</li>
            ))}
          </ul>
        </section>

        <footer className="mt-10 border-t border-border pt-6 text-xs text-text-tertiary">
          <p className="font-semibold uppercase tracking-[0.14em] text-text-secondary">ClearForge.ai</p>
          <p className="mt-1">Strategy that ships. AI that performs.</p>
          <p className="mt-1">Contact: hello@clearforge.ai · (248) 963-7440 · clearforge.ai/contact</p>
        </footer>
      </article>
    </main>
  );
}
