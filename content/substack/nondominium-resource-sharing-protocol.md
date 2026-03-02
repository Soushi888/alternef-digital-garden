---
title: "The Sharing Economy Lied to You. Here's What Real Resource Sharing Looks Like."
subtitle: "How a decade of peer production, open standards, and agent-centric infrastructure are converging into a protocol that governs itself"
date: "2026-03-02"
author: "Soushi888"
preview: "Uber doesn't share anything. Airbnb doesn't share anything. But what if the coordination layer itself could be genuinely peer-to-peer?"
tags: [commons-based-peer-production, resource-sharing, holochain, distributed-governance, peer-to-peer, alternative-economy, valueflows]
readTime: "9 min"
---

*Uber doesn't share anything. Airbnb doesn't share anything. They captured the language of sharing while building some of the most centralized, extractive platforms of the digital era. So what would genuine peer-to-peer resource sharing actually look like?*

---

![People sharing resources, tools, vehicles, and solar panels through a decentralized network governed by embedded protocols](nondominium-image.jpg)

## The Problem with the "Sharing Economy"

Remember when the sharing economy was supposed to change everything? The pitch was compelling: people would share their spare rooms, their cars, their tools, and communities would become more connected and resourceful in the process.

What actually happened was something quite different.

These platforms captured the language of sharing while building some of the most centralized, extractive business models of the digital era. They sit between peers, control the rules of engagement, own all the data, set the prices, and take a cut of every transaction. The people who provide the actual value (their cars, their homes, their labor) have no say in how the platform operates and no ownership of the relationships they build through it.

This is not a sharing economy. It is a micro-service economy with better marketing.

The problem is not that peer-to-peer coordination doesn't work. Millions of people successfully coordinate through these platforms every day. The problem is *who controls the coordination layer*. When a single company owns the rules, the matching algorithm, the reputation system, and the communication channel, "peer-to-peer" becomes a polite fiction. The platform is the real intermediary, and it captures the lion's share of the value.

So the question becomes: what would a genuine peer sharing protocol look like? One where the governance of shared resources is not imposed by a platform operator, but embedded in the resources themselves? Where organizations and individuals can coordinate across boundaries without surrendering control to a central authority?

That is the question [Nondominium](https://github.com/sensorica/nondominium) is designed to answer.

## What It Actually Looks Like in Practice

Before diving into the history and architecture, consider a concrete scenario.

A makerspace in Montreal has a 3D printer sitting idle three days a week. A cooperative across town needs one for a short production run. Today, they would probably never find each other, or if they did, it would happen through word of mouth with no shared protocol for managing the arrangement.

With Nondominium, that 3D printer exists in a shared network as a resource with a **custodian** (the makerspace), a **governance profile** (who can request it, what conditions apply, what maintenance obligations come with use), and a full history of previous custodianship transfers. The cooperative discovers it through the network, initiates a request that triggers the governance rules embedded in the resource specification, and a custodianship transfer is validated and recorded. Both parties receive cryptographically signed participation receipts documenting the interaction. When the production run is done, the machine returns to the makerspace with its maintenance log updated and its reputation trail extended.

No platform takes a cut. No central authority imposed the rules. The governance traveled with the resource itself.

That is the core idea. Now let's look at where it comes from.

## A Decade of Foundations

Nondominium does not emerge from thin air. It is the latest chapter in a story that spans more than a decade of practical experimentation, standard-setting, and software development at the intersection of commons-based peer production and distributed systems.

**[Sensorica](https://www.sensorica.co)** was co-founded in 2011 by Tiberius Brastaviceanu as an **Open Value Network** (OVN): one of the first organizations to seriously attempt commons-based peer production outside of software. No employees, no bosses, no fixed hierarchy. Contributors self-organize around projects, pool resources, and share benefits according to transparent contribution accounting.

Running an organization like this surfaces coordination challenges that most economic software simply ignores. How do you track who contributed what when there is no payroll? How do you manage shared equipment when there is no single owner? How do you coordinate resource flows across a network of autonomous contributors without a central authority dictating terms?

These were not theoretical questions. They were daily operational realities.

In 2013, Lynn Foster and Bob Haugen began collaborating closely with Sensorica to build the tools this new form of organization desperately needed. The result was the **NRP/CAS** (Network Resource Planning and Contribution Accounting System): the first serious attempt at software designed specifically for Open Value Network coordination. It was functional, and it was groundbreaking. But it was also a centralized web application backed by a single database, which created a structural contradiction for an organization built on decentralized principles. Whoever hosted the server ultimately held power over the network's data and operations.

Despite this limitation, years of running a real peer production network on real software produced hard-won insights into what works, what breaks, and what patterns keep recurring regardless of the specific organization.

Lynn and Bob then recognized that these patterns were universal. Drawing on William E. McCarthy's **[REA accounting model](https://en.wikipedia.org/wiki/Resources,_Events,_Agents)** (a 1982 framework that describes economics in terms of Resources, Events, and Agents rather than abstract ledger categories), they co-developed the **[Valueflows specification](https://www.valueflo.ws/)**: a shared vocabulary for describing economic activity in distributed networks, designed from the ground up to coordinate across organizational boundaries.

Valueflows is not software. It is a common language that different applications can speak, allowing them to interoperate without sharing a database or agreeing on implementation details.

The next step was **[hREA](https://github.com/h-REA/hREA)**: a Holochain implementation of Valueflows, providing a reference that any Holochain application can build on.

Nondominium picks up this thread and pushes it into specific, uncharted territory: applying Valueflows to the challenge of resource mutualization across organizational boundaries.

## How Nondominium Works

### Custodianship, Not Ownership

The most fundamental shift Nondominium makes is conceptual.

In conventional systems, resources are *owned*. Ownership means exclusive control: I own this, you do not, and if you want to use it, we need a transaction that transfers ownership or grants a temporary license.

Nondominium replaces ownership with **custodianship**. A resource exists in a commons. Specific agents are custodians: they are responsible for the resource, accountable for its condition, and authorized to manage its use according to agreed-upon rules. Custodianship can transfer from one agent to another, and each transfer is recorded, validated, and governed by the protocol.

This is not the absence of property relations. It is a different topology of them. Resources still have stewards. There are still clear rights and responsibilities. But the resource is not locked inside one organization's database, and no single entity extracts rent from the coordination process.

### Governance Travels with the Resource

In Uber, governance is imposed by the platform. In a traditional ERP, governance is implicit in the organization's internal policies, invisible to anyone outside.

In Nondominium, governance is embedded directly in the resources themselves through **ResourceSpecifications**. Each type of resource carries its own governance profile: who can become a custodian, what conditions must be met for transfer, what maintenance obligations exist, what happens in case of damage or dispute.

In practice: an agent issues an intent to interact with a specific resource. The governance layer checks that all conditions are met and paves the way for the agent to initiate the process. As the agent proceeds, the governance layer modifies the resource's state accordingly (marking it from "available" to "unavailable," associating a new custodian, updating maintenance obligations). When a resource moves from Organization A to Organization B, the governance follows. Both parties operate under the same rules, transparently, without needing to negotiate from scratch or trust a third party to enforce the agreement.

### Private Participation Receipts

Trust in a decentralized system cannot depend on a central reputation authority like Uber's star ratings or Airbnb's review system.

Nondominium introduces **Private Participation Receipts** (PPRs): every interaction between agents generates a pair of cryptographically signed receipts, one for each party. These bi-directional receipts create an immutable audit trail of resource flows, build verifiable reputation over time based on actual interactions, and function as credentials. An agent who has successfully managed dozens of custodianship transfers for heavy equipment has a provable track record, not because a platform says so, but because the cryptographic receipts exist.

Critically: agents control their own receipts. There is no public scoreboard and no centralized database of everyone's history. Reputation is portable and agent-controlled.

### The ERP Bridge

Because Nondominium is protocol-based, it also functions as an interoperability layer. Organizations do not need to abandon their existing tools.

Through a bridge service currently under development, organizations can selectively publish inventory from their existing ERP systems (Dolibarr, ERPLibre, NextERP) to the Nondominium network, discover resources from other organizations, and coordinate sharing workflows while maintaining full sovereignty over their internal data. The ERP continues to manage day-to-day operations; Nondominium provides the shared substrate underneath.

This positions Nondominium as a bridge between business-to-business and community-to-community resource flows, something that neither traditional ERPs nor consumer-facing sharing platforms are designed to handle.

## Why Holochain: The Mycelium Beneath the Forest

The choice of [Holochain](https://www.holochain.org/) as the infrastructure for Nondominium is not incidental. It reflects a deep alignment between the protocol's values and the platform's architecture.

Holochain is **agent-centric**: each participant maintains their own source chain of data and interactions. You do not need the entire network to agree on the state of the world before you can act. You maintain your own history, sign your own data, and share it with the network on your own terms.

For commons-based resource coordination, this is exactly right. Organizations participating in a mutualization network do not want to expose all their internal operations to a global ledger. They want to share what they choose to share, maintain sovereignty over their own data, and participate in coordination without surrendering autonomy.

Holochain's **Distributed Hash Table** functions as a layer of shared awareness. Resources, their specifications, their governance profiles, and their custodianship histories are discoverable across the network without being stored on any central server.

The metaphor that keeps recurring in this work is the mycelium network beneath a forest. The trees (organizations) appear separate above ground, but underground they are connected by a vast network of fungal threads that allow them to share nutrients, send signals, and coordinate responses to changing conditions. Holochain's DHT is the mycelium for resource mutualization: invisible, decentralized, and essential for the health of the whole ecosystem.

Holochain also does not require global consensus. Traditional blockchains need the entire network to agree before any transaction is valid. Holochain uses local validation: each node validates the data it receives according to shared rules, and the network achieves eventual consistency through gossip. This mirrors how real-world resource sharing actually works between autonomous organizations. When a cooperative lends equipment to a partner, they validate it locally, according to shared rules, and the information propagates through the network as needed.

## The Bigger Picture: Building a Commons Economic OS

Nondominium does not exist in isolation. It is one component of a larger emerging stack for commons-based economic infrastructure.

**[True Commons](https://github.com/Sensorica/true_commons)** is the broader platform for commons-based peer production, co-developed by Tibi and Sacha Pignot as the next-generation NRP/CAS built on Holochain and Valueflows. Where Nondominium handles resources (what exists, who stewards it, how it flows), True Commons handles contributions (who did what, how benefits are shared, what to work on next).

The **[Requests and Offers](https://github.com/happenings-community/requests-and-offers)** application from the hAppenings Community addresses the discovery and matching layer: how agents signal what they need and what they can provide. Also built on Holochain and Valueflows, it could serve as a natural front door to the resource sharing workflows that Nondominium manages behind the scenes.

And **[Unyt](https://unyt.co/)** (a Holochain Foundation subsidiary) provides mutual credit currency infrastructure, enabling high-volume microtransactions without consensus bottlenecks. Integrating mutual credit currencies into Nondominium's resource flows, so custodianship transfers and service contributions carry economic weight natively within the protocol, is a direction actively being explored.

The vision is composable: Nondominium for resource governance, True Commons for contribution accounting, and Unyt-powered currencies for the transactional fabric connecting them. Each piece remains independent, but together they could form a complete economic operating system for the commons.

The sharing economy promised that technology would help people share resources more effectively. That promise was captured by platforms that turned sharing into extraction. Nondominium is part of the effort to fulfill the original promise, one protocol at a time.

---

## Want the Full Deep-Dive?

The complete article covers:

- The full intellectual lineage from McCarthy's 1982 REA model through Valueflows to Nondominium
- The multi-layered validation architecture (semantic, cryptographic, and social)
- How to get involved as a Rust/Holochain developer, pilot partner, or funder

**[Read the full article on Alternef Digital Garden](https://soushi888.github.io/alternef-digital-garden/blog/nondominium-presentation)** 

---

*What resources sit idle in your network? Have you ever tried to share them across organizational boundaries, and what broke down when you tried? I'd love to hear what coordination challenges you've run into.*

*If this resonated, subscribe to [Alternef](https://alternef.substack.com) for more explorations at the intersection of commons economics, distributed systems, and alternative economic infrastructure.*
