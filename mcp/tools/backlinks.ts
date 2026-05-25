import { getDb } from "../db"
import type { LinkSource } from "../types"

export function gardenBacklinks({ note }: { note: string }): LinkSource[] {
  const db = getDb()

  // Resolve note id from id or path
  const row = db
    .prepare("SELECT id FROM notes WHERE id = ? OR path = ?")
    .get(note, note + ".md") as { id: string } | null

  if (!row) return []

  return db
    .prepare(
      `SELECT DISTINCT n.id, n.title, n.path FROM links l
       JOIN notes n ON n.id = l.source_id
       WHERE l.target_id = ? AND n.draft = 0
       ORDER BY n.title`,
    )
    .all(row.id) as LinkSource[]
}
