---
title: Defensive Programming
description: A programming practice of anticipating and guarding against potential failures, invalid inputs, and unexpected conditions to build robust software
tags:
  - programming
  - design
  - patterns
  - error-handling
  - software-quality
  - design-principles
aliases:
  - Defensive Coding
  - Robust Programming
related pages:
  - "[[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]]"
  - "[[solid-principles|SOLID Principles]]"
created: 2026-02-27
modified: 2026-02-27
draft: false
---

# Defensive Programming

Defensive programming is the practice of writing code that anticipates and guards against incorrect usage, unexpected inputs, and environmental failures. Rather than assuming inputs are valid and systems behave predictably, a defensive programmer treats every external boundary as a potential source of failure and writes code that remains correct even when conditions are not ideal.

The goal is not paranoia but reliability: software that degrades gracefully, fails with clear messages, and never silently produces wrong results.

## Core Principles

- **Validate all inputs at system boundaries**: never trust data from users, external APIs, file systems, or inter-process communication without checking it first.
- **Assume external data is untrusted and potentially malformed**: external means anything outside your current function or module.
- **Fail explicitly rather than silently continuing**: when something is wrong, surface it immediately instead of allowing corrupt state to propagate.
- **Use assertions to document and verify invariants**: assertions state what must be true and make violations visible during development.
- **Handle errors explicitly at every layer**: avoid swallowing exceptions or returning null without explanation.
- **Minimize shared mutable state**: shared state is the primary vector for unexpected mutations and race conditions.

## Key Techniques

### Input Validation

Validate inputs as close to the entry point as possible. Reject invalid data before it enters your processing logic.

```
function createUser(name, age):
    if name is empty:
        throw InvalidArgumentError("name cannot be empty")
    if age < 0 or age > 150:
        throw InvalidArgumentError("age must be between 0 and 150")
    // proceed with valid data
```

Validation at boundaries prevents invalid state from propagating deeper into the system, where it becomes harder to diagnose.

### Assertions and Invariants

Assertions express conditions that must always be true at a given point in the code. They are not error handling for user input; they are contracts about internal correctness.

```
function calculateDiscount(price, rate):
    assert price >= 0, "price must be non-negative"
    assert 0 <= rate <= 1, "rate must be a fraction"
    return price * rate
```

Assertions are typically enabled in development and disabled in production, but the practice of naming invariants explicitly makes code easier to reason about regardless.

### Explicit Error Handling

Avoid hiding errors. Return typed error values or throw typed exceptions instead of returning null, -1, or a sentinel value that callers might ignore.

```
// Fragile: caller may ignore -1
function findIndex(list, item):
    ...
    return -1  // not found

// Defensive: caller must handle the absent case
function findIndex(list, item): Result<int, NotFoundError>
    ...
    return Err(NotFoundError)
```

When an error is genuinely non-fatal, log it and explain why you are continuing rather than silently swallowing it.

### Defensive Copying

When a function receives a mutable object (array, map, struct), copy it before storing or returning it. This prevents callers from modifying shared state through a reference they still hold.

```
function setItems(items):
    this.items = copy(items)  // own the data

function getItems():
    return copy(this.items)  // don't expose internals
```

Defensive copying is especially important in languages without built-in immutability guarantees.

### Immutability

Prefer immutable data structures and value objects wherever possible. Immutable values cannot be corrupted by concurrent access or accidental mutation.

When objects must be mutable, limit mutation to clearly defined methods and document side effects explicitly.

## Relationship to the Fail-Fast Principle

Defensive programming and the [[Fail-Fast Principle]] (listed as a sibling concept in [[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]]) are complementary but distinct:

- **Defensive programming** is proactive: it anticipates what could go wrong and adds guards, validation, and contracts before problems occur.
- **Fail-fast** is reactive: it specifies that once an error is detected, the system should abort immediately rather than attempt recovery that might mask the root cause.

In practice, defensive programming creates the checks; the fail-fast principle governs what those checks do when they fire. A well-written defensive function validates its inputs (defensive) and throws immediately on violation (fail-fast).

## Related Topics

- [[solid-principles|SOLID Principles]]
- [[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]]
