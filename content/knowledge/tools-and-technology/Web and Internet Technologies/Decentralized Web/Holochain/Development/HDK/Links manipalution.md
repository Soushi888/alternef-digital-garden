LinkTypes::[[Outils et Technologie/DWeb/Holochain/Holochain]], [[HDK]]

## [[Link|Links]]

-   Linking from one hash to another, with some optional metadata
-   Link components:
    -   Base hash: can be public key, entry hash, action hash or external hash (the hash doesn't exist in this [[Distributed Hash Table]])
    -   Target hash: can be of the same types as the base hash
    -   Type: app defined link type
    -   Tag: app defined arbitrary metadata
-   Neither the base nor the target hash need to exist as actions or entries in the DHT
-   Defining link types
    -   Only in integrity zomes

## Link Types
```rust
// zomes/integrity/lib.rs
use hdi::prelude::*;

// Defining link types
#[hdk_link_types] // Defines all the link types for the zome
enum LinkTypes { // Enum with each entry type as a variant
   AuthorToComment,Must be a Unit variant (without any payload) 
}
```

## Link Actions

### create_link()
``` rust
// zomes/coordinator/lib.rs
use hdk::prelude::*;
use integrity_zome::{LinkTypes, EntryTypes, Comment}; // Import the types defined in our integrity zome

#[hdk_extern]
fn create_comment(comment: Comment) -> ExternResult<ActionHash> {
  let comment_action_hash = create_entry(EntryTypes::Comment(comment))?; // Create comment as always

  let my_pub_key: AgentPubKey = agent_info()?.agent_initial_pubkey; 

  let create_link_action_hash: ActionHash = create_link(
    my_pub_key, // Base hash
    comment_action_hash,  // Target hash
    LinkTypes::AuthorToComment,  // Link Type
    () // Link tag
  )?;

  Ok(comment_action_hash)
}
```

### get_links()
-   Links are attached to the base hash
    -   You can retrieve all the links attached to a given hash as a base

``` rust
// zomes/coordinator/lib.rs
use hdk::prelude::*;
use integrity_zome::{LinkTypes, EntryTypes, Comment}; // Import the types defined in our integrity zome

#[hdk_extern]
fn get_all_comments_by_agent(author: AgentPubKey) -> ExternResult<Vec<Record>> {
  let links: Vec<Link> = get_links(
    author,  // Base hash 
    LinkTypes::AuthorToComment,  // Link Type
    None,  // Filter on link tag prefix
  )?;

  let mut comments: Vec<Record> = vec![];

  for link in links {
    let maybe_record = get(ActionHash::from(link.target), GetOptions::default())?;
    if let Some(record) = maybe_record {
      comments.push(record);
    }
  }

  Ok(comments)
}
```
