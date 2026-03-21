---
title: "The History of Peer-to-Peer: Infrastructure as Governance"
date: 2026-03-21
description: "P2P does not eliminate intermediaries. It makes intermediation contestable. A historical and philosophical analysis of how each wave of P2P revealed that coordination infrastructure is always governance."
aliases: ["P2P history", "peer-to-peer governance", "infrastructure as governance"]
tags: ["governance", "peer-to-peer", "decentralization", "commons", "distributed-systems", "complexity-science"]
draft: false
---

Peer-to-peer (P2P) technology is often narrated as a liberation story: distributed networks freeing individuals from centralized control, file sharing defeating corporate gatekeepers, blockchain eliminating financial intermediaries. The history is real, but the narrative is incomplete. A closer reading reveals something more precise and more interesting than liberation: **each wave of P2P made visible that coordination infrastructure is always a governance structure**, and that the crucial question is never "centralized or decentralized?" but always: who holds design authority, and what accountability structures govern that authority?

## Origins: Survivability, Not Liberation

The structural foundation of P2P predates any liberatory ideology. Paul Baran's 1964 RAND Corporation work on distributed communications networks was funded by the US Air Force to design communication systems that could survive nuclear attack. His canonical three-topology diagram (centralized, decentralized, distributed) was a military engineering document. Leonard Kleinrock developed the mathematical theory of packet switching at MIT and UCLA for the same institutional context. ARPANET (1969) was a DARPA research project.

The origin story matters because it disrupts a common assumption: that P2P architecture was designed from political philosophy. In fact, the infrastructure came first. The political colonization of that infrastructure came decades later.

## The Cypherpunk Inflection (1988-1993)

The ideological turn happened in a San Francisco living room in 1992. Timothy C. May, Eric Hughes, and John Gilmore founded what they called the cypherpunk movement. May's *Crypto Anarchist Manifesto* (1988, circulated 1992) predicted that cryptographic software would "fundamentally alter the nature of corporations and of government interference in economic transactions." Hughes' *A Cypherpunk's Manifesto* (1993) stated the program directly: "Cypherpunks write code."

This was the moment ideology colonized existing infrastructure. The distributed network topology Baran had designed for military survivability became the architectural substrate for a political program: building systems that made certain forms of state power structurally impossible to exercise.

The cypherpunks did not invent P2P. They gave it a purpose. And that purpose generated the design requirements for everything that followed.

## Three Waves, One Pattern

The history of P2P organizes into three waves, each decentralizing one layer while recentralizing another.

### Wave 1: File Sharing (1999-2008)

Napster (1999) demonstrated the explosive potential of P2P file transfer but used centralized index servers, creating a single point of both technical failure and legal vulnerability. Its shutdown in 2001 was a lesson in the centralization paradox: decentralizing storage while centralizing discovery merely moves the chokepoint.

Ian Clarke's Freenet (2000) took the cypherpunk mandate literally: a network designed so that content could not be easily removed or traced, with encrypted fragments distributed across nodes so that no single participant could be compelled to reveal what they were hosting. Freenet was the most architecturally honest implementation of the cypherpunk ideal: censorship resistance as a structural property, not a legal or political strategy.

Bram Cohen's BitTorrent (2001) introduced a different innovation: a protocol-level incentive mechanism (tit-for-tat reciprocity) that solved the free-rider problem without requiring trust or central coordination. Each peer's selfish enforcement of upload/download ratios generates a globally efficient distribution system. This is the closest P2P came to encoding something like Elinor Ostrom's commons governance principles in software: a coordination rule that aligns individual interest with collective benefit.

But BitTorrent recentralized at the discovery layer. Tracker sites became the new chokepoints, legally coerced to shut down. The Pirate Bay's legal battles repeated the Napster pattern at a different architectural level.

### Wave 2: Trustless Coordination (2008-2017)

Satoshi Nakamoto's Bitcoin (2008) extended P2P from file transfer to value transfer. The blockchain solved the double-spending problem without trusted intermediaries, opening the design space for decentralized applications beyond file sharing. This wave claimed to eliminate financial intermediaries entirely.

What it actually did was relocate financial power. The Bitcoin block size wars (2015-2017) were years-long political battles over who controls the protocol specification. Mining pools concentrated hash power. Exchanges became the new banks, with all of a bank's vulnerabilities and none of its regulations. The Ethereum DAO hack rollback (2016) demonstrated that the "immutable protocol" was governed by a small group of developers making political decisions.

The blockchain wave's deepest lesson was about visibility: it made protocol governance legible as governance, forcing a confrontation with questions that earlier P2P systems had obscured. When Bitcoin's developers debated hard forks in public mailing lists, they were doing what all infrastructure governance does, just without the institutional fiction of neutrality.

### Wave 3: Agent-Centric Commons (2017-Present)

The third wave attempts to break the centralization paradox by rethinking what kind of architecture generates it. Systems like Secure Scuttlebutt (Dominic Tarr) and [[what-is-holochain|Holochain]] (Arthur Brock, Eric Harris-Braun) are designed around agent-centricity: each participant maintains their own cryptographic source chain, and collective coordination happens through shared validation rules (DNA) rather than global consensus.

This architectural shift has a specific governance consequence: it refuses to produce the single capturable ledger that concentrates power. There is no global state for an oligarchy to control. [[what-is-holochain|Holochain]]'s validation rules are community-defined and community-enforced. The protocol provides primitives; governance lives above the substrate, in human social structures.

The [[true-commons|True Commons]] project (Sensorica) builds on this explicitly, using [[valueflows|ValueFlows]]/REA accounting to track contributions and value flows in peer production networks, implementing Ostrom's commons governance principles as a working system rather than a metaphor.

## First Principles: What P2P Actually Is

Strip the ideology and the history, and P2P reduces to four structural properties:

- **Symmetry**: no node has a privileged position by virtue of its protocol role
- **Direct addressing**: nodes can locate and communicate without a mandatory third party
- **Voluntary participation**: nodes contribute resources by joining
- **Distributed state**: the network's information is held across multiple nodes

Everything else, censorship resistance, commons governance, political liberation, is a consequence, use case, or political interpretation layered atop these structural facts.

This decomposition reveals three hard truths that survive adversarial analysis:

**P2P removes a specific class of veto power.** The intermediary server operator's ability to unilaterally deny service is structurally eliminated. This is real and non-trivial. It is also more limited than its advocates claim.

**P2P does not remove the need for coordination; it relocates it.** Discovery requires a known contact point. Every P2P system regenerates centralization at the discovery layer because the CAP theorem applies to decentralized discovery: you cannot have consistency, availability, and partition tolerance simultaneously. This is not a design failure. It is a structural property of distributed systems.

**Technical intermediaries are less accountable than social ones.** A terms-of-service agreement is legible and contestable. A DHT routing algorithm (see [[distributed-hash-table|Distributed Hash Tables]]) is not. When social intermediaries are replaced by protocol rules, the governance does not disappear: it becomes invisible, encoded in code that most users cannot read or contest.

## The Governance Thesis

Langdon Winner asked in 1980: "Do artifacts have politics?" His answer was yes: technical systems embed social relationships and power structures in their design, often in ways that outlast the intentions of their creators. The history of P2P is the most extensive empirical test of Winner's thesis in the history of computing.

Every P2P system is a constitutional document. It determines who may speak, who may be silenced, what governance moves are computationally possible, and what attractors the system's dynamics will reach. Bitcoin's proof-of-work constitutionalizes plutocracy: capital buys hash rate, which buys governance. Holochain's agent-centric validation constitutionalizes something different: it refuses to produce the capturable ledger, distributing the metabolic cost of coherence so that no single entity can accumulate control.

These are not neutral engineering choices. They are political choices, made by specific people at specific historical moments, with consequences that unfold over decades.

## The Complexity Lens

From a [[complexity-science|systems theory]] perspective, P2P networks are genuinely emergent: local agents following simple rules (tit-for-tat reciprocity, DHT routing, source chain validation) produce coherent macro-behavior that no one designed top-down. But emergence does not guarantee equality. Barabasi's preferential attachment theorem shows that growing networks with attachment proportional to existing connections will always produce scale-free, power-law degree distributions: hubs emerge inevitably from local interactions.

This means that P2P removes designed intermediaries and replaces them with emergent ones. The question is whether the emergent intermediaries are more accountable than the designed ones. The historical record is mixed. Mining pool operators emerged from Bitcoin's protocol dynamics but are not more democratically accountable than banks. Tracker site operators emerged from BitTorrent dynamics but were no more resistant to legal coercion than Napster.

The insight is that you cannot design away intermediaries entirely. You can, however, design the selection environment: the protocol rules that determine which attractors are reachable. Holochain's design explicitly attempts to create a fitness landscape where no single hub can accumulate the kind of control that mining pools accumulated in Bitcoin.

## What Survives: The Contestable Intermediary

The most defensible claim about P2P's historical significance: it did not liberate us from intermediaries, but it made intermediation contestable.

Before P2P, intermediaries were invisible as intermediaries. The telephone company was infrastructure. The broadcaster was culture. The bank was finance. P2P made the political nature of infrastructure legible: every architectural choice embeds power relationships, and those relationships can be designed differently.

This epistemic contribution is not nothing. It is, arguably, the most important thing P2P has given us: a generation of builders who understand, viscerally, that the protocol is always already political. That understanding is now available to inform the design of systems that take it seriously from the start, like [[what-is-holochain|Holochain]], [[valueflows|ValueFlows]], and the [[open-value-networks|Open Value Networks]] model.

The leverage point is not the protocol or the governance separately. It is the coupling between them: does the protocol preserve communities' right to organize their own governance above the substrate? Protocols that honor that right enable commons governance. Those that do not calcify hierarchy, whether through design or through the emergent dynamics their architecture selects for.

## Related Topics

- [[peer-to-peer|Peer-to-Peer Networking]] (philosophical foundations)
- [[distributed-hash-table|Distributed Hash Tables]] (discovery layer architecture)
- [[what-is-holochain|Holochain]] (agent-centric P2P implementation)
- [[open-value-networks|Open Value Networks]] (commons-based peer production)
- [[true-commons|True Commons]] (commons governance implementation on Holochain)
- [[complexity-science|Complexity Science]] (emergence, attractors, scale-free networks)
- [[valueflows|ValueFlows]] (REA ontology for commons accounting)
- [[knowledge/governance-and-community/index|Governance and Community]]

## References

- Paul Baran, *On Distributed Communications* (RAND Corporation, 1964)
- Timothy C. May, *The Crypto Anarchist Manifesto* (1988/1992)
- Eric Hughes, *A Cypherpunk's Manifesto* (1993)
- Ian Clarke et al., "Freenet: A Distributed Anonymous Information Storage and Retrieval System" (2000)
- Bram Cohen, "Incentives Build Robustness in BitTorrent" (2003)
- Petar Maymounkov and David Maziers, "Kademlia: A Peer-to-Peer Information System Based on the XOR Metric" (2002)
- Satoshi Nakamoto, *Bitcoin: A Peer-to-Peer Electronic Cash System* (2008)
- Yochai Benkler, *The Wealth of Networks* (2006)
- Elinor Ostrom, *Governing the Commons* (1990)
- Langdon Winner, "Do Artifacts Have Politics?" (1980)
- Albert-Laszlo Barabasi and Reka Albert, "Emergence of Scaling in Random Networks" (1999)
