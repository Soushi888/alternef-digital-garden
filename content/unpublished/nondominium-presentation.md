---
title: "Nondominium: Building the Resource Sharing Engine for the Commons Economy"
subtitle: "How a decade of peer production experience, open economic standards, and agent-centric infrastructure are converging into a protocol for genuine resource mutualization"
description: "From Sensorica's open value networks through ValueFlows to Nondominium — a protocol for genuine peer-to-peer resource mutualization without centralized intermediaries, built on Holochain."
date: 2026-02-18
author: "Soushi888"
tags:
  - commons-based-peer-production
  - resource-sharing
  - distributed-governance
  - peer-to-peer
  - holochain
  - valueflows
  - open-value-network
  - economic-protocol
  - alternative-economy
  - decentralized-coordination
  - sharing-economy
  - unyt
  - mutual-credit
categories:
  - Alternative Economics
  - Distributed Systems
aliases:
  - Nondominium
  - Resource Sharing Protocol
draft: false
---

## The Problem Worth Solving

Remember when the "sharing economy" was supposed to change everything? The pitch was compelling: people would share their spare rooms, their cars, their tools, and communities would become more connected and resourceful in the process.

What actually happened was something quite different. Uber doesn't share anything. Airbnb doesn't share anything. These platforms captured the language of sharing while building some of the most centralized, extractive business models of the digital era. They sit between peers, control the rules of engagement, own all the data, set the prices, and take a cut of every transaction. The people who provide the actual value, their cars, their homes, their labor, have no say in how the platform operates and no ownership of the relationships they build through it.

This is not a sharing economy. It is a micro-service economy with better marketing.

The problem is not that peer-to-peer coordination doesn't work. It clearly does. Millions of people successfully coordinate through these platforms every day. The problem is *who controls the coordination layer*. When a single company owns the rules, the matching algorithm, the reputation system, and the communication channel, "peer-to-peer" becomes a polite fiction. The platform is the real intermediary, and it captures the lion's share of the value.

So the question becomes: what would a genuine peer sharing protocol look like? One where the governance of shared resources is not imposed by a platform operator but embedded in the resources themselves? Where organizations and individuals can coordinate across boundaries without surrendering control to a central authority?

That is the question Nondominium is designed to answer.

## The Roots: From NRP/CAS to ValueFlows to Nondominium

Nondominium does not emerge from thin air. It is the latest chapter in a story that spans more than a decade of practical experimentation, standard-setting, and software development at the intersection of commons-based peer production and distributed systems.

### Sensorica and the Coordination Challenge

Sensorica was founded in 2011 as an Open Value Network (OVN), one of the first organizations to seriously attempt commons-based peer production outside of software. Unlike traditional companies or even cooperatives, Sensorica has no employees, no bosses, and no fixed hierarchy. Contributors self-organize around projects, pool resources, and share the value they create according to transparent contribution accounting.

Running an organization like this surfaces coordination challenges that most economic software simply ignores. How do you track who contributed what when there is no payroll? How do you manage shared equipment when there is no single owner? How do you coordinate resource flows across a network of autonomous contributors without a central authority dictating terms?

These were not theoretical questions. They were daily operational realities.

### Lynn Foster, Bob Haugen, and the Birth of NRP/CAS

In 2013, Lynn Foster and Bob Haugen began a close collaboration with Sensorica to build the tools that this new form of organization desperately needed. The result was the NRP/CAS: a Network Resource Planning and Contribution Accounting System. It was the first serious attempt at software designed specifically for Open Value Network coordination.

NRP/CAS allowed Sensorica to track contributions, manage shared resources, coordinate processes, and distribute value. It was functional, and it was groundbreaking. But perhaps more importantly, it was a learning machine. Years of running a real peer production network on real software produced hard-won insights about what works, what breaks, and what patterns keep recurring regardless of the specific organization using them.

### The Generalization: ValueFlows

Lynn and Bob did not stop at building one tool for one organization. They recognized that the patterns emerging from Sensorica's experience were universal. Any network of autonomous agents coordinating economic activity would face the same fundamental challenges: tracking resources, recording events, making commitments, expressing intentions.

Drawing on REA (Resources, Events, Agents) accounting theory, a framework originally developed for enterprise accounting but remarkably well suited to distributed economic activity, they co-developed the ValueFlows specification. ValueFlows is not software. It is a vocabulary: a shared set of concepts and relationships for describing economic activity in distributed networks. Think of it as a common language that different applications can speak, allowing them to interoperate without having to share a database or agree on implementation details.

ValueFlows was a generalization born from years of practice. It carries the DNA of real-world peer production inside its design.

### hREA and the Holochain Connection

The next step was bringing ValueFlows to a distributed computing platform that matched its values. hREA (Holochain REA) implements the ValueFlows specification on Holochain, providing a reference implementation that any Holochain application can build upon. The vocabulary is now being adopted across multiple projects in the Holochain ecosystem, creating the foundation for an interoperable network of economic applications that speak the same language.

Nondominium picks up this thread and pushes it into specific, uncharted territory: applying ValueFlows to the challenge of resource mutualization across organizational boundaries.

## What Is Nondominium?

At its core, Nondominium is a protocol for resource mutualization. Not a marketplace. Not a listing service. A protocol that defines how physical and digital resources can be shared, tracked, and governed across organizations without any central platform controlling the process.

### Custodianship, Not Ownership

The most fundamental shift Nondominium makes is conceptual. In conventional systems, resources are *owned*. Ownership means exclusive control: I own this, you do not, and if you want to use it, we need a transaction that transfers ownership or grants a temporary license.

Nondominium replaces ownership with custodianship. A resource exists in a commons. It is not "owned" by anyone in the traditional sense. Instead, specific agents are custodians: they are responsible for the resource, accountable for its condition, and authorized to manage its use according to agreed-upon rules. Custodianship can transfer from one agent to another, and each transfer is recorded, validated, and governed by the protocol.

This is not the absence of property relations. It is a different topology of them. Resources still have stewards. There are still clear rights and responsibilities. But the resource is not locked inside one organization's database, and no single entity extracts rent from the coordination process.

### Organization-Agnostic by Design

One of the deepest problems with current resource management systems is that they are organizational silos. Your company's ERP knows about your company's assets. Your makerspace's inventory system knows about your makerspace's tools. But a CNC machine sitting idle in one shop cannot be discovered by the cooperative down the street that needs it this week.

Nondominium is designed from the ground up to be organization-agnostic. A resource in the Nondominium network is not "Sensorica's drill press" or "BuildCoop's crane." It is a resource with a custodian, a history, a set of capabilities, and a governance profile. It can flow between organizations, cooperatives, individuals, and communities without being re-registered, re-entered, or re-validated for each new context.

### Governance as Operator

Here is where Nondominium departs most radically from both traditional ERPs and platform-based sharing services. In Uber, governance is imposed by the platform: Uber sets the rules, the prices, the matching algorithm. In a traditional ERP, governance is implicit in the organization's internal policies.

In Nondominium, governance is embedded directly in the resources themselves through ResourceSpecifications. Each type of resource carries its own governance profile: who can become a custodian, what conditions must be met for transfer, what maintenance obligations exist, what happens in case of damage or dispute. The governance rules travel with the resource, not imposed from above by a platform and not locked inside any single organization's policies.

This means that when a resource moves from Organization A to Organization B, the governance follows. Both parties operate under the same rules, transparently, without needing to negotiate from scratch or trust a third party to enforce the agreement.

### The B2B and C2C Bridge

Because Nondominium is organization-agnostic and protocol-based, it naturally functions as an interoperability layer. An organization running TikiWiki for internal project management, another using WordPress, and a third with a custom system can all participate in the same resource mutualization network. Nondominium does not require anyone to abandon their existing tools. It provides the shared substrate underneath, connecting heterogeneous systems through a common economic vocabulary.

This positions Nondominium as a bridge between business-to-business and community-to-community resource flows, something that neither traditional ERPs nor consumer-facing sharing platforms are designed to handle.

## How It Works: The Protocol Layer

### ValueFlows Compliance

Nondominium is fully compliant with the ValueFlows specification and built on REA accounting theory. Every economic activity in the system is described using the same vocabulary: Resources, Events, Agents, Processes, Commitments, Intents. This is not proprietary infrastructure. It is built on open standards that have been refined by the ValueFlows community over years of collaborative development.

This matters for interoperability. Any other ValueFlows-compatible application can potentially interact with Nondominium's data. The economic grammar is shared.

### Private Participation Receipts

Trust in a decentralized system cannot depend on a central reputation authority like Uber's star ratings or Airbnb's review system. Nondominium introduces Private Participation Receipts (PPRs): every interaction between agents generates a pair of cryptographically signed receipts, one for each party.

These bi-directional receipts serve multiple functions simultaneously. They create an immutable audit trail of resource flows. They build verifiable reputation over time, based on actual interactions rather than subjective ratings. And they function as credentials: an agent who has successfully managed dozens of custodianship transfers for heavy equipment has a provable track record, not because a platform says so, but because the cryptographic receipts exist.

The "private" in PPR is important. Agents control their own receipts. There is no public scoreboard and no centralized database of everyone's history. Reputation is portable and agent-controlled.

### Specialized Roles in the Resource Lifecycle

Resources do not just sit in one place waiting to be used. They move, they need storage, they require maintenance. Nondominium models this reality through specialized roles that are not job titles but protocol-level capabilities with their own validation rules:

**Transport** covers the movement of resources between custodians. A transport event records what moved, from whom, to whom, and under what conditions. Transport agents have their own credentials and accountability.

**Storage** addresses the responsible stewardship of resources while they are idle. Storage is not passive. A custodian responsible for storage has obligations: environmental conditions, security, accessibility. These obligations are encoded in the resource's governance profile.

**Repair and Maintenance** ensures that shared resources remain functional over time. This is where mutualization truly diverges from the "use it and forget it" model of consumer sharing platforms. When resources are held in common, their long-term health is everyone's concern, and the protocol makes maintenance visible, trackable, and accountable.

### Multi-Layered Validation

Without a central authority, how do you ensure that transactions are legitimate, that governance rules are followed, and that bad actors cannot corrupt the system?

Nondominium uses a multi-layered validation pipeline. Semantic validation checks that the data structures are well-formed. Business rules validation ensures that governance policies embedded in ResourceSpecifications are respected. Cryptographic validation verifies the identity and authorization of all parties. Cross-system validation handles consistency across organizational boundaries. And social/reputation validation draws on the accumulated PPR history to assess trustworthiness.

No single layer is sufficient on its own. Together, they provide robust integrity without requiring anyone to trust a central server.

## Why Holochain? The Mycelium Beneath the Forest

The choice of Holochain as the infrastructure for Nondominium is not incidental. It reflects a deep alignment between the protocol's values and the platform's architecture.

### Agent-Centricity for Commons Coordination

Holochain is agent-centric, meaning each participant maintains their own source chain of data and interactions. This is fundamentally different from blockchain's global consensus model or traditional client-server architectures. In Holochain, you do not need the entire network to agree on the state of the world before you can act. You maintain your own history, sign your own data, and share it with the network on your own terms.

For commons-based resource coordination, this is exactly right. Organizations participating in a mutualization network do not want to expose all their internal operations to a global ledger. They want to share what they choose to share, maintain sovereignty over their own data, and participate in coordination without surrendering autonomy. Agent-centricity makes this possible at the protocol level.

### The DHT as Shared Awareness

Holochain's Distributed Hash Table functions as a layer of shared awareness. Resources, their specifications, their governance profiles, and their custodianship histories are discoverable across the network without being stored on a central server. Organizations can find available resources, verify credentials, and initiate transactions through this shared substrate.

The metaphor that keeps recurring in our work is the mycelium network beneath a forest. The trees (organizations) appear separate above ground, but underground they are connected by a vast network of fungal threads that allow them to share nutrients, send signals, and coordinate responses to changing conditions. Holochain's DHT is the mycelium for resource mutualization: invisible, decentralized, and essential for the health of the whole ecosystem.

### No Global Consensus, Just Local Validation

One of Holochain's most distinctive properties is that it does not require global consensus. Traditional blockchains need the entire network to agree before any transaction is valid. Holochain uses local validation: each node validates the data it receives according to shared rules (the DNA), and the network achieves eventual consistency through gossip rather than synchronized agreement.

This mirrors how real-world resource sharing actually works between autonomous organizations. When a cooperative lends equipment to a partner, they do not wait for every organization on Earth to validate the transaction. They validate it locally, according to shared rules, and the information propagates through the network as needed.

### From Development to Deployment

The infrastructure for running Holochain applications is maturing rapidly. HoloPorts provide dedicated hardware for hosting Holochain applications, and Edge Nodes enable always-on network participation without relying on cloud servers. In December 2024, we successfully deployed HolOS and Edge Nodes on five different HoloPorts during a workshop at Sensorica's lab, demonstrating that the path from development to real distributed infrastructure is becoming practical, not just theoretical.

## The Bigger Picture: Nondominium Within the True Commons Ecosystem

Nondominium does not exist in isolation. It is one component of a larger vision for commons-based economic infrastructure.

### The Resource Sharing Engine

Nondominium's specific focus is resource mutualization. It answers the questions: What resources exist in this network? Who stewards them? What are the rules for access and transfer? How do they flow between custodians? It is the engine that makes shared resource governance operational.

### True Commons: The Peer Production Platform

True Commons is the broader platform being developed for commons-based peer production, essentially the next-generation NRP/CAS built on Holochain and ValueFlows. Where Nondominium handles resources, True Commons handles the full scope of peer production coordination: contribution accounting, benefit redistribution through value equations, stigmergic coordination (enabling contributors to self-organize around visible needs and opportunities), and process management.

### How the Pieces Compose

The relationship between Nondominium and True Commons is complementary, not competitive.

Nondominium handles: *What resources exist? Who stewards them? How do they flow?*

True Commons handles: *Who contributed what? How are benefits shared? What should we work on next?*

Together, they form the infrastructure for a network economy where coordination happens without extraction. Resources are mutualized through Nondominium. Contributions are tracked and rewarded through True Commons. And the whole system runs on Holochain, ensuring that the infrastructure itself is not captured by any single entity.

This is not just a vision. It is a direct continuation of the work that Lynn Foster and Bob Haugen began with Sensorica over a decade ago, now being built on infrastructure that finally matches the ambition: distributed, agent-centric, and commons-aligned from the ground up.

## Future Horizons

One of the natural questions that arises with resource mutualization is: what about the transactional layer? When resources flow between custodians, when maintenance is performed, when transport is arranged, there are often economic exchanges involved. Nondominium tracks these flows through ValueFlows events, but the integration of actual currency systems opens another dimension entirely.

This is where projects like Unyt become particularly interesting. Unyt provides professional-grade accounting infrastructure for mutual credit currencies on Holochain, enabling high-volume microtransactions without the consensus bottlenecks of blockchain systems. The potential to integrate Mutual Credit Currencies into Nondominium's resource flows, allowing custodianship transfers and service contributions to carry economic weight natively within the protocol, is a direction we are actively exploring. Early conversations are underway, though this integration is still in its conceptual phase.

The vision is composability: Nondominium for resource governance, True Commons for contribution accounting, and Unyt-powered currencies for the transactional fabric connecting them. Each piece remains independent, but together they could form a complete economic operating system for the commons.

## Where We Are and How to Get Involved

Nondominium is currently in active development. The core architecture is defined and the MVP focuses on three foundational zomes: person management (agent identity and roles), resource tracking (specifications, lifecycle, custodianship), and governance (state transitions, validation rules, access control).

We are building this as open infrastructure for the commons economy, and we need collaborators.

**If you are a Rust/Holochain developer** interested in commons infrastructure, the codebase is open and we welcome contributions. Building the economic coordination layer for peer-to-peer resource sharing is challenging, rewarding work.

**If you represent an organization** that manages shared resources, whether a cooperative, a makerspace, a tool library, or any network where resources flow between autonomous participants, we are looking for pilot partners who want to test real-world mutualization workflows.

**If you are interested in funding** commons-based infrastructure, Nondominium is positioned at a critical intersection: ValueFlows compliance ensures interoperability, Holochain provides the distributed substrate, and the protocol addresses a real, unsolved problem in the cooperative and commons economy.

The sharing economy promised that technology would help people share resources more effectively. That promise was captured by platforms that turned sharing into extraction. Nondominium is part of the effort to fulfill the original promise, building the tools for genuine resource mutualization, one protocol at a time.

---

*Nondominium is developed by Sensorica in collaboration with the hAppenings Community. It builds on the foundational work of Lynn Foster and Bob Haugen (ValueFlows, NRP/CAS) and the hREA implementation on Holochain.*

*To learn more or get involved, reach out through [Sensorica](https://www.sensorica.co) or the hAppenings Community channels.*
