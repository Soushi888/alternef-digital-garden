---
aliases:
  - iced.rs
tags:
  - rust
  - crate
---

Iced is a cross-platform GUI library for [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]], inspired by Elm. It focuses on simplicity and type-safety, leveraging Rust's features such as ownership, borrowing, lifetimes, futures, streams, and more.

## Key Features

1. **Elm Architecture-inspired**: Iced follows the Elm Architecture, which separates user interfaces into four concepts: `State`, `Message`, `View`, and `Update`.
2. **Type-safe**: Iced uses Rust's type system to ensure safety and prevent common errors.
3. **Simple and lightweight**: Iced aims to be easy to learn and use, with a minimalistic API.
4. **Experimental**: Iced is still an experimental library, and its documentation may not be comprehensive or user-friendly.

## Using Iced

To get started with Iced, you'll need to:

1. Define your application's state and possible user interactions (messages).
2. Create a `View` function to render your UI, using Iced's widget library.
3. Implement an `Update` function to handle messages and update your state.

## Example

Here's a simple example of a counter widget using Iced:

```rust
use iced::{button, column, text, Column};

struct Counter {
    value: i32,
    increment_button: button::State,
    decrement_button: button::State,
}

impl Counter {
    pub fn view(&self) -> Column {
        column![
            button("+").on_press(Message::Increment),
            text(self.value).size(50),
            button("-").on_press(Message::Decrement),
        ]
    }
}
```

## Additional Resources

* GitHub repository: <https://github.com/iced-rs/iced>
* API documentation: <https://docs.rs/iced>

[iced - A cross-platform GUI library for Rust](https://iced.rs/)
> A cross-platform GUI library for Rust focused on simplicity and type-safety.
