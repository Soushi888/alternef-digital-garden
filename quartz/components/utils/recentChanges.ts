import { FullSlug, simplifySlug } from "../../util/path"
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

// Local date utility function that doesn't require GlobalConfiguration
const getDateFromFile = (file: QuartzPluginData, dateType: "created" | "modified"): Date | undefined => {
  if (!file.dates) {
    return undefined
  }

  const date = file.dates[dateType]
  if (!date) {
    return undefined
  }

  // Validate that it's a valid Date object
  if (isNaN(date.getTime())) {
    return undefined
  }

  return date
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
    // Validate date using our local utility function
    const dt = getDateFromFile(file, sortOrder)
    if (!dt) {
      // console.log(`Skipping ${file.filePath}: invalid ${sortOrder} date`)
      return false
    }

    // Validate draft status
    const frontmatter = file.frontmatter as any // Type assertion for frontmatter access
    const isDraft = frontmatter?.draft === true || frontmatter?.draft === "true"
    if (isDraft && !showDraft) {
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
    const dt = getDateFromFile(file, sortOrder)! // We know this exists due to the filter above
    const excerptString = typeof file.excerpt === 'string' ? file.excerpt : undefined; // Ensure excerpt is string | undefined
    const frontmatter = file.frontmatter as any // Type assertion for frontmatter access

    return {
      title: frontmatter?.title ?? "Untitled",
      link: file.slug as FullSlug, // Type assertion for slug
      date: dt, // Using the actual date from the file
      type: sortOrder,
      excerpt: showExcerpt ? (frontmatter?.description ?? excerptString) : undefined, // Use checked excerptString
      tags: showTags ? (frontmatter?.tags as string[] | undefined) : undefined,
      id: simplifySlug(file.slug as FullSlug),
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
