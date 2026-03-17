---
title: DALL-E
description: OpenAI's text-to-image generative AI model, producing images from natural language prompts
aliases:
  - DALL-E 2
  - DALL-E 3
  - DALL·E
tags: ["artificial-intelligence", "image-generation", "generative-ai", "machine-learning"]
date: 2026-03-14
---

DALL-E is OpenAI's text-to-image generative model, its name a portmanteau of Salvador Dalí (the surrealist painter) and WALL-E (the Pixar robot). The original DALL-E launched in January 2021 using a transformer architecture to predict image tokens from text. DALL-E 2 (April 2022) shifted to a diffusion-based architecture and produced a dramatic leap in image quality, realism, and compositional ability. DALL-E 3 (October 2023) integrated directly into ChatGPT, making image generation accessible to a mainstream audience through natural conversation rather than a dedicated interface.

## How It Works

DALL-E 2 and 3 use **diffusion models**: the training process progressively adds noise to images until they become pure noise, then trains the model to reverse this process. At inference time, the model starts from random noise and iteratively denoises it, guided by a text prompt, until a coherent image emerges.

Text-image alignment relies on **CLIP** (Contrastive Language-Image Pre-training): a model trained to understand the semantic similarity between text and images. DALL-E uses CLIP-derived representations to steer the diffusion process toward images that match the prompt's meaning, not just its keywords.

DALL-E 3 improved prompt adherence significantly by training on recaptioned data: images were re-described using [[gpt|GPT-4]] to produce more detailed and accurate captions, which the model then learned from. The result is better literal instruction-following compared to earlier versions.

## Authorship and Ethics

DALL-E was trained on billions of images scraped from the internet, the vast majority created by human artists without their knowledge or consent. This has produced several categories of dispute:

**Copyright**: In most jurisdictions, AI-generated images are not copyrightable without substantial human creative input (the US Copyright Office has declined to register AI-only outputs). At the same time, training on copyrighted images without a license is being challenged in courts. The legal framework has not settled.

**Artist opt-out inadequacy**: OpenAI offers a mechanism for artists to request removal from future training data, but models already trained on their work remain deployed. Removal from future training does not address past use.

**Style replication**: DALL-E can reproduce the recognizable style of living artists (who have not consented) to produce commercial-quality images on demand. This directly competes with the artists whose work trained the model.

## Garden Perspective

Through the lens of [[valueflows|ValueFlows]], the training of DALL-E reveals an unrecorded value flow: artists' labor (years of creative development, published works) flows into a training corpus that becomes the model's capability, but no economic event is registered, no agent receives credit, and no reciprocity is built into the system. The model is then monetized commercially. This is value extraction without reciprocity, the opposite of regenerative economics.

What would a commons-oriented alternative look like? Artists would contribute work with explicit consent, each contribution recorded as an economic event. Revenue from the model would flow back proportionally, governed by the same contributors. [[valueflows|ValueFlows]] and [[midjourney|Midjourney]]'s community model both gesture toward this, though neither fulfills it.

## Related Concepts

- [[midjourney|Midjourney]]
- [[gpt|GPT]]
- [[large-language-models|Large Language Models]]
- [[valueflows|ValueFlows]]
