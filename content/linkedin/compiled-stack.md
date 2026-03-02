---
title: "The Compiled Stack: Building Sovereign Software with Rust, Tauri, Svelte, and Holochain"
date: "2026-03-02"
author: "Soushi888"
description: "A LinkedIn article adapting the compiled stack blog post for professional audience."
tags:
  ["linkedin", "rust", "svelte", "holochain", "software-architecture", "typescript", "webassembly"]
draft: false
---

What if every layer of your tech stack shared the same philosophy?

Not just technical compatibility, but a shared conviction: compile away everything unnecessary, make errors visible, and respect the user's sovereignty over their own data and device. That's the premise behind the stack I've been building with and writing about.

The stack is: **Rust, Tauri, WebAssembly, TypeScript, Svelte, UnoCSS, Holochain, and Effect.** It spans desktop, web, mobile, and peer-to-peer from a single shared codebase. And it's held together not just by technical interoperability, but by a unifying methodology: functional programming as the discipline that makes the whole coherent.

Here's why the pieces chose each other.

## Rust as the Universal Backbone

Rust is the thread that runs through everything in this stack. It compiles to native binaries for desktop. It compiles to WebAssembly for the browser. It's the language Holochain is built on.

That single choice creates a shared logic layer across every deployment target. Business logic, data validation, cryptographic operations: write them once in Rust, compile them to wherever they need to run. The same function that validates a resource transfer in a distributed Holochain application can also run client-side in a browser through WebAssembly, or natively inside a Tauri desktop app.

What's less often acknowledged is how deeply functional Rust's idiomatic patterns already are. Algebraic types through `enum`, pattern matching with `match`, `Option` and `Result` for explicit error handling, iterator chains with `map`, `filter`, and `fold`. When experienced Rust developers describe "idiomatic" code, they're often describing functional patterns without using the word.

**The honest tradeoff:** Rust's learning curve is real and famously steep. The borrow checker and lifetime annotations demand a significant upfront investment. Choosing Rust as the backbone means accepting that onboarding new contributors takes longer. The payoff in correctness and performance is genuine, but it's not free.

## Tauri: The Shell That Gets Out of the Way

The desktop application story has long been dominated by two bad options: Electron (ships an entire Chromium browser, consuming hundreds of megabytes of RAM) or native toolkits that fragment the ecosystem and require platform-specific expertise.

Tauri resolves this by using the system's native webview instead of bundling a browser engine, with a Rust backend. A Tauri app can ship as a binary under 10 MB with memory usage competitive with native applications. The performance argument against web-based desktop apps largely evaporates.

With Tauri v2, this extends to mobile. The same Svelte UI and Rust backend deploy to iOS and Android, making Tauri a genuine cross-platform framework rather than just a desktop shell.

**The honest tradeoff:** Relying on the system webview means inconsistencies across platforms (WebKit on macOS, WebView2 on Windows, varying versions on Linux). The mobile story in Tauri v2 is functional but still maturing; the plugin ecosystem is thinner than React Native's. For teams that need deep mobile platform integration today, Tauri may not yet be the pragmatic choice.

## WebAssembly: The Bridge Between Worlds

WebAssembly is what keeps Rust from being trapped on the backend. Computation-heavy tasks like cryptographic verification, data transformation, or graph calculations can happen client-side without server round trips.

For a local-first philosophy, this is essential. Users shouldn't need to call home to a server for their own application to think. WebAssembly makes it possible to push real computation to the user's device while maintaining the accessibility of a web-based interface.

It also creates an elegant development workflow: prototype logic in Rust, test it natively, compile to WASM for browser deployment, and later embed it in Holochain zomes for the distributed version. The same core logic travels across contexts without translation.

**The honest tradeoff:** The WASM boundary isn't seamless. Serialization overhead between JavaScript and WASM can negate performance gains for frequent fine-grained calls. Debugging WASM in the browser is still rougher than debugging JavaScript. Bundle sizes can also surprise without careful use of optimization flags.

## TypeScript, Svelte, and Effect: The Compiled UI

Svelte occupies a unique position among frontend frameworks. Where React and Vue ship a runtime library that interprets components in the browser, Svelte compiles components into efficient imperative JavaScript at build time. The framework disappears. What ships is lean, direct DOM manipulation code with no abstraction overhead.

This mirrors Rust's philosophy exactly: pay no cost for what you don't use.

TypeScript adds type safety that bridges cleanly with Rust's type system. Data structures defined in Rust can have TypeScript equivalents that stay in sync, creating a typed pipeline from backend logic to UI rendering. But TypeScript's native error handling (try/catch with untyped exceptions) falls short of Rust's discipline.

This is where Effect transforms the TypeScript experience. Effect brings Rust's `Result` philosophy to TypeScript and goes further: typed errors, dependency injection, structured concurrency, retries, and resource management, all composable in functional pipelines.

The parallel between the two languages becomes strikingly direct. In Rust, the `?` operator propagates errors through a typed pipeline. In Effect TypeScript, `flatMap` does the same. Developers working across both languages carry the same mental model.

**The honest tradeoff:** Svelte's ecosystem is smaller than React's by a wide margin. Svelte 5's runes system is a significant paradigm shift, and the ecosystem is still adapting. Effect introduces its own substantial learning curve. For a team, adopting both Svelte 5 and Effect simultaneously means two steep learning curves on the frontend alone.

## UnoCSS: Compiled Styling

UnoCSS completes the compiled philosophy at the styling layer. It's an on-demand atomic CSS engine that generates only the styles actually used, at build time, with zero runtime.

Its preset system makes it especially suited for cross-platform work. The Tailwind preset provides familiar utilities. The Icons preset turns any Iconify icon into a CSS class without font imports or SVG wrappers. Custom shortcuts create a shared design vocabulary across deployment targets.

For cross-platform theming, UnoCSS's variant system supports platform-aware utilities: larger touch targets on mobile, denser layouts on desktop, system-aware dark mode in Tauri, all through the same class vocabulary.

## Holochain: Distributed by Design

Holochain is where this stack diverges most sharply from conventional web development. It's not a blockchain. There's no global consensus, no mining, no token required to participate.

Instead, each user maintains their own hash chain of actions, and a distributed hash table ensures data availability across the network. Data doesn't live on someone else's server. There's no central point of failure, no platform that can change terms of service or shut down access.

Holochain zomes (the application modules) are written in Rust. That means the same language handling business logic across the rest of the stack also defines distributed behavior. A validation function can run identically whether it's executing locally in a Tauri app, in a browser via WebAssembly, or across a Holochain network as a distributed integrity check.

**The honest tradeoff:** Holochain's ecosystem is small, with a developer community in the hundreds rather than tens of thousands. Documentation has improved but still has gaps. Debugging distributed validation logic across multiple agents is genuinely harder than debugging client-server code. And currently, Holochain applications require users to run a local conductor; there's no "just visit a URL" onboarding experience yet. The sovereignty is genuine, but the adoption friction is real.

## Functional Programming: The Unifying Thread

A stack is more than its tools. It's also the methodology that governs how code is written across those tools.

Functional programming is the discipline that unifies this stack at the code level. Rust's iterator chains compose data transformations. Effect's pipes compose operations with error handling. Svelte's reactive declarations compose state derivations. UnoCSS's utility classes compose visual styles. Holochain's zomes compose application capabilities.

The same principle (small, pure, composable units) operates at every level of abstraction. For distributed systems where failure is not exceptional but expected, this isn't academic purism. It's the engineering methodology that makes reliability possible without drowning in defensive code.

## The 7-Layer Architecture

Principles need structure to mean anything in production. In practice, this stack's functional methodology crystallizes into a 7-layer architecture:

1. **Services**: Pure Effect functions wrapping Holochain zome calls, with typed errors and explicit dependencies in the type signature.
2. **Stores**: The bridge between Effect and Svelte's reactivity, using standardized helper functions to eliminate boilerplate.
3. **Schemas**: Effect Schema for validation at strategic boundaries, with branded types that make invalid states unrepresentable.
4. **Errors**: A centralized hierarchy where errors become progressively more user-friendly as they bubble up.
5. **Composables**: Business logic extracted from components into composable functions, keeping templates focused on presentation.
6. **Components**: Pure presentation layer consuming composable interfaces, with UnoCSS styling and accessibility managed here.
7. **Testing**: Layer-specific strategies, from mocked service tests to multi-agent Tryorama scenarios for zomes.

The architecture is adoptable incrementally. Start with services and stores, add the other layers as complexity demands.

## Why These Pieces Chose Each Other

There's a deeper coherence here beyond technical compatibility. Every tool in this stack shares a set of values:

Compile away waste. Rust, Svelte, and UnoCSS all eliminate the unnecessary at build time. What reaches the user is exactly what's needed and nothing more.

Make errors visible. Rust's `Result` type and Effect's typed errors share the conviction that failure paths deserve the same attention as happy paths.

Respect user sovereignty. Tauri doesn't bundle someone else's browser. Holochain doesn't require someone else's server. Local-first means the user's data belongs to the user.

These tools were built by people who share a similar dissatisfaction with bloated, centralized, wasteful software. Choosing them together is an architectural statement about what software should be.

---

The entry points are incremental: start with a Svelte app styled with UnoCSS. Wrap it in Tauri for desktop. Add Rust logic compiled to WebAssembly. Connect it to Holochain for the distributed version. Each step adds capability without invalidating previous work.

I wrote a longer deep-dive covering the architecture in full detail, including the Effect 7-layer pattern, the spectrum of deployment targets, and honest tradeoff analysis for every layer. You can read it here: [The Compiled Stack](https://alternef.garden/blog/compiled-stack)

What part of this stack are you most curious about? Or what would you push back on? I'd love to hear from developers who've made different choices and why.
