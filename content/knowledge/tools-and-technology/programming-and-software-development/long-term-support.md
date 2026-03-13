---
title: "Long Term Support (LTS)"
aliases: ["LTS", "Support à long terme"]
tags: ["software-development", "devops", "version-control", "open-source", "infrastructure"]
date: 2026-03-12
draft: false
description: "A software release model guaranteeing extended support for specific versions, focused on security patches and bug fixes without adding new features."
---

**Long Term Support (LTS)** designates a specific version of software whose support is guaranteed for a longer period than standard releases. The model aims to provide stability, reliability, and security over extended durations by focusing exclusively on security patches and critical bug fixes, without adding new features.

## Key Characteristics

- **Stability**: LTS versions are "frozen" in features, reducing the risk of regressions.
- **Extended support duration**: Generally between 2 and 10 years depending on the software (Ubuntu LTS: 5 years; Node.js LTS: 18 months; Windows 10 LTSB: 10 years).
- **Targeted updates**: Only security patches and critical bug fixes are applied.
- **Recommended for critical environments**: Ideal for servers, enterprise systems, production deployments, and embedded devices.

## Examples

| Software | LTS Duration |
|----------|-------------|
| [[ubuntu\|Ubuntu LTS]] | 5 years standard, 10 years with Ubuntu Pro |
| [[node\|Node.js]] | 18 months (e.g., v20.x LTS) |
| Java (17, 21, 25) | Multiple years per major LTS release |
| Windows 10 LTSB | 10 years |
| ChromeOS LTS | Security updates every 2 weeks, feature updates every 6 months |

## When to Choose LTS

**Use LTS when:**
- Running critical systems, servers, or enterprise deployments
- Stability is more important than access to new features

**Avoid LTS when:**
- New features are required
- Frequent updates are preferred

## End of Life (EOL)

Once the support period ends, software enters **End of Life (EOL)** status: no further security updates are provided. Planning upgrades before EOL is essential to avoid running unpatched systems.

## Related Topics

- [[semantic-versioning|Semantic Versioning]]: the MAJOR.MINOR.PATCH versioning scheme that complements release lifecycle planning
- [[ubuntu|Ubuntu]]: a major Linux distribution with a well-known LTS release strategy
- [[node|Node.js]]: runtime with a defined LTS release cycle
