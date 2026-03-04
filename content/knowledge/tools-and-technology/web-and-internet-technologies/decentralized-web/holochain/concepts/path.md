#holochain/concepts 
[[../index|Holochain]]

## Theory
-   Anchors are great, but they can introduce problems
	-   If a large number of links are attached to the same base, they become a burden on the agents responsible for those links
		-   This is know as a "DHT Hotspot"
	-   It's impractice to sort or filter an oversized result set
		-   For example, a query of the form "get_comment_by_date(start_date: Timestamp, end_date: Timestamp)"
-   Paths solve these issues
	-   Paths are built-in to the HDK
	-   Paths are anchor trees
		-   Top level anchor acts as the root node
		-   This root node links to its children, which are also anchors
		-   This tree can be dynamically constructed and can have arbitrary depth
	-   Paths are composed of a vector of components
		-   Each component is an arbitrary byte array
		-   Normally constructed from a string
-   Demo: [https://holochain-gym.github.io/developers/intermediate/paths/#try-it](https://holochain-gym.github.io/developers/intermediate/paths/#try-it)

## Code example ([[../../development/hdk/index|HDK]])
``` rust
use hdk::prelude::*;
use integrity_zome::{EntryTypes, Comment, LinkTypes}; // Import the types defined in our integrity zome
use chrono::*; // Import the chrono crate for time related utilites

#[hdk_extern]
fn create_comment(comment: Comment) -> ExternResult<ActionHash> {
  let comment_action_hash = create_entry(EntryTypes::Comment(comment))?; // Create comment as always
  
  let (secs, nsecs) = sys_time()?.as_seconds_and_nanos(); // Get the current timestamp in microseconds
  let dt: DateTime<Utc> = DateTime::from_utc(NaiveDateTime::from_timestamp(secs, nsecs), Utc);

  let path = Path::from(format!("all_comments.{}.{}", dt.year(), dt.month())); // Builds the path "all_comments.2022.7"
  let typed_path = path.typed(LinkTypes::PathTimeIndex)?; // Add the link type to the path
  typed_path.ensure()?; // Build the path's anchor tree
  
  create_link(
    typed_path.path_entry_hash()?, 
    comment_action_hash, 
    LinkTypes::PathToComment, 
    ()
  )?;

  Ok(comment_action_hash)
}
```

### Roll-up
``` rust
#[hdk_extern]
fn get_comments_by_year(year: u32) -> ExternResult<Vec<ActionHash>> {
  let year_path = Path::from(format!("all_comments.{}", year)).typed(LinkTypes::PathTimeIndex);
  
  let month_paths: Vec<Path> = year_path.children_paths()?;

  let mut all_links: Vec<Link> = vec![];
  for path in month_paths {
    let last_component: Component = path.leaf() // `leaf()` gets the latest component
	      .ok_or(Err(wasm_error!(WasmErrorInner::Guest(String::from("The path is empty")))))?.clone(); 
    let month = String::try_from(last_component).map_err(|err| wasm_error!(err))?; // Converts the component to a string
  
    let mut links = get_links(anchor_hash, LinkTypes::PathToComment, None)?; // Get all the links created above
    all_links.append(&mut links); // Collect the links
  }

  let action_hashes: Vec<ActionHash> = links.into_iter()
    .map(|link| ActionHash::from(link.target))
    .collect(); // Extract the action hash from the links
  
  Ok(action_hashes)
}
```
