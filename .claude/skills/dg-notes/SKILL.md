---
name: dg-notes
description: Knowledge note management for Alternef Digital Garden. USE WHEN note creation, domain classification, frontmatter, wikilinks, index management, note quality review.
---

# Digital Garden Knowledge Notes

Persistent knowledge layer for the Alternef Digital Garden's 7-domain taxonomy. Provides classification heuristics, frontmatter conventions, content structure patterns, and linking rules.

## Workflow Routing

| Trigger | Command |
|---------|---------|
| Create new knowledge note | `/dg:create` |
| Organize or restructure notes | `/dg:organize` |
| Improve note quality | `/dg:improve` |
| Add or audit links between notes | `/dg:improve --focus links` |
| Explore domain stats and gaps | `/dg:explore` |
| Publish draft to correct domain | `/dg:publish` |
| Validate frontmatter and links | Add `--validate` flag to any command |

**Context files:** `DomainTaxonomy.md` · `ContentQualityRubric.md` · `KnowledgeNoteTemplate.md` · `DomainIndexTemplate.md` · `CategoryIndexTemplate.md`

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
- Always lowercase, kebab-case
- First tag should be a domain-level tag (e.g., `programming`, `governance`, `ecology`)
- Use existing tags from the garden before creating new ones
- Common cross-domain tags: `holochain`, `decentralization`, `open-source`, `peer-to-peer`

## Content Structure

### Standard note body
```markdown
# Note Title

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
3. **Index files require absolute paths**: `[[knowledge/domain/subdirectory/index|Subdirectory Name]]`
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

Run directly for quick batch checks:
```bash
bash .claude/skills/dg-notes/Tools/ValidateNotes.sh content/knowledge/tools-and-technology/
```

Checks: frontmatter completeness (title, tags, date), kebab-case filenames, no emdash characters.
