/**
 * MCP Server for Alternef Digital Garden
 *
 * This server implements the Model Context Protocol to provide AI assistants
 * with tools to manage the Alternef Digital Garden content.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import * as fs from "fs/promises"
import * as path from "path"
import * as z from "zod"
import {
  createModelContextProtocol,
  KnowledgeDomain,
  KnowledgeDomains,
} from "./model-context-protocol"
import { Readable } from "stream"
import { pipe } from "fp-ts/function"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import * as A from "fp-ts/Array"

// Configurable root directory (default to project root)
const PROJECT_ROOT = process.env.PROJECT_ROOT || path.resolve(__dirname, "../..")
const CONTENT_DIR = path.join(PROJECT_ROOT, "content")
const KNOWLEDGE_DIR = path.join(CONTENT_DIR, "knowledge")

// Create MCP instance
const mcp = createModelContextProtocol(CONTENT_DIR)

// Ensure directories exist - functional implementation
const ensureDomainDir = (domain: KnowledgeDomain): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    async () => {
      await fs.mkdir(path.join(KNOWLEDGE_DIR, domain), { recursive: true })
    },
    (reason) => new Error(`Failed to create domain directory: ${reason}`),
  )

const ensureKnowledgeDir = (): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    async () => {
      await fs.mkdir(KNOWLEDGE_DIR, { recursive: true })
    },
    (reason) => new Error(`Failed to create knowledge directory: ${reason}`),
  )

const ensureDirs = (): TE.TaskEither<Error, undefined> =>
  pipe(
    ensureKnowledgeDir(),
    TE.chain(() =>
      pipe(
        [...KnowledgeDomains], // Convert readonly array to mutable array
        A.map(ensureDomainDir),
        TE.sequenceArray,
        TE.map(() => undefined),
      ),
    ),
  )

// Initialize the MCP server
const server = new McpServer({
  name: "alternef-garden-manager",
  version: "1.0.0",
  description: "Manage the Alternef Digital Garden with functional tools",
})

// Resource: List all knowledge domains
server.resource("knowledgeDomains", "/knowledge-domains", async () => {
  await pipe(
    ensureDirs(),
    TE.getOrElse((error) => {
      console.error("Error ensuring directories:", error)
      return () => Promise.resolve(undefined)
    }),
  )()

  return {
    contents: KnowledgeDomains.map((domain) => ({
      type: "text",
      text: domain,
      uri: `/domain/${domain}`,
    })),
    _meta: { total: KnowledgeDomains.length },
  }
})

// Resource: List notes in a domain
server.resource("domainNotes", "/domain-notes/{domain}", async ({ pathname }) => {
  await pipe(
    ensureDirs(),
    TE.getOrElse((error) => {
      console.error("Error ensuring directories:", error)
      return () => Promise.resolve(undefined)
    }),
  )()

  const domain = pathname.split("/").pop() as KnowledgeDomain

  if (!KnowledgeDomains.includes(domain)) {
    throw new Error(`Invalid domain: ${domain}. Must be one of: ${KnowledgeDomains.join(", ")}`)
  }

  const readDomainFiles = (domainDir: string): TE.TaskEither<Error, string[]> =>
    TE.tryCatch(
      () => fs.readdir(domainDir),
      (reason) => new Error(`Failed to read domain directory: ${reason}`),
    )

  const domainDir = path.join(KNOWLEDGE_DIR, domain)
  const files = await pipe(
    readDomainFiles(domainDir),
    TE.getOrElse((): (() => Promise<string[]>) => () => Promise.resolve([])),
  )()

  return {
    contents: pipe(
      files,
      A.filter((file: string) => file.endsWith(".md")),
      A.map((file: string) => ({
        type: "text",
        text: file.replace(".md", ""),
        uri: `/domain/${domain}/${file.replace(".md", "")}`,
      })),
    ),
    _meta: { domain, total: files.length },
  }
})

// Tool schemas
const createNoteSchema = {
  title: z.string(),
  description: z.string(),
  domain: z.enum(KnowledgeDomains),
  tags: z.array(z.string()).optional(),
  content: z.string(),
}

// Tool: Create a new note
server.tool(
  "createNote",
  createNoteSchema,
  async ({ domain, title, description, content, tags }) => {
    await pipe(
      ensureDirs(),
      TE.getOrElse((error) => {
        console.error("Error ensuring directories:", error)
        return () => Promise.resolve(undefined)
      }),
    )()

    const result = await mcp.createNote(domain, title, description, content, tags)()

    return pipe(
      result,
      E.fold(
        (error) => {
          throw error
        },
        (filePath) => ({
          content: [
            {
              type: "text",
              text: `Created note: ${title} in domain: ${domain}`,
              uri: `/domain/${domain}/${title}`,
            },
          ],
        }),
      ),
    )
  },
)

const linkNotesSchema = {
  sourceNote: z.string(),
  targetNote: z.string(),
  sourceDisplayName: z.string().optional(),
  targetDisplayName: z.string().optional(),
}

// Tool: Link notes
server.tool(
  "linkNotes",
  linkNotesSchema,
  async ({ sourceNote, targetNote, sourceDisplayName, targetDisplayName }) => {
    await pipe(
      ensureDirs(),
      TE.getOrElse((error) => {
        console.error("Error ensuring directories:", error)
        return () => Promise.resolve(undefined)
      }),
    )()

    const sourceFile = path.join(KNOWLEDGE_DIR, `${sourceNote}.md`)
    const targetFile = path.join(KNOWLEDGE_DIR, `${targetNote}.md`)

    const fileExists = (filePath: string): TE.TaskEither<Error, boolean> =>
      TE.tryCatch(
        async () => {
          try {
            await fs.stat(filePath)
            return true
          } catch {
            return false
          }
        },
        (reason) => new Error(`Failed to check file existence: ${reason}`),
      )

    const sourceExists = await fileExists(sourceFile)()
    const targetExists = await fileExists(targetFile)()

    if (E.isLeft(sourceExists) || !sourceExists.right) {
      throw new Error(`Source note "${sourceNote}" not found at ${sourceFile}`)
    }

    if (E.isLeft(targetExists) || !targetExists.right) {
      throw new Error(`Target note "${targetNote}" not found at ${targetFile}`)
    }

    const result = await mcp.createBidirectionalLink(
      sourceFile,
      targetFile,
      sourceDisplayName,
      targetDisplayName,
    )()

    return pipe(
      result,
      E.fold(
        (error) => {
          throw error
        },
        () => ({
          content: [
            {
              type: "text",
              text: `Linked ${sourceNote} to ${targetNote}`,
              uri: `/links/${sourceNote}-${targetNote}`,
            },
          ],
        }),
      ),
    )
  },
)

// Tool: Build the garden
server.tool("buildGarden", async () => {
  await pipe(
    ensureDirs(),
    TE.getOrElse((error) => {
      console.error("Error ensuring directories:", error)
      return () => Promise.resolve(undefined)
    }),
  )()

  const result = await mcp.buildGarden()()

  return pipe(
    result,
    E.fold(
      (error) => {
        throw error
      },
      () => ({
        content: [
          {
            type: "text",
            text: "Alternef Digital Garden built successfully",
            uri: "/build-status",
          },
        ],
      }),
    ),
  )
})

const findRelatedContentSchema = {
  tags: z.array(z.string()),
}

// Tool: Find related content
server.tool("findRelatedContent", findRelatedContentSchema, async ({ tags }) => {
  const result = await mcp.findRelatedContent(tags)()

  return pipe(
    result,
    E.fold(
      (error) => {
        throw error
      },
      (items) => ({
        content: items.map((item) => ({
          type: "text",
          text: item,
          uri: `/related/${encodeURIComponent(item)}`,
        })),
      }),
    ),
  )
})

// Create a custom Readable stream for the transport
class McpServerReadable extends Readable {
  private _mcpServer: McpServer

  constructor(server: McpServer) {
    super()
    this._mcpServer = server
  }

  _read() {}
}

// Start the server with stdio transport
const startServer = (): void => {
  const readable = new McpServerReadable(server)
  const transport = new StdioServerTransport(readable)
  transport.start()
  console.log("Alternef Garden MCP Server is up and running!")
}

startServer()
