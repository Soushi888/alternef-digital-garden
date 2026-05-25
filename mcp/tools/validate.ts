import { getDb } from "../db"

interface ValidationIssue {
  type: "missing_description" | "missing_date" | "missing_tags" | "unresolved_links" | "no_alias_on_index"
  severity: "warning" | "error"
  message: string
}

interface NoteValidation {
  id: string
  path: string
  title: string
  domain: string | null
  issues: ValidationIssue[]
}

interface ValidateArgs {
  note?: string
  domain?: string
  onlyWithIssues?: boolean
}

interface ValidateResult {
  totalChecked: number
  totalWithIssues: number
  notes: NoteValidation[]
}

export function gardenValidate({ note, domain, onlyWithIssues = true }: ValidateArgs = {}): ValidateResult {
  const db = getDb()

  // Build filter
  const conditions: string[] = ["n.draft = 0"]
  const params: unknown[] = []

  if (note) {
    conditions.push("(n.id = ? OR n.path = ?)")
    params.push(note, note + ".md")
  }
  if (domain) {
    conditions.push("n.domain = ?")
    params.push(domain)
  }

  const whereClause = conditions.join(" AND ")

  const notes = db
    .prepare(
      `SELECT n.id, n.path, n.title, n.description, n.date, n.domain,
              (SELECT COUNT(*) FROM tags t WHERE t.note_id = n.id) as tag_count,
              (SELECT COUNT(*) FROM links l WHERE l.source_id = n.id AND l.target_id IS NULL) as unresolved_count,
              (SELECT COUNT(*) FROM aliases a WHERE a.note_id = n.id) as alias_count
       FROM notes n
       WHERE ${whereClause}
       ORDER BY n.domain, n.path`,
    )
    .all(...params) as Array<{
    id: string
    path: string
    title: string
    description: string | null
    date: string | null
    domain: string | null
    tag_count: number
    unresolved_count: number
    alias_count: number
  }>

  const results: NoteValidation[] = []

  for (const n of notes) {
    const issues: ValidationIssue[] = []

    if (!n.description) {
      issues.push({
        type: "missing_description",
        severity: "warning",
        message: "No description field in frontmatter",
      })
    }

    if (!n.date) {
      issues.push({
        type: "missing_date",
        severity: "warning",
        message: "No date field in frontmatter",
      })
    }

    if (n.tag_count === 0) {
      issues.push({
        type: "missing_tags",
        severity: "error",
        message: "No tags defined",
      })
    }

    if (n.unresolved_count > 0) {
      issues.push({
        type: "unresolved_links",
        severity: "warning",
        message: `${n.unresolved_count} unresolved wikilink${n.unresolved_count > 1 ? "s" : ""}`,
      })
    }

    // Index files without aliases are harder to reference by short name
    if (n.id.endsWith("/index") && n.alias_count === 0) {
      issues.push({
        type: "no_alias_on_index",
        severity: "warning",
        message: "Index file has no aliases — [[shortname]] links to it will not resolve",
      })
    }

    if (!onlyWithIssues || issues.length > 0) {
      results.push({
        id: n.id,
        path: n.path,
        title: n.title,
        domain: n.domain,
        issues,
      })
    }
  }

  return {
    totalChecked: notes.length,
    totalWithIssues: results.filter((r) => r.issues.length > 0).length,
    notes: results,
  }
}
