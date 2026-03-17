---
title: Multi-Signature
date: 2025-02-15
updated: 2026-03-17
description: "An authorization coordination primitive where each party holds an independent key (no secret is split or reconstructed). The threshold logic lives in the verification layer, not in the key material."
aliases:
  - Multisig
tags: ["cryptography", "security", "privacy", "authorization", "distributed-systems"]
---

Multi-signature (multisig) is an authorization coordination primitive in which multiple independent parties each hold their own key and must co-sign an operation before it is considered valid. No secret is split or reconstructed: each participant's key remains entirely in their custody throughout the process. The threshold logic lives in the verification layer (a protocol rule, a smart contract, an application policy), not in the key material itself.

## What Makes Multisig Different

The defining contrast is with [[shamirs-secret-sharing|Shamir's Secret Sharing]]. SSS distributes *custody* of a single secret by splitting it; to use that secret, the pieces must be reassembled in one place. Multisig distributes *authorization* across independent actors: nothing is ever assembled. Each party holds a complete, independent key that signs independently, and the protocol verifies that enough valid signatures are present.

There is no reconstruction window. Keys never exist in the same place at the same time.

## How It Works

1. **Independent key generation**: each participant generates their own keypair. No coordination required; each key is generated and held locally.
2. **Policy registration**: the threshold policy is recorded in the verification layer (a multisig script on Bitcoin, a smart contract on Ethereum, an application rule). This policy defines which public keys are participants and what threshold k-of-n is required.
3. **Independent signing**: each authorized participant signs the transaction or message using their own private key. Signing can happen in any order and at any time.
4. **Threshold verification**: the receiving system checks whether k valid signatures from recognized public keys are present. If yes, the operation is approved.

## The Fundamental Difference from Secret Sharing

| Property | Shamir's Secret Sharing | Multi-Signature |
|----------|------------------------|-----------------|
| What is distributed | One secret split into shares | Independent keys (no shared secret) |
| Where threshold logic lives | In the math (polynomial reconstruction) | In the verification layer (protocol/contract) |
| Reconstruction required | Yes (shares must be combined) | No (signatures are independent) |
| Key material during use | Reassembled at one point | Each key stays with its owner |
| Applies to | Any secret (keys, passwords, data) | Signature schemes only |

## Applications

- **Cryptocurrency treasury management**: 2-of-3 or 3-of-5 multisig for organizational funds, so no single signer can unilaterally move assets (Bitcoin P2SH, Ethereum Gnosis Safe)
- **Smart contract governance**: multisig as access control for administrative operations; protocol upgrades, parameter changes, and treasury actions require threshold agreement
- **Hardware wallet redundancy**: distribute signing authority across multiple hardware devices; loss of one device does not compromise funds or require recovery
- **Organizational signing policies**: code signing, certificate issuance, and deployment approval workflows requiring multiple authorized parties
- **Shared resource authorization**: in Holochain, capability grants can be structured so k-of-n agents must authorize access to a shared resource

## Tradeoffs

- **Coordination overhead**: every operation requires k parties to be available and willing to sign; for time-sensitive operations, this creates latency
- **No built-in key recovery**: each participant is fully responsible for their own key; if a participant loses their key, their share of the authorization is gone (SSS can serve as a recovery mechanism for individual keys)
- **Signature aggregation**: naive multisig produces k separate signatures that must all be verified; Schnorr-based schemes (MuSig2, FROST) aggregate into one signature, recovering efficiency at added implementation complexity
- **No encryption use case**: multisig applies only to signature schemes and cannot directly protect encrypted data (for that, use threshold decryption)

## Related Topics

- [[shamirs-secret-sharing|Shamir's Secret Sharing]]
- [[threshold-cryptography|Threshold Cryptography]]
- [[host-proof-hosting|Host-Proof Hosting]]
- [[zero-knowledge-proofs|Zero-Knowledge Proofs]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/capability-tokens|Capability Tokens]] (Holochain)
- [[knowledge/tools-and-technology/security-and-privacy/cryptography/index|Cryptography]]
