---
title: "Orthogonality and Functional Programming"
date: 2026-10-08
description: "How functional programming supplies the mechanisms that make orthogonal architecture achievable, and why orthogonality is the architectural goal that FP naturally serves."
aliases:
  - "Orthogonal Functional Architecture"
  - "FP and Orthogonality"
tags: ["programming", "functional-programming", "software-architecture", "programming-paradigms"]
draft: false
---

The relationship between [[orthogonal-architecture|orthogonal architecture]] and [[functional-programming|functional programming]] is **mutually reinforcing**. Functional programming provides the *mechanisms* that make orthogonal architecture *achievable*, and orthogonality is the *architectural goal* that FP naturally serves.

## How FP Enables Orthogonality

### Pure functions eliminate side effects

Freedom from side effects is the core requirement of orthogonality. A pure function maps inputs to outputs without touching shared state, so composing it with anything else cannot cause unintended interactions. This is exactly what "operations don't have side effects" means in the definition of orthogonal design.

### Immutability removes shared mutable state

Shared mutable state is the main source of hidden coupling. When data cannot be mutated in place, components cannot interfere with each other through a shared reference.

### Higher-order functions are orthogonal by design

`map` and `filter` are orthogonal to the function you pass them: you can swap the function without changing `map` or `filter`, and the other way round. This is a concrete instance of "each primitive operation has a single, unique concern."

```typescript
const double = (n: number) => n * 2
const isEven = (n: number) => n % 2 === 0

// Iteration, selection and transformation are three separate concerns
const result = [1, 2, 3, 4].filter(isEven).map(double) // [4, 8]
```

### Monads and effect systems separate concerns

A `Maybe Int` or `Either Error Result` threads the *handling* of edge cases through a pipeline without tangling that logic into every step. The error-handling concern becomes orthogonal to the business-logic concern.

```haskell
parseAge :: String -> Either String Int
validateAge :: Int -> Either String Int
toCategory :: Int -> String

-- Each step knows nothing about how failure propagates
categorize :: String -> Either String String
categorize input = toCategory <$> (parseAge input >>= validateAge)
```

Effect libraries such as [[effect|Effect]] in TypeScript push the same idea further: dependencies, errors, and resource handling each live in their own type parameter rather than inside the function body.

## The Two Keys: Composability and Orthogonality

In his talk *Orthogonal Functional Architecture*, John A. De Goes distills the relationship:

> **Composability** makes functional code *powerful*, and **orthogonality** makes it *beautiful* (modular and uncluttered by irrelevant details).

- **Composability**: values combine to give values of the same kind (function composition, piping, nesting). Integers under addition are the simplest example.

- **Orthogonality**: each primitive operation has a **single, unique concern**, so the composition does not tangle unrelated responsibilities.

Without orthogonality, you can compose, but the result is a mess of entangled concerns. Without composability, even orthogonal pieces cannot be assembled into a whole. The same pair appears at every scale in [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/fractal-composability|fractal composability]].

## Language-Level Orthogonality

Functional languages are often described as **highly orthogonal** at the language level: functions, types, pattern matching, and recursion combine in all meaningful ways without special restrictions. In [[haskell|Haskell]] a function can take, return, or store any value, including other functions and [[algebraic-data-types|algebraic data types]].

Older imperative languages carry non-orthogonal restrictions. In standard Pascal a function cannot return a record, and early C could not pass or return a struct by value. Each restriction forces a workaround (out-parameters, pointers) that leaks a mechanical concern into the design.

## Summary

| Orthogonality requirement | FP mechanism that satisfies it |
|---|---|
| No side effects | Pure functions |
| No shared mutable state | Immutability, persistent data structures |
| Single, unique concern per operation | Small, focused functions and the [[solid-principles\|Single Responsibility Principle]] |
| Free combination of primitives | Function composition, higher-order functions |
| Separation of cross-cutting concerns | Monads, type classes, algebraic effects |

In short: **orthogonal architecture is the *what* (the goal), and functional programming is one of the most effective *hows* (the toolkit) for achieving it.** You can build orthogonal systems in imperative or object-oriented code too, but FP makes orthogonality the default rather than the exception.

## Related Topics

- [[orthogonal-architecture|Orthogonal Architecture]]
- [[functional-programming|Functional Programming]]
- [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/fractal-composability|Fractal Composability]]
- [[algebraic-data-types|Algebraic Data Types]]
- [[effect|Effect]]
- [[functional-programming-with-fp-ts|Functional Programming with JavaScript and Effect]]
- [[knowledge/tools-and-technology/programming-and-software-development/software-architecture/index|Software Architecture]]
- [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/index|Programming Paradigms]]

## References

- [John A. De Goes, *Orthogonal Functional Architecture* (slides, Lambda Squared)](https://www.slideshare.net/jdegoes/orthogonal-functional-architecture)
- [John A. De Goes, *A Tour of Functional Design* (Scala Italy 2019)](https://vimeo.com/370819261)
