---
title: Host
description: Holochain's runtime environment that provides secure WebAssembly execution and system API access for guest applications
tags:
  - holochain
  - host
  - runtime
  - webassembly
  - guest-host
  - conductor
aliases:
  - Holochain Host
  - Conductor Host
  - Runtime Host
---

## What is a Host?

A **Host** in Holochain is the runtime environment that provides secure execution and system access for [[guest|Guest]] applications. It acts as the trusted foundation that manages WebAssembly execution, provides API access, and enforces security boundaries between guest applications and the underlying system.

## Core Architecture

### Host-Guest Relationship

The Host implements a **capability-based security model** where:

- **Host Environment**: Trusted runtime with system access
- **Guest Applications**: Sandboxed WebAssembly modules
- **API Surface**: Controlled interface between host and guest
- **Security Boundary**: Enforced isolation and permission model

```
┌─────────────────────────────────────────┐
│              Host Environment           │
├─────────────────────────────────────────┤
│  • System API Access                   │
│  • Network Communication               │
│  • Persistent Storage                  │
│  • Cryptographic Operations           │
│  • Resource Management                │
└─────────────┬───────────────────────────┘
              │ Controlled API
┌─────────────▼───────────────────────────┐
│          Guest Applications             │
├─────────────────────────────────────────┤
│  • WebAssembly Execution               │
│  • Application Logic                   │
│  • Restricted System Access           │
│  • Sandboxed Environment              │
└─────────────────────────────────────────┘
```

## Host Components

### Conductor Runtime

The **Conductor** is the primary host implementation that:

- Manages multiple DNA instances
- Provides networking capabilities
- Handles persistent storage
- Enforces validation rules
- Coordinates peer-to-peer communication

### WebAssembly Runtime

- **WASM Engine**: Executes guest applications in isolated environment
- **Memory Management**: Controlled memory allocation and access
- **API Binding**: Secure host function exposure to guests
- **Error Isolation**: Prevents guest failures from affecting host

### System Interface Layer

```rust
// Host API categories
pub enum HostAPI {
    // Cryptographic operations
    Crypto(CryptoRequest),
    
    // Network communication  
    Network(NetworkRequest),
    
    // Data persistence
    Storage(StorageRequest),
    
    // Time and randomness
    System(SystemRequest),
    
    // Inter-cell communication
    Bridge(BridgeRequest),
}
```

## Security Model

### Capability-Based Access

The host implements **object-capability security**:

- **No Ambient Authority**: Guests have no implicit system access
- **Explicit Grants**: All capabilities must be explicitly provided
- **Least Privilege**: Guests receive minimum necessary permissions
- **Revocable Access**: Capabilities can be withdrawn dynamically

### Sandboxing Mechanisms

1. **WebAssembly Isolation**
   - Memory protection
   - Control flow integrity
   - Type safety enforcement

2. **Resource Limits**
   - Memory allocation caps
   - Execution time limits
   - Network bandwidth controls

3. **API Restrictions**
   - Filtered system calls
   - Validated parameters
   - Authorized operations only

## Host API Categories

### Cryptographic Services

```rust
// Example host crypto API
HostCrypto {
    sign(private_key, data) -> signature,
    verify(public_key, signature, data) -> bool,
    random_bytes(count) -> bytes,
    hash(data) -> hash,
}
```

### Network Operations

- **Peer Discovery**: Bootstrap and maintain network connections
- **Message Routing**: Efficient DHT-based communication
- **Gossip Protocol**: Reliable data propagation
- **Network Health**: Connection monitoring and recovery

### Storage Management

- **Source Chain**: Append-only personal data history
- **DHT Integration**: Distributed data validation and storage
- **Local Cache**: Performance optimization for frequent access
- **Backup/Restore**: Data persistence and recovery mechanisms

### System Services

- **Time Services**: Consistent timestamp generation
- **Randomness**: Cryptographically secure random number generation
- **Logging**: Debug and audit trail capabilities
- **Metrics**: Performance monitoring and analytics

## Implementation Patterns

### Host Function Calls

```javascript
// Guest calling host function
const result = await hdk.call('crypto', 'sign', {
    private_key: myKey,
    data: messageData
});
```

### Error Handling

```rust
// Host error propagation
match host_operation() {
    Ok(result) => return_to_guest(result),
    Err(host_error) => {
        log_error(host_error);
        return_guest_error(sanitized_error);
    }
}
```

### Resource Management

```rust
// Host resource tracking
struct GuestContext {
    memory_limit: usize,
    execution_budget: Duration,
    active_operations: Vec<OperationId>,
    permissions: CapabilitySet,
}
```

## Development Considerations

### Host API Design

- **Stability**: API compatibility across versions
- **Performance**: Efficient host-guest communication
- **Security**: Defense in depth security model
- **Extensibility**: Plugin architecture for custom capabilities

### Guest Integration

- **HDK Bindings**: High-level developer interface
- **Error Handling**: Graceful failure modes
- **Resource Awareness**: Efficient resource utilization
- **Testing Support**: Development and debugging tools

## Advanced Topics

### Custom Host Implementations

Organizations can implement custom hosts for:

- **Enterprise Integration**: Custom system integrations
- **Specialized Hardware**: IoT and embedded systems
- **Performance Optimization**: Domain-specific optimizations
- **Compliance Requirements**: Regulatory and audit needs

### Host Extensions

- **Plugin Architecture**: Modular capability extensions
- **Custom APIs**: Domain-specific functionality
- **Integration Bridges**: External system connections
- **Monitoring Integration**: Enterprise monitoring systems

## Related Concepts

- **[[guest|Guest]]** - WebAssembly applications running in host environment
- **[[conductor|Conductor]]** - Primary host implementation
- **[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/technical-concepts/core-primitives/cells|Cells]]** - Guest application instances managed by host
- **[[wasm|WebAssembly]]** - Guest application execution environment
- **[[api|Host API]]** - Interface between host and guest systems

## External Resources

- [Holochain Conductor Documentation](https://developer.holochain.org/concepts/conductor/)
- [WebAssembly Security Model](https://webassembly.org/docs/security/)
- [Host API Reference](https://docs.rs/holochain/latest/holochain/)
- [Capability-Based Security](https://en.wikipedia.org/wiki/Capability-based_security)
