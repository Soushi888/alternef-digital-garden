---
title: Prompt Engineering
date: 2026-05-24
description: The practice of designing and optimizing natural language inputs to large language models to reliably elicit desired behaviors and outputs
aliases:
  - prompt-engineering
  - Prompt Engineering
tags: ["artificial-intelligence", "large-language-models", "programming"]
---

## Overview

**Prompt engineering** is the practice of crafting, testing, and refining natural language inputs ("prompts") to guide large language models (LLMs) toward desired outputs. As LLMs have grown more capable, prompt engineering has emerged as a key interface skill between human intent and AI execution.

## Core Techniques

- **Zero-shot prompting**: Direct instructions without examples
- **Few-shot prompting**: Providing 2-5 examples of desired input/output pairs
- **Chain of thought (CoT)**: "Think step by step" encourages visible reasoning
- **Role prompting**: Assigning a persona or expert role to the model
- **Structured output**: Specifying JSON, XML, or other formats for parseable responses
- **Constitutional prompting**: Embedding constraints and values directly in the prompt

## Meta-level Considerations

Prompt engineering is partly a temporary discipline — as models improve, many explicit prompting techniques (few-shot, CoT) become less necessary. The durable aspects are:
- Clear specification of what you want (and don't want)
- Providing relevant context
- Decomposing complex tasks into steps

## Related

- [[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/index|Artificial Intelligence]] — The broader field
- [[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/large-language-models|Large Language Models]] — The models being prompted
