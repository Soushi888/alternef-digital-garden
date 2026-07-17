---
name: DgNotes
description: Knowledge note management for Alternef Digital Garden. USE WHEN note creation, domain classification, frontmatter, wikilinks, index management, note quality review.
---

## Customization

**Before executing, check for user customizations at:**
`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/DgNotes/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

## 🚨 MANDATORY: Voice Notification (REQUIRED BEFORE ANY ACTION)

**You MUST send this notification BEFORE doing anything else when this skill is invoked.**

1. **Send voice notification**:
   ```bash
   curl -s -X POST http://localhost:8888/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Loading DgNotes skill for knowledge note management"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification**:
   ```
   Loading **DgNotes** skill for knowledge note management...
   ```

**This is not optional. Execute this curl command immediately upon skill invocation.**

# Digital Garden Knowledge Notes

Persistent knowledge layer for the Alternef Digital Garden's 7-domain taxonomy. Provides classification heuristics, frontmatter conventions, content structure patterns, and linking rules.

## Workflow Routing

| Trigger | Workflow Section | How to invoke |
||---------|-----------------|---------------|
|| Create new knowledge note | [Create Workflow](#create-workflow) | Distill user intent → follow create steps |
|| Organize or restructure notes | [Organize Workflow](#organize-workflow) | "organize X" → follow organize steps |
|| Improve note quality | [Improve Workflow](#improve-workflow) | "improve X" → follow improve steps |
|| Quick frontmatter-only fix | [Improve Workflow](#improve-workflow) (--quick mode) | "fix frontmatter of X" → quick mode |
|| Add or audit links between notes | [Improve Workflow](#improve-workflow) (--focus links) | "audit links in X" → links focus |
|| Find and fix broken wikilinks | `Workflows/FindBrokenLinks.md` | Load that workflow file directly |
|| Iterative multi-round garden health | [Health Loop](#health-loop-workflow) | "run health loop on garden" |
|| Explore domain stats and gaps | [Explore Workflow](#explore-workflow) | "explore/analyze garden" → follow explore steps |
|| Explore unresolved links list | [Explore Workflow](#explore-workflow) (unresolved mode) | "show broken links" |
|| Explore orphaned notes | [Explore Workflow](#explore-workflow) (orphans mode) | "find orphans" |
|| Validate frontmatter + link health | [Explore Workflow](#explore-workflow) (validate mode) | "validate domain X" |
|| Publish draft to correct domain | [Publish Workflow](#publish-workflow) | "publish X" → follow publish steps |
|| Validate frontmatter and links | Add `--validate` flag to any command | Use on any create/improve/organize |
|| Verify note dates against git history | `--verify-dates` flag → `Workflows/VerifyDates.md` | Run VerifyDates workflow |

**Context files:** `DomainTaxonomy.md` · `ContentQualityRubric.md` · `KnowledgeNoteTemplate.md` · `DomainIndexTemplate.md` · `CategoryIndexTemplate.md`

## Garden MCP Tools — MANDATORY FIRST

**BLOCKING RULE: For any read or query operation on garden content, a garden MCP tool MUST be called before any Glob/Grep/Bash read.** Exception: use `Read` directly only for immediate post-write verification (within ~2s of writing a file).

| Operation | Primary Tool | Fallback (only if MCP unavailable or stale) |
|-----------|-------------|----------------------------------------------|
| Find notes by topic/keyword | `mcp__garden__garden_search` | Grep |
| Note body + all links + backlinks + tag siblings | `mcp__garden__garden_context` | Read + Grep |
| Notes that link TO a given note | `mcp__garden__garden_backlinks` | Grep for `[[filename]]` |
| Outgoing wikilinks from a note | `mcp__garden__garden_links` | Read note |
| Domain tree with note counts | `mcp__garden__garden_files` | Glob |
| Garden health and stats | `mcp__garden__garden_status` | Manual counting |
| **Broken links list (actionable)** | `mcp__garden__garden_unresolved_links` | Python script (see FindBrokenLinks.md) |
| **Notes with zero backlinks** | `mcp__garden__garden_orphans` | Grep + backlinks per-note |
| **Frontmatter + link validation** | `mcp__garden__garden_validate` | ValidateNotes.sh |
| **Alias coverage audit** | `mcp__garden__garden_alias_map` | Grep for `aliases:` in frontmatter |

**Write → Index → MCP protocol:**
The garden index lags writes by ~1s per file. After writing content:
- **Single file**: use `Read` for immediate verification, then switch to MCP after 2s.
- **Bulk operations (10+ files)**: call `mcp__garden__garden_status` and compare `last_indexed` against your last write timestamp. If the index is still processing, wait and re-call. Do NOT use MCP search/backlinks until the index is confirmed fresh.
- After any `/dg:validate --fix` run: always call `mcp__garden__garden_status` to verify the index rebuilt before the next MCP query.
- **Index not recovering?** If `last_indexed` stays stale after waiting, run `/dg:index sync` to force a full rebuild.

## Domain Taxonomy

| Domain | Directory | Color | Core Topics |
|--------|-----------|-------|-------------|
| Land & Nature | `land-and-nature-stewardship/` | `#2ecc71` | Ecology, permaculture, regenerative agriculture, biodiversity |
| Built Environment | `built-environment/` | `#3498db` | Architecture, urban planning, infrastructure, geodesic domes |
| Tools & Technology | `tools-and-technology/` | `#9b59b6` | Software, hardware, programming, AI, blockchain, web dev |
| Culture & Education | `culture-and-education/` | `#f39c12` | Learning, philosophy, liberal arts, metacognition, ikigai |
| Health & Wellbeing | `health-and-wellbeing/` | `#e74c3c` | Physical/mental health, nutrition, fitness, qi gong |
| Finance & Economics | `finance-and-economics/` | `#1abc9c` | Economics, crypto, REA accounting, sustainable economy |
| Governance & Community | `governance-and-community/` | `#34495e` | Governance models, digital fabrics, sociocracy, OVNs |

See `DomainTaxonomy.md` for the complete taxonomy with all subdirectories and tag lists.

## Classification Heuristics

When a note could fit multiple domains, use these decision rules:

1. **Primary function test**: What is the note *primarily about*? A note on "blockchain governance" goes in governance-and-community if it focuses on decision-making, or tools-and-technology if it focuses on the protocol.
2. **Audience test**: Who would look for this? Developers → tools-and-technology. Community organizers → governance-and-community.
3. **Cross-domain linking**: When a note bridges domains, place it in its primary domain and use wikilinks to connect to the related domain's index.
4. **Subdirectory depth**: tools-and-technology has deep nesting (up to 5+ levels). Other domains are mostly flat (1-2 levels). Match existing depth patterns.

## Frontmatter Conventions

### Knowledge Note (standard)
```yaml
---
title: "Note Title"
description: "One-sentence description of the topic"
aliases:
  - "Alternative Name"
  - "Abbreviation"
tags:
  - domain-tag
  - specific-tag1
  - specific-tag2
date: YYYY-MM-DD
updated: YYYY-MM-DD
draft: false
---
```

### Required fields
- `title`: Descriptive, title case
- `tags`: Array, lowercase kebab-case. Include at least one domain-level tag
- `date`: ISO date (YYYY-MM-DD) — publication/creation date

### Optional fields
- `description`: One-sentence summary (used in search results and meta)
- `aliases`: Alternative names for wikilink resolution
- `updated`: ISO date, last modification date — add or update when editing an existing note
- `draft`: Set `true` to exclude from build

### Date management rules
- `date` is the **creation date** — set once when creating the note, never change it afterward.
- `updated` is the **modification date** — add or update it every time you meaningfully change an existing note's content.
- When creating a new note: set `date` only. Do not include `updated`.
- When modifying an existing note: add `updated: YYYY-MM-DD` (today's date) or update it if already present.
- If a note has no `updated` field and you are modifying it, always add one.

### Date field aliases (Quartz internals)
Quartz's frontmatter transformer (`quartz/plugins/transformers/frontmatter.ts`) accepts multiple aliases for dates:
- **created**: `date`, `created`
- **modified**: `updated`, `modified`, `lastmod`, `last-modified`
- **published**: `date`, `published`, `publishDate`

Prefer `date` and `updated` for consistency with the project CLAUDE.md conventions.

### Tag rules

> **⚠️ MANDATORY: Load `DgTags` before touching any tag field.**
> Tag rules, vocabulary, and format standards live in the **`DgTags`** Skill (`TagVocabulary.md`). If you modify, add, or suggest tags without loading DgTags first, you risk introducing near-duplicates, singletons, or wrong-format tags. This is non-negotiable.

Load `DgTags` when working with tags. After drafting a note, run the `SuggestTags` workflow from `DgTags` to get validated tag suggestions.

Summary: lowercase kebab-case, domain tag first, 3-7 tags, YAML array format `tags: ["tag1", "tag2"]`.

## Content Structure

### No H1 title in body
**Rule:** Never start a note with `# Title`. The `title` frontmatter field is the canonical title — Quartz renders it as the page H1. Adding `# Title` in the body duplicates the heading.

### Standard note body
```markdown
Brief description of the topic (1-2 paragraphs).

## Key Concepts

Core ideas explained clearly.

## [Topic-specific sections]

Deeper exploration organized logically.

## Related Topics
- [[related-note-1|Display Name]]
- [[related-note-2|Display Name]]

## References
- [External Source](https://example.com)
```

### Index pages
Index files (`_index.md` or `index.md`) serve as landing pages for directories. They use a distinct pattern — see templates.

## Wikilink Rules

1. **Always use pipe syntax**: `[[file-name|Display Name]]` not `[[file-name]]`
2. **Case sensitive**: Target must match actual filename exactly
3. **Index files ALWAYS require full absolute paths starting from `knowledge/`** — this is the most common mistake:
   - WRONG: `[[health-and-wellbeing/index|Health and Wellbeing]]`
   - WRONG: `[[yoga/index|Yoga Traditions]]`
   - CORRECT: `[[knowledge/health-and-wellbeing/index|Health and Wellbeing]]`
   - CORRECT: `[[knowledge/health-and-wellbeing/yoga/index|Yoga Traditions]]`
4. **Never use relative paths** (`../`) for index links — they break in Quartz
5. **Section links**: `[[file-name#Section Heading|Topic Section]]`
6. **Embeds**: `![[image.png]]` or `![[image.png | 100x145]]`

## Index Page Management

Every directory with 2+ notes should have an `index.md` with:
- Title and description in frontmatter
- Overview paragraph
- "Key Focus Areas" sections linking to child notes
- Guiding Principles section
- Links use absolute paths from content root

When adding a note to a directory, check if the parent index needs updating.

## Quality Rubric

See `ContentQualityRubric.md` for the scoring system used to evaluate note quality across structure, clarity, completeness, and connections.

## Validation Utility

`Tools/ValidateNotes.sh` — Shell script for batch validation of notes in a domain directory. Used internally by the `--validate` flag across `/dg:create`, `/dg:improve`, `/dg:organize`, and `/dg:build`.

`Tools/CheckDates.sh` — Detects date anomalies by comparing frontmatter dates against git history: year mismatches, future dates, inverted dates, and wrong field names (`created`/`modified` instead of `date`/`updated`). Results cached in `STATE/`. See `Workflows/VerifyDates.md` for the full workflow.

Run directly for quick batch checks:
```bash
bash .claude/skills/DgNotes/Tools/ValidateNotes.sh content/knowledge/tools-and-technology/
```

Checks: frontmatter completeness (title, tags, date), kebab-case filenames, no emdash characters.

---

## Create Workflow

Invoked when the user says "create a note about X", "write a knowledge note on Y", or similar content-intent.

### Execution Steps

1. **MCP Preflight** (mandatory — before any file reads):
   - Call `mcp__garden__garden_status` to confirm index is fresh
   - Call `mcp__garden__garden_files` to get domain tree and verify target directory exists
   - Call `mcp__garden__garden_search` with the new note's topic/title to find existing related notes (prevents duplicates; informs link suggestions)

2. **Content Type Detection**: Determine target path and template based on content type — `knowledge`, `blog`, `portfolio`, `index`.

3. **Path Generation**: Create Quartz-compatible file paths. Slugify title to kebab-case. Place in correct domain directory.

4. **Frontmatter Draft**: Generate all frontmatter fields EXCEPT tags:
   - `title`: Descriptive, title case
   - `date`: Today's date (ISO YYYY-MM-DD)
   - `description`: One-sentence summary (required for search)
   - `aliases`: Alternative names (optional)
   - `draft`: true for drafts

5. **Tag Gate** (mandatory — do not skip):
   - Load DgTags TagVocabulary.md in full
   - Identify the domain index tag for this content's path
   - Propose 3-7 tags drawn exclusively from the vocabulary
   - Check alias table: replace any alias with its canonical form
   - Check path-segment tags: never use directory names as tags
   - Order: domain index tag first, then topic tags specific→general

6. **Template Application**: Apply content templates based on type and domain.

7. **File Creation**: Create the content file with finalized frontmatter and structure.

8. **Index Updates**: Update relevant `index.md` files if needed.

9. **Link Suggestions**: Use `mcp__garden__garden_search` to find related notes and suggest connections.

10. **Frontmatter & Tag Validation** (always — not optional):
    - Verify required fields present for this content type
    - Re-check tags against vocabulary
    - Check for emdash (`—`) in title, description, body
    - Check wikilink syntax: pipe syntax used, index links use absolute paths
    - Report any violations — do not commit until resolved

11. **Browser Validation**: If build server running, test new content renders correctly (navigate to URL, verify title, check links).

### ISC
- ISC: Content classified into correct knowledge domain
- ISC: Frontmatter has all required fields
- ISC: File path follows kebab-case slug conventions
- ISC: Parent index updated when directory now has 2+ notes
- ISC: Tags use existing garden tags before creating new ones
- ISC-A: No emdash in title, description, or body
- ISC-A: No relative paths used in wikilinks to index files
- ISC-A: First tag is the domain index tag for the content path

---

## Improve Workflow

Invoked when the user says "improve X", "enhance Y", "audit links in Z", or "fix frontmatter of N".

### Arguments
| Argument | Purpose |
|----------|---------|
| `--focus area` | Improvement area: `structure`, `clarity`, `completeness`, `links`, `engagement`, `frontmatter`, `all` |
| `--quick` | Frontmatter-only fast path — skip content analysis, MCP context, and browser validation |
| `--dry-run` | Preview improvements without applying changes |

### Quick Mode (`--quick`)
When `--quick`, only:
1. Read frontmatter of flagged notes
2. Fix only: missing `description`, missing `date`, missing `tags`, add/update `updated`, add `aliases` for index files
3. Do NOT rewrite content, restructure sections, or change wikilinks

### Full Execution
1. **MCP Preflight**: `garden_status` + `garden_context` on target note
2. **Load Quality Rubric**: Read `ContentQualityRubric.md` for scoring standards
3. **Content Analysis**: Read target file. Assess against rubric for chosen focus area.
4. **Improvement Plan**: Draft changes with aggressiveness level (conservative/moderate/ambitious)
5. **Apply Changes**: Write improvements back
6. **Link Audit** (if `--focus links`): Use `garden_backlinks` + `garden_search` to find and fix link gaps
7. **Browser Validation** (if build server running): Test page loads and links resolve
8. **Memory Update**: Append new patterns to `dg-patterns.md`

### ISC
- ISC: Content improved without losing original voice or intent
- ISC: All changed links verified against actual existing files
- ISC: `updated` date set when content modified
- ISC-A: No emdash introduced during improvement
- ISC-A: Quick mode never rewrites prose

---

## Organize Workflow

Invoked when the user says "move X to domain Y", "restructure Z", "merge A and B".

### Operations
| Operation | Purpose |
|-----------|---------|
| `move` | Move content between domains |
| `restructure` | Split a broad topic into subtopics |
| `merge` | Combine scattered related content |
| `cleanup` | Remove orphans, standardize naming |

### Execution
1. **Structure Analysis**: Analyze current content structure and identify target
2. **Link Discovery**: Use `mcp__garden__garden_backlinks` on each file being moved to get all incoming links
3. **Content Migration**: Move files with proper path handling (git mv)
4. **Link Updates**: Update all internal references to moved content by scanning for `[[old-filename]]` across content tree
5. **Index Generation**: Create/update `index.md` files for affected folders
6. **Validation**: Verify all links resolve; test Quartz build

### Critical Rules
- Index files always use absolute paths: `[[knowledge/domain/index|Name]]`
- Maintain kebab-case for all files and folders
- After moves, update parent index and all cross-references

### ISC
- ISC: All wikilinks updated across garden after file moves
- ISC: Moved content appears in correct domain index page
- ISC: No broken wikilinks remain after reorganization
- ISC-A: Index links still use absolute paths after all moves

---

## Explore Workflow

Invoked when the user says "explore the garden", "show stats", "find orphans", "check for gaps", "analyze tags".

### Operations
| Operation | What it shows | How |
|-----------|---------------|-----|
| `overview` | Domain health dashboard | `garden_files` + `garden_status` |
| `orphans` | Notes with zero incoming links | `garden_orphans` |
| `unresolved` | Broken wikilinks by frequency | `garden_unresolved_links` |
| `search [query]` | Notes by title, tag, keyword | `garden_search` (FTS5) |
| `validate` | Per-note frontmatter + link health | `garden_validate` |
| `graph` | Knowledge graph metrics, hubs, bridges | `garden_explore` |
| `gaps` | Stubs, missing indexes, unreferenced topics | `garden_status` + `garden_search` |
| `stats` | Full garden statistics | `garden_status` + `garden_tag_list` |

### Execution
1. **MCP Preflight**: `garden_status` for index freshness
2. **Scope**: `garden_files` for domain tree overview
3. **Execute Operation**: Use the MCP tool listed above for the chosen operation
4. **Format Results**: Present findings organized by domain
5. **Suggest Next Actions**: Based on findings, suggest follow-up (improve links, create stubs, build indexes)

### ISC
- ISC: Exploration results reflect current state of content directory
- ISC: Orphan and gap reports include specific file paths and titles
- ISC-A: No content files modified during explore operation

---

## Publish Workflow

Invoked when the user says "publish X", "move draft Y to live", "unpublish Z".

### Operations
| Operation | Action |
|-----------|--------|
| `publish [file]` | Move draft → published: remove `draft: true`, move from `unpublished/` to domain, set `date`, update index |
| `unpublish [file]` | Return published → draft: set `draft: true`, optionally move to `unpublished/` |
| `status` | List all unpublished/draft content |

### Execution
1. **State Detection**: Read target file — in `unpublished/`? Has `draft: true`? Already published?
2. **Date Resolution**: Use existing `date` or set to today if absent
3. **Path Resolution** (for `publish` from `unpublished/`): Classify content using domain taxonomy; ask user if ambiguous
4. **Content Operation**: Toggle `draft`, move file if needed
5. **Index Update**: Update parent `index.md` to include/remove the content
6. **Link Updates**: If file moved, update all incoming wikilinks
7. **Validation**: Verify frontmatter completeness post-operation

### Content States
- `content/unpublished/note.md` — excluded from build by path
- Any file with `draft: true` — excluded by RemoveDrafts plugin
- Any file without `draft: true` — published

### ISC
- ISC: Published content has no `draft: true` and valid ISO `date` field
- ISC: File placed in correct domain directory
- ISC: Parent index updated to include newly published content
- ISC-A: Draft content not accessible in Quartz build output after publish

---

## Health Loop Workflow

Invoked when the user says "run garden health", "improve garden quality", "health check".

Iterative audit → fix → reaudit cycles until resolved links reach a target or rounds run out.

### Loop Structure
1. **AUDIT**: `garden_status` + `garden_unresolved_links` + `garden_orphans`
2. **CLASSIFY**: Categorize into fix types (alias, path, stub, tag)
3. **FIX**: Apply highest-ROI fixes for this round
4. **VERIFY**: `garden_status` — confirm improvement
5. **DECIDE**: Continue if target not reached and rounds remain

### Round Priorities
- **Round 1** — Structural: add aliases, fix broken paths, add missing domain indexes, fix cross-domain index links
- **Round 2** — Content: create stubs for concepts referenced 3+ times, bridge orphans to domain index, add cross-domain links to isolated indexes
- **Round 3** — Deep cleanup: consolidation, near-duplicate tags, fix frontmatter issues

### Anti-patterns
- Do NOT create stubs for 1x references
- Do NOT change content of existing notes unless improving frontmatter
- Do NOT commit — always stage for review
- Do NOT run more than 5 rounds

---

## Examples
```
User: "Write a knowledge note about permaculture"
→ Loads DgNotes skill
→ Classifies in land-and-nature-stewardship/ domain via DomainTaxonomy.md
→ Creates note with correct frontmatter (title, tags, date)
→ Adds index link using full absolute path: [[knowledge/land-and-nature-stewardship/index|...]]
→ Updates parent index.md to include the new note
```

**Example 2: Fix wikilinks in a note**
```
User: "Check if all index links in yoga-des-pharaons.md are correct"
→ Loads DgNotes skill
→ Reads Wikilink Rules: index files require full absolute paths from knowledge/
→ Finds any [[health-and-wellbeing/index]] → corrects to [[knowledge/health-and-wellbeing/index]]
→ Verifies all links follow [[knowledge/domain/.../index|Name]] pattern
```

**Example 3: Classify note in the right domain**
```
User: "Where should a note about shadow work go?"
→ Loads DgNotes skill
→ Applies Classification Heuristics: primary function = mental/emotional health
→ Routes to health-and-wellbeing/ domain
→ Suggests tags from domain tag list
```
