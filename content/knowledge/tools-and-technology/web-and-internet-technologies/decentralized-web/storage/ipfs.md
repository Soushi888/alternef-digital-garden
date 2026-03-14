---
title: IPFS
description: A peer-to-peer hypermedia protocol for content-addressed, distributed file storage
aliases:
  - InterPlanetary File System
tags:
  - distributed-systems
  - decentralization
  - peer-to-peer
  - storage
  - protocols
date: 2026-03-14
---

IPFS (InterPlanetary File System) is a peer-to-peer hypermedia protocol that replaces location-based addressing with content-based addressing. On the traditional web, a file lives at a URL: a specific server, a specific path. If that server goes down or the path changes, the file disappears. IPFS identifies files by what they contain: a cryptographic hash of the content, called a Content Identifier (CID). Any node holding the same content can serve it, making the network resilient to censorship, server failure, and link rot.

This shift from "where is it?" to "what is it?" is foundational to the decentralized web. A resource on IPFS exists as long as at least one node has pinned it and is online. No single server controls access.

## How IPFS Works

**Content Identifiers (CIDs)**: Every piece of content on IPFS gets a CID, a hash of the content itself. The same file always has the same CID, regardless of where it is stored. Two nodes holding the same file are interchangeable as sources. This immutability is a feature: CIDs are verifiable proofs of content, not mutable pointers.

**[[distributed-hash-table|Distributed Hash Table]]**: IPFS uses a DHT (specifically a variant of Kademlia) for peer discovery. When you request a CID, the network looks up which peers hold it and routes you to them. No central index is needed; the routing table is distributed across all participating nodes.

**Merkle DAGs**: Files are split into chunks, each hashed. These chunks form a directed acyclic graph (Merkle DAG) where each node references its children by hash. This structure enables efficient deduplication: two files sharing a common subtree share that subtree's storage across the network.

**Pinning**: By default, IPFS nodes cache recently accessed content but may garbage-collect it over time. To keep content permanently available, a node must "pin" it, explicitly marking it for retention. Availability depends on who chooses to keep data alive, which is the protocol's honest model of persistence: it cannot be guaranteed without someone caring enough to pin it.

## Storage Ecosystem

IPFS alone does not guarantee persistence. Several protocols build incentive or permanence layers on top:

**[[arweave|Arweave]]**: Permanent storage backed by an endowment model. A one-time fee is supposed to fund storage in perpetuity. Where IPFS availability depends on willing pinners, Arweave guarantees permanence through economic incentives built into the protocol itself.

**Filecoin**: A decentralized storage marketplace built on top of IPFS. Storage providers are paid in FIL tokens to prove they are storing data, verified via Proof of Replication and Proof of Spacetime. Filecoin adds economic incentives for what IPFS leaves voluntary.

**[[ceramic-network|Ceramic Network]]**: Uses IPFS as its transport layer for mutable data streams. Where IPFS is immutable by design (changing the content changes the CID), Ceramic provides mutable document semantics while anchoring each version to an IPFS content hash.

**[[smart-contracts|Smart Contracts]]**: Commonly used to store IPFS CIDs on-chain. The blockchain holds a verifiable pointer; IPFS holds the actual data. This pattern avoids expensive on-chain storage while maintaining cryptographic provenance through the content hash.

## Garden Perspective

IPFS embodies the same structural challenge as any commons: availability depends on collective care, not guaranteed infrastructure. Who pins a file? Whoever finds it worth keeping. This is not a bug; it is the honest model of how communities actually maintain shared resources. It forces a question that centralized storage quietly obscures: who is responsible for this knowledge persisting?

[[holochain|Holochain]]'s DHT takes a related approach: data lives with the agents who have made commitments about it. The difference is that Holochain's sharding is semantically grounded. Agents hold data because they have explicitly joined a network with shared rules, not because they happened to request a file recently. Both models reject the illusion that "the server" is a reliable abstraction for important knowledge.

[[local-first|Local-first]] principles align here too: if your data lives on your own machine, content addressing gives you a verifiable proof of what you have without needing a server to confirm it. The CID is the proof.

## Related Concepts

- [[distributed-hash-table|Distributed Hash Table]]
- [[arweave|Arweave]]
- [[ceramic-network|Ceramic Network]]
- [[holochain|Holochain]]
- [[local-first|Local-First]]
- [[smart-contracts|Smart Contracts]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/index|Decentralized Web]]
