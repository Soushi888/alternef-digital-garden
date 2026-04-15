---
title: "Composable Resource Networks: Bringing Accountability to Open Collaboration"
description: "How the Nondominium architecture enables traceable contributions, composable governance, and fair value distribution across open networks of physical and digital resources"
aliases:
  - "NDO composability"
  - "composable accountability networks"
  - "Nondominium architecture"
tags:
  - governance
  - holochain
  - open-source
  - open-value-networks
  - sensorica
  - commons-based-peer-production
  - contribution-accounting
  - decentralization
  - commons
  - valueflows
date: 2026-04-14
draft: false
---

FOSS has given the world an astonishing model for distributed software creation. But it has always had gaps: no clear protocol for accounting contributions across organizations, no intrinsic mechanism for distributing benefits through dependency chains, no governance model for physical or digital resources that are not code, and no accountability layer that scales as networks grow.

The **Nondominium (NDO)** architecture, built on [[what-is-holochain|Holochain]], proposes an answer to these gaps. It does not replace FOSS. It extends it into the material world and into the economic layer that FOSS has always left implicit.

## The FOSS Gap

Open source software operates on gift economy principles refined over decades. Developers contribute code, communities form around projects, and value flows informally through reputation, employment prospects, and patronage. The system works for code because code is infinitely replicable with no marginal cost.

The gaps appear at the edges:

- **Physical resources**: A CNC machine, a laboratory instrument, a shared workspace cannot be forked. Their custody, maintenance, and availability need explicit governance.
- **Contribution accounting**: Who maintains the firmware? Who repairs the hardware? Who stores the materials? These contributions are invisible to most FOSS accounting systems.
- **Benefit distribution across dependencies**: A device built on 50 open components generates revenue. None of that revenue flows back to component maintainers by protocol. It flows by choice, which means it usually does not.
- **Organizational accountability**: Who is responsible when something goes wrong? Traditional open source answers with "the contributor who submitted the PR." Real socio-economic systems need clearer, auditable accountability chains.

## The NDO Model: Resources as Networks

The core insight of the Nondominium architecture is treating **every resource as a potential network** rather than a static object.

Each Nondominium Object (NDO) is its own DHT (distributed hash table): a peer-to-peer network with its own governance, its own agents, and its own history. This means:

- A power supply is an NDO. An electronic device that uses that power supply is another NDO. The relationship between them is a **hard link**: a permanent, governance-validated record that one is a component of the other.
- This creates a **composable resource graph**: a network of networks, each governed by its own rules, each contributing to the integrity of the whole.
- Attribution flows through the graph. When a device NDO generates revenue or recognition, the OVN license ensures that value cascades downstream to all component NDOs and their contributors.

This is the software dependency graph made real, made material, and made economically consequential.

## Layered Accountability Without Hierarchy

Traditional organizations solve accountability through hierarchy: someone is in charge, and responsibility flows from authority. FOSS tried to solve it through meritocracy and reputation. Neither scales well into multi-organization, multi-resource collaboration.

The NDO architecture proposes a three-layer model that separates coordination, governance, and accountability cleanly.

**Groups** are coordination spaces. Agents come together around shared NDOs to plan work, log activities, and coordinate. Group governance is cultural: each group defines its own rules for participation. Groups are flat (no groups of groups), invite-based, and designed to evolve membership freely. A solo agent can form a group of one, ready to expand when collaborators arrive.

**NDOs** are constitutional. Each NDO has its own governance rules, its own Accountable Agents who validate contributions, and its own smart agreements defining benefit distribution. NDO governance supersedes group governance. An NDO's rules are closer to a constitution than a company policy. Crucially, resources are **groups-agnostic**: an NDO does not belong to any single group.

**Accountable Agents** span multiple groups. A person can be an Accountable Agent in an equipment NDO while being a member of several project groups. Their accountability is to the NDO, not to any single organization. This separates resource governance from organizational affiliation.

The result: accountability is composable and explicit, not implicit and hierarchical. Anyone can trace who validated what, when, and under what rules.

## The Contribution Pipeline: From Work Log to Benefit Cascade

The most powerful feature of the NDO architecture is the formal pipeline from informal work to recognized contribution to distributed benefit.

```
Agent logs work (group coordination layer)
    |
    v
Group formalizes as proposed Economic Event (like a pull request)
    |
    v
NDO Accountable Agents validate or reject
    |
    v
Validated: agent becomes recognized contributor (appears in NDO contributor list)
    |
    v
For structural incorporation: Fulfillment generates hard NDO-to-NDO link
    |
    v
Smart agreement triggered: benefit cascade through composition graph (OVN license)
```

This pipeline makes FOSS-style contribution culture explicitly economic. Work that was previously invisible becomes traceable, auditable, and compensable without requiring a corporation or a central ledger.

**Two types of interactions** at the NDO level correspond to two distinct pipeline outcomes:

- **Structural change** (incorporation): a component NDO is formally added to a project NDO. A hard link is created, permanent and publicly visible. The composition graph of the larger NDO is updated.
- **Process change** (maintenance, repair, storage): the NDO's state changes (from "in repair" to "available"), and the contributor is recognized, but the NDO's structure is not modified.

Both are governed by the NDO's own rules. Both produce auditable records.

## Two Types of NDO Links

The distinction between soft and hard links is fundamental to how planning relates to reality in this architecture.

**Soft links** are created by groups during the planning phase, when a group commits to incorporating or using an NDO. They are permissionless: any group can link to any NDO without the NDO's permission. They are invisible to the NDO itself. They represent intent and coordination, not accomplished fact.

**Hard links** are created inside the NDO's DHT upon validation of a fulfilled economic event. They represent reality: what has actually been incorporated, validated by Accountable Agents, and permanently recorded. They are intrinsic to the NDO by design, compliant with the OVN license, and publicly visible to anyone who can access the NDO.

This distinction allows groups to plan freely and coordinate openly, while the NDO's record of reality remains authoritative and tamper-evident.

## What FOSS Has Been Missing

FOSS gave the world: permissionless contribution, transparent code, community governance, and an alternative to proprietary software.

What FOSS has not given the world: a protocol for material accountability, a mechanism for cross-project benefit distribution, and a governance layer that works for non-digital resources and multi-organization networks.

| FOSS Has | NDO Adds |
|----------|----------|
| Open code | Open resource governance |
| Git contributions | Validated contribution pipeline |
| GitHub issues | NDO state machine (available, in repair, in development) |
| Fork as copy | Composition as traceable hard links |
| Stars and reputation | Private Participation Receipts, auditable contribution history |
| License for code | OVN license as executable benefit protocol |
| Project README | NDO smart agreement (benefit distribution rules) |
| No cross-project economics | Benefit cascade through composition graph |

## Discovery Without Central Authority

The Lobby DNA is the entry point for the NDO ecosystem. Rather than a central registry, it is a permissionless discovery layer where groups and NDOs are reachable through the relationships an agent already has. You discover NDOs through the groups you belong to, and you discover groups through the people you know.

Groups require an invite to join. NDOs are independently accessible to anyone whose group links to them. No central organization controls what can be registered. Spam is prevented not by governance rules but by the computational cost of creating a DHT and the social cost of an invite-only group structure.

If run inside [[moss-the-weave|Moss (The Weave)]], the Nondominium Lobby integrates with Moss's existing group and invitation infrastructure, allowing the entire ecosystem to benefit from Holochain's mature social coordination primitives.

## Toward a Composable Socio-Economic Commons

The vision that emerges from the NDO architecture is not a replacement for FOSS but a material and economic extension of its principles.

Imagine a network of makerspaces, each managing their equipment as NDOs. A laser cutter is a project-NDO that links to component NDOs: power supply, frame, control board. Every contributor is tracked. The OVN license ensures that if the design is reproduced elsewhere, attribution and benefit flow back through the network automatically.

Imagine a distributed bioregional food system: seeds are NDOs, growing plots are NDOs, distribution networks are NDOs. Each has its own Accountable Agents and governance. Groups of farmers coordinate around them. Benefits cascade to seed stewards, soil restorers, and water managers.

Imagine a FOSS project where the documentation, CI infrastructure, testing frameworks, and hardware test rigs are all NDOs. Contributions to each are tracked. Value flowing from the software flows back to the infrastructure that makes it possible.

This is what Holochain's agent-centric architecture makes possible when combined with the [[open-value-networks|OVN model]]: a world where the open-source ethic scales from code to matter, from reputation to auditable economics, from informal contribution to formal accountability, without requiring a corporation, a blockchain, or a central authority.

## Related Topics

- [[open-value-networks|Open Value Networks]]
- [[sensorica|Sensorica]]
- [[holochain-architecture-overview|Holochain Architecture]]
- [[valueflows|ValueFlows]]
- [[digital-fabrics|Digital Fabrics]]
- [[peer-to-peer-infrastructure-governance|Peer-to-Peer Infrastructure Governance]]
- [[holonic-structure|Holonic Structure]]
- [[cosmo-localism|Cosmo-Localism]]

## References

- Nondominium project: architecture and requirements documentation (Sensorica, 2024-2026)
- [Lightningrod Labs Moss](https://github.com/lightningrodlabs/moss) — canonical Holochain lobby and group pattern
- [OVN Wiki](https://ovn.world) — Open Value Network theory and practice
- [ValueFlows](https://valueflo.ws) — vocabulary for distributed economic coordination
- [Holochain Developer Portal](https://developer.holochain.org) — DHT, membrane proofs, agent-centric architecture
