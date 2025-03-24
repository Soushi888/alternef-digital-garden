---
title: Threlte
description: A 3D framework for Svelte that leverages Three.js for building interactive 3D web applications
tags:
  - javascript
  - svelte
  - 3d
  - web
  - framework
related pages:
  - "[[knowledge/tools-and-technology/programming-and-software-development/languages/javascript/svelte/svelte|Svelte]]"
---

## Overview

Threlte is a 3D framework designed specifically for Svelte that enables developers to build interactive 3D applications for the web. It provides a declarative, state-driven API that wraps Three.js functionality, making it easier to create and manage 3D scenes within Svelte's component-based architecture.

## Key Features

- **Svelte-native API**: Compose 3D scenes using Svelte components
- **Reactive**: Leverages Svelte's reactivity system for state management
- **Declarative**: Express Three.js functionality through a component-based approach
- **Type-safe**: Built with TypeScript for enhanced developer experience
- **Modular**: Organized into focused packages for different needs

## Core Components

The framework is built around a core component `<T>`, which acts as a thin wrapper around any Three.js object. This enables developers to use Three.js features in a declarative way that feels natural in Svelte applications.

## Ecosystem

Threlte offers a modular ecosystem of packages:

- **@threlte/core**: Foundation providing bindings to Three.js
- **@threlte/extras**: Additional components and utilities (orbit controls, effects)
- **@threlte/rapier**: Integration with Rapier physics engine
- **@threlte/theatre**: Support for animations using Theatre.js
- **@threlte/gltf**: Converts GLTF 3D models into reusable Threlte components
- **@threlte/xr**: Tools for VR and AR experiences

## Use Cases

- Interactive 3D visualizations
- Web-based games
- Product configurators
- Virtual showrooms
- Data visualization
- Educational simulations
- AR/VR web experiences

## Getting Started

```javascript
// Example of a basic Threlte scene
<script>
  import { Canvas, T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
</script>

<Canvas>
  <T.PerspectiveCamera position={[0, 0, 5]} makeDefault>
    <OrbitControls />
  </T.PerspectiveCamera>
  
  <T.DirectionalLight position={[3, 10, 10]} />
  <T.Mesh>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="tomato" />
  </T.Mesh>
</Canvas>
```

## Resources

- [Official Website](https://threlte.xyz/)
- [Documentation](https://threlte.xyz/docs)
- [GitHub Repository](https://github.com/threlte/threlte)
