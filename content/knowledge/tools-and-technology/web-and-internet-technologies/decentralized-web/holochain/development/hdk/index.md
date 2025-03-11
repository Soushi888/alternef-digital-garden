---
title: Holochain Development Kit (HDK)
description: Core libraries, APIs, and tools for building applications on the Holochain framework
tags:
  - holochain
  - development
  - hdk
  - programming
  - rust
aliases:
  - HDK
  - Holochain SDK
  - Holochain Development API
---

## Overview of the Holochain Development Kit

The Holochain Development Kit (HDK) provides the core libraries, APIs, and tools that developers need to build applications on the Holochain framework. Written in Rust, the HDK offers a comprehensive set of functions for managing entries, links, and other aspects of Holochain application development.

## Core Components

### [[hdk|HDK Core]]

- Primary development library for Holochain applications
- Rust-based API for interacting with Holochain runtime
- Core functions for managing application state
- Entry and link manipulation utilities

### [[hdi|Holochain Development Interface (HDI)]]

- Interface definitions for Holochain applications
- Type definitions and trait implementations
- Validation callback interfaces
- Core data structures

## Key Functionality

### [[entries-manipulation|Entry Manipulation]]

- Creating, reading, updating, and deleting entries
- Entry type definitions
- Validation logic implementation
- Entry serialization and deserialization

### [[links-manipalution|Link Manipulation]]

- Creating and managing relationships between entries
- Link type definitions
- Link tag management
- Querying and traversing links

### [[source-chain-retrieving|Source Chain Operations]]

- Accessing agent source chain data
- Querying historical actions
- Managing local state
- Chain validation

### [[zome-calls|Zome Calls]]

- Inter-zome communication
- Remote zome calls
- Capability-based authorization
- Cross-DNA interactions

## Development Workflow

1. Define entry and link types using the HDI
2. Implement CRUD operations using HDK functions
3. Create validation callbacks for data integrity
4. Implement query functions for data retrieval
5. Build UI integration using the Holochain Client API

## Best Practices

- Use strongly typed entry definitions
- Implement comprehensive validation rules
- Follow capability-based security patterns
- Design for eventual consistency
- Leverage HDK utility functions

## Version Compatibility

- HDK versions correspond to Holochain runtime versions
- Breaking changes between major versions
- Backward compatibility considerations
- Migration strategies for upgrading

## Related Topics

- [[../holochain-development-guide|Holochain Development Guide]]
- [[../how-to-design-an-holochain-application|Application Design]]
- [[../../architecture/index|Holochain Architecture]]
- [[../../concepts/index|Holochain Concepts]]

## External Resources

- [Official HDK Documentation](https://docs.rs/hdk/latest/hdk/)
- [HDK GitHub Repository](https://github.com/holochain/holochain/tree/develop/crates/hdk)
- [Holochain Developer Forum](https://forum.holochain.org/c/developers/) 