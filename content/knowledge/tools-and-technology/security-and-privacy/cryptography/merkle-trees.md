---
title: Merkle Trees
description: Merkle Trees are a type of hash tree used in cryptography to verify the integrity of data.
tags:
  - cryptography
  - hash-tree
---
Detect tamperingHash-Table

-   A merkle tree (technically a DAG) is one where new nodes reference one or more prior nodes by its hash
-   It's impossible to change a node in a merkle tree without changing all of downstream nodes as well (or else invalidating the hashes)
    -   Undetected tampering is impossible
-   A merkle chain is a merkle tree without branching

## Related Pages

-   [[knowledge/tools-and-technology/security-and-privacy/cryptography/hash-table|Hash Table]]
-   [[knowledge/tools-and-technology/security-and-privacy/cryptography/hash-tree|Hash Tree]]
-   [[knowledge/tools-and-technology/security-and-privacy/cryptography/hash-chain|Hash Chain]]
-   [[knowledge/tools-and-technology/security-and-privacy/cryptography/hash-dag|Hash DAG]]
