---
title: "Erlang"
aliases:
  - Erlang/OTP
  - Erlang VM
  - BEAM
tags:
  - programming-languages
  - functional-programming
  - concurrent-programming
  - distributed-systems
  - fault-tolerance
  - actor-model
created: 2025-01-12
modified: 2025-01-12
draft: false
---

# Erlang

Erlang is a functional, concurrent, and fault-tolerant programming language designed for building distributed, real-time systems with high availability requirements. Originally developed by Ericsson in 1986 for telecommunications systems, Erlang has evolved into a powerful platform for building scalable and resilient applications.

## Key Features

### Concurrency
Erlang's lightweight process model allows millions of concurrent processes to run simultaneously. These processes are not OS threads but language-level constructs with minimal memory overhead (starting at ~2KB per process).

### Fault Tolerance
Built on the principle of "let it crash," Erlang systems embrace failure as a natural part of distributed computing. The [[supervision-tree|supervision tree]] pattern enables automatic process restart and recovery.

### Distribution
Native support for [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/index|distributed systems]] with transparent message passing between nodes. Processes can communicate across network boundaries as easily as within the same machine.

### Hot Code Swapping
Code can be updated in running systems without downtime, crucial for systems requiring 24/7 availability.

### Pattern Matching
Powerful pattern matching capabilities make code more declarative and easier to reason about.

## The Actor Model

Erlang implements the [[actor-model|Actor Model]] where:
- Each actor (process) has its own state
- Actors communicate only through message passing
- No shared memory between processes
- Location transparency for distributed actors

## OTP (Open Telecom Platform)

OTP is a collection of libraries, design principles, and tools that complement Erlang:
- **GenServer**: Generic server behavior for stateful processes
- **Supervisor**: Process supervision and restart strategies
- **Application**: Application structure and lifecycle management
- **GenStateMachine**: State machine behavior

## Supervision Trees

The [[supervision-tree|supervision tree]] is Erlang's cornerstone pattern for fault tolerance:
- Hierarchical process organization
- Supervisor processes monitor worker processes
- Automatic restart strategies (one-for-one, one-for-all, rest-for-one)
- Isolation of failures to prevent cascade effects

## Use Cases

### Telecommunications
- WhatsApp: Handles billions of messages daily
- Ericsson: Original use case for telecom switches
- T-Mobile: SMS and authentication systems

### Real-time Systems
- Discord: Voice and chat infrastructure
- League of Legends: Chat system
- Bet365: Live betting platform

### IoT and Embedded Systems
- Nerves Project: IoT platform built on Erlang/OTP
- EMQ X: MQTT broker for IoT messaging

### Blockchain and Distributed Ledgers
- Aeternity: Blockchain platform
- Various distributed consensus implementations

## BEAM Virtual Machine

The BEAM (Bogdan/Björn's Erlang Abstract Machine) is Erlang's virtual machine:
- Preemptive scheduling with soft real-time guarantees
- Per-process garbage collection (no stop-the-world pauses)
- Built-in support for distribution and clustering
- Hosts other languages: Elixir, LFE (Lisp Flavored Erlang), Gleam

## Example: Simple Process Communication

```erlang
%% Spawning a process that receives messages
-module(example).
-export([start/0, loop/0]).

start() ->
    Pid = spawn(?MODULE, loop, []),
    Pid ! {hello, self()},
    receive
        {reply, Message} ->
            io:format("Received: ~p~n", [Message])
    end.

loop() ->
    receive
        {hello, From} ->
            From ! {reply, "Hello back!"},
            loop();
        stop ->
            ok
    end.
```

## Advantages

1. **Nine 9s Availability**: Systems built with Erlang have achieved 99.9999999% uptime
2. **Scalability**: Linear scalability through process isolation
3. **Maintainability**: Clear separation of concerns through OTP patterns
4. **Productivity**: High-level abstractions for complex distributed problems
5. **Battle-tested**: Decades of production use in critical systems

## Challenges

1. **Learning Curve**: Functional paradigm and different concurrency model
2. **Ecosystem Size**: Smaller than mainstream languages
3. **Sequential Performance**: Not optimized for CPU-intensive sequential tasks
4. **Syntax**: Prolog-inspired syntax can be unfamiliar

## Modern Ecosystem

### Elixir
A dynamic, functional language that compiles to BEAM bytecode, bringing Ruby-like syntax and modern tooling to the Erlang ecosystem.

### Phoenix Framework
Web framework built on Elixir, known for real-time features via Phoenix Channels and LiveView.

### Distributed Computing
Integration with modern distributed systems patterns:
- Kubernetes operators for BEAM applications
- Cloud-native deployment strategies
- Mesh networking capabilities

## Related Concepts

- [[actor-model|Actor Model]] - The concurrency model Erlang implements
- [[supervision-tree|Supervision Trees]] - Fault tolerance pattern
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/index|Distributed Systems]] - Core application domain
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/consensus|Consensus Algorithms]] - Often implemented in Erlang
- [[knowledge/tools-and-technology/security-and-privacy/cryptography/byzantine-fault-tolerance|Byzantine Fault Tolerance]] - Supported through OTP patterns

## Resources

- [Erlang Documentation](https://www.erlang.org/doc/)
- [Learn You Some Erlang](https://learnyousomeerlang.com/)
- [Erlang in Anger](https://www.erlang-in-anger.com/) - Production debugging guide
- [OTP Design Principles](https://www.erlang.org/doc/design_principles/users_guide.html)
- [BEAM Book](https://blog.stenmans.org/theBeamBook/) - Virtual machine internals
