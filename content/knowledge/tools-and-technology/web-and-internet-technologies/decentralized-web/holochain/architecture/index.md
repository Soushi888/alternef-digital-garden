---
title: Holochain Architecture
description: Technical architecture, components, and design principles of the Holochain framework
tags: ["holochain", "distributed-systems", "decentralization", "peer-to-peer", "architecture"]
---

## Overview of Holochain Architecture

This section explores the technical architecture of Holochain, including its core components, design principles, and system interactions. Understanding Holochain's architecture is essential for developing robust applications and leveraging the full potential of this distributed computing framework.

## Architectural Components

### Core System Components

- [[holochain-architecture-overview|Holochain Architecture Overview]] - High-level explanation of the system design
- [[conductor|Conductor]] - The runtime environment for Holochain applications

### Core Components

- [[agent-centric-architecture|Agent-Centric Architecture]] - Fundamental design paradigm, agent sovereignty
- [[validation-rules|Validation Rules]] - Distributed data integrity mechanism
- Source Chain - Agent's personal immutable record chain
- DHT - Distributed Hash Table for shared data
- Networking Layer - Peer discovery and communication
- WASM Runtime - Execution environment for application code

## Architectural Principles

### Agent-Centricity

- Each agent maintains their own source chain
- Data originates from and is signed by agents
- Validation occurs from the perspective of receiving agents

### Distributed Validation

- Rules are enforced by the collective
- No central authority for validation
- Cryptographic accountability for all actions

### Scalability by Design

- Sharding through DHT architecture
- Parallel validation across the network
- Local-first operations with eventual consistency

## System Interactions

### Data Flow

1. Agent creates and signs data on their source chain
2. Data is published to the DHT
3. Validators check data against validation rules
4. Valid data becomes available to other agents

### Application Execution

1. User interfaces interact with the Conductor
2. Conductor manages cell instances
3. Cells execute application logic in WASM
4. Results propagate through the network

## Technical Specifications

- Written primarily in Rust for performance and safety
- WebAssembly (WASM) for portable application code
- Libp2p networking stack for peer communication
- Content-addressable storage using multihash

## Related Topics

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/index|Holochain Concepts]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/development/index|Holochain Development]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/introduction/index|Introduction to Holochain]]

## External Resources

- [Holochain Architecture Documentation](https://developer.holochain.org/docs/concepts/2_application_architecture/)
- [Holochain Technical Whitepaper](https://github.com/holochain/holochain-proto/blob/whitepaper/holochain.pdf)
- [Holochain Core GitHub Repository](https://github.com/holochain/holochain)
