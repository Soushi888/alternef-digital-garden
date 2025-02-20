---
aliases: 
tags:
  - programmation/cryptography
---
[GitHub - holochain/lair: secret lair private keystore](https://github.com/holochain/lair)
> secret lair private keystore. Contribute to holochain/lair development by creating an account on GitHub.

The `lair-keystore` in [[Outils et Technologie/DWeb/Holochain/Holochain]] is a component that plays a crucial role in managing cryptographic keys securely. It is part of the Lair project, which is a suite of tools and libraries designed to provide secure cryptographic operations for Holochain and other applications. The `lair-keystore` executable allows for the initialization, configuration, and running of a Lair keystore, which is essential for generating and signing with cryptographically secure keys.

The `lair-keystore` can be used in various ways, including importing seeds for key generation and running a server for managing keys. It is designed to be integrated into client applications through the `lair_keystore_api` crate, providing a way to interact with the keystore programmatically

During normal operation, the Holochain runtime, or conductor, will automatically spawn a `lair` process if it doesn't find one running. This ensures that cryptographic operations, such as key generation and signing, are handled securely and efficiently.

The Lair Keystore has been audited and found to be secure by Least Authority, a leading decentralized security consulting and audit firm. This audit is a testament to the robustness and reliability of the cryptographic operations provided by the `lair-keystore`.

In summary, the `lair-keystore` is a critical component of Holochain's security infrastructure, providing a secure and efficient way to manage cryptographic keys. It supports the generation and signing of keys, ensuring the security and integrity of data within the Holochain ecosystem.
