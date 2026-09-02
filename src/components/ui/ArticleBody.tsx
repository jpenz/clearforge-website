import Link from 'next/link';
import type { ArticleBlock, Inline } from '@/data/insights';
import { cn } from '@/lib/utils';

/* Article blocks are static editorial content — never reordered or mutated at
   runtime — so a type-qualified position key is stable and collision-free. */
function withKeys<T>(items: readonly T[], label: (item: T) => string): Array<[string, T]> {
  const seen = new Map<string, number>();
  return items.map((item) => {
    const base = label(item);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return [n === 1 ? base : `${base}~${n}`, item];
  });
}

function InlineContent({ content }: { content: Inline[] }) {
  const keyed = withKeys(content, (segment) =>
    typeof segment === 'string' ? segment : `${segment.href ?? ''}${segment.text}`,
  );
  return (
    <>
      {keyed.map(([key, segment]) => {
        if (typeof segment === 'string') {
          return <span key={key}>{segment}</span>;
        }
        if (segment.href) {
          return (
            <Link
              key={key}
              href={segment.href}
              className="text-cobalt underline decoration-cobalt/40 underline-offset-2 hover:decoration-cobalt"
            >
              {segment.text}
            </Link>
          );
        }
        return (
          <span
            key={key}
            className={cn(segment.tnum && 'tnum', segment.bold && 'font-semibold text-ink')}
          >
            {segment.text}
          </span>
        );
      })}
    </>
  );
}

/**
 * Readable long-form article renderer: generous measure, hairline tables,
 * pull quotes on strong rules, cobalt square bullets.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  const keyedBlocks = withKeys(blocks, (block) => block.type);
  return (
    <div className="px-5 py-12 md:px-10 md:py-20">
      {keyedBlocks.map(([key, block]) => {
        switch (block.type) {
          case 'lead':
            return (
              <p key={key} className="mx-auto max-w-[68ch] text-[19px] leading-[1.65] text-ink">
                <InlineContent content={block.content} />
              </p>
            );
          case 'paragraph':
            return (
              <p
                key={key}
                className="mx-auto mt-6 max-w-[68ch] text-[17px] leading-[1.7] text-ink/80"
              >
                <InlineContent content={block.content} />
              </p>
            );
          case 'heading':
            return (
              <h2
                key={key}
                className="font-display mx-auto mt-16 max-w-[68ch] text-[28px] leading-[1.15] font-medium text-ink md:text-[34px]"
              >
                {block.text}
              </h2>
            );
          case 'table':
            return (
              <div key={key} className="mx-auto mt-10 max-w-[900px] overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left md:min-w-0">
                  <caption className="sr-only">{block.caption}</caption>
                  <thead>
                    <tr className="border-y border-ink">
                      {block.headers.map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="py-3.5 pr-6 text-[11px] font-medium tracking-[0.14em] text-ink/60 uppercase"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[15px]">
                    {block.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-hairline">
                        {withKeys(row, (cell) => cell).map(([cellKey, cell], cellIndex) => (
                          <td
                            key={cellKey}
                            className={cn(
                              'py-4 pr-6',
                              cellIndex === 0 ? 'font-semibold text-ink' : 'tnum text-ink/80',
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'pullquote':
            return (
              <figure
                key={key}
                className="mx-auto my-16 max-w-[900px] border-y border-hairline-strong py-10 md:py-12"
              >
                <blockquote className="font-display mx-auto max-w-[26ch] text-center text-[28px] leading-[1.25] font-medium text-ink italic md:text-[36px]">
                  {block.text} <span className="text-cobalt">{block.emphasis}</span>
                </blockquote>
              </figure>
            );
          case 'list':
            return (
              <ul
                key={key}
                className="mx-auto mt-6 max-w-[68ch] space-y-3 text-[17px] leading-[1.7] text-ink/80"
              >
                {block.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="size-[7px] shrink-0 translate-y-[-1px] bg-cobalt"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
