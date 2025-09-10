---
title: "hREA (Holochain Resource-Event-Agent)"
description: "hREA is an open-source framework designed to facilitate economic network coordination using the Holochain platform, implementing the Valueflows specification based on the REA accounting model."
date: 2025-03-14
tags:
  - holochain
  - hrea
  - economic-networks
  - valueflows
  - rea
  - decentralized-coordination
---

# hREA (Holochain Resource-Event-Agent)

hREA, or Holochain Resource-Event-Agent, is an open-source framework designed to facilitate economic network coordination using the [[what-is-holochain|Holochain]] platform. It is an implementation of the [[valueflows|Valueflows]] specification, which is itself based on the [[rea-accounting|Resource-Event-Agent (REA) accounting model]]. This system aims to provide a transparent, decentralized, and trusted way to track and manage the flow of resources and information between independent agents—such as individuals, organizations, or communities—within and across economic ecosystems.

## Core Concepts

The REA model, originally developed as an alternative to traditional double-entry bookkeeping, focuses on three key elements:

- **Resources**: Tangible or intangible assets, such as goods, services, or skills, that have economic value.
- **Events**: Actions or transactions that affect resources, like production, consumption, or transfers.
- **Agents**: The entities (people, groups, or organizations) that participate in these events by giving or receiving resources.

hREA builds on this by integrating it with Holochain, a distributed computing framework that emphasizes [[agent-centric-architecture|agent-centric design]] over the data-centric approach of traditional blockchains. This allows each participant (agent) to maintain their own secure record of events while still contributing to a shared network of economic activity.

## How It Works

hREA leverages Holochain's peer-to-peer architecture to enable scalable, modular, and customizable economic coordination. Unlike blockchain systems that rely on a single global ledger, Holochain uses a distributed hash table (DHT) where each agent validates and stores their own data, ensuring privacy and scalability. hREA provides a suite of tools and libraries—most notably a JavaScript GraphQL interface—that developers can use to build applications tailored to specific economic needs.

Key features include:

- **Modularity**: hREA offers building blocks (e.g., agent management, event tracking, planning tools) that can be mixed and matched to suit various use cases, from supply chain management to community resource sharing.

- **Valueflows Integration**: It follows the Valueflows protocol, a standardized vocabulary for describing economic flows, making hREA interoperable with other systems that support this specification (like Bonfire).

- **Decentralized Coordination**: Agents can collaborate across networks without centralized control, supporting both conventional economies and alternative models like gift or contributory economies.

## Applications

hREA is designed to support a wide range of economic activities, including:

- **Resource Tracking**: Monitoring the movement of resources through supply chains or local exchange systems.
- **Agreement Management**: Planning and managing commitments between agents, such as contracts or mutual obligations.
- **Value Flow Transparency**: Enabling visibility into the social, environmental, and financial impacts of economic activities.
- **Alternative Economic Models**: Supporting post-capitalist paradigms by recognizing diverse forms of value beyond monetary transactions.

For example, a community could use hREA to coordinate the sharing of tools, while a business network might use it to optimize logistics and resource planning—all without relying on a central authority.

## Technical Architecture

hREA's architecture consists of several key components:

1. **Holochain Backend**: hREA runs as a Holochain application (hApp), using Holochain's runtime for data storage, integrity, and networking.

2. **Core Modules**:
   - **Economic Resources**: For tracking physical and digital assets
   - **Economic Events**: For recording actions that affect resources
   - **Economic Agents**: For managing identities and relationships
   - **Planning**: For creating and tracking commitments and intents
   - **Process**: For defining and monitoring transformation activities

3. **GraphQL API**: Provides a standardized interface for developers to interact with the system, making it accessible for building custom user interfaces.

4. **Scalability**: Because it avoids global consensus mechanisms, hREA can scale to large networks while maintaining efficiency and resilience.

## Integration with Holochain

hREA takes full advantage of Holochain's unique features:

- **Agent-Centricity**: Each participant maintains sovereignty over their own data while still participating in a collective system.
- **Distributed Validation**: The network ensures data integrity without requiring global consensus.
- **Offline-First**: Users can work without constant internet connectivity, with changes synchronizing when connection is restored.
- **Scalability**: The system can grow without the performance limitations of blockchain-based solutions.

## Purpose and Vision

The broader goal of hREA is to rethink economic accounting and coordination. Traditional systems often focus solely on financial value, ignoring social and environmental impacts. hREA, through its REA and Valueflows foundations, aims to make these "externalities" visible, fostering more sustainable and equitable economic networks.

hREA is particularly suited for:

- **Cooperative Networks**: Supporting transparent governance and fair value distribution.
- **Supply Chain Transparency**: Enabling end-to-end visibility of resource flows and impacts.
- **Community Economic Development**: Facilitating local exchange systems and resource sharing.
- **Regenerative Economics**: Accounting for ecological and social value alongside financial metrics.

## Current Status and Development

hREA is an active open-source project with ongoing development. The framework provides a foundation that developers can build upon to create specialized applications for different economic contexts. Its modular design allows for customization while maintaining interoperability through the Valueflows standard.

## Example Use Case: Local Food Network

A local food network could use hREA to:

1. Track produce from farm to consumer, recording each step in the supply chain.
2. Manage agreements between farmers, processors, and retailers.
3. Enable consumers to see the full history and impact of their food purchases.
4. Facilitate alternative exchange mechanisms beyond traditional currency.
5. Support planning and coordination across the network without centralized control.

## Related Concepts and Projects

- [[local-first-accountability|Local-First Accountability]]
- [[valueflows|ValueFlows]]
- [[rea-accounting|REA Accounting]]
- [[what-is-holochain|What is Holochain]]
- [[agent-centric-architecture|Agent-Centric Architecture]]
- [[ovn-hrea-mattereum|OVN hREA Mattereum]] 