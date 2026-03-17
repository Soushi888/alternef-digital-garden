---
title: GraphQL
description: A query language for APIs enabling clients to request exactly the data they need from a single endpoint
aliases:
  - Graph Query Language
tags: ["protocols", "networking", "api", "web-dev", "query-language"]
date: 2026-03-14
---

GraphQL is a query language for APIs and a runtime for executing those queries against your data. Developed internally at Facebook beginning in 2012 and released publicly in 2015, GraphQL emerged as a solution to a real problem: mobile clients on slow connections needed precise data fetching, but [[rest|REST]] APIs returned fixed-shape resources that were too large, too small, or required multiple round-trips to compose.

Where REST uses multiple endpoints (one per resource), GraphQL exposes a single endpoint. The client sends a query describing exactly the data it wants; the server returns precisely that and nothing more.

## How GraphQL Works

GraphQL is **schema-first**. The API defines its capabilities in a typed schema: every type, field, query, and mutation is declared explicitly. This schema serves as both contract and documentation.

Clients interact through three operation types:

- **Query**: Read data (`query { user(id: "42") { name, email } }`)
- **Mutation**: Write data (`mutation { createPost(title: "...", body: "...") { id } }`)
- **Subscription**: Real-time streaming over [[websockets|WebSockets]] (`subscription { messageAdded { text, author } }`)

The schema's type system catches mismatches at query time: requesting a non-existent field returns a validation error before the query executes. **Introspection** (the ability to query the schema itself) enables auto-generated documentation and tooling like GraphiQL and Apollo Studio.

## Key Advantages

**Precise data fetching**: The client declares exactly which fields it needs. No over-fetching (receiving unused data) and no under-fetching (needing multiple requests to get what one query can return).

**Typed schema as documentation**: The schema is the single source of truth for what the API can do. Frontend and backend teams can work from the schema contract independently, each evolving their side without constant coordination.

**Real-time subscriptions**: GraphQL's subscription operation maps cleanly onto [[websockets|WebSockets]], making real-time features first-class rather than an afterthought bolted on later.

**Rapid frontend iteration**: Frontend developers can request new field combinations without backend changes, as long as the underlying data is already in the schema.

## Tradeoffs

**Caching complexity**: REST's URL-per-resource maps naturally onto [[http|HTTP]] caching (CDNs cache `/users/42` automatically). GraphQL's single POST endpoint cannot be cached at the HTTP layer without additional tooling (persisted queries, response caching by operation name).

**N+1 query problem**: Naively resolving nested queries hits the database once per item in a list. Mitigated by the DataLoader batching pattern, but requires explicit attention in server implementation.

**Overpowered for simple cases**: A straightforward CRUD API with predictable access patterns may be simpler as REST. GraphQL's power is most valuable when clients have heterogeneous data needs.

**[[the-graph|The Graph]]** protocol is an interesting inversion: a decentralized indexing protocol that exposes blockchain data via GraphQL. It applies GraphQL's client-driven query model to distributed, on-chain data. The tension between GraphQL's centralized query paradigm and the data's distributed nature mirrors the broader tension between REST's server-authority model and agent-centric computing.

## Garden Perspective

GraphQL's typed schema has an ancestor in [[rdf|RDF]] and the semantic web tradition: both represent data as typed graphs with explicit relationships. Where RDF uses [[sparql|SPARQL]] for queries, GraphQL uses its own language, but the underlying intuition (structured graph traversal, type-safe queries) is shared. The difference is openness: RDF vocabularies are open and interoperable by design; GraphQL schemas are proprietary per-service. [[semantic-ai|Semantic AI]] explores what happens when these traditions converge: when AI systems can reason over typed, interoperable knowledge graphs rather than querying isolated proprietary endpoints.

## Related Concepts

- [[rest|REST]]
- [[the-graph|The Graph]]
- [[websockets|WebSockets]]
- [[http|HTTP]]
- [[sparql|SPARQL]]
- [[semantic-ai|Semantic AI]]
