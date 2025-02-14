import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"
import { FullSlug } from "../util/path"
import style from "./styles/mainMenu.scss"

// @ts-ignore
import script from "./scripts/mainMenu.inline"

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

  function MainMenu({ displayClass, fileData }: QuartzComponentProps) {
    // Using non-null assertion like in ExplorerNode
    const currentPath = fileData.slug!

    const renderMenu = (items: MenuItem[]) => (
      <ul>
        {items.map((item) => {
          const resolvedPath = resolveRelative(currentPath, item.path)
          return (
            <li key={item.path}>
              <a
                href={resolvedPath}
                class={currentPath === item.path ? "active" : ""}
              >
                {item.icon && <span class="icon">{item.icon}</span>}
                <span class="title">{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    )

    return (
      <div class={classNames(displayClass, "main-menu-container")}>
        <button id="mobile-menu-toggle" aria-label="Open menu">
          <div class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <nav class="main-menu-nav">
          <div class="main-menu">
            {renderMenu(mainMenu)}
          </div>
          
          <div class="knowledge-base">
            <h3><span class="icon">🌺</span>Knowledge Garden</h3>
            <div class="permaculture-petals">
              {renderMenu(permaculturePetals)}
            </div>
          </div>
        </nav>
      </div>
    )
  }

  MainMenu.css = style
  MainMenu.afterDOMLoaded = script

  return MainMenu
}) satisfies QuartzComponentConstructor
