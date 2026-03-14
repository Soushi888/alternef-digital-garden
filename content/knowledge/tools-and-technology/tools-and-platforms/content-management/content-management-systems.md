---
title: Content Management Systems
date: 2026-03-03
description: Platforms for creating, managing, and publishing digital content without requiring deep technical expertise
aliases:
  - CMS
tags: ["web-dev", "tools"]

---

A Content Management System (CMS) allows users to create, manage, and publish digital content through a graphical interface rather than editing code or raw files directly. This abstraction makes content publishing accessible to non-technical editors while providing developers the flexibility to customize behavior and presentation.

## Core Architectures

### Traditional (Monolithic) CMS

In a monolithic CMS, the content editing backend and the frontend rendering layer are tightly coupled within a single application. The CMS handles both storing content and delivering the final HTML to visitors.

Examples: WordPress, Drupal, Joomla.

This architecture is straightforward to set up and well-supported, but it can limit performance and frontend flexibility since the presentation layer is constrained by the CMS's templating system.

### Headless CMS

A headless CMS exposes content exclusively through an API (typically REST or GraphQL). There is no built-in frontend; developers choose any technology stack for the presentation layer and fetch content at build time or runtime.

Examples: Strapi, Directus, Contentful, Sanity.

This approach is popular with [[static-site-generators|Static Site Generators]] and JavaScript frameworks where the frontend team wants full control over rendering.

### Decoupled CMS

A decoupled CMS is similar to headless but may include an optional preview frontend provided by the CMS itself. This gives editors a live preview environment without tying the production frontend to the CMS's rendering engine.

## CMS vs. Static Sites

| Situation | Preferred Approach |
|---|---|
| Frequently updated content with non-technical editors | CMS (traditional or headless) |
| Performance-critical, rarely changing content | Static site generator |
| Large editorial team needing workflows and roles | CMS with role management |
| Developer-owned content with version control | Markdown files in a repository |

A [[digital-garden|Digital Garden]] or personal knowledge base often fits the static site model well, since content authors are typically also developers and benefit from plain-text files tracked in version control.

## Notable Platforms

**WordPress**: The most widely deployed CMS on the web. Large plugin ecosystem, extensive community, and mature hosting options. Can also operate in headless mode via its REST API.

**Ghost**: Focused on professional publishing. Clean editor experience, built-in membership and newsletter features, and a modern Node.js architecture.

**Strapi**: Open-source headless CMS with a customizable admin panel. Supports both REST and GraphQL. Self-hostable with good developer ergonomics.

**Directus**: Database-first headless CMS that wraps any existing SQL database and exposes it through an API. Useful when your data model already exists.

## Related Topics

- [[wiki|Wiki]]
- [[digital-garden|Digital Garden]]
