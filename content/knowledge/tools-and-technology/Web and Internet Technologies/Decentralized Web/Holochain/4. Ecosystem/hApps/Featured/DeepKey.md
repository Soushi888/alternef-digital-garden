#holochain/tools 

In [[Outils et Technologie/DWeb/Holochain/Holochain]], DeepKey is a foundational application ([[hApp]]) designed to provide a decentralized public key infrastructure (DPKI) for managing cryptographic keys associated with Holochain conductors and applications. It aims to address the challenges of key management in a distributed and decentralized environment, similar to centralized services like Keybase, but with a focus on decentralization and security.

DeepKey allows users to manage their "keyset," which includes adding and removing devices and public/private key pairs. It tracks the keys for happs (Holochain applications) installed on each device under the keyset for that device. Given the complexity and potential for human error in managing cryptographic keys, DeepKey provides tools to help users manage real-world issues such as lost or stolen keys or devices.

Key features of DeepKey include:

- Registering keys under the authority of a keyset.
- Replacing keys with new ones.
- Revoking keys or declaring them dead.
- Associating multiple devices under unified keyset management.
- Checking the validity of a key.
- Storing private instructions to rebuild app keys from a master seed to reestablish authority after data loss.
- Social management of keys through m of n signatures, with the initial default being a 1 of 1 signature using a revocation key.

DeepKey is essential for all other Holochain app keys, making it the first happ every conductor must install. It relies on Holochain's secure keystore, Lair, to function effectively. A common call to DeepKey is `key_state((Key, Timestamp))` to query the validity of a key at a particular time.

DeepKey's workflows include injecting seeds (master, revocation, device) and providing a UI for password encrypting and exporting seeds for off-device storage. It also handles the generation of new agent keys in Lair for each new Holochain app installed, storing the derivation and app DNA used. Other workflows include replacing compromised keys, deleting or revoking abandoned keys, generating invitations for new devices to join your keyspace, and approving key changes or deletions, either locally with a revocation key or remotely as a social signing request.

DeepKey's implementation is crucial for Holochain's agent-centric architecture, allowing keys to be associated with authorship and control of data rather than the data itself. This approach enables the legitimate author to replace or revoke keys at any time using a master seed and/or revocation key that are never stored within applications, enhancing the security and flexibility of key management in the Holochain ecosystem [1](https://github.com/holochain/deepkey#:~:text=Deepkey%20is%20a%20foundational%20app,with%20holochain's%20secure%20keystore%2C%20Lair.)[2](https://medium.com/h-o-l-o/a-tour-of-holos-initial-apps-45b00f7e9054).

[GitHub - holochain/deepkey: DeepKey happ](https://github.com/holochain/deepkey)
> DeepKey happ. Contribute to holochain/deepkey development by creating an account on GitHub.
