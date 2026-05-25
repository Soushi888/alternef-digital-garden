export const DOMAINS = [
  "land-and-nature-stewardship",
  "built-environment",
  "tools-and-technology",
  "culture-and-education",
  "health-and-wellbeing",
  "finance-and-economics",
  "governance-and-community",
] as const

export type Domain = typeof DOMAINS[number]

export interface Note {
  id: string
  path: string
  title: string
  description: string | null
  date: string | null
  domain: Domain | null
  draft: boolean
  updated: string
}

export interface NoteWithExcerpt extends Note {
  excerpt: string
}

export interface LinkTarget {
  id: string | null
  raw: string
  display: string | null
}

export interface LinkSource {
  id: string
  title: string
  path: string
}

export interface Tag {
  tag: string
  count: number
}

export interface LinkPair {
  source: string
  target: string
}

export interface FileTree {
  name: string
  count: number
  children?: FileTree[]
}

export interface Wikilink {
  target: string
  display: string | null
}
