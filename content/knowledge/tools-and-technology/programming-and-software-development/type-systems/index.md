---
title: "Type Systems"
date: 2026-09-22
description: "How type systems describe the shape of data and the way values may be used, from algebraic data types to linear and substructural types, with their roots in logic and category theory."
tags: ["programming", "functional-programming", "mathematics"]
---

A type system is a set of rules a compiler checks before a program runs. This section looks at type systems from two sides at once: as programming tools that rule out whole classes of bugs, and as mathematical objects, since through the Curry-Howard correspondence types are propositions and programs are proofs.

## Key Focus Areas

### [[knowledge/tools-and-technology/programming-and-software-development/type-systems/algebraic-data-types|Algebraic Data Types]]

Types built from sums and products. They describe *what* a value is, obey the laws of ordinary algebra up to isomorphism, and are modelled by initial algebras and cartesian closed categories.

### [[knowledge/tools-and-technology/programming-and-software-development/type-systems/linear-types|Linear Types]]

Types whose values must be used exactly once. They describe *how* a value may be used, come from Girard's linear logic, and are modelled by symmetric monoidal closed categories. Rust's ownership model is their affine cousin.

## Guiding Principles

- **Shape and usage are separate axes.** Algebraic types fix the form of a value; substructural types fix how often it may be consumed. The two compose.

- **Make illegal states unrepresentable.** A type that cannot express an invalid state removes the need to check for it.

- **Every type rule is also a logical rule.** Reading a type system as a logic explains why its rules are the ones they are.

## Related Sections

- [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/index|Programming Paradigms]]
- [[knowledge/tools-and-technology/mathematics/index|Mathematics]]
- [[mathematical-intuitionism|Mathematical Intuitionism]]
