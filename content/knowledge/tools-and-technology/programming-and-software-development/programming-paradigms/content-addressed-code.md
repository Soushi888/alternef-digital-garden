---
title: "Content-Addressed Code"
date: 2026-11-10
description: "Identifying each code definition by a hash of its content instead of its name, and the cascade of consequences that follows: no rebuilds, no dependency conflicts, relocatable computation."
aliases:
  - "Content Addressed Code"
  - "Content-Addressable Code"
tags: ["programming", "content-addressing", "programming-paradigms", "complexity-oriented-programming", "version-control", "distributed-systems"]
draft: false
---

In a conventional language, the identity of a definition is its name and its place in a text file.
Content addressing replaces that identity with a hash of the definition itself.
The question this note follows is simple: what changes when code is identified by what it is rather than by what it is called?

## Key Concepts

In [[unison|Unison]], the hash is computed over the [[abstract-syntax-trees|syntax tree]] after two normalisations.
Argument names are replaced by positional references, and every dependency is replaced by its own hash.
The hash therefore pins down the exact implementation and, transitively, everything it depends on.
Human-readable names are stored apart, as metadata that never enters the hash.
Unison uses 512-bit SHA3.

```unison
increment : Nat -> Nat
increment n = n + 1
```

Renaming `n`, or renaming `increment` itself, leaves the hash untouched.
Changing `+ 1` to `+ 2` produces a new definition with a new hash.

### Mental Model

An immense, immutable address space.
Each definition sits at an address whose content never changes.
Names are pointers into that space, and moving a pointer is the only kind of mutation left.

## Consequences

**No rebuilds.** A definition that cannot change only needs to be parsed and typechecked once.
Unison stores the result as part of the codebase format, not in a disposable IDE cache, so it is never invalidated.
Deterministic tests whose dependencies have not changed do not need to run again either.

**No dependency conflicts.** A dependency conflict is two definitions competing for the same name.
Reference by hash and the competition disappears.
Two versions of an `Email` type, from v1 and v2 of the same library, can live side by side with different hashes.
One can write ordinary conversion functions between them and consolidate later, instead of stopping the world.

**Relocatable computation.** To run code elsewhere, send its bytecode tree.
The receiver checks which hashes it lacks, asks for them, and caches them.
Deployment and remote procedure calls become special cases of moving a computation.

**Typed durable storage.** Any value, functions included, can be persisted without a hand-written encoder or decoder.
Those layers usually exist because the code that reads the data next year may differ from the code that wrote it.
With immutable definitions, a deserialised value keeps exactly the meaning it had when it was stored.

**Richer tooling.** A codebase that is a database knows the type of everything and every dependency exactly.
Type-based search, fully hyperlinked code and instant renames that break nothing come almost for free.

## A Property of Fractal Composition

[[fractal-composability|Fractal Composability]] lists content-addressed identity among the six properties that make a system fractally composable, and shows it at work in MuseCode phrases and in the Nondominium genesis hash.
Unison carries the same move down to every definition of a program.
A definition reused in a thousand places keeps one identity, so composition never has to ask which copy is meant.
Read this way, Unison is a language whose unit of code already satisfies the reuse condition that [[complexity-oriented-programming|Complexity Oriented Programming]] needs from its primitives.
The reading is an argument, not a claim made by the Unison project.

## The Cost

Text stops being the source of truth.
Editors, grep, [[git|Git]], diff viewers and review platforms all assume files.
Unison keeps text as an editing surface: definitions are pulled into a scratch file, pretty-printed with their current names, edited, and added back.
Its documentation concedes that text-based tools have a large existing ecosystem.
Adopting content-addressed code means adopting the tooling that comes with it.

## Related Topics

- [[codebase-as-database|The Codebase as a Database]]: what content addressing does to branches, merges and refactoring
- [[algebraic-effects|Algebraic Effects in Direct Style]]: the other half of Unison's design
- [[blood|Blood]]: a newly announced language built on the same idea
- [[content-addressing-in-unison-and-holochain|Content Addressing in Unison and Holochain]]: the same principle applied to code and to data
- [[ipfs|IPFS]]: content addressing applied to files
- [[fractal-composability|Fractal Composability]]: content-addressed identity as a condition of recursive composition
- [[complexity-oriented-programming|Complexity Oriented Programming]]
- [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/index|Programming Paradigms]]

## References

- [Unison: The big idea](https://www.unison-lang.org/docs/the-big-idea/)
