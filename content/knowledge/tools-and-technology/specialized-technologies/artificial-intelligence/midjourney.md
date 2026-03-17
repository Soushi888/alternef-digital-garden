---
title: Midjourney
description: A commercial AI image generation service known for distinctive aesthetic quality and Discord-based interface
aliases:
  - MJ
tags: ["artificial-intelligence", "image-generation", "generative-ai", "machine-learning"]
date: 2026-03-14
---

Midjourney is an independent AI research lab founded in 2022 by David Holz, formerly of Leap Motion. Unlike [[dalle|DALL-E]] (OpenAI) or Stable Diffusion (Stability AI), Midjourney is neither a Big Tech subsidiary nor open-source: it is a small, self-funded company that generates revenue directly from its product. Its image generation is known for a distinctive aesthetic: painterly, detailed, often epic or cinematic in character. The model is not published as a white-label API; it is experienced almost exclusively through Discord, a choice that shaped both the product and its community in unexpected ways.

## The Discord Interface

Midjourney launched and for several years operated exclusively through Discord: you join their server, type a `/imagine` prompt in a public channel, and the image generates in front of everyone. This is not a technically necessary constraint; it was a design choice that created accidental commons dynamics.

**Public by default**: Every image generated in a public channel is visible to every other user. Prompts are shared, output quality is visible, and users learn from each other's successes and failures in real time. A prompt culture emerged: users iterate, share, and remix techniques openly.

**Emergent community**: The public channel structure created a space where beginners could observe advanced users and advanced users could be challenged by creative experiments from unexpected directions. The community became part of the product.

**The privacy tradeoff**: All generation is public unless you subscribe to the "stealth mode" tier. Your creative experiments, commercial work, and exploratory prompts are visible by default. This is a significant tradeoff that users absorb in exchange for access to the model.

A web interface was introduced in later versions, reducing (but not eliminating) Discord dependency.

## Open vs. Closed Spectrum

Placed on the openness spectrum, Midjourney occupies an unusual position:

**Stable Diffusion** (Stability AI): Model weights are fully public. Anyone can download and run Stable Diffusion locally, fine-tune it on their own data, and build products on top of it without permission or payment. The community has produced thousands of fine-tuned variants.

**DALL-E** (OpenAI): Weights are not released. Access is API-only. The model is controlled by OpenAI's terms of service and pricing. No self-hosting is possible.

**Midjourney**: Weights are not released. There is no public API. No research papers describe the architecture in detail. The company publishes essentially nothing about how the model works or what it was trained on. In terms of transparency, Midjourney is less open than DALL-E: at least OpenAI publishes research. Midjourney publishes almost nothing.

This opacity is not simply a business decision; it forecloses independent auditing of training data, bias analysis, and architectural understanding.

## Garden Perspective

The Discord community structure is accidentally interesting from a commons perspective. The public-by-default interface, the prompt-sharing culture, and the emergent learning community all resemble commons dynamics: shared knowledge, collective improvement, and open observation. But the infrastructure is entirely private: one company controls the model, the training data, the pricing, and the terms of access.

This is where the [[digital-permaculture|digital permaculture]] question becomes pointed: could a Midjourney-equivalent be designed as a governed commons? Artists whose work trained the model would hold governance rights. Revenue would flow back proportionally, tracked as economic events using [[valueflows|ValueFlows]] vocabulary. The community would set the terms of the model's evolution. The accidental community that Discord created would become an intentional governance structure.

The gap between what Midjourney accidentally produced (a creative commons of practice) and what it actually is (a private company extracting value from artist training data) is exactly the gap that commons-oriented AI infrastructure would close.

## Related Concepts

- [[dalle|DALL-E]]
- [[large-language-models|Large Language Models]]
- [[digital-permaculture|Digital Permaculture]]
- [[valueflows|ValueFlows]]
