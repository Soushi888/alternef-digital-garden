---
title: Domain-Driven Design (DDD)
description: A software development approach that focuses on modeling software to match a domain according to input from domain experts.
tags:
  - programming-paradigm
  - domain-driven-design
---

_A software development approach that focuses on modeling software to match a domain according to input from domain experts._

## Overview

Domain-Driven Design (DDD) is a software development philosophy and collection of patterns for solving complex problems by connecting the implementation to an evolving model of the core business concepts. It emphasizes collaboration between technical and domain experts to iteratively refine a conceptual model that addresses particular domain problems.

## Core Concepts

### The Domain

The sphere of knowledge and activity around which the application logic revolves. It's the subject area to which the user applies the program.

### Ubiquitous Language

A common, rigorous language between developers and users that is structured around the domain model and used by all team members to connect all activities with the software.

### Bounded Context

The delimited applicability of a particular model. Within this boundary, all terms and phrases have specific meaning, and the model reflects the language with precision.

### Domain Model

An object model of the domain that incorporates both behavior and data. It represents the concepts, rules, and logic of the business domain.

## Key Building Blocks

### Entities

Objects that have a distinct identity that runs through time and different representations. They are defined primarily by their identity rather than their attributes.

```typescript
class User {
  constructor(
    private readonly id: UserId,
    private email: Email,
    private name: UserName,
  ) {}

  changeEmail(newEmail: Email): void {
    // Business logic for email change
    this.email = newEmail
  }
}
```

### Value Objects

Objects that describe characteristics of things but have no conceptual identity. They are immutable and defined entirely by their attributes.

```typescript
class Email {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid email format")
    }
  }

  private isValid(email: string): boolean {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  toString(): string {
    return this.value
  }
}
```

### Aggregates

A cluster of domain objects that can be treated as a single unit. An aggregate will have one of its component objects be the aggregate root.

### Repositories

Mechanisms for encapsulating the logic needed to obtain object references. They centralize common access logic and provide better testability.

### Domain Services

Operations that don't naturally fit within entities or value objects. They encapsulate domain logic that involves multiple domain objects.

### Domain Events

Something that happened in the domain that domain experts care about. They represent important business events that occurred.

## Strategic Design Patterns

### Bounded Context Mapping

Identifying and defining the boundaries where a particular domain model applies, and how different bounded contexts relate to each other.

### Context Map

A visual representation of the system's bounded contexts and the relationships between them.

### Shared Kernel

A small common model shared by two or more teams, but without duplicating code.

### Customer-Supplier

A relationship where the downstream context is a customer of the upstream context.

### Conformist

The downstream context conforms to the model of the upstream context.

### Anti-Corruption Layer

A protective layer that translates between two different models, preventing the corruption of the downstream model.

## Tactical Design Patterns

### Layered Architecture

Organizing code into layers (Presentation, Application, Domain, Infrastructure) with dependencies pointing downward.

### Hexagonal Architecture

Isolating the core business logic from external concerns through ports and adapters.

### CQRS (Command Query Responsibility Segregation)

Separating read and write operations, often with different models optimized for each.

### Event Sourcing

Storing all changes to application state as a sequence of events, rather than just the current state.

## Benefits

### Business Alignment

- Software model closely reflects business reality
- Improved communication between technical and business teams
- Reduced translation errors between requirements and implementation

### Code Quality

- Clear separation of concerns
- Testable business logic
- Maintainable and expressive code

### Strategic Focus

- Identifies core vs. supporting domains
- Guides resource allocation and architectural decisions
- Facilitates modular system design

## Challenges and Considerations

### Complexity

- Can introduce significant overhead for simple domains
- Requires deep domain understanding
- Learning curve for teams new to DDD concepts

### Cultural Requirements

- Needs close collaboration with domain experts
- Requires investment in domain knowledge
- May face resistance from stakeholders unfamiliar with the approach

### Time Investment

- Upfront modeling and analysis time
- Iterative refinement process
- Ongoing maintenance of domain model

## When to Use DDD

### Good Candidates

- Complex business domains with rich logic
- Applications where business rules change frequently
- Projects with available domain experts
- Long-term, strategic applications

### Poor Candidates

- Simple CRUD applications
- Technical utilities without business logic
- Projects with no access to domain expertise
- Short-term or prototype applications

## DDD and Other Paradigms

### Functional Programming

- Pure functions for domain logic
- Immutable value objects
- Function composition for complex behaviors

### Object-Oriented Programming

- Natural fit for entities and aggregates
- Encapsulation of business rules
- Polymorphism for domain variations

### [Mystical Oriented Programming](mystical-oriented-programming.md)

- Business domains as sacred territories
- Domain experts as wisdom keepers
- Ubiquitous language as sacred vocabulary
- Bounded contexts as ritual spaces

## Tools and Frameworks

### Modeling Tools

- Event Storming workshops
- Domain storytelling techniques
- Context mapping exercises

### Implementation Support

- DDD libraries (Java: Spring, C#: .NET, TypeScript: various)
- Event sourcing frameworks
- CQRS implementations

## Further Reading

- **Books**: "Domain-Driven Design" by Eric Evans, "Implementing Domain-Driven Design" by Vaughn Vernon
- **Workshops**: Event Storming, Domain Storytelling
- **Communities**: DDD Community, Domain-Driven Design Europa

---

_"The heart of software is its ability to solve domain-related problems for its user. All other features, vital though they may be, support this basic purpose."_ - Eric Evans
