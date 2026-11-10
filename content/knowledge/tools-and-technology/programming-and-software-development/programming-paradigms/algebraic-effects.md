---
title: "Algebraic Effects in Direct Style"
date: 2026-11-10
description: "Effect handlers as a direct-style alternative to monads: user-defined control flow with typed effects, and what it trades away, read through Unison abilities and Effect-TS."
aliases:
  - "Algebraic Effects"
  - "Effect Handlers"
  - "Abilities"
tags: ["programming", "functional-programming", "effect-ts", "programming-paradigms", "complexity-oriented-programming"]
draft: false
---

The real power of monads is not purity for its own sake.
It is the ability to define control flow in user space: exceptions, async, cancellation, resource safety, dependency injection, all as ordinary data types and functions rather than as language features.
Algebraic effects keep that power while letting the code read like ordinary sequential code.

## The Problem They Answer

Monadic code pays in plumbing.
It is written on two levels at once: building a description of a computation, and deciding when it runs.
Effects stack awkwardly, transformers appear, and adding one effect deep in a call chain forces `map` to become `traverse` all the way up.
Direct-style code is easy to read, but each control-flow feature needs its own syntax and effects go untyped.

## Abilities in Unison

[[unison|Unison]]'s abilities are its implementation of algebraic effects in direct style, also known as effect handlers.
Under the surface they are a typed interface to delimited continuations.

Effects appear in the signature, between braces, and the body reads like ordinary code:

```unison
safeDiv1 : Nat -> Nat ->{Exception} Nat
```

Calling such a function where no handler is in scope is a type error.
A handler gives the effect a meaning: `catch` turns `Exception` into an `Either` value.
Adding another effect, such as a `Store`, means extending the set in braces and supplying one more handler.
No bind, no transformers, no `map` versus `traverse` split.

## What Is Traded Away

The Unison documentation is candid about the costs.

**Referential transparency.** Extract an effectful expression, such as creating a mutable reference, into a variable, use it twice, and the program changes meaning: both uses now share one reference.
Restoring the original behaviour requires explicitly suspending the expression and forcing it at each use.
Refactoring effectful code demands more care than under monads.

**Static control flow.** Applicative-style code, such as applicative parsers or build systems that inspect their dependency graph before running, cannot be expressed, because an effect cannot be inspected without being performed.

**Expressive power is equal.** Effect handlers, delimited control and monads can express the same things.
The difference lies in ergonomics and in which properties each makes easy to keep.

## Comparison with Effect-TS

[[effect|Effect]] sits on the monadic side.
Its documentation describes an `Effect<Success, Error, Requirements>` as a lazily executed, immutable description of a workflow, with typed success, typed expected errors, and the contextual data it needs to run.
The requirements channel plays a role close to an ability set.
`Effect.gen` uses generators (`yield*`) so that code "appear[s] and behave[s] more like traditional synchronous code" while effects stay values.

The argued reading: abilities give natively what `Effect.gen` imitates, and Effect-TS keeps the referential transparency that abilities give up, because a description can be reused without being performed.

## A Reading Through Complexity Oriented Programming

[[complexity-oriented-programming|Complexity Oriented Programming]] holds that source code describes conditions rather than behaviour, and names verification as its hard problem: a COP system is tested by running the ecology and watching what emerges.
Effect handlers give that idea a concrete mechanism.
Effectful code declares what it requests; the handler in scope decides what the requests mean.
The same program can therefore run under a handler that simulates its environment, then under one that touches the real world, without a line of it changing.
In the [[cop-lang-sketch|COP-Lang sketch]], agents "sense, respond, and emit" and never call each other, which is close to code that only performs effects and leaves their interpretation to the surrounding system.
This is an argued parallel: neither the Unison nor the Effect documentation frames effects this way.

## Open Question for Blood

[[blood|Blood]] promises "all the power of effect systems" together with performance above Rust.
The hard engineering question is how effect handlers, and resumable continuations in particular, compile without runtime cost.
Nothing published so far answers it.

## Related Topics

- [[functional-programming|Functional Programming]]
- [[effect|Effect]]
- [[functional-programming-with-fp-ts|Functional Programming with JavaScript and Effect]]
- [[unison|Unison]]
- [[content-addressed-code|Content-Addressed Code]]
- [[complexity-oriented-programming|Complexity Oriented Programming]]
- [[cop-lang-sketch|COP-Lang Sketch]]
- [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/index|Programming Paradigms]]

## References

- [Unison: Abilities for the monadically inclined](https://www.unison-lang.org/docs/fundamentals/abilities/for-monadically-inclined/)
- [Unison: Writing your own abilities](https://www.unison-lang.org/docs/fundamentals/abilities/writing-abilities/)
- [Effect: The Effect type](https://effect.website/docs/getting-started/the-effect-type/)
- [Effect: Using generators](https://effect.website/docs/getting-started/using-generators/)
