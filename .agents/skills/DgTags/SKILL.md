---
name: DgTags
description: Tag indexing, analysis, and optimization for the Alternef Digital Garden. USE WHEN tag quality, tag indexing, tag suggestion, tag vocabulary, bulk tag cleanup, untagged notes.
---

## Customization

**Before executing, check for user customizations at:**
`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/DgTags/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

## MANDATORY: Voice Notification (REQUIRED BEFORE ANY ACTION)

**You MUST send this notification BEFORE doing anything else when this skill is invoked.**

1. **Send voice notification**:
   ```bash
   curl -s -X POST http://localhost:8888/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Loading DgTags skill for tag management"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification**:
   ```
   Loading **DgTags** skill for tag management...
   ```

**This is not optional. Execute this curl command immediately upon skill invocation.**

# Digital Garden Tag Management

Single source of truth for all tag conventions, vocabulary, and management workflows in the Alternef Digital Garden. This skill provides indexing, analysis, optimization, and suggestion tools for the garden's tag system.

**DgTags is the authority on tags.** Other skills (DgNotes, DgBlog) defer here for tag rules. Do not define tag conventions in those skills.

## Workflow Routing

| Trigger | Workflow Section | How to invoke |
||---------|-----------------|---------------|
|| Index tags only (no analysis) | `Workflows/IndexTags.md` | "scan tags" |
|| Index + full report / "make a report" / "analyze tags" | `Workflows/IndexTags.md` → `Workflows/AnalyzeTags.md` (chained, always both) | "analyze tags" |
|| Fix tags in bulk (format, aliases, empty) | `Workflows/OptimizeTags.md` | "fix tags" |
|| Suggest tags for a specific note | `Workflows/SuggestTags.md` | "suggest tags for X" |
|| Validate tag compliance across content | [Validation Workflow](#validation-workflow) | "validate tags" or check tag health |

**Chaining rule:** Any request containing "report", "analyze", "quality", or "issues" MUST chain IndexTags → AnalyzeTags and write `STATE/analysis-report.md`. IndexTags alone is only correct when the user explicitly asks only to scan or build the frequency table.

**Context files:** `TagVocabulary.md` · `Workflows/IndexTags.md` · `Workflows/AnalyzeTags.md` · `Workflows/OptimizeTags.md` · `Workflows/SuggestTags.md`

**State files** (generated, gitignored): `STATE/tag-index.json` · `STATE/tag-frequencies.json` · `STATE/empty-files.json` · `STATE/format-issues.json` · `STATE/last-indexed.txt` · `STATE/analysis-report.md`

## Tag Conventions (Summary)

Full rules live in `TagVocabulary.md`. Summary:

- **Format**: YAML array — `tags: ["tag1", "tag2"]`
- **Case**: Lowercase kebab-case always
- **Order**: Domain tag first, then specific to general
- **Count**: 3-7 tags per note
- **Blog exception**: `blog` is always the first tag for blog posts
- **Aliases**: Do not use short forms. `artificial-intelligence` not `ai`. See alias table in `TagVocabulary.md`.

## Integration with Other Skills

**DgNotes**: Load `DgTags` after drafting a note to get tag suggestions via `SuggestTags`. Tag rules live here, not in DgNotes.

**DgBlog**: Load `DgTags` after drafting a blog post and run `SuggestTags` — `blog` will be prepended automatically. Tag rules live here, not in DgBlog (except the `blog`-first exception, which stays in DgBlog).

**DgQuartzDev**: Tag rendering and TagPage generation belong to DgQuartzDev. Tag content management belongs here.

## Garden MCP Tools — MANDATORY FIRST

**BLOCKING RULE: For any single-note or quick tag lookup, call an MCP tool before reading TagVocabulary.md or running shell commands.**

| Operation | Primary Tool | When to Use IndexTags.ts Instead |
|-----------|-------------|----------------------------------|
| List all tags with note counts | `mcp__garden__garden_tag_list` | Never for quick checks |
| Find all notes carrying a given tag | `mcp__garden__garden_tags` | Never for quick checks |
| Full tag index + analysis report | `Tools/IndexTags.ts` | Always for IndexTags/AnalyzeTags/OptimizeTags workflows |

**Index freshness protocol:**
- Before any `garden_tag_list` or `garden_tags` call, if a bulk tag edit (OptimizeTags) just ran: call `mcp__garden__garden_status` first and verify the index has processed all recent writes.
- `IndexTags.ts` writes to `STATE/` files but does NOT modify content files — it does not affect the garden MCP index.
- After `OptimizeTags` rewrites frontmatter tags across many files: the file watcher will process each write within ~1s. For 50+ files, wait ~30s and confirm via `garden_status` before trusting `garden_tag_list` counts.
- **Still stale after 30s?** Run `/dg:index sync` to force a full rebuild.

`garden_tag_list` reads from the live index and is suitable for quick lookups. Use `IndexTags.ts` whenever running the full workflow chains (IndexTags → AnalyzeTags → OptimizeTags).

## Tools

`Tools/IndexTags.ts` — TypeScript CLI scanner. Scans all `content/**/*.md`, parses frontmatter (handles both YAML array and YAML list formats), writes state files.

```bash
# From project root:
bun .claude/skills/DgTags/Tools/IndexTags.ts --output markdown
bun .claude/skills/DgTags/Tools/IndexTags.ts --filter-empty
bun .claude/skills/DgTags/Tools/IndexTags.ts --output json --min-count 5
```

---

## Validation Workflow

Invoked when the user says "validate tags", "check tag health", "audit tag quality", or as part of a general `--validate` pass.

Run after any create/improve/organize operation, or as a standalone audit.

### Execution Steps

1. **MCP Preflight**: Call `mcp__garden__garden_status` for index freshness; `mcp__garden__garden_tag_list` for live tag frequency table.

2. **Load TagVocabulary.md** in full — this is the rules engine:
   - Canonical tags list (300+ tags)
   - Alias table (maps short forms to canonical: `ai` → `artificial-intelligence`)
   - Domain index tags (first tag per domain)
   - Format rules (lowercase kebab-case, YAML array)

3. **Run Checks** in this order:

   a. **Vocabulary violations** — Compare every tag across content against TagVocabulary. Report unknown tags.
   b. **Alias usage** — Find files using alias forms instead of canonical (e.g., `second-brain` → `knowledge-management`). Report with file paths.
   c. **Format issues** — Find YAML list format (`tags: [tag1, tag2]` vs `tags:\n  - tag1`). Both are valid but array is preferred.
   d. **Empty tags** — Notes with `tags:` field but no tags.
   e. **Domain index tagging** — Verify first tag matches the domain index tag for the note's path.
   f. **Path-segment tags** — Flag `culture-and-education`, `tools-and-technology`, etc. used as tags (they're directory names, not tags).
   g. **Count rules** — Flag notes with < 3 or > 7 tags.

4. **Fix Mode** (if `--fix`):
   - Replace alias tags with canonical forms
   - Normalize YAML-list format to array format (with confirmation per file)
   - Warn about unknown tags and domain-index violations (requires human judgment)

5. **Report**: Summarize violations by severity — blockers (vocabulary, alias), warnings (format, count), info (suggestions).

### ISC
- ISC: All tags verified against TagVocabulary.md vocabulary
- ISC: Alias table scanned — no alias forms remain in frontmatter
- ISC: Domain index tag present as first tag for every note
- ISC-A: No path-segment directory names used as tags
- ISC-A: `--fix` mode never deletes a tag without user confirmation for unknown tags

## Examples

**Example 1: Index the entire garden's tags and make a report**
```
User: "Index all the tags in the garden" / "make a report" / "analyze tags"
→ Load DgTags skill
→ Run IndexTags workflow: bun .claude/skills/DgTags/Tools/IndexTags.ts --output markdown
→ (state files written: tag-index.json, tag-frequencies.json, empty-files.json, format-issues.json)
→ Immediately chain to AnalyzeTags workflow (load TagVocabulary.md, check aliases, orphans, non-vocab tags)
→ Write STATE/analysis-report.md with full structured output from both workflows
→ Present condensed summary to user
→ Offer to run OptimizeTags next
```

**Example 2: Suggest tags for a newly created note**
```
User: "Suggest tags for content/knowledge/tools-and-technology/holochain/hdk.md"
→ Load DgTags skill
→ Run SuggestTags workflow
→ Read note: path is in tools-and-technology → domain tag is `programming`
→ Detect: note is about HDK, Rust, Holochain architecture
→ Output: tags: ["programming", "holochain", "rust", "distributed-systems"]
→ Offer to write tags to frontmatter
```

**Example 3: Clean up tag quality issues**
```
User: "Fix the tag quality issues in the garden"
→ Load DgTags skill
→ Run IndexTags workflow (or use fresh state)
→ Run AnalyzeTags workflow → find 316 empty files, 12 alias uses, 8 format issues
→ Run OptimizeTags workflow
→ Step 2: normalize 8 YAML-list files to array format (with confirmation)
→ Step 3: merge `ai` → `artificial-intelligence` in 4 files (with confirmation)
→ Step 4: suggest tags for empty files one at a time (with per-note confirmation)
```
