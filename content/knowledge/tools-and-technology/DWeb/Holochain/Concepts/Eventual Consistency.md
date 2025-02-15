---
Aliases: [eventual consistency]
---
# p2p

Eventual consistency is a concept in distributed computing where all nodes in a [[Distributed System/index|distributed system]] eventually become consistent with each other, but this consistency may not be achieved immediately after an update is made. In other words, in an eventually consistent system, updates to a data store will be propagated to all nodes in the system, but it may take some time for all nodes to reflect the updated state.

This is because in a distributed system, nodes may not always be able to communicate with each other in real-time or may have different views of the data at a given time due to network delays, hardware failures, or other issues. As a result, the system may temporarily have inconsistencies, which will eventually be resolved as updates propagate across the network.

Eventual consistency is often used in large-scale distributed systems, such as cloud-based databases, where the trade-off between consistency and availability is important. By allowing nodes to operate independently and eventually converge on a consistent state, systems can be designed to handle large volumes of data and traffic without sacrificing availability or performance.

# holochain/concepts

[[Outils et Technologie/DWeb/Holochain/Holochain]]

- The data state converges to being free of internal contradiction
        -   Relativity does not allow for a universally correct sequence of events
            -   So order of events in distributed systems is hard!
        -   The [[Distributed Hash Table]] is a [[Conflict-free Replicated Data Types]] (CRDT)
            -   Data structure that only implements commutative operations
            -   State machine that derives state from a series of operations
            -   Any agent given the same operations will arrive at the same end state (regardless of order)
