---
title: "Web 3.0"
description: "The vision of a decentralized, user-sovereign internet built on semantic foundations, value networks, and agent-centric protocols."
date: 2025-02-15
updated: 2026-03-21
aliases:
  - Web3
  - Web 3
  - Web3.0
tags: ["programming", "web3", "decentralization", "semantic-web", "blockchain", "holochain"]
---

Web 3.0 describes the next generation of the internet, one where users own their data, control their identity, and participate in value networks without relying on centralized platforms. It is less a single technology than a convergence of several distinct visions; understanding the tensions between them reveals what this shift actually means.

## From Read to Read-Write-Own

The evolution of the web follows a pattern of expanding participation:

- **Web 1.0**: Read-only. Static pages, information broadcasting, no user interaction.
- **Web 2.0**: Read-write. Social platforms, user-generated content, but concentration of power in a few platforms that own the data.
- **Web 3.0**: Read-write-own. Decentralized infrastructure where users hold their own keys, data, and participation in networks.

The failure mode of Web 2.0 is not technical but architectural. Platforms aggregate data and extract rent from communities that generate value. Web 3.0 is the attempt to redesign that relationship at the protocol level.

## Two Complementary Visions

Web 3.0 has two distinct intellectual genealogies that are often conflated:

### The Semantic Web (Berners-Lee, 1998)

Tim Berners-Lee's original vision of Web 3.0 was a *web of meaning*: machine-readable linked data using shared vocabularies (ontologies) so computers could reason across distributed information. The [[knowledge/tools-and-technology/web-and-internet-technologies/semantic-web/index|Semantic Web]] is built on RDF (data as graph triples), SPARQL (query language), and schema.org-style vocabularies. The goal was interoperability through shared language; any system that speaks the vocabulary can participate.

This vision remains underbuilt but profoundly relevant: it provides the *language layer* for describing knowledge, relationships, and economic flows in a machine-readable way.

### Web3 (Crypto/Blockchain, 2014+)

The crypto movement reframed Web 3.0 around ownership and programmable value. Ethereum introduced smart contracts: programs that execute on a shared blockchain without a central authority. This enabled [[tokenomie|tokenomics]], [[decentralized-application|decentralized applications]] (dApps), and DeFi protocols that replace banks and exchanges with code.

This vision provides the *value layer*: infrastructure for transferring, locking, and programming economic relationships peer-to-peer.

The deepest version of Web 3.0 combines both: the semantic web's interoperability with the crypto ecosystem's censorship-resistant value transfer.

## Two Infrastructure Paradigms

Within the decentralized web, two fundamentally different architectures compete and complement each other:

### Blockchain: Data-Centric

Blockchain systems (Ethereum, Cardano, Polkadot) establish a globally shared state that all nodes agree on. Every transaction is validated against this global ledger. Security comes from economic incentives: proof-of-work (computational cost) or proof-of-stake (capital at risk).

The design philosophy is *data-centric*: there is one canonical version of truth, and the network's job is to agree on it. This enables trustless coordination between strangers, but at a cost: consensus is expensive, fees fluctuate, and scalability requires compromises.

See: [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/index|Blockchain]].

### Holochain: Agent-Centric

[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] starts from a different premise: instead of asking "what is the global truth?", it asks "what did this agent actually do?"

Each participant maintains their own cryptographically signed source chain, a personal ledger of their actions. Shared state emerges through mutual peer validation: when you publish data to the distributed hash table, your peers validate it against the shared DNA (application rules) and sign it. No global consensus is needed.

This [[agent-centric-architecture|agent-centric architecture]] has profound implications:

- **Sovereignty by design**: your data lives on your device first
- **Infinite scalability**: applications scale with participants, not against them
- **No miners, no fees**: validation is a social contract, not an economic one
- **Integrity through mutual accountability**: not through computational waste

The tradeoff: agent-centric systems are harder to reason about when interactions require global coordination (which blockchains handle naturally through shared state).

## ValueFlows: Economic Language Across Paradigms

[[valueflows|Valueflows]] is the protocol that bridges these worlds. Built on the [[rea-accounting|REA (Resource-Event-Agent) accounting model]] and expressed in RDF (the same semantic web vocabulary Berners-Lee championed), it provides a universal language for describing economic flows:

- **Resources**: anything of value (goods, time, data, money, ecological services)
- **Events**: actions that transform resources (produce, transfer, consume)
- **Agents**: participants who provide or receive resources

Because Valueflows is an RDF ontology, it speaks the semantic web's language. Because it is implementation-agnostic, it can be deployed on Holochain (via [[hrea|hREA]]), on blockchain, or in centralized systems. The vocabulary works anywhere that can speak linked data.

This makes Valueflows the economic layer of a truly interoperable Web 3.0: communities can track value flows in their own infrastructure while remaining interoperable with others who share the vocabulary. It moves beyond financial transactions toward capturing all forms of value: time, care, ecological impact, knowledge sharing.

## Toward Commons-Based Value Networks

The convergence of these layers points toward something beyond simple financial decentralization:

1. **Semantic Web** provides the shared vocabulary: meaning that machines and humans can exchange without platform lock-in
2. **Decentralized infrastructure** (Holochain for agent-sovereignty, blockchain for trustless coordination) removes the need for extractive intermediaries
3. **ValueFlows** provides the economic grammar: describing how resources flow between agents in any kind of network, not just monetary ones

Together, they form the technical foundation for [[open-value-networks|Open Value Networks]]: distributed production communities that track and reward all contributions transparently, without a central platform extracting rent. Projects like [[digital-permaculture|Digital Permaculture]] explore how these principles apply to designing regenerative digital ecosystems.

## Related Topics

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/index|Decentralized Web]]: the broader ecosystem of decentralized protocols
- [[knowledge/tools-and-technology/web-and-internet-technologies/semantic-web/index|Semantic Web]]: linked data and machine-readable knowledge
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/index|Blockchain]]: data-centric decentralized ledgers
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]]: agent-centric distributed computing
- [[valueflows|Valueflows]]: REA-based economic protocol for value networks
- [[rea-accounting|REA Accounting]]: the accounting model beneath Valueflows
- [[open-value-networks|Open Value Networks]]: commons-based production using these technologies
