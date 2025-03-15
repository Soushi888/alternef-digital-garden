---
title: Byzantine Fault Tolerance
description: Byzantine Fault Tolerance is a feature of a distributed network to reach consensus(agreement on the same value) even when some of the nodes in the network fail to respond or respond with incorrect information.
aliases:
  - BFT
tags:
  - cryptography
  - security
---

![Byzantine Fault Tolerance](https://www.youtube.com/embed/_e4wNoTV3Gw?list=PLOE1GTZ5ouRPbpTnrZ3Wqjamfwn_Q5Y9A)

## What is BFT
Byzantine Fault Tolerance(BFT) is the feature of a distributed network to reach consensus(agreement on the same value) even when some of the nodes in the network fail to respond or respond with incorrect information. The objective of a BFT mechanism is to safeguard against the system failures by employing collective decision making(both – correct and faulty nodes) which aims to reduce to influence of the faulty nodes.

Fault tolerance is the system's ability to continue functioning correctly even when some of its components, including nodes and communication channels, fail or behave maliciously.


- A BFT is a faillure that is not a **Fail Stop**
- It mean there is bad actors in the network : **Traitor nodes**
	- Flaky node(s)
	- Malicious nodes(s)
- Example of extreme fault tolerance
	- Bitcoin
	- Boeing 777 & 787
- Assumptions we make
	-   Can all nodes see all message?  Some?  None?
	-   Do nodes fail?  How about the network?
	-   Finite computation?
	-   Static or dynamic adversary?
	-   Bounded communication time?
	-   Fully connected network?
	-   Randomized algorithms?
	-   Quantum or binary computers?

## The Two Generals Problem
Two [armies](https://en.wikipedia.org/wiki/Army "Army"), each led by a different [general](https://en.wikipedia.org/wiki/General "General"), are preparing to attack a fortified city. The armies are encamped near the city, each in its own valley. A third valley separates the two hills, and the only way for the two generals to communicate is by sending [messengers](https://en.wikipedia.org/wiki/Runner_(war) "Runner (war)") through the valley. Unfortunately, the valley is occupied by the city's defenders and there's a chance that any given messenger sent through the valley will be captured.

While the two generals have agreed that they will attack, they haven't agreed upon a time for an attack. It is required that the two generals have their armies attack the city simultaneously to succeed, lest the lone attacker army die trying. They must thus communicate with each other to decide on a time to attack and to agree to attack at that time, and each general must know that the other general knows that they have agreed to the attack plan. Because [acknowledgement of message receipt](https://en.wikipedia.org/wiki/Acknowledgement_(data_networks) "Acknowledgement (data networks)") can be lost as easily as the original message, a potentially infinite series of messages is required to come to [consensus](https://en.wikipedia.org/wiki/Consensus_(computer_science) "Consensus (computer science)").

The thought experiment involves considering how they might go about coming to a consensus. In its simplest form, one general is known to be the leader, decides on the time of the attack, and must communicate this time to the other general. The problem is to come up with algorithms that the generals can use, including sending messages and processing received messages, that can allow them to correctly conclude:

Yes, we will both attack at the agreed-upon time.

Allowing that it is quite simple for the generals to come to an agreement on the time to attack (i.e. one successful message with a successful acknowledgement), the subtlety of the Two Generals' Problem is in the impossibility of designing algorithms for the generals to use to safely agree to the above statement.
## The Byzantine General Problem
	Imagine that several divisions of the Byzantine army are camped outside an enemy city, each division commanded by its own general. 
	
	The generals can communicate with one another only by messenger. After observing the enemy, they must decide upon a common plan of action. 
	
	However, some of the generals may be traitors, trying to prevent the loyal generals from reaching an agreement. 
	
	The generals must decide on when to attack the city, but they need a strong majority of their army to attack at the same time. 
	
	The generals must have an algorithm to guarantee that : 
	- (a) all loyal generals decide upon the same plan of action, and 
	- (b) a small number of traitors cannot cause the loyal generals to adopt a bad plan. 
	
	The loyal generals will all do what the algorithm says they should, but the traitors may do anything they wish. 
	
	The algorithm must guarantee condition (a) regardless of what the traitors do. The loyal generals should not only reach agreement, but should agree upon a reasonable plan.

- Goal of the solution : Reaching [[Consensus]]
- At least two generals must agree for there to be a consensus.
- If 1/3 of the generals are traitors, it's impossible to solve the problem
	- 3m+1 generals
	- At least 4 generals is required

### How to solve the Byzantine General Problem
- Assuming
	- Less than 1/3 of generals are traitors
	- Oral messages (p2p)
	- No crypto

### Related pages
- [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/index|Distributed System]]
- [[consensus|Consensus]]
- [[asymmetric-encryption|Asymmetric encryption]]
- [[cryptography|Cryptography]]
