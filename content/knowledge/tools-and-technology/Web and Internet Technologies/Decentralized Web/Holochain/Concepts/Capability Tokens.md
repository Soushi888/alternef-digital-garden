---
Aliases: [capability tokens, capability token, Capability Token]
---
 #holochain/concepts 
[[Outils et Technologie/DWeb/Holochain/Holochain]]

-   Private entries that manage authorization to execute zome calls by sources external to the cell
-   Two types of private entries: 
    -   Capability Grants
        -   Stored by the grantor of the zome call request
        -   Allow an external source to execute a zome call request
        -   When they are deleted, that grant is not longer taken into account in the security checks
        -   This means that the cell is always in control of the grants that it makes to external sources
    -   Capability Claim
        -   Stored by the grantee of the capability
        -   These don't provide access to external zome call requests
        -   Mostly a convenience entry type just to store information about the Capability Grant
    -   Both can be created as any other entry, at any point in time

## Types of capability grant
-   Unrestricted: disable security checks 
    -   Any call to the function coming from any source will be executed
    -   This can be a huge security risk, so we generally don't grant unrestricted capability grants unless there is a really good reason
-   Transferable: any source that knows a specific secret 
    -   The zome call must carry a secret
    -   Only the calls that carry the secret specified in the capability token will be executed
    -   The secret can be stored in the source chain of the caller with a "Capability Claim" entry
-   Assigned to specific agents 
    -   The zome call must carry the agent public key of the caller and its signature and also a capability secret
    -   Only the calls that a) carry the secret specified and b) are made by one of the agents specified in the capability token are allowed to make the call

### Code example
#### Create unrestricted grant

``` rust
use hdk::prelude::*;

#[hdk_extern]
fn zome_function_a(input: String) -> ExternResult<ActionHash> { /** Create, create links, get, query... */ } 

// Which functions do we grant access to? 
fn functions_to_grant_capability_for() -> GrantedFunctions { // Type required by the HDK API
  let zome_name = zome_info()?.name; // Getting the zome name
  let function_name = FunctionName(String::from("zome_function_a")); // Wrapper around a "String"

  let mut functions: BTreeSet<(ZomeName, FunctionName)> = BTreeSet::new();
  functions.insert((zome_name, function_name)); // Granting access to the function in this zome

  GrantedFunctions::Listed(functions) // Can be "Listed" functions or "All" functions
}

#[hdk_extern]
fn grant_unrestricted_capability(_: ()) -> ExternResult<()> {
  let functions = functions_to_grant_capability_for();

  let access = CapAccess::Unrestricted; // Can be called from any source

  let capability_grant = CapGrantEntry {  // Built-in private entry
    functions,
    access,
    tag: String::from("unrestricted"), // Convenience tag
  };

  create_cap_grant(capability_grant)?; // Actually commit the capability

  Ok(())
}
```

#### Create a transferable grant
``` rust
// Which secret do they need to know to call those functions? 
fn cap_secret() -> ExternResult<CapSecret> { // Wrapper around a byte array
  let bytes = random_bytes(64)?;
  let secret = CapSecret::try_from(bytes.into_vec())
      .map_err(|_| wasm_error!(WasmErrorInner::Guest("Could not build secret".into())))?;

  Ok(secret)
}

#[hdk_extern]
fn grant_transferable_capability(authorized_agent: AgentPubkey) -> ExternResult<()> {
  let secret = cap_secret()?;

  let access = CapAccess::Transferable { // Requests are required to carry this secret 
    secret,
  };
  let capability_grant = CapGrantEntry {
    functions: functions_to_grant_capability_for(),
    access,
    tag: String::from("transferable capability"), // Convenience tag
  };

  create_cap_grant(capability_grant)?;

  Ok(())
}
```

#### Create assigned grant
``` rust
use hdk::prelude::*;

#[hdk_extern]
fn grant_assigned_capability(authorized_agent: AgentPubkey) -> ExternResult<()> {

  /** To whom do we grant access to those functions? */
  let mut assignees: BTreeSet<AgentPubkey> = BTreeSet::new();
  assignees.insert(authorized_agent); // Assign capabilty to the given "authorized_agent"

  let access = CapAccess::Assigned { // Requests are required to carry this secret and be signed by one of the assignees 
    secret: cap_secret(),
    assignees
  };
  let capability_grant = CapGrantEntry {
    functions: functions_to_grant_capability_for(),
    access,
    tag: String::from("assigned capability"), // Convenience tag
  };

  create_cap_grant(capability_grant)?;

  Ok(())
}
```

#### Create capability claims
``` rust
use hdk::prelude::*;

#[hdk_extern]
fn create_claim_for_zome_function_a(grant_data: (AgentPubkey, Secret)) -> ExternResult<()> {
  
  let cap_claim = CapClaimEntry { // Built-in private entry
    grantor: grant_data.0, // Just to remember which agent to call
    secret: grant_data.1, // Store the secret
    tag: String::from("claim for zome_function_a"), // Can be different from the tag in the grant
  };

  create_cap_claim(cap_claim)?; // Commit the claim privately

  Ok(())
}
```

## Example
![[capability_token_sequence.png]]
