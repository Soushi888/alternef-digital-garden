import { describe, test, expect, beforeAll, afterAll } from "bun:test"
import { Database } from "bun:sqlite"
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, utimesSync } from "fs"
import { tmpdir } from "os"
import { join } from "path"
import { SCHEMA_STATEMENTS } from "./db"
import { normalizeDate } from "./text"
import { openGarden, searchNotes, getNote, freshness } from "./lib"

// Fixture content directory and database built inside the test's own temp
// dir. Never touches the real garden content/ or .local/garden.db.
let root: string
let contentDir: string

function buildFixture(): void {
  root = mkdtempSync(join(tmpdir(), "garden-lib-test-"))
  const localDir = join(root, ".local")
  mkdirSync(localDir, { recursive: true })
  const dbPath = join(localDir, "garden.db")

  const db = new Database(dbPath, { create: true })
  for (const stmt of SCHEMA_STATEMENTS) db.run(stmt)

  const insNote = db.prepare(
    `INSERT INTO notes (id, path, title, description, date, domain, content, draft, updated)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  insNote.run(
    "knowledge/culture-and-education/self-limitation",
    "knowledge/culture-and-education/self-limitation.md",
    "Self-Limitation",
    "On self-limitation as a virtue",
    "2025-02-19",
    "culture-and-education",
    "Self-limitation is a discipline discussed at length in stoic ethics.",
    0,
    "2025-02-19T19:00:00.000Z",
  )
  insNote.run(
    "knowledge/culture-and-education/draft-note",
    "knowledge/culture-and-education/draft-note.md",
    "Draft Note",
    null,
    "2025-01-01",
    "culture-and-education",
    "This note is a draft about self-limitation and should never surface.",
    1,
    "2025-01-01T00:00:00.000Z",
  )
  db.run("INSERT INTO meta (key, value) VALUES ('last_synced', ?)", ["2025-02-01T00:00:00.000Z"])
  db.close()

  contentDir = join(root, "content")
  mkdirSync(contentDir, { recursive: true })
  writeFileSync(join(contentDir, "note.md"), "# hello\n")
}

beforeAll(() => buildFixture())
afterAll(() => rmSync(root, { recursive: true, force: true }))

describe("searchNotes term quoting", () => {
  test("a term with FTS syntax (colon, hyphen) never throws", () => {
    const db = openGarden({ root })
    expect(() => searchNotes(db, { terms: ["self-limitation:", "test"] })).not.toThrow()
    db.close()
  })

  test("the same query returns an array (results or empty), not a crash", () => {
    const db = openGarden({ root })
    const hits = searchNotes(db, { terms: ["self-limitation:", "test"] })
    expect(Array.isArray(hits)).toBe(true)
    db.close()
  })

  test("finds the fixture note through a clean term", () => {
    const db = openGarden({ root })
    const hits = searchNotes(db, { terms: ["stoic"] })
    expect(hits.length).toBe(1)
    expect(hits[0].id).toBe("knowledge/culture-and-education/self-limitation")
    db.close()
  })

  test("raw query syntax still works for callers who want it", () => {
    const db = openGarden({ root })
    const hits = searchNotes(db, { query: "stoic" })
    expect(hits.length).toBe(1)
    db.close()
  })

  test("excludes drafts", () => {
    const db = openGarden({ root })
    const hits = searchNotes(db, { terms: ["draft"] })
    expect(hits.find((h) => h.id === "knowledge/culture-and-education/draft-note")).toBeUndefined()
    db.close()
  })
})

describe("dates are ISO (YYYY-MM-DD)", () => {
  test("normalizeDate converts a Date#toString() rendering", () => {
    expect(normalizeDate(new Date("2025-02-19"))).toBe("2025-02-19")
  })

  test("normalizeDate converts the exact regression string", () => {
    expect(normalizeDate("Wed Feb 19 2025 19:00:00 GMT-0500")).toBe("2025-02-20")
  })

  test("normalizeDate passes through an already-ISO string unchanged", () => {
    expect(normalizeDate("2025-02-19")).toBe("2025-02-19")
  })

  test("normalizeDate returns null for a missing date", () => {
    expect(normalizeDate(null)).toBeNull()
    expect(normalizeDate(undefined)).toBeNull()
  })

  test("searchNotes and getNote hand back the ISO date stored in the index", () => {
    const db = openGarden({ root })
    const hits = searchNotes(db, { terms: ["stoic"] })
    expect(hits[0].date).toBe("2025-02-19")
    const note = getNote(db, "knowledge/culture-and-education/self-limitation")
    expect(note?.date).toBe("2025-02-19")
    db.close()
  })
})

describe("getNote", () => {
  test("returns the note by id", () => {
    const db = openGarden({ root })
    const note = getNote(db, "knowledge/culture-and-education/self-limitation")
    expect(note?.title).toBe("Self-Limitation")
    expect(note?.content).toContain("stoic ethics")
    db.close()
  })

  test("returns null for a draft note", () => {
    const db = openGarden({ root })
    expect(getNote(db, "knowledge/culture-and-education/draft-note")).toBeNull()
    db.close()
  })

  test("returns null for an unknown id", () => {
    const db = openGarden({ root })
    expect(getNote(db, "no/such/note")).toBeNull()
    db.close()
  })
})

describe("freshness", () => {
  test("stale when a content file on disk is newer than the newest indexed row", () => {
    const db = openGarden({ root })
    const future = new Date(Date.now() + 60_000)
    utimesSync(join(contentDir, "note.md"), future, future)
    const result = freshness(db, contentDir)
    expect(result.stale).toBe(true)
    expect(result.lastSynced).toBe("2025-02-01T00:00:00.000Z")
    db.close()
  })

  test("fresh when nothing on disk is newer than the index", () => {
    const db = openGarden({ root })
    const past = new Date("2020-01-01T00:00:00.000Z")
    utimesSync(join(contentDir, "note.md"), past, past)
    const result = freshness(db, contentDir)
    expect(result.stale).toBe(false)
    db.close()
  })
})

describe("openGarden read-only handle", () => {
  test("refuses a write", () => {
    const db = openGarden({ root, readonly: true })
    expect(() => db.run("DELETE FROM notes")).toThrow()
    db.close()
  })

  test("still allows reads", () => {
    const db = openGarden({ root, readonly: true })
    const note = getNote(db, "knowledge/culture-and-education/self-limitation")
    expect(note).not.toBeNull()
    db.close()
  })
})
