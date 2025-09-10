---
title: Entries Manipulation
description: HDK functions for creating, updating, and managing Holochain entries
tags:
  - holochain
  - hdk
  - entries
  - data-manipulation
parent: "[[../index|HDK]]"
---

# Entries Manipulation

Related: [[../../fundamentals/entry|Entries]] • [[index|HDK]] • [[../../fundamentals/index|Fundamentals]]

## [[Entry]] Action
-   These are actions you can take on your Holochain app's state machine, stored in the app's DHT
-   Includes actions like create, update, delete
-   Can be done in an integrity zome or in a coordinator zome

### create_entry()
-   Issues a notice to the DHT to record the creation of a new entry node for some given type
-   Records both the details of the entry itself, and a create action, which describes a claim to having "created" that entry
-   In the merkle tree, a create action branches directly from an entry itself
-   If the submitted entry already can already be found in the DHT, then only the create action is added (since there can be no duplicates in a content-addressed DHT)
    -   There can be any number of create actions added to the DHT, all claiming to have created the same entry
    -   The create actions may contradict one another (for example, by claiming different authors of the entry)
    -   It's up to the application code to interpret the full set of discoverable actions, and determine a single, well-believed world state

#### Example
``` rust
// zomes/coordinator/lib.rs
use hdk::prelude::*;
use integrity_zome::{EntryTypes, Comment}; // Import the types defined in our integrity zome

#[hdk_extern]
fn basic_comment_creation(comment: Comment) -> ExternResult<()> {
  create_entry(EntryTypes::Comment(comment))?; // Input must be an instance of the entry types enum

  Ok(())
}

#[hdk_extern]
fn create_comment_and_return_action_hash(comment: Comment) -> ExternResult<ActionHash> {
  let action_hash = create_entry(EntryTypes::Comment(comment))?; // Returns the hash of the resulting action

  Ok(action_hash)
}
```

### update_entry()
-   Records a modification submitted on an entry, downstream of that entry's initial create action
-   An update action must be issued as a child of some other action
    -   Can be the child of either a create action, or of another pre-existing update action
-   After adding an update, The original entry will still exist in the DHT
    -   And so will all of that entry's downstream create and update actions
-   One create or update action may have any number of child update actions added under it
    -   In this way, a set of update actions can form a merkle chain of compatible updates to one entry
    -   Furthermore, a set of update actions might branch to form a tree of incompatible update chains
    -   It's up to the application code to interpret the full set of discoverable actions, and determine a single well-believed world state
    - An update action cannot branch directly from an entry itself
		-   This is because, for any given entry, there may be several valid create and update actions all descended from that one entry
		- Attempting to attach an update directly to an entry would require deciding which of the valid action chains you wanted to append the new update action to

#### Example

``` rust
// zomes/coordinator/lib.rs
use hdk::prelude::*;
use integrity_zome::{EntryTypes, Comment}; // Import the types defined in our integrity zome

#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateCommentInput {
  original_action_hash: ActionHash,
  new_comment: Comment
}

#[hdk_extern]
fn update_comment(input: UpdateCommentInput) -> ExternResult<ActionHash> {
  let action_hash = update_entry(input.original_action_hash, input.new_comment)?;

  Ok(action_hash)
}
```

### delete_entry()
-   Must be scoped to an action, not an entry
-   Deleted entry and action will still exist in the DHT after deleting
    -   We are just marking them as "deleted"
-   One action may be deleted multiple times
-   It's up to the application to interpret what "deleting an action" means

``` rust
// zomes/coordinator/lib.rs
use hdk::prelude::*;
use integrity_zome::{EntryTypes, Comment}; // Import the types defined in our integrity zome

#[hdk_extern]
fn delete_comment(comment_action_hash: ActionHash) -> ExternResult<()> {
  let action_hash = delete_entry(comment_action_hash)?; // Deleted action hash must be a create or an update action

  Ok(())
}
```


### Entry Retrievals
Read requests issued to the DHT

### get()
-   Given an entry hash or an action hash, return the "Record" that hashes to that hash
   -   Record is the union of the action and optionally its accompanying entry

``` rust
// zomes/coordinator/lib.rs
use hdk::prelude::*;
use integrity_zome::{EntryTypes, Comment}; // Import the types defined in our integrity zome
            
#[hdk_extern]
fn get_comment(comment_action_hash: ActionHash) -> ExternResult<Option<Record>> {
  let comment_record: Option<Record> = get(comment_action_hash, GetOptions::default())?;

  Ok(comment_record)
}
```

### get_details()
-   Given an entry hash, return the entry and all the actions that have created, updated or deleted any action pointing to that entry
-   Given an action hash, return the entry, the action and all the actions that have updated or deleted that action

``` rust
// zomes/coordinator/lib.rs
use hdk::prelude::*;
use integrity_zome::{EntryTypes, Comment}; // Import the types defined in our integrity zome

#[hdk_extern]
fn get_comment_action_details(comment_action_hash: ActionHash) -> ExternResult<Record> {
  let record_details: Option<Details> = get_details(comment_action_hash, GetOptions::default())?;

  match record_details {
    Some(Details::Record(RecordDetails { record, deletes, updates, .. }))  => Ok(record),
    _ => Err(wasm_error!(WasmErrorInner::Guest(String::from("Error trying to get the details of this action"))))
  }
}
  
#[hdk_extern]
fn get_comment_entry_details(comment_entry_hash: EntryHash) -> ExternResult<Entry> {
  let entry_details: Option<Details> = get_details(comment_entry_hash, GetOptions::default())?;
  
  match entry_details {
    Some(Details::Entry(EntryDetails { entry, actions, deletes, updates, .. })) => Ok(entry),
    _ => Err(wasm_error!(WasmErrorInner::Guest(String::from("Error trying to get the details of this action"))))
  }
}
```
