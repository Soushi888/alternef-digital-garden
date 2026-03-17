---
name: DgBlog
description: Blog post authoring for Alternef Digital Garden. USE WHEN writing blog posts, editing posts, EN→FR translation, writing voice questions, moving drafts to published.
---

## Customization

**Before executing, check for user customizations at:**
`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/DgBlog/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

## 🚨 MANDATORY: Voice Notification (REQUIRED BEFORE ANY ACTION)

**You MUST send this notification BEFORE doing anything else when this skill is invoked.**

1. **Send voice notification**:
   ```bash
   curl -s -X POST http://localhost:8888/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Loading DgBlog skill for blog post authoring"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification**:
   ```
   Loading **DgBlog** skill for blog post authoring...
   ```

**This is not optional. Execute this curl command immediately upon skill invocation.**

# Digital Garden Blog Authoring

Persistent knowledge layer for blog posts in the Alternef Digital Garden. Covers architecture, frontmatter patterns, content structure, writing voice, and EN→FR translation.

## Workflow Routing

| Trigger | Command |
|---------|---------|
| Create new blog post | `/dg:create` (content-type: blog) |
| Edit or improve post | `/dg:improve` |
| Translate post to French | `/dg:translate` (uses `TranslationWorkflow.md`) |
| Publish draft blog post | `/dg:publish` |
| Sync post to GitHub | `/dg:sync` |
| Validate blog structure | Add `--validate` flag to any command |

**Context files:** `BlogStyleGuide.md` · `TranslationWorkflow.md` · `BlogPostEnTemplate.md` · `BlogPostFrTemplate.md`

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

### Date management rules
- `date` is the **publication date** — set once when creating the post, never change it afterward.
- `updated` is the **last modified date** — add or update it every time you meaningfully change an existing post.
- When creating a new post: set `date` only. Do not include `updated`.
- When editing an existing post: add or update `updated: "YYYY-MM-DD"` (today's date).

### Author conventions
- **Primary author**: `"Soushi888"` (most posts)
- **Organization**: `"Alternef"` (some older posts)
- **AI collaboration**: `"Claude & Soushi888"` (when AI co-authored)

### Tag rules

Tag vocabulary and format standards live in **`DgTags`** (`TagVocabulary.md`). Load `DgTags` when working with tags. After drafting a post, run `SuggestTags` from `DgTags` to get tag suggestions.

**Blog-specific exception (stays here):** `blog` is always the **first** tag for every blog post. DgTags' `SuggestTags` workflow prepends it automatically for `content/blog/` paths.

## Post Structure

### No H1 title in body
**Rule:** Never start a post with `# Title`. The `title` frontmatter field is the canonical title — Quartz renders it as the page H1. Adding `# Title` in the body duplicates the heading.

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

## Images

### Required pattern (MANDATORY — no exceptions)

```html
<center>
    <img src="filename.jpeg" alt="Descriptive alt text" width="50%" />
</center>
```

### Rules
- **Always** use the HTML `<img>` tag inside `<center>` — never markdown `![alt](path)` syntax
- **Filename only** — no folder prefix. Quartz resolves images by shortest path match across the content tree. Images live in `content/blog/assets/` but are referenced by name alone
- **Always** `width="50%"`
- **Position**: after the `---` separator that follows the opening italic hook — never before the hook, never in the frontmatter

### Correct position in a post

```markdown
*Italicized opening hook.*

---

<center>
    <img src="image.jpeg" alt="Description" width="50%" />
</center>

First paragraph of body content...
```

### Image storage
Place image files in `content/blog/assets/`. They resolve correctly from any post location (blog, substack, etc.) via Quartz's shortest-path resolution.

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

See `BlogStyleGuide.md` for detailed voice guidance with more examples.

## Blog-to-Knowledge Connection

Blog posts should link to knowledge garden notes where relevant:
- Technical concepts: `[[rust|Rust]]`, `[[holochain|Holochain]]`
- Theoretical frameworks: `[[rea-accounting|REA Accounting]]`
- Governance models: `[[open-value-networks|Open Value Networks]]`

This creates bidirectional connections between blog analysis and reference knowledge.

### Wikilink rules

When linking to knowledge notes, follow these rules from `DgNotes`:

- **Regular notes**: `[[note-filename|Display Name]]` (shortest path, no folder prefix needed)
- **Index files**: ALWAYS use the full absolute path from `knowledge/`:
  - WRONG: `[[mystical-oriented-programming|...]]`
  - WRONG: `[[mystical-oriented-programming/index|...]]`
  - CORRECT: `[[knowledge/tools-and-technology/.../mystical-oriented-programming/index|...]]`
- Never use relative paths (`../`) — they break in Quartz

## French Translation

French translations live in `content/blog/fr/`. See `TranslationWorkflow.md` for the complete EN→FR workflow.

Key conventions:
- Add `language: "fr"` to frontmatter
- Translate title, description, and content tags
- Keep `"blog"` tag untranslated
- File naming: kebab-case in French (e.g., `souverainete-fractale-integration-multiechelle.md`)

## Examples

**Example 1: Write a new blog post**
```
User: "Write a blog post about my experience with Holochain"
→ Loads DgBlog skill, reads BlogStyleGuide.md for voice
→ Invokes /dg:create with content-type blog
→ Creates with required frontmatter: title, date, author "Soushi888", tags starting with "blog"
→ Opens with italicized hook, includes "honest tradeoff" pattern, links to knowledge notes
```

**Example 2: Translate a post to French**
```
User: "Translate the compiled stack post to French"
→ Loads DgBlog skill, reads TranslationWorkflow.md
→ Invokes /dg:translate
→ Creates file in content/blog/fr/ with language: "fr" frontmatter
→ Translates title, description, and body while keeping code blocks intact
```

**Example 3: Publish a draft post**
```
User: "Publish the shadow work draft"
→ Loads DgBlog skill
→ Invokes /dg:publish
→ Moves from content/unpublished/ to content/blog/
→ Removes draft: true from frontmatter, sets publication date
```
