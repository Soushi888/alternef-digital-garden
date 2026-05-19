---
task: Grow Alternef Digital Garden as a living knowledge commons
project: AlterNef Digital Garden
effort: advanced
effort_source: gate-floor
phase: active
progress: 0/10
mode: interactive
started: 2026-05-10T00:00:00Z
updated: 2026-05-10T00:00:00Z
---

## Problem

Knowledge gained through work and study disperses across sessions, projects, and tools without a persistent, interconnected home. Isolated notes don't surface connections; search finds keywords but not conceptual bridges. A digital garden needs to actively cultivate bridges between domains (technology, governance, ecology, economics) to make emergent insights visible.

## Vision

Alternef.garden is a living public knowledge commons where every note is a node in a semantic graph — a reader can enter on any concept and follow threads across governance, technology, land, culture, and economics without hitting dead ends. Lonely tags are rare, bridge notes connect domains, and the garden grows visibly with every session's insights.

## Out of Scope

Social media integration or real-time collaboration features. E-commerce or monetization of content. Non-Markdown content formats. A custom CMS — Quartz + GitHub Pages is the permanent stack.

## Principles

Evergreen notes over time-stamped posts: notes should improve with each revision, not accumulate chronologically. Bridges over silos: every new note should link to at least two existing notes. Public by default: anything added to the garden is readable by anyone.

## Constraints

- Quartz framework (React/TypeScript, SCSS, GitHub Pages deployment)
- Content in Markdown, organized under content/ directory structure
- Deployment via GitHub Pages at alternef.garden
- Bun for all JS/TS tooling

## Goal

Maintain Alternef Digital Garden as a growing, interconnected public knowledge base at alternef.garden — minimizing lonely tags, maximizing cross-domain bridges, and ensuring every new session deposits durable, linked knowledge.

## Criteria

- [ ] ISC-1: Site builds without errors (quartz build)
- [ ] ISC-2: Site deploys and loads correctly at alternef.garden
- [ ] ISC-3: No note has zero outgoing links (every note links to ≥1 other note)
- [ ] ISC-4: No tag has only 1 note (lonely tags eliminated or bridged)
- [ ] ISC-5: Each knowledge domain directory has ≥1 bridge note connecting to another domain
- [ ] ISC-6: New notes from work sessions are captured within 48h of the session
- [ ] ISC-7: Quartz components render correctly (no console errors on page load)
- [ ] ISC-8: Search finds notes by concept (not just exact keyword match)
- [ ] ISC-9: Anti: No broken internal links (all [[wikilinks]] resolve)
- [ ] ISC-10: Anti: No notes longer than 2000 words (split into linked sub-notes if exceeded)

## Test Strategy

| isc | type | check | threshold | tool |
|-----|------|-------|-----------|------|
| ISC-1 | build | bun run quartz build | exit 0 | Bash |
| ISC-2 | HTTP | curl -I alternef.garden | 200 OK | Bash |
| ISC-3 | content | grep -L "\[\[" content/**/*.md | 0 files | Bash |
| ISC-4 | content | tag index: count notes per tag | 0 tags with count=1 | Bash |
| ISC-5 | content | cross-domain link check per domain dir | ≥1 bridge per domain | Read |
| ISC-6 | process | git log --since="48h ago" content/ | ≥1 commit after session | Bash |
| ISC-7 | browser | load any page → console.error count | 0 | Browser |
| ISC-8 | UI | search "[[concept]]" without quotes | ≥1 relevant result | Browser |
| ISC-9 | build | quartz build warnings: broken links | 0 | Bash |
| ISC-10 | content | wc -w content/**/*.md | max 2000 per file | Bash |

## Features

| name | description | satisfies | depends_on | parallelizable |
|------|-------------|-----------|------------|----------------|
| Content quality | No lonely tags, every note linked, no broken wikilinks | ISC-3,4,9,10 | none | false |
| Build pipeline | Quartz builds and deploys without errors | ISC-1,2,7 | none | false |
| Bridge notes | Cross-domain connection notes for each knowledge domain | ISC-5 | ISC-3 | true |
| Session capture | Work-session insights deposited within 48h | ISC-6 | none | false |
