---
title: Alternef Digital Garden MCP Server Implementation Guide
description: A comprehensive guide for developing a Model Context Protocol (MCP) server to manage the Alternef Digital Garden using Bun
tags:
  - mcp
  - digital-garden
  - knowledge-management
  - bun
related pages:
  - "[[tools-and-technology/specialized-technologies/artificial-intelligence/protocols/model-context-protocol]]"
---

## Overview

### What We're Building

We're creating an MCP server to help manage an Alternef Digital Garden—a sophisticated personal knowledge management system built on Quartz v4, designed to interconnect knowledge across seven core domains. The server will offer tools and resources to create, update, link, and build notes, all while keeping things general enough for any AI to use.

## Core Concepts

### Alternef Digital Garden

- A static site made from Markdown files
- Linked with [[wikilinks]]
- Built with `bun quartz build`
- Often paired with Obsidian for note-taking

### Model Context Protocol (MCP)

- A protocol that enables AIs to interact with external tools and data
- Exposes garden-managing capabilities
- Provides a standardized interface for content manipulation

## Project Structure

### Seven Core Knowledge Domains

1. Land and Nature Stewardship
2. Built Environment
3. Tools and Technology
4. Culture and Education
5. Health and Wellbeing
6. Finance and Economics
7. Governance and Community

## Technical Implementation

### Environment Setup

#### Prerequisites

- Bun installed (latest version)
- TypeScript support
- MCP SDK compatibility

#### Project Initialization

```bash
# Create project directory
mkdir alternef-mcp-server
cd alternef-mcp-server

# Initialize Bun project
bun init -y

# Install TypeScript and type definitions
bun add -d typescript @types/bun

# Install MCP SDK
bun add @modelcontextprotocol/sdk
```

#### TypeScript Configuration

Create a `tsconfig.json` with Bun-specific settings:

```json
{
  "compilerOptions": {
    "lib": ["ESNext"],
    "target": "es2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

### Content Directory Structure

``` text
content/
├── about-me.md
├── blog/
├── knowledge/
│   ├── land-and-nature-stewardship/
│   ├── built-environment/
│   ├── tools-and-technology/
│   ├── culture-and-education/
│   ├── health-and-wellbeing/
│   ├── finance-and-economics/
│   └── governance-and-community/
└── portfolio/
```

## Development Workflow

### Running the Server

```bash
# Compile TypeScript
bun run build

# Start the MCP server
bun run server.ts
```

### Dependency Management

- Use `bun add` for installing packages
- `bun.lockb` for lockfile management
- Built-in TypeScript and JavaScript support

## MCP Server Tools

### 1. Note Creation

- Enforce metadata guidelines
- Validate tag structure
- Ensure consistent filename conventions

#### Parameters

- `title`: Note title
- `description`: Concise note summary
- `domain`: Target knowledge domain
- `tags`: Root-level tags
- `content`: Markdown content

### 2. Linking Mechanism

- Implement bidirectional link tracking
- Validate link consistency
- Enforce full path linking convention

#### Parameters

- `sourceNote`: Full path from 'knowledge/' directory
- `targetNote`: Full path from 'knowledge/' directory
- `linkType`: Link classification (optional)

### 3. Metadata Enrichment

- Automatic tag generation
- Relationship inference
- Content type classification

## Bun-Specific Advantages

### Performance Benefits

- Faster package management
- Quick startup times
- Native TypeScript support
- Built-in test runner
- Improved runtime performance

### Runtime Characteristics

- Uses JavaScriptCore instead of V8
- First-class TypeScript support
- Integrated package manager
- Simplified dependency resolution

## Implementation Guidelines

### Coding Principles

- Favor functional programming paradigms
- Leverage Bun's native TypeScript support
- Maintain immutability
- Implement comprehensive error handling
- Write self-documenting code

### Documentation Standards

- Follow existing project markdown guidelines
- Maintain consistent metadata structure
- Use wikilinks for internal references
- Avoid redundant first-level headers

## Deployment Workflow

1. Content Creation
2. Metadata Validation
3. Link Verification
4. Static Site Generation with Bun
5. GitHub Pages Deployment

## Future Roadmap

- Enhanced Bun plugin support
- Optimize MCP server with Bun runtime
- Improved TypeScript type inference
- Semantic search capabilities
- Cross-domain knowledge mapping

## Conclusion

The Alternef Digital Garden MCP server, powered by Bun, provides a robust, high-performance framework for managing a complex, interconnected knowledge ecosystem.

## Tips for AI Collaborators

- Explore Bun's unique features
- Utilize built-in TypeScript capabilities
- Implement robust error handling
- Refer to Bun and MCP documentation

## Resources

- [Bun Documentation](https://bun.sh)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Example Implementation

``` typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import *as fs from "fs/promises";
import* as path from "path";
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

// Set up paths (adjustable for reusability)
const GARDEN_DIR = path.join(process.cwd(), "content");
const KNOWLEDGE_DIR = path.join(GARDEN_DIR, "knowledge");

// Ensure directories exist
async function ensureDirs() {
  await fs.mkdir(KNOWLEDGE_DIR, { recursive: true });
}

// Initialize the MCP server
const server = new McpServer({
  name: "alternef-garden-manager",
  version: "1.0.0",
  description: "Manage an Alternef Digital Garden with reusable tools",
});

// Resource: List all notes
server.addResource({
  name: "gardenNotes",
  description: "List of all note titles in the Alternef Digital Garden",
  fetch: async () => {
    await ensureDirs();
    const files = await fs.readdir(KNOWLEDGE_DIR);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(".md", ""));
  },
});

// Tool: Create a new note
server.addTool({
  name: "createNote",
  description: "Create a new note in the Alternef Digital Garden",
  parameters: {
    type: "object",
    properties: {
      title: { type: "string", description: "Title of the note" },
      description: { type: "string", description: "Description of the note" },
      domain: { type: "string", description: "One of the seven core domains" },
      tags: {
        type: "array",
        items: { type: "string" },
        description: "Root-level tags only",
      },
      content: { type: "string", description: "Content of the note" },
    },
    required: ["title", "description", "domain", "content"],
  },
  execute: async ({ title, description, domain, tags = [], content }) => {
    await ensureDirs();
    const filename = title.toLowerCase().replace(/\s+/g, "-") + ".md";
    const filepath = path.join(KNOWLEDGE_DIR, domain, filename);
    const frontMatter = tags.length
      ? `---\ntags: [${tags.join(", ")}]\n---\n\n`
      : "";
    await fs.writeFile(filepath, frontMatter + content);
    return `Created note: ${title}`;
  },
});

// Tool: Link two notes
server.addTool({
  name: "linkNotes",
  description: "Add a wikilink between two notes",
  parameters: {
    type: "object",
    properties: {
      sourceNote: { type: "string", description: "Full path from 'knowledge/' directory" },
      targetNote: { type: "string", description: "Full path from 'knowledge/' directory" },
      linkType: { type: "string", description: "Type of link (related or reference)" },
    },
    required: ["sourceNote", "targetNote"],
  },
  execute: async ({ sourceNote, targetNote, linkType }) => {
    await ensureDirs();
    const sourceFile = path.join(KNOWLEDGE_DIR, sourceNote);
    const targetFile = path.join(KNOWLEDGE_DIR, targetNote);
    if (!(await fs.stat(sourceFile).catch(() => false))) {
      throw new Error(`Note "${sourceNote}" not found`);
    }
    const content = await fs.readFile(sourceFile, "utf-8");
    if (!content.includes(`[[${targetNote}]]`)) {
      await fs.appendFile(sourceFile, `\n[[${targetNote}]]`);
    }
    return `Linked ${sourceNote} to ${targetNote}`;
  },
});

// Tool: Build the Quartz site
server.addTool({
  name: "buildGarden",
  description: "Build the Alternef Digital Garden website",
  parameters: { type: "object", properties: {} },
  execute: async () => {
    await ensureDirs();
    try {
      await execAsync("bun quartz build", { cwd: GARDEN_DIR });
      return "Quartz site built successfully";
    } catch (error) {
      throw new Error(`Build failed: ${error.message}`);
    }
  },
});

// Start the server with stdio transport
const transport = new StdioServerTransport(server);
transport.start();

console.log("Alternef Garden MCP Server is up and running!");
```
