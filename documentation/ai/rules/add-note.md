---
description: Workflow for creating a new note in the Alternef Digital Garden
---

# Add a New Note Workflow

This workflow guides you through the process of creating a new note in the Alternef Digital Garden.

## 1. Determine Note Type and Location

- Decide which type of note you're creating:
  - **Knowledge Note**: A focused concept or idea within one of the 7 domains
  - **Blog Post**: A date-based, more narrative content piece
  - **Portfolio Item**: A project showcase or case study
  - **Domain Index**: An overview page for a knowledge domain

- Based on the note type, determine the appropriate location:
  - Knowledge notes go in: `content/knowledge/[domain]/[filename].md`
  - Blog posts go in: `content/blog/[filename].md`
  - Portfolio items go in: `content/portfolio/[filename].md`
  - Domain indexes go in: `content/knowledge/[domain]/index.md`

### Knowledge Domain Structure

To view the current knowledge domain structure and find the appropriate location for your note, run the following command:

```bash
find /home/soushi888/Projets/alternef-digital-garden/content/knowledge -type d | sort | sed -e "s/[^-][^\/]*\// |/g" -e "s/|\([^ ]\)/|-\1/"
```

This command will display the complete, up-to-date directory structure of the knowledge domain, helping you identify the most appropriate location for your note.

For more detailed exploration of a specific subdomain, you can run:

```bash
find /home/soushi888/Projets/alternef-digital-garden/content/knowledge/[specific-domain] -type d | sort | sed -e "s/[^-][^\/]*\// |/g" -e "s/|\([^ ]\)/|-\1/"
```

Replace `[specific-domain]` with the domain you're interested in (e.g., `tools-and-technology`).

Analyze the domain structure carefully to determine the perfect location for the note. If you're creating a note about a technology, tool, or concept that fits within a specific subdomain, place it in the appropriate subdirectory.

## 2. Create the File

- Create a new markdown file at the determined location
- Use kebab-case for the filename (e.g., `digital-garden.md`)
- Avoid spaces, underscores, or camelCase in filenames

## 3. Add Frontmatter

- Add the appropriate frontmatter based on the note type:

### For Knowledge Notes

```yaml
---
title: Clear, descriptive title
description: Concise summary of the note's content
tags: 
  - relevant-tag
  - another-tag
date: YYYY-MM-DD
---
```

### For Blog Posts

```yaml
---
title: Blog Post Title
description: Brief description of the blog post
date: YYYY-MM-DD
tags:
  - blog
  - relevant-tag
created: YYYY-MM-DD
---
```

### For Portfolio Items

```yaml
---
title: Project Name
description: Brief description of the project
date: YYYY-MM-DD
tags:
  - portfolio
  - project-type
created: YYYY-MM-DD
---
```

### For Domain Indexes

```yaml
---
title: Domain Name
description: Overview of this knowledge domain
tags:
  - domain
  - domain-specific-tag
created: YYYY-MM-DD
---
```

## 4. Structure the Content

- Follow the appropriate template structure based on the note type (see [snippets.mdc](mdc:.cursor/rules/snippets.mdc))
- For all note types:
  - Do not use first-level headers (#) in content as the title is already in frontmatter
  - Start with a brief introduction (no header needed)
  - Use second-level headers (##) for main sections
  - Use third-level headers (###) for subsections

## 5. Add Links and Connections

- Link liberally to related concepts using wiki-style links: `[[page-name|Display Text]]`
- For index pages, use full paths from knowledge folder: `[[knowledge/domain/index|Domain Name]]`
- Ensure all links use proper display text for context
- Add at least 3 related notes to each knowledge note
- Consider cross-domain connections where relevant

## 6. Add Tags

- Use kebab-case for all tags (e.g., `digital-garden`, `permaculture-design`)
- Keep tags atomic and single-level (avoid hierarchical tags like `programming/web`)
- Use consistent tags across related content
- Include domain-specific tags where appropriate

## 7. Add Media (if applicable)

- Store images in the `assets` directory
- Use unique filename as path for images: `![Alt text](image-name.jpg)`
- Include descriptive alt text for all images
- Optimize images for web before adding to the repository

## 8. Review and Refine

- Check that the note follows all markdown formatting rules
- Ensure all links are valid and use proper display text
- Verify that tags are consistent with other related content
- Check for spelling and grammar errors

## 9. Build and Preview

- Run `bun quartz build` to generate the static site
- Preview the site locally to ensure the note appears correctly
- Check that links, tags, and media display properly

## 10. Commit and Push

- Commit the new note to the repository
- Push the changes to GitHub to trigger the deployment workflow
- Verify that the note appears correctly on the live site

## Additional Resources

- [Markdown Content Rules](mdc:.cursor/rules/markdown.mdc)
- [Content Organization Rules](mdc:.cursor/rules/content-organization.mdc)
- [Snippets and Templates](mdc:.cursor/rules/snippets.mdc)
