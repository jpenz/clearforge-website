export const ADVISOR_REPORT_STORAGE_KEY = "clearforge:advisor-report:v1";

export interface AdvisorReportPayload {
  generatedAt: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientRole: string;
  clientPhone?: string;
  industry: string;
  challenge: string;
  companyUrl?: string;
  recommendation: string;
  companyResearch: string;
  suggestedSolutions: string[];
  suggestedEngagement: string;
}
