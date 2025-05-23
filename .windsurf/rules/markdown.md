---
description: When you work on markdown notes in content/
globs: 
alwaysApply: false
---
# Markdown Content Rules

## Related rules

Read the [snippets.mdc](mdc:.cursor/rules/snippets.mdc) rules to get a template for notes.

## Frontmatter Structure

Always ensure markdown files have proper frontmatter with these requirements:

```yaml
---
title: Clear, descriptive title
description: Concise summary of the note's content
subtitle: Optional additional context
aliases: 
  - alternative names or references
tags: 
  - single-level, root-level tags
related pages:
  - "[[Related Page]]"
---
```

## Filename Conventions

- Use lowercase with hyphens for filenames (e.g., `digital-garden.md`)
- Avoid spaces, underscores, or camelCase
- Keep filenames concise but descriptive
- Example: `permaculture-principles.md` not `PermaculturePrinciples.md` or `permaculture_principles.md`

## Content Structure

- Do not use first-level headers (#) in content as the title is already in frontmatter
- Start with a brief introduction (no header needed)
- Use second-level headers (##) for main sections
- Use third-level headers (###) for subsections
- Use fourth-level headers (####) sparingly for deep nesting

## Linking

- Use wiki-style links: `[[page-name|Display Text]]`
- For index pages, use full paths from knowledge folder: `[[knowledge/domain/index|Domain Name]]`
- Link liberally to related concepts
- Ensure all links use proper display text for context

## Tagging

- Use kebab-case for all tags (e.g., `digital-garden`, `permaculture-design`)
- Keep tags atomic and single-level
- Avoid hierarchical tags like `programming/web`
- Use consistent tags across related content

## Content Style

- Write in a clear, philosophical tone
- Use bullet points for lists of concepts or ideas
- Use numbered lists for sequential steps or processes
- Include relevant quotes with proper attribution
- Break complex topics into digestible sections
- Emphasize interconnectedness between concepts
- Use code blocks with language specification for code examples

## Images and Media

- Store images in the `assets` directory
- Use relative paths for images: `![Alt text](mdc:../assets/image-name.jpg)`
- Include descriptive alt text for all images
- Optimize images for web before adding to the repository

## Special Sections

Consider including these sections in longer notes:

- "Related Concepts" - linking to other relevant notes
- "Further Reading" - external resources and references
- "Practical Applications" - how to apply theoretical concepts
- "Questions to Explore" - open questions for further investigation
