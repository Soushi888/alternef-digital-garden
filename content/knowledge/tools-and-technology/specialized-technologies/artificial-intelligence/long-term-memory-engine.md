---
title: Long-Term Memory (LTM) Engine
description: An overview of the Long-Term Memory (LTM) engine used in Pieces for Developers.
tags:
  - ltm
  - pieces
  - developer-tools
  - ai-assistant
  - mcp
  - local-first
  - agent
date: 2024-07-22
---

The Long-Term Memory (LTM) engine is the core of the contextual assistance provided by [[Pieces for Developers|knowledge/tools-and-technology/development-tools/pieces]]. It runs as a modular, event-driven service, acting as a personal [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/agent|Agent]] within PiecesOS that activates on-demand to capture and retrieve context.

## How it Works

When you save code snippets, links, or other resources to Pieces (manually or through integrations), the LTM engine processes and stores this information locally. This follows a [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/concepts/local-first|Local-first Software]] approach, allowing Pieces and its integrated tools to provide more relevant and context-aware responses in future interactions.

The LTM remembers what you've explicitly saved, shared, or allowed to be captured. It does not have unprompted access to your files or data.

## MCP Integration

The LTM can be queried from tools like the Cursor IDE via the [[Model Context Protocol (MCP)|knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/protocols/model-context-protocol]]. This allows you to query your LTM directly using natural language prompts, for example:

- "What did I work on yesterday?"
- "Show me previous implementations of this authentication method."
- "What bugs did I fix in the last sprint?"

## Performance and Resource Usage

PiecesOS is designed to be a low-power background service when idle. The LTM engine is a modular component that is only loaded on demand, which helps manage RAM usage.

- **PiecesOS (idle)**: Typically uses 200-400 MB of RAM.
- **Long-Term Memory Engine**: Adds an additional 100-200 MB when active.

Users have control over these features and can toggle the LTM on or off to manage resource consumption. While memory leaks are not normal, they have been observed in `os_server` (PiecesOS), sometimes related to the LTM engine or custom MCP integrations.

## Using LTM Context

With LTM enabled, Pieces captures workflow context from every actively used window. This allows you to prompt the Pieces Copilot to recall information it has observed. For example, after reading a "secret message" on a webpage, you can ask the Copilot, "What is my secret message?" and it will retrieve the information it captured.

## LTM Prompting Guide

Effective prompting enhances the utility of the LTM. You can query your captured memories using multiple dimensions:
- **Keywords**: Connect prompts to specific activities.
- **Application**: Filter based on the application you were using (e.g., browser, IDE).
- **Time Period**: Query for information from a specific timeframe.

This multi-dimensional approach allows for more precise and powerful context retrieval.

## Resources

- [Official Website](https://pieces.app/)
- [Official Documentation](https://docs.pieces.app/)
- [Using Long-Term Memory Context](https://docs.pieces.app/products/quick-guides/ltm-context)
- [Long-Term Memory Prompting Guide](https://docs.pieces.app/products/quick-guides/ltm-prompting) 