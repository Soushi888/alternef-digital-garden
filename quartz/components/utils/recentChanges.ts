import { FullSlug, simplifySlug } from "../../util/path"
// import { getDate } from "../../util/compat" // Removed: compat.ts not found
import { PerfTimer } from "../../util/perf"
import { type QuartzPluginData } from "../../plugins/vfile" // Correct path

export interface ChangedItem {
  title: string
  link: FullSlug
  date: Date
  type: "created" | "modified"
  excerpt?: string
  tags?: string[]
  id: string
}

export interface ProcessRecentChangesOptions {
  allFiles: QuartzPluginData[]
  limit: number
  showDraft: boolean
  filter?: (file: QuartzPluginData) => boolean
  sortOrder: "created" | "modified"
  showExcerpt?: boolean
  showTags?: boolean
}

// Helper function to format date (moved from component)
export const formatDate = (d: Date | undefined): string => {
  if (!d) {
    return "N/A"
  }
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

// Function to process files into ChangedItems
export const processRecentChanges = ({
  allFiles,
  limit,
  showDraft,
  filter: userFilter,
  sortOrder,
  showExcerpt,
  showTags,
}: ProcessRecentChangesOptions): ChangedItem[] => {
  const perf = new PerfTimer() // Constructor takes no arguments
  perf.addEvent("start:processRecentChanges")

  const validFiles = allFiles.filter((file) => {
    // const frontmatterDate = // Commented out: depends on getDate
    //   sortOrder === "created" ? file.dates?.created : file.dates?.modified
    // const gitDate = sortOrder === "created" ? file.dates?.gitCreated : file.dates?.gitModified // Commented out: depends on getDate

    // Validate date
    // const dt = getDate(file.dates, sortOrder === "created" ? "created" : "modified") // Commented out: getDate not found
    // if (!dt) {
    //   // console.log(`Skipping ${file.filePath}: invalid date`)
    //   return false
    // }

    // Validate draft status
    if (file.frontmatter?.draft && !showDraft) {
      // console.log(`Skipping ${file.filePath}: draft`)
      return false
    }

    // Apply user filter if provided
    if (userFilter && !userFilter(file)) {
      // console.log(`Skipping ${file.filePath}: user filter`)
      return false
    }

    return true
  })

  // Map to ChangedItem interface
  const items: ChangedItem[] = validFiles.map((file) => {
    // const dt = getDate(file.dates, sortOrder === "created" ? "created" : "modified")! // Commented out: getDate not found
    // TODO: Need a valid way to get the date for sorting and ChangedItem.date
    const placeholderDate = new Date(); // Placeholder: Replace with actual date logic
    const excerptString = typeof file.excerpt === 'string' ? file.excerpt : undefined; // Ensure excerpt is string | undefined
    return {
      title: file.frontmatter?.title ?? "Untitled",
      link: file.slug!,
      date: placeholderDate, // Using placeholder date
      type: sortOrder,
      excerpt: showExcerpt ? (file.frontmatter?.description ?? excerptString) : undefined, // Use checked excerptString
      tags: showTags ? file.frontmatter?.tags : undefined,
      id: simplifySlug(file.slug!),
    }
  })

  // Sort items
  items.sort((a, b) => b.date.getTime() - a.date.getTime())

  perf.addEvent("processed")

  // Limit items
  const limitedItems = items.slice(0, limit)
  perf.addEvent("end:processRecentChanges")
  // console.log(perf.format()) // Log performance

  return limitedItems
}
