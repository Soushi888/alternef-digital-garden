---
title: Functional Programming with JavaScript and fp-ts
description: A comprehensive guide to functional programming techniques in JavaScript and TypeScript
tags:
  - functional-programming
  - javascript
  - typescript
  - fp-ts
  - monads
aliases: 
  - FP in JS
  - Functional JS
related pages:
  - "[[type-systems]]"
---

## Overview of Functional Programming in JavaScript

[[functional-programming|Functional programming (FP)]] is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. While JavaScript is not a purely functional language, it provides powerful tools for implementing functional programming principles.

## Core Functional Programming Concepts

### Pure Functions

Pure functions are the cornerstone of functional programming:

- Always produce the same output for the same input
- Have no side effects
- Easier to test and reason about

```typescript
// Pure function example
const add = (a: number, b: number): number => a + b
```

### Immutability

Preserving data integrity by avoiding direct mutations:

```typescript
// Immutable array manipulation
const numbers = [1, 2, 3]
const doubled = numbers.map(x => x * 2) // Creates a new array
```

## Advanced Functional Techniques with fp-ts

### Monads and Functional Error Handling

#### Option Type

Safely handle potentially undefined values:

```typescript
import { Option, some, none } from 'fp-ts/Option'

const divide = (a: number, b: number): Option<number> => 
  b === 0 ? none : some(a / b)
```

#### Either Type for Error Handling

Explicit error management:

```typescript
import { Either, left, right } from 'fp-ts/Either'

const safeDivide = (a: number, b: number): Either<string, number> => 
  b === 0 ? left('Division by zero') : right(a / b)
```

### Function Composition

```typescript
import { pipe } from 'fp-ts/function'

const addOne = (x: number) => x + 1
const double = (x: number) => x * 2

const addOneThenDouble = pipe(
  addOne,
  double
)

console.log(addOneThenDouble(3)) // 8
```

## Practical Benefits

1. **Predictability**: Reduced side effects
2. **Testability**: Easier unit testing
3. **Modularity**: Composable, reusable code
4. **Concurrency**: Easier to parallelize pure functions

## Challenges and Considerations

- Performance overhead of immutability
- Learning curve for developers used to imperative programming
- Not all problems are best solved functionally

## Tools and Libraries

- `fp-ts`: Functional programming in TypeScript
- `ramda`: Functional utility library
- `lodash/fp`: Functional programming variant of Lodash

## Best Practices

- Prefer `const` over `let`
- Use immutable data structures
- Leverage higher-order functions
- Minimize side effects
- Use pattern matching and algebraic data types

## Learning Path

1. Understand pure functions
2. Master array methods like `map`, `filter`, `reduce`
3. Learn about immutability
4. Explore monads and functional error handling
5. Practice function composition

## Related Concepts

- Declarative programming
- Immutable data structures
- Higher-order functions
- Algebraic data types
