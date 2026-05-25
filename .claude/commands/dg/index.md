---
allowed-tools: [Bash, Read, mcp__garden__garden_status]
description: "Rebuild or verify the garden MCP SQLite index after bulk content operations, index staleness, or first-time setup"
---

# /dg:index: Garden Index Management

## Purpose

Manage the garden MCP SQLite index at `.local/garden.db`. The file watcher handles incremental updates automatically during normal operation. Use this command when the index needs manual attention: bulk operations, staleness, or first-time setup.

## Usage

```
/dg:index [operation]
```

## Operations

| Operation | When to use |
|-----------|-------------|
| `status` | Check current index health and freshness without modifying anything |
| `sync` (default) | Full re-index of all content (safe to run alongside the live MCP server) |
| `init` | First-time setup: create DB schema then run full index |

## When to Run

- After bulk content operations touching 20+ files (e.g., `/dg:organize` moves, `/dg:tags --fix-all`)
- When `mcp__garden__garden_status` shows `last_indexed` more than 5 minutes old with recent file activity
- After restoring from backup or moving the project directory
- First-time setup (`.local/garden.db` does not exist)
- When `garden_search` or `garden_backlinks` returns stale or unexpected results

## Execution

### status

1. Call `mcp__garden__garden_status` to get current index stats.
2. Report: total notes, total links, last_indexed timestamp, DB size, domain breakdown.
3. Flag as stale if `last_indexed` is more than 5 minutes behind the current time while recent content activity exists.
4. Suggest `sync` if stale.

### sync (default)

1. Call `mcp__garden__garden_status` to capture pre-sync note count and `last_indexed` as baseline.
2. Run the full re-index from the project root:
   ```bash
   bun mcp/server.ts sync
   ```
3. Call `mcp__garden__garden_status` again to confirm note count matches or exceeds baseline and `last_indexed` is current.
4. Report delta: notes indexed, time elapsed.

**Note:** Running `sync` while the MCP server is active is safe. The DB uses WAL mode (`PRAGMA journal_mode = WAL`), which allows concurrent writes between the sync process and the live server's file watcher.

### init (first-time setup)

1. Check whether `.local/garden.db` exists.
2. If the file is missing:
   ```bash
   bun mcp/server.ts init
   bun mcp/server.ts index
   ```
3. If the file exists, warn that `init` would re-create the schema on top of existing data and suggest `sync` instead.
4. Verify via `mcp__garden__garden_status`: total notes should match the content directory count.

## Architecture Notes

The garden index is a SQLite FTS5 database:

- **WAL mode**: concurrent reads and writes are safe; the sync process and live MCP server can run simultaneously.
- **File watcher** (chokidar): watches `content/` for `.md` changes, syncs each file within ~1s per file. Active only while the MCP server is running as a Claude MCP provider.
- **ignoreInitial: true**: the watcher does NOT re-index files that existed before the server started. A fresh `sync` or `index` is required after server restart to catch any writes that occurred while the server was down.
- **FTS5 triggers**: the `notes_fts` virtual table stays in sync with `notes` via INSERT/UPDATE/DELETE triggers; no manual FTS rebuild needed after `sync`.

## PAI ISC Template

When this command runs, OBSERVE generates these ISC:
- ISC: `garden_status` note count after sync matches or exceeds pre-sync baseline
- ISC: `last_indexed` timestamp is within 30s of sync completion
- ISC-A: No content files modified during index operation
- ISC-A: `sync` not run as `init` when DB already exists without explicit confirmation
