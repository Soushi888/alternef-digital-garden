# FindBrokenLinks Workflow

Find, categorize, and fix broken wikilinks in the digital garden. This is the primary maintenance workflow for link health.

## When to Use

- After bulk content imports or renames
- When `garden_status` shows a high `unresolvedLinks` count
- After running `/dg:explore orphans` and finding disconnected notes
- Periodically as part of garden health maintenance

## Step 1 — Get the Unresolved Link List

```
mcp__garden__garden_unresolved_links({ limit: 50, minCount: 1 })
```

This returns links grouped by target with source files — far more actionable than the aggregate count.

For a domain-scoped run:
```
mcp__garden__garden_unresolved_links({ domain: "tools-and-technology", limit: 30 })
```

## Step 2 — Classify by Fix Type

For each broken target, classify into one of three categories:

### A: Alias Fix (file exists under a different slug)
**Pattern**: `[[Blockchain]]` fails because `blockchain/index.md` exists but has no alias.
**Fix**: Add `aliases: ["Blockchain", "blockchain"]` to the target file's frontmatter.
**Signal**: A file exists whose name is close (case-different, hyphenated vs spaced, or in a subdirectory).

Check with:
```bash
find content/ -iname "<target>.md" 2>/dev/null
find content/ -iname "<target>*" -name "index.md" 2>/dev/null
```

Use `mcp__garden__garden_alias_map` to see current alias coverage.

### B: Path Fix (link uses wrong/outdated path)
**Pattern**: `[[knowledge/old-path/note]]` where the note moved or was renamed.
**Fix**: Edit the source files to use the correct path.
**Signal**: The path contains wrong directory names, uses `networking/linux/` instead of `networking/operating-systems/linux/`, or uses legacy paths.

Fix in source files:
```python
content.replace('[[old/path/target|Display]]', '[[new/path/target|Display]]')
```

### C: Content Gap (note genuinely doesn't exist)
**Pattern**: `[[systems-thinking]]` — no such file anywhere in the garden.
**Fix**: Create a stub note at the appropriate domain path.
**Signal**: No file found even with case-insensitive search; the target is a concept, not a renamed/moved note.

Use `/dg:create` to create the stub with proper frontmatter and at least a brief overview + related links.

## Step 3 — Apply Fixes

### Alias additions (safest — no source files touched)

For each A-type fix, read the target file and add to its frontmatter:
```yaml
aliases:
  - TargetName
  - target-name
```

Always add `updated: YYYY-MM-DD` when modifying frontmatter.

### Path corrections (edit source files)

For B-type fixes, use batch Python replacement when the pattern appears in many files:
```python
import glob
for f in glob.glob('content/**/*.md', recursive=True):
    with open(f) as fh: content = fh.read()
    if 'old/path' in content:
        with open(f, 'w') as fh: fh.write(content.replace('old/path', 'new/path'))
```

### Stub creation (content gaps)

For C-type fixes that are high-frequency (5+ references), create a substantive stub.
For low-frequency (1-2 references), create a minimal stub or accept as a content gap.

Stub minimum:
```yaml
---
title: Concept Name
date: YYYY-MM-DD
description: One-sentence definition
aliases:
  - concept-name
  - Concept Name
tags: ["relevant-tag", "domain-tag"]
---

Brief overview paragraph.

## Related
- [[related-note|Related Note]] — connection description
```

## Step 4 — Verify

After fixes, wait 2-3 seconds for the garden index to re-index, then:
```
mcp__garden__garden_status()
```

Compare `unresolvedLinks` count. Also use `mcp__garden__garden_validate` to check specific files.

## Quick Reference: Common Fix Patterns

| Broken Pattern | Likely Cause | Fix |
|---|---|---|
| `[[Blockchain]]` | Index file missing alias | Add alias to `blockchain/index.md` |
| `[[knowledge/x/networking/networking]]` | Wrong/outdated path | Fix to `networking/index` |
| `[[../index\|Parent]]` | Relative path (not Quartz-safe) | Replace with absolute path |
| `[[Domain Name\|X]]` | Domain dir, missing /index | Change to `[[knowledge/domain/index\|X]]` |
| `[[FrenchWord]]` | French alias missing | Add `aliases: ["FrenchWord"]` to English note |
| `[[SomeConcept]]` | Note never written | Create stub in appropriate domain |
