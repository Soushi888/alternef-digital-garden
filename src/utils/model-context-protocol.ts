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
import { pipe, flow } from "fp-ts/function"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as O from "fp-ts/Option"

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

const readFileContents = (filePath: string): TE.TaskEither<Error, string> =>
  TE.tryCatch(
    () => fs.readFile(filePath, "utf8"),
    (reason) => new Error(`Failed to read file: ${reason}`),
  )

const parseFileMetadata = (fileContents: string): E.Either<Error, ContentMetadata> =>
  E.tryCatch(
    () => {
      const { data } = matter(fileContents)
      return ContentMetadataSchema.parse(data)
    },
    (reason) => new Error(`Failed to parse metadata: ${reason}`),
  )

const enrichMetadata =
  (filePath: string) =>
  (metadata: ContentMetadata): TE.TaskEither<Error, ContentMetadata> =>
    TE.tryCatch(
      async () => ({
        ...metadata,
        lastModified: metadata.lastModified ?? (await fs.stat(filePath)).mtime,
        tags: normalizeTags(metadata.tags),
      }),
      (reason) => new Error(`Failed to enrich metadata: ${reason}`),
    )

// Functional Content Discovery
const walkDirectory = (rootPath: string): TE.TaskEither<Error, string[]> =>
  TE.tryCatch(
    async () => {
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
    (reason) => new Error(`Directory walk failed: ${reason}`),
  )

const findRelatedContent =
  (tags: string[]) =>
  (allFiles: string[]): TE.TaskEither<Error, string[]> =>
    pipe(
      allFiles,
      TE.traverseArray((file) =>
        pipe(
          readFileContents(file),
          TE.chain(
            flow(
              parseFileMetadata,
              E.map((metadata) => (metadata.tags?.some((tag) => tags.includes(tag)) ? file : null)),
              TE.fromEither,
            ),
          ),
        ),
      ),
      TE.map((files) => files.filter((file): file is string => file !== null)),
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
    readFileContext: (filePath: string): TE.TaskEither<Error, ContentContext> =>
      pipe(
        readFileContents(filePath),
        TE.chain((content) =>
          pipe(
            parseFileMetadata(content),
            TE.fromEither,
            TE.chain(enrichMetadata(filePath)),
            TE.map((metadata) => ({
              filePath,
              content,
              metadata,
            })),
          ),
        ),
      ),

    findRelatedContent: (tags: string[]): TE.TaskEither<Error, string[]> =>
      pipe(walkDirectory(contentRootPath), TE.chain(findRelatedContent(tags))),

    createNote: (
      domain: KnowledgeDomain,
      title: string,
      description: string,
      content: string,
      tags: string[] = [],
    ): TE.TaskEither<Error, string> =>
      TE.tryCatch(
        async () => {
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
        (reason) => new Error(`Note creation failed: ${reason}`),
      ),

    createBidirectionalLink: (
      sourcePath: string,
      targetPath: string,
      sourceDisplayName?: string,
      targetDisplayName?: string,
    ): TE.TaskEither<Error, void> =>
      TE.tryCatch(
        async () => {
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
        (reason) => new Error(`Link creation failed: ${reason}`),
      ),

    buildGarden: (): TE.TaskEither<Error, void> =>
      TE.tryCatch(
        async () => {
          const { exec } = require("child_process")
          const util = require("util")
          const execAsync = util.promisify(exec)

          await execAsync("npx quartz build", { cwd: contentRootPath })
        },
        (reason) => new Error(`Garden build failed: ${reason}`),
      ),

    getKnowledgeDomains: (): KnowledgeDomain[] => [...KnowledgeDomains],
  }
}

export {
  createModelContextProtocol,
  ContentMetadataSchema,
  ContentMetadata,
  ContentContext,
  KnowledgeDomains,
  KnowledgeDomain,
}
