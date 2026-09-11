// Pure string/date helpers used by both the indexer (parse time) and the query
// library (read time). No imports: this module must stay free of gray-matter,
// globby, or any other heavy dependency so lib.ts can pull it in cheaply.

export function makeExcerpt(content: string, maxLen = 200): string {
  return content
    .replace(/^---[\s\S]*?---\n?/, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen)
}

// Frontmatter dates come in as either a JS Date (gray-matter parses bare
// YAML dates that way) or a string. Both are normalized to YYYY-MM-DD so the
// index never stores a Date#toString() rendering like
// "Wed Feb 19 2025 19:00:00 GMT-0500".
export function normalizeDate(value: unknown): string | null {
  if (value == null) return null
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  const str = String(value)
  const parsed = new Date(str)
  return isNaN(parsed.getTime()) ? str : parsed.toISOString().slice(0, 10)
}

// Quotes a single search term for FTS5 MATCH syntax so it is always treated
// as a literal phrase, never as column-filter ("word:") or NOT ("-word")
// syntax. Without this, a term like "self-limitation:" crashes FTS5 with
// "no such column: limitation".
export function quoteFtsTerm(term: string): string {
  return `"${term.replace(/"/g, '""')}"`
}
