import { FullSlug } from "../../util/path"

export interface ChangedItem {
  title: string
  link: FullSlug
  date: Date
  type: "created" | "modified"
  excerpt?: string
  tags?: string[]
  id: string
}
