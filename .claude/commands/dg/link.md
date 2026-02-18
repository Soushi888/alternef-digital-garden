---
allowed-tools: [Read, Write, Edit, MultiEdit, Glob, Grep, Bash, TodoWrite, mcp__pieces-os__ask_pieces_ltm, mcp__pieces-os__create_pieces_memory, mcp__playwright__init-browser, mcp__playwright__get-screenshot, mcp__playwright__get-context, mcp__playwright__execute-code]
description: "Manage bi-directional links and knowledge graph connections in digital garden content"
---

# /dg:link - Bi-directional Link Management

## Complementary Skills
Load this skill for linking rules and cross-domain mappings:
- **dg-notes** — Wikilink conventions, absolute path rules for index files, cross-domain tag index

## Purpose
Create, manage, and optimize bi-directional links between digital garden content to build a rich knowledge graph with meaningful connections.

## Usage
```
/dg:link [operation] [source] [target] [--type connection-type] [--reciprocal] [--strength weight]
```

## Arguments
- `operation` - Link operation: `create`, `remove`, `analyze`, `suggest`, `validate`, `map`
- `source` - Source content file or topic
- `target` - Target content file or topic (for create/remove operations)
- `--type` - Connection type: `related`, `prerequisite`, `builds-on`, `contrasts`, `example`, `reference`
- `--reciprocal` - Create bidirectional links (default: true)
- `--strength` - Link strength: `weak`, `medium`, `strong` (affects graph visualization)
- `--section` - Link to specific section within target

## Execution
1. **Context Gathering**: Query Pieces MCP for existing link patterns and content relationships
2. **Content Analysis**: Analyze source and target content for natural connection points
3. **Link Type Classification**: Determine optimal connection type based on content relationship
4. **Link Creation**: Create appropriate Quartz-compatible links with proper formatting
5. **Reciprocal Linking**: Add backlinks to target content where appropriate
6. **Graph Integration**: Update knowledge graph connections and weights
7. **Context Enhancement**: Add contextual information around new links
8. **Playwright Testing**: Validate links function correctly in browser environment
9. **Link Accessibility**: Test link navigation and ensure proper rendering
10. **Validation**: Verify all created links resolve correctly
11. **Memory Creation**: Document successful linking patterns for improved suggestions

## Built-in Link Knowledge

### Alternef Digital Garden Link Patterns (STRICT)
```markdown
# MANDATORY PATTERNS - Follow these exactly!

# Basic wikilinks - Use EXACT CASE matching the filename
[[bitcoin]]                             # Links to bitcoin.md, displays using title from frontmatter
[[lightning-network]]                   # Links to lightning-network.md, displays using title from frontmatter

# Clean display using pipe syntax with aliases - RECOMMENDED APPROACH
[[bitcoin|Bitcoin]] [[lightning-network|Lightning Network]]  # Clean display names
[[bitcoin|Bitcoin's]] decentralized nature                   # Natural sentence flow
The [[lightning-network|Lightning Network]] enables fast payments

# Use pipe syntax for natural reading:
[[bitcoin|Bitcoin]] → Displays as "Bitcoin" but links to bitcoin.md
[[lightning-network|LN]] → Displays as "LN" but links to lightning-network.md

# NO relative paths! Use direct names for regular notes:
[[cell|Cell]]                            # Direct filename reference
[[web3|Web3]]                            # Direct filename reference

# Index files REQUIRE absolute paths from content root:
[[knowledge/section/index|Section Overview]]  # ABSOLUTE path required for index files
[[knowledge/projects/category/index|Category Index]]  # ABSOLUTE path required for index files

# Frontmatter aliases support the pipe syntax:
---
title: Lightning Network
aliases: [LN, Lightning, Layer 2]
---

# CRITICAL RULES FOR REORGANIZED CONTENT:
# - When content moves, update ALL references to point to new location
# - Regular notes: use DIRECT FILENAMES only (no paths)
# - INDEX FILES REQUIRE ABSOLUTE PATHS from content root (e.g. [[knowledge/section/index]])
# - Verify target files exist at the exact filename specified
# - Test links after any reorganization

# BEST PRACTICES:
# - Use exact case matching filenames (case-sensitive in Quartz)
# - Use pipe syntax for clean display: [[filename|Display Name]]
# - Define aliases in frontmatter for multiple display options
# - Regular notes: direct filename only [[note-name|Display]]
# - ALWAYS use absolute paths for index files: [[knowledge/path/to/index]]
# - Verify all target files exist before creating links
# - Use natural display text that flows with your writing

# Section linking (when needed)
[[Bitcoin#History]]                     # Link to specific section
[[#Core Features]]                      # Link within same file

# External links (standard Markdown)  
[Blockstream](https://blockstream.com) # External resources
```

### File Naming to Link Mapping  
```
File: bitcoin.md          → Link: [[bitcoin]]
File: lightning-network.md → Link: [[lightning-network]]  
File: liquid.md           → Link: [[liquid]]
```

### Frontmatter Integration
```yaml
---
title: Lightning Network    # This determines the display text
aliases: [LN]              # Available for [[Lightning Network|LN]]
---
```

### Link Types and Patterns

#### Related Concepts
```markdown
## Related Topics
- [[concept-a]] - Similar ideas or complementary information
- [[concept-b]] - Parallel developments or applications
- [[concept-c]] - Alternative approaches or perspectives
```

#### Prerequisites and Dependencies
```markdown
## Prerequisites
Before exploring this topic, consider:
- [[fundamental-concept]] - Essential background knowledge
- [[basic-skill]] - Required skills or understanding

## Builds Upon
This concept extends:
- [[previous-topic]] - Foundation concepts
- [[related-framework]] - Underlying framework
```

#### Examples and Applications
```markdown
## Examples
- [[case-study-1]] - Real-world implementation
- [[project-example]] - Practical application
- [[success-story]] - Successful outcome

## Applications
See this concept applied in:
- [[domain-application]] - Domain-specific use
- [[tool-implementation]] - Technical implementation
```

#### Contrasts and Comparisons
```markdown
## Contrasts
Compare with alternative approaches:
- [[alternative-method]] - Different methodology
- [[competing-theory]] - Contrasting perspective
- [[traditional-approach]] - Established practice vs innovation

## Trade-offs
- [[benefit-analysis]] - Advantages and disadvantages
- [[context-dependency]] - When to use each approach
```

### Link Suggestion Algorithm

#### Content Similarity Analysis
1. **Tag Overlap**: Content with shared tags
2. **Semantic Similarity**: Related concepts and terminology
3. **Structural Patterns**: Similar content organization
4. **Cross-Domain Connections**: Interdisciplinary links

#### Connection Strength Scoring
```
Strong (0.8-1.0): Direct dependencies, prerequisites, core concepts
Medium (0.5-0.7): Related topics, examples, applications  
Weak (0.1-0.4): Tangential connections, references, inspiration
```

#### Domain-Specific Link Patterns
```
land-and-nature ↔ built-environment: Sustainable architecture, green infrastructure
tools-and-technology ↔ governance: Digital democracy, civic tech
health-and-wellbeing ↔ culture-education: Holistic learning, community wellness
finance-economics ↔ land-nature: Regenerative economics, natural capital
```

### Backlink Management

#### Automatic Backlink Generation
```markdown
<!-- Added to target file when creating forward link -->
## Backlinks
This topic is referenced by:
- [[source-file]] - Context of the reference
- [[another-source]] - How this topic is used
```

#### Contextual Backlinks
```markdown
## Referenced In
- [[source-file#section-name]] - "Brief quote or context where this is mentioned"
- [[project-file]] - Used as example of this concept
- [[comparison-file]] - Contrasted with alternative approaches
```

### Knowledge Graph Optimization

#### Link Quality Metrics
- **Relevance**: How closely related are the connected concepts
- **Utility**: How helpful is this connection for readers
- **Context**: How well-explained is the connection
- **Reciprocity**: Are backlinks appropriately placed

#### Graph Structure Patterns
- **Hub Content**: Highly connected foundational concepts
- **Bridge Content**: Links between disparate domains
- **Leaf Content**: Specialized topics with fewer connections
- **Cluster Content**: Tightly connected topic groups

### Link Maintenance Operations

#### Link Health Check
```bash
# Validate all internal links
check: [[broken-link]] → Report: Link target not found
check: [[moved-content]] → Suggest: Update to new location
check: [[outdated-reference]] → Recommend: Review relevance
```

#### Link Pruning
- Remove low-value connections
- Consolidate duplicate links
- Update outdated references
- Improve link context

#### Link Enhancement
- Add missing reciprocal links
- Improve link descriptions
- Create section-specific links
- Add contextual quotes

## Link Creation Workflows

### Manual Link Creation
1. Identify natural connection points in content
2. Choose appropriate link type and format
3. Add contextual information around link
4. Create reciprocal link in target content
5. Update knowledge graph metadata

### Automated Link Suggestions
1. Scan content for potential connections
2. Score suggestions by relevance and utility
3. Present ranked list of link opportunities
4. Allow selective implementation
5. Learn from user choices

### Batch Link Operations
1. Process multiple files simultaneously
2. Apply consistent linking patterns
3. Update all affected content
4. Verify link integrity
5. Generate linking report

### Playwright Link Testing

#### Comprehensive Link Validation
```javascript
// Test all link types and patterns with Playwright
async function validateLinks(page, sourceFile, targetFile) {
  // 1. Basic Link Functionality Test
  await page.goto(`http://localhost:8080/${sourceFile}`);
  
  const linkExists = await page.$(`a[href*="${targetFile}"]`) !== null;
  if (!linkExists) {
    return { error: 'Link not found in rendered page' };
  }
  
  // 2. Link Navigation Test
  await page.click(`a[href*="${targetFile}"]`);
  await page.waitForLoadState('networkidle');
  
  const currentUrl = page.url();
  const targetReached = currentUrl.includes(targetFile) && !currentUrl.includes('404');
  
  // 3. Backlink Validation
  const backlinks = await page.$$eval(
    'a[href*="' + sourceFile + '"]',
    links => links.map(link => ({
      href: link.href,
      text: link.textContent,
      title: link.title
    }))
  );
  
  return {
    linkExists: linkExists,
    targetReached: targetReached,
    backlinksFound: backlinks.length,
    backlinks: backlinks,
    currentUrl: currentUrl
  };
}
```

#### Index Link Pattern Testing
```javascript
// Specifically test index file link patterns
async function validateIndexLinks(page) {
  await page.goto('http://localhost:8080');
  
  // Find all index links on the site
  const indexLinks = await page.$$eval(
    'a[href*="/index"]',
    links => links.map(link => ({
      href: link.href,
      text: link.textContent,
      isAbsolute: link.href.includes('/knowledge/'),
      isRelative: link.href.includes('../'),
      raw: link.outerHTML
    }))
  );
  
  // Test each index link
  const testResults = [];
  for (const link of indexLinks) {
    try {
      await page.goto(link.href);
      await page.waitForLoadState('networkidle');
      
      const status = page.url().includes('404') ? 'broken' : 'working';
      const pageTitle = await page.title();
      
      testResults.push({
        ...link,
        status: status,
        pageTitle: pageTitle,
        error: null
      });
    } catch (error) {
      testResults.push({
        ...link,
        status: 'error',
        error: error.message
      });
    }
  }
  
  // Validate patterns
  const relativeIndexLinks = testResults.filter(link => link.isRelative);
  const brokenIndexLinks = testResults.filter(link => link.status !== 'working');
  
  return {
    totalIndexLinks: testResults.length,
    workingIndexLinks: testResults.filter(link => link.status === 'working').length,
    brokenIndexLinks: brokenIndexLinks.length,
    relativePathErrors: relativeIndexLinks.length,
    relativePathLinks: relativeIndexLinks,
    brokenLinks: brokenIndexLinks,
    allResults: testResults
  };
}
```

#### Bidirectional Link Testing
```javascript
// Test bidirectional link integrity
async function validateBidirectionalLinks(page, sourceFile, targetFile) {
  // 1. Forward link test
  await page.goto(`http://localhost:8080/${sourceFile}`);
  const forwardLink = await page.$(`a[href*="${targetFile}"]`);
  
  if (forwardLink) {
    await forwardLink.click();
    await page.waitForLoadState('networkidle');
    var forwardWorking = !page.url().includes('404');
  }
  
  // 2. Backward link test
  await page.goto(`http://localhost:8080/${targetFile}`);
  const backwardLink = await page.$(`a[href*="${sourceFile}"]`);
  
  if (backwardLink) {
    await backwardLink.click();
    await page.waitForLoadState('networkidle');
    var backwardWorking = !page.url().includes('404');
  }
  
  // 3. Context analysis
  await page.goto(`http://localhost:8080/${sourceFile}`);
  const linkContext = await page.evaluate((target) => {
    const link = document.querySelector(`a[href*="${target}"]`);
    if (!link) return null;
    
    // Get surrounding text for context
    const parent = link.parentElement;
    const textBefore = link.previousSibling?.textContent?.slice(-50) || '';
    const textAfter = link.nextSibling?.textContent?.slice(0, 50) || '';
    
    return {
      context: textBefore + '[LINK]' + textAfter,
      section: parent.closest('h1, h2, h3, h4, h5, h6')?.textContent || 'Unknown section',
      linkText: link.textContent
    };
  }, targetFile);
  
  return {
    forwardLinkExists: !!forwardLink,
    forwardLinkWorks: forwardWorking,
    backwardLinkExists: !!backwardLink,
    backwardLinkWorks: backwardWorking,
    bidirectional: !!forwardLink && !!backwardLink,
    context: linkContext
  };
}
```

#### Knowledge Graph Link Testing
```javascript
// Test links within knowledge graph visualization
async function validateGraphLinks(page) {
  await page.goto('http://localhost:8080');
  
  // Check if graph visualization exists
  const graphExists = await page.$('.graph, #graph, [data-graph]') !== null;
  if (!graphExists) {
    return { graphExists: false };
  }
  
  // Test graph interactions
  const graphData = await page.evaluate(() => {
    const graph = window.graph || window.graphData;
    if (!graph) return null;
    
    return {
      nodeCount: graph.nodes?.length || 0,
      linkCount: graph.links?.length || 0,
      hasIndexNodes: graph.nodes?.some(node => 
        node.id?.includes('/index') || node.title?.includes('Index')
      ) || false
    };
  });
  
  // Test node clicking (if interactive)
  try {
    const firstNode = await page.$('.graph-node, .node');
    if (firstNode) {
      await firstNode.click();
      await page.waitForTimeout(1000);
      
      // Check if clicking navigated to content
      const urlChanged = !page.url().endsWith('/');
      return {
        ...graphData,
        graphExists: true,
        interactive: urlChanged,
        navigationWorks: urlChanged
      };
    }
  } catch (error) {
    // Graph might not be interactive
  }
  
  return {
    ...graphData,
    graphExists: true,
    interactive: false
  };
}
```

## Claude Code Integration
- **Pieces Context**: Leverages content relationship history and successful linking patterns
- **Semantic Analysis**: Built-in understanding of content relationships and natural connections
- **Graph Intelligence**: Knowledge of optimal knowledge graph structures and patterns
- **Link Validation**: Comprehensive link checking and health monitoring
- **Playwright Testing**: Real-time browser validation of link functionality and patterns
- **Index Link Verification**: Specialized testing for absolute path index link requirements
- **Bidirectional Validation**: Automated testing of reciprocal link integrity
- **Contextual Enhancement**: Automatic generation of meaningful link context and descriptions
- **Reciprocal Management**: Intelligent bidirectional link creation and maintenance
- **Pattern Recognition**: Learns from successful linking patterns to improve suggestions
- **Memory Preservation**: Documents effective linking strategies for consistency
