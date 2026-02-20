import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { GlobalConfiguration } from "../cfg"
import style from "./styles/recentChanges.scss"
import { ChangedItem } from "./utils/recentChanges"

interface Options {
  title?: string
  limit: number
  showCreated: boolean
  showModified: boolean
  detailed: boolean
  filterBy: string[]
  showExcerpt: boolean
  showTags: boolean
  linkToMore: SimpleSlug | false
  pages: FullSlug[]
}

const defaultOptions = (_cfg: GlobalConfiguration): Options => ({
  limit: 10,
  showCreated: true,
  showModified: true,
  detailed: false,
  filterBy: [],
  showExcerpt: false,
  showTags: false,
  linkToMore: false,
  pages: [],
})

const formatRecentDate = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return diffMinutes <= 1 ? "just now" : `${diffMinutes} minutes ago`
    }
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`
  }

  if (diffDays === 1) return "yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`
  }

  const months = Math.floor(diffDays / 30)
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`

  const years = Math.floor(months / 12)
  return years === 1 ? "1 year ago" : `${years} years ago`
}

export default ((userOpts?: Partial<Options>) => {
  const RecentChanges: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }

    // Only render on specified pages (empty = all pages)
    if (opts.pages.length > 0 && !opts.pages.some((p) => fileData.slug === p)) {
      return null
    }

    // Filter files with valid dates
    const validFiles = allFiles.filter(
      (file: QuartzPluginData) => file.dates && (file.dates.created || file.dates.modified),
    )

    // Sort by most recent date
    const sortedFiles = validFiles.sort((a: QuartzPluginData, b: QuartzPluginData) => {
      const dateA = a.dates?.modified || a.dates?.created || new Date(0)
      const dateB = b.dates?.modified || b.dates?.created || new Date(0)
      return dateB.getTime() - dateA.getTime()
    })

    // Convert to ChangedItems
    const allItems: ChangedItem[] = sortedFiles.map((file: QuartzPluginData) => {
      const isModified =
        file.dates?.modified &&
        file.dates?.created &&
        file.dates.modified.getTime() - file.dates.created.getTime() > 60 * 60 * 1000

      return {
        title: file.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title,
        link: file.slug as FullSlug,
        date: file.dates?.modified || file.dates?.created || new Date(),
        type: isModified ? "modified" : "created",
        id: `${file.slug}-${isModified ? "modified" : "created"}`,
        excerpt: file.frontmatter?.description,
        tags: file.frontmatter?.tags,
      }
    })

    // Apply type filters
    let filtered = allItems
    if (!opts.showCreated) {
      filtered = filtered.filter((item) => item.type !== "created")
    }
    if (!opts.showModified) {
      filtered = filtered.filter((item) => item.type !== "modified")
    }

    // Apply path filters
    if (opts.filterBy.length > 0) {
      filtered = filtered.filter((item) => opts.filterBy.some((f) => item.link.includes(f)))
    }

    const remaining = Math.max(0, filtered.length - opts.limit)
    const items = filtered.slice(0, opts.limit)

    return (
      <div class={classNames(displayClass, "recent-changes")}>
        <h3>{opts.title ?? "Recent Changes"}</h3>
        {items.length === 0 ? (
          <p>No recent changes found.</p>
        ) : (
          <ul class={`recent-changes-list ${opts.detailed ? "detailed" : "condensed"}`}>
            {items.map((item) => (
              <li key={item.id} class={`recent-change-item ${item.type}`}>
                <a
                  href={resolveRelative(fileData.slug!, item.link)}
                  class="recent-change-link internal"
                >
                  <span class="recent-change-title">{item.title}</span>
                </a>
                <div class="recent-change-meta">
                  <span class="recent-change-type">
                    {item.type === "created" ? "New" : "Updated"}
                  </span>
                  <span class="recent-change-date">{formatRecentDate(item.date)}</span>
                </div>

                {opts.detailed && opts.showExcerpt && item.excerpt && (
                  <p class="recent-change-excerpt">{item.excerpt}</p>
                )}

                {opts.detailed && opts.showTags && item.tags && item.tags.length > 0 && (
                  <div class="recent-change-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} class="recent-change-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {opts.linkToMore && remaining > 0 && (
          <div class="recent-changes-more">
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>View all changes →</a>
          </div>
        )}
      </div>
    )
  }

  RecentChanges.css = style
  return RecentChanges
}) satisfies QuartzComponentConstructor
