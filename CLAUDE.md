# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Alternef Digital Garden is a personal knowledge management system built on **Quartz v4**, a static site generator. Content is authored in Markdown (often from Obsidian) and compiled into a static website with custom TypeScript/Preact components. Deployed to GitHub Pages at `soushi888.github.io/alternef-digital-garden`.

## Commands

| Task | Command |
|------|---------|
| Dev server (hot-reload) | `bun quartz build --serve` or `npm run dev` |
| Production build | `bun quartz build` or `npm run build` |
| Unit tests | `npm test` |
| All E2E tests | `npm run test:e2e` |
| Single E2E test file | `npx playwright test tests/e2e/<file>.spec.ts` |
| E2E specific browser | `npm run test:e2e:chrome` / `test:e2e:firefox` / `test:e2e:safari` |
| E2E accessibility | `npm run test:e2e:accessibility` |
| E2E performance | `npm run test:e2e:performance` |
| E2E debug mode | `npm run test:e2e:debug` |
| Type-check + format check | `npm run check` |
| Auto-format | `npm run format` |
| Install Playwright browsers | `npm run test:e2e:install` |

## Architecture

### Content Layer (`content/`)

Markdown files with YAML frontmatter. Uses Obsidian-flavored Markdown (wikilinks `[[note]]`, callouts, etc.). Content is organized into 7 knowledge domains under `content/knowledge/`:

- `land-and-nature-stewardship/`
- `built-environment/`
- `tools-and-technology/`
- `culture-and-education/`
- `health-and-wellbeing/`
- `finance-and-economics/`
- `governance-and-community/`

Other top-level content directories: `blog/`, `portfolio/`, `alternef/`, `substack/`, `unpublished/`.

Drafts are excluded from builds via `draft: true` in frontmatter (handled by `RemoveDrafts` plugin).

### Quartz Framework (`quartz/`)

The core framework lives here. Key subdirectories:

- **`components/`** — Custom Preact components (TSX). Notable custom ones: `RecentChanges.tsx` (uses Effect library), `Graph.tsx` (D3 knowledge graph with domain-color mapping), `MainMenu.tsx`, `GitHubEditButton.tsx`.
- **`plugins/`** — Transformer, filter, and emitter plugins for the build pipeline.
- **`styles/`** — SCSS stylesheets.
- **`util/`** — Shared utilities (path handling, date functions, etc.).
- **`i18n/`** — Internationalization.
- **`cli/`** — CLI entry point (`bootstrap-cli.mjs`).

### Configuration

- **`quartz.config.ts`** — Site metadata, plugin pipeline (transformers → filters → emitters), theme colors, analytics (Plausible). Wikilink resolution uses "shortest" strategy.
- **`quartz.layout.ts`** — Page layout composition. Defines which components appear in each page zone (left sidebar, beforeBody, right sidebar, afterBody). Contains the knowledge-domain color map for the graph visualization. Homepage and `/recent-changes` get special `RecentChanges` component configurations.

### Key Technical Details

- **Runtime**: Node.js 20+ or 22+, Bun preferred for build commands.
- **Rendering**: Preact (not React) for components, rendered to static HTML via `preact-render-to-string`.
- **Functional patterns**: The `effect` library is used in some components (e.g., RecentChanges). `fp-ts` is also available.
- **Graph visualization**: D3.js with domain-specific color coding defined in `quartz.layout.ts`.
- **Markdown pipeline**: remark (parse) → rehype (transform) → HTML, with plugins for KaTeX, syntax highlighting (Shiki), GFM, and Obsidian-flavored features.
- **SPA mode is disabled** (`enableSPA: false`); popovers are enabled.

### MCP Implementation (`src/mcp/`)

A Model Context Protocol server implementation using the Effect library. Provides tools for note creation, linking, garden building, and content discovery across knowledge domains.

### Testing (`tests/`)

- **Unit tests**: `quartz/util/path.test.ts`, `quartz/depgraph.test.ts` — run with `tsx`.
- **E2E tests**: Playwright in `tests/e2e/` — multi-browser (Chrome, Firefox, Safari, Mobile, Tablet, Widescreen), plus accessibility (WCAG 2.1 AA) and performance (Core Web Vitals) projects.

### CI/CD (`.github/workflows/`)

- `deploy.yml` — GitHub Pages deployment on push to main.
- `ci.yaml` — Build and test pipeline.
- `e2e-tests.yml` — E2E test pipeline.
- `docker-build-push.yaml` — Docker image build.

## Code Style

- **Formatter**: Prettier — 100 char width, no semicolons, trailing commas, 2-space indent.
- **TypeScript**: Strict mode, ESNext target, JSX configured for Preact (`preact/jsx-runtime`).
- **Commit messages**: `feat:`, `fix:`, `chore:` prefixes (conventional commits pattern).

## Content Authoring

- Frontmatter fields: `title`, `date`, `tags`, `draft`, `description`, `aliases`.
- Internal links use wikilink syntax: `[[path/to/note]]` or `[[note|display text]]`.
- Dates sourced from frontmatter first, then filesystem.
- Files in `content/unpublished/` or with `draft: true` are not built.
- Patterns ignored by Quartz: `private/`, `templates/`, `.obsidian/`.

## Skills

Three persistent skills provide domain knowledge across all interactions with this garden:

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `dg-notes` | Knowledge note management — domain taxonomy, classification, frontmatter, linking rules | Creating/classifying knowledge notes, managing indexes, wikilink questions |
| `dg-blog` | Blog post authoring — architecture, writing voice, EN→FR translation | Writing/editing blog posts, translating to French, style guidance |
| `dg-quartz-dev` | Quartz framework development — Preact components, plugins, SCSS, testing | Creating components/plugins, styling, writing tests, build pipeline |

### How Skills Complement `/dg:*` Commands

Skills provide the **knowledge layer** (taxonomy, style guide, architecture); commands provide the **procedure layer** (step-by-step actions).

| Command | Complementary Skill | Relationship |
|---------|---------------------|--------------|
| `/dg:create` | `dg-notes`, `dg-blog` | Skills inform domain classification, frontmatter, and writing voice during creation |
| `/dg:validate` | `dg-notes` | Skill's taxonomy and rules define what validation checks against |
| `/dg:improve` | `dg-notes`, `dg-blog` | Skills provide quality rubric and style guide for improvements |
| `/dg:link` | `dg-notes` | Skill's wikilink rules and cross-domain mappings guide linking |
| `/dg:organize` | `dg-notes` | Skill's domain taxonomy drives reorganization decisions |
| `/dg:build` | `dg-quartz-dev` | Skill provides architecture knowledge for debugging build issues |
| `/dg:sync` | — | Deployment workflow, no specialized knowledge needed |
