---
title: "Distributed System"
aliases:
  - Distributed Systems
  - distributed system
  - distributed systems
tags:
  - networking
---
[[Networking]]

[Distributed System course](https://www.distributedsystemscourse.com)

![[centralized-decentralized-distributed.png]]

A distributed system is a collection of independent computers that work together to achieve a common goal by sharing resources, data, and communication across a network. In a distributed system, the computers or nodes are connected by a communication network, and they coordinate their actions by exchanging messages and sharing data.

Distributed systems can vary in size and complexity, from small-scale systems consisting of only a few computers to large-scale systems comprising thousands or even millions of nodes. They are used in many applications and domains, including cloud computing, peer-to-peer networks, social networks, online gaming, and scientific simulations.

The main advantage of a distributed system is that it can provide a high level of performance, scalability, and fault tolerance by allowing the workload to be spread across multiple nodes. In addition, a distributed system can enable the sharing of data and resources, leading to more efficient use of computing resources and reducing the need for data duplication.

However, designing and implementing a distributed system can be challenging due to the complexity of distributed algorithms and the need to handle issues such as concurrency, consistency, and fault tolerance. Moreover, distributed systems are often subject to network delays, hardware failures, and other issues that can impact performance and reliability.

Overall, distributed systems are an important tool in modern computing, enabling the creation of large-scale, highly available, and scalable applications and services.

## Communication Mechanisms in Distributed Systems

Distributed systems rely on various communication patterns and design techniques:

- Message Passing
- Remote Procedure Calls (RPC)
- [[knowledge/tools-and-technology/programming-and-software-development/development-patterns/event-bus|Event Bus Pattern]]
- Publish-Subscribe Models
- [[actor-model|Actor Model]] - Concurrent computation through message-passing actors

## Programming Models and Languages

- [[erlang|Erlang/OTP]] - Language designed for distributed, fault-tolerant systems
- [[actor-model|Actor Model]] - Mathematical model for concurrent computation
- [[supervision-tree|Supervision Trees]] - Hierarchical fault-tolerance pattern
- [[agent-vs-actor-models|Agent vs Actor Models]] - Comparison of distributed computing paradigms
- [[knowledge/tools-and-technology/programming-and-software-development/languages/typescript/libraries/effect-supervision-patterns|Effect-TS Supervision Patterns]] - Implementing Erlang supervision patterns in TypeScript

## Examples of distributed systems

- [[domain-name-system|Domain Name System]] (DNS)
  - Distributed lookup table of hostname to [[IP address]]
- [[content-delivery-network|Content Delivery Network]] (CDN)
- Facebook and Google
  - Massive scale
  - Fast
  - Very reliable
- Email servers ([[simple-mail-transfer-protocol|SMTP]])
- [[tor-network|TOR network]]
- Phone networks
  - Land line and cellular
- Cars network electronic components via CANbus
- Traffic light controllers
- Train control networks
- Airplanes
  - Avionics use RS232
  - Air traffic control uses verbal communication

## Social benifices of distributed system

- It is more collaborative
- More resilient
- User integrity
- Hardware sharing economy

## Fault Tolerance Patterns

- [[supervision-tree|Supervision Trees]] - Hierarchical process supervision for automatic recovery
- [[fail-stop|Fail-Stop Model]] - Failure detection and handling
- [[knowledge/tools-and-technology/security-and-privacy/cryptography/byzantine-fault-tolerance|Byzantine Fault Tolerance]] - Handling arbitrary failures
- [[consensus|Consensus Algorithms]] - Agreement in distributed systems

## Related Topics

![[failures|Failures in Distributed Systems]]
![[knowledge/tools-and-technology/security-and-privacy/cryptography/byzantine-fault-tolerance|Byzantine Fault Tolerance]]
