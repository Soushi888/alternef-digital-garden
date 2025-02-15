#holochain/concepts 
[[Outils et Technologie/DWeb/Holochain/Holochain]]

Arbitrary data that affects the operation of the [[Holochain DNA|DNA]]. A user can specify properties at DNA installation time, which causes the DNA to be cloned if the user-specified properties are different from the default properties. The executable code can then access those properties to change its behavior, similar to configuration files or environment variables. This is a simple way of allowing separate networks of users to enjoy isolated and slightly modified experiences using a set of base rules. The DNA properties are considered [[DNA modifiers]].

## Implementation example

```rust
use crate::wasm_error;
use hdk::prelude::*;

/// Struct for DNA properties in a distributed network, holding the progenitor's public key.
#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone)]
pub struct DnaProperties {
    /// Public key of the progenitor node.
    pub progenitor_pubkey: String,
}

impl DnaProperties {
    /// Fetches DNA properties from the network, including the progenitor's public key.
    ///
    /// # Returns
    ///
    /// - `Ok(Self)`: Fetched `DnaProperties` instance.
    /// - `Err(ExternError)`: Error details.
    pub fn get() -> ExternResult<Self> {
        dna_info()?
            .modifiers
            .properties
            .try_into()
            .map_err(|err: SerializedBytesError| wasm_error(&err.to_string()))
    }

    /// Extracts and deserializes the progenitor's public key.
    ///
    /// # Returns
    ///
    /// - `Ok(AgentPubKey)`: Deserialized progenitor's public key.
    /// - `Err(ExternError)`: Error details.
    pub fn get_progenitor_pubkey() -> ExternResult<AgentPubKey> {
        let progenitor_pubkey_string = DnaProperties::get()?.progenitor_pubkey;

        AgentPubKey::try_from(progenitor_pubkey_string.clone())
            .map_err(|err| wasm_error(&format!("Deserialization error: {}", err)))
    }
}

```

The example code provided demonstrates how to handle the DNA properties of a Holochain application. Specifically, it focuses on retrieving and working with the public key of the [[Progenitor]] node associated with a given piece of DNA data. The `DnaProperties` struct is defined to encapsulate this critical piece of information, ensuring that it can be easily accessed and utilized throughout the application.

The implementation of `DnaProperties` includes two primary functions: `get()` and `get_progenitor_pubkey()`. The `get()` function is responsible for fetching the DNA properties from the network, converting them into a `DnaProperties` instance. This process involves calling the `dna_info()` function, which retrieves the DNA information, and then attempting to deserialize the properties into the `DnaProperties` struct. If there are any issues during this conversion, such as serialization errors, they are caught and handled appropriately, returning a custom error message.

The `get_progenitor_pubkey()` function takes the previously retrieved `DnaProperties` instance and extracts the progenitor's public key. This key is crucial for identifying the progenitor node within the distributed network. The function attempts to deserialize the public key string into an `AgentPubKey` object. Again, if there are any deserialization errors, they are caught and handled, providing a clear error message to aid in debugging.