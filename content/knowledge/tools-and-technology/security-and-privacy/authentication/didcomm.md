---
title: DIDComm
description: A secure, private communication protocol built on Decentralized Identifiers (DIDs)
tags:
  - authentication
  - cryptography
  - decentralization
  - messaging
  - privacy
related pages:
  - "[[knowledge/tools-and-technology/security-and-privacy/authentication/decentralized-identifiers|Decentralized Identifiers (DIDs)]]"
---

## Overview

DIDComm is an open protocol for secure, private, decentralized communication built on [[decentralized-identifiers|Decentralized Identifiers (DIDs)]]. It enables entities identified by DIDs to establish confidential, ongoing connections without requiring usernames, passwords, or centralized infrastructure.

DIDComm lets people and software use DIDs to communicate securely and privately across various channels: the web, email, mobile push notifications, QR codes, Bluetooth, message queues, and more.

## Core Features

### Decentralization

- Fully decentralized with no central infrastructure or control
- No reliance on centralized identity providers or authorities
- Direct peer-to-peer communication between parties

### Security

- End-to-end encryption using cryptographic material from DID documents
- Authentication based on DID verification methods
- Non-repudiation capabilities through digital signatures

### Privacy

- Connections established without "phoning home" to central servers
- Direct encrypted communication without middlemen
- Minimizes data collection and correlation

### Transport Independence

- Works over HTTPS, WebSockets, Bluetooth, and other transports
- Message format remains consistent regardless of transport
- Enables offline messaging and store-and-forward patterns

## Architecture

DIDComm uses a layered architecture:

1. **Transport Layer**: Handles the actual movement of messages (HTTP, WebSockets, Bluetooth, etc.)
2. **Message Layer**: Provides encryption, authentication, and message structure
3. **Protocol Layer**: Defines the semantics and workflows for specific use cases

## Message Structure

DIDComm messages are typically JSON objects with specific properties:

```json
{
  "id": "1234567890",
  "type": "https://didcomm.org/basicmessage/2.0/message",
  "from": "did:example:alice",
  "to": ["did:example:bob"],
  "created_time": 1547770000,
  "body": {
    "content": "Hello, Bob!"
  }
}
```

These messages are then encrypted using the recipient's public key found in their DID document.

## Protocols

DIDComm protocols enable trusted interactions between parties. These support activities like:

- Secure messaging
- Verifiable credential exchange
- Buying and selling
- Scheduling
- Escrow
- Bidding
- Ticketing

Protocols are defined in a standardized way, allowing for interoperability between different implementations.

## Implementations

Several implementations of DIDComm exist across different programming languages:

- JavaScript/TypeScript
- Python
- Rust
- Go
- .NET

These implementations allow developers to integrate DIDComm into their applications without having to implement the cryptographic primitives themselves.

## Applications

DIDComm can be used for a wide range of applications:

### Verifiable Credentials

- Issuance, presentation, and verification of credentials
- Selective disclosure of credential attributes
- Credential revocation checking

### Human Communication

- Secure messaging applications
- Group chats with end-to-end encryption
- Organizational communication

### Business Transactions

- Contract negotiation and signing
- Payment authorization
- Supply chain communication

## Getting Started

To start using DIDComm:

1. Create DIDs for the communicating parties
2. Publish DID documents with appropriate verification methods and service endpoints
3. Implement or use a DIDComm library for your programming language
4. Define or use existing protocols for your specific use case
5. Exchange messages using the appropriate transport

## Community

DIDComm is developed and maintained by an active community:

- DIDComm Users Group: For implementers and users of DIDComm
- DIDComm Working Group: For those contributing to the specification

## Relationship with DIDs

DIDComm relies on DIDs as its foundation:

- DIDs provide the identifiers for the communicating parties
- DID documents contain the cryptographic material needed for secure communication
- DID resolution is used to discover communication endpoints and keys
