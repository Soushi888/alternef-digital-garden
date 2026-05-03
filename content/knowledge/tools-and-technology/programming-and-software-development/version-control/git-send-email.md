---
title: "Git Send-Email"
description: "Email-driven Git contribution workflow using git format-patch, git send-email, and git am for patch-based code review."
aliases:
  - "Email-Driven Git"
  - "Git Email Workflow"
  - "Patch-Based Contribution"
date: 2026-05-02
tags: ["programming", "version-control", "open-source", "software-development", "collaboration"]
---

[[git|Git]] was designed from the start for email-based contribution. Before GitHub pull requests existed, [[git|Linus Torvalds]] built `git format-patch`, `git send-email`, and `git am` as first-class commands to exchange patches over mailing lists. The pull request is the historical deviation; email is the original workflow. The Linux kernel, Git itself, PostgreSQL, and Debian still use it as their primary contribution method today.

## Core Commands

### `git format-patch`

Converts commits into RFC 2822-compatible `.patch` files that double as standalone emails.

```bash
git format-patch -1 HEAD                     # Last commit as a single patch
git format-patch origin/main..HEAD           # All commits since origin/main
git format-patch --cover-letter -3 -o out/  # 3 patches + cover letter to out/
```

Each `.patch` file is a complete email: `From:`, `Subject:`, commit message as body, diff appended. The `-v2` flag produces `[PATCH v2]` prefix for revised series. The `--cover-letter` flag generates `0000-cover-letter.patch` to introduce a multi-patch series.

### `git send-email`

Reads `.patch` files and delivers them over SMTP as a threaded email series.

```bash
git send-email --to=maintainer@project.org out/*.patch
git send-email --to=list@project.org HEAD~3..HEAD         # Direct from refs
git send-email --in-reply-to=<msg-id> v2-patches/*.patch  # Thread v2 under v1
```

SMTP configuration lives in `~/.gitconfig`:

```ini
[sendemail]
    smtpserver = smtp.fastmail.com
    smtpuser = you@example.org
    smtpencryption = tls
    smtpserverport = 587
```

Each patch is sent as a separate threaded message. The cover letter becomes the thread root; patches reply to it automatically via `In-Reply-To` headers.

### `git am` (apply mailbox)

On the maintainer side: applies an mbox of patches to the local branch, preserving original authorship.

```bash
git am --signoff < series.mbox   # Apply with Signed-off-by trailer added
git am --3way < patch.mbox       # 3-way merge on conflict
```

Unlike merging a pull request, `git am` keeps the original author's name, email, date, and commit message intact. No squash, no attribution loss.

## Workflow

**Contributor:**

1. Work on a feature branch with clean, atomic commits (each becomes a separately reviewable email).
2. `git format-patch --cover-letter -M origin/main` to generate the series.
3. Edit `0000-cover-letter.patch`: replace `*** SUBJECT HERE ***` with a description of the series.
4. `git send-email --to=list@project.org *.patch` to send.
5. Receive inline review replies in the thread. Revise commits, bump to v2: `git format-patch -v2 ... && git send-email --in-reply-to=<v1-cover-id> ...`

**Maintainer:**

1. Read patches in a mail client (mutt, aerc, Thunderbird with plain-text mode).
2. Reply inline with quoted-line comments on specific hunks.
3. Save approved series to an mbox file.
4. `git am --signoff < approved.mbox` to apply with attribution preserved.
5. Push to the canonical repository.

## Why Email-Driven Git?

**Federation over centralization:** No forge account is required to contribute. Any SMTP client plus any Git installation equals full participation. Projects are not locked to a single vendor's continued goodwill or ToS.

**Archive permanence:** Mailing list archives (lore.kernel.org, lists.sr.ht) are plain text, mirrorable, and outlive any individual platform. Deleted GitHub repositories take their PR comments with them; email archives do not disappear.

**Commit hygiene:** Each commit is individually reviewable as its own email. Sloppy "WIP" commits are immediately visible. This produces cleaner history than squash-merge PRs because every commit in the final history was reviewed independently.

**Offline and async:** Maintainers can read and review patches in offline mail clients, then send replies when reconnected. PR review requires a browser and a live connection.

**Composability:** `git am`, `format-patch`, `b4`, `aerc`, and `mutt` are small Unix-philosophy tools that compose. GitHub's API is the only integration point for its PR flow.

## Sourcehut (sr.ht)

[Sourcehut](https://sr.ht/) is a software forge built by Drew DeVault as a deliberate counter-thesis to [[github|GitHub]]: the forge as a thin UX layer over open protocols (Git and SMTP), not a walled garden.

| Service      | Purpose                                           |
| ------------ | ------------------------------------------------- |
| git.sr.ht    | Git (and Mercurial) repository hosting            |
| lists.sr.ht  | Mailing lists with patchset UI and CI integration |
| builds.sr.ht | CI triggered by patch arrival on a mailing list   |
| todo.sr.ht   | Email-driven issue tracking                       |

**Key innovation:** Email replies carrying `X-Sourcehut-Patchset-Update` headers update patchset status: `PROPOSED`, `NEEDS_REVISION`, `SUPERSEDED`, `APPROVED`, `REJECTED`, or `APPLIED`. This delivers PR-style status tracking without a PR object, via plain email.

`builds.sr.ht` integrates with `lists.sr.ht`: when a patch arrives on a configured list, CI runs automatically and posts results back to the thread. This closes the main historical objection to email-based contribution.

The entire stack is open source (AGPL), self-hostable, and requires no JavaScript for core flows.

## Modern Tooling

| Tool                                            | Role                                                                                                                                    |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [git-send-email.io](https://git-send-email.io/) | Interactive tutorial by Drew DeVault; configures SMTP and walks through a first real patch submission                                   |
| [b4](https://b4.docs.kernel.org/)               | Kernel maintainer tool: fetches patch series from lore.kernel.org, applies cleanly, manages `Signed-off-by` and `Reviewed-by` trailers  |
| [aerc](https://aerc-mail.org/)                  | TUI mail client with first-class Git patch support: syntax-highlighted diffs inline, `git am` piping, keyboard-driven patch application |
| [patchwork](https://patchwork.kernel.org/)      | Web frontend for mailing-list patch tracking: shows state (new, accepted, rejected, deferred) without replacing email                   |
| public-inbox / lei                              | Archive infrastructure for mailing lists; archives are cloned over Git and searchable offline                                           |

## Trade-offs

**Advantages:**

- No vendor lock-in; archives survive any forge's death
- Full authorship preservation through `git am`
- Forces reviewable, atomic commits
- Scales for high-volume maintainers (keyboard-driven, offline-capable)
- Plain-text archives are grep-able, LLM-trainable, trivially mirrored

**Disadvantages:**

- SMTP configuration is a real onboarding barrier (Gmail OAuth, app passwords, corporate mail relay quirks)
- Some mail clients mangle patches via quoted-printable encoding or line-wrapping
- CI integration is non-obvious without tooling like builds.sr.ht
- No "Explore" tab; project discoverability depends on knowing the mailing list address
- Patch etiquette (`[PATCH v2 3/5]`, `Signed-off-by`, `--in-reply-to` threading) has a learning curve for GitHub-native contributors

## Related Topics

- [[git|Git]]
- [[github|GitHub]]
- [[knowledge/tools-and-technology/programming-and-software-development/version-control/index|Version Control]]
- [The advantages of an email-driven git workflow (Drew DeVault)](https://drewdevault.com/2018/07/02/Email-driven-git.html)
