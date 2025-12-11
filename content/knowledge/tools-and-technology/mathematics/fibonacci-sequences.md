---
title: "Fibonacci Sequences"
aliases: ["Fibonacci Numbers", "Fibonacci Sequence", "Leonardo of Pisa"]
tags: [mathematics, number-theory, sequences, patterns, nature]
created: 2024-12-11
modified: 2024-12-11
draft: false
---

# Fibonacci Sequences

The **Fibonacci sequence** is one of the most famous sequences in mathematics, named after Leonardo of Pisa, known as Fibonacci. This simple recursive sequence generates numbers that appear throughout nature and has deep connections to the [[knowledge/tools-and-technology/mathematics/golden-ratio|golden ratio]].

## Definition

The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones:

**F₀ = 0, F₁ = 1**
**Fₙ = Fₙ₋₁ + Fₙ₋₂** for n ≥ 2

### The Sequence
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, ...

## Historical Background

- **1202**: Fibonacci introduces the sequence in "Liber Abaci" through a rabbit breeding problem
- The problem: "How many pairs of rabbits can be produced from a single pair in a year?"
- The sequence was known to Indian mathematicians centuries before Fibonacci

## Mathematical Properties

### Golden Ratio Connection

- **Binet's Formula**: Fₙ = (φⁿ - (1-φ)ⁿ) / √5, where φ is the [[knowledge/tools-and-technology/mathematics/golden-ratio|golden ratio]]
- **Convergence**: The ratio Fₙ₊₁/Fₙ converges to φ as n → ∞
- **Continued Fractions**: Fibonacci numbers relate to convergents of φ's continued fraction

### Recurrence Relations

- **Generalized Fibonacci**: Any sequence where each term is the sum of previous k terms
- **Lucas Numbers**: Same recurrence as Fibonacci but starts with 2, 1
- **Tribonacci**: Sum of previous three terms instead of two

### Divisibility Properties

- Every 3rd Fibonacci number is even
- Every 4th Fibonacci number is divisible by 3
- Every 5th Fibonacci number ends in 5
- GCD(Fₘ, Fₙ) = F_GCD(m,n)

## Occurrences in Nature

### Botany
- **Phyllotaxis**: Arrangement of leaves often follows Fibonacci numbers
- **Flower petals**: Many flowers have 3, 5, 8, 13, or 21 petals
- **Seed heads**: Sunflowers display spiral patterns in consecutive Fibonacci numbers
- **Pine cones**: Scale spirals typically appear in 8 and 13, or 13 and 21

### Biology
- **Branching patterns**: Tree branches often follow Fibonacci patterns
- **Reproduction**: Some organisms reproduce in Fibonacci-like sequences
- **DNA structure**: Contains Fibonacci numbers in its dimensions

### Animal Kingdom
- **Honeybee family tree**: Number of ancestors follows Fibonacci sequence
- **Shell growth**: Some mollusks grow in spiral patterns following Fibonacci ratios

## Applications

### Computer Science
- **Algorithm analysis**: Fibonacci search technique
- **Data structures**: Fibonacci heaps for priority queues
- **Cryptography**: Fibonacci-based cryptographic systems
- **Random number generation**: Fibonacci generators

### Finance
- **Technical analysis**: Fibonacci retracements in stock charts
- **Trading systems**: Extensions and projections based on Fibonacci ratios
- **Economic modeling**: Population and resource growth models

### Art and Design
- **Composition**: Using Fibonacci numbers for visual balance
- **Architecture**: Dimensional relationships in building design
- **Music**: Rhythmic patterns and compositional structures

## Variations and Generalizations

### Negative Indices
- F₋ₙ = (-1)ⁿ⁺¹ Fₙ
- Extends the sequence to negative integers

### Fibonacci-like Sequences
- **Tribonacci**: Tₙ = Tₙ₋₁ + Tₙ₋₂ + Tₙ₋₃
- **Tetranacci**: Sum of previous four terms
- **Generalized Fibonacci**: Fₙ = a·Fₙ₋₁ + b·Fₙ₋₂

### Fibonacci Polynomials
- Variable-based generalization: Fₙ(x)
- Important in combinatorics and graph theory

## Mathematical Connections

- **Pascal's Triangle**: Fibonacci numbers appear as diagonal sums
- **Matrix representation**: [[1,1],[1,0]]ⁿ = [[Fₙ₊₁,Fₙ],[Fₙ,Fₙ₋₁]]
- **Generating function**: G(x) = x/(1 - x - x²)
- **Binomial coefficients**: Fₙ = Σ(n-k choose k) for k = 0 to ⌊n/2⌋

## Related Concepts

- [[knowledge/tools-and-technology/mathematics/golden-ratio|Golden Ratio]]: Limit of consecutive ratios
- [[knowledge/tools-and-technology/mathematics/pascals-triangle|Pascal's Triangle]]: Contains Fibonacci patterns
- [[knowledge/tools-and-technology/mathematics/fractals|Fractals]]: Self-similar structures using Fibonacci ratios
- Lucas sequences: Related recursive sequences
- Zeckendorf's theorem: Every integer can be uniquely represented as sum of non-consecutive Fibonacci numbers

## Modern Research

- **Fibonacci coding**: Data compression using Fibonacci numbers
- **Quantum mechanics**: Fibonacci potentials in quantum systems
- **Biology**: Genetic patterns and developmental biology
- **Network theory**: Fibonacci networks in complex systems

## References

- "Fibonacci's Liber Abaci" (1202) - Original introduction of the sequence
- "The Fabulous Fibonacci Numbers" by Alfred Posamentier and Ingmar Lehmann
- "Fibonacci and Lucas Numbers with Applications" by Thomas Koshy

---

*The Fibonacci sequence demonstrates how simple mathematical rules can generate patterns that resonate throughout nature, mathematics, and human endeavors, connecting abstract number theory to the concrete world around us.*