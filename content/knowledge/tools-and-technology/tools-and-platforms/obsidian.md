---
title: Obsidian
description: A local-first personal knowledge management tool using plain Markdown files and a powerful plugin ecosystem
aliases:
  - Obsidian PKM
  - Obsidian.md
tags:
  - pkm
  - markdown
  - knowledge-management
  - digital-garden
  - local-first
  - note-taking
date: 2025-01-01
updated: 2026-03-03
---

Obsidian is a personal knowledge management (PKM) tool that stores all notes as plain Markdown files on disk. Unlike web-based alternatives, it runs entirely on your local machine, giving you full ownership of your data and the ability to work without an internet connection.

## Local-First Philosophy

The core design principle of Obsidian is local-first storage. Every note is a plain `.md` file sitting in a folder on your filesystem. There is no proprietary database format, no vendor lock-in, and no dependency on external servers. Your notes are readable by any text editor, version-controllable with Git, and portable across operating systems. This philosophy makes Obsidian a strong choice for long-term knowledge preservation.

## Vault Structure

An Obsidian vault is simply a folder (and its subfolders) on your filesystem. When you open a folder in Obsidian, it becomes a vault: Obsidian indexes all Markdown files within it and builds an internal graph of links between them. Configuration files are stored in a hidden `.obsidian/` subdirectory within the vault, keeping them local to each knowledge base.

## Core Features

- **Bidirectional linking**: Create links between notes using `[[wikilink]]` syntax. Obsidian automatically tracks which notes link to each other.
- **Graph view**: A visual force-directed graph showing all notes and their connections, useful for discovering clusters and isolated notes.
- **Backlinks panel**: Every note displays a sidebar listing all other notes that link to it, making it easy to trace relationships in reverse.
- **Block references**: Link to a specific paragraph or block within a note, not just the note as a whole.
- **Canvas**: A free-form spatial canvas for arranging notes, images, and cards visually (introduced in later versions).

## Plugin Ecosystem

Obsidian ships with a set of core plugins (templates, daily notes, tags, file explorer) and an open community plugin directory containing hundreds of third-party extensions. Popular community plugins include Dataview (SQL-like queries over note metadata), Templater (advanced templating), Calendar (daily notes navigation), and Excalidraw (embedded diagrams). This extensibility allows Obsidian to adapt to many different workflows, from Zettelkasten to GTD to research management.

## Comparison With Other Tools

| Tool | Storage | Offline | Portability |
|------|---------|---------|-------------|
| Obsidian | Local Markdown files | Full | High |
| Notion | Cloud database | Limited | Low (export needed) |
| Roam Research | Cloud database | Limited | Low |
| Logseq | Local or cloud | Full | High |

Unlike Notion or Roam Research, Obsidian does not store your data in a proprietary cloud database. Notes remain on your machine in a format that will be readable decades from now, independent of whether Obsidian as a company continues to exist.

## Use in This Digital Garden

This digital garden is authored entirely inside an Obsidian vault. Notes are written using Obsidian's wikilink syntax (`[[note-name]]`) and organized into knowledge domains. The vault is then compiled into a static website using [[quartz|Quartz]], which resolves wikilinks, builds the graph visualization, and generates HTML output. Obsidian handles the authoring and linking experience; Quartz handles publication.

## Related Topics

- [[digital-garden|Digital Garden]]
- [[markdown|Markdown]]
- [[quartz|Quartz]]
- [[personal-knowledge-management|Personal Knowledge Management]]
