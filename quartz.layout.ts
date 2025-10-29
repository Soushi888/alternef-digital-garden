import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Backlinks(),
    Component.Graph({
      localGraph: {
        depth: 3, // Increased depth to show more connections
        scale: 1.2, // Slightly larger initial view
        repelForce: 0.8, // Increased repel force for better spacing
        centerForce: 0.4, // Slightly increased center force
        linkDistance: 40, // Increased link distance
        fontSize: 0.8, // Larger font size
        opacityScale: 1.2, // Slightly increased opacity
        enableRadial: true, // Enable radial layout like Obsidian
        nodeColorMap: {
          // Color mapping for different knowledge domains
          "knowledge/land-and-nature-stewardship": "#2ecc71", // Green for nature
          "knowledge/built-environment": "#3498db", // Blue for built environment
          "knowledge/tools-and-technology": "#9b59b6", // Purple for technology
          "knowledge/culture-and-education": "#f39c12", // Orange for culture
          "knowledge/health-and-wellbeing": "#e74c3c", // Red for health
          "knowledge/finance-and-economics": "#1abc9c", // Teal for finance
          "knowledge/governance-and-community": "#34495e", // Dark blue for governance
        },
      },
      globalGraph: {
        scale: 1.1,
        repelForce: 0.8,
        centerForce: 0.4,
        linkDistance: 40,
        fontSize: 0.8,
        opacityScale: 1.2,
        enableRadial: true,
        nodeColorMap: {
          // Same color mapping for global graph
          "knowledge/land-and-nature-stewardship": "#2ecc71",
          "knowledge/built-environment": "#3498db",
          "knowledge/tools-and-technology": "#9b59b6",
          "knowledge/culture-and-education": "#f39c12",
          "knowledge/health-and-wellbeing": "#e74c3c",
          "knowledge/finance-and-economics": "#1abc9c",
          "knowledge/governance-and-community": "#34495e",
        },
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/soushi888",
      X: "https://x.com/soushi888",
      Substack: "https://soushi888.substack.com/",
      Linkedin: "https://linkedin.com/in/sacha-pignot",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.GitHubEditButton(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.SearchAndDarkmode(),
    Component.MainMenu(),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.GitHubEditButton(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.SearchAndDarkmode(),
    Component.MainMenu(),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}

// Homepage layout - special case for showing recent changes
export const customLayouts = {
  // Add RecentChanges to the homepage
  index: {
    beforeBody: [...defaultContentPageLayout.beforeBody],
    left: [...defaultContentPageLayout.left],
    right: [...defaultContentPageLayout.right],
  },
  // Dedicated page for recent changes with more features
  "recent-changes": {
    beforeBody: [...defaultContentPageLayout.beforeBody],
    left: [...defaultContentPageLayout.left],
    right: [...defaultContentPageLayout.right],
  },
}

// Register the afterBody component separately since it's part of SharedLayout, not PageLayout
sharedPageComponents.afterBody.push((props: any) => {
  // Use different configurations based on the current page
  if (props.fileData.slug === "recent-changes") {
    return Component.RecentChanges({
      ...props,
      limit: 20,
      detailed: true,
      showExcerpt: true,
      showTags: true,
    })
  } else if (props.fileData.slug === "index") {
    return Component.RecentChanges({
      ...props,
      limit: 5,
      detailed: false,
      title: "Recent Updates",
      showCreated: true,
      showModified: true,
    })
  }
  return null
})
