import { getDb } from "../db"
import { statSync } from "fs"
import { join } from "path"
import { DOMAINS } from "../types"

interface StatusResult {
  totalNotes: number
  totalLinks: number
  unresolvedLinks: number
  totalTags: number
  domains: Record<string, number>
  dbSize: string
  newestNote: string
  lastSynced: string
}

export function gardenStatus(): StatusResult {
  const db = getDb()

  const totalNotes = (db.prepare("SELECT COUNT(*) as c FROM notes WHERE draft = 0").get() as { c: number }).c
  const totalLinks = (db.prepare("SELECT COUNT(*) as c FROM links").get() as { c: number }).c
  const unresolvedLinks = (
    db.prepare("SELECT COUNT(*) as c FROM links WHERE target_id IS NULL").get() as { c: number }
  ).c
  const totalTags = (db.prepare("SELECT COUNT(DISTINCT tag) as c FROM tags").get() as { c: number }).c

  const domainCounts: Record<string, number> = {}
  for (const domain of DOMAINS) {
    const c = (
      db.prepare("SELECT COUNT(*) as c FROM notes WHERE domain = ? AND draft = 0").get(domain) as { c: number }
    ).c
    domainCounts[domain] = c
  }

  // DB file size
  const dbPath = join(import.meta.dir, "../../.local/garden.db")
  let dbSize = "unknown"
  try {
    const bytes = statSync(dbPath).size
    dbSize = bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  } catch {}

  const lastNote = db.prepare("SELECT updated FROM notes ORDER BY updated DESC LIMIT 1").get() as
    | { updated: string }
    | null

  const lastSyncedRow = db.prepare("SELECT value FROM meta WHERE key = 'last_synced'").get() as
    | { value: string }
    | null

  return {
    totalNotes,
    totalLinks,
    unresolvedLinks,
    totalTags,
    domains: domainCounts,
    dbSize,
    newestNote: lastNote?.updated ?? "never",
    lastSynced: lastSyncedRow?.value ?? "never",
  }
}
