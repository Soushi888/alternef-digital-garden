---
title: "Portfolio"
description: "Semantic infrastructure for distributed coordination, at the intersection of the semantic web, peer-to-peer architecture, and commons-based economics."
tags:
  - portfolio
  - holochain
  - distributed-systems
  - commons
---

I build semantic infrastructure for distributed coordination.

My work sits at the intersection of three currents that rarely meet: the original [[semantic-web|semantic web]] vision (machines that understand meaning, linked data, shared vocabularies), [[peer-to-peer|peer-to-peer]] architecture (agent-centric systems, local-first sovereignty, cryptographic trust), and commons-based economics (post-capitalist resource management, [[open-value-networks|open value networks]], mutual aid).

When people say "Web3," they usually mean crypto tokens on global consensus chains. My version is closer to what Tim Berners-Lee imagined: a web where data carries meaning, where people own their information, and where coordination happens without centralized gatekeepers. The difference is that today we have the cryptographic tools and P2P protocols to make it work.

The thread connecting all my projects is the same question: **how do we build digital systems that help communities coordinate resources, share knowledge, and govern themselves without recreating the power asymmetries of the platforms we are trying to replace?**

---

## Active Projects

### [[nondominium|Nondominium]]

**Distributed Resource Management on [[what-is-holochain|Holochain]]** | With [[sensorica|Sensorica's]] Open Value Network

A [[valueflows|ValueFlows]]-compliant application for tracking and governing shared resources on Holochain. The core principle is custodianship over ownership: resources belong to the commons and are managed by designated custodians rather than possessed by individuals. Developed with Tiberius Brastaviceanu (Tibi), co-founder of Sensorica, and project-managed by Mexi.

The current focus is on the foundational MVP: person management (agent identity and roles), resource tracking (specs, lifecycle, custodianship transfers), and governance zomes (state transitions and community rules). We're also building an ERP bridge in Python that connects legacy systems like Dolibarr to the distributed commons, in collaboration with Mathieu Benoit from TechnoLibre, because real adoption requires meeting organizations where they are.

The project draws on emerging mathematical frameworks including research into the Perez Hourglass for multi-scale economic coordination and fractal sovereignty concepts, where the same governance patterns apply from household to bioregional scales. Arthur Brock, co-founder of Holochain, has expressed interest in the direction we're taking.

**Stack:** [[rust|Rust]], Holochain (HDK 0.6 / HDI 0.7), [[webassembly|WebAssembly]], [[svelte|Svelte 5]] / [[sveltekit|SvelteKit]], ValueFlows/[[rea-accounting|REA]], Python (ERP bridge)
**Repositories:** [nondominium](https://github.com/Sensorica/nondominium) | [erp-bridge](https://github.com/Sensorica/nondominium-erp-bridge)

---

### [[requests-and-offers|Requests & Offers]]

**P2P Marketplace for the Holochain Ecosystem** | With hAppenings Community

A Holochain application enabling community members to publish requests and offers, creating organic matchmaking for skills, services, and resources without a centralized marketplace extracting value from every transaction. Implements the full [[hrea|hREA]] economic flow with feedback-driven validation and a 7-layer Effect TS frontend architecture.

Where Nondominium handles resource governance (who custodians what, under which rules), Requests & Offers handles the social coordination layer (who needs what, who can provide it). Together they form complementary halves of a community economic stack.

**Stack:** Rust, Holochain (HDK 0.6 / HDI 0.7), [[svelte|Svelte 5]] / [[sveltekit|SvelteKit]], Effect TS, [[valueflows|ValueFlows]]/hREA
**Repository:** [GitHub](https://github.com/happenings-community/requests-and-offers)

Both Nondominium and Requests & Offers share the same Holochain foundation, Svelte 5 frontends, and ValueFlows/hREA semantic layer. Both are exploring [[unyt|Unyt]] integration for decentralized accounting at scale.

---

### HolOS & Edgenode Infrastructure

**First Steps into Holochain Network Operations**

In December 2025, I led a workshop at the Sensorica Laboratory in Montreal where we installed HolOS and Edgenodes on five different HoloPorts, then successfully ran a Vines application instance on one of them. This was my entry point into the operational side of Holochain: moving from application development to the infrastructure layer that makes distributed networks real.

The experience opened a new area of expertise. Understanding how to deploy, configure, and operate Holochain nodes is essential for bringing applications like Nondominium and Requests & Offers into production. This is where the code meets the hardware, where peer-to-peer networking becomes tangible. I'm continuing to deepen this knowledge as the ecosystem matures.

---

### EvoluData

**TikiWiki & Dolibarr Development**

Contributing to open-source enterprise tools, notably TikiWiki (wiki-based collaboration platform) and Dolibarr (open-source ERP/CRM). This is practical organizational tooling: the systems that cooperatives, nonprofits, and small enterprises actually use today. The work connects directly to the Nondominium ERP bridge, creating pathways for organizations to gradually adopt distributed infrastructure without abandoning proven tools overnight.

---

### AlterNef Digital Garden

**This Very Space**

The [[index|AlterNef]] ("Ship of Alternatives") [[digital-garden|Digital Garden]] is both a personal knowledge ecosystem and a living prototype of a broader vision for distributed education and community coordination. Built with Quartz, it hosts interconnected notes across [[knowledge/index|seven branches of inquiry]]: Land & Nature, Built Environment, Tools & Technology, Culture & Education, Health & Wellbeing, Finance & Economics, and Governance & Community.

The garden embodies the Right to Alternative: the principle that exploring unconventional approaches to technology, economics, and governance is essential work. These notes are not polished essays. They are thinking in public, seeds planted in soil that is still being turned.

**Built with:** Quartz, Obsidian, GitHub Pages

---

### Jazzotherapie

**Jazz as Therapeutic Practice**

An evolving modality combining saxophone improvisation, movement, breathwork, and [[qi-gong|Qi Gong]]. Jazzotherapie explores how collective improvisation can serve as a container for somatic and energetic work. Musical influences span from Astor Piazzolla's [[nuevo-tango|tango nuevo]] to Nobuo Uematsu and Joe Hisaishi.

This is not separate from the technical work. The same principles that make a good jam session (active listening, emergent coordination, trust without control) are the principles that make good P2P systems. A jazz ensemble is a living model of agent-centric coordination: sovereign musicians following shared rules while maintaining complete expressive freedom.

---

## Intellectual Lineage

**Semantic Layer**: Worked with Pierre Lévy on [[information-economy-meta-language|IEML]] (Information Economy Meta Language), a computable semantic metalanguage for collective intelligence. That collaboration, which ended during the pandemic, planted the foundational question: what if machines could truly understand meaning, not just process text?

**Vocabulary Layer**: Engaged with [[valueflows|ValueFlows]] and [[rea-accounting|REA]] (Resource-Event-Agent) accounting through [[sensorica|Sensorica's]] [[open-value-networks|Open Value Network]]. These shared ontologies provide the common language for distributed economic coordination. When two communities use the same vocabulary for economic events, they can interoperate without custom integrations. This is the semantic web vision applied to economics.

**Infrastructure Layer**: Building on [[what-is-holochain|Holochain]], an agent-centric, local-first distributed computing substrate. Unlike blockchains, Holochain does not require global consensus. Each agent is sovereign. The network validates, but does not dictate. No mining, no tokens required, no artificial scarcity imposed by architecture.

**Mathematical Layer**: Exploring frameworks like the [[perez-hourglass|Perez Hourglass]] for modeling bidirectional economic flows across scales, and [[fractal-sovereignty-multi-scale-integration|fractal sovereignty]] for governance patterns that remain self-similar from household to bioregional to global levels. This research connects complexity science (emergence, self-organization, non-linearity) to the practical question of how distributed communities actually coordinate.

**Practice Layer**: Contemplative traditions (meditation, [[qi-gong|Qi Gong]], study within Western esoteric currents) inform the *why* behind the technology. Agent-centric architecture is not just a technical choice; it is an ontological commitment to the sovereignty and dignity of each participant. The same sensitivity to flow that Qi Gong cultivates applies to designing data architectures: where does information want to move? Where are the blockages?

---

## Collaborators & Networks

- **[[sensorica|Sensorica]]**: [[open-value-networks|Open Value Network]], commons-based peer production. Core collaborators include Tiberius Brastaviceanu (Tibi, co-founder) and Mexi on Nondominium.
- **hAppenings Community**: Holochain application ecosystem
- **EvoluData**: Open-source enterprise solutions (TikiWiki, Dolibarr)
- **TechnoLibre**: ERPLibre collaboration with Mathieu Benoit on the ERP bridge
- **P2P Foundation**: Global network for commons-based alternatives
- **Holochain / Holo**: Distributed computing infrastructure

---

## Get in Touch

Learn more [[about-me|about the navigator behind this work]], or reach out if you work on distributed systems, commons-based economics, semantic technologies, or the intersection of contemplative practice and technology design.

- **GitHub:** [Soushi888](https://github.com/Soushi888)
- **X:** [@soushi888](https://x.com/soushi888)
- **Substack:** [soushi888](https://substack.com/@soushi888)
- **LinkedIn:** [Sacha Pignot](https://www.linkedin.com/in/sacha-pignot/)
