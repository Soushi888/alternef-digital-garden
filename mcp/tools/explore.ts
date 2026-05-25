import { getDb } from "../db"
import { makeExcerpt } from "../indexer"
import type { NoteWithExcerpt, LinkPair } from "../types"

interface ExploreArgs {
  query: string
  maxNotes?: number
}

interface ExploreResult {
  notes: NoteWithExcerpt[]
  linkMap: LinkPair[]
}

export function gardenExplore({ query, maxNotes = 10 }: ExploreArgs): ExploreResult {
  const db = getDb()

  // Sanitize query before passing to FTS5:
  // - "word:" is FTS5 column-filter syntax; strip colons after words
  // - Leading "-term" is FTS5 NOT; strip hyphens that precede word-start chars
  const safeFtsQuery = query
    .replace(/\b(\w+):/g, "$1 ")
    .replace(/(?<![a-zA-Z0-9])-(?=[a-zA-Z])/g, "")
    .trim()

  let rows: Array<Record<string, unknown>>
  try {
    rows = db
      .prepare(
        `SELECT n.id, n.path, n.title, n.description, n.date, n.domain, n.draft, n.updated, n.content
         FROM notes_fts
         JOIN notes n ON notes_fts.rowid = n.rowid
         WHERE notes_fts MATCH ? AND n.draft = 0
         ORDER BY rank
         LIMIT ?`,
      )
      .all(safeFtsQuery, maxNotes) as Array<Record<string, unknown>>
  } catch {
    // FTS5 query parse error — fall back to LIKE-based search
    const terms = safeFtsQuery.split(/\s+/).filter(Boolean)
    const likeClauses = terms.map(() => "(n.title LIKE ? OR n.description LIKE ? OR n.content LIKE ?)").join(" AND ")
    const likeParams = terms.flatMap((t) => [`%${t}%`, `%${t}%`, `%${t}%`])
    rows = db
      .prepare(
        `SELECT n.id, n.path, n.title, n.description, n.date, n.domain, n.draft, n.updated, n.content
         FROM notes n
         WHERE n.draft = 0 AND ${likeClauses}
         LIMIT ?`,
      )
      .all(...likeParams, maxNotes) as Array<Record<string, unknown>>
  }

  const notes: NoteWithExcerpt[] = rows.map((r) => ({
    id: r.id as string,
    path: r.path as string,
    title: r.title as string,
    description: (r.description as string | null) ?? null,
    date: (r.date as string | null) ?? null,
    domain: (r.domain as string | null) as NoteWithExcerpt["domain"],
    draft: r.draft === 1,
    updated: r.updated as string,
    excerpt: makeExcerpt(r.content as string),
  }))

  if (notes.length === 0) return { notes: [], linkMap: [] }

  // Find links between the found notes
  const ids = notes.map((n) => n.id)
  const placeholders = ids.map(() => "?").join(",")
  const linkRows = db
    .prepare(
      `SELECT source_id, target_id FROM links
       WHERE source_id IN (${placeholders}) AND target_id IN (${placeholders})`,
    )
    .all(...ids, ...ids) as Array<{ source_id: string; target_id: string }>

  const linkMap: LinkPair[] = linkRows.map((r) => ({ source: r.source_id, target: r.target_id }))

  return { notes, linkMap }
}
