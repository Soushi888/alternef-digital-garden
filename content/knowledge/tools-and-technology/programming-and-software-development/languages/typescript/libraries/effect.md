---
title: Effect
description: Powerful TypeScript framework for building robust, type-safe applications
subtitle: A functional approach to managing side effects, errors, and concurrency
aliases:
  - Effect Library
  - Effect-TS
tags:
  - typescript
  - library
  - functional-programming
  - error-handling
  - concurrency
related pages:
  - "[[knowledge/tools-and-technology/programming-and-software-development/languages/typescript/index|TypeScript]]"
  - "[[knowledge/tools-and-technology/programming-and-software-development/paradigms/functional-programming|Functional Programming]]"
---

Effect is a powerful, open-source framework designed to help developers build robust, scalable, and type-safe applications in TypeScript. It provides a functional programming approach to managing side effects, errors, concurrency, and asynchronous operations, effectively acting as a "missing standard library" for TypeScript. Inspired by libraries like ZIO from Scala, Effect aims to simplify complex workflows while leveraging TypeScript's type system to ensure safety and predictability.

## Key Features

### Effect System

At its core, Effect revolves around the `Effect<A, E, R>` type, where:
- `A` represents the success value (what the effect produces if it succeeds)
- `E` represents potential errors (typed and explicit)
- `R` represents the requirements or dependencies needed to run the effect (e.g., services or resources)

This structure allows developers to describe workflows declaratively, including their potential failures and dependencies, without executing them immediately.

### Error Handling

Effect embraces errors as a natural part of programming. It provides Rust-like error handling with typed errors, making it easy to manage failure cases explicitly rather than relying on untyped exceptions. You can compose error-handling logic seamlessly using built-in primitives.

### Concurrency and Asynchronous Programming

Effect offers tools like fibers (lightweight threads) and streams for structured concurrency, enabling developers to write asynchronous code that is both composable and safe. It avoids common pitfalls like deadlocks or race conditions.

### Composability

The library emphasizes composable abstractions, allowing developers to combine small, reusable building blocks into complex applications. This is achieved through a functional programming style, including utilities like `pipe` and generator-based syntax (`Effect.gen`).

### Standard Library Features

Effect fills gaps in TypeScript's ecosystem by providing data structures (e.g., `Option`, `Either`, `Chunk`) and utilities for common tasks like retries, resource management, and dependency injection, reducing reliance on external libraries like Lodash or RxJS.

### Type Safety

Built with TypeScript in mind, Effect leverages the compiler to catch errors at compile time, ensuring that workflows are predictable and robust.

## Example Usage

Here's a simple example of using Effect to fetch data with error handling:

```typescript
import { Effect, Console } from "effect";

// Define an effect that might succeed or fail
const fetchData = Effect.tryPromise({
  try: () => fetch("https://api.example.com/data").then(res => res.json()),
  catch: () => new Error("Failed to fetch data")
});

// Run the effect and handle the result
const program = fetchData.pipe(
  Effect.flatMap(data => Console.log("Data:", data)), // Success case
  Effect.catchAll(error => Console.log("Error:", error.message)) // Error case
);

// Execute the program
Effect.runPromise(program);
```

In this example:
- `Effect.tryPromise` wraps an asynchronous operation
- `pipe` chains operations to handle success (`flatMap`) or failure (`catchAll`)
- `Effect.runPromise` executes the effect and returns a Promise for integration with standard JavaScript

## When to Use Effect

- **Complex Applications**: Effect shines in large-scale projects where managing side effects, errors, and concurrency is critical
- **Functional Programming**: If you prefer a functional style or come from languages like Scala or Haskell, Effect's approach will feel familiar
- **Type-Safe Systems**: When you need strong guarantees about error handling and dependencies at compile time

## When to Avoid It

- **Small Projects**: For simple scripts or small apps, Effect's abstractions might introduce unnecessary complexity
- **Learning Curve**: It requires familiarity with functional programming concepts and its own API, which can be daunting for beginners or teams not ready to invest in learning it

## Community and Ecosystem

Effect is actively maintained by the team at **Effect-TS** and has a growing community. It's hosted on GitHub (`Effect-TS/effect`), with extensive documentation available at [effect.website](https://effect.website) and a supportive Discord community for discussions and help.

## Advanced Patterns

### Supervision and Fault Tolerance

Effect-TS enables implementing sophisticated fault-tolerance patterns inspired by proven distributed systems approaches:

- **[[effect-supervision-patterns|Supervision Patterns]]** - Implement Erlang-style supervision trees with Effect's Fiber and Scope systems
- **Structured Concurrency** - Hierarchical process management with automatic cleanup and resource management
- **Typed Error Recovery** - Explicit error handling strategies with compile-time safety guarantees

These patterns are particularly valuable for building resilient services that need to handle failures gracefully while maintaining system stability.

## Resources

[Effect - The Functional TypeScript Library](https://effect.website/)
> Build next-generation TypeScript applications that are type-safe, concurrent, and resilient. 