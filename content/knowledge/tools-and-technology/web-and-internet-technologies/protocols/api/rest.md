---
title: REST
description: An architectural style for distributed hypermedia systems using stateless HTTP interactions
aliases:
  - REST API
  - RESTful
  - Representational State Transfer
tags: ["protocols", "networking", "software-architecture", "api", "web-dev"]
date: 2026-03-14
---

REST (Representational State Transfer) is an architectural style for designing networked applications, first described by Roy Fielding in his 2000 doctoral dissertation at UC Irvine. Fielding, one of the primary authors of the HTTP specification, defined REST by observing what made the early web so scalable and then formalizing those properties into constraints. The result was a set of rules that, when followed, produce systems that are highly scalable, loosely coupled, and easy to evolve independently.

## Core Constraints

Fielding defined six architectural constraints that together constitute REST:

**Stateless**: Each request from a client to a server must contain all information needed to understand the request. The server holds no session state between requests. This makes servers easy to scale horizontally: any server can handle any request without needing client context stored elsewhere.

**Client-server separation**: The client and server evolve independently. The client handles the user interface; the server handles data storage and logic. This separation of concerns improves portability and scalability.

**Cacheable**: Responses must define themselves as cacheable or non-cacheable. Caching reduces server load and improves latency for repeated requests.

**Uniform interface**: Resources are addressed by stable URIs. Representations (JSON, XML, HTML) are returned, not the resource itself. Standard [[http|HTTP]] methods (GET, POST, PUT, PATCH, DELETE) provide a consistent interface across all resources.

**Layered system**: Clients cannot tell whether they are connected directly to the end server or to an intermediary (load balancer, CDN, cache). This enables scalable architectures without changing the client.

**Code on demand** (optional): Servers can temporarily extend client functionality by transferring executable code (JavaScript). This is the only optional constraint.

## HTTP Methods and Resources

REST treats everything as a **resource**: a named concept accessible via a URI. Operations on resources map to [[http|HTTP]] methods:

- `GET /users/42`: retrieve a representation of user 42
- `POST /users`: create a new user
- `PUT /users/42`: replace user 42 entirely
- `PATCH /users/42`: partially update user 42
- `DELETE /users/42`: remove user 42

This resource model contrasts with RPC-style APIs (Remote Procedure Call), where clients call named functions (`getUser(42)`, `createUser(...)`). REST's uniform interface makes API behavior more predictable across different services.

[[graphql|GraphQL]] emerged partly as a response to REST's limitations: a single graph query endpoint replaces dozens of REST endpoints, solving the mismatch between what REST returns and what clients actually need.

## Limitations

REST's statelessness is a strength for scaling but a weakness for workflows that naturally have state (shopping carts, multi-step forms, long-running jobs). Each request must carry its context, usually via tokens or session IDs in headers.

**Over-fetching**: REST responses return fixed resource shapes. A mobile client wanting only a user's name and avatar must still receive the full user object. This is one reason [[graphql|GraphQL]] was created.

**Under-fetching**: Rendering a profile page often requires multiple REST calls (`/users/42`, `/users/42/posts`, `/users/42/followers`). Each round-trip adds latency. GraphQL solves this with a single query.

**Versioning**: REST APIs evolve by adding `/v2/` prefixes or deprecating fields, which creates maintenance burden. There is no standard versioning mechanism.

**Real-time gaps**: REST is request-response only. Server-push and persistent connections require [[websockets|WebSockets]] or Server-Sent Events layered on top.

## Garden Perspective

REST's statelessness maps interestingly onto [[holochain|Holochain]]'s agent-centric design: both treat each interaction as self-contained, carrying its own context. But REST assumes a client-server hierarchy. There is always a server holding the canonical resource. In agent-centric systems like Holochain, resources are held by the agents who care about them, distributed across a DHT. REST describes how to interact with centralized resources cleanly; Holochain asks what interaction looks like when there is no central resource at all. The [[json-rpc|JSON-RPC]] protocol, which Holochain uses internally for its conductor API, illustrates how even agent-centric systems need RPC-style invocation at the boundary.

## Related Concepts

- [[graphql|GraphQL]]
- [[websockets|WebSockets]]
- [[http|HTTP]]
- [[json-rpc|JSON-RPC]]
- [[web-real-time-communication|WebRTC]]
- [[holochain|Holochain]]
