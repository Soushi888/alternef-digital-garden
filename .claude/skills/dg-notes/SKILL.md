---
name: dg-notes
description: Knowledge note management for the Alternef Digital Garden. Use when creating, classifying, or organizing knowledge notes in any of the 7 domains. Triggers on note creation, domain classification, frontmatter questions, index management, and wikilink patterns.
---

# Digital Garden Knowledge Notes

## Overview

Persistent knowledge layer for managing notes in the Alternef Digital Garden's 7-domain taxonomy. Provides classification heuristics, frontmatter conventions, content structure patterns, and linking rules that inform better decisions during note creation and organization.

## When to Use

- Creating new knowledge notes (complements `/dg:create`)
- Classifying content into the correct domain
- Writing or fixing frontmatter
- Managing index pages
- Building wikilinks between notes
- Reviewing note quality

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

See `references/domain-taxonomy.md` for the complete taxonomy with all subdirectories and tag lists.

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
created: YYYY-MM-DD
modified: YYYY-MM-DD
draft: false
---
```

### Required fields
- `title`: Descriptive, title case
- `tags`: Array, lowercase kebab-case. Include at least one domain-level tag
- `created`: ISO date (YYYY-MM-DD)
- `modified`: ISO date, updated on each edit

### Optional fields
- `description`: One-sentence summary (used in search results and meta)
- `aliases`: Alternative names for wikilink resolution
- `draft`: Set `true` to exclude from build

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

See `references/content-quality-rubric.md` for the scoring system used to evaluate note quality across structure, clarity, completeness, and connections.
