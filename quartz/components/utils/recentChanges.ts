import { FullSlug } from "../../util/path"

export interface ChangedItem {
  title: string
  link: FullSlug
  date: Date        // most recent activity (used for "All" and "Updated" sort)
  createdDate: Date // first known date (used for "New" sort)
  type: "created" | "modified" // display badge only — not a filter
  excerpt?: string
  tags?: string[]
  id: string
}
