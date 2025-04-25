import { jsx } from "preact/jsx-runtime";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import { QuartzComponentProps } from "./types";
import { GlobalConfiguration } from "../cfg";
import style from "./styles/recentChanges.scss";

// Define the interface for file metadata
interface FileMetadata {
  frontmatter?: {
    title?: string;
    tags?: string[];
    created?: Date;
    modified?: Date;
    [key: string]: any;
  };
  slug: string;
  description?: string;
  content?: string;
}

// Define the core data structure for changed items
export interface ChangedItem {
  readonly title: string;
  readonly link: string;
  readonly date: Date;
  readonly type: "created" | "updated";
  readonly id: string;
  readonly excerpt?: string;
  readonly tags?: string[];
}

// Define the component props interface
export interface RecentChangesProps extends QuartzComponentProps {
  limit?: number;
  showCreated?: boolean;
  showUpdated?: boolean;
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
  file: FileMetadata, 
  dateType: "created" | "modified"
): Option.Option<Date> => {
  return Option.fromNullable(file.frontmatter?.[dateType])
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
const processFileData = (fileData: Record<string, FileMetadata>): ChangedItem[] => {
  const allFiles = Object.values(fileData);
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
        link: file.slug,
        date: createdDate,
        type: "created",
        id: `${file.slug}-created`,
        excerpt: file.description || (file.content ? extractExcerpt(file.content) : undefined),
        tags: file.frontmatter.tags,
      });
    }
    
    // Get modified date (if available and different from created date) and produce "updated" item
    const modifiedDateOption = getFileDate(file, "modified");
    if (Option.isSome(modifiedDateOption)) {
      const modifiedDate = modifiedDateOption.value;
      // Only include modified if it's meaningfully different from created date
      const createdDate = Option.isSome(createdDateOption) ? createdDateOption.value : new Date(0);
      
      // If modified date is at least 1 hour after created date
      if (modifiedDate.getTime() - createdDate.getTime() > 60 * 60 * 1000) {
        items.push({
          title: file.frontmatter.title,
          link: file.slug,
          date: modifiedDate,
          type: "updated",
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
const fetchChangedItems = (fileData: Record<string, FileMetadata>) => {
  return Effect.try({
    try: () => processFileData(fileData),
    catch: (error) => new ContentParseErrorClass(error),
  });
};

// Format a date in a human-readable way (e.g., "2 days ago")
const formatDate = (date: Date): string => {
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
  
  // Filter by type (created/updated)
  if (props.showCreated === false) {
    filtered = filtered.filter(item => item.type !== "created");
  }
  if (props.showUpdated === false) {
    filtered = filtered.filter(item => item.type !== "updated");
  }
  
  // Filter by path/category if filterBy is provided
  if (props.filterBy && props.filterBy.length > 0) {
    filtered = filtered.filter(item => 
      props.filterBy!.some(filter => item.link.includes(filter))
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
    showUpdated = true,
    detailed = false,
    filterBy = [],
    showExcerpt = false,
    showTags = false,
    title = "Recent Changes",
    fileData,
    cfg
  } = props;
  
  // Use demo items while we're building the component
  const demoMode = true; // Set to false when ready to use real data
  
  // For demo purposes, we'll use some placeholder items
  const demoItems: ChangedItem[] = [
    {
      title: "Introduction to Permaculture",
      link: "/knowledge/land-stewardship/permaculture",
      date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      type: "updated",
      id: "1",
      excerpt: "An overview of permaculture principles and practices...",
      tags: ["permaculture", "sustainability"]
    },
    {
      title: "Sustainable Housing",
      link: "/knowledge/built-environment/sustainable-housing",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      type: "created",
      id: "2",
      excerpt: "Exploring eco-friendly housing solutions...",
      tags: ["housing", "green-building"]
    },
    {
      title: "Digital Garden Setup",
      link: "/knowledge/tools-technology/digital-gardens",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      type: "updated",
      id: "3",
      excerpt: "Tools and approaches for creating and maintaining a digital garden...",
      tags: ["tools", "knowledge-management"]
    }
  ];
  
  // In a real implementation, we would use the Effect runtime to execute our program
  // For now, depending on demoMode variable, we'll use either demo items or real data
  const items = demoMode 
    ? demoItems 
    : (() => {
        try {
          // When ready to switch to real data:
          // Uncomment below and use actual file data
          // const result = Effect.runSync(fetchChangedItems(fileData as Record<string, FileMetadata>));
          // return filterItems(result, props);
          return demoItems;
        } catch (error) {
          console.error("Error fetching recent changes:", error);
          return [];
        }
      })();
  
  // Render the component
  return (
    <div className="recent-changes">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p>No recent changes found.</p>
      ) : (
        <ul className={`recent-changes-list ${detailed ? "detailed" : "condensed"}`}>
          {items.map((item) => (
            <li key={item.id} className={`recent-change-item ${item.type}`}>
              <a href={item.link} className="recent-change-link">
                <span className="recent-change-title">{item.title}</span>
              </a>
              <div className="recent-change-meta">
                <span className="recent-change-type">
                  {item.type === "created" ? "New" : "Updated"}
                </span>
                <span className="recent-change-date">{formatDate(item.date)}</span>
              </div>
              
              {detailed && showExcerpt && item.excerpt && (
                <p className="recent-change-excerpt">{item.excerpt}</p>
              )}
              
              {detailed && showTags && item.tags && item.tags.length > 0 && (
                <div className="recent-change-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="recent-change-tag">{tag}</span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      
      {limit < items.length && (
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