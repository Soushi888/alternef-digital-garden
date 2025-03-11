---
title: Holochain Core Components
description: Fundamental building blocks and architectural elements that form the foundation of Holochain's distributed computing framework
tags:
  - holochain
  - architecture
  - components
  - distributed-systems
  - p2p
aliases:
  - Holochain Building Blocks
  - Holochain Core Architecture
---

## Overview of Holochain Core Components

This section explores the fundamental building blocks that make up Holochain's architecture. Understanding these core components is essential for grasping how Holochain functions as a distributed computing framework and how it differs from other approaches to decentralized systems.

## Architectural Foundation

### [[agent-centric-architecture|Agent-Centric Architecture]]

- Fundamental design paradigm of Holochain
- Puts individual agents at the center of the system
- Enables sovereign control over personal data
- Contrasts with data-centric blockchain approaches

### [[validation-rules|Validation Rules]]

- Core mechanism for ensuring data integrity
- Distributed validation approach
- Application-specific rule enforcement
- Cryptographic accountability

## Key Structural Elements

### Source Chain

- Personal immutable record chain for each agent
- Cryptographically secured history of actions
- Local-first data storage
- Foundation for agent autonomy

### Distributed Hash Table (DHT)

- Shared data space across the network
- Content-addressable storage
- Sharded architecture for scalability
- Redundant data storage for resilience

### WASM Runtime

- WebAssembly execution environment
- Portable, secure code execution
- Sandboxed application logic
- Cross-platform compatibility

### Networking Layer

- Peer discovery and communication
- Direct agent-to-agent messaging
- Gossip protocol for data propagation
- NAT traversal and connectivity solutions

## System Interactions

### Data Flow Patterns

- Local validation before publication
- DHT publication and validation
- Metadata and provenance tracking
- Eventual consistency model

### Security Model

- Cryptographic signatures for all actions
- Multi-party validation
- Capability-based security
- Defense against common attack vectors

## Implementation Considerations

- Performance characteristics of each component
- Scalability implications
- Security boundaries
- Development trade-offs

## Related Topics

- [[../conductor|Holochain Conductor]]
- [[../holochain-architecture-overview|Architecture Overview]]
- [[../../concepts/index|Holochain Concepts]]
- [[../../development/index|Holochain Development]]

## External Resources

- [Holochain Core Components Documentation](https://developer.holochain.org/docs/concepts/2_application_architecture/)
- [Holochain Architecture Whitepaper](https://github.com/holochain/holochain-proto/blob/whitepaper/holochain.pdf)
- [Holochain GitHub Repository](https://github.com/holochain/holochain) 