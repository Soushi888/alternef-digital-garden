#holochain/concepts 


- Data in [[Outils et Technologie/DWeb/Holochain/Holochain]] is best structured as a directed acyclic graph of linked actions, entries and public keys
- From a starting point ID (action, entry or agent), we typically want to retrieve certain data related to it
- For example, if our application will need to "get_comments_by_author(author: AgentPubKey)", then:
    - When we create the comment,
        - we also create a link
            - from the public key of the author
            - to the create action hash
    - Inside "get_coments_by_author(author: AgentPubKey)"
        - we get links from that agent public key
        - to retrieve all the comments by that author
- Problem: how do we build queries that don't have starting point?
    - For example: "get_all_comments()", which gets all comments that any agent has created
    - We can't go to all the cells and query all the comments that each cell has created as it's intractably expensive when the network grows
- Solution: hard code a deterministic entry in the source code
    - Whenever we create a comment, we also create a link from the hash of that deterministic entry
    - Then we can implement "get_all_comments()" by doing a get links from that hash that everyone knows
        - These deterministic entries are called "anchors"
- Demo: [https://holochain-gym.github.io/developers/intermediate/anchors/#try-it](https://holochain-gym.github.io/developers/intermediate/anchors/#try-it)

## Example Code ([[HDK]])
### Integrity
``` rust
// Integrity
use hdi::prelude::*;

#[hdk_entry_helper]
struct Comment {
  comment: String
}

#[hdk_entry_helper]
// We only need a string
struct Anchor(String);
  
#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
enum EntryTypes { 
  Comment(Comment),
  Anchor(Anchor),
}

#[hdk_link_types]
enum LinkTypes { 
  AnchorToComment,
}
```
### Coordinator
``` rust
// Coordinator
use hdk::prelude::*;

#[hdk_extern]
fn create_comment(comment: Comment) -> ExternResult<ActionHash> {
  let comment_action_hash = create_entry(EntryTypes::Comment(comment))?;

  let anchor = Anchor(String::from("all_comments"));

  // Create the anchor entry
  let _anchor_action_hash = create_entry(EntryTypes::Anchor(anchor))?;
  
  let anchor_entry_hash = hash_entry(anchor)?; // This hash is deterministic

  create_link(
    anchor_entry_hash, comment_action_hash, LinkTypes::AnchorToComment, ()
  )?;

  Ok(comment_action_hash)
}

#[hdk_extern]
fn get_all_comments_hashes(_: ()) -> ExternResult<Vec<ActionHash>> {
  let anchor = Anchor(String::from("all_comments")); // Must use the same string as the create function

  let anchor_hash = hash_entry(anchor)?;

  let links = get_links(anchor_hash, LinkTypes::AnchorToComment, None)?; // Get all the links created above

  let action_hashes: Vec<ActionHash> = links.into_iter()
    .map(|link| ActionHash::from(link.target))
    .collect(); // Extract the action hash from the links
  
  Ok(action_hashes)
}  
```