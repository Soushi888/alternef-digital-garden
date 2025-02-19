---
type: library
language: rust
---

#programmation/SDK 

```embed
title: "hdk - Rust"
image: "https://docs.rs/-/rustdoc.static/rust-logo-151179464ae7ed46.svg"
description: "The Holochain Development Kit (HDK) provides high and low level functions for writing Holochain applications."
url: "https://docs.rs/hdk/latest/hdk/"
```

Is executed by the [[Host]].

The [[Rust]] HDK crate is the Holochain Development Kit, which provides high and low-level functions for writing [[Outils et Technologie/DWeb/Holochain/Holochain]] applications. Holochain is a distributed computing platform that allows developers to build decentralized applications (dApps) that are secure, scalable, and resilient.

The HDK crate provides a set of tools and libraries that make it easier to develop Holochain [[Zome]], which are the building blocks of Holochain applications. Zomes are self-contained modules that can be combined to create complex applications. The HDK crate provides a domain-specific language (DSL) that is ergonomic and composable, making it easy to write zome functions and handle data.

The HDK crate includes several modules, including:

- `prelude`: A module that re-exports commonly used types and functions.
- `entry`: A module that provides functions for working with Holochain entries.
- `link`: A module that provides functions for working with Holochain links.
- `time`: A module that provides functions for working with timestamps.
- `debug`: A module that provides functions for debugging Holochain applications.