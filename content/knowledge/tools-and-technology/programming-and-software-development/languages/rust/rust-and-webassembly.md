---
title: "Rust and WebAssembly"
aliases:
  - rustwasm
  - rust-wasm
tags:
  - programming
  - rust
  - webassembly
  - web-development
  - performance
created: 2026-02-03
modified: 2026-02-03
draft: false
---

# Rust and WebAssembly

[[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]] is one of the best-supported languages for [[webassembly|WebAssembly]] development, thanks to its lack of a garbage collector, small runtime, and predictable performance characteristics. The Rust and WebAssembly working group maintains tooling and documentation to make this integration seamless.

## Why Rust for WebAssembly?

- **No garbage collector**: Produces small, efficient Wasm binaries without runtime overhead
- **Memory safety**: Rust's ownership model prevents bugs that are hard to debug in Wasm
- **Small binary size**: Rust can produce minimal Wasm modules with `#[no_std]` and careful dependency management
- **Mature toolchain**: First-class `wasm32-unknown-unknown` compilation target via `rustup`
- **Strong ecosystem**: Libraries like `wasm-bindgen`, `web-sys`, and `js-sys` provide ergonomic JavaScript interop

## Key Tools

- [[wasm-pack|wasm-pack]] - One-stop shop for building, testing, and publishing Rust-generated Wasm packages
- **wasm-bindgen** - Facilitates high-level interactions between Rust and JavaScript
- **web-sys** - Bindings to Web APIs (DOM, Canvas, Fetch, etc.)
- **js-sys** - Bindings to JavaScript built-in objects and functions
- **wee_alloc** - A tiny allocator for size-conscious Wasm modules

## Typical Workflow

1. Create a new Rust library with `cargo new --lib`
2. Set `crate-type = ["cdylib"]` in `Cargo.toml`
3. Add `wasm-bindgen` as a dependency
4. Write Rust functions annotated with `#[wasm_bindgen]`
5. Build with `wasm-pack build`
6. Import the generated package in JavaScript/TypeScript

## Example

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```

## Use Cases

- **Performance-critical web features**: Image processing, video encoding, physics simulations
- **Porting existing Rust libraries** to the web
- **Shared logic** between server (native Rust) and client (Wasm)
- **Edge computing** with Wasm runtimes (Cloudflare Workers, Fastly Compute)

## Related Concepts

- [[webassembly|WebAssembly]] - The compilation target
- [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]] - The source language
- [[wasm-pack|wasm-pack]] - Build tooling
- [[javascript|JavaScript]] - Host environment for Wasm on the web

## Resources

- [Rust and WebAssembly Book](https://rustwasm.github.io/docs/book/)
- [Rust and WebAssembly Working Group](https://rustwasm.github.io)
- [wasm-bindgen Guide](https://rustwasm.github.io/docs/wasm-bindgen/)
- [wasm-pack Documentation](https://rustwasm.github.io/docs/wasm-pack/)
