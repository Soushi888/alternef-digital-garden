import chokidar from "chokidar"
import { join } from "path"
import { syncFile, removeNote } from "./indexer"

const CONTENT_DIR = join(import.meta.dir, "../content")

export function startWatcher(): void {
  const watcher = chokidar.watch(CONTENT_DIR, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 800, pollInterval: 100 },
  })

  watcher.on("add", async (filePath: string) => {
    if (!filePath.endsWith(".md")) return
    await syncFile(filePath).catch((e) => console.error("[garden-mcp] sync error:", e))
  })

  watcher.on("change", async (filePath: string) => {
    if (!filePath.endsWith(".md")) return
    await syncFile(filePath).catch((e) => console.error("[garden-mcp] sync error:", e))
  })

  watcher.on("unlink", (filePath: string) => {
    if (!filePath.endsWith(".md")) return
    try {
      removeNote(filePath)
    } catch (e) {
      console.error("[garden-mcp] remove error:", e)
    }
  })

  process.on("SIGINT", () => watcher.close().then(() => process.exit(0)))
  process.on("SIGTERM", () => watcher.close().then(() => process.exit(0)))
}
