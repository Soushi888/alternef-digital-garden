---
title: "Orthogonal Architecture"
date: 2026-10-08
description: "A design principle in which components are independent, so that changing one never forces a change in another and primitives combine freely without hidden interactions."
aliases:
  - "Orthogonality"
  - "Orthogonal Design"
  - "Orthogonal Software Design"
tags: ["programming", "software-architecture", "software-development"]
draft: false
---

**Orthogonal architecture** is the design principle that the parts of a system should be independent of each other. The term comes from geometry: two orthogonal axes meet at a right angle, so moving along one leaves your position on the other unchanged. In software, two components are orthogonal when changing one has no effect on the other.

The practical test is simple: if you change the database layer, does the user interface have to change too? If yes, the two are coupled. If no, they are orthogonal.

## Key Concepts

### Independence

Each component owns a **single, unique concern**. Nothing it does depends on how another component is implemented, only on the contract it exposes. This is close to the [[solid-principles|Single Responsibility Principle]], but stated at every scale: functions, modules, services, and language features.

### No side effects between parts

An operation is orthogonal only if it does not reach into state it does not own. Hidden side effects, global variables, and shared mutable references are the usual ways orthogonality breaks: two pieces of code look unrelated and interfere anyway.

### Free combination of primitives

A small set of orthogonal primitives that combine in every meaningful way gives more expressive power than a large set of special cases. The number of things you can build grows with the product of the primitives, while the number of things you must learn grows only with their sum.

### Decoupling cross-cutting concerns

Logging, error handling, authentication, and persistence touch everything. An orthogonal design keeps them out of the business logic and attaches them at the edges, so the domain code does not change when the logging strategy does.

## Orthogonality at Three Levels

| Level | Orthogonal when... | Non-orthogonal example |
|---|---|---|
| **Language** | Every construct combines with every other without special rules | Standard Pascal functions cannot return a record; early C could not pass or return a struct by value |
| **Code** | Each function or module has one concern and no hidden coupling | A validation routine that also writes to the log and mutates a cache |
| **System** | Services, layers, and teams can change independently | Changing the database schema forces a UI release |

ALGOL 68 is the classic case of a language designed explicitly around orthogonality: a small set of concepts, each allowed in every context where it makes sense.

## Benefits

- **Local reasoning**: you can understand a component without reading the rest of the system.

- **Easier change**: a modification stays inside the component that needs it.

- **Testability**: independent components can be tested in isolation, without elaborate setup.

- **Reuse**: a component with one concern and no hidden dependencies fits into new contexts.

- **Reduced risk**: a defect in one part cannot silently propagate through shared state.

## How to Achieve It

Orthogonality is a goal, not a technique, and several toolkits serve it:

- **Functional programming**: pure functions, immutability, and composition make orthogonality the default. See [[orthogonality-and-functional-programming|Orthogonality and Functional Programming]].

- **Separation of concerns and layering**: hexagonal and clean architectures isolate the domain from infrastructure.

- **Explicit interfaces**: components communicate through contracts rather than shared internals.

- **Event-driven patterns**: an [[event-bus|Event Bus]] or [[cqrs-pattern|CQRS]] separates who produces a change from who reacts to it.

## Related Topics

- [[orthogonality-and-functional-programming|Orthogonality and Functional Programming]]
- [[functional-programming|Functional Programming]]
- [[solid-principles|SOLID Principles]]
- [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/fractal-composability|Fractal Composability]]
- [[cqrs-pattern|CQRS Pattern]]
- [[knowledge/tools-and-technology/programming-and-software-development/software-architecture/index|Software Architecture]]

## References

- Andrew Hunt and David Thomas, *The Pragmatic Programmer* (Addison-Wesley), the "Orthogonality" topic.
- [The Pragmatic Programmer, Topic 9: Orthogonality (study notes)](https://dev.to/steadbytes/tpp-topic-9-orthogonality-kcd)
- [Orthogonal Design Principles in Engineering](https://flocode.substack.com/p/orthogonal-design-principles-in-engineering)
