import { getDb } from "../db"
import { makeExcerpt } from "../indexer"
import type { NoteWithExcerpt } from "../types"

interface TagsArgs {
  tag: string
  limit?: number
}

export function gardenTags({ tag, limit = 50 }: TagsArgs): NoteWithExcerpt[] {
  const db = getDb()

  const rows = db
    .prepare(
      `SELECT n.id, n.path, n.title, n.description, n.date, n.domain, n.draft, n.updated, n.content
       FROM tags t JOIN notes n ON n.id = t.note_id
       WHERE t.tag = ? AND n.draft = 0
       ORDER BY n.title
       LIMIT ?`,
    )
    .all(tag, limit) as Array<Record<string, unknown>>

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
