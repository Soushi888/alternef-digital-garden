---
title: Decentralized Identifiers (DIDs)
description: A new type of identifier that enables verifiable, decentralized digital identity
tags:
  - authentication
  - cryptography
  - decentralization
  - identity
  - privacy
related pages:
  - "[[knowledge/tools-and-technology/security-and-privacy/authentication/didcomm|DIDComm]]"
  - "[[knowledge/tools-and-technology/decentralized-web/index|Decentralized Web]]"
---

## Overview

Decentralized Identifiers (DIDs) are a new type of identifier that enables verifiable, decentralized digital identity. A DID refers to any subject (e.g., a person, organization, thing, data model, abstract entity, etc.) as determined by the controller of the DID.

Unlike traditional federated identifiers, DIDs are designed to be decoupled from centralized registries, identity providers, and certificate authorities. The design enables the controller of a DID to prove control over it without requiring permission from any other party.

## DID Structure

A DID is a simple text string consisting of three parts:

1. The `did` URI scheme identifier
2. The identifier for the DID method
3. The DID method-specific identifier

``` texte
did:example:123456789abcdefghi
```

## DID Documents

Each DID resolves to a DID document. A DID document contains information associated with the DID, such as ways to cryptographically authenticate the DID controller.

Example of a DID document:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:example:123456789abcdefghi",
  "authentication": [{
    "id": "did:example:123456789abcdefghi#keys-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:example:123456789abcdefghi",
    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  }]
}
```

## Core Components

### DID Subject

The entity identified by the DID. It can be a person, organization, thing, data model, abstract entity, etc.

### DID Controller

The entity that has the ability to make changes to a DID document. A DID controller may be the DID subject or a delegate acting on their behalf.

### Verification Methods

Mechanisms that can be used to authenticate or authorize interactions with the DID subject. These typically include public keys.

### Services

Means of communicating or interacting with the DID subject or associated entities. Services listed in a DID document can include authentication services, communication services, or any other type of service the DID subject wishes to advertise.

## DID Methods

DID methods are the mechanisms by which a particular type of DID and its associated DID document are created, resolved, updated, and deactivated. Each DID method is defined in a separate specification that conforms to the requirements in the DID Core specification.

Some popular DID methods include:

- did:web
- did:key
- did:ethr
- did:sov
- did:ion

## DID Resolution

DID resolution is the process of retrieving a DID document for a given DID. This process involves:

1. Parsing the DID to determine the DID method
2. Using the method-specific resolution process to retrieve the DID document
3. Validating the DID document according to the rules of the DID method

## Privacy and Security Considerations

### Privacy

- DIDs can be used without revealing personal data
- Different DIDs can be used for different relationships to prevent correlation
- DID documents should avoid including personally identifiable information

### Security

- Verification methods in DID documents enable secure authentication
- Key rotation and revocation mechanisms are essential for long-term security
- Controllers must securely manage private keys associated with DIDs

## Applications

DIDs form the foundation for:

- Self-sovereign identity systems
- Verifiable credentials
- Secure and private communications (via DIDComm)
- Decentralized access control
- Trustless interactions between entities

## Relationship with DIDComm

DIDs provide the identity layer for DIDComm, which is a protocol for secure, private communication between DID-identified entities. DIDComm uses the cryptographic material in DID documents to establish secure communication channels.
