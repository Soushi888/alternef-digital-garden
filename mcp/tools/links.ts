import { getDb } from "../db"
import type { LinkTarget } from "../types"

export function gardenLinks({ note }: { note: string }): LinkTarget[] {
  const db = getDb()

  const row = db
    .prepare("SELECT id FROM notes WHERE id = ? OR path = ?")
    .get(note, note + ".md") as { id: string } | null

  if (!row) return []

  const rows = db
    .prepare("SELECT target_id, target_raw, display_text FROM links WHERE source_id = ? ORDER BY target_raw")
    .all(row.id) as Array<{ target_id: string | null; target_raw: string; display_text: string | null }>

  return rows.map((r) => ({ id: r.target_id, raw: r.target_raw, display: r.display_text }))
}
