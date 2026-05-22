---
title: "Preserved Recursion"
date: 2026-05-22
author: "Soushi888"
description: "Commoning and industrial production are algebraically distinct. One preserves the recursion of its reproduction kernel. The other breaks it at precisely the places where costs stop appearing on any ledger."
tags: ["blog", "economics", "commons", "functional-programming", "complexity-science", "philosophy"]
draft: false
---

*Commoning and industrial production are not only politically opposed. They are algebraically distinct. One keeps the recursion intact. The other breaks it at precisely the places where the costs don't show up on any ledger.*

---

## The canvas chain

In Meindel's working draft on [[distributed-economic-planning|distributed economic planning]], there is a small example used to illustrate how cooperation unfolds when an economy is organized around needs rather than around markets. Someone wants to paint. They need a brush, a canvas, and paint. The brush and paint are available locally. The canvas is not, but a recipe is known for how to make one from linen fabric, a stretcher frame, hammer, nails, and a stretching device. The hammer, nails, and stretching device are available. The linen fabric and stretcher frame are not, but recipes exist for how to make those too. The linen fabric requires an unwarped loom, a warping board, linen yarn, and a plain weave binding pattern. And so on, until every leaf of the requirements tree either touches something locally available or someone willing to do the next step.

The chain is unremarkable in itself. What is remarkable is its structure. Every step has the same shape. A problem is transmitted. A process is invoked to resolve it. The process has requirements, which are themselves problems, which invoke processes, which have requirements, all the way down. The recursion bottoms out at available resources. The same kernel handles every decomposition, regardless of scale. The shape of the small problem (find a stretching device) is identical to the shape of the large problem (satisfy the need for artistic expression).

This is the property I want to name and isolate. It is the property that, I will argue, structurally distinguishes commoning from industrial production. Not as a moral or political preference, but as an algebraic fact about the kinds of computations the two reproduction modes are capable of expressing.

Call it preserved recursion. The opposite, the one that industrial production requires, is broken recursion.

## Three primitives, one pattern

Before we can isolate the property, we need to see it at work in more than one place. Three examples will do.

The first comes from music. The Music as Code project, written in Rust, expresses music as an algebraic data type with five constructors: `Note`, `Rest`, `Seq`, `Par`, and `Modify`. A note and a rest are leaves. `Seq` composes a sequence of music in time. `Par` composes music in parallel, layering voices. `Modify` transposes, scales, or transforms a music. The crucial property is closure. `Seq` and `Par` and `Modify` all take music as input and produce music as output. Counterpoint, fugue, polyrhythm, and entire symphonies fall out of recursive composition of these five constructors. The complexity is not in the kernel. The complexity is in how the kernel folds in on itself.

The second comes from resource governance. The Nondominium protocol, built on Holochain in collaboration with Tiberius Brastaviceanu at [[sensorica|Sensorica]], defines a Nondominium Object as a three-layer primitive. Layer zero is the Prima Materia, the irreducible genesis entry. Layer one is the Specified layer, where the resource's governance profile and recipe attach. Layer two is the Custodial layer, where actual custodianship lifecycle transitions occur. The crucial property is again closure: NDOs reference other NDOs across layers and across instances. A cosmolocal production network is what emerges when you let this three-layer primitive recurse against itself, mediated by capability slots that allow downstream protocols to plug into the recursion at any layer.

The third comes from distributed economic planning. The Structural Formula of Commoning in Meindel's text consists of three colored problems (Need, Requirement, problematic Condition) that resolve through one closure operation called Process. Each Process generates new Problems as it executes: its requirements become Requirements, its side effects become problematic Conditions. The crucial property is the closure of Process over Problem. Distributed planning is what emerges when you let this one-kernel formula recurse against itself across all the resources and recipes locally available in a community.

Three primitives, three domains, three different research traditions. They share four properties: a small typed kernel, a closure operation that takes elements of the kernel type and returns elements of the kernel type, recursive self-containment with no escape from the grammar, and an identity carrier (Blake3 hash, action hash, recipe specification) that lets composed structures be referenced and reused unambiguously. This is what we mean by [[fractal-composability|fractal composability]]. A small primitive whose recursive self-application generates the whole expressive space of the domain.

## A convergent finding from programming languages

The reason this is more than a poetic coincidence is that [[functional-programming|programming language theory]] has been working on the same algebraic structure for the last two decades under the name algebraic effects. The foundational work by Gordon Plotkin and Matija Pretnar in the mid-2000s formalized computations as typed effect trees that compose, propagate, and resolve through handlers. The TypeScript library Effect, which I use heavily in my own work, is one production-quality realization of that lineage. Its central type signature is `Effect<A, E, R>` where A is the success value the computation produces, E is the typed channel of effects that must be handled, and R is the typed channel of requirements the computation needs from its context.

Compare this with Meindel's formula. The Need being satisfied is A. The Requirements pulled from context are R. The side effects that re-enter the formula as problematic Conditions are E. The Process is the effect computation. Recipes are Effect's Layers. The Distributed Planning Process is an effect runner that walks the tree and chooses an execution order. Preservation states are scope finalizers. The mapping is exact.

Two unrelated research traditions, one starting from monad theory and category theory, the other starting from Marx, Helfrich, Bollier, and Meretz, converged on the same algebraic structure for managing computations with side effects. The convergence is the evidence that the structure is real and not domain-bound. Algebraic effects in code and the Structural Formula in commoning are the same algebra at work, on different layers of the world.

## What industrial production has to break

Once you can see the algebra clearly, what stands out about industrial production is everything it does to evade it.

Industrial production breaks the recursion in three structural moves.

The first is the externalization of side effects. In a well-typed effect computation, a side effect is part of the type signature. If a process produces carbon dioxide, the type system says so, and the caller is required to handle it. Industrial production refuses this typing discipline. Pollution is not in the cost line. Habitat destruction is not in the supply chain ledger. The exhaustion of workers and the atrophy of communities are not in the financial statement. They are systematically removed from the type signature of the production process, which is exactly what allows the computation to proceed without ever balancing its books. Externality is just the economic word for an untyped effect. The reason the climate crisis is a calculation problem and not only a values problem is that the calculation is being performed by a type system that has been deliberately stripped of the relevant channels.

The second is the collapse of typed requirements into a single scalar. Money flattens the type structure of what a process requires. A baker does not need flour, water, salt, yeast, a deck oven, a peel, time, and trained hands. The baker needs eight dollars per loaf in inputs. The typed requirements are collapsed into a single fungible number, which is then used to coordinate across the economy. This is what makes markets fast. It is also what makes markets incapable of computing what commons-based production computes. A price is a hash of a typed structure. It can route a transaction. It cannot reconstruct the structure it was derived from. Once you have collapsed to the scalar, you have lost the information needed to recurse.

The third is the fragmentation of the kernel into separate subsystems with separate optimization criteria. Industrial production splits the unified Process kernel into procurement, manufacturing, logistics, marketing, sales, finance, legal, and disposal, each with its own metrics, its own ledger, its own optimization regime. The recursion is broken at the seams. A procurement decision cannot recursively invoke a disposal process to ask whether the inputs are recoverable. A logistics decision cannot recursively invoke a community welfare process to ask whether the route preserves social fabric. The subsystems do not share a kernel, so they cannot compose. The fragmentation is sometimes called specialization and praised as efficiency. It is more precisely the destruction of recursive closure.

These three moves together produce a system that is computationally simpler than commoning but expressively much weaker. It can route transactions at high speed and at planetary scale. It cannot represent the structure of what it is doing.

## What commoning preserves

The commoning kernel, in the form Meindel develops it, refuses all three moves.

It refuses externalization. Side effects re-enter the formula as typed problematic Conditions. The CO2 emitted by transporting linen fabric is a C-Problem that injects a new recursive descendant, the process of reforestation or atmospheric remediation, into the same tree as the original need. The accounting is preserved because the effect stays in the type signature.

It refuses scalar collapse. Requirements are typed and decompose recursively. The canvas is not eight hours of labor at a wage. It is linen fabric, stretcher, hammer, nails, and a stretching device, each of which is its own typed thing, each of which can recursively decompose into its own typed requirements. The distributed planning process can sort scenarios by speculative total effort precisely because the structure is preserved. The moment you collapse to scalar effort, you lose the ability to reason about what is being done and gain only the ability to compare aggregates.

It refuses kernel fragmentation. There is one Process operator. Procurement, manufacturing, logistics, and remediation are all instances of the same kernel applied at different positions in the recursive tree. They share a type signature. They compose. A leaf concerned with carbon remediation can be a recursive descendant of a leaf concerned with producing a canvas, because they are the same kind of computation. The unified kernel is what lets concerns that industrial production segregates into incompatible subsystems flow into each other naturally.

The result is a reproduction mode that is computationally more demanding than industrial production but expressively much richer. The recursion preserves the type structure of what is being done. The whole economy becomes a single effect tree rooted in human needs, with side effects tracked, requirements typed, and the recursion bottoming out at locally available resources and self-assigned processes.

## Reconsidering the Mises and Hayek critiques

The classical objection to non-market economic coordination, from Ludwig von Mises and Friedrich Hayek, is that without market prices there is no rational way to allocate resources. Mises framed it as the calculation problem: without prices, you cannot compute. Hayek framed it as the information problem: without prices, distributed knowledge cannot be aggregated.

Both critiques assume that the only way to coordinate is to collapse to a scalar. Once you see fractal composability as an option, both critiques look different.

The Mises calculation problem dissolves because the computation happens through the kernel rather than through a separate optimization layer. Each agent walks their local subtree of the recursive structure, computes speculative total effort over the leaves they can reach, and self-assigns. The computation is real and operational, but it is distributed across the structure rather than centralized in a price discovery mechanism. Markets are one specific way to compute coordination, the way that involves throwing away type information to gain speed. Fractal composability is another way to compute coordination, the way that preserves type information at the cost of more local computation.

The Hayek information problem dissolves because the structure of the formula is itself the coordination protocol. Distributed knowledge does not need to be aggregated into a price signal. It is held locally, accessed through transmission of typed problems, and resolved by self-assignment within recipe libraries that travel between communities. The information stays where it is, used by the agents who hold it, and surfaces to others only through the structured transmission of problems and recipes. The protocol is the algebra.

This does not mean fractal composability is universally superior to markets. Markets are faster. They handle ambiguity by collapsing it. They scale across cultural distances where typed recipes do not translate. The argument is not that commoning replaces markets everywhere. The argument is more careful: commoning is structurally a different kind of computation, one that becomes available when you commit to preserving the recursion. Where the externalities matter, where the typed structure of the requirements matters, where the kernel must stay unified across what industrial production fragments, fractal composability is the more expressive choice.

## The next frontier: AI infrastructure

The reason this argument is not only of academic interest is that we are about to make the same choice at a new layer.

The AI infrastructure being built in 2026 is converging on its own version of broken recursion. Large model providers externalize compute costs and environmental impact. Training data is taken from communities without recursive accounting back to those communities. Capabilities released as products break the type structure of how the underlying skills were learned. The cognitive externalities on human users, atrophy of skills no longer practiced, dependency formation, attention dilution, are not in any type signature anywhere. The same three moves that industrial production made on physical production are being made on cognitive and creative production, by the same logic and to similar effect.

The alternative is being prototyped in real systems. Personal AI Infrastructure tools like Daniel Miessler's PAI architecture, Holochain-based commons skill repositories, [[valueflows|ValueFlows]]-compliant resource governance through Nondominium, and Effect-shaped skill kernels that can be composed across personal, project, and commons layers. None of these are fully assembled yet. But the pieces are real, and the algebra they share is the same preserved recursion that distinguishes commoning from industrial production at the physical layer.

A three-level architecture (Personal AI Infrastructure, Project AI Infrastructure, Common AI Infrastructure) is the natural shape for AI built on this algebra. PAI is the personal recursion against my local needs. PAI II is the project recursion against collective work. CAI is the commons recursion against community-scale capabilities. The same Problem-Process-Solution kernel operates at every level. The same effort calculus sums up the tree. The same Useleft license keeps the skill commons commons, the same way the Nondominium License keeps governed resources from being re-enclosed.

The choice in front of us is not whether to use AI. The choice is whether to build AI infrastructure with preserved recursion or with the broken kind. The broken kind is faster to ship and easier to monetize. The preserved kind keeps the human in the recursion, keeps externalities typed, keeps skills as commons, and keeps the kernel small enough that any agent can hold a piece of it.

## The same shape

There is something almost alchemical about the way the same primitive shows up across music, resource governance, distributed economic planning, programming language theory, and AI infrastructure. A handful of constructors, a closure operation, content-addressed identity, recursive self-containment, and complexity emerging from how the kernel folds against itself rather than from the count of primitives in the kernel. The recurrence of the shape across so many domains is not aesthetic. It is what [[fractal-composability|fractal composability]] looks like in practice, in whatever material the world happens to be made of in that domain.

The framework I have been calling [[complexity-oriented-programming|Complexity Oriented Programming]], and the older alchemical tradition I have been calling [[knowledge/tools-and-technology/programming-and-software-development/programming-paradigms/mystical-oriented-programming/index|Mystical Oriented Programming]], both name something this account has been circling. Reductive paradigms, whether OOP encapsulation or FP purity or the industrial production of goods or the platform-mediated production of cognition, try to make complexity disappear behind abstraction boundaries. Fractal compositional primitives go the other way. They model complexity as recursive elaboration of a small kernel that never escapes its own grammar. The grammar's smallness is what makes it scale, because the entire complexity surface lives in how the primitives recurse, not in how many primitives there are.

Commoning, when it is done well, is what economic coordination looks like when this same principle is applied to the reproduction of human and non-human life. It is a refusal to break the recursion at the seams that markets, states, and platforms have made standard. It is the practice, at the scale of an economy, of what algebraic effects are at the scale of a program: keep the kernel small, keep the type structure intact, let the complexity emerge from how the parts compose against each other.

The work, if this account is right, is not primarily political. It is structural. Refuse the broken recursion. Build with the preserved kind. Music, code, resources, AI, all the same shape. The pattern is the practice.

---

*This essay synthesizes a conversation with Claude through the analysis of Marcus Meindel's working draft on [[distributed-economic-planning|distributed economic planning]], building on the Structural Formula of Commoning (CC-BY-SA 4.0), Stefan Meretz and Simon Sutterlütti's commonistic stigmergy, Silke Helfrich and David Bollier's I-in-Relation framework, Gordon Plotkin and Matija Pretnar's algebraic effects theory, and the ongoing work on Nondominium with Tiberius Brastaviceanu at [[sensorica|Sensorica]] and on Music as Code as an independent project.*

*Repositories referenced: [Nondominium](https://github.com/Sensorica/nondominium), [Music as Code](https://github.com/Soushi888/music-as-code), [Requests and Offers](https://github.com/happenings-community/requests-and-offers).*

*For the shorter companion piece on the [[fractal-composability|fractal composability]] pattern across MuseCode and Nondominium, see "The Grammar That Never Outgrows Itself."*
