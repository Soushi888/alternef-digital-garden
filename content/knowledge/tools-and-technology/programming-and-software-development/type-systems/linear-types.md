---
title: "Linear Types"
description: "A substructural type discipline, grounded in Girard's linear logic, in which a value must be used exactly once, turning resource management into something the type checker enforces."
aliases:
  - "Linear Type System"
  - "Substructural Types"
  - "Affine Types"
tags: ["programming", "functional-programming", "programming-paradigms", "mathematics", "rust"]
date: 2026-09-22
draft: false
---

A **linear type** is a type whose values must be used **exactly once**. They cannot be copied, and they cannot be silently dropped. Where an [[algebraic-data-types|algebraic data type]] defines *what* a value is, a linear type controls *how* it may be used.

That single rule does a lot of work. A value that cannot be duplicated cannot be freed twice; a value that cannot be discarded cannot leak. A file handle, a database transaction or a network session typed linearly must reach its closing operation on every path through the program, and the compiler checks that it does. Wadler's 1990 paper put the idea in its title: *Linear types can change the world!* A linearly typed value, like the world, can be neither duplicated nor destroyed, so it can be updated in place with no reference counting or garbage collection.

## Key Concepts

**Structural rules.** Ordinary type systems silently allow three operations on the variables in scope:

- **Exchange**: use variables in any order.

- **Weakening**: ignore a variable (discard it).

- **Contraction**: use a variable more than once (duplicate it).

A **substructural** type system removes one or more of them. Each removal gives a different usage discipline:

| Discipline | Exchange | Weakening | Contraction | Each value is used |
|---|---|---|---|---|
| Ordered | no | no | no | exactly once, in order of introduction |
| Linear | yes | no | no | exactly once |
| Affine | yes | yes | no | at most once |
| Relevant | yes | no | yes | at least once |
| Unrestricted | yes | yes | yes | any number of times |

**Affine is the practical cousin.** Dropping weakening is what forces a resource to be closed; dropping contraction is what prevents aliasing and double use. Many languages keep the second guarantee and give up the first, so values may be used at most once and may be thrown away.

## Mathematical Foundations

**Linear logic.** Jean-Yves Girard introduced linear logic in 1987 as a refinement of classical and intuitionistic logic. Its key move is to treat a hypothesis as a **resource** consumed by the proof, rather than a truth that stays true however often it is invoked. The standard illustration is a menu: $\text{Cash} \multimap \text{Meal}$ says that cash can be turned into a meal, and after the exchange the cash is gone.

Because resources are counted, the connectives of ordinary logic split in two:

- **Multiplicatives**: tensor $A \otimes B$ (both resources, held together) and par, written *A* ⅋ *B*, with units $1$ and $\bot$.

- **Additives**: with $A \mathbin{\&} B$ (a choice of either, made by the consumer) and plus $A \oplus B$ (one of them, chosen by the producer), with units $\top$ and $0$.

- **Linear implication**: $A \multimap B$, consume an $A$ to produce a $B$, defined as *A*<sup>⊥</sup> ⅋ *B*.

- **Exponentials**: $!A$ ("of course") and $?A$ ("why not") mark the formulas that may be weakened and contracted again. They are the controlled door back to ordinary logic: intuitionistic implication $A \Rightarrow B$ is recovered as $!A \multimap B$.

**Categorical semantics.** Intuitionistic logic, and the typed lambda calculus with [[algebraic-data-types|products and sums]], is modelled by cartesian closed categories. Linear logic replaces the cartesian product with a monoidal product that has no diagonal (no copying) and no projection (no discarding): its models are **symmetric monoidal closed categories**, with $\otimes$ as the monoidal product and $\multimap$ as the internal hom.

**Curry-Howard reading.** Under propositions-as-types, a linear type system is the term language of linear logic. A linear function $A \multimap B$ is a proof that uses its hypothesis exactly once. In this reading the product $\times$ of an ordinary ADT corresponds to two different things: $\otimes$ when both components are consumed, and $\&$ when the consumer picks one. The resource-blind algebra of types splits into a resource-aware one.

## In Practice

- **Linear Haskell.** [[haskell|GHC]] ships the `LinearTypes` extension since version 9.0.1, following the POPL 2018 paper *Linear Haskell: practical linearity in a higher-order polymorphic language*. Linearity sits on the **arrow**, not on the type: `a %1 -> b` (or `a ⊸ b` with Unicode syntax) is a function that, if its result is consumed exactly once, consumes its argument exactly once. Existing types stay as they are, and linear and non-linear code share the same data declarations.

- **Rust.** [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]]'s ownership model is **affine**, not linear. Moving a value transfers its unique owner and the old binding can no longer be used, which rules out duplication and use-after-free. Dropping is still allowed: `std::mem::forget` is a safe function, because, in the words of the standard library documentation, "Rust's safety guarantees do not include a guarantee that destructors will always run." Rust guarantees at most once, not exactly once.

- **Clean.** Clean's **uniqueness types** mark a value as having a single reference, which lets the compiler perform destructive updates safely; they are a close relative of linear types.

- **Swift** supports this family of types from version 5.9.

## Linear and Algebraic Together

The two ideas are orthogonal. An [[algebraic-data-types|algebraic data type]] fixes the shape of a value; a linearity discipline fixes how many times it may be consumed. They compose: a sum type whose variants are the states of a protocol, passed along linearly, forces a program to move through the protocol one state at a time without keeping an old state around. In Rust this is the common "typestate" pattern, where each transition takes `self` by value and returns the next state.

## Related Topics

- [[algebraic-data-types|Algebraic Data Types]]
- [[knowledge/tools-and-technology/programming-and-software-development/type-systems/index|Type Systems]]
- [[functional-programming|Functional Programming]]
- [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]]
- [[haskell|Haskell]]
- [[mathematical-intuitionism|Mathematical Intuitionism]]

## References

- Jean-Yves Girard, "Linear Logic", 1987. Overview: [Linear logic (Wikipedia)](https://en.wikipedia.org/wiki/Linear_logic)
- Philip Wadler, [Linear Types can Change the World!](https://www.semanticscholar.org/paper/Linear-Types-can-Change-the-World!-Wadler/24c850390fba27fc6f3241cb34ce7bc6f3765627), IFIP Working Conference on Programming Concepts and Methods, 1990
- [Substructural type system (Wikipedia)](https://en.wikipedia.org/wiki/Substructural_type_system)
- [GHC User's Guide: Linear types](https://ghc.gitlab.haskell.org/ghc/doc/users_guide/exts/linear_types.html)
- [Rust standard library: `std::mem::forget`](https://doc.rust-lang.org/std/mem/fn.forget.html)
