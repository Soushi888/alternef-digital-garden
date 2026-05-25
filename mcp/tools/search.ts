import { getDb } from "../db"
import { makeExcerpt } from "../indexer"
import type { NoteWithExcerpt } from "../types"

interface SearchArgs {
  query: string
  domain?: string
  tag?: string
  limit?: number
}

export function gardenSearch({ query, domain, tag, limit = 20 }: SearchArgs): NoteWithExcerpt[] {
  const db = getDb()

  let sql = `
    SELECT n.id, n.path, n.title, n.description, n.date, n.domain, n.draft, n.updated, n.content
    FROM notes_fts
    JOIN notes n ON notes_fts.rowid = n.rowid
    WHERE notes_fts MATCH ? AND n.draft = 0
  `
  const params: (string | number)[] = [query]

  if (domain) {
    sql += " AND n.domain = ?"
    params.push(domain)
  }

  if (tag) {
    sql += " AND EXISTS (SELECT 1 FROM tags t WHERE t.note_id = n.id AND t.tag = ?)"
    params.push(tag)
  }

  sql += " ORDER BY rank LIMIT ?"
  params.push(limit)

  const rows = db.prepare(sql).all(...params) as Array<Record<string, unknown>>
  return rows.map((r) => ({
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
}
