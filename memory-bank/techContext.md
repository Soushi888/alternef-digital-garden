# Technical Context

## Technology Stack

### Core Framework
- **Quartz v4**
  - Static site generator
  - Built on Hugo
  - TypeScript-based
  - Plugin architecture

### Languages
- **TypeScript**
  - Frontend components
  - Build configuration
  - Plugin development
- **Markdown**
  - Content authoring
  - YAML frontmatter
- **SCSS**
  - Custom styling
  - Theme configuration

### Runtime Environment
- **Node.js 20+**
  - Development server
  - Build process
- **Bun**
  - Package management
  - Script execution

### Version Control
- **Git**
  - Source control
  - Content versioning
- **GitHub**
  - Repository hosting
  - Automated deployment

### Hosting
- **GitHub Pages**
  - Static site hosting
  - Custom domain support
  - SSL/TLS encryption

## Development Setup

### Required Tools
- Node.js 20+ or newer
- Bun package manager
- Git
- Text editor with markdown support
- Terminal access

### Local Environment
```bash
# Clone repository
git clone https://github.com/Soushi888/alternef-digital-garden.git

# Install dependencies
bun install

# Start development server
bun quartz build --serve

# Preview build
cd public && python3 -m http.server 8080
```

### Directory Structure
```
alternef-digital-garden/
├── content/               # Content files
│   ├── knowledge/        # Knowledge base
│   ├── blog/            # Blog posts
│   └── portfolio/       # Portfolio items
├── src/                 # Custom components
├── quartz/             # Core framework
├── public/             # Build output
├── quartz.config.ts    # Configuration
└── quartz.layout.ts    # Layout settings
```

## Technical Constraints

### Framework Limitations
1. **Static Generation**
   - No server-side processing
   - Build-time content generation
   - Limited dynamic features

2. **Content Structure**
   - Markdown-based content
   - YAML frontmatter requirements
   - File naming conventions

3. **Plugin System**
   - Specific plugin interfaces
   - Transform/Filter/Emit pattern
   - Performance considerations

### Performance Requirements
1. **Build Performance**
   - Efficient content processing
   - Optimized asset handling
   - Fast deployment

2. **Runtime Performance**
   - Quick page loads
   - Responsive design
   - Mobile optimization

### Security Considerations
1. **Content Security**
   - Safe markdown rendering
   - Asset validation
   - Link verification

2. **Deployment Security**
   - Secure GitHub workflow
   - Access control
   - SSL/TLS encryption

## Dependencies

### Core Dependencies
```json
{
  "quartz": "^4.0.0",
  "typescript": "^5.0.0",
  "sass": "^1.0.0"
}
```

### Development Tools
- ESLint
- Prettier
- TypeScript compiler
- SCSS processor

### Build Tools
- Webpack
- PostCSS
- Asset optimization

## Configuration

### Quartz Configuration
```typescript
// quartz.config.ts
{
  configuration: {
    pageTitle: "Alternef Digital Garden",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible"
    },
    baseUrl: "soushi888.github.io/alternef-digital-garden",
    ignorePatterns: ["private", "templates"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono"
      },
      colors: {
        light: {
          // Light theme colors
        },
        dark: {
          // Dark theme colors
        }
      }
    }
  },
  plugins: {
    transformers: [
      "frontmatter",
      "createdModifiedDate",
      "syntaxHighlighting",
      "obsidianFlavoredMarkdown",
      "githubFlavoredMarkdown",
      "tableOfContents",
      "crawlLinks",
      "description",
      "latex"
    ],
    filters: [
      "removeDrafts"
    ],
    emitters: [
      "aliasRedirects",
      "componentResources",
      "contentPage",
      "folderPage",
      "tagPage",
      "contentIndex",
      "assets",
      "static",
      "notFoundPage"
    ]
  }
}
```

## Maintenance Procedures

### Content Updates
1. Create/edit markdown files
2. Validate frontmatter
3. Check links and references
4. Build and preview locally
5. Commit and push changes

### System Updates
1. Update dependencies
2. Test locally
3. Check for breaking changes
4. Update configuration
5. Deploy and verify

### Troubleshooting
1. Check build logs
2. Verify configuration
3. Test locally
4. Check plugin compatibility
5. Review recent changes

## Monitoring

### Build Process
- Build time
- Asset sizes
- Error logs
- Warning messages

### Runtime
- Page load times
- Resource usage
- Error tracking
- User analytics

## Documentation
- Code comments
- README files
- Configuration guide
- Content guidelines
- Deployment instructions