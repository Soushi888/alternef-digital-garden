import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { GlobalConfiguration } from "../cfg"
import style from "./styles/recentChanges.scss"
import { ChangedItem } from "./utils/recentChanges"
// @ts-ignore
import script from "./scripts/recentChanges.inline"

interface Options {
  title?: string
  limit: number
  showCreated: boolean
  showModified: boolean
  detailed: boolean
  filterBy: string[]
  showExcerpt: boolean
  showTags: boolean
  showFilter: boolean
  pageSize: number
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
  showFilter: false,
  pageSize: 20,
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
      const gitCreated = file.dates?.gitCreated
      const modified = file.dates?.modified

      // A note is "Updated" only if its first git commit predates the latest commit by >1h.
      // Using gitCreated (first commit date) avoids the false-positive caused by date-only
      // frontmatter fields being parsed as midnight UTC on the same day as the commit.
      const isModified =
        gitCreated !== undefined &&
        modified !== undefined &&
        modified.getTime() - gitCreated.getTime() > 60 * 60 * 1000

      return {
        title: file.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title,
        link: file.slug as FullSlug,
        date: file.dates?.modified || file.dates?.created || new Date(),
        createdDate: file.dates?.gitCreated ?? file.dates?.created ?? file.dates?.modified ?? new Date(),
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

    // Always exclude unpublished content
    filtered = filtered.filter((item) => !item.link.startsWith("unpublished"))

    const remaining = Math.max(0, filtered.length - opts.limit)

    // JSON data island: all items as compact JSON for progressive client-side injection.
    // Links are pre-resolved server-side since the client cannot call resolveRelative.
    // The `i` field records each item's index in this array for deduplication tracking.
    const allItemsJson = JSON.stringify(
      filtered.map((item, idx) => ({
        i: idx,
        t: item.title,
        l: resolveRelative(fileData.slug!, item.link),
        d: item.date.getTime(),
        c: item.createdDate.getTime(),
        k: item.type,
        ...(opts.showExcerpt && item.excerpt ? { e: item.excerpt } : {}),
        ...(opts.showTags && item.tags?.length ? { g: item.tags } : {}),
      })),
    ).replace(/<\//g, "<\\/")

    // For showFilter: pre-render pageSize items per type so both "New" and "Updated" tabs
    // start with visible content. Each item is tagged with its index in filtered (= allData)
    // via data-idx so the client can correctly initialize its deduplication set.
    // For !showFilter: flat limit cap, no Load More.
    const filteredWithIdx = filtered.map((item, idx) => ({ item, idx }))
    const initialItems = opts.showFilter
      ? [
          ...filteredWithIdx.filter(({ item }) => item.type === "created").slice(0, opts.pageSize),
          ...filteredWithIdx.filter(({ item }) => item.type === "modified").slice(0, opts.pageSize),
        ].sort((a, b) => b.item.date.getTime() - a.item.date.getTime())
      : filteredWithIdx.slice(0, opts.limit)

    return (
      <div
        class={classNames(displayClass, "recent-changes")}
        data-page-size={opts.pageSize}
        data-detailed={opts.detailed ? "1" : "0"}
        data-show-excerpt={opts.showExcerpt ? "1" : "0"}
        data-show-tags={opts.showTags ? "1" : "0"}
      >
        <h3>
          {opts.linkToMore ? (
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
              {opts.title ?? "Recent Changes"}
            </a>
          ) : (
            opts.title ?? "Recent Changes"
          )}
        </h3>

        {opts.showFilter && (
          <div class="recent-changes-filter" role="group" aria-label="Filter changes">
            <button data-filter="all" class="active">
              All
            </button>
            <button data-filter="created">Timeline</button>
            <button data-filter="modified">Recently Edited</button>
          </div>
        )}

        {opts.showFilter && <p class="rc-tab-desc" aria-live="polite"></p>}

        {filtered.length === 0 ? (
          <p>No recent changes found.</p>
        ) : (
          <ul class={`recent-changes-list ${opts.detailed ? "detailed" : "condensed"}`}>
            {initialItems.map(({ item, idx }) => (
              <li
                key={item.id}
                class={`recent-change-item ${item.type}`}
                data-type={item.type}
                data-idx={idx}
              >
                <a
                  href={resolveRelative(fileData.slug!, item.link)}
                  class="recent-change-link internal"
                >
                  <span class="recent-change-title">{item.title}</span>
                </a>
                <div class="recent-change-meta">
                  <span class="recent-change-type">
                    {item.type === "created" ? "Created" : "Edited"}
                  </span>
                  <span
                    class="recent-change-date"
                    data-timestamp={item.date.getTime().toString()}
                    data-prefix={item.type === "created" ? "added" : "edited"}
                  >
                    {item.type === "created" ? "added " : "edited "}
                    {formatRecentDate(item.date)}
                  </span>
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

        {opts.showFilter && (
          // @ts-ignore — dangerouslySetInnerHTML on <script> is valid in Preact
          <script
            type="application/json"
            class="rc-items-data"
            dangerouslySetInnerHTML={{ __html: allItemsJson }}
          />
        )}

        {opts.showFilter && filtered.length > 0 && (
          <button class="recent-changes-load-more" style="display:none">
            Load more
          </button>
        )}

        {!opts.showFilter && opts.linkToMore && remaining > 0 && (
          <div class="recent-changes-more">
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>View all changes →</a>
          </div>
        )}
      </div>
    )
  }

  RecentChanges.css = style
  RecentChanges.afterDOMLoaded = script
  return RecentChanges
}) satisfies QuartzComponentConstructor
