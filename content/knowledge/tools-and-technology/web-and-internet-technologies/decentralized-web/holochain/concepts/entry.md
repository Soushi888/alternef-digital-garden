---
title: Holochain Entries
description: The basic data structure stored in the distributed hash table and source chain
tags:
  - holochain
  - fundamentals
  - entries
  - data-structures
aliases: [entry, Entries, entries]
parent: "[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/fundamentals/index|Holochain Fundamentals]]"
---

# Holochain Entries

#holochain/concepts
[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]]

A basic unit of user data in a Holochain app. Each entry has its own defined [entry type](https://developer.holochain.org/glossary/#entry-type). When an agent commits an entry, it is combined with an [action](https://developer.holochain.org/glossary/#action) into a [record](https://developer.holochain.org/glossary/#record) that expresses a [new-entry action](https://developer.holochain.org/glossary/#new-entry-action). Then it is written to their [[Source Chain|source chain]] as a record of the action having taken place. An entry can be [public](https://developer.holochain.org/glossary/#public-entry) or [private](https://developer.holochain.org/glossary/#private-entry); if it’s public, it’s also [published](https://developer.holochain.org/glossary/#publish) to the [[Distributed Hash Table]]. There are [app entries](https://developer.holochain.org/glossary/#app-entry) whose purpose and structure are defined by the [[Holochain DNA|DNA]] developer, and there are special [system entries](https://developer.holochain.org/glossary/#system-entry) such as an [agent ID entry](https://developer.holochain.org/glossary/#agent-id-entry).

#### Entry type[¶](https://developer.holochain.org/glossary/#entry-type "Permanent link")

A specification for any sort of entry that a [DNA](https://developer.holochain.org/glossary/#dna) should recognize and understand, similar to an OOP class or database table schema. It can specify whether entries of its type should be [public](https://developer.holochain.org/glossary/#public-entry) or [private](https://developer.holochain.org/glossary/#private-entry), and how many [required validations](https://developer.holochain.org/glossary/#required-validation) should exist. DNA developers create their own entry types for the data their app needs to store, and can write [validation functions](https://developer.holochain.org/glossary/#validation-function) for [records](https://developer.holochain.org/glossary/#record) that [create, update, or delete](https://developer.holochain.org/glossary/#create-read-update-delete-crud) entries of those types.
