---
title: Failures in Distributed Systems
date: 2025-02-21
description: A comprehensive overview of failures in distributed systems
tags: ["networking", "distributed-systems"]

---

- Network faillures
  - Protocols like TCP/IP and SSH are usefull to secure and manage the network
  - Network not fast enough
  - The biggest risk is network partition
    - When two nodes write to same data item in different subgraphs
    - Shared state diverges
    - Loss of connectivity
- Node faillures
  - [[fail-stop|Fail stop]]
  - [[byzantine-fault-tolerance|Byzantine Fault Tolerance]]
    - Goal : turn it into fail stop
