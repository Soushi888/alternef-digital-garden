---
title: Integration of Holochain, hREA/ValueFlows, and Cardano in Open Value Networks
description: A comprehensive analysis of integrating Holochain, hREA/ValueFlows, and Cardano for Open Value Networks, with PEP Master as a case study
subtitle: A Case Study with PEP Master
date: 2025-04-06
tags:
  - holochain
  - hrea
  - cardano
  - open-value-networks
  - pep-master
  - web3
  - peer-production
---

> [!warning] Work in Progress
> 
> This is a work in progress and is not ready to be published yet.

The integration of [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]], [[hrea|hREA]]/[[valueflows|ValueFlows]], and [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/proof-of-stake/cardano/index|Cardano]] offers a groundbreaking approach for [Open Value Networks (OVNs)](https://ovn.world/) engaged in peer production, particularly within the context of open-source, Do-It-Yourself (DIY) projects like [PEP Master](https://www.sensorica.co/ventures/scientific-instruments/pep-master). By combining Holochain's decentralized contribution tracking, hREA/ValueFlows' economic modeling, and Cardano's robust blockchain infrastructure, this hybrid model enables distributed fabrication, secure asset tokenization, and regulatory compliance for collaboratively produced therapeutic devices. This article explores how these technologies converge to support OVNs, with a specific focus on the PEP Master project, its objectives, and the current implementation plan, as illustrated in the accompanying diagram.

- **Open Value Networks** are a type of peer production network that are characterized by their focus on value distribution and the use of blockchain technology to support their operations.
- **Holochain** offers an agent-centric architecture that aligns with self-sovereignty and peer-to-peer collaboration, allowing participants to maintain control over their data while contributing to a shared network.
- **hREA/ValueFlows** provides a standardized vocabulary for tracking economic activities (Resources, Events, Agents), ensuring transparent and auditable records of contributions and value flows.
- **Cardano** brings a secure blockchain layer for tokenization, certification, and economic incentives, supporting distributed ownership and global accessibility through its smart contract capabilities.

This synergy creates a robust ecosystem for OVNs, enabling them to manage complex workflows, reward contributors fairly, and ensure compliance with regulatory standards—a critical requirement for projects like PEP Master.

## Core OVN Principles and the Role of Technology

Open Value Networks operate on principles that recognize value as a complex, triadic relationship between valuables (realities), tokens (symbolic representations), and valuations (both subjective experiences and inter-subjective shared meanings). Unlike traditional economic models that treat value as a tangible commodity that can be created, stored, or transferred, OVNs understand that value fundamentally rests on ["subjective experiences that move human beings into action"](https://ovn.world/index.php?title=Value). This perspective avoids value fetishism and shapes how technology is employed within the network.

OVNs also embrace a more complex approach to ownership, recognizing multiple forms of property relations including private, shared, commons, and notably, ["nondominium"](https://ovn.world/index.php?title=Nondominium) - assets that by their nature cannot be owned. For instance, while individual components of the network may be privately owned or held in commons, the network's emergent capabilities often exist as nondominium, similar to how the [Bitcoin network](https://bitcoin.org/) itself transcends traditional ownership models.

- **Openness and Transparency**: OVNs prioritize open access to information, processes, and decision-making. This transparency extends to contribution tracking, resources flows, and governance, ensuring that all participants can audit and verify activities. [Holochain's distributed hash table (DHT)](https://developer.holochain.org/concepts/4_dht/) and [hREA](https://hrea.io/)/[ValueFlows'](https://www.valueflo.ws/) transparent logging of economic events (Resources, Events, Agents) support this principle by providing auditable records of all interactions within the network.

- **Nondominium and Diverse Property Regimes**: OVNs embrace a variety of property regimes, including private, shared, commons, and public, but they also introduce the concept of *nondominium*—assets that, by their nature, cannot be owned or controlled. For example, the [Bitcoin Network](https://bitcoin.org/) operates as a nondominium: it exists as an aggregated entity providing token exchange services, but if any individual or group gains enough influence to control it, the network dissipates due to loss of trust. In contrast, mining computers are privately owned, and the Bitcoin code exists as a commons. [Cardano's blockchain](https://cardano.org/) complements this by tokenizing assets (e.g., NFTs for certified designs) that can exist under various property regimes, while [Holochain](https://holochain.org/) ensures that the network itself remains a nondominium, fostering trust and decentralization.

- **Meritocratic Governance**: Access to decision-making in OVNs is based on contributions rather than hierarchical power structures. Holochain's agent-centric architecture supports this by accurately tracking individual contributions via hREA/ValueFlows, ensuring that influence is distributed based on merit. Cardano's smart contracts further enable merit-based reward systems, linking contributions to token rewards.

- **Value as a Triadic Relation**: OVNs redefine value as a triadic relation between a *valuable* (a reality), a *token* (a symbol, which may or may not be monetary), and a *valuation* (a subjective and inter-subjective experience shaped by culture and socialization). Value is not a thing that can be created, stored, or transferred; rather, it emerges from subjective experiences that move individuals to action. This perspective avoids value fetishism and emphasizes the relational nature of economic interactions. hREA/ValueFlows captures this by modeling economic events and processes as relational flows, while Cardano's token reward system provides symbolic tokens that reflect these valuations, ensuring rewards align with the subjective and inter-subjective value perceived by the network.

- **Modularity and Interoperability**: OVNs embrace modular designs and interoperable systems to ensure flexibility and scalability. Holochain's customizable application framework supports this by allowing tailored solutions for specific use cases, while Cardano's interoperability with decentralized storage solutions like Iagon ensures seamless integration with other systems.

Holochain's modular architecture, built on Zomes and DNA, provides core composability features that integrate with Moss and Neighborhood as building blocks for collaboration and social sensemaking. This architectural approach enables flexible and adaptable solutions for different use cases.

Cardano complements this modularity through its cross-chain and cross-platform interoperability capabilities. A future Cardano Zome will enable direct integration with Holochain, while Cardano's native interoperability with other blockchains (demonstrated through `BitcoinOS` and `FluidToken`) leverages the robustness of its EUTXO transaction model and the Inter-Blockchain-Protocol (IBP).

- **Global Accessibility**: OVNs aim to create networks that transcend geographical boundaries through a "glocal" (global + local) approach. Cardano's blockchain enables transactional global interoperability via its smart-contracts system, while Holochain provides local context and governance through its agent-centric architecture. This hybrid model allows contributors to transport their credentials and reputation across different OVNs seamlessly.

The integration of Holochain with ADAM (https://coasys.org/adam) establishes a common language and perspective for translating local credentials, while Cardano secures the cross-network transaction of these credentials and reputations. ADAM's meta-ontology, which defines three classes (Agents, Languages, and Perspectives), creates a spanning layer that enables many-to-many mappings between user interfaces and existing web technologies. This architecture allows for private, locally stored graph databases that associate data across different Languages while maintaining global interoperability.

- **Sustainability**: OVNs prioritize environmentally and economically sustainable practices. Holochain's energy-efficient architecture aligns with this principle by minimizing the environmental impact of peer production networks, while Cardano's Ouroboros Proof-of-Stake (PoS) consensus mechanism ensures long-term sustainability through a more energy-efficient consensus mechanism than Proof-of-Work (PoW) or other PoS mechanisms used by other blockchains.

...More details about Holochain and Cardano energy efficiency...

- **Peer-to-Peer Collaboration**: OVNs emphasize direct interactions between participants, reducing reliance on intermediaries. Holochain's peer-to-peer networking capabilities enable real-time collaboration, while Cardano ensures secure and transparent transactions without centralized control.

- **Continuous Innovation**: OVNs model is in continuous improvment/evolution, iteratively improving through the current societal and technological transitions.  Holochain, by it's lack of censensus mechanisme bring the necessary flexiblity for the OVNs model to evolve and experiment in pararel in different economic contexte like a living economic-lab.
Cardano, bring the transactional backbone with its structured data and financial architecture. It's a global security that allow local experimentations with HOlochain communities. It's the perfect hybridation between data and agent centricity.

Each OVN can have its own local economic model, enable by Holochain and hREA/Valueflows and then the global Cardano smart contract architecture can make the connection and validation at a global level.

ADAM (https://coasys.org/adam) could be a bridge between the OVNs and the Cardano smart-contracts. It's a meta-ontology defining 3 classes: Agents, Languages and Perspectives. These form a spanning-layer that enables many-to-many mappings between user-interfaces (i.e. apps) and existing web technologies wrapped in "Languages". Apps interface with "Perspectives" which are private and locally stored graph databases associating data across different Languages.

- **Global Accessibility**: OVNs aim to create networks that transcend geographical boundaries. Cardano's blockchain enables transactional global interoperability via its smart-contracts system, while Holochain provide the local context and governance via it's agent-centric architecture. It's a mix between local and global (Glocal). Contributors to a local OVN can transport their credentials and reputation to facilitate their access to other OVNs.
Holochain + ADAM favorize the translations of those local credential by establishing a common language/perspective while Cardano secure the transactions of theses credetentials and reputations across the local networks.


- **Self-Sovereignty**: OVNs respect the autonomy of individual contributors, allowing them to maintain control over their data and contributions. Holochain's agent-centric design ensures that participants retain sovereignty over their personal data, while Cardano's decentralized identity (DID) zone supports secure and self-sovereign identity management.

By adhering to these principles, OVNs create ecosystems that foster collaboration, innovation, and equitable economic interactions. The integration of Holochain, hREA/ValueFlows, and Cardano provides a technical foundation that not only supports but also amplifies these principles, enabling OVNs to operate effectively in contexts like the PEP Master project, where transparency, fairness, and regulatory compliance are critical.

## The PEP Master Context

PEP Master is an open-source DIY therapeutic device and game developed by a consortium involving [Sensorica](https://www.sensorica.co/), [Sainte Justine Hospital](https://www.chusj.org/), [Breathing Games](https://www.sensorica.co/communities/breathing-games) and Ludociels. The project aims to increase accessibility to medical and therapeutic equipment by leveraging peer production and Web3 technologies. The primary objectives include:

1. Achieving ISO standards for the PEP Master device.
2. Validating the clinical relevance of peer-produced PEP Master devices through medical research.
3. Establishing validation and certification methods for device blueprints and fabrication processes.
4. Implementing secure medical data storage and transfer mechanisms.
5. Engaging with governmental agencies like Health Canada for regulatory approval.

The PEP Master project operates within a niche where quality, safety, and regulatory compliance are paramount. Traditional economic models often fail to effectively address rare medical conditions. To overcome this limitation, the PEP Master project implements a trust-based economic model that leverages open collaboration and distributed fabrication. This approach increases accessibility to medical devices, making it particularly valuable for addressing marginalized or niche rare medical conditions.

## The hREA/ValueFlows Framework

[hREA](https://hrea.io/) (Holochain Resource-Event-Agent) implements the [ValueFlows specification](https://www.valueflo.ws/specification/spec-overview/), a standardized vocabulary for describing economic activities in decentralized networks. This framework is central to the PEP Master project, as it enables transparent tracking of contributions and value flows. Key components include:

- **Economic Agents**: Participants (e.g., engineers, designers, patients) are recognized as agents within the network.
- **Economic Events**: Actions such as design submissions, validations, or therapeutic usage are recorded as events.
- **Processes**: Activities like design creation, validation, and fabrication are modeled as processes that transform inputs into outputs.
- **Flexible Actions**: hREA supports various economic interactions, from contribution logging to reward distribution.

In the context of PEP Master, hREA/ValueFlows ensures that every contribution—whether it's an engineer's design, a doctor's validation, or a patient's feedback—is transparently recorded and linked to the resulting value, facilitating fair reward distribution.

## Holochain's Role in Decentralized Collaboration

Holochain provides the foundational infrastructure for the PEP Master project by enabling decentralized, agent-centric collaboration. Its key features align with OVN principles and support hREA/ValueFlows implementation:

- **Agent-Centric Architecture**: Each participant maintains their own data chain, ensuring self-sovereignty and privacy while contributing to the network.
- **Distributed Hash Table (DHT)**: Holochain uses a DHT for secure, tamper-resistant storage of design data and sensitive patient information, aligning with the OVN principle of transparency.
- **Scalability and Efficiency**: Unlike traditional blockchains, Holochain's energy-efficient design supports sustainability, making it ideal for large-scale peer production networks.
- **Customizable Applications**: Holochain allows the development of tailored applications, such as the PEP Master user interface, which can be deployed as a desktop or web-based portal for doctors and patients.

In the PEP Master workflow, Holochain hosts the backend for contribution logging, tracks resource events via hREA/ValueFlows, and manages sensitive data through private DHT zones, ensuring privacy and compliance with medical regulations.

## Cardano's Role in Certification and Tokenization

[Cardano](https://cardano.org/) complements Holochain by providing a secure blockchain layer for certification, tokenization, and economic incentives. Its features make it an ideal choice for the PEP Master project:

- **NFT Smart Contracts ([CIP-25](https://cips.cardano.org/cips/cip25/)/[68](https://cips.cardano.org/cips/cip68/))**: Cardano mints and manages NFTs for design certification, ensuring that validated designs are uniquely represented and legally recognized.
- **Token Reward System**: Cardano facilitates a token-based reward system, issuing tokens to contributors based on their tracked contributions (via hREA/ValueFlows), promoting fair value distribution.
- **[Iagon](https://iagon.com/) Storage**: Cardano integrates with Iagon for decentralized storage redundancy, ensuring that certification data is securely stored and accessible.
- **Smart Contract Implementation**: Using the [Aiken language](https://aiken-lang.org/), Cardano's smart contracts automate the certification process, linking validation outcomes to NFT minting and token rewards.

For PEP Master, Cardano handles the certification of designs after validation by experts (e.g., doctors and engineers) on Holochain. Once a design is certified, an NFT is minted, and contributors are rewarded with tokens, creating an economic incentive for continued participation.

## The Hybrid Model: Holochain + Cardano in Action

The integration of Holochain and Cardano creates a hybrid model that leverages the strengths of both technologies to support the PEP Master workflow. The process is illustrated in the following diagram:

![PEP Master - Holochain + Cardano Prototype](pep-master-cardano-diagram.jpg)

The diagram outlines the following steps:

1. **Design Submission and Contribution Logging (Holochain)**: Engineers and designers submit designs through the Holochain application, where contributions are logged using hREA/ValueFlows. The backend stores design data in a distributed hash table (DHT) for transparency.
2. **Validation Process (Holochain + Cardano)**: Validators (e.g., doctors) review designs on Holochain, and once validated, the process triggers Cardano to mint an NFT for certification.
3. **Certification Process (Cardano)**: Cardano's smart contracts manage the certification, creating an NFT (using CIP-25/68 standards) that represents the validated design, ensuring legal recognition.
4. **Fabrication and Distribution (Holochain + Cardano)**: The certified design is sent to fabricators (e.g., makerspaces), with Cardano managing the chain of trust for material artifacts.
5. **Therapeutic Use and Data Management (Holochain)**: Patients use the PEP Master device, and game clients report sensitive data (e.g., health outcomes) to a private DHT zone on Holochain, ensuring privacy.
6. **Research Export (Holochain)**: Anonymized data is exported for public research, maintaining compliance with privacy regulations.
7. **Token Reward System (Cardano)**: Contributors receive tokens based on their logged contributions, incentivizing participation and sustaining the network.
8. **Forking and Iteration (Holochain)**: Designs can be forked and remixed on Holochain, fostering continuous innovation.

This hybrid model ensures that PEP Master achieves its goals of transparency, regulatory compliance, and fair value distribution while fostering a sustainable peer production ecosystem.

## Current Plan and Next Steps

The PEP Master project is currently in the prototyping phase, with the following milestones:

- **Prototype Development**: The team is building a functional prototype integrating Holochain and Cardano, as outlined in the diagram. This includes the user interface for doctors and patients, the backend for contribution tracking, and Cardano's smart contracts for certification and rewards.
- **Regulatory Engagement**: The consortium is engaging with [Health Canada](https://www.canada.ca/en/health-canada.html) to secure regulatory approval, using the hybrid model to demonstrate compliance with ISO standards and safety requirements.
- **Data Storage and Privacy**: The project is implementing a data storage prototype using Holochain's DHT and Cardano's Iagon integration, ensuring secure handling of sensitive patient data.
- **Community Building**: Sensorica and its partners are fostering a community of contributors, including engineers, doctors, and patients, to participate in the OVN and refine the PEP Master device through iterative design.

The next steps include testing the prototype in a real-world setting at Sainte Justine Hospital, gathering feedback from patients and doctors, and iterating on the design. The team also plans to expand the token reward system to attract more contributors, ensuring the long-term sustainability of the project.

## Future Outlook

The integration of Holochain, hREA/ValueFlows, and Cardano offers a transformative framework for Open Value Networks like PEP Master. By combining Holochain's scalable, agent-centric architecture with hREA/ValueFlows' transparent economic modeling and Cardano's secure blockchain capabilities, the project creates a comprehensive ecosystem for peer production. This model not only addresses the challenges of quality, safety, and regulatory compliance in medical device production but also paves the way for a self-sustaining p2p economy.

As the PEP Master project progresses, it has the potential to set a precedent for other peer-produced medical devices, demonstrating how Web3 technologies can empower communities to innovate, collaborate, and create value equitably. The hybrid model of Holochain and Cardano could inspire broader adoption of OVN principles, fostering resilient and sustainable economic systems that prioritize cooperation and shared value creation in the digital age. 