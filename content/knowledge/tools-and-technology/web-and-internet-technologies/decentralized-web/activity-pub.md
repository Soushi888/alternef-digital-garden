---
title: "ActivityPub"
date: 2026-04-07
description: "W3C standard protocol for decentralized social networking that powers the Fediverse, enabling server-to-server federation via ActivityStreams 2.0 and JSON-LD."
tags: ["programming", "protocols", "decentralization", "semantic-web", "open-source"]
draft: false
---

ActivityPub is a decentralized social networking protocol standardized by the **W3C** on January 23, 2018. It enables different servers and applications to communicate with each other, forming the [[fediverse|Fediverse]]: an interconnected network where users can follow and interact with content published on distinct platforms such as Mastodon, PeerTube, or Pixelfed.

## Core Architecture

The protocol defines two main APIs:

- **Client-to-server API**: used by applications to create, update, and manage content on behalf of a user
- **Server-to-server API**: used for federation, distributing notifications and data between independent instances

Each participant in the network is modeled as an **Actor** (a user, bot, or blog). Every actor has two key endpoints:

- **Inbox**: receives activities from other actors across the network
- **Outbox**: publishes activities that others can fetch and subscribe to

Activities follow the **ActivityStreams 2.0** vocabulary, which defines a standard set of actions (Create, Follow, Like, Announce, Delete, etc.) and object types (Note, Article, Image, Video). This vocabulary is serialized using [[json-ld|JSON-LD]], giving each activity a globally unique, machine-readable identity rooted in [[rdf|RDF]] semantics.

## Technical Design

ActivityPub operates on a model analogous to email: each server is independently hosted and governed, but they all speak the same protocol, making cross-instance communication seamless. A user on one instance can follow, reply to, and boost content from any other ActivityPub-compatible server without creating an account there.

Key technical properties:

- **HTTP Signatures**: messages between servers are cryptographically signed, preventing impersonation and ensuring authenticity
- **[[json-ld|JSON-LD]] serialization**: data is structured as linked data, enabling semantic interoperability and extensibility
- **No native end-to-end encryption**: ActivityPub was designed for public content broadcast; private messages are relayed through servers without E2E encryption by default, though extensions exist to address this

## Implementations

Many platforms use ActivityPub to interconnect their communities:

**Microblogging and social networks:**
Mastodon, Pleroma, Misskey, Friendica

**Media sharing:**
Pixelfed (photos), PeerTube (videos), Funkwhale (music)

**Tools and CMS:**
WordPress (via plugin), Nextcloud, Discourse (forums), Bookwyrm (books), Mobilizon (events)

**Development libraries:**
Go (Go-Fed), Ruby (activitypub-rails), Python, Rust

## Related Topics

- [[fediverse|Fediverse]] — the ecosystem of federated platforms built on ActivityPub
- [[json-ld|JSON-LD]] — the data serialization format used by ActivityPub for structured activities
- [[rdf|RDF]] — the semantic web foundation underlying ActivityStreams 2.0
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/index|Decentralized Web]] — broader context of federated and distributed systems
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/layer-0/nostr|Nostr]] — an alternative decentralized social protocol with a different cryptographic architecture

## References

- [ActivityPub W3C Recommendation](https://www.w3.org/TR/activitypub/)
- [ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-core/)
