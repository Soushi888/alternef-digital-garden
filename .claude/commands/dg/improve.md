---
allowed-tools: [Read, Write, Edit, MultiEdit, Glob, Grep, Bash, TodoWrite, mcp__pieces-os__ask_pieces_ltm, mcp__pieces-os__create_pieces_memory, mcp__playwright__init-browser, mcp__playwright__get-screenshot, mcp__playwright__get-context, mcp__playwright__execute-code]
description: "Enhance existing digital garden content with AI-driven improvements for structure, clarity, comprehensiveness, and engagement"
---

# /dg:improve - Content Enhancement & Optimization

## Purpose
Analyze and enhance existing digital garden content with AI-driven improvements for structure, clarity, comprehensiveness, reader engagement, and knowledge graph integration.

## Usage
```
/dg:improve [target] [--focus area] [--aggressiveness level] [--dry-run] [--interactive]
```

## Arguments
- `target` - Target content to improve: file path, folder pattern, or `all`
- `--focus` - Improvement area: `structure`, `clarity`, `completeness`, `links`, `engagement`, `seo`, `frontmatter`, `all`
- `--aggressiveness` - Change level: `conservative`, `moderate`, `ambitious` (default: moderate)
- `--dry-run` - Preview improvements without applying changes
- `--interactive` - Review each improvement before applying
- `--domain` - Focus on specific knowledge domain only

## Execution
1. **Context Gathering**: Query Pieces MCP for improvement patterns and content enhancement history
2. **Content Analysis**: Deep analysis of target content for quality, structure, and completeness
3. **Improvement Scoring**: Rate content across multiple dimensions and identify enhancement opportunities
4. **Enhancement Generation**: Create specific, actionable improvements based on analysis
5. **Link Optimization**: Identify and create strategic internal connections
6. **Structure Refinement**: Optimize headings, lists, content flow, and organization
7. **Clarity Enhancement**: Improve readability, explanations, and concept presentation
8. **Completeness Analysis**: Add missing sections, examples, or context where needed
9. **Frontmatter Validation**: Analyze and validate YAML frontmatter metadata for completeness and correctness
10. **Playwright Validation**: Test improved content renders correctly and links function
11. **Quality Assurance**: Verify improvements enhance rather than detract from content
12. **Memory Creation**: Document successful improvement patterns for future application

## Built-in Content Improvement Knowledge

### Content Quality Assessment Framework

#### Structural Quality Indicators
```yaml
Content Structure:
  heading_hierarchy:
    - Single H1 title present
    - Logical H2-H6 progression
    - No skipped heading levels
    - Balanced section lengths

  content_organization:
    - Clear introduction and conclusion
    - Logical flow between sections
    - Appropriate use of lists and tables
    - Proper markdown formatting

  section_completeness:
    - Overview/introduction section
    - Key concepts explained
    - Examples or applications
    - Related topics or next steps
```

#### Clarity & Readability Metrics
```yaml
Readability Assessment:
  sentence_complexity:
    - Average sentence length < 25 words
    - Varied sentence structure
    - Clear subject-verb relationships

  concept_explanation:
    - Technical terms defined
    - Analogies used for complex concepts
    - Step-by-step explanations
    - Visual elements suggested where appropriate

  content_density:
    - Appropriate paragraph length
    - White space for readability
    - Key points emphasized
    - Information chunking
```

#### Completeness Evaluation
```yaml
Content Completeness:
  core_elements:
    - Clear purpose and scope
    - Essential concepts covered
    - Practical examples included
    - Context and background provided

  depth_appropriateness:
    - Sufficient detail for understanding
    - Not overwhelming for target audience
    - Links to deeper resources
    - Progressive complexity

  knowledge_integration:
    - Connections to related topics
    - Cross-domain references
    - Historical context
    - Future implications
```

#### Frontmatter Metadata Validation
```yaml
Frontmatter Completeness:
  required_fields:
    - title: Clear, descriptive title
    - description: Concise summary for SEO and previews
    - tags: Relevant categorization tags
    - created: Publication date (ISO 8601)
    - updated: Last modification date (ISO 8601)

  optional_fields:
    - author: Content creator attribution
    - status: draft, review, published, archived
    - type: article, tutorial, reference, note
    - category: Primary topic classification
    - difficulty: beginner, intermediate, advanced
    - estimated_read_time: Reading time in minutes
    - related_posts: Array of related content slugs
    - aliases: Alternative URLs or titles
    - featured: Boolean for highlighting
    - image: Hero image or thumbnail path
    - published: Publication status boolean
    - weight: Content ordering weight
    - series: Series or collection name
    - part: Part number in series

YAML Structure Validation:
  proper_formatting:
    - Valid YAML syntax
    - Proper indentation (2 spaces)
    - Quoted strings when needed
    - Correct data types

  data_integrity:
    - Date format consistency (YYYY-MM-DD)
    - Tag format standardization
    - Array formatting consistency
    - No orphaned or trailing commas
    - Boolean values properly formatted

content_alignment:
  title_matches_content: Frontmatter title reflects actual H1
  description_accuracy: Meta description matches content focus
  tag_relevance: Tags accurately represent content themes
  category_alignment: Category matches primary topic
  difficulty_assessment: Difficulty level matches content complexity
```

### Improvement Strategies by Focus Area

#### Structure Improvements
```markdown
# Common Structure Issues and Fixes

## Issue: Poor heading hierarchy
❌ Before:
# Topic
### Subtopic
#### Detail

✅ After:
# Topic
## Subtopic
### Detail

## Issue: Missing content organization
❌ Before: Long, unstructured content block

✅ After:
## Overview
[Brief introduction]

## Key Concepts
- Concept 1: [definition]
- Concept 2: [definition]

## Examples
[Practical applications]

## Related Topics
[Internal links]

## Issue: Inconsistent formatting
❌ Before: Mixed use of bold, italics, lists

✅ After: Consistent formatting patterns throughout
```

#### Clarity Enhancements
```markdown
# Clarity Improvement Techniques

## Technical Term Definition
❌ Before: "The API uses RESTful principles for data serialization."

✅ After: "The API uses **RESTful principles** - architectural standards for web services that enable efficient **data serialization** (converting data structures for storage or transmission)."

## Complex Concept Explanation
❌ Before: "Blockchain enables distributed consensus through cryptographic hashing."

✅ After: "Blockchain enables **distributed consensus** (agreement across multiple nodes without central authority) through **cryptographic hashing** (mathematical functions that secure data integrity). Think of it as a shared digital notebook where everyone can verify entries but no single person controls it."

## Step-by-Step Process
❌ Before: "Configure the server and deploy the application."

✅ After: "1. **Configure the server**: Set up environment variables and database connections\n2. **Test configuration**: Verify all services connect properly\n3. **Deploy application**: Push code to production environment"
```

#### Completeness Additions
```markdown
# Content Completeness Enhancements

## Missing Overview Section
Add to comprehensive topics:
---
## Overview
[Topic] is [brief definition] that [primary purpose]. This concept is important because [significance]. We'll explore [key aspects] and [practical applications].

## Key Takeaways
- [Main point 1]
- [Main point 2]
- [Main point 3]
---

## Missing Examples Section
Add to theoretical content:
---
## Examples & Applications

### Practical Example 1: [Title]
[Detailed real-world example]

### Technical Implementation
[Code snippet or technical details]

### Common Use Cases
- [Use case 1 with brief description]
- [Use case 2 with brief description]
---

## Missing Related Topics
Add to isolated content:
---
## Related Topics
- [[connected-topic-1]] - [Relationship description]
- [[connected-topic-2]] - [Relationship description]
- [[related-concept]] - [How it extends this topic]

## Further Reading
- [[more-advanced-topic]] - For deeper understanding
- [[practical-guide]] - Step-by-step implementation
---
```

#### Link Optimization
```markdown
# Strategic Link Enhancement

## Internal Link Opportunities
Identify concepts mentioned that should link to other content:

❌ Missed Opportunities:
"...this relates to machine learning concepts and natural language processing..."

✅ Enhanced with Links:
"...this relates to [[machine-learning|machine learning concepts]] and [[natural-language-processing|natural language processing]]..."

## Contextual Link Improvements
❌ Basic Links:
See [[blockchain]] for details.

✅ Contextual Links:
Building on [[blockchain|blockchain fundamentals]], this implementation uses [[smart-contracts|smart contracts]] for automation.

## Bidirectional Linking
Ensure important topics have backlinks:
Add to related content:
## See Also
- [[current-topic]] - [Brief context of relationship]
```

#### Frontmatter Improvements
```markdown
# Frontmatter Enhancement Strategies

## Missing Required Fields
❌ Before:
```yaml
---
title: "My Article"
tags: ["tech"]
---
```

✅ After:
```yaml
---
title: "My Article"
description: "A comprehensive guide to modern web development practices"
tags: ["web-development", "javascript", "best-practices"]
created: 2024-01-15
updated: 2024-01-20
---
```

## Inconsistent Date Formats
❌ Before:
```yaml
---
created: "Jan 15, 2024"
updated: "2024/01/20"
---
```

✅ After:
```yaml
---
created: 2024-01-15
updated: 2024-01-20
---
```

## Non-standard Tag Formats
❌ Before:
```yaml
---
tags: "web development, javascript, tutorials"
---
```

✅ After:
```yaml
---
tags: ["web-development", "javascript", "tutorials"]
---
```

## Missing Content-Type Classification
❌ Before:
```yaml
---
title: "Getting Started with React"
tags: ["react", "javascript"]
---
```

✅ After:
```yaml
---
title: "Getting Started with React"
description: "A beginner-friendly introduction to React fundamentals"
tags: ["react", "javascript", "frontend", "beginner"]
type: "tutorial"
category: "frontend-development"
difficulty: "beginner"
estimated_read_time: 8
created: 2024-01-15
updated: 2024-01-20
---
```

## Title-Content Mismatch
❌ Before:
```yaml
---
title: "Advanced TypeScript Patterns"
description: "Basic introduction to TypeScript types"
# Content is actually introductory level
---
```

✅ After:
```yaml
---
title: "Introduction to TypeScript Types"
description: "Learn the fundamentals of TypeScript's type system"
difficulty: "beginner"
---
```

## Enhanced SEO Frontmatter
❌ Before:
```yaml
---
title: "API Design"
tags: ["api"]
---
```

✅ After:
```yaml
---
title: "RESTful API Design: Best Practices and Patterns"
description: "Comprehensive guide to designing scalable and maintainable REST APIs with examples"
tags: ["api-design", "rest", "backend", "architecture", "best-practices"]
category: "backend-development"
type: "reference"
difficulty: "intermediate"
estimated_read_time: 12
related_posts: ["microservices-architecture", "authentication-patterns"]
featured: true
image: "/images/api-design-hero.jpg"
created: 2024-01-15
updated: 2024-01-20
---
```

## Series Content Organization
❌ Before:
```yaml
---
title: "React Hooks Part 1"
---
```

✅ After:
```yaml
---
title: "Understanding useState and useEffect"
description: "First part in our comprehensive React Hooks series"
series: "React Hooks Masterclass"
part: 1
tags: ["react", "hooks", "useState", "useEffect", "tutorial"]
category: "frontend-development"
type: "tutorial"
related_posts: ["react-hooks-part2-usecontext", "react-hooks-part3-custom-hooks"]
created: 2024-01-15
updated: 2024-01-20
---
```

## Content Quality Indicators
Add comprehensive frontmatter that helps readers understand content scope and relevance:

```yaml
---
title: "System Design Interview Guide"
description: "Complete preparation guide for technical interviews covering system design principles"
tags: ["system-design", "interviews", "architecture", "scalability"]
category: "career-development"
type: "reference"
difficulty: "advanced"
estimated_read_time: 25
related_posts: ["data-structures-interview", "algorithms-interview", "technical-communication"]
prerequisites: ["computer-science-fundamentals", "distributed-systems-basics"]
learning_objectives:
  - "Design scalable system architectures"
  - "Explain trade-offs in system design"
  - "Handle interview communication effectively"
tools_covered:
  - "Load balancing strategies"
  - "Database design patterns"
  - "Caching architectures"
  - "Microservices communication"
featured: true
weight: 0.8
created: 2024-01-15
updated: 2024-01-22
---
```
```

### Content Scoring System

#### Quality Metrics (0-100 scale)
```yaml
Structure Score:
  heading_quality: 25 points
  organization_flow: 25 points
  section_balance: 25 points
  formatting_consistency: 25 points

Clarity Score:
  readability_level: 30 points
  concept_explanation: 40 points
  technical_accuracy: 30 points

Completeness Score:
  core_concepts: 30 points
  practical_examples: 25 points
  context_background: 25 points
  related_connections: 20 points

Engagement Score:
  introduction_quality: 25 points
  example_relevance: 30 points
  visual_elements: 15 points
  conclusion_strength: 30 points

Frontmatter Score:
  required_fields: 30 points
  optional_fields: 20 points
  yaml_formatting: 25 points
  content_alignment: 25 points
```

#### Improvement Priority Matrix
```yaml
High Impact, Low Effort:
- Fix broken internal links
- Add missing section headers
- Improve heading hierarchy
- Define undefined technical terms
- Fix missing required frontmatter fields
- Standardize date formats in frontmatter
- Convert tag strings to arrays
- Fix YAML syntax errors

High Impact, High Effort:
- Add comprehensive examples
- Create detailed tutorials
- Expand core concepts
- Add interactive elements

Low Impact, Low Effort:
- Fix minor formatting issues
- Update publication dates
- Add relevant tags
- Improve meta descriptions

Low Impact, High Effort:
- Complete rewrite
- Advanced multimedia integration
- Complex interactive features
- Extensive research updates
```

### Aggressiveness Levels

#### Conservative (Safe Improvements)
```yaml
Structure:
  - Fix heading hierarchy only
  - Add missing section breaks
  - Correct formatting errors

Content:
  - Define undefined technical terms
  - Fix obvious clarity issues
  - Add missing periods/capitalization

Links:
  - Fix broken internal links only
  - Add obvious related topic links
  - Ensure proper link formatting

Frontmatter:
  - Fix missing required fields only
  - Correct YAML syntax errors
  - Standardize date formats
  - Fix invalid YAML structure

Safety: 95% - Zero risk of degrading content
```

#### Moderate (Balanced Improvements) - Default
```yaml
Structure:
  - Reorganize sections for better flow
  - Add missing standard sections (overview, examples)
  - Improve content organization
  - Optimize list and table usage

Content:
  - Enhance concept explanations
  - Add practical examples
  - Improve readability and flow
  - Expand key concepts slightly

Links:
  - Add strategic internal connections
  - Create bidirectional links
  - Optimize link context and descriptions
  - Connect to related domains

Frontmatter:
  - Add recommended optional fields
  - Enhance descriptions for SEO
  - Standardize tag formats and hierarchies
  - Add content classification (type, difficulty, category)
  - Include reading time estimates
  - Add related content references

Safety: 80% - High value improvements with minimal risk
```

#### Ambitious (Comprehensive Enhancements)
```yaml
Structure:
  - Complete content reorganization
  - Add advanced sections and subsections
  - Implement complex content structures
  - Create comprehensive resource hierarchies

Content:
  - Substantial content expansion
  - Advanced concept explanations
  - Multiple detailed examples
  - Cross-domain integration

Links:
  - Comprehensive link network integration
  - Multi-level knowledge graph connections
  - Extensive cross-referencing
  - Advanced relationship mapping

Frontmatter:
  - Complete frontmatter overhaul with advanced fields
  - Add comprehensive SEO metadata and structured data
  - Implement series/collection organization
  - Add prerequisite and learning objective fields
  - Include tool/technology coverage metadata
  - Add content quality indicators and weightings
  - Implement advanced taxonomic categorization

Safety: 60% - Maximum improvements with some content alteration risk
```

### Domain-Specific Improvement Patterns

#### Knowledge Content Enhancement
```markdown
# Standard Knowledge Article Structure
## Overview
[Clear definition and significance]

## Core Concepts
- [Concept 1]: Definition and importance
- [Concept 2]: How it relates to the topic
- [Concept 3]: Practical implications

## Key Principles/Laws
[Fundamental rules or principles]

## Examples & Applications
### Real-world Example
[Detailed practical case study]

### Technical Implementation
[How it works in practice]

## Benefits and Limitations
### Advantages
- [Benefit 1] with explanation
- [Benefit 2] with evidence

### Considerations
- [Limitation 1] with mitigation
- [Limitation 2] with context

## Related Topics
- [[related-concept-1]] - [Relationship]
- [[related-concept-2]] - [Connection]

## Further Exploration
- [[advanced-topic]] - Next level learning
- [[practical-guide]] - Hands-on application
```

#### Tutorial Content Enhancement
```markdown
# Enhanced Tutorial Structure
## Prerequisites
- [[required-concept-1]] - Basic understanding needed
- [[required-tool-1]] - Tool to install
- [[required-skill-1]] - Skill level expected

## What You'll Learn
- [Learning objective 1]
- [Learning objective 2]
- [Final outcome]

## Step-by-Step Guide
### Step 1: [Clear Action Title]
**Objective**: [What this step accomplishes]
**Time**: [Estimated time]
[Detailed instructions with code examples]

**Verification**: [How to confirm step completed]

### Step 2: [Next Action]
[Continue pattern...]

## Common Issues & Solutions
### Issue: [Problem description]
**Cause**: [Why it happens]
**Solution**: [How to fix it]
**Prevention**: [How to avoid in future]

## Next Steps
- [[follow-up-tutorial]] - Continue learning
- [[advanced-application]] - Apply skills
- [[related-project]] - Practice project
```

### Playwright Content Validation

#### Improvement Quality Testing
```javascript
// Validate improved content with Playwright
async function validateImprovedContent(page, contentPath, improvementsMade) {
  // 1. Content Accessibility Test
  const contentUrl = `http://localhost:8080/${contentPath}`;
  await page.goto(contentUrl);

  const title = await page.title();
  const contentLoads = !title.includes('404') && !title.includes('Error');

  // 2. Structure Validation
  const headings = await page.$$eval('h1, h2, h3, h4, h5, h6',
    headings => headings.map(h => ({
      level: parseInt(h.tagName.charAt(1)),
      text: h.textContent.trim()
    }))
  );

  const hasValidHierarchy = validateHeadingHierarchy(headings);

  // 3. Link Functionality Test
  const internalLinks = await page.$$eval('a[href*="/"]',
    links => links.map(link => ({
      href: link.href,
      text: link.textContent,
      internal: link.href.includes(window.location.origin)
    }))
  );

  // Test sample of internal links
  const linkTestResults = [];
  for (let i = 0; i < Math.min(5, internalLinks.length); i++) {
    const link = internalLinks[i];
    try {
      await page.goto(link.href);
      const works = !page.url().includes('404');
      linkTestResults.push({ ...link, works });
    } catch (error) {
      linkTestResults.push({ ...link, works: false, error: error.message });
    }
  }

  // 4. Content Readability Assessment
  const contentLength = await page.$eval('.content', el => el.textContent.length);
  const hasImages = await page.$$('img').length > 0;
  const hasLists = await page.$$('ul, ol').length > 0;
  const hasTables = await page.$$('table').length > 0;

  // 5. Navigation Integration Check
  await page.goto('http://localhost:8080');
  const inSearch = await page.evaluate((contentTitle) => {
    // Simulate search if search functionality exists
    const searchInput = document.querySelector('[data-search-input]');
    if (searchInput) {
      searchInput.value = contentTitle;
      searchInput.dispatchEvent(new Event('input'));
      return new Promise(resolve => {
        setTimeout(() => {
          const results = document.querySelectorAll('[data-search-results] a');
          resolve(Array.from(results).some(r => r.textContent.includes(contentTitle)));
        }, 1000);
      });
    }
    return false;
  }, title);

  return {
    contentAccessible: contentLoads,
    structureValid: hasValidHierarchy,
    linkFunctionality: {
      totalLinks: internalLinks.length,
      workingLinks: linkTestResults.filter(l => l.works).length,
      brokenLinks: linkTestResults.filter(l => !l.works)
    },
    contentQuality: {
      length: contentLength,
      hasRichContent: hasImages || hasLists || hasTables,
      lengthAppropriate: contentLength > 500 && contentLength < 10000
    },
    searchIntegration: inSearch,
    improvementsValidated: improvementsMade.length,
    url: contentUrl
  };
}

function validateHeadingHierarchy(headings) {
  let previousLevel = 0;

  for (const heading of headings) {
    if (heading.level === 1) {
      // H1 should only appear once at the beginning
      if (headings.filter(h => h.level === 1).length > 1) return false;
    }

    // Check for skipped levels (e.g., H1 followed by H3)
    if (previousLevel > 0 && heading.level > previousLevel + 1) {
      return false;
    }

    previousLevel = heading.level;
  }

  return true;
}
```

#### Content Enhancement Testing
```javascript
// Test specific improvements made to content
async function validateContentEnhancements(page, contentPath, enhancements) {
  await page.goto(`http://localhost:8080/${contentPath}`);

  const validationResults = [];

  for (const enhancement of enhancements) {
    let result = { type: enhancement.type, passed: false, details: '' };

    switch (enhancement.type) {
      case 'heading_added':
        const headingExists = await page.$(`h${enhancement.level}:has-text("${enhancement.text}")`) !== null;
        result.passed = headingExists;
        result.details = headingExists ? `H${enhancement.level} "${enhancement.text}" found` : 'Heading not found';
        break;

      case 'link_added':
        const linkExists = await page.$(`a[href*="${enhancement.target}"]`) !== null;
        result.passed = linkExists;
        result.details = linkExists ? `Link to ${enhancement.target} found` : 'Link not found';
        break;

      case 'section_added':
        const sectionExists = await page.$(`text=${enhancement.sectionTitle}`) !== null;
        result.passed = sectionExists;
        result.details = sectionExists ? `Section "${enhancement.sectionTitle}" found` : 'Section not found';
        break;

      case 'content_expanded':
        const contentLength = await page.$eval('.content', el => el.textContent.length);
        result.passed = contentLength >= enhancement.minLength;
        result.details = `Content length: ${contentLength} (expected: ${enhancement.minLength}+)`;
        break;

      case 'formatting_improved':
        const hasFormattedElements = await page.$$eval(enhancement.selector, els => els.length > 0);
        result.passed = hasFormattedElements;
        result.details = hasFormattedElements ? `Formatted elements found` : 'No formatted elements';
        break;
    }

    validationResults.push(result);
  }

  const passedValidations = validationResults.filter(r => r.passed).length;
  const totalValidations = validationResults.length;

  return {
    totalEnhancements: totalValidations,
    successfulValidations: passedValidations,
    validationRate: (passedValidations / totalValidations * 100).toFixed(1) + '%',
    detailedResults: validationResults,
    overallSuccess: passedValidations === totalValidations
  };
}
```

#### Frontmatter Validation Testing
```javascript
// Validate frontmatter metadata structure and content
async function validateFrontmatter(page, contentPath) {
  await page.goto(`http://localhost:8080/${contentPath}`);

  // Extract page content to find and parse frontmatter
  const pageContent = await page.$eval('body', el => el.textContent);

  // Extract frontmatter from content
  const frontmatterMatch = pageContent.match(/^---\n([\s\S]*?)\n---/);
  let frontmatter = null;
  let frontmatterErrors = [];
  let frontmatterWarnings = [];
  let frontmatterSuggestions = [];

  if (!frontmatterMatch) {
    return {
      hasFrontmatter: false,
      criticalError: "No frontmatter found",
      errors: ["Content missing frontmatter section"],
      warnings: [],
      suggestions: ["Add frontmatter with title, description, tags, and dates"]
    };
  }

  try {
    // Basic YAML parsing (simplified - in production, use a proper YAML parser)
    frontmatter = parseBasicYaml(frontmatterMatch[1]);
  } catch (error) {
    return {
      hasFrontmatter: true,
      parseError: true,
      errors: [`Invalid YAML syntax: ${error.message}`],
      warnings: [],
      suggestions: ["Fix YAML syntax errors"]
    };
  }

  // Validate required fields
  const requiredFields = ['title', 'description', 'tags', 'created', 'updated'];
  const missingRequired = requiredFields.filter(field => !frontmatter[field]);

  if (missingRequired.length > 0) {
    frontmatterErrors.push(`Missing required fields: ${missingRequired.join(', ')}`);
  }

  // Validate field formats
  if (frontmatter.created && !isValidDate(frontmatter.created)) {
    frontmatterErrors.push('Invalid created date format (use YYYY-MM-DD)');
  }

  if (frontmatter.updated && !isValidDate(frontmatter.updated)) {
    frontmatterErrors.push('Invalid updated date format (use YYYY-MM-DD)');
  }

  if (frontmatter.tags) {
    if (typeof frontmatter.tags === 'string') {
      frontmatterSuggestions.push('Convert tags from string to array format');
    } else if (Array.isArray(frontmatter.tags)) {
      const invalidTags = frontmatter.tags.filter(tag =>
        typeof tag !== 'string' || tag.includes(' ') || tag.length === 0
      );
      if (invalidTags.length > 0) {
        frontmatterWarnings.push('Some tags have formatting issues (use lowercase, hyphens instead of spaces)');
      }
    }
  }

  // Validate title matches H1
  const h1Text = await page.$eval('h1', el => el.textContent.trim()).catch(() => null);
  if (h1Text && frontmatter.title && h1Text !== frontmatter.title) {
    frontmatterWarnings.push(`Title mismatch: frontmatter "${frontmatter.title}" vs H1 "${h1Text}"`);
  }

  // Suggest optional fields
  const recommendedFields = ['type', 'category', 'difficulty', 'estimated_read_time'];
  const missingRecommended = recommendedFields.filter(field => !frontmatter[field]);

  if (missingRecommended.length > 0) {
    frontmatterSuggestions.push(`Consider adding: ${missingRecommended.join(', ')}`);
  }

  // Check description length
  if (frontmatter.description) {
    if (frontmatter.description.length < 50) {
      frontmatterWarnings.push('Description too short for effective SEO');
    } else if (frontmatter.description.length > 200) {
      frontmatterWarnings.push('Description too long for optimal display');
    }
  }

  return {
    hasFrontmatter: true,
    isValid: frontmatterErrors.length === 0,
    errors: frontmatterErrors,
    warnings: frontmatterWarnings,
    suggestions: frontmatterSuggestions,
    completeness: {
      requiredFields: requiredFields.length - missingRequired.length,
      recommendedFields: recommendedFields.length - missingRecommended.length,
      totalFields: Object.keys(frontmatter).length
    }
  };
}

// Helper function for basic YAML parsing
function parseBasicYaml(yamlText) {
  const lines = yamlText.split('\n');
  const result = {};

  for (const line of lines) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;

    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      result[key] = parseYamlValue(value.trim());
    }
  }

  return result;
}

// Parse YAML values (basic implementation)
function parseYamlValue(value) {
  // Handle quoted strings
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  // Handle arrays
  if (value.startsWith('[') && value.endsWith(']')) {
    return value.slice(1, -1).split(',').map(item => {
      const trimmed = item.trim();
      return parseYamlValue(trimmed.replace(/['"]/g, ''));
    });
  }

  // Handle booleans
  if (value === 'true') return true;
  if (value === 'false') return false;

  // Handle numbers
  if (/^\d+$/.test(value)) return parseInt(value);
  if (/^\d+\.\d+$/.test(value)) return parseFloat(value);

  // Default to string
  return value;
}

// Validate date format (YYYY-MM-DD)
function isValidDate(dateString) {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

// Comprehensive frontmatter quality scoring
function scoreFrontmatter(frontmatterData) {
  let score = 0;
  const maxScore = 100;

  // Required fields (40 points)
  const requiredFields = ['title', 'description', 'tags', 'created', 'updated'];
  const presentRequired = requiredFields.filter(field => frontmatterData[field]).length;
  score += (presentRequired / requiredFields.length) * 40;

  // Optional fields (20 points)
  const optionalFields = ['type', 'category', 'difficulty', 'estimated_read_time', 'author'];
  const presentOptional = optionalFields.filter(field => frontmatterData[field]).length;
  score += (presentOptional / optionalFields.length) * 20;

  // Format quality (25 points)
  let formatScore = 25;
  if (frontmatterData.created && !isValidDate(frontmatterData.created)) formatScore -= 10;
  if (frontmatterData.updated && !isValidDate(frontmatterData.updated)) formatScore -= 10;
  if (frontmatterData.tags && typeof frontmatterData.tags === 'string') formatScore -= 5;
  score += Math.max(0, formatScore);

  // Content alignment (15 points)
  let alignmentScore = 15;
  if (frontmatterData.description) {
    if (frontmatterData.description.length < 50) alignmentScore -= 5;
    if (frontmatterData.description.length > 200) alignmentScore -= 5;
  }
  score += Math.max(0, alignmentScore);

  return {
    score: Math.round(score),
    maxScore,
    grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
  };
}
```

### Content Improvement Templates

#### Structure Improvement Templates
```markdown
## Missing Standard Sections Template

### For Technical Topics
---
## Overview
[Topic] is [one-sentence definition] that enables [primary function/purpose]. This concept is fundamental to [broader context] and has applications in [key areas].

## Core Concepts
### [Concept 1]
[Clear definition with practical significance]

### [Concept 2]
[How it relates to and enhances Concept 1]

### [Concept 3]
[Advanced concept building on previous ones]

## Implementation Examples
### Basic Implementation
[Step-by-step simple example]

### Advanced Usage
[Complex or professional application]

## Benefits and Trade-offs
### Advantages
- [Benefit 1]: [Specific explanation]
- [Benefit 2]: [Specific explanation]

### Considerations
- [Limitation 1]: [Context and mitigation]
- [Limitation 2]: [When this might not be optimal]

## Related Topics
- [[related-concept]] - [How it connects]
- [[prerequisite-topic]] - [What to learn first]
- [[application-domain]] - [Where this is applied]
---

### For Conceptual Topics
---
## Introduction
[Topic] represents [philosophical/conceptual framework] that influences [area of impact]. Understanding this concept helps [what it enables].

## Key Principles
### [Principle 1]
[Explanation with real-world analogy]

### [Principle 2]
[How it builds on or contrasts with Principle 1]

### [Principle 3]
[Practical application of the principles]

## Real-World Applications
### [Application Domain 1]
[Specific example with outcomes]

### [Application Domain 2]
[Different context showing versatility]

## Critical Perspectives
### Strengths
[What makes this approach valuable]

### Limitations
[Boundaries or critiques of the concept]

## Connections
- [[similar-concept]] - [Comparison]
- [[opposing-viewpoint]] - [Contrast]
- [[practical-implementation]] - [How to apply]
---
```

## Claude Code Integration
- **Pieces Context**: Leverages content improvement history and successful enhancement patterns
- **Quality Analysis**: Built-in content quality assessment across multiple dimensions
- **Structure Intelligence**: Deep understanding of optimal content organization and flow
- **Link Enhancement**: Strategic internal link creation for knowledge graph integration
- **Frontmatter Validation**: Comprehensive YAML metadata validation with format checking and content alignment
- **Playwright Validation**: Real-time testing of improved content and functionality
- **Aggressive Safety**: Multi-level aggressiveness settings with appropriate safety checks
- **Domain Expertise**: Specialized improvement patterns for different content types
- **Memory Preservation**: Documents successful improvement techniques for consistency
- **Interactive Enhancement**: Optional review process for selective improvement application
- **Comprehensive Testing**: Validates improvements enhance rather than detract from content
- **SEO Optimization**: Enhanced frontmatter metadata for better search engine visibility and content discovery