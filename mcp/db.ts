import { Database } from "bun:sqlite"
import { join } from "path"
import { mkdirSync } from "fs"

const LOCAL_DIR = join(import.meta.dir, "../.local")
const DB_PATH = join(LOCAL_DIR, "garden.db")

let _db: Database | null = null

export function getDb(): Database {
  if (!_db) {
    mkdirSync(LOCAL_DIR, { recursive: true })
    _db = new Database(DB_PATH, { create: true })
    _db.run("PRAGMA journal_mode = WAL")
    _db.run("PRAGMA foreign_keys = ON")
  }
  return _db
}

export const SCHEMA_STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS notes (
    id          TEXT PRIMARY KEY,
    path        TEXT UNIQUE NOT NULL,
    title       TEXT NOT NULL,
    description TEXT,
    date        TEXT,
    domain      TEXT,
    content     TEXT,
    draft       INTEGER DEFAULT 0,
    updated     TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS links (
    source_id    TEXT NOT NULL,
    target_id    TEXT,
    target_raw   TEXT NOT NULL,
    display_text TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS tags (
    note_id TEXT NOT NULL,
    tag     TEXT NOT NULL,
    PRIMARY KEY (note_id, tag)
  )`,
  `CREATE TABLE IF NOT EXISTS aliases (
    note_id TEXT NOT NULL,
    alias   TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_links_target ON links(target_id)`,
  `CREATE INDEX IF NOT EXISTS idx_links_source ON links(source_id)`,
  `CREATE INDEX IF NOT EXISTS idx_tags_tag ON tags(tag)`,
  `CREATE INDEX IF NOT EXISTS idx_notes_domain ON notes(domain)`,
  `CREATE VIRTUAL TABLE IF NOT EXISTS notes_fts USING fts5(
    title, description, content,
    content=notes,
    content_rowid=rowid,
    tokenize='porter unicode61'
  )`,
  `CREATE TRIGGER IF NOT EXISTS notes_fts_insert AFTER INSERT ON notes BEGIN
    INSERT INTO notes_fts(rowid, title, description, content)
      VALUES (new.rowid, new.title, new.description, new.content);
  END`,
  `CREATE TRIGGER IF NOT EXISTS notes_fts_delete AFTER DELETE ON notes BEGIN
    INSERT INTO notes_fts(notes_fts, rowid, title, description, content)
      VALUES ('delete', old.rowid, old.title, old.description, old.content);
  END`,
  `CREATE TRIGGER IF NOT EXISTS notes_fts_update AFTER UPDATE ON notes BEGIN
    INSERT INTO notes_fts(notes_fts, rowid, title, description, content)
      VALUES ('delete', old.rowid, old.title, old.description, old.content);
    INSERT INTO notes_fts(rowid, title, description, content)
      VALUES (new.rowid, new.title, new.description, new.content);
  END`,
  `CREATE TABLE IF NOT EXISTS meta (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`,
]

export function initSchema() {
  const db = getDb()
  for (const stmt of SCHEMA_STATEMENTS) {
    db.run(stmt)
  }
}
