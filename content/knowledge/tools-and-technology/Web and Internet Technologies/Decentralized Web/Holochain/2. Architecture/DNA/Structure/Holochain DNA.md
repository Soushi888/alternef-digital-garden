---
aliases:
  - DNAS
  - DNAs
  - DNA
---
#holochain/concepts
[[Outils et Technologie/DWeb/Holochain/Holochain]]

A package of executable code that defines the shared ‘rules of the game’ for a group of [[Agent|agents]]. A DNA is made up of [[Zome|Zomes]], which define [validation rules](https://developer.holochain.org/glossary/#validation-rule) for data, [zome functions](https://developer.holochain.org/glossary/#zome-function) that allow agents to write to their [source chain](https://developer.holochain.org/glossary/#source-chain), retrieve data from the [[Distributed Hash Table]], send [signals](https://developer.holochain.org/glossary/#signal) to a listening [client](https://developer.holochain.org/glossary/#client), or make [remote calls](https://developer.holochain.org/glossary/#remote-call) to another [[Cell|cell]]. Each DNA has its own isolated DHT, and is instantiated by each user on their own device as a cell.

## DNA bundle[¶](https://developer.holochain.org/glossary/#dna-bundle "Permanent link")

The file that holds a complete [DNA](https://developer.holochain.org/glossary/#dna), both executable [zomes](https://developer.holochain.org/glossary/#zome) and metadata (see [DNA manifest](https://developer.holochain.org/glossary/#dna-manifest) for details on this metadata).

## DNA instance[¶](https://developer.holochain.org/glossary/#dna-instance "Permanent link")

See [[Cell|cell]].

## DNA manifest[¶](https://developer.holochain.org/glossary/#dna-manifest "Permanent link")

A file that specifies the components of a [DNA](https://developer.holochain.org/glossary/#dna), including locations of compiled [zomes](https://developer.holochain.org/glossary/#zome) and metadata such as a name, description, [hashspace UID](https://developer.holochain.org/glossary/#hashspace-uid), and [properties](https://developer.holochain.org/glossary/#dna-properties). This manifest can be used by a compilation tool to build a [DNA bundle](https://developer.holochain.org/glossary/#dna-bundle).

## DNA properties[¶](https://developer.holochain.org/glossary/#dna-properties "Permanent link")

Arbitrary data that affects the operation of the [DNA](https://developer.holochain.org/glossary/#dna). A user can specify properties at DNA installation time, which causes the DNA to be [cloned](https://developer.holochain.org/glossary/#clone-dna) if the user-specified properties are different from the default properties. The executable code can then access those properties to change its behavior, similar to configuration files or environment variables. This is a simple way of allowing separate [networks](https://developer.holochain.org/glossary/#network) of users to enjoy isolated and slightly modified experiences using a set of base rules.
