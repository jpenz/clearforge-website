import { describe, expect, it } from "vitest";
import { PILLARS, QUESTIONS, scoreAnswers } from "./scorecard";

describe("scorecard structure", () => {
  it("has 5 pillars and 10 questions, two per pillar", () => {
    expect(PILLARS).toHaveLength(5);
    expect(QUESTIONS).toHaveLength(10);
    for (let pillarIndex = 0; pillarIndex < PILLARS.length; pillarIndex++) {
      const count = QUESTIONS.filter(
        (question) => question.pillarIndex === pillarIndex,
      ).length;
      expect(count).toBe(2);
    }
  });
});

describe("scoreAnswers", () => {
  it("scores all 5s as 100 overall and per pillar", () => {
    const result = scoreAnswers(Array(10).fill(5));
    expect(result.overall).toBe(100);
    expect(result.pillarScores).toEqual([100, 100, 100, 100, 100]);
  });

  it("scores all 1s as 20 overall and per pillar", () => {
    const result = scoreAnswers(Array(10).fill(1));
    expect(result.overall).toBe(20);
    expect(result.pillarScores).toEqual([20, 20, 20, 20, 20]);
  });

  it("scores a mixed run correctly", () => {
    // Pillar pairs: (5,4) (2,2) (4,3) (3,2) (5,4)
    const result = scoreAnswers([5, 4, 2, 2, 4, 3, 3, 2, 5, 4]);
    expect(result.pillarScores).toEqual([90, 40, 70, 50, 90]);
    expect(result.overall).toBe(68);
  });

  it("names the strongest and weakest pillar in the readout", () => {
    const result = scoreAnswers([5, 4, 2, 2, 4, 3, 3, 2, 5, 4]);
    expect(result.readout).toBe(
      "Strong workflow clarity. Data readiness is the gap.",
    );
  });
});
