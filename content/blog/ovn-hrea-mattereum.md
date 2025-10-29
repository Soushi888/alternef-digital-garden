---
title: "Integrating Holochain, Mattereum and OVN: A Framework for Peer Production"
date: 2025-01-15
author: "soushi888"
description: "An exploration of how Holochain's hREA and Mattereum's Asset Passport technology can enhance Open Value Networks"
tags: ["blog", "holochain", "mattereum", "ovn", "hrea", "peer-production", "blockchain", "p2p"]
heroImage: "/blog-placeholder-4.jpg"
---

In this paper we explore a short list of p2p technologies carefully chosen to satisfy our needs in a specific *material peer production* context. We contribute to the p2p movement by bringing our 15 years of experience in open-source, Do-It-Yourself (DIY) hardware development, using an organizational model that we call [Open Value Network (OVN)](https://ovn.world/).

The integration of [Holochain](https://www.holochain.org/) (agent-centric p2p framework) and [Cardano](https://cardano.org/) (data-centric blockchain), with the complementarity of [hREA](https://hrea.io/)/[Valueflows](https://www.valueflo.ws/) and [ADAM](https://coasys.org/adam), maps our needs for a groundbreaking hybrid infrastructure to support *distributed fabrication* and *regulatory compliance* for the [PEP Master project](https://www.sensorica.co/ventures/scientific-instruments/pep-master), the context of our work.

* **Open Value Networks (OVNs)** are decentralized, collaborative frameworks that facilitate peer production, where individuals and groups co-create value through shared resources and open processes. OVNs leverage p2p technologies to manage complex workflows, fairly reward contributors, and operate without reliance on traditional hierarchical structures, making them ideal for innovative, community-driven projects like PEP Master.
* **[[what-is-holochain|Holochain]]** is an agent-centric p2p framework that empowers participants with self-sovereignty and fosters direct collaboration. Unlike traditional blockchains, Holochain uses a [[distributed-hash-table|distributed hash table (DHT)]] to enable scalable, serverless digital environments where each participant maintains their own data and interactions, aligning perfectly with the decentralized ethos of OVNs.
* **[[hrea|hREA]]/[[valueflows|ValueFlows]]** provides a standardized vocabulary and framework for modeling economic and production activities within peer production networks. By capturing contributions, resource flows, and economic events, hREA/ValueFlows ensures transparency and auditability, allowing OVNs to track and reward individual efforts in a fair and verifiable manner.
* **ADAM** offers a meta-ontology that bridges diverse decentralized systems, enabling seamless interoperability while preserving the unique strengths of each technology. In the context of OVNs, ADAM facilitates integration between Holochain’s collaborative environments and Cardano’s blockchain, ensuring cohesive workflows across platforms.
* **Cardano** is a secure, data-centric blockchain platform that supports tokenization, smart contracts, and certification. It provides a robust layer for managing transactions, ownership models, and incentives, ensuring global accessibility and regulatory compliance for distributed production processes in OVNs.

This synergy enables OVNs to steward complex distributed workflows, reward contributors fairly, and ensure compliance with regulatory standards—a critical requirement for projects like PEP Master.

## The PEP Master and Sensorica Context

PEP Master is an open-source DIY therapeutic hardware device and computer game (herein called Instrument) developed by a consortium involving [Sensorica](https://www.sensorica.co/), [Sainte Justine Hospital](https://www.chusj.org/), [Breathing Games](https://www.sensorica.co/communities/breathing-games) and [Ludociels](https://www.ludocielspourtous.org/). The project aims to increase accessibility to medical and therapeutic equipment by leveraging peer production.

The PEP Master Instrument has reached a mature prototyping iteration, undergoing clinical studies at the Sainte Justine Hospital in Montreal, involving 40 patients. We are now shifting our attention to lateral scaling (see the *Scaling wide* section below), i.e. stimulating the adoption of this Instrument, by replicating its use in multiple countries, within a cocooned medical research environment, modeled from our collaboration with Sainte Justine Hospital. In parallel, we are also pushing for upwards scaling (see the *Scaling up* section below), by creating the conditions for trust in the Instrument’s safety and security to emerge. The primary objectives include:

1. Achieving ISO standards for the PEP Master Instrument.
2. Validating the clinical relevance of PEP Master Instrument through medical research.
3. Establishing validation and certification methods for Instrument blueprints and fabrication processes.
4. Implementing secure medical data storage and transfer mechanisms.
5. Engaging with governmental agencies like Health Canada for regulatory approval.

Once the conditions of trust are in place, we can address another type of scaling wide, which is dissemination of the Instrument and its associated medical practice to patients across the planet.

The PEP Master project operates within a niche where quality, safety, and regulatory compliance are paramount. Traditional economic models often fail to effectively address rare medical conditions for lack of financial incentives. To overcome this limitation, the PEP Master project implements a *trust-based economic model* that incentivizes *open innovation* and *distributed fabrication* (in short, peer production). This approach reduces the cost for the user, increasing accessibility to medical devices, making it particularly valuable for addressing marginalized or niche rare medical conditions.

OVN is the organizational model used to organize the development and dissemination of the PEP Master Instrument, thrusted by the aforementioned trust-based economic model. Sensorica is the OVN that hosts the PEP Master project.

[Sensorica](https://www.sensorica.co/home) was officially launched in February 2011, as a for-benefit open and collaborative network, focused on open source development of sensors and smart systems. Initial efforts went into the development of the [Mosquito sensor](https://www.sensorica.co/ventures/scientific-instruments/mosquito), the ambition being to demonstrate that [peer production](https://en.wikipedia.org/wiki/Commons-based_peer_production) can be applied to material things. Until 2015, the Sensorica OVN was deploying most of its energy into developing its own products and services, while building [infrastructure](http://valuenetwork.referata.com/wiki/Infrastructure) to sustain its operations. The vision was to find ways to engage in the traditional transactional (market-based) economy, not as a traditional organization, but as an OVN. As time went by, after the creation of Ethereum, the first DAO and the first series of ICOs, Sensoricans realized that [peer production](http://ovn.world/index.php?title=Peer_production) can escape the traditional economy and [become a dominant economic logic](https://docs.google.com/presentation/d/10ccj7IYFIPnv5b6-FjfvFAeYX9Ryr0BK4H8ARkNHQzw/edit?usp=drivesdk). Sensorica is now progressing towards self-sustaining models that bypass the market and the traditional financial system. This is precisely what it takes to provide solutions for extremely rare diseases, which constitute niche markets, with no financial incentives for traditional organizations. You can find the synthesis of this thinking on the OVN wiki, [Economic model](http://ovn.world/index.php?title=Economic_model) and [Peer production](http://ovn.world/index.php?title=Peer_production) pages.

## Core OVN principles and compatible technologies

![OVN Graphic](OVN-graphic.png)

### Openness and Transparency

OVNs prioritize open access to information, processes, and decision-making, ensuring that all participants can audit and verify activities. [Holochain’s distributed hash table (DHT)](https://developer.holochain.org/concepts/4_dht/) and [hREA](https://hrea.io/)/[Valueflows’](https://www.valueflo.ws/) transparent logging of economic events support this principle by design and facilitate the creation of auditable records of all interactions within the network. Moreover, the lack of centralization of Holochain’s framework, the ability to build serverless digital collaborative environments with distributed storage capabilities eliminates the need for gatekeeping, allowing for permissionless participation in economic processes.

### Nondominium and Diverse Property Regimes

OVNs embrace a variety of property regimes, including private, shared, commons, and public, but they also introduce the concept of nondominium—assets that, by their nature, cannot be owned or controlled. For example, the [Bitcoin Network](https://bitcoin.org/) operates as a nondominium: it exists as an aggregated entity providing token exchange services, but if any individual or group gains enough influence to control it, the network dissipates due to loss of trust. In contrast, mining computers are privately owned, and the Bitcoin code exists as a commons. [Cardano’s blockchain](https://cardano.org/) complements this by tokenizing assets (e.g., NFTs for certified designs) that can exist under various property regimes, while [Holochain](https://holochain.org/) ensures that the network itself remains a nondominium, fostering trust and decentralization.

### Meritocratic Governance

Access to decision-making in OVNs is based on contributions rather than hierarchical power structures. Holochain’s agent-centric architecture supports this by accurately tracking individual contributions via hREA/ValufFlows, ensuring that influence is distributed based on merit. Cardano’s smart contracts further enable merit-based reward systems, linking contributions to token rewards.

### Value as a Triadic Relation

OVNs redefine value as a triadic relation between a *valuable* (a reality), a *token* (a symbol, which may or may not be monetary), and a *valuation* (a subjective and intersubjective experience shaped by culture and socialization). Value is not a thing that can be created, stored, or transferred; rather, it emerges from subjective experiences that move individuals to action. This perspective avoids value fetishism and emphasizes the relational nature of economic interactions.  hREA/Valueflows captures this by modeling economic events and processes as relational flows. Furthermore, Holochain is built based on principles put forward by the [Metacurrency project](https://metacurrency.org/), allowing the implementation of various symbolic systems as non-monetary tokens. Cardano provides symbolic tokens that also reflect valuations, ensuring rewards align with the subjective and intersubjective value perceived by the network.

### Modularity and Interoperability

OVNs are interest-based, practice-based and even geographically local open and permissionless networks, operating on specific sets of rules, that can easily interface and aggregate into larger peer production networks. Holochain’s modular architecture, built on [Zomes](https://developer.holochain.org/resources/glossary/#zome) and [DNA](https://developer.holochain.org/resources/glossary/#dna), provides core composability features, allowing a customizable application framework that supports tailored solutions for specific use cases. This capability has been implemented by [Moss](https://theweave.social/moss/) and [Neighborhoods](https://neighbourhoods.network/), integrating standard building blocks for collaboration and social sensemaking. Furthermore, ADAM’s meta-ontology enables many-to-many mappings between user interfaces and existing web technologies. The integration of Holochain with [ADAM](https://coasys.org/adam) establishes a common language and perspective for bridging specific OVNs, maintaining global interoperability in terms of *production* processes. Thus, specific OVNs with their specific rules can dynamically aggregate into larger OVNs, summing their individual capabilities into larger production units. Cardano complements this modularity through its cross-chain and cross-platform interoperability capabilities. A Holochain Zome will enable direct integration with Cardano’s smart contracts and the different hApps/perspectives. Cardano’s native interoperability with other blockchains (demonstrated through [BitcoinOS](https://www.bitcoinos.build/) and [FluidToken](https://fluidtokens.com/)) leverages the robustness of its EUTXO transaction model and the Inter-Blockchain-Protocol (IBP). Thus Cardano’s secure global transaction network guarantees interoperability in terms of *transactions*.

### Glocal Accessibility

OVNs aim to create networks that transcend geographical boundaries through a “glocal” (global \+ local) approach. Holochain provides local context and governance through its agent-centric architecture.
Holochain with [ADAM](https://coasys.org/adam) establishes a common language and perspective for translating local credentials.
Cardano’s blockchain enables transactional global interoperability between local OVNs via its smart-contracts system, securing cross-network transactions of credentials and reputation. Moreover, the decentralized nature of Holochain and Cardano networks allows permissionless access to participation in the OVNs.

### Sustainability

OVNs prioritize environmentally and economically sustainable practices. Holochain’s energy-efficient architecture aligns with this principle by minimizing the environmental impact of peer production networks.
Holochain’s agent-centric architecture fundamentally differs from traditional blockchain approaches by eliminating the need for global consensus. Instead of all nodes processing all transactions, each agent maintains their own local chain and only validates the data they need. This distributed validation approach dramatically reduces computational overhead and energy consumption. The system scales linearly with the number of users, rather than exponentially like traditional blockchains, making it inherently more energy-efficient.

Cardano’s Ouroboros Proof-of-Stake (PoS) consensus mechanism ensures long-term sustainability through a more energy-efficient consensus mechanism than Proof-of-Work (PoW) or other PoS mechanisms used by other blockchains. This protocol represents a significant advancement in sustainable blockchain technology. Unlike energy-intensive Proof-of-Work systems, Ouroboros achieves the same security guarantees while consuming only a fraction of the energy. Research indicates that Cardano’s energy consumption is approximately 0.01% of Bitcoin’s, using about 6 GWh annually compared to Bitcoin’s 110.53 TWh. This efficiency is achieved through:

* Stake-based validator selection instead of computational puzzles
* Deterministic block creation process
* Efficient network communication protocols
* Optimized transaction validation

The combination of Holochain’s agent-centric architecture and Cardano’s Ouroboros protocol creates a highly sustainable infrastructure for OVNs, enabling them to scale their operations without compromising environmental responsibility.

### Peer-to-Peer Collaboration

Open Value Networks emphasize direct interactions among participants, reducing reliance on intermediaries to foster equitable collaboration. This economic philosophy tries to reduce or even to eliminate instituted power relations, it resists the creation of hubs or centers of power, preventing any single entity from dominating the network and ensuring influence remains distributed, based on merit.

Holochain’s peer-to-peer networking capabilities enable this capture-resistant collaboration by allowing participants to connect directly without the need of centralized servers or databases. Its agent-centric design, using distributed hash tables (DHTs), supports secure, transparent exchanges, while maintaining data sovereignty. Each contributor’s actions are logged on their own source chain, fostering trust without reliance on a controlling intermediary \[see the article: [uncapturable carrier](http://blog.holochain.org/blog-holochain-org-capture-resistance-from-the-ground-up/)\].

Cardano ensures secure and transparent transactions without centralized control, achieving exceptional decentralization through its Ouroboros Proof-of-Stake (PoS) consensus mechanism, which caps stake pool sizes to prevent power concentration among large operators. This promotes a diverse network of smaller pools, enhancing resilience and fairness. Additionally, Cardano’s governance system, with community-driven voting via the Voltaire framework, empowers stakeholders to shape protocol upgrades and funding decisions, reinforcing radical decentralization.

Together, Holochain and Cardano create a robust P2P ecosystem, empowering OVNs’ distributed workflow. In the context of PEP Master, this ecosystem enables trustless collaboration between innovators, fabricators, doctors, and patients, while resisting power concentration and promoting fairness.

### Continuous Innovation

The OVN model is in continuous improvement or evolution, iteratively improving during the current societal and technological transition. Holochain, by its lack of consensus mechanism, brings the necessary flexibility for OVNs to evolve their peer production infrastructure, and like a living economic-lab, to experiment in parallel in different economic contexts. Projects like [ADAM](https://coasys.org/adam) can bridge between the Holochain/hREA- enabled OVNs and the Cardano smart-contracts. Finally, Cardano brings the secure transactional backbone that ties together these local OVNs. It’s the perfect hybridization between data centricity and agent centricity.

### Self-Sovereignty

Open Value Networks (OVNs) champion the autonomy of individual contributors, empowering them to control their data and contributions in peer production. This principle fosters trust and agency in collaborative ecosystems like PEP Master, where privacy and regulatory compliance are paramount. By integrating [Midnight](https://midnight.network/)’s privacy-focused [self-sovereign identity (SSI)](https://docs.midnight.network/learn/glossary#self-sovereign-identity-ssi) system with [ADAM’s interoperable Decentralized Identifiers (DIDs)](https://docs.ad4m.dev/agents/#cryptographic-keys-and-signatures), PEP Master creates a robust framework for decentralized identity management.

Midnight, a Cardano sidechain, leverages zero-knowledge proofs (ZK-SNARKs) to enable secure, private identity verification. Contributors, such as doctors validating PEP Master designs, can use Midnight DIDs to prove qualifications without disclosing personal details, ensuring compliance with regulations like HIPAA and Health Canada standards. For example, a medical professional can share a verifiable credential (VC) confirming their license, with Midnight’s privacy features protecting sensitive information. These credentials can be anchored on Cardano’s mainnet as NFTs, providing immutable verification for certifications.

ADAM complements Midnight by bridging Holochain’s agent-centric architecture with Cardano’s blockchain ecosystem. Each contributor’s DID, tied to their Holochain source chain, ensures data sovereignty, while ADAM’s meta-ontology enables seamless identity integration across platforms. For instance, a fabricator’s Midnight-verified certification can be used in Holochain’s collaborative workflows, ensuring only authorized individuals participate in critical tasks like design validation. ADAM’s flexible identity contexts allow contributors to maintain consistent, autonomous identities across diverse OVN activities.

Together, Midnight’s privacy-preserving DIDs and ADAM’s interoperable framework empower PEP Master contributors to collaborate with confidence, knowing their autonomy and privacy are safeguarded while their contributions are securely verified. This hybrid approach not only upholds OVN principles of self-sovereignty and modularity but also positions PEP Master as a pioneer in decentralized, privacy-centric peer production.

## Processes involved in the peer production of the PEP Master Instrument

hREA/Valueflows models the PEP Master workflow as interconnected processes:

![Validation Process](validation-process.png)

The process that initiates the *chain of trust* is **Design**, which is carried out by *Designer Agents*. The deliverable of this process is a Blueprint (design files, instructions for fabrication, manuals and even lab notes and reports), which is made accessible to the public as a bundle of digital resources. The second process is **Validation**, carried out by *Validator Agents* (scientists and medical doctors), which consists in testing, analyzing and evaluating quality (safety and efficiency) of a functional material artifact created from the Blueprint, using scientifically sound methods. The deliverable of this process is a Scientific Publication, a digital asset, which references the Blueprint. This Scientific Publication is used in the **Certification** process, carried out by a *Government Agency*, approving the use of the Material artifact, a physical asset, that is **Fabricated** based on the Blueprint, in accordance with local regulations. The **Valuation** process assigns *value* to a **Validation** and/or **Certification**. It is based on a social protocol, similar to market pricing for commodities in a capitalist economy, informing users’ preferences for various **Validations** and **Certifications**, which are understood as *tokens of trust* for their respective Material artefacts. The **Transaction** process is carried out by Users and is mediated by a smart contract that automates distribution of currency and other types of transferable tokens, generating tangible incentives throughout the open innovation and production system. Thus, the Users who decide to use a Material artifact, which has been made from a particular Blueprint that has been Validated, Certified and Valuated, reward Designers, Verifiers and other important stakeholders in the peer production system. Note that in the previous diagram the Fabricator can be at the same time the User, respecting the *prosumer* possibility in peer production.

The diagram below presents the cryptographic methods used to establish the *chain of trust*, using existing DWeb / web3 primitives. Here we make an abstraction of the Enabler, the role of infrastructure provider. The Enabler is in fact absorbed into the DWeb / web3 aspect, as these platforms already provide reward mechanisms for agents involved in their reproduction, in the form of token minting, transaction fees, etc.

1. **Design:**
   * Input: Engineering expertise, medical requirements
   * Activities: Design creation, review, iteration
   * Output: Instrument blueprints
2. **Verification:**
   * Input: Scientific and engineering expertise, medical requirements, blueprints and Instrument
   * Activities: Testing, documentation
   * Output: Peer reviewed scientific papers about verification of Instrument blueprints
3. **Certification:**
   * Input: Instrument blueprints, scientific papers validating Instrument blueprints, regulatory standards
   * Activities: Minting of immutable *Instrument* *certificate* (NFT)
   * Output: Certified designs, compliance records
4. **Fabrication:**
   * Input: Fabrication skills, certified blueprints, materials
   * Activities: Instrument fabrication, testing
   * Output: Functional PEP Master Instrument, *Instrument passport* (ex. NMKR and TrivolveTech)
5. **Dissemination:**
   * Input: Certified Instrument (*Instrument* *certificate and passport*)
   * Activities: Transaction, training, support
   * Output: Installed and operational Instrument
6. **Valuation**:
   * Input: Certified Instruments, usage data and experience
   * Activities: Social reputation protocols (likes, endorsements, on-chain interactions) determine credibility.
   * Output: Credibility, quality, efficiency score/ranking.
7. **Transaction**
   * Input: certified and valuated Instruments, tokens.
   * Activities: choice of Instrument designs.
   * Output: certified designs and certificates (NFT), and actual Instrument. Triggers fair revenue distribution among contributors.

## Scaling up

Scaling up is about providing the trust in the open source DIY PEP Master Instrument and its associated practices, turning it into a medical Instrument that can safely and securely be used by patients under medical supervision. The hybrid infrastructure that we propose in this paper provides affordances for verification or validation processes related to the blueprints (the design) of the Instrument and to its fabrication, and for certification. The infrastructure also provides the affordance for multiple stakeholders to coordinate and refine their practices, further increasing the efficiency and reliability of the Instrument. Details are presented in the [Design Validation](https://docs.google.com/document/d/1jeb4-KhPCEAL-JowWnQW4RCMF18FqiF3-kARpSVXvgg/edit?tab=t.0) and [Fabrication validation](https://docs.google.com/document/d/17OzTpFpqUqam1ZhwgkQX4hp--N1TfWWuu0x-UxZH0zg/edit?tab=t.0) working documents.

Scaling up is done in collaboration with medical and technical researchers, within health and academic institutions. Sound scientific methods, coupled to trust associated with accredited researchers operating within recognized institutions, anchors the trust in the Instrument’s design and fabrication protocols. Peer reviewed scientific papers characterizing the Instrument and its performance provide the validation, while the cryptographic certification (NFT) couples this validation to key economic processes that allow sustainable and scalable reproduction of the Instrument. To standardize the validation processes (science-based characterization of the instrument), affiliates of the Breathing Games OVN have produced a template: [Games and hardware validation](https://docs.google.com/document/d/1a9OmAHa34cGtuZudHCI1fuzTy3wvvmo4ixrECZCCFsI/edit?tab=t.0#heading=h.le8xa0eeirqh).

## Scaling wide

One way to understand lateral scaling is to stimulate adoption of the PEP Master Instrument and its associated medical practice. We are looking at 3 scaling dimensions:

1. Replication of our collaboration with Sainte Justine Hospital where patients can use the Instrument in a cocooned medical research environment. This will provide new medical and technical feedback and will help adjust the medical practice associated with the Instrument to the local regulatory framework, medical culture and economic conditions.
2. Dissemination of the Instrument and its associated medical practice to patients around the world.
3. Expansion of our peer production approach into other cases of rare diseases.

The replication of use in a medical research environment can be facilitated by the infrastructure discussed here by implementing local OVNs, built on top of a locally adequate Holochain-based p2p infrastructure, which can easily network together, i.e. federate and enable the flow of information and resources among them. The scientific validation processes can be facilitated and standardized using the [Games and hardware validation](https://docs.google.com/document/d/1a9OmAHa34cGtuZudHCI1fuzTy3wvvmo4ixrECZCCFsI/edit?tab=t.0#heading=h.le8xa0eeirqh) template. These local OVNs are expected to grow their local capacity to help fabricate, maintain and provide training for the PEP Master Instrument. The Cardano transactional rail can allow secure transfer of credentials and **Certificates** of verification or validation from a local context to another.

In the traditional world, solutions reach those in need through a market-based distribution. In this context, there is a clear separation between innovators, producers and users or consumers. The solution is provided as a product. In a p2p context, the mechanism for scaling widely relies on dissemination of validated, certified **Designs** and on distributed (DIY) **Fabrication**. The end user (the patient in our case) can be at the same time a producer. The solution is not packaged and transferred as a product. This type of lateral scaling is less reliant on the traditional financial system and bypasses the market, which are key factors that make possible addressing rare medical diseases, for which there is no market and no profit incentives for traditional approaches.

The hybrid infrastructure that we are proposing here allows the dissemination of the PEP Master Instrument by firstly incentivizing further innovation using the *trust-based economy* model. In other words, tangible rewards must flow from users to innovators. The **Valuation** of these rewards and their distribution can be based on past economic events for peer production (the aggregated effort of innovators), enabled by tools built on hREA/Valueflows and Holochain. Moreover, actual transfer of these tangible rewards requires a secure and global transaction system, which can be built using Cardano. The trust-based economy model rests on generation and transaction of trust. In the PEP Master case, this is trust in the safety and efficiency provided by a fabricated Instrument. Holochain and hREA/Valueflows can be used to build tools to support the process of generating trust, and Cardano can be used to create a certificate that represents the trust associated with a particular Instrument and to facilitate the transfer of this certificate.

Thirdly, scaling wide can also be understood as applying the same approach to other rare diseases. This is possible due to the high level of replicability of OVN infrastructure, its modularity and adaptability. As mentioned above, Holochain and hREA allow a dynamic composition of digital environments provided with tools for stewarding economic processes, while ADAM facilitates interoperability. Cardano constitutes a standard transaction rail across all different types of OVNs that address specific medical problems in various locations.

## Scaling deep

Scaling deep is about gaining more granularity or refinement for the practice associated with the PEP Master Instrument. The p2p nature of the project pushes exploration to the edge of the network, allowing the practice to closely match the actual context, to respond to granular requirements and needs in different locations. The open source license of the Instrument provides the legal affordance to fork, remix and adapt. The open source nature of the designs, which must be modular and well documented, eases adaptation. The collaboration infrastructure built on top of Holochain and hREA/Valueflows allows easy interdisciplinary and trans-disciplinary expansion, recording of economic processes associated with new adaptations, good coordination among innovators world wide, while the Cardano-based transaction layer allows rewards to flow, generating incentives.

## Conclusion

The OVN model has been refined since 2011 in real situations, iterating on the organizational design and the economic model one project after another. [Sensorica](https://www.sensorica.co/) has [demonstrated](https://docs.google.com/document/d/1ABmC6YJsszlIPoL-YXU3GF-PLHY0tmQdocBExswh7Lw/edit?usp=drive_link) that this new economic paradigm of peer production is capable of interfacing with legacy institutions and delivering valuable solutions in contexts as diverse as agriculture, industrial application, scientific instrumentation and medicine. Although material peer production is still in its infancy, suffering from lack of recognition and legitimacy, it remains very promising, constituting a possible future point of convergence of various developments in the sphere of p2p. We consider that the OVN model is prefigurative of a future p2p economy and in this paper we are trying to understand which existing p2p technologies (that have evolved independently) can cover the needs of the [PEP Master](https://www.sensorica.co/ventures/scientific-instruments/pep-master) project, which operates within the Sensorica OVN. As presented in the *Core OVN principles* section, our selection of p2p technologies is Holochain, hREA/Valueflows, ADAM and Cardano, together providing a technical foundation that not only supports but also amplifies OVNs’ core principles. Together, these technologies enable PEP Master to deliver open-source, DIY therapeutic instruments that meet stringent medical standards, addressing rare conditions underserved by traditional models.

* **Holochain,** agent-centric for collaboration, peer production processes.
* **Cardano**, data-centric, secure transaction layer.
* In between these rails, **hREA** for modeling p2p economic processes and **ADAM** for interoperability and composability of OVNs.

By harmonizing Holochain’s agent-centric empowerment with Cardano’s data-centric integrity, this hybrid ecosystem ushers in a new era of decentralized production, where individuals and communities engage in peer production with trust, autonomy, and global impact.

As we navigate the blurred boundaries between Holochain’s flexible, organic networks and Cardano’s rigid, standardized blockchain, PEP Master’s exploration redefines decentralized collaboration, weaving a tapestry of innovation where agent-driven creativity and data-driven trust converge to shape a future of inclusive, impactful peer production.

## Call to action

The PEP Master project offers great potential for access to medical treatment. With great potential come great challenges: integration complexity, satisfying regulatory requirements, adoption barriers, and the immaturity of Holochain, hREA, ADAM, and Midnight. We invite developers and enthusiasts of the technologies to help us overcome these barriers.
