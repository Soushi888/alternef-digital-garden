[[Outils et Technologie/DWeb/Holochain/Holochain]]

## 3 sources of [[Zome|zome]] calls
-   Conductor receives request on the application port 
    -   Any process external to Holochain can bind to the application port of the conductor using a websockets
    -   Usually a web GUI
-   Bridge call d to the application port of the conductor using a websockets
    -   Any cell in a conductor can call another cell in the same conductor, by cell ID
-   Remote call 
    -   Any cell in a network can call another cell in the same network, by agent public key
- Zome calls have a unified security model 
    -   Protects all zome calls independently of where they originated (externally or within the conductor)
-   When the conductor receives a zome call request, it checks whether it complies with the security checks: 
    -   If the call is signed by the agent with the public key for the cell, the call is accepted and executed
    -   If not, the conductor looks up the source chain for that cell for **[[Capability Tokens|capability tokens]]** for the requested function
        -   If some capability grant allows the request, it is executed
        -   Otherwise, the request is rejected


### Bridged call
``` rust
#[hdk_extern]
pub fn store_file(file_bytes: SerializedBytes) -> ExternResult {
  let zome_call_response = call(
    CallTargetCell::OtherRole("file_storage_provider"), // Must be one of the roles specified in the happ manifest
    ZomeName::from(String::from("file_storage")), // Name of the zome to call
    FunctionName(String::from("store_file")), // Name of the zome function to call
    None, // Capability secret, if necessary
    file_bytes, // Input for the zome function
  )?;
    
  match zome_call_response {
    ZomeCallResponse::Ok(result) => { // ExternIO is a wrapper around a byte array
      let entry_hash: EntryHash = result.decode().map_err(|err| wasm_error!(err.into()))?; // Deserialize byte array
      Ok(entry_hash)
    },
    ZomeCallResponse::Unauthorized(cell_id, zome_name, function_name, callee) => { // Callee deleted the capability grant
      Err(wasm_error!(WasmErrorInner::Guest("Agent revoked the capability".into())))
    },
    ZomeCallResponse::NetworkError(err) => { // Network error, we could try again
      Err(wasm_error!(WasmErrorInner::Guest(format!("There was a network error: {:?}", err)))
    },
    ZomeCallResponse::CountersigningSession(err) => { 
      Err(wasm_error!(WasmErrorInner::Guest(format!("There was a network error: {:?}", err))))
    },
  }
}
```

### Remote Call
``` rust
use hdk::prelude::*;

#[hdk_extern]
fn zome_function_a(input: String) -> ExternResult<ActionHash> { /** Create, create links, get, query... */ }

#[hdk_extern]
fn query_cap_claim_for(grantor: &AgentPubkey) -> ExternResult<CapClaimEntry>  { /** query and find */ } 

#[hdk_extern]
fn call_zome_function_a(callee: AgentPubkey) -> ExternResult<ActionHash> { // Call "callee"'s "zome_function_a" and return its result 
  let cap_claim_entry: CapClaimEntry = query_cap_claim_for(&callee)?; // Assummes the claim was committed in the past

  let zome_call_response = call_remote(
    callee, // Peer in this network we are calling
    zome_name()?.name, // We are calling a function defined in this zome 
    FunctionName(String::from("zome_function_a")), // Function name
    cap_claim_entry.secret, // Cap secret
    String::from("example input") // Input parameter
  );?


  match zome_call_response { // zome_call_response is the same type than in the bridged call response
    ZomeCallResponse::Ok(result) => {
      let action_hash: ActionHash = result.decode()?;
      Ok(action_hash)
    },
    _ => Err(wasm_error!(WasmErrorInner::Guest(
        "Failed to handle remote call".into()
    ))),
  }
}
```
