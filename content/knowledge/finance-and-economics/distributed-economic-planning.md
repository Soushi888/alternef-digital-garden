---
title: "Distributed Economic Planning"
date: 2026-05-22
description: "A framework for software infrastructure enabling cooperative economic coordination beyond market and state, using the ValueFlows ontology and commoning as its organizing principle."
aliases: ["distributed economy planning", "commoning system", "global commoning system"]
tags: ["economics", "commons", "valueflows", "coordination-infrastructure", "economic-networks"]
draft: false
---

Distributed Economic Planning is a conception developed by Marcus Meindel (with contributors Robert, Florian Kohrt, Christian Schorsch, and Raffael Wüthrich) within the transformation project "Global Commoning System." It lays out the theory and principles for software tools enabling cooperative economic coordination beyond both market and state, using the [[valueflows|ValueFlows]] ontology as its shared vocabulary.

The working paper is available at [Codeberg](https://codeberg.org/emze/distributed-economic-planning/src/branch/main/Main.pdf) (CC-BY-SA 4.0).

## Structural Formula of Commoning

The conception is grounded in a structural formula that identifies three categories of economic problem and their corresponding solutions:

| Problem | Solution |
|---------|----------|
| Need (N-) | Satisfaction (N+) |
| Requirement (R-) | Coverage (R+) |
| Problematic Resource Condition (C-) | Resources in Defined Condition (C+) |

These transitions happen through **Transmission** (making the problem known) and **Process** (organizing cooperative action to solve it). Crucially, transmission is not just communication to personal contacts: the conception aims for software infrastructure where tendentially unknown, locally proximate people can read needs and suggest processes to solve them.

## Core Concepts

### Need Transmission

Needs are the entry point of every cooperation. The infrastructure supports transmitting needs anonymously, publicly, or in a limited manner. Needs can be marked satisfied or withdrawn. Processes that directly satisfy needs are usually self-assigned, but can also be open for self-assignment by others.

### Recipes

A recipe is a form of sharing practical knowledge by specifying a process together with its outputs and possible inputs. Recipes allow the automatic suggestion of different combinations of processes to satisfy a transmitted need. They form a library of capabilities that participants can draw on.

### Self-Assignment

Self-assignment to one or more of the suggested processes is the core of Distributed Economic Planning. It shapes cooperative structures according to participants' abilities and interests, without payment or external gifts of any kind. The question of individual interest in participating is addressed through the concept of **consideration**.

### I-in-Relation (Consideration)

Beyond idealism, what may motivate individual participation is *consideration*: participants can take into account various life aspects, including effort taken for others. If a process targets a need related to a life aspect that applies to a participant (e.g., being unemployed or a single parent), that process is marked for the considering participant. This allows social relationships, circumstances, and morals to shape the cooperative structure.

### The Planning Process

The distributed planning process proceeds through:

1. **Framework establishment**: defining available resources and recipes locally
2. **Suggestion of processes**: automatic suggestions based on requirement coverage and resource condition re-establishment
3. **Selection**: participants interact with suggestions, apply personal preselection, and commit to processes
4. **Configuration establishment**: unifying individual configurations into a coherent scenario
5. **Repair process**: handling conflicts and unknown conditions that arise during execution

### Regulation and Coordination of Shared Resources

The framework addresses the regulation of commons (shared resources) through:

- **Resources databases** with functions for reproducing and modifying existing resource representations
- **Usage coordination** within and between hierarchical structures
- A **distributed regulation process** for collective governance decisions
- **Useleft**: an inheritance mechanism for common usage freedoms

## ValueFlows as Ontology

The conception uses [[valueflows|ValueFlows]] as its vocabulary: "a vocabulary for the distributed economic networks of the next economy, to coordinate the creation, distribution, and exchange of economic resources." Conformity to this shared standard is presented as essential for interoperability across independently developed tools. New terms introduced in the document are explicitly defined at the end of each section.

The underlying model builds on [[rea-accounting|REA (Resource-Event-Agent) accounting]], extended by ValueFlows to capture planning (intent), commitment, and observation layers.

## Design Principles

### Conception Principles

1. **No discrimination of other forms of commoning**: the infrastructure supports diverse ways of organizing, and decisions affecting others must be communicable and influenceable from outside.
2. **Person-centered and value-neutral**: focused on the individual acting within multiple or no communities; idealism is not postulated.
3. **Every decision for organization happens consciously**: proposals can be automatically generated, but all decisions and conflict resolutions require real people.
4. **Respect the relations of the present**: work within current conditions toward a better tomorrow, not imagined ideal relations.

### Implementation Principles

1. **Use and spread open sources**: promote and integrate existing projects rather than competing.
2. **Counteract centrality**: users should have sole control over their own data at every node.
3. **Celebrate being surpassed**: the goal is social change, not project growth; superior alternatives should replace this work.
4. **Develop for the present and the future**: functional under current conditions and evolvable toward a commons-based society.

## Relationship to Related Concepts

- [[valueflows|ValueFlows]] provides the shared ontology for describing all economic activity
- [[rea-accounting|REA Accounting]] is the foundational model ValueFlows builds upon
- [[open-value-networks|Open Value Networks]] share the self-assignment and contribution-tracking paradigm
- [[ostroms-design-principles|Ostrom's Design Principles]] address the same commons governance problems from an empirical political economy angle
- [[tragedy-of-the-commons|Tragedy of the Commons]] is the failure mode this infrastructure explicitly aims to prevent
- [[true-commons|True Commons]] (Sensorica) is a working implementation of fabric-based commons coordination in the same ecosystem
