---
title: LoRA (Low-Rank Adaptation)
date: 2026-08-18
description: A parameter-efficient fine-tuning technique that adapts large models by training small low-rank matrices instead of updating the full weight set
aliases:
  - Low-Rank Adaptation
  - LoRA fine-tuning
tags: ["programming", "artificial-intelligence", "machine-learning", "deep-learning", "large-language-models", "generative-ai"]
draft: false
---

**LoRA (Low-Rank Adaptation)** is a fine-tuning technique that specialises a large pretrained model for a specific use without retraining it end to end. It was introduced in 2021 by researchers at Microsoft and has since become the standard way to adapt both [[large-language-models|large language models]] and image-generation models such as Stable Diffusion and FLUX.

Not to be confused with [[knowledge/tools-and-technology/infrastructure-and-networks/networking/lora|LoRa (Long Range)]], the wireless modulation technique. The two share a name and nothing else.

## How It Works

Conventional fine-tuning updates every parameter in the model, which is slow, memory-hungry, and produces a full-size copy of the weights for each task. LoRA freezes the pretrained weights instead and injects small trainable matrices alongside them. Each weight update is expressed as the product of two thin matrices of rank *r*, so a large square update matrix is replaced by two narrow ones. Only those matrices are trained.

The original paper reports, against GPT-3 175B fine-tuned with Adam, roughly 10,000 times fewer trainable parameters and a 3-fold reduction in GPU memory, with model quality on par with or better than full fine-tuning on RoBERTa, DeBERTa, GPT-2, and GPT-3. Because the low-rank product can be folded back into the base weights before deployment, LoRA adds no inference latency, which is what separates it from earlier adapter methods.

## Adapter Files in Practice

A trained LoRA ships as a small standalone file, typically tens to a few hundred megabytes, that loads on top of a base checkpoint. It behaves like a patch: the base model stays untouched on disk, and the adapter modifies its behaviour at load time.

In image-generation workflows, adapters are usually activated through *trigger words* placed in the prompt. Because each adapter is a separate small file rather than a whole model, several can be stacked in one generation, combining a style, a character, and an object without multiplying storage. Community practice trains usable concept adapters from surprisingly small datasets, sometimes fewer than twenty images, though quality scales with careful captioning and curation rather than raw volume.

## Applications

For [[large-language-models|language models]], LoRA is the usual route to domain adaptation, instruction tuning, and tone or persona shaping when full fine-tuning is out of reach. It pairs naturally with [[prompt-engineering|prompt engineering]]: prompting steers a general model, a LoRA changes what the model is good at.

For image generation, LoRA is how most personalisation happens. Artistic style transfer, recurring characters across a series of images, and specific objects or products are all common targets. Open-weight ecosystems built around Stable Diffusion and FLUX depend on it, in the same way that open-weight text models such as [[llama|Llama]] depend on it for community fine-tunes. Closed services like [[dalle|DALL-E]] and [[midjourney|Midjourney]] expose no comparable adapter mechanism, which is a large part of why the open-weight side of the field is where custom adapters proliferate.

## Related Topics

- [[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/index|Artificial Intelligence]]: the broader field
- [[large-language-models|Large Language Models]]: the models most often adapted this way
- [[transformers|Transformers]]: the architecture whose attention weight matrices LoRA typically targets
- [[deep-learning|Deep Learning]]: the training paradigm LoRA optimises
- [[machine-learning|Machine Learning]]: foundational context
- [[prompt-engineering|Prompt Engineering]]: the complementary way to steer a model without training
- [[llama|Llama]]: open-weight models where community LoRA training is common
- [[dalle|DALL-E]] and [[midjourney|Midjourney]]: closed image models, contrasted with adapter-friendly open-weight ones

## References

- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685): Hu, Shen, Wallis, Allen-Zhu, Li, Wang, Wang, Chen, June 2021
- [microsoft/LoRA](https://github.com/microsoft/LoRA): reference implementation
