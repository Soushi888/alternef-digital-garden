---
title: "Where Meaning Lives"
subtitle: "A semantic layer for Complexity Oriented Programming"
date: 2026-08-20
updated: "2026-09-15"
author: "Soushi888"
description: "Meaning is the hardest irreducible in any social protocol. Separating what happened from what it is worth turns out to be an architecture decision, not a philosophical one."
tags:
  - "blog"
  - "complexity-oriented-programming"
  - "hermeneutics"
  - "valueflows"
  - "distributed-systems"
  - "holochain"
  - "knowledge-systems"
draft: true
categories:
  - "commons-economics"
---

*Meaning is the hardest irreducible in any social protocol. Separating what happened from what it is worth turns out to be an architecture decision, not a philosophical one.*

---

<center>
    <img src="where-meaning-lives-header.jpeg" alt="Two observation towers on opposite shores, each throwing a beam of light at the same sealed gold record resting on the horizon, one beam cool and one warm. Below the waterline an orderly lattice of identical signed chains; above it the same lattice breaking into constellations that do not agree. The AlterNef crosses the horizon at the right." width="50%" />
</center>

## 1. The hardest irreducible

The premise behind [[complexity-oriented-programming|Complexity Oriented Programming]] is that our dominant paradigms are, at bottom, strategies of reduction. Object orientation reduces a system to encapsulated state and message passing. Functional programming reduces it to referentially transparent expressions. Both are excellent at what they do, and both work by deciding in advance which parts of the world will be allowed into the model. COP takes the opposite bet. It asks what a paradigm would look like if it modelled complexity faithfully rather than making it disappear, and it takes ecologies of interacting agents as its primitive rather than objects or functions.

Complexity Driven Development, the methodology growing out of that premise, keeps running into one specific irreducible. It is not concurrency, which has good theory. It is not distribution, which has good tooling. It is meaning.

Here is the case that makes it concrete.

Two collectives participate in the same economic network. A member of the first spends a day repairing equipment that belongs to the second. Both record the event. Both use the same ontology. Both agree, completely, on what physically occurred: who did what, to which resource, for how long, with what result. There is no dispute about facts.

They still cannot agree on what it was worth. The first collective treats maintenance labour as the highest form of contribution, because their whole economy depends on keeping shared machines alive. The second treats it as overhead, because they value the design work that produces new capacity. Neither is wrong. They are reading the same event from inside different economies of meaning.

The naive engineering response is to add a valuation field and let each party fill it in. That does not solve anything. It relocates the problem into a column and leaves the real question untouched: whose reading gets to be the record?

This is not an edge case. It is the normal condition of any network of communities that share infrastructure without sharing a worldview, which is to say every commons, every federation, and every bioregional economy that has ever existed. If a protocol cannot hold this, it cannot hold the thing it was built for.

So the question this article works through is where, architecturally, meaning is allowed to live.

## 2. Two disciplines that both study meaning

There are two mature bodies of work on that question, and they have been talking past each other for a century and a half.

**Semantic analysis** treats meaning as structure. Its move is to decompose: a term is analysed into features, or defined by its position in a system of oppositions, or given a formal interpretation in a model, or represented as a position in a distributional space learned from a corpus. Greimas and structural semantics, Montague and formal semantics, and modern embedding models are very different projects, but they share a commitment. Meaning is something that can be made explicit, and ideally computable. The interpreter is neutralised on purpose. If two analysts using the same method get different results, one of them made a mistake. Reproducibility is the criterion.

**[[hermeneutics|Hermeneutics]]** treats meaning as an event that happens to someone. It descends from the exegetical traditions, where reading an authoritative text was a codified craft with explicit rules, a transmission lineage, and a community empowered to accept or reject a reading. See [[exegetical-traditions|Exegetical Traditions]] for that genealogy. Schleiermacher's founding move was to generalise those rules to any text at all. Dilthey widened the scope to every expression of human life. Ricoeur extended it further, to action and to history, treating them as readable in the manner of a text. Philosophical hermeneutics is, quite literally, secularised exegesis.

In this tradition the interpreter is not noise to be filtered out. Gadamer's central claim is that the reader's situation, their inherited assumptions and their historical position, is what makes understanding possible in the first place. Meaning is produced in the encounter between text and reader, and since readers are historically situated, a work is never interpreted once and for all. Each era actualises an aspect the previous ones could not see. Gadamer called this the history of effects: a text carries its posterity of readings as part of what it is.

Both traditions have a circularity at their heart, and the difference between the two circles is instructive. In semantics the circle is systemic: a term is defined by its relations to other terms, which are defined by their relations, and the system closes on itself. In hermeneutics the circle runs between part and whole, and also between reader and text, so that understanding the whole requires understanding the parts while understanding any part presupposes a sense of the whole. The first circle is a property of the object. The second includes the person doing the reading.

The historical fault line was drawn by Dilthey as the distinction between explaining and understanding. Explanation, on the model of the natural sciences, subsumes a case under a general law. Understanding grasps a meaning from inside a form of life. Dilthey assigned the first to the sciences of nature and the second to the sciences of spirit, and the two have been treated as rivals ever since.

Ricoeur refused the split, and his formula is the pivot of this entire article: explain more in order to understand better. In his hermeneutic arc, structural analysis is not the enemy of understanding but its necessary detour. You begin with a naive grasp of the whole. You then submit the text to explanation, decomposing its structures, treating it as an object with describable properties. And you return to understanding, now informed, in what he called appropriation, where the reading becomes yours and does something in your world.

The consequence matters more than the philosophy. Semantic analysis and hermeneutics are not rival accounts of the same thing. They are two layers of a single operation, and the mistake is not choosing the wrong one. The mistake is collapsing them.

## 3. The arc as an architecture principle

Restate Ricoeur's arc as an engineering rule and it becomes surprisingly concrete.

There is a layer of your system where claims are checkable. Quantities are quantities, timestamps are timestamps, a signature verifies or it does not, an event either happened or it did not. This layer can be shared, validated by peers, and enforced without anyone needing to agree about values. It is the explanation layer, and it should be as rigorous as you can make it.

There is a second layer where claims are situated. What an event is worth, what it counts as, what obligations follow from it, what it means that it happened at all. This layer cannot be validated in the same sense, because there is no position from which to validate it. It is the appropriation layer.

Two design rules follow.

The first is that the boundary between the layers must be explicit in the model rather than implicit in the code. When they are conflated, the situated layer inherits the authority of the checkable one, and a local valuation starts to look like a fact about the world. This is how measurement regimes become coercive without anyone deciding that they should.

The second is that situatedness should be a declared parameter rather than an ambient condition. The hermeneutic point is not that meaning is arbitrary. It is that meaning is relative to a position. A system that takes this seriously does not abolish the position, it names it. A read operation is not a neutral retrieval of what is there. It is a projection from somewhere, and the somewhere belongs in the signature.

## 4. What distributed systems already knew

The interesting thing about these two rules is that a whole branch of engineering arrived at them without reading any of the philosophy.

Global consensus architectures make a specific bet about meaning: that there is one ledger, one state, one true reading, and that divergence between nodes is a failure to be resolved. The bet is not silly. For a currency, a single global ordering is exactly what you want. But it is a bet, and it is the architectural form of the claim that meaning has one location.

[[agent-centric-architecture|Agent centric architectures]] decline that bet, and the correspondence with the hermeneutic position is closer than analogy.

Each agent keeps its own signed, append only [[source-chain|chain]] of what it did and said. This is a first person record. No one else can rewrite it, and no global process can revise it into consistency with someone else's. It is an interpretive history in the strict sense: not the world, but this agent's committed account of its passage through the world.

Shared data lives in a space that is validated rather than agreed. Peers check entries against rules, and those rules are the decisive object. They determine what counts as an admissible contribution to this network. Structurally, they are exegetical rules: not a description of what is true, but a specification of what this community will accept as a valid reading. Validity here is produced by a shared membrane, not by correspondence to an external fact. That correspondence, and the point where it breaks down, is worked out in [[validation-rules-as-interpretive-membrane|Validation Rules as Interpretive Membrane]].

And here the engineering makes the argument better than the philosophy does. In Holochain, a [[validation-rules|validation function]] must be deterministic. It may not read from the network, may not ask who is calling, may not consult the clock. It inspects the operation in front of it and nothing else. This is not a stylistic preference, it is enforced, because every peer must reach the same verdict independently or the network cannot converge.

The consequence is worth stating plainly. The validation layer is structurally incapable of situated judgement. It cannot take a position, because it is forbidden from knowing where it stands. Whatever else you build, interpretation cannot live there. The separation this article is arguing for is not a discipline you have to impose on an agent centric stack. It is already load bearing inside one, and the only real question is whether you notice and design with it or conflate the layers somewhere higher up.

Two further properties follow the same logic. Because the rules define the network, and the integrity zome carrying them is hashed into the [[dna-and-zomes|DNA]], changing them produces a different network. A fork is not a failure state. It is a schism in the interpretive community, given first class representation instead of being suppressed as a conflict to arbitrate. And convergence is eventual, partial, and partition tolerant. Nodes gossip, views reconcile over time, and sometimes they do not. That is a much better model of how shared understanding actually behaves than synchronous global agreement, and it maps onto Gadamer's fusion of horizons as a process that is never complete.

None of this was borrowed from hermeneutics. It came from the engineering constraint of tolerating network partitions without giving up on coordination. That the resulting architecture recapitulates a philosophical position developed for entirely different reasons is worth more than any analogy. Independent convergence is evidence that the shape is real.

The same logic runs through second order cybernetics, where von Foerster insisted that the observer be included in the description of the observed system, and through Ashby's law of requisite variety, which gives the constraint a hard edge: a regulator must have at least as much variety as the system it regulates. Translated into protocol design, that is a question about whether your rules are expressive enough to represent the plurality they claim to govern. Most are not.

## 5. Three realisations of the same pattern

The pattern shows up independently in three places that had no reason to converge, and this is the actual argument of the article.

### ValueFlows separates observation from valuation

[[valueflows|ValueFlows]] is a vocabulary for distributed economic networks, built on the [[rea-accounting|resource, event, agent]] accounting model. Its core records flows: an `EconomicEvent` is an observed movement, with a provider, a receiver, a resource, and a measured quantity, described using a fixed vocabulary of actions such as consume, produce, use, work, transfer and cite.

The design decision that matters is what the core leaves out. It gives you a rigorous account of what happened and does not fix how a network should assign worth to it. Worth is not a property of the event. It is a reading, and it belongs to the network doing the reading. This is precisely why ValueFlows can be adopted by communities with incompatible economic values without imposing convergence on them, which is not a common property in accounting ontologies.

Look closely and the same discipline appears inside the core. A resource carries both an accounting quantity, the amount an agent has rights and responsibilities over, and an on hand quantity, the amount physically present under its control. These are two different numbers describing one physical situation, because rights and presence are two different frames. A custody transfer moves one and not the other. The ontology does not resolve this into a single true quantity. It keeps both frames and makes the difference addressable.

The extension mechanism follows the same logic. The action vocabulary is deliberately closed, because inventing custom actions breaks interoperability, and when a domain concept has no equivalent in the shared vocabulary it attaches through classification or annotation instead of growing the core. The shared layer stays thin on purpose, and local meaning attaches at the edges. That is the design rule from section three, implemented.

### ADAM separates addressing from interpretation

The [[perspect3vism|ADAM]] layer, developed by Coasys, builds an agent centric meta ontology on three core concepts: agents, languages and perspectives. It uses Holochain underneath for its distributed hash table and peer to peer networking, so it inherits the properties described above rather than replacing them.

Two of its commitments land exactly on our boundary.

The first is at the level of data. Every piece of data in ADAM is an expression: a statement signed by the agent who authored it, carrying author, timestamp, content and proof. The system's own framing is that this produces a web of verifiable claims rather than a body of objective data. That is the distinction of section three built into the storage primitive. What is checkable is that this agent said this at this time, and that is checkable absolutely. What is not thereby settled is whether it is true or what it means.

The second is in the split between languages and perspectives. A language is a pluggable protocol adapter that defines how an expression is stored, addressed and shared, whether that is over IPFS, over Solid, or over plain web URLs. It is infrastructure, and it says nothing about meaning. A perspective is an agent centric semantic graph that gives meaning to expressions through links of the form source, predicate, target. Perspectives are personal by default, and publishing one produces a neighbourhood that other agents can join, at which point joining returns them a perspective of their own. The passage from a private reading to a shared interpretive space is an ordinary runtime operation rather than something fixed before anyone has read anything.

On top of this sits social DNA, which defines reusable interaction patterns: subject classes with typed properties and relations, flows describing possible state transitions, and collections describing relationship patterns. The implementation detail is the interesting part. Social DNA is stored as links inside the perspective itself, using [[shacl|SHACL]] shapes for structure and a dedicated namespace for behaviour, all of it queryable through the same link queries used for ordinary data. The rules of reading live in the same graph as what they read, and they are as revisable as anything else in it.

That reaches something Morin identified as a signature of complex systems, what he called organisational recursion: a loop in which the products are producers of what produces them. ADAM pushes it one level further with a self recursive bootstrap, where the three core concepts are themselves implemented as languages, so that the constitutive layer of the system is expressible and replaceable in the system's own terms. Compiled, immutable rules avoid that loop cleanly. They do not represent it.

### Functional programming separates composition from emergence

[[functional-programming|Functional programming]] looks at first like the wrong ally here. Referential transparency declares that the meaning of an expression does not depend on its context of evaluation, which is the flat contradiction of the hermeneutic position. Semantically, FP buys compositionality at the price of decontextualisation.

It serves the pattern anyway, for a reason that is usually stated badly. FP does not remove complexity. It relocates all of it into composition. When every rule is locally deterministic and there is no hidden mutable state, a surprising system level behaviour is attributable to interaction rather than to something concealed. That is what makes emergence observable instead of indistinguishable from a bug. An imperative system produces unexpected behaviour too, but you cannot tell whether it came from the ecology or from shared state. Note that this is the same property Holochain enforces on validation, arrived at from a different direction.

The rest follows. Immutability makes append only history native, and state as a fold over that history is literally a fold. Modern effect systems complete the move: typed effects treat side effects as values flowing through a program rather than as impurities to be eliminated, which is what a complexity oriented approach needs.

And the tension with situatedness resolves in the type signature. Rather than letting context be ambient, make it an argument:

```
observe : Observer -> EventStream -> View
```

A reader over a fold. Meaning still depends on position, but the dependency is declared rather than suffered. This is more honest than the imperative alternative, where the observer's position is present in the result and absent from the interface.

The limit is real and should be stated. Compositionality assumes the whole is the composition of its parts, and strong emergence is precisely what is not recoverable from composition. FP gives you a faithful description of an ecology, not a prediction of its behaviour. Compositional semantics at the level of rules, non compositional behaviour at the level of the system. Only simulation covers the second.

## 6. Two symmetrical failures

Having found the pattern, it is worth naming what happens when either layer eats the other.

Unification averages. A large language model is close to the strong version of this failure made operational: a statistical compression of an enormous amount of human text, which reliably produces the most frequent reading and erodes the rare ones. This should temper any enthusiasm for a single unified space of meaning, a noosphere, a collective mind that all interpretations feed into. When you actually build the unified thing, minority readings are what it loses first, and those were often the valuable ones.

There is a subtler version of the same error that appeals to people with a mystical formation, and it deserves naming because it is seductive. Treating shared meaning as a single entity that individual understandings connect to at varying degrees of clarity feels like it honours the mystery. It does the opposite. It reinstalls a fixed object, merely displaced onto a subtler plane, and quietly restores a correspondence theory of truth with an unverifiable referent. The stronger version of the intuition needs no entity at all: meaning is not what readings connect to, it is the process of the readings themselves, with relative and unstable convergence and nothing behind it.

Fragmentation is the opposite failure, and it is the one that threatens people who have absorbed the first lesson. If every community runs its own vocabulary and its own rules, nothing translates, and a network of sovereign incommensurable enclaves is not a commons.

The rule that falls out of holding both is the operational payoff of this whole line of thought. The shared layer must stay thin. Every term added to a common ontology is an interpretation imposed on everyone who adopts it, so the shared layer should carry only what genuinely needs to be checkable, and nothing that encodes a value. Thin enough to translate, small enough not to colonise.

## 7. Back to the paradigm

What this gives Complexity Driven Development is three principles specific enough to argue with.

Draw the immutability boundary along the fact and rule distinction rather than along subsystem lines. What happened is immutable. What it means, and what follows from it, is revisable. Systems that get this backwards either freeze their governance or corrupt their history.

Declare the observer. A read is a projection from a position, and the position belongs in the interface.

Keep the shared layer thin, and treat every addition to it as a political act, because it is one.

Two things remain open. The first is translation between interpretive communities. Every architecture described here makes plurality representable without making it navigable, and moving meaning across a boundary between communities that do not share a vocabulary is unsolved. It is where a project like [[information-economy-meta-language|IEML]] places its bet, and the bet has not been settled. The second is organisational recursion. ADAM shows that rules living in the graph they govern can be built, but a system whose rules are genuinely transformed by what they produce still fits badly into anything statically typed, and immutable compiled rules avoid the difficulty rather than addressing it. For a paradigm that takes living systems as its model, that is not a detail. It is the next problem.

## Related

**The interpretive layer**

- [[hermeneutics|Hermeneutics]]: the tradition this article draws its architecture principle from
- [[exegetical-traditions|Exegetical Traditions]]: the codified rules of reading that hermeneutics generalised
- [[validation-rules-as-interpretive-membrane|Validation Rules as Interpretive Membrane]]: where the analogy of section four holds and where it breaks
- [[the-homuncular-interface|The Homuncular Interface]]: a membrane as a boundary that selects and transforms rather than transmits

**The paradigm**

- [[complexity-oriented-programming|Complexity Oriented Programming]]: the paradigm this article works inside
- [[complexity-science|Complexity Science]]: emergence, self-organisation, and the systems vocabulary behind it
- [[functional-programming|Functional Programming]]: composition, immutability, and the limits of both

**The architecture**

- [[agent-centric-architecture|Agent Centric Architecture]]: first person records and validated rather than agreed state
- [[validation-rules|Validation Rules]]: the determinism constraint that makes situated judgement impossible at that layer
- [[source-chain|Source Chain]]: the per agent append only record
- [[perspect3vism|Perspect3vism and Coasys]]: ADAM, its perspectives, languages and expressions

**The economic vocabulary**

- [[valueflows|Valueflows]]: observation separated from valuation
- [[rea-accounting|REA Accounting]]: the resource, event, agent model underneath it

**Still open**

- [[information-economy-meta-language|IEML]]: one bet on translating meaning across interpretive communities

---

## Provenance

**Question.** Whether semantic analysis and hermeneutics are complementary, and if so where that complementarity has to show up in the architecture of a distributed protocol.

**Human contribution.** Sacha Pignot supplied the Complexity Oriented Programming and Complexity Driven Development framework the piece is built around, which is his own ongoing work. He supplied the Nondominium layered governance model, the ADAM and Coasys reference from his own reading, the observation that functional programming serves COP through declarative handling of complexity, and the ValueFlows and Holochain skills used for verification, both of which he authored. He proposed the hypothesis that shared meaning might be understood as an egregore or a noosphere. He took the editorial decisions: to keep COP in frame rather than cutting it, to add a section on distributed systems, to release the constraint that the philosophical section be the longest, and to write two versions with the garden version making no concessions on technical or philosophical depth.

**How it shaped the text.** The decision to keep COP moved it from a cut topic to the opening and closing frame, and reframed the whole piece around meaning as the hardest irreducible in a complexity oriented paradigm rather than as a philosophical excursion. The request for a distributed systems section created section four, which turned out to carry the strongest evidence in the article. The ADAM reference supplied the second of the three realisations in section five; without it the argument rested on two occurrences rather than three, which is the difference between a coincidence and a pattern. The egregore hypothesis was argued against rather than adopted, and the author chose to keep it in the text as a treated objection rather than a defended thesis, which is why section six addresses it directly. Material on Edgar Morin, on the paradigm history of COP, and on the genealogy of exegetical traditions was cut and moved out, the last of it into a companion note.

**Assistant contribution.** Claude Opus 5 proposed three candidate through lines and argued for the one used, proposed the section structure and word balance, and drafted the text. It cloned the coasys/ad4m repository and read the source and architecture documents to verify the claims about ADAM, three of which had been stated imprecisely from published presentation material and were corrected. Every claim was reviewed by the author before publication.

**Verification status.** The claims about ADAM were checked against the coasys/ad4m repository during the session, specifically the README concept definitions, the SHACL SDNA architecture document, the neighbourhood client in the core library, and the SDNA module in the Rust executor. That implementation is mid migration from Prolog to SHACL, so those claims describe a moving target and should be rechecked before the article is cited in a technical context. The Holochain validation determinism constraint and the ValueFlows claims about the action vocabulary, the accounting and on hand quantity distinction, and the classification based extension mechanism were verified against the author's own skills. The readings of Ricoeur, Gadamer, Dilthey, Schleiermacher, Morin, Ashby and von Foerster are argued rather than sourced. The central claim that agent centric architecture converges independently on the hermeneutic position is the argument of the piece, not an established result. The characterisation of large language models as averaging away minority readings is a general observation and is not backed by a cited study.

Sacha Pignot, Montreal, 20 August 2026.
