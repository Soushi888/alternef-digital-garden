---
title: Chaos Engineering
description: A discipline of experimenting on systems by injecting controlled failures to build confidence in resilience under real-world conditions
tags:
  - programming
  - software-quality
  - patterns
  - testing
  - resilience
aliases:
  - Fault Injection Testing
  - Resilience Testing
related pages:
  - "[[defensive-programming|Defensive Programming]]"
  - "[[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]]"
created: 2026-02-27
modified: 2026-02-27
draft: false
---

# Chaos Engineering

Chaos engineering is the discipline of deliberately introducing controlled failures into a system to discover weaknesses before they manifest as unplanned outages. Rather than waiting for production incidents to reveal fragility, chaos engineers proactively inject faults, observe system behavior, and use the results to harden the architecture.

The practice originated at Netflix, where engineers developed tools to randomly terminate production instances and force the organization to build systems that could survive unexpected failures. The core insight is that complex distributed systems will fail in unpredictable ways, and the only way to build confidence in resilience is to test it empirically under realistic conditions.

## Core Principles

The discipline is grounded in five foundational principles, first articulated by Netflix and later formalized by the chaos engineering community:

- **Define steady state**: identify a measurable output that represents normal system behavior (request success rate, latency percentiles, throughput). Chaos experiments test whether this steady state holds under fault conditions, not whether the system stays "up."
- **Hypothesize that steady state continues in both control and experimental groups**: the experiment is structured as a falsifiable hypothesis. If steady state does not hold, the experiment has revealed a real weakness.
- **Vary real-world events**: inject failures that reflect actual production conditions (instance failures, network latency, disk exhaustion, dependency timeouts, DNS failures), not invented or theoretical scenarios.
- **Run experiments in production**: pre-production environments do not accurately reflect the scale, traffic patterns, and dependencies of production. Confidence in resilience requires testing at production scale.
- **Automate experiments and run continuously**: one-time experiments provide one-time confidence. Continuous automation ensures that new changes do not silently degrade resilience over time.

## Key Concepts

### Steady State

The measurable baseline that defines "the system is working normally." Expressed as a metric with a threshold: "95th percentile latency below 200ms" or "error rate below 0.1%." Chaos experiments do not claim to prove the system is always up; they prove that the defined steady state holds despite injected failures.

Choosing the right steady state metric is critical. Infrastructure metrics (CPU, memory) are proxies. Business metrics (successful checkouts per second, successful logins) are closer to what actually matters.

### Blast Radius

The scope of potential impact from an experiment. A well-designed chaos experiment starts with the smallest possible blast radius: a single instance, a single availability zone, a single percentage of traffic. The blast radius expands as confidence grows.

Limiting blast radius is how chaos engineering remains safe in production. Experiments are always designed to be stoppable, and the system should be able to recover to steady state when the fault is removed.

### Game Days

Structured exercises where teams simulate major failure scenarios to test both technical resilience and organizational response. Game days combine chaos engineering with incident response practice: the technical system is stressed, and the team practices detection, communication, and recovery procedures simultaneously.

Game days typically involve a defined scenario (regional outage, critical dependency failure, data corruption), a prepared runbook, and post-mortem analysis.

### Fault Injection

The technical mechanism of introducing failures into a running system. Faults can be injected at multiple layers:

- **Infrastructure**: terminate instances, exhaust disk, consume CPU or memory
- **Network**: introduce latency, drop packets, partition network segments
- **Application**: return errors from dependencies, inject slow responses, corrupt data payloads
- **Platform**: kill containers, drain nodes, inject clock skew

## Tools

Several tools have become standard for chaos engineering practice:

**Chaos Monkey** (Netflix, open source): the original chaos tool, designed to randomly terminate virtual machine instances in an Auto Scaling Group. Forces engineers to build services that can survive the loss of individual instances.

**Gremlin**: a commercial SaaS platform for chaos engineering with a library of attack scenarios across infrastructure, network, and application layers. Provides scheduling, reporting, and team collaboration features.

**LitmusChaos** (CNCF): a cloud-native chaos engineering framework for Kubernetes environments. Provides a library of chaos experiments as Kubernetes custom resources, integrates with CI/CD pipelines, and is part of the Cloud Native Computing Foundation ecosystem.

**Chaos Mesh** (CNCF): another Kubernetes-native chaos engineering platform, providing fine-grained fault injection at the pod, network, and filesystem levels. Offers a web UI for experiment management.

**AWS Fault Injection Simulator (FIS)**: a managed service for running chaos experiments on AWS infrastructure. Integrates natively with EC2, ECS, EKS, RDS, and other AWS services, with IAM-controlled permissions and automated rollback conditions.

## Relationship to Defensive Programming

[[defensive-programming|Defensive Programming]] and chaos engineering address resilience from opposite directions and are most powerful when used together.

Defensive programming is a **design-time discipline**: it anticipates failure modes before code is written and adds guards, validation, and contracts to prevent or contain them. A defensive function validates its inputs, handles errors explicitly, and avoids silently propagating corrupt state. These are proactive measures taken when the code is authored.

Chaos engineering is an **empirical testing discipline**: it asks whether the defensive measures actually hold under real-world failure conditions at system scale. A circuit breaker may be correctly implemented in isolation but fail to trip correctly when a dependency degrades gradually rather than failing completely. Chaos engineering discovers these gaps by testing them in production rather than reasoning about them in theory.

The relationship is analogous to writing contracts and then auditing compliance: defensive programming writes the contracts; chaos engineering audits whether the system actually honors them when things go wrong. Neither replaces the other.

In systems built around patterns like [[cqrs-pattern|CQRS]], where command and query paths are separated across independent services, chaos engineering is particularly valuable for verifying that the eventual consistency guarantees hold under network partitions and service degradation.

## Related Topics

- [[defensive-programming|Defensive Programming]]
- [[cqrs-pattern|CQRS Pattern]]
- [[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]]
