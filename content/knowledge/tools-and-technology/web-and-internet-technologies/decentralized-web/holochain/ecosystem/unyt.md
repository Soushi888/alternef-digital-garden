---
title: "Unyt"
description: "Professional-grade accounting tools for DAOs, communities, and peer-production networks, built on Holochain."
date: 2026-02-20
tags:
  - holochain
  - accounting
  - decentralized-coordination
  - peer-to-peer
  - economic-networks
---

## Overview

Unyt provides professional-grade accounting tools for businesses, communities, and peer-production networks. Built on [[what-is-holochain|Holochain]] rather than blockchain, it leverages agent-centric architecture to enable high-volume, low-cost decentralized accounting without consensus bottlenecks.

## Core Capabilities

- **Decentralized peer-to-peer accounting**: Cryptographically verified records without a central authority
- **High-volume microtransactions**: Scalable through Holochain's DHT, avoiding the throughput limits of blockchain consensus
- **Custom payment applications**: Programmable accounting infrastructure for diverse economic models
- **Tamper-proof records**: Cryptographic verification ensures integrity without network-wide agreement

## Use Cases

- **Decentralized Infrastructure Networks (DePIN)**: Accounting for distributed physical infrastructure contributions
- **Peer production communities**: Tracking value flows in open-source, DAO, and collaborative network contexts
- **Business alliances**: Reducing finance costs through shared decentralized accounting infrastructure

## Relationship to the ValueFlows Ecosystem

Unyt occupies the **accounting execution layer** in the Holochain economic stack. Where [[hrea|hREA]] models economic flows (resources, events, agents, commitments) and [[valueflows|ValueFlows]] provides the shared vocabulary, Unyt handles the settlement and accounting of those flows at scale.

A natural integration pattern: hREA tracks *what happened economically*, Unyt accounts for *the financial implications*.

## Relationship to HoloFuel

Unyt is the accounting engine that will power **HoloFuel**, Holo's mutual credit accounting system for compensating hosts on the Holo network. HoloFuel requires high-throughput, low-latency accounting capable of handling microtransactions at scale, exactly what Unyt's Holochain-native architecture provides. This makes Unyt a foundational piece of Holo's commercial infrastructure, not just a standalone accounting tool.

## Related

- [[what-is-holochain|Holochain]]
- [[hrea|hREA]]
- [[valueflows|ValueFlows]]
- [[rea-accounting|REA Accounting]]

## External Links

- [Unyt](https://unyt.co/)
