---
allowed-tools: [Read, Glob, Grep, Bash, TodoWrite]
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
- `operation` - Exploration mode: `overview`, `orphans`, `search`, `graph`, `gaps`, `stats`
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
2. **Scope Analysis**: Build file inventory for selected domain or all content using Glob
3. **Execute Operation**: Run the requested analysis using Grep and Read tools
4. **Format Results**: Present findings in requested format
5. **Suggest Next Actions**: Based on findings, suggest relevant follow-up commands
   - Orphans found → suggest `/dg:improve --focus links`
   - Stubs found → suggest `/dg:improve [file] --focus completeness`
   - Missing indexes → suggest `/dg:organize --create-index`
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
