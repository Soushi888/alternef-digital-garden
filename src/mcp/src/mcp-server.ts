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
import { Effect, pipe } from "effect"
import * as Either from "effect/Either"

// Configurable root directory (default to project root)
const PROJECT_ROOT = process.env.PROJECT_ROOT || path.resolve(__dirname, "../..")
const CONTENT_DIR = path.join(PROJECT_ROOT, "content")
const KNOWLEDGE_DIR = path.join(CONTENT_DIR, "knowledge")

// Create MCP instance
const mcp = createModelContextProtocol(CONTENT_DIR)

// Ensure directories exist - functional implementation
const ensureDomainDir = (domain: KnowledgeDomain) =>
  Effect.tryPromise({
    try: async () => {
      await fs.mkdir(path.join(KNOWLEDGE_DIR, domain), { recursive: true })
    },
    catch: (reason: unknown) => new Error(`Failed to create domain directory: ${reason}`),
  })

const ensureKnowledgeDir = () =>
  Effect.tryPromise({
    try: async () => {
      await fs.mkdir(KNOWLEDGE_DIR, { recursive: true })
    },
    catch: (reason: unknown) => new Error(`Failed to create knowledge directory: ${reason}`),
  })

const ensureDirs = () =>
  pipe(
    ensureKnowledgeDir(),
    Effect.flatMap(() => Effect.forEach(KnowledgeDomains, ensureDomainDir)),
  )

// Initialize the MCP server
const server = new McpServer({
  name: "alternef-garden-manager",
  version: "1.0.0",
  description: "Manage the Alternef Digital Garden with functional tools",
})

// Resource: List all knowledge domains
server.resource("knowledgeDomains", "/knowledge-domains", async () => {
  await Effect.runPromise(ensureDirs())

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
  await Effect.runPromise(ensureDirs())

  const domain = pathname.split("/").pop() as KnowledgeDomain

  if (!KnowledgeDomains.includes(domain)) {
    throw new Error(`Invalid domain: ${domain}. Must be one of: ${KnowledgeDomains.join(", ")}`)
  }

  const readDomainFiles = (domainDir: string) =>
    Effect.tryPromise({
      try: () => fs.readdir(domainDir),
      catch: (reason: unknown) => new Error(`Failed to read domain directory: ${reason}`),
    })

  const domainDir = path.join(KNOWLEDGE_DIR, domain)
  const filesEffect = pipe(
    readDomainFiles(domainDir),
    Effect.catchAll(() => Effect.succeed([])),
  )

  const files = await Effect.runPromise(filesEffect)

  return {
    contents: files
      .filter((file: string) => file.endsWith(".md"))
      .map((file: string) => ({
        type: "text",
        text: file.replace(".md", ""),
        uri: `/domain/${domain}/${file.replace(".md", "")}`,
      })),
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
    await Effect.runPromise(ensureDirs())

    const result = await Effect.runPromise(
      mcp.createNote(domain, title, description, content, tags),
    )

    return {
      content: [
        {
          type: "text",
          text: `Created note: ${title} in domain: ${domain}`,
          uri: `/domain/${domain}/${title}`,
        },
      ],
    }
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
    await Effect.runPromise(ensureDirs())

    const sourceFile = path.join(KNOWLEDGE_DIR, `${sourceNote}.md`)
    const targetFile = path.join(KNOWLEDGE_DIR, `${targetNote}.md`)

    const fileExists = (filePath: string) =>
      Effect.tryPromise({
        try: async () => {
          try {
            await fs.stat(filePath)
            return true
          } catch {
            return false
          }
        },
        catch: (reason: unknown) => new Error(`Failed to check file existence: ${reason}`),
      })

    const sourceExistsEffect = fileExists(sourceFile)
    const targetExistsEffect = fileExists(targetFile)

    const [sourceExists, targetExists] = await Effect.runPromise(
      Effect.all([sourceExistsEffect, targetExistsEffect]),
    )

    if (!sourceExists) {
      throw new Error(`Source note "${sourceNote}" not found at ${sourceFile}`)
    }

    if (!targetExists) {
      throw new Error(`Target note "${targetNote}" not found at ${targetFile}`)
    }

    await Effect.runPromise(
      mcp.createBidirectionalLink(sourceFile, targetFile, sourceDisplayName, targetDisplayName),
    )

    return {
      content: [
        {
          type: "text",
          text: `Linked ${sourceNote} to ${targetNote}`,
          uri: `/links/${sourceNote}-${targetNote}`,
        },
      ],
    }
  },
)

// Tool: Build the garden
server.tool("buildGarden", async () => {
  await Effect.runPromise(ensureDirs())

  await Effect.runPromise(mcp.buildGarden())

  return {
    content: [
      {
        type: "text",
        text: "Alternef Digital Garden built successfully",
        uri: "/build-status",
      },
    ],
  }
})

const findRelatedContentSchema = {
  tags: z.array(z.string()),
}

// Tool: Find related content
server.tool("findRelatedContent", findRelatedContentSchema, async ({ tags }) => {
  const relatedContent = await Effect.runPromise(mcp.findRelatedContent(tags))

  return {
    content: relatedContent.map((file) => {
      const relativePath = path.relative(KNOWLEDGE_DIR, file)
      const parts = relativePath.split(path.sep)
      const domain = parts[0]
      const name = path.basename(file, ".md")

      return {
        type: "text",
        text: name,
        uri: `/domain/${domain}/${name}`,
      }
    }),
    _meta: { total: relatedContent.length },
  }
})

// Setup server transport
class McpServerReadable extends Readable {
  private _mcpServer: McpServer

  constructor(server: McpServer) {
    super()
    this._mcpServer = server
  }

  _read() {}
}

const startServer = (): void => {
  const readable = new McpServerReadable(server)
  const transport = new StdioServerTransport(readable)
  transport.start()
  console.log("🌱 Alternef Digital Garden MCP Server started")
}

// Start the server
startServer()
