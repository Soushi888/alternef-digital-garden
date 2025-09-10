---
title: Network Seed
description: Cryptographic identifier that determines network membership and enables secure peer discovery in Holochain applications
tags:
  - holochain
  - network-seed
  - networking
  - peer-discovery
  - network-identity
  - bootstrap
aliases:
  - Network Identifier
  - Network Key
  - DHT Network Seed
---

## What is a Network Seed?

A **Network Seed** in Holochain is a cryptographic identifier that determines which network a DNA belongs to and enables secure peer discovery. It acts as a unique fingerprint that allows agents running the same application to find and connect with each other while maintaining separation from other networks.

## Core Purpose

### Network Isolation

```
Application A (Network Seed: 0x1234...)
├── Agent 1 ◄─────────────► Agent 2
├── Agent 3 ◄─────────────► Agent 4
└── DHT Partition A

Application B (Network Seed: 0x5678...)
├── Agent 5 ◄─────────────► Agent 6
├── Agent 7 ◄─────────────► Agent 8
└── DHT Partition B (Isolated)
```

### Security Boundary

Network seeds ensure that:
- **Network Membership**: Only agents with the correct seed can join
- **Data Isolation**: Different networks maintain separate DHT spaces
- **Peer Authentication**: Validates legitimate network participants
- **Bootstrap Security**: Prevents unauthorized network access

## Technical Implementation

### Seed Generation

```rust
// Network seed generation
use holochain_types::prelude::*;

// Generate new network seed
let network_seed = NetworkSeed::from_bytes(random_bytes(32))?;

// Derive from string (development)
let network_seed = NetworkSeed::from_string("my-app-network-v1")?;

// Use fixed seed (production)
let fixed_seed = NetworkSeed::from_hex("a1b2c3d4e5f6...")?;
```

### DNA Integration

```rust
// DNA bundle with network seed
#[derive(Serialize, Deserialize)]
pub struct DnaManifest {
    pub name: String,
    pub network_seed: Option<NetworkSeed>,
    pub properties: SerializedBytes,
    pub zomes: Vec<ZomeManifest>,
}

// Network seed affects DNA hash
let dna_hash = DnaHash::from_raw_bytes(
    hash_dna_components(&manifest, &network_seed)
);
```

### Network Identity Derivation

```rust
// Derive network identity from seed and DNA
pub fn derive_network_id(
    dna_hash: &DnaHash,
    network_seed: &NetworkSeed
) -> NetworkId {
    let combined = [dna_hash.as_bytes(), network_seed.as_bytes()].concat();
    NetworkId::from_hash(blake2b_256(combined))
}
```

## Peer Discovery Process

### Bootstrap Sequence

1. **Network ID Calculation**
```rust
// Calculate network identity
let network_id = derive_network_id(&dna_hash, &network_seed);
```

2. **Bootstrap Node Connection**
```rust
// Connect to bootstrap nodes
let bootstrap_nodes = discovery_config.bootstrap_addresses;
for node in bootstrap_nodes {
    connect_to_bootstrap(node, network_id).await?;
}
```

3. **Peer Query Protocol**
```rust
// Query for network peers
let peer_query = PeerQuery {
    network_id,
    agent_count_hint: 50,
    diversity_preference: HighDiversity,
};
let discovered_peers = bootstrap_node.query_peers(peer_query).await?;
```

4. **DHT Integration**
```rust
// Join DHT network
for peer in discovered_peers {
    if verify_network_membership(&peer, &network_id) {
        establish_dht_connection(peer).await?;
    }
}
```

### Peer Validation

```rust
// Validate peer network membership
pub fn verify_network_membership(
    peer: &PeerInfo,
    expected_network_id: &NetworkId
) -> bool {
    // Verify peer's network identity
    let peer_network_id = extract_network_id(&peer.identity);
    peer_network_id == *expected_network_id
}
```

## Network Configuration

### Development Networks

```yaml
# Development configuration
network_config:
  type: "development"
  seed_strategy: "generated"
  bootstrap_nodes:
    - "127.0.0.1:8888"
  peer_discovery:
    enabled: true
    timeout_ms: 5000
```

```rust
// Development seed generation
let dev_seed = NetworkSeed::from_string(
    &format!("dev-{}-{}", app_name, version)
)?;
```

### Production Networks

```yaml
# Production configuration  
network_config:
  type: "production"
  seed_strategy: "fixed"
  network_seed: "0xa1b2c3d4e5f6..."
  bootstrap_nodes:
    - "bootstrap1.myapp.com:9999"
    - "bootstrap2.myapp.com:9999"
  peer_discovery:
    enabled: true
    timeout_ms: 10000
    retry_attempts: 3
```

```rust
// Production seed from environment
let prod_seed = NetworkSeed::from_env("NETWORK_SEED")
    .expect("NETWORK_SEED environment variable required");
```

### Private Networks

```rust
// Enterprise private network
let private_seed = NetworkSeed::from_enterprise_config(&EnterpriseConfig {
    organization_id: "company.com".to_string(),
    network_tier: NetworkTier::Private,
    access_key: load_access_key()?,
});
```

## Network Types and Strategies

### Public Networks

- **Open Access**: Anyone can join with the correct seed
- **Global Discovery**: Public bootstrap nodes
- **Shared Infrastructure**: Community-operated nodes
- **Transparent Governance**: Public network rules

```rust
// Public network configuration
let public_config = NetworkConfig {
    access_type: AccessType::Public,
    bootstrap_strategy: BootstrapStrategy::PublicNodes,
    peer_discovery: DiscoveryConfig {
        global_discovery: true,
        local_discovery: true,
    },
};
```

### Private Networks

- **Restricted Access**: Controlled membership
- **Private Bootstrap**: Organization-operated nodes
- **Enhanced Security**: Additional authentication layers
- **Custom Governance**: Organization-specific rules

```rust
// Private network configuration
let private_config = NetworkConfig {
    access_type: AccessType::Private,
    bootstrap_strategy: BootstrapStrategy::PrivateNodes,
    authentication: AuthConfig {
        require_certificates: true,
        allowed_organizations: vec!["company.com"],
    },
};
```

### Development Networks

- **Local Testing**: Isolated development environments
- **Rapid Iteration**: Easy network recreation
- **Debug Support**: Enhanced logging and monitoring
- **Test Data**: Synthetic data generation

```rust
// Development network configuration
let dev_config = NetworkConfig {
    access_type: AccessType::Development,
    bootstrap_strategy: BootstrapStrategy::LocalNodes,
    debugging: DebugConfig {
        verbose_logging: true,
        peer_monitoring: true,
        network_simulation: true,
    },
};
```

## Security Considerations

### Seed Management

```rust
// Secure seed storage
use keyring::Entry;

// Store production seed securely
let entry = Entry::new("holochain", "network-seed")?;
entry.set_password(&network_seed.to_hex())?;

// Retrieve seed securely
let stored_seed = entry.get_password()?;
let network_seed = NetworkSeed::from_hex(&stored_seed)?;
```

### Access Control

```rust
// Network access validation
pub struct NetworkAccessControl {
    allowed_seeds: HashSet<NetworkSeed>,
    access_policies: Vec<AccessPolicy>,
    audit_log: AuditLogger,
}

impl NetworkAccessControl {
    pub fn validate_access(&self, seed: &NetworkSeed) -> AccessResult {
        // Validate seed authorization
        if !self.allowed_seeds.contains(seed) {
            self.audit_log.log_unauthorized_access(seed);
            return AccessResult::Denied;
        }
        
        // Apply access policies
        for policy in &self.access_policies {
            if !policy.evaluate(seed) {
                return AccessResult::PolicyViolation(policy.name());
            }
        }
        
        AccessResult::Granted
    }
}
```

### Network Monitoring

```rust
// Network health monitoring
pub struct NetworkMonitor {
    network_id: NetworkId,
    peer_metrics: PeerMetrics,
    connection_health: ConnectionHealthTracker,
}

impl NetworkMonitor {
    pub fn monitor_network_health(&mut self) -> NetworkHealthReport {
        let peer_count = self.count_active_peers();
        let connection_quality = self.assess_connection_quality();
        let bootstrap_status = self.check_bootstrap_availability();
        
        NetworkHealthReport {
            peer_count,
            connection_quality,
            bootstrap_status,
            network_partition_risk: self.assess_partition_risk(),
        }
    }
}
```

## Advanced Network Patterns

### Multi-Network Applications

```rust
// Application with multiple network contexts
pub struct MultiNetworkApp {
    networks: HashMap<String, NetworkContext>,
    routing_rules: NetworkRoutingRules,
}

impl MultiNetworkApp {
    pub fn add_network(&mut self, name: String, seed: NetworkSeed) -> Result<()> {
        let context = NetworkContext::new(seed)?;
        self.networks.insert(name, context);
        Ok(())
    }
    
    pub fn route_operation(&self, operation: Operation) -> Result<NetworkContext> {
        let target_network = self.routing_rules.determine_network(&operation)?;
        self.networks.get(&target_network)
            .ok_or(NetworkError::NetworkNotFound(target_network))
    }
}
```

### Network Migration

```rust
// Migrate between network seeds
pub async fn migrate_network(
    old_seed: NetworkSeed,
    new_seed: NetworkSeed,
    migration_strategy: MigrationStrategy
) -> Result<()> {
    // Phase 1: Dual network operation
    let old_network = NetworkContext::connect(old_seed).await?;
    let new_network = NetworkContext::connect(new_seed).await?;
    
    // Phase 2: Data migration
    match migration_strategy {
        MigrationStrategy::Gradual => {
            migrate_data_gradually(&old_network, &new_network).await?;
        }
        MigrationStrategy::Atomic => {
            migrate_data_atomically(&old_network, &new_network).await?;
        }
    }
    
    // Phase 3: Network switch
    switch_primary_network(new_seed).await?;
    
    // Phase 4: Cleanup
    cleanup_old_network(old_seed).await?;
    
    Ok(())
}
```

### Cross-Network Communication

```rust
// Secure cross-network bridge
pub struct NetworkBridge {
    source_network: NetworkId,
    target_network: NetworkId,
    bridge_authentication: BridgeAuth,
}

impl NetworkBridge {
    pub async fn relay_message(&self, message: CrossNetworkMessage) -> Result<Response> {
        // Validate message authorization
        self.validate_cross_network_auth(&message)?;
        
        // Establish secure tunnel
        let tunnel = self.create_secure_tunnel().await?;
        
        // Relay message with encryption
        let encrypted_message = self.encrypt_for_target(&message)?;
        let response = tunnel.send_message(encrypted_message).await?;
        
        Ok(self.decrypt_response(response)?)
    }
}
```

## Troubleshooting Network Issues

### Common Problems

**Peer Discovery Failures**
```rust
// Diagnose peer discovery issues
pub fn diagnose_peer_discovery(network_seed: &NetworkSeed) -> DiagnosticReport {
    let network_id = derive_network_id(&get_dna_hash(), network_seed);
    
    // Check bootstrap connectivity
    let bootstrap_status = test_bootstrap_connectivity(&network_id);
    
    // Verify network seed correctness
    let seed_validation = validate_network_seed(network_seed);
    
    // Analyze peer availability
    let peer_analysis = analyze_peer_availability(&network_id);
    
    DiagnosticReport {
        bootstrap_status,
        seed_validation,
        peer_analysis,
        recommendations: generate_recommendations(),
    }
}
```

**Network Partitioning**
```rust
// Detect and resolve network partitions
pub async fn handle_network_partition(context: &NetworkContext) -> Result<()> {
    // Detect partition
    let partition_detected = detect_partition_indicators(context).await?;
    
    if partition_detected {
        // Attempt partition healing
        let healing_strategy = determine_healing_strategy(context)?;
        execute_healing_strategy(healing_strategy).await?;
        
        // Monitor partition recovery
        monitor_partition_recovery(context).await?;
    }
    
    Ok(())
}
```

## Related Concepts

- **[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/technical-concepts/core-primitives/dna|DNA]]** - Application blueprint that uses network seeds
- **[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/technical-concepts/core-primitives/dht|DHT]]** - Distributed hash table partitioned by network
- **[[peer-discovery|Peer Discovery]]** - Process of finding network participants
- **[[bootstrap|Bootstrap]]** - Initial network connection mechanism
- **[[conductor|Conductor]]** - Runtime that manages network connections

## External Resources

- [Holochain Networking Documentation](https://developer.holochain.org/concepts/networking/)
- [DHT Network Topology](https://blog.holochain.org/dht-deep-dive/)
- [Peer Discovery Protocols](https://developer.holochain.org/concepts/peer_discovery/)
- [Network Security Best Practices](https://developer.holochain.org/resources/security/)
