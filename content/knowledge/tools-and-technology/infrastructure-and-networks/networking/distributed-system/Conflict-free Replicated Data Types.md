---
Aliases: [CRDT, CRDTs]
---
Conflict-free Replicated Data Types (CRDTs) are a type of data structure used in [[Distributed System/index|distributed systems]] to enable concurrent updates to replicated data without the need for coordination or locking mechanisms that can cause delays and reduce system availability.

CRDTs achieve this by ensuring that concurrent updates to the data structure do not conflict with each other and can be merged seamlessly. This is done by defining specific operations that can be applied to the data structure, and by ensuring that these operations are commutative and associative.

In other words, any two operations can be applied in any order, and the result will always be the same, regardless of the order in which they were applied. This property enables updates to be made independently and in parallel on different nodes of the distributed system, without the need for coordination or synchronization.

CRDTs can be used to implement various types of data structures, including sets, maps, counters, and graphs. They are commonly used in distributed databases, real-time collaborative editing systems, and other applications where multiple users may be simultaneously modifying shared data.

CRDTs can be used in a [[Distributed Hash Table]] to enable concurrent updates to the distributed data while maintaining consistency and availability. By using CRDTs, each node can update its local copy of the data without the need for synchronization or coordination with other nodes. When two nodes with updated copies of the data come into contact, they can merge their changes using the commutative and associative properties of the CRDT operations.

Overall, CRDTs are an important tool in the design of distributed systems, enabling efficient and scalable management of replicated data without sacrificing consistency or availability.
