---
title: "Shamir's Secret Sharing"
description: "A secret custody primitive that splits a secret into n shares with threshold k, distributing who holds the secret. Full reconstruction is required to use it, creating a brief exposure window."
aliases:
  - SSS
  - Shamir Secret Sharing
tags:
  - cryptography
  - security
  - privacy
  - secret-sharing
date: 2026-03-17
updated: 2026-03-17
draft: false
---

Shamir's Secret Sharing (SSS) is a cryptographic scheme developed by Adi Shamir in 1979 that allows a secret to be divided into multiple parts, called **shares**, distributed among participants. The secret can only be reconstructed when a predefined **threshold** number of shares are combined. Fewer than the threshold reveal no information about the secret, ensuring **perfect secrecy**.

## Core Principle

SSS uses polynomial interpolation over finite fields. The secret is encoded as the constant term of a polynomial of degree $k-1$, where $k$ is the threshold. $n$ shares (points on the polynomial) are generated, and any $k$ of them can reconstruct the original secret via Lagrange interpolation.

Given a threshold of $k$ and $n$ total shares:

- A polynomial $f(x)$ of degree $k-1$ is chosen randomly such that $f(0) = \text{secret}$
- $n$ points $(x_i, f(x_i))$ are computed and distributed as shares
- Any $k$ points uniquely determine the polynomial (and thus the secret)
- Any fewer than $k$ points are mathematically insufficient to determine $f(0)$

## Key Properties

- **Information-theoretic security**: Even with $k-1$ shares, the secret remains completely undetermined. Unlike computational security (which relies on the difficulty of breaking an algorithm), this guarantee holds unconditionally.
- **Minimal**: Each share is the same size as the original secret.
- **Extensible and dynamic**: Shares can be added or removed without affecting other shares or requiring secret reconstruction.
- **Flexible**: Participants can be assigned different numbers of shares based on authority level. A participant holding 3 shares in a (3,5) scheme can reconstruct the secret alone.

## Custody vs. Coordination

SSS distributes the *custody* of a secret: who holds it. This is distinct from distributing *authorization* to act. When shares are combined and the secret is reconstructed, that full secret necessarily exists in one place (one process, one device) for the duration of the operation.

This reconstruction window is the defining constraint. Compare with [[multi-signature|Multi-Signature]], where no secret ever exists in combined form: keys remain independent and never merge. Multisig distributes authorization; SSS distributes custody.

[[threshold-cryptography|Threshold Cryptography]] resolves this tension: it distributes key material like SSS but performs computations cooperatively without ever reassembling the full secret.

## Use Cases

- **Cryptocurrency recovery phrases**: seed phrases can be split so that no single backup location holds the full key
- **Encryption keys and vault access codes**: distribute master key fragments across trustees or hardware devices
- **Password manager master keys**: threshold recovery schemes for high-value credentials
- **Multi-party key management**: organizational secrets held collectively, requiring quorum agreement to unlock

## Limitations

- **No built-in verification**: SSS provides no way to detect corrupted or forged shares (this is addressed by Verifiable Secret Sharing, a separate scheme)
- **Single point of failure during operations**: the secret must be assembled in full at one location during both splitting and reconstruction, creating a brief window of exposure
- **No authentication**: a participant with a valid share cannot prove it is valid without revealing it

## Related Topics

- [[rivest–shamir–adleman|Rivest-Shamir-Adleman]]: Adi Shamir also co-created RSA (both published in 1979)
- [[multi-signature|Multi-Signature]]: distributes authorization rather than custody; no reconstruction window
- [[threshold-cryptography|Threshold Cryptography]]: the evolution that eliminates the reconstruction window by computing cooperatively on shares
- [[zero-knowledge-proofs|Zero-Knowledge Proofs]]: Verifiable Secret Sharing builds on ZK techniques to address SSS's verification limitation
- [[host-proof-hosting|Host-Proof Hosting]]: SSS can split encryption keys across storage providers so no single host can access user data
- [[knowledge/tools-and-technology/security-and-privacy/cryptography/index|Cryptography]]

## References

- Shamir, A. (1979). "How to Share a Secret." *Communications of the ACM*, 22(11), 612-613.
- PHP implementation: [teqneers/shamir](https://github.com/teqneers/shamir)
- [Shamir's Secret Sharing Calculator](https://iancoleman.io/shamir/)
