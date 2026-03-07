# Workflow: OptimizeTags

Applies tag improvements to the content files: normalizes format, merges alias tags, and fills empty tags. Every write action requires explicit user confirmation.

## Prerequisites

Run `AnalyzeTags` workflow first to identify issues. The optimize workflow addresses what analysis finds.

**Critical rule: Never write tags to any file without the user reviewing and approving the proposed tags.** This is irreversible and bulk edits can corrupt many files at once. Present batches, wait for confirmation, then proceed.

## Steps

### Step 1: Load analysis results

Read `STATE/analysis-report.md` and `STATE/format-issues.json`. Confirm the user wants to proceed with optimization.

### Step 2: Standardize frontmatter format (format normalization)

**What**: Convert YAML-list format to YAML-array format.

**YAML-list (old):**
```yaml
tags:
  - holochain
  - blockchain
```

**YAML-array (new):**
```yaml
tags: ["holochain", "blockchain"]
```

**Procedure:**
1. Read `STATE/format-issues.json` to get the list of files with non-array format.
2. Show the user a count: "Found N files with YAML-list format. Proceed to normalize all?"
3. On user confirmation, for each file: read the file, convert the tags block, write the file.
4. Re-run IndexTags after the batch to confirm counts.

**Do not change any tag values during format normalization** — only the format changes.

### Step 3: Merge alias tags

**What**: Replace non-canonical alias tags with their canonical forms from `TagVocabulary.md`.

**Procedure:**
1. Read `STATE/analysis-report.md`, section "Alias Tags Found".
2. For each alias group (e.g., all files using `ai`), present to the user:
   ```
   Found 12 files using `ai` — should be `artificial-intelligence`.
   Files affected:
   - content/knowledge/tools-and-technology/artificial-intelligence/llms.md
   - content/blog/ai-post.md
   ...
   Approve replacement? [yes/skip/review-individually]
   ```
3. On "yes": replace the alias tag with the canonical tag in all listed files.
4. On "skip": move to next alias group.
5. On "review-individually": present each file one at a time.
6. After all groups: re-run IndexTags to confirm the aliases are gone.

### Step 4: Fill empty tags (one note at a time)

**What**: Suggest tags for files with empty/missing tags, with user approval per note.

**Procedure:**
1. Read `STATE/empty-files.json` — the list of files with no tags.
2. Present count to user: "Found N untagged files. Work through them now, or provide a specific path?"
3. For each file (in order, or the one the user specified):
   a. Read the file content and path.
   b. Determine the domain from the file path (e.g., `content/knowledge/tools-and-technology/` → `programming`).
   c. Scan the content for concepts matching TagVocabulary entries.
   d. Check existing wikilinks — link targets often imply relevant tags.
   e. Suggest 3-7 tags ordered: domain tag first, then topic tags from specific to general.
   f. For blog posts (in `content/blog/`): always include `blog` as the first tag.
   g. Present as a pasteable YAML array:
      ```
      Suggested tags for content/knowledge/.../note.md:
      tags: ["programming", "holochain", "distributed-systems", "rust"]

      Accept / Edit / Skip?
      ```
   h. On accept: write tags to the file.
   i. On edit: user provides revised tags, write those.
   j. On skip: move to next file.

### Step 5: Validate improvements

After completing optimization steps, run IndexTags again:

```bash
bun .claude/skills/dg-tags/Tools/IndexTags.ts --output markdown
```

Compare the new stats against the pre-optimization baseline:
- Empty files count should be lower
- Format inconsistencies should be lower or zero
- Alias tags should be gone

Report the before/after comparison to the user.
