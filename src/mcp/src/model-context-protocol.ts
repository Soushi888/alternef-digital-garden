/**
 * Model Context Protocol (MCP) for Alternef Digital Garden
 *
 * @description Provides a structured, functional approach to managing content context
 * and interactions within the digital garden ecosystem
 */

import { z } from "zod"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { Effect, pipe } from "effect"
import * as Either from "effect/Either"

// Content Metadata Schema
const ContentMetadataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  relatedPages: z.array(z.string()).optional(),
  lastModified: z.date().optional(),
})

// Type Aliases for Functional Programming
type ContentMetadata = z.infer<typeof ContentMetadataSchema>
type ContentContext = {
  filePath: string
  content: string
  metadata: ContentMetadata
  cursor?: { line: number; character: number }
}

// Knowledge Domains
const KnowledgeDomains = [
  "land-and-nature-stewardship",
  "built-environment",
  "tools-and-technology",
  "culture-and-education",
  "health-and-wellbeing",
  "finance-and-economics",
  "governance-and-community",
] as const

type KnowledgeDomain = (typeof KnowledgeDomains)[number]

// Pure Functions for Content Manipulation
const normalizeTag = (tag: string): string => tag.toLowerCase().replace(/\s+/g, "-")

const normalizeTags = (tags?: string[]): string[] => tags?.map(normalizeTag) ?? []

const readFileContents = (filePath: string) =>
  Effect.tryPromise({
    try: () => fs.readFile(filePath, "utf8"),
    catch: (reason: unknown) => new Error(`Failed to read file: ${reason}`),
  })

const parseFileMetadata = (fileContents: string) =>
  Either.try({
    try: () => {
      const { data } = matter(fileContents)
      return ContentMetadataSchema.parse(data)
    },
    catch: (reason: unknown) => new Error(`Failed to parse metadata: ${reason}`),
  })

const enrichMetadata = (filePath: string) => (metadata: ContentMetadata) =>
  Effect.tryPromise({
    try: async () => ({
      ...metadata,
      lastModified: metadata.lastModified ?? (await fs.stat(filePath)).mtime,
      tags: normalizeTags(metadata.tags),
    }),
    catch: (reason: unknown) => new Error(`Failed to enrich metadata: ${reason}`),
  })

// Functional Content Discovery
const walkDirectory = (rootPath: string) =>
  Effect.tryPromise({
    try: async () => {
      const walkDir = async (dir: string): Promise<string[]> => {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        const files = await Promise.all(
          entries.map(async (entry) => {
            const res = path.resolve(dir, entry.name)
            return entry.isDirectory() ? await walkDir(res) : res
          }),
        )
        return files.flat().filter((file) => file.endsWith(".md"))
      }
      return walkDir(rootPath)
    },
    catch: (reason: unknown) => new Error(`Directory walk failed: ${reason}`),
  })

const findRelatedContent = (tags: string[]) => (allFiles: string[]) =>
  pipe(
    Effect.forEach(allFiles, (file: string) =>
      pipe(
        readFileContents(file),
        Effect.flatMap((content: string) => {
          const metadata = parseFileMetadata(content)
          return Either.match(metadata, {
            onLeft: () => Effect.succeed(null),
            onRight: (meta: ContentMetadata) =>
              meta.tags?.some((tag: string) => tags.includes(tag))
                ? Effect.succeed(file)
                : Effect.succeed(null),
          })
        }),
      ),
    ),
    Effect.map((files) => files.filter((file): file is string => file !== null)),
  )

// Link Management
const createWikilink = (targetPath: string, displayName?: string): string => {
  const linkText = displayName || path.basename(targetPath, ".md")
  return `[[${targetPath}|${linkText}]]`
}

const extractWikilinks = (content: string): string[] => {
  const wikilinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g
  const matches = [...content.matchAll(wikilinkRegex)]
  return matches.map((match) => match[1])
}

const addWikilinkToContent = (
  content: string,
  targetPath: string,
  displayName?: string,
): string => {
  const wikilink = createWikilink(targetPath, displayName)
  if (content.includes(wikilink)) {
    return content
  }
  return `${content}\n\n${wikilink}`
}

// Model Context Protocol as a Functional Module
const createModelContextProtocol = (contentRootPath: string) => {
  return {
    readFileContext: (filePath: string) =>
      pipe(
        readFileContents(filePath),
        Effect.flatMap((content: string) =>
          pipe(
            Effect.succeed(parseFileMetadata(content)),
            Effect.flatMap(
              Either.match({
                onLeft: (error) => Effect.fail(error),
                onRight: (metadata) => Effect.succeed(metadata),
              }),
            ),
            Effect.flatMap(enrichMetadata(filePath)),
            Effect.map((metadata: ContentMetadata) => ({
              filePath,
              content,
              metadata,
            })),
          ),
        ),
      ),

    findRelatedContent: (tags: string[]) =>
      pipe(walkDirectory(contentRootPath), Effect.flatMap(findRelatedContent(tags))),

    createNote: (
      domain: KnowledgeDomain,
      title: string,
      description: string,
      content: string,
      tags: string[] = [],
    ) =>
      Effect.tryPromise({
        try: async () => {
          const normalizedTitle = title.toLowerCase().replace(/\s+/g, "-")
          const domainPath = path.join(contentRootPath, "knowledge", domain)

          await fs.mkdir(domainPath, { recursive: true })

          const filePath = path.join(domainPath, `${normalizedTitle}.md`)

          const metadata = {
            title,
            description,
            tags: normalizeTags(tags),
            aliases: [],
          }

          const frontMatter = matter.stringify(content, metadata)
          await fs.writeFile(filePath, frontMatter)

          return filePath
        },
        catch: (reason: unknown) => new Error(`Note creation failed: ${reason}`),
      }),

    createBidirectionalLink: (
      sourcePath: string,
      targetPath: string,
      sourceDisplayName?: string,
      targetDisplayName?: string,
    ) =>
      Effect.tryPromise({
        try: async () => {
          const sourceContent = await fs.readFile(sourcePath, "utf8")
          const targetContent = await fs.readFile(targetPath, "utf8")

          const updatedSourceContent = addWikilinkToContent(
            sourceContent,
            targetPath,
            targetDisplayName,
          )
          const updatedTargetContent = addWikilinkToContent(
            targetContent,
            sourcePath,
            sourceDisplayName,
          )

          await fs.writeFile(sourcePath, updatedSourceContent)
          await fs.writeFile(targetPath, updatedTargetContent)
        },
        catch: (reason: unknown) => new Error(`Link creation failed: ${reason}`),
      }),

    buildGarden: () =>
      Effect.tryPromise({
        try: async () => {
          const { exec } = require("child_process")
          const util = require("util")
          const execAsync = util.promisify(exec)

          await execAsync("npx quartz build", { cwd: contentRootPath })
        },
        catch: (reason: unknown) => new Error(`Garden build failed: ${reason}`),
      }),

    getKnowledgeDomains: (): KnowledgeDomain[] => [...KnowledgeDomains],
  }
}

export {
  createModelContextProtocol,
  ContentMetadataSchema,
  type ContentMetadata,
  type ContentContext,
  KnowledgeDomains,
  type KnowledgeDomain,
}
