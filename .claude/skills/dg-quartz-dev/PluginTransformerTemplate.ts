import { QuartzTransformerPlugin } from "../types"
import { BuildCtx } from "../../util/ctx"

interface Options {
  // Plugin options
}

const defaultOptions: Options = {
  // Defaults
}

export const PluginName: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "PluginName",
    // Process raw text before parsing
    textTransform(_ctx: BuildCtx, src: string | Buffer) {
      const content = src.toString()
      // Transform content
      return content
    },
    // Add remark plugins for markdown processing
    markdownPlugins(_ctx: BuildCtx) {
      return [
        // [remarkPlugin, options],
      ]
    },
    // Add rehype plugins for HTML processing
    htmlPlugins(_ctx: BuildCtx) {
      return [
        // [rehypePlugin, options],
      ]
    },
  }
}
