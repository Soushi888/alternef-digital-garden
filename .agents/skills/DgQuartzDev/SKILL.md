---
name: DgQuartzDev
description: Quartz v4 framework development for Alternef Digital Garden. USE WHEN Preact components, plugins, SCSS, layout changes, Playwright tests, build pipeline.
---

## Customization

**Before executing, check for user customizations at:**
`~/.claude/PAI/USER/SKILLCUSTOMIZATIONS/DgQuartzDev/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

## 🚨 MANDATORY: Voice Notification (REQUIRED BEFORE ANY ACTION)

**You MUST send this notification BEFORE doing anything else when this skill is invoked.**

1. **Send voice notification**:
   ```bash
   curl -s -X POST http://localhost:8888/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Loading DgQuartzDev skill for Quartz framework development"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification**:
   ```
   Loading **DgQuartzDev** skill for Quartz framework development...
   ```

**This is not optional. Execute this curl command immediately upon skill invocation.**

# Quartz Framework Development

Persistent knowledge layer for the Quartz v4 static site generator. Covers component architecture, plugin system, SCSS styling, and testing patterns.

## Workflow Routing

| Trigger | Workflow Section | How to invoke |
||---------|-----------------|---------------|
|| Build or serve the site | [Build Workflow](#build-workflow) | "build the garden" or "serve it" |
|| Validate build output | [Build Workflow](#build-workflow) (+ verify step) | Add --validate to build |
|| Debug build failure | [Build Workflow](#build-workflow) (error handling) | "build is failing" |
|| Manage garden MCP index | [Index Management](#index-management) | "index seems stale" or "reindex" |
|| Analyze graph, gaps, or structure | [DgNotes Explore Workflow](DgNotes/SKILL.md#explore-workflow) | "explore the garden" |
|| Sync to GitHub and deploy | [Deployment Workflow](#deployment-workflow) | "sync" or "deploy" |
|| Publish draft to production | [DgNotes Publish Workflow](DgNotes/SKILL.md#publish-workflow) | "publish X" |
|| Component architecture detail | See `ComponentArchitecture.md` | |
|| Plugin system reference | See `PluginSystem.md` | |
|| Testing patterns | See `TestingGuide.md` | |
|| Component templates | `ComponentTemplate.tsx` · `ComponentScriptTemplate.ts` · `ComponentStyleTemplate.scss` | |
|| Plugin templates | `PluginTransformerTemplate.ts` | |

**Context files:** `ComponentArchitecture.md` · `PluginSystem.md` · `TestingGuide.md`

## Garden MCP Tools

For garden structure analysis and note discovery during framework development:

| Operation | Primary Tool | Fallback |
|-----------|-------------|---------|
| Domain tree with note counts | `mcp__garden__garden_files` | Glob |
| Garden health stats (total notes, links, tags) | `mcp__garden__garden_status` | Manual counting |
| Explore concept landscape for graph work | `mcp__garden__garden_explore` | Multiple Grep |
| Find notes affected by a build or plugin change | `mcp__garden__garden_search` | Grep |

## Project Architecture

```
quartz/
├── components/           # Preact components (TSX)
│   ├── types.ts          # QuartzComponent type definitions
│   ├── index.ts          # Component exports
│   ├── styles/           # Component-specific SCSS
│   ├── scripts/          # Client-side inline scripts
│   ├── RecentChanges.tsx # Uses Effect library
│   ├── Graph.tsx         # D3 knowledge graph
│   ├── MainMenu.tsx      # Navigation menu
│   ├── GitHubEditButton.tsx # Simple component example
│   └── ...               # ~25 components total
├── plugins/
│   ├── types.ts          # Plugin type definitions
│   ├── index.ts          # Plugin exports + vfile augmentation
│   ├── vfile.ts          # ProcessedContent types
│   ├── transformers/     # Markdown→HTML transformers
│   ├── filters/          # Content filters (RemoveDrafts)
│   └── emitters/         # Output generators
├── styles/
│   ├── variables.scss    # Breakpoints, mixins, sizing
│   ├── base.scss         # Base styles
│   └── custom.scss       # Custom overrides
├── util/                 # Shared utilities
│   ├── path.ts           # Slug/path handling
│   ├── ctx.ts            # BuildCtx interface
│   └── resources.ts      # StaticResources type
├── cfg.ts                # GlobalConfiguration type
├── i18n/                 # Internationalization
└── cli/                  # CLI entry point
```

## Component Development

### Critical rules
1. **Preact, not React** — imports from `preact`, JSX runtime is `preact/jsx-runtime`
2. **Server-rendered** — components render to static HTML via `preact-render-to-string`
3. **No React hooks** — no `useState`, `useEffect` in component body
4. **Interactivity via inline scripts** — attach `afterDOMLoaded` or `beforeDOMLoaded` strings
5. **CSS as string** — attach SCSS via `ComponentName.css = style`

### QuartzComponentConstructor pattern
Every component follows this exact pattern:

```typescript
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/componentName.scss"

interface Options {
  // component options
}

const defaultOptions: Options = {
  // defaults
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const ComponentName: QuartzComponent = (props: QuartzComponentProps) => {
    const { cfg, fileData, allFiles, displayClass } = props
    // Render logic — returns JSX
    return <div class={`component-name ${displayClass ?? ""}`}>
      {/* content */}
    </div>
  }

  ComponentName.css = style
  ComponentName.afterDOMLoaded = `
    // Client-side JavaScript (runs after DOM ready)
  `
  return ComponentName
}) satisfies QuartzComponentConstructor
```

### Registration
1. Export from `quartz/components/index.ts`
2. Import and configure in `quartz.layout.ts`
3. Place in a layout zone: `beforeBody`, `left`, `right`, `afterBody`, `header`, `footer`

### Available props (QuartzComponentProps)
- `ctx: BuildCtx` — build ID, CLI args, config, all slugs
- `cfg: GlobalConfiguration` — site metadata, theme, locale
- `fileData: QuartzPluginData` — current page's frontmatter, dates, slug
- `allFiles: QuartzPluginData[]` — all processed files (for listings, graphs)
- `tree: Node` — HAST node tree of current page
- `displayClass?: "mobile-only" | "desktop-only"` — responsive visibility
- `children` — nested components

See `ComponentArchitecture.md` for detailed type signatures and patterns.

## Plugin System

### Three plugin types

| Type | Purpose | Key Method |
|------|---------|-----------|
| Transformer | Process markdown→HTML | `markdownPlugins()`, `htmlPlugins()` |
| Filter | Include/exclude content | `shouldPublish()` |
| Emitter | Generate output files | `emit()`, `getQuartzComponents()` |

### Pipeline order (from quartz.config.ts)
```
Transformers: FrontMatter → CreatedModifiedDate → SyntaxHighlighting →
  ObsidianFlavoredMarkdown → GitHubFlavoredMarkdown → TableOfContents →
  CrawlLinks → Description → Latex

Filters: RemoveDrafts

Emitters: AliasRedirects → ComponentResources → ContentPage → FolderPage →
  TagPage → ContentIndex → Assets → Static → Sitemap → RSSFeed → 404
```

See `PluginSystem.md` for complete API details and examples.

## SCSS Styling

### CSS custom properties (from theme)
```scss
// Colors (auto-switch for dark mode)
var(--light)         // Background
var(--lightgray)     // Borders
var(--gray)          // Secondary text
var(--darkgray)      // Primary text
var(--dark)          // Headings
var(--secondary)     // Links
var(--tertiary)      // Hover states
var(--highlight)     // Selection background
var(--textHighlight)  // Text highlight
```

### Breakpoint mixins (from variables.scss)
```scss
$mobile: 800px;
$desktop: 1200px;

// Usage:
@media all and (max-width: $mobile) { ... }
@media all and (min-width: $mobile) { ... }
```

### Component SCSS conventions
- Import in component: `import style from "./styles/componentName.scss"`
- Use CSS custom properties for all colors
- Transitions for interactivity: `transition: opacity 0.2s ease`
- Responsive via breakpoint variables
- Nested selectors with `&`

## Effect Library Patterns

The `effect` library is used in RecentChanges and other components for functional programming:
- Error handling with typed errors
- Functional data processing pipelines
- `pipe()` for composition

## Build Workflow

Invoked when the user says "build the garden", "serve it", "build is failing", or "deploy".

### Modes
| Mode | Command | When to use |
|------|---------|-------------|
| `dev` | `bun quartz build --serve` | Local development with hot reload |
| `prod` | `bun quartz build` | Production build for deployment |
| `preview` | `bun quartz build --serve` | Production-like local preview |

### Build Commands
```bash
# Development
bun quartz build --serve              # Build and serve with hot reload
bun quartz build --serve --port 3000  # Custom port
npx quartz build --serve              # npm fallback

# Production
bun quartz build                      # Production build
bun quartz build --bundleInfo         # Build with bundle analysis

# Recovery
bun quartz build --clean              # Clean build
rm -rf .quartz-cache/ && bun quartz build     # Cache clearing
rm -rf node_modules/ .quartz-cache/ public/   # Full reset
bun install && bun quartz build
```

### Execution Steps
1. **Environment Detection**: Check Node.js >= 20, Bun installed, deps installed
2. **Pre-Build Validation**: Verify critical files present (quartz.config.ts, content/ structure)
3. **Clean if needed**: `rm -rf public/ .quartz-cache/` for clean builds
4. **Build Execution**: Run appropriate build command with error monitoring
5. **Error Handling**: For common errors:
   - "Module not found" → `bun install [missing-package]`
   - "Out of memory" → `export NODE_OPTIONS="--max-old-space-size=8192"`
   - "Port already in use" → `lsof -ti:8080 | xargs kill -9`
   - "Link resolution failed" → Check index files use absolute paths (most common cause)
6. **Post-Build Validation**: public/ directory exists, index.html present, assets copied
7. **Browser Validation** (if --validate): Test site loads, navigation works, graph renders
8. **Performance Check**: Measure LCP, CLS, load time

### ISC
- ISC: Quartz build completes with zero errors in output
- ISC: All index file wikilinks resolve correctly in built site
- ISC: Knowledge graph renders correct domain color nodes
- ISC-A: Build cache not corrupted by interrupted build process

---

## Index Management

Invoked when the user says "index seems stale", "reindex the garden", or "check index status".

The garden MCP index is a SQLite FTS5 database at `.local/garden.db`. The file watcher handles incremental updates. Manual management is needed after bulk operations (20+ files), server restarts, or first-time setup.

### Operations
| Operation | When to use |
|-----------|-------------|
| `status` | Check current index health and freshness |
| `sync` (default) | Full re-index of all content |
| `init` | First-time setup: create DB schema then run full index |

### Execution Steps
1. **status**: Call `mcp__garden__garden_status` — report total notes, total links, last_indexed timestamp, DB size. Flag as stale if >5min old with recent activity.
2. **sync**: Run from project root:
   ```bash
   bun mcp/server.ts sync
   ```
   Confirm via `garden_status` that note count matches or exceeds baseline.
3. **init** (first-time setup):
   ```bash
   bun mcp/server.ts init
   bun mcp/server.ts index
   ```

### Index Freshness Protocol
- After writing content: single file (~1-2s lag), bulk 10+ files (wait + verify via `garden_status`)
- After server restart: run sync (watcher missed writes during downtime)
- After `--fix` operations: always verify index rebuilt before next MCP query

### ISC
- ISC: `garden_status` note count after sync matches or exceeds pre-sync baseline
- ISC: `last_indexed` timestamp is within 30s of sync completion
- ISC-A: `sync` not run as `init` when DB already exists without explicit confirmation

---

## Deployment Workflow

Invoked when the user says "sync", "deploy", "push changes", "commit".

### Git Workflow
```bash
# Standard sync
npx quartz sync                    # pull + commit + push (auto-generate message)
npx quartz sync --no-pull          # Initial sync without pull

# Manual git operations
git add content/ quartz.config.ts quartz.layout.ts package.json README.md
git commit -m "<message>"
git push origin main
```

### Commit Message Patterns
| Change type | Pattern | Example |
|-------------|---------|---------|
| New content | `feat(content): add [content-type] - [title]` | `feat(content): add knowledge - Sustainable Agriculture` |
| Content update | `feat(content): update [note-title]` | `feat(content): update Permaculture Design` |
| Reorganization | `feat(content): reorganize [domain]` | `feat(content): reorganize tools-and-technology` |
| Link fixes | `fix(links): [description]` | `fix(links): update references after file moves` |
| Frontmatter fixes | `fix(frontmatter): [description]` | `fix(frontmatter): standardize date formats` |
| Configuration | `feat(config): [component] - [change]` | `feat(config): theme - update color palette` |
| Build system | `chore(build): [change]` | `chore(build): update Quartz to v4.4.0` |
| Validation fixes | `fix: [validation-type] - [description]` | `fix: broken links - update references` |

### Execution Steps
1. **Change Analysis**: `git diff --cached` to detect new/modified/deleted files
2. **Pre-Sync Validation**: Verify no draft content staged, no emdash in new content, no broken index links
3. **Build Check**: Run `bun quartz build` to confirm site builds cleanly
4. **Git Operations**: Stage content, commit with generated message, push
5. **GitHub Pages Deploy**: Push triggers GitHub Actions — verify site accessible at URL
6. **Garden Index Check**: Call `garden_status` to confirm local index processed all writes

### Pre-Sync Checklist
- [ ] Content validation passes
- [ ] Build succeeds locally
- [ ] No merge conflicts
- [ ] No absolute index link errors
- [ ] Commit message follows garden pattern (feat/fix/chore)

### Error Handling
| Error | Fix |
|-------|-----|
| "Repository not found" | `git remote -v` — check remote URL |
| "Merge conflicts" | `git pull origin main`, resolve, commit, push |
| "Authentication failed" | Update GitHub credentials |
| "Push rejected" | `git pull origin main` — remote has newer changes |
| "Build fails after sync" | Index files using absolute paths? Check and fix |

### ISC
- ISC: Git staging contains only intended content files (no .env, node_modules)
- ISC: Commit message follows garden commit pattern
- ISC: Remote repository is alternef-digital-garden before push
- ISC-A: Force push never executed without explicit confirmation

---

## Test Commands

| Task | Command |
|------|---------|
| Dev server | `bun quartz build --serve` or `npm run dev` |
| Production build | `bun quartz build` or `npm run build` |
| Unit tests | `npm test` |
| All E2E tests | `npm run test:e2e` |
| Single E2E test | `npx playwright test tests/e2e/<file>.spec.ts` |
| Type-check | `npm run check` |
| Auto-format | `npm run format` |

### Code style
- Prettier: 100 char width, no semicolons, trailing commas, 2-space indent
- TypeScript strict mode, ESNext target
- JSX configured for Preact (`preact/jsx-runtime`)

See `TestingGuide.md` for the Playwright multi-project test setup.

## Knowledge Domain Colors

For the D3 graph visualization, domain colors are defined in `quartz.layout.ts`:
```typescript
nodeColorMap: {
  "knowledge/land-and-nature-stewardship": "#2ecc71",
  "knowledge/built-environment": "#3498db",
  "knowledge/tools-and-technology": "#9b59b6",
  "knowledge/culture-and-education": "#f39c12",
  "knowledge/health-and-wellbeing": "#e74c3c",
  "knowledge/finance-and-economics": "#1abc9c",
  "knowledge/governance-and-community": "#34495e",
}
```

## Examples

**Example 1: Create a new Preact component**
```
User: "Create a component that shows the last 5 modified notes"
→ Loads DgQuartzDev skill, reads ComponentArchitecture.md
→ Uses QuartzComponentConstructor pattern (not React — Preact)
→ Attaches CSS via ComponentName.css = style
→ Exports from quartz/components/index.ts
→ Adds to quartz.layout.ts in correct zone
```

**Example 2: Add a transformer plugin**
```
User: "Add a plugin that auto-generates descriptions from note content"
→ Loads DgQuartzDev skill, reads PluginSystem.md
→ Creates transformer in quartz/plugins/transformers/
→ Registers in quartz.config.ts Transformers array in correct pipeline order
→ Runs npm run check to verify type safety
```

**Example 3: Debug a build failure**
```
User: "The build is failing with a missing export error"
→ Loads DgQuartzDev skill
→ Invokes /dg:build to reproduce error
→ Checks quartz/components/index.ts for missing export
→ Runs bun quartz build to verify fix
```
