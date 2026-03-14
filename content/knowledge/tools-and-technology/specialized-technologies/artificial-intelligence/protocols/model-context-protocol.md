---
title: Model Context Protocol (MCP)
description: A standardized approach to managing context in AI-powered applications
aliases:
  - MCP
  - Model Context Protocol
tags: ["artificial-intelligence", "protocols", "interoperability"]
date: 2026-03-14

---

The Model Context Protocol (MCP) is an open standard released by Anthropic in November 2024, defining a universal interface for connecting AI assistants to external data sources and tools. Before MCP, every AI integration was bespoke: an AI coding assistant needed its own GitHub connector, its own file system access, its own database plugin, each built and maintained separately. MCP standardizes this interface. Any tool or data source that implements the MCP server specification can be used by any AI client that implements the MCP client specification. The protocol uses [[json-rpc|JSON-RPC]] over [[websockets|WebSockets]] or stdio as its transport layer, making it lightweight and compatible with existing infrastructure.

## Overview

The Model Context Protocol (MCP) is an innovative open standard designed to enable seamless integration between AI applications, data sources, and tools. It serves as a universal interface for managing and transmitting contextual information across different systems.

## Key Characteristics

### Purpose

- Standardize context transmission for AI applications
- Enable secure, two-way connections between data sources and AI tools
- Provide a flexible, extensible architecture for context management

### Architectural Principles

1. **Client-Server Model**
   - Allows bidirectional communication
   - Supports real-time state synchronization
   - Enables dynamic context updates

2. **Interoperability**
   - Acts like a "USB-C for AI applications"
   - Provides a consistent interface across different tools and platforms
   - Reduces integration complexity

## Technical Foundations

### Context Management

- Real-time state tracking
- Secure data transmission
- Adaptive context parsing
- Metadata-driven information exchange

### Use Cases

- AI-powered Integrated Development Environments (IDEs)
- Intelligent chat interfaces
- Custom AI workflow systems
- Cross-platform AI tool integration

## Implementation Considerations

### Design Patterns

- Functional programming approach
- Immutable state management
- Error-resilient communication
- Extensible plugin architecture

### Core Components

- Context tracking
- Metadata parsing
- State synchronization
- Error handling mechanisms

## Philosophical Implications

The Model Context Protocol represents a pivotal step in creating more intelligent, interconnected AI systems. By standardizing context management, it:

- Reduces friction in AI tool integration
- Promotes modular, composable AI architectures
- Enables more nuanced, context-aware AI interactions

## Future Potential

- Evolving standard for AI interoperability
- Potential for cross-platform AI experiences
- Simplified development of complex AI applications

## Garden Perspective

MCP's significance for the garden extends beyond AI coding assistants. The protocol defines how any AI system connects to arbitrary tool servers, including potentially [[holochain|Holochain]] hApps. A Holochain application could expose its DHT data through an MCP server, making it queryable by a locally-running [[llama|Llama]] instance via Ollama. The entire interaction stays local: an agent-centric application serving data to an agent-centric AI, neither of which routes through a corporate server. This is the composability that protocol-defined interfaces make possible: each component (Holochain hApp, local [[large-language-models|LLM]], local tools) exposes a standardized interface and combines freely without a platform intermediary.

The "USB-C for AI applications" framing in the existing spec is apt, but the deeper implication is sovereignty: when the standard is open and the components can run locally, you own the stack. GPT-connected-to-OpenAI's-tools is the opposite of this vision; Llama-connected-via-MCP-to-local-hApp is what the garden points toward.

## Related Concepts

- [[large-language-models|Large Language Models]]
- [[semantic-ai|Semantic AI]]
- [[json-rpc|JSON-RPC]]
- [[websockets|WebSockets]]
- [[llama|Llama]]
- [[holochain|Holochain]]
