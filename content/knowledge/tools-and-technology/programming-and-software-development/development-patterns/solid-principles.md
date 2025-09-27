---
title: SOLID Principles
description: Comprehensive guide to the five SOLID principles of object-oriented design for creating maintainable, scalable software
tags:
  - solid
  - object-oriented-design
  - software-architecture
  - design-principles
  - programming-patterns
aliases:
  - SOLID Design Principles
  - Object-Oriented Design Principles
  - Software Design Principles
related pages:
  - "[[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]]"
  - "[[knowledge/tools-and-technology/programming-and-software-development/cqrs-pattern|CQRS Pattern]]"
created: 2025-09-25
modified: 2025-09-25
draft: false
---

# SOLID Principles

SOLID is an acronym for five design principles in object-oriented programming that help developers create maintainable, scalable, and robust software systems. These principles were introduced by Robert C. Martin (Uncle Bob) and have become fundamental guidelines for writing clean, modular code.

## Overview

The SOLID principles are:

1. **S** - Single Responsibility Principle (SRP)
2. **O** - Open/Closed Principle (OCP)
3. **L** - Liskov Substitution Principle (LSP)
4. **I** - Interface Segregation Principle (ISP)
5. **D** - Dependency Inversion Principle (DIP)

## 1. Single Responsibility Principle (SRP)

### Definition
> A class should have only one reason to change.

### Explanation
Each module or class should be responsible for a single part of the functionality provided by the software. This principle focuses on separating concerns to make code more maintainable and easier to understand.

### Benefits
- **Maintainability**: Changes to one responsibility don't affect others
- **Readability**: Classes are focused and easier to understand
- **Testability**: Smaller, focused classes are easier to test
- **Reusability**: Single-responsibility components are more reusable

### Example

```typescript
// ❌ Violating SRP - Multiple responsibilities
class User {
  private name: string;
  private email: string;
  
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
  
  // Business logic
  getName(): string {
    return this.name;
  }
  
  // Data persistence
  saveToDatabase(): void {
    // Database connection and save logic
    console.log(`Saving user ${this.name} to database`);
  }
  
  // Email functionality
  sendEmail(message: string): void {
    // Email sending logic
    console.log(`Sending email to ${this.email}: ${message}`);
  }
}

// ✅ Following SRP - Separate responsibilities
class User {
  private name: string;
  private email: string;
  
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
  
  getName(): string {
    return this.name;
  }
  
  getEmail(): string {
    return this.email;
  }
}

class UserRepository {
  save(user: User): void {
    console.log(`Saving user ${user.getName()} to database`);
  }
}

class EmailService {
  send(email: string, message: string): void {
    console.log(`Sending email to ${email}: ${message}`);
  }
}
```

## 2. Open/Closed Principle (OCP)

### Definition
> Software entities (classes, modules, functions) should be open for extension but closed for modification.

### Explanation
You should be able to extend a module's behavior without modifying its source code. This is typically achieved through abstractions like interfaces, abstract classes, or inheritance.

### Benefits
- **Stability**: Existing code doesn't change, reducing risk of bugs
- **Flexibility**: Easy to add new features without touching existing code
- **Maintainability**: Less regression testing needed
- **Scalability**: System can grow with minimal changes to existing components

### Example

```typescript
// ❌ Violating OCP - Requires modification for new shapes
class AreaCalculator {
  calculateRectangleArea(rectangle: { width: number; height: number }): number {
    return rectangle.width * rectangle.height;
  }
  
  calculateCircleArea(circle: { radius: number }): number {
    return Math.PI * circle.radius * circle.radius;
  }
  
  // Need to modify this class for every new shape
  calculateTriangleArea(triangle: { base: number; height: number }): number {
    return 0.5 * triangle.base * triangle.height;
  }
}

// ✅ Following OCP - Extensible through abstraction
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  
  area(): number {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  constructor(private radius: number) {}
  
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Triangle implements Shape {
  constructor(private base: number, private height: number) {}
  
  area(): number {
    return 0.5 * this.base * this.height;
  }
}

class AreaCalculator {
  calculateTotalArea(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => total + shape.area(), 0);
  }
}

// New shapes can be added without modifying AreaCalculator
class Square implements Shape {
  constructor(private side: number) {}
  
  area(): number {
    return this.side * this.side;
  }
}
```

## 3. Liskov Substitution Principle (LSP)

### Definition
> Subtypes must be substitutable for their base types without altering the correctness of the program.

### Explanation
Objects of a superclass should be replaceable with objects of its subclasses without breaking the application. This requires that subclasses behave in a way that doesn't break expectations established by the superclass.

### Benefits
- **Reliability**: Subclasses can be safely used wherever the superclass is expected
- **Polymorphism**: Enables proper use of inheritance and interfaces
- **Code Reuse**: Safe to extend existing functionality
- **Testing**: Easier to mock and test using base types

### Example

```typescript
// ❌ Violating LSP - Rectangle and Square have different behaviors
class Rectangle {
  constructor(protected width: number, protected height: number) {}
  
  setWidth(width: number): void {
    this.width = width;
  }
  
  setHeight(height: number): void {
    this.height = height;
  }
  
  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }
  
  setWidth(width: number): void {
    this.width = width;
    this.height = width; // This violates the rectangle expectation
  }
  
  setHeight(height: number): void {
    this.height = height;
    this.width = height; // This violates the rectangle expectation
  }
}

// This code will behave unexpectedly with Square
function testRectangle(rectangle: Rectangle): void {
  rectangle.setWidth(5);
  rectangle.setHeight(10);
  console.log(`Expected area: 50, Actual area: ${rectangle.getArea()}`);
  // For Square: Expected area: 50, Actual area: 100 ❌
}

// ✅ Following LSP - Proper inheritance relationship
abstract class Shape {
  abstract getArea(): number;
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  
  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(private side: number) {
    super();
  }
  
  getArea(): number {
    return this.side * this.side;
  }
}

// Both Rectangle and Square can be used interchangeably
function printArea(shape: Shape): void {
  console.log(`Area: ${shape.getArea()}`);
}
```

## 4. Interface Segregation Principle (ISP)

### Definition
> Clients should not be forced to depend on interfaces they don't use.

### Explanation
Instead of one large interface, create smaller, more specific interfaces so that clients only need to know about the methods that are relevant to them.

### Benefits
- **Decoupling**: Reduces dependencies between components
- **Flexibility**: Clients only implement what they need
- **Maintainability**: Changes to one interface don't affect unrelated clients
- **Testability**: Smaller interfaces are easier to mock and test

### Example

```typescript
// ❌ Violating ISP - Large interface with unused methods
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
  code(): void;
}

class HumanWorker implements Worker {
  work(): void {
    console.log("Working...");
  }
  
  eat(): void {
    console.log("Eating...");
  }
  
  sleep(): void {
    console.log("Sleeping...");
  }
  
  code(): void {
    console.log("Coding...");
  }
}

class RobotWorker implements Worker {
  work(): void {
    console.log("Working...");
  }
  
  eat(): void {
    // Robots don't eat! But forced to implement
    throw new Error("Robots don't eat!");
  }
  
  sleep(): void {
    // Robots don't sleep! But forced to implement
    throw new Error("Robots don't sleep!");
  }
  
  code(): void {
    console.log("Coding...");
  }
}

// ✅ Following ISP - Small, focused interfaces
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

interface Codeable {
  code(): void;
}

class HumanWorker implements Workable, Eatable, Sleepable, Codeable {
  work(): void {
    console.log("Working...");
  }
  
  eat(): void {
    console.log("Eating...");
  }
  
  sleep(): void {
    console.log("Sleeping...");
  }
  
  code(): void {
    console.log("Coding...");
  }
}

class RobotWorker implements Workable, Codeable {
  work(): void {
    console.log("Working...");
  }
  
  code(): void {
    console.log("Coding...");
  }
}

// Client code only depends on needed interfaces
function makeWorkerWork(worker: Workable): void {
  worker.work();
}

function makeCoderCode(coder: Codeable): void {
  coder.code();
}
```

## 5. Dependency Inversion Principle (DIP)

### Definition
> High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

### Explanation
Instead of depending on concrete implementations, depend on abstractions (interfaces or abstract classes). This decouples components and makes the system more flexible and testable.

### Benefits
- **Decoupling**: Reduces tight coupling between components
- **Testability**: Easy to mock dependencies for unit testing
- **Flexibility**: Can swap implementations without changing high-level code
- **Maintainability**: Changes in low-level details don't affect high-level logic

### Example

```typescript
// ❌ Violating DIP - High-level module depends on low-level implementation
class EmailNotification {
  send(message: string): void {
    console.log(`Sending email: ${message}`);
    // Specific email sending logic
  }
}

class SMSNotification {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
    // Specific SMS sending logic
  }
}

class NotificationService {
  private emailNotification: EmailNotification;
  
  constructor() {
    this.emailNotification = new EmailNotification();
  }
  
  sendNotification(message: string): void {
    this.emailNotification.send(message);
  }
}

// ✅ Following DIP - Depend on abstractions
interface NotificationService {
  send(message: string): void;
}

class EmailNotification implements NotificationService {
  send(message: string): void {
    console.log(`Sending email: ${message}`);
    // Email sending implementation
  }
}

class SMSNotification implements NotificationService {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
    // SMS sending implementation
  }
}

class PushNotification implements NotificationService {
  send(message: string): void {
    console.log(`Sending push notification: ${message}`);
    // Push notification implementation
  }
}

class NotificationManager {
  private notificationService: NotificationService;
  
  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }
  
  sendNotification(message: string): void {
    this.notificationService.send(message);
  }
}

// Usage - Easy to swap implementations
const emailService = new NotificationManager(new EmailNotification());
const smsService = new NotificationManager(new SMSNotification());
const pushService = new NotificationManager(new PushNotification());
```

## Benefits of SOLID Principles

### Maintainability
- Code is easier to understand and modify
- Changes are localized and have minimal impact
- Clear separation of concerns

### Scalability
- System can grow without becoming unmanageable
- New features can be added with minimal changes to existing code
- Components are loosely coupled and highly cohesive

### Testability
- Dependencies can be easily mocked
- Small, focused units are easier to test
- Clear interfaces make integration testing simpler

### Reusability
- Single-responsibility components are more reusable
- Interfaces promote code sharing across different contexts
- Abstractions enable flexible composition

## Common SOLID Violations and Solutions

### 1. God Classes
**Problem**: Classes that do too many things
**Solution**: Break down into smaller, focused classes following SRP

### 2. Rigid Hierarchies
**Problem**: Deep inheritance chains that are hard to modify
**Solution**: Use composition over inheritance and follow OCP

### 3. Fragile Base Classes
**Problem**: Base classes that break when subclasses change
**Solution**: Follow LSP and design inheritance relationships carefully

### 4. Fat Interfaces
**Problem**: Interfaces with too many methods
**Solution**: Split into smaller, focused interfaces following ISP

### 5. Tight Coupling
**Problem**: Components that are hard to separate
**Solution**: Use dependency injection and abstractions following DIP

## SOLID in Modern Development

### Functional Programming
While SOLID originated in object-oriented programming, many principles apply to functional programming:
- **SRP**: Functions should have single responsibilities
- **OCP**: Function composition enables extension without modification
- **LSP**: Type systems ensure substitutability
- **ISP**: Small, focused function interfaces
- **DIP**: Higher-order functions and dependency injection

### Reactive Programming
- **SRP**: Streams and observers with focused responsibilities
- **OCP**: Extensible through operator composition
- **ISP**: Small, focused stream operations

### Microservices Architecture
- **SRP**: Each service has a single business responsibility
- **OCP**: Services can be extended without modifying existing ones
- **DIP**: Services communicate through well-defined interfaces

## Related Concepts

- [[knowledge/tools-and-technology/programming-and-software-development/cqrs-pattern|CQRS Pattern]] - Architectural pattern for separating read and write operations
- [[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]] - Other programming paradigms and patterns
- [[knowledge/tools-and-technology/programming-and-software-development/languages/javascript/functional-programming-with-fp-ts|Functional Programming]] - Alternative paradigm to object-oriented design

## References and Further Reading

- Robert C. Martin - "Clean Architecture: A Craftsman's Guide to Software Structure and Design"
- Robert C. Martin - "Agile Principles, Patterns, and Practices in C#"
- Martin Fowler - "Refactoring: Improving the Design of Existing Code"
- Gang of Four - "Design Patterns: Elements of Reusable Object-Oriented Software"