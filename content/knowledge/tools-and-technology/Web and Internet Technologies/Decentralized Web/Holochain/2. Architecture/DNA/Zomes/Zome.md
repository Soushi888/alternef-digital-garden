---
aliases: [Zomes, zome, zomes, zome function, zomes functions]
---

#holochain/concepts
[[Outils et Technologie/DWeb/Holochain/Holochain]]

A basic unit of modularity inside a [[Holochain DNA]]. A zome defines a package of [entry types](https://developer.holochain.org/glossary/#entry-type), [validation functions](https://developer.holochain.org/glossary/#validation-functions), [zome functions](https://developer.holochain.org/glossary/#zome-function), and [init functions](https://developer.holochain.org/glossary/#init-function).

## Zome function[¶](https://developer.holochain.org/glossary/#zome-function "Permanent link")

A function, created by the developer of a [zome](https://developer.holochain.org/glossary/#zome), that allows external code to to access the zome’s functionality, including writing to the agent’s [source chain](https://developer.holochain.org/glossary/#source-chain), reading from the [[Distributed Hash Table]], making [remote calls](https://developer.holochain.org/glossary/#remote-call) to other agents’ zome functions or [bridged](https://developer.holochain.org/glossary/#bridge) [cells](https://developer.holochain.org/glossary/#cell), performing cryptographic functions, or sending [signals](https://developer.holochain.org/glossary/#signal) to listening [clients](https://developer.holochain.org/glossary/#client). The zome functions act as a public API for the [zome](https://developer.holochain.org/glossary/#zome), and can be called by another zome within the same [DNA](https://developer.holochain.org/glossary/#dna), a [bridged](https://developer.holochain.org/glossary/#bridge) DNA instance within the same [conductor](https://developer.holochain.org/glossary/#conductor), a [client](https://developer.holochain.org/glossary/#client) via the conductor’s [RPC interface](https://developer.holochain.org/glossary/#rpc-interface), or a [peer](https://developer.holochain.org/glossary/#peer) in the [network](https://developer.holochain.org/glossary/#network) via a [remote call](https://developer.holochain.org/glossary/#remote-call). An agent can control access to their functions via [capability grants](https://developer.holochain.org/glossary/#capability-grant).

## Zome calls
![[Zome calls]]