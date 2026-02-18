---
name: dg-quartz-dev
description: Quartz framework development for the Alternef Digital Garden. Use when creating or modifying Preact components, plugins, SCSS styles, or tests. Triggers on component development, plugin authoring, styling, layout changes, and test writing.
---

# Quartz Framework Development

## Overview

Persistent knowledge layer for developing the Quartz v4 static site generator powering the Alternef Digital Garden. Covers component architecture, plugin system, SCSS styling, and testing patterns.

## When to Use

- Creating new Preact components
- Modifying existing components (Graph, RecentChanges, MainMenu, etc.)
- Writing transformer/filter/emitter plugins
- SCSS styling with CSS custom properties
- Writing Playwright E2E tests or unit tests
- Understanding the build pipeline

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

See `references/component-architecture.md` for detailed type signatures and patterns.

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

See `references/plugin-system.md` for complete API details and examples.

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

## Build & Test Commands

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

See `references/testing-guide.md` for the Playwright multi-project test setup.

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
