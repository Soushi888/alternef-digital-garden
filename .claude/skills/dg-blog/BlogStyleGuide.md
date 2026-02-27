# Blog Style Guide

Detailed voice and style guide for Alternef Digital Garden blog posts, derived from existing published posts.

## Voice Principles

### 1. Analytical Honesty
Every claim should be backed by reasoning or evidence. When discussing technology choices, explain *why* — not just *what*.

**Do**: "Svelte compiles components into efficient imperative JavaScript at build time. The framework disappears."
**Don't**: "Svelte is the best framework because it's fast and modern."

### 2. Concrete Before Abstract
Start with a specific, tangible example. Then generalize.

**Do**: "Business logic, data validation, cryptographic operations — write them once in Rust, compile them to wherever they need to run."
**Don't**: "Rust enables cross-platform code reuse through its compilation targets."

### 3. Measured Confidence
Distinguish between certainty and speculation. State timelines and maturity honestly.

**Do**: "The mobile story in Tauri v2 is functional but still maturing; the plugin ecosystem is thinner than React Native's."
**Don't**: "Tauri v2 is production-ready for mobile development."

### 4. Respect for Reader Intelligence
Assume the reader is smart but may not know your specific domain. Define terms on first use, but don't over-explain.

## Structural Patterns

### Post Length
- **Short posts** (1000-2000 words): Single concept exploration
- **Long-form** (3000-6000 words): Multi-concept technical architecture or ecosystem analysis
- **Deep-dive** (6000+ words): Comprehensive research reports (e.g., Holochain ecosystem analysis)

### Section Progression
1. **Hook** (italicized, 1-2 sentences)
2. **Context** (1-3 paragraphs: what problem exists)
3. **Exploration** (main body: 4-6 H2 sections)
4. **Each section**: explanation → benefits → honest tradeoff
5. **Synthesis** (how pieces connect)
6. **Forward look** (what comes next)

### Code Examples
- Use fenced code blocks with language specifier
- Prefer short, focused examples (5-15 lines)
- Add brief commentary before/after explaining what the code demonstrates
- Compare languages when showing patterns across stack (Rust vs TypeScript)

### Visual Elements
- Minimal emoji use in technical posts
- Horizontal rules (`---`) to separate major transitions
- Bold for first use of key technical terms
- Italics for emphasis and philosophical statements

## Formatting Conventions

- Prettier formatting: 100 char width
- No semicolons in code examples (TypeScript/JavaScript)
- Trailing commas in arrays/objects
- 2-space indentation in code blocks
- ISO date format in frontmatter: "YYYY-MM-DD"

## Common Patterns to Avoid

- Hype language ("revolutionary", "game-changing", "disruptive")
- Superlatives without evidence ("fastest", "best", "most secure")
- Hand-waving over limitations ("there are some challenges but...")
- Marketing framing ("unlike other solutions...")
- Sycophantic conclusions ("this amazing technology will transform...")
