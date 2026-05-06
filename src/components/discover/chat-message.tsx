'use client';

import type { ReactNode } from 'react';

/**
 * Simple markdown-like rendering for chat messages.
 * Handles: **bold**, *italic*, bullet lists, numbered lists, line breaks.
 * No external dependency — just regex transforms.
 */
export function ChatMessage({ content, role }: { content: string; role: 'user' | 'assistant' }) {
  const isUser = role === 'user';

  // Simple markdown transforms
  const renderContent = (text: string) => {
    let offset = 0;
    return text.split('\n').map((line) => {
      const key = `${offset}-${line}`;
      offset += line.length + 1;
      // Bullet list
      if (line.match(/^[-•]\s/)) {
        const bulletContent = line.replace(/^[-•]\s/, '');
        return (
          <li key={key} className="ml-4 list-disc text-body-sm">
            {renderInline(bulletContent)}
          </li>
        );
      }
      // Numbered list
      if (line.match(/^\d+\.\s/)) {
        const numContent = line.replace(/^\d+\.\s/, '');
        return (
          <li key={key} className="ml-4 list-decimal text-body-sm">
            {renderInline(numContent)}
          </li>
        );
      }
      // Empty line = paragraph break
      if (line.trim() === '') {
        return <br key={key} />;
      }
      // Regular line
      return (
        <p key={key} className="text-body-sm">
          {renderInline(line)}
        </p>
      );
    });
  };

  // Inline markdown: **bold**, *italic*
  const renderInline = (text: string) => {
    const parts: (string | ReactNode)[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(remaining.substring(0, boldMatch.index));
        }
        parts.push(
          <strong key={key++} className="font-semibold">
            {boldMatch[1]}
          </strong>,
        );
        remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
        continue;
      }

      // Italic: *text*
      const italicMatch = remaining.match(/\*(.+?)\*/);
      if (italicMatch && italicMatch.index !== undefined) {
        if (italicMatch.index > 0) {
          parts.push(remaining.substring(0, italicMatch.index));
        }
        parts.push(<em key={key++}>{italicMatch[1]}</em>);
        remaining = remaining.substring(italicMatch.index + italicMatch[0].length);
        continue;
      }

      // No more matches
      parts.push(remaining);
      break;
    }

    return <>{parts}</>;
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mt-1 hidden h-7 w-7 shrink-0 items-center justify-center border border-brass/30 bg-brass/10 text-[10px] font-bold text-brass-light sm:flex">
          FI
        </div>
      )}
      <div
        className={`max-w-[88%] p-4 space-y-1 text-sm leading-relaxed ${
          isUser
            ? 'bg-brass text-white'
            : 'border border-divider-dark bg-bone/[0.045] text-bone shadow-sm'
        }`}
      >
        {renderContent(content)}
      </div>
      {isUser && (
        <div className="mt-1 hidden h-7 w-7 shrink-0 items-center justify-center border border-bone/15 bg-bone/10 text-[10px] font-bold text-bone sm:flex">
          YOU
        </div>
      )}
    </div>
  );
}
