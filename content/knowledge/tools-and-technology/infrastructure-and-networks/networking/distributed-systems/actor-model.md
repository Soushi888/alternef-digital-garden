---
title: "Actor Model"
aliases:
  - Actor-based concurrency
  - Actor system
  - Message-passing concurrency
tags:
  - distributed-systems
  - concurrency
  - programming-paradigms
  - fault-tolerance
  - scalability
created: 2025-01-12
modified: 2025-01-12
draft: false
---

# Actor Model

The Actor Model is a mathematical model of concurrent computation that treats "actors" as the fundamental units of computation. Developed by Carl Hewitt in 1973, it provides a framework for building distributed, concurrent, and fault-tolerant systems where components interact through asynchronous message passing.

## Core Principles

### Everything is an Actor
In the Actor Model, an actor is the primitive unit of computation that:
- Encapsulates state and behavior
- Processes messages sequentially
- Can create new actors
- Has a unique address for communication

### No Shared State
Actors don't share memory or state. All interaction happens through message passing, eliminating common concurrency issues like race conditions and deadlocks.

### Asynchronous Message Passing
Messages are delivered asynchronously with at-most-once delivery semantics. There's no guarantee about message ordering between different senders.

## Actor Capabilities

When an actor receives a message, it can concurrently:

1. **Send messages** to other actors it knows about
2. **Create** new actors
3. **Designate** behavior for handling the next message

This simple set of primitives enables complex distributed system behaviors.

## Key Properties

### Location Transparency
Actors can communicate regardless of whether they're in the same process, on the same machine, or distributed across a network. The addressing mechanism abstracts physical location.

### Fault Isolation
Since actors don't share state, a failure in one actor doesn't directly corrupt others. This natural isolation boundary enables robust error handling through [[supervision-tree|supervision trees]].

### Scalability
The model naturally scales both vertically (more actors on one machine) and horizontally (actors distributed across machines) without changing the programming model.

### Concurrency
Actors process messages independently, enabling massive concurrency. Systems can have millions of lightweight actors running simultaneously.

## Message Delivery Guarantees

Different actor systems provide varying guarantees:
- **At-most-once**: Messages may be lost but never duplicated
- **At-least-once**: Messages may be duplicated but never lost
- **Exactly-once**: Messages are delivered exactly once (harder to achieve in distributed systems)

## Implementations

### Erlang/OTP
[[erlang|Erlang]] is perhaps the most successful implementation of the Actor Model:
- Lightweight processes (actors) with isolated heaps
- Built-in distribution and fault tolerance
- [[supervision-tree|Supervision trees]] for error recovery
- Used in telecom, messaging (WhatsApp), and gaming

### Akka (JVM)
Actor framework for Java and Scala:
- Runs on the JVM with integration into existing Java ecosystems
- Akka Cluster for distributed actors
- Akka Streams for reactive stream processing
- Used by PayPal, Tesla, and many enterprise systems

### Orleans (Microsoft)
Virtual actor framework for .NET:
- "Grains" as virtual actors
- Automatic activation/deactivation
- Built-in persistence
- Used in Halo cloud services

### Other Implementations
- **Pony**: Actor-based language with capabilities-secure type system
- **CAF (C++ Actor Framework)**: Native C++ implementation
- **Celluloid**: Ruby actor library
- **Swift Actors**: Native actor support in Swift 5.5+

## Actor Model Patterns

### Request-Reply
Basic pattern where an actor sends a request and expects a response:
```
Actor A → [Request] → Actor B
Actor A ← [Response] ← Actor B
```

### Publish-Subscribe
Actors subscribe to topics and receive relevant messages:
```
Publisher → [Event] → Topic → Subscribers
```

### Pipeline
Messages flow through a chain of actors, each performing transformations:
```
Source → Actor1 → Actor2 → Actor3 → Sink
```

### Aggregator
Collect responses from multiple actors:
```
Aggregator → [Request] → Multiple Actors
Aggregator ← [Responses] ← Multiple Actors
```

## Supervision and Error Handling

The Actor Model pairs naturally with supervision hierarchies:
- Parent actors supervise child actors
- Various restart strategies (restart one, restart all, escalate)
- Failure isolation prevents cascade failures
- "Let it crash" philosophy - embrace failure as normal

## Advantages

1. **Natural Distribution**: Seamlessly scales from single machine to cluster
2. **Fault Tolerance**: Built-in error isolation and recovery
3. **No Shared State**: Eliminates many concurrency bugs
4. **Cognitive Load**: Easier to reason about than locks and threads
5. **Hot Deployment**: Actors can be updated without stopping the system

## Challenges

1. **Debugging**: Asynchronous, distributed nature makes debugging complex
2. **Message Ordering**: No guaranteed ordering between different senders
3. **Memory Overhead**: Each actor has its own heap/stack
4. **Learning Curve**: Different mental model from traditional programming

## Comparison with Other Models

### vs Threads and Locks
- Actors: Message passing, no shared state, location transparent
- Threads: Shared memory, locks/mutexes, local only

### vs Communicating Sequential Processes (CSP)
- Actors: Named actors, flexible topology, asynchronous
- CSP: Anonymous processes, channels, synchronous by default

### vs Reactive Streams
- Actors: General purpose, bidirectional communication
- Streams: Data flow focused, backpressure handling

## Use Cases

### Real-time Systems
- Chat applications (Discord, WhatsApp)
- Gaming backends (League of Legends, Fortnite)
- Live streaming platforms

### IoT and Edge Computing
- Device management
- Sensor data processing
- Edge analytics

### Financial Systems
- Trading platforms
- Risk calculation
- Payment processing

### Distributed Computing
- MapReduce implementations
- Distributed databases
- Microservices architectures

## Related Concepts

- [[erlang|Erlang]] - Primary language implementing the Actor Model
- [[supervision-tree|Supervision Trees]] - Error handling pattern
- [[agent-vs-actor-models|Agent vs Actor Models]] - Detailed comparison with agent-based systems
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/index|Distributed Systems]] - Application domain
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/consensus|Consensus]] - Often implemented using actors
- [[knowledge/tools-and-technology/programming-and-software-development/development-patterns/event-bus|Event Bus]] - Related message-passing pattern

## Resources

- [Original Actor Model Paper (1973)](https://dl.acm.org/doi/10.5555/1624775.1624804)
- [Akka Documentation](https://doc.akka.io/)
- [Orleans Documentation](https://dotnet.github.io/orleans/)
- [Actor Model of Computation: Scalable Robust Information Systems](https://arxiv.org/abs/1008.1459) - Carl Hewitt
- [Seven Concurrency Models in Seven Weeks](https://pragprog.com/titles/pb7con/seven-concurrency-models-in-seven-weeks/)