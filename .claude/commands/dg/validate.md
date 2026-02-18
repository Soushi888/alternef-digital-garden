---
allowed-tools: [Read, Glob, Grep, Bash, TodoWrite, mcp__pieces-os__ask_pieces_ltm, mcp__pieces-os__create_pieces_memory]
description: "Validate digital garden content structure, links, frontmatter consistency, and Quartz compliance"
---

# /dg:validate - Content Quality Assurance

## Complementary Skills
Load this skill for validation rules and taxonomy:
- **dg-notes** — Domain taxonomy, frontmatter conventions, quality rubric, validation script (`scripts/validate-notes.sh`)

## Purpose
Comprehensively validate digital garden content for structural integrity, link health, frontmatter consistency, and Quartz compliance.

## Usage
```
/dg:validate [scope] [--fix-auto] [--report-format format] [--severity level]
```

## Arguments
- `scope` - Validation scope: `all`, `content`, `links`, `frontmatter`, `structure`, `taxonomy`
- `--fix-auto` - Automatically fix issues that can be safely resolved
- `--report-format` - Output format: `text`, `markdown`, `json`
- `--severity` - Minimum severity level: `error`, `warning`, `info`
- `--domain` - Validate specific domain only

## Execution
1. **Context Gathering**: Query Pieces MCP for known validation patterns and issue history
2. **Scope Analysis**: Determine validation scope and create comprehensive file inventory
3. **Structure Validation**: Check folder structure, naming conventions, and path compliance
4. **Frontmatter Validation**: Verify YAML frontmatter syntax, required fields, and taxonomy
5. **Link Health Check**: Validate all internal and external links for accessibility
6. **Content Quality**: Check for orphaned files, duplicate content, and consistency
7. **Quartz Compliance**: Ensure compatibility with Quartz build requirements
8. **Issue Reporting**: Generate detailed validation report with fix suggestions
9. **Memory Creation**: Document validation patterns and common issues for prevention

## Built-in Validation Rules

### Structural Validation

#### Folder Structure Compliance
```
✅ Valid Structure:
content/
├── knowledge/
│   └── [7-approved-domains]/
│       └── [max-3-levels-deep]/
├── blog/
├── portfolio/
└── about-me.md

❌ Invalid Patterns:
- Spaces in folder names
- Special characters except hyphens
- More than 3 levels deep in knowledge domains
- Missing index.md in knowledge folders
```

#### Naming Convention Rules
```
✅ Valid Names:
- kebab-case-filename.md
- single-word.md  
- numbers-allowed-123.md

❌ Invalid Names:
- CamelCase.md
- snake_case.md
- file with spaces.md
- file@special#chars.md
```

### Frontmatter Validation

#### Required Fields by Content Type
```yaml
# Knowledge Content (Required)
title: string
tags: [array]
created: YYYY-MM-DD
modified: YYYY-MM-DD

# Knowledge Content (Optional)
aliases: [array]
draft: boolean
description: string

# Blog Post (Required)
title: string
date: YYYY-MM-DD
tags: [array]

# Portfolio (Required) 
title: string
type: "project"
status: string
technologies: [array]
```

#### Tag Validation Rules
```yaml
# Domain tags must match approved taxonomy
valid_domains: 
  - land-and-nature
  - built-environment  
  - tools-and-technology
  - culture-and-education
  - health-and-wellbeing
  - finance-and-economics
  - governance-and-community

# Tag format requirements
✅ Valid: [kebab-case, single-word, domain-specific]
❌ Invalid: [UPPERCASE, snake_case, "spaces in tags"]
```

#### Date Format Validation
```yaml
✅ Valid Dates:
created: 2024-01-15
modified: 2024-03-22
date: 2024-12-31

❌ Invalid Dates:
created: "January 15, 2024"
modified: 2024/01/15
date: 15-01-2024
```

### Link Health Validation

#### Quartz Wikilink Validation
```markdown
✅ Valid Wikilink Patterns (CASE SENSITIVE):

# RECOMMENDED: Pipe syntax for clean display
[[bitcoin|Bitcoin]]                     # Links to bitcoin.md, displays as "Bitcoin"
[[governance|Democratic Governance]]    # Links to governance.md with clean text
[[file-name|Clean Display Text]]        # Custom display text with proper target

# Basic wikilinks (valid but less preferred)
[[valid-file]]                          # Basic wikilink
[[Path to file]]                        # Spaced filename

# Section and block links with clean display
[[file-name#Section Heading|Topic Section]] # Section link with clean text
[[file-name#^block-ref|Reference]]      # Block reference with clean text

# Embeds
![[image.png]]                          # Image embed
![[image.png | 100x145]]                # Image with dimensions
![[note-file]]                          # Note transclusion

# CRITICAL: Index files MUST use absolute paths
[[knowledge/domain/index|Domain Overview]]  # CORRECT - Absolute path required
# NO relative paths to index files - will break Quartz builds!

❌ Invalid Wikilink Patterns:
[[broken-link]]                         # Target file doesn't exist
[[file#Non Existent Section]]          # Section doesn't exist
[[file#^invalid-block]]                 # Block ID doesn't exist
![[missing-image.png]]                  # Image file doesn't exist
[[File-Name]]                           # Wrong case (if actual file is "file-name")
[[file#section heading]]               # Wrong case in heading (if actual is "Section Heading")
[[bitcoin|Bitcoin]] → bitcoin.md missing # Pipe syntax with missing target file
# NO relative paths allowed - use direct filenames or absolute paths for index files

⚠️ Discouraged Patterns (valid but not best practice):
[[bitcoin]]                             # Basic link - prefer [[bitcoin|Bitcoin]]
[[file-name]]                           # No display text - prefer [[file-name|Clean Name]]
```

#### External Link Validation
```markdown
✅ Valid External Links:
[Text](https://example.com)
[Text](https://valid-domain.org/path)

⚠️ Check Required:
[Text](http://unencrypted.com)  # HTTP instead of HTTPS
[Text](https://slow-site.com)   # Site response time > 5s
[Text](https://404-error.com)   # Returns 404/500 errors
```

### Content Quality Checks

#### Orphaned Content Detection
```
Orphaned Files: Content with no incoming links
- Check if intentionally isolated
- Suggest connections to related content
- Consider archival or integration

Isolated Clusters: Groups of interconnected content with no external links
- Identify bridge opportunities
- Suggest hub page creation
- Recommend taxonomy alignment
```

#### Duplicate Content Analysis
```
Exact Duplicates: Identical content in multiple files
Semantic Duplicates: Different files covering same topic
Title Conflicts: Multiple files with same/similar titles
Tag Redundancy: Overlapping or redundant tag usage
```

#### Content Completeness
```
Stub Detection: Files with minimal content
Missing Sections: Expected sections not present
Broken Formatting: Markdown syntax errors
Empty Links: Links with no display text
```

### Quartz-Specific Validation

#### Build Compatibility
```yaml
# Check for Quartz build issues
plugin_compatibility: Verify plugin configurations
asset_references: Check image/file references
css_conflicts: Detect styling conflicts
javascript_errors: Identify JS issues
```

#### Performance Impact
```yaml
# File size and performance checks
large_files: Files > 1MB in content directory
image_optimization: Unoptimized images > 500KB
deep_nesting: Folders > 3 levels deep
excessive_links: Pages with > 50 internal links
```

## Validation Reports

### Error Report Format
```markdown
# Digital Garden Validation Report
Generated: 2024-01-15 14:30:00

## Summary
- ✅ 245 files validated
- ❌ 12 errors found
- ⚠️ 8 warnings
- ℹ️ 15 suggestions

## Critical Errors (Must Fix)
### Broken Links (5)
- `content/knowledge/tools/missing-link.md` → Line 23: `[[non-existent-file]]`
- `content/blog/2024-01-10-post.md` → Line 15: `[[../knowledge/moved-file]]`
- `content/knowledge/domain/topic.md` → Line 8: `[[../section/index]]` (use [[knowledge/section/index]])

### Invalid Frontmatter (3)
- `content/knowledge/health/nutrition.md` → Missing required 'created' date
- `content/portfolio/project.md` → Invalid date format: '01/15/2024'

## Warnings (Should Fix)
### Naming Convention (4)
- `content/knowledge/tools/CamelCase File.md` → Use kebab-case
- `content/blog/post_with_underscores.md` → Use hyphens instead

## Suggestions (Consider)
### Content Quality (15)
- 8 stub files with < 100 words
- 3 orphaned files with no incoming links
- 4 files missing domain-specific tags
```

### Auto-Fix Capabilities
```yaml
safe_fixes:
  - Fix obvious typos in frontmatter
  - Standardize date formats
  - Add missing required frontmatter fields
  - Update moved file references
  - Standardize tag formatting

manual_review_required:
  - Broken external links
  - Content duplication
  - Structural reorganization
  - Semantic link updates
```

## Validation Workflows

### Daily Validation (Quick)
1. Check recent file changes
2. Validate new links
3. Verify frontmatter compliance
4. Report critical issues only

### Weekly Validation (Comprehensive)  
1. Full content structure scan
2. Complete link health check
3. Content quality analysis
4. Performance impact assessment

### Pre-Build Validation (Critical)
1. Quartz build compatibility
2. Asset reference validation
3. Plugin configuration check
4. Critical error blocking

### Domain-Specific Validation
1. Taxonomy compliance check
2. Cross-domain link validation
3. Content coverage analysis
4. Knowledge gap identification

## Claude Code Integration
- **Pieces Context**: Leverages historical validation patterns and common issue resolution
- **Structure Intelligence**: Built-in knowledge of optimal Quartz content organization
- **Pattern Recognition**: Identifies recurring issues and suggests systematic fixes
- **Compliance Checking**: Comprehensive Quartz compatibility validation
- **Auto-Fix Engine**: Safe automatic resolution of common issues
- **Quality Metrics**: Generates actionable insights for content improvement
- **Progressive Enhancement**: Learns from validation patterns to prevent future issues
- **Memory Preservation**: Documents validation improvements for consistency
