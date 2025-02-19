---
Aliases: [.rs]
---
#programmation

Rust is a multi-paradigm, general-purpose programming language that emphasizes performance, type safety, and concurrency. It is designed to be safe from common programming errors like null pointer dereferencing, double free, and data races, which are common in languages like C and C++. Rust achieves this safety through its ownership system and a feature called the borrow checker, which ensures that references to data do not outlive the data they refer to. This system allows Rust to guarantee memory safety without needing a garbage collector, making it particularly suitable for systems programming.

Rust was created by Graydon Hoare at Mozilla Research in 2006 and has since been officially sponsored by Mozilla. It has gained popularity among developers and companies for its performance, safety, and concurrency features. Rust's design philosophy includes zero-cost abstractions, meaning that abstractions in Rust do not impose a runtime cost, allowing developers to write high-level code without sacrificing performance. When necessary, Rust allows for the use of "unsafe" blocks, where the programmer takes responsibility for ensuring safety, offering a balance between safety and flexibility.

Rust has been adopted by major companies such as Amazon, Discord, Dropbox, Google, Meta, and Microsoft, and in December 2022, it became the first language other than C and assembly to be supported in the development of the Linux kernel. Its design for longevity and stability, with a focus on backward compatibility, makes it an attractive choice for long-term projects.

Rust supports a wide range of programming paradigms, including concurrent, functional, generic, imperative, and structured programming. It is cross-platform and has a strong community and ecosystem, with Rust Analyzer being a popular language server that provides IDEs and text editors with information about a Rust project, including autocompletion and compilation error display.

In summary, Rust is a modern systems programming language that prioritizes safety, performance, and concurrency, making it a compelling choice for developers working on system-level projects and applications where these factors are critical.
## DataBase Drivers
- [[SQLite]] - [sqlite crate](https://docs.rs/sqlite/latest/sqlite/)

## Libraries
- [[juniper]] - GraphQL server
