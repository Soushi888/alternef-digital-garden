---
allowed-tools: [Read, Write, Glob, Grep, Bash, TodoWrite, mcp__pieces-os__ask_pieces_ltm, mcp__pieces-os__create_pieces_memory, mcp__playwright__init-browser, mcp__playwright__get-screenshot, mcp__playwright__get-context, mcp__playwright__execute-code]
description: "Create new digital garden content with proper Quartz structure, frontmatter templates, and domain taxonomy"
---

# /dg:create - Digital Garden Content Creation

## Purpose
Create new content for your Alternef Digital Garden with proper Quartz-compatible structure, frontmatter, and taxonomy integration.

## Usage
```
/dg:create [content-type] [title] [--domain domain-name] [--tags tag1,tag2] [--draft]
```

## Arguments
- `content-type` - Type of content: `knowledge`, `blog`, `portfolio`, `index`
- `title` - Content title (will be slugified for filename)
- `--domain` - Knowledge domain (for knowledge content): `land-and-nature`, `built-environment`, `tools-and-technology`, `culture-and-education`, `health-and-wellbeing`, `finance-and-economics`, `governance-and-community`
- `--tags` - Comma-separated tags
- `--draft` - Mark content as draft
- `--path` - Custom path within domain (optional)

## Execution
1. **Context Gathering**: Query Pieces MCP for existing content patterns and domain structure
2. **Content Type Detection**: Determine target path and template based on content type
3. **Path Generation**: Create Quartz-compatible file paths with proper slugification
4. **Frontmatter Generation**: Generate appropriate YAML frontmatter with taxonomy
5. **Template Application**: Apply content templates based on type and domain
6. **File Creation**: Create the content file with proper structure
7. **Index Updates**: Update relevant index.md files if needed
8. **Link Suggestions**: Suggest potential connections to existing content
9. **Playwright Validation**: Test created content renders correctly and links function
10. **Content Verification**: Verify new content appears in navigation and search
11. **Memory Creation**: Document content creation patterns for future reference

## Built-in Quartz Knowledge

### Content Paths
```
content/
├── knowledge/
│   ├── land-and-nature/          # Environmental, sustainability, ecology
│   ├── built-environment/        # Architecture, urban planning, infrastructure
│   ├── tools-and-technology/     # Software, hardware, digital tools
│   ├── culture-and-education/    # Learning, social dynamics, culture
│   ├── health-and-wellbeing/     # Physical/mental health, lifestyle
│   ├── finance-and-economics/    # Economics, personal finance, models
│   └── governance-and-community/ # Civic engagement, community building
├── blog/                         # Blog posts (YYYY-MM-DD-title.md)
├── portfolio/                    # Project showcases
└── about-me.md                   # Personal introduction
```

### Frontmatter Templates

#### Knowledge Content
```md
---
title: "Content Title"
aliases: ["Alternative Name"]
tags: [domain-tag, specific-tag1, specific-tag2]
created: YYYY-MM-DD
modified: YYYY-MM-DD
draft: false
---

# Content Title

Brief description of the topic.

## Key Concepts

## Related Topics
- [[related-topic-1]]
- [[related-topic-2]]

## References
```

#### Blog Post
```md
---
title: "Post Title"
date: YYYY-MM-DD
tags: [category, topic1, topic2]
draft: false
description: "Brief post description"
---

# Post Title

Content goes here...
```

#### Portfolio Project
```md
---
title: "Project Name"
type: "project"
status: "completed" # in-progress, completed, archived
technologies: [tech1, tech2, tech3]
tags: [domain, project-type]
created: YYYY-MM-DD
updated: YYYY-MM-DD
repository: "https://github.com/user/repo"
live_url: "https://project.example.com"
---

# Project Name

## Overview

## Technologies Used

## Key Features

## Challenges & Solutions

## Results & Impact

## Links
- [Repository](repository-url)
- [Live Demo](live-url)
```

#### Index Page
```md
---
title: "Domain/Topic Overview"
type: "index"
tags: [domain-tag]
---

# Domain/Topic Overview

Brief description of this knowledge domain.

## Sub-topics

## Key Resources

## Recent Additions

## IMPORTANT: When linking TO index files
Use absolute paths: [[knowledge/domain/index|Domain]]
NOT relative paths - will break!
```

### Domain-Specific Tags
```
land-and-nature: [ecology, sustainability, permaculture, conservation, climate, agriculture, biodiversity]
built-environment: [architecture, urban-planning, infrastructure, housing, transportation, smart-cities]
tools-and-technology: [software, hardware, programming, ai, blockchain, web-development, devops]
culture-and-education: [learning, pedagogy, culture, society, community, art, philosophy]
health-and-wellbeing: [physical-health, mental-health, nutrition, fitness, mindfulness, lifestyle]
finance-and-economics: [economics, finance, investing, cryptocurrency, sustainable-economy, local-economy]
governance-and-community: [governance, democracy, community-organizing, civic-engagement, social-innovation]
```

### Link Patterns
```markdown
# Wikilinks (Quartz native - recommended)
# IMPORTANT: All wikilink patterns are CASE SENSITIVE

# BEST PRACTICE: Use pipe syntax for clean display
[[bitcoin|Bitcoin]]                     # Links to bitcoin.md, displays as "Bitcoin"
[[lightning-network|Lightning Network]] # Links to lightning-network.md, clean display
[[governance|Democratic Governance]]    # Links to governance.md with readable text

# Basic wikilinks (less preferred - use pipe syntax instead)
[[file-name]]                           # Link to file in same folder  
[[Path to file]]                        # Link to "Path to file.md" with text "Path to file"

# Section linking with clean display
[[bitcoin#History|Bitcoin's History]]   # Link to specific section with clean text
[[#Core Features]]                      # Link within same file

# Direct filename links with clean display - CASE SENSITIVE
[[file-name|Clean Display]]             # Direct filename reference
[[blog-post-name|Blog Post Title]]      # Direct filename reference

# CRITICAL: Index files REQUIRE absolute paths from content root
[[knowledge/section/index|Section Overview]]  # CORRECT - Absolute path required
# NO relative paths to index files - will break in Quartz!

# Embeds (transclusion) - CASE SENSITIVE file references
![[image-name.png]]                     # Embed image
![[image-name.png | 100x145]]           # Embed image with dimensions
![[file-name]]                          # Embed entire page content
![[file-name#Anchor]]                   # Embed content under header (CASE SENSITIVE)

# External links (standard Markdown)
[Link Text](https://example.com)        # External link

# RECOMMENDED WORKFLOW:
# 1. Create files with lowercase, kebab-case names: bitcoin.md, lightning-network.md
# 2. Use pipe syntax for natural display: [[bitcoin|Bitcoin]]
# 3. Define aliases in frontmatter for multiple display options
# 4. Keep link targets exactly matching filenames (case-sensitive)
```

### Playwright Content Validation

#### New Content Verification
```javascript
// Validate newly created content with Playwright
async function validateNewContent(page, contentPath, contentTitle) {
  // 1. Content Accessibility Test
  const contentUrl = `http://localhost:8080/${contentPath}`;
  await page.goto(contentUrl);
  
  const pageTitle = await page.title();
  const contentExists = pageTitle.includes(contentTitle);
  
  // 2. Content Rendering Check
  const contentBody = await page.$eval('.content', el => el.innerHTML.length > 100);
  const frontmatterParsed = await page.$('.frontmatter-error') === null;
  
  // 3. Navigation Integration Test
  await page.goto('http://localhost:8080');
  const inNavigation = await page.evaluate((title) => {
    const navLinks = document.querySelectorAll('nav a, .sidebar a');
    return Array.from(navLinks).some(link => 
      link.textContent.includes(title) || link.href.includes(title.toLowerCase())
    );
  }, contentTitle);
  
  // 4. Search Integration Test
  await page.fill('[data-search-input]', contentTitle);
  await page.waitForTimeout(1000);
  const searchResults = await page.$$eval('[data-search-results] a', 
    links => links.map(link => link.textContent)
  );
  const inSearch = searchResults.some(result => result.includes(contentTitle));
  
  // 5. Index File Link Validation (if content is index)
  let indexLinksValid = true;
  if (contentPath.includes('/index')) {
    const backlinks = await page.$$eval(
      'a[href*="' + contentPath + '"]',
      links => links.map(l => ({ href: l.href, working: true }))
    );
    
    for (const link of backlinks) {
      try {
        await page.goto(link.href);
        await page.waitForLoadState('networkidle');
        if (page.url().includes('404')) {
          indexLinksValid = false;
          break;
        }
      } catch (error) {
        indexLinksValid = false;
        break;
      }
    }
  }
  
  return {
    contentAccessible: contentExists,
    contentRendered: contentBody,
    frontmatterValid: frontmatterParsed,
    inNavigation: inNavigation,
    inSearch: inSearch,
    indexLinksValid: indexLinksValid,
    url: contentUrl
  };
}
```

#### Knowledge Graph Integration Test
```javascript
// Verify content appears in knowledge graph
async function validateGraphIntegration(page, contentTitle) {
  await page.goto('http://localhost:8080');
  
  // Check if knowledge graph includes new content
  const graphData = await page.evaluate(() => {
    return window.graphData || window.graph || null;
  });
  
  if (!graphData) return { graphExists: false };
  
  // Look for new content in graph nodes
  const nodeExists = graphData.nodes?.some(node => 
    node.title?.includes(contentTitle) || 
    node.name?.includes(contentTitle) ||
    node.id?.includes(contentTitle.toLowerCase().replace(/\s+/g, '-'))
  );
  
  return {
    graphExists: true,
    nodeExists: nodeExists,
    totalNodes: graphData.nodes?.length || 0
  };
}
```

#### Link Pattern Validation  
```javascript
// Validate that created links follow correct patterns
async function validateLinkPatterns(page, contentPath) {
  await page.goto(`http://localhost:8080/${contentPath}`);
  
  // Extract all wikilinks from content
  const wikilinks = await page.evaluate(() => {
    const content = document.querySelector('.content').innerHTML;
    const wikilinkRegex = /\[\[([^\]]+)\]\]/g;
    const links = [];
    let match;
    
    while ((match = wikilinkRegex.exec(content)) !== null) {
      const fullLink = match[1];
      const [target, display] = fullLink.includes('|') 
        ? fullLink.split('|') 
        : [fullLink, fullLink];
      
      links.push({
        target: target.trim(),
        display: display?.trim() || target.trim(),
        isIndexLink: target.includes('/index'),
        isAbsolutePath: !target.startsWith('../') && !target.startsWith('./'),
        raw: match[0]
      });
    }
    
    return links;
  });
  
  // Validate index links use absolute paths
  const indexLinkErrors = wikilinks
    .filter(link => link.isIndexLink && !link.isAbsolutePath)
    .map(link => ({
      error: 'Index link uses relative path',
      link: link.raw,
      shouldBe: `[[knowledge/${link.target.replace(/^\.\.\//, '')}|${link.display}]]`
    }));
  
  return {
    totalLinks: wikilinks.length,
    indexLinks: wikilinks.filter(link => link.isIndexLink).length,
    indexLinkErrors: indexLinkErrors,
    allLinksValid: indexLinkErrors.length === 0
  };
}
```

## Claude Code Integration
- **Pieces Context**: Leverages existing content patterns and domain knowledge
- **Path Intelligence**: Built-in understanding of Quartz content structure
- **Taxonomy Integration**: Auto-suggests relevant tags based on domain and existing content
- **Template System**: Self-contained frontmatter and structure templates
- **Link Suggestions**: Analyzes existing content for potential connections
- **Index Management**: Automatically maintains folder index files
- **Slug Generation**: Creates URL-friendly filenames following Quartz conventions
- **Playwright Validation**: Real-time testing of created content and link patterns
- **Content Verification**: Ensures new content renders correctly and integrates with site
- **Link Pattern Enforcement**: Validates that index links use absolute paths
- **Memory Preservation**: Documents successful content creation patterns for consistency
