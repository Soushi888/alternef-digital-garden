---
title: AI Protocols
date: 2026-03-03
description: Standardized interfaces and protocols that enable AI models to interact with external tools, systems, and other agents
aliases:
  - AI Integration Protocols
  - AI Interoperability
tags: ["artificial-intelligence", "protocols", "interoperability", "integration", "mcp"]

---

## Overview

As AI models become more capable, standardized protocols for connecting them to external tools and data sources become critical. These protocols define how models request information, execute actions, and coordinate with other systems, enabling AI to move beyond pure text generation into agentic workflows.

## Topics in This Section

### [[model-context-protocol|Model Context Protocol]]
MCP is an open standard developed by Anthropic that defines how AI models communicate with external tools and data sources. It uses a client-server architecture where AI hosts (like Claude Desktop) connect to MCP servers that expose tools, prompts, and resources. MCP standardizes what was previously ad-hoc tool-calling into a composable, discoverable interface.

## Key Concepts

- **Tool Calling**: AI models requesting execution of functions defined by external systems
- **Context Window Management**: Protocols for efficiently passing relevant context to models
- **Agent Orchestration**: How multiple AI agents coordinate to complete complex tasks
- **Structured Outputs**: Schemas that constrain AI output to machine-readable formats

## Related Topics

- [[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/index|Artificial Intelligence]]
- [[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/cognitive-approaches/index|Cognitive Approaches]]
- [[knowledge/governance-and-community/index|Governance and Community]]
