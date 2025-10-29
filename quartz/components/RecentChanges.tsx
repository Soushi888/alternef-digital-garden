import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import { QuartzComponentProps } from "./types";
import style from "./styles/recentChanges.scss";
import { ChangedItem} from "./utils/recentChanges";
import { FullSlug } from "../util/path";

// Define the component props interface
export interface RecentChangesProps extends QuartzComponentProps {
  limit?: number;
  showCreated?: boolean;
  showModified?: boolean;
  detailed?: boolean;
  filterBy?: string[];
  showExcerpt?: boolean;
  showTags?: boolean;
  title?: string;
}

// Errors that might occur during data fetching
class ContentFetchErrorClass extends Error {
  constructor(public readonly cause: unknown) {
    super("Failed to fetch content data");
  }
}

class ContentParseErrorClass extends Error {
  constructor(public readonly cause: unknown) {
    super("Failed to parse content data");
  }
}

// Helper to safely get date from file metadata
const getFileDate = (
  file: any,
  dateType: "created" | "modified"
): Option.Option<Date> => {
  return Option.fromNullable(file.dates?.[dateType])
    .pipe(
      Option.filter((date): date is Date => date instanceof Date)
    );
};

// Extract excerpt from content if available
const extractExcerpt = (content: string, maxLength = 150): string => {
  // Remove frontmatter, markdown formatting, etc.
  const cleanContent = content
    .replace(/^---[\s\S]*?---/, "") // Remove frontmatter
    .replace(/[#*`_~]/g, "") // Remove markdown formatting
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Try to cut at a sensible place
  const excerpt = cleanContent.slice(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(" ");
  if (lastSpace > 0) {
    return excerpt.slice(0, lastSpace) + "...";
  }

  return excerpt + "...";
};

// Process file data into ChangedItem[] - separated for testability
const processFileData = (allFiles: any[]): ChangedItem[] => {
  const items: ChangedItem[] = [];

  for (const file of allFiles) {
    // Skip files without titles or proper metadata
    if (!file.frontmatter?.title) continue;

    // Get created date (if available) and produce "new" item
    const createdDateOption = getFileDate(file, "created");
    if (Option.isSome(createdDateOption)) {
      const createdDate = createdDateOption.value;
      items.push({
        title: file.frontmatter.title,
        link: file.slug as FullSlug,
        date: createdDate,
        type: "created",
        id: `${file.slug}-created`,
        excerpt: file.description || (file.content ? extractExcerpt(file.content) : undefined),
        tags: file.frontmatter.tags,
      });
    }

    // Get modified date (if available and different from created date) and produce "modified" item
    const modifiedDateOption = getFileDate(file, "modified");
    if (Option.isSome(modifiedDateOption)) {
      const modifiedDate = modifiedDateOption.value;
      // Only include modified if it's meaningfully different from created date
      const createdDate = Option.isSome(createdDateOption) ? createdDateOption.value : new Date(0);

      // If modified date is at least 1 hour after created date
      if (modifiedDate.getTime() - createdDate.getTime() > 60 * 60 * 1000) {
        items.push({
          title: file.frontmatter.title,
          link: file.slug as FullSlug,
          date: modifiedDate,
          type: "modified",
          id: `${file.slug}-modified`,
          excerpt: file.description || (file.content ? extractExcerpt(file.content) : undefined),
          tags: file.frontmatter.tags,
        });
      }
    }
  }

  // Sort items by date, newest first
  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Fetch data and transform to ChangedItem[] as an Effect
const fetchChangedItems = (allFiles: any[]) => {
  return Effect.try({
    try: () => processFileData(allFiles),
    catch: (error) => new ContentParseErrorClass(error),
  });
};

// Format a date in a human-readable way (e.g., "2 days ago")
const formatRecentDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes <= 1 ? "just now" : `${diffMinutes} minutes ago`;
    }
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  }

  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }

  const months = Math.floor(diffDays / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;

  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
};

// Filter items based on component props
const filterItems = (
  items: ChangedItem[],
  props: RecentChangesProps
): ChangedItem[] => {
  let filtered = [...items];

  // Filter by type (created/modified)
  if (props.showCreated === false) {
    filtered = filtered.filter((item) => item.type !== "created");
  }
  if (props.showModified === false) {
    filtered = filtered.filter((item) => item.type !== "modified");
  }

  // Filter by path/category if filterBy is provided
  if (props.filterBy && props.filterBy.length > 0) {
    filtered = filtered.filter((item) =>
      props.filterBy!.some((filter) => item.link.includes(filter))
    );
  }

  // Apply limit
  const limit = props.limit ?? 10;
  filtered = filtered.slice(0, limit);

  return filtered;
};

// The main RecentChanges component
export function RecentChanges(props: RecentChangesProps) {
  const {
    limit = 10,
    showCreated = true,
    showModified = true,
    detailed = false,
    filterBy = [],
    showExcerpt = false,
    showTags = false,
    title = "Recent Changes",
    allFiles,
    cfg,
  } = props;

  // Use real data - demo mode disabled
  const demoMode = false;

  // Simple processing approach similar to RecentNotes
  const allValidFiles = allFiles?.filter(file => {
    // Include files with valid dates
    return file.dates && (file.dates.created || file.dates.modified);
  }) || [];

  // Sort by most recent date
  const sortedFiles = allValidFiles.sort((a, b) => {
    const dateA = (a.dates.modified || a.dates.created || new Date(0));
    const dateB = (b.dates.modified || b.dates.created || new Date(0));
    return dateB.getTime() - dateA.getTime();
  });

  // Convert to ChangedItems format
  const items = sortedFiles.map(file => {
    const isModified = file.dates.modified &&
      file.dates.created &&
      file.dates.modified.getTime() - file.dates.created.getTime() > 60 * 60 * 1000;

    return {
      title: file.frontmatter?.title || "Untitled",
      link: file.slug,
      date: file.dates.modified || file.dates.created || new Date(),
      type: isModified ? "modified" : "created",
      id: `${file.slug}-${isModified ? "modified" : "created"}`,
      excerpt: file.frontmatter?.description,
      tags: file.frontmatter?.tags,
    } as ChangedItem;
  });

  // Filter items based on component props
  const filteredItems = filterItems(items, props);

  // Render the component
  return (
    <div className="recent-changes">
      <h3>{title}</h3>
      {filteredItems.length === 0 ? (
        <p>No recent changes found.</p>
      ) : (
        <ul className={`recent-changes-list ${detailed ? "detailed" : "condensed"}`}>
          {filteredItems.map((item) => (
            <li key={item.id} className={`recent-change-item ${item.type}`}>
              <a href={item.link} className="recent-change-link">
                <span className="recent-change-title">{item.title}</span>
              </a>
              <div className="recent-change-meta">
                <span className="recent-change-type">
                  {item.type === "created" ? "New" : "Updated"}
                </span>
                <span className="recent-change-date">{formatRecentDate(item.date)}</span>
              </div>

              {detailed && showExcerpt && item.excerpt && (
                <p className="recent-change-excerpt">{item.excerpt}</p>
              )}

              {detailed && showTags && item.tags && item.tags.length > 0 && (
                <div className="recent-change-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="recent-change-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {limit < filteredItems.length && (
        <div className="recent-changes-more">
          <a href="/recent-changes">View all changes →</a>
        </div>
      )}
    </div>
  );
}

export default RecentChanges;

// Register the stylesheet
RecentChanges.css = style;