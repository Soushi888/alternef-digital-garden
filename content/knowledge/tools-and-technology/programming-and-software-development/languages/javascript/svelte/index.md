---
title: Svelte
description: A reactive JavaScript framework for building efficient web applications with a revolutionary approach to UI development
tags:
  - javascript
  - frontend
  - framework
  - web
related pages:
  - "[[knowledge/tools-and-technology/programming-and-software-development/languages/javascript/svelte/sveltekit|SvelteKit]]"
  - "[[knowledge/tools-and-technology/programming-and-software-development/languages/javascript/svelte/threlte|Threlte]]"
---

## Overview

Svelte is a modern JavaScript framework for building user interfaces that takes a fundamentally different approach compared to frameworks like React or Vue. Instead of using a virtual DOM, Svelte shifts the work to compile time, converting components into highly efficient imperative code that directly updates the DOM. This approach results in smaller bundle sizes and better runtime performance.

## Key Features

### Truly Reactive

- **No Virtual DOM**: Updates the DOM directly when state changes
- **Fine-grained reactivity**: Only updates what actually needs to change
- **Minimal runtime**: Most of the framework's work happens during compilation

### Developer Experience

- **Component-based architecture**: Self-contained, reusable components
- **Intuitive syntax**: Familiar HTML, CSS, and JavaScript with minimal boilerplate
- **Built-in animations and transitions**: Simple API for creating smooth UI transitions
- **Scoped CSS**: Component styles are automatically scoped to prevent leaking

### Performance

- **Smaller bundle sizes**: Ships less code to the browser
- **Faster initial load**: No framework runtime overhead
- **Better runtime performance**: Direct DOM manipulation without virtual DOM diffing
- **Less memory usage**: Minimal runtime footprint

## Svelte 5: Runes

Svelte 5 introduces "runes" - a powerful set of primitives for controlling reactivity inside components. Runes provide a more explicit and flexible way to declare reactive state, derived values, and effects.

### Core Runes

- **`$state`**: Declares reactive state variables

  ```js
  let count = $state(0);
  ```

- **`$derived`**: Creates values derived from state

  ```js
  let doubled = $derived(count * 2);
  ```

- **`$effect`**: Runs side effects when dependencies change

  ```js
  $effect(() => {
    console.log(`Count is now ${count}`);
  });
  ```

- **`$props`**: Declares component props with optional defaults

  ```js
  let { name = 'world' } = $props();
  ```

### Benefits of Runes

- **Universal reactivity**: Works in any scope, not just at component top-level
- **Explicit declarations**: Makes reactivity more visible and intentional
- **Better TypeScript integration**: Improved type inference and checking
- **More flexible**: Can be used in class fields and regular JS/TS files

## Component Structure

Svelte components are written in `.svelte` files that combine HTML, CSS, and JavaScript:

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
  
  function increment() {
    count++;
  }
</script>

<style>
  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
  }
</style>

<button onclick={increment}>
  Clicked {count} times
</button>

<p>Double value: {doubled}</p>
```

## Ecosystem

- **[[sveltekit|SvelteKit]]**: Official application framework for building full-featured Svelte applications
- **Svelte DevTools**: Browser extension for debugging Svelte applications
- **Svelte Add**: Collection of integrations for adding functionality to Svelte projects
- **[[threlte|Threlte]]**: 3D framework for Svelte using Three.js
- **[[skeleton-ui|Skeleton UI]]**: UI component library for Svelte
- **[[flowbite-svelte|Flowbite Svelte]]**: Tailwind CSS components for Svelte
- **[[animotion|Animotion]]**: Presentation framework for Svelte
- **[[sveltepress|SveltePress]]**: Documentation framework for Svelte
- **[[svelte-persisted-store|Svelte Persisted Store]]**: State persistence for Svelte
- **[[shadcn-svelte|Shadcn Svelte]]**: UI component collection

## Getting Started

```bash
# Create a new project with SvelteKit
npm create svelte@latest my-app

# Or with Vite
npm create vite@latest my-app -- --template svelte
```

## Resources

- [Official Website](https://svelte.dev/)
- [Documentation](https://svelte.dev/docs)
- [Tutorial](https://svelte.dev/tutorial)
- [Examples](https://svelte.dev/examples)
- [GitHub Repository](https://github.com/sveltejs/svelte)
