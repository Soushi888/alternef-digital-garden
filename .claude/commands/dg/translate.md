---
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash, TodoWrite]
description: "Translate blog posts from English to French following garden conventions"
---

# /dg:translate - EN→FR Translation Workflow

## Complementary Skills
Load this skill — it is required for translation:
- **dg-blog** — TranslationWorkflow.md, writing voice, frontmatter conventions, EN→FR rules

## Purpose
Translate English blog posts to French, following the Alternef Digital Garden's bilingual conventions: proper `content/blog/fr/` placement, frontmatter translation, French writing voice, and cross-linking between source and translation.

## Usage
```
/dg:translate [source-file] [--review] [--dry-run]
```

## Arguments
- `source-file` - Path to the English source blog post (e.g., `content/blog/the-compiled-stack.md`)
- `--review` - After translation, run validation checks (frontmatter, emdash, voice consistency)
- `--dry-run` - Show what would be translated and the target path, without creating the file

## Execution
1. **Context Gathering**: Read PAI memory for relevant patterns.
   - Grep ~/.claude/projects/-home-soushi888-Projets-alternef-digital-garden/memory/ for relevant past patterns
   - Read memory/dg-patterns.md if it exists (garden-specific learnings)
2. **Load Translation Rules**: Read `dg-blog`'s `TranslationWorkflow.md` context file for complete EN→FR conventions
3. **Read Source**: Read the English blog post in full
4. **Target Path Derivation**: Determine French filename using kebab-case French title
   - Target directory: `content/blog/fr/`
   - Example: `the-compiled-stack.md` → `content/blog/fr/la-pile-compilee.md`
5. **Frontmatter Translation**:
   - Translate `title` and `description` to French
   - Add `language: "fr"`
   - Keep `"blog"` tag as-is; translate other tags to French equivalents
   - Add `source: "[original-filename]"` field pointing to English source
6. **Content Translation**: Translate body text using Soushi888 voice conventions
   - Analytical but accessible: maintain technical precision in French
   - No emdashes (critical rule — see CLAUDE.md)
   - Preserve wikilinks with French display text where appropriate
   - Keep code blocks untranslated
   - Preserve markdown structure, callouts, blockquotes
7. **Cross-Reference Update**: Add `fr_translation: "fr/[french-filename]"` to source English frontmatter
8. **Review** (if `--review`): Validate frontmatter completeness, check for emdashes, verify voice consistency
9. **Memory Update**: Append key patterns to PAI memory.
   - If new patterns discovered, append to ~/.claude/projects/-home-soushi888-Projets-alternef-digital-garden/memory/dg-patterns.md

## Translation Conventions

### Frontmatter
```yaml
# Source (EN)
---
title: "The Compiled Stack: Building with Rust, Tauri, and SvelteKit"
language: "fr"  # Add this
fr_translation: "fr/la-pile-compilee"  # Add this
---

# Translation (FR)
---
title: "La Pile Compilée: Construire avec Rust, Tauri et SvelteKit"
date: "YYYY-MM-DD"
author: "Soushi888"
description: "Description traduite en français"
tags:
  - "blog"          # Keep "blog" untranslated
  - "rust"          # Technical tags: keep as-is
  - "architecture-logicielle"  # Conceptual tags: translate
language: "fr"
source: "the-compiled-stack"
---
```

### Voice in French
- Maintain the same analytical, honest, concrete-first style
- Use French technical vocabulary where it exists; keep English terms where they are standard (e.g., "blockchain", "frontend")
- Bold for technical terms, italics for emphasis — same as English
- No emdashes — use colons, commas, or parentheses instead

### Wikilink Translation
```markdown
# English
The [[rust|Rust]] programming language...

# French — keep technical targets, translate display text
Le langage de programmation [[rust|Rust]]...
```

## Claude Code Integration
- **dg-blog Skill Required**: Always loads TranslationWorkflow.md for complete rules
- **PAI Memory**: Reads dg-patterns.md for past translation decisions
- **Cross-Linking**: Maintains bidirectional reference between source and translation
- **Voice Preservation**: Applies Soushi888 analytical voice consistently in French

## PAI ISC Template
When this command runs, OBSERVE generates these ISC:
- ISC: Translated file placed in `content/blog/fr/` with correct kebab-case French name
- ISC: All required frontmatter fields present including `language: "fr"` and `source:`
- ISC: Source English file updated with `fr_translation:` field
- ISC: Writing voice matches analytical, honest, concrete-first Soushi888 style
- ISC-A: No emdash characters in any translated content
- ISC-A: Source English file content not modified beyond adding `fr_translation:` field
- ISC-A: Code blocks remain in original language (untranslated)
