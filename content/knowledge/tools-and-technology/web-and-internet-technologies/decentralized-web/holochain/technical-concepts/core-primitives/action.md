---
Aliases: [action, actions, Actions]
---

#holochain/concepts 
[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]]

A piece of data that represents a [record](https://developer.holochain.org/glossary/#record) on an [[Agent|agent]]‘s [[Source Chain|source chain]]. Everything an [agent](https://developer.holochain.org/glossary/#agent) does in an [application](https://developer.holochain.org/glossary/#application) is expressed as one or multiple actions, recorded on their [[Source Chain|source chain]] as one or multiple [records](https://developer.holochain.org/glossary/#record). That is, when the source chain records a piece of data, it’s more accurate to say that it’s recording the agent’s _act_ of creating it. Actions link to the hash of their previous action, which creates a tamper-evident [journal](https://developer.holochain.org/glossary/#journal) or [ledger](https://developer.holochain.org/glossary/#ledger) of all their actions in an application.

- An action is announced publicly within the scope of the network
    - If any action was private, then agents would be able to fork their chain undetected
-  An action may be accompanied or not by some entry (as determined by the application)
    - Entries may be private or public
    - The union of an action and its entry (if existent) is called a [[Record|record]]
- An action contains:
    - Hash of the previous action
    - Author's public key
    - Timestamp
    - Entry hash, if it's accompanied by an entry
- An action is signed by its author

Example of holochain actions : ![[Entries manipulation]]
