---
type: library
language: rust
---
#programmation/rust/crates 
#programmation/backend 

```embed
title: "axum - Rust"
image: "https://docs.rs/-/rustdoc.static/wheel-7b819b6101059cd0.svg"
description: "axum is a web application framework that focuses on ergonomics and modularity."
url: "https://docs.rs/axum/latest/"
```

Axium is a web application framework for [[Rust]] that emphasizes ergonomics and modularity. It is designed to make building web applications in Rust more straightforward and efficient. Axium is backed by the Tokio team and is known for its compatibility with the Tower ecosystem, which provides a robust library of reusable, modular components for building network applications.

Key features of Axium include:

- **Macro-free API for Routing**: Axium allows developers to route requests to handlers without the need for macros, making the code more readable and maintainable.
- **Declarative Request Parsing**: It supports declarative parsing of requests using extractors, which simplifies handling incoming data.
- **Simple Error Handling**: Axium offers a straightforward and predictable model for error handling, making it easier to manage and debug errors in web applications.
- **Minimal Boilerplate for Responses**: Generating responses in Axium requires minimal boilerplate, allowing developers to focus on the application logic rather than the boilerplate code.
- **Integration with Tower and Tower-HTTP**: Axium leverages the Tower and Tower-HTTP ecosystems, which means it benefits from a wide range of middleware, services, and utilities. This includes features like timeouts, tracing, compression, and authorization, among others. Axium's use of `tower::Service` for middleware means that applications written with Axium can share middleware with those written using Hyper or Tonic, enhancing interoperability and reusability.

Axium is gaining popularity in the Rust web ecosystem, often being compared favorably to other frameworks like Actix Web. It is praised for its simplicity, hyper-compatibility with Tower, and strong backing from the Tokio team. The framework is suitable for building REST APIs and web services in Rust, offering a modern and efficient approach to web development.

To get started with Axium, developers can follow tutorials and guides available online, which cover topics such as routing, adding a database, using app state, working with extractors, implementing middleware, serving static files, and deploying Axium applications. The framework's compatibility with various templating crates like Askama, Tera, and Maud also facilitates the development of dynamic web applications with HTML templating.