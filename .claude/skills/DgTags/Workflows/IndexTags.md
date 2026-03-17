# Workflow: IndexTags

Scans all content files and builds a tag index saved to `STATE/`. Used as the first step of any other DgTags workflow.

## When to Run

- Before running AnalyzeTags, OptimizeTags, or SuggestTags for the first time
- When `STATE/last-indexed.txt` is older than 24 hours
- After any bulk content changes (new notes, tag edits)

## Freshness Check

Before running the full scan, check if the index is still fresh:

1. Read `STATE/last-indexed.txt` — if it does not exist, proceed to Step 2.
2. Compare the timestamp in `last-indexed.txt` against the current time.
3. If the index is less than 24 hours old, confirm with the user whether to re-scan or use the cached state.
4. If content files have changed since the last index (newest file mtime > last-indexed timestamp), always re-scan.

## Steps

### Step 1: Run the scanner

From the project root:

```bash
bun .claude/skills/DgTags/Tools/IndexTags.ts --output markdown
```

The script scans all `content/**/*.md` files, parses frontmatter, and writes state to `STATE/`.

### Step 2: Review the output

The script outputs a summary to stdout. Review:
- Total files scanned
- Total unique tags found
- Top 20 tags by frequency
- Count of files with empty/missing tags

### Step 3: Confirm state files were written

After the script completes, these files should exist in `.claude/skills/DgTags/STATE/`:

| File | Content |
|------|---------|
| `tag-index.json` | `{ [tag]: string[] }` — tag to file paths |
| `tag-frequencies.json` | `{ [tag]: number }` — sorted by count descending |
| `empty-files.json` | `string[]` — files with empty or missing tags |
| `format-issues.json` | `{ file: string, format: "array" | "yaml-list" }[]` |
| `last-indexed.txt` | ISO timestamp of this scan |

### Step 4: Surface key metrics

Report to the user:
- Total unique tags
- Total tag assignments (sum of all frequencies)
- Files with no tags (count from `empty-files.json`)
- Files with format inconsistencies (count from `format-issues.json`)
- Top 10 most-used tags
- Tags used only once (potential typos or orphans)

### Step 5: Offer next steps

After indexing, offer:
- Run **AnalyzeTags** to find quality issues and inconsistencies
- Run **OptimizeTags** to fix issues found during analysis
- Run **SuggestTags** for a specific note path

## Flags

```
bun .claude/skills/DgTags/Tools/IndexTags.ts [flags]
  --output json|markdown    Output format (default: markdown)
  --filter-empty            Only show files with empty tags
  --sort frequency|alpha    Sort order (default: frequency)
  --min-count N             Only show tags used N+ times
```
