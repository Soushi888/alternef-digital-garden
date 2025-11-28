---
title: "SHACL (Shapes Constraint Language)"
description: "W3C standard for validating RDF graph contents through constraint-based shapes that ensure data quality and consistency in semantic web systems."
tags:
  - semantic-web
  - shacl
  - validation
  - data-quality
  - constraints
  - valueflows
  - governance
  - economic-networks
  - data-integrity
created: 2025-11-28
modified: 2025-11-28
draft: false
aliases: ["Shapes Constraint Language", "RDF Validation", "SHACL 1.2"]
---

# SHACL (Shapes Constraint Language)

SHACL (Shapes Constraint Language) is a W3C standard for validating the contents of an RDF-style graph database, defining conditions that data must meet to ensure quality and consistency. It is designed to validate RDF graphs against a set of constraints expressed as "shapes," which are templates specifying the structure and requirements of data.

## Core Concepts

### Shapes and Targets
SHACL organizes validation rules into shapes that can target data nodes in multiple ways:

- **Node Shapes**: Apply constraints to target nodes themselves
- **Property Shapes**: Apply constraints to the properties of those nodes
- **Target Class**: All instances of a specific class
- **Target Objects**: All objects of a specific property
- **Target Subjects**: All subjects of a specific property

### Constraint Types
SHACL supports various constraint types for comprehensive data validation:

- **Type constraints**: Ensuring values are of specific types (e.g., `xsd:integer`, `xsd:date`)
- **Range constraints**: Requiring values to be within specified ranges (e.g., between 1 and 5)
- **Cardinality constraints**: Specifying property occurrence (exactly one, minimum, maximum)
- **String constraints**: Length limits and pattern matching using regular expressions
- **Logical combinations**: Complex validation through AND, OR, NOT operations

## SHACL 1.2 Core Specifications

The current version of the standard, **SHACL 1.2 Core**, was published in January 2025 and includes:

- **Syntactic rules**: Ensuring shapes and data nodes are well-formed
- **Validation reporting**: Standardized result representation
- **Advanced constraints**: Extended validation capabilities
- **Performance optimizations**: Improved validation processing

### Syntax and Structure

SHACL constraints are expressed using RDF syntax, typically organized into a shapes graph:

```turtle
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix vf: <http://www.valueflows.org/ontologies/vf#> .

# Node shape for economic resources
vf:EconomicResourceShape a sh:NodeShape ;
    sh:targetClass vf:EconomicResource ;
    sh:property [
        sh:path vf:name ;
        sh:datatype xsd:string ;
        sh:minLength 1 ;
        sh:maxLength 200 ;
        sh:severity sh:Violation
    ] ;
    sh:property [
        sh:path vf:currentQuantity ;
        sh:class vf:MeasureValue ;
        sh:minCount 1 ;
        sh:maxCount 1
    ] .
```

## Validation with [[valueflows|Valueflows]] Economic Data

### Economic Resource Validation

**Complete Resource Shape**:
```turtle
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix vf: <http://www.valueflows.org/ontologies/vf#> .
@prefix ex: <http://example.org/shapes/> .

ex:EconomicResourceShape a sh:NodeShape ;
    sh:targetClass vf:EconomicResource ;

    # Required name
    sh:property [
        sh:path vf:name ;
        sh:datatype xsd:string ;
        sh:minLength 1 ;
        sh:maxLength 500 ;
        sh:severity sh:Violation ;
        sh:message "Economic resources must have a name between 1-500 characters" ;
    ] ;

    # Unique tracking identifier
    sh:property [
        sh:path vf:trackingIdentifier ;
        sh:datatype xsd:string ;
        sh:pattern "^[A-Z]{3}-\\d{4}-\\d{3}$" ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:message "Tracking identifier must follow format: ABC-2025-001" ;
    ] ;

    # Quantity must be present and valid
    sh:property [
        sh:path vf:currentQuantity ;
        sh:class vf:MeasureValue ;
        sh:minCount 0 ;
        sh:maxCount 1 ;
        sh:severity sh:Violation ;
        sh:message "Current quantity must be a valid MeasureValue or absent" ;
    ] ;

    # Must have a responsible agent
    sh:property [
        sh:path vf:primaryAccountable ;
        sh:class vf:Agent ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:severity sh:Violation ;
        sh:message "Economic resources must have exactly one primary accountable agent" ;
    ] .
```

### Measure Value Validation

**Quantity and Unit Constraints**:
```turtle
ex:MeasureValueShape a sh:NodeShape ;
    sh:targetClass vf:MeasureValue ;

    # Numerical value constraints
    sh:property [
        sh:path vf:hasNumericalValue ;
        sh:datatype xsd:decimal ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:minInclusive 0 ;
        sh:message "Measure values must be non-negative decimals" ;
    ] ;

    # Unit must be defined
    sh:property [
        sh:path vf:hasUnit ;
        sh:class vf:Unit ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:message "Measure values must have exactly one unit" ;
    ] .
```

### Economic Event Validation

**Transaction Integrity Constraints**:
```turtle
ex:EconomicEventShape a sh:NodeShape ;
    sh:targetClass vf:EconomicEvent ;

    # Action must be valid
    sh:property [
        sh:path vf:action ;
        sh:nodeKind sh:IRI ;
        sh:in ( vf:produce vf:consume vf:transfer vf:move vf:raise vf:lower ) ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:message "Economic events must have exactly one valid action" ;
    ] ;

    # Timestamp validation
    sh:property [
        sh:path vf:hasPointInTime ;
        sh:datatype xsd:dateTime ;
        sh:maxCount 1 ;
        sh:message "Point in time must be a valid dateTime with at most one value" ;
    ] ;

    # Resource reference
    sh:property [
        sh:path vf:resourceInventoriedAs ;
        sh:class vf:EconomicResource ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:message "Economic events must reference exactly one economic resource" ;
    ] ;

    # Provider and receiver cannot be the same
    sh:sparql [
        sh:message "Provider and receiver must be different agents" ;
        sh:prefixes vf: ;
        sh:select """
            SELECT $this ?provider ?receiver
            WHERE {
                $this vf:provider ?provider ;
                     vf:receiver ?receiver .
                FILTER (?provider = ?receiver)
            }
        """ ;
    ] .
```

## Advanced SHACL Patterns

### Cross-Property Validation

**Supply Chain Consistency**:
```turtle
ex:SupplyChainShape a sh:NodeShape ;
    sh:targetSubjectsOf vf:hasBeginning ;

    # End must be after beginning
    sh:sparql [
        sh:message "Process end time must be after start time" ;
        sh:prefixes vf: xsd: ;
        sh:select """
            SELECT $this ?start ?end
            WHERE {
                $this vf:hasBeginning ?startEvent ;
                     vf:hasEnd ?endEvent .
                ?startEvent vf:hasPointInTime ?start .
                ?endEvent vf:hasPointInTime ?end .
                FILTER (?end <= ?start)
            }
        """ ;
    ] ;

    # Resource balance validation
    sh:sparql [
        sh:message "Input resources must balance with output resources" ;
        sh:prefixes vf: ;
        sh:select """
            SELECT $this ?processName ?imbalance
            WHERE {
                $this a vf:Process ;
                     vf:name ?processName .

                {
                    SELECT $this (SUM(?inputValue) AS ?totalInput)
                    WHERE {
                        $this vf:inputs ?input .
                        ?input vf:resourceQuantity ?inputQuantity .
                        ?inputQuantity vf:hasNumericalValue ?inputValue .
                    }
                    GROUP BY $this
                }

                {
                    SELECT $this (SUM(?outputValue) AS ?totalOutput)
                    WHERE {
                        $this vf:outputs ?output .
                        ?output vf:resourceQuantity ?outputQuantity .
                        ?outputQuantity vf:hasNumericalValue ?outputValue .
                    }
                    GROUP BY $this
                }

                BIND(?totalOutput - ?totalInput AS ?imbalance)
                FILTER(ABS(?imbalance) > 0.01)
            }
        """ ;
    ] .
```

### [[agent|Agent]] Capability Validation

**Agent Qualification Constraints**:
```turtle
ex:AgentShape a sh:NodeShape ;
    sh:targetClass vf:Agent ;

    # Contact information validation
    sh:property [
        sh:path schema:email ;
        sh:datatype xsd:string ;
        sh:pattern "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" ;
        sh:message "Email must be a valid email address" ;
    ] ;

    # Capability validation for producers
    sh:property [
        sh:path vf:hasCapability ;
        sh:node ex:CapabilityShape ;
        sh:minCount 0 ;
        sh:message "Agent capabilities must follow Capability shape" ;
    ] ;

    # Producer-specific constraints
    sh:rule [
        a sh:TripleRule ;
        sh:subject sh:this ;
        sh:predicate rdf:type ;
        sh:object vf:Producer ;
        sh:condition [
            sh:property [
                sh:path vf:produces ;
                sh:minCount 1 ;
                sh:message "Producers must produce at least one resource" ;
            ]
        ] ;
    ] .
```

### Capability Validation

**Specialized Capability Constraints**:
```turtle
ex:CapabilityShape a sh:NodeShape ;
    sh:targetClass vf:Capability ;

    # Must be classified with a specific type
    sh:property [
        sh:path vf:resourceClassifiedAs ;
        sh:nodeKind sh:IRI ;
        sh:minCount 1 ;
        sh:sh:maxCount 1 ;
        sh:message "Capabilities must be classified with exactly one resource type" ;
    ] ;

    # Certification requirements
    sh:property [
        sh:path ex:hasCertification ;
        sh:node ex:CertificationShape ;
        sh:minCount 0 ;
        sh:message "Certifications must follow Certification shape" ;
    ] ;

    # Geographic scope
    sh:property [
        sh:path ex:hasServiceArea ;
        sh:datatype xsd:string ;
        sh:maxLength 200 ;
        sh:message "Service area must be specified and under 200 characters" ;
    ] .
```

## Integration with [[governance-and-community|Governance]] Systems

### Regulatory Compliance Validation

**Organizational Compliance Shapes**:
```turtle
ex:ComplianceShape a sh:NodeShape ;
    sh:targetClass vf:Agent ;

    # Organic certification requirements
    sh:sparql [
        sh:message "Organic producers must have valid organic certification" ;
        sh:prefixes vf: ex: ;
        sh:select """
            SELECT $this ?agentName
            WHERE {
                $this a vf:Agent ;
                     schema:name ?agentName ;
                     vf:produces ?resource .

                ?resource vf:classifiedAs ex:OrganicProduct .

                FILTER NOT EXISTS {
                    $this ex:hasCertification ?cert .
                    ?cert ex:certificationType ex:OrganicCertification ;
                         ex:validUntil ?expiry .
                    FILTER(?expiry > NOW())
                }
            }
        """ ;
    ] ;

    # Production limit enforcement
    sh:sparql [
        sh:message "Production limits exceeded for regulated products" ;
        sh:prefixes vf: ex: ;
        sh:select """
            SELECT $this ?agentName ?productType ?count
            WHERE {
                $this a vf:Agent ;
                     schema:name ?agentName .

                {
                    SELECT $this ?productType (COUNT(?resource) AS ?count)
                    WHERE {
                        $this vf:produces ?resource .
                        ?resource vf:classifiedAs ?productType .
                        ?productType ex:productionLimit ?limit .
                    }
                    GROUP BY $this ?productType
                    HAVING (COUNT(?resource) > ?limit)
                }
            }
        """ ;
    ] .
```

### Data Quality Monitoring

**Automated Quality Assurance**:
```turtle
ex:DataQualityShape a sh:NodeShape ;

    # Detect duplicate tracking identifiers
    sh:sparql [
        sh:severity sh:Warning ;
        sh:message "Duplicate tracking identifiers found" ;
        sh:prefixes vf: ;
        sh:select """
            SELECT ?trackingId ?count
            WHERE {
                {
                    SELECT ?trackingId (COUNT(?resource) AS ?count)
                    WHERE {
                        ?resource a vf:EconomicResource ;
                                 vf:trackingIdentifier ?trackingId .
                    }
                    GROUP BY ?trackingId
                    HAVING (COUNT(?resource) > 1)
                }
            }
        """ ;
    ] ;

    # Identify orphaned resources (no accountable agent)
    sh:sparql [
        sh:severity sh:Warning ;
        sh:message "Found economic resources without accountable agents" ;
        sh:prefixes vf: ;
        sh:select """
            SELECT $this ?resourceName
            WHERE {
                $this a vf:EconomicResource ;
                     schema:name ?resourceName .
                FILTER NOT EXISTS {
                    $this vf:primaryAccountable ?agent .
                    ?agent a vf:Agent .
                }
            }
        """ ;
    ] .
```

## Validation Reports and Results

### Understanding Validation Output

SHACL validation produces standardized reports that can be processed automatically:

```turtle
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix ex: <http://example.org/validation/> .

ex:ValidationReport a sh:ValidationReport ;
    sh:conforms false ;
    sh:result [
        a sh:ValidationResult ;
        sh:focusNode ex:InvalidResource ;
        sh:resultSeverity sh:Violation ;
        sh:sourceConstraintComponent sh:MinCountConstraintComponent ;
        sh:sourceShape ex:EconomicResourceShape ;
        sh:value "Invalid Resource Data" ;
        sh:message "Economic resources must have exactly one primary accountable agent"
    ] .
```

### Integration with Data Pipelines

**Automated Validation Workflow**:
```python
from rdflib import Graph, Namespace
from pyshacl import validate

def validate_economic_data(data_graph_path, shapes_graph_path):
    """Validate economic data against SHACL shapes"""

    # Load data and shapes
    data_graph = Graph()
    data_graph.parse(data_graph_path)

    shapes_graph = Graph()
    shapes_graph.parse(shapes_graph_path)

    # Perform validation
    conforms, results_graph = validate(
        data_graph,
        shacl_graph=shapes_graph,
        inference='rdfs',
        abort_on_first=False,
        meta_shacl=True
    )

    if not conforms:
        # Process validation results
        violations = extract_violations(results_graph)
        for violation in violations:
            log_validation_error(violation)
            trigger_data_quality_alert(violation)

    return conforms, results_graph

def extract_violations(results_graph):
    """Extract and categorize validation violations"""
    violations = []

    for result in results_graph.subjects(RDF.type, SH.ValidationResult):
        if (result, SH.resultSeverity, SH.Violation) in results_graph:
            violation = {
                'focus_node': str(results_graph.value(result, SH.focusNode)),
                'severity': str(results_graph.value(result, SH.resultSeverity)),
                'message': str(results_graph.value(result, SH.message)),
                'constraint': str(results_graph.value(result, SH.sourceConstraintComponent))
            }
            violations.append(violation)

    return violations
```

## Performance and Scalability

### Optimization Strategies

1. **Shape organization**: Group related constraints into logical shape modules
2. **Selective targeting**: Use precise target definitions to minimize validation scope
3. **Incremental validation**: Validate only changed portions of data
4. **Caching**: Cache validation results for frequently validated data

### Large Dataset Validation

```turtle
# Optimized shape for batch validation
ex:BatchValidationShape a sh:NodeShape ;
    sh:targetObjectsOf vf:currentQuantity ;
    sh:deactivated true ;  # Disable for initial loading

    # Enable validation selectively
    sh:rule [
        a sh:ActivationRule ;
        sh:condition [
            sh:property [
                sh:path ex:validationEnabled ;
                sh:hasValue true
            ]
        ]
    ] .
```

## Implementation Considerations

### Tool Support
- **Apache Jena**: SHACL engine with full W3C compliance
- **GraphDB**: Enterprise SHACL validation with performance optimization
- **TopBraid**: Commercial SHACL implementation with advanced features
- **PySHACL**: Python library for SHACL validation

### Integration Patterns
1. **Real-time validation**: Validate data on entry/update
2. **Batch validation**: Periodic validation of entire datasets
3. **Incremental validation**: Validate only changed data
4. **Validation pipelines**: Integrate with ETL processes

## Best Practices

### Shape Design
1. **Modular shapes**: Organize constraints into reusable modules
2. **Clear messages**: Provide meaningful error messages for violations
3. **Appropriate severity**: Use Warning vs Violation appropriately
4. **Documentation**: Include human-readable descriptions for complex rules

### Performance Optimization
1. **Target specificity**: Use precise targeting to minimize validation overhead
2. **Constraint ordering**: Place fast constraints before expensive ones
3. **Avoid recursion**: Be careful with recursive constraint definitions
4. **Batch processing**: Validate multiple nodes together when possible

### Maintenance
1. **Version control**: Track changes to shapes alongside data
2. **Testing**: Validate shapes themselves with test data
3. **Monitoring**: Track validation performance and error patterns
4. **Evolution**: Plan for schema evolution and migration

## Related Semantic Web Technologies

### [[rdf|Resource Description Framework]]
The foundational data model that SHACL validates, providing the triple-based structure for representing interconnected knowledge that needs quality assurance.

### [[json-ld|JSON-LD]]
Web-friendly serialization format that can be validated using SHACL to ensure API data quality and compliance with defined schemas.

### [[sparql|SPARQL]]
Query language that can be embedded within SHACL constraints for complex validation logic and can also query SHACL validation reports.

### Integration with Garden Systems
- [[valueflows|Valueflows]]: Economic transaction validation and supply chain integrity checking
- [[agent|Agent]] capability validation and qualification certification
- [[governance-and-community|Governance]]: Regulatory compliance and rule enforcement

### Advanced Validation Patterns
- [[data-quality|Data Quality]]: Automated quality monitoring and anomaly detection
- [[semantic-web/index|Semantic Web Overview]]: Comprehensive validation ecosystem understanding
- [[knowledge-graphs|Knowledge Graphs]]: Constraint validation in large-scale reasoning systems

SHACL provides a powerful, standardized framework for ensuring data quality and consistency in RDF-based systems, making it essential for production semantic web applications, especially those handling economic and governance data where integrity and compliance are critical.