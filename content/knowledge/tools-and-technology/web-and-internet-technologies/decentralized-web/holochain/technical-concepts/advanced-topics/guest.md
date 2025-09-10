---
title: Guest
description: WebAssembly applications that run in Holochain's secure sandbox environment, implementing application logic through host API interactions
tags:
  - holochain
  - guest
  - webassembly
  - sandbox
  - application-logic
  - hdk
aliases:
  - Guest Application
  - WASM Guest  
  - Holochain Guest
---

## What is a Guest?

A **Guest** in Holochain is a WebAssembly (WASM) application that runs in a secure sandbox environment provided by the [[host|Host]]. Guests contain the core application logic and interact with the host through a controlled API surface to access system resources, network operations, and persistent storage.

## Core Architecture

### Guest Execution Model

```
┌─────────────────────────────────────────┐
│           Guest Application             │
├─────────────────────────────────────────┤
│  • Application Logic (WASM)            │
│  • Business Rules                      │
│  • Validation Functions                │
│  • User Interface Logic                │
└─────────────┬───────────────────────────┘
              │ Host API Calls
┌─────────────▼───────────────────────────┐
│             Host Runtime                │
├─────────────────────────────────────────┤
│  • System Resources                    │
│  • Network Communication               │
│  • Cryptographic Services             │
│  • Data Persistence                   │
└─────────────────────────────────────────┘
```

### WebAssembly Benefits

- **Security**: Memory-safe execution with strong isolation
- **Performance**: Near-native execution speed
- **Portability**: Platform-independent bytecode
- **Language Agnostic**: Support for multiple programming languages
- **Sandboxing**: No direct system access without explicit permission

## Guest Components

### Application Logic

```rust
// Example guest application structure
#[hdk_extern]
pub fn create_entry(entry_input: CreateEntryInput) -> ExternResult<HeaderHash> {
    // Business logic implementation
    validate_entry_data(&entry_input)?;
    
    // Host API call for persistence
    let header_hash = create_entry(&entry_input.entry)?;
    
    Ok(header_hash)
}
```

### Validation Functions

Guests implement validation rules that ensure data integrity:

```rust
#[hdk_extern]
pub fn validate(op: Op) -> ExternResult<ValidateCallbackResult> {
    match op {
        Op::StoreEntry(store_entry) => {
            validate_entry_rules(&store_entry.entry)
        }
        Op::StoreRecord(store_record) => {
            validate_record_rules(&store_record.record)
        }
        _ => Ok(ValidateCallbackResult::Valid),
    }
}
```

### User Interface Integration

```javascript
// Guest application exposed functions
const guestAPI = {
    // Core operations
    createEntry: (data) => call_guest_function('create_entry', data),
    getEntry: (hash) => call_guest_function('get_entry', hash),
    updateEntry: (hash, data) => call_guest_function('update_entry', { hash, data }),
    
    // Application-specific logic
    validateUser: (credentials) => call_guest_function('validate_user', credentials),
    processTransaction: (txn) => call_guest_function('process_transaction', txn),
};
```

## Development Framework

### Holochain Development Kit (HDK)

The HDK provides high-level bindings for guest development:

```rust
use hdk::prelude::*;

// Entry definition
#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct BlogPost {
    pub title: String,
    pub content: String,
    pub author: AgentPubKey,
    pub timestamp: Timestamp,
}

// Zome functions
#[hdk_extern]
pub fn create_blog_post(post: BlogPost) -> ExternResult<Record> {
    // Validation logic
    if post.title.is_empty() {
        return Err(wasm_error!("Title cannot be empty"));
    }
    
    // Create entry through host
    let action_hash = create_entry(&EntryTypes::BlogPost(post.clone()))?;
    
    // Retrieve created record
    let record = get(action_hash, GetOptions::default())?
        .ok_or(wasm_error!("Could not get the created record"))?;
    
    Ok(record)
}
```

### Language Support

Guests can be written in multiple languages:

**Rust** (Primary)
```rust
#[hdk_extern]
pub fn my_function(input: String) -> ExternResult<String> {
    Ok(format!("Processed: {}", input))
}
```

**JavaScript/TypeScript**
```typescript
export function myFunction(input: string): string {
    return `Processed: ${input}`;
}
```

**AssemblyScript**
```typescript
export function myFunction(input: string): string {
    return "Processed: " + input;
}
```

## Guest Lifecycle

### Initialization

```rust
#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    // Initialize guest state
    setup_application_data()?;
    configure_validation_rules()?;
    
    Ok(InitCallbackResult::Pass)
}
```

### Operation Handling

```rust
// Guest handling different operation types
match operation_type {
    OperationType::Create => handle_create_operation(op_data),
    OperationType::Update => handle_update_operation(op_data),
    OperationType::Delete => handle_delete_operation(op_data),
    OperationType::Query => handle_query_operation(op_data),
}
```

### Cleanup

```rust
#[hdk_extern]
pub fn cleanup(_: ()) -> ExternResult<CleanupCallbackResult> {
    // Resource cleanup
    clear_temporary_data()?;
    flush_pending_operations()?;
    
    Ok(CleanupCallbackResult::Success)
}
```

## Security Model

### Sandbox Restrictions

Guests operate under strict security constraints:

- **No Direct System Access**: All system operations through host API
- **Memory Isolation**: Cannot access memory outside allocated space
- **Resource Limits**: CPU, memory, and time execution bounds
- **API Validation**: All host API calls validated and sanitized

### Capability Requirements

```rust
// Guest requesting capabilities
#[hdk_extern]
pub fn request_network_access() -> ExternResult<()> {
    // Host validates capability request
    let network_cap = request_capability(CapabilityType::Network)?;
    
    // Use capability for network operations
    send_message(network_cap, peer_id, message)?;
    
    Ok(())
}
```

### Input Validation

```rust
#[hdk_extern] 
pub fn process_input(data: InputData) -> ExternResult<ProcessedData> {
    // Validate all inputs
    validate_input_format(&data)?;
    validate_input_constraints(&data)?;
    validate_business_rules(&data)?;
    
    // Process validated data
    let result = apply_business_logic(data)?;
    
    Ok(result)
}
```

## Host API Integration

### System Calls

Guests access system functionality through host API:

```rust
// Cryptographic operations
let signature = sign(private_key, message_data)?;
let is_valid = verify_signature(public_key, signature, message_data)?;

// Network operations
let peers = get_peer_list()?;
let response = send_remote_call(target_agent, function_name, payload)?;

// Storage operations
let entry_hash = create_entry(entry_data)?;
let entry = get_entry(entry_hash)?;
```

### Error Handling

```rust
match host_operation() {
    Ok(result) => process_success(result),
    Err(HostError::NetworkTimeout) => handle_network_error(),
    Err(HostError::ValidationFailed(reason)) => handle_validation_error(reason),
    Err(HostError::InsufficientPermissions) => handle_permission_error(),
    Err(error) => handle_generic_error(error),
}
```

## Performance Considerations

### Memory Management

```rust
// Efficient memory usage in guests
use hdk::prelude::*;

#[hdk_extern]
pub fn process_large_dataset(data: Vec<DataItem>) -> ExternResult<ProcessedResult> {
    // Process in chunks to manage memory
    let chunk_size = 100;
    let mut results = Vec::new();
    
    for chunk in data.chunks(chunk_size) {
        let chunk_result = process_chunk(chunk)?;
        results.push(chunk_result);
        
        // Allow garbage collection between chunks
        yield_to_host()?;
    }
    
    Ok(combine_results(results))
}
```

### Computation Efficiency

```rust
#[hdk_extern]
pub fn efficient_computation(input: ComputeInput) -> ExternResult<ComputeResult> {
    // Check computation budget
    check_execution_budget()?;
    
    // Use efficient algorithms
    let result = match input.complexity {
        Low => fast_algorithm(input),
        Medium => balanced_algorithm(input), 
        High => optimized_algorithm(input),
    }?;
    
    Ok(result)
}
```

## Testing and Debugging

### Unit Testing

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use hdk::test_utils::*;

    #[tokio::test]
    async fn test_guest_function() {
        let mut mock_hdk = MockHdkT::new();
        
        // Mock host responses
        mock_hdk.expect_create_entry()
            .returning(|_| Ok(fake_action_hash()));
            
        // Test guest function
        let result = create_blog_post(test_blog_post()).unwrap();
        assert!(!result.action().as_hash().is_empty());
    }
}
```

### Development Tools

- **Holochain Playground**: Interactive testing environment
- **HDK Test Utils**: Mock host interactions
- **WASM Debugger**: Step-through debugging support
- **Performance Profiler**: Execution analysis tools

## Advanced Patterns

### State Management

```rust
// Guest state management pattern
lazy_static! {
    static ref GUEST_STATE: Mutex<GuestState> = Mutex::new(GuestState::new());
}

#[hdk_extern]
pub fn update_state(update: StateUpdate) -> ExternResult<()> {
    let mut state = GUEST_STATE.lock()?;
    state.apply_update(update)?;
    persist_state(&state)?;
    
    Ok(())
}
```

### Event Handling

```rust
#[hdk_extern]
pub fn handle_signal(signal: ExternIO) -> ExternResult<()> {
    let event: ApplicationEvent = signal.decode()?;
    
    match event.event_type {
        EventType::UserAction => handle_user_event(event),
        EventType::NetworkEvent => handle_network_event(event),
        EventType::SystemEvent => handle_system_event(event),
    }
}
```

### Inter-Cell Communication

```rust
#[hdk_extern]
pub fn cross_cell_operation(target_cell: CellId, operation: Operation) -> ExternResult<Response> {
    // Call function in another cell
    let response = call(
        CallTargetCell::Other(target_cell),
        ZomeName("coordinator".into()),
        FunctionName("process_operation".into()),
        None,
        operation,
    )?;
    
    Ok(response)
}
```

## Related Concepts

- **[[host|Host]]** - Runtime environment that executes guest applications
- **[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/technical-concepts/core-primitives/cells|Cells]]** - Container for guest application instances
- **[[wasm|WebAssembly]]** - Execution format for guest applications
- **[[hdk|HDK]]** - Development kit for building guest applications
- **[[conductor|Conductor]]** - Host implementation that manages guests

## External Resources

- [HDK Documentation](https://docs.rs/hdk/latest/hdk/)
- [WebAssembly Specification](https://webassembly.github.io/spec/)
- [Holochain Application Development](https://developer.holochain.org/get-building/)
- [WASM Security Model](https://webassembly.org/docs/security/)
