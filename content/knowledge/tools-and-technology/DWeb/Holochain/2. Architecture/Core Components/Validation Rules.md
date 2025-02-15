---
Aliases: [Validation Rules, validation rule, validation rules]
---
#holochain/concepts 
[[Outils et Technologie/DWeb/Holochain/Holochain]]

## Validation workflow
-   Validation needs to be deterministic: same result no matter who runs it and when.
-   After an action is committed, it is transformed into different DHT Operations (DHT Ops)
-   Then, those DHT Ops are published to the different neighborhoods in the DHT
-   When those nodes receive that publish, they add it to their validation queue
    -   If the validation fails, those nodes produce warrants that get gossiped throughout the network
        -   All other nodes can verify that the bad agent is behaving badly
        -   They then disconnect from the bad agent
    -   If the validation succeeds, the node starts to serve that record to DHT queries (get, get_links, etc.)

## Validation callback function context
-   The function `validate` is called in two contexts
    1.  The author validates
    2.  All prospective hosts of the DHT Op validate

## DHT Ops

![[DHT_ops.png]]

## System validation
-   Does not depend on your application code
-   Holochain enforces some system level validations across all apps
    -   Actions
        -   Source chains can't be forked
        -   All actions must be signed by their author
        -   Timestamp and sequence number for the actions must be incremental
        -   If the action is accompanied by an entry, the entry hash in the action is correct
    -   Entries
        -   The entry byte array can be deserialized to the appropriate struct

## App validation
-   Validation rules for a given entry or link type must go in the same zome as the type definition
-   Private entries cannot be validated
-   Callback: `validate(dht_op: Op)`
``` rust
#[hdk_extern]
pub fn validate(op: Op) -> ExternResult<ValidateCallbackResult> {
  // Right now there is bunch of boilerplate here that's going to be replaced in the next version 
}     
```
-   Three results possible:
    1.  Valid
    2.  Invalid: it specifies the reason why it failed
    3.  Unresolved dependencies: Not enough data to complete the validation

## Validation challenges
-   Non-deterministic queries can't be considered during validation
    -   `get` and `get_details` are forbidden
        -   They attempt to return a current list of updates and deletes
    -   `get_links` is forbidden
    -   `get_agent_activity` is forbidden unless bounded by action hashes
-   Deterministic alternatives:
    -   `must_get_entry`
        -   Only returns the entry, not its action
        -   Never returns `None`, rather the validation has unresolved dependencies
    -   `must_get_action`
        -   Only returns the action
        -   Never returns `None`, rather the validation has unresolved dependencies
    -   `must_get_valid_record`
        -   Returns the record
        -   Never returns `None`, rather the validation has unresolved dependencies

### Example code ([[HDK]])
#### must_get_entry
``` rust
let role = PublicationRole::new("editor", author);  
let role_entry_hash = hash_entry(&EntryTypes::PublicationRole(role))?;  
  
let entry = must_get_entry(role_entry_hash);  
match entry {  
  Ok(_) => Ok(ValidateCallbackResult::Valid),  
  Err(_) => Ok(ValidateCallbackResult::Invalid(String::from(  
    "Only editors can create posts",  
  ))),  
}
```

## Genesis self-check
-   Callback executed when the cell is instantiated
-   If it fails, the app for that cell will fail to install
``` rust
#[hdk_extern]
pub fn genesis_self_check(data: GenesisSelfCheckData) -> ExternResult<ValidateCallbackResult> {
    // Check data.agent_key, data.membrane_proof
}
```