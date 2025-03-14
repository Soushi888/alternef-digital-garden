---
title: "Valueflows"
description: "Valueflows is an open-source vocabulary and protocol designed to describe and track the flow of resources, events, and agents in economic and social ecosystems."
date: 2025-03-14
tags:
  - finance
  - economic-networks
  - protocols
  - rea
  - value-flows
  - decentralized-coordination
---

# Valueflows

Valueflows is an open-source vocabulary and protocol designed to describe and track the flow of resources, events, and agents in economic and social ecosystems. It builds on the [[rea-accounting|Resource-Event-Agent (REA) accounting model]] and provides a standardized way to represent economic activities—such as production, consumption, transfer, or sharing—in a way that's interoperable across different platforms and applications. It's not a standalone software but a framework that other systems, like [[hrea|hREA on Holochain]] or Bonfire, can implement to enable decentralized coordination and transparency.

## Core Concepts

Valueflows is rooted in the REA model, which breaks economic activity into three main components:

- **Resources**: Things of value that can be tracked, like goods (e.g., apples), services (e.g., repair work), or intangible assets (e.g., knowledge). These are called "economic resources."
- **Events**: Actions that affect resources, such as creating, consuming, transferring, or transforming them. These are "economic events."
- **Agents**: The individuals, organizations, or groups that participate in these events by providing or receiving resources.

Valueflows extends this model by adding a focus on **flows**—the movement of resources between agents over time—and by supporting a broader definition of value, beyond just money. It aims to capture not only financial transactions but also social, environmental, and other forms of value that are often ignored in traditional accounting.

## Key Features

1. **Standardized Vocabulary**: Valueflows provides a common language (ontology) to describe economic processes. For example, it defines terms like "transfer," "produce," or "commitment" consistently, so different systems can understand and share data seamlessly.

2. **Process-Oriented**: It models economic activity as a series of processes (e.g., making a product) that involve inputs (resources used) and outputs (resources created), linked by events and agents.

3. **Planning and Observation**: It distinguishes between:
   - **Intent**: Plans or commitments for future actions (e.g., "I intend to deliver 10 chairs next week").
   - **Event**: What actually happens (e.g., "I delivered 8 chairs today").
   - This supports both planning and real-time tracking.

4. **Flexibility**: It can handle traditional monetary economies as well as alternative models like barter, gift economies, or commons-based sharing.

5. **Interoperability**: By using a shared protocol, Valueflows enables different software platforms to exchange data, fostering collaboration across networks.

## Structure of Valueflows

Valueflows organizes economic activity into three main layers:

- **Knowledge Layer**: Defines the types of resources, processes, and roles (e.g., a recipe for making bread or a specification for a service).
- **Plan Layer**: Outlines intentions, commitments, or schedules (e.g., agreeing to trade 5 apples for 3 oranges next Tuesday).
- **Observation Layer**: Records what actually happens (e.g., the apples and oranges were exchanged).

These layers connect through "flows," which describe how resources move or transform as a result of events between agents.

## Examples

- **Supply Chain**: A farmer (agent) grows wheat (resource) in a production event, transfers it to a miller (another agent), who processes it into flour (another event), and so on. Valueflows tracks each step, including quantities, dates, and impacts.

- **Community Sharing**: A group shares a lawnmower (resource). Valueflows logs who borrows it (event) and who maintains it, ensuring fair use without money changing hands.

- **Environmental Impact**: A company tracks not just profit but also carbon emissions (a resource) generated or offset during production, making "externalities" visible.

## Purpose and Vision

Valueflows was created to support next-generation economic systems that are decentralized, collaborative, and holistic. Traditional accounting focuses narrowly on financial profit, often overlooking social or ecological costs. Valueflows aims to:

- Make all forms of value (e.g., time, care, sustainability) measurable and trackable.
- Enable peer-to-peer networks to coordinate without central authorities.
- Support transparency and trust in distributed economies, from local cooperatives to global supply chains.

## Technical Implementation

Valueflows is primarily a specification, not an application. It's expressed as:

- A **data model** (often in JSON or RDF formats) for developers to integrate into software.
- A **protocol** for systems to communicate economic data.

Projects like [[hrea|hREA (on Holochain)]] and Bonfire use Valueflows as their backbone, implementing it in real-world applications. It's designed to be platform-agnostic, so it can work with blockchain, [[what-is-holochain|Holochain]], or even centralized databases.

## Why It Matters

Valueflows empowers communities, businesses, and developers to build economic systems that reflect their values—whether that's profit, mutual aid, or planetary health. By providing a flexible, interoperable framework, it's a stepping stone toward more equitable and sustainable ways of organizing resources and relationships.

In short, Valueflows is a universal language for describing how value moves through a network, making it a key enabler for decentralized and regenerative economies.

## Related Concepts

- [[rea-accounting]]
- [[hrea]]
- [[local-first-accountability]]
- [[what-is-holochain]]
- [[triple-bottom-line-accounting]] 