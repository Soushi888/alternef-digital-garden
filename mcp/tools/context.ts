import { getDb } from "../db"
import { makeExcerpt } from "../indexer"
import { getNote } from "../lib"
import type { Note, NoteWithExcerpt, LinkTarget, LinkSource } from "../types"

interface ContextArgs {
  note: string
  includeContent?: boolean
  maxContentBytes?: number
}

interface ContextResult {
  note: Note & { content?: string; excerpt: string }
  outlinks: LinkTarget[]
  backlinks: LinkSource[]
  tagSiblings: NoteWithExcerpt[]
}

export function gardenContext({
  note,
  includeContent = false,
  maxContentBytes = 8000,
}: ContextArgs): ContextResult | null {
  const db = getDb()

  const full = getNote(db, note)
  if (!full) return null

  const noteId = full.id
  const content = full.content
  const excerpt = full.excerpt

  // Outgoing links
  const outlinks = db
    .prepare("SELECT target_id, target_raw, display_text FROM links WHERE source_id = ?")
    .all(noteId) as Array<{
    target_id: string | null
    target_raw: string
    display_text: string | null
  }>

  // Backlinks (distinct source notes)
  const backlinks = db
    .prepare(
      `SELECT DISTINCT n.id, n.title, n.path FROM links l
       JOIN notes n ON n.id = l.source_id
       WHERE l.target_id = ? AND n.draft = 0
       ORDER BY n.title`,
    )
    .all(noteId) as Array<{ id: string; title: string; path: string }>

  // Tag siblings (notes sharing ≥1 tag, excluding self)
  const tags = (
    db.prepare("SELECT tag FROM tags WHERE note_id = ?").all(noteId) as { tag: string }[]
  ).map((r) => r.tag)

  let tagSiblings: NoteWithExcerpt[] = []
  if (tags.length > 0) {
    const placeholders = tags.map(() => "?").join(",")
    const siblings = db
      .prepare(
        `SELECT DISTINCT n.id, n.path, n.title, n.description, n.date, n.domain, n.draft, n.updated, n.content
         FROM tags t JOIN notes n ON n.id = t.note_id
         WHERE t.tag IN (${placeholders}) AND n.id != ? AND n.draft = 0
         LIMIT 10`,
      )
      .all(...tags, noteId) as Array<Record<string, unknown>>

    tagSiblings = siblings.map((r) => ({
      id: r.id as string,
      path: r.path as string,
      title: r.title as string,
      description: (r.description as string | null) ?? null,
      date: (r.date as string | null) ?? null,
      domain: r.domain as string | null as NoteWithExcerpt["domain"],
      draft: r.draft === 1,
      updated: r.updated as string,
      excerpt: makeExcerpt(r.content as string),
    }))
  }

  const noteOut: Note & { content?: string; excerpt: string } = {
    id: full.id,
    path: full.path,
    title: full.title,
    description: full.description,
    date: full.date,
    domain: full.domain,
    draft: full.draft,
    updated: full.updated,
    excerpt,
  }

  if (includeContent) {
    noteOut.content = content.slice(0, maxContentBytes)
  }

  return {
    note: noteOut,
    outlinks: outlinks.map((r) => ({
      id: r.target_id,
      raw: r.target_raw,
      display: r.display_text,
    })),
    backlinks: backlinks.map((r) => ({ id: r.id, title: r.title, path: r.path })),
    tagSiblings,
  }
}
