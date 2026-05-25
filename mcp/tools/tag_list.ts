import { getDb } from "../db"
import type { Tag } from "../types"

export function gardenTagList(): Tag[] {
  const db = getDb()

  return db
    .prepare(
      `SELECT t.tag, COUNT(*) as count
       FROM tags t
       JOIN notes n ON n.id = t.note_id
       WHERE n.draft = 0
       GROUP BY t.tag
       ORDER BY count DESC, t.tag`,
    )
    .all() as Tag[]
}
