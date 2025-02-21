---
title: C4 Model for Software Architecture
description: A hierarchical approach to visualizing and documenting software architecture
tags:
  - software-architecture
  - modeling
  - documentation
related pages:
---

## Overview

The C4 model is a powerful and pragmatic approach to visualizing [[software architecture]] across multiple levels of abstraction. It provides a standardized method for creating architecture diagrams that are both comprehensive and easy to understand.

## Key Characteristics

1. **Hierarchical Abstractions**
   - Provides a set of hierarchical abstractions for software systems
   - Includes four primary levels of detail:
     - Context
     - Containers
     - Components
     - Code

2. **Diagram Types**
   - System Context Diagram
   - Container Diagram
   - Component Diagram
   - Code Diagram

3. **Design Principles**
   - Notation Independent
   - Tooling Independent
   - Supports multiple diagramming tools and techniques

## Abstraction Levels

### 1. Context Level

- Provides a high-level view of the entire system
- Shows system interactions with users and external systems
- Focuses on the big picture and system boundaries

### 2. Container Level

- Breaks down the system into major technology containers
- Shows how different parts of the system are structured
- Illustrates communication between containers

### 3. Component Level

- Zooms into individual containers
- Details major structural building blocks
- Shows interactions between components within a container

### 4. Code Level

- Most detailed view of the architecture
- Represents how a component is implemented
- Can use UML or other code-level diagramming techniques

## Benefits

- Improves communication about software architecture
- Provides a consistent, standardized approach to documentation
- Supports different levels of technical understanding
- Facilitates better design and system comprehension

## Related Concepts

- [[knowledge/tools-and-technology/programming-and-software-development/software-architecture/index|Software Architecture]]
- [[system-design]]
- [[technical-documentation]]

## Resources

- Official Website: [C4 Model](https://c4model.com/)
- Creator: Simon Brown
