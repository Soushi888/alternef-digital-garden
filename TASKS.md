---
description: 
globs: 
alwaysApply: false
---
# Hybrid "Recent Changes" Feature Implementation

This task list tracks the implementation of a "Recent Changes" feature using the core `effect` package for managing effects and data handling.

## Completed Tasks

- [x] Initial task planning and organization

## In Progress Tasks

- [ ] Define `RecentChangesProps` interface in `quartz/components/RecentChanges.tsx`
- [ ] Create the basic functional component structure for `RecentChanges` in `quartz/components/RecentChanges.tsx`
- [ ] Implement data fetching logic using `Effect` from the core `effect` package to retrieve and sort recent changes (e.g., using `Effect.promise`, `Effect.map`, `Array.sort`, `Effect.either` for error handling).
- [ ] Implement component rendering logic to display fetched data (title, date, link).

## Future Tasks

- [ ] Integrate the `RecentChanges` component into the homepage layout (`quartz.layout.ts`) with a condensed view (e.g., limit=5)
- [ ] Create the dedicated page markdown file (`content/recent-changes.md`)
- [ ] Add the `RecentChanges` component to the `content/recent-changes.md` page layout with a detailed view
- [ ] Update sidebar navigation in `quartz.layout.ts` to include a link to `/recent-changes`
- [ ] Implement human-readable date formatting (e.g., "2 days ago") - potentially using `Duration` from `effect`.
- [ ] Add styling for the component in both condensed and detailed views (`quartz/styles/custom.scss`)
- [ ] Implement differentiation between 'new' and 'updated' items visually
- [ ] Implement filtering options on the dedicated page (e.g., by domain, type of change - new/updated)
- [ ] Implement pagination for the list on the dedicated page
- [ ] Implement caching strategy for the fetched data using `Cache` from the core `effect` package.
- [ ] Add visual indicators for very recent changes (e.g., within the last 24 hours) in the sidebar or on the page
- [ ] Ensure proper semantic HTML markup and ARIA attributes for accessibility
- [ ] Test component behavior with various configurations (limit, detailed, showCreated/Updated)
- [ ] Test component with edge cases (no content, large amounts of content, fetching errors handled by `Effect`)
- [ ] Test page responsiveness and cross-browser compatibility
- [ ] Document the `RecentChanges` component's props and usage
- [ ] Add a section about the feature to the project README or documentation

## Implementation Plan

The Recent Changes feature will be implemented as a reusable component leveraging the core `effect` package for robust, declarative, and type-safe handling of asynchronous operations, data transformations, and potential errors.

### Component Design
- Create a configurable component `RecentChanges.tsx` using TypeScript and functional component patterns.
- Define a clear `RecentChangesProps` interface.
- Display recently created and updated notes with metadata (title, date, link).
- Differentiate between new and updated content.

### Data Fetching and Processing
- Utilize Quartz's content index or file system APIs to get file metadata.
- Wrap data retrieval in `Effect` computations (e.g., `Effect.promise` or `Effect.tryPromise`).
- Use `Effect` combinators (`Effect.map`, `Effect.flatMap`, `Effect.zip`, etc.) for data transformation and sorting.
- Employ `Cache` from the `effect` package for efficient data caching.
- Handle potential errors gracefully using `Effect.catchTag`, `Effect.either`, or similar.

### Placement Strategy
1.  **Homepage Integration**: Condensed view (3-5 items, title/date), link to full page.
2.  **Dedicated Page (`/recent-changes`)**: Comprehensive view, detailed info, filtering, pagination.
3.  **Sidebar Navigation**: Link to the dedicated page, possibly with a visual indicator for new changes.

### Technical Implementation

```typescript
// quartz/components/RecentChanges.tsx
import * as Effect from "effect/Effect";
import * as Cache from "effect/Cache";
import * as Data from "effect/Data";
import * as Option from "effect/Option";
import * as Either from "effect/Either";
import * as Schedule from "effect/Schedule";
// ... other necessary imports from 'effect'

interface RecentChangesProps {
  limit?: number;
  showCreated?: boolean;     // Default true
  showUpdated?: boolean;     // Default true
  detailed?: boolean;        // Default false
  filterBy?: string[];       // e.g., ['knowledge/land-stewardship']
}

// Example Data structure for a changed item
interface ChangedItem extends Data.Case {
  readonly title: string;
  readonly link: string;
  readonly date: Date;
  readonly type: 'created' | 'updated';
}
const ChangedItem = Data.case<ChangedItem>();

// ... component logic using Effect computations for data fetching, caching, and rendering ...
```

### Relevant Files

- `quartz/components/RecentChanges.tsx` - ✅ Main component (using core `effect` package)
- `quartz.layout.ts` - ✅ Layout configuration (to be updated for homepage & sidebar)
- `content/recent-changes.md` - ✅ Dedicated page (to be created)
- `quartz/styles/custom.scss` - ✅ Styling updates (to be added)
- `quartz.config.ts` - Potentially needed for accessing file data or configuring caching
