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
    enableSPA: true,
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
          light: "#fcfbf8",           // Soft cream background
          lightgray: "#e8e4d7",       // Light earthy tone
          gray: "#a69f8d",            // Muted earth
          darkgray: "#4a5d46",        // Forest shade
          dark: "#2d3a29",            // Deep forest
          secondary: "#6b8f5e",       // Sage green
          tertiary: "#a4733d",        // Warm brown
          highlight: "rgba(147, 171, 120, 0.2)",  // Soft moss highlight
          textHighlight: "#9ab86688",  // Light sage highlight
        },
        darkMode: {
          light: "#1a1d19",           // Deep forest night
          lightgray: "#2d3729",       // Dark forest
          gray: "#5c6855",            // Muted forest
          darkgray: "#c9d1c3",        // Light sage
          dark: "#e8eae5",            // Pale forest light
          secondary: "#8fb080",       // Moonlit sage
          tertiary: "#c49455",        // Autumn brown
          highlight: "rgba(147, 171, 120, 0.15)",  // Soft moss highlight
          textHighlight: "#9ab86655",  // Light sage highlight
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
      Plugin.CrawlLinks({ markdownLinkResolution: "absolute" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
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
