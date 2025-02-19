---
aliases:
  - p2p
  - peer-to-peer
  - pair à pair
  - Pair à Pair
tags:
  - p2p
  - programmation/networking
---
[[Networking]]
[[Distributed System/index]]
[[Web 3]]

### Introduction to Peer-to-Peer Networking

Peer-to-peer (P2P) networking is a decentralized model of network architecture where each participant, known as a "peer," shares resources directly with other peers without going through a central server or authority. This contrasts with traditional client-server models where clients request services from servers.

### Key Characteristics

- **Decentralization**: Unlike centralized networks that rely on a single point of control, P2P networks distribute data across all nodes, making them resilient against failures and censorship.
- **Resource Sharing**: Peers can share various resources such as files, computing power, bandwidth, and storage space directly with one another.
- **Scalability**: As new peers join the network, they not only consume resources but also contribute their own, potentially increasing the overall capacity of the network.
- **Anonymity and Privacy**: The distributed nature of P2P networks can offer increased privacy and anonymity compared to centralized systems, though this depends on the specific implementation.

### Types of P2P Networks

1. **Unstructured P2P Networks**: These networks do not have any specific organization or structure. Nodes randomly connect to each other, and searching for content involves querying many nodes until the desired resource is found.
2. **Structured P2P Networks**: These networks organize nodes following a specific protocol to optimize search efficiency. Examples include Distributed Hash Tables ([[Distributed Hash Table|DHTs]]), which map keys to values stored at particular nodes.
3. **Hybrid P2P Networks**: Combining elements of both structured and unstructured networks, hybrid P2P networks aim to balance efficiency and flexibility.

### Applications of P2P Networking

- **File Sharing**: One of the most common uses of P2P technology is file sharing, allowing users to download and upload files directly between themselves. Examples include BitTorrent and eMule.
- **[[Blockchain]] Technology**: Blockchain, the underlying technology behind cryptocurrencies like Bitcoin, operates on a P2P network where transactions are verified and recorded by participants across the globe.
- **Content Delivery Networks (CDNs)**: Some CDNs use P2P technologies to reduce load on central servers and speed up content delivery by distributing it among users.
- **Voice over IP (VoIP)**: Services like Skype initially utilized P2P technology to enable direct communication between users, reducing reliance on central servers.
- **[[Outils et Technologie/DWeb/Holochain/Holochain]]**: An open-source framework for creating peer-to-peer applications that are secure, reliable, and fast. Holochain enables the development of distributed applications ([[Decentralized Application|dApp]]) that operate on a network of user devices, offering a decentralized alternative to traditional server-based applications. It combines aspects of BitTorrent, Git, and cryptographic signatures to facilitate collaboration, synchronization, and coordination at scale. Holochain's architecture allows for the creation of encrypted P2P networks, ensuring secure and private communication between users. This framework is particularly suited for applications requiring high levels of security, privacy, and resilience, such as energy grids, currency design, and networked applications.

P2P networking is a powerful paradigm for creating robust, scalable, and efficient networks. Its principles underpin some of the most transformative technologies of our time, including Holochain, blockchain and decentralized finance (DeFi).
