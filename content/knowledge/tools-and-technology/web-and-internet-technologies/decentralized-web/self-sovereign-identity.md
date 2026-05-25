---
title: Self-Sovereign Identity
date: 2026-05-24
description: A model of digital identity where individuals own and control their identifiers and credentials without relying on central authorities
aliases:
  - Self-Sovereign Identity
  - self-sovereign-identity
  - SSI
tags: ["decentralization", "privacy", "cryptography", "security", "distributed-systems"]
---

## Overview

**Self-Sovereign Identity (SSI)** is a model of digital identity in which individuals or organizations own, control, and present their own credentials without depending on a central identity provider. Instead of logging in through Google or Facebook, users manage cryptographic keys that prove their identity and credentials.

## Core Components

- **Decentralized Identifiers (DIDs)**: W3C standard for creating identifiers anchored to a distributed ledger or other decentralized infrastructure
- **Verifiable Credentials (VCs)**: Cryptographically signed assertions (e.g., "this person is over 18") issued by trusted authorities, held by the subject, and verifiable by any party
- **Digital wallets**: User-controlled applications for storing DIDs and VCs
- **Trust registries**: Distributed lists of trusted credential issuers

## Key Properties

- **Portability**: Credentials work across services without vendor lock-in
- **Selective disclosure**: Share only the minimum necessary (e.g., "over 18" without revealing birthdate)
- **Revocability**: Issuers can revoke credentials while users retain the key
- **Privacy by design**: No correlation across services via shared identifiers

## Related

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/index|Decentralized Web]] — The infrastructure SSI builds on
- [[knowledge/tools-and-technology/security-and-privacy/cryptography/index|Cryptography]] — The cryptographic primitives enabling SSI
- [[knowledge/governance-and-community/index|Governance and Community]] — Identity as a governance and sovereignty concern
