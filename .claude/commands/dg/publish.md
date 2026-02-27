---
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash, TodoWrite]
description: "Manage draft-to-published lifecycle: publish, unpublish, and archive content"
---

# /dg:publish - Content Lifecycle Management

## Complementary Skills
Load this skill for domain classification when moving files:
- **dg-notes** — Domain taxonomy, classification heuristics, index page management

## Purpose
Manage the full draft-to-published lifecycle for digital garden content. Handles publishing drafts, moving files out of `content/unpublished/`, archiving published content, and keeping parent indexes in sync.

## Usage
```
/dg:publish [operation] [target] [--date YYYY-MM-DD] [--destination path] [--dry-run]
```

## Arguments
- `operation` - Lifecycle operation: `publish`, `unpublish`, `status`
- `target` - File path or glob pattern (e.g., `content/unpublished/my-post.md`)
- `--date` - Override the publication date (defaults to today if not set in frontmatter)
- `--destination` - Target domain path for `publish` when moving from `unpublished/`
- `--dry-run` - Preview changes without executing

## Operations

### `publish [file]`
Move content from draft to published state:
1. If `draft: true` in frontmatter: remove the flag (or set to `false`)
2. If file is in `content/unpublished/`: move to correct domain directory
3. Set or confirm `date` field (ISO YYYY-MM-DD)
4. Update parent `index.md` to include the new content
5. Update all incoming wikilinks if file was moved

### `unpublish [file]`
Return published content to draft state:
1. Set `draft: true` in frontmatter
2. Optionally move to `content/unpublished/` if `--destination unpublished` specified
3. Remove from parent `index.md` if moved
4. Note: does not update other notes' outgoing links (they will become broken — warn user)

### `status`
List all unpublished/draft content:
- Files in `content/unpublished/`
- Files anywhere with `draft: true`
- For each: title, date, domain (if classifiable), last modified

## Execution
1. **Context Gathering**: Read PAI memory for relevant patterns.
   - Grep ~/.claude/projects/-home-soushi888-Projets-alternef-digital-garden/memory/ for relevant past patterns
   - Read memory/dg-patterns.md if it exists (garden-specific learnings)
2. **State Detection**: Read target file to determine current state
   - In `unpublished/`? Has `draft: true`? Already published?
3. **Date Resolution**: Check frontmatter for `date` field
   - If present and valid: use it
   - If absent or `--date` provided: set to `--date` or today's date
   - If ambiguous: report and ask before proceeding
4. **Path Resolution** (for `publish` from `unpublished/`): Determine correct domain destination
   - Use `dg-notes` domain taxonomy for classification
   - If `--destination` provided: use it
   - If ambiguous: suggest options and ask for confirmation
5. **Content Operation**: Execute the state change
   - Toggle `draft` frontmatter field
   - Move file if needed (`unpublished/` → domain path)
6. **Index Update**: Update parent `index.md` to include/remove the content
   - For knowledge notes: add entry to domain or category index
   - For blog posts: no index update needed (blog listing is auto-generated)
7. **Link Updates**: If file was moved, update all incoming wikilinks across content tree
8. **Validation**: Verify frontmatter completeness post-operation; check no draft flag remains for published content
9. **Memory Update**: Append key patterns to PAI memory.
   - If new patterns discovered, append to ~/.claude/projects/-home-soushi888-Projets-alternef-digital-garden/memory/dg-patterns.md

## Content States

```
content/unpublished/note.md   →  draft (excluded from build by path)
any file with draft: true     →  draft (excluded by RemoveDrafts plugin)
any file without draft: true  →  published (included in build)
```

## Draft Detection
The Quartz `RemoveDrafts` filter excludes files matching either condition:
- `draft: true` in frontmatter
- Located anywhere under `content/unpublished/`

When publishing, both conditions must be cleared for the content to appear in the build.

## Index Update Pattern
When adding a note to a domain index:
```markdown
## Key Focus Areas

### [New Category or existing]
- [[new-note|Note Title]] — Brief description of what this note covers
```

## Claude Code Integration
- **dg-notes Skill**: Required for domain classification when moving from `unpublished/`
- **PAI Memory**: Reads dg-patterns.md for past publish decisions
- **Link Integrity**: Automatically updates incoming wikilinks when files move
- **Dry-Run Safe**: `--dry-run` shows exactly what would change before any file operation

## PAI ISC Template
When this command runs, OBSERVE generates these ISC:
- ISC: Published content has no `draft: true` and has valid ISO `date` field
- ISC: File placed in correct domain directory matching its topic classification
- ISC: Parent index updated to include newly published content (for knowledge notes)
- ISC: All incoming wikilinks updated if file was moved during publish
- ISC-A: Draft content not accessible in Quartz build output after publish
- ISC-A: Unpublish operation does not silently break other notes' outgoing links without warning
