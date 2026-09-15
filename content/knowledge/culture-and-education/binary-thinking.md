---
title: "Binary Thinking"
description: "Reasoning with two terms: what a dichotomy actually claims, why bivalence and the excluded middle are not the same principle, and the conditions under which collapsing a question to two is the right move rather than the lazy one."
aliases:
  - "Dichotomous Thinking"
  - "Bivalence"
  - "Binary Opposition"
  - "Black-and-White Thinking"
tags: ["education", "philosophy", "critical-thinking", "knowledge-systems", "mathematics", "systems-thinking"]
date: 2026-09-15
draft: false
---

Binary thinking is the house style of Western reasoning, and it is usually criticised for the wrong reason. The complaint is that two is too few. The real question is narrower and harder: a dichotomy makes a specific claim about the world, and that claim is either true of the case in front of you or it is not.

The claim is this. A dichotomy is "a partition of a whole (or a set) into two parts," and the parts must be **jointly exhaustive** and **mutually exclusive**: everything falls on one side or the other, and nothing falls on both. Where that holds, reducing to two loses nothing and buys a great deal. Where it does not, the reduction is not a simplification but an error, and calling it rigour does not help.

Almost everything interesting about binary thinking follows from keeping those two cases apart.

## Two Principles That Are Not the Same Principle

The most common confusion in this area is treating **bivalence** and the **law of excluded middle** as two names for one thing. They are different claims at different levels, and systems exist where one holds and the other fails.

Bivalence is a claim about semantics, made from outside the logic: "the principle of bivalence taken as a metatheoretical principle, viz. that there exist only two distinct logical values." The excluded middle is a claim inside the logic, the theorem $P \lor \neg P$. The Stanford Encyclopedia puts the relation carefully: "On the object-language level this principle finds its expression in the famous classical laws of excluded middle and non-contradiction." Expression is not identity, and the gap between them is where the interesting systems live.

| System | Bivalence | Excluded middle | What the extra room is for |
|--------|-----------|-----------------|----------------------------|
| Classical logic | Holds | Holds | Nothing |
| Kleene K3 | Fails (gap) | Fails | Undefined outputs of partial functions |
| Priest LP | Fails (glut) | **Holds** | True contradictions |
| Supervaluationism | Fails | **Holds** | Borderline cases of vague predicates |
| Intuitionism | Fails | Fails | Absence of a construction |
| Epistemicism | **Holds** | Holds | Nothing: vagueness is ignorance |

Supervaluationism is the cleanest demonstration. Borderline statements "lack a truth-value," so bivalence goes, and yet supervaluationists "accept the principle of excluded middle": "it is raining or it is not raining" comes out true on every way of making "raining" precise, and so it is supertrue, even though neither disjunct is. LP goes the other way and keeps the excluded middle by letting some statements be both true and false. Epistemicism keeps both and pays for it by insisting there is a last nanosecond of your childhood that you simply cannot know: "Epistemicists accept this astonishing consequence. They stand by classical logic and conclude that vagueness is a form of ignorance."

So four positions, four different places to break, and none of them is "binary thinking is naive."

## The Strongest Argument for Two

The best defence of binary reasoning is not the one people usually reach for, and it comes from inside many-valued logic.

**Suszko's thesis** says "there are but two logical values, true and false," and it is backed by a result rather than an intuition. The **Suszko reduction** establishes that "every structural Tarskian consequence relation and therefore also every structural Tarskian many-valued propositional logic is characterized by a bivalent semantics." The move that makes this work is separating **algebraic** values from **logical** ones. A three-valued or four-valued logic has three or four algebraic values in its matrix, but what inference actually turns on is a single binary split: designated or not designated. Everything above the line preserves, everything below does not.

That reframes the whole family. The third value in Kleene, the fourth in Belnap, the intermediate values of fuzzy logic: these are real distinctions doing real work in the semantics, and at the point where the logic says "this follows," they collapse to two. See [[ternary-thinking|Ternary Thinking]] for what the extra values buy before that collapse.

The engineering version of the same point is that something always has to branch. A query planner returns rows or does not. A conditional jumps or does not. The question is never whether the collapse happens, only how much information you are allowed to carry before it does.

## Binary as Machinery

The binary that runs the world is younger than the binary in the philosophy, and it arrived along a specific chain.

**Leibniz**, 1703, published *Explication de l'Arithmétique Binaire*, whose full title advertises "some remarks on its usefulness, and on the light it throws on the ancient Chinese figures of Fu Xi." He had worked on it privately since at least 1679. Corresponding with the Jesuit **Joachim Bouvet** from 1700, he learned that the *I Ching*'s hexagrams were, in effect, "an independent, parallel invention of binary notation," and he read the whole system theologically, as a figure of *creatio ex nihilo*: "the origin of numbers, as it is presented here through the simple and unadorned presentation of One and Zero or Nothing."

**George Boole** made it a logic: *The Mathematical Analysis of Logic* (1847), then *An Investigation of the Laws of Thought* (1854), which he regarded as the mature statement superseding the earlier pamphlet.

**Claude Shannon** made it a technology. His 1937 MIT master's thesis, *A Symbolic Analysis of Relay and Switching Circuits*, showed that Boolean algebra simplifies relay arrangements and that relay arrangements in turn solve Boolean problems. Herman Goldstine called it "surely one of the most important master's theses ever written. It helped to change digital circuit design from an art to a science." **Akira Nakashima** reached a related result concurrently by extending circuit theory rather than abstracting from it.

The word came last and from someone else. **John Tukey** contracted "binary digit" to *bit* in a Bell Labs memo dated **9 January 1947**, and Shannon credited him in the 1948 paper: "If the base 2 is used the resulting units may be called binary digits, or more briefly *bits*, a word suggested by J. W. Tukey."

### Why hardware chose two, and where it had to choose more

Two voltage levels won for an unglamorous reason: **noise margin**, "the amount by which the signal exceeds the threshold for a proper '0' or '1'." With only two states, the gap between them is as wide as the supply allows, so a degraded signal can be cleanly restored at every stage. Add a third level and every margin narrows, which is why multi-level signalling needs finer threshold discrimination and buys density at the cost of robustness.

What is more instructive is where the binary had to be given up again, and by how much. Verilog's **IEEE 1364** models digital signals with four values, `0`, `1`, `Z` and `X`. VHDL's **IEEE 1164** (1993) uses nine: `'U'` uninitialized, `'X'` strong unknown, `'0'`, `'1'`, `'Z'` high impedance, `'W'` weak unknown, `'L'` and `'H'` weak drive, and `'-'` don't care. Tri-state buses need `Z`, wired-AND logic needs the weak drives, and finding the bug where a signal was never driven needs `U`.

Nobody chose nine because nine is a good number. The count came from the failure modes, which is the only way a count should ever be chosen. The physical substrate stayed binary throughout.

## Binary as Structure

Structural linguistics made the opposition itself the unit of meaning. For **Saussure**, "the binary opposition is the means by which the units of language have value or meaning": hot and cold mean what they mean through each other, not by pointing at anything. **Claude Lévi-Strauss** carried this into anthropology, holding that "myths consist of juxtaposed binary oppositions" and that the human mind thinks fundamentally in such pairs.

The critique came from two directions, and both are worth keeping.

The empirical objection is that the oppositions were put there rather than found. **Stanley Diamond** argued that Lévi-Strauss "did not reach such a conclusion by inductive reasoning, but simply by working backwards from the evidence" to concepts assumed in advance. That is the structural version of confirming a dichotomy by only looking for cases that fit it.

The philosophical objection is **Derrida's**, and it is sharper than the popular "Derrida was against binaries." His point is that a classical opposition is never a balanced pair: "in a classical philosophical opposition we are not dealing with the peaceful coexistence of a vis-a-vis, but with a violent hierarchy" (*Positions*, 1972). One term holds the superior position and the other is defined as its lack. Deconstruction is then two-phase, and the second phase is the one that gets dropped: first "*reversing* the Platonistic hierarchies," then re-inscribing the formerly inferior term "as the 'origin' or 'resource' of the opposition and hierarchy itself." Inverting a hierarchy and stopping is not the argument; it just reinstalls the structure upside down.

Note what this does *not* say. A hierarchical opposition is a defective dichotomy precisely because its two terms are not symmetric, which is a claim about those oppositions, not about partition as such. Odd and even are not a violent hierarchy.

## Binary as Pathology

Clinical psychology arrived at the same structure from the other end. **Splitting** is "the failure in a person's thinking to bring together the dichotomy of both perceived positive and negative qualities of something into a cohesive, realistic whole." **Ronald Fairbairn** described it in 1952 within object relations theory, as the infant's inability to combine the good and unsatisfying aspects of a parent into one person; **Melanie Klein** developed the account; **Otto Kernberg** made the persistence of "all good" and "all bad" objects central to his model of borderline personality organisation.

The reasoning error with the same shape is the **false dilemma**, "an informal fallacy based on a premise that erroneously limits what options are available." Its precise defect is instructive: it presents as *contradictories* a pair that are merely *contraries*. Contradictories cannot both be false; contraries can. Disjunctive syllogism, from $P \lor Q$ and $\neg P$ to $Q$, stays perfectly valid, and that is the point. The fallacy is never in the inference, it is in the disjunction, which is another way of saying it is in the claim that the two options are jointly exhaustive.

## Binary as Institution

**Duverger's law** holds that under single-member districts and first-past-the-post, "only two powerful political parties tend to control power every election cycle." It works through a mechanical effect, small parties struggle to win seats, and a psychological one, voters are "wary of voting for a smaller party whose policies they actually favor because they do not want to 'waste' their votes."

Two details keep it honest. Duverger "did not regard this principle as absolute," suggesting plurality delays new forces rather than forbidding them; and regional parties in Canada, the United Kingdom and India have produced durable multiparty parliaments inside first-past-the-post by concentrating support geographically. What the law really describes is a rule that manufactures a dichotomy out of a continuous distribution of preferences. The two-party outcome is downstream of the counting rule, not of anything binary in the electorate.

## When Two Is the Right Number

One test, in three parts, and a candidate has to pass all three.

**Is the partition exhaustive?** Everything must fall on one side. This is where false dilemmas die, and where "market or state" dies, since [[commons|Commons]] arrangements are neither.

**Is it exclusive?** Nothing may fall on both. This is where LP's gluts break bivalence and where any predicate with borderline cases breaks the clean cut.

**Does something branch on it?** If no decision, computation or prediction turns on which side a thing falls, the distinction is decoration. Odd and even pass all three. Digital and analogue pass in a circuit and fail as a description of culture.

Two failure modes sit on either side of that test, and they are equally common.

Collapsing a graded structure into two is the familiar one: the continuum of vague predicates, the spectrum of political preference, the many-and-nested polycentricity Elinor Ostrom actually described. But the opposite error is just as real and gets far less attention. Refusing a dichotomy that genuinely holds, in the name of nuance, is how people avoid decisions that have already been forced. A test either passes or it does not. A patient either has the condition or does not. The move that sounds sophisticated, insisting the truth is somewhere in between, is wrong whenever the partition is real, and saying so is not a failure of subtlety.

The honest version of the critique, then, is not that binary thinking is crude. It is that binary thinking is a **claim** that gets made silently, and silent claims do not get checked. Say the claim out loud, exhaustive and exclusive and load-bearing, and most bad dichotomies fall over without any need for a third term at all. Where the claim survives, two is exactly the right number, and adding a term would be the error. See [[ternary-thinking|Ternary Thinking]] for what a genuine third does, and [[quaternary-thinking|Quaternary Thinking]] for why most fours are two binaries wearing a costume.

## Related Topics

- [[ternary-thinking|Ternary Thinking]] - What a third term buys once the binary is refused, and the test for when it earns its keep
- [[quaternary-thinking|Quaternary Thinking]] - Why the majority of famous fours decompose into two crossed binaries
- [[dialectic|Dialectic]] - The tradition built on treating an opposition as unstable rather than settled
- [[mathematical-intuitionism|Mathematical Intuitionism]] - Rejects the excluded middle without adding a third value
- [[syllogism|Syllogism]] - Where a binary partition of terms does deductive work
- [[systems-thinking|Systems Thinking]] - Structure over parts, with the same objection to premature reduction
- [[holism|Holism]] - Wholes with properties absent from their parts
- [[metacognition|Metacognition]] - Noticing which distinctions you are making before you argue from them
- [[commons|Commons]] - The standing counterexample to "market or state"
- [[knowledge/culture-and-education/index|Culture and Education]] - Domain overview
- [[knowledge/tools-and-technology/index|Tools and Technology]] - Where the binary substrate actually lives

## References

**Logic and truth values**

- [Truth Values](https://plato.stanford.edu/entries/truth-values/) - Stanford Encyclopedia of Philosophy, on bivalence as a metatheoretical principle, Frege, and the Suszko reduction
- [Vagueness](https://plato.stanford.edu/entries/vagueness/) - Stanford Encyclopedia of Philosophy, on supervaluationism keeping excluded middle without bivalence, and on epistemicism
- [Many-Valued Logic](https://plato.stanford.edu/entries/logic-manyvalued/) - Stanford Encyclopedia of Philosophy, on K3, LP and designated values
- [False Dilemma](https://en.wikipedia.org/wiki/False_dilemma) - On contradictories versus contraries, and why disjunctive syllogism stays valid
- [Dichotomy](https://en.wikipedia.org/wiki/Dichotomy) - The jointly exhaustive and mutually exclusive conditions

**Machinery**

- [Binary Number](https://en.wikipedia.org/wiki/Binary_number) - Leibniz 1703, the Bouvet correspondence, and the *creatio ex nihilo* reading
- [George Boole](https://en.wikipedia.org/wiki/George_Boole) - *The Mathematical Analysis of Logic* (1847) and *The Laws of Thought* (1854)
- [A Symbolic Analysis of Relay and Switching Circuits](https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits) - Shannon 1937, Goldstine's assessment, Nakashima's concurrent work
- [Bit](https://en.wikipedia.org/wiki/Bit) - Tukey's 9 January 1947 memo and Shannon's 1948 credit
- [Noise Margin](https://en.wikipedia.org/wiki/Noise_margin) - The definition that explains why two levels are robust
- [IEEE 1164](https://en.wikipedia.org/wiki/IEEE_1164) - The nine-valued `std_logic` type and what each value is for
- [Four-Valued Logic](https://en.wikipedia.org/wiki/Four-valued_logic) - IEEE 1364's `0`, `1`, `Z`, `X`
- [Laws of Form](https://en.wikipedia.org/wiki/Laws_of_Form) - Spencer-Brown 1969, "Draw a distinction", and Banaschewski's 1977 deflation

**Structure and critique**

- [Binary Opposition](https://en.wikipedia.org/wiki/Binary_opposition) - Saussure on opposition as the source of value
- [Claude Lévi-Strauss](https://en.wikipedia.org/wiki/Claude_L%C3%A9vi-Strauss) - Myth as juxtaposed oppositions, and Stanley Diamond's objection
- [Jacques Derrida](https://plato.stanford.edu/entries/derrida/) - Stanford Encyclopedia of Philosophy, on the two phases of deconstruction
- [Positions](https://en.wikipedia.org/wiki/Positions_%28book%29) - Derrida 1972, the source of the "violent hierarchy" passage

**Pathology and institutions**

- [Splitting (psychology)](https://en.wikipedia.org/wiki/Splitting_%28psychology%29) - Fairbairn 1952, Klein, and Kernberg on borderline organisation
- [Duverger's Law](https://en.wikipedia.org/wiki/Duverger%27s_law) - The mechanical and psychological effects, and the regional-party counterexamples
