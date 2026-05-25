import { getDb } from "../db"

interface UnresolvedLinkEntry {
  target: string
  occurrences: number
  sources: string[]
}

interface UnresolvedLinksArgs {
  limit?: number
  minCount?: number
  domain?: string
}

interface UnresolvedLinksResult {
  total: number
  totalOccurrences: number
  links: UnresolvedLinkEntry[]
}

export function gardenUnresolvedLinks({
  limit = 50,
  minCount = 1,
  domain,
}: UnresolvedLinksArgs = {}): UnresolvedLinksResult {
  const db = getDb()

  const domainFilter = domain ? "AND n.domain = ?" : ""
  const domainParams = domain ? [domain] : []

  const rows = db
    .prepare(
      `SELECT l.target_raw as target,
              COUNT(*) as occurrences,
              GROUP_CONCAT(DISTINCT n.id) as source_ids
       FROM links l
       JOIN notes n ON l.source_id = n.id
       WHERE l.target_id IS NULL
         AND n.draft = 0
         ${domainFilter}
         AND l.target_raw != ''
       GROUP BY l.target_raw
       HAVING occurrences >= ?
       ORDER BY occurrences DESC
       LIMIT ?`,
    )
    .all(...domainParams, minCount, limit) as Array<{
    target: string
    occurrences: number
    source_ids: string
  }>

  const totalCount = (
    db
      .prepare(
        `SELECT COUNT(DISTINCT l.target_raw) as c
         FROM links l
         JOIN notes n ON l.source_id = n.id
         WHERE l.target_id IS NULL AND n.draft = 0 ${domainFilter}`,
      )
      .get(...domainParams) as { c: number }
  ).c

  const totalOccurrences = (
    db
      .prepare(
        `SELECT COUNT(*) as c
         FROM links l
         JOIN notes n ON l.source_id = n.id
         WHERE l.target_id IS NULL AND n.draft = 0 ${domainFilter}`,
      )
      .get(...domainParams) as { c: number }
  ).c

  const links: UnresolvedLinkEntry[] = rows.map((r) => ({
    target: r.target,
    occurrences: r.occurrences,
    sources: r.source_ids ? r.source_ids.split(",").slice(0, 5) : [],
  }))

  return { total: totalCount, totalOccurrences, links }
}
