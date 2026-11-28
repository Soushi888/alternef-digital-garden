// Direct query library over the garden's SQLite FTS5 index. This is the one
// reader of the schema: the MCP server tools and any other consumer (e.g. the
// Remember CLI, which cannot hold an MCP connection) both go through here
// instead of hand-rolling SQL against notes/notes_fts.
//
// Import list is deliberately narrow: bun:sqlite, path, and pure local
// modules (text.ts, fsstat.ts, types.ts). None of them pull gray-matter or
// globby, so importing lib.ts stays cheap.
import { Database } from "bun:sqlite"
import { join } from "path"
import { makeExcerpt, normalizeDate, quoteFtsTerm } from "./text"
import { newestMtimeMs, ensureDirSync } from "./fsstat"
import type { Domain, NoteWithExcerpt } from "./types"

export interface OpenGardenOptions {
  /** Garden repo root. Defaults to the repo this file lives in. */
  root?: string
  /** Open the existing index read-only; fails if the db file doesn't exist. */
  readonly?: boolean
}

export function openGarden(opts: OpenGardenOptions = {}): Database {
  const root = opts.root ?? join(import.meta.dir, "..")
  const localDir = join(root, ".local")
  const dbPath = join(localDir, "garden.db")

  if (opts.readonly) {
    return new Database(dbPath, { readonly: true })
  }

  ensureDirSync(localDir)
  const db = new Database(dbPath, { create: true })
  db.run("PRAGMA journal_mode = WAL")
  db.run("PRAGMA foreign_keys = ON")
  return db
}

export interface SearchOptions {
  /** Individual terms, each quoted so it can never reach FTS5 syntax. */
  terms?: string[]
  /** Raw FTS5 query syntax, for callers who want it. */
  query?: string
  domain?: string
  tag?: string
  limit?: number
  /** Only notes dated on or after this ISO (YYYY-MM-DD) date. */
  since?: string
}

export interface SearchHit {
  id: string
  path: string
  title: string
  date: string | null
  score: number
  snippet: string
}

export function searchNotes(db: Database, opts: SearchOptions): SearchHit[] {
  const { terms, query, domain, tag, limit = 20, since } = opts

  const parts: string[] = []
  if (terms && terms.length > 0) parts.push(terms.map(quoteFtsTerm).join(" "))
  if (query) parts.push(query)
  if (parts.length === 0) return []
  const ftsQuery = parts.join(" ")

  let sql = `
    SELECT n.id, n.path, n.title, n.date,
           bm25(notes_fts) AS score,
           snippet(notes_fts, 2, '<mark>', '</mark>', '…', 24) AS snippet
    FROM notes_fts
    JOIN notes n ON notes_fts.rowid = n.rowid
    WHERE notes_fts MATCH ? AND n.draft = 0
  `
  const params: (string | number)[] = [ftsQuery]

  if (domain) {
    sql += " AND n.domain = ?"
    params.push(domain)
  }
  if (tag) {
    sql += " AND EXISTS (SELECT 1 FROM tags t WHERE t.note_id = n.id AND t.tag = ?)"
    params.push(tag)
  }
  // `since` filters in code, after normalizing: rows indexed before ISO dates hold strings like
  // "Thu Mar 13 2025 20:00:00 GMT-0400", which compare wrongly as text. Without a limit on the
  // SQL side, the filter cannot drop rows the limit already cut.
  sql += " ORDER BY rank"
  if (!since) {
    sql += " LIMIT ?"
    params.push(limit)
  }

  let rows: Array<Record<string, unknown>>
  try {
    rows = db.prepare(sql).all(...params) as Array<Record<string, unknown>>
  } catch {
    // A malformed FTS5 query (raw `query` syntax error) yields no results
    // rather than a thrown exception up through the query path.
    return []
  }

  const hits = rows.map((r) => ({
    id: r.id as string,
    path: r.path as string,
    title: r.title as string,
    date: normalizeDate(r.date),
    score: r.score as number,
    snippet: r.snippet as string,
  }))
  return since ? hits.filter((h) => h.date !== null && h.date >= since).slice(0, limit) : hits
}

export interface FullNote extends NoteWithExcerpt {
  content: string
}

export function getNote(db: Database, id: string): FullNote | null {
  const row = db
    .prepare("SELECT * FROM notes WHERE (id = ? OR path = ?) AND draft = 0")
    .get(id, id + ".md") as Record<string, unknown> | null

  if (!row) return null

  const content = row.content as string
  return {
    id: row.id as string,
    path: row.path as string,
    title: row.title as string,
    description: (row.description as string | null) ?? null,
    date: normalizeDate(row.date),
    domain: row.domain as string | null as Domain | null,
    draft: row.draft === 1,
    updated: row.updated as string,
    content,
    excerpt: makeExcerpt(content),
  }
}

export interface FreshnessResult {
  lastSynced: string | null
  newestIndexed: string | null
  newestOnDisk: string | null
  stale: boolean
}

export function freshness(db: Database, contentDir: string): FreshnessResult {
  const lastSyncedRow = db.prepare("SELECT value FROM meta WHERE key = 'last_synced'").get() as {
    value: string
  } | null
  const newestRow = db.prepare("SELECT updated FROM notes ORDER BY updated DESC LIMIT 1").get() as {
    updated: string
  } | null

  const lastSynced = lastSyncedRow?.value ?? null
  const newestIndexed = newestRow?.updated ?? null

  // Whole milliseconds: the index stores ISO milliseconds, and mtimeMs carries a sub-millisecond fraction
  // that would otherwise make a file indexed at its own mtime read as newer than the index.
  const newestOnDiskMs = Math.floor(newestMtimeMs(contentDir))
  const newestOnDisk = newestOnDiskMs > 0 ? new Date(newestOnDiskMs).toISOString() : null

  const stale =
    newestOnDisk !== null &&
    (newestIndexed === null || newestOnDiskMs > new Date(newestIndexed).getTime())

  return { lastSynced, newestIndexed, newestOnDisk, stale }
}
