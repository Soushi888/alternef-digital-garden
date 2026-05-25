import matter from "gray-matter"
import { globby } from "globby"
import { readFile, stat } from "fs/promises"
import { join, relative } from "path"
import { getDb, initSchema } from "./db"
import { DOMAINS } from "./types"
import type { Wikilink } from "./types"

const CONTENT_DIR = join(import.meta.dir, "../content")
const WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

function pathToId(filePath: string): string {
  return relative(CONTENT_DIR, filePath).replace(/\.md$/, "")
}

function pathToRelative(filePath: string): string {
  return relative(CONTENT_DIR, filePath)
}

function deriveDomain(id: string): string | null {
  const parts = id.split("/")
  if (parts[0] === "knowledge" && parts.length > 1 && (DOMAINS as readonly string[]).includes(parts[1])) {
    return parts[1]
  }
  return null
}

function parseWikilinks(content: string): Wikilink[] {
  return [...content.matchAll(WIKILINK_RE)].map((m) => ({
    target: m[1].trim(),
    display: m[2]?.trim() ?? null,
  }))
}

function resolveWikilink(target: string, allIds: Set<string>, allAliases: Map<string, string>): string | null {
  if (allIds.has(target)) return target
  if (allAliases.has(target)) return allAliases.get(target)!
  for (const id of allIds) {
    if (id.endsWith("/" + target)) return id
  }
  return null
}

function makeExcerpt(content: string, maxLen = 200): string {
  return content.replace(/^---[\s\S]*?---\n?/, "").replace(/\s+/g, " ").trim().slice(0, maxLen)
}

interface NoteRecord {
  id: string
  path: string
  title: string
  description: string | null
  date: string | null
  domain: string | null
  content: string
  draft: number
  updated: string
  wikilinks: Wikilink[]
  tags: string[]
  aliases: string[]
}

async function parseFile(filePath: string): Promise<NoteRecord> {
  const raw = await readFile(filePath, "utf-8")
  const { data: fm, content } = matter(raw)
  const fileStat = await stat(filePath)
  const id = pathToId(filePath)
  return {
    id,
    path: pathToRelative(filePath),
    title: typeof fm.title === "string" ? fm.title : (id.split("/").pop() ?? id),
    description: typeof fm.description === "string" ? fm.description : null,
    date: fm.date != null ? String(fm.date) : null,
    domain: deriveDomain(id),
    content,
    draft: fm.draft === true ? 1 : 0,
    updated: fileStat.mtime.toISOString(),
    wikilinks: parseWikilinks(content),
    tags: Array.isArray(fm.tags) ? (fm.tags as string[]).filter(Boolean) : [],
    aliases: Array.isArray(fm.aliases) ? (fm.aliases as string[]).filter(Boolean) : [],
  }
}

export async function indexAll(): Promise<number> {
  initSchema()
  const db = getDb()

  const files = await globby("**/*.md", { cwd: CONTENT_DIR, absolute: true })

  // Parse all files
  const notes = await Promise.all(files.map(parseFile))

  // Build resolution maps
  const allIds = new Set(notes.map((n) => n.id))
  const allAliases = new Map<string, string>()
  for (const n of notes) {
    for (const alias of n.aliases) allAliases.set(alias, n.id)
  }

  // Wipe and rebuild (full reindex)
  const rebuild = db.transaction(() => {
    db.run("DELETE FROM links")
    db.run("DELETE FROM tags")
    db.run("DELETE FROM aliases")
    db.run("DELETE FROM notes")
    db.run("INSERT INTO notes_fts(notes_fts) VALUES('rebuild')")

    const insNote = db.prepare(
      `INSERT INTO notes (id, path, title, description, date, domain, content, draft, updated)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    const insTag = db.prepare("INSERT OR IGNORE INTO tags (note_id, tag) VALUES (?, ?)")
    const insAlias = db.prepare("INSERT OR IGNORE INTO aliases (note_id, alias) VALUES (?, ?)")
    const insLink = db.prepare(
      "INSERT INTO links (source_id, target_id, target_raw, display_text) VALUES (?, ?, ?, ?)",
    )

    for (const n of notes) {
      insNote.run(n.id, n.path, n.title, n.description, n.date, n.domain, n.content, n.draft, n.updated)
      for (const tag of n.tags) insTag.run(n.id, tag)
      for (const alias of n.aliases) insAlias.run(n.id, alias)
    }

    // Second pass: resolve links
    for (const n of notes) {
      for (const wl of n.wikilinks) {
        const resolved = resolveWikilink(wl.target, allIds, allAliases)
        insLink.run(n.id, resolved, wl.target, wl.display)
      }
    }
  })

  rebuild()
  db.run("INSERT OR REPLACE INTO meta (key, value) VALUES ('last_synced', ?)", [new Date().toISOString()])
  return notes.length
}

export async function syncFile(filePath: string): Promise<void> {
  const db = getDb()
  const n = await parseFile(filePath)

  // Rebuild resolution maps from current DB state
  const allIds = new Set<string>(
    (db.query("SELECT id FROM notes").all() as { id: string }[]).map((r) => r.id),
  )
  allIds.add(n.id)
  const allAliases = new Map<string, string>(
    (db.query("SELECT alias, note_id FROM aliases").all() as { alias: string; note_id: string }[]).map((r) => [
      r.alias,
      r.note_id,
    ]),
  )
  for (const alias of n.aliases) allAliases.set(alias, n.id)

  db.transaction(() => {
    db.run(
      `INSERT INTO notes (id, path, title, description, date, domain, content, draft, updated)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         path = excluded.path, title = excluded.title,
         description = excluded.description, date = excluded.date,
         domain = excluded.domain, content = excluded.content,
         draft = excluded.draft, updated = excluded.updated`,
      [n.id, n.path, n.title, n.description, n.date, n.domain, n.content, n.draft, n.updated],
    )
    db.run("DELETE FROM tags WHERE note_id = ?", [n.id])
    db.run("DELETE FROM aliases WHERE note_id = ?", [n.id])
    db.run("DELETE FROM links WHERE source_id = ?", [n.id])

    for (const tag of n.tags) db.run("INSERT OR IGNORE INTO tags (note_id, tag) VALUES (?, ?)", [tag ? n.id : "", tag])
    for (const alias of n.aliases) db.run("INSERT OR IGNORE INTO aliases (note_id, alias) VALUES (?, ?)", [n.id, alias])
    for (const wl of n.wikilinks) {
      const resolved = resolveWikilink(wl.target, allIds, allAliases)
      db.run("INSERT INTO links (source_id, target_id, target_raw, display_text) VALUES (?, ?, ?, ?)", [
        n.id,
        resolved,
        wl.target,
        wl.display,
      ])
    }
  })()
}

export function removeNote(filePath: string): void {
  const db = getDb()
  const id = pathToId(filePath)
  db.transaction(() => {
    db.run("DELETE FROM links WHERE source_id = ?", [id])
    db.run("DELETE FROM tags WHERE note_id = ?", [id])
    db.run("DELETE FROM aliases WHERE note_id = ?", [id])
    db.run("DELETE FROM notes WHERE id = ?", [id])
  })()
}

export { makeExcerpt }
