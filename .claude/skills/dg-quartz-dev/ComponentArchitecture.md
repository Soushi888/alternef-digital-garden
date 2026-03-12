# Component Architecture Reference

## Type Definitions

### QuartzComponentProps
```typescript
// From quartz/components/types.ts
type QuartzComponentProps = {
  ctx: BuildCtx
  externalResources: StaticResources
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  children: (QuartzComponent | JSX.Element)[]
  tree: Node                               // HAST node tree
  allFiles: QuartzPluginData[]
  displayClass?: "mobile-only" | "desktop-only"
} & JSX.IntrinsicAttributes & { [key: string]: any }
```

### QuartzComponent
```typescript
type QuartzComponent = ComponentType<QuartzComponentProps> & {
  css?: string              // SCSS string attached to component
  beforeDOMLoaded?: string  // Script executed before DOM ready
  afterDOMLoaded?: string   // Script executed after DOM ready
}
```

### QuartzComponentConstructor
```typescript
type QuartzComponentConstructor<Options extends object | undefined = undefined> = (
  opts: Options,
) => QuartzComponent
```

## BuildCtx
```typescript
interface BuildCtx {
  buildId: string
  argv: Argv
  cfg: QuartzConfig
  allSlugs: FullSlug[]
}
```

## GlobalConfiguration
```typescript
interface GlobalConfiguration {
  pageTitle: string
  pageTitleSuffix?: string
  enableSPA: boolean          // false in this garden
  enablePopovers: boolean     // true in this garden
  analytics: Analytics        // Plausible
  ignorePatterns: string[]
  defaultDateType: ValidDateType
  baseUrl?: string
  generateSocialImages: boolean | Partial<SocialImageOptions>
  theme: Theme
  locale: ValidLocale
}
```

## Simple Component Example: GitHubEditButton

```typescript
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/githubEditButton.scss"

interface Options {
  baseUrl: string
  branch: string
  editText: string
}

const defaultOptions: Options = {
  baseUrl: "https://github.com/...",
  branch: "main",
  editText: "Edit on GitHub",
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const GitHubEditButton: QuartzComponent = ({
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    const filePath = fileData.filePath
    if (!filePath) return null

    const editUrl = `${opts.baseUrl}/edit/${opts.branch}/content/${filePath}`

    return (
      <a href={editUrl} class={`github-edit-button ${displayClass ?? ""}`}
         target="_blank" rel="noopener noreferrer" title={opts.editText}>
        <svg>...</svg>
        <span>{opts.editText}</span>
      </a>
    )
  }

  GitHubEditButton.css = style
  return GitHubEditButton
}) satisfies QuartzComponentConstructor
```

## Complex Component Patterns

### Using allFiles for listings
```typescript
const Component: QuartzComponent = ({ allFiles, cfg }: QuartzComponentProps) => {
  const sorted = allFiles
    .filter(f => f.frontmatter?.tags?.includes("blog"))
    .sort((a, b) => /* date comparison */)
  return <ul>{sorted.map(f => <li>{f.frontmatter?.title}</li>)}</ul>
}
```

### Using Effect library
```typescript
import { pipe, Array as A, Option as O } from "effect"

const processed = pipe(
  allFiles,
  A.filter(f => f.slug !== undefined),
  A.map(f => ({ title: f.frontmatter?.title, slug: f.slug })),
  A.sort(/* comparator */),
  A.take(limit),
)
```

### Client-side interactivity
```typescript
ComponentName.afterDOMLoaded = `
  document.querySelectorAll(".my-component").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.toggle("active")
    })
  })
`
```

## Layout Registration

In `quartz.layout.ts`:
```typescript
import Component from "./quartz/components"

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.MainMenu(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.GitHubEditButton({ /* options */ }),
  ],
}
```

## Available Components

ArticleTitle, Backlinks, Body, Breadcrumbs, Comments, ContentMeta, Darkmode, Date, DesktopOnly, Explorer, ExplorerNode, Footer, GitHubEditButton, Graph, Head, Header, MainMenu, MobileOnly, PageList, PageTitle, RecentChanges, Search, Spacer, TableOfContents, TagList

## RecentChanges Component

Displays recently created or updated notes. Requires `CreatedModifiedDate` transformer to run first (it populates `file.dates.gitCreated`).

**New vs Updated classification** — compares `file.dates.gitCreated` (first git commit date) with `file.dates.modified` (latest git commit date):
- `modified − gitCreated > 1 hour` → **Updated** (file has been committed more than once)
- otherwise → **New** (single commit, file was just added)

Using git-based dates avoids a false-positive from date-only frontmatter fields (`date: 2026-03-11`) being parsed as midnight UTC, which would appear hours before a same-day commit and incorrectly trigger "Updated".

**Options:**
```typescript
interface Options {
  title?: string           // heading text, default: "Recent Changes"
  limit: number            // max items shown, default: 10
  showCreated: boolean     // include "New" items, default: true
  showModified: boolean    // include "Updated" items, default: true
  detailed: boolean        // enables excerpt/tag display, default: false
  filterBy: string[]       // only show items whose path contains one of these
  showExcerpt: boolean     // show description (requires detailed: true)
  showTags: boolean        // show tags (requires detailed: true)
  linkToMore: SimpleSlug | false  // "View all" link when over limit
  pages: FullSlug[]        // restrict to specific pages; [] = all pages
}
```
