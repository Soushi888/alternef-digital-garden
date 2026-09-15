---
title: "Syllogism"
description: "A deductive argument in three propositions, where two premises joined by a middle term force a conclusion by form alone."
aliases:
  - "Syllogistic"
  - "Categorical Syllogism"
  - "Aristotelian Logic"
tags: ["education", "critical-thinking", "philosophy", "trivium", "liberal-arts"]
date: 2026-09-02
draft: false
---

A **syllogism** is a deductive argument made of exactly three propositions: two premises and a conclusion that follows from them by form alone. Aristotle worked it out in the *Prior Analytics*, one of the treatises later gathered as the *Organon*, and it remained the dominant model of valid inference in the West for more than two thousand years. The standard textbook illustration: all men are mortal; Socrates is a man; therefore Socrates is mortal.

What makes the syllogism worth studying is not the example but the claim behind it. If the form is right, the conclusion follows whatever the terms happen to mean. Aristotle made this visible by writing his own examples with letters in place of nouns, a move often credited as the first use of variables in the history of logic.

## The Three Terms

Every categorical syllogism turns on three terms, each appearing exactly twice.

| Term | Where it appears | Role |
|------|------------------|------|
| **Major term** | Major premise (the general one) and the predicate of the conclusion | What is asserted |
| **Minor term** | Minor premise (the particular one) and the subject of the conclusion | What it is asserted of |
| **Middle term** | Both premises, never the conclusion | The joint that lets the inference happen |

In the standard example, *mortal* is the major term, *Socrates* the minor, *man* the middle. The middle term does all the work and then disappears: it is what the two premises share, and removing it leaves two unrelated statements from which nothing follows.

## Figures and Moods

The position of the middle term (M) relative to the major (P) and minor (S) gives the **figure**:

| Figure | Major premise | Minor premise |
|--------|---------------|---------------|
| First | M is P | S is M |
| Second | P is M | S is M |
| Third | M is P | M is S |
| Fourth | P is M | M is S |

Aristotle worked out the first three; the fourth was systematized by later logicians.

Each proposition takes one of four categorical forms: **A** (universal affirmative, "all S are P"), **E** (universal negative, "no S is P"), **I** (particular affirmative, "some S are P"), **O** (particular negative, "some S are not P"). A figure plus an assignment of these forms gives a **mood**. Of the 256 possible combinations, 24 are traditionally counted valid, and 15 of those hold without assuming the classes are non-empty.

Medieval logicians coined mnemonic names whose vowels encode the mood: *Barbara* (AAA in the first figure), *Celarent* (EAE), *Darii* (AII), *Ferio* (EIO). The names were memorized as verse, which is how a formal result travelled through a manuscript culture.

## Three Types

- **Categorical**: relates classes through a shared middle term. "All A are B; all B are C; therefore all A are C."
- **Hypothetical**: chains conditionals. "If P then Q; if Q then R; therefore if P then R."
- **Disjunctive**: eliminates alternatives. "Either P or Q; not P; therefore Q."

Only the categorical form is Aristotle's own. The hypothetical and disjunctive forms belong to the propositional logic developed by the Stoics, and the two traditions were only unified much later.

## Valid, Sound, and the False Premise

**Validity** is a property of the form: if the premises are true, the conclusion cannot be false. **Soundness** adds that the premises are in fact true. Only a sound argument establishes its conclusion.

A valid syllogism with a false premise is unsound, and its conclusion is not thereby false: it is *unsupported*. The argument simply gives no reason to believe it either way, and the conclusion may still happen to be true for unrelated reasons.

> All fish are mammals. Whales are fish. Therefore whales are mammals.

Both premises are false, the form is impeccable, and the conclusion is true. This is why validity and truth have to be tracked separately: a valid argument transmits truth when it has truth to transmit, and transmits nothing otherwise.

## Where the Form Runs Out

A syllogism is valid only if its middle term means the same thing in both premises. When it does not, the argument carries four terms wearing three names and nothing follows. Medieval logicians called this *quaternio terminorum*, the fallacy of four terms, and it is equivocation dressed as deduction.

> Nothing is better than eternal happiness. A ham sandwich is better than nothing. Therefore a ham sandwich is better than eternal happiness.

The form is flawless. What fails is the assumption that *nothing* means one thing across both premises.

This is the seam where formal logic hands off to [[hermeneutics|Hermeneutics]]. Deduction operates on propositions whose meaning is already settled; it has no resources for settling it. Deciding that a term keeps its sense from one premise to the next is an interpretive act, not a logical one, and it depends on context, tradition, and the reader's prior understanding. The hermeneutic circle runs underneath every syllogism: the terms cannot be fixed without a reading of the whole, and the whole cannot be read without provisional terms.

The relation runs both ways. [[exegetical-traditions|Exegetical Traditions]] embed deductive machinery inside their rules of reading. Rabbi Ishmael's *kal v'chomer*, the a fortiori inference from the lighter case to the heavier, is a formal schema operating within an interpretive practice, and scholastic theology was built out of disputed syllogisms in the *quaestio* form. Logic supplies the transmission; hermeneutics supplies what is transmitted.

## From Terms to Formal Semantics

Syllogistic held until Frege's *Begriffsschrift* (1879) replaced term logic with quantifiers and predicates. The gain was relational inference, which no syllogism can express: from "every horse is an animal" it follows that "every horse's head is an animal's head", and Aristotle's apparatus cannot get there.

Aristotle's question survived the replacement of his answer. What makes an inference valid became, in the twentieth century, a question for **formal semantics**: Tarski's model-theoretic definition of truth treats validity as truth preservation across every interpretation of the non-logical vocabulary. Meaning stops being whatever the terms happen to evoke and becomes a systematic assignment against which forms are tested. The equivocation that breaks a syllogism is, in this framing, just the use of two different interpretations where the form requires one.

That machinery is now industrial. [[knowledge/tools-and-technology/web-and-internet-technologies/semantic-web/ontologies|Ontology Engineering]] and the description logics behind OWL perform mechanized subsumption reasoning over classes: declare that every Zome is a Module and every Module is a Component, and a reasoner derives that every Zome is a Component without being told. That is *Barbara*, executed by machine. [[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/semantic-ai|Semantic AI]] rests on exactly this, which is why it can produce an explainable inference chain where a purely statistical model produces only a correlation.

## Related Topics

- [[trivium|Trivium]] - Logic as the second language art, where the syllogism was taught
- [[hermeneutics|Hermeneutics]] - What deduction presupposes and cannot supply, namely settled meaning
- [[exegetical-traditions|Exegetical Traditions]] - Deductive schemas operating inside codified rules of reading
- [[mathematical-intuitionism|Mathematical Intuitionism]] - A logic that rejects the excluded middle, and so a limit case for classical validity
- [[liberal-arts|Seven Liberal Arts]] - The curriculum that carried syllogistic through the medieval university
- [[knowledge/tools-and-technology/web-and-internet-technologies/semantic-web/ontologies|Ontology Engineering]] - Syllogistic subsumption mechanized as description logic
- [[knowledge/culture-and-education/index|Culture and Education]] - Broader domain context

## References

- Aristotle. *Prior Analytics*
- Łukasiewicz, Jan. *Aristotle's Syllogistic from the Standpoint of Modern Formal Logic*
- Frege, Gottlob. *Begriffsschrift*
- Kneale, William and Martha. *The Development of Logic*
