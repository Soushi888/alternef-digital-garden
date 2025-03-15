---
title: Event Bus Building Pattern
description: A design pattern for implementing event-driven architectures using TypeScript and Rust
tags:
  - programming
  - patterns
  - typescript
  - rust
  - design-patterns
  - event-driven
related pages:
  - "[[functional-programming|Functional Programming]]"
  - "[[reactive-programming|Reactive Programming]]"
  - "[[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|Development Patterns]]"
---

## Overview

The Event Bus pattern is a powerful design pattern that facilitates decoupled communication between components through a centralized event dispatcher. This pattern is closely related to the [[observer|Observer pattern]], but provides a more generalized approach to event handling.

While commonly used in [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/index|distributed systems]], the Event Bus pattern is versatile and valuable in various application architectures:

- Simple user interfaces
- Complex microservices architectures
- Event-driven applications
- Modular software design

## Implementation Approaches

### TypeScript Implementation

The TypeScript implementation demonstrates a type-safe, functional approach to building an event bus. Key design principles include:

- **Generic Type Handling**: Uses TypeScript's powerful type system to ensure type safety across different event types
- **Immutable State Management**: Leverages `Map` and `Set` for efficient, immutable event handler storage
- **Higher-Order Functions**: Provides `on`, `off`, and `emit` methods that return functions for dynamic event management

```typescript
// Define core types for type-safe event handling
type EventHandler<T> = (payload: T) => void
type EventMap = Record<string, unknown>

// Strongly typed EventBus interface with generic type constraints
interface EventBus<T extends EventMap> {
  on: <K extends keyof T>(event: K, handler: EventHandler<T[K]>) => () => void
  off: <K extends keyof T>(event: K, handler: EventHandler<T[K]>) => void
  emit: <K extends keyof T>(event: K, payload: T[K]) => void
}

// Functional event bus creator with pure function composition
const createEventBus = <T extends EventMap>(): EventBus<T> => {
  // Use Map and Set for efficient, immutable handler storage
  const handlers = new Map<keyof T, Set<EventHandler<any>>>()

  // `on` method: Adds an event handler and returns a cleanup function
  const on = <K extends keyof T>(
    event: K,
    handler: EventHandler<T[K]>
  ): (() => void) => {
    // Retrieve or create a new set of handlers for the event
    const eventHandlers = handlers.get(event) ?? new Set()
    handlers.set(event, eventHandlers.add(handler))
    
    // Return a cleanup function that removes the specific handler
    return () => off(event, handler)
  }

  // `off` method: Removes a specific handler from an event
  const off = <K extends keyof T>(
    event: K,
    handler: EventHandler<T[K]>
  ): void => {
    const eventHandlers = handlers.get(event)
    eventHandlers?.delete(handler)
    
    // Clean up the event if no handlers remain
    if (eventHandlers?.size === 0) {
      handlers.delete(event)
    }
  }

  // `emit` method: Triggers all handlers for a specific event
  const emit = <K extends keyof T>(event: K, payload: T[K]): void => {
    handlers.get(event)?.forEach(handler => handler(payload))
  }

  return { on, off, emit }
}

// Usage demonstrates type-safe event handling
interface AppEvents {
  'user:login': { userId: string }
  'data:update': { resourceId: string; data: unknown }
}

const bus = createEventBus<AppEvents>()

// Explicit handler with type inference
const handler = ({ userId }: AppEvents['user:login']) => 
  console.log(`User ${userId} logged in`)

// Event bus operations with compile-time type checking
bus.on('user:login', handler)
bus.emit('user:login', { userId: 'user-123' })
bus.off('user:login', handler) // Clean up subscription
```

### Rust Implementation

The Rust implementation showcases advanced type-safe event bus design with:

- **Enum-Based Event Modeling**: Uses Rust's powerful enum system to create type-safe, structured events
- **Dynamic Event Handling**: Leverages trait objects for flexible event type management
- **Functional Event Registration**: Provides methods for adding and removing event handlers
- **Pattern Matching**: Enables sophisticated event processing through Rust's match expressions

```rust
use std::collections::HashMap;
use std::any::Any;

// Type aliases for flexible, type-erased event handling
type EventHandler<T> = Box<dyn Fn(T) + Send + Sync>;
type EventMap = HashMap<String, Box<dyn Any + Send>>;

// Event Bus struct with thread-safe, concurrent handler storage
struct EventBus {
    handlers: HashMap<String, Vec<EventHandler<AppEvent>>>,
}

impl EventBus {
    // Constructor with thread-safe initialization
    fn new() -> Self {
        EventBus {
            handlers: HashMap::new(),
        }
    }

    // `on` method: Adds an event handler with type-safe, dynamic registration
    fn on<T: 'static + Clone + Send>(
        &mut self,
        event: &str,
        handler: impl Fn(AppEvent) + Send + Sync + 'static,
    ) {
        // Safely insert handler into event-specific collection
        self.handlers
            .entry(event.to_string())
            .or_insert_with(Vec::new)
            .push(Box::new(handler));
    }

    // `off` method: Explicitly removes a handler from an event
    fn off<T: 'static + Clone + Send>(
        &mut self,
        event: &str,
        handler: EventHandler<T>,
    ) {
        if let Some(handlers) = self.handlers.get_mut(event) {
            // Remove handler using pointer comparison
            handlers.retain(|h| !h.as_ref().as_ptr().eq(&handler.as_ref().as_ptr()));
        }
    }

    // `emit` method: Triggers all handlers for a specific event
    fn emit(&self, event: &str, payload: AppEvent) {
        if let Some(handlers) = self.handlers.get(event) {
            for handler in handlers {
                handler(payload.clone());
            }
        }
    }
}

// Usage example demonstrating simplified event handling
#[tokio::main]
async fn main() {
    // Define a strongly typed event enum
    #[derive(Clone, Debug)]
    enum AppEvent {
        UserLogin {
            user_id: String,
            timestamp: chrono::DateTime<chrono::Utc>,
        },
        DataUpdate {
            resource_id: String,
            data: Vec<u8>,
            updated_at: chrono::DateTime<chrono::Utc>,
        },
        SystemAlert {
            severity: AlertLevel,
            message: String,
        }
    }

    // Enum for alert severity levels
    #[derive(Clone, Debug, PartialEq)]
    enum AlertLevel {
        Info,
        Warning,
        Critical,
    }

    // Create an event bus for AppEvent
    let mut bus = EventBus::new();

    // Handler for UserLogin events
    let login_handler = |event: AppEvent| {
        match event {
            AppEvent::UserLogin { user_id, timestamp } => {
                println!(
                    "User {} logged in at {}",
                    user_id,
                    timestamp
                );
            },
            _ => println!("Unexpected event type"),
        }
    };

    // Handler for DataUpdate events
    let update_handler = |event: AppEvent| {
        match event {
            AppEvent::DataUpdate { resource_id, data, updated_at } => {
                println!(
                    "Resource {} updated at {} with {} bytes",
                    resource_id,
                    updated_at,
                    data.len()
                );
            },
            _ => println!("Unexpected event type"),
        }
    };

    // Handler for SystemAlert events
    let alert_handler = |event: AppEvent| {
        match event {
            AppEvent::SystemAlert { severity, message } => {
                match severity {
                    AlertLevel::Critical => eprintln!("CRITICAL ALERT: {}", message),
                    AlertLevel::Warning => println!("WARNING: {}", message),
                    AlertLevel::Info => println!("INFO: {}", message),
                }
            },
            _ => println!("Unexpected event type"),
        }
    };

    // Register handlers for different event types
    bus.on("user:login", login_handler);
    bus.on("data:update", update_handler);
    bus.on("system:alert", alert_handler);

    // Emit various events with full type safety
    bus.emit(
        "user:login", 
        AppEvent::UserLogin {
            user_id: "user-123".to_string(),
            timestamp: chrono::Utc::now(),
        }
    );

    bus.emit(
        "data:update",
        AppEvent::DataUpdate {
            resource_id: "resource-456".to_string(),
            data: vec![1, 2, 3, 4, 5],
            updated_at: chrono::Utc::now(),
        }
    );

    bus.emit(
        "system:alert",
        AppEvent::SystemAlert {
            severity: AlertLevel::Warning,
            message: "Disk space running low".to_string(),
        }
    );
}
```

## Comparative Analysis

### TypeScript vs Rust Implementations

Both implementations showcase similar core principles while leveraging language-specific features. The approach is reminiscent of functional programming techniques found in [[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|other design patterns]], emphasizing immutability and pure functions.

**TypeScript**:

- Utilizes generics for type-safe event handling
- Leverages structural typing
- Provides runtime type inference
- Lightweight and dynamic

**Rust**:

- Provides compile-time type safety
- Uses enum-based event modeling
- Supports advanced type erasure
- Offers memory safety guarantees

## Practical Considerations

### When to Use Event Bus Pattern

The Event Bus pattern is particularly useful in scenarios that align with [[knowledge/tools-and-technology/infrastructure-and-networks/networking/distributed-systems/index|distributed system design principles]]:

- When components should remain loosely coupled
- In systems requiring dynamic communication
- For implementing plugin or extension architectures
- When you need to decouple event producers from consumers

## Potential Challenges

- **Memory Management**: Careful handler lifecycle management
- **Performance**: Event dispatch overhead in high-frequency scenarios
- **Complexity**: Can introduce indirection and make flow harder to trace
- **Error Handling**: Requires robust error boundary implementation

## Key Benefits

- **Decoupling**: Components communicate without direct dependencies
- **Type Safety**: Both implementations leverage their respective type systems
- **Functional Approach**: Pure functions and immutable data structures
- **Memory Safety**: Automatic cleanup through unsubscribe mechanisms

## Common Use Cases

- Microservices communication
- UI component interactions
- Application state management
- Cross-module notifications
- Plugin architectures

## Considerations

- **Memory Management**: Always unsubscribe to prevent memory leaks
- **Type Safety**: Use strongly typed events and payloads
- **Performance**: Consider the overhead of event dispatch in high-frequency scenarios
- **Error Handling**: Implement proper error boundaries for event handlers

## Conclusion

The Event Bus pattern represents a flexible approach to managing component interactions, promoting modular and extensible software design. By abstracting communication mechanisms, it enables more maintainable and scalable applications across various programming paradigms, echoing the core principles of [[knowledge/tools-and-technology/programming-and-software-development/development-patterns/index|advanced software design patterns]].
