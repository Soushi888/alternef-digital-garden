---
Aliases: [Signals, signal, signals] 
---
#holochain/concepts 
[[Outils et Technologie/DWeb/Holochain/Holochain]]

-   Don't wait for a response: fire and forget
-   Not reliable: signals can be lost without our code knowing
-   2 types: 
    -   Remote Signals
        -   Concurrent call to multiple agents
        -   Very similar to "call_remote"
        -   Useful for notifications
    -   UI Signals
        -   Send message from the conductor to all processes that are listening

## Remote signals
``` rust
use hdk::prelude::*;

#[hdk_extern]
fn notify(agents_to_notify: Vec<AgentPubkey>) -> ExternResult<()> { 
  let input_string = String::from("input parameter");

  let input = ExternIO::encode(input_string)?; // Wrapping input 

  remote_signal(input, agents_to_notify)?; // Doesn't wait 

  Ok(())
}
```

## UI signals
``` rust
use hdk::prelude::*;

#[hdk_extern]
fn notify_ui(_: ()) -> ExternResult<()> { 
let input_string = String::from("input parameter");

  emit_signal(input_string)?; // Notify all processes connected to the conductor 

  Ok(())
}
```
