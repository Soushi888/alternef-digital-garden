// Thin fs wrapper isolated from lib.ts so the query library's own import list
// stays limited to bun:sqlite, path, and pure local modules. fs/path are
// Bun/Node builtins (no transitive weight); this file exists only so lib.ts
// itself never says `import ... from "fs"`.
import { existsSync, mkdirSync, readdirSync, statSync } from "fs"
import { join } from "path"

export function ensureDirSync(dir: string): void {
  mkdirSync(dir, { recursive: true })
}

export function newestMtimeMs(dir: string): number {
  if (!existsSync(dir)) return 0
  let newest = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      const sub = newestMtimeMs(full)
      if (sub > newest) newest = sub
    } else if (entry.name.endsWith(".md")) {
      const mtime = statSync(full).mtimeMs
      if (mtime > newest) newest = mtime
    }
  }
  return newest
}
