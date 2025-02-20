---
Aliases: [Agents, agents, agent, agent ID]
---

#holochain/concepts

In [[Outils et Technologie/DWeb/Holochain/Holochain]], the agency is the power of an [agent](https://developer.holochain.org/glossary/#agent) to act in their environment.

## An agent is :

1.  Anyone or anything acting with [agency](https://developer.holochain.org/glossary/#agency), such as a human or bot.
2.  An agent (see definition 1) who participates in a Holochain [network](https://developer.holochain.org/glossary/#network) through their [[Cell|cell]].

### Agent activity[¶](https://developer.holochain.org/glossary/#agent-activity "Permanent link")

Records of all the [[Source Chain|sources chains]] [actions](https://developer.holochain.org/glossary/#action) that an agent has published, along with any [warrants](https://developer.holochain.org/glossary/#warrant) against them for malicious activity. An agent’s [neighbors](https://developer.holochain.org/glossary/#neighbor), as [peers](https://developer.holochain.org/glossary/#peer) whose [agent addresses](https://developer.holochain.org/glossary/#agent-address) are [near](https://developer.holochain.org/glossary/#nearness) to theirs, are the [validation authorities](https://developer.holochain.org/glossary/#validation-authority) for their agent activity data.

### Agent activity operation[¶](https://developer.holochain.org/glossary/#agent-activity-operation "Permanent link")

A [DHT operation](https://developer.holochain.org/glossary/#dht-operation) produced by the author of a [source chain](https://developer.holochain.org/glossary/#source-chain) [[Entry|record]], notifying the [validation authorities](https://developer.holochain.org/glossary/#validation-authority) for the author’s [agent ID entry](https://developer.holochain.org/glossary/#agent-id-entry) that they’ve published something.

### Agent-centric[¶](https://developer.holochain.org/glossary/#agent-centric "Permanent link")

Describes any [distributed system](https://developer.holochain.org/glossary/#distributed-system) that puts [agents](https://developer.holochain.org/glossary/#agent) at the center of the design, giving them [agency](https://developer.holochain.org/glossary/#agency) over their online identity and the data they create. Agent-centric systems are usually [decentralized](https://developer.holochain.org/glossary/#decentralization) and use [public-key cryptography](https://developer.holochain.org/glossary/#public-key-cryptography) to identify agents. [Git](https://git-scm.com/), Holochain, [Dat](https://www.datprotocol.com/), and [Secure Scuttlebutt](https://scuttlebutt.nz/) are highly agent-centric, while client/server and blockchain systems are less so.

### Agent address[¶](https://developer.holochain.org/glossary/#agent-address "Permanent link")

The address of an [agent ID](https://developer.holochain.org/glossary/#agent-id) entry on the [[Distributed Hash Table]], calculated from the agent’s [public key](https://developer.holochain.org/glossary/#public-key-cryptography). It is used in locating an agent’s [transport address](https://developer.holochain.org/glossary/#transport-address) for [gossiping](https://developer.holochain.org/glossary/#gossip) and making [remote calls](https://developer.holochain.org/glossary/#remote-call), and in calculating the proper [validation authority](https://developer.holochain.org/glossary/#validation-authority) to send a [DHT operation](https://developer.holochain.org/glossary/#dht-operation) to or receive a piece of [DHT data](https://developer.holochain.org/glossary/#dht-data) from.

### Agent ID[¶](https://developer.holochain.org/glossary/#agent-id "Permanent link")

The public key of an [agent](https://developer.holochain.org/glossary/#agent). It serves as their unique ID in any [DHT](https://developer.holochain.org/glossary/#dht) they join (although an agent can create multiple IDs to use in different spaces if they like).

### Agent ID entry[¶](https://developer.holochain.org/glossary/#agent-id-entry "Permanent link")

The entry associated with the third of the four [genesis records](https://developer.holochain.org/glossary/#genesis-records) at the the beginning of an [agent](https://developer.holochain.org/glossary/#agent)‘s [source chain](https://developer.holochain.org/glossary/#source-chain), which contains their [agent ID](https://developer.holochain.org/glossary/#agent-id). The address of this entry is also the [agent’s address](https://developer.holochain.org/glossary/#agent-address) on the DHT.

-   Defined by a private-public key pair
    -   For cryptographically signing
    -   Others can cryptographically verify these signatures
-   Action Ledger
    -   Sequence of all the actions that an agent has taken in a social container
    -   Signed by the agent
    -   Merkle trees can create unfalsifiable ledgers
