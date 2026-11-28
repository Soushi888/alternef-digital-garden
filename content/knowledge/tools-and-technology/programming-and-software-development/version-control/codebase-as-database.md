---
title: "The Codebase as a Database"
date: 2026-11-10
description: "How branching, merging, refactoring and dependency upgrades change shape once code definitions live by hash in a database instead of in text files."
aliases:
  - "Codebase as Database"
  - "Semantic Merge"
tags: ["programming", "version-control", "content-addressing", "databases"]
draft: false
---

Once definitions are stored by hash in a database ([[content-addressed-code|content-addressed code]]), the familiar operations of version control change shape: branching, merging, refactoring, upgrading a dependency.
This note separates what [[unison|Unison]] documents from what can only be reasoned about from its data model.

## Documented in Unison

**Branches and merges.** Unison projects have branches, created as children of the current branch.
The `merge` command combines branches or namespaces, and `merge.preview` lists the terms a merge would change before it happens.
On Unison Share, reviewing a contribution shows the impacted code across the two branches rather than a textual diff.

**Structured refactoring.** A Unison codebase is never in a broken state, even halfway through a refactoring.
The documentation's image: instead of pulling out a load-bearing column and rebuilding from the rubble (a long list of misleading compile errors), you keep the old building standing and copy pieces into a new one, with a todo list of names still to move over.

**Dependency upgrades.** The new version of a library is installed next to the old one.
The `upgrade` command does its work on a temporary branch and opens any conflicting terms in the editor.
`upgrade.commit` merges the result back and deletes the branch, and backing out means switching back to the previous branch.

## Reasoned, Not Documented

What follows is inference from the data model, not a description of any shipped system.

**Semantic merge.** If a branch is a mapping from names to hashes, two people editing different definitions cannot collide: they produce different hashes under different names.
A genuine conflict reduces to one name being pointed at two different hashes.
That is a much smaller and more meaningful conflict surface than overlapping lines of text, and the comparison can run on syntax trees rather than characters.

**Worktrees at almost no cost.** If definitions live once in a shared store, a new worktree is only a new name-to-hash table.
Dozens can exist at once, for parallel experiments or parallel agents, without copying files.
This is presumably what [[blood|Blood]] means by "zero-cost worktrees", but Blood has published nothing that confirms the mechanism.

## Open Questions

- What does code review look like when the unit of change is a set of repointed names rather than a diff? Unison Share gives one answer; it is not the only possible one.
- How do these ideas survive contact with ordinary [[git|Git]] hosting, CI and code search, which all assume files?

## Related Topics

- [[content-addressed-code|Content-Addressed Code]]
- [[git|Git]]: the file-based model this one departs from
- [[unison|Unison]]
- [[blood|Blood]]
- [[knowledge/tools-and-technology/programming-and-software-development/version-control/index|Version Control]]

## References

- [Unison: The big idea](https://www.unison-lang.org/docs/the-big-idea/)
- [Unison: Project workflows](https://www.unison-lang.org/docs/tooling/project-workflows/)
