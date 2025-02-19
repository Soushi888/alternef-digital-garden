---
Aliases: [Links, link, links]
---

#holochain/concepts
[[Outils et Technologie/DWeb/Holochain/Holochain]]

A piece of [metadata](https://developer.holochain.org/glossary/#metadata) connecting one [address](https://developer.holochain.org/glossary/#address) on the [[Distributed Hash Table]] to another. Each link has a [tag](https://developer.holochain.org/glossary/#link-tag) for storing arbitrary content and is stored in the DHT at its [base](https://developer.holochain.org/glossary/#link-base)‘s [address](https://developer.holochain.org/glossary/#address).

#### Link base[¶](https://developer.holochain.org/glossary/#link-base "Permanent link")

The [address](https://developer.holochain.org/glossary/#address) of the [record data](https://developer.holochain.org/glossary/#record-data) ([[Entry|entries]] or [[Action|actions]]) on the DHT that a [link](https://developer.holochain.org/glossary/#link) links from.

#### Link tag[¶](https://developer.holochain.org/glossary/#link-tag "Permanent link")

An arbitrary piece of data, stored with a [link](https://developer.holochain.org/glossary/#link), that contains application-defined information. A link tag can define an ad-hoc type for the link, be used in a query filter, or store information about the [link target](https://developer.holochain.org/glossary/#link-target) to avoid a second [DHT](https://developer.holochain.org/glossary/#distributed-hash-table-dht) query to retrieve the target’s content.

#### Link target[¶](https://developer.holochain.org/glossary/#link-target "Permanent link")

The [address](https://developer.holochain.org/glossary/#address) of the [record data](https://developer.holochain.org/glossary/#record-data) on the DHT that a [link](https://developer.holochain.org/glossary/#link) links to. Link targets have no metadata pointing back to the [base](https://developer.holochain.org/glossary/#link-base), and therefore have no knowledge that they’re being linked to.