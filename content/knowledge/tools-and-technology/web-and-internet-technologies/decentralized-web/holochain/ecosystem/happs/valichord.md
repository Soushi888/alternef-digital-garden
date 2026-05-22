---
title: "ValiChord"
description: "Distributed validation infrastructure for computational biomedical research, built on Holochain to address the reproducibility crisis in science."
aliases:
  - "ValiChord"
  - "Valichord"
tags: ["programming", "holochain", "happs", "distributed-systems", "cryptography", "peer-to-peer"]
date: 2026-05-22
draft: false
---

ValiChord is a distributed validation infrastructure for computational biomedical research, built as a Holochain hApp by Ceri John. It addresses the reproducibility crisis in science: between 75% and 90% of published biomedical studies cannot be independently reproduced, costing an estimated $28 billion annually in the US alone.

The project's name comes from a musical metaphor: a chord requires multiple notes sounding together. Agreement is harmony. Disagreement is dissonance. Both carry information.

## The Problem

Prior approaches to research reproducibility all share a systemic gap:

- Data repositories made materials accessible, but 70% of researchers still fail to reproduce others' experiments
- Blockchain-based verification collides with GDPR: patient data cannot be deleted from an immutable ledger
- Journal reproducibility badges exist without requiring actual verification
- Only one in three reviewers checks whether a final paper matched its registered protocol

ValiChord treats validation as valued labour, not invisible service. Validators are compensated, credited by name, and recognised through formal attestations.

## Architecture: The Orchestra Model

ValiChord's four-role architecture maps to orchestral sections:

**Researcher (Strings)**: holds raw data, analysis protocol, and pre-registered hypotheses, sealed cryptographically on their own device and never shared directly.

**Validators (Brass)**: each works in their own private computational workspace, reproducing the analysis without seeing what peers are finding.

**Attestation Layer (Woodwinds)**: validators publish cryptographic commitments simultaneously using a [[blind-commit-reveal-protocol|blind commit-reveal validation protocol]], voices coming together for the first time.

**Governance (Conductors)**: assembles outputs into a permanent public Harmony Record, accessible to journals, funders, and institutions.

Harmony Records are not binary pass/fail verdicts. They are full analytical feedback: who agreed, who disagreed, and precisely where divergences lie.

## Why Holochain

ValiChord requires architecture that is incompatible with blockchain:

- Patient data and clinical trial results are subject to GDPR and cannot be written to an immutable global ledger
- Holochain's agent-centric model keeps sensitive data locally on each participant's device
- What travels across the network is not the data itself but cryptographic proofs that it exists and has not been tampered with
- Each node holds only what its participant needs, in a Distributed Hash Table (DHT)

Because each participant maintains their own local ledger rather than competing to write to a single global one, there is no mining, no global consensus mechanism, and no gas fees. Validators can be compensated for micro-transactions at fractions of a penny.

## Development Status

As of early 2026:

- 669 commits
- Nearly 28,000 lines of code across Rust, TypeScript, and Python
- 73 integration tests passing across all four DNAs
- Architecture reviewed by Art Brock (Holochain co-founder), Paul D'Aoust (Holochain Foundation), and Joel Marcey (Rust Foundation)

**Phase 0** is the next milestone: a 12-month empirical study measuring actual validation time across 8-10 computational studies and 16-20 validation events. ValiChord is targeting UKRI's Metascience grant programme for Phase 0 funding.

## Tools Available Now

**ValiChord at Home**: a free, private reproducibility readiness check across 24 questions in six categories (Documentation, Dependencies, Environment, Data Access, Code Organisation, Self-Verification). Runs entirely in the browser; nothing is tracked.

**Repository Readiness Check**: analyses a repository zip file against 126 reproducibility failure modes and returns a full diagnostic report with findings categorised as Critical, Significant, or Low Confidence.

## Related Topics

- [[blind-commit-reveal-protocol|Blind Commit-Reveal Validation Protocol]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/ecosystem/happs/index|Holochain hApps]]
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/architecture/holochain-architecture-overview|Holochain Architecture]]
- [[knowledge/tools-and-technology/security-and-privacy/cryptography/index|Cryptography]]

## References

- [ValiChord GitHub Repository](https://github.com/topeuph-ai/ValiChord)
- [ValiChord Documentation](https://github.com/topeuph-ai/ValiChord/blob/main/docs/)
- [Harmony from Dissonance, hAppenings article by Sam Turner (Mar 2026)](https://happenings.holochain.org)
- [UKRI Metascience Programme](https://www.ukri.org/opportunity/metascience-research-programme/)
