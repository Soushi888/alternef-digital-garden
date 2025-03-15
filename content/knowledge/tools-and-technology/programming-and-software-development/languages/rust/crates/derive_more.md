---
title: Derive More
description: A library designed to reduce boilerplate code by allowing developers to derive common traits for their custom structs and enums.
tags:
  - rust
  - crate
---

[derive_more 2.0.1 - Docs.rs](https://docs.rs/crate/derive_more/latest)

The `derive_more` crate in [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]] is a library designed to reduce boilerplate code by allowing developers to derive common traits for their custom structs and enums. This is particularly useful when wrapping basic types like `i32`, `u32`, etc., inside your own
structs or enums, as you would otherwise lose the implementations of these traits. The crate supports a wide range of built-in traits such as `Add`, `Not`, `From`, and `Display`, which are commonly implemented for Rust's basic types. By using `derive_more`, you can easily derive these traits for your custom types, making your code more concise and readable.

To use `derive_more`, you need to add it as a dependency in your `Cargo.toml` file. The library requires Rust 1.36 or higher and supports `no_std` environments out of the box. You can enable specific features to reduce compilation times, such as `from`, `add`, and `iterator`, or use the `full` feature to support all possible derives. If you're working in a `no_std` environment, you should disable the default features.

Here's an example of how to add `derive_more` to your `Cargo.toml` and use it in your code:

```toml
[dependencies]
derive_more = "0.99.0"
default-features = false
features = ["from", "add", "iterator"]
```

And in your Rust code:

```rust
extern crate derive_more;
use derive_more::{Add, Display, From};

#[derive(PartialEq, From, Add)]
struct MyInt(i32);

#[derive(PartialEq, From, Into)]
struct Point2D {
    x: i32,
    y: i32,
}

#[derive(PartialEq, From, Add, Display)]
enum MyEnum {
    #[display(fmt = "int: {}", _0)]
    Int(i32),
    Uint(u32),
    #[display(fmt = "nothing")]
    Nothing,
}
```

This example demonstrates deriving `Add`, `From`, and `Display` traits for a struct and an enum, showcasing how `derive_more` can simplify the implementation of common traits for custom types.
