---
type: library
language: rust
---
#programmation/rust/crates

```embed
title: "GitHub - graphql-rust/juniper: GraphQL server library for Rust"
image: "https://opengraph.githubassets.com/276c731aa75c6ae1ea2d11ce5cd694623a7640db266b44899f372d2c664059c0/graphql-rust/juniper"
description: "GraphQL server library for Rust. Contribute to graphql-rust/juniper development by creating an account on GitHub."
url: "https://github.com/graphql-rust/juniper"
```

The Juniper library in [[Rust]] is a powerful tool for building [[GraphQL]] servers. GraphQL is a query language developed by Facebook, designed to serve mobile and web application frontends efficiently. Juniper allows developers to write GraphQL servers in Rust that are both type-safe and highly performant. It aims to make declaring and resolving GraphQL schemas as convenient as possible within the Rust ecosystem.

Juniper does not come with a built-in web server; instead, it provides the necessary building blocks to integrate GraphQL with existing Rust web servers. It offers pre-built integrations for popular Rust web frameworks such as Actix, Hyper, Rocket, and Warp, including embedded GraphiQL and GraphQL Playground for easy debugging. This flexibility allows developers to choose the web framework that best fits their project's needs.

The library supports the full GraphQL query language, including interfaces, unions, schema introspection, and validations. It can also output the schema in the GraphQL Schema Language. Juniper is designed to be agnostic to serialization format and network transport, making it versatile for various use cases. It supports both asynchronous and synchronous execution, with asynchronous execution being runtime agnostic.

Juniper follows a code-first approach to defining GraphQL schemas, which means you define your schema directly in Rust code. This approach contrasts with schema-first approaches, where the schema is defined in a separate schema file and code is generated from it. For those preferring a schema-first approach, Juniper offers `juniper-from-schema` for generating code from a schema file.

To get started with Juniper, you would add it as a dependency in your `Cargo.toml` file:

```toml
[dependencies]
juniper = "0.16.1"
```

And then you can use Juniper to define your GraphQL schema and execute queries. Here's a simple example of defining a GraphQL schema and executing a query:

```rust
#[macro_use] extern crate juniper;
use juniper::{
    graphql_object, graphql_value, EmptyMutation, EmptySubscription, 
    GraphQLEnum, Variables, 
};

#[derive(GraphQLEnum, Clone, Copy)]
enum Episode {
    NewHope,
    Empire,
    Jedi,
}

struct Ctx(Episode);

impl juniper::Context for Ctx {}

struct Query;

#[graphql_object]
#[graphql(context = Ctx)]
impl Query {
    fn favorite_episode(context: &Ctx) -> Episode {
        context.0
    }
}

type Schema = juniper::RootNode<'static, Query, EmptyMutation<Ctx>, EmptySubscription<Ctx>>;

fn main() {
    let ctx = Ctx(Episode::NewHope);
    let (res, _errors) = juniper::execute_sync(
        "query { favoriteEpisode }",
        None,
        &Schema::new(Query, EmptyMutation::new(), EmptySubscription::new()),
        &Variables::new(),
        &ctx,
    ).unwrap();

    assert_eq!(
        res,
        graphql_value!({
            "favoriteEpisode": "NEW_HOPE",
        }),
    );
}
```

This example demonstrates how to define a simple GraphQL schema with Juniper, including an enum and a query, and then execute a query against this schema.