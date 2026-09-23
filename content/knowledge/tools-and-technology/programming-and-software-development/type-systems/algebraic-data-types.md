---
title: "Algebraic Data Types"
description: "Types built from sums and products, whose values can be counted with ordinary arithmetic and whose structure is described mathematically by initial algebras."
aliases:
  - "ADT"
  - "Algebraic Types"
  - "Sum Types"
  - "Product Types"
tags: ["programming", "functional-programming", "data-structures", "mathematics", "rust"]
date: 2026-09-22
draft: false
---

An **algebraic data type** (ADT) is a type assembled from two operations: the **product**, which bundles values together, and the **sum**, which offers a choice between variants. Where a [[linear-types|linear type]] governs *how* a value may be used, an algebraic type defines *what* the value is: its shape and the set of forms it can take.

The name is earned literally. Count the values a type can hold and the sums and products of types become sums and products of numbers, and the familiar laws of school algebra turn into equivalences between programs.

## Key Concepts

**Product types** combine types so that a value holds one value of each component: tuples, records, structs. The set of values is the Cartesian product of the component sets.

**Sum types** (also called tagged unions or disjoint unions) hold exactly one of several variants, each introduced by a named constructor. The tag records which variant is present.

**Unit and empty.** The unit type has exactly one value (`()` in Haskell and Rust) and is the identity for products. The empty type has no values (`Void` in Haskell, `!` or an empty `enum` in Rust) and is the identity for sums.

**Pattern matching** is how a sum is consumed: the program inspects the tag and binds the fields of whichever variant it finds. Compilers can check that a match is **exhaustive**, so adding a variant surfaces every place that has to handle it.

**Illegal states become unrepresentable.** Because the type lists every valid form, states that should never exist cannot be constructed at all:

```rust
enum Connection {
    Disconnected,
    Connecting { attempt: u32 },
    Connected { session_id: String },
}
```

A `Connected` value always carries a session id and a `Disconnected` value never does; no boolean flag can drift out of sync with an optional field.

The same idea in Haskell, including a recursive type:

```haskell
data Shape = Circle Double | Rect Double Double

data List a = Nil | Cons a (List a)
```

## The Algebra of Types

Write $|T|$ for the number of values of a type $T$. Then:

| Type construction | Example | Cardinality |
|---|---|---|
| Empty | `Void` | $0$ |
| Unit | `()` | $1$ |
| Sum | `Either A B` | $\lvert A\rvert + \lvert B\rvert$ |
| Product | `(A, B)` | $\lvert A\rvert \times \lvert B\rvert$ |
| Function | `A -> B` | $\lvert B\rvert^{\lvert A\rvert}$ |

`Bool` is $1 + 1 = 2$. `Maybe A` is $1 + A$. A function type is an exponential because a function from $A$ to $B$ chooses one of $|B|$ outputs independently for each of the $|A|$ inputs.

The algebraic laws hold as **isomorphisms**: two types with equal counts can be converted into each other and back without loss.

- $A \times (B + C) \cong A \times B + A \times C$: a pair holding an `Either` is the same information as an `Either` of pairs (distributivity).

- $C^{A + B} \cong C^A \times C^B$: a function out of a sum is a pair of functions, one per case, which is exactly what a `match` expression is.

- $C^{A \times B} \cong (C^B)^A$: a function of a pair is a function returning a function, which is currying.

**Recursive types are fixed points.** The list declaration above reads as the equation $L = 1 + A \times L$. Unfolding it gives $L = 1 + A + A^2 + A^3 + \dots$: a list is empty, or holds one element, or two, and so on.

**Types can be differentiated.** Conor McBride showed that the derivative of a regular type with respect to a type variable computes its type of **one-hole contexts**: the structure with one element removed and a marker where it was. Those contexts are Huet's **zippers**, the data structure used to focus on and edit one position inside a tree. For a pair, $\frac{\partial}{\partial A}(A \times A) = 2 \times A$: the hole is on the left or the right, and the other element remains.

## Mathematical Foundations

**Initial algebras.** In category theory, a recursive data type is the **initial algebra** of a functor. The list type is the initial algebra of $F(X) = 1 + A \times X$: it has the constructors `Nil` and `Cons`, and initiality says that for any other way of interpreting those two constructors there is exactly one structure-respecting function out of the list. That unique function is the **fold** (catamorphism), which is why every list recursion can be written as `foldr`.

**Cartesian closed categories.** Products, the unit type and function types are the structure of a cartesian closed category; adding sums and the empty type gives coproducts and an initial object. The simply typed lambda calculus with these types is the internal language of such categories.

**Curry-Howard reading.** Under the propositions-as-types correspondence, a product is a conjunction ("I have an $A$ and a $B$"), a sum is a disjunction ("I have an $A$ or a $B$, and I know which"), the empty type is falsity, the unit type is truth, and a function is an implication. Constructing a value is proving the proposition. The "and I know which" is the constructive content that [[mathematical-intuitionism|intuitionism]] demands of a disjunction.

## In Practice

ADTs were introduced in **Hope**, a small functional language developed in the 1970s at the University of Edinburgh by Rod Burstall, Dave MacQueen and Don Sannella, and reached wide use through the ML family.

- **[[haskell|Haskell]]**: `data` declarations, with pattern matching and deriving.

- **[[ocaml|OCaml]]**: variants and records, with exhaustiveness warnings from the compiler.

- **[[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]]**: `enum` is a sum type and `struct` a product; `Option<T>` and `Result<T, E>` replace null and exceptions.

- **TypeScript**: discriminated unions, a union of object types sharing a literal `kind` field that the compiler narrows on.

ADTs and [[linear-types|linear types]] sit on independent axes. A language can define the shape of a value with an ADT and separately require that the value, or a field of it, be consumed exactly once.

## Related Topics

- [[linear-types|Linear Types]]
- [[knowledge/tools-and-technology/programming-and-software-development/type-systems/index|Type Systems]]
- [[functional-programming|Functional Programming]]
- [[haskell|Haskell]]
- [[mathematical-intuitionism|Mathematical Intuitionism]]
- [[knowledge/tools-and-technology/mathematics/index|Mathematics]]

## References

- [Algebraic data type (Wikipedia)](https://en.wikipedia.org/wiki/Algebraic_data_type)
- Conor McBride, [The Derivative of a Regular Type is its Type of One-Hole Contexts](http://strictlypositive.org/diff.pdf), 2001
- [Initial algebra (nLab)](https://ncatlab.org/nlab/show/initial+algebra+of+an+endofunctor)
