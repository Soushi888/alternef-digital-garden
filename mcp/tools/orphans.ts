import { getDb } from "../db"
import type { Note } from "../types"

interface OrphansArgs {
  domain?: string
  excludeIndexes?: boolean
}

export function gardenOrphans({ domain, excludeIndexes = false }: OrphansArgs = {}): Note[] {
  const db = getDb()

  const domainFilter = domain ? "AND n.domain = ?" : ""
  const indexFilter = excludeIndexes ? "AND n.id NOT LIKE '%/index'" : ""
  const params: unknown[] = domain ? [domain] : []

  return db
    .prepare(
      `SELECT n.id, n.path, n.title, n.description, n.date, n.domain, n.draft, n.updated
       FROM notes n
       WHERE n.draft = 0
         ${domainFilter}
         ${indexFilter}
         AND n.id NOT IN (
           SELECT DISTINCT target_id FROM links WHERE target_id IS NOT NULL
         )
       ORDER BY n.domain, n.path`,
    )
    .all(...params) as Note[]
}
