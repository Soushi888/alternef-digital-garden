# Plugin System Reference

## Plugin Types

### Transformer Plugin
Processes markdown content through the remark/rehype pipeline.

```typescript
type QuartzTransformerPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzTransformerPluginInstance

type QuartzTransformerPluginInstance = {
  name: string
  textTransform?: (ctx: BuildCtx, src: string | Buffer) => string | Buffer
  markdownPlugins?: (ctx: BuildCtx) => PluggableList   // remark plugins
  htmlPlugins?: (ctx: BuildCtx) => PluggableList       // rehype plugins
  externalResources?: (ctx: BuildCtx) => Partial<StaticResources>
}
```

**Example -- simple transformer:**
```typescript
import { QuartzTransformerPlugin } from "../types"
import remarkBreaks from "remark-breaks"

export const HardLineBreaks: QuartzTransformerPlugin = () => ({
  name: "HardLineBreaks",
  markdownPlugins() {
    return [remarkBreaks]
  },
})
```

### Filter Plugin
Decides whether content should be published.

```typescript
type QuartzFilterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzFilterPluginInstance

type QuartzFilterPluginInstance = {
  name: string
  shouldPublish(ctx: BuildCtx, content: ProcessedContent): boolean
}
```

**Example -- RemoveDrafts:**
```typescript
export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    return vfile.data?.frontmatter?.draft !== true
  },
})
```

### Emitter Plugin
Generates output files from processed content.

```typescript
type QuartzEmitterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzEmitterPluginInstance

type QuartzEmitterPluginInstance = {
  name: string
  emit(ctx: BuildCtx, content: ProcessedContent[], resources: StaticResources): Promise<FilePath[]>
  getQuartzComponents(ctx: BuildCtx): QuartzComponent[]
  getDependencyGraph?(ctx: BuildCtx, content: ProcessedContent[], resources: StaticResources): Promise<DepGraph<FilePath>>
}
```

## Data Types

### ProcessedContent
```typescript
type MarkdownContent = [MdRoot, VFile]     // After remark parsing
type ProcessedContent = [HtmlRoot, VFile]  // After rehype transform
```

### VFile Data (QuartzPluginData)
Available on `vfile.data`:
- `slug: FullSlug` -- page slug path
- `filePath: FilePath` -- source file path
- `relativePath: FilePath` -- relative path from content root
- `frontmatter` -- parsed YAML frontmatter object
- `dates` -- `{ created, modified, published }`
- `description` -- extracted page description
- `toc` -- table of contents entries

## Build Pipeline

### Transformer Pipeline Order
1. **FrontMatter** -- Parse YAML frontmatter
2. **CreatedModifiedDate** -- Extract/compute dates
3. **SyntaxHighlighting** -- Code block highlighting (Shiki)
4. **ObsidianFlavoredMarkdown** -- Wikilinks, callouts, embeds
5. **GitHubFlavoredMarkdown** -- Tables, strikethrough, task lists
6. **TableOfContents** -- Generate ToC data
7. **CrawlLinks** -- Resolve and validate internal links
8. **Description** -- Extract page descriptions
9. **Latex** -- KaTeX math rendering

### Processing Flow
```
Markdown file -> textTransform -> remark (markdownPlugins) -> rehype (htmlPlugins) -> ProcessedContent
```

### Emitter Output
```
ProcessedContent[] -> Filter -> Emit:
  ├── ContentPage (individual pages)
  ├── FolderPage (directory indexes)
  ├── TagPage (tag listing pages)
  ├── ContentIndex (search JSON)
  ├── Sitemap (sitemap.xml)
  ├── RSSFeed (index.xml)
  └── 404 (error page)
```

## Creating a New Plugin

1. Create file in appropriate directory (`transformers/`, `filters/`, or `emitters/`)
2. Export plugin factory matching the type signature
3. Re-export from the directory's `index.ts`
4. Add to `quartz.config.ts` plugin pipeline
