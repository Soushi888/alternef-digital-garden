---
title: Source Chain Retrieving
description: Methods for querying and retrieving data from the Holochain source chain
tags:
  - holochain
  - hdk
  - source-chain
  - data-retrieval
parent: "[[../index|HDK]]"
---

# Source Chain Retrieving

Related: [[../../fundamentals/index|Fundamentals]] • [[index|HDK]] • [[../../architecture/index|Architecture]]

##  Query
-   Retrieve the source chain for the cell that's calling "query()"
-   Only way to retrieve private entries

``` rust
use hdk::prelude::*;

#[hdk_extern]
fn query_my_full_chain(_: ()) -> ExternResult<Vec<Record>> { 
  let filter = ChainQueryFilter::new(); // We'll see more options

  let my_full_chain: Vec<Record> = query(filter)?; // No network calls

  Ok(my_full_chain)
}
```

``` rust
use hdk::prelude::*;

#[hdk_entry_helper]
struct Comment {
  comment: String
}

#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
enum EntryTypes { 
  Comment(Comment),
}

#[hdk_extern]
fn query_my_comments(_: ()) -> ExternResult<Vec<Record>> { 
  let comment_entry_type: EntryType = UnitEntryTypes::Comment.try_into()?;

  let filter = ChainQueryFilter::new().entry_type(comment_entry_type); // Filter by the given entry type

  let all_my_comments = query(filter)?; // Only the records which create or update comments

  Ok(all_my_comments)
}

#[hdk_extern]
fn query_all_links_i_created(_: ()) -> ExternResult<Vec<Record>> { 
  let filter = ChainQueryFilter::new().action_type(ActionType::CreateLink);

  let all_links_i_created = query(filter)?; // Only the records whose action is of type "CreateLink"

  Ok(all_links_i_created)
}
```

## Get_agent_activity()
-   Retrieve the source chain actions for a given agent
    -   All actions are public in the DHT
-   Doesn't return entries

``` rust
use hdk::prelude::*;

#[hdk_extern]
fn get_comments_created_by(author: AgentPubKey) -> ExternResult<Vec<ActionHash>> { 
  let filter = ChainQueryFilter::new(); // Same options as "query"

  let agent_activity = get_agent_activity(
    author,
    filter,
    ActivityRequest::Full
  )?;
}
```

