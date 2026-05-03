---
title: "Git"
description: "Distributed version control system created by Linus Torvalds in 2005 to coordinate Linux kernel development. Every developer holds a full copy of the repository history."
aliases:
  - "Git VCS"
  - "Git version control"
date: 2025-02-15
updated: 2026-05-02
tags: ["programming", "version-control", "software-development", "open-source"]
---

Git is a free and open source distributed version control system designed for speed, correctness, and support for non-linear development. Linus Torvalds created it in 2005 to manage Linux kernel contributions after the team lost access to BitKeeper. The core design decision: every developer holds a full copy of the repository history, not just a working copy checked out from a server.

Internally, Git represents history as a [[Directed Acyclic Graph (DAG)|directed acyclic graph]] of commit objects. Each commit points to its parent(s), a tree object (representing the directory snapshot), and carries author, committer, and message metadata. Branches are lightweight pointers to commits, not copies of files.

## Core Concepts

**Repository**: A directory tracked by Git, containing the full history of all commits, branches, and tags in a hidden `.git/` folder.

**Staging area (index)**: A buffer between the working directory and the next commit. `git add` stages changes selectively, allowing a single commit to be composed from partial file changes.

**Commit**: An immutable snapshot of the entire repository tree at a point in time. Git identifies commits by their SHA-1 (now SHA-256 in newer repos) hash, computed from content, not filenames or timestamps.

**Branch**: A named pointer to a commit. Creating a branch is nearly instant because it only creates a 41-byte file. `HEAD` is a special pointer that tracks which branch you are currently on.

**Remote**: A reference to another copy of the repository (GitHub, a coworker's machine, a bare server). Remotes are just named URLs; `origin` is convention, not magic.

## Essential Commands

```bash
# Start and inspect
git init                      # Initialize a new repo
git clone <url>               # Clone a remote repo locally
git status                    # Show working tree and staging state
git log --oneline --graph     # Visual commit history

# Stage and commit
git add <file>                # Stage a file
git add -p                    # Stage interactively, hunk by hunk
git commit -m "message"       # Commit staged changes
git commit --amend            # Rewrite the last commit (before push only)

# Branch and merge
git branch <name>             # Create a branch
git switch <name>             # Switch to a branch (modern form)
git merge <branch>            # Merge a branch into HEAD
git rebase <branch>           # Replay commits onto a new base

# Collaborate
git fetch                     # Download remote changes without merging
git pull                      # fetch + merge (or fetch + rebase with --rebase)
git push origin <branch>      # Push a branch to the remote
```

## Workflow Patterns

**Feature branch**: Each feature or fix lives on its own branch, merged into `main` via pull request. Keeps `main` stable; standard on GitHub-hosted projects.

**Trunk-based development**: All developers commit directly to `main` (or very short-lived branches). Requires feature flags for incomplete work. Scales well for continuous deployment.

**Gitflow**: Formalizes long-lived `develop` and `release` branches. Suits projects with scheduled releases and multiple active version lines. Adds ceremony that trunk-based avoids.

**Email-driven**: Patches formatted with `git format-patch` and mailed to a list; maintainer applies with `git am`. Used by the Linux kernel and the Git project itself. See [[git-send-email|Git Send-Email]].

## Related Topics

- [[github|GitHub]]: cloud hosting platform built on Git; adds pull requests, Actions, and issue tracking
- [[git-send-email|Git Send-Email]]: the original email-driven patch contribution workflow
- [[changelog|Changelog]]: conventions for documenting what changed across versions
- [[knowledge/tools-and-technology/programming-and-software-development/version-control/index|Version Control]]
