---
title: "Ternary Thinking"
description: "Reasoning with three terms instead of two: a third value, a third relatum, or a third level, and the test for when the third term does real work rather than rounding an untidy structure to a pleasing count."
aliases:
  - "Triadic Thinking"
  - "Thirdness"
  - "The Included Middle"
  - "Logic of the Included Middle"
tags: ["education", "philosophy", "critical-thinking", "knowledge-systems", "metaphysics", "systems-thinking"]
date: 2026-09-15
updated: 2026-09-15
draft: false
---

[[binary-thinking|Binary]] is the default setting of Western reasoning. True or false, subject or object, signal or noise, market or state. The habit is so deep that it usually passes for rigour rather than for a choice. **Ternary thinking** is the family of moves that refuse it: instead of two terms and a boundary between them, three terms, where the third is neither a midpoint nor a compromise but something with its own standing.

The family is larger and less unified than it looks. At least three different operations travel under the same word, and most confusion about ternary thinking comes from sliding between them without noticing.

## Three Ways of Being Three

| Operation | What the third is | Where it lives | Canonical case |
|-----------|-------------------|----------------|----------------|
| A third **value** | A truth value alongside true and false | Formal semantics | Łukasiewicz, Kleene, Priest |
| A third **relatum** | A place in a relation that cannot be filled by iterating pairs | Logic of relations, semiotics | Peirce's sign, object, interpretant |
| A third **level** | A state that resolves a contradiction by sitting on a different level of reality | Metaphysics, transdisciplinarity | Lupasco's and Nicolescu's T-state |

These are independent. You can add a truth value without touching the structure of relations. You can insist that relations are irreducibly triadic while keeping a strictly two-valued logic, which is exactly what Peirce did. And a third level is a claim about reality, not about semantics at all. Treating them as one idea is the most common way ternary thinking gets dismissed as mysticism.

## Peirce: The Triad That Will Not Decompose

Charles Sanders Peirce built his whole system on three categories: **Firstness** (quality or possibility considered in itself), **Secondness** (brute fact, actuality, resistance), and **Thirdness** (mediation, habit, law, representation). In his own compressed phrasing, quality was a first, fact was a second, habit or rule or law was a third.

The interesting part is not the taxonomy but the formal claim underneath it, his **reduction thesis**: relations of any adicity whatever can be constructed out of triadic relations, while monadic and dyadic relations alone are not enough to construct even one non-degenerate triadic relation. Three is where the ladder stops. The construction needs specific resources, among them negation, De Morgan's relative product, and the **teridentity** relation ($x = y = z$), which Peirce held to be logically more primitive than ordinary two-place identity. He first stated the thesis in 1870 and put it most bluntly in 1892: a triadic relation cannot be reduced without a use of triadic relation.

The shape of that claim is what matters. Peirce was not saying triads are richer or more elegant. He was saying you provably cannot get one by stacking pairs. Whether he was right is still open. Robert Burch produced an exact proof in 1991, but it needed restrictions that later work removed, and Quine's 1954 pairing construction reducing arbitrary relations to dyadic ones remains the standing objection, one Quine himself never publicly turned against Peirce. Fresh proofs arrived in the 2000s from Hereth Correia and Pöschel. Treat the thesis as a live claim with real formal content, not as settled doctrine.

His semiotics is the application. In his own definition, a sign is "anything which is so determined by something else, called its Object, and so determines an effect upon a person, which effect I call its interpretant." The interpretant is itself determined to become a further sign of the same object, so signification opens into an ongoing series rather than closing. A sign signifies only in being interpreted.

The usual contrast is with Saussure, and it needs stating carefully, because Saussure also counts to three. He writes of "the three notions involved here" and names them signified, signifier, and the sign itself. But his third is the **whole**, not a third place in a relation: signifier and signified are the two sides, the sign is their union, and the referent is excluded from the account altogether, since both sides are psychological. That is a mereological three, a pair plus a name for the pair. Peirce's is a relational three, where the interpretant is a genuinely distinct position that the other two cannot occupy. The difference is what makes interpretation a process instead of a lookup, and it is why Peirce's model opens onto [[hermeneutics|Hermeneutics]] while Saussure's closes.

## The Included Middle

Aristotle's *tertium non datur*, the law of the excluded middle, says there is no third option between a proposition and its negation. The Romanian-French philosopher **Stéphane Lupasco** proposed a logic that includes one, and **Basarab Nicolescu** later extended it into the methodology of transdisciplinarity.

The axiom, in Nicolescu's formulation: there exists a third term **T** which is at the same time A and non-A. Stated flatly this sounds like a straightforward contradiction, and his answer is that the T-state is not on the same level. Picture a triangle with one vertex at one level of Reality and the other two at another. The T-state is "situated on a different level of Reality than A and non-A," and there "that which appears to be disunited is in fact united." A single level, he insists, "can only create antagonistic oppositions," so a third term sitting beside A and non-A cannot reconcile them. Non-contradiction is preserved within each level; what the axiom denies is that one level exhausts reality. His own summary of the relation to Aristotle is more modest than the slogan suggests: "the logic of the included middle does not abolish the logic of the excluded middle: it only constrains its sphere of validity."

Two precisions the secondary literature usually loses. First, **the levels are Nicolescu's addition, not Lupasco's**, by his own written admission: the axiom "is completely clarified once the notion of 'levels of Reality', not existing in the works of Lupasco, is introduced." Lupasco's own T-state, from *Le principe d'antagonisme et la logique de l'énergie* (1951), is "neither actual nor potential." Second, and worth stating plainly, this tradition has no standing in formal logic. Neither name appears anywhere in the Stanford Encyclopedia's entries on many-valued logic or paraconsistent logic. Nicolescu's claim that Lupasco's system is "a true logic, mathematically formalized, multivalent and non-contradictory" is Nicolescu's assessment of Lupasco, not a result anyone else uses. Reading the *tiers inclus* as a variant of Ł3 or LP is a category error: it is a metaphysics of energy in logical vocabulary, not a matrix semantics with designated values.

What survives that deflation is still worth having, and it is what transdisciplinarity, systems theory and the pedagogy of complexity actually use: a contradiction irresolvable at one level of description may dissolve at another, and the move is to change level rather than to pick a side.

## Three-Valued Logic

The formal cousin is older and better behaved. The problem Aristotle opened in *De Interpretatione* 9, whether "there will be a sea battle tomorrow" is already true or false today, is the classical source for the worry that bivalence over-describes the world. His own resolution is subtler than the version usually reported: "it is necessary for there to be or not be a sea battle tomorrow; but it is not necessary for a sea-battle to take place tomorrow, nor for one not to take place." The disjunction is necessary, neither disjunct is. Whether that abandons bivalence or only denies the necessity of each branch is the fork the whole later tradition runs through.

**Jan Łukasiewicz** published the first explicit three-valued system in 1920, offering the third value as modal possibility, and used it in *On Determinism* (1922) as an argument against logical determinism. Others read the third value differently, and the reading determines the whole system.

| System | Third value means | Law of excluded middle |
|--------|-------------------|------------------------|
| Łukasiewicz Ł3 (1920) | Possible, not yet determined | Fails |
| Kleene strong K3 (1938) | Undefined, a partial function may not return | Fails |
| Bochvar weak (1938) | Meaningless, and the meaninglessness infects any sentence containing it | Fails |
| Asenjo and Priest LP (1966, 1979) | Both true and false (a glut, not a gap) | Holds |

Kleene's motivation was not epistemic. He wanted to reason about partial recursive functions, so his third value marks an output that is **undefined**, and he wrote the values `t`, `f`, `u`. His strong tables take minimum and maximum, so a compound built from an undefined part can still come out defined: false AND undefined is false, because nothing the undefined part could do would rescue it. Bochvar's weak system propagates instead, on the rule that a complex sentence takes the junk value if any of its parts does. Strong Kleene is what a language wants for short-circuit evaluation; weak Kleene is what you want when the third value marks nonsense that should contaminate everything downstream.

Note the last row, and note that LP is Asenjo's (1966) before it is Priest's (1979). LP and K3 use the *same* algebra. The only difference is which values count as designated, and that alone flips the third value from a **gap** to a **glut**. In LP the excluded middle survives; what fails instead is explosion and disjunctive syllogism. "Three-valued" and "rejects the excluded middle" are not the same property, which is the point of the next section.

One footnote that is really a whole chapter. Peirce built his own three-valued system in his Logic Notebook in 1909, calling it **"triadic logic"**, with the third value read as *the limit* between true and not-true, for boundary-propositions that are neither determinately P nor determinately not-P. It sat unpublished until Fisch and Turquette found it in 1966. So the man behind the strongest argument that relations are irreducibly triadic also, independently and privately, reached the third truth value. The two senses of "three" met once, in one notebook, and nobody noticed for fifty-seven years.

## Rejecting the Excluded Middle Without Adding a Third Value

This is the trap worth knowing. [[mathematical-intuitionism|Mathematical intuitionism]] rejects the law of the excluded middle, since asserting $P \lor \neg P$ would mean claiming a construction of $P$ or a construction of its refutation, and for an open problem we have neither. It is the most famous rejection of bivalence in modern mathematics.

It is nevertheless **not** a three-valued logic, and not a finitely many-valued logic of any size. Gödel showed in 1932, using an infinite sequence of successively stronger intermediate logics, that intuitionistic propositional logic has no finite truth-table interpretation. There is no set of *n* values, however large, whose tables pick out exactly the intuitionistic theorems.

So the two moves come apart cleanly. Dropping the excluded middle does not oblige you to name a third value, and naming a third value does not oblige you to drop the excluded middle. Anyone who treats "ternary" and "non-classical" as synonyms has collapsed a real distinction.

## Hegel's Three Moments, and the Formula He Never Used

The best-known triad in philosophy is thesis, antithesis, synthesis, and Hegel did not use it for his own method. The full story of where it came from, and of the several incompatible things the word [[dialectic|Dialectic]] has named, is in its own note; what matters here is the count. Gustav Mueller established this in 1958 by the simple expedient of counting: in all twenty volumes of the collected works, and in the eight volumes first published in the twentieth century, the triad does not occur once. It appears in Hegel exactly twice, both times as something he is dismissing. In the Preface to the *Phenomenology* he attributes it to **Kant** and calls it a "lifeless schema," a "mere shadow," noting that "the instrument for producing this monotonous formalism is no more difficult to handle than the palette of a painter, on which lie only two colours." In the lectures on the history of philosophy he calls it the "spiritless scheme of the triplicity."

The formula entered circulation through **Heinrich Moritz Chalybäus**, whose 1837 *Historische Entwicklung der speculativen Philosophie von Kant bis Hegel* used it as the schema for reading Hegel, and from there through Marx. The Stanford Encyclopedia calls the language Fichte's; Hegel himself blamed Kant. That disagreement is itself unresolved, and worth not papering over.

What Hegel actually described are three moments of the logical (*Encyclopaedia Logic* §§79 to 82): the moment of **understanding**, where determinations are fixed and stable; the **dialectical**, or negatively rational, where they become unstable and pass into their opposites; and the **speculative**, or positively rational, which grasps the unity of the opposition. These are not three parts of logic but three moments of every concept whatsoever. The difference from the popular formula is not pedantry. "Synthesis" suggests two ingredients combined by an outside hand, while Hegel's third moment is what the first two turn out to have been doing all along, which is also why *aufheben* has to mean cancel and preserve at once.

## Ternary in Machines

Balanced ternary uses the digits $-1$, $0$ and $+1$, and needs no separate minus sign: the leading nonzero digit carries the sign of the whole number, and negating every digit negates the value. Donald Knuth called it "perhaps the prettiest number system of all," and pointed out that in this base truncation and rounding are the same operation. It was invented twice in 1840 and 1841, by Léon Lalanne and by Thomas Fowler, who built a machine for it.

The **Setun**, built at Moscow State University under Sergei Sobolev and Nikolay Brusentsov, with the prototype finished in December 1958, ran on balanced ternary and three-valued logic. About fifty machines were made at the Kazan factory between 1959 and 1965, thirty of them for universities. Why it ended is genuinely disputed, and the dispute is the interesting part. The MSU builders wrote that planners took a dim view of an unplanned "fruit of university fantasy," and that the binary replacement cost more than two and a half times as much for the same performance. The factory's version is commercial: the sale price was too low to be worth making. Brian Hayes gives a third account that should trouble anyone romantic about ternary hardware: each trit was implemented with a **pair of magnetic cores**, and two cores can hold two bits, which is more information than one trit. On that reading the machine never actually cashed the radix economy its number system promised. The builders' account is interested testimony; Hayes's is an argument about the hardware.

### Where the third value collapses

The more useful question in computing is not whether a system has a third value but **where that value collapses back into two**, because eventually something has to branch.

SQL admits it into the algebra and collapses it inconsistently at the boundary. The standard says plainly that "the truth value *unknown* is indistinguishable from the `null` for the `Boolean` type," that `WHERE`, `HAVING` and `WHEN` "require *true* conditions," and that check constraints instead "reject *false*, rather than accepting *true*." So the same `UNKNOWN` is thrown away by `WHERE` and waved through by `CHECK`. This is why `NOT IN` against a nullable subquery silently returns nothing: PostgreSQL's documentation states that with a null on the right the result "will be null, not true," and `WHERE` then discards every row, with no error anywhere.

Rust and Haskell refuse the third value instead. `Option<T>` and `Maybe a` are two-constructor sum types, not three-valued logics, and the difference is that the compiler will not let `None` propagate silently the way `NULL` does. Tony Hoare called his 1965 null reference "my billion-dollar mistake"; the fix was not a better third value but a type the programmer is forced to eliminate before use. That is worth sitting with, because it cuts against the assumption that admitting the third term is always the improvement. Sometimes the discipline is refusing it entry to the algebra.

And in distributed systems the third term is not a gap at all. Lamport's 1978 result is that "in a distributed system, it is sometimes impossible to say that one of two events occurred first," so happened-before is only a **partial** order and two events are **concurrent** when neither can causally affect the other. Comparing any two events yields exactly three outcomes: before, after, concurrent. The third is a positive fact about causal structure, not a placeholder for ignorance, and no amount of further observation collapses it. Conflict-free replicated data types then do something elegant with it: the concurrent case is still there underneath, but merge is defined as the least upper bound of a semilattice, a total function on pairs, so the third state never surfaces as something anyone has to decide. Failure detectors go the other way and keep "suspected" as an explicitly fallible third state, which is how consensus gets around the FLP impossibility result.

Four systems, four different places to put the collapse. That choice, rather than the count of values, is where the engineering lives.

## Third Terms Outside Logic

Triadic structure is everywhere in the history of thought, and its ubiquity is a reason for suspicion as much as for confidence.

Some of it is genuinely load-bearing, though both of the usual examples need correcting in the same direction.

Karl Polanyi's **forms of integration** are the cleaner case, once you date them. In *The Economy as Instituted Process* (1957) the three are **reciprocity** (movements between symmetrically arranged groups), **redistribution** (movements toward a centre and out again), and **exchange** (movements between hands under a price-making market). But the triad in *The Great Transformation* (1944) is a different one: reciprocity, redistribution and **householding**, production for one's own use, with barter demoted to a fourth principle "not on a strict parity with the three other principles." The famous trio is the later formulation, and quoting it from the 1944 book is a small scholarly error with a large rhetorical payload, since the 1944 version is the one where market exchange is not yet admitted as a peer.

[[commons|Commons]] are the case that needs the most care, because the popular version runs against Ostrom's own argument. Her 2009 Nobel lecture is titled "Beyond Markets and States," and she does name "private-for-profit, governmental, and community" arrangements. But what she is proposing is **polycentricity**, not a third sector: institutions that "do not fit in a dichotomous world," operating "at multiple scales," with *Nested Enterprises* as the eighth design principle. Her claim is that the number is not two, and it is not three either. It is many, and nested. Citing her as evidence for a triad rounds a graded structure to a clean count, which is exactly the failure mode this note is about.

Some of it is historical inheritance. The alchemical **tria prima**, salt as the solid and permanent, sulphur as the combustible, mercury as the fluid and changeable, first appears in Paracelsus's *Opus paramirum* around 1530 as a third principle added to the older sulphur and mercury pair. It gave Western esotericism a three-principle scheme that still recurs in [[philosophia-perennis|perennialist]] readings of tradition. The Christian Trinity did more: from *homoousios* at Nicaea in 325 through the Cappadocian formula of one *ousia* in three *hypostaseis*, it kept a three-in-one structure at the centre of Western metaphysics for a millennium, and made triadic reasoning feel natural long before anyone formalized it. Peirce, himself a Trinitarian, has been read as deriving his categories from it, though the scholarship arguing this works from structural parallel and cannot show the derivation. These are facts about why the shape is ready to hand, not arguments that it is correct.

And some of it is habit. Triads are memorable, rhetorically satisfying, and easy to produce, which means a great many of them are ornament.

## Where the Third Term Earns Its Keep

One test separates the two cases: **does the third term change what follows?**

The strongest case is the one nobody markets as a ternary. Lamport's *concurrent* passes the test completely: it is a positive fact about causal structure, it is irreducible to "we do not know yet," and every correct distributed system has to handle it as its own case. Three-valued logic passes it mechanically, since the tables differ, the tautologies differ, and a query planner behaves differently. Peirce passes it formally, or would if the reduction thesis holds: his claim is not that triads are pleasing but that a non-degenerate triadic relation cannot be built from dyadic ones, so removing the third relatum removes something unrecoverable. Polanyi passes it empirically, since economies organized by reciprocity make predictions a market model gets wrong.

The political "third way" of the 1990s is the standard failure. It named a position between market and state without specifying any mechanism the other two lacked, and it functioned as a way of avoiding a choice rather than transcending one. The word "third" did the work an argument should have done.

Between those poles sits the commoner and more interesting failure, visible twice in this note: **rounding a graded or partial structure to a clean count**. Ostrom's polycentricity is many and nested, and gets cited as a trichotomy. Saussure names three notions, and gets cited as a pure dyad. Setun is cited as proof that ternary hardware works, when its trits cost two cores each. In every case the number three arrives afterwards, imposed on something whose actual shape was untidier. That is worth watching for whenever a triad is offered as evidence.

The test applies to the included middle too, and honestly. When Nicolescu's T-state names a specific level of description at which a contradiction dissolves, and the level is identifiable, it does work. When it is invoked to make any tension sound resolved, it is the third way in metaphysical dress.

So the discipline ternary thinking needs is not more reverence for three. It is the willingness to ask what the third term predicts, and to drop it when the answer is nothing. That is also why it belongs beside [[systems-thinking|Systems Thinking]] and [[holism|Holism]] rather than opposite them. All three try to keep something reduction throws away, and all three are worth exactly as much as the specific thing they keep.

## Related Topics

- [[binary-thinking|Binary Thinking]] - The default this note refuses, and the conditions under which two is the right number after all
- [[quaternary-thinking|Quaternary Thinking]] - One count up, where most candidates turn out to be two binaries crossed
- [[dialectic|Dialectic]] - The several methods that word has named, and where the thesis-antithesis-synthesis formula actually came from
- [[mathematical-intuitionism|Mathematical Intuitionism]] - Rejects the excluded middle without becoming many-valued, and Gödel's 1932 proof that it cannot be
- [[syllogism|Syllogism]] - The three-proposition deductive form, where the middle term does the work and then disappears
- [[hermeneutics|Hermeneutics]] - Interpretation as process, the tradition Peirce's interpretant opens onto
- [[systems-thinking|Systems Thinking]] - Structure over parts, with the same anti-reductionist motive
- [[holism|Holism]] - Wholes with properties absent from their parts
- [[trivium|Trivium]] - Grammar, logic and rhetoric, a triad that is a curriculum rather than an argument
- [[metacognition|Metacognition]] - The observer as a third term in its own act of knowing
- [[commons|Commons]] - Neither market nor state, a third term that survives the test
- [[complexity-oriented-programming|Complexity Oriented Programming]] - Designing with complexity instead of reducing it
- [[knowledge/culture-and-education/index|Culture and Education]] - Domain overview
- [[knowledge/governance-and-community/index|Governance and Community]] - Where the third term meets institutions

## References

**Logic**

- [Many-Valued Logic](https://plato.stanford.edu/entries/logic-manyvalued/) - Stanford Encyclopedia of Philosophy, on Łukasiewicz 1920, Kleene, Bochvar, Asenjo and Priest
- [Intuitionistic Logic](https://plato.stanford.edu/entries/logic-intuitionistic/) - Stanford Encyclopedia of Philosophy, on Gödel 1932 and the absence of a finite truth-table interpretation
- [Future Contingents](https://plato.stanford.edu/entries/future-contingents/) - Stanford Encyclopedia of Philosophy, on the sea battle and the "future excluded middle"
- [De Interpretatione 9](https://www.st-andrews.ac.uk/~mnat/~ball0888/salamis/interpretatione.html) - Aristotle, Barnes revised Oxford translation

**Peirce**

- [Charles Sanders Peirce](https://plato.stanford.edu/entries/peirce/) - Stanford Encyclopedia of Philosophy, on the categories and the reduction thesis
- [Peirce's Theory of Signs](https://plato.stanford.edu/entries/peirce-semiotics/) - Albert Atkin, on sign, object and interpretant
- [Is Peirce's Reduction Thesis Gerrymandered?](https://arxiv.org/abs/2406.14058) - Sergiy Koshkin, on the primary sources, Burch's 1991 proof and Quine's objection
- [Peirce's Logic](https://iep.utm.edu/peir-log/) - Internet Encyclopedia of Philosophy, on the 1909 "triadic logic" notebook
- [Course in General Linguistics](https://archive.org/details/courseingenerall00saus) - Saussure, for the three notions and the sign as whole

**Hegel**

- [Hegel's Dialectics](https://plato.stanford.edu/entries/hegel-dialectics/) - Stanford Encyclopedia of Philosophy
- [The Hegel Legend of "Thesis-Antithesis-Synthesis"](https://archive.org/download/mueller1958/mueller1958.pdf) - Gustav E. Mueller, *Journal of the History of Ideas* 19:3 (1958), the source study
- [Encyclopaedia Logic §§79 to 82](https://hegel.net/en/enz79-82-froeb.htm) - The three moments in Hegel's own division

**The included middle**

- [Levels of Reality as Source of Indeterminacy](https://ciret-transdisciplinarity.org/bulletin/b15c4.php) - Basarab Nicolescu, CIRET, on Lupasco and the T-state
- [Methodology of Transdisciplinarity](http://www.basarab-nicolescu.ciret-transdisciplinarity.org/Docs_Notice/TJESNo_1_12_2010.pdf) - Nicolescu, *TJES* 1 (2010), the three axioms and the levels geometry

**Machines and systems**

- [The Art of Computer Programming, Vol. 2 §4.1](https://www.informit.com/articles/article.aspx?p=2221791) - Knuth on balanced ternary as "perhaps the prettiest number system of all"
- [Third Base](https://web.williams.edu/Mathematics/sjmiller/public_html/105Sp10/addcomments/Hayes_ThirdBase.htm) - Brian Hayes, *American Scientist* 2001, on why Setun's trits did not pay
- [Ternary Computers at Moscow State University](https://www.computer-museum.ru/english/setun.htm) - The builders' own account
- [Setun](https://en.wikipedia.org/wiki/Setun) and [Balanced Ternary](https://en.wikipedia.org/wiki/Balanced_ternary) - Dates, production figures, base properties
- [Three-Valued Logic in SQL](https://modern-sql.com/concept/three-valued-logic) - Markus Winand, with the ISO/IEC 9075 clause references
- [Subquery Expressions](https://www.postgresql.org/docs/current/functions-subquery.html) - PostgreSQL on NOT IN returning null rather than true
- [Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html) - The Rust book on Option and Hoare's billion-dollar mistake
- [Time, Clocks, and the Ordering of Events](https://lamport.azurewebsites.net/pubs/time-clocks.pdf) - Lamport 1978, partial order and concurrency
- [Conflict-free Replicated Data Types](https://www.lip6.fr/Marc.Shapiro/papers/2011/CRDTs_SSS-2011.pdf) - Shapiro, Preguiça, Baquero and Zawirski, SSS 2011

**Third terms outside logic**

- [Beyond Markets and States](https://www.nobelprize.org/uploads/2018/06/ostrom_lecture.pdf) - Elinor Ostrom's 2009 prize lecture, polycentricity and the eight design principles
- [Trade and Market in the Early Empires](https://archive.org/details/in.gov.ignca.36501) - Polanyi's 1957 forms of integration
- [The Great Transformation](https://archive.org/details/in.ernet.dli.2015.46560) - Polanyi 1944, where the third principle is householding
- [Trinity: History of Trinitarian Doctrines](https://plato.stanford.edu/entries/trinity/trinity-history.html) - Dale Tuggy, on Nicaea, Constantinople and the Cappadocian formula
- [Tria Prima](https://en.wikipedia.org/wiki/Tria_prima) - Paracelsus and the salt, sulphur, mercury scheme
