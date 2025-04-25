# Architecture: Alternef Digital Garden

## 1. Overview

Alternef Digital Garden utilizes the Quartz v4 framework, a static site generator built on Hugo, enhanced with custom TypeScript components and styling. It follows a content-centric architecture where Markdown files form the core knowledge base.

## 2. System Components

```mermaid
graph TD
    subgraph "User Facing"
        A[Browser] --> B{GitHub Pages}
    end

    subgraph "Build & Deployment"
        C[Local Machine/CI] -- bun quartz build --> D[Static Files (HTML/CSS/JS)]
        D -- Git Push --> E[GitHub Repository]
        E -- GitHub Actions --> B
    end

    subgraph "Source Content & Code"
        F[content/ (*.md)] --> G{Quartz v4 Engine}
        H[src/ (*.ts, *.scss)] --> G
        I[quartz.config.ts] --> G
        J[quartz.layout.ts] --> G
        K[quartz/ (Core Lib)] --> G
        G --> C
    end

    style B fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#ccf,stroke:#333,stroke-width:2px
    style F fill:#cfc,stroke:#333,stroke-width:2px
```

-   **Content (`content/`)**: Markdown files containing the knowledge base, organized by domain.
-   **Custom Code (`src/`)**: TypeScript components and SCSS styles that customize Quartz behavior and appearance.
-   **Configuration (`quartz.config.ts`, `quartz.layout.ts`)**: Files defining Quartz plugins, theme settings, UI layout, and site metadata.
-   **Quartz Engine (`quartz/`, Node Modules)**: The core Quartz v4 framework responsible for parsing Markdown, processing content through plugins, and generating the static site.
-   **Build Environment (Local/CI)**: Executes the `bun quartz build` command to generate the static site.
-   **Static Files (`public/`)**: The output of the build process – HTML, CSS, JavaScript, and assets.
-   **GitHub Repository**: Stores all source code, content, configuration, and generated static files (potentially on a separate branch like `gh-pages` or directly in `public/` on the main branch).
-   **GitHub Actions**: Automation workflow for building and deploying the site to GitHub Pages upon code changes.
-   **GitHub Pages**: Hosts the generated static files, making the digital garden accessible via the web.

## 3. Key Design Decisions

-   **Static Site Generation**: Chosen for performance, security, simplicity, and ease of hosting (via GitHub Pages).
-   **Markdown as Source**: Enables easy content creation and version control using standard text formats.
-   **Wikilinks & Backlinks**: Core features of Quartz, fostering interconnectedness, crucial for a digital garden.
-   **Component-Based Customization**: Leveraging Quartz's component system (TypeScript/Preact) for extending UI and features beyond standard themes.
-   **Directory-Based Organization**: Content structured semantically within the `content/` directory based on knowledge domains.

## 4. Data Flow (Content -> Site)

1.  **Content Creation**: User creates/edits Markdown files in `content/`.
2.  **Build Trigger**: User runs `bun quartz build` locally or pushes changes to GitHub, triggering CI.
3.  **Quartz Processing**:
    -   Quartz reads configuration (`quartz.config.ts`, `quartz.layout.ts`).
    -   It discovers and parses Markdown files in `content/`.
    -   Content flows through configured transformers (Frontmatter, Markdown rendering, Syntax Highlighting, Link Crawling, etc.).
    -   Content is filtered (e.g., removing drafts).
    -   Emitters generate corresponding HTML pages, index files (tags, folders), assets, and redirects based on the processed content and layout configuration.
    -   Custom TypeScript components (`src/`) are bundled.
    -   SCSS files (`src/`) are compiled into CSS.
4.  **Output**: Static files (HTML, CSS, JS, assets) are written to the `public/` directory.
5.  **Deployment**: Static files are pushed to the GitHub repository (e.g., `gh-pages` branch or `main` branch if configured) and served by GitHub Pages.

## 5. Future Considerations

-   Integration of more complex interactive components (e.g., dynamic visualizations).
-   Advanced search capabilities (e.g., Algolia integration).
-   Collaboration features (if the garden evolves beyond personal use). 