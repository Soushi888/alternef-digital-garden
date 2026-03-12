import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { Repository } from "@napi-rs/simple-git"
import { QuartzTransformerPlugin } from "../types"
import chalk from "chalk"

// Cached per worker: maps filepath (relative to repo root) → timestamp of first git commit
let _gitFirstCommitCache: Map<string, number> | null = null

function buildGitFirstCommitCache(cwd: string): Map<string, number> {
  if (_gitFirstCommitCache !== null) return _gitFirstCommitCache
  _gitFirstCommitCache = new Map()
  try {
    // Process in chronological order (--reverse) so rename chains propagate correctly:
    // when A→B→C, each rename transfers the original add-date to the new path.
    const output = execSync(
      "git log --reverse --diff-filter=AR --name-status --format='%aI'",
      { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    )
    let currentTs: number | null = null
    for (const line of output.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed) continue
      if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
        currentTs = new Date(trimmed).getTime()
      } else if (currentTs !== null) {
        if (trimmed.startsWith("A\t")) {
          _gitFirstCommitCache.set(trimmed.slice(2), currentTs)
        } else if (trimmed.startsWith("R")) {
          // "R100\told/path\tnew/path"
          const parts = trimmed.split("\t")
          if (parts.length === 3) {
            const [, oldPath, newPath] = parts
            // Carry forward the original first-commit date, not the rename date
            const originalTs = _gitFirstCommitCache.get(oldPath) ?? currentTs
            _gitFirstCommitCache.set(newPath, originalTs)
            _gitFirstCommitCache.delete(oldPath)
          }
        }
      }
    }
  } catch {
    // not a git repo or git unavailable
  }
  return _gitFirstCommitCache
}

export interface Options {
  priority: ("frontmatter" | "git" | "filesystem")[]
}

const defaultOptions: Options = {
  priority: ["frontmatter", "git", "filesystem"],
}

function coerceDate(fp: string, d: any): Date {
  const dt = new Date(d)
  const invalidDate = isNaN(dt.getTime()) || dt.getTime() === 0
  if (invalidDate && d !== undefined) {
    console.log(
      chalk.yellow(
        `\nWarning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`,
      ),
    )
  }

  return invalidDate ? new Date() : dt
}

type MaybeDate = undefined | string | number
export const CreatedModifiedDate: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "CreatedModifiedDate",
    markdownPlugins() {
      return [
        () => {
          let repo: Repository | undefined = undefined
          return async (_tree, file) => {
            let created: MaybeDate = undefined
            let modified: MaybeDate = undefined
            let published: MaybeDate = undefined

            const fp = file.data.filePath!
            const fullFp = path.isAbsolute(fp) ? fp : path.posix.join(file.cwd, fp)
            for (const source of opts.priority) {
              if (source === "filesystem") {
                const st = await fs.promises.stat(fullFp)
                created ||= st.birthtimeMs
                modified ||= st.mtimeMs
              } else if (source === "frontmatter" && file.data.frontmatter) {
                created ||= file.data.frontmatter.created as MaybeDate
                created ||= file.data.frontmatter.date as MaybeDate
                modified ||= file.data.frontmatter.modified as MaybeDate
                modified ||= file.data.frontmatter.updated as MaybeDate
                modified ||= file.data.frontmatter.lastmod as MaybeDate
                published ||= file.data.frontmatter.published as MaybeDate
              } else if (source === "git") {
                if (!repo) {
                  // Get a reference to the main git repo.
                  // It's either the same as the workdir,
                  // or 1+ level higher in case of a submodule/subtree setup
                  repo = Repository.discover(file.cwd)
                }

                try {
                  modified ||= await repo.getFileLatestModifiedDateAsync(file.data.filePath!)
                } catch {
                  console.log(
                    chalk.yellow(
                      `\nWarning: ${file.data
                        .filePath!} isn't yet tracked by git, last modification date is not available for this file`,
                    ),
                  )
                }
              }
            }

            const firstCommitCache = buildGitFirstCommitCache(file.cwd)
            const firstCommitTs = firstCommitCache.get(fp)

            file.data.dates = {
              created: coerceDate(fp, created),
              modified: coerceDate(fp, modified),
              published: coerceDate(fp, published),
              gitCreated: firstCommitTs ? new Date(firstCommitTs) : undefined,
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    dates: {
      created: Date
      modified: Date
      published: Date
      gitCreated?: Date
    }
  }
}
