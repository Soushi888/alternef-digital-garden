---
type: library
language: rust
---

Subset of the [[index|HDK]]

Technology : [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index]], [[../../index|Holochain]]

[hdk - Rust](https://docs.rs/hdk/latest/hdk/)
> The Holochain Development Kit (HDK) provides high and low level functions for writing Holochain applications.

[Holochain Deterministic Integrity (HDI)](https://docs.rs/hdi/latest/hdi/) is Holochain's data model and integrity toolset for writing zomes.

The logic of a Holochain DNA can be divided into two parts: integrity and coordination. Integrity is the part of the hApp that defines the data types and validates data manipulations. Coordination encompasses the domain logic and implements the functions that manipulate data.

## Examples

An example of an integrity zome with data definition and data validation can be found in the wasm workspace of the Holochain repository: [https://github.com/holochain/holochain/blob/develop/crates/test_utils/wasm/wasm_workspace/integrity_zome/src/lib.rs](https://github.com/holochain/holochain/blob/develop/crates/test_utils/wasm/wasm_workspace/integrity_zome/src/lib.rs).

## Data definition

The DNA’s data model is defined in integrity zomes. They comprise all data type definitions as well as relationships between those types. Integrity zomes are purely definitions and do not contain functions to manipulate the data. Therefore a hApp’s data model is encapsulated and completely independent of the domain logic, which is encoded in coordinator zomes.

The MVC (model, view, controller) design pattern can be used as an analogy. **The application’s integrity zomes comprise its model layer** — everything that defines the shape of the data. In practice, this means three things:

- entry type definitions
- link type definitions
- a validation callback that constrains the kinds of data that can validly be called entries and links of those types (see also [`Op`](https://docs.rs/hdi/0.2.1/hdi/prelude/enum.Op.html)).

**The coordination zomes comprise the application’s controller layer** — the code that actually writes and retrieves data, handles countersigning sessions and sends and receives messages between peers or between a cell and its UI. In other words, all the zome functions, `init` functions, remote signal receivers, and scheduler callbacks will all live in coordinator zomes.

Advantages of this approach are:

- The DNA hash is constant as long as the integrity zomes remain the same. The peer network of a DNA is tied to its hash. Changes to the DNA hash result in a new peer network. Changes to the domain logic enclosed in coordinator zomes, however, do not affect the DNA hash. Hence the DNAs and therefore hApps can be modified without creating a new peer network on every deployment.
- Integrity zomes can be shared among DNAs. Any coordinator zome can import an integrity zome’s data types and implement functions for data manipulation. This composability of integrity and coordinator zomes allows for a multitude of permutations with shared integrity zomes, i. e. a shared data model.

## Data validation

The second fundamental part of integrity zomes is data validation. For every [operation](https://docs.rs/hdi/0.2.1/hdi/prelude/enum.Op.html) that is produced by an [action](https://docs.rs/hdi/0.2.1/hdi/prelude/enum.Action.html), a validation rule can be specified. Both data types and data values can be validated.

All of these validation rules are declared in the `validate` callback. It is executed for a new action by each validation authority.

There’s a helper type called [`OpType`](https://docs.rs/hdi/0.2.1/hdi/prelude/enum.OpType.html) available for easy access to all link and entry variants when validating an operation. In many cases, this type can be easier to work with than the bare [`Op`](https://docs.rs/hdi/0.2.1/hdi/prelude/enum.Op.html), which contains the same information as `OpType`, but the former has a flatter data structure, whereas the latter has a deeply nested structure.

```rust
match op.to_type()? {
    OpType::StoreEntry(OpEntry::CreateEntry { app_entry, .. }) => match app_entry {
        EntryTypes::A(_) => Ok(ValidateCallbackResult::Valid),
        EntryTypes::B(_) => Ok(ValidateCallbackResult::Invalid(
            "No Bs allowed in this app".to_string(),
        )),
    },
    OpType::RegisterCreateLink {
        base_address: _,
        target_address: _,
        tag: _,
        link_type,
    } => match link_type {
        LinkTypes::A => Ok(ValidateCallbackResult::Valid),
        LinkTypes::B => Ok(ValidateCallbackResult::Invalid(
            "No Bs allowed in this app".to_string(),
        )),
    },
    _ => Ok(ValidateCallbackResult::Valid),
};
```

See an example of the `validate` callback in an integrity zome in the WASM workspace: [https://github.com/holochain/holochain/blob/develop/crates/test_utils/wasm/wasm_workspace/validate/src/integrity.rs](https://github.com/holochain/holochain/blob/develop/crates/test_utils/wasm/wasm_workspace/validate/src/integrity.rs). Many more validation examples can be browsed in that very workspace.
