---
title: "Unison"
date: 2026-11-10
description: "A statically typed functional language whose definitions are identified by the hash of their syntax tree, with effects expressed as abilities."
aliases:
  - "Unison Language"
  - "Unison Lang"
tags: ["programming", "functional-programming", "content-addressing", "distributed-systems"]
draft: false
---

Unison is a statically typed functional language whose definitions are identified by the hash of their syntax tree ([[content-addressed-code|content-addressed code]]), with effects expressed as abilities ([[algebraic-effects|algebraic effects]]).
It is developed by Unison Computing, a public benefit corporation, together with outside contributors.
It is the working reference implementation of the ideas [[blood|Blood]] has announced.

## Key Concepts

The ecosystem has three parts.
The Unison Codebase Manager (UCM) is the command-line tool that adds, updates and runs code in the codebase database, with an optional desktop companion.
Unison Share hosts public and private libraries and projects.
Unison Cloud is a managed platform for Unison services and batch jobs.

## Small Examples

A program that needs input and output and may throw declares it in its type:

```unison
helloWorld : '{IO, Exception} ()
helloWorld _ = printLine "Hello World"
```

The leading quote marks a delayed computation.

Distribution is an ability too: with the `Remote` ability, a map, filter and reduce over a distributed sequence reads like the local version.
The documentation's article on distributed datasets builds Spark-like datasets in under 100 lines.

## What the Design Buys

Covered in detail in [[content-addressed-code|Content-Addressed Code]] and [[codebase-as-database|The Codebase as a Database]]: no rebuilds, no dependency conflicts, relocatable computation, typed durable storage, and a codebase that never breaks during refactoring.

## Learning Path

1. [The big idea](https://www.unison-lang.org/docs/the-big-idea/), the best half hour to invest.
2. [Abilities for the monadically inclined](https://www.unison-lang.org/docs/fundamentals/abilities/for-monadically-inclined/), for anyone coming from monads or [[effect|Effect]].
3. Install UCM from the [GitHub releases](https://github.com/unisonweb/unison/releases) and follow [A tour of the Unison workflow](https://www.unison-lang.org/docs/tour).
4. Practice with the Wordle lab in the documentation or the Unison track on Exercism.
5. Write one ability of one's own. The documentation claims this is easier than writing a custom monad, a claim worth testing personally.

## Related Topics

- [[content-addressed-code|Content-Addressed Code]]
- [[codebase-as-database|The Codebase as a Database]]
- [[algebraic-effects|Algebraic Effects in Direct Style]]
- [[blood|Blood]]
- [[haskell|Haskell]]: a neighbouring statically typed functional language
- [[content-addressing-in-unison-and-holochain|Content Addressing in Unison and Holochain]]

## References

- [Unison website](https://www.unison-lang.org/)
- [unisonweb/unison on GitHub](https://github.com/unisonweb/unison)
