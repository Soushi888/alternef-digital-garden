#!/usr/bin/env bun
/**
 * IndexTags.ts — Tag index builder for the Alternef Digital Garden
 *
 * Usage (from project root):
 *   bun .claude/skills/dg-tags/Tools/IndexTags.ts [flags]
 *
 * Flags:
 *   --output json|markdown    Output format (default: markdown)
 *   --filter-empty            Only show files with empty tags
 *   --sort frequency|alpha    Sort order (default: frequency)
 *   --min-count N             Only show tags used N+ times
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs"
import { join, relative } from "path"
import matter from "gray-matter"
import { globby } from "globby"

// ── Config ──────────────────────────────────────────────────────────────────

const PROJECT_ROOT = process.cwd()
const CONTENT_DIR = join(PROJECT_ROOT, "content")
const STATE_DIR = join(PROJECT_ROOT, ".claude/skills/dg-tags/STATE")

// ── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const outputFormat = args.includes("--output") ? args[args.indexOf("--output") + 1] : "markdown"
const filterEmpty = args.includes("--filter-empty")
const sortMode = args.includes("--sort") ? args[args.indexOf("--sort") + 1] : "frequency"
const minCountArg = args.includes("--min-count") ? parseInt(args[args.indexOf("--min-count") + 1], 10) : 1

// ── Types ─────────────────────────────────────────────────────────────────────

type TagIndex = Record<string, string[]>
type TagFrequencies = Record<string, number>

interface FormatIssue {
  file: string
  format: "array" | "yaml-list"
}

interface ScanResult {
  tagIndex: TagIndex
  tagFrequencies: TagFrequencies
  emptyFiles: string[]
  formatIssues: FormatIssue[]
  totalFiles: number
  scannedAt: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Parse tags from a gray-matter data object.
 * Handles:
 *   - YAML array (gray-matter returns string[]):   tags: ["a", "b"]
 *   - YAML list (gray-matter returns string[]):    tags:\n  - a\n  - b
 *   - Comma-separated string:                      tags: "a, b"
 *   - Single string:                               tags: ecology
 *   - null / undefined / empty:                    no tags
 *
 * Returns the parsed tags and the detected format.
 */
function parseTags(data: Record<string, unknown>): {
  tags: string[]
  format: "array" | "yaml-list" | "empty"
} {
  const raw = data.tags

  if (!raw || (Array.isArray(raw) && raw.length === 0)) {
    return { tags: [], format: "empty" }
  }

  if (Array.isArray(raw)) {
    // gray-matter returns the same string[] for both inline array and YAML list.
    // We distinguish them by re-reading the raw frontmatter string.
    // This is handled at the call site using the rawContent.
    return { tags: raw.map(String).filter(Boolean), format: "array" }
  }

  if (typeof raw === "string") {
    const trimmed = raw.trim()
    if (!trimmed) return { tags: [], format: "empty" }
    // Comma-separated string
    const split = trimmed.split(",").map((t) => t.trim()).filter(Boolean)
    return { tags: split, format: "array" }
  }

  return { tags: [], format: "empty" }
}

/**
 * Detect whether the raw frontmatter string uses YAML list format (multi-line)
 * or inline array format.
 *
 * YAML list:
 *   tags:
 *     - holochain
 *     - blockchain
 *
 * Inline array:
 *   tags: ["holochain", "blockchain"]
 * or:
 *   tags: [holochain, blockchain]
 */
function detectTagFormat(rawContent: string): "array" | "yaml-list" | "empty" {
  // Extract the frontmatter block
  const fmMatch = rawContent.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return "empty"

  const fm = fmMatch[1]
  // Find the tags line
  const tagsLineMatch = fm.match(/^tags\s*:(.*)/m)
  if (!tagsLineMatch) return "empty"

  const tagsValue = tagsLineMatch[1].trim()

  if (!tagsValue) {
    // tags: followed by nothing on the same line — check for subsequent indented list items
    const afterTagsMatch = fm.match(/^tags\s*:\s*\n([\s\S]*?)(?=\n\S|\n*$)/m)
    if (afterTagsMatch && afterTagsMatch[1].trim().startsWith("-")) {
      return "yaml-list"
    }
    return "empty"
  }

  if (tagsValue.startsWith("[")) return "array"
  if (tagsValue === "[]") return "empty"

  // Inline value like "ecology" (single unquoted string)
  return "array"
}

// ── Main scan ─────────────────────────────────────────────────────────────────

async function scan(): Promise<ScanResult> {
  const files = await globby("**/*.md", {
    cwd: CONTENT_DIR,
    ignore: ["private/**", "templates/**", ".obsidian/**", "unpublished/**"],
  })

  const tagIndex: TagIndex = {}
  const emptyFiles: string[] = []
  const formatIssues: FormatIssue[] = []

  for (const file of files) {
    const absolutePath = join(CONTENT_DIR, file)
    const relativePath = `content/${file}`
    let rawContent: string

    try {
      rawContent = readFileSync(absolutePath, "utf8")
    } catch {
      continue
    }

    const parsed = matter(rawContent)
    const { tags } = parseTags(parsed.data)
    const format = detectTagFormat(rawContent)

    if (tags.length === 0) {
      emptyFiles.push(relativePath)
      continue
    }

    if (format === "yaml-list") {
      formatIssues.push({ file: relativePath, format: "yaml-list" })
    }

    for (const tag of tags) {
      const normalized = tag.toLowerCase().trim()
      if (!normalized) continue
      if (!tagIndex[normalized]) tagIndex[normalized] = []
      tagIndex[normalized].push(relativePath)
    }
  }

  // Build frequency map sorted by count descending
  const tagFrequencies: TagFrequencies = Object.fromEntries(
    Object.entries(tagIndex)
      .map(([tag, paths]) => [tag, paths.length] as [string, number])
      .sort((a, b) => b[1] - a[1])
  )

  return {
    tagIndex,
    tagFrequencies,
    emptyFiles,
    formatIssues,
    totalFiles: files.length,
    scannedAt: new Date().toISOString(),
  }
}

// ── State persistence ─────────────────────────────────────────────────────────

function saveState(result: ScanResult): void {
  mkdirSync(STATE_DIR, { recursive: true })

  writeFileSync(join(STATE_DIR, "tag-index.json"), JSON.stringify(result.tagIndex, null, 2))
  writeFileSync(join(STATE_DIR, "tag-frequencies.json"), JSON.stringify(result.tagFrequencies, null, 2))
  writeFileSync(join(STATE_DIR, "empty-files.json"), JSON.stringify(result.emptyFiles, null, 2))
  writeFileSync(join(STATE_DIR, "format-issues.json"), JSON.stringify(result.formatIssues, null, 2))
  writeFileSync(join(STATE_DIR, "last-indexed.txt"), result.scannedAt)
}

// ── Freshness check ───────────────────────────────────────────────────────────

function isFresh(): boolean {
  const lastIndexedPath = join(STATE_DIR, "last-indexed.txt")
  if (!existsSync(lastIndexedPath)) return false

  const lastIndexed = new Date(readFileSync(lastIndexedPath, "utf8").trim())
  const ageMs = Date.now() - lastIndexed.getTime()
  const twentyFourHours = 24 * 60 * 60 * 1000

  if (ageMs > twentyFourHours) return false

  // Also check if any content file is newer than the index
  try {
    const result = Bun.spawnSync(["find", CONTENT_DIR, "-name", "*.md", "-newer", lastIndexedPath])
    const output = new TextDecoder().decode(result.stdout).trim()
    if (output.length > 0) return false
  } catch {
    // If find fails, assume stale
    return false
  }

  return true
}

// ── Output formatters ─────────────────────────────────────────────────────────

function renderMarkdown(result: ScanResult): string {
  const { tagFrequencies, emptyFiles, formatIssues, totalFiles } = result
  const uniqueTags = Object.keys(tagFrequencies)
  const totalAssignments = Object.values(tagFrequencies).reduce((a, b) => a + b, 0)
  const orphanTags = uniqueTags.filter((t) => tagFrequencies[t] === 1)

  let entries = Object.entries(tagFrequencies)

  if (sortMode === "alpha") {
    entries = entries.sort((a, b) => a[0].localeCompare(b[0]))
  }

  if (minCountArg > 1) {
    entries = entries.filter(([, count]) => count >= minCountArg)
  }

  const lines: string[] = [
    `# Tag Index`,
    ``,
    `**Scanned**: ${result.scannedAt}`,
    `**Total files scanned**: ${totalFiles}`,
    `**Unique tags**: ${uniqueTags.length}`,
    `**Total tag assignments**: ${totalAssignments}`,
    `**Empty-tag files**: ${emptyFiles.length}`,
    `**Format issues (YAML list)**: ${formatIssues.length}`,
    `**Orphan tags (count=1)**: ${orphanTags.length}`,
    ``,
    `## Tag Frequency Table`,
    ``,
    `| Tag | Count |`,
    `|-----|-------|`,
    ...entries.map(([tag, count]) => `| \`${tag}\` | ${count} |`),
    ``,
    `## Empty Tag Files (${emptyFiles.length})`,
    ``,
    ...(emptyFiles.length === 0
      ? ["_None_"]
      : emptyFiles.map((f) => `- ${f}`)),
    ``,
    `## Format Issues — YAML List (${formatIssues.length})`,
    ``,
    ...(formatIssues.length === 0
      ? ["_None_"]
      : formatIssues.map((f) => `- ${f.file}`)),
    ``,
    `## Orphan Tags (count=1, ${orphanTags.length})`,
    ``,
    ...(orphanTags.length === 0
      ? ["_None_"]
      : orphanTags.map((t) => `- \`${t}\``)),
  ]

  return lines.join("\n")
}

function renderJson(result: ScanResult): string {
  return JSON.stringify(
    {
      scannedAt: result.scannedAt,
      totalFiles: result.totalFiles,
      uniqueTags: Object.keys(result.tagFrequencies).length,
      totalAssignments: Object.values(result.tagFrequencies).reduce((a, b) => a + b, 0),
      emptyFilesCount: result.emptyFiles.length,
      formatIssuesCount: result.formatIssues.length,
      tagFrequencies: result.tagFrequencies,
      emptyFiles: result.emptyFiles,
      formatIssues: result.formatIssues,
    },
    null,
    2
  )
}

// ── Entry point ───────────────────────────────────────────────────────────────

async function main() {
  // Freshness check (skip if --filter-empty or explicit re-scan request)
  if (!filterEmpty && isFresh()) {
    console.log("Index is fresh (less than 24h old, no content changes). Using cached state.")
    console.log(`State: ${STATE_DIR}`)
    console.log(`Last indexed: ${readFileSync(join(STATE_DIR, "last-indexed.txt"), "utf8").trim()}`)

    if (outputFormat === "json") {
      const freq = JSON.parse(readFileSync(join(STATE_DIR, "tag-frequencies.json"), "utf8"))
      const empty = JSON.parse(readFileSync(join(STATE_DIR, "empty-files.json"), "utf8"))
      console.log(JSON.stringify({ tagFrequencies: freq, emptyFiles: empty }, null, 2))
    }
    return
  }

  console.log(`Scanning ${CONTENT_DIR}...`)

  const result = await scan()

  saveState(result)
  console.log(`State saved to ${STATE_DIR}`)

  if (filterEmpty) {
    console.log(`\nEmpty tag files (${result.emptyFiles.length}):`)
    result.emptyFiles.forEach((f) => console.log(`  ${f}`))
    return
  }

  const output = outputFormat === "json" ? renderJson(result) : renderMarkdown(result)
  console.log("\n" + output)
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
