---
title: Unspent Transaction Output (UTXO)
description: What is UTXO in Blockchain?
tags:
    - blockchain
    - cryptocurrency
    - utxo
---

## **What is UTXO in Blockchain?**

UTXO stands for **Unspent Transaction Output**. It is a fundamental concept in **UTXO-based [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/index|blockchains]]** like **[[bitcoin|Bitcoin]]** and **[[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/blockchain/pos/cardano/index|Cardano]]**, representing the model used to track ownership of coins.

---

## **How UTXO Works**

1. **Transactions Consume and Create UTXOs**
   - Every transaction in a UTXO-based blockchain takes **one or more UTXOs as inputs** and creates **one or more UTXOs as outputs**.
   - The **inputs** are previous UTXOs being spent.
   - The **outputs** become new UTXOs available for future transactions.

2. **Analogy: Physical Cash**
   - Think of UTXOs like physical cash (bills/coins).
   - If you have a `50$` bill and want to buy something for `30$`:
     - You give the `50$` bill (input UTXO).
     - You receive a `30$` payment (to the seller) and `20$` as change (new UTXOs).
   - Similarly, a blockchain transaction uses UTXOs as inputs and generates new UTXOs as outputs.

3. **UTXO Lifecycle**
   - A UTXO is **unspent** until it is referenced in a new transaction.
   - Once used as an input, it becomes **spent** and cannot be reused.

---

## **Advantages of the UTXO Model**

✅ **Security & Privacy**  

- UTXOs are independent and not account-based, making it harder to track balances or transactions linked to a single identity.

✅ **Parallel Processing**  

- Since each UTXO is independent, transactions can be **verified in parallel**, improving scalability.

✅ **Clear Ownership**  

- UTXOs explicitly define which outputs belong to which addresses, making balance calculations straightforward.

✅ **Improved Smart Contract Design** (Cardano's eUTXO Model)  

- In **Cardano**, the **Extended UTXO (eUTXO)** model extends UTXOs to support **smart contracts**, improving determinism and reducing transaction conflicts.

---

## **UTXO vs. Account-Based Model**

| Feature | **UTXO Model** (Bitcoin, Cardano) | **Account Model** (Ethereum) |
|---------|----------------------------------|-----------------------------|
| **State Representation** | Set of UTXOs | Global account balances |
| **Transactions** | Consume & create UTXOs | Modify account balances |
| **Parallel Processing** | Yes (independent UTXOs) | Limited (shared state) |
| **Privacy** | Higher (no centralized balance) | Lower (global balance tracking) |
| **Smart Contracts** | More deterministic (eUTXO in Cardano) | More flexible (Ethereum) |

---

## **Which Blockchains Use UTXO?**

✅ **Bitcoin (BTC)** – First implementation of UTXO  
✅ **Litecoin (LTC)** – Similar to Bitcoin  
✅ **Bitcoin Cash (BCH)** – Uses UTXO for scaling  
✅ **Cardano (ADA)** – Introduces **eUTXO** for smart contracts  
✅ **Monero (XMR)** – Uses UTXO with privacy features  

---

## **Final Thoughts**

UTXO is a **transparent, scalable, and secure** model for blockchain transactions. While it differs from the **account-based model** used in Ethereum, its **independence and parallel processing capabilities** make it highly effective for both cryptocurrencies and smart contract platforms like Cardano.

Would you like a deeper explanation of eUTXO in Cardano? 🚀
