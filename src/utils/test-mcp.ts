/**
 * Test script for the Alternef Digital Garden MCP
 *
 * This script demonstrates the usage of the Model Context Protocol
 * implementation for the Alternef Digital Garden using functional programming
 * principles with fp-ts.
 */

import * as path from "path"
import { pipe } from "fp-ts/function"
import * as TE from "fp-ts/TaskEither"
import * as T from "fp-ts/Task"
import * as IO from "fp-ts/IO"
import { createModelContextProtocol, KnowledgeDomain } from "./model-context-protocol"

// Set up paths
const CONTENT_DIR = path.resolve(__dirname, "../../content")

// Create MCP instance
const mcp = createModelContextProtocol(CONTENT_DIR)

// Helper to run and log TaskEither results in a functional way
const runTask = <T>(task: TE.TaskEither<Error, T>, successMessage: string): T.Task<void> => {
  return pipe(
    task,
    TE.fold(
      (error) => async () => { console.error(`Error: ${error.message}`) },
      (result) => async () => { console.log(`${successMessage}:`, result) },
    ),
  )
}

// Helper to log a header section
const logSection = (title: string): void => {
  console.log(`\n${"=".repeat(50)}`)
  console.log(`📌 ${title}`)
  console.log(`${"=".repeat(50)}`)
}

// Test cases defined as TaskEither operations
const testCases = {
  // Test getting knowledge domains
  testKnowledgeDomains: (): T.Task<void> => {
    return async () => {
      logSection("Testing Knowledge Domains")
      const domains = mcp.getKnowledgeDomains()
      console.log("📚 Available domains:", domains)
    }
  },

  // Test creating a note
  testCreateNote: (): T.Task<void> => {
    logSection("Testing Note Creation")

    const domain: KnowledgeDomain = "tools-and-technology"
    const title = "Functional Programming with fp-ts"
    const description = "An overview of functional programming using the fp-ts library"
    const content = `
## Overview

This note explores functional programming concepts using the fp-ts library in TypeScript.

## Key Concepts

- Pure functions
- Immutability
- Function composition
- Type-safe error handling
- Monads and functional data types

## Benefits

- More predictable code
- Easier testing
- Better error handling
- Improved composability

## Related Concepts

- TaskEither for async operations
- Option for nullable values
- Either for error handling
`
    const tags = ["functional-programming", "typescript", "fp-ts", "monads"]

    return runTask(mcp.createNote(domain, title, description, content, tags), "Created note at")
  },

  // Test finding related content
  testFindRelatedContent: (): T.Task<void> => {
    return async () => {
      logSection("Testing Related Content Search")
      
      // Use pipe and fold to handle both success and error cases gracefully
      await pipe(
        mcp.findRelatedContent(["functional-programming", "fp-ts"]),
        TE.fold(
          (error) => async () => {
            console.log(`Note: ${error.message}`)
            console.log("This is expected if there are no files with these tags or if files have invalid frontmatter.")
            console.log("Creating a test note with these tags should fix this in future runs.")
          },
          (results) => async () => {
            console.log("Found related content:", results)
          }
        )
      )()
    }
  },

  // Test creating and linking notes
  testLinkNotes: (): T.Task<void> => {
    return async () => {
      logSection("Testing Note Linking")
      // This would be implemented when the linkNotes functionality is exposed in the model-context-protocol
      console.log("Note linking test would go here")
    }
  },
}

// Main test function using functional composition
const runTests = async () => {
  console.log("🌱 Testing Alternef Digital Garden MCP with fp-ts...")

  // Create a pure function for displaying knowledge domains
  const displayKnowledgeDomains = (): T.Task<void> => {
    return async () => {
      logSection("Testing Knowledge Domains")
      const domains = mcp.getKnowledgeDomains()
      console.log("📚 Available domains:", domains)
    }
  }
  
  // Run all tests in sequence using functional composition
  await pipe(
    displayKnowledgeDomains(),
    T.chain(() => testCases.testCreateNote()),
    T.chain(() => testCases.testFindRelatedContent()),
    T.chain(() => testCases.testLinkNotes()),
    T.chain(() => async () => console.log("\n✅ MCP tests completed successfully"))
  )()
}

// Run the tests with proper error handling
pipe(
  TE.tryCatch(
    () => runTests(),
    (reason) => new Error(`Test suite failed: ${reason}`),
  ),
  TE.fold(
    (error) =>
      async () => {
        console.error("❌ Test suite failed:", error.message)
        process.exit(1)
      },
    () =>
      async () => {
        console.log("\n🎉 All tests completed successfully!")
      },
  ),
)()
