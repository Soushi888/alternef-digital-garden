---
Aliases: [cell, Cells, cells]
---

#holochain/concepts
[[Outils et Technologie/DWeb/Holochain/Holochain]]

A particular [[Holochain DNA|DNA]] when it’s bound to an [[Agent|agent ID]] and running in the [[Conductor]]. 

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
