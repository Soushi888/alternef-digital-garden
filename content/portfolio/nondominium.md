---
title: "Nondominium"
description: "Distributed resource management on Holochain, a ValueFlows-compliant application for tracking and governing shared resources through custodianship rather than ownership."
tags:
  - holochain
  - valueflows
  - rust
  - svelte
  - distributed-systems
  - commons
  - sensorica
---

## What It Is

Nondominium is a [[valueflows|ValueFlows]]-compliant application for tracking and governing shared resources on [[what-is-holochain|Holochain]]. It implements a **custodianship model**: resources belong to the commons and are managed by designated custodians rather than owners.

The project is developed in close collaboration with Tiberius Brastaviceanu (Tibi), co-founder of [[sensorica|Sensorica]] and long-time guardian of the [[open-value-networks|Open Value Network]] vision.

---

## Why It Matters

Most software for managing shared resources either assumes private ownership (enterprise ERP) or requires a trusted central authority (platform cooperatives). Nondominium takes a different path: resources are held in common, and the system tracks *who is responsible for what* rather than *who owns what*.

This custodianship model maps directly to how many communities already operate in practice: tool libraries, community gardens, maker spaces, open hardware projects. Nondominium gives these patterns a digital backbone.

---

## Technical Architecture

The backend is [[rust|Rust]] compiled to [[webassembly|WebAssembly]], built as three modular Holochain zomes:

- **Person**: Agent profiles with field-level privacy, capability tokens with expiration windows, and role-based access control
- **Resource**: Resource specifications, instance lifecycle tracking (creation to end-of-life), custody chains, and four economic processes: use, transport, storage, repair
- **Governance**: A 14-category PPR (Private Participation Receipt) reputation system, commitment management, multi-reviewer validation workflows, and progressive capability advancement

The frontend is [[svelte|Svelte 5]] with [[sveltekit|SvelteKit]] and Tailwind CSS, communicating with the Holochain conductor via the client SDK.

The ontological foundation draws from [[rea-accounting|REA]] (Resource-Event-Agent) accounting theory and the [[valueflows|ValueFlows]] vocabulary, with a planned [[hrea|hREA]] integration as backend engine via direct Rust-to-Rust cross-DNA calls.

---

## ERP Bridge

The [nondominium-erp-bridge](https://github.com/Sensorica/nondominium-erp-bridge) is a Python middleware layer that connects legacy ERP systems to the Nondominium network. It transforms ERP inventory data into ValueFlows-compliant structures and syncs them to Holochain via HTTP gateway, allowing organizations to gradually bridge their existing tools into the distributed commons.

---

## Agent-Centric, Not Blockchain

Nondominium is not a blockchain. It is **agent-centric**: each participant maintains their own source chain while a distributed hash table provides validation and data integrity across the network. No global consensus, no mining, no tokens, just cryptographically signed agreements between peers.

This architecture means the system works offline, scales horizontally, and respects the sovereignty of each participant. See [[what-is-holochain|What is Holochain]] for a deeper dive into the infrastructure.

---

## Shared Foundation with [[requests-and-offers|Requests & Offers]]

Both Nondominium and Requests & Offers are built on the same Holochain stack (HDK 0.6 / HDI 0.7), use Svelte 5 + SvelteKit frontends, and share a ValueFlows/hREA semantic foundation. Both projects are also exploring [[unyt|Unyt]] integration for decentralized accounting at scale.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | [[rust|Rust]] / [[what-is-holochain|Holochain]] zomes / [[webassembly|WebAssembly]] |
| Frontend | [[svelte|Svelte 5]] / [[sveltekit|SvelteKit]] / Tailwind CSS |
| Ontology | [[valueflows|ValueFlows]] / [[rea-accounting|REA]] / [[hrea|hREA]] (planned) |
| Bridge | Python / Holochain HTTP Gateway |
| Accounting | [[unyt|Unyt]] (planned) |

**Repositories:**
- [Sensorica/nondominium](https://github.com/Sensorica/nondominium)
- [Sensorica/nondominium-erp-bridge](https://github.com/Sensorica/nondominium-erp-bridge)

---

## Context

Developed within [[sensorica|Sensorica's]] [[open-value-networks|Open Value Network]] ecosystem. Sensorica has been pioneering commons-based peer production since 2011, and Nondominium is the next step in giving these economic patterns native digital infrastructure.
