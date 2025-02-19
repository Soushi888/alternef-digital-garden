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
        depth: 2,
      },
      globalGraph: {
        centerForce: 0.3,
        repelForce: 0.5,
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
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.MainMenu(),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.MainMenu(),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}
