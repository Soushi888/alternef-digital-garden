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

### 2. Recent Notes (`RecentNotes.tsx`)

*   **Location:** `quartz/components/RecentNotes.tsx` (built-in Quartz component)
*   **Purpose:** Displays a list of recent notes sorted by date, with optional tag display and "see more" link.
*   **Pattern:** Uses the standard `QuartzComponentConstructor` factory pattern.
*   **Features:**
    *   Lists notes sorted by date (using `byDateAndAlphabetical` from `PageList`).
    *   Displays formatted dates using the `Date` component with locale support.
    *   Tags rendered as clickable links to tag pages.
    *   Uses `resolveRelative()` for proper link resolution.
    *   Full i18n support (title and "see remaining" text).
    *   Custom filter and sort functions via constructor options.
*   **Configuration (Constructor Options):**
    *   `title` (string, default: i18n "Recent Notes"): The heading for the component.
    *   `limit` (number, default: 3): Maximum number of notes to display.
    *   `linkToMore` (SimpleSlug | false, default: false): If set, shows a "See N more" link pointing to the given slug when there are more notes than the limit.
    *   `showTags` (boolean, default: true): Whether to display tags for each note.
    *   `filter` ((f: QuartzPluginData) => boolean, default: () => true): Custom filter function for selecting which files to include.
    *   `sort` ((f1, f2) => number, default: byDateAndAlphabetical): Custom sort function for ordering notes.
*   **Layout Integration:**
    ```typescript
    Component.RecentNotes({ limit: 5, linkToMore: "blog" as SimpleSlug })
    ```
*   **Styling:** Uses `quartz/components/styles/recentNotes.scss`. Minimal styling with classes `.recent-notes`, `.recent-ul`, `.recent-li`, `.section`, `.desc`, `.meta`, `.tags`.

### 3. Recent Changes (`RecentChanges.tsx`)

*   **Location:** `quartz/components/RecentChanges.tsx`
*   **Purpose:** Displays a dynamic list of recently created or updated content.
*   **Pattern:** Uses the standard `QuartzComponentConstructor` factory pattern (same as `RecentNotes`).
*   **Features:**
    *   Classifies notes as **New** or **Updated** using `gitCreated` (first git commit date) vs `modified` (latest git commit date). A note is "Updated" if `modified − gitCreated > 1 hour`, meaning at least two distinct commits touched the file. Files renamed in git history are handled correctly via a rename-aware cache built at build time by the `CreatedModifiedDate` plugin.
    *   Relies on the `CreatedModifiedDate` transformer plugin to populate `file.dates.gitCreated`.
    *   Formats dates relatively (e.g., "2 days ago").
    *   Can optionally display content excerpts and tags.
    *   Uses `resolveRelative()` for proper link resolution.
    *   Supports page-specific rendering via the `pages` option.
    *   The `ChangedItem` type is defined in `quartz/components/utils/recentChanges.ts`.
*   **Configuration (Constructor Options):**
    *   `title` (string, default: "Recent Changes"): The heading for the component.
    *   `limit` (number, default: 10): Maximum number of items to display.
    *   `showCreated` (boolean, default: true): Whether to include newly created items.
    *   `showModified` (boolean, default: true): Whether to include updated items.
    *   `filterBy` (string[], default: []): An array of keywords; only items whose path includes one of these keywords will be shown.
    *   `detailed` (boolean, default: false): If true, enables potentially showing excerpts and tags.
    *   `showExcerpt` (boolean, default: false): If true and `detailed` is true, shows content excerpts.
    *   `showTags` (boolean, default: false): If true and `detailed` is true, shows content tags.
    *   `showFilter` (boolean, default: false): If true, renders All/New/Updated filter buttons and a Load More button. Filter choice persists in `localStorage`. Each filter has its own independent pagination state.
    *   `pageSize` (number, default: 20): Items revealed per Load More click when `showFilter` is true.
    *   `linkToMore` (SimpleSlug | false, default: false): If set and `showFilter` is false, shows a "View all changes" link when items exceed the limit.
    *   `pages` (FullSlug[], default: []): Only render on these pages. Empty array means render on all pages.
*   **Filter and pagination behaviour:** When `showFilter` is true, items beyond `pageSize` start hidden (`rc-hidden-page`). Client-side JS tracks a separate visible count per filter (`all`/`created`/`modified`) so switching filters never resets another filter's pagination progress. Load More is shown only when the active filter has more items to reveal; it is hidden when all items of that type are already visible.
*   **Layout Integration:**
    ```typescript
    // Homepage: compact view with link to full page
    Component.RecentChanges({
      limit: 5,
      title: "Recent Updates",
      linkToMore: "recent-changes" as SimpleSlug,
      pages: ["index" as FullSlug],
    })
    // Dedicated page: detailed view with per-filter Load More
    Component.RecentChanges({
      limit: 100,
      detailed: true,
      showExcerpt: true,
      showTags: true,
      showFilter: true,
      pageSize: 20,
      pages: ["recent-changes" as FullSlug],
    })
    ```
*   **Styling:** Uses `quartz/components/styles/recentChanges.scss`. Badge colors use CSS custom properties (`--rc-created-bg`, `--rc-created-text`, `--rc-modified-bg`, `--rc-modified-text`) for easy theme customization. Includes classes: `.recent-changes`, `.recent-changes-list.detailed`, `.recent-changes-list.condensed`, `.recent-change-item.created`, `.recent-change-item.modified`, `.recent-changes-filter`, `.rc-hidden-filter`, `.rc-hidden-page`, `.recent-changes-load-more`.
