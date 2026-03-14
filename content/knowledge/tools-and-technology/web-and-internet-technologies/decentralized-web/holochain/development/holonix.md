---
title: Holonix
date: 2026-03-03
description: The Nix-based reproducible development environment for Holochain application development
aliases:
  - Holochain Nix Environment
  - Holochain Dev Shell
tags: ["holochain", "software-development", "nix"]

---

# Holonix

**Holonix** is a Nix flake that provides a reproducible development environment for building Holochain applications. It installs the correct versions of Holochain, Rust, and all required tooling into a consistent shell, eliminating "works on my machine" problems.

## What Holonix Provides

- The correct version of the Holochain binary
- Rust toolchain with the required WASM target
- `hc` (Holochain CLI) for managing sandboxes and running tests
- `hc-scaffold` (scaffolding tool) for generating project boilerplate
- WASM-related build tools
- `lair-keystore` for key management

## Installation and Usage

Holonix requires [Nix](https://nixos.org/) with flakes enabled.

### Enter the development shell

```bash
nix develop github:holochain/holonix
```

This downloads and activates the Holonix environment. All Holochain tools are available for the duration of the shell session.

### Using a specific Holochain version

```bash
nix develop github:holochain/holonix/main-0.4
```

Check the [Holonix repository](https://github.com/holochain/holonix) for available branches corresponding to Holochain releases.

### Adding Holonix to your project

Add a `flake.nix` at the root of your project:

```nix
{
  description = "My Holochain app";

  inputs = {
    holonix.url = "github:holochain/holonix/main-0.4";
    nixpkgs.follows = "holonix/nixpkgs";
    flake-parts.follows = "holonix/flake-parts";
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = builtins.attrNames inputs.holonix.devShells;
      perSystem = { inputs', ... }: {
        devShells.default = inputs'.holonix.devShells.holonix;
      };
    };
}
```

Then enter the environment:

```bash
nix develop
```

## Running the Scaffolding Tool

With Holonix active, generate a new hApp:

```bash
hc scaffold happ
```

Generate a new DNA inside an existing hApp:

```bash
hc scaffold dna
```

Generate a new zome:

```bash
hc scaffold zome
```

## Benefits of Holonix

- **Reproducible**: Everyone on the team uses identical tooling
- **Version-pinned**: Holonix pins exact Holochain and Rust versions
- **No global installs**: Tools are scoped to the shell, no system pollution
- **CI-ready**: Same environment in local dev and CI pipelines

## Related

- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/development/holochain-scaffolding-tool|Holochain Scaffolding Tool]] - The scaffolding CLI provided through Holonix
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/development/lair-keystore|Lair Keystore]] - Key management tool bundled in Holonix
- [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/development/holochain-development-guide|Holochain Development Guide]] - Getting started guide

## References

- [Holonix GitHub Repository](https://github.com/holochain/holonix)
- [Holochain Developer Documentation: Set Up Your Dev Environment](https://developer.holochain.org/get-started/)
