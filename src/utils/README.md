---
title: Alternef Digital Garden MCP Implementation
description: Documentation for the Model Context Protocol implementation for the Alternef Digital Garden
tags:
  - mcp
  - digital-garden
  - documentation
---

## Overview

This directory contains the Model Context Protocol (MCP) implementation for the Alternef Digital Garden. The MCP enables AI assistants to interact with the digital garden, providing tools for content creation, linking, and management.

## Files

- `model-context-protocol.ts`: Core functional implementation of the MCP
- `mcp-server.ts`: MCP server that exposes tools and resources to AI assistants
- `test-mcp.ts`: Test script to verify MCP functionality
- `mcp-plan.md`: Comprehensive plan for the MCP implementation

## Features

### Content Management

- Create notes with proper metadata structure
- Find related content based on tags
- Build bidirectional links between notes
- Generate the static site

### Knowledge Organization

The implementation supports the seven core knowledge domains:

1. Land and Nature Stewardship
2. Built Environment
3. Tools and Technology
4. Culture and Education
5. Health and Wellbeing
6. Finance and Economics
7. Governance and Community

## Usage

### Starting the MCP Server

```bash
# Navigate to the project root
cd /path/to/alternef-digital-garden

# Compile TypeScript files
bun run build

# Start the MCP server
bun run src/utils/mcp-server.ts
```

### Testing the Implementation

```bash
# Run the test script
bun run src/utils/test-mcp.ts
```

## Tools and Resources

### Resources

- `knowledgeDomains`: List of all knowledge domains
- `domainNotes`: List of all notes in a specific domain

### Tools

- `createNote`: Create a new note with proper metadata
- `linkNotes`: Create bidirectional links between notes
- `buildGarden`: Build the static site
- `findRelatedContent`: Find content related to specified tags

## Implementation Details

The MCP implementation follows functional programming principles using the fp-ts library. It leverages several key functional programming concepts:

### Functional Error Handling

The implementation uses the `TaskEither` monad from fp-ts to handle asynchronous operations that may fail:

```typescript
const ensureDomainDir = (domain: KnowledgeDomain): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    async () => {
      await fs.mkdir(path.join(KNOWLEDGE_DIR, domain), { recursive: true })
    },
    (reason) => new Error(`Failed to create domain directory: ${reason}`),
  )
```

### Function Composition

Operations are composed using the `pipe` function, allowing for clean and readable code:

```typescript
const ensureDirs = (): TE.TaskEither<Error, undefined> =>
  pipe(
    ensureKnowledgeDir(),
    TE.chain(() =>
      pipe(
        [...KnowledgeDomains],
        A.map(ensureDomainDir),
        TE.sequenceArray,
        TE.map(() => undefined),
      ),
    ),
  )
```

### Pure Functions

The implementation uses pure functions that don't rely on side effects, making the code more predictable and testable.

### Immutable Data Structures

Data is treated as immutable, with transformations creating new data rather than modifying existing data.

### Type Safety

The implementation leverages TypeScript's strong typing system along with fp-ts to ensure type safety throughout the codebase.

### Metadata Structure

Notes created through the MCP follow the project's metadata guidelines:

```markdown
---
title: Clear, descriptive title
description: Concise summary of the note's content
tags:
  - single-level-tag
---
```

### Linking Conventions

The implementation enforces the project's linking conventions, using full paths from the `knowledge` directory:

```markdown
[[knowledge/path/to/note|Display Name]]
```

## Future Enhancements

- Enhanced knowledge graph visualization
- Semantic search capabilities
- Automatic tag suggestion
- Content quality analysis
- Further functional refactoring of remaining imperative code
- Property-based testing for functional components
- Integration with functional reactive programming for real-time updates

## Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [fp-ts Documentation](https://gcanti.github.io/fp-ts/)
- [Functional Programming in TypeScript](https://github.com/gcanti/functional-programming)
- [TaskEither Documentation](https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html)
- [Zod Schema Validation](https://github.com/colinhacks/zod)
