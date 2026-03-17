# Workflow: AnalyzeTags

Analyzes the tag index to find quality issues: empty files, format inconsistencies, duplicate/similar tags, orphan tags, and non-vocabulary tags. Produces a structured report.

## Prerequisites

Run `IndexTags` workflow first. If `STATE/tag-index.json` does not exist, run IndexTags before proceeding.

## Steps

### Step 1: Verify state files exist

Check that these files exist in `.claude/skills/DgTags/STATE/`:
- `tag-index.json`
- `tag-frequencies.json`
- `empty-files.json`
- `format-issues.json`

If any are missing, run the IndexTags workflow first.

### Step 2: Load the state files

Read the state files as JSON. Do not re-scan the filesystem — the state files are the source of truth for this workflow.

### Step 3: Find empty-tag files

Read `STATE/empty-files.json`. Count and list the files with empty, null, or missing tag fields.

Report:
```
## Empty Tag Files
Total: N files

Top examples (first 10):
- content/path/to/note.md
- content/path/to/another.md
```

### Step 4: Find format inconsistencies

Read `STATE/format-issues.json`. Separate into two groups:
- Files using JSON-array inline format: `tags: ["tag1", "tag2"]`
- Files using YAML-list format (multi-line block)

Report counts for each. The standard is YAML array `tags: ["tag1", "tag2"]` — YAML-list files should be normalized.

### Step 5: Find duplicate and similar tags

Load `TagVocabulary.md` alias table. For each alias in the "Do Not Use" list, check `STATE/tag-frequencies.json` for its presence.

Report any alias tags found with their frequency and the canonical replacement:
```
## Alias Tags Found (should be merged)
- `ai` (N uses) → should be `artificial-intelligence`
- `p2p` (N uses) → should be `peer-to-peer`
```

Also flag any tags that are very similar to vocabulary tags (differ by 1-2 characters or contain/are contained by a vocabulary tag).

### Step 6: Find orphan tags

From `STATE/tag-frequencies.json`, list all tags with count = 1. These are candidates for:
- Typos (e.g., `blochchain` instead of `blockchain`)
- Non-standard spellings (e.g., `permaculture-design` instead of `permaculture`)
- Legitimate niche tags that simply haven't been used elsewhere yet

Report as a list for user review — do not automatically flag as errors.

### Step 7: Find non-vocabulary tags

Compare all tags in `STATE/tag-frequencies.json` against the tags defined in `TagVocabulary.md`. Tags not in the vocabulary and not in the alias list are candidates for either:
- Addition to TagVocabulary.md
- Normalization to an existing vocabulary tag

Report: top 20 non-vocabulary tags by frequency, with their count.

### Step 8: Write analysis report

Write the full structured report to `STATE/analysis-report.md`. Include:
- Scan timestamp (from `STATE/last-indexed.txt`)
- Summary table (total tags, total files, empty files, format issues, aliases found, orphans)
- Each section from Steps 3-7 with full detail

### Step 9: Present summary and offer next steps

Show the user a condensed summary table and offer:
- Run **OptimizeTags** to fix the issues found
- Run **SuggestTags** for specific untagged notes
- Manually review `STATE/analysis-report.md` for full detail
