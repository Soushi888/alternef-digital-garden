---
title: "Intermediate Representation (IR)"
date: 2026-05-08
description: "A data structure or code used internally by a compiler or virtual machine to represent source programs, bridging the front-end and back-end of a compilation pipeline."
tags: ["programming", "software-development", "language-design", "data-structures"]
draft: false
---

An **Intermediate Representation (IR)** is a data structure or code form used internally by a compiler or virtual machine to represent a source program. It sits between the source language and the target machine code, serving as the central artifact of the compilation pipeline. [[domain-specific-languages|Domain-Specific Languages]] that compile to a target platform rely on an IR to bridge the gap between parsing and code generation.

## Goals

A well-designed IR must satisfy three properties:

- **Precision**: it must faithfully represent the source program without losing information.
- **Independence**: it must be decoupled from both the source language and the target architecture.
- **Optimization-friendliness**: it must expose program structure in a form that allows transformations such as constant folding, dead-code elimination, and data-flow analysis.

Decoupling the front-end (source language parsing) from the back-end (machine code generation) through an IR is what makes compilers modular and portable. A single back-end can serve multiple source languages, and a single front-end can target multiple architectures.

## Forms of IR

IRs are classified by their level of abstraction.

### Hierarchical (High-Level)

Hierarchical IRs stay close to the structure of the source code and are typically tree-shaped. The canonical example is the [[abstract-syntax-trees|Abstract Syntax Trees (ASTs)]] produced during the parsing phase. ASTs preserve program structure and are well-suited to semantic analysis, type checking, and early-stage transformations.

### Flat (Mid and Low-Level)

Flat IRs resemble an abstract assembly language where each instruction performs a single operation.

- **Three-address code (TAC)**: each instruction has at most three operands. This is one of the most common flat IR forms.

  ```
  t1 = 4 * y
  t2 = x < t1
  if t2 goto L1
  ```

- **Stack-based (RPN)**: operations push and pop from a stack rather than naming temporaries. This is the model used by [[webassembly|WebAssembly]] and Java bytecode, both of which are low-level IRs designed for portable virtual machines.

### Graphical

Graphical IRs represent the program as a directed graph, enabling more powerful analyses.

- **Control Flow Graph (CFG)**: nodes are basic blocks; edges represent possible execution paths.
- **Data Flow Graph (DFG)**: edges represent data dependencies between operations.
- **Regionalized Value State Dependence Graph (RVSDG)**: a data-centric IR suited to modern optimizing compilers, making parallelism and side-effect ordering explicit.

## Concrete Examples

| IR                                     | Context                                                                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **LLVM IR**                            | Used by Clang, Rust, Swift, and others. Exists as human-readable text and binary bitcode.                                  |
| **GIMPLE / GENERIC**                   | Two IRs used internally by GCC at different compilation stages.                                                            |
| **Java bytecode**                      | Executed by the JVM; a portable, stack-based low-level IR.                                                                 |
| **Common Intermediate Language (CIL)** | Used by the .NET runtime (CLR).                                                                                            |
| **C as IR**                            | Languages like Nim and Vala compile to C, using C itself as a portable IR before final compilation.                        |
| **MLIR**                               | Multi-Level Intermediate Representation from the LLVM project; supports multiple abstraction levels in the same framework. |

## Advantages

- **Portability**: the same back-end optimizations apply across all source languages that share an IR.
- **Reusability**: analyses and transformations (profiling, static analysis, debugging) are written once against the IR.
- **Modularity**: front-ends and back-ends can evolve independently as long as they agree on the IR contract.

## Related Topics

- [[abstract-syntax-trees|Abstract Syntax Trees (ASTs)]] — hierarchical IR form produced by the parsing phase
- [[domain-specific-languages|Domain-Specific Languages]] — external DSLs commonly use an IR as part of their compilation pipeline
- [[webassembly|WebAssembly]] — a binary instruction format that functions as a portable IR for the web
