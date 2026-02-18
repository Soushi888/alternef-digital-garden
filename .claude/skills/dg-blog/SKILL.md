---
name: dg-blog
description: Blog post authoring for the Alternef Digital Garden. Use when creating, editing, or translating blog posts. Triggers on blog writing, post structure questions, French translation, and writing voice guidance.
---

# Digital Garden Blog Authoring

## Overview

Persistent knowledge layer for writing blog posts in the Alternef Digital Garden. Covers blog architecture, frontmatter patterns, content structure, writing voice, and EN→FR translation workflow.

## When to Use

- Creating new blog posts (complements `/dg:create` with content-type `blog`)
- Editing existing blog posts
- Translating posts to French
- Questions about writing voice or style
- Moving drafts from `unpublished/` to `blog/`

## Blog Architecture

```
content/blog/
├── index.md                    # Blog landing page
├── the-compiled-stack.md       # Technical architecture posts
├── holochain-*.md              # Holochain ecosystem posts
├── rea-valueflows-*.md         # Economics/protocol posts
├── fractal-sovereignty-*.md    # Systems thinking posts
├── fr/                         # French translations
│   ├── index.md                # French blog landing
│   ├── souverainete-fractale-*.md
│   └── symphonie_des_consciences.md
└── ...
content/unpublished/            # Drafts not yet published
├── index.md
└── *.md                        # Work-in-progress posts
```

## Frontmatter Pattern

### Required fields
```yaml
---
title: "Post Title: Subtitle with Context"
date: "YYYY-MM-DD"
author: "Soushi888"
description: "Compelling 1-2 sentence summary for SEO and social sharing (~100-200 chars)"
tags:
  - "blog"              # ALWAYS include "blog" as first tag
  - "primary-topic"
  - "secondary-topic"
  - "technology-or-domain"
---
```

### Optional fields
```yaml
subtitle: "Extended title or hook"
updated: "YYYY-MM-DD"             # Last modification date
draft: true                    # Exclude from build
type: "article"                # Or "meditation", "report"
categories:                    # Topic grouping
  - "Category Name"
aliases:                       # Alternative names
  - "Short Name"
heroImage: "/blog-placeholder-3.jpg"
language: "fr"                 # For French posts
audience: "technical"          # Or "spiritual-seekers", "general"
```

### Author conventions
- **Primary author**: `"Soushi888"` (most posts)
- **Organization**: `"Alternef"` (some older posts)
- **AI collaboration**: `"Claude & Soushi888"` (when AI co-authored)

### Tag rules
- First tag is ALWAYS `"blog"`
- Lowercase, kebab-case
- Technical tags: `rust`, `tauri`, `svelte`, `holochain`, `webassembly`, `typescript`, `effect`
- Conceptual: `functional-programming`, `peer-to-peer`, `local-first`, `software-architecture`
- Domain: `economic-design`, `decentralization`, `commons-based-peer-production`

## Post Structure

### Opening pattern
```markdown
*Italicized hook restating the core thesis in 1-2 compelling sentences*

---

[Opening paragraphs that set context and frame the problem]
```

### Body organization
- **4-6 major sections** (H2 `##`)
- Each section covers one major concept or technology
- H3 subsections for detailed aspects
- Code examples where relevant (with language specifier)
- Wikilinks to knowledge garden: `[[note-name|Display Text]]`

### "Honest Tradeoff" pattern
This is a signature style element. After presenting benefits of a technology or approach, include:

```markdown
**The honest tradeoff:** [Genuine limitations, costs, or challenges with this approach.
Not marketing — real constraints that practitioners should understand.]
```

This pattern appears in technical posts and demonstrates intellectual honesty. It:
- Acknowledges real costs alongside benefits
- Builds reader trust
- Shows deep understanding of tradeoffs
- Prevents the post from reading like advocacy

### Closing pattern
Posts typically end with:
- A synthesis section connecting all threads
- Forward-looking perspective
- Sometimes a call to explore related topics

## Writing Voice

### Characteristics
- **Analytical but accessible**: Deep technical detail explained clearly
- **Honest**: Acknowledges limitations alongside strengths
- **Concrete-first**: Starts with specific examples, generalizes after
- **Precise vocabulary**: Uses correct technical terms, defines when needed
- **No marketing language**: Never "blazingly fast", "revolutionary", "game-changing"
- **Measured confidence**: States what is known vs. what is speculative

### Tone markers
- Direct declarative sentences
- "This is..." / "What this means is..." / "The result is..."
- Questions used sparingly to frame sections: "So the question becomes: ..."
- Italics for emphasis and hooks, not bold (bold for technical terms)

### Examples from existing posts

**Good opening** (from The Compiled Stack):
> Every layer ships only what it uses. Every tool compiles down to its essence. Nothing carries unnecessary runtime weight.

**Good tradeoff** (from The Compiled Stack):
> **The honest tradeoff:** Rust's learning curve is real and famously steep. The borrow checker, lifetime annotations, and trait system demand a significant upfront investment...

**Good framing**:
> This is not a sharing economy. It is a micro-service economy with better marketing.

See `references/blog-style-guide.md` for detailed voice guidance with more examples.

## Blog-to-Knowledge Connection

Blog posts should link to knowledge garden notes where relevant:
- Technical concepts: `[[rust|Rust]]`, `[[holochain|Holochain]]`
- Theoretical frameworks: `[[rea-accounting|REA Accounting]]`
- Governance models: `[[open-value-networks|Open Value Networks]]`

This creates bidirectional connections between blog analysis and reference knowledge.

## French Translation

French translations live in `content/blog/fr/`. See `references/translation-workflow.md` for the complete EN→FR workflow.

Key conventions:
- Add `language: "fr"` to frontmatter
- Translate title, description, and content tags
- Keep `"blog"` tag untranslated
- File naming: kebab-case in French (e.g., `souverainete-fractale-integration-multiechelle.md`)
