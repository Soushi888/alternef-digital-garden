---
title: "Ğ1 (June) Libre Currency"
date: 2026-06-23
description: "The Ğ1 (June) libre currency, launched in 2017 on the Duniter software, is the first cryptocurrency to implement the Relative Theory of Money through a daily Universal Dividend and a human web of trust."
aliases:
  - "Ğ1"
  - "G1"
  - "June"
  - "Ğ1 Currency"
  - "Duniter"
  - "Libre Currency"
tags: ["economics", "cryptocurrency", "blockchain", "local-economy", "commons", "decentralization"]
draft: false
---

**Ğ1** (pronounced "June" in French, where *G* sounds like *juin*) is a libre currency launched on 8 March 2017. It is the first cryptocurrency to put the [[relative-theory-of-money|Relative Theory of Money]] (TRM) into practice: rather than being mined by the few or issued as debt by a central authority, the money is co-created in equal relative shares by every member through a daily **Universal Dividend**. Ğ1 runs on the **Duniter** free software and identifies its human members through a decentralised **web of trust**. Starting from 59 founding members who minted the genesis block, the network has grown to several thousand members (Duniter reports over 6,000 participants), mostly across France and other French-speaking regions.

## The Universal Dividend

The defining feature of Ğ1 is that money is created as a **Universal Dividend** (Dividende Universel, DU), a share of the existing money mass paid to every member at a regular interval. This is the direct implementation of the TRM's principle of spatial and temporal symmetry: no member, early or late, alive now or born later, is privileged in money creation.

- Each certified member co-creates the same proportion of the total money supply per period.
- The DU is revalued every six months so that the money supply grows by roughly **10% per year**.
- That rate is not arbitrary: it is calibrated so that over half an average human life (taken as 40 years for Ğ1, the `ev/2` of the theory) each member creates the same share of money as everyone before them.
- Only individual human members co-create the DU. Companies and associations can hold and exchange Ğ1 but cannot create it, preserving the one-human-one-share symmetry.

## The Web of Trust

A Universal Dividend only stays fair if each human receives exactly one share, which requires a way to verify that every member is a unique, real person without a central registrar. Ğ1 solves this with a **web of trust** (WoT), inspired by the OpenPGP model but used here for monetary identity.

- To join, an applicant must obtain **five certifications** from existing members and sit within a bounded certification distance of the rest of the network.
- Certifications are cryptographic attestations signed with Ed25519 key pairs, the same keys used for transactions.
- A certification expires after **two years**, a member can issue at most **100** of them, and must wait several days between issuing two, which slows and bounds growth.
- These rules make Sybil attacks (one person farming many fake identities to multiply dividends) expensive and detectable.

By drawing the boundary of who co-creates money, the web of trust effectively defines the community itself.

## Duniter: Software and Blockchain

**Duniter** is the free software that runs the Ğ1 blockchain. Unlike [[bitcoin|Bitcoin]], it has no block reward for miners: the only money creation is the Universal Dividend. It uses a [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/proof-of-work/index|proof-of-work]] consensus with *personalised difficulty*, which raises the difficulty for members who have recently produced a block so that block creation rotates among many participants rather than concentrating in large mining farms. As a result Duniter is lightweight enough to run on hardware as modest as a Raspberry Pi, avoiding the energy cost associated with conventional [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/index|blockchains]].

A major rewrite, **Duniter v2**, migrates the network to a new blockchain engine while keeping the economic rules identical: one DUĞ1 per day, revalued every six months, and the same five-certification web-of-trust membership. V2 introduces a dedicated sub-group of "blacksmiths" (forgerons), members of the co-creators' web of trust who run always-on forging nodes under a security licence to produce blocks, while everyone else can run read-only mirror nodes.

## Ecosystem and Community

Users interact with Ğ1 through a range of free-software clients: **Cesium** and the command-line **Silkaj** on V1, and **Ğecko**, **Tikka** (accounting-oriented), **Ğ1nkgo**, **Duniter-Connect**, and **Ğcli** in the V2 era. Local Ğ1 groups organise markets and exchanges, and some local currency collectives, such as *Le Sou* in Mayenne, connect their own systems to Ğ1. The project explicitly aims to reach the millions of users needed for a libre money to carry meaningful value.

## A Monetary Commons

Studies of Ğ1 frame it as a case of *commoning*: what is held in common is not the currency units themselves but the **monetary protocol**. The web of trust draws the community boundary, the Universal Dividend distributes the right to create money equally, and the open-source rules are governed and modified collectively. In this reading Ğ1 is a working experiment in governing a monetary [[knowledge/governance-and-community/commons|commons]] without a central bank or a state.

## Related Topics

- [[relative-theory-of-money|Relative Theory of Money]]
- [[grassroots-economics|Grassroots Economics]]
- [[knowledge/governance-and-community/commons|Commons]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/proof-of-work/index|Proof of Work]]
- [[knowledge/governance-and-community/peer-to-peer-infrastructure-governance|Peer-to-Peer: Infrastructure as Governance]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/index|Decentralized Web]]
- [[knowledge/finance-and-economics/index|Finance and Economics]]

## References

- [Duniter, the Ğ1 software](https://duniter.org/)
- [Web of Trust (Duniter)](https://duniter.org/web-of-trust)
- [Duniter V2 (Monnaie Libre)](https://monnaie-libre.fr/duniter-v2-in-english)
- [Relative Theory of Money (online edition)](https://trm.creationmonetaire.info/)
