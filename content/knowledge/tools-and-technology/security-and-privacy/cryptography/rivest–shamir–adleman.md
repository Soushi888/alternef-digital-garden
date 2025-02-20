---
aliases:
  - RSA
tags:
  - programmation/cryptography
related pages:
  - "[[Cryptography]]"
  - "[[Asymmetric encryption]]"
---
RSA encryption is a public-key encryption system that is widely used to secure sensitive data, particularly when being transmitted over an insecure network like the internet. It is based on the principle that there are easy problems that are associated with hard problems. In RSA encryption, the easy problem is multiplying two large prime numbers, while the hard problem is factoring the product of those primes back into its original factors. This asymmetry allows for secure communication without the need for a previously shared secret key.

## Key Points

- **Public-Key Encryption**: Unlike symmetric-key encryption, which uses the same key for both encryption and decryption, RSA uses a pair of keys: a public key for encryption and a private key for decryption. The public key can be freely distributed, while the private key must be kept secret.
- **Mathematical Basis**: RSA relies on the mathematical properties of modular exponentiation and the difficulty of factoring large composite integers. The security of RSA comes from the fact that, although it is easy to multiply two large prime numbers together, it is computationally difficult to factor the resulting product.
- **Usage**: RSA is used for secure data transmission, digital signatures, and authentication. It is less efficient than symmetric encryption for encrypting large amounts of data but is crucial for establishing secure communications channels and verifying the integrity and authenticity of messages.
- **Security Concerns**: While RSA is currently secure against classical computing attacks due to the computational difficulty of factoring large numbers, it may become vulnerable to quantum computing attacks in the future due to algorithms like Shor's algorithm, which can efficiently factor large numbers using a sufficiently advanced quantum computer.

## Example Usage

Alice wants to send a secure message to Bob without having previously shared any secret keys. Here's how RSA encryption facilitates this:

1. **Key Generation**: Alice generates her RSA key pair, consisting of a public key `(n, e)` and a private key `(d, n)`. She shares her public key openly.
2. **Encryption**: Bob wants to send Alice a message. He encrypts his plaintext message `M` using Alice's public key `(n, e)` to produce the ciphertext `C`.
3. **Transmission**: Bob sends the encrypted message `C` to Alice over an insecure channel.
4. **Decryption**: Upon receiving `C`, Alice uses her private key `(d, n)` to decrypt the message and recover the original plaintext `M`.

## Conclusion

RSA encryption plays a critical role in modern cryptography, enabling secure communication over insecure networks. Its strength lies in the computational difficulty of factoring large prime numbers, although advancements in quantum computing could pose future challenges to its security. RSA is foundational to many secure communication protocols and systems, including TLS for web traffic encryption, [[Pretty Good Privacy|PGP]] for email encryption, and VPNs for secure remote connections.

Citations:
[1] https://en.wikipedia.org/wiki/RSA_(cryptosystem)
[2] https://www.techtarget.com/searchsecurity/definition/RSA
[3] https://brilliant.org/wiki/rsa-encryption/
[4] https://www.comparitech.com/blog/information-security/rsa-encryption/
[5] https://www.geeksforgeeks.org/rsa-algorithm-cryptography/
[6] https://www.simplilearn.com/tutorials/cryptography-tutorial/rsa-algorithm
[7] https://www.encryptionconsulting.com/education-center/what-is-rsa/
[8] https://www.veritas.com/information-center/rsa-encryption
