---
allowed-tools: [Read, Bash, Glob, Grep, TodoWrite, mcp__pieces-os__ask_pieces_ltm, mcp__pieces-os__create_pieces_memory]
description: "Sync digital garden changes to GitHub with intelligent commit messages and deployment automation"
---

# /dg:sync - Git Integration & Deployment

## Purpose
Synchronize digital garden changes to GitHub with intelligent commit message generation, automated deployment, and comprehensive change tracking.

## Usage
```
/dg:sync [operation] [--message "custom message"] [--deploy] [--force] [--dry-run]
```

## Arguments
- `operation` - Sync operation: `push`, `pull`, `deploy`, `status`, `history`
- `--message` - Custom commit message (overrides auto-generation)
- `--deploy` - Deploy to GitHub Pages after successful sync
- `--force` - Force push changes (use cautiously)
- `--dry-run` - Preview changes without executing
- `--validate` - Run validation before syncing

## Execution
1. **Context Gathering**: Query Pieces MCP for sync patterns, deployment history, and change patterns
2. **Change Analysis**: Analyze local changes and generate intelligent commit messages
3. **Pre-Sync Validation**: Run content validation and build checks
4. **Git Operations**: Execute git commands with proper error handling
5. **Quartz Sync**: Use native Quartz sync functionality for optimal deployment
6. **Deployment**: Deploy to GitHub Pages if requested
7. **Post-Sync Verification**: Verify successful deployment and site accessibility
8. **Status Reporting**: Provide detailed sync and deployment status
9. **Memory Creation**: Document sync patterns and deployment configurations

## Built-in Git Knowledge

### Quartz Sync Commands
```bash
# Standard Quartz sync operations
npx quartz sync                    # Standard sync (pull + commit + push)
npx quartz sync --no-pull          # Initial sync without pull
npx quartz sync --no-commit        # Manual commit message mode

# Git operations (when needed)
git add content/                   # Stage content changes
git commit -m "message"           # Commit with message
git push origin main              # Push to remote
git pull origin main              # Pull remote changes
```

### Repository Structure
```
alternef-digital-garden/
├── .git/                         # Git repository
├── content/                      # Content to track
├── public/                       # Build output (ignored)
├── quartz.config.ts             # Configuration to track
├── package.json                 # Dependencies to track
└── README.md                    # Documentation to track

# Tracked files
✅ content/**/*.md
✅ quartz.config.ts
✅ quartz.layout.ts
✅ package.json
✅ README.md
✅ public/static/** (custom assets)

# Ignored files
❌ node_modules/
❌ .quartz-cache/
❌ public/ (except static/)
❌ .env
❌ *.tmp
```

### Intelligent Commit Messages

#### Content Change Analysis
```yaml
New Content:
  pattern: "Add [content-type]: [title]"
  examples:
    - "Add knowledge: Sustainable Agriculture Practices"
    - "Add blog post: Digital Garden Workflow Updates"
    - "Add portfolio: Holochain dApp Project"

Content Updates:
  pattern: "Update [content-type]: [title] - [change-summary]"
  examples:
    - "Update knowledge: Permaculture Design - add water management section"
    - "Update blog: 2024 Reflections - fix typos and improve formatting"

Content Reorganization:
  pattern: "Reorganize [domain]: [description]"
  examples:
    - "Reorganize tools-and-technology: split programming into languages and frameworks"
    - "Reorganize content structure: improve knowledge graph connections"

Link Management:
  pattern: "Links: [action] - [description]"  
  examples:
    - "Links: add bi-directional connections between sustainability topics"
    - "Links: fix broken references after content reorganization"
```

#### Configuration Changes
```yaml
Quartz Configuration:
  pattern: "Config: [component] - [change]"
  examples:
    - "Config: theme - update color palette for better accessibility"
    - "Config: plugins - add table of contents and improved search"
    - "Config: layout - reorganize sidebar components"

Build System:
  pattern: "Build: [change-type] - [description]"
  examples:
    - "Build: dependencies - update Quartz to v4.4.0"
    - "Build: optimization - improve image processing pipeline"
    - "Build: fix - resolve TypeScript compilation errors"
```

#### Maintenance Operations
```yaml
Validation Fixes:
  pattern: "Fix: [validation-type] - [description]"
  examples:
    - "Fix: broken links - update references after file moves"
    - "Fix: frontmatter - standardize date formats across content"
    - "Fix: structure - ensure all knowledge folders have index files"
    - "Fix: index links - ensure absolute paths used for index files"

Performance Improvements:
  pattern: "Optimize: [area] - [improvement]"
  examples:
    - "Optimize: images - compress and convert to WebP format"
    - "Optimize: build - reduce bundle size by 30%"
    - "Optimize: links - improve knowledge graph connectivity"
```

### Deployment Workflow

#### GitHub Pages Integration
```yaml
Deployment Process:
  1. Build production version
  2. Validate build output
  3. Sync to main branch
  4. GitHub Actions triggers
  5. Deploy to gh-pages branch
  6. Verify site accessibility

GitHub Actions (if configured):
  - Automatic builds on push
  - Link checking on PRs
  - Performance monitoring
  - SEO validation
```

#### Domain Configuration
```yaml
# Custom domain setup (if applicable)
CNAME: soushi888.github.io/alternef-digital-garden/
DNS: Configure CNAME record
SSL: Automatic via GitHub Pages
CDN: Built-in GitHub CDN

# Vercel deployment (alternative)
vercel.json:
  cleanUrls: true
  trailingSlash: false
```

### Change Detection Patterns

#### Content Analysis
```bash
# Detect content changes
new_files=$(git diff --cached --name-only --diff-filter=A content/)
modified_files=$(git diff --cached --name-only --diff-filter=M content/)
deleted_files=$(git diff --cached --name-only --diff-filter=D content/)
renamed_files=$(git diff --cached --name-only --diff-filter=R content/)

# Categorize changes
knowledge_changes=$(echo "$modified_files" | grep "content/knowledge/")
blog_changes=$(echo "$modified_files" | grep "content/blog/")
portfolio_changes=$(echo "$modified_files" | grep "content/portfolio/")
```

#### Link Analysis
```bash
# Detect link changes
added_links=$(git diff --cached content/ | grep "^+.*\[\[.*\]\]")
removed_links=$(git diff --cached content/ | grep "^-.*\[\[.*\]\]")
updated_links=$(git diff --cached content/ | grep "[+-].*\[\[.*\]\]")
```

#### Configuration Tracking
```bash
# Track configuration changes  
config_changes=$(git diff --cached quartz.config.ts quartz.layout.ts)
package_changes=$(git diff --cached package.json)
readme_changes=$(git diff --cached README.md)
```

### Sync Validation

#### Pre-Sync Checks
```bash
✅ Content validation passes
✅ Build succeeds locally
✅ No merge conflicts
✅ Remote repository accessible
✅ Required files present
✅ Index file links use absolute paths (critical for Quartz builds)
```

#### Post-Sync Verification
```bash
✅ Changes pushed successfully
✅ GitHub Pages build triggered
✅ Site accessible at URL
✅ Links function correctly
✅ Search index updated
```

### Error Handling

#### Common Sync Issues
```yaml
"Repository not found":
  cause: Incorrect remote URL or permissions
  fix: Check git remote configuration
  command: git remote -v

"Merge conflicts":
  cause: Local and remote changes conflict
  fix: Manual conflict resolution required
  process: pull, resolve, commit, push

"Authentication failed":
  cause: Invalid GitHub credentials
  fix: Update authentication token
  methods: SSH keys, personal access tokens

"Push rejected":
  cause: Remote has newer changes
  fix: Pull and merge before pushing
  command: git pull origin main

"Large file detected":
  cause: File exceeds GitHub size limits
  fix: Use Git LFS or remove large files
  limit: 100MB per file, 1GB per repository

"Build fails after sync":
  cause: Index files not using absolute paths break Quartz builds
  fix: Ensure all index file links use absolute paths
  pattern: "[[knowledge/domain/index|Display]]"
```

#### Recovery Strategies
```bash
# Soft reset (keep changes)
git reset --soft HEAD~1

# Hard reset (discard changes)
git reset --hard HEAD~1

# Abort merge
git merge --abort

# Force push (dangerous)
git push --force-with-lease origin main
```

### Deployment Monitoring

#### Site Health Checks
```yaml
Automated Checks:
  - Site accessibility (HTTP 200)
  - Core pages load correctly
  - Search functionality works
  - RSS feed generates properly
  - Knowledge graph renders

Performance Monitoring:
  - Page load times < 3s
  - Lighthouse scores > 90
  - Core Web Vitals passing
  - Mobile responsiveness
```

#### Rollback Procedures
```bash
# Rollback to previous commit
git revert HEAD
git push origin main

# Rollback to specific version
git revert [commit-hash]
git push origin main

# Emergency rollback
git reset --hard HEAD~1
git push --force origin main
```

## Sync Workflows

### Daily Content Sync
```bash
1. Make content changes
2. Validate content: /dg:validate content
3. Review changes: /dg:sync status
4. Sync with auto-message: /dg:sync push
```

### Major Update Deployment
```bash
1. Comprehensive validation: /dg:validate all
2. Local build test: /dg:build prod
3. Preview changes: /dg:sync --dry-run
4. Deploy: /dg:sync deploy
5. Verify deployment: curl check + manual review
```

### Collaborative Workflow
```bash
1. Pull latest changes: /dg:sync pull
2. Make local changes
3. Merge any conflicts
4. Validate and test
5. Push changes: /dg:sync push
```

## Claude Code Integration
- **Pieces Context**: Leverages deployment history and sync patterns for improved automation
- **Change Intelligence**: Built-in analysis of content changes for smart commit message generation
- **Git Expertise**: Comprehensive Git workflow management with error recovery
- **Deployment Automation**: Streamlined GitHub Pages deployment with validation
- **Conflict Resolution**: Intelligent merge conflict detection and resolution guidance
- **Performance Monitoring**: Built-in site health checks and deployment verification
- **Version Control**: Advanced Git operations with safety checks and rollback capabilities
- **Memory Preservation**: Documents successful deployment patterns and configurations