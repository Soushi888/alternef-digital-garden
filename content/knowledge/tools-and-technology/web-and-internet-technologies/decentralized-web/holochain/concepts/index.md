---
title: Holochain Concepts
description: Core concepts, data structures, and technical primitives that make up the Holochain framework
tags:
  - holochain
  - concepts
  - decentralized-web
aliases:
  - Holochain Terminology
  - Holochain Technical Concepts
date: 2026-03-03
---

# Holochain Concepts

This section contains all Holochain concepts in a single unified directory: data structures, network primitives, runtime mechanisms, and advanced topics.

## Application Structure

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/dna-and-zomes|DNA and Zomes]] - The integrity/coordinator split; how DNA hashes define networks
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/cell|Cell]] - The fundamental unit of a running Holochain application
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/social-dna|Social DNA]] - Social application patterns and reusable DNA compositions

## Data Structures

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/entry|Entry]] - Basic data unit stored in the source chain and DHT
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/record|Record]] - Signed entries with metadata and provenance
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/link|Link]] - Connections between entries in the DHT
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/action|Action]] - Cryptographically signed operations agents perform

## Addressing and Navigation

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/anchor|Anchor]] - Discoverable, well-known entry points in the DHT
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/path|Path]] - Hierarchical addressing mechanism built on anchors

## Network and Consistency

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/eventual-consistency|Eventual Consistency]] - How data synchronizes across a distributed network
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/rrdht|RRDHT]] - Resilient random distributed hash table implementation
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/network-seed|Network Seed]] - Network initialization and partitioning
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/progenitor|Progenitor]] - The agent(s) who initiate a network

## Communication

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/signal|Signal]] - Real-time messaging between agents and the UI
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/capability-tokens|Capability Tokens]] - Authorization mechanism for zome calls and data access

## Runtime Roles

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/host|Host]] - The runtime role that provides Holochain capabilities to guests
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/guest|Guest]] - The application code (zome) that runs within the host

## Context and Ecosystem

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/layer0|Layer0]] - Positioning in the protocol stack
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/web3|Web3]] - Relationship and contrast with Web3 technologies

## Related

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] - Back to main overview
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/architecture/index|Architecture]] - System design and component interactions
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/development/index|Development]] - Building hApps with these concepts
