---
title: "WebAssembly"
aliases:
  - WASM
  - .wasm
  - Wasm
tags:
  - programming
  - web-development
  - performance
  - compilation-target
  - portability
created: 2026-02-03
modified: 2026-02-03
draft: false
---

# WebAssembly

WebAssembly (Wasm) is a **binary instruction format for a stack-based virtual machine**, designed as a portable compilation target for programming languages. It enables deployment of applications on the web for both clients and servers. Developed as an **open standard by the W3C** with participation from all major browsers, WebAssembly aims to execute code at **near-native speed** while being secure, portable, and interoperable with JavaScript.

## Key Features

### Near-Native Performance
- Binary format executes significantly faster than JavaScript for compute-intensive tasks
- Compiled ahead of time, avoiding JIT compilation overhead for critical paths
- Designed for predictable, consistent performance

### Language Agnostic
WebAssembly can be targeted by multiple languages:
- [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]] (via [[rust-and-webassembly|Rust and WebAssembly]])
- [[c++|C++]]
- [[c|C]]
- [[assemblyscript|AssemblyScript]] (TypeScript subset)
- Go, Python, Java, and others

### Security
- Runs in a sandboxed execution environment
- Memory-safe by design with linear memory model
- No direct access to the host system without explicit imports

### Portability
- Supported by all major browsers (Chrome, Firefox, Safari, Edge)
- Runs outside browsers via runtimes like Wasmtime, Wasmer, and WasmEdge
- Same binary runs across different platforms and architectures

### JavaScript Interoperability
- Seamless integration with JavaScript APIs
- Can call JavaScript functions and be called from JavaScript
- Shares memory with JavaScript when needed

## Use Cases

- **Gaming**: High-performance game engines running in the browser (e.g., Unity, Unreal Engine web exports)
- **Image & Video Processing**: Real-time filters, encoding/decoding, and editing
- **Scientific Simulations**: Physics engines, data visualization, computational models
- **Augmented/Virtual Reality**: WebXR applications with demanding computation
- **Cryptography**: Efficient crypto operations in web applications
- **Edge Computing**: Lightweight, portable workloads on edge servers (via WASI)
- **Plugin Systems**: Sandboxed, portable plugins for applications

## WebAssembly System Interface (WASI)

WASI extends WebAssembly beyond the browser, providing a standardized system interface for file access, networking, and other OS capabilities. It enables Wasm modules to run as portable server-side applications, making WebAssembly a compelling target for cloud and edge computing.

## Tooling Ecosystem

- [[wasm-pack|wasm-pack]] - Build and package Rust-generated Wasm
- [Emscripten](https://emscripten.org/) - C/C++ to WebAssembly compiler toolchain
- [Wasmtime](https://wasmtime.dev/) - Standalone Wasm runtime
- [Wasmer](https://wasmer.io/) - Universal Wasm runtime

## Related Concepts

- [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]] - Leading language for WebAssembly development
- [[rust-and-webassembly|Rust and WebAssembly]] - Rust's Wasm integration
- [[c++|C++]] - Traditional systems language compiling to Wasm
- [[assemblyscript|AssemblyScript]] - TypeScript-like language targeting Wasm
- [[javascript|JavaScript]] - WebAssembly's host environment on the web

## Resources

- [WebAssembly Official Site](https://webassembly.org/)
- [MDN WebAssembly Docs](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly Specification](https://webassembly.github.io/spec/)
- [WASI Documentation](https://wasi.dev/)
- [Awesome Wasm](https://github.com/mbasso/awesome-wasm)
