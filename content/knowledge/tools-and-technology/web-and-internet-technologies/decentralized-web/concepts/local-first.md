---
title: Local-First Software
date: 2025-02-20
updated: 2026-05-24
description: A design philosophy where applications store all data locally on the user's device, enabling offline use and user data sovereignty, while allowing optional collaboration over a network
aliases:
  - local-first
  - Local-First
  - local-first software
tags: ["decentralization", "software-architecture", "privacy", "local-first", "distributed-systems"]
---

Local-first software is a design philosophy and set of technical principles where applications store all data on the user's own device. The network is optional — used for sync and collaboration when available, never as the gatekeeper to your own files. The manifesto was articulated by Ink & Switch in 2019, in contrast to the prevailing cloud-first model where your data lives primarily on a server you don't control.

The core tension local-first resolves: cloud apps offer seamless collaboration but surrender data sovereignty; traditional desktop apps offer ownership but isolation. Local-first targets both simultaneously.

## Seven Ideals (Ink & Switch)

The original local-first paper described seven properties that define the ideal:

1. **No spinners** — The app works instantly, without network round-trips for every action
2. **Your work is not trapped on one device** — Data syncs to all your devices
3. **The network is optional** — Full functionality offline; connectivity enhances, not enables
4. **Seamless collaboration** — Multiple users can edit simultaneously without conflicts
5. **The long now** — Files remain readable and editable decades from now, without vendor lock-in
6. **Security and privacy by default** — Data encrypted at rest and in transit; no server sees plaintext
7. **You retain ultimate ownership** — You can always access and export your data; the vendor going dark doesn't destroy your work

## Key Technologies

Local-first requires specific technical primitives:

- **CRDTs (Conflict-free Replicated Data Types)**: Data structures that merge concurrent edits without conflicts or central coordination — the mathematical foundation for offline-first collaboration. See [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/conflict-free-replicated-data-types|CRDTs]]
- **End-to-end encryption**: Client-side encryption ensures sync servers handle only ciphertext they cannot read
- **Append-only logs**: Immutable event logs that can be replicated and merged deterministically
- **Peer-to-peer sync**: Direct device-to-device sync without intermediary servers (e.g., [[iroh|Iroh]], Syncthing)

## Contrast with Cloud-First

| | Cloud-first | Local-first |
|---|---|---|
| Latency | Round-trip to server | Instant (local read/write) |
| Offline | Degraded or broken | Full functionality |
| Ownership | Vendor holds data | User holds data |
| Collaboration | Real-time via server | CRDT-based, eventually consistent |
| Longevity | Tied to vendor's uptime | Files persist indefinitely |
| Privacy | Server sees data | Optional server visibility |

## Trade-offs

Local-first is not without costs:

- **Sync complexity**: CRDTs and conflict resolution are hard to implement correctly
- **Storage**: Each device holds a full copy; large datasets multiply storage requirements
- **Discovery**: Finding collaborators requires some rendezvous mechanism (a relay server or DHT)
- **Backup**: The user is responsible for backups — cloud apps provide this by default
- **Cross-platform**: Building offline-capable apps across web, mobile, and desktop requires careful architecture

## Examples

- **Obsidian**: Notes stored as local Markdown files; sync is optional and user-controlled
- **Linear** (partially): Optimistic UI with local cache; not fully local-first
- **Automerge / Yjs**: CRDT libraries for building local-first collaborative apps
- **[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]]**: Agent-centric distributed apps where each agent's [[source-chain|Source Chain]] is their authoritative local record

## Related

- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/conflict-free-replicated-data-types|CRDTs]] — The data structure enabling conflict-free offline collaboration
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] — Agent-centric framework built on local-first principles
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/index|Decentralized Web]] — Broader movement toward user-owned internet infrastructure
- [[knowledge/governance-and-community/index|Governance and Community]] — Data sovereignty as a governance principle

## References

- [Local-first software: You own your data, in spite of the cloud](https://www.inkandswitch.com/local-first/) — The original Ink & Switch manifesto (2019)
- [Local-First Web Development](https://localfirstweb.dev) — Community hub for local-first practitioners
- [Local-First Software research paper](https://martin.kleppmann.com/papers/local-first.pdf) — Academic treatment by Martin Kleppmann
- [The Cloud is a Prison](https://www.wired.com/story/the-cloud-is-a-prison-can-the-local-first-software-movement-set-us-free/) — Wired on the local-first movement
