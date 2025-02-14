---
title: "Holochain Technical Terminology: A Developer's Lexicon"
description: "A comprehensive guide mapping Holochain-specific concepts to conventional software development terminology, helping developers transition to distributed application development."
date: 2024-01-20
author: "soushi888"
tags: ["Holochain", "Distributed Systems", "p2p", "Technical Guide", "Development", "Lexicon"]
category: "Technical Documentation"
---

This lexicon provides a comprehensive mapping between [[knowledge/tools-and-technology/holochain|Holochain]]-specific terminology and conventional software development concepts. It's designed to help developers familiar with traditional architectures understand Holochain's distributed paradigm.

## Core Architecture Components

### Holochain Framework

**Conventional Equivalent**: Application Framework (like Spring, Django, or Ruby on Rails)

**Technical Definition**: A framework for developing distributed applications that operate on a peer-to-peer network architecture without requiring global consensus.

**Key Differences**:

- Eliminates central servers and databases
- Uses agent-centric architecture instead of data-centric
- Provides built-in cryptographic validation

### DNA

**Conventional Equivalent**: Application Schema + Business Logic Layer

**Technical Definition**: An immutable bundle containing:

- Data schemas
- Validation rules
- Business logic
- Network configuration

**Implementation Context**: Similar to how a smart contract defines rules and logic in blockchain, but without requiring global consensus.

### Agent

**Conventional Equivalent**: User Account + Node

**Technical Definition**: A network participant identified by a public/private key pair that:

- Maintains a local source chain
- Participates in DHT validation
- Executes DNA-defined functions

**Technical Components**:

- Cryptographic identity
- Local storage
- Network participation rules

### DHT (Distributed Hash Table)

**Conventional Equivalent**: Distributed Database + P2P Network

**Technical Definition**: A distributed storage and validation network where:

- Data is content-addressed
- Storage is sharded across peers
- Validation is performed by random witnesses

**Implementation Details**:

- Uses consistent hashing for data distribution
- Implements eventual consistency
- Provides redundant storage

### Entry

**Conventional Equivalent**: Database Record

**Technical Definition**: An atomic unit of data that:

- Is cryptographically signed
- Has a specific entry type
- Is validated against DNA rules

**Data Structure**:

``` text
{
  type: EntryType,
  content: Any,
  timestamp: DateTime,
  signature: Signature
}
```

### Zome

**Conventional Equivalent**: Module or Microservice

**Technical Definition**: A modular code component that:

- Defines entry types
- Implements validation rules
- Exposes API functions

**Architecture Role**: Provides separation of concerns within a DNA

### Source Chain

**Conventional Equivalent**: Transaction Log + Local State

**Technical Definition**: A personal append-only log containing:

- All local actions
- Entry references
- Cryptographic links

**Technical Properties**:

- Immutable history
- Cryptographically verifiable
- Local-first architecture

### Validation Rules

**Conventional Equivalent**: Data Validation + Access Control

**Technical Definition**: Deterministic functions that:

- Verify data integrity
- Check access permissions
- Ensure network consistency

**Implementation Context**: Executed by multiple nodes for consensus

### Conductor

**Conventional Equivalent**: Application Runtime + Network Manager

**Technical Definition**: A runtime environment that:

- Manages DNA instances
- Handles networking
- Provides API interfaces

**System Integration**:

- WebSocket interface
- Admin API
- Application interface

## Network Architecture

### Networking Model

**Conventional Equivalent**: Client-Server becomes Agent-DHT

``` text
Traditional:          Holochain:
Client → Server       Agent → Local Chain → DHT
```

### Data Flow

**Conventional Equivalent**: CRUD Operations

``` text
Create: Agent commits entry → Source Chain → DHT
Read:   Agent queries DHT → Retrieves from peers
Update: New entry with reference to previous
Delete: Tombstone entry (metadata preserved)
```

## Development Paradigm Shift

### Key Architectural Differences

1. **Data Storage**:
   - Traditional: Centralized databases
   - Holochain: Distributed source chains + DHT

2. **Validation**:
   - Traditional: Server-side validation
   - Holochain: Multi-agent validation

3. **State Management**:
   - Traditional: Global state
   - Holochain: Agent-centric state

## Best Practices

When developing Holochain applications, consider:

1. Design for agent-centric data ownership
2. Implement robust validation rules
3. Plan for eventual consistency
4. Structure zomes for modularity
5. Design for offline-first operation

## Technical Considerations

- **Scalability**: Increases with network size
- **Consistency**: Eventually consistent
- **Availability**: Dependent on DHT redundancy
- **Partition Tolerance**: Naturally partition-tolerant

This lexicon serves as a reference for developers transitioning from traditional architectures to Holochain's distributed paradigm. Understanding these mappings is crucial for effective Holochain application development.
