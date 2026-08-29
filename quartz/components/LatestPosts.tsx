import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative, stripSlashes } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import style from "./styles/latestPosts.scss"

interface Options {
  /** Heading shown above the list */
  title: string
  /** Folder whose posts are listed, e.g. "blog" */
  folder: string
  /** How many posts are visible before "load more" */
  limit: number
  /** Include posts nested in subfolders of `folder` */
  includeSubfolders: boolean
  /** Slug prefixes to leave out, e.g. ["blog/fr"] */
  exclude: string[]
  /** Show the frontmatter description under each entry */
  showDescription: boolean
  /** Only render on these pages (empty = every page) */
  pages: FullSlug[]
}

const defaultOptions: Options = {
  title: "Newest articles",
  folder: "blog",
  limit: 5,
  includeSubfolders: true,
  exclude: [],
  showDescription: true,
  pages: [],
}

// Frontmatter dates parse as UTC midnight; formatting them in the server's local zone
// would render the previous day for anyone west of Greenwich.
const dateFormat = (date: Date, locale: string): string =>
  date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })

/**
 * Newest posts in a folder, ordered by publication date.
 *
 * Deliberately not RecentChanges: that component ranks by last modification, which is the
 * right order for a changelog and the wrong one for "what did I publish most recently".
 * Ordering here is `dates.created`, which CreatedModifiedDate fills from frontmatter `date`
 * before falling back to git and the filesystem (quartz.config.ts sets that priority).
 *
 * The tail sits in a <details> so "load more" needs no client script and works without JS.
 */
export default ((userOpts?: Partial<Options>) => {
  const LatestPosts: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions, ...userOpts }

    if (opts.pages.length > 0 && !opts.pages.some((p) => fileData.slug === p)) {
      return null
    }

    const folder = stripSlashes(opts.folder)
    const folderDepth = folder.split("/").length

    const posts = allFiles
      .filter((file: QuartzPluginData) => {
        // the raw slug, not simplifySlug: that one trims "index" and would hide section pages
        const slug = stripSlashes(file.slug!)
        const parts = slug.split("/")
        if (!slug.startsWith(`${folder}/`)) return false

        // folder indexes are section pages, not articles
        if (parts.at(-1) === "index") return false
        if (!opts.includeSubfolders && parts.length !== folderDepth + 1) return false
        // segment-aware: "blog/fr" must not swallow "blog/fractal-sovereignty-..."
        if (
          opts.exclude.some((prefix) => {
            const ex = stripSlashes(prefix)
            return slug === ex || slug.startsWith(`${ex}/`)
          })
        )
          return false

        return file.dates?.created !== undefined
      })
      .sort((a, b) => b.dates!.created.getTime() - a.dates!.created.getTime())

    if (posts.length === 0) {
      return null
    }

    const head = posts.slice(0, opts.limit)
    const tail = posts.slice(opts.limit)

    const entry = (file: QuartzPluginData) => (
      <li class="latest-post" key={file.slug}>
        <a href={resolveRelative(fileData.slug!, file.slug!)} class="latest-post-link internal">
          {file.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title}
        </a>
        <span class="latest-post-date">{dateFormat(file.dates!.created, cfg.locale)}</span>
        {opts.showDescription && file.frontmatter?.description && (
          <p class="latest-post-description">{file.frontmatter.description}</p>
        )}
      </li>
    )

    return (
      <div
        class={classNames(displayClass, "latest-posts", ...(tail.length > 0 ? ["has-more"] : []))}
      >
        <h3>{opts.title}</h3>
        <ul class="latest-posts-list">{head.map(entry)}</ul>
        {tail.length > 0 && (
          <details class="latest-posts-more">
            <summary>
              <span class="latest-posts-more-open">{`Load more (${tail.length})`}</span>
              <span class="latest-posts-more-close">Show less</span>
            </summary>
            <ul class="latest-posts-list">{tail.map(entry)}</ul>
          </details>
        )}
      </div>
    )
  }

  LatestPosts.css = style
  return LatestPosts
}) satisfies QuartzComponentConstructor
