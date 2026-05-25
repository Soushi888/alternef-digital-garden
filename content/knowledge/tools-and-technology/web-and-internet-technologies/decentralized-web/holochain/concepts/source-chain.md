---
title: Source Chain
date: 2026-05-24
description: Each agent's personal append-only hash chain in Holochain — the authoritative record of all actions the agent has taken within a DNA
aliases:
  - Source Chain
  - source-chain
tags: ["holochain", "distributed-systems", "agent-centric", "cryptography"]
---

## Overview

The **Source Chain** is each agent's personal, append-only cryptographic hash chain in Holochain. Unlike blockchain's global ledger, every participant maintains their own source chain — a tamper-evident record of all actions (entries, links, and system records) they have taken within a specific [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/dna-and-zomes|DNA]].

## Key Properties

- **Agent-centric**: Each agent has their own chain — no shared global state
- **Append-only**: Records are cryptographically chained; earlier entries cannot be altered
- **Local**: Stored on the agent's own device, not distributed by default
- **Authoritative**: The source chain is the canonical record of an agent's history

## How It Works

Each source chain record contains:
1. The hash of the previous record (chaining)
2. The action (what was done)
3. An optional entry (what data was stored)
4. A signature by the agent's private key

When an agent performs an action, a new [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/action|Action]] is appended to their source chain. Some data from the source chain is then published to the [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/distributed-hash-table|DHT]] for peer validation and sharing.

## Related

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/action|Action]] — Records appended to the source chain
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/entry|Entry]] — The data payload stored with actions
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] — The framework using source chains as its core data structure
