---
aliases: 
tags:
  - programmation/cryptography
related pages:
  - "[[Cryptography]]"
---
Detect tamperingHash-Table

-   A merkle tree (technically a DAG) is one where new nodes reference one or more prior nodes by its hash
-   It's impossible to change a node in a merkle tree without changing all of downstream nodes as well (or else invalidating the hashes)
    -   Undetected tampering is impossible
-   A merkle chain is a merkle tree without branching