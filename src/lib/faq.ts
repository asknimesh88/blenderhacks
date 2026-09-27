export interface Faq { question: string; answer: string; }

/** Markdown/MDX fragment → plain text for structured data. */
function plain(md: string): string {
  return md
    .replace(/<[^>]+>/g, '')                  // components / HTML
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // links → text
    .replace(/[*_`]+/g, '')                   // emphasis, code
    .replace(/^\s*[-*]\s+/gm, '')             // list markers
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Reads the "## Frequently asked questions" (or "## FAQ") section of a post:
 * each "### Question" heading followed by its answer text.
 */
export function extractFaqs(body = ''): Faq[] {
  const section = body.match(/^##\s+(?:frequently asked questions|faqs?)\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/im);
  if (!section) return [];
  return section[1]
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [first, ...rest] = chunk.split('\n');
      return { question: plain(first), answer: plain(rest.join('\n')) };
    })
    .filter((f) => f.question && f.answer);
}
