/**
 * Assessment types — re-exports the canonical types from scorecard.ts and
 * adds supplementary types used by the new assessment UI components.
 */

export type {
  ScorecardQuestion,
  PillarKey,
  Pillar,
  Answers,
  PillarScore,
  RoadmapStep,
  ScorecardResult,
} from '@/lib/scorecard';

export { pillars, questions, scaleLabels } from '@/lib/scorecard';

/** Multi-step form phases */
export type AssessmentPhase = 'questions' | 'details' | 'loading' | 'results';

/** Business context collected after the questionnaire */
export interface BusinessContext {
  name: string;
  email: string;
  company: string;
  industry: string;
  role: string;
  challenge: string;
  phone?: string;
  website?: string;
}

/** Full payload submitted to the API */
export interface AssessmentPayload extends BusinessContext {
  answers: import('@/lib/scorecard').Answers;
}

/** Shape of the API response */
export interface AssessmentApiResponse {
  scorecard: import('@/lib/scorecard').ScorecardResult;
  closerReport: string;
  companyResearch: string;
  industryBestInClass: string;
  suggestedSolutions: string[];
  suggestedEngagement: string;
  emailSent: boolean;
  leadSaved: boolean;
}
