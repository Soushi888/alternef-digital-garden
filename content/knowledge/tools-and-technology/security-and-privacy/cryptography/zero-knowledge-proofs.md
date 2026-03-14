---
title: Zero-Knowledge Proofs
description: Zero-Knowledge Proofs are a type of cryptographic proof that allows one party to prove to another party that they know a secret without revealing the secret itself.
aliases:
  - ZKPs
tags: ["cryptography", "security", "privacy", "zero-knowledge"]
date: 2025-02-15
updated: 2026-03-13

---

A zero-knowledge proof (ZKP) is a cryptographic protocol in which a prover convinces a verifier that a statement is true without revealing any information beyond the truth of the statement itself. The classic example: proving knowledge of a maze solution without tracing the path.

## Core Properties

Three properties define a valid ZKP:

- **Completeness**: if the statement is true, an honest prover can convince any honest verifier.
- **Soundness**: a dishonest prover cannot convince the verifier that a false statement is true (except with negligible probability).
- **Zero-knowledge**: the verifier learns nothing beyond the validity of the statement.

## Types

### Interactive vs Non-Interactive
In interactive ZKPs, prover and verifier exchange multiple rounds of messages. Non-interactive ZKPs (NIZKs) compress this into a single message using a shared reference string, enabling proofs that can be verified asynchronously.

### zk-SNARKs
Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge. Proofs are small and fast to verify, but require a trusted setup ceremony to generate the public parameters.

### zk-STARKs
Zero-Knowledge Scalable Transparent Arguments of Knowledge. No trusted setup required; security assumptions are transparent and post-quantum resistant. Proofs are larger than SNARKs but eliminate the trust assumption from parameter generation.

## Applications

- **Blockchain privacy**: Zcash uses zk-SNARKs to shield transaction amounts and addresses while proving their validity on-chain.
- **Layer-2 scaling**: ZK-rollups (zkSync, Starknet) prove the validity of batched transactions off-chain, letting Ethereum verify them cheaply.
- **Identity and credentials**: proving you meet a requirement (age, citizenship, membership) without revealing the underlying data.
- **Voting systems**: proving a vote was cast correctly without revealing the voter's choice.

## Relationship to Host-Proof Hosting

The term "zero-knowledge" is sometimes used loosely for [[host-proof-hosting|host-proof hosting]] architectures. The conceptual overlap: in both cases, a third party learns nothing about the underlying data. The mechanism differs: ZKPs are cryptographic proof systems; host-proof hosting is an architectural pattern relying on client-side encryption rather than formal proofs.

## Related Topics

- [[knowledge/tools-and-technology/security-and-privacy/cryptography/index|Cryptography]]
- [[asymmetric-encryption|Asymmetric Encryption]]
- [[elliptic-curve-cryptography|Elliptic Curve Cryptography]]
- [[merkle-trees|Merkle Trees]]
- [[hash-table|Hash Table]]
- [[hash-tree|Hash Tree]]
- [[hash-chain|Hash Chain]]
- [[host-proof-hosting|Host-Proof Hosting]]
