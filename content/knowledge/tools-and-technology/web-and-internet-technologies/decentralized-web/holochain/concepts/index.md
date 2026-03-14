---
title: Holochain Concepts
date: 2025-03-11
description: Core concepts, data structures, and technical primitives that make up the Holochain framework
tags: ["holochain", "decentralization"]
---

# Holochain Concepts

This section contains all Holochain concepts in a single unified directory: data structures, network primitives, runtime mechanisms, and advanced topics.

## Application Structure

- [[dna-and-zomes|DNA and Zomes]] - The integrity/coordinator split; how DNA hashes define networks
- [[cell|Cell]] - The fundamental unit of a running Holochain application
- [[social-dna|Social DNA]] - Social application patterns and reusable DNA compositions

## Data Structures

- [[entry|Entry]] - Basic data unit stored in the source chain and DHT
- [[record|Record]] - Signed entries with metadata and provenance
- [[link|Link]] - Connections between entries in the DHT
- [[action|Action]] - Cryptographically signed operations agents perform

## Addressing and Navigation

- [[anchor|Anchor]] - Discoverable, well-known entry points in the DHT
- [[path|Path]] - Hierarchical addressing mechanism built on anchors

## Network and Consistency

- [[eventual-consistency|Eventual Consistency]] - How data synchronizes across a distributed network
- [[rrdht|RRDHT]] - Resilient random distributed hash table implementation
- [[network-seed|Network Seed]] - Network initialization and partitioning
- [[progenitor|Progenitor]] - The agent(s) who initiate a network

## Communication

- [[signal|Signal]] - Real-time messaging between agents and the UI
- [[capability-tokens|Capability Tokens]] - Authorization mechanism for zome calls and data access

## Runtime Roles

- [[host|Host]] - The runtime role that provides Holochain capabilities to guests
- [[guest|Guest]] - The application code (zome) that runs within the host

## Context and Ecosystem

- [[layer0|Layer0]] - Positioning in the protocol stack
- [[web3|Web3]] - Relationship and contrast with Web3 technologies

## Related

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] - Back to main overview
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/architecture/index|Architecture]] - System design and component interactions
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/development/index|Development]] - Building hApps with these concepts
