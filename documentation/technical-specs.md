 # Technical Specifications: Alternef Digital Garden

## 1. Core Technologies

-   **Framework**: [Quartz v4](https://quartz.jzhao.xyz/)
    -   *Note: Built on Hugo, but interaction is primarily through the Quartz layer.*
-   **Language**: [TypeScript](https://www.typescriptlang.org/) (for custom components/scripts)
-   **Content Format**: [Markdown](https://www.markdownguide.org/) (including GFM and Obsidian flavors via Quartz plugins)
-   **Styling**: [SCSS](https://sass-lang.com/) (compiled to CSS during build)
-   **Package Management**: [npm](https://www.npmjs.com/) (Node.js v20+) & [Bun](https://bun.sh/) (for running scripts/build)
-   **Version Control**: [Git](https://git-scm.com/)
-   **Hosting**: [GitHub Pages](https://pages.github.com/)

## 2. Development Environment Setup

-   **Required Software**:
    -   Node.js (v20 or later)
    -   Bun (latest version recommended)
    -   Git
-   **Installation**:
    ```bash
    git clone <repository-url>
    cd alternef-digital-garden
    bun install 
    ```
-   **Key Scripts (defined in `package.json`)**:
    -   `dev`: `bun quartz build --serve` (Builds site and starts local dev server with hot-reloading)
    -   `build`: `bun quartz build` (Builds the static site for production)
    -   `preview`: `cd public && bunx http-server -p 8080 -c-1` (Serves the `public` directory locally - useful after `build`)
    -   `fmt`: `bunx prettier --write .` (Formats code using Prettier)

## 3. Project Structure (Key Directories)

-   `content/`: Markdown source files.
-   `src/`: Custom TypeScript (`.ts`, `.tsx`) and SCSS (`.scss`) files.
-   `quartz/`: Core Quartz framework files (generally avoid modifying).
-   `public/`: Generated static site output (ignored by Git unless deploying from this dir).
-   `documentation/`: Project documentation files (this directory).
-   `.github/workflows/`: GitHub Actions CI/CD workflows.
-   `.cursor/`: Cursor-specific configuration and rules.

## 4. Configuration Files

-   `quartz.config.ts`: Main Quartz configuration (site metadata, plugins, theme settings).
-   `quartz.layout.ts`: Defines the layout structure of pages (header, body, footer components).
-   `package.json`: Node.js project manifest, dependencies, scripts.
-   `tsconfig.json`: TypeScript compiler options.
-   `.prettierrc`: Prettier code formatter configuration.
-   `.gitignore`: Specifies intentionally untracked files by Git.

## 5. Quartz Plugins Used

*(Based on the `main` rule)*

-   **Transformers**:
    -   `FrontMatter`: Parses YAML frontmatter.
    -   `CreatedModifiedDate`: Adds created/modified dates to pages.
    -   `SyntaxHighlighting`: Provides code block highlighting.
    -   `ObsidianFlavoredMarkdown`: Supports Obsidian-specific Markdown features (wikilinks, callouts).
    -   `GitHubFlavoredMarkdown`: Supports GFM features (tables, strikethrough).
    -   `TableOfContents`: Generates a ToC.
    -   `CrawlLinks`: Validates internal links and generates graph data.
    -   `Description`: Extracts page descriptions.
    -   `Latex`: Renders LaTeX math expressions.
-   **Filters**:
    -   `RemoveDrafts`: Excludes pages marked as draft from production builds.
-   **Emitters**:
    -   `AliasRedirects`: Creates HTML redirect pages for aliases defined in frontmatter.
    -   `ComponentResources`: Bundles necessary JS/CSS for components.
    -   `ContentPage`: Generates individual HTML pages for Markdown files.
    -   `FolderPage`: Generates index pages for folders.
    -   `TagPage`: Generates index pages for tags.
    -   `ContentIndex`: Creates a JSON index for search functionality.
    -   `Assets`: Copies static assets (images, etc.) to the output directory.
    -   `Static`: Copies other static files.
    -   `NotFoundPage`: Generates a 404 page.

## 6. Styling & Theming

-   **Base Theme**: Built upon Quartz's default theming capabilities.
-   **Customization**: Achieved via SCSS files in `src/styles/` and theme configuration in `quartz.config.ts`.
-   **Fonts**:
    -   Headers: Schibsted Grotesk
    -   Body: Source Sans Pro
    -   Code: IBM Plex Mono
    -   *Implementation*: Loaded via Google Fonts (or locally hosted) and applied in SCSS.
-   **Color Palettes**:
    -   Light Mode: Soft cream/earth tones, sage green accents.
    -   Dark Mode: Deep forest night, moonlit sage accents.
    -   *Implementation*: Defined as SCSS variables and applied using CSS custom properties for easy toggling.

## 7. Dependencies

-   See `package.json` for a full list of npm dependencies.
-   Key dependencies include `@quartz-org/quartz`, `typescript`, `sass`, `preact`.

## 8. Constraints & Limitations

-   Reliance on Quartz v4 feature set and plugin ecosystem.
-   Static site limitations (no server-side dynamic processing post-build).
-   GitHub Pages build environment constraints (if using default GH Actions).sww