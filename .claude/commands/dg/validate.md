---
allowed-tools: [Read, Bash, Glob, Grep]
description: "Validate digital garden content for DG compliance: tags, frontmatter, dates, wikilinks, and emdash rules"
---

# /dg:validate - DG Compliance Validator

## Complementary Skills
Load these skills for validation rules before running any check:
- **DgNotes** — Frontmatter field rules, wikilink conventions, domain taxonomy
- **DgBlog** — Blog-specific frontmatter requirements (author, description, blog tag first)
- **DgTags** — Tag vocabulary, alias table, domain index tags, count rules

## Purpose
Systematically validate digital garden content against all DG compliance rules. Run after any create/improve/edit operation, or as a standalone audit of any path. Catches tag vocabulary violations, frontmatter gaps, wrong date fields, emdash usage, and wikilink problems before they reach GitHub.

## Usage
```
/dg:validate [target] [--fix]
```

## Arguments
- `target` — File, directory, or omit for `content/alternef/` + `content/blog/` + `content/knowledge/`. Explicit path overrides default.
- `--fix` — Auto-fix safe issues: alias tags → canonical, `created:` → `date:`, `modified:` → `updated:`. Does NOT touch description, unknown tags, or emdash in prose (those require human judgment).

## Execution

### Step 1: Load Rules (MANDATORY FIRST ACTION)
Read these files in full before checking a single file:
1. `.claude/skills/DgTags/TagVocabulary.md` — canonical tags, alias table, domain index tags
2. `.claude/skills/DgNotes/SKILL.md` — frontmatter field rules, wikilink rules
3. `.claude/skills/DgBlog/SKILL.md` — blog-specific requirements

### Step 2: Collect Files
Glob all `.md` files under the target path. Skip:
- `content/unpublished/` (unless explicitly targeted)
- `content/templates/` and `content/private/`
- Any file where `draft: true` in frontmatter (unless explicitly targeted)

Detect content type by path:
- `content/blog/` → blog post rules
- `content/alternef/` → alternef article rules (same as blog: author + description required)
- `content/knowledge/` → knowledge note rules

### Step 3: Frontmatter Checks

For each file, parse the YAML frontmatter block and check:

**Required fields by type:**

| Field | knowledge | blog | alternef |
|-------|-----------|------|----------|
| `title` | ✅ | ✅ | ✅ |
| `date` | ✅ | ✅ | ✅ |
| `tags` | ✅ | ✅ | ✅ |
| `description` | ⚠️ warn | ✅ error | ✅ error |
| `author` | — | ✅ error | ✅ error |

**Date field rules (ERROR if violated):**
- Must use `date:` not `created:` — flag `created:` as error with fix shown
- Must use `updated:` not `modified:` — flag `modified:` as error with fix shown
- Format must be `YYYY-MM-DD` (unquoted)
- No future dates

### Step 4: Tag Checks

For each file's tags array, run every check below. Report ALL violations, not just the first:

1. **Vocabulary** — every tag must exist in TagVocabulary.md. Unknown tag → ERROR, show the closest canonical alternative if obvious.
2. **Alias table** — if tag appears in "Do NOT use" column → ERROR, show the canonical replacement.
3. **Path-segment tags** — `culture-and-education`, `tools-and-technology`, `health-and-wellbeing`, `built-environment`, `land-and-nature-stewardship`, `finance-and-economics`, `governance-and-community` are directory names, never tags → ERROR.
4. **Count** — tags array must have 3-7 items → WARNING if outside range.
5. **Order** — first tag must be the domain index tag for the file's path (see table below) → WARNING if wrong.
6. **Blog-first** — files in `content/blog/` must have `blog` as the literal first tag → ERROR if missing or not first.

Domain index tag by path:
| Path contains | Required first tag |
|---------------|--------------------|
| `content/blog/` | `blog` |
| `land-and-nature-stewardship/` | `ecology` |
| `built-environment/` | `architecture` |
| `tools-and-technology/` | `programming` |
| `culture-and-education/` | `education` |
| `health-and-wellbeing/` | `health` |
| `finance-and-economics/` | `economics` |
| `governance-and-community/` | `governance` |
| `content/alternef/` | `alternef` (first or second, after any content-type tag) |

### Step 5: Emdash Check

```bash
grep -n "—" <file>
```

Any match outside a fenced code block → ERROR with line number. Also check `--` used as punctuation (two hyphens between words, not in code).

### Step 6: Wikilink Checks

Grep file for `\[\[` patterns and verify:

1. **Pipe syntax** — `[[target]]` without `|` → WARNING (should be `[[target|Display Name]]`)
2. **Index absolute paths** — any `[[` containing `/index` that does NOT start with `knowledge/` → ERROR, show correct form
3. **Relative paths** — any `[[../` pattern → ERROR

### Step 7: Run Existing Shell Tools

```bash
bash .claude/skills/DgNotes/Tools/ValidateNotes.sh <target>
bash .claude/skills/DgNotes/Tools/CheckDates.sh <target>
```

Parse their output and include any additional findings in the report.

### Step 8: Report

Output a structured report. Use exact filenames and line numbers where available.

```
DG COMPLIANCE REPORT
════════════════════════════════════════
Target: content/alternef/ (6 files)
Date:   2026-03-18

ERRORS  (must fix — blocks publishing)
────────────────────────────────────────
❌ vision-2025.md
   [frontmatter] Missing required field: description
   [tags] "culture-and-education" is a path segment, not a tag — remove it

❌ collecti-jam.md
   [tags] "communaute" not in TagVocabulary — did you mean "community"?

WARNINGS  (should fix)
────────────────────────────────────────
⚠️  fraternal-governance.md
   [tags] count is 7 — at the limit, consider trimming if adding more
   [wikilinks] line 42: [[governance-model]] missing pipe syntax

PASSED
────────────────────────────────────────
✅ philosophy-of-mind-of-the-idi.md
✅ vision-2026.md

════════════════════════════════════════
2 errors in 2 files · 2 warnings in 1 file · 2 files clean
Run with --fix to auto-correct alias tags and wrong date field names.
```

### Step 9: Auto-fix (only when `--fix` passed)

Apply only these safe fixes — no others:
- Replace alias tags with canonical form (e.g. `second-brain` → `knowledge-management`)
- Remove path-segment tags
- Rename `created:` → `date:` in frontmatter
- Rename `modified:` → `updated:` in frontmatter

After fixing, re-run Steps 3-6 on changed files and report the delta.

**Do NOT auto-fix:**
- Unknown tags (choosing the right replacement requires judgment)
- Tag count reduction (choosing which to drop requires judgment)
- Missing `description` (content must be written by hand)
- Emdash in prose (sentence restructuring required)
- Wikilinks without pipe syntax (display text must be chosen)

## PAI ISC Template
When this command runs, OBSERVE generates these ISC:
- ISC: All files in target collected and checked
- ISC: Every tag violation reported with filename and violation type
- ISC: Every frontmatter gap reported with expected vs actual
- ISC: Emdash violations reported with line numbers
- ISC: Wikilink violations reported with correct form shown
- ISC: Shell tools (ValidateNotes.sh, CheckDates.sh) executed and output included
- ISC: Summary counts correct (errors / warnings / clean files)
- ISC-A: No files modified unless `--fix` explicitly passed
- ISC-A: `--fix` never touches description, unknown tags, or emdash in prose
