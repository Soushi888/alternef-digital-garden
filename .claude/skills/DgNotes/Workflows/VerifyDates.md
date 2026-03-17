# VerifyDates Workflow

Date verification workflow for the DgNotes skill. Uses git history as the authoritative source of truth for creation and modification dates.

## Triggers

- User says: "verify dates", "check dates", "dates are wrong", "fix dates", "date mismatch"
- `--verify-dates` flag on any `/dg:*` command
- After bulk import of notes
- When a note's frontmatter date looks suspicious

## Why Git?

Git records the exact timestamp of every commit. The first commit that introduced a file is the authoritative creation date. The most recent commit is the authoritative modification date. Frontmatter `date` and `updated` fields should match these git dates at the year level.

## Steps

### 1. Run the scanner

```bash
# Scan full knowledge directory (default)
bash .claude/skills/DgNotes/Tools/CheckDates.sh

# Scan a specific subdirectory
bash .claude/skills/DgNotes/Tools/CheckDates.sh content/knowledge/tools-and-technology/

# Force full re-scan (ignore cache)
bash .claude/skills/DgNotes/Tools/CheckDates.sh content/knowledge --full
```

Results are written to `STATE/`:
- `issues.json` — machine-readable list of flagged notes
- `analysis-report.md` — human-readable summary with suggested fixes
- `date-index.json` — full index of all scanned notes
- `last-indexed.txt` — timestamp for incremental re-runs

### 2. Review flagged notes

Read `STATE/analysis-report.md` for the full list. Each entry shows:
- The issue type (year_mismatch, future_date, wrong_field, etc.)
- Current frontmatter date
- Git-authoritative creation date
- Git-authoritative last modification date
- Suggested fix

### 3. Apply fixes

For each flagged note, update the frontmatter using the git dates:

**Rule: use `date` and `updated` field names** (not `created`/`modified`).

```yaml
# Correct frontmatter
---
title: "Note Title"
date: 2025-12-11       # git first-commit date
updated: 2026-03-14    # git last-commit date (only if meaningfully edited)
---
```

**When to set `updated`:**
- Only if the note has been meaningfully edited after creation (content changes, not just date fixes)
- A note with only one commit needs only `date`, no `updated`
- A note with 2+ commits generally should have `updated` set to the last commit date

### 4. Manual git lookup (when you need to check a specific file)

```bash
# Creation date (first commit)
git log --follow --format="%as" -- "content/path/to/note.md" | tail -1

# Last modification date (most recent commit)
git log --follow --format="%as" -- "content/path/to/note.md" | head -1

# Full history with messages
git log --follow --oneline -- "content/path/to/note.md"
```

### 5. Update the index after fixes

After applying fixes, run the scanner again to confirm all issues are resolved:

```bash
bash .claude/skills/DgNotes/Tools/CheckDates.sh --full
```

The `STATE/issues.json` should be empty (`[]`) when all notes are clean.

## Issue Types Reference

| Type | Meaning | Fix |
|------|---------|-----|
| `year_mismatch` | Frontmatter year ≠ git first-commit year | Update `date` to git creation date |
| `future_date` | `date` or `updated` is in the future | Correct to actual git date |
| `updated_before_date` | `updated` < `date` (impossible) | Fix the earlier date |
| `wrong_field:created_not_date` | Uses `created:` instead of `date:` | Rename field to `date` |
| `wrong_field:modified_not_updated` | Uses `modified:` instead of `updated:` | Rename field to `updated` |
| `missing_date` | No date field present | Add `date:` from git creation date |

## Date Management Rules (from SKILL.md)

- `date` is the **creation date** — set once when creating the note, never change it afterward.
- `updated` is the **modification date** — add or update it every time you meaningfully change an existing note's content.
- When creating a new note: set `date` only. Do not include `updated`.
- When modifying an existing note: add `updated: YYYY-MM-DD` (today's date) or update it if already present.
