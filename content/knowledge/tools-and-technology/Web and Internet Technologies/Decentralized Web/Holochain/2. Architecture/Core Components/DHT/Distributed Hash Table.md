---
aliases:
  - DHT
  - DHTs
tags:
  - holochain/concepts
  - programmation/database
  - programmation/cryptography
---
[[Outils et Technologie/DWeb/Holochain/Holochain]]

## Distributed [[Hash Table]]
A collection of data stored collectively by many [nodes](https://developer.holochain.org/glossary/#node) in a [peer-to-peer](https://developer.holochain.org/glossary/#peer-to-peer) network. In a DHT, a node retrieves data by address, usually its cryptographic [hash](https://developer.holochain.org/glossary/#hash), by searching for a [peer](https://developer.holochain.org/glossary/#peer) who holds the data. Holochain uses a [validating DHT](https://developer.holochain.org/glossary/#validating-dht) to store [DHT data](https://developer.holochain.org/glossary/#dht-data) and chooses agents to hold data based on the [nearness](https://developer.holochain.org/glossary/#nearness) of their [agent address](https://developer.holochain.org/glossary/#agent-address) to the data’s address. Each [[Holochain DNA|DNA]] has its own separate DHT.

-   Cryptographic Hash-Table where the hash-table is spread accross many nodes
-   Each node can make a get request with the hash of some value, and the network will return the value itself
-   Each node may share some responsability to host data and route queries
-   Two types of network queries:
    -   Get a value from its hash
    -   Get the metadata attached to a given hash
-   Guarantees:
    -   1st guarantee: data integrity:
        -   You can verify that the data is correct since you can hash it again like in any cryptographic hash-table.
        -   Records are guaranteed to come from its author because they are signed.
    -   2nd guarantee: the DHT is resilient:
        -   Censorship resistance: it would be impractical for the network to selectively censor a piece of data in the hash-table
        -   Availability: pieces of data will likely still be in the network even in outage scenarios
    -   3rd guarantee: ![[Eventual Consistency]]
