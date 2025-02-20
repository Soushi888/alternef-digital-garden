import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"
import style from "./styles/PageList.scss"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

type Props = {
  limit?: number
  sort?: SortFn
  displayMode?: 'list' | 'cards'
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ 
  cfg, 
  fileData, 
  allFiles, 
  limit, 
  sort, 
  displayMode = 'list' 
}: Props) => {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  const extractDescription = (page: QuartzPluginData): string => {
    // Try to extract description from frontmatter
    if (page.frontmatter?.description) {
      return page.frontmatter.description
    }
    
    // If no description in frontmatter, try to extract first paragraph from content
    const contentString = page.content?.toString() || ''
    const firstParagraph = contentString.split('\n\n')[0]
    return firstParagraph.length > 200 
      ? firstParagraph.slice(0, 200) + '...' 
      : firstParagraph
  }

  const extractImage = (page: QuartzPluginData): string | undefined => {
    // Try to extract image from frontmatter, with explicit type checking
    const imageFromFrontmatter = page.frontmatter?.image ?? page.frontmatter?.cover

    return typeof imageFromFrontmatter === 'string' && imageFromFrontmatter.trim() !== ''
      ? imageFromFrontmatter
      : undefined
  }

  return displayMode === 'cards' ? (
    <div class="blog-card-grid">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []
        const description = extractDescription(page)
        const image = extractImage(page)

        return (
          <div class="blog-card">
            {image && (
              <div class="blog-card-image">
                <img src={image} alt={`Cover for ${title}`} />
              </div>
            )}
            <div class="blog-card-content">
              <h3>
                <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                  {title}
                </a>
              </h3>
              <p class="blog-card-description">{description}</p>
              <div class="blog-card-meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
                <ul class="tags">
                  {tags.map((tag) => (
                    <li>
                      <a
                        class="internal tag-link"
                        href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                      >
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  ) : (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []

        return (
          <li class="section-li">
            <div class="section">
              <p class="meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
              </p>
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                </h3>
              </div>
              <ul class="tags">
                {tags.map((tag) => (
                  <li>
                    <a
                      class="internal tag-link"
                      href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                    >
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = style