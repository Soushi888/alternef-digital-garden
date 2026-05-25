import { getDb } from "../db"
import type { Domain } from "../types"

interface AliasEntry {
  id: string
  title: string
  domain: Domain | null
  path: string
  aliases: string[]
}

interface AliasMapArgs {
  domain?: string
  withAliasesOnly?: boolean
}

export function gardenAliasMap({ domain, withAliasesOnly = true }: AliasMapArgs = {}): AliasEntry[] {
  const db = getDb()

  const domainFilter = domain ? "AND n.domain = ?" : ""
  const params: unknown[] = domain ? [domain] : []

  const rows = db
    .prepare(
      `SELECT n.id, n.title, n.domain, n.path,
              GROUP_CONCAT(a.alias, '|') as alias_list
       FROM notes n
       LEFT JOIN aliases a ON a.note_id = n.id
       WHERE n.draft = 0 ${domainFilter}
       GROUP BY n.id
       ${withAliasesOnly ? "HAVING alias_list IS NOT NULL" : ""}
       ORDER BY n.domain, n.path`,
    )
    .all(...params) as Array<{
    id: string
    title: string
    domain: string | null
    path: string
    alias_list: string | null
  }>

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    domain: (r.domain as Domain | null),
    path: r.path,
    aliases: r.alias_list ? r.alias_list.split("|") : [],
  }))
}
