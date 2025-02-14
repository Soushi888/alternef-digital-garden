import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"
import { FullSlug } from "../util/path"
import style from "./styles/customSidebar.scss"

// @ts-ignore
import script from "./scripts/customSidebar.inline"

interface MenuItem {
  title: string
  path: FullSlug
  icon?: string
}

const mainMenu: MenuItem[] = [
  { title: "Home", path: "/" as FullSlug, icon: "🏠" },
  { title: "About Me", path: "/about-me" as FullSlug, icon: "👤" },
  { title: "Blog", path: "/blog" as FullSlug, icon: "✍️" },
  { title: "Portfolio", path: "/portfolio" as FullSlug, icon: "🎨" }
]

const permaculturePetals: MenuItem[] = [
  { title: "Land & Nature Stewardship", path: "/knowledge/land-and-nature-stewardship" as FullSlug, icon: "🌱" },
  { title: "Built Environment", path: "/knowledge/built-environment" as FullSlug, icon: "🏗️" },
  { title: "Tools & Technology", path: "/knowledge/tools-and-technology" as FullSlug, icon: "🛠️" },
  { title: "Culture & Education", path: "/knowledge/culture-and-education" as FullSlug, icon: "📚" },
  { title: "Health & Wellbeing", path: "/knowledge/health-and-wellbeing" as FullSlug, icon: "🌿" },
  { title: "Finance & Economics", path: "/knowledge/finance-and-economics" as FullSlug, icon: "💰" },
  { title: "Governance & Community", path: "/knowledge/governance-and-community" as FullSlug, icon: "🤝" }
]

interface Options {
  // Add any configuration options here if needed
}

const defaultOptions: Options = {
  // Add default values for options
}

export default ((userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts }

  function CustomSidebar({ displayClass, fileData }: QuartzComponentProps) {
    const currentPath = fileData.slug ?? ("/" as FullSlug)

    return (
      <div class={classNames(displayClass, "custom-sidebar-container")}>
        <button id="mobile-sidebar-toggle" aria-label="Open sidebar">
          <div class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <nav class="custom-sidebar">
          <div class="main-menu">
            {mainMenu.map((item) => (
              <a 
                href={resolveRelative(currentPath, item.path)}
                class={currentPath === item.path ? "active" : ""}
              >
                <span class="icon">{item.icon}</span>
                <span class="title">{item.title}</span>
              </a>
            ))}
          </div>
          
          <div class="knowledge-base">
            <h3>🌺 Knowledge Garden</h3>
            <div class="permaculture-petals">
              {permaculturePetals.map((petal) => (
                <a 
                  href={resolveRelative(currentPath, petal.path)}
                  class={currentPath?.startsWith(petal.path.toString()) ? "active" : ""}
                >
                  <span class="icon">{petal.icon}</span>
                  <span class="title">{petal.title}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    )
  }

  CustomSidebar.css = style
  CustomSidebar.afterDOMLoaded = script

  return CustomSidebar
}) satisfies QuartzComponentConstructor
