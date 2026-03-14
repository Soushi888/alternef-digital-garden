---
title: Perspect3vism / Coasys
date: 2025-02-15
description: Agent-centric social networking framework (Perspect3vism) evolved into the Coasys ecosystem with AD4M and Flux
aliases:
  - Perspect3vism
  - Coasys
  - AD4M
  - Flux hApp
tags: ["holochain", "web3", "happs"]

---

# Perspect3vism / Coasys

**Perspect3vism** was an early Holochain hApp project exploring agent-centric social networking. It evolved into the broader **Coasys** ecosystem, which now develops three related projects:

## Coasys Projects

### AD4M (Agent-Centric Distributed Application Meta-Ontology)

AD4M is a framework for building interoperable, agent-centric social applications. Key concepts:
- **Perspectives**: Personal knowledge graphs owned by each agent
- **Languages**: Pluggable backends for storing different kinds of data (Holochain, IPFS, centralized, etc.)
- **Expressions**: Content in any language, addressed by URL
- **Links**: Connections between expressions in an agent's perspective

AD4M allows applications to share data across different storage backends while keeping agents in full control of their data.

### Flux

**Flux** is a messaging and collaboration application built on AD4M. It provides:
- Decentralized group messaging and channels
- Shared perspectives for collaborative workspaces
- Interoperability with other AD4M-compatible applications

### Coasys Developer SDK

The Coasys SDK allows developers to build AD4M-compatible applications that work with any language/backend combination.

## Relationship to Holochain

Perspect3vism originally used Holochain as its primary storage backend. AD4M abstracts over storage, supporting Holochain as one of many "languages." This allows AD4M applications to leverage Holochain's agent-centric properties while remaining storage-agnostic.

## References

- [Coasys Website](https://coasys.org)
- [AD4M Documentation](https://docs.ad4m.dev)
- [Original Perspect3vism Website](https://www.perspect3vism.org)
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/ecosystem/happs/index|Holochain hApps Directory]]
