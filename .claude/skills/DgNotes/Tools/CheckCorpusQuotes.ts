#!/usr/bin/env bun
/**
 * CheckCorpusQuotes.ts: citation integrity for Wisdom Context Window corpus quotations
 *
 * Every quotation in content/ that carries the corpus citation marker (see
 * `.claude/skills/DgNotes/WisdomCorpus.md`, "Citation form") must match its passage
 * verbatim, whitespace normalised. The marker is an inline code span `wcw:<slug>/<id>`
 * at the end of an attribution line; the quotation is the blockquote that starts on
 * the next line, or after one blank line.
 *
 * Usage (from project root):
 *   bun .claude/skills/DgNotes/Tools/CheckCorpusQuotes.ts [paths...] [--json] [--tool <path>]
 *
 * Paths default to `content`. The corpus tool is `--tool`, else $WISDOM_CORPUS_TOOL,
 * else "${PAI_DIR}/PAI/Tools/WisdomCorpus.ts". When no citation is found the tool is
 * never called. When citations exist but the tool is absent, the check is skipped.
 *
 * Exit codes: 0 clean or skipped, 1 violations found, 2 the corpus tool failed to run.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "fs"
import { spawnSync } from "child_process"
import { join, relative, resolve } from "path"
import { fileURLToPath } from "url"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Citation {
  file: string
  line: number
  slug: string
  id: number
  quote: string | null
}

export interface Passage {
  id: number
  slug: string
  kind: string
  text: string
}

export type ViolationKind =
  | "missing-quotation"
  | "unknown-id"
  | "not-full-text"
  | "slug-mismatch"
  | "text-mismatch"

export interface Violation {
  file: string
  line: number
  ref: string
  kind: ViolationKind
  message: string
}

export type Lookup =
  | { ok: true; passage: Passage }
  | { ok: false; unknown: true }
  | { ok: false; unknown: false; error: string }

// ── Parsing ───────────────────────────────────────────────────────────────────

export const MARKER_RE = /`wcw:([A-Za-z0-9][A-Za-z0-9._-]*)\/(\d+)`/g
const QUOTE_LINE_RE = /^\s*>/
const FENCE_RE = /^\s*(```|~~~)/
export const ELLIPSIS = "[...]"

export function normalise(s: string): string {
  return s.replace(/\s+/g, " ").trim()
}

function stripQuoteMarker(line: string): string {
  return line.replace(/^\s*>\s?/, "")
}

/** Find every citation marker outside fenced code and the blockquote it introduces. */
export function parseCitations(file: string, source: string): Citation[] {
  const lines = source.split(/\r?\n/)
  const out: Citation[] = []
  let inFence = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (FENCE_RE.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    for (const m of line.matchAll(MARKER_RE)) {
      let j = i + 1
      if (j < lines.length && lines[j].trim() === "") j++
      const quoted: string[] = []
      while (j < lines.length && QUOTE_LINE_RE.test(lines[j])) {
        quoted.push(stripQuoteMarker(lines[j]))
        j++
      }
      out.push({
        file,
        line: i + 1,
        slug: m[1],
        id: Number(m[2]),
        quote: quoted.length > 0 ? normalise(quoted.join(" ")) : null,
      })
    }
  }
  return out
}

const WORD_CHAR_RE = /[\p{L}\p{N}]/u

function isWordChar(ch: string | undefined): boolean {
  return ch !== undefined && WORD_CHAR_RE.test(ch)
}

/** True when the segment at `at` neither starts nor ends in the middle of a word. */
function onWordBoundaries(text: string, at: number, seg: string): boolean {
  const end = at + seg.length
  const cutStart = isWordChar(seg[0]) && isWordChar(text[at - 1])
  const cutEnd = isWordChar(seg[seg.length - 1]) && isWordChar(text[end])
  return !cutStart && !cutEnd
}

/**
 * A quotation matches when every segment between `[...]` cuts appears in the passage
 * text, in order, after whitespace normalisation, starting and ending on word boundaries.
 * `[...]` is the only editorial mark, so a quote cut mid-word fails. Nothing else may differ.
 */
export function quoteMatches(quote: string, passageText: string): boolean {
  const text = normalise(passageText)
  const segments = quote
    .split(ELLIPSIS)
    .map(normalise)
    .filter((s) => s.length > 0)
  if (segments.length === 0) return false
  let from = 0
  for (const seg of segments) {
    let at = text.indexOf(seg, from)
    while (at !== -1 && !onWordBoundaries(text, at, seg)) at = text.indexOf(seg, at + 1)
    if (at === -1) return false
    from = at + seg.length
  }
  return true
}

export function checkCitation(c: Citation, lookup: Lookup): Violation | null {
  const ref = `wcw:${c.slug}/${c.id}`
  const v = (kind: ViolationKind, message: string): Violation => ({
    file: c.file,
    line: c.line,
    ref,
    kind,
    message,
  })
  if (c.quote === null) return v("missing-quotation", "no blockquote follows the citation")
  if (!lookup.ok) {
    if (lookup.unknown) return v("unknown-id", `passage ${c.id} does not exist in the corpus`)
    throw new Error(lookup.error)
  }
  const p = lookup.passage
  if (p.slug !== c.slug)
    return v("slug-mismatch", `passage ${c.id} belongs to "${p.slug}", not "${c.slug}"`)
  if (p.kind !== "full-text")
    return v("not-full-text", `passage ${c.id} is kind "${p.kind}": only full-text may be quoted`)
  if (!quoteMatches(c.quote, p.text))
    return v("text-mismatch", "quotation does not match the passage text verbatim")
  return null
}

// ── Corpus tool ───────────────────────────────────────────────────────────────

export function resolveTool(
  flag: string | undefined,
  env: Record<string, string | undefined>,
): string | null {
  const candidate =
    flag ||
    env.WISDOM_CORPUS_TOOL ||
    (env.PAI_DIR ? join(env.PAI_DIR, "PAI/Tools/WisdomCorpus.ts") : undefined)
  return candidate && existsSync(candidate) ? candidate : null
}

export function lookupPassage(tool: string, id: number): Lookup {
  const r = spawnSync("bun", [tool, "passage", String(id), "--json"], { encoding: "utf8" })
  if (r.status === 0) {
    try {
      return { ok: true, passage: JSON.parse(r.stdout) as Passage }
    } catch {
      return { ok: false, unknown: false, error: `unparseable output for passage ${id}` }
    }
  }
  const err = `${r.stderr ?? ""}`.trim()
  if (/no passage/.test(err)) return { ok: false, unknown: true }
  return { ok: false, unknown: false, error: err || `corpus tool exited ${r.status}` }
}

// ── Files ─────────────────────────────────────────────────────────────────────

function collectMarkdown(target: string): string[] {
  if (!existsSync(target)) return []
  if (statSync(target).isFile()) return target.endsWith(".md") ? [target] : []
  const out: string[] = []
  for (const entry of readdirSync(target, { withFileTypes: true })) {
    const p = join(target, entry.name)
    if (entry.isDirectory()) out.push(...collectMarkdown(p))
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(p)
  }
  return out.sort()
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function main(argv: string[], env: Record<string, string | undefined>): number {
  let json = false
  let toolFlag: string | undefined
  const paths: string[] = []
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--json") json = true
    else if (argv[i] === "--tool") toolFlag = argv[++i]
    else paths.push(argv[i])
  }
  const targets = paths.length > 0 ? paths : ["content"]

  const citations = targets
    .flatMap(collectMarkdown)
    .flatMap((f) => parseCitations(relative(process.cwd(), resolve(f)), readFileSync(f, "utf8")))

  const report = (status: string, violations: Violation[], note?: string) => {
    if (json) {
      console.log(
        JSON.stringify({ status, citations: citations.length, violations, note }, null, 2),
      )
      return
    }
    console.log("=== Corpus Citation Integrity ===")
    if (note) console.log(note)
    for (const v of violations)
      console.log(`  ERROR ${v.file}:${v.line} [${v.kind}] ${v.ref}: ${v.message}`)
    console.log(
      `Citations: ${citations.length}  Violations: ${violations.length}  Status: ${status}`,
    )
  }

  if (citations.length === 0) {
    report("clean", [], "No corpus citations found.")
    return 0
  }
  const tool = resolveTool(toolFlag, env)
  if (!tool) {
    report(
      "skipped",
      [],
      "SKIPPED: corpus tool not available on this machine, citations not checked.",
    )
    return 0
  }

  const cache = new Map<number, Lookup>()
  const violations: Violation[] = []
  try {
    for (const c of citations) {
      if (!cache.has(c.id)) cache.set(c.id, lookupPassage(tool, c.id))
      const v = checkCitation(c, cache.get(c.id)!)
      if (v) violations.push(v)
    }
  } catch (e) {
    report("error", violations, `ERROR: corpus tool failed: ${(e as Error).message}`)
    return 2
  }
  report(violations.length > 0 ? "violations" : "clean", violations)
  return violations.length > 0 ? 1 : 0
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exit(main(process.argv.slice(2), process.env))
}
