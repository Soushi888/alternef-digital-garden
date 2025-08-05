---
title: Aiken
description: A functional programming language for developing smart contracts on the Cardano blockchain
tags:
  - blockchain
  - programming
  - development
---

[[utxo|Unspent Transaction Output]]

Aiken is a new programming language and toolkit for developing smart contracts on the [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/pos/cardano/index|Cardano]] blockchain. It is designed to be a pure [[functional-programming|functional programming]] language that is small and easy to learn, with strong static typing and inference. Aiken takes inspiration from modern languages such as Rust, Elm, and Gleam, which are known for friendly error messages and an overall excellent developer experience. The language is exclusively used for creating the on-chain validator-scripts, and it is not recommended for use in production yet.

Some key features of Aiken include:

- First-class functions, everything is an expression
- Custom types, recursion, modules, generics
- Familiar C-family syntax while still being a purely functional language
- A package manager that encourages the development of open-source libraries with clean and easy-to-host generated documentation
- A toolkit for working with [[plutus|Plutus]]
- Written in [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]], licensed under *Apache-2.0*

Aiken is still a work in progress, and developers can install it from source or [[nix|Nix]] Flakes. The Aiken git repository provides a comprehensive guide for getting started with Aiken. The language comes with a variety of command-line tools to help developers be productive right away. The Aiken team aims to reduce the time it takes for developers to get started and finish their projects, turning what is currently a multi-day setup experience into a 10-minute quickstart without compromising any of the security and quality aspects.

In summary, Aiken is a new programming language and toolkit for developing [[smart-contracts|Smart Contracts]] on the Cardano blockchain. It is a pure functional programming language that is small and easy to learn, with strong static typing and inference. Aiken takes inspiration from modern languages such as Rust, Elm, and Gleam, and it is exclusively used for creating the on-chain validator-scripts. The language is still a work in progress and is not recommended for use in production yet.
