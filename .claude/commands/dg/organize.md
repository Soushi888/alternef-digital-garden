---
allowed-tools: [Read, Write, Edit, MultiEdit, Glob, Grep, Bash, TodoWrite, mcp__pieces-os__ask_pieces_ltm, mcp__pieces-os__create_pieces_memory]
description: "Organize and restructure digital garden content with automatic link updates and index management"
---

# /dg:organize - Content Structure Management

## Purpose
Reorganize digital garden content structure, move files between domains, and maintain link integrity with automatic updates.

## Usage
```
/dg:organize [operation] [source] [target] [--update-links] [--create-index] [--dry-run]
```

## Arguments
- `operation` - Organization operation: `move`, `restructure`, `merge`, `split`, `cleanup`
- `source` - Source path or pattern (file/folder to organize)
- `target` - Target path or domain
- `--update-links` - Automatically update all internal links (default: true)
- `--create-index` - Generate index.md files for new/updated folders
- `--dry-run` - Preview changes without executing

## Execution
1. **Context Gathering**: Query Pieces MCP for organizational patterns and content relationships
2. **Structure Analysis**: Analyze current content structure and identify optimization opportunities
3. **Path Planning**: Plan target structure with Quartz-compatible paths
4. **Link Discovery**: Find all internal links pointing to content being moved
5. **Content Migration**: Move files with proper path handling
6. **Link Updates**: Update all internal references to moved content
7. **Index Generation**: Create/update index.md files for affected folders
8. **Validation**: Verify all links work after reorganization
9. **Memory Creation**: Document organizational improvements for future reference

## Built-in Organization Patterns

### Domain Structure
```
content/knowledge/
├── land-and-nature/
│   ├── index.md
│   ├── ecology/
│   ├── sustainability/
│   ├── permaculture/
│   └── climate/
├── built-environment/
│   ├── index.md  
│   ├── architecture/
│   ├── urban-planning/
│   └── infrastructure/
├── tools-and-technology/
│   ├── index.md
│   ├── programming/
│   ├── software-tools/
│   ├── hardware/
│   └── ai-and-automation/
└── [other-domains]/
```

### File Organization Rules
- **Depth Limit**: Maximum 3 levels deep (`domain/category/topic/`)
- **Naming Convention**: `kebab-case` for all folders and files
- **Index Files**: Every folder should have `index.md` with overview
- **Cross-References**: Use relative paths for internal links

### Common Organization Operations

#### Move Content Between Domains
```bash
# Move content from one domain to another
source: content/knowledge/tools-and-technology/sustainable-tech.md
target: content/knowledge/land-and-nature/sustainable-tech.md
```

#### Restructure Topic Hierarchy
```bash
# Split a broad topic into specialized subtopics
source: content/knowledge/tools-and-technology/web-development/
target: content/knowledge/tools-and-technology/
  ├── frontend-development/
  ├── backend-development/
  └── full-stack-development/
```

#### Merge Related Content
```bash
# Combine scattered related content
source: [multiple files with similar topics]
target: content/knowledge/domain/unified-topic/
```

### Link Update Patterns

#### Quartz Wikilink Formats
```markdown
# BEST PRACTICE: Use pipe syntax for clean display - CASE SENSITIVE
[[bitcoin|Bitcoin]]                     # Links to bitcoin.md, displays as "Bitcoin"
[[governance|Democratic Governance]]    # Links to governance.md with readable text
[[file-name|Clean Display Name]]        # Link with natural display text

# Basic wikilinks (less preferred - use pipe syntax instead)
[[file-name]]                           # Link to file in same folder
[[Path to file]]                        # Link to "Path to file.md" 

# Direct filename links with clean display - CASE SENSITIVE
[[file-name|Topic Name]]                 # Direct filename reference
[[related-topic|Related Topic]]          # Direct filename reference
[[cross-domain-topic|Cross-Domain Topic]] # Direct filename reference

# Section and block links with clean display - CASE SENSITIVE headings and IDs
[[file-name#Section Heading|Topic Section]] # Link to specific section with clean text
[[file-name#^block-id|Specific Reference]]  # Link to specific block with clean text

# Embeds (transclusion) - CASE SENSITIVE file references
![[file-name]]                          # Embed entire file content
![[file-name#Section]]                  # Embed content under section

# IMPORTANT FOR REORGANIZATION:
# - When moving files, update both the file path AND the display text
# - Use pipe syntax to maintain clean, readable link text
# - Keep link targets exactly matching new filenames (case-sensitive)
# - Consider if display text should change with new organization

# CRITICAL: Index files REQUIRE absolute paths from content root
[[knowledge/domain/index|Domain Overview]]    # CORRECT - Absolute path required
# NO relative paths to index files - will break in Quartz!
```

#### Update Strategy
1. **Scan All Files**: Find references to moved content
2. **Calculate Relative Paths**: Determine new relative paths
3. **Batch Updates**: Update all references simultaneously
4. **Verify Links**: Check that all updated links resolve correctly

### Index Generation Templates

#### Domain Index
```markdown
---
title: "Domain Name"
type: "index"
tags: [domain-tag]
---

# Domain Name

Overview of this knowledge domain.

## Categories

### Category 1
- [[category1/topic1]]
- [[category1/topic2]]

### Category 2
- [[category2/topic1]]
- [[category2/topic2]]

## Recent Updates
<!-- Auto-generated list of recently modified files -->
```

#### Category Index
```markdown
---
title: "Category Name"
type: "index"
parent: "[[knowledge/domain/index|Parent Domain]]"
tags: [domain-tag, category-tag]
---

# Category Name

Description of this category within the domain.

## Topics
- [[topic1]]
- [[topic2]]
- [[topic3]]

## Related Categories
- [[knowledge/domain/other-category/index|Other Category]]
- [[knowledge/other-domain/related-category/index|Related Category]]

## REMEMBER: All index file links must use absolute paths
```

### Cleanup Operations

#### Remove Orphaned Files
- Identify content without incoming links
- Check if content is outdated or duplicate
- Archive or merge with related content

#### Fix Broken Links
- Scan for `[[broken-link]]` references
- Attempt to find moved content
- Update or remove broken references

#### Standardize Naming
- Convert all paths to `kebab-case`
- Remove special characters from filenames
- Ensure URL-friendly slugs

## Content Migration Checklist

### Pre-Migration
- [ ] Backup current content structure
- [ ] Map all internal links to source content
- [ ] Identify content dependencies
- [ ] Plan target folder structure

### During Migration
- [ ] Move files with proper naming
- [ ] Update frontmatter paths/aliases
- [ ] Update to direct filenames (EXCEPT index files - use absolute paths)
- [ ] Create/update index files
- [ ] Ensure all index file links use absolute paths

### Post-Migration  
- [ ] Verify all links resolve
- [ ] Test Quartz build process
- [ ] Update knowledge graph
- [ ] Document organizational changes

## Claude Code Integration
- **Pieces Context**: Leverages content relationship history and organizational patterns
- **Structural Intelligence**: Built-in knowledge of optimal Quartz content organization
- **Link Management**: Comprehensive link discovery and update system
- **Index Automation**: Automatic generation of folder index files
- **Path Validation**: Ensures all paths follow Quartz conventions
- **Backup Creation**: Creates organizational snapshots before major changes
- **Batch Operations**: Efficient handling of large-scale reorganization
- **Memory Preservation**: Documents successful organizational improvements