import type { ScorecardResult } from "@/lib/scorecard";

export const ASSESSMENT_REPORT_STORAGE_KEY = "clearforge:assessment-report:v1";

export interface AssessmentReportPayload {
  generatedAt: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientRole: string;
  clientPhone?: string;
  industry: string;
  challenge: string;
  companyUrl?: string;
  scorecard: ScorecardResult;
  closerReport: string;
  companyResearch: string;
  industryBestInClass: string;
  suggestedSolutions: string[];
  suggestedEngagement: string;
}
