---
title: DNA and Zomes
date: 2026-03-03
description: How Holochain applications are structured through DNA, integrity zomes, and coordinator zomes
aliases:
  - Holochain DNA
  - Integrity Zomes
  - Coordinator Zomes
tags: ["holochain", "decentralization", "architecture"]

---

# DNA and Zomes

In Holochain, a **DNA** defines a unique application space. It is a bundle of code (zomes) that governs how data is structured, validated, and operated on. The DNA hash determines the network identity: agents sharing the same DNA hash form the same network.

## DNA: The Application Identity

A DNA is an immutable, content-addressable bundle. When you install a DNA on your device, you join a specific p2p network defined by that DNA's hash. Changing the DNA produces a different hash and therefore a different network.

Key properties:
- Hash uniquely identifies the network
- Immutable once deployed (changes create a new DNA)
- Contains one or more integrity zomes and zero or more coordinator zomes
- Optionally includes properties (configuration values)

## Integrity Zomes

**Integrity zomes** define the permanent, shared rules of the application:
- Entry type definitions (data structures)
- Link type definitions (relationship structures)
- Validation callbacks (`validate_create`, `validate_update`, `validate_delete`)

Integrity zomes are hashed into the DNA. Because validation rules must be consistent across all peers, the integrity zome cannot be upgraded without creating a new DNA (new network). Every node on the network enforces the same validation rules.

```rust
// Example integrity zome entry type
#[hdk_entry_helper]
pub struct Message {
    pub content: String,
    pub created_at: Timestamp,
}

#[hdk_extern]
pub fn validate(op: Op) -> ExternResult<ValidateCallbackResult> {
    match op.flattened::<Message, ()>()? {
        FlatOp::StoreEntry(entry_op) => {
            // validate entry content
        }
        _ => Ok(ValidateCallbackResult::Valid)
    }
}
```

## Coordinator Zomes

**Coordinator zomes** contain the application logic:
- CRUD operations (create, read, update, delete entries)
- Link management (create and delete links)
- Zome calls (callable by the UI or other zomes)
- Signal emission

Coordinator zomes can be upgraded without changing the DNA hash, because they are not included in the integrity hash. You can swap out application behavior while maintaining the same network identity and validation rules.

```rust
// Example coordinator zome function
#[hdk_extern]
pub fn create_message(input: Message) -> ExternResult<Record> {
    let action_hash = create_entry(EntryTypes::Message(input))?;
    let record = get(action_hash.clone(), GetOptions::default())?
        .ok_or(wasm_error!(WasmErrorInner::Guest("Record not found".to_string())))?;
    Ok(record)
}
```

## Why the Split Matters

The integrity/coordinator split is one of Holochain's most important design decisions:

| Property | Integrity Zome | Coordinator Zome |
|----------|---------------|-----------------|
| Hashed into DNA | Yes | No |
| Can be upgraded | No (creates new network) | Yes (same network) |
| Contains validation rules | Yes | No |
| Contains app logic | No | Yes |
| Network-forming | Yes | No |

This separation allows Holochain applications to evolve their behavior (UI logic, queries, workflows) without fragmenting the network or requiring all peers to migrate simultaneously.

## Related Concepts

- [[cell|Cell]] - Each installed DNA instance is a cell
- [[entry|Entry]] - Data types defined in integrity zomes
- [[conductor|Conductor]] - Runtime that manages DNA instances
- [[hdk|HDK]] - Rust library for writing zomes

## References

- [Holochain Developer Documentation: Application Architecture](https://developer.holochain.org/concepts/2_application_architecture/)
- [Holochain GitHub: holochain/holochain](https://github.com/holochain/holochain)
