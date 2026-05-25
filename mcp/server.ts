import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js"
import { initSchema } from "./db"
import { indexAll } from "./indexer"
import { startWatcher } from "./watcher"
import { gardenSearch } from "./tools/search"
import { gardenContext } from "./tools/context"
import { gardenBacklinks } from "./tools/backlinks"
import { gardenLinks } from "./tools/links"
import { gardenTagList } from "./tools/tag_list"
import { gardenTags } from "./tools/tags"
import { gardenFiles } from "./tools/files"
import { gardenExplore } from "./tools/explore"
import { gardenStatus } from "./tools/status"
import { gardenUnresolvedLinks } from "./tools/unresolved_links"
import { gardenOrphans } from "./tools/orphans"
import { gardenValidate } from "./tools/validate"
import { gardenAliasMap } from "./tools/alias_map"

const TOOLS = [
  {
    name: "garden_context",
    description:
      "Primary exploration tool. Returns a note's body excerpt, outgoing wikilinks, backlinks, and tag siblings in one call. Call this first for any 'how does X relate to Y' question.",
    inputSchema: {
      type: "object",
      properties: {
        note: { type: "string", description: "Note id (e.g. 'knowledge/tools-and-technology/holochain/index') or path" },
        includeContent: { type: "boolean", description: "Include full markdown body (default false)" },
        maxContentBytes: { type: "number", description: "Truncate content at this byte length (default 8000)" },
      },
      required: ["note"],
    },
  },
  {
    name: "garden_search",
    description: "Full-text search across all note titles, descriptions, and bodies using FTS5.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query (FTS5 syntax supported)" },
        domain: { type: "string", description: "Filter by knowledge domain" },
        tag: { type: "string", description: "Filter by tag" },
        limit: { type: "number", description: "Max results (default 20)" },
      },
      required: ["query"],
    },
  },
  {
    name: "garden_backlinks",
    description: "All notes that link TO a given note (incoming links / what references this).",
    inputSchema: {
      type: "object",
      properties: {
        note: { type: "string", description: "Note id or path" },
      },
      required: ["note"],
    },
  },
  {
    name: "garden_links",
    description: "All notes that a given note links TO (outgoing wikilinks).",
    inputSchema: {
      type: "object",
      properties: {
        note: { type: "string", description: "Note id or path" },
      },
      required: ["note"],
    },
  },
  {
    name: "garden_tag_list",
    description: "List all tags in the garden with their note counts, sorted by frequency.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "garden_tags",
    description: "All notes carrying a given tag.",
    inputSchema: {
      type: "object",
      properties: {
        tag: { type: "string", description: "Tag name" },
        limit: { type: "number", description: "Max results (default 50)" },
      },
      required: ["tag"],
    },
  },
  {
    name: "garden_files",
    description: "Domain tree view with note counts. Shows all 7 knowledge domains, or drills into one.",
    inputSchema: {
      type: "object",
      properties: {
        domain: { type: "string", description: "Knowledge domain to drill into (optional)" },
        depth: { type: "number", description: "Tree depth (default 2)" },
      },
      required: [],
    },
  },
  {
    name: "garden_explore",
    description:
      "Find a cluster of related notes matching a query, plus the link map between them — useful for mapping a concept landscape.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Topic or concept to explore" },
        maxNotes: { type: "number", description: "Max notes to return (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "garden_status",
    description: "Index stats: total notes, link count, unresolved links, tag count, domain breakdown, DB size.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "garden_unresolved_links",
    description:
      "List wikilinks that point to non-existent notes, grouped by target with source file counts. Use this to find and fix broken links — much more actionable than the aggregate count in garden_status.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max results (default 50)" },
        minCount: { type: "number", description: "Only return targets referenced at least this many times (default 1)" },
        domain: { type: "string", description: "Scope to source notes in a specific domain" },
      },
      required: [],
    },
  },
  {
    name: "garden_orphans",
    description: "Notes with zero incoming backlinks — no other note links to them. Useful for finding isolated content that needs to be wired into the knowledge graph.",
    inputSchema: {
      type: "object",
      properties: {
        domain: { type: "string", description: "Scope to a specific knowledge domain" },
        excludeIndexes: { type: "boolean", description: "Exclude domain/directory index files from results (default false)" },
      },
      required: [],
    },
  },
  {
    name: "garden_validate",
    description:
      "Validate notes for frontmatter completeness (description, date, tags) and report unresolved links and missing aliases on index files. Runs per-note or across a domain.",
    inputSchema: {
      type: "object",
      properties: {
        note: { type: "string", description: "Validate a single note by id or path" },
        domain: { type: "string", description: "Validate all notes in a domain" },
        onlyWithIssues: { type: "boolean", description: "Only return notes that have issues (default true)" },
      },
      required: [],
    },
  },
  {
    name: "garden_alias_map",
    description:
      "List notes that have aliases defined in their frontmatter. Useful for auditing alias coverage and finding notes that still need aliases for short-form wikilink resolution.",
    inputSchema: {
      type: "object",
      properties: {
        domain: { type: "string", description: "Scope to a specific knowledge domain" },
        withAliasesOnly: { type: "boolean", description: "Only return notes that have aliases (default true)" },
      },
      required: [],
    },
  },
]

async function serve() {
  initSchema()
  startWatcher()

  const server = new Server(
    { name: "garden", version: "1.0.0" },
    { capabilities: { tools: {} } },
  )

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }))

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params
    let result: unknown

    switch (name) {
      case "garden_context":
        result = gardenContext(args as Parameters<typeof gardenContext>[0])
        break
      case "garden_search":
        result = gardenSearch(args as Parameters<typeof gardenSearch>[0])
        break
      case "garden_backlinks":
        result = gardenBacklinks(args as Parameters<typeof gardenBacklinks>[0])
        break
      case "garden_links":
        result = gardenLinks(args as Parameters<typeof gardenLinks>[0])
        break
      case "garden_tag_list":
        result = gardenTagList()
        break
      case "garden_tags":
        result = gardenTags(args as Parameters<typeof gardenTags>[0])
        break
      case "garden_files":
        result = gardenFiles(args as Parameters<typeof gardenFiles>[0])
        break
      case "garden_explore":
        result = gardenExplore(args as Parameters<typeof gardenExplore>[0])
        break
      case "garden_status":
        result = gardenStatus()
        break
      case "garden_unresolved_links":
        result = gardenUnresolvedLinks(args as Parameters<typeof gardenUnresolvedLinks>[0])
        break
      case "garden_orphans":
        result = gardenOrphans(args as Parameters<typeof gardenOrphans>[0])
        break
      case "garden_validate":
        result = gardenValidate(args as Parameters<typeof gardenValidate>[0])
        break
      case "garden_alias_map":
        result = gardenAliasMap(args as Parameters<typeof gardenAliasMap>[0])
        break
      default:
        throw new Error(`Unknown tool: ${name}`)
    }

    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] }
  })

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

async function main() {
  const cmd = process.argv[2] ?? "serve"

  switch (cmd) {
    case "init":
      initSchema()
      console.log("Schema initialized at .local/garden.db")
      break

    case "index": {
      initSchema()
      console.log("Indexing notes…")
      const count = await indexAll()
      console.log(`Indexed ${count} notes`)
      break
    }

    case "sync": {
      initSchema()
      console.log("Re-indexing (full sync)…")
      const count = await indexAll()
      console.log(`Synced ${count} notes`)
      break
    }

    case "serve":
      await serve()
      break

    default:
      console.error(`Unknown command: ${cmd}. Use: init | index | sync | serve`)
      process.exit(1)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
