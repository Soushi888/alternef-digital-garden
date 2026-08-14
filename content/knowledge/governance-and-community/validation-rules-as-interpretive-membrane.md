---
title: "Validation Rules as Interpretive Membrane"
description: "What a network's validation rules and a tradition's rules of reading have in common: both produce validity through a shared membrane rather than through correspondence to a fact."
aliases:
  - "Interpretive Membrane"
tags:
  - governance
  - agent-centric
  - holochain
  - semantic-web
  - hermeneutics
  - knowledge-systems
date: 2026-08-14
draft: false
---

Ask what makes a claim valid in a distributed network and the honest answer is not "it is true." The answer is that it passed the rules, and that the peers who applied those rules agree they applied them correctly. Validity here is conferred, not discovered. That is also, precisely, how an interpretation becomes admissible inside an [[exegetical-traditions|exegetical tradition]].

This note takes that resemblance seriously enough to find out where it stops being one.

## The Two Systems

| | Exegetical tradition | Agent-centric network |
|---|---|---|
| **What is validated** | A proposed reading of a text | A proposed entry or link on the DHT |
| **Who applies the rules** | Competent members of the community, trained by lineage | Every peer holding the relevant address, running the same code |
| **Where the rules live** | Codified method plus transmitted judgment (PaRDeS, the four senses, Rabbi Ishmael's thirteen principles) | Validation callbacks in the integrity zome, hashed into the DNA |
| **What happens on failure** | The reading is rejected as inadmissible; a persistent offender is put outside the community | The op is marked invalid, a warrant is gossiped, and peers disconnect from the offending agent |
| **What happens when the rules change** | Schism: a second community with different admissibility | A new DNA hash, and therefore a different network |

The last row is the one that stops being a metaphor. In Holochain, the integrity zome carrying the validation rules is hashed into the DNA, and agents sharing a DNA hash are what constitutes a network. Change the rules and you have not amended the network. You have made a second one, and the old one continues without you. That is a schism implemented in a build system.

## Where the Analogy Holds

**Admissibility rather than truth.** Neither system asks whether a claim corresponds to an external fact. Exegesis asks whether a reading can be derived by sanctioned means. Validation asks whether an entry satisfies the declared constraints. A perfectly true statement that violates the rules is rejected in both, and this is not considered a bug.

**Application by peers rather than by an authority.** Holochain's validation callback runs twice, once at the author and once at every prospective host of the operation. No node is privileged. This mirrors a tradition where an interpretation is checked by anyone competent to check it rather than ratified from a single office, which is closer to the rabbinic case than the magisterial one, and the two exegetical traditions differ on exactly this axis.

**The membrane constitutes the community.** Membership is not prior to the rules; it is defined by accepting them. Holochain names this directly: joining a network requires passing `genesis_self_check`, which inspects a **membrane proof**. The vocabulary was already there before anyone noticed the parallel. The garden's [[the-homuncular-interface|Homuncular Interface]] note develops the same distinction, a membrane being a boundary that selects and transforms what crosses it rather than a window that passively transmits.

## Where It Breaks

This is the more useful half.

**Exegesis is plural by design; validation must be single-valued.** The whole point of PaRDeS is that four readings coexist without cancelling each other. The deeper sense does not refute the literal one. A validation callback returns exactly one of three verdicts: valid, invalid, or unresolved dependencies. There is no result that means "valid at one level and something else at another."

**Validation must be deterministic; interpretation is historically situated.** Holochain requires that validation produce the same result no matter who runs it and when. This is enforced by forbidding the non-deterministic queries (`get`, `get_links`, `get_agent_activity` unless bounded) and offering `must_get_entry` and its siblings in their place. Hermeneutics claims the opposite: Gadamer's whole argument is that understanding is conditioned by the interpreter's historical position, and that this situatedness is the condition of understanding rather than an obstacle to it. A validation rule that behaved like a Gadamerian interpreter would partition the network within an hour.

**Time runs the other way.** An exegetical tradition accumulates: later commentary becomes part of the corpus and is itself commented on. Validation rules are immutable once deployed, by construction. The tradition thickens; the DNA cannot.

So the resemblance is real at the level of *how validity is produced* and false at the level of *what validity is like once produced*. Both make admissibility a property conferred by a shared rule set. Only one of them can afford ambiguity.

## Three Implementations

Ordered by how much interpretive latitude each rule set permits.

**Exegetical rule sets.** The unit of validation is a *reading*. Rabbi Ishmael's thirteen principles license inferences (*kal v'chomer*, arguing from the lighter case to the heavier; *gezerah shavah*, linking passages through shared terminology) without determining a unique output. The rules constrain the space of admissible readings; they do not collapse it to one.

**[[shacl|SHACL]] shapes.** The unit is a *graph shape*. Constraints target nodes by class or by property and check datatype, cardinality, pattern, and logical combination. Notably, SHACL grades its verdicts: a result carries `sh:Violation` or `sh:Warning` severity, and a report carries `sh:conforms` alongside the individual results. This is the middle case, admitting a distinction between "inadmissible" and "admissible but flagged" that the exegetical traditions would recognise and that Holochain does not offer.

**Holochain validation callbacks.** The unit is an *entry or link*. Rules live in the integrity zome beside the type definitions they govern, they cannot consult non-deterministic state, and their verdict is binary in effect. This is the strictest membrane of the three, and the strictness is what buys network coherence without a central authority. See [[dna-and-zomes|DNA and Zomes]] for why the rules and the network identity are the same object.

## The Design Consequence

The exegetical traditions arrived at their membranes over centuries, and nobody chose them in a meeting. Anyone writing validation rules today is doing deliberately, in an afternoon, what a tradition does slowly and mostly without noticing: deciding what the community will count as real.

Three things follow for practice.

**Rule design is constitutional, not technical.** Because the rules define membership rather than merely policing it, choosing them is the governance act, and it happens at the moment someone writes an integrity zome. Deferring it to implementation is deferring the constitution to whoever gets to the file first.

**Plan the schism.** In both systems, changing the rules forks the community. The traditions handle this badly, generally through centuries of mutual anathema. A network at least gets to plan for it, which argues for putting as little as possible in the immutable layer and as much as possible in the layer that can be revised without a fork. This is exactly what Holochain's integrity and coordinator split is for.

**Decide where ambiguity is allowed to live.** If a domain genuinely needs plural admissible readings, and human coordination usually does, they cannot live in a deterministic validation rule. They have to live in the layer above, in the interpretive practice a community builds around its data. The membrane can enforce that a claim is well-formed. It cannot enforce what the claim means.

## Related Topics

- [[exegetical-traditions|Exegetical Traditions]] - The inherited membranes this note reads the written ones against
- [[hermeneutics|Hermeneutics]] - Why interpretation is historically situated, and why that breaks the analogy
- [[agent-centric-architecture|Agent-Centric Architecture]] - Local chains as source of truth, with the DHT as shared validation layer
- [[validation-rules|Validation Rules]] - The concrete Holochain validation workflow, warrants, and determinism constraints
- [[dna-and-zomes|DNA and Zomes]] - Why the validation rules and the network identity are the same object
- [[shacl|SHACL]] - Shape-based validation of RDF graphs, with graded severity
- [[the-homuncular-interface|The Homuncular Interface]] - The membrane rather than window distinction, developed elsewhere in this garden
- [[ostroms-design-principles|Ostrom's Design Principles]] - Clearly defined boundaries as the first condition of a working commons
- [[peer-to-peer-infrastructure-governance|Infrastructure as Governance]] - Why the design of the substrate is itself a governance act
- [[knowledge/governance-and-community/index|Governance and Community]] - Broader domain context

## References

- [Holochain Developer Documentation: Application Architecture](https://developer.holochain.org/concepts/2_application_architecture/) - Integrity and coordinator zomes, DNA identity
- [W3C: Shapes Constraint Language (SHACL)](https://www.w3.org/TR/shacl/) - The specification, including severity and validation reports
- Gadamer, Hans-Georg. *Truth and Method* - Situatedness as the condition of understanding rather than an obstacle
- Halbertal, Moshe. *People of the Book: Canon, Meaning, and Authority* - How a community's interpretive rules constitute its canon
