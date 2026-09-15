---
title: "Holons and the Great Work"
description: "A code-level reading of Holons, the coordination toolkit lived at Liminal Village, against commons infrastructure on Holochain: where the ground is shared, where the words only rhyme, and the problem neither has solved."
aliases:
  - "Holons (Liminal Village)"
  - "Holons.io"
tags: ["governance", "agent-centric", "commons", "holochain", "valueflows", "nondominium"]
date: 2026-09-10
draft: true
---

*Two laboratories stuck at the same unfinished step: neither yet lets the people bound by its rules change those rules, and neither has handed its pattern to a stranger.*

---

[Holons](https://www.holons.io/) is an open-source coordination toolkit incubated at Liminal Village, a co-living regenerative community in the Marche region of Italy, and it powers the Regenerativa network of bioregional communities. Read quickly, it looks like a cousin of the Holochain commons stack: it speaks of membranes, DNA, holarchies and value flows. Read in its code, it turns out to have rebuilt, independently and in one year, the same three layers that [[requests-and-offers|Requests and Offers]], [[nondominium|Nondominium]] and [[hrea|hREA]] have been building on Holochain.

That makes it worth more than a comparison of vocabularies. This note reads both sides against their code, as of Holons commit `ed2644d` (30 August 2026) and Nondominium commit `20adb11` (29 August 2026), to separate the ground they share from the words that only rhyme.

## What Holons Is

**A protocol vocabulary.** A holon has a *membrane* (who is in and what it is for), a *value equation* (a weighted formula converting contributions into points and points into shares), *splitters* and *threshold buckets* (fund what is needed first, then route surplus to federated holons), and *federation* declared as trust between holons. The broader proposal behind it is THEOS, the Holonic Earth Operating System.

**One software core with many faces.** A TypeScript monorepo puts all domain logic in a single core package, then exposes it through a web dashboard, a Telegram bot, Discord, voice, a village kiosk, a Claude tool-use loop and an MCP server. The idea is to meet people where they already talk.

**A permissive data layer.** Data lives in GunDB through the HoloSphere library, where every H3 geographic cell is addressable as a holon. The core's own write check is documented as "used for UI gating, not security enforcement". An opt-in Nostr signing layer adds signed writes, a signed membership log with admin add and remove, and revocation as of a point in time. Ethereum contracts hold funds and enforce payout arithmetic.

**A lived laboratory, and a company holding the code.** The software is used daily at Liminal Village. It is dual-licensed under AGPL and a paid commercial licence, and contributors sign a CLA granting sublicensable rights to Rigenerativa SRL. Most of the history is one author's work.

## Where the Ground Is Shared

| Layer | Holons | Holochain commons stack |
|---|---|---|
| Exchange | `needs/`: group buys, handoffs, settlement, ratings | Requests and Offers |
| Shared resources | `library/`: bookings, deposits, federated booking | Nondominium custodianship |
| Economic record | A Valueflows event store, added August 2026 | hREA |
| Contribution accounting | Per-holon value equation, egalitarian by default | Open Value Network practice from Sensorica |

The record layer on both sides is [[valueflows|Valueflows]], and the contribution idea on the Holochain side comes from [[open-value-networks|Open Value Networks]] as practised at [[sensorica|Sensorica]].

Two caveats keep this table honest. The Valueflows alignment is real but covers the record of what happened: `EconomicEvent`, `Action`, `Measure`, `ResourceSpecification` and `Process`, with no `Commitment`, `Intent` or `Agreement`. So the shared ground is a vocabulary for observation, not yet shared semantics for promises. And the value equation carries the OVN idea without attributing it; nothing in the repository names Sensorica, so the lineage is plausible rather than documented.

Still, an independent team, starting from a different movement (its listed partners are the Venus Project, the Zeitgeist Movement and the Resource-Based Economy), converged on Valueflows as the way to write down an economy. That is evidence for the idea that the vocabulary is a meeting point, and it arrived without anyone asking.

## Where the Words Only Rhyme

| Word | In Holons | On Holochain |
|---|---|---|
| Holarchy | H3 geographic containment: hexagons inside hexagons | Nested membership networks, as in Nondominium's Lobby, Group and NDO |
| DNA | A library of values, practices and tools, stored as data | Validation rules in the integrity zome, hashed into the network's identity |
| Membrane | A social boundary configured in settings | A membrane proof checked when an agent joins |
| Agent | The group owns its namespace | An individual keypair with its own source chain |

One is geography and the other jurisdiction; one describes a culture and the other binds every peer. The [[holonic-structure|holonic]] language is shared in earnest, but it points at different structures.

## The Thesis That Did Not Survive

The first reading this comparison produced was tidy: Holons places enforcement in the community, where living together does the work, while Holochain places it in the protocol, so the pattern survives among strangers. In Holons DNA describes; in Holochain DNA binds.

It compared a design with a build. Nondominium, still a proof of concept and saying so in its code, does not yet do what that sentence claims. Every DNA's `validate_agent_joining` returns valid ("for this proof of concept, access is permissionless"). Economic event validation checks the action against the resource's classification but never looks at the author. Role checks such as who may validate a contribution live in coordinator zomes, which other peers do not run as validation. What does bind today is real, author equality, classification constraints, immutable hard links, agreement versioning, but it is not the membrane.

Holons, meanwhile, is more than a permissive store. Its signed membership mode is a genuine authorization layer, and its own documentation describes a shadow mode that measures the forgery surface before enforcement is switched on. It is switched off in the production web configuration, because enforcing it would hide older unsigned data.

## The Problem Both Share: Delegated Agency

What survives is not an opposition but a common gap: **who may act on behalf of whom**.

In Holons, the payout contracts state that only the owner can submit claims on behalf of users, typically through the bot, so one operator key and a Telegram identity decide who acts. Voting weight is `1 + round(averageRating × ratingCount)`, so accumulated stars become voting power. In Nondominium, the same question is answered by coordinator code and open joining. Neither project has yet made this the kind of rule a peer can refuse to accept.

## Four Readings

### Commons governance

Read through Pettit, domination lies in the *capacity* to interfere, not in its use. Holons carries three such capacities: an operator key acting for members, a treasury rate that is "meant to be" changed by a passed proposal but is in practice a settings write, and code rights concentrated in one company by a CLA. Each is a master who may be kind.

Read through [[ostroms-design-principles|Ostrom]], long-enduring commons need clear boundaries, and permissionless joining is open access, the condition of the [[tragedy-of-the-commons|tragedy of the commons]], not a commons. Ostrom also asks that those bound by the operational rules take part in changing them. Integrity validation enforces the operational level and leaves the collective-choice level empty: it settles enforcement, not capture. And exit is not a remedy here. A member who republishes their signed events to another relay has flight, not contestation.

### Protocol engineering

A rule enforced by the reader is a filter any other client can ignore; a rule enforced at write is one peers can reject. That is the real technical asymmetry, and it cuts in Holochain's favour only once the slot is filled. As the [[validation-rules-as-interpretive-membrane|validation rules note]] puts it, changing hashed rules makes a second network: a schism implemented in a build system.

Amendment does not have to wait for a new network. It can live one tier down: the integrity code accepts a rule entry only when it carries countersignatures meeting a quorum sealed in the DNA, and every governed action cites the rule it obeys, checked with `must_get_valid_record`. The rule for changing rules stays compiled. One problem stays open: validation cannot prove that the rule an action cites has not since been superseded.

### Complexity

Koestler's holon has two faces: a self-assertive tendency that holds the part together and an integrative tendency that joins it to the whole. Delegation is where integration acts; the membrane is where self-assertion holds. Holons has already met Koestler's pathology in its own data layer. Propagation used to fan every write up the H3 ancestry and, for whole-record lenses, replaced the target holon's own record with the writer's; the fix was to make integration opt-in rather than to harden the boundary. Neither project yet has a boundary that can say no.

Read through Meadows, rating-weighted voting is a success-to-the-successful loop, and the power to change the system's structure sits with one author and one company. Read through Morin, the product must become the producer: the village produces the code, and the code must reproduce villages elsewhere. A fork closes that loop only when its divergence comes back upstream as information the parent must answer. A fork that carries nothing back is a one-way door. See [[complexity-science|complexity science]] and [[fractal-sovereignty|fractal sovereignty]].

### The Great Work

Read alchemically, Holons is a laboratory that lit its fire before sealing its vessel. Sulphur is abundant: a real house of transition, people eating together. Mercury is quick: Telegram, voice, a kiosk, an author working with a machine. Salt is thin: open storage, membership switched off, an operator acting for members. The Holochain commons stack is the inverse: Salt written as principle and not yet fixed, even in its own membranes.

Two lessons follow. The stone is found in a house, not in a repository, and a membrane proof written before anyone has been turned away at a real door fixes a guess in place. And the pattern dies with its author unless every laboratory keeps the old rule of seeking a worthy successor. For a small volunteer project that rule is concrete: before a release, someone who has never spoken with the builders builds, deploys and amends the application from the repository alone.

## Where the Readings Converge

- Events from a Holons network can enter a Holochain economic network through the shared Valueflows grammar, but as **signed claims** checked by integrity code, never as settled facts.
- A membrane must be able to refuse someone, and it should not depend on a genesis admin key.
- Before encoding dispute rules, study how a lived community actually settles its disputes.

## Where They Still Disagree

- **Peers or not.** The protocol reading holds that a network whose rules any client can ignore cannot meet a validating network as an equal. The complexity reading wants a dialogue between wholes.
- **Exit.** The commons reading calls it flight. The complexity reading accepts it only when forks federate back. The alchemical reading holds that a fork carrying the whole work is not flight.
- **When to seal.** Write the validation now, where the debt can be paid, or write it from a dispute that has actually happened.
- **Closed or living boundaries.** Ostrom's boundaries are clear; a living membrane lets some things through.

## Holons and the Great Work

Holons is ahead on the house: lived practice, interfaces people already use, and a concrete exit that republishes a member's signed history to any relay. The Holochain commons stack is ahead on the grammar: deeper Valueflows semantics and an integrity layer where refusal can be made structural. Neither has yet let the people bound by its rules change them, and neither has handed its pattern to someone who never met its builders. If there is a stone, it is the loop between the house and the repository.

## Related Topics

- [[holonic-structure|Holonic Structure]]
- [[fractal-sovereignty|Fractal Sovereignty]]
- [[validation-rules-as-interpretive-membrane|Validation Rules as Interpretive Membrane]]
- [[ostroms-design-principles|Ostrom's Design Principles]]
- [[commons-governance-thesis|Commons Governance Thesis]]
- [[open-value-networks|Open Value Networks]]
- [[agent-centric-architecture|Agent-Centric Architecture]]
- [[nostr|Nostr]]
- [[knowledge/governance-and-community/index|Governance and Community]]

## References

- [Holons](https://www.holons.io/): project site
- [Holons documentation](https://docs.holons.io/): protocol, funding flow and glossary
- [THEOS, the Holonic Earth Operating System](https://docs.theos.io/): the broader protocol proposal
- [liminalvillage/holons](https://github.com/liminalvillage/holons): source code, read at commit `ed2644d`
- [Sensorica/nondominium](https://github.com/Sensorica/nondominium): source code, read at commit `20adb11`
- [The Ghost in the Machine](https://en.wikipedia.org/wiki/The_Ghost_in_the_Machine): Koestler's introduction of the holon
- [Reference architecture for holonic manufacturing systems: PROSA](https://www.researchgate.net/publication/222464513_Reference_architecture_for_holonic_manufacturing_systems_PROSA): holons in engineering practice
- [Serious security vulnerability in GunDB](https://joonas.fi/2020/01/20/serious-security-vulnerability-in-gundb-and-new-ones/): an independent analysis of GunDB's write model
- [Why Your Project Doesn't Need a Contributor Licensing Agreement](https://sfconservancy.org/blog/2014/jun/09/do-not-need-cla/): Software Freedom Conservancy on CLAs
- [The Venus Project on the economic calculation problem](https://www.thevenusproject.com/faq/how-do-you-respond-to-what-critics-refer-to-as-the-economic-calculation-problem/): the Resource-Based Economy lineage answering its main critique
