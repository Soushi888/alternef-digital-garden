---
Aliases: [Holochain Application]
---

#holochain/concepts

An [[Outils et Technologie/DWeb/Holochain/Holochain]] application (hApp) is a collection of [[Holochain DNA|DNAs]] and a [client](https://developer.holochain.org/glossary/#client) (or clients) that allow users to interact with those DNAs. The DNA components are typically distributed as a [DNA bundle](https://developer.holochain.org/glossary/#dna-bundle).

-   A local collection of cells, among which an agent id is shared
    -   Can depend on cells from other hApps
-   Each cell has its own role ID within the hApp
    -   Eg: in a file storage app, you may have two cells installed:
        -   “main”: the DHT that everyone joins to using the app
        -   “file_storage_provider”: only joined by high-storage nodes
