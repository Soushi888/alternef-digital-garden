---
allowed-tools: [Read, Bash, Glob, TodoWrite, mcp__pieces-os__ask_pieces_ltm, mcp__pieces-os__create_pieces_memory, mcp__playwright__init-browser, mcp__playwright__get-screenshot, mcp__playwright__get-context, mcp__playwright__execute-code]
description: "Build and serve Quartz digital garden with comprehensive error handling and optimization"
---

# /dg:build - Streamlined Build Process

## Purpose
Build, serve, and deploy your Quartz digital garden with built-in error handling, optimization, and environment detection.

## Usage
```
/dg:build [mode] [--serve] [--clean] [--optimize] [--watch] [--port number]
```

## Arguments
- `mode` - Build mode: `dev`, `prod`, `preview`
- `--serve` - Start local development server after build
- `--clean` - Clean build artifacts before building
- `--optimize` - Enable production optimizations
- `--watch` - Enable file watching for development
- `--port` - Specify server port (default: 8080)

## Execution
1. **Context Gathering**: Query Pieces MCP for build patterns, common issues, and optimization history
2. **Environment Detection**: Determine build context and requirements
3. **Pre-Build Validation**: Run critical validation checks before building
4. **Dependency Check**: Verify Node.js, Bun, and required packages
5. **Build Execution**: Run appropriate Quartz build commands with error monitoring
6. **Error Handling**: Diagnose and provide solutions for build failures
7. **Post-Build Validation**: Verify build output and assets
8. **Server Management**: Start/manage development server if requested
9. **Playwright Testing**: Use Playwright MCP to validate site functionality and link integrity
10. **Performance Verification**: Test Core Web Vitals and accessibility with Playwright
11. **Memory Creation**: Document build patterns and issue resolutions

## Built-in Build Knowledge

### Link Pattern Requirements for Build Success
```markdown
# CRITICAL: Index files REQUIRE absolute paths for successful builds
[[knowledge/section/index|Section Overview]]  # CORRECT - Absolute path
# NO relative paths to index files - will break build!

# Standard content files use direct filenames only
[[bitcoin|Bitcoin]]                                  # Direct filename for regular files
[[overview|Overview]]                                # Direct filename for regular files

# Build Validation Rules:
- All index file links MUST use absolute paths from content root
- Regular notes use direct filenames only (no paths)
- Validate all links before building
- Check build logs for "Link resolution failed" errors
```

### Quartz Build Commands
```bash
# Development builds
bun quartz build --serve           # Build and serve with hot reload
bun quartz build --serve --port 3000  # Custom port
npx quartz build --serve           # npm fallback

# Production builds  
bun quartz build                   # Production build
bun quartz build --bundleInfo      # Build with bundle analysis

# Content management
npx quartz sync                    # Sync to GitHub
npx quartz sync --no-pull          # Initial sync without pull
npx quartz create                  # Interactive content creation

# Maintenance
bun install                        # Update dependencies
rm -rf .quartz-cache               # Clear build cache
```

### Environment Detection
```yaml
Development Environment:
  - Local development server
  - Hot reload enabled
  - Source maps included
  - Detailed error messages
  - File watching active

Production Environment:
  - Optimized assets
  - Minified code
  - Compressed images
  - CDN-ready output
  - Performance optimized

Preview Environment:
  - Production-like build
  - Local serving for testing
  - Build validation
  - Performance analysis
```

### Build Process Optimization

#### Pre-Build Checks
```bash
# Validate critical requirements
✅ Node.js version >= 20
✅ Bun installation (fallback to npm)
✅ Package dependencies installed
✅ Content directory structure
✅ Critical files present (quartz.config.ts, etc.)
```

#### Build Performance
```bash
# Clean build artifacts
rm -rf public/
rm -rf .quartz-cache/
rm -rf dist/

# Parallel processing
export NODE_OPTIONS="--max-old-space-size=4096"
bun quartz build --concurrency=4

# Cache management
.quartz-cache/               # Preserve for faster rebuilds
node_modules/.cache/         # Package cache
```

#### Asset Optimization
```yaml
Images:
  - Auto-resize large images (> 1920px width)
  - Convert to WebP where supported
  - Generate responsive image sets
  - Compress without quality loss

CSS/JS:
  - Minify production builds
  - Remove unused code
  - Bundle optimization
  - Tree shaking enabled

Fonts:
  - Optimize font loading
  - Subset unused characters
  - Prefer system fonts when possible
```

### Error Handling Patterns

#### Common Build Errors
```yaml
"Module not found":
  cause: Missing dependency or incorrect import
  fix: Check package.json and install missing packages
  command: bun install [missing-package]

"Out of memory": 
  cause: Large content or insufficient memory
  fix: Increase Node.js memory limit
  command: export NODE_OPTIONS="--max-old-space-size=8192"

"Plugin configuration error":
  cause: Invalid quartz.config.ts settings
  fix: Validate plugin configurations
  file: quartz.config.ts

"Content parsing error":
  cause: Invalid frontmatter or markdown syntax
  fix: Run content validation first
  command: /dg:validate content

"Link resolution failed":
  cause: Relative paths to index files or broken wikilinks
  fix: Use absolute paths for index files, validate all links
  command: /dg:validate links

"Port already in use":
  cause: Development server port conflict
  fix: Use different port or kill existing process
  command: lsof -ti:8080 | xargs kill -9
```

#### Build Recovery Strategies
```bash
# Level 1: Soft recovery
bun quartz build --clean

# Level 2: Cache clearing
rm -rf .quartz-cache/ && bun quartz build

# Level 3: Full reset
rm -rf node_modules/ .quartz-cache/ public/
bun install && bun quartz build

# Level 4: Debug mode
DEBUG=quartz:* bun quartz build
```

### Development Server Management

#### Server Configuration
```javascript
// Built-in server settings
const serverConfig = {
  port: 8080,
  host: 'localhost',
  open: true,           // Auto-open browser
  hot: true,           // Hot module replacement
  liveReload: true,    // Auto-refresh on changes
  compression: true,   // Gzip compression
  historyFallback: true // SPA routing support
}
```

#### File Watching
```yaml
Watched Directories:
  - content/           # Content files
  - quartz/           # Quartz configuration
  - public/           # Static assets
  - quartz.config.ts  # Main configuration
  - quartz.layout.ts  # Layout configuration

Ignored Patterns:
  - .git/
  - node_modules/
  - .quartz-cache/
  - public/           # Build output
  - "**/*.tmp"
  - "**/.DS_Store"
```

### Playwright MCP Validation

#### Automated Browser Testing
```javascript
// Playwright test execution for build validation
async function validateBuild(page) {
  // 1. Site Accessibility Check
  await page.goto('http://localhost:8080');
  const title = await page.title();
  console.log(`Site loads: ${title}`);
  
  // 2. Index File Link Validation  
  const indexLinks = await page.$$eval(
    'a[href*="/index"]', 
    links => links.map(link => ({
      href: link.href,
      text: link.textContent,
      status: 'pending'
    }))
  );
  
  // Test each index link
  for (const link of indexLinks) {
    try {
      await page.goto(link.href);
      const response = await page.waitForLoadState('networkidle');
      link.status = page.url().includes('404') ? 'broken' : 'working';
    } catch (error) {
      link.status = 'error';
    }
  }
  
  // 3. Search Functionality Test
  await page.goto('http://localhost:8080');
  await page.fill('[data-search-input]', 'test query');
  await page.waitForSelector('[data-search-results]');
  
  // 4. Knowledge Graph Validation
  const graphData = await page.evaluate(() => {
    return window.graphData || null;
  });
  
  return {
    siteAccessible: !!title,
    indexLinksValid: indexLinks.filter(l => l.status === 'working').length,
    indexLinksBroken: indexLinks.filter(l => l.status === 'broken').length,
    searchFunctional: true,
    graphGenerated: !!graphData
  };
}
```

#### Core Web Vitals Testing
```javascript
// Performance validation with Playwright
async function checkPerformance(page) {
  await page.goto('http://localhost:8080');
  
  // Measure Core Web Vitals
  const vitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const vitals = {};
        
        entries.forEach((entry) => {
          if (entry.name === 'LCP') vitals.lcp = entry.value;
          if (entry.name === 'FID') vitals.fid = entry.value;
          if (entry.name === 'CLS') vitals.cls = entry.value;
        });
        
        resolve(vitals);
      }).observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
    });
  });
  
  return {
    lcp: vitals.lcp < 2500 ? 'pass' : 'fail',
    fid: vitals.fid < 100 ? 'pass' : 'fail', 
    cls: vitals.cls < 0.1 ? 'pass' : 'fail'
  };
}
```

#### Accessibility Validation
```javascript
// A11y testing with Playwright
async function checkAccessibility(page) {
  await page.goto('http://localhost:8080');
  
  // Check for accessibility violations
  const violations = await page.evaluate(() => {
    // Basic accessibility checks
    const issues = [];
    
    // Check for alt text on images
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      issues.push(`${images.length} images missing alt text`);
    }
    
    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let prevLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > prevLevel + 1) {
        issues.push(`Heading hierarchy skip: ${heading.tagName} after h${prevLevel}`);
      }
      prevLevel = level;
    });
    
    return issues;
  });
  
  return {
    violations: violations.length,
    issues: violations,
    passed: violations.length === 0
  };
}
```

### Build Validation

#### Post-Build Checks
```bash
# Verify build output
✅ public/ directory created
✅ index.html present
✅ Static assets copied
✅ CSS/JS bundles generated
✅ Knowledge graph data created

# Content validation
✅ All markdown files processed
✅ Internal links resolved
✅ Images optimized and copied
✅ Search index generated
✅ RSS feed created (if enabled)
```

#### Performance Metrics
```yaml
Build Time Targets:
  - Initial build: < 30 seconds
  - Incremental: < 5 seconds
  - Hot reload: < 1 second

Bundle Size Targets:
  - Initial JS: < 200KB
  - CSS: < 100KB
  - Images: WebP optimized
  - Total: < 2MB for typical site

Performance Scores:
  - Lighthouse: > 90
  - Core Web Vitals: All green
  - Load time: < 3s on 3G
```

### Build Workflows

#### Development Workflow
```bash
1. Start development server
   /dg:build dev --serve --watch

2. Make content changes
   Files automatically rebuild and reload

3. Validate changes
   /dg:validate content

4. Commit changes
   /dg:sync
```

#### Production Deployment
```bash
1. Final validation
   /dg:validate all

2. Production build
   /dg:build prod --optimize

3. Performance check
   lighthouse public/index.html

4. Deploy to GitHub Pages
   /dg:sync --deploy
```

#### Continuous Integration
```yaml
# CI/CD pipeline integration
on_push:
  - /dg:validate all
  - /dg:build prod
  - performance_audit
  - deploy_if_passing

scheduled:
  - weekly_link_check
  - monthly_optimization_review
  - quarterly_dependency_update
```

## Build Optimization Strategies

### Performance Optimization
```bash
# Image optimization
find content/ -name "*.png" -exec pngquant --force --output {} {} \;
find content/ -name "*.jpg" -exec jpegoptim --max=85 {} \;

# Content optimization
# Remove draft content from production
grep -r "draft: true" content/ --include="*.md"

# Bundle analysis
bun quartz build --bundleInfo > bundle-report.txt
```

### Cache Strategy
```yaml
Build Cache:
  - .quartz-cache/: Preserve across builds
  - Dependency cache: npm/bun cache
  - Asset cache: Optimized images, fonts

Browser Cache:
  - Static assets: 1 year cache
  - HTML files: No cache
  - API data: 1 hour cache
  - Images: 6 months cache
```

## Claude Code Integration
- **Pieces Context**: Leverages build history, error patterns, and optimization strategies
- **Environment Intelligence**: Built-in knowledge of development vs production requirements
- **Error Diagnosis**: Comprehensive error pattern recognition and automated fixes
- **Performance Monitoring**: Built-in performance targets and optimization suggestions
- **Server Management**: Intelligent development server configuration and port management
- **Build Optimization**: Automatic optimization based on content size and complexity
- **Validation Integration**: Seamless integration with content validation workflows
- **Playwright Testing**: Automated browser testing for link validation, performance, and accessibility
- **Index Link Verification**: Specific testing to ensure absolute path index links work correctly
- **Memory Preservation**: Documents successful build patterns and troubleshooting solutions