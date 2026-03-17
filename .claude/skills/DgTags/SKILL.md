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

| Trigger | Workflow |
|---------|----------|
| Index tags only (no analysis) | `Workflows/IndexTags.md` |
| **Index + full report / "make a report" / "analyze tags"** | `Workflows/IndexTags.md` → `Workflows/AnalyzeTags.md` (chained, always both) |
| Fix tags in bulk (format, aliases, empty) | `Workflows/OptimizeTags.md` |
| Suggest tags for a specific note | `Workflows/SuggestTags.md` |

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

## Tools

`Tools/IndexTags.ts` — TypeScript CLI scanner. Scans all `content/**/*.md`, parses frontmatter (handles both YAML array and YAML list formats), writes state files.

```bash
# From project root:
bun .claude/skills/DgTags/Tools/IndexTags.ts --output markdown
bun .claude/skills/DgTags/Tools/IndexTags.ts --filter-empty
bun .claude/skills/DgTags/Tools/IndexTags.ts --output json --min-count 5
```

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
