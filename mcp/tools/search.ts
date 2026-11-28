import { getDb } from "../db"
import { getNote, searchNotes } from "../lib"
import type { NoteWithExcerpt } from "../types"

interface SearchArgs {
  query: string
  terms?: string[]
  domain?: string
  tag?: string
  limit?: number
}

export function gardenSearch({
  query,
  terms,
  domain,
  tag,
  limit = 20,
}: SearchArgs): NoteWithExcerpt[] {
  const db = getDb()
  const hits = searchNotes(db, { query, terms, domain, tag, limit })

  const notes: NoteWithExcerpt[] = []
  for (const hit of hits) {
    const full = getNote(db, hit.id)
    if (!full) continue
    const { content: _content, ...note } = full
    notes.push(note)
  }
  return notes
}
