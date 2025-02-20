import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Search from "./Search"
import Darkmode from "./Darkmode"
import { classNames } from "../util/lang"
// @ts-ignore
import searchScript from "./scripts/search.inline"
// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
import searchStyle from "./styles/search.scss"
import darkmodeStyle from "./styles/darkmode.scss"

const SearchAndDarkmode: QuartzComponent = (props: QuartzComponentProps) => {
  const { displayClass, cfg } = props
  return (
    <div class={classNames(displayClass, "search-and-darkmode")}>
      {Search()(props)}
      {Darkmode()(props)}
    </div>
  )
}

SearchAndDarkmode.css = `
${searchStyle}
${darkmodeStyle}
.search-and-darkmode {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-and-darkmode .search {
  flex: 1;
  min-width: 0;
}

.search-and-darkmode .darkmode {
  flex-shrink: 0;
}
`

SearchAndDarkmode.beforeDOMLoaded = searchScript + "\n" + darkmodeScript

export default (() => SearchAndDarkmode) satisfies QuartzComponentConstructor
