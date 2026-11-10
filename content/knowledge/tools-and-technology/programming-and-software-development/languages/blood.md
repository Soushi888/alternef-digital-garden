---
title: "Blood"
date: 2026-11-10
description: "A programming language announced by Kit Langton in November 2026, promising content-addressed code, effect systems and semantic merging at systems-level performance; almost nothing about it is public yet."
aliases:
  - "Blood Language"
  - "blood-lang"
tags: ["programming", "content-addressing", "functional-programming", "version-control"]
draft: false
---

Blood is a programming language announced on X by Kit Langton on 2026-11-07.
Almost nothing about it is public yet, so this note separates what can be confirmed from what circulates.
Most of what it promises is already explained in the notes on [[unison|Unison]].

## What Can Be Confirmed

The announcement post reads: "I'm making a programming language called blood. Faster than rust, a powerful type system, all the power of effect systems, metaprogramming, zero-cost worktrees, semantic merging, sqlite-stored content-addressable code."

The website, blood-lang.org, holds the name, the tagline "A programming language for humans." and the word "Soon".
There is no public repository, specification or release.

Kit Langton's personal site says he is "currently working on opencode", the open-source coding agent.
The same site states his life goal as "precipitate the age of effect systems", and lists his Effect lessons, tools and talks, including "Algebraic Effects from Scratch".
Blood's promise of "all the power of effect systems" comes from someone whose public work is centred on them ([[effect|Effect]], [[algebraic-effects|Algebraic Effects in Direct Style]]).

## A Relevant Precedent

Kit Langton maintains neotype, a Scala library with an optional `comptime` module that evaluates expressions at compile time, inlines the results as literals, and produces custom compile errors through `comptimeError`.
Blood's metaprogramming plausibly continues that line of work.
This is an inference, not a statement from the author.

## Circulating but Unverified

The following comes from an AI-generated summary of the announcement thread and from search snippets, and could not be checked against a primary source.
Treat all of it as unconfirmed.

- A follow-up post in the thread: "My goal is for most of anomaly's software to be rewritten in blood within 6 months time." The quote was seen only in a search-engine snippet, not on the page itself, and Kit's affiliation with Anomaly is not stated on his site.
- An LLVM backend and an interpreted mode for development.
- Around 7,000 commits.
- Inspirations including Unison, Haskell, Scala, Koka, Rust, Zig, TypeScript, Elm, Swift and Lean.
- A syntax close to Rust with a parser tolerant of near misses.
- Compile-time sketches: regular expressions whose named groups become typed fields, refinement types, typed SQL and HTTP route macros.

## Reading Blood Through Unison

Most of the announced feature list maps onto ideas already working in [[unison|Unison]]:

- content-addressed storage: [[content-addressed-code|Content-Addressed Code]]
- semantic merging and cheap worktrees: [[codebase-as-database|The Codebase as a Database]]
- effect systems: [[algebraic-effects|Algebraic Effects in Direct Style]]

What would be new is the combination with systems-level performance and heavy compile-time metaprogramming.
Unison runs on a managed, garbage-collected runtime; a content-addressed, effect-handled language that beats [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]] would be a different kind of object.

## Open Questions

- How are effect handlers compiled without runtime overhead?
- Does content addressing interact with compile-time evaluation, for instance by caching comptime results per hash the way Unison caches typechecking?
- What is the editing model: scratch files like Unison, ordinary source files synchronised into SQLite, or something else?
- What is the memory model, given the comparison with Rust?

## Related Topics

- [[unison|Unison]]
- [[content-addressed-code|Content-Addressed Code]]
- [[codebase-as-database|The Codebase as a Database]]
- [[algebraic-effects|Algebraic Effects in Direct Style]]

## References

- [blood-lang.org](https://blood-lang.org/)
- [Announcement post on X](https://x.com/kitlangton/status/2119137520529375499)
- [kitlangton/neotype on GitHub](https://github.com/kitlangton/neotype)
- [Kit Langton's site](https://kitlangton.com/)
