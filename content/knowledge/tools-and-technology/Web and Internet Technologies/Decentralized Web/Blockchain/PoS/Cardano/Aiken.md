#blockchains/smart-contracts 
[[Unspent Transaction Output|UTXO]]

Aiken is a new programming language and toolkit for developing smart contracts on the [[Cardano]] blockchain[1][2][3]. It is designed to be a pure [[Functional programming|functional programming]] language that is small and easy to learn, with strong static typing and inference[1]. Aiken takes inspiration from modern languages such as Rust, Elm, and Gleam, which are known for friendly error messages and an overall excellent developer experience[2][3]. The language is exclusively used for creating the on-chain validator-scripts, and it is not recommended for use in production yet[2]. 

Some key features of Aiken include:
- First-class functions, everything is an expression
- Custom types, recursion, modules, generics
- Familiar C-family syntax while still being a purely functional language
- A package manager that encourages the development of open-source libraries with clean and easy-to-host generated documentation[3]
- A toolkit for working with [[Plutus]]
- Written in [[Rust]], licensed under _Apache-2.0_

Aiken is still a work in progress, and developers can install it from source or [[Nix]] Flakes[2]. The Aiken git repository provides a comprehensive guide for getting started with Aiken[2]. The language comes with a variety of command-line tools to help developers be productive right away[5]. The Aiken team aims to reduce the time it takes for developers to get started and finish their projects, turning what is currently a multi-day setup experience into a 10-minute quickstart without compromising any of the security and quality aspects[3]. 

In summary, Aiken is a new programming language and toolkit for developing [[Smart Contracts]] on the Cardano blockchain. It is a pure functional programming language that is small and easy to learn, with strong static typing and inference. Aiken takes inspiration from modern languages such as Rust, Elm, and Gleam, and it is exclusively used for creating the on-chain validator-scripts. The language is still a work in progress and is not recommended for use in production yet.

Citations:
[1] https://aiken-lang.org
[2] https://developers.cardano.org/docs/smart-contracts/aiken/
[3] https://cardanofoundation.org/en/news/aiken-the-future-of-smart-contracts/
[4] https://adapulse.io/aiken-cardano-smart-contract-language-and-toolchain/
[5] https://github.com/aiken-lang
[6] https://www.cardanocube.io/projects/aiken
