---
title: "Content Addressing in Unison and Holochain"
date: 2026-11-10
description: "The same principle applied twice: Unison identifies code by its hash, Holochain identifies data and networks by theirs, and both must carry continuity across versions when identity follows content."
aliases:
  - "Unison and Holochain"
tags: ["programming", "holochain", "content-addressing", "distributed-systems", "peer-to-peer"]
draft: false
---

An argued parallel between two systems that put the hash at the centre of identity.
The facts about each system are sourced from its documentation; the parallel itself is the argument, and it stands or falls on its own.
[[unison|Unison]] applies content addressing to code: a definition is its hash, and names are movable pointers.
Holochain applies it to data and to networks: entries and actions are addressed by their hash, and a DNA's hash defines the network its agents join.

## The Same Principle, Two Targets

In Unison, the hash of a definition covers its syntax tree and the hashes of all its dependencies ([[content-addressed-code|Content-Addressed Code]]).

In Holochain, the DNA hash comes from the integrity section only: the integrity zomes and the DNA modifiers, such as the network seed and the properties.
The rest of the DNA does not contribute, so coordinator zomes can change after installation without changing the hash ([[dna-and-zomes|DNA and Zomes]]).

## The Shared Tension

In both systems identity follows content, so changing content changes identity.
Something has to carry continuity across versions.

- Unison carries it with the name layer: names are repointed to new hashes through structured refactoring and the `upgrade` workflow, and old and new definitions coexist ([[codebase-as-database|The Codebase as a Database]]).
- Holochain carries it by architecture: coordinator zomes sit outside the DNA hash and evolve without forking the network, while a change to an integrity zome or a modifier produces a new DNA, and therefore a new network to migrate to.

The two answers mirror each other.
Unison separates name from content; Holochain separates the rules that define identity from the logic that can evolve.

## Fetch What You Lack

Unison moves computation by sending a bytecode tree and letting the receiver request the hashes it is missing.
A [[distributed-hash-table|distributed hash table]] resolves data the same way: ask for an address, receive content that can be verified against it.
Both rely on the fact that a hash is at once a name and a proof.

## Questions Worth Pursuing

- Unison lets two versions of a type coexist and be converted at leisure. Could that model inform how ValueFlows resource schemas evolve in hREA without hard migrations? This is speculation.
- Would a toolchain for zomes benefit from content-addressed definitions, so that validation code shared between DNAs is identified by hash rather than by crate version?

## Related Topics

- [[dna-and-zomes|DNA and Zomes]]
- [[unison|Unison]]
- [[content-addressed-code|Content-Addressed Code]]
- [[distributed-hash-table|Distributed Hash Tables]]
- [[ipfs|IPFS]]
- [[fractal-composability|Fractal Composability]]: the Nondominium genesis hash as compositional identity
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/index|Holochain Concepts]]

## References

- [Unison: The big idea](https://www.unison-lang.org/docs/the-big-idea/)
- [Holochain: DNAs](https://developer.holochain.org/build/dnas/)
