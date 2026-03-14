---
title: "Host-Proof Hosting"
description: "A security architecture where the server stores only ciphertext: encryption and decryption happen exclusively on the client, so the host can never access user data."
aliases:
  - "host-proof"
  - "zero-knowledge hosting"
  - "client-side encryption hosting"
tags:
  - security
  - privacy
  - cryptography
  - decentralization
  - data-sovereignty
date: 2026-03-13
draft: false
---

Host-proof hosting is a security architecture in which a service provider stores only encrypted data and has no ability to read its plaintext. All encryption and decryption happens on the client, meaning the host is structurally excluded from accessing user content regardless of intent or legal compulsion.

## How It Works

1. **Key generation on the client**: encryption keys are derived from a user passphrase or generated locally; they never leave the user's device.
2. **Client-side encryption**: data is encrypted before being transmitted to the server, using the locally held key.
3. **Server stores ciphertext only**: the provider receives and stores an opaque blob with no knowledge of its contents.
4. **Client-side decryption**: only the key holder can retrieve and decrypt the data; the server participates only as a dumb storage layer.

### Cryptographic Mechanisms

The pipeline from passphrase to stored ciphertext typically involves three layers:

**Key derivation.** The user's passphrase is fed into a key derivation function (KDF) along with a salt to produce a master key. KDFs are designed to be slow and resource-intensive, making brute-force attacks expensive. Common choices:

- **PBKDF2**: applies HMAC-SHA-256 iteratively (OWASP recommends 600,000 iterations). Compute-hard only; can be parallelized on GPUs, making it more vulnerable to offline brute-force than memory-hard alternatives.
- **Argon2id**: winner of the 2015 Password Hashing Competition. Allocates a large memory block (typically 64 MiB) that each iteration must traverse, making GPU and ASIC attacks far more expensive. OWASP's primary recommendation as of 2023.
- **scrypt**: memory-hard and sequential; predecessor to Argon2, used in Cryptomator and some cryptocurrency wallet implementations.

**Key wrapping.** A random symmetric key is generated via a cryptographically secure pseudorandom number generator (CSPRNG) and then encrypted (wrapped) with the KDF-derived master key. This Protected Symmetric Key is stored server-side. On each new device, the client re-derives the master key from the passphrase, unwraps the symmetric key locally, and decrypts data without the server ever seeing the raw key. This pattern enables multi-device access without transmitting the master key.

**Bulk encryption.** Data is encrypted with [[advanced-encryption-standard|AES-256]] in GCM or CBC mode. Each file or record typically receives its own unique cipher key, itself encrypted with the user's symmetric key.

**Asymmetric key exchange.** When sharing data with other users, [[asymmetric-encryption|asymmetric encryption]] is layered on top: the sharer encrypts the symmetric key with the recipient's public key. Only the recipient's private key (held locally) can unwrap it. Tresorit uses RSA-4096 for this exchange; Proton Mail and modern OpenPGP implementations use elliptic-curve variants.

## Why It Matters

- **Subpoena and breach resistance**: even if the provider is compelled by law or compromised by attackers, there is nothing intelligible to hand over.
- **Eliminates the need to trust the provider**: users do not need to rely on privacy policies or corporate goodwill; the architecture enforces the guarantee.
- **Aligns with data sovereignty**: users retain meaningful control over their information independently of where it is hosted.

## Distinguishing from End-to-End Encryption

Host-proof hosting and end-to-end encryption (E2EE) address different threat surfaces and are frequently conflated.

**E2EE** secures data *in transit* between two parties. The defining property: only the sender and intended recipient hold decryption keys. The server acts as a relay and cannot read messages passing through it. E2EE says nothing about what happens to data *at rest* if the server stores a copy.

**Host-proof hosting** secures data *at rest* on the server. The defining property: the server stores only opaque ciphertext and has no decryption capability. It says nothing inherently about transit security, though TLS is always layered on top in practice.

A service can have one property without the other:

| | Host can read stored data | Host cannot read stored data |
|---|---|---|
| **TLS only (not E2EE)** | Traditional cloud storage (Google Drive, Dropbox default) | Rare in practice |
| **E2EE in transit** | Enterprise chat with compliance archiving; some "encrypted" cloud services | Signal, Bitwarden, Standard Notes, Tresorit, Proton Mail (Proton-to-Proton) |

Proton Mail illustrates the nuance: messages *between* Proton users are both E2EE and host-proof. Messages *arriving from external senders* (Gmail, Yahoo) reach Proton's servers via TLS only, then Proton applies zero-access re-encryption before storing them. After ingestion the server cannot read the content, but there is a brief plaintext window during processing. Subject lines, timestamps, and sender/recipient addresses are not encrypted by OpenPGP regardless.

## Examples

- **[[pretty-good-privacy|PGP / GPG]]** (email and files): the original client-side encryption standard; the sender encrypts with the recipient's public key, and no intermediary can read the message.
- **Standard Notes** (notes) and **Bitwarden** (passwords): client-side encryption before sync; providers hold encrypted blobs. Both are open-source and have received third-party cryptographic audits.
- **Signal** (messaging): end-to-end encryption means the Signal servers relay ciphertext they cannot read. Messages are purged from the server after delivery.
- **Proton Mail** (email): messages between Proton users are encrypted with keys held by the recipient, not the server.
- **Tresorit** (file storage): each file receives a unique random key before upload; the server sees only sequentially numbered ciphertext blocks. Uses AES-256 and RSA-4096 for key exchange. Fared best in ETH Zurich's 2024 cryptographic analysis of five E2EE cloud storage providers.
- **SpiderOak** (file backup): encrypts file names and directory structure in addition to content. Uses PBKDF2 with 16,384 iterations and a random salt. Voluntarily dropped "zero-knowledge" terminology in 2017 to avoid conflation with zero-knowledge proof systems.
- **iCloud Advanced Data Protection** (Apple, opt-in): when enabled, protects 23 of 26 iCloud data categories. Notable exclusions: iCloud Mail, Contacts, and Calendars, excluded for interoperability with open IMAP/CardDAV/CalDAV standards. In 2025, Apple disabled ADP for UK users rather than comply with a government order to create a backdoor.
- **Cryptomator** (overlay encryption): open-source tool that adds client-side encryption on top of any cloud provider (Dropbox, Google Drive, OneDrive). Uses AES-256-GCM for content, AES-SIV for file names, and scrypt for key derivation. No account or proprietary server required.
- **Holochain DHT entries**: application-layer encryption applied before publishing to the distributed hash table gives agents control over who can read their data.

## Verification and Trust

Marketing terms like "zero-knowledge" and "end-to-end encrypted" are used inconsistently across the industry. A 2024 academic study by ETH Zurich found severe cryptographic vulnerabilities in four of five major "E2EE" cloud storage providers tested, collectively affecting over 22 million users. Assessing whether a service genuinely implements host-proof hosting requires looking past the label.

**Signals that indicate genuine implementation:**

- **Open-source client code**: the encryption path (key derivation, encryption, decryption) must be auditable in source code. A closed-source client cannot be verified to avoid exfiltrating keys before encryption. This is the single most important criterion.
- **Published cryptographic protocol specification**: a technical whitepaper or protocol document describing key management architecture, not marketing language.
- **Independent cryptographic audits**: audits by firms such as Cure53, Trail of Bits, NCC Group, or Securitum should specifically cover the cryptographic implementation, not just network penetration testing. Bitwarden and Standard Notes publish audit results including specific findings and remediations.
- **Reproducible builds**: deterministic compilation from published source to distributed binary, verifiable via hash comparison. Without this, even an open-source codebase could ship a modified binary to users.
- **No server-side plaintext processing**: if the service can search your content, apply AI features to it, or reset your password without data loss, it is not host-proof.

**Red flags:**

- Closed-source client application
- No published cryptographic audits (network penetration tests do not substitute)
- Password reset that restores data access (implies a server-held recovery key or key escrow)
- Metadata stored unencrypted alongside vault contents (LastPass stored vault URLs in plaintext; those were exposed in the 2022 breach and later used to target users)
- Provider has not responded to published vulnerability research

**Semantic note.** "Zero-knowledge" in hosting marketing is borrowed from [[zero-knowledge-proofs|zero-knowledge proofs]] in cryptography but means something entirely different in this context. It conveys the idea that the server cannot learn anything about stored content, but the term carries no technical specification. A 2026 academic analysis of major password managers found that all three examined made "Zero Knowledge Encryption" claims while having implementation gaps that partially undermined the guarantee.

## Tradeoffs

- **Key loss is irreversible**: there is no "forgot password" for your own encryption key. Losing access to the key means permanent loss of the data.
- **No server-side features on plaintext**: search indexing, server-side deduplication, and administrative recovery are not possible without a decryption capability.
- **Complexity shifts to the client**: robust key management, backup, and rotation become the user's responsibility.
- **Metadata remains visible**: file sizes, access timestamps, directory structure, and usage patterns are typically visible to the host even when content is fully encrypted. The ETH Zurich 2024 study found that none of the five providers tested adequately protected metadata.
- **Client-side code injection**: in browser-based implementations, the server delivers the JavaScript that performs encryption. A compromised or malicious server can serve modified code that exfiltrates keys before encryption occurs. Native applications with hardware-backed key storage are categorically more resistant to this attack.
- **Key backup dilemma**: recovery mechanisms are necessary to avoid permanent data loss if a device is lost, but any copy of key material is itself a target. A compromised backup exposes all data protected by that key, including previously stored data.

## Related Topics

- [[zero-knowledge-proofs|Zero-Knowledge Proofs]]
- [[asymmetric-encryption|Asymmetric Encryption]]
- [[advanced-encryption-standard|Advanced Encryption Standard]]
- [[pretty-good-privacy|Pretty Good Privacy]]
- [[didcomm|DIDComm]]
- [[decentralized-application|Decentralized Application]]
- [[knowledge/tools-and-technology/security-and-privacy/index|Security and Privacy]]
