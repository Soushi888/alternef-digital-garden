---
title: "JSON-LD"
description: "JSON for Linked Data provides a lightweight format for expressing structured data on the web, bridging traditional web development with semantic technologies."
tags:
  - semantic-web
  - json-ld
  - web-development
  - apis
  - linked-data
  - data-serialization
  - context-definitions
  - web-integration
  - microservices
created: 2025-11-28
modified: 2025-11-28
draft: false
aliases: ["JSON for Linked Data", "Linked Data JSON"]
---

# JSON-LD (JSON for Linked Data)

JSON-LD is a lightweight format for expressing structured data on the web that bridges traditional web development with semantic technologies. It enables developers to work with familiar JSON syntax while gaining the benefits of the Semantic Web's linked data capabilities.

## Core Concept: Context Definitions

JSON-LD's innovation lies in its ability to add meaning to JSON through **@context** definitions that map simple JSON keys to globally unique URIs.

### Basic Example

**Without Context (Regular JSON)**:
```json
{
  "name": "Community Garden Project",
  "participants": ["Alice", "Bob"],
  "budget": 1500
}
```

**With JSON-LD Context**:
```json
{
  "@context": {
    "name": "http://schema.org/name",
    "participants": "http://www.valueflows.org/ontologies/vf#participatesIn",
    "budget": "http://www.valueflows.org/ontologies/vf#economicQuantity"
  },
  "@id": "http://example.org/projects/community-garden",
  "name": "Community Garden Project",
  "participants": [
    "http://example.org/agents/alice",
    "http://example.org/agents/bob"
  ],
  "budget": {
    "@type": "http://www.w3.org/2001/XMLSchema#decimal",
    "@value": 1500
  }
}
```

## Key JSON-LD Keywords

### `@context`
Defines mappings between JSON keys and semantic vocabularies:

```json
{
  "@context": {
    "@vocab": "http://www.valueflows.org/ontologies/vf#",
    "schema": "http://schema.org/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "name": "schema:name",
    "produces": "vf:produces",
    "price": {
      "@id": "vf:price",
      "@type": "xsd:decimal"
    }
  }
}
```

### `@id`
Assigns a unique identifier (URI) to the data:

```json
{
  "@id": "http://example.org/resources/heirloom-tomatoes"
}
```

### `@type`
Specifies the type of resource:

```json
{
  "@type": ["http://www.valueflows.org/ontologies/vf#EconomicResource", "http://schema.org/Product"]
}
```

### `@value` and `@type` (Typed Literals)
Provides explicit typing for values:

```json
{
  "price": {
    "@value": "3.50",
    "@type": "http://www.w3.org/2001/XMLSchema#decimal"
  }
}
```

## Context Management

### External Context Files
Create reusable context definitions:

**`/contexts/valueflows.jsonld`**:
```json
{
  "@context": {
    "@vocab": "http://www.valueflows.org/ontologies/vf#",
    "schema": "http://schema.org/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "name": "schema:name",
    "description": "schema:description",
    "produces": {
      "@id": "vf:produces",
      "@type": "@id"
    },
    "consumes": {
      "@id": "vf:consumes",
      "@type": "@id"
    },
    "economicQuantity": {
      "@id": "vf:economicQuantity",
      "@container": "@list"
    }
  }
}
```

**Using External Context**:
```json
{
  "@context": [
    "https://example.org/contexts/valueflows.jsonld",
    {
      "local": "http://example.org/ontologies/local#"
    }
  ],
  "name": "Local Food Exchange",
  "produces": "http://example.org/resources/vegetables",
  "local:region": "Bioregion One"
}
```

### Scoped Contexts
Different contexts for different parts of the data:

```json
{
  "@context": {
    "project": {
      "@context": {
        "name": "http://schema.org/name",
        "startDate": "http://schema.org/startDate"
      }
    },
    "economic": {
      "@context": {
        "@vocab": "http://www.valueflows.org/ontologies/vf#"
      }
    }
  },
  "project": {
    "name": "Community Food Network",
    "startDate": "2025-01-15"
  },
  "economic": {
    "produces": "http://example.org/resources/food",
    "commitment": "http://example.org/commitments/weekly-delivery"
  }
}
```

## Practical Web Integration

### REST API Responses

**Economic Resource API Endpoint**:
```javascript
// GET /api/resources/heirloom-tomatoes
app.get('/api/resources/:id', async (req, res) => {
  const resource = await getResourceById(req.params.id);

  const jsonLdResponse = {
    "@context": [
      "https://schema.org",
      "https://www.valueflows.org/ontologies/vf"
    ],
    "@id": `https://api.example.org/resources/${resource.id}`,
    "@type": ["Product", "EconomicResource"],
    "name": resource.name,
    "description": resource.description,
    "offers": {
      "@type": "Offer",
      "price": resource.price,
      "priceCurrency": "EUR",
      "availability": resource.stock > 0 ? "InStock" : "OutOfStock"
    },
    "producer": {
      "@id": `https://api.example.org/agents/${resource.producerId}`,
      "@type": ["Person", "Agent"],
      "name": resource.producerName
    },
    "category": "Organic Produce",
    "certification": "Biodynamic Certified"
  };

  res.set('Content-Type', 'application/ld+json');
  res.json(jsonLdResponse);
});
```

### Web Component Integration

**Economic Resource Display Component**:
```javascript
class EconomicResourceCard extends HTMLElement {
  connectedCallback() {
    const resourceId = this.getAttribute('resource-id');
    this.loadResource(resourceId);
  }

  async loadResource(id) {
    const response = await fetch(`/api/resources/${id}`);
    const resource = await response.json();
    this.render(resource);
  }

  render(resource) {
    this.innerHTML = `
      <div class="resource-card" itemscope itemtype="${resource['@type'].join(' ')}">
        <h3 itemprop="name">${resource.name}</h3>
        <p itemprop="description">${resource.description}</p>
        <div class="price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <span itemprop="price">${resource.offers.price}</span>
          <span itemprop="priceCurrency">${resource.offers.priceCurrency}</span>
        </div>
        <div class="producer" itemprop="producer" itemscope itemtype="https://schema.org/Person">
          Produced by: <span itemprop="name">${resource.producer.name}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('economic-resource-card', EconomicResourceCard);
```

### Microdata and Schema.org Integration

JSON-LD works seamlessly with existing web standards:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": "Community Garden Salad",
    "description": "Fresh organic salad from local producers",
    "author": {
      "@type": "Organization",
      "name": "Community Kitchen"
    },
    "ingredients": [
      {
        "@type": "Ingredient",
        "name": "Heirloom Tomatoes",
        "supplier": {
          "@type": "Person",
          "name": "Local Farmer Bob"
        }
      }
    ],
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": "150 kcal",
      "proteinContent": "8 g"
    }
  }
  </script>
</head>
<body>
  <h1>Community Garden Salad</h1>
  <!-- Regular HTML content -->
</body>
</html>
```

## Integration with Existing Garden Content

### [[valueflows|Valueflows]] JSON-LD Serialization

**Economic Event Serialization**:
```json
{
  "@context": [
    "https://www.valueflows.org/ontologies/vf",
    "https://example.org/contexts/community"
  ],
  "@id": "https://example.org/events/harvest-2025-001",
  "@type": "EconomicEvent",
  "action": "produce",
  "resourceInventoriedAs": "https://example.org/inventory/tomatoes-2025",
  "resourceQuantity": {
    "hasNumericalValue": 50,
    "hasUnit": "https://example.org/units/kilogram"
  },
  "provider": "https://example.org/agents/community-garden",
  "receiver": "https://example.org/agents/food-cooperative",
  "hasPointInTime": "2025-11-28T10:00:00Z",
  "note": "First successful harvest of heirloom varieties"
}
```

### [[agent|Agent]] Identity Representation

**Agent Profile JSON-LD**:
```json
{
  "@context": {
    "@vocab": "http://www.valueflows.org/ontologies/vf#",
    "schema": "http://schema.org/",
    "solid": "http://www.w3.org/ns/solid/terms#"
  },
  "@id": "https://example.org/agents/alice",
  "@type": ["Person", "Agent"],
  "name": "Alice Network Participant",
  "image": "https://example.org/avatars/alice.jpg",
  "url": "https://alice.example.org",
  "solid:publicTypeIndex": "https://alice.example.org/profile/typeIndex",
  "memberOf": "https://example.org/organizations/local-food-coop",
  "hasCapability": [
    {
      "@type": "Capability",
      "resourceClassifiedAs": "https://example.org/vocab/organic-farming"
    },
    {
      "@type": "Capability",
      "resourceClassifiedAs": "https://example.org/vocab/community-organization"
    }
  ],
  "owns": [
    "https://example.org/resources/alice-farm-equipment",
    "https://example.org/resources/alice-seed-collection"
  ]
}
```

## Advanced Patterns

### Framing and Transformation
Control the structure of output JSON:

```javascript
import { jsonld } from 'jsonld';

const document = {
  "@context": "https://www.valueflows.org/ontologies/vf",
  "@id": "https://example.org/projects/community-garden",
  "produces": "https://example.org/resources/vegetables",
  "participatesIn": ["https://example.org/agents/alice", "https://example.org/agents/bob"]
};

const frame = {
  "@context": "https://www.valueflows.org/ontologies/vf",
  "@type": "Project",
  "produces": {
    "@type": "EconomicResource"
  },
  "participatesIn": {
    "@type": "Agent"
  }
};

const framed = await jsonld.frame(document, frame);
// Results in structured, nested JSON
```

### Compaction and Expansion
Convert between different JSON-LD representations:

```javascript
// Compact to shorter form
const compacted = await jsonld.compact(expandedDocument, context);

// Expand to full URI form
const expanded = await jsonld.compact(compactDocument, {});

// Flatten to named graphs
const flattened = await jsonld.flatten(document);
```

### Error Handling and Validation

```javascript
async function validateJsonLd(data, context) {
  try {
    const expanded = await jsonld.expand(data);

    // Check for required properties
    if (!expanded[0]['@type']) {
      throw new Error('Missing @type property');
    }

    // Validate against context
    const compacted = await jsonld.compact(expanded, context);
    return compacted;
  } catch (error) {
    console.error('JSON-LD validation failed:', error);
    throw error;
  }
}
```

## Best Practices

### Context Design
1. **Use stable URIs** for vocabulary definitions
2. **Prefix with domain** to avoid naming conflicts
3. **Version your contexts** for breaking changes
4. **Document vocabulary** with clear descriptions

### Performance Optimization
1. **Cache contexts** locally to reduce HTTP requests
2. **Use compacted forms** for transmission
3. **Prefer external contexts** for reuse
4. **Minimize context nesting** for simplicity

### Integration Strategy
1. **Start simple** with basic Schema.org contexts
2. **Extend gradually** with domain-specific vocabularies
3. **Maintain backward compatibility** when evolving schemas
4. **Test interoperability** across different tools

## Tools and Libraries

### JavaScript/Node.js
- **jsonld.js**: Official JavaScript implementation
- **json-schema**: JSON Schema validation
- **@comunica/query-sparql**: SPARQL querying

### Python
- **pyld**: Python JSON-LD implementation
- **rdflib**: RDF processing library
- **pySHACL**: SHACL validation

### Web Development
- **Structured Data Testing Tool**: Google's validation tool
- **Schema.org Markup Generator**: Interactive tool
- **JSON-LD Playground**: Online testing environment

## Related Semantic Web Technologies

### [[rdf|Resource Description Framework]]
The foundational data model that underlies JSON-LD, providing the triple-based structure for representing knowledge as interconnected graphs.

### [[sparql|SPARQL]]
Query language that enables sophisticated data retrieval and manipulation across JSON-LD serialized RDF data, essential for complex analytics.

### [[shacl|SHACL]]
Validation framework that can ensure JSON-LD data conforms to expected schemas and business rules, maintaining data quality across web systems.

### Web Development Integration
- [[apis|REST APIs]]: Web service integration patterns with semantic enrichment
- [[microformats|Microformats]]: Alternative structured data approach for web content
- [[web-development|Web Development]]: Modern web application practices with semantic enhancement
- [[semantic-web/index|Semantic Web Overview]]: Comprehensive semantic web foundation concepts

### Practical Context
JSON-LD serves as the perfect bridge between traditional web development and semantic technologies, enabling developers to work with familiar JSON syntax while gaining the benefits of the Semantic Web's linked data capabilities and knowledge graph reasoning.

JSON-LD provides the perfect bridge between traditional web development and semantic technologies, enabling developers to create meaningful, interconnected data while working with familiar JSON syntax and tools.