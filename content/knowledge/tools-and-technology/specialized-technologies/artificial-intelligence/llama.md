---
title: Llama
description: Meta's open-weight large language model series, enabling local and community AI deployment
aliases:
  - LLaMA
  - Llama 2
  - Llama 3
  - Meta AI
tags:
  - artificial-intelligence
  - large-language-models
  - open-source
  - machine-learning
date: 2026-03-14
---

Llama is a series of large language models developed and released by Meta AI. The first generation (Llama 1) appeared in February 2023; Llama 2 followed in July 2023 as a publicly available release with permissive licensing for commercial use; Llama 3 arrived in April 2024 with substantially improved performance. What distinguishes Llama from most commercial models is that Meta releases the model weights: the trained parameters that define how the model behaves. This makes it "open-weight" rather than fully open-source (the training data and full training pipeline are not disclosed), but the weights alone are enough for researchers, companies, and individuals to run, fine-tune, and build on the model without paying API fees or routing queries through a third-party server.

## Open Weights and Local AI

Releasing model weights enabled an ecosystem that proprietary models cannot produce. Within months of each Llama release, the community had fine-tuned variants for specific domains: CodeLlama (programming), Llama-based medical models, multilingual variants, and models fine-tuned with domain-specific data. Mistral AI launched as a company specifically to build on and advance this open-weight model paradigm.

Local deployment tools made Llama accessible outside of research settings:

- **Ollama**: A command-line tool that runs Llama and other open-weight models locally, treating models like packages to install and run
- **llama.cpp**: A C++ implementation that runs Llama inference on consumer hardware (including Apple Silicon and modest CPUs) without requiring a GPU
- **LM Studio**: A desktop GUI for discovering, downloading, and running local models including Llama variants

These tools mean a developer with a laptop can run a capable language model with zero API costs, zero latency to a remote server, and zero exposure of queries to a third party.

## Garden Perspective

Running AI locally is an act of digital sovereignty. Every query sent to a cloud API is a query that leaves your hardware, is logged by a corporation, and may contribute to future training data without your control. Llama running on your own machine means your thinking stays on your machine.

This connects directly to [[local-first|local-first]] principles: data and computation that live on devices you control are fundamentally more sovereign than data and computation that live on someone else's servers. The [[model-context-protocol|Model Context Protocol]] makes this more practical: a locally-running Llama instance can connect to local tools and data through a standardized protocol, without the computation ever leaving the device.

Open-weight models are not yet truly open in the commons sense: training data remains undisclosed, governance is unilateral (Meta decides what future models look like), and the compute required to train them is inaccessible to any community. But they are a meaningful step toward AI that communities can use, adapt, and deploy on their own terms.

## Related Concepts

- [[gpt|GPT]]
- [[large-language-models|Large Language Models]]
- [[model-context-protocol|Model Context Protocol]]
- [[local-first|Local-First]]
- [[transformers|Transformers]]
