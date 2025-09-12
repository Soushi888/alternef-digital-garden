---
title: "Supervision Tree"
aliases:
  - Supervisor hierarchy
  - Process supervision
  - Fault-tolerance tree
tags:
  - distributed-systems
  - fault-tolerance
  - erlang
  - actor-model
  - reliability
  - error-handling
created: 2025-01-12
modified: 2025-01-12
draft: false
---

# Supervision Tree

A supervision tree is a hierarchical structure of processes designed to build fault-tolerant systems through organized error handling and automatic recovery. This pattern, pioneered by [[erlang|Erlang/OTP]], enables systems to achieve exceptional reliability by embracing failure as a normal part of operation rather than trying to prevent it entirely.

## Core Philosophy: Let It Crash

The supervision tree embodies the "let it crash" philosophy:
- Processes should fail fast when encountering errors
- Failed processes are restarted by supervisors
- System integrity is maintained through isolation
- Complex error handling is moved to supervision layer

This approach simplifies code by separating business logic from error recovery logic.

## Architecture

### Process Hierarchy
```
        [Application Supervisor]
               /        \
    [DB Supervisor]  [Web Supervisor]
         /    \           /    \
   [Writer] [Reader] [Handler] [Cache]
```

Each level in the tree represents a supervision boundary with specific responsibilities and restart strategies.

### Process Types

#### Supervisors
- Monitor child processes
- Restart failed children according to strategy
- Don't perform business logic
- Can supervise other supervisors (creating depth)

#### Workers
- Perform actual work (business logic)
- Report to exactly one supervisor
- Can fail and be restarted
- Should be designed for clean startup/shutdown

#### Special Processes
- **Application**: Root of supervision tree
- **Dynamic Supervisors**: Create children on demand
- **Task Supervisors**: Manage short-lived tasks

## Restart Strategies

### One-for-One
When a child process fails, only that specific process is restarted.
```
Before: [A] [B] [C] [D]
B fails: [A] [X] [C] [D]
After:  [A] [B'] [C] [D]
```
Use when processes are independent.

### One-for-All
When any child fails, all children are terminated and restarted.
```
Before: [A] [B] [C] [D]
B fails: [A] [X] [C] [D]
After:  [A'] [B'] [C'] [D']
```
Use when processes are strongly dependent.

### Rest-for-One
When a child fails, that child and all children started after it are restarted.
```
Before: [A] [B] [C] [D]
B fails: [A] [X] [C] [D]
After:  [A] [B'] [C'] [D']
```
Use when there's a startup dependency chain.

### Simple-One-for-One
Special strategy for dynamically created children of the same type.
- All children run the same code
- Children added/removed dynamically
- Efficient for thousands of similar processes

## Restart Intensity and Period

Supervisors track restart frequency to prevent infinite restart loops:
- **Max Restarts**: Maximum number of restarts allowed
- **Time Period**: Time window for counting restarts
- **Escalation**: If threshold exceeded, supervisor itself fails

Example configuration:
```erlang
%% Allow max 3 restarts in 5 seconds
{RestartStrategy, MaxRestarts, Period} = {one_for_one, 3, 5}
```

## Implementation Examples

### Erlang/OTP
```erlang
-module(my_supervisor).
-behaviour(supervisor).

init([]) ->
    Children = [
        {worker1, {worker_module, start_link, []},
         permanent, 5000, worker, [worker_module]},
        {worker2, {other_worker, start_link, []},
         temporary, 5000, worker, [other_worker]}
    ],
    {ok, {{one_for_one, 3, 5}, Children}}.
```

### Elixir
```elixir
defmodule MyApp.Supervisor do
  use Supervisor

  def start_link(opts) do
    Supervisor.start_link(__MODULE__, :ok, opts)
  end

  def init(:ok) do
    children = [
      {MyApp.Worker, arg1},
      {MyApp.Cache, name: MyApp.Cache}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
```

### Akka (Scala)
```scala
class MySupervisor extends Actor {
  override val supervisorStrategy = 
    OneForOneStrategy(maxNrOfRetries = 3, 
                      withinTimeRange = 1 minute) {
      case _: ArithmeticException => Restart
      case _: NullPointerException => Stop
      case _: Exception => Escalate
    }
  
  def receive = {
    case Props(cls, args) => 
      sender() ! context.actorOf(Props(cls, args))
  }
}
```

### Effect-TS (TypeScript)

Effect-TS brings supervision tree patterns to TypeScript with type safety and structured concurrency:

```typescript
import { Effect, Fiber, Scope, Exit } from "effect"

const oneForOneStrategy = <E, A>(
  childFactory: () => Effect.Effect<A, E>,
  maxRestarts: number = 3
) =>
  Effect.gen(function* (_) {
    let restarts = 0
    
    const startChild = (): Effect.Effect<A, E> =>
      childFactory().pipe(
        Effect.catchAll(error => {
          if (restarts < maxRestarts) {
            restarts++
            console.log(`Restarting child, attempt ${restarts}`)
            return startChild()
          }
          return Effect.fail(error)
        })
      )
    
    return yield* _(startChild())
  })

// Resource-aware supervision with automatic cleanup
const resourceAwareSupervisor = Effect.gen(function* (_) {
  yield* _(Effect.acquireUseRelease(
    Effect.gen(function* (_) {
      const scope = yield* _(Scope.make())
      return scope
    }),
    (scope) => Effect.gen(function* (_) {
      const children = [
        () => childProcess("worker-1"),
        () => childProcess("worker-2")
      ]
      
      return yield* _(createSupervisor({
        maxRestarts: 3,
        restartWindow: 5000,
        strategy: "one_for_one"
      }, children))
    }),
    (scope) => Scope.close(scope, Exit.unit)
  ))
})
```

See [[knowledge/tools-and-technology/programming-and-software-development/languages/typescript/libraries/effect-supervision-patterns|Effect-TS Supervision Patterns]] for comprehensive implementation examples.

## Child Specifications

Each child in a supervision tree has specifications defining:

### Restart Type
- **Permanent**: Always restarted on termination
- **Temporary**: Never restarted
- **Transient**: Restarted only on abnormal termination

### Shutdown Strategy
- **Timeout**: Grace period for cleanup (milliseconds)
- **Brutal Kill**: Immediate termination
- **Infinity**: Wait indefinitely (for supervisors)

### Child Type
- **Worker**: Leaf node performing work
- **Supervisor**: Branch node managing children

## Error Propagation

### Isolation Boundaries
- Errors are contained at process level
- Supervisors create failure domains
- Critical and non-critical paths separated
- Cascading failures prevented through hierarchy

### Escalation Path
1. Worker crashes → caught by immediate supervisor
2. Supervisor attempts restart per strategy
3. If restart threshold exceeded → supervisor crashes
4. Parent supervisor handles failed supervisor
5. Continues up tree to application level

## Design Patterns

### Application Supervision Tree
```
           [Application]
                |
         [Root Supervisor]
         /      |       \
   [Core]   [Features]  [Support]
     |         |           |
  [Workers] [Services]  [Caches]
```

### Service Supervision
Each service gets its own supervisor subtree:
```
      [Service Supervisor]
       /       |        \
  [Listener] [Pool]  [State]
              |
        [Workers 1..N]
```

### Dynamic Worker Pool
```
    [Pool Supervisor]
    (simple_one_for_one)
           |
    [Dynamic Workers]
    Created on demand
```

## Benefits

### Fault Tolerance
- Automatic recovery from failures
- System continues operating during partial failures
- Graceful degradation under load

### Simplicity
- Business logic separated from error handling
- Cleaner code with less defensive programming
- Predictable failure behavior

### Visibility
- Clear system structure
- Easy to understand failure domains
- Simplified debugging and monitoring

### Scalability
- Add/remove workers dynamically
- Hierarchical organization scales naturally
- Independent failure domains

## Best Practices

### Design Principles
1. **Fail Fast**: Don't try to handle unexpected errors in workers
2. **Isolate State**: Keep state in separate processes when possible
3. **Layer Supervisors**: Create multiple supervision levels for complex systems
4. **Match Strategy to Dependencies**: Choose restart strategy based on process relationships

### Common Patterns
1. **Split Critical/Non-Critical**: Separate essential from optional functionality
2. **Database Connections**: Pool supervisor with worker connections
3. **Web Servers**: Acceptor pool with request handlers
4. **Background Jobs**: Task supervisor for async work

### Anti-Patterns to Avoid
1. **Deep Nesting**: Too many supervision levels add complexity
2. **Defensive Programming**: Over-engineering error handling in workers
3. **Shared State**: Processes sharing mutable state break isolation
4. **Ignoring Escalation**: Not handling supervisor failures

## Monitoring and Observability

### Metrics to Track
- Restart frequency per supervisor
- Process uptime and lifetime
- Message queue lengths
- Memory usage per process tree

### Debugging Tools
- Observer (Erlang/Elixir): Visual supervision tree explorer
- Process registry: Named process tracking
- Crash dumps: Post-mortem analysis
- Distributed tracing: Cross-node supervision

## Use Cases

### Telecommunications
- Call routing with automatic failover
- Session management with recovery
- Network element supervision

### Web Applications
- Request handler pools
- WebSocket connection management
- Background job processing

### IoT Systems
- Device connection management
- Sensor data pipeline supervision
- Command and control hierarchies

### Financial Systems
- Transaction processing supervision
- Market data feed handlers
- Risk calculation pipelines

## Related Concepts

- [[erlang|Erlang/OTP]] - Origin and primary implementation
- [[actor-model|Actor Model]] - Underlying concurrency model
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/index|Distributed Systems]] - Application domain
- [[knowledge/tools-and-technology/security-and-privacy/cryptography/byzantine-fault-tolerance|Byzantine Fault Tolerance]] - Advanced fault tolerance
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/fail-stop|Fail-Stop Model]] - Failure detection approach

## Resources

- [OTP Design Principles - Supervisors](https://www.erlang.org/doc/design_principles/sup_princ.html)
- [Elixir Supervisor Documentation](https://hexdocs.pm/elixir/Supervisor.html)
- [The Zen of Erlang](https://ferd.ca/the-zen-of-erlang.html) - Fred Hebert
- [Designing for Scalability with Erlang/OTP](https://www.oreilly.com/library/view/designing-for-scalability/9781449361556/)
- [Akka Supervision](https://doc.akka.io/docs/akka/current/general/supervision.html)