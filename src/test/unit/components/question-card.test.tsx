/**
 * question-card.test.tsx
 *
 * Tests for the QuestionCard component — the interactive scoring widget
 * users click through 18 times during the assessment.
 * Correctness here directly affects score calculation.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QuestionCard } from '@/components/scorecard/question-card';
import type { ScorecardQuestion } from '@/lib/scorecard';

const mockQuestion: ScorecardQuestion = {
  id: 1,
  text: 'Our key business data is centralized and accessible',
  pillar: 'data',
};

describe('QuestionCard', () => {
  it('renders the question text', () => {
    render(<QuestionCard question={mockQuestion} value={undefined} onChange={vi.fn()} index={0} />);
    expect(screen.getByText(/centralized and accessible/i)).toBeInTheDocument();
  });

  it('renders 5 score buttons (1–5)', () => {
    render(<QuestionCard question={mockQuestion} value={undefined} onChange={vi.fn()} index={0} />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByLabelText(new RegExp(`${i} out of 5`, 'i'))).toBeInTheDocument();
    }
  });

  it('calls onChange with the correct question ID and score on click', () => {
    const handleChange = vi.fn();
    render(
      <QuestionCard question={mockQuestion} value={undefined} onChange={handleChange} index={0} />,
    );
    // Click score button 3
    fireEvent.click(screen.getByLabelText(/3 out of 5/i));
    expect(handleChange).toHaveBeenCalledOnce();
    expect(handleChange).toHaveBeenCalledWith(mockQuestion.id, 3);
  });

  it('calls onChange with score 1 when the first button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <QuestionCard question={mockQuestion} value={undefined} onChange={handleChange} index={0} />,
    );
    fireEvent.click(screen.getByLabelText(/1 out of 5/i));
    expect(handleChange).toHaveBeenCalledWith(mockQuestion.id, 1);
  });

  it('calls onChange with score 5 when the last button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <QuestionCard question={mockQuestion} value={undefined} onChange={handleChange} index={0} />,
    );
    fireEvent.click(screen.getByLabelText(/5 out of 5/i));
    expect(handleChange).toHaveBeenCalledWith(mockQuestion.id, 5);
  });

  it('shows the question number prefix', () => {
    render(<QuestionCard question={mockQuestion} value={undefined} onChange={vi.fn()} index={0} />);
    expect(screen.getByText(`Q${mockQuestion.id}`)).toBeInTheDocument();
  });

  it('does not crash when value is 0', () => {
    expect(() =>
      render(<QuestionCard question={mockQuestion} value={0} onChange={vi.fn()} index={0} />),
    ).not.toThrow();
  });

  it('renders correctly for the last question (index 17)', () => {
    const lastQuestion: ScorecardQuestion = {
      id: 18,
      text: 'Strategy question',
      pillar: 'strategy',
    };
    expect(() =>
      render(<QuestionCard question={lastQuestion} value={4} onChange={vi.fn()} index={17} />),
    ).not.toThrow();
  });
});
