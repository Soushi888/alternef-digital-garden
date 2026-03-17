---
title: GPT
description: OpenAI's Generative Pre-trained Transformer series, the most widely deployed commercial language models
aliases:
  - Generative Pre-trained Transformer
  - ChatGPT
  - GPT-3
  - GPT-4
  - GPT-4o
tags: ["artificial-intelligence", "large-language-models", "machine-learning"]
date: 2026-03-14
---

GPT (Generative Pre-trained Transformer) is the model family developed by OpenAI that transformed public understanding of what AI could do. The series began with GPT-1 in 2018, a research paper demonstrating that language understanding could emerge from unsupervised pre-training on large text corpora. GPT-2 in 2019 was initially withheld from public release on the grounds that it was "too dangerous," a concern that looks both prescient and naive given what followed. GPT-3 in 2020 was the breakthrough: 175 billion parameters, capable of few-shot learning from examples in the prompt, and surprising enough to spawn an industry. ChatGPT launched November 30, 2022, and became the fastest consumer product to reach 100 million users in history. GPT-4 (March 2023) and GPT-4o (May 2024) extended the progression. Each release has reset the baseline for what capable AI looks like.

## The Proprietary Problem

GPT's weights are closed. Training data is undisclosed. Access requires an API key and payment to OpenAI. This creates dependencies that define the proprietary model paradigm:

**Vendor lock-in**: Code written against the OpenAI API is tied to OpenAI's pricing, availability, rate limits, and terms of service. When OpenAI deprecates a model version, users must migrate on OpenAI's schedule. When pricing changes, costs change without negotiation.

**No reproducibility**: Because training data is not disclosed, the model's capabilities and biases cannot be independently audited or reproduced. Researchers studying GPT behavior must treat it as a black box.

**Governance without accountability**: OpenAI decides what GPT can and cannot do, what safety constraints apply, and how the model evolves. Users have no input into these decisions. The original non-profit mission (ensuring AI benefits all of humanity) has given way to a capped-profit structure valued in the hundreds of billions of dollars.

**Training data appropriation**: GPT was trained on text scraped from the internet, including copyrighted works, without compensation or consent from authors. This is an ongoing area of litigation and policy debate.

The [[model-context-protocol|Model Context Protocol]] is relevant here: it defines a standard interface for AI assistants to connect to tools, and this standard works equally well with locally-running [[llama|Llama]] models as with GPT. The protocol decouples capability from vendor dependency.

## Garden Perspective

GPT is the dominant paradigm this garden is in tension with: AI as a cloud service, controlled by a corporation, accessed through an API, trained on data that was not freely given. This is not an anti-AI position; it is a pro-sovereignty position.

The garden's question is not "should AI exist?" but "who controls it, who benefits from it, and what does the alternative look like?" Open-weight models like [[llama|Llama]], protocol-defined tool use through [[model-context-protocol|Model Context Protocol]], and community-governed training data are the emerging answers. GPT's dominance makes these alternatives more urgent, not less.

## Related Concepts

- [[llama|Llama]]
- [[large-language-models|Large Language Models]]
- [[transformers|Transformers]]
- [[model-context-protocol|Model Context Protocol]]
- [[dalle|DALL-E]]
