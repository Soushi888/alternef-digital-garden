---
aliases:
  - consensus algorithm
---

In [[Blockchain]] technology, a consensus algorithm is a set of rules that all nodes in a blockchain network follow to agree on the state of the blockchain. It ensures that all transactions are verified and added to the blockchain in a secure and orderly manner. The consensus algorithm is crucial for maintaining the integrity and security of the blockchain, as it prevents double-spending and fraudulent transactions.

There are several types of consensus algorithms used in different blockchain networks, each with its own method of achieving consensus:

1. **[[Proof of Work]] (PoW)**: This is the original consensus algorithm used by Bitcoin. Miners compete to solve a complex mathematical puzzle, and the first to solve it gets to add a new block to the blockchain. This process requires significant computational power and energy.
2. **[[Proof of Stake]] (PoS)**: In this algorithm, validators are chosen to create new blocks and validate transactions based on the number of coins they hold and are willing to "stake" as collateral. This mechanism is designed to be more energy-efficient than PoW.
3. **[[Delegated Proof of Stake]] (DPoS)**: This is a variation of PoS where token holders vote for a limited number of delegates who are responsible for creating new blocks and validating transactions. This system aims to balance the advantages of PoS with the security of PoW.
4. **Proof of Authority (PoA)**: In this consensus mechanism, a predefined set of nodes (authorities) are responsible for validating transactions and creating new blocks. This method is often used in private or permissioned blockchains.
5. **Proof of Elapsed Time (PoET)**: This algorithm is designed to be energy-efficient and scalable, using a wait-and-see approach where validators wait for a certain amount of time before they can propose a new block.
6. **[[Byzantine Fault Tolerance]] (BFT)**: This is a family of consensus algorithms designed to tolerate up to a certain number of faulty or malicious nodes in the network. Examples include Practical Byzantine Fault Tolerance (PBFT) and Federated Byzantine Agreement (FBA).

The choice of consensus algorithm depends on the specific requirements of the blockchain network, such as its security needs, energy efficiency, and the level of decentralization desired. Each algorithm has its own trade-offs in terms of security, scalability, and energy consumption.
