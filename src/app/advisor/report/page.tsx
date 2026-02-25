"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MarkdownContent } from "@/components/markdown-content";
import { Button } from "@/components/ui/button";
import { ADVISOR_REPORT_STORAGE_KEY, AdvisorReportPayload } from "@/lib/advisor-report";

function isReportPayload(value: unknown): value is AdvisorReportPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<AdvisorReportPayload>;

  return (
    typeof payload.generatedAt === "string" &&
    typeof payload.clientName === "string" &&
    typeof payload.clientEmail === "string" &&
    typeof payload.clientCompany === "string" &&
    typeof payload.clientRole === "string" &&
    typeof payload.industry === "string" &&
    typeof payload.challenge === "string" &&
    typeof payload.recommendation === "string" &&
    typeof payload.companyResearch === "string" &&
    Array.isArray(payload.suggestedSolutions) &&
    typeof payload.suggestedEngagement === "string"
  );
}

export default function AdvisorReportPage() {
  const [report, setReport] = useState<AdvisorReportPayload | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(ADVISOR_REPORT_STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as unknown;
      if (isReportPayload(parsed)) {
        setReport(parsed);
      }
    } catch (error) {
      console.error("Failed to load advisor report", error);
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
    if (!report) {
      return "";
    }

    const parsedDate = new Date(report.generatedAt);
    if (Number.isNaN(parsedDate.getTime())) {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [report]);

  if (!loaded) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 text-center text-slate-600">
        Preparing your report...
      </main>
    );
  }

  if (!report) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-navy">No report found</h1>
        <p className="mt-3 text-base text-slate-600">Go back to the AI Advisor, generate a recommendation, then download the report.</p>
        <Button asChild className="mt-6">
          <Link href="/advisor">Return to AI Advisor</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 print:bg-white print:p-0">
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
          <Link href="/advisor">Back to Advisor</Link>
        </Button>
      </div>

      <article
        className="report-shell mx-auto w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-10"
        style={{ maxWidth: "210mm", minHeight: "297mm" }}
      >
        <header className="border-b border-gray-200 pb-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">ClearForge.ai</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-navy">AI Strategy Recommendation Report</h1>
              <p className="mt-2 text-sm text-slate-600">Prepared for leadership review and planning discussion.</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-right text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Report Date</p>
              <p>{reportDate}</p>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-4 border-b border-gray-200 pb-8 text-sm text-slate-700 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Client</p>
            <p className="mt-1 font-semibold text-slate-900">{report.clientName}</p>
            <p>{report.clientRole}</p>
            <p>{report.clientCompany}</p>
            <p>{report.clientEmail}</p>
            {report.clientPhone && <p>{report.clientPhone}</p>}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Advisory Context</p>
            <p className="mt-1"><span className="font-semibold text-slate-900">Industry:</span> {report.industry}</p>
            <p className="mt-1"><span className="font-semibold text-slate-900">Challenge:</span> {report.challenge}</p>
            {report.companyUrl && (
              <p className="mt-1 break-all">
                <span className="font-semibold text-slate-900">Company URL:</span> {report.companyUrl}
              </p>
            )}
          </div>
        </section>

        <section className="report-prose mt-8">
          <h2 className="text-2xl font-bold text-slate-navy">Strategic Recommendation</h2>
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
            <MarkdownContent markdown={report.recommendation} />
          </div>
        </section>

        {report.companyResearch && report.companyResearch !== "No company URL provided." && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-navy">Company Research Summary</h2>
            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{report.companyResearch}</p>
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-lg font-bold text-slate-navy">Recommended ClearForge Solutions</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {report.suggestedSolutions.map((solution) => (
                <li key={solution}>{solution}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-lg font-bold text-slate-navy">Suggested Engagement</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{report.suggestedEngagement}</p>
          </div>
        </section>

        <footer className="mt-10 border-t border-gray-200 pt-6 text-xs text-slate-500">
          <p className="font-semibold uppercase tracking-[0.14em] text-slate-700">ClearForge.ai</p>
          <p className="mt-1">This report is prepared as strategic guidance for discovery planning.</p>
        </footer>
      </article>
    </main>
  );
}
