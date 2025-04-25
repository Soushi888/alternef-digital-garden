# Requirements: Alternef Digital Garden

## 1. Core Purpose

-   **Problem:** Scattered notes, difficulty connecting ideas, desire to share knowledge effectively.
-   **Solution:** An interconnected digital garden built with Quartz v4 for personal knowledge management and public sharing.

## 2. User Experience Goals

-   **Easy Navigation:** Users should be able to easily browse and discover content through links, tags, search, and graph view.
-   **Readability:** Content should be well-formatted, visually appealing (light/dark modes), and easy to read across devices.
-   **Interconnectivity:** The relationships between notes should be clear and easily traversable.
-   **Maintainability:** The system should be easy to update, manage, and extend by the owner.

## 3. Functional Requirements

### 3.1 Content Management

-   **Markdown Support:** Render Markdown files with standard features (headers, lists, links, code blocks) and Obsidian/GitHub Flavored Markdown extensions (callouts, wikilinks).
-   **Frontmatter:** Support required (`title`, `description`) and optional (`subtitle`, `aliases`, `tags`, `related pages`) YAML frontmatter.
-   **Linking:** Support `[[wikilinks]]` for internal linking. Automatically generate backlinks.
-   **Tagging:** Allow content tagging with a flat, kebab-case system. Generate tag index pages.
-   **Content Types:** Support different content types (Notes, Indexes, Blog Posts, Portfolio Items) organized in the specified directory structure.

### 3.2 Navigation & Discovery

-   **Search:** Provide full-text search capabilities across all content.
-   **Graph View:** Visualize the network of interconnected notes.
-   **Table of Contents:** Automatically generate ToC for pages with multiple sections.
-   **Folder Pages:** Generate index pages for folders.
-   **Tag Pages:** Generate pages listing content associated with specific tags.
-   **Recent Changes:** Display recently updated pages (optional, via plugin if available).

### 3.3 Technical Requirements

-   **Static Site Generation:** Generate a static HTML site using Quartz v4.
-   **Theming:** Implement a custom theme with light and dark modes, specific fonts (Schibsted Grotesk, Source Sans Pro, IBM Plex Mono), and color palettes.
-   **Build Process:** Use `bun quartz build` for building the site.
-   **Hosting:** Deploy the static site to GitHub Pages at `soushi888.github.io/alternef-digital-garden`.
-   **Version Control:** Use Git for version control, hosted on GitHub.

## 4. Non-Functional Requirements

-   **Performance:** Fast page load times for the static site.
-   **Scalability:** The system should handle a growing number of notes without significant performance degradation.
-   **Maintainability:** Code (TypeScript components) and configuration should be well-organized and documented. Content structure should be easy to manage.
-   **Accessibility:** Adhere to basic web accessibility standards.

## 5. Success Criteria

-   The digital garden is successfully deployed and accessible via GitHub Pages.
-   Content is well-organized according to the defined structure and domains.
-   Navigation features (links, tags, search, graph) work correctly.
-   The custom theme is applied consistently.
-   The owner can easily add, update, and link content. 