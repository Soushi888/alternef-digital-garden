---
title: hApp
date: 2026-05-24
description: A Holochain Application — a bundle of one or more DNAs that together form a complete decentralized application
aliases:
  - hApp
  - Holochain Application
tags: ["holochain", "decentralization", "distributed-systems"]
---

## Overview

A **hApp** (Holochain Application) is the top-level container for a Holochain-based application. It bundles one or more [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/dna-and-zomes|DNAs]] together with a UI layer into a complete, distributable application.

## Structure

- **DNAs**: Application logic and validation rules, each creating a separate network
- **UI**: Web-based user interface communicating with the Conductor via WebSocket
- **Manifest**: Configuration declaring which DNAs are included and how they interact

## How It Works

When a user installs a hApp, the [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/architecture/conductor|Conductor]] instantiates each DNA as a [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/cell|Cell]], creating the agent's [[source-chain|Source Chain]] for each DNA. The UI communicates with these cells to read and write data.

## Related

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] — The framework for building hApps
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/dna-and-zomes|DNA and Zomes]] — The logic layer inside a hApp
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/ecosystem/happs/index|Holochain Applications]] — Examples of hApps built on Holochain
