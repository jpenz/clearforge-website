export const SCORECARD_LEAD_CONTEXT_KEY = "scorecardLeadContext";

export interface ScorecardLeadContext {
  email: string;
  challenge: string;
  companyUrl?: string;
  company?: string;
  source: "scorecard-results";
}
