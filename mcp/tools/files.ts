import { getDb } from "../db"
import { DOMAINS } from "../types"
import type { FileTree } from "../types"

interface FilesArgs {
  domain?: string
  depth?: number
}

export function gardenFiles({ domain, depth = 2 }: FilesArgs): FileTree {
  const db = getDb()

  if (domain) {
    const rows = db
      .prepare(`SELECT path FROM notes WHERE domain = ? AND draft = 0 ORDER BY path`)
      .all(domain) as { path: string }[]

    // Group by immediate subfolder (parts[2]), ignoring direct domain files (parts.length < 4)
    const subfolders = new Map<string, number>()
    let directCount = 0

    for (const { path } of rows) {
      const parts = path.split("/")
      if (parts.length >= 4) {
        const sub = parts[2]
        subfolders.set(sub, (subfolders.get(sub) ?? 0) + 1)
      } else {
        directCount++
      }
    }

    const children: FileTree[] = [...subfolders.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    if (directCount > 0) children.unshift({ name: "(root)", count: directCount })

    return { name: domain, count: rows.length, children }
  }

  // All domains overview
  const children: FileTree[] = DOMAINS.map((d) => {
    const c = (
      db.prepare("SELECT COUNT(*) as c FROM notes WHERE domain = ? AND draft = 0").get(d) as { c: number }
    ).c
    return { name: d, count: c }
  }).sort((a, b) => b.count - a.count)

  const topLevel = (
    db.prepare("SELECT COUNT(*) as c FROM notes WHERE domain IS NULL AND draft = 0").get() as { c: number }
  ).c

  const total = (db.prepare("SELECT COUNT(*) as c FROM notes WHERE draft = 0").get() as { c: number }).c

  return {
    name: "garden",
    count: total,
    children: [{ name: "top-level", count: topLevel }, ...children],
  }
}
