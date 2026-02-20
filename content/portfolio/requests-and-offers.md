---
title: "Requests & Offers"
description: "A peer-to-peer marketplace on Holochain enabling community members to publish requests and offers for skills, services, and resources, with ValueFlows economic flow integration."
tags:
  - holochain
  - svelte
  - rust
  - distributed-systems
  - p2p
  - valueflows
  - hrea
  - effect
---

## What It Is

Requests & Offers is a [[what-is-holochain|Holochain]] application that enables community members to publish requests and offers, creating organic matchmaking for skills, services, and resources without a centralized marketplace.

Developed as part of the **hAppenings Community** ecosystem, it serves as both a practical coordination tool and a proving ground for Holochain application patterns.

---

## Why It Matters

The simplest question in any community is: *who needs what, who can provide it, and how do they find each other?*

Centralized platforms answer this question by extracting data and rent. Requests & Offers answers it with a [[peer-to-peer|peer-to-peer]] network where participants own their data, interactions happen directly between agents, and no intermediary takes a cut.

---

## Technical Architecture

The backend is [[rust|Rust]] compiled to [[webassembly|WebAssembly]], structured as modular Holochain zomes:

- **Administration**: Admin roles, content moderation, user verification
- **Users & Organizations**: Agent profiles, organization management, team coordination
- **Requests**: Request lifecycle, tag association, discovery
- **Offers**: Offer lifecycle, tag association, discovery
- **Service Types**: Service registry with admin approval workflow
- **Mediums of Exchange**: Value exchange mechanisms and tracking

The frontend is [[svelte|Svelte 5]] with [[sveltekit|SvelteKit]], Skeleton UI, and a **7-layer Effect TS architecture** providing structured service layers, schema validation, centralized error handling, and composable component logic. The app integrates with **Weave/Moss** for group-based deployment alongside standalone mode.

---

## ValueFlows Economic Flow

The application implements the full [[hrea|hREA]] economic flow with feedback-driven validation:

**Agent → Proposal → Intent → Agreement → Commitment → Economic Event → Resource**

Key design choice: economic events are created **conditionally**, only after positive feedback from the service recipient. This feedback loop acts as a quality gate, ensuring that value is recorded only when both parties confirm fulfillment. Negative feedback triggers a resolution process rather than automatic recording.

This creates a reputation layer: aggregated feedback history across an agent's interactions becomes a trust signal within the network.

---

## Shared Foundation with [[nondominium|Nondominium]]

Both Requests & Offers and Nondominium are built on the same Holochain stack (HDK 0.6 / HDI 0.7), use Svelte 5 + SvelteKit frontends, and share a [[valueflows|ValueFlows]]/[[hrea|hREA]] semantic foundation. Both projects are also exploring [[unyt|Unyt]] integration for decentralized accounting at scale.

Where Nondominium tracks **shared resource custodianship**, Requests & Offers handles **service discovery and exchange**, complementary layers of the same distributed economic infrastructure.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | [[rust|Rust]] / [[what-is-holochain|Holochain]] zomes / [[webassembly|WebAssembly]] |
| Frontend | [[svelte|Svelte 5]] / [[sveltekit|SvelteKit]] / Skeleton UI / Effect TS |
| Ontology | [[valueflows|ValueFlows]] / [[hrea|hREA]] (`@valueflows/vf-graphql-holochain`) |
| Integration | Weave / Moss (group-based deployment) |
| Accounting | [[unyt|Unyt]] (planned) |

**Repository:** [happenings-community/requests-and-offers](https://github.com/happenings-community/requests-and-offers)

---

## Context

Part of the hAppenings Community, a group building practical tools for the Holochain ecosystem. The project demonstrates that distributed applications can be both sophisticated in architecture and simple in purpose, answering the basic coordination question every community faces.
