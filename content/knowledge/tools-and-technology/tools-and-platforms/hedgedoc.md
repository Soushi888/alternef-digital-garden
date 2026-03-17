---
title: "HedgeDoc"
aliases: ["CodiMD", "HedgeDoc 2"]
description: "An open-source, self-hosted, real-time collaborative markdown editor with presentation mode and diagram support."
tags: ["markdown", "collaboration", "open-source", "self-hosted", "real-time", "knowledge-management"]
date: 2026-03-11
---

HedgeDoc (formerly CodiMD) is an open-source, self-hosted platform for real-time collaborative note-taking in [[markdown|Markdown]]. Operating under the motto "Ideas grow better together," it enables multiple users to edit the same document simultaneously in a browser, without requiring any installation on the client side. Rebranded from CodiMD in 2020, HedgeDoc is released under the AGPLv3 license and maintained by a community of contributors.

## Key Features

- **Web-based**: No desktop client required; access and edit notes entirely in the browser.
- **Self-hosted**: Deploy on your own infrastructure to retain full control over your data and user access.
- **Real-time collaboration**: Multiple authors can edit the same note simultaneously, with changes reflected instantly.
- **Presentation mode**: Built-in support for reveal.js allows notes to double as slide decks without additional tooling.
- **Visual content**: Diagrams and graphs (Mermaid, PlantUML, Graphviz, and others) render inline within notes.
- **Permission management**: Per-note access controls allow owners to set read, write, or guest permissions.
- **Version history**: Notes maintain a revision history so earlier versions can be reviewed or restored.
- **Low resource requirements**: Designed to run on modest hardware, including single-board computers like the Raspberry Pi.

## Technical Foundation

HedgeDoc 1.x is a monolithic TypeScript application backed by a SQL database (PostgreSQL, MySQL, or SQLite). The frontend uses a combination of CodeMirror for editing and Markdown rendering libraries for the preview pane.

HedgeDoc 2 represents a complete architectural rewrite, split into a strict frontend/backend separation with a Turbo monorepo structure. The new backend exposes a documented REST API; the frontend is decoupled and communicates exclusively through it. HedgeDoc 2 is currently in alpha and available for preview at `hedgedoc.dev`.

## HedgeDoc 2

The HedgeDoc 2 rewrite introduces several improvements over 1.x:

- Strict client/server separation with no server-side rendering of user content
- A new real-time engine that scales better across concurrent users
- Improved extension and plugin architecture
- Full API documentation for third-party integrations

HedgeDoc 1.x remains in maintenance mode (security and critical fixes only) while the community focuses development effort on HedgeDoc 2.

## Related Topics

- [[markdown|Markdown]]: The markup language HedgeDoc is built around
- [[obsidian|Obsidian]]: Local-first PKM using the same Markdown format, oriented toward personal use rather than collaboration
- [[knowledge/tools-and-technology/tools-and-platforms/content-management/wiki|Wiki]]: Collaborative web-based systems for organizing content collectively
- [[digital-garden|Digital Garden]]: A related philosophy for networked knowledge publishing

## References

- [HedgeDoc website](https://hedgedoc.org/)
- [GitHub (hedgedoc/hedgedoc)](https://github.com/hedgedoc/hedgedoc)
