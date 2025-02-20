---
aliases: 
tags:
  - programmation/cryptography
related pages:
  - "[[Cryptography]]"
---
## Hash Table
-   Key-value store that allocates a bigger chunk of memory than necessary
-   To insert a value, we hash the **key**, and put the content in the position of memory that corresponds to that hash
-   Constant lookup and write time

### Cryptographic Hash Table
-   Key-value store where the key is the cryptographic hash of the **value**
-   After lookup, you can hash the retrieved value again, compare it to the input key, and verify that you are not being lied to
