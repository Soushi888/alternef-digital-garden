---
title: Layer 0 Networks
description: Infrastructure protocols beneath blockchains that enable cross-chain interoperability and relay networks
aliases:
  - Layer 0
  - L0
tags:
  - blockchain
  - decentralization
  - distributed-systems
  - networking
  - interoperability
date: 2026-03-14
---

Layer 0 refers to infrastructure protocols that sit beneath individual blockchain networks, providing the substrate for cross-chain communication and interoperability. The core problem they address: blockchains in their default state are isolated systems. Bitcoin cannot natively communicate with Ethereum; Ethereum cannot natively read Solana state. Assets and data are siloed within each chain's execution environment. As the blockchain ecosystem multiplied into hundreds of chains, the question became how these networks could exchange value and data without reintroducing the centralized intermediaries they were designed to remove.

## Why Layer 0 Exists

The early answer to cross-chain communication was bridges: [[smart-contracts|smart contracts]] deployed on two chains that lock assets on one side and mint representations on the other. Bridges have a poor security record. They become concentrated honeypots holding large amounts of locked assets, and several have been exploited for hundreds of millions of dollars each (Ronin, Wormhole, Nomad). A bridge is not an architectural solution; it is a patch on the isolated-chain problem.

Layer 0 protocols embed interoperability into the protocol design from the start. Two main architectures have emerged:

**Relay chains** (Polkadot model): A central relay chain coordinates a set of "parachains," independently governed blockchains that share the relay chain's security. Parachains pass messages and assets through the relay chain without trusting external bridges. The tradeoff: parachains must win a slot auction to connect, creating scarcity and a competitive marketplace for interoperability access.

**Sovereign chains with IBC** (Cosmos model): Chains communicate through the Inter-Blockchain Communication (IBC) protocol, a standardized message-passing format. Any two IBC-compatible chains communicate directly, without a mandatory central coordinator. The "hub" (Cosmos Hub) is one chain among many, not a controller. This is architecturally more decentralized than the relay model.

## Key Projects

**Polkadot**: Developed by Gavin Wood (Ethereum co-founder) and the Web3 Foundation. The relay chain handles shared security and cross-parachain messaging. Parachains lease slots through auctions, bonding DOT tokens for a fixed period. The parachain model enables specialization: one chain for DeFi, another for identity, another for NFTs, all sharing security.

**Cosmos**: Developed by Tendermint. The IBC protocol is the key innovation: a standardized packet format that any chain can implement to communicate with any other IBC chain. The Cosmos Hub acts as a routing and liquidity hub but is not architecturally required. Cosmos chains are fully sovereign: they set their own governance, validator sets, and tokenomics.

## Garden Perspective

Cosmos's model of sovereign chains that communicate without surrendering governance to a shared controller is philosophically close to the garden's decentralized vision. Each chain defines its own rules, its own governance, and its own economic model, while exchanging value and data with others through a standardized protocol. This parallel to [[holochain|Holochain]] is worth examining: each Holochain hApp defines its own validation rules and data model while sharing the underlying peer-to-peer transport. The key architectural difference is that Cosmos chains still use blockchain consensus internally, while Holochain bypasses consensus entirely at the data validation layer.

The bridge security problem is also instructive from a commons perspective: centralized bridges fail because they concentrate value and trust. The Layer 0 solutions that work best (IBC, relay chains) distribute that trust structurally rather than patching it with monitoring.

## Related Concepts

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/index|Decentralized Web]]
- [[internet-computer-protocol|Internet Computer Protocol]]
- [[holochain|Holochain]]
- [[web-3|Web 3]]
- [[smart-contracts|Smart Contracts]]
