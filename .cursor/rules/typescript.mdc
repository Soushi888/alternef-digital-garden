---
description: When you work on the quartz features
globs: 
alwaysApply: false
---
# TypeScript Development Rules with Effect TS Integration

These guidelines promote robust, maintainable, and type-safe TypeScript development, emphasizing the use of the core `effect` package for managing effects, state, and errors.

## Quartz v4 Development

When working with the Quartz v4 codebase:

- Understand the plugin architecture (transformers, filters, emitters) and how `Effect` can model their operations.
- Follow existing patterns, integrating `Effect` for asynchronous tasks or error handling within plugins.
- Use TypeScript interfaces for plugin configuration.
- Respect the content processing pipeline, modeling complex transformations with `Effect` where appropriate.

## Code Style

- Use 2 spaces for indentation
- Use double quotes for strings
- Use semicolons at the end of statements
- Use trailing commas in multi-line object/array literals
- Keep line length under 100 characters
- Use descriptive variable and function names

## TypeScript & Effect Best Practices

- **Explicit Typing**: Use explicit types, especially for `Effect` signatures (`Effect<A, E, R>`).
- **Immutability**: Prefer immutable data structures. Use `effect/Data` for structurally comparable and immutable data.
- **Interfaces & Types**: Use interfaces for object shapes and type aliases for complex types, including effectful function signatures.
- **Generics**: Leverage generics for reusable components and functions, including those involving `Effect`.
- **Nominal Typing**: Use `Brand` from `effect/Brand` for enhanced type safety where applicable.
- **Absence/Failure**: Explicitly model potential absence or failure using `effect/Option` and `effect/Either` instead of null/undefined or throwing exceptions directly in domain logic.
- **Readonly**: Use `Readonly` and `ReadonlyArray` where appropriate.

## Effect-Oriented Programming with `effect`

Leverage the core `effect` package ([https://effect-ts.github.io/effect/](mdc:https:/effect-ts.github.io/effect)) as the primary tool for managing program execution:

- **Manage Side Effects**: Encapsulate *all* side effects (API calls, file system access, database interactions, logging, random number generation, date/time access) within `Effect` computations. Access environment services like `Clock`, `Random`, `Console` via the context `R`.
- **Error Handling**: Model errors explicitly in the `E` channel of `Effect<A, E, R>`. Use `Effect`'s error handling combinators (`Effect.catchTag`, `Effect.catchAll`, `Effect.either`, `Effect.try`) instead of traditional `try/catch` for recoverable errors.
- **Asynchronous Operations**: Model asynchronous operations declaratively using `Effect` combinators (`Effect.map`, `Effect.flatMap`, `Effect.zip`, `Effect.all`, etc.). Avoid raw Promises in application logic.
- **Concurrency**: Utilize `Effect`'s structured concurrency (`Effect.fork`, `Fiber`, `Effect.race`, `Effect.timeout`, `Effect.forkDaemon`) for managing concurrent operations safely and efficiently.
- **Resource Management**: Use `Scope` and scoped effects (`Effect.acquireRelease`, `Effect.scoped`) for safe and automatic resource acquisition and finalization (e.g., file handles, network connections, subscriptions).
- **Dependency Management**: Employ `Layer` for declarative, type-safe dependency injection. Define services using `Context` (`Tag`) and provide implementations via `Layer`.
- **State Management**: Use `Ref`, `SynchronizedRef`, `TRef` (within `STM`) for managing mutable state in a controlled, effectful way.
- **Caching**: Utilize `Cache` for efficient, effectful caching strategies with configurable policies.
- **Scheduling**: Use `Schedule` for complex retry logic, polling, or scheduled tasks.
- **Streaming**: Use `Stream` for processing sequences of data, potentially asynchronous or chunked.
- **Transactions**: Use `STM` (Software Transactional Memory) for composing atomic operations on shared state.

## Component Structure (Assuming Preact/Similar)

- Keep components small and focused.
- Use functional components.
- Separate effectful logic (data fetching, state updates) from pure presentation logic. Execute effects in response to events or lifecycle hooks.
- Manage component state using standard hooks (`useState`, `useReducer`) or integrate with effectful state management solutions if needed.
- Pass necessary services or configurations via props or context, potentially derived from `Layer`s executed at a higher level.

## Plugin Development

When creating or modifying Quartz plugins:

- Model the plugin's core logic as an `Effect` computation, clearly defining its requirements (`R`), potential errors (`E`), and success value (`A`).
- Use `Layer` to provide dependencies needed by the plugin's effect.
- Handle errors using `Effect`'s error channel and combinators.
- Leverage `Scope` for resource management if the plugin interacts with external resources.
- Test the core `Effect` logic independently.

## File Organization

- Group related functionality in directories
- Use index.ts files for exports
- Keep file names descriptive and consistent
- Use kebab-case for file names
- Use PascalCase for component names and interfaces/types
- Use camelCase for variables, functions, and methods

## Error Handling (Effect-Centric)

- **Explicit Errors**: Define domain-specific error types (e.g., using `Data.TaggedError`) and model them in the `E` channel of `Effect`.
- **Combinators**: Prefer `Effect.catchTag`, `Effect.catchAll`, `Effect.retry`, `Effect.orElse` over `try/catch` for handling expected/recoverable errors within effectful code.
- **Logging**: Use `Effect.log` functions for contextual logging integrated with the Effect runtime.
- **Fatal Errors**: Let unexpected/unrecoverable errors propagate as defects in the `Cause` (handled by the Runtime).

## Performance Considerations

- Utilize `Cache` from `effect` for memoizing effectful computations.
- Analyze performance using `Effect`'s built-in tracing and metrics capabilities.
- Optimize `Effect` pipelines by minimizing unnecessary computations or concurrency.
- Standard frontend optimizations (minimizing DOM manipulations, lazy loading) still apply.

## Testing

- **Unit Test Effects**: Test `Effect` workflows directly using `Effect.runPromise`, `Effect.runSyncExit`, etc.
- **Dependency Mocking**: Provide test implementations of services using `Layer.succeed` or `Layer.effect`.
- **Test Services**: Utilize `@effect/vitest` or `TestServices` like `TestClock`, `TestConsole`, `TestRandom` for deterministic testing of time-dependent or effectful code.
- Test success, error, and defect channels of effects.

## TypeScript Best Practices

- Use explicit typing rather than relying on inference when intent isn't clear
- Use interfaces for object shapes
- Use type aliases for complex types
- Use generics for reusable components
- Use readonly for immutable properties
- Use optional properties with care

## Component Structure

- Keep components small and focused
- Use functional components
- Separate logic from presentation
- Use proper TypeScript interfaces for props
- Document complex logic with comments

## Plugin Development

When creating or modifying Quartz plugins:

- Follow the plugin interface definitions
- Implement proper error handling
- Document the plugin's purpose and configuration options
- Test thoroughly with different content types
- Consider performance implications

## Error Handling

- Use try/catch blocks for error-prone operations
- Provide meaningful error messages
- Log errors appropriately
- Fail gracefully when possible

## Performance Considerations

- Minimize DOM manipulations
- Use memoization for expensive calculations
- Avoid unnecessary re-renders
- Consider lazy loading for large components
- Profile and optimize critical paths

## Testing

- Write unit tests for critical functionality
- Test edge cases
- Use meaningful test descriptions
- Mock external dependencies
- Keep tests independent and isolated 