/**
 * progress-bar.test.tsx
 *
 * Tests for the Scorecard ProgressBar component.
 * This tracks user progress through the 5-pillar assessment —
 * correct step highlighting and ARIA attributes matter for accessibility.
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from '@/components/scorecard/progress-bar';
import { type PillarKey, pillars } from '@/lib/scorecard';

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(<ProgressBar currentStep={0} completedSteps={new Set<PillarKey>()} />),
    ).not.toThrow();
  });

  it('renders a step indicator for each pillar', () => {
    render(<ProgressBar currentStep={0} completedSteps={new Set<PillarKey>()} />);
    // Each pillar renders a numbered step indicator
    for (let i = 1; i <= pillars.length; i++) {
      // Either the number or a checkmark is visible
      const stepEl = screen.queryByText(String(i));
      const checkEl = screen.queryByText('✓');
      expect(stepEl || checkEl).toBeTruthy();
    }
  });

  it('has a progressbar role with correct aria values', () => {
    render(
      <ProgressBar currentStep={2} completedSteps={new Set<PillarKey>(['data', 'workforce'])} />,
    );
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('aria-valuenow increases as currentStep advances', () => {
    const { rerender } = render(
      <ProgressBar currentStep={0} completedSteps={new Set<PillarKey>()} />,
    );
    const step0Value = Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'));

    rerender(
      <ProgressBar
        currentStep={3}
        completedSteps={new Set<PillarKey>(['data', 'workforce', 'process'])}
      />,
    );
    const step3Value = Number(screen.getByRole('progressbar').getAttribute('aria-valuenow'));

    expect(step3Value).toBeGreaterThan(step0Value);
  });

  it('shows checkmark (✓) for completed pillars', () => {
    const completed = new Set<PillarKey>(['data', 'workforce']);
    render(<ProgressBar currentStep={2} completedSteps={completed} />);
    // Two completed steps should show checkmarks
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks.length).toBe(2);
  });

  it('progress is at 100% equivalent when on last step with all complete', () => {
    const allCompleted = new Set<PillarKey>(['data', 'workforce', 'process', 'tech', 'strategy']);
    render(<ProgressBar currentStep={pillars.length - 1} completedSteps={allCompleted} />);
    const progressbar = screen.getByRole('progressbar');
    expect(Number(progressbar.getAttribute('aria-valuenow'))).toBe(100);
  });
});
