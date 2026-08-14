---
title: "Agent-Centric Architecture: The Holochain Distinction"
description: "Holochain is agent-centric, not data-centric. Where blockchain treats the global ledger as the source of truth, Holochain treats each agent's local chain as the source of truth with a DHT as the shared validation layer."
date: 2026-08-11
updated: 2026-08-14
aliases:
  - "Agent-Centric Architecture"
  - "Agent-Centric Design"
tags:
  - programming
  - holochain
  - agent-centric
  - distributed-systems
  - peer-to-peer
  - decentralization
draft: false
---

## The distinction

Holochain is agent-centric, not data-centric. Where blockchain (Bitcoin, Ethereum) treats the global ledger as the source of truth and every node as a validator of every transaction, Holochain treats each agent's local chain as the source of truth for that agent's actions, with a DHT (distributed hash table) as the shared validation and discovery layer.

The practical consequence: Holochain has no global consensus bottleneck, no gas fees, no scalability ceiling imposed by a chain. An agent writes to their own chain (fast, local), publishes headers to the DHT, and peers validate according to application-level DNA rules.

## Why this matters for commons infrastructure

Commons-based organizations (Sensorica, Nondominium, the hREA ecosystem) need coordination infrastructure that does not extract value. A data-centric chain either charges gas (extractive) or requires a consortium validator set (oligarchic). An agent-centric DHT lets each member own their data, validate their peers, and fork the DNA (application rules) if governance diverges.

This supports the ValueFlows economic ontology at the infrastructure layer: VF defines the economic primitives, Holochain provides the sovereign P2P substrate they run on.

## Architectural primitives

- **DNA**: the application definition (entry types, link types, validation rules, zome code). Forkable, versionable.
- **Cell**: a running instance of a DNA, bound to an agent.
- **DHT**: the shared space where entries and links are published and validated by random peer neighborhoods.
- **Zome**: a module of code (integrity zome for data model, coordinator zome for logic).
- **HDK/HDI**: the Rust development kits for writing zome code.

## Current state (2026-08)

Holochain v0.7 upgrade is in progress across Nondominium, hAppenings/R&O, and hREA. The Holochain framework ships regular releases; the ecosystem is small but shipped (production hApps exist, not just demos).

## Related Topics

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] - The substrate this architecture describes
- [[dna-and-zomes|DNA and Zomes]] - How the DNA, integrity zome, and coordinator zome split works in practice
- [[validation-rules|Validation Rules]] - The peer validation workflow this architecture depends on
- [[agent-terminology|Agent Terminology]] - Holochain's glossary of agency, agent activity, and agent ID
- [[hrea|hREA]] - The ValueFlows implementation running on this substrate
- [[valueflows|ValueFlows]] - The economic ontology this architecture supports at the infrastructure layer
- [[validation-rules-as-interpretive-membrane|Validation Rules as Interpretive Membrane]] - Why peer-applied admissibility rules are a governance decision
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/architecture/index|Holochain Architecture]] - Broader section context
