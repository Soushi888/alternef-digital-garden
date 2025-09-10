---
title: Liquid Network
description: Bitcoin's federated sidechain for confidential transactions and digital asset tokenization
aliases: ["Liquid Bitcoin", "L-BTC", "Liquid Sidechain"]
tags: [bitcoin, layer-2, sidechain, confidential-transactions, asset-tokenization, blockstream]
created: 2025-01-10
modified: 2025-01-10
draft: false
---

# Liquid Network

[[bitcoin|Bitcoin]] federated sidechain and layer-2 solution enabling fast, confidential transactions and digital asset issuance.

> *Bitcoin's leading sidechain, enabling fast, confidential transactions, and the issuance of assets.* — [Blockstream](https://blockstream.com/liquid/)

## Overview

The **Liquid Network** is an open-source federated [[bitcoin]] sidechain developed by [Blockstream](https://blockstream.com) that serves as a layer-2 solution interoperable with the [[lightning-network]]. It enables faster, more confidential Bitcoin transactions while supporting the issuance and exchange of digital assets including stablecoins, tokenized securities, and bonds.

### Key Milestone (2025)
As of 2025, the Liquid Network has achieved over **$3.27 billion in Total Value Locked (TVL)**, marking significant growth in real-world asset tokenization adoption.

## Core Features

### 🔒 Confidential Transactions
- **Privacy by Default**: Transaction amounts and asset types are hidden from third parties
- **Selective Disclosure**: Users can voluntarily reveal transaction details when needed
- **Cryptographic Verification**: Maintains mathematical proof of transaction validity without exposing sensitive data
- **Confidential Addresses**: Include base address and public blinding key for enhanced privacy

### ⚡ Performance Benefits
- **1-Minute Block Times**: Consistent, non-variable block generation
- **2-Block Finality**: Transactions settle in 2-3 minutes under normal conditions
- **High Throughput**: Handles larger transaction volumes than Bitcoin mainnet
- **Lower Fees**: Reduced transaction costs compared to mainnet

### 🏦 Digital Asset Issuance
- **Issued Assets**: Create new tokens representing fiat, securities, or digital assets
- **Stablecoins**: USD-T (Tether), USDC, and other pegged assets
- **Tokenized Securities**: Real-world asset (RWA) tokenization
- **Utility Tokens**: Custom tokens for specific use cases
- **NFTs**: Non-fungible token support

## Technical Architecture

### Federated Consensus
- **Functionaries**: Network of trusted validators managing the sidechain
- **Multi-signature Security**: Requires majority consensus for block production
- **Bitcoin Interoperability**: Two-way peg with Bitcoin mainnet
- **Elements Platform**: Built on Elements, Blockstream's extensible blockchain platform

### Asset Framework
- **L-BTC**: Liquid Bitcoin (1:1 peg with BTC)
- **Asset Registry**: On-chain asset identification and metadata
- **Atomic Swaps**: Direct asset-to-asset exchanges
- **Multi-asset Support**: Handle multiple asset types in single transactions

## Use Cases

### Financial Markets
- **Trading**: High-frequency trading with confidential amounts
- **Settlement**: Faster settlement for institutional transactions
- **Cross-border Payments**: International transfers with enhanced privacy
- **Arbitrage**: Efficient arbitrage between exchanges

### Asset Tokenization
- **Securities Tokenization**: Digital representation of traditional securities
- **Real Estate**: Property tokenization and fractional ownership
- **Commodities**: Digital gold, oil, and other commodity tokens
- **Corporate Shares**: Like SideSwap's pioneering share tokenization

### Development & Testing
- **Regtest Environment**: Local development using tools like Nigiri
- **Testnet**: Public testing network for developers
- **API Integration**: REST and WebSocket APIs for application development

## Related Technologies

### Bitcoin Ecosystem
- [[bitcoin]] - Base layer blockchain
- [[lightning-network]] - Payment channel layer-2 solution
- [[rootstock]] - Smart contract sidechain
- [[stacks]] - Smart contract layer for Bitcoin

### Development Tools
- **Elements** - Blockchain platform powering Liquid
- **Marina Wallet** - Browser extension for Liquid assets
- **SideSwap** - Decentralized exchange for Liquid assets
- **Green Wallet** - Blockstream's multi-platform wallet

### Asset Standards
- [[BRC-20]] - Bitcoin token standard (mainnet)
- **Issued Assets** - Liquid's native asset framework
- **Confidential Assets** - Privacy-preserving asset transfers

## Development Resources

### Getting Started
```bash
# Start Liquid development environment with Nigiri
nigiri start --liquid

# Fund Liquid address for testing
nigiri faucet --liquid <liquid_address>

# Issue custom Liquid asset
nigiri mint <liquid_address> 1000 MyToken MTK
```

### Key APIs
- **Elements RPC**: Full node API for Liquid operations
- **Esplora API**: Block explorer API for transaction data
- **Asset Registry API**: Asset metadata and information
- **Electrum Protocol**: Lightweight client support

## Ecosystem Growth

The Liquid Network has experienced significant growth in 2025, driven by:

- **Institutional Adoption**: Major financial institutions exploring asset tokenization
- **Regulatory Clarity**: Improved regulatory frameworks for digital assets
- **DeFi Integration**: Growing decentralized finance applications
- **Real-World Assets**: Increasing tokenization of traditional assets

## External Links

- [Official Website](https://liquid.net/)
- [Blockstream Liquid](https://blockstream.com/liquid/)
- [Technical Documentation](https://docs.liquid.net/)
- [Developer Resources](https://docs.liquid.net/docs/technical-overview)
- [Asset Registry](https://liquid.net/assets/)
- [Network Statistics](https://liquid.net/stats/)
