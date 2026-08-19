export interface ScorecardPillar {
  name: string;
}

export interface ScorecardQuestion {
  pillarIndex: number;
  text: string;
  lowLabel: string;
  highLabel: string;
}

/** Five pillars, two questions each, answered on a 1 to 5 scale. */
export const PILLARS: ScorecardPillar[] = [
  { name: "Workflow clarity" },
  { name: "Data readiness" },
  { name: "Team adoption" },
  { name: "Reliability practice" },
  { name: "Leadership mandate" },
];

export const QUESTIONS: ScorecardQuestion[] = [
  {
    pillarIndex: 0,
    text: "Can you name the single workflow where manual work costs the most today?",
    lowLabel: "No idea",
    highLabel: "Precisely",
  },
  {
    pillarIndex: 0,
    text: "How well documented are the steps of that workflow?",
    lowLabel: "Undocumented",
    highLabel: "Fully documented",
  },
  {
    pillarIndex: 1,
    text: "How consistently is the data this workflow depends on captured today?",
    lowLabel: "Never consistent",
    highLabel: "Fully consistent",
  },
  {
    pillarIndex: 1,
    text: "How much of that data lives in systems rather than inboxes and spreadsheets?",
    lowLabel: "All inboxes",
    highLabel: "All in systems",
  },
  {
    pillarIndex: 2,
    text: "How does the team react when a new tool enters their workflow?",
    lowLabel: "Resists it",
    highLabel: "Adopts it fast",
  },
  {
    pillarIndex: 2,
    text: "Who would own weekly adoption of a new system?",
    lowLabel: "Nobody yet",
    highLabel: "A named owner",
  },
  {
    pillarIndex: 3,
    text: "How do you check the quality of automated or AI output today?",
    lowLabel: "We do not",
    highLabel: "Against a test set",
  },
  {
    pillarIndex: 3,
    text: "What happens when an automated step fails silently?",
    lowLabel: "Nobody notices",
    highLabel: "Alerts and rollback",
  },
  {
    pillarIndex: 4,
    text: "How clear is the leadership mandate to put AI into this workflow?",
    lowLabel: "No mandate",
    highLabel: "Written and funded",
  },
  {
    pillarIndex: 4,
    text: "Is there budget attached to that mandate?",
    lowLabel: "None",
    highLabel: "Approved",
  },
];

export interface ScoreResult {
  overall: number;
  pillarScores: number[];
  readout: string;
}

/** Score 10 answers (1 to 5) into an overall 0 to 100 plus per-pillar scores. */
export function scoreAnswers(answers: number[]): ScoreResult {
  const pillarScores = PILLARS.map((_, pillarIndex) => {
    const values = QUESTIONS.map((question, questionIndex) =>
      question.pillarIndex === pillarIndex ? answers[questionIndex] : null,
    ).filter((value): value is number => value != null);
    const sum = values.reduce((total, value) => total + value, 0);
    return Math.round((sum / (values.length * 5)) * 100);
  });

  const overall = Math.round(
    pillarScores.reduce((total, value) => total + value, 0) /
      pillarScores.length,
  );

  const strongest = pillarScores.indexOf(Math.max(...pillarScores));
  const weakest = pillarScores.indexOf(Math.min(...pillarScores));
  const readout = `Strong ${PILLARS[strongest].name.toLowerCase()}. ${PILLARS[weakest].name} is the gap.`;

  return { overall, pillarScores, readout };
}
