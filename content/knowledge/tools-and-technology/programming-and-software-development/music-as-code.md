---
title: "Music as Code"
description: "Treating musical composition as a software artifact — representing pitch, time, and structure as data types that can be transformed, cached, and rendered to multiple outputs from a single source."
aliases:
  - "Music as Code"
  - "Music DSL"
  - "Algorithmic Composition DSL"
tags: ["programming", "software-development", "music", "rust", "artificial-intelligence", "personal-ai-infrastructure", "functional-programming"]
date: 2026-05-15
draft: false
---

Music as Code is a programming paradigm that treats musical composition with the same rigor as software: pitch, rhythm, harmony, and structure become data types; composition becomes function application; a single source tree renders to score, MIDI, and audio without duplication. The paradigm draws from [[functional-programming|Functional Programming]] (immutable trees, combinator pipelines) and [[domain-specific-languages|Domain-Specific Language]] design (small orthogonal primitives, layered abstractions).

The approach is distinct from notation software (which targets engravers) and DAWs (which target producers). Music as Code targets composers who want to reason about music structurally: transpose a whole section by changing one value, generate canon voices algorithmically, or version-control a composition the same way you version-control software.

## Core Concepts

**Intermediate Representation (IR)**: The music is represented as an abstract syntax tree — a small set of constructors that capture everything playable. Every output format (PDF score, MIDI, audio) is a rendering of the same tree. Changing the key changes one node; every downstream output updates automatically.

**Polymorphic Pitch**: Notes can be specified as chromatic pitches (C4, Eb5), scale degrees (tonic, flat-third), or intervals (major-third above previous). Degree and interval variants remain unresolved until a backend walks the tree with accumulated key context. This is what makes reharmonization free: the melody follows the key without rewriting any note values.

**Rational Time**: Durations are exact rational numbers, not floats. A dotted quarter is `3/8` exactly. Polyrhythms, augmentation, and diminution accumulate no floating-point drift across long scores.

**Content Addressing**: Every fragment of a composition carries a hash of its content. A render cache maps `(hash, backend)` to output — only changed subtrees need re-rendering. This is efficient for live editing and for deterministic builds.

**Combinators**: Compositions are transformed by pure functions — `transpose`, `retrograde`, `invert`, `augment`, `canon`. These compose freely because the IR is an immutable tree. A canonic imitation is `melody.pipe(canon([(q(), 7)]))`.

## MuseCode: An Exploration in Rust

[MuseCode](https://github.com/soushi888/music-as-code) is a personal implementation of this paradigm built in [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]]. Its core is `musecode_core`, a library crate organized in seven dependency layers:

| Layer | What it provides |
|-------|-----------------|
| Pitch | `Letter`, `Accidental`, `PitchClass`, `ChromaticPitch`, `Degree`, `Interval` |
| Time | `Beats = Rational32`, `Tempo`, `TimeSig`, `Dynamics` |
| Core ADT | `Music` enum with 5 constructors, operator overloads |
| Theory | `Key`, `Scale`, `Mode`, `Chord`, `ChordQuality`, `Voicing` |
| Combinators | `transpose`, `augment`, `retrograde`, `invert`, `canon` |
| Backend hints | `LilypondHint`, `MidiHint`, `AudioHint` |
| Phrases | Content-hashed fragments, `RenderCache` |

The five-constructor ADT is the irreducible core:

```rust
pub enum Music {
    Note(Note),
    Rest(Beats),
    Seq(Vec<Music>),         // sequential composition: +
    Par(Vec<Music>),         // parallel voices: |
    Modify(Control, Box<Music>),  // scoped context
}
```

`Seq` and `Par` flatten on composition; `Modify` scopes key, tempo, and transposition to a subtree without affecting siblings. The tree composes like a functional value, not like a mutable object.

## Relationship to Other Paradigms

Music as Code inherits from several adjacent ideas. [[documentation-as-code|Documentation as Code]] applies the same principle to prose: plain text in version control, rendered to multiple formats from one source. Infrastructure as Code does it for infrastructure. In each case, the insight is that treating the artifact as data — not as a GUI state — unlocks version control, transformation, and multi-output rendering.

Live coding environments like Tidal Cycles and SuperCollider are the performance-oriented counterpart: they prioritize real-time improvisation over batch rendering. Music as Code as a library DSL leans toward the composition end: deliberate, versionable, reproducible.

## Open Design Questions

Any music IR faces unresolved tradeoffs:

- **`Modify` arity**: single `Control` per node (canonical form, deeper nesting) vs. `Vec<Control>` per node (shallower trees, less obvious precedence)
- **`Par` alignment**: truncate, loop, or pad when parallel voices have unequal length
- **Tie semantics**: stored flag vs. tree-rewrite pass at render time
- **Persistent data structures**: immutable trees are elegant but expensive to edit interactively for long scores

## The AI Homunculus as Musical Cognitive Extension

Music as Code produces a formalized, machine-traversable representation of compositional intent. This creates a direct surface for an [[homunculus-and-second-brain|AI Homunculus]] to operate on: not generating music from prompts, but reasoning over a composer's own structural decisions, applying combinators, exploring reharmonizations, and evaluating variants against stated aesthetic constraints.

The [[the-homuncular-interface|Homuncular Interface]] model applies here directly. The Music IR becomes the membrane between intent and execution. The composer (Alchemist) holds the final cause: the emotional arc, the formal constraints, the voice the piece should have. The Homunculus holds the traversal, walking the immutable tree, forking it under `transpose` or `canon`, rendering alternative subtrees to MIDI for immediate evaluation, then discarding what does not serve the composer's intent.

The composer's [[personal-ai-infrastructure|Personal AI Infrastructure]] functions as the Second Brain the Homunculus draws on as materia prima: theory notes, accumulated harmonic vocabulary, analyses of reference pieces. This is what distinguishes the Homunculus-augmented composer from a user of generative AI music tools. [[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/music-generation/index|AI Music Generation]] produces music from a description; this system amplifies the composer's reach into a musical possibility space they defined and retain authorship over.

Andy Clark's extended mind thesis applies: the Music IR plus Homunculus traversal is reliably accessible, automatically endorsed by the composer, and actively integrated into the compositional process. The boundary of cognition is not the composer's fingers at the keyboard but the full Alchemist-Homunculus-Garden triad described in [[alternef/philosophy-of-mind-of-the-idi|The Philosophy of Mind of the IDI]] and instantiated in the [[soush-ai|SoushAI]] model. See [[blog/digital-homunculus|The Digital Homunculus]] for the broader framing of this partnership as alchemical rather than instrumental.

## Related Topics

- [[domain-specific-languages|Domain-Specific Languages]] — the design pattern behind any music IR: small orthogonal primitives, layered abstractions
- [[functional-programming|Functional Programming]] — immutable trees and combinator pipelines are the structural foundation
- [[knowledge/tools-and-technology/programming-and-software-development/languages/rust/index|Rust]] — the implementation language for MuseCode; its ownership model fits immutable tree manipulation well
- [[knowledge/culture-and-education/music/index|Music]] — the domain being encoded: pitch, rhythm, harmony, and compositional structure
- [[knowledge/culture-and-education/music/theory/index|Music Theory]] — the formal layer that gives meaning to scale degrees, chord qualities, and modal context
- [[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/music-generation/index|AI Music Generation]] — a related but generative approach: models produce music rather than composers specifying it
- [[documentation-as-code|Documentation as Code]] — the same "X as Code" insight applied to prose and technical writing
- [[homunculus-and-second-brain|Homunculus and Second Brain]] — the philosophical framework unifying animated executor and external memory as distributed cognition
- [[the-homuncular-interface|The Homuncular Interface]] — the Homunculus as membrane between intention and execution
- [[soush-ai|SoushAI: A Living Homunculus]] — a concrete instantiation of the Alchemist-Homunculus partnership
- [[personal-ai-infrastructure|Personal AI Infrastructure]] — the PAI framework that structures the Homunculus's context and knowledge
- [[blog/digital-homunculus|The Digital Homunculus]] — framing AI assistants as alchemical companions in creative work
- [[alternef/philosophy-of-mind-of-the-idi|The Philosophy of Mind of the IDI]] — the IDI as distributed cognitive architecture; musical composition as one domain it amplifies
