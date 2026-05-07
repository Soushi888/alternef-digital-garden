---
title: "Iroh"
date: 2026-05-07
description: "A modular peer-to-peer networking stack in Rust that enables direct device-to-device connections using public key identifiers instead of IP addresses."
tags: ["programming", "peer-to-peer", "networking", "protocols", "rust", "distributed-systems"]
---

Iroh is a modular peer-to-peer networking library written in Rust, developed by [n0](https://n0.computer/). Rather than dialing IP addresses, Iroh lets you dial public keys, making it possible to connect any two devices directly, regardless of network topology.

## What is Iroh?

Iroh is an open-source networking stack that solves the fundamental challenge of connecting two devices that may be behind NAT, firewalls, or on mobile networks. It provides a reliable abstraction over QUIC that handles connection establishment, relay fallback, and direct connection migration transparently.

The core idea: identify peers by their ed25519 public key, not their IP address. This decouples identity from location and makes connections resilient to IP changes.

## Core Problem

Modern networks are hostile to peer-to-peer communication:

- **NAT (Network Address Translation)** hides devices behind shared IPs, making inbound connections impossible without port forwarding.
- **Firewalls** block unsolicited traffic on most ports.
- **Mobile networks** frequently change IP addresses and apply symmetric NAT.

Traditional solutions require a relay server that all traffic flows through, introducing latency, cost, and a central point of failure. Iroh solves this by attempting direct connections first and falling back to relay only when necessary, then actively working to upgrade back to a direct path.

## Architecture

### QUIC Foundation

Iroh is built on QUIC, a modern transport protocol that provides:

- Multiplexed streams over a single connection
- Built-in TLS 1.3 encryption
- Low-latency handshakes
- Connection migration (IP changes do not drop the connection)

Iroh uses ed25519 keypairs for node identity and authentication, so no certificate management is required. Each node's public key is its permanent identifier.

### Magic Sockets

The `MagicSock` abstraction is Iroh's core routing layer. It maintains awareness of known peer addresses, manages relay connections, and switches transparently between relay-mediated and direct QUIC paths. From the application's perspective, it is just a UDP socket.

### Relay and Holepunching

Connection establishment follows a three-stage process:

1. **Relay connection**: Both peers establish HTTPS connections to a relay server, which upgrades to a persistent WebSocket. The relay forwards packets between peers immediately.
2. **Holepunching**: While relayed, Iroh coordinates UDP holepunching. Both peers attempt to send packets directly to each other's observed public addresses.
3. **Direct migration**: Once a direct UDP path is confirmed, QUIC migrates its datagrams to that path and the relay connection is bypassed.

Relay servers are designed to work through TLS inspection proxies. Users can deploy dedicated relay servers for production environments.

## Modular Protocol Stack

Iroh's base layer provides raw QUIC connections. Higher-level protocols are composable on top:

### iroh-blobs

Content-addressed data transfer using BLAKE3 hashing. Transfers are resumable and every chunk is verifiable, making it suitable for large file sync, backup, and distribution use cases.

### iroh-gossip

Topic-based broadcast messaging using epidemic broadcast trees, implementing HyParView for membership and PlumTree for message dissemination. Suitable for pub/sub, real-time feeds, and distributed event systems.

### iroh-docs

Real-time, multi-writer key-value synchronization. Allows multiple nodes to write to a shared document and converge to a consistent state. Uses a CRDT-inspired approach internally.

## Discovery Mechanisms

Iroh supports pluggable peer discovery:

- **DNS** — bootstrap via a known DNS record
- **mDNS** — local network discovery
- **pkarr** — distributed key-to-address publishing over the BitTorrent DHT
- **BitTorrent DHT** — broad P2P discovery
- **Custom** — arbitrary discovery backends

## Platform Support

Iroh runs across a wide range of environments:

| Category | Platforms |
|---|---|
| Desktop | Windows, macOS, Linux |
| Mobile | Android, iOS |
| Embedded | ESP32, Raspberry Pi |
| Transports | Bluetooth, LAN, Wi-Fi, cellular |

## Comparison to libp2p

Iroh occupies similar territory to [[distributed-systems/peer-to-peer|libp2p]] but with a narrower, more opinionated scope. Where libp2p aims to be a universal modular networking framework supporting many transports and protocols, Iroh focuses on making one thing work extremely well: reliable, direct QUIC connections between any two peers. This makes the API surface smaller and the "just works" experience more consistent.

## Use Cases

- Direct file sync and backup between personal devices
- Distributed applications that avoid central server infrastructure
- Collaborative tools requiring real-time data synchronization
- IoT and embedded systems that need connectivity across heterogeneous networks
- Privacy-preserving communication where users control their own relay infrastructure

## Related Topics

- [[distributed-systems/peer-to-peer|Peer-to-Peer Networks]]
- [[distributed-systems/bittorrent|BitTorrent Protocol]]
- [[distributed-systems/conflict-free-replicated-data-types|CRDTs]]
- [[user-datagram-protocol|UDP Protocol]]
- [[tcp-ip|TCP/IP Protocol Suite]]

## References

- [Iroh website](https://www.iroh.computer/)
- [GitHub: n0-computer/iroh](https://github.com/n0-computer/iroh)
- [n0 company](https://n0.computer/)
