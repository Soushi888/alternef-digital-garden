---
title: Unity
description: A cross-platform real-time game engine used for 2D, 3D, VR, and AR applications
aliases:
  - Unity Engine
  - Unity3D
tags: ["game-development", "game-engine", "real-time-3d"]

---

## Overview

Unity is a cross-platform real-time game engine developed by Unity Technologies. Originally released in 2005, it has grown into one of the most widely used game development platforms in the world, powering everything from mobile games to AAA titles, virtual reality experiences, and industrial simulations.

Unity uses [[c-sharp|C#]] as its primary scripting language, making it accessible to developers already familiar with the .NET ecosystem.

## Key Features

### Component-Entity System

Unity organizes game objects through a component-based architecture. Every object in a scene is a `GameObject`, and behavior is added by attaching components such as scripts, colliders, renderers, and audio sources. This makes it straightforward to compose complex behaviors from simple, reusable pieces.

### Asset Store

Unity's Asset Store provides thousands of pre-built assets, tools, and plugins that accelerate development. From character animations to complete level packs, the store reduces the time needed to prototype and ship projects.

### Cross-Platform Export

A single Unity project can be exported to over 20 platforms including Windows, macOS, Linux, iOS, Android, WebGL, PlayStation, Xbox, and Nintendo Switch. The platform abstraction layer handles most platform-specific concerns automatically.

### DOTS (Data-Oriented Technology Stack)

Unity's modern high-performance path uses the Entity Component System (ECS), the C# Job System, and the Burst Compiler to deliver near-native performance for data-intensive simulations and large-scale games.

### Visual Scripting

Unity includes a node-based visual scripting system (formerly Bolt) that allows non-programmers to create game logic without writing code.

## Use Cases

- **2D and 3D games**: Mobile, console, and PC games across all genres
- **Extended Reality**: VR and AR applications using OpenXR, Meta Quest, and HoloLens
- **Architectural visualization**: Real-time walkthroughs of buildings and spaces
- **Simulations**: Industrial, training, and scientific simulations
- **Film and animation**: Virtual production and real-time cinematics

## Ecosystem

Unity integrates with version control systems, continuous integration pipelines, and asset pipelines. The Unity Package Manager (UPM) handles dependencies and versioning for first- and third-party packages.

## Honest Tradeoffs

Unity's runtime license model changed significantly in 2023, introducing per-install fees that caused significant controversy in the developer community. Many studios began evaluating alternatives. The subscription model and asset store revenue split are ongoing considerations for commercial projects.

The engine's older architecture can result in performance bottlenecks for very large scenes without careful optimization. DOTS addresses this but requires learning a different programming paradigm.

## Related Topics

- [[c-sharp|C#]]
- [[webassembly|WebAssembly]]
- [[knowledge/tools-and-technology/specialized-technologies/game-development/index|Game Development]]
