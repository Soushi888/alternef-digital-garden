---
title: Fabric AI
aliases:
  - Fabric Framework
  - Daniel Miessler's Fabric
tags:
  - ai
  - llm
  - cli
  - prompts
  - automation
  - open-source
  - productivity
related pages:
  - "[[knowledge/tools-and-technology/specialized-technologies/artificial-intelligence/index|Artificial Intelligence]]"
  - "[[large-language-models|Large Language Models]]"
  - "[[huginn|Huginn]]"
created: 2024-01-01
modified: 2026-01-27
---

**Fabric** is an open-source framework for augmenting humans using AI, created by Daniel Miessler in January 2024. It provides a modular system for solving specific problems using a crowdsourced collection of AI prompts called "Patterns" that can be integrated into any workflow.

## Philosophy

> "AI isn't a thing; it's a _magnifier_ of a thing. And that thing is **human creativity**."

Fabric addresses the AI **integration problem** rather than the capabilities problem. While thousands of AI applications exist, integrating AI functionality into daily workflows remains challenging. Fabric solves this by:

1. **Breaking problems into components** - Applying AI to individual pieces one at a time
2. **Organizing prompts by real-world tasks** - Making it easy to discover, collect, and manage AI solutions
3. **Providing a unified interface** - Command-line focused with REST API and web interface options

## Key Features

### Patterns System

Patterns are Fabric's fundamental unit - carefully crafted prompts organized by task. The framework includes **240+ built-in patterns** covering:

- **Content Analysis**: `extract_wisdom`, `summarize`, `analyze_claims`, `analyze_paper`
- **Security**: `analyze_malware`, `analyze_threat_report`, `create_stride_threat_model`, `create_sigma_rules`
- **Content Creation**: `create_academic_paper`, `write_latex`, `create_keynote`, `create_newsletter_entry`
- **Development**: `create_coding_feature`, `create_design_document`, `analyze_logs`, `code_review`
- **Visualization**: `create_mermaid_visualization`, `create_markmap_visualization`, `create_conceptmap`
- **Personal**: `analyze_personality`, `create_reading_plan`, `create_flash_cards`

### Pattern Structure

Patterns use Markdown for maximum readability and editability:

```markdown
# IDENTITY and PURPOSE
You extract surprising, insightful, and interesting information...

# STEPS
- Extract a summary of the content in 25 words...
- Extract 20 to 50 of the most surprising ideas...

# OUTPUT INSTRUCTIONS
- Only output Markdown.
- Write bullets as exactly 16 words.
```

### Prompt Strategies

Fabric implements advanced prompting techniques:

- **Chain-of-Thought (cot)**: Step-by-step reasoning
- **Chain-of-Draft (cod)**: Iterative drafting with minimal notes
- **Tree-of-Thought (tot)**: Multiple reasoning paths with selection
- **Atom-of-Thought (aot)**: Break problems into atomic sub-problems
- **Least-to-Most (ltm)**: Solve from easiest to hardest
- **Self-Consistency**: Multiple reasoning paths with consensus
- **Self-Refine**: Answer, critique, and refine
- **Reflexion**: Answer, brief critique, refined answer

## Supported AI Providers

Fabric supports numerous AI providers:

- **OpenAI** (GPT-4, o1, etc.) with Responses API
- **Anthropic** (Claude Opus 4.5, Sonnet 4, etc.) with OAuth authentication
- **Google Gemini** with TTS and web search
- **Ollama** (local models)
- **Azure OpenAI**
- **Amazon Bedrock**
- **Perplexity AI** with citations
- **Together AI**
- **Venice AI** (privacy-focused)
- **GitHub Models**
- **Microsoft 365 Copilot** (enterprise)
- **Digital Ocean GenAI**
- **LM Studio**, **Groq**, **Mistral**, and more

## Installation

### One-Line Install (Recommended)

**Unix/Linux/macOS:**
```bash
curl -fsSL https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.sh | bash
```

**Windows PowerShell:**
```powershell
iwr -useb https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.ps1 | iex
```

### Package Managers

```bash
# macOS
brew install fabric-ai

# Arch Linux
yay -S fabric-ai

# Windows
winget install danielmiessler.Fabric

# From source (requires Go)
go install github.com/danielmiessler/fabric/cmd/fabric@latest
```

### Docker

```bash
docker run --rm -it kayvan/fabric:latest --version
```

## Usage Examples

### Basic Pattern Usage

```bash
# Summarize clipboard content
pbpaste | fabric --pattern summarize

# Analyze claims with streaming
pbpaste | fabric --stream --pattern analyze_claims

# Extract wisdom from YouTube video
fabric -y "https://youtube.com/watch?v=VIDEO_ID" --stream --pattern extract_wisdom

# Scrape and analyze a website
fabric -u https://example.com -p analyze_claims
```

### Advanced Features

```bash
# Use specific model
fabric -m gpt-4o --pattern summarize

# Apply prompt strategy
echo "Analyze this code" | fabric --strategy cot -p analyze_code

# Enable web search (supported models)
fabric --search --pattern research_topic

# Generate images
fabric --pattern create_art_prompt --image-file output.png

# Speech-to-text
fabric --transcribe-file audio.mp3 --pattern summarize

# Dry run (preview without API call)
echo "test" | fabric --dry-run -p summarize
```

### REST API Server

```bash
# Start API server
fabric --serve

# With Ollama compatibility mode
fabric --serve --serveOllama
```

## Custom Patterns

Create private patterns that won't be overwritten during updates:

```bash
# Set up custom patterns directory
fabric --setup  # Select "Custom Patterns" option

# Create custom pattern
mkdir -p ~/my-custom-patterns/my-analyzer
echo "You are an expert analyzer..." > ~/my-custom-patterns/my-analyzer/system.md

# Use custom pattern
fabric --pattern my-analyzer "analyze this"
```

Custom patterns take precedence over built-in ones with the same name.

## Helper Tools

- **`to_pdf`**: Convert LaTeX to PDF, works with `write_latex` pattern
- **`code2context`**: Generate JSON representation of code directories for AI analysis
- **`generate_changelog`**: Generate changelogs from git history with optional AI summaries

## Integration Options

- **Shell Aliases**: Create direct commands for each pattern
- **Obsidian Integration**: Save outputs directly to markdown vault
- **Shell Completions**: Tab completion for Zsh, Bash, and Fish
- **Web Interface**: Built-in GUI alternative to CLI
- **Per-Pattern Model Mapping**: Configure specific models for individual patterns via environment variables

## Technical Details

- **Language**: Go (migrated from Python in 2024)
- **License**: MIT
- **Platforms**: Linux, macOS, Windows (including ARM)
- **Internationalization**: Full i18n support for 10+ languages
- **API Documentation**: Swagger/OpenAPI at `/swagger/index.html`

## Resources

- **GitHub Repository**: https://github.com/danielmiessler/fabric
- **DeepWiki Documentation**: https://deepwiki.com/danielmiessler/fabric
- **Patterns Directory**: https://github.com/danielmiessler/fabric/tree/main/data/patterns

## Related Concepts

- [[large-language-models|Large Language Models]] - The AI models Fabric interfaces with
- [[huginn|Huginn]] - Another automation tool for creating agents
- [[prompt-engineering|Prompt Engineering]] - The art of crafting effective AI prompts
