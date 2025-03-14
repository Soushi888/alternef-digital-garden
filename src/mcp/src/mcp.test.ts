/**
 * Test script for the Alternef Digital Garden MCP
 *
 * This script demonstrates the usage of the Model Context Protocol
 * implementation for the Alternef Digital Garden using Bun's testing framework.
 */

// Add type declaration for bun:test
/// <reference types="bun-types" />

import { describe, it, expect, beforeAll, afterAll } from "bun:test"
import * as path from "path"
import { Effect } from "effect"
import * as fs from "fs/promises"
import { createModelContextProtocol, type KnowledgeDomain } from "./model-context-protocol"

// Set up paths
const CONTENT_DIR = path.resolve(__dirname, "../../content")
const TEST_DOMAIN: KnowledgeDomain = "tools-and-technology"
const TEST_NOTE_TITLE = "Functional Programming with Effect"
const TEST_NOTE_PATH = path.join(
  CONTENT_DIR,
  "knowledge",
  TEST_DOMAIN,
  `${TEST_NOTE_TITLE.toLowerCase().replace(/\s+/g, "-")}.md`,
)

// Create MCP instance
const mcp = createModelContextProtocol(CONTENT_DIR)

// Helper to log a header section
const logSection = (title: string): void => {
  console.log(`\n${"=".repeat(50)}`)
  console.log(`📌 ${title}`)
  console.log(`${"=".repeat(50)}`)
}

// Test note content
const testNoteContent = `
## Overview

This note explores functional programming concepts using the Effect library in TypeScript.

## Key Concepts

- Pure functions
- Immutability
- Function composition
- Type-safe error handling
- Effect system

## Benefits

- More predictable code
- Easier testing
- Better error handling
- Improved composability

## Related Concepts

- Effect for async operations
- Option for nullable values
- Either for error handling
`

// Clean up test files after tests
const cleanupTestFiles = async () => {
  try {
    // Check if the test note exists before attempting to delete
    await fs.access(TEST_NOTE_PATH)
    await fs.unlink(TEST_NOTE_PATH)
    console.log(`Cleaned up test note: ${TEST_NOTE_PATH}`)
  } catch (error) {
    // File doesn't exist, no need to clean up
  }
}

describe("Alternef Digital Garden MCP", () => {
  // Clean up any existing test files before running tests
  beforeAll(async () => {
    logSection("Setting up test environment")
    await cleanupTestFiles()
  })

  // Clean up test files after all tests complete
  afterAll(async () => {
    logSection("Cleaning up test environment")
    await cleanupTestFiles()
  })

  it("should retrieve knowledge domains", () => {
    logSection("Testing Knowledge Domains")

    const domains = mcp.getKnowledgeDomains()

    console.log("📚 Available domains:", domains)
    expect(domains).toBeArray()
    expect(domains.length).toBeGreaterThan(0)
    expect(domains).toContain("tools-and-technology")
  })

  it("should create a note", async () => {
    logSection("Testing Note Creation")

    const description = "An overview of functional programming using the Effect library"
    const tags = ["functional-programming", "typescript", "effect", "monads"]

    const result = await Effect.runPromise(
      mcp.createNote(TEST_DOMAIN, TEST_NOTE_TITLE, description, testNoteContent, tags),
    )

    console.log("Created note at:", result)
    expect(result).toBeString()
    expect(result).toContain(TEST_DOMAIN)
    expect(result).toContain(TEST_NOTE_TITLE.toLowerCase().replace(/\s+/g, "-"))

    // Verify the file exists
    const fileExists = await Effect.runPromise(
      Effect.tryPromise({
        try: async () => {
          await fs.access(result)
          return true
        },
        catch: () => false,
      }),
    )

    expect(fileExists).toBeTrue()
  })

  it("should find related content", async () => {
    logSection("Testing Related Content Search")

    // First ensure we have a note with the tags we're searching for
    const description = "An overview of functional programming using the Effect library"
    const tags = ["functional-programming", "typescript", "effect", "monads"]

    // Create the note if it doesn't exist yet
    try {
      await fs.access(TEST_NOTE_PATH)
    } catch {
      await Effect.runPromise(
        mcp.createNote(TEST_DOMAIN, TEST_NOTE_TITLE, description, testNoteContent, tags),
      )
    }

    // Now search for related content
    const results = await Effect.runPromise(
      mcp.findRelatedContent(["functional-programming", "effect"]),
    )

    console.log("Found related content:", results)
    expect(results).toBeArray()

    // We should find at least the note we just created
    const foundTestNote = results.some((path) =>
      path.includes(TEST_NOTE_TITLE.toLowerCase().replace(/\s+/g, "-")),
    )
    expect(foundTestNote).toBeTrue()
  })

  it("should handle bidirectional linking between notes", async () => {
    logSection("Testing Note Linking")

    // This is a placeholder test for when the linkNotes functionality is fully exposed
    // in the model-context-protocol

    // For now, we'll just verify the function exists
    expect(typeof mcp.createBidirectionalLink).toBe("function")

    console.log("Note linking test would be implemented here")
  })
})
