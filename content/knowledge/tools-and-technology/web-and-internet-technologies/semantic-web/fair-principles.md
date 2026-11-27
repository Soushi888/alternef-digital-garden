---
title: "FAIR Principles"
description: "Findable, Accessible, Interoperable, Reusable: guiding principles for machine-actionable data, read here against Valueflows, hREA and Holochain."
aliases:
  - "FAIR"
  - "FAIR Guiding Principles"
tags: ["semantic-web", "linked-data", "valueflows", "holochain", "json-ld"]
date: 2026-11-27
draft: true
---

The FAIR Guiding Principles (Wilkinson et al., 2016) describe what makes data and metadata findable, accessible, interoperable and reusable.
Their target is not only humans but machines: the principles ask that computers can discover, retrieve and combine data with little human help.
That makes them a natural lens for [[knowledge/tools-and-technology/web-and-internet-technologies/semantic-web/index|Semantic Web]] work, and for agent-centric systems where software agents are the main readers.

## The fifteen principles

**Findable**
- F1: (meta)data are assigned a globally unique and persistent identifier.
- F2: data are described with rich metadata.
- F3: metadata clearly and explicitly include the identifier of the data it describes.
- F4: (meta)data are registered or indexed in a searchable resource.

**Accessible**
- A1: (meta)data are retrievable by their identifier using a standardized communications protocol.
  - A1.1: the protocol is open, free, and universally implementable.
  - A1.2: the protocol allows for an authentication and authorization procedure, where necessary.
- A2: metadata are accessible, even when the data are no longer available.

**Interoperable**
- I1: (meta)data use a formal, accessible, shared, and broadly applicable language for knowledge representation.
- I2: (meta)data use vocabularies that follow FAIR principles.
- I3: (meta)data include qualified references to other (meta)data.

**Reusable**
- R1: (meta)data are richly described with a plurality of accurate and relevant attributes.
  - R1.1: (meta)data are released with a clear and accessible data usage license.
  - R1.2: (meta)data are associated with detailed provenance.
  - R1.3: (meta)data meet domain-relevant community standards.

## Key Concepts

**Metadata is a first-class target.** Almost every principle says "(meta)data": the description of a resource matters as much as the resource.

**FAIR is not open.** A1.2 explicitly allows authentication and authorization.
A private dataset can be FAIR as long as the way to request access is explicit and machine-readable.
The usual summary, taken up by OpenAIRE and the European Commission, is "as open as possible, as closed as necessary": the metadata stay open and informative while access to the data is controlled.

**Principles, not a standard.** FAIR names outcomes and leaves the technology open, so FAIRness is a matter of degree rather than a binary label.
Because the principles were open to diverging readings, the community later added FAIR Maturity Indicators to evaluate how far a resource meets each one.
The principles are themselves published as an ontology, so a resource can declare which ones it satisfies.

**What FAIR leaves out.** The principles say nothing about data quality: a perfectly FAIR dataset can still be wrong.
They also describe properties of data, not relations between people.
The CARE Principles for Indigenous Data Governance (Collective benefit, Authority to control, Responsibility, Ethics) were written as their complement, because FAIR's push for sharing ignores power differentials and historical contexts.

## Valueflows: a FAIR vocabulary

[[valueflows|Valueflows]] is already FAIR on the vocabulary side.
Its ontology is published in OWL under a persistent IRI, `https://w3id.org/valueflows/ont/vf#`, which covers F1 for the vocabulary and I1 and I2 for anything that uses it.
The ontology document also declares a version IRI (`https://w3id.org/valueflows/ont/1.0.0/vf`) and a CC BY-SA 4.0 license, so the vocabulary meets R1.1 as well.
Its relations (`inputOf`, `outputOf`, `provider`, `receiver`) are qualified references by design, so I3 lives in the model itself.

## hREA: FAIR vocabulary, non-FAIR instances

[[hrea|hREA]] exposes its data through GraphQL rather than as linked data.
An economic event that leaves hREA does not say, in machine-readable terms, that it is a `vf:EconomicEvent`: the vocabulary is FAIR, the instance loses it on the way out.

The smallest useful step is a [[json-ld|JSON-LD]] export carrying the Valueflows `@context`, with a stable IRI scheme for Holochain hashes.
With it, any [[rdf|RDF]] tool could read an hREA network.

## Holochain: strong on identity and provenance, weak on discovery

[[agent-centric-architecture|Holochain's agent-centric design]] gives several principles almost for free:

- **F1**: an action hash is a globally unique, persistent, content-addressed identifier.
- **A1.2**: membrane proofs act as the authorization procedure for joining a network.
- **A2**: no data in a DHT or a source chain is ever erased; a delete action only marks the earlier action as dead, so the record outlives its retirement.
  Private entries go further: the entry stays on its author's source chain while the action describing it is still published, which is A2's metadata-without-data case almost word for word.
- **R1.2**: every agent's source chain is a signed, ordered record of what they authored. In hREA this doubles, since a Valueflows event is itself economic provenance.

The gap is outside the network.
A hash is only resolvable from inside the DHT that holds it, and no DHT is indexed globally, so F4 is not met and A1 only partly.
What is missing is a resolver, in the spirit of w3id, that turns a hash into a public URL and returns at least the metadata.

## Commons governance as R1.1

In a commons-oriented application such as [[portfolio/nondominium|Nondominium]], the governance rules attached to a shared resource play the role R1.1 gives to a data usage license.
Expressing those rules in a formal vocabulary would make them interoperable across networks.
This is also where CARE meets FAIR: a license says what anyone may do with the data, while commons governance says who decides, which is the question CARE's Authority to control asks.

## Open questions

- Which IRI scheme should hREA use for Holochain hashes, and who runs the resolver?
- Can a source chain map cleanly onto PROV-O, the W3C provenance ontology? Not yet checked.
- Is a nanopublication structurally equivalent to a validated Holochain record?
  A nanopublication is a small self-contained RDF unit made of three named graphs (the assertion, its provenance, and publication information), and has been shown to implement FAIR Digital Objects; a Holochain record likewise pairs an entry with an action that its author signs and chains to their previous action.

## Related Topics
- [[knowledge/tools-and-technology/web-and-internet-technologies/semantic-web/index|Semantic Web]]
- [[ontologies|Ontologies]]
- [[json-ld|JSON-LD]]
- [[rdf|RDF]]
- [[knowledge-graphs|Knowledge Graphs]]
- [[valueflows|Valueflows]]
- [[hrea|hREA]]
- [[agent-centric-architecture|Agent-Centric Architecture]]

## References
- [FAIR Principles, GO FAIR Foundation](https://www.gofair.foundation/fair-principles/): the fifteen principles, quoted above
- [Wilkinson et al. (2016), The FAIR Guiding Principles for scientific data management and stewardship](https://doi.org/10.1038/sdata.2016.18): the founding paper, Scientific Data 3, 160018
- [FAIR principles ontology](https://w3id.org/fair/principles): machine-actionable definitions of each principle
- [How to make your data FAIR, OpenAIRE](https://www.openaire.eu/how-to-make-your-data-fair): FAIR as principles rather than a standard, and FAIR but not open
- [Boeckhout, Zielhuis and Bredenoord (2018), The FAIR guiding principles for data stewardship: fair enough?](https://doi.org/10.1038/s41431-018-0160-0): a critical appraisal, European Journal of Human Genetics 26, 931-936
- [The CARE Principles for Indigenous Data Governance, Global Indigenous Data Alliance](https://www.gida-global.org/careprinciples): the people-and-purpose complement to FAIR
- [Valueflows Ontology](https://w3id.org/valueflows/ont/vf): the OWL document, with its version IRI and license
- [CRUD Actions, Holochain Developer Portal](https://developer.holochain.org/concepts/6_crud_actions): how deletes mark data dead instead of removing it
- [Nanopublications as FAIR Digital Object Implementations](https://www.tib-op.org/ojs/index.php/ocp/article/view/1417): the three-graph structure and its fit with FDOs
