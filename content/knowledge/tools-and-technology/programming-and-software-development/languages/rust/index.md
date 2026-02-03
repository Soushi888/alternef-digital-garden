---
title: "Rust"
aliases:
  - Rust Lang
  - .rs
  - Rustlang
tags:
  - programming
  - systems-programming
  - memory-safety
  - concurrency
  - performance
  - low-level
created: 2026-02-03
modified: 2026-02-03
draft: false
---

# Rust

Rust is a **general-purpose, statically-typed, multi-paradigm programming language** that emphasizes **performance, memory safety, concurrency, and reliability**. It was created by **Graydon Hoare** in 2006 as a personal project while working at Mozilla and officially sponsored by Mozilla in 2009. The first stable version, **Rust 1.0**, was released on **May 15, 2015**.

Rust is designed to be a **safe alternative to [[c++|C++]] and [[c|C]]**, particularly for systems programming, where memory safety and performance are critical. It achieves this without using a garbage collector, instead relying on a unique **ownership and borrowing system** enforced at compile time by the **borrow checker**.

As of early 2026, Rust continues to gain adoption across industries and has been recognized for its role in improving software security. Notably, the **U.S. White House Office of the National Cyber Director** recommended in February 2024 that developers move away from memory-unsafe languages like C/C++ toward safer alternatives such as Rust.

## Key Features

### Memory Safety Without Garbage Collection

Rust prevents memory-related bugs (e.g., null pointer dereferencing, buffer overflows, use-after-free) at compile time using its **ownership model**:
- Each value has a single owner.
- Values are automatically dropped when the owner goes out of scope.
- References must adhere to strict borrowing rules enforced by the borrow checker.

### Zero-Cost Abstractions

High-level constructs (like iterators or smart pointers) compile down to efficient machine code, offering performance comparable to hand-written low-level code.

### Concurrency Without Data Races

Rust's type system ensures thread safety. The compiler prevents data races by enforcing that data accessed across threads is either immutable or properly synchronized.

### Rich Type System and Pattern Matching

Supports algebraic data types (enums), pattern matching, and type inference, enabling expressive and safe code.

### Excellent Tooling

- Built-in package manager (`cargo`)
- Code formatter (`rustfmt`)
- Linter (`clippy`)
- Integrated testing framework
- Excellent error messages with suggestions

## Use Cases

Rust is used in a wide range of domains:

- **Systems Programming**: Operating systems, file systems, device drivers.
- **Web Services**: High-performance backends (e.g., Dropbox, Cloudflare).
- **Browser Engines**: Mozilla's **Servo** and components in **Firefox**.
- **[[webassembly|WebAssembly]]**: Compiling Rust to Wasm for web and edge computing. See [[rust-and-webassembly|Rust and WebAssembly]] and [[wasm-pack|wasm-pack]].
- **Embedded Systems**: Microcontrollers and bare-metal programming.
- **Blockchain Development**: Solana, Polkadot, and other blockchain platforms.
- **Game Development**: Emerging use in game engines due to performance and safety.

Notable companies using Rust include **Microsoft, Google, Amazon Web Services, Meta (Facebook), Discord, Figma**, and **Apple**.

## Example Code

A simple "Hello, World!" program in Rust:

```rust
fn main() {
    println!("Hello, World!");
}
```

Variable declaration with mutability and type inference:

```rust
fn main() {
    let mut x = 5; // mutable variable
    x = 6;
    println!("The value of x is {x}");
}
```

## Community and Ecosystem

- Hosted on [crates.io](https://crates.io), Rust's package registry contains over **250,000 reusable libraries (crates)**.
- Governed by the **Rust Foundation**, established in 2021 with founding members including AWS, Google, Microsoft, Huawei, and Mozilla.
- Known for its **friendly and inclusive community**, extensive documentation (e.g., "The Rust Book"), and high developer satisfaction — consistently ranked as the **most loved programming language** in Stack Overflow surveys.

## Challenges

- **Steep learning curve**, especially around ownership and lifetimes.
- **Verbose error messages**, though highly informative.
- **Long compile times** compared to some other languages.

Despite these, Rust's long-term benefits in safety, performance, and maintainability make it a compelling choice for modern software development.

## Rust Ecosystem in This Garden

### Frameworks

- [[axium|Axum]] - Web framework built on Tokio
- [[loco|Loco]] - Rails-like web framework for Rust
- [[slint-ui|Slint UI]] - Native GUI toolkit

### WebAssembly

- [[rust-and-webassembly|Rust and WebAssembly]] - Using Rust with Wasm
- [[wasm-pack|wasm-pack]] - Tooling for Rust-generated Wasm

### Crates

- [[juniper|Juniper]] - GraphQL server library
- [[derive_more|derive_more]] - Derive macro utilities
- [[iced|Iced]] - Cross-platform GUI library

### Patterns

- [[extension-traits|Extension Traits]] - Extending types with additional methods

## Related Concepts

- [[c++|C++]] - Traditional systems programming language Rust aims to improve upon
- [[c|C]] - Low-level language with manual memory management
- [[webassembly|WebAssembly]] - Compilation target for Rust
- [[erlang|Erlang]] - Another language emphasizing concurrency and reliability

## Resources

- [The Rust Programming Language Book](https://doc.rust-lang.org/book/)
- [crates.io - Rust Package Registry](https://crates.io)
- [Rust Foundation](https://foundation.rust-lang.org/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings - Learning Exercises](https://github.com/rust-lang/rustlings)
