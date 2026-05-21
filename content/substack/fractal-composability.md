---
title: "The Grammar That Never Outgrows Itself"
subtitle: "On fractal composability, and why the best systems have very small hearts"
date: "2026-05-21"
author: "Soushi888"
preview: "The most powerful systems aren't built from many parts. They're built from one part that can contain itself."
tags: ["programming", "complexity-science", "distributed-systems", "commons", "music"]
readTime: "8 min"
---

*The most powerful systems are not built from many parts. They are built from one part that can contain itself.*

---

Consider two systems that seem to have nothing in common.

The first is a music composition language written in Rust. You describe a melody the way you might describe a sentence: pitch and duration, sequences of notes, simultaneous voices, modifiers that wrap a phrase and give it context. You write music like you write code, and then you render it to audio.

The second is a protocol for governing shared resources across a peer-to-peer network. A makerspace in Montreal has a 3D printer sitting idle. A cooperative across town needs one. The protocol lets them find each other, negotiate terms, transfer custodianship, and record the whole interaction without any platform taking a cut or any central authority imposing the rules. Governance travels with the resource itself.

Different domains. Different teams. Different problems. And yet, when you look at their internal structure, you find the same pattern at work.

## The Distinction That Matters

Most systems are built by accumulation. You start with a core and keep adding parts. You add a module for this, a layer for that, a plugin for the other thing. Over time the system becomes capable, and also becomes impossible to hold in your head. The complexity compounds because each new part adds surface area.

A small class of systems works differently. They are built from a single primitive that can contain itself. You don't add parts: you *compose the primitive with itself*, recursively, at any depth. The system grows not by accumulating components but by elaborating its own grammar.

The technical name for this property is fractal composability. A system is fractally composable when its combination operation is *closed*: any composition of parts produces something that can in turn be composed, without ever leaving the grammar. A modular system has parts you can swap. A fractal system has a primitive whose recursive self-application generates the whole space.

The difference matters because closed systems don't develop seams. There is no boundary where "inside the grammar" ends and "outside the grammar" begins. You can always go deeper, wrap more context, compose at a higher level, and the system stays coherent throughout.

## A Music DSL With Five Words

[MuseCode](https://github.com/Soushi888/music-as-code) is a Rust library for describing and rendering music as source code. Its vocabulary has five words:

- **Note**: a sounded event with pitch, duration, and attributes
- **Rest**: silence for a given duration
- **Seq**: children play in order
- **Par**: children play simultaneously
- **Modify**: apply a context modifier to a subtree

That is the entire grammar. Everything else in the system (all the combinators, all the macros, all the rendering backends) is sugar built from these five recursive cases.

The reason this works is that `Music` is its own return type. A `Seq` of `Music` values is itself a `Music`. A `Par` of `Music` values is itself a `Music`. You can wrap any `Music` in `Modify`, which changes its tempo or key or dynamic, and the result is still `Music`. Every operation on the primitive returns the primitive. Composition is closed.

The `Modify` constructor is the clever one. It lets you build a note first, without context, and progressively decorate it with musical meaning. You write the melody, then you put it in a key. You write a phrase, then you give it a tempo. Complexity accumulates in context wrappers around a neutral core, rather than being baked into every element from the start. You only pay for the structure you actually use.

A grammar of five well-chosen constructors can express a Bach fugue or a Piazzolla reharmonization. That is the fractal property doing its work.

## A Governance Protocol With Three Layers

[Nondominium](https://github.com/Sensorica/nondominium) is a Holochain-based protocol for governing shared resources across peer-to-peer networks. Its primitive is called the Nondominium Object, or NDO. Every resource in the network (a 3D printer, a software module, a community fund, a design specification) is represented as an NDO.

An NDO has three layers:

- **Layer 0, Identity**: a permanent cryptographic anchor. It exists from the moment the resource is created and survives everything. Even if the resource is archived, this layer remains as the record that it existed.
- **Layer 1, Specification**: form and governance. What is this resource? Who can use it? What are the conditions? This layer activates when the resource has a form worth sharing.
- **Layer 2, Process**: active work. Economic events, commitments, coordination between agents. This layer activates when people are actually using and transforming the resource.

The layers don't replace each other. They are co-active, like the brainstem, cerebellum, and cortex of an evolved nervous system. They activate progressively as environmental complexity rises, rather than being declared up front in a fixed schema.

This is the structural answer to a problem that governance systems regularly ignore: a resource at the beginning of its life is not the same as a resource in the middle of active use, but you should not need to predict which state it will be in when you define it. The NDO starts minimal and grows into complexity as context demands, not before.

The fractal property appears in containment. A Project NDO references Resource NDOs which reference Component NDOs. Each node carries the same three-layer structural potential. Every node is simultaneously a complete whole (it has everything it needs to be governed) and a part of something larger (it participates in the governance of the project that contains it). The same primitive, all the way down.

## What Both Systems Share

Two different domains, two different problems, two different teams. The same six properties.

**A small kernel of well-chosen primitives.** MuseCode has five constructors. The NDO has three layers. Neither system tries to enumerate all the cases it might encounter. They define the minimum structure from which every case can be built.

**Closure under composition.** Operations on the primitive return the primitive. You never leave the grammar. Compositions of music are music. Nested NDOs are still NDOs governed by the same protocol.

**Recursive containment.** The primitive can contain itself at any position. A `Seq` can contain another `Seq`. A Project NDO can contain Resource NDOs that contain Component NDOs. Depth is not a special case.

**A context-wrapping mechanism for progressive elaboration.** `Modify` wraps a musical subtree with context. Layer activation wraps a resource with increasing governance complexity. Neither requires you to declare the context up front. You add it when you need it.

**Content-addressed identity as the substrate for reuse.** MuseCode uses Blake3 hashes so the same musical phrase can be referenced from multiple compositions without duplication. Nondominium uses the cryptographic action hash of the NDO's genesis entry as its permanent name in the distributed hash table. In both systems, the hash of a structure *is* that structure's name. This is what makes reuse unambiguous: the same fragment in different contexts retains its identity because that identity is intrinsic to its content, not assigned from outside.

**Pay-as-you-grow complexity.** You only pay for the structure you actually use. An NDO with no specification and no active process is just an identity anchor. A musical phrase with no modifiers is just notes. Neither system requires you to instantiate the full structure before you know you need it.

These six properties define what it means for a system to be fractally composable, as distinct from merely modular. They travel together. Drop content addressing and reuse becomes ambiguous. Drop closure and complex compositions require new types. Drop progressive activation and you are back to declaring everything up front in a fixed schema. The pattern is an integrated whole.

## Why This Pattern Matters Beyond Code

Fractal composability is not just an elegant software property. It is the structural shape that makes peer-to-peer coordination computable at scale.

Most large-scale coordination systems solve the scaling problem by adding central authority. Someone has to hold the global state. Someone has to decide the rules. Someone has to be the source of truth when two nodes disagree. This is the extractive move that the "sharing economy" platforms made: capture the coordination layer, and you capture the value.

Fractal composability offers a different path. When the primitive can contain itself, a small group can define a grammar and a much larger network can elaborate on it without permission, without centralized coordination, and without losing the ability to reason about what was made. The grammar is the coordination layer. The grammar is distributed with every instance of the primitive. No one owns it because it lives in the structure itself.

This is the technical condition for what the commons economy needs: governance that travels with resources, protocols that cannot be captured, coordination that scales without requiring a platform in the middle.

Bach's fugues exhibit this property. A subject is stated, inverted, augmented, combined with itself in stretto, and the whole elaborate structure is implied by that original subject, never by adding new material but by composing the subject with itself in time. Christopher Alexander's pattern language attempts to describe the same property for built environments: a small set of patterns that generate good space when applied recursively. Biological development exhibits it at the level of gene regulatory networks. Sacred geometry traditions have been pointing at it from a different angle for millennia.

What is new is being able to name the pattern precisely, design systems that exhibit it deliberately, and understand why those systems compose well with each other when systems built on different principles do not.

---

*This piece is a companion to my knowledge note on [Fractal Composability](https://alternef.garden/knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/fractal-composability), which goes deeper on the technical properties and open questions, including whether the pattern has a category-theoretic formulation and what the felt sense of aliveness in fractal systems might track.*

*If you are working on open protocols, distributed governance, or composable infrastructure and want to think through how these ideas apply to your project, I would love to hear from you.*

---

*Subscribe for more exploration of complexity science, commons infrastructure, and the technical foundations of alternative economies.*
