---
title: "Progenitor"
description: "How Holochain hApps solve the bootstrap problem: embedding the founder's public key in DNA properties to grant deterministic first-admin authority without a central server."
date: 2025-02-15
updated: 2026-03-18
tags: ["programming", "holochain", "distributed-systems", "peer-to-peer", "hdk"]
---

#holochain/concepts

## What is the progenitor pattern?

In a [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] network, every agent is equal by design. There is no server, no root administrator, no privileged boot node. But every real-world community needs a founder: the person who created the network and should be trusted with initial governance. The **progenitor pattern** is how Holochain solves this bootstrap problem.

The progenitor is the agent whose public key is **embedded in the [[dna-and-zomes|DNA]]'s properties at install time**. Any agent can check whether they are the progenitor by comparing their own public key to the one stored in the DNA. This check is cryptographically verifiable and happens entirely inside the Wasm sandbox (no trust assumption required).

## Why it matters

Without a progenitor mechanism, the first person to create a profile in a freshly-installed network would automatically become the administrator, regardless of who they actually are. In a peer-to-peer context where there is no deployment server to set up roles, this creates a race condition: the "right" person might not be the first to connect.

The progenitor pattern closes this gap. It ties the bootstrapping of authority to the installation event itself, not to the order of user actions.

This makes it suitable for:
- **Distributed app launchers** (Kangaroo / holo-electron) where the installer controls the first launch
- **Moss (We/Weave) tools** where the group creator is the natural progenitor
- Any hApp that needs deterministic first-admin bootstrapping without a central server

## How it works: the full stack

### 1. DNA Properties (Rust)

The progenitor's public key is stored as a DNA property. DNA properties are set at install time and cannot be changed after installation; they are part of the DNA's unique identity (see [[dna-and-zomes|DNA and Zomes]]).

```rust
// dnas/.../utils/src/dna_properties.rs
pub struct DnaProperties {
    pub progenitor_pubkey: String,
}

impl DnaProperties {
    pub fn get_progenitor_pubkey() -> ExternResult<AgentPubKey> {
        let s = DnaProperties::get()?.progenitor_pubkey;
        AgentPubKey::try_from(s).map_err(|e| CommonError::HoloHash(e).into())
    }
}
```

### 2. Progenitor check utility

A single utility function that every zome can call:

```rust
// dnas/.../utils/src/lib.rs
pub fn check_if_progenitor() -> ExternResult<bool> {
    let progenitor_pubkey = DnaProperties::get_progenitor_pubkey()?;
    Ok(progenitor_pubkey == agent_info()?.agent_initial_pubkey)
}
```

This compares the stored key to `agent_initial_pubkey`, the stable key that never rotates for this agent in this [[cell|cell]].

### 3. happ.yaml configuration

```yaml
# workdir/happ.yaml
roles:
  - name: requests_and_offers
    dna:
      modifiers:
        properties:
          progenitor_pubkey: "uhCAkVNjcdnXfoExk87X1hKArKH43bZnAidlsSgqBqeGvFpOPiUCT"
```

In **production** (Kangaroo launcher / Holo), this is set dynamically at install time to the installing agent's key. The launcher generates the agent keypair, then injects it into the happ properties before installing.

In **dev mode** (`bun start` / `hc sandbox`), it defaults to a static placeholder, which means `check_if_progenitor()` always returns `false`. That is why a dedicated dev launcher is needed.

### 4. Frontend: two contexts

**In Weave/Moss context** (the tool runs inside We):

The Weave API exposes `weaveClient.isGroupProgenitor(agentKey)`, where the group creator is the natural progenitor. The store polls this on startup:

```typescript
// ui/src/lib/stores/weave.store.svelte.ts
let isProgenitor = $state(false);

// Called during initialization
async function checkProgenitorStatus(agentKey: AgentPubKey) {
    isProgenitor = await weaveClient.isGroupProgenitor(agentKey);
}
```

**In standalone / dev context:**

The layout calls the misc zome's `check_if_i_am_progenitor` function via the administration service.

**Auto-registration flow:**

When the app starts and no administrators exist yet, if the current agent is the progenitor, the layout automatically registers them as the first admin. Non-progenitors who try to register before any admin exists are blocked.

## Dev testing: `bun start:progenitor`

The standard `bun start` launcher cannot test the progenitor pattern because it leaves `progenitor_pubkey` null. The `start:progenitor` script was built to fill this gap.

**What it does:**
1. Builds the hApp (`bun build:happ`)
2. Creates N conductors using `hc sandbox` (one per agent)
3. Generates agent 1's keypair **before** installation
4. Installs the hApp in all conductors with `rolesSettings.progenitor_pubkey = base64(agent1Key)`
5. Issues auth tokens for each conductor via AdminWebsocket
6. Starts the Vite dev server
7. Prints one URL per agent: `http://localhost:5173?hcPort=42000&hcToken=<base64>`
   - Agent 1 is labeled `(PROGENITOR)` in the console output

**Key insight: why not tryorama**

The initial implementation used `@holochain/tryorama`'s Scenario API to manage conductors. This failed on Holochain 0.6 because tryorama 0.19 hardcodes webrtc transport, which is incompatible with the Holochain 0.6 Nix environment (quic transport). The final version calls `hc sandbox` and `holochain` directly, using `AdminWebsocket` from `@holochain/client` for all admin operations.

**UI connection: URL params fallback**

The `HolochainClientService` normally connects via `__HC_LAUNCHER_ENV__` (injected by Kangaroo/Tauri) or `hc spin` (dev server). For the progenitor script, a third path was added: if both `hcPort` and `hcToken` URL params are present, it connects to that specific conductor:

```typescript
// ui/src/lib/services/holochainClient.service.svelte.ts
const urlPort = new URLSearchParams(window.location.search).get('hcPort');
const urlToken = new URLSearchParams(window.location.search).get('hcToken');

if (urlPort && urlToken) {
    // Connect to the conductor specified by URL params (start:progenitor)
    return AppWebsocket.connect({
        url: new URL(`ws://127.0.0.1:${urlPort}`),
        token: Base64.toUint8Array(urlToken),
    });
}
```

## Testing with Tryorama

Progenitor-aware tests pass the progenitor pubkey explicitly when installing:

```typescript
// tests/src/requests_and_offers/utils.ts
const [alice, bob] = await scenario.addPlayersWithApps([
    {
        appBundleSource: { type: 'path', value: hAppPath },
        options: {
            rolesSettings: {
                requests_and_offers: {
                    modifiers: {
                        properties: { progenitor_pubkey: Base64.fromUint8Array(alice.agentPubKey) }
                    }
                }
            }
        }
    },
    { appBundleSource: { type: 'path', value: hAppPath }, /* bob has no progenitor key */ }
]);
```

This gives Alice progenitor status, allowing tests to verify that only Alice can bootstrap administration, and that Bob (non-progenitor) cannot.

## Moss progenitor vs. DNA progenitor

There are two "progenitor" concepts at play:

| Context | Source | Who is it? |
|---------|--------|------------|
| **Moss/Weave** | `weaveClient.isGroupProgenitor()` | The agent who added the tool to the group |
| **DNA properties** | `check_if_progenitor()` in Rust | The agent whose key was injected at hApp install time |

In production with Kangaroo, these are the same person. In a Moss group, the Weave API is more reliable because the launcher already knows the group creator. The DNA-level check is the fallback / standalone path.

## Limitations

- **Key loss**: If the progenitor loses access to their keypair, there is no recovery path. No one else can become the first admin through the progenitor bootstrap flow. (Subsequent admins can be added by existing admins once the progenitor has registered.)
- **Network Creation UX** (issue #95): The full user-facing flow (Kangaroo splash screen, QR invite for joining an existing network) is still to be built. That is the next milestone on top of this foundation.
- **`progenitor_pubkey: null` in happ.yaml**: Dev builds with the default happ.yaml cannot test the progenitor badge or the auto-admin flow. Always use `bun start:progenitor` for that.

## Related

- [[capability-tokens|Capability Tokens]]: the broader access control system in Holochain
- [[dna-and-zomes|DNA and Zomes]]: how DNA properties are defined and hashed
- [[cell|Cell]]: the runtime unit where progenitor checks execute
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/concepts/index|Holochain Concepts]]: full concepts index
