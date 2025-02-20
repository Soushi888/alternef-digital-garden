[Ganache](https://trufflesuite.com/ganache) is a personal [[Blockchain|blockchain]] for rapid [[Ethereum]] and Corda distributed application development. You can use Ganache across the entire development cycle; enabling you to develop, deploy, and test your dApps in a safe and deterministic environment.

Ganache comes in two flavors: a UI and CLI. Ganache UI is a desktop application supporting Ethereum and [[Filecoin]] technology. Our more robust command-line tool, [ganache](https://github.com/trufflesuite/ganache), is available for Ethereum development. It offers:

-   `console.log` in Solidity
-   Zero-config Mainnet and testnet forking
-   Fork any Ethereum network without waiting to sync
-   Ethereum [[JSON-RPC]] support
-   Snapshot/revert state
-   Mine blocks instantly, on demand, or at an interval
-   Fast-forward time
-   Impersonate any account (no private keys required!)
-   Listens for JSON-RPC 2.0 requests over [[HTTP]]/[[WebSockets]]
-   Programmatic use in Node.js
-   Pending Transactions

Prefer using the command-line? This documentation will focus only on the UI flavor of Ganache. Please see the [Ganache README](https://github.com/trufflesuite/ganache#readme) for command-line documentation.

You can also check out our [interactive documentation](https://ganache.dev/) if you'd like to understand how dapps communicate to nodes at the JSON-RPC level (the level at which web3.js and ethers.js communicate with Ethereum nodes).

All versions of Ganache are available for Windows, Mac, and Linux.
