---
title: Stablecoin
description: A cryptocurrency designed to maintain stable value by pegging to a fiat currency, commodity, or algorithm
aliases:
  - Stablecoins
  - stable coin
tags:
  - blockchain
  - economics
  - finance
  - decentralization
date: 2026-03-14
---

A stablecoin is a cryptocurrency designed to maintain a stable value, typically by pegging to the US dollar, another fiat currency, a commodity like gold, or through algorithmic mechanisms. They exist because most cryptocurrencies are highly volatile: Bitcoin and Ethereum routinely move 10-20% in a matter of days, making them poor units of account for commercial transactions, lending, or savings. Stablecoins provide the "cash layer" of the crypto ecosystem: stable-value tokens that can be held as reserves, used for payments, or moved between volatile assets without converting back to fiat.

## Types

The four main designs reflect different tradeoffs between decentralization and stability guarantees:

**Fiat-collateralized**: USDC (Circle) and USDT (Tether) hold dollar reserves in bank accounts and issue tokens redeemable 1:1 for dollars. Maximally stable in normal conditions but completely centralized: Circle can freeze any USDC wallet by blacklisting an address, which they have done at government request. The issuer is a single point of regulatory exposure. The stability guarantee is only as good as the issuer's solvency and regulatory standing.

**Crypto-collateralized**: DAI (MakerDAO) is backed by over-collateralized cryptocurrency positions. A user locks $150 of ETH to borrow $100 of DAI. If ETH drops, the position liquidates automatically before DAI becomes underbacked. Governance is decentralized (MKR token holders vote on parameters), but DAI inherits the volatility risk of its collateral assets. In a broad crypto market crash, DAI's collateral can face rapid devaluation.

**Algorithmic**: Terra/LUNA (2022) attempted stability through a mint-and-burn mechanism between two tokens, with no collateral backing. When market confidence broke, UST lost its peg; the algorithmic mechanism tried to restore it by minting more LUNA, which diluted LUNA's value further, accelerating the spiral. Roughly $40 billion in combined value was destroyed in days. No major algorithmic stablecoin has maintained its peg long-term without collateral.

**Commodity-backed**: Tokens like XAUT (Tether Gold) represent physical gold held in vaults. Stable relative to gold prices, not the dollar. Provides gold exposure with on-chain liquidity, but inherits the issuer-trust problem of fiat-backed coins.

## Role in DeFi

Decentralized Finance cannot function without stablecoins. Every major category of DeFi application depends on them:

**Exchanges**: Stablecoin trading pairs (ETH/USDC) allow users to exit volatile positions without leaving the chain. The pair provides a stable reference price without requiring conversion to dollars in a bank.

**Lending**: Platforms like Aave and Compound primarily denominate loans and collateral in stablecoins. Borrowers take out USDC-denominated loans; lenders earn yield in USDC.

**Yield farming**: Stablecoin liquidity pools provide yield to liquidity providers with lower impermanent loss than volatile asset pairs. They are the foundation of "safe yield" in DeFi protocols.

The structural irony: DeFi's stable layer depends on fiat-backed stablecoins issued by centralized, regulated entities. The most liquid stablecoins are the most centralized.

## Systemic Risks

The Terra collapse demonstrated that algorithmic stablecoins are vulnerable to bank-run dynamics: any peg maintained through confidence rather than collateral can fail once confidence breaks. The mechanism that should restore the peg instead amplifies the collapse.

For fiat-backed stablecoins, the risk is regulatory. Circle (USDC issuer) is a US-regulated company. A government decision to restrict stablecoin issuance or freeze assets would propagate instantly through every DeFi protocol denominated in USDC. The "decentralized" finance built on USDC has a centralized, regulatable dependency at its foundation.

More structurally: every dollar-pegged stablecoin anchors the decentralized ecosystem back to fiat money managed by central banks. The crypto ecosystem's "cash" is still the sovereign's currency.

## Garden Perspective

The stablecoin problem reveals the anchoring-back-to-fiat tension running through all current crypto systems. The ecosystem produces extraordinary financial engineering, but denominated in dollars because no decentralized unit of account has achieved stability or trust at scale.

[[valueflows|ValueFlows]] and mutual credit systems suggest a different framing: value does not need to be pegged to fiat if it is backed by real productive capacity. Holochain's Holo fuel is an example: it is backed by computing services (hosting capacity) rather than dollars or gold. A unit of Holo fuel represents a claim on real-world service provision, not on a sovereign's promise. This points toward resource-backed [[tokenomie|tokens]] as a path beyond the fiat-anchor problem: not abstractly stable, but backed by the specific capacities of the communities that issue them. The question the garden holds: what would community-native currencies look like, backed by the actual work the community produces?

## Related Concepts

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/index|Decentralized Web]]
- [[smart-contracts|Smart Contracts]]
- [[valueflows|ValueFlows]]
- [[tokenomie|Tokenomics]]
- [[web-3|Web 3]]
- [[internet-computer-protocol|Internet Computer Protocol]]
