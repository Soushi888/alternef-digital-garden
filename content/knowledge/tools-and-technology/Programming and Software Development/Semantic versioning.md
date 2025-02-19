---
aliases: 
tags:
  - programmation/DevOps
related pages:
  - "[[Changelog]]"
---
Semantic Versioning, often abbreviated as SemVer, is a versioning scheme for software that aims to convey meaning about the underlying changes in a release. It was introduced by Tom Preston-Werner, Chris Wanstrath, and Scott Chacon of GitHub in 2005. Semantic Versioning uses a three-part version number like `MAJOR.MINOR.PATCH`, which is inspired by the versioning system used in Git.

Here's what each part of the version number represents:

1. **MAJOR**: This is incremented when there are incompatible API changes. In other words, if a new version of the software makes some features unavailable or changes how existing features work in a way that breaks compatibility with previous versions, the MAJOR version number should be increased.
2. **MINOR**: This is incremented when functionality is added in a backward-compatible manner. If new features are added without affecting the existing functionality or behavior of the software, then the MINOR version number should be increased.
3. **PATCH**: This is incremented when backwards-compatible bug fixes are made. If only minor bugs are fixed or small improvements are made without adding any new features or changing existing ones, then the PATCH version number should be increased.

Additionally, it's common to append pre-release identifiers after the patch level for releases that are not yet stable or are intended for testing purposes. These identifiers start with a hyphen `-` and can include letters (like `alpha`, `beta`, `rc` for release candidate) or numbers (like `.0.1.dev` for development).

For example, a version number like `2.0.1-alpha.1` indicates that it's the first alpha release of the second major version of the software, following the first minor update from the initial major release.

Semantic Versioning has become widely adopted because it provides a clear and predictable method for managing updates and dependencies in software projects, especially in environments where automated deployment and continuous integration/continuous deployment (CI/CD) processes are used.
