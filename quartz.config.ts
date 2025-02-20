import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌿 Alternef Digital Garden",
    pageTitleSuffix: "",
    enableSPA: false,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "soushi888.github.io/alternef-digital-garden",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f5", // Softer cream background
          lightgray: "#e5e1d8", // Softer earthy tone
          gray: "#9e988a", // Muted earth
          darkgray: "#445240", // Softer forest shade
          dark: "#2a3527", // Softer deep forest
          secondary: "#637f54", // Muted sage green
          tertiary: "#96693a", // Softer warm brown
          highlight: "rgba(147, 171, 120, 0.15)", // More subtle moss highlight
          textHighlight: "#9ab86655", // More transparent sage highlight
        },
        darkMode: {
          light: "#1a1d19", // Deep forest night
          lightgray: "#2d3729", // Dark forest
          gray: "#8a9683", // Lighter muted forest for better contrast
          darkgray: "#e0e5dc", // Lighter sage for better contrast
          dark: "#f4f6f2", // Brighter forest light for better contrast
          secondary: "#a3c193", // Brighter moonlit sage
          tertiary: "#d4a56b", // Brighter autumn brown
          highlight: "rgba(147, 171, 120, 0.2)", // Slightly stronger moss highlight
          textHighlight: "#9ab86666", // Slightly stronger sage highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        displayMode: "cards",
      }),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
