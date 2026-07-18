# Holotropic Breathwork Knowledge Note — Implementation Plan

> **For Hermes:** Use DgNotes create workflow to implement this plan. Load DgNotes + DgTags skills before executing.

**Goal:** Create a comprehensive English knowledge note about Holotropic Breathwork, placed correctly in the Health & Wellbeing domain with proper frontmatter, tags from the vocabulary, and cross-linked to related notes.

**Architecture:** Single knowledge note at `content/knowledge/health-and-wellbeing/holotropic-breathwork.md`, with index update and validated wikilinks. No new subdirectories needed — health-and-wellbeing is flat.

**Tech Stack:** Markdown with YAML frontmatter, Obsidian wikilinks, Quartz static site generator.

---

## Pre-flight Context

### Domain
- Health and Wellbeing (`content/knowledge/health-and-wellbeing/`)
- Flat directory structure (no subdirectories)
- Domain index tag: `health`

### Existing related notes in garden (for cross-linking)
- `consciousness` — altered states, contemplation
- `holistic-healing` — integrative healing context
- `shadow-work` — psychological integration parallel
- `qi-gong` — breath/energy practices
- `knowledge/health-and-wellbeing/yoga/index` — pranayama breathing traditions
- `mental-health` — therapeutic benefits
- `self-awareness` — self-exploration dimension

### Source material (provided by user)
Comprehensive French brief covering:
- Origins: Stanislav and Christina Grof, 1970s, non-pharmacological alternative to psychedelic therapy
- Etymology: holos (whole) + trepein (moving toward) → "movement toward wholeness"
- Three pillars: accelerated circular breathing, evocative music, certified facilitation (set and setting)
- Session structure: 2-3 hours, breather/sitter dyad, preparation → journey → integration
- Respiratory mechanics: 30-60 cycles/min, mouth breathing, no pause between inhale/exhale, induces hypocapnia and non-ordinary states
- Music as "co-therapist": 4-phase playlist (activation → intensification → plateau → resolution)
- Integration: mandala drawing, group sharing, no analysis/judgment
- Scientific evidence: mostly clinical reports (thousands of patients), lacks large-scale RCTs
- Contraindications: cardiovascular issues, epilepsy, severe mental disorders (schizophrenia), pregnancy
- Risks: tetany, panic attacks, psychological distress if unguided

---

## Task 1: Verify Garden Index Freshness

**Objective:** Confirm the garden MCP index is up to date before any operations.

**Step 1: Check index status**
Call `mcp__garden__garden_status`. Confirm `last_indexed` is recent (within the last hour).

**Step 2: If stale, reindex**
If stale, run the garden index rebuild command, then re-verify.

---

## Task 2: Load DgTags and Select Tags

**Objective:** Choose 4-6 validated tags from the TagVocabulary.

**Step 1: Identify the domain index tag**
Domain is health-and-wellbeing → domain index tag is `health`. This must be first.

**Step 2: Select topic tags from vocabulary**
From the Health & Wellbeing tag table (`TagVocabulary.md` lines 236-261):

| Tag | Relevance |
|-----|-----------|
| `breathwork` | Core practice — "Pranayama, Wim Hof, somatic breathing, breath as practice" |
| `holistic-healing` | Therapeutic context — Grof's integrative approach |
| `somatic` | Body-centered practice — nervous system, embodied experience |
| `mind-body-connection` | Psychosomatic integration through breath |
| `mental-health` | Therapeutic applications for anxiety, depression, trauma |

**Step 3: Verify no aliases used**
Check the aliases table — none of these tags have alias conflicts.

**Step 4: Final tag array**
```yaml
tags:
  - health
  - breathwork
  - holistic-healing
  - somatic
  - mind-body-connection
  - mental-health
```

(6 tags — within the 3-7 range, domain tag first, specific-to-general order.)

---

## Task 3: Create the Note File

**Objective:** Write `content/knowledge/health-and-wellbeing/holotropic-breathwork.md` with proper frontmatter and structured body content.

**File path:** `content/knowledge/health-and-wellbeing/holotropic-breathwork.md`

**Frontmatter (note: date is 2026-07-18, no `updated` field on creation):**
```yaml
---
title: "Holotropic Breathwork"
description: "A therapeutic and spiritual practice using accelerated circular breathing and evocative music to access non-ordinary states of consciousness for self-exploration and emotional healing"
aliases:
  - "Holotropic Breathing"
tags:
  - health
  - breathwork
  - holistic-healing
  - somatic
  - mind-body-connection
  - mental-health
date: 2026-07-18
draft: false
---
```

**Body structure:**
```
1-2 paragraph overview (what it is, who created it, etymology)

## Origins and Development
- Stanislav and Christina Grof
- 1970s, post-LSD prohibition context
- Non-pharmacological alternative to psychedelic therapy
- Transpersonal psychology framework

## The Three Pillars

### Accelerated Circular Breathing
- 30-60 cycles/minute, through the mouth
- No pause between inhale and exhale
- Induces hypocapnia → altered consciousness
- Accesses deep psychological material

### Evocative Music as Co-Therapist
- Four-phase playlist arc:
  - Activation (tribal, percussive)
  - Intensification (dramatic, orchestral)
  - Plateau (spatial, open)
  - Resolution (meditative, gentle)

### Set, Setting, and Facilitation
- Certified facilitators
- Breather/sitter dyad structure
- Sitter ensures physical safety without interfering
- Group container for trust and release

## Session Structure (2-3 hours)
- Preparation and dyad pairing
- The breathing journey
- Integration: mandala drawing, group sharing, no analysis or judgment

## Therapeutic Applications
- Trauma processing
- Anxiety and depression
- Emotional catharsis
- Spiritual exploration and self-realization

## Risks and Contraindications
- Cardiovascular conditions
- Epilepsy
- Severe mental disorders (schizophrenia, bipolar with psychosis)
- Pregnancy
- Possible effects: tetany, panic, psychological distress if unguided
- Not a replacement for conventional therapy — complementary

## Scientific Evidence
- Extensive clinical reports (thousands of patients, 1990s-2000s)
- Positive subjective outcomes (stress reduction, trauma resolution)
- Lacks large-scale randomized controlled trials
- Evidence remains largely anecdotal — need for rigorous research

## Related Topics
- [[consciousness|Consciousness]] — Altered and non-ordinary states
- [[holistic-healing|Holistic Healing]] — Integrative therapeutic context
- [[shadow-work|Shadow Work]] — Psychological integration of repressed material
- [[qi-gong|Qi Gong]] — Breath and energy cultivation practices
- [[mental-health|Mental Health]] — Therapeutic benefits and applications
- [[self-awareness|Self-Awareness]] — Self-exploration and insight
- [[knowledge/health-and-wellbeing/yoga/index|Yoga Traditions]] — Pranayama and related breath practices

## References
- Grof, S. (2000). *Psychology of the Future: Lessons from Modern Consciousness Research* — SUNY Press
- Grof, S. & Grof, C. (2010). *Holotropic Breathwork: A New Approach to Self-Exploration and Therapy* — SUNY Press
- [Grof Transpersonal Training](https://www.holotropic.com) — Official certification body
```

**Content rules to follow:**
- NO `# Title` heading in body (Quartz renders frontmatter title as H1)
- NO emdash (`—`) anywhere — use colons, commas, or restructure instead
- ALL wikilinks use pipe syntax `[[target|Display Name]]`
- Index link (`yoga/index`) uses FULL absolute path: `[[knowledge/health-and-wellbeing/yoga/index|Yoga Traditions]]`

---

## Task 4: Verify the Written File

**Objective:** Confirm the file was written correctly.

**Step 1: Read back immediately**
Use `read_file` on the new file to verify frontmatter and body.

**Step 2: After 2+ seconds, verify with MCP**
Call `mcp__garden__garden_context` on `knowledge/health-and-wellbeing/holotropic-breathwork` to confirm:
- Title resolves
- Description renders
- Domain classification is correct
- Outlinks are detected

---

## Task 5: Validate Frontmatter and Links

**Objective:** Run validation on the new note.

**Step 1: MCP validate**
Call `mcp__garden__garden_validate` with `note: "knowledge/health-and-wellbeing/holotropic-breathwork"`.

**Step 2: Check for issues**
Verify:
- No frontmatter warnings (title, tags, date all present)
- No unresolved links (all wikilinks resolve to existing notes)
- No emdash anywhere

**Step 3: Fix any issues**
If validation flags problems, apply targeted fixes with `patch`.

---

## Task 6: Update Domain Index

**Objective:** Add the new note to the health-and-wellbeing index page.

**Step 1: Read current index**
Re-read `content/knowledge/health-and-wellbeing/index.md`.

**Step 2: Add entry under "Holistic Healing Approaches" (section 3)**
Add after the mind-body healing line:
```markdown
- [[holotropic-breathwork|Holotropic Breathwork]] — Therapeutic breathing practice using accelerated circular breathing and evocative music for accessing non-ordinary states of consciousness
```

**Step 3: Add `updated` date to index**
Update the `updated` field in the index frontmatter to `2026-07-18`.

---

## Task 7: Build Verification

**Objective:** Confirm the note builds correctly in Quartz.

**Step 1: Check if dev server is running**
Try navigating to `http://localhost:8080/knowledge/health-and-wellbeing/holotropic-breathwork` if build server is active.

**Step 2: Run a build check**
`bun quartz build` — verify no build errors related to the new note.

**Step 3: Check for unresolved links**
Call `mcp__garden__garden_unresolved_links` and confirm none of the new note's links appear.

---

## Task 8: Connect Orphan Check

**Objective:** Ensure the new note is discoverable (not orphaned).

**Step 1: Verify backlinks**
Call `mcp__garden__garden_backlinks` on the new note. At minimum, the domain index should be listed.

**Step 2: If no backlinks besides index**
Consider adding a link from one or two related notes (e.g., from `consciousness` or `holistic-healing`).

---

## Risks and Tradeoffs

| Risk | Mitigation |
|------|-----------|
| Tag `consciousness` not available in health vocabulary | Use `somatic` and `mind-body-connection` instead; cross-link to consciousness note via wikilinks |
| Yoga index link breaks | Use full absolute path: `knowledge/health-and-wellbeing/yoga/index` |
| Note feels isolated (flat domain, no subdirectory) | Strong Related Topics section compensates; index update ensures discoverability |
| User may want French translation later | Out of scope for this plan; can be handled via `/dg:translate` workflow |

## Execution Notes

- Worktree: Ask user "Want a worktree?" before making any changes (per user profile preference)
- All edits via `write_file` and `patch`, no shell-based file editing
- MCP tools used for all read/query operations (garden_search, garden_context, etc.)
- DgNotes skill loaded and followed throughout — do not skip any create workflow steps
