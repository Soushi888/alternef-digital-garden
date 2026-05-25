---
allowed-tools: [Read, Glob, Grep, Bash, TodoWrite, mcp__garden__garden_status, mcp__garden__garden_search, mcp__garden__garden_backlinks, mcp__garden__garden_files, mcp__garden__garden_explore, mcp__garden__garden_tag_list, mcp__garden__garden_tags, mcp__garden__garden_context, mcp__garden__garden_unresolved_links, mcp__garden__garden_orphans, mcp__garden__garden_validate, mcp__garden__garden_alias_map]
description: "Browse, query, and analyze the knowledge garden without modifying content"
---

# /dg:explore - Garden Navigation & Analysis

## Complementary Skills
Load these skills for taxonomy and graph structure context:
- **DgNotes** — Domain taxonomy, classification rules, link conventions
- **DgQuartzDev** — Graph visualization structure, domain color map

## Purpose
Browse, query, and analyze the digital garden to understand its current state, identify gaps, discover connections, and generate insights — without modifying any content.

## Usage
```
/dg:explore [operation] [query] [--domain domain-name] [--format text|table|json]
```

## Arguments
- `operation` - Exploration mode: `overview`, `orphans`, `unresolved`, `search`, `graph`, `gaps`, `stats`, `validate`
- `query` - Search term, tag, or topic (for `search` operation)
- `--domain` - Scope to specific knowledge domain only
- `--format` - Output format: `text` (default), `table`, `json`

## Operations

### `overview`
Domain health dashboard. For each of the 7 knowledge domains shows:
- File count and directory depth
- Orphan note count (zero incoming links)
- Average wikilinks per note
- Missing index files

### `orphans`
List all notes with zero incoming wikilinks. Output includes:
- File path
- Title from frontmatter
- Domain
- Suggestion for which domain hubs to link from

### `search [query]`
Find notes by title, tag, or content keyword. Returns ranked results with:
- File path and title
- Matching context snippet
- Domain classification
- Existing link count

### `unresolved`
Broken wikilinks ranked by frequency. Uses `garden_unresolved_links` for the actionable list.
- Target slug that doesn't resolve
- Number of notes linking to it
- Sample source note IDs
- Classification hint (alias fix / path fix / content gap)

Use `--domain` to scope to one domain.

### `validate`
Per-note frontmatter and link health check using `garden_validate`.
- Notes missing description, date, or tags
- Notes with unresolved outgoing links
- Index files without aliases (hard to reference by shortname)

Use `--domain` to validate one domain at a time.

### `graph`
Knowledge graph metrics:
- Hub nodes (top 10 most-linked notes)
- Bridge notes (connect 2+ otherwise-disconnected domains)
- Isolated clusters (groups with no external links)
- Total node and edge counts

### `gaps`
Identify underdeveloped areas:
- Stub files (under 200 words)
- Domains with no cross-domain links
- Missing index files for directories with 2+ notes
- Topics referenced in tags but having no dedicated note

### `stats`
Full garden statistics:
- Total file count by type (knowledge, blog, portfolio)
- Tag usage frequency
- Domain distribution
- Most-linked notes
- Recently modified files

## Execution
1. **Context Gathering**: Read PAI memory for relevant patterns.
   - Grep ~/.claude/projects/-home-soushi888-Projets-alternef-digital-garden/memory/ for relevant past patterns
   - Read memory/dg-patterns.md if it exists (garden-specific learnings)
2. **Scope Analysis**: Use `mcp__garden__garden_status` for full stats; `mcp__garden__garden_files` for domain tree overview. Fall back to Glob only for freshness-critical checks after recent writes.
3. **Execute Operation**: Use MCP tools as primary path for each operation:
   - **overview**: `mcp__garden__garden_files` for domain tree + `mcp__garden__garden_backlinks` per note to detect orphans (zero backlinks)
   - **orphans**: `mcp__garden__garden_orphans` (direct); fall back to `mcp__garden__garden_files` + `mcp__garden__garden_backlinks` per note if the new tool is unavailable
   - **unresolved**: `mcp__garden__garden_unresolved_links` (direct); fall back to Bash Python script if unavailable
   - **validate**: `mcp__garden__garden_validate` (direct); fall back to Grep-based frontmatter checks
   - **search**: `mcp__garden__garden_search` with FTS5 query; fall back to Grep for freshness-critical matches
   - **graph**: `mcp__garden__garden_explore` for concept landscape; if `garden_explore` fails with FTS5 error, fall back to `mcp__garden__garden_search` with individual terms + `mcp__garden__garden_status` for node/edge counts
   - **gaps**: `mcp__garden__garden_status` for domain counts + `mcp__garden__garden_search` for stub detection; Grep as fallback
   - **stats**: `mcp__garden__garden_status` for totals; `mcp__garden__garden_tag_list` for tag frequency
4. **Format Results**: Present findings in requested format
5. **Suggest Next Actions**: Based on findings, suggest relevant follow-up commands
   - Orphans found: suggest `/dg:improve --focus links`
   - Stubs found: suggest `/dg:improve [file] --focus completeness`
   - Missing indexes: suggest `/dg:organize --create-index`
6. **Memory Update**: Append key patterns to PAI memory.
   - If new patterns discovered, append to ~/.claude/projects/-home-soushi888-Projets-alternef-digital-garden/memory/dg-patterns.md

## Claude Code Integration
- **Read-Only**: Never modifies content files — safe to run any time
- **PAI Memory**: Reads dg-patterns.md to contextualize findings
- **Glob/Grep-Based**: Uses native file search — no build required
- **Domain-Aware**: Understands the 7-domain taxonomy for classification

## PAI ISC Template
When this command runs, OBSERVE generates these ISC:
- ISC: Exploration results reflect current actual state of content directory
- ISC: Orphan and gap reports include specific file paths and titles
- ISC: Stats counts are accurate based on file inventory
- ISC-A: No content files modified during explore operation
- ISC-A: No wikilinks or frontmatter changed during analysis
