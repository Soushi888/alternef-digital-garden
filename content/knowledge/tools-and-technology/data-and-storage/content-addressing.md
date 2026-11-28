---
title: "Content Addressing"
date: 2026-11-16
description: "Naming a piece of data by a hash of what it contains instead of where it is stored, the properties that follow, and the mutable layer every content-addressed system needs on top."
aliases:
  - "Content-Addressable Storage"
  - "Content-Addressed Storage"
  - "Content Addressable Storage"
  - "CAS"
tags: ["content-addressing", "distributed-systems", "cryptography", "storage", "peer-to-peer"]
draft: false
---

Most addresses say where something is: a URL names a server and a path, a file path names a place on a disk.
A content address says what something is: it is a cryptographic hash of the bytes themselves.
The same content always gets the same address, wherever it lives, and different content gets a different one.
This note is the hub for the idea; the notes it links show it applied to files, to builds, to code and to networks.

## Key Concepts

**Location address versus content address.** A location address can point at different bytes tomorrow, and the same bytes can sit behind many locations.
A content address cannot drift: if the bytes change, the address changes with them.
IPFS puts it this way: a CID "doesn't indicate where the content is stored, but it forms a kind of address based on the content itself."

**The hash is a name and a proof at once.** Whoever receives the bytes can hash them and compare.
A server, a peer or a cache can hand over the content, and none of them has to be trusted, because the address checks the answer.

**Merkle structures.** When an object refers to others by their hashes, its own hash covers the whole graph below it.
A Git commit hashes a tree, which hashes blobs; an IPFS file is a Merkle DAG of hashed chunks; a Unison definition hashes the hashes of its dependencies.
One hash at the root pins down everything it reaches.

## What Follows

**Immutability.** Content at an address never changes, so anything derived from it never goes stale.
This is what lets Unison typecheck a definition once and keep the result, and what lets a content-addressed build skip work whose output is already known.

**Deduplication.** Identical content is stored once.
Two IPFS files that share a subtree share its storage, and a Git repository holds one blob for a file that appears in a thousand commits.

**Location independence.** Any holder of the content can serve it.
A [[distributed-hash-table|distributed hash table]] turns this into a lookup: ask the network for an address, get back bytes you can check.

**Coexistence of versions.** Two versions of the same thing have two addresses, so neither has to replace the other.
Nix keeps several versions of a package side by side in its store, and Unison keeps two versions of a type side by side in a codebase.

## The Mutable Layer

A content address names one fixed state, and the world keeps changing.
So every content-addressed system pairs its immutable store with a small mutable layer of names that point into it, and moving a name is the only kind of update left.

| System | Immutable store | What moves |
|--------|-----------------|-----------|
| [[git\|Git]] | Blobs, trees and commits keyed by hash | Branches and tags, pointers to commits |
| [[ipfs\|IPFS]] | Content identified by CID | Mutable layers built on top, such as [[ceramic-network\|Ceramic]] streams anchored to CIDs |
| [[nix\|Nix]] | Store objects under `/nix/store` | Profiles and generations that point at a system closure |
| [[unison\|Unison]] | Definitions keyed by the hash of their syntax tree | Names, repointed by refactoring and `upgrade` |
| Holochain | Entries, actions and the DNA, keyed by hash | Coordinator zomes, outside the DNA hash, plus update and delete actions that point at earlier records |

Where the boundary between the two layers sits is the main design decision.
[[content-addressing-in-unison-and-holochain|Content Addressing in Unison and Holochain]] follows that decision through two systems that draw it differently.

## Where It Appears in the Garden

**Files and data.**
[[ipfs|IPFS]] identifies files by CID, sha-256 by default, and finds holders through a Kademlia DHT.
[[iroh|Iroh]] moves content-addressed blobs hashed with BLAKE3, with every chunk verifiable.
The [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/storage/index|Decentralized Storage]] section gathers the systems built on this.

**Version control.**
[[git|Git]] calls itself "a content-addressable filesystem": each object is keyed by the SHA-1 hash of a short header plus its content, with SHA-256 available in newer repositories.

**Builds.**
[[nix|Nix]] stores every build output under a hash, which is how versions coexist.
By default that hash is taken over the build's inputs, not its output: Nix calls such store objects input-addressed.
Store objects whose path is computed from their contents are content-addressed, and content-addressed derivations, which avoid rebuilds when a change to the derivation leaves the output the same, are still an experimental feature (`ca-derivations`).

**Code.**
[[content-addressed-code|Content-Addressed Code]] carries the idea down to every definition of a program, as [[unison|Unison]] does, and lists what follows: no rebuilds, no dependency conflicts, relocatable computation.
[[codebase-as-database|The Codebase as a Database]] shows what it does to branches and merges, and [[blood|Blood]] is a newly announced language that promises the same foundation.

**Networks.**
In Holochain, most data is addressed by the Blake2b-256 hash of its bytes, and a DNA's hash defines the network its agents join ([[dna-and-zomes|DNA and Zomes]]).
Agent identity is the exception: an agent is named by its public key, not by a hash of any content.

**Composition.**
[[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/fractal-composability|Fractal Composability]] counts content-addressed identity among the properties that let a system compose with itself.

## Limits

Content addressing says what a thing is, never whether anyone still holds it.
IPFS content survives only while some node pins it, and a hash with no holder is a name for nothing.
It also cannot express "the latest version": that question always lands on the mutable layer, which needs its own trust, whether a branch on a remote, a signed name, or a DNA's validation rules.

## Related Topics

- [[content-addressed-code|Content-Addressed Code]]: the principle applied to program definitions
- [[content-addressing-in-unison-and-holochain|Content Addressing in Unison and Holochain]]: the same principle applied to code and to networks
- [[ipfs|IPFS]]: content addressing applied to files
- [[distributed-hash-table|Distributed Hash Tables]]: resolving a content address on a network
- [[git|Git]]
- [[nix|Nix Package Manager]]
- [[dna-and-zomes|DNA and Zomes]]
- [[knowledge/tools-and-technology/data-and-storage/index|Data and Storage]]

## References

- [IPFS: Content addressing and CIDs](https://docs.ipfs.tech/concepts/content-addressing/)
- [Pro Git: Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)
- [Nix manual: Content-addressing store objects](https://nix.dev/manual/nix/stable/store/store-object/content-address)
- [Nix manual: Experimental features](https://nix.dev/manual/nix/stable/development/experimental-features)
- [Holochain: Identifiers](https://developer.holochain.org/build/identifiers/)
- [Holochain: DNAs](https://developer.holochain.org/build/dnas/)
- [Unison: The big idea](https://www.unison-lang.org/docs/the-big-idea/)
