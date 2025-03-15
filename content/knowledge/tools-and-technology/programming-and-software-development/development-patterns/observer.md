---
title: Observer Pattern
description: A design pattern that defines a one-to-many dependency between objects, enabling automatic notification of state changes
tags:
  - programming
  - typescript
  - patterns
  - event-driven
  - design-patterns
  - functional-programming
related pages:
  - "[[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]]"
---

## Overview

The Observer pattern is a fundamental behavioral design pattern that establishes a one-to-many dependency between objects. It allows multiple observer objects to be notified automatically when the state of a subject object changes, promoting loose coupling and dynamic interaction between components.

## Key Characteristics

- **Decoupled Communication**: Subjects and observers are loosely connected
- **Dynamic Subscription**: Observers can be added or removed at runtime
- **Event-Driven**: Enables reactive programming paradigms
- **Scalable Notification**: Multiple observers can react to a single subject's state change

## Comparison with Event Bus Pattern

While the Observer pattern and [[event-bus|Event Bus pattern]] share similarities in promoting decoupled communication, they differ in scope and implementation:

### Observer Pattern

- Typically involves direct object-to-object relationships
- Often used for state change notifications
- More focused on individual object interactions

### Event Bus Pattern

- Provides a centralized event dispatching mechanism
- Supports more complex, many-to-many communication
- Offers a more generalized approach to event handling

## Implementation Approaches

### Functional Approach

```typescript
type Observer<T> = (data: T) => void

class Subject<T> {
  private observers: Set<Observer<T>> = new Set()

  subscribe(observer: Observer<T>): () => void {
    this.observers.add(observer)
    return () => this.observers.delete(observer)
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer(data))
  }
}

// Usage example
const dataSubject = new Subject<string>()

const logObserver = (data: string) => console.log(`Received: ${data}`)
const unsubscribe = dataSubject.subscribe(logObserver)

dataSubject.notify("Hello, Observers!")
unsubscribe() // Stop receiving notifications
```

## Practical Applications

- User interface state management
- Event logging systems
- Reactive programming
- Monitoring and notification systems
- Publish-subscribe architectures

## Potential Challenges

- **Performance**: Multiple observer notifications can impact system performance
- **Complexity**: Can lead to intricate dependency graphs
- **Memory Management**: Requires careful unsubscription to prevent memory leaks

## Conclusion

The Observer pattern provides a powerful mechanism for creating dynamic, event-driven systems. By enabling objects to communicate without tight coupling, it supports more flexible and modular software architectures.
