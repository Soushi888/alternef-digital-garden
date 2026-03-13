---
title: Changelog
description: A curated, chronologically ordered record of notable changes made in each version of a software project, following the Keep a Changelog convention
aliases:
  - "Keep a Changelog"
  - "CHANGELOG"
tags: ["programming", "devops", "version-control", "software-development"]
date: 2026-03-12
updated: 2026-03-12
---

A **changelog** is a file that contains a curated, chronologically ordered list of notable changes for each version of a project. The [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) convention (v1.1.0) provides a standard format and set of principles that have become the de facto reference for the practice.

## Guiding Principles

The Keep a Changelog 1.1.0 spec rests on seven principles:

1. **Changelogs are for humans, not machines.** The file exists to communicate clearly with users and developers, not to be parsed programmatically.
2. **There should be an entry for every single version.** Every release deserves a documented record.
3. **The same types of changes should be grouped.** Consistency in categorization makes scanning fast.
4. **Versions and sections should be linkable.** Readers navigating a long changelog benefit from anchor links.
5. **The latest version comes first.** Reverse chronological order is the default; the most recent changes are always at the top.
6. **The release date of each version is displayed.** Dates give context for how recently a change landed. ISO 8601 format (`YYYY-MM-DD`) is used to avoid regional ambiguity.
7. **Mention whether you follow [[semantic-versioning|Semantic Versioning]].** This tells readers how to interpret the version numbers.

## Change Types

Each release entry is divided into sections using these standardized labels:

| Type | Purpose |
|------|---------|
| **Added** | New features or capabilities |
| **Changed** | Changes to existing functionality |
| **Deprecated** | Features that will be removed in a future release |
| **Removed** | Features removed in this release |
| **Fixed** | Bug fixes |
| **Security** | Vulnerability patches or security-related improvements |

Not every release will use every type. Only the relevant categories appear in a given version entry.

## The Unreleased Section

The `[Unreleased]` section sits at the top of the changelog above all versioned entries. Its purpose is to collect changes that have been merged but not yet released. This section:

- Acts as a running diff between the last release and the current development state
- Is converted into a numbered version entry at release time
- Prevents work from being forgotten or omitted when cutting a release

## Format

A well-formed `CHANGELOG.md` follows this structure:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New feature under active development

## [1.2.0] - 2025-11-04

### Added
- Support for dark mode in the settings panel

### Fixed
- Crash when opening files with Unicode filenames

## [1.1.0] - 2025-08-15

### Changed
- Improved performance of the search index
- Updated minimum Node.js requirement to 20

### Deprecated
- The `--legacy` flag will be removed in v2.0.0

## [1.0.0] - 2025-03-01

### Added
- Initial stable release

[Unreleased]: https://github.com/example/project/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/example/project/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/example/project/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/example/project/releases/tag/v1.0.0
```

The comparison links at the bottom make each version header a clickable link to the corresponding diff on the hosting platform.

## Bad Practices

### Commit Log Diffs

Dumping raw `git log` output into the changelog conflates implementation noise with user-facing communication. Commit messages like `fix typo`, `wip`, or `refactor auth handler` carry no meaning for a user deciding whether to upgrade. A changelog entry should describe *what changed and why it matters*, not *how the code was modified*.

### Ignoring Deprecations

Omitting deprecation notices forces users to discover removals only when their integrations break. Flagging something as `Deprecated` in advance gives consumers time to migrate before the `Removed` entry appears.

### Confusing Dates

Writing dates as `03/12/26`, `12 March 2026`, or `March 12th` creates ambiguity across locales. ISO 8601 (`2026-03-12`) is unambiguous in any country.

### Inconsistent Changes

Mixing multiple unrelated changes into a single bullet, or scattering changes of the same type across different sections, makes the changelog hard to scan. Each bullet should represent one discrete change, and all changes of the same type should be grouped under the same label.

## Yanked Releases

A yanked release is a version that has been pulled from distribution because it introduced a serious bug or security issue. It is not deleted from the changelog. Instead, it is marked with a `[YANKED]` tag:

```markdown
## [1.3.0] - 2026-01-10 [YANKED]
```

Preserving the entry maintains historical traceability and signals to users still running that version that they should upgrade immediately.

## Related Topics

- [[semantic-versioning|Semantic Versioning]]
- [[git|Git]]
- [[knowledge/tools-and-technology/programming-and-software-development/version-control/index|Version Control]]
