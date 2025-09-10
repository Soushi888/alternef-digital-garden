---
title: Holochain Cells
description: The fundamental unit of a Holochain application - combining DNA with an agent identity
tags:
  - holochain
  - fundamentals
  - cell
  - distributed-systems
aliases: [cell, Cells, cells, Holochain Cell]
parent: "[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/fundamentals/index|Holochain Fundamentals]]"
---

# Holochain Cells

A particular [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/technical-concepts/advanced-topics/social-dna|DNA]] when it’s bound to an [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/agent|agent ID]] and running in the [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/architecture/conductor|Conductor]]. 

- DNA + agent = cell.
-   Unique per-agent instantiation of a DNA
    -   Is identified by the union of:
        -   Agent ID
        -   Integrity hash
            -   Called "DNA hash" throughout Holochain docs
-   Has access to:
    -   A private data storage: the source chain
    -   A shared and public data storage: the DHT
-   Only accessible via permissioned zome function calls:
    -   By an external process connected to the Conductor (eg. GUIs)
    -   By other cells from its network (with the same integrity hash)
    -   By other cells in the same conductor
-   Can receive these parameters when it is instantiated:
    -   New properties or network seed
        -   Which would change the resulting integrity hash
    -   Membrane proof
        -   Which may be required to instantiate the Cell
