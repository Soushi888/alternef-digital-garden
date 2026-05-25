---
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash, TodoWrite, mcp__garden__garden_status, mcp__garden__garden_unresolved_links, mcp__garden__garden_orphans, mcp__garden__garden_validate, mcp__garden__garden_alias_map, mcp__garden__garden_files, mcp__garden__garden_tag_list, mcp__garden__garden_search, mcp__garden__garden_context, mcp__garden__garden_backlinks]
description: "Iterative audit-fix-reaudit loop — runs until the garden reaches a target health score or the user is satisfied"
---

# /dg:health-loop — Iterative Garden Health Loop

## Purpose

Run repeated audit → fix → reaudit cycles until the garden reaches a target health score. Designed to be used with `/goal` for autonomous multi-round improvement.

## Usage

```
/dg:health-loop [--target-unresolved N] [--rounds N] [--focus links|orphans|tags|all]
```

## Arguments

- `--target-unresolved N` — Stop when MCP unresolved link count drops below N (default: 300)
- `--rounds N` — Maximum rounds to run (default: 3)
- `--focus` — Constrain to a specific fix type (default: all)

## Loop Structure

Each round follows:

```
1. AUDIT     → garden_status + garden_unresolved_links + garden_orphans
2. CLASSIFY  → categorize issues into A/B/C fix types (see FindBrokenLinks.md)
3. FIX       → apply highest-ROI fixes for this round
4. VERIFY    → garden_status to confirm improvement
5. DECIDE    → continue if target not reached and rounds remain
```

## Round Priorities

**Round 1 — Structural fixes (highest ROI)**
- Add aliases to top-N broken targets where file exists
- Fix broken absolute paths in source files
- Add missing domain index files
- Fix cross-domain index link formatting

**Round 2 — Content stubs (medium ROI)**
- Create stubs for concepts referenced 3+ times
- Add cross-domain bridges to isolated domain indexes
- Bridge orphaned notes to their domain index

**Round 3 — Deep cleanup (low ROI, high coverage)**
- Create stubs for concepts referenced 2+ times
- Consolidate near-duplicate tags
- Fix frontmatter issues (missing description, date, tags)

## Execution

### Step 1: Initial Audit

```
Call garden_status → record baseline (unresolvedLinks, totalNotes)
Call garden_unresolved_links({ limit: 50, minCount: 2 }) → get top broken targets
Call garden_orphans({ excludeIndexes: true }) → get orphaned notes
Call garden_tag_list → look for near-duplicate tags
```

Report:
```
## Garden Health — Round N Audit

| Metric | Value |
|---|---|
| Unresolved links (MCP) | N |
| Orphaned notes | N |
| Total notes | N |
| Tags | N |

### Top 10 broken targets:
[list from garden_unresolved_links]

### Top orphans:
[list from garden_orphans, grouped by domain]
```

### Step 2: Classify & Fix

Load `DgNotes/Workflows/FindBrokenLinks.md` for fix classification logic.

For each broken target:
1. Check if file exists: `Bash: find content/ -iname "target.md"`
2. If yes → alias fix (modify frontmatter)
3. If path-based → path fix (edit source files)
4. If missing → stub creation (if 3+ references)

For orphans: add links from the domain index or related notes.

For tags: merge near-duplicates, remove singletons with 1 occurrence.

### Step 3: Verify & Decide

```
Call garden_status → compare unresolvedLinks to target
```

**Continue if**: unresolvedLinks > target AND rounds remaining AND new fixable items found
**Stop if**: target reached OR no more fixable items OR max rounds reached

### Step 4: Final Report

```
## Garden Health — Final State

| Metric | Before | After | Delta |
|---|---|---|---|
| Unresolved (MCP) | N | N | -N |
| Notes | N | N | +N |
| Rounds run | — | N | — |

### Changes made:
- N alias additions
- N path corrections
- N new stubs created
- N orphans bridged
- N tags consolidated

### Remaining gaps (content work needed):
[list of concepts still missing with reference counts]
```

## Integration with /goal

Combine with `/goal` for autonomous multi-round improvement:
```
/goal Run /dg:health-loop until unresolved < 300, then stage all changes for review
```

The stop hook will block until the target is reached.

## Skill Context

Load `DgNotes` before running fixes. Load `DgTags` before any tag consolidation.

## Anti-patterns to Avoid

- Do NOT create stubs for 1x references (noise outweighs value)
- Do NOT change content of existing notes unless improving frontmatter
- Do NOT commit — always stage for review
- Do NOT run more than 5 rounds (diminishing returns after round 3)
