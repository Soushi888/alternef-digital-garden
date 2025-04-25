# Custom Components

This documentation outlines the custom Quartz components created to enhance the functionality and user experience of the digital garden.

## Available Components

### 1. MainMenu (`MainMenu.tsx`)

*   **Location:** `quartz/components/MainMenu.tsx`
*   **Purpose:** Provides the primary site navigation.
*   **Features:**
    *   Displays main navigation links (Home, About Me, Blog, Portfolio).
    *   Includes a dedicated "Knowledge Garden" section with links based on Permaculture Petals (e.g., Land Stewardship, Built Environment).
    *   Highlights the currently active page.
    *   Includes a responsive design with a hamburger menu toggle for mobile devices.
    *   Uses associated styles (`mainMenu.scss`) and inline script (`mainMenu.inline.ts`).

### 2. Recent Changes (`RecentChanges.tsx`)

*   **Location:** `quartz/components/RecentChanges.tsx`
*   **Purpose:** Displays a dynamic list of recently created or updated content.
*   **Features:**
    *   Identifies new content based on the `created` date in frontmatter.
    *   Identifies updated content based on the `modified` date in frontmatter (only if significantly different from `created`).
    *   Formats dates relatively (e.g., "2 days ago").
    *   Can optionally display content excerpts and tags.
    *   Provides a link to the respective content page.
    *   Includes basic performance logging for data processing.
    *   The core logic for filtering, sorting, and preparing the list items has been extracted into `quartz/components/utils/recentChanges.ts` for better organization and potential testability. The component now imports and uses `processRecentChanges` from this utility file.
*   **Configuration (Props):**
    *   `title` (string, default: "Recent Changes"): The heading for the component.
    *   `limit` (number, default: 10): Maximum number of items to display.
    *   `showCreated` (boolean, default: true): Whether to include newly created items.
    *   `showUpdated` (boolean, default: true): Whether to include updated items.
    *   `filterBy` (string[], default: []): An array of keywords; only items whose path includes one of these keywords will be shown.
    *   `detailed` (boolean, default: false): If true, enables potentially showing excerpts and tags.
    *   `showExcerpt` (boolean, default: false): If true and `detailed` is true, shows content excerpts.
    *   `showTags` (boolean, default: false): If true and `detailed` is true, shows content tags.
    *   `detailedView` (boolean): Use a more detailed list layout including excerpts and tags (default: true).
*   **Styling:** Uses `quartz/components/styles/recentChanges.scss`. Includes classes like `.recent-changes`, `.detailed-list`, `.simple-list`, `.recent-change-item`, etc.
