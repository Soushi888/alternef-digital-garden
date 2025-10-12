---
title: "Effect-TS Supervision Patterns"
aliases:
  - Effect Supervision Tree
  - Effect Fault Tolerance
  - Erlang Patterns in Effect
  - Supervision Patterns in TypeScript
tags:
  - typescript
  - effect-ts
  - supervision-tree
  - fault-tolerance
  - functional-programming
  - erlang
  - distributed-systems
  - concurrency
  - error-handling
created: 2025-09-12
modified: 2025-09-12
draft: false
---

# Effect-TS Supervision Patterns

The [[supervision-tree|Supervision Tree]] pattern from [[knowledge/tools-and-technology/programming-and-software-development/languages/erlang|Erlang/OTP]] can be effectively reproduced in [[effect|Effect-TS]] using its powerful concurrency primitives and structured resource management. This approach brings Erlang's proven fault-tolerance patterns to the TypeScript ecosystem with the added benefits of static typing and Effect's composable architecture.

## Core Concepts Translation

### Erlang Supervisor → Effect Fiber + Scope

Effect-TS provides several key primitives that map well to Erlang's supervision concepts:

- **Effect Fibers**: Lightweight concurrent processes similar to Erlang processes
- **Scopes**: Lifecycle management and automatic resource cleanup
- **Structured Concurrency**: Hierarchical process supervision with guaranteed cleanup
- **Typed Errors**: Explicit error handling instead of Erlang's "let it crash" philosophy

| Erlang/OTP Concept | Effect-TS Equivalent | Key Benefit |
|-------------------|---------------------|-------------|
| Process | Fiber | Structured concurrency with automatic cleanup |
| Supervisor | Scope + restart logic | Type-safe resource management |
| Process linking | Fiber interruption | Hierarchical cancellation |
| Monitor | Fiber.await + error handling | Typed error propagation |
| Let it crash | Effect.catchAll + restart | Explicit error handling with recovery |

## Basic Supervisor Implementation

```typescript
import { Effect, Fiber, Scope, Exit, Cause, Console } from "effect"

// Define a supervised child process
const childProcess = (id: string) =>
  Effect.gen(function* (_) {
    yield* _(Console.log(`Child ${id} starting`))
    
    // Simulate work with potential failure
    yield* _(Effect.sleep("1 second"))
    
    if (Math.random() < 0.3) {
      yield* _(Effect.fail(`Child ${id} failed`))
    }
    
    yield* _(Effect.sleep("2 seconds"))
    yield* _(Console.log(`Child ${id} completed`))
    return `Result from ${id}`
  })

// Basic supervisor that manages child processes
const basicSupervisor = Effect.gen(function* (_) {
  const scope = yield* _(Scope.make())
  
  // Start multiple children concurrently
  const children = yield* _(
    Effect.all([
      Effect.forkIn(childProcess("A"), scope),
      Effect.forkIn(childProcess("B"), scope),
      Effect.forkIn(childProcess("C"), scope)
    ])
  )
  
  // Wait for all children and handle failures
  const results = yield* _(
    Effect.all(
      children.map(fiber => Fiber.await(fiber)),
      { concurrency: "unbounded" }
    )
  )
  
  return results
})
```

## Supervision Strategies

### One-for-One Strategy

When a child process fails, only that specific process is restarted, similar to Erlang's `one_for_one` strategy:

```typescript
const oneForOneStrategy = <E, A>(
  childFactory: () => Effect.Effect<A, E>,
  maxRestarts: number = 3
) =>
  Effect.gen(function* (_) {
    let restarts = 0
    
    const startChild = (): Effect.Effect<A, E> =>
      Effect.gen(function* (_) {
        const result = yield* _(
          childFactory().pipe(
            Effect.catchAll(error => {
              if (restarts < maxRestarts) {
                restarts++
                yield* _(Console.log(`Restarting child, attempt ${restarts}`))
                return startChild()
              }
              return Effect.fail(error)
            })
          )
        )
        return result
      })
    
    return yield* _(startChild())
  })

// Usage example
const supervisedChild = oneForOneStrategy(
  () => childProcess("supervised-worker"),
  5 // Allow up to 5 restarts
)
```

### One-for-All Strategy

When any child fails, all children are terminated and restarted together:

```typescript
const oneForAllStrategy = <E, A>(
  children: Array<() => Effect.Effect<A, E>>
) =>
  Effect.gen(function* (_) {
    const scope = yield* _(Scope.make())
    
    const restartAll = (): Effect.Effect<A[], E> =>
      Effect.gen(function* (_) {
        // Fork all children
        const fibers = yield* _(
          Effect.all(
            children.map(child => Effect.forkIn(child(), scope))
          )
        )
        
        // Wait for all to complete or any to fail
        const results = yield* _(
          Effect.all(
            fibers.map(fiber => Fiber.await(fiber))
          ).pipe(
            Effect.catchAll(error => {
              yield* _(Console.log("One child failed, restarting all"))
              // Close current scope and restart
              return Effect.zipRight(
                Scope.close(scope, Exit.unit),
                restartAll()
              )
            })
          )
        )
        
        return results
      })
    
    return yield* _(restartAll())
  })
```

### Rest-for-One Strategy

When a child fails, that child and all children started after it are restarted:

```typescript
const restForOneStrategy = <E, A>(
  children: Array<() => Effect.Effect<A, E>>
) =>
  Effect.gen(function* (_) {
    const startFromIndex = (startIndex: number): Effect.Effect<A[], E> =>
      Effect.gen(function* (_) {
        const scope = yield* _(Scope.make())
        const childrenToStart = children.slice(startIndex)
        
        const fibers = yield* _(
          Effect.all(
            childrenToStart.map(child => Effect.forkIn(child(), scope))
          )
        )
        
        // Monitor all fibers, restart from failed index
        const results = yield* _(
          Effect.all(
            fibers.map((fiber, index) => 
              Fiber.await(fiber).pipe(
                Effect.catchAll(error => {
                  yield* _(Console.log(`Child at index ${startIndex + index} failed, restarting rest`))
                  yield* _(Scope.close(scope, Exit.unit))
                  return startFromIndex(startIndex + index)
                })
              )
            )
          ).pipe(Effect.flatten)
        )
        
        return results
      })
    
    return yield* _(startFromIndex(0))
  })
```

## Advanced Supervisor Configuration

### Supervisor with Restart Limits and Windows

```typescript
interface SupervisorConfig {
  maxRestarts: number
  restartWindow: number // milliseconds
  strategy: "one_for_one" | "one_for_all" | "rest_for_one"
}

const createSupervisor = <E, A>(
  config: SupervisorConfig,
  children: Array<() => Effect.Effect<A, E>>
) =>
  Effect.gen(function* (_) {
    const restartCounts = new Map<number, number>()
    const lastRestartTimes = new Map<number, number>()
    
    const shouldRestart = (childId: number): boolean => {
      const now = Date.now()
      const lastRestart = lastRestartTimes.get(childId) || 0
      const restartCount = restartCounts.get(childId) || 0
      
      // Reset counter if outside restart window
      if (now - lastRestart > config.restartWindow) {
        restartCounts.set(childId, 0)
        return true
      }
      
      return restartCount < config.maxRestarts
    }
    
    const superviseChild = (childId: number, childFactory: () => Effect.Effect<A, E>) =>
      Effect.gen(function* (_) {
        const runChild = (): Effect.Effect<A, E> =>
          childFactory().pipe(
            Effect.catchAll(error => {
              if (shouldRestart(childId)) {
                const currentCount = restartCounts.get(childId) || 0
                restartCounts.set(childId, currentCount + 1)
                lastRestartTimes.set(childId, Date.now())
                
                yield* _(Console.log(`Restarting child ${childId}`))
                return Effect.zipRight(
                  Effect.sleep("100 millis"), // Brief delay before restart
                  runChild()
                )
              }
              
              yield* _(Console.log(`Child ${childId} exceeded restart limit`))
              return Effect.fail(error)
            })
          )
        
        return yield* _(runChild())
      })
    
    // Start all supervised children
    return yield* _(
      Effect.all(
        children.map((child, index) => 
          Effect.fork(superviseChild(index, child))
        ),
        { concurrency: "unbounded" }
      ).pipe(
        Effect.flatMap(fibers => 
          Effect.all(fibers.map(Fiber.await))
        )
      )
    )
  })
```

## Resource-Aware Supervision

### Supervisor with Proper Resource Management

```typescript
// Supervisor that manages resources properly
const resourceAwareSupervisor = Effect.gen(function* (_) {
  yield* _(Effect.acquireUseRelease(
    // Acquire: Set up supervision infrastructure
    Effect.gen(function* (_) {
      const scope = yield* _(Scope.make())
      yield* _(Console.log("Supervisor starting"))
      return scope
    }),
    
    // Use: Run supervised processes
    (scope) => Effect.gen(function* (_) {
      const children = [
        () => childProcess("supervised-1"),
        () => childProcess("supervised-2"),
        () => childProcess("supervised-3")
      ]
      
      return yield* _(createSupervisor({
        maxRestarts: 3,
        restartWindow: 5000,
        strategy: "one_for_one"
      }, children))
    }),
    
    // Release: Clean up resources
    (scope) => Effect.gen(function* (_) {
      yield* _(Scope.close(scope, Exit.unit))
      yield* _(Console.log("Supervisor shutting down"))
    })
  ))
})
```

### Service Integration Pattern

```typescript
import { Context, Layer } from "effect"

// Define a service interface
interface DatabaseService {
  readonly query: (sql: string) => Effect.Effect<unknown[], Error>
}

const DatabaseService = Context.GenericTag<DatabaseService>("@app/DatabaseService")

// Supervised service implementation
const DatabaseServiceLive = Layer.effect(
  DatabaseService,
  Effect.gen(function* (_) {
    // Create supervised connection pool
    const connectionPool = yield* _(
      createSupervisor(
        {
          maxRestarts: 5,
          restartWindow: 30000,
          strategy: "one_for_one"
        },
        [
          () => createDatabaseConnection("connection-1"),
          () => createDatabaseConnection("connection-2"),
          () => createDatabaseConnection("connection-3")
        ]
      )
    )
    
    return {
      query: (sql: string) =>
        Effect.gen(function* (_) {
          // Use supervised connection pool
          const result = yield* _(
            Effect.tryPromise({
              try: () => executeQuery(connectionPool, sql),
              catch: (error) => new Error(`Query failed: ${error}`)
            })
          )
          return result
        })
    }
  })
)

const createDatabaseConnection = (id: string) =>
  Effect.gen(function* (_) {
    yield* _(Console.log(`Creating database connection: ${id}`))
    // Simulate connection setup
    yield* _(Effect.sleep("500 millis"))
    return { id, connected: true }
  })

const executeQuery = (pool: unknown, sql: string): Promise<unknown[]> => {
  // Simulate query execution
  return Promise.resolve([{ result: "data" }])
}
```

## Dynamic Supervision Patterns

### Simple-One-for-One Equivalent

Effect-TS equivalent of Erlang's `simple_one_for_one` strategy for dynamic children:

```typescript
const dynamicSupervisor = <Args, E, A>(
  childFactory: (args: Args) => Effect.Effect<A, E>,
  maxChildren: number = 1000
) =>
  Effect.gen(function* (_) {
    const scope = yield* _(Scope.make())
    const childrenCount = { current: 0 }
    
    const startChild = (args: Args) =>
      Effect.gen(function* (_) {
        if (childrenCount.current >= maxChildren) {
          yield* _(Effect.fail(new Error("Maximum children limit reached")))
        }
        
        childrenCount.current++
        
        const fiber = yield* _(
          Effect.forkIn(
            childFactory(args).pipe(
              Effect.ensuring(
                Effect.sync(() => { childrenCount.current-- })
              )
            ),
            scope
          )
        )
        
        return fiber
      })
    
    const stopChild = (fiber: Fiber.Fiber<A, E>) =>
      Effect.gen(function* (_) {
        yield* _(Fiber.interrupt(fiber))
      })
    
    const getChildrenCount = Effect.sync(() => childrenCount.current)
    
    return {
      startChild,
      stopChild,
      getChildrenCount,
      shutdown: Scope.close(scope, Exit.unit)
    }
  })

// Usage example
const taskSupervisor = yield* _(
  dynamicSupervisor(
    (taskData: { id: string, work: string }) =>
      Effect.gen(function* (_) {
        yield* _(Console.log(`Processing task ${taskData.id}: ${taskData.work}`))
        yield* _(Effect.sleep("2 seconds"))
        return `Completed ${taskData.id}`
      }),
    100 // max 100 concurrent tasks
  )
)

// Start dynamic tasks
const task1 = yield* _(taskSupervisor.startChild({ id: "1", work: "data processing" }))
const task2 = yield* _(taskSupervisor.startChild({ id: "2", work: "file upload" }))
```

## Error Handling and Observability

### Comprehensive Error Tracking

```typescript
import { Ref, Metric } from "effect"

interface SupervisorMetrics {
  totalRestarts: Ref.Ref<number>
  childFailures: Ref.Ref<Map<string, number>>
  lastFailureTime: Ref.Ref<number>
}

const createMetrics = Effect.gen(function* (_) {
  const totalRestarts = yield* _(Ref.make(0))
  const childFailures = yield* _(Ref.make(new Map<string, number>()))
  const lastFailureTime = yield* _(Ref.make(0))
  
  return { totalRestarts, childFailures, lastFailureTime }
})

const observableSupervisor = <E, A>(
  children: Array<{ id: string; factory: () => Effect.Effect<A, E> }>
) =>
  Effect.gen(function* (_) {
    const metrics = yield* _(createMetrics)
    
    const superviseWithMetrics = (child: { id: string; factory: () => Effect.Effect<A, E> }) =>
      Effect.gen(function* (_) {
        const runChild = (): Effect.Effect<A, E> =>
          child.factory().pipe(
            Effect.catchAll(error => {
              return Effect.gen(function* (_) {
                // Update metrics
                yield* _(Ref.update(metrics.totalRestarts, n => n + 1))
                yield* _(Ref.update(metrics.lastFailureTime, _ => Date.now()))
                yield* _(
                  Ref.update(metrics.childFailures, map => {
                    const current = map.get(child.id) || 0
                    map.set(child.id, current + 1)
                    return map
                  })
                )
                
                yield* _(Console.log(`Child ${child.id} failed: ${error}`))
                
                // Restart with exponential backoff
                const failures = yield* _(
                  Ref.get(metrics.childFailures).pipe(
                    Effect.map(map => map.get(child.id) || 0)
                  )
                )
                
                const backoffMs = Math.min(1000 * Math.pow(2, failures), 30000)
                yield* _(Effect.sleep(`${backoffMs} millis`))
                
                return runChild()
              })
            })
          )
        
        return yield* _(runChild())
      })
    
    // Start all supervised children
    const results = yield* _(
      Effect.all(
        children.map(child => Effect.fork(superviseWithMetrics(child))),
        { concurrency: "unbounded" }
      ).pipe(
        Effect.flatMap(fibers => Effect.all(fibers.map(Fiber.await)))
      )
    )
    
    return { results, metrics }
  })
```

## Architecture Patterns

### Web Service Supervision Pattern

```typescript
// Supervision hierarchy for a web service
const webServiceSupervisor = Effect.gen(function* (_) {
  const appScope = yield* _(Scope.make())
  
  // HTTP server supervisor
  const httpSupervisor = yield* _(Effect.forkIn(
    createSupervisor(
      { maxRestarts: 3, restartWindow: 10000, strategy: "one_for_all" },
      [
        () => httpListener("0.0.0.0", 8080),
        () => requestHandler(),
        () => responseFormatter()
      ]
    ),
    appScope
  ))
  
  // Database supervisor (independent from HTTP)
  const dbSupervisor = yield* _(Effect.forkIn(
    createSupervisor(
      { maxRestarts: 5, restartWindow: 30000, strategy: "one_for_one" },
      [
        () => databaseConnection("primary"),
        () => databaseConnection("replica-1"),
        () => databaseConnection("replica-2")
      ]
    ),
    appScope
  ))
  
  // Background jobs supervisor
  const jobsSupervisor = yield* _(Effect.forkIn(
    dynamicSupervisor(
      (job: { type: string; payload: unknown }) => processJob(job),
      50 // max 50 concurrent jobs
    ),
    appScope
  ))
  
  return {
    httpSupervisor,
    dbSupervisor,
    jobsSupervisor,
    shutdown: Scope.close(appScope, Exit.unit)
  }
})

// Mock implementations
const httpListener = (host: string, port: number) =>
  Effect.gen(function* (_) {
    yield* _(Console.log(`HTTP listener starting on ${host}:${port}`))
    // Simulate server running
    yield* _(Effect.never) // Keep running until interrupted
  })

const requestHandler = () =>
  Effect.gen(function* (_) {
    yield* _(Console.log("Request handler ready"))
    yield* _(Effect.never)
  })

const responseFormatter = () =>
  Effect.gen(function* (_) {
    yield* _(Console.log("Response formatter ready"))
    yield* _(Effect.never)
  })

const databaseConnection = (id: string) =>
  Effect.gen(function* (_) {
    yield* _(Console.log(`Database connection ${id} establishing`))
    yield* _(Effect.sleep("1 second"))
    yield* _(Console.log(`Database connection ${id} ready`))
    yield* _(Effect.never)
  })

const processJob = (job: { type: string; payload: unknown }) =>
  Effect.gen(function* (_) {
    yield* _(Console.log(`Processing job: ${job.type}`))
    yield* _(Effect.sleep("5 seconds"))
    return `Job ${job.type} completed`
  })
```

## Key Differences from Erlang

### 1. Error Handling Philosophy

**Erlang**: "Let it crash" - embrace failures and let supervisors handle recovery
```erlang
% Erlang - simple worker that crashes
worker_loop() ->
    receive
        {work, Data} ->
            process_data(Data),  % May crash
            worker_loop()
    end.
```

**Effect-TS**: Explicit typed error handling with recovery strategies
```typescript
const effectWorker = Effect.gen(function* (_) {
  const data = yield* _(receiveWork())
  
  const result = yield* _(
    processData(data).pipe(
      Effect.catchTag("ProcessingError", error => 
        // Explicit error handling
        handleProcessingError(error)
      ),
      Effect.retry(Schedule.exponential("1 second"))
    )
  )
  
  return result
})
```

### 2. Resource Management

**Erlang**: Manual resource cleanup in terminate callbacks
**Effect-TS**: Automatic resource cleanup through Scope system

```typescript
const resourceManagedWorker = Effect.gen(function* (_) {
  yield* _(Effect.acquireUseRelease(
    acquireDatabase(), // Acquire resource
    database => doWork(database), // Use resource
    database => database.close() // Automatic cleanup
  ))
})
```

### 3. Type Safety

**Erlang**: Runtime type checking and pattern matching
**Effect-TS**: Compile-time type checking with full type inference

```typescript
// All error types are known at compile time
type WorkerError = 
  | { _tag: "DatabaseError"; cause: string }
  | { _tag: "ValidationError"; field: string }
  | { _tag: "NetworkError"; status: number }

const typedWorker: Effect.Effect<string, WorkerError> = 
  Effect.gen(function* (_) {
    // TypeScript ensures all error cases are handled
    const result = yield* _(dangerousOperation().pipe(
      Effect.catchTags({
        DatabaseError: error => handleDbError(error),
        ValidationError: error => handleValidationError(error),
        NetworkError: error => handleNetworkError(error)
      })
    ))
    
    return result
  })
```

## Performance Considerations

### Fiber vs OS Thread Overhead

```typescript
// Effect fibers are extremely lightweight
const performanceTest = Effect.gen(function* (_) {
  const startTime = Date.now()
  
  // Create 10,000 supervised fibers
  const fibers = yield* _(
    Effect.all(
      Array.from({ length: 10000 }, (_, i) =>
        Effect.fork(
          Effect.gen(function* (_) {
            yield* _(Effect.sleep("100 millis"))
            return i
          })
        )
      )
    )
  )
  
  const results = yield* _(Effect.all(fibers.map(Fiber.await)))
  const endTime = Date.now()
  
  yield* _(Console.log(`Created and awaited 10,000 fibers in ${endTime - startTime}ms`))
  return results.length
})
```

### Memory Management Best Practices

```typescript
// Proper resource cleanup prevents memory leaks
const memoryEfficientSupervisor = Effect.gen(function* (_) {
  // Use WeakMap for cleanup tracking to prevent memory leaks
  const cleanupTracking = new WeakMap<Fiber.Fiber<unknown, unknown>, () => void>()
  
  const superviseWithCleanup = <E, A>(
    childFactory: () => Effect.Effect<A, E>,
    cleanup: () => void
  ) =>
    Effect.gen(function* (_) {
      const fiber = yield* _(Effect.fork(childFactory()))
      cleanupTracking.set(fiber, cleanup)
      
      const result = yield* _(
        Fiber.await(fiber).pipe(
          Effect.ensuring(Effect.sync(() => {
            const cleanupFn = cleanupTracking.get(fiber)
            if (cleanupFn) {
              cleanupFn()
              cleanupTracking.delete(fiber)
            }
          }))
        )
      )
      
      return result
    })
  
  return superviseWithCleanup
})
```

## Best Practices and Anti-Patterns

### ✅ Best Practices

1. **Use Scopes for Resource Management**
```typescript
// Good: Automatic resource cleanup
const goodSupervision = Effect.scoped(
  Effect.gen(function* (_) {
    const resource = yield* _(Effect.acquireRelease(
      openResource(),
      resource => resource.close()
    ))
    
    const fiber = yield* _(Effect.forkScoped(useResource(resource)))
    return yield* _(Fiber.await(fiber))
  })
)
```

2. **Separate Business Logic from Supervision Logic**
```typescript
// Good: Clean separation
const businessLogic = (data: string) =>
  Effect.gen(function* (_) {
    // Pure business logic
    const processed = yield* _(processData(data))
    return processed
  })

const supervisedBusinessLogic = 
  oneForOneStrategy(() => businessLogic("data"), 3)
```

3. **Use Typed Errors for Predictable Failures**
```typescript
// Good: Explicit error types
type BusinessError = 
  | { _tag: "InvalidInput"; input: string }
  | { _tag: "ServiceUnavailable" }

const typedBusinessLogic: Effect.Effect<string, BusinessError> = 
  Effect.gen(function* (_) {
    // Implementation with typed errors
    return "result"
  })
```

### ❌ Anti-Patterns to Avoid

1. **Don't Mix Resource Acquisition with Business Logic**
```typescript
// Bad: Resource management mixed with business logic
const badWorker = Effect.gen(function* (_) {
  const db = yield* _(openDatabase()) // Resource acquisition
  const result = yield* _(processData(db)) // Business logic
  yield* _(db.close()) // Manual cleanup - error prone
  return result
})
```

2. **Don't Create Deep Supervision Hierarchies**
```typescript
// Bad: Too many supervision levels
const overEngineeredSupervision = 
  createSupervisor(config, [
    () => createSupervisor(config, [
      () => createSupervisor(config, [
        () => createSupervisor(config, [
          () => actualWork() // Too deeply nested
        ])
      ])
    ])
  ])
```

3. **Don't Ignore Error Types**
```typescript
// Bad: Using generic Error type
const badErrorHandling: Effect.Effect<string, Error> = 
  Effect.gen(function* (_) {
    // Lost type information about what can go wrong
    return "result"
  })
```

## Usage Example

```typescript
const main = Effect.gen(function* (_) {
  // Create a complete supervised application
  const application = yield* _(resourceAwareSupervisor.pipe(
    Effect.catchAll(error => {
      return Effect.gen(function* (_) {
        yield* _(Console.error("Supervision tree failed:", error))
        return []
      })
    })
  ))
  
  yield* _(Console.log("Application supervision tree completed"))
  return application
})

// Run the application
Effect.runPromise(main)
  .then(result => console.log("Final result:", result))
  .catch(error => console.error("Unhandled error:", error))
```

## Related Concepts

- [[effect|Effect-TS]] - The foundational Effect-TS library
- [[supervision-tree|Supervision Tree]] - The original Erlang/OTP supervision pattern
- [[knowledge/tools-and-technology/programming-and-software-development/languages/erlang|Erlang/OTP]] - Origin of supervision patterns
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/actor-model|Actor Model]] - Underlying concurrency model
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/index|Distributed Systems]] - Application domain for supervision patterns

## Resources

- [Effect-TS Documentation](https://effect.website/)
- [Effect-TS Fiber Management](https://effect.website/docs/guides/concurrency/fibers)
- [Effect-TS Resource Management](https://effect.website/docs/guides/resource-management/scope)
- [Erlang Supervisor Design Principles](https://www.erlang.org/doc/design_principles/sup_princ.html)
- [The Zen of Erlang](https://ferd.ca/the-zen-of-erlang.html) - Understanding supervision philosophy