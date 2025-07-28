---
title: CLI / MCP Overview
sidebar_position: 1
description: DevCycle Command Line Interface and Model Context Protocol Server
---

# CLI / MCP Overview

## Powerful feature flag management for developers and AI assistants.

DevCycle provides two complementary tools for managing feature flags: a command-line interface for developers and an AI-powered protocol for assistants.

## DevCycle CLI

The [DevCycle CLI](/cli/) is a comprehensive command-line tool for feature flag management.

**Key capabilities:**

- Manage features, variables, and targeting rules
- Detect variable usage in your codebase
- Generate type definitions for TypeScript
- Self-targeting for testing

**Quick start:**

```bash
npm install -g @devcycle/cli
dvc login sso
```

**[Explore CLI Reference →](/cli/)** | **[View CLI User Guides →](/cli-guides/)**

## DevCycle MCP Server

The [DevCycle MCP Server](/cli-mcp/mcp-getting-started) enables AI assistants to manage your feature flags through natural language.

**Supported AI clients:**

- Cursor, VS Code, Claude Desktop, Windsurf

**Example interactions:**

- _"Create a new feature flag called 'new-checkout-flow'"_
- _"Enable targeting for my-feature in production"_
- _"Show me analytics for the last week"_

**[Get Started with MCP →](/cli-mcp/mcp-getting-started)** | **[MCP Reference →](/cli-mcp/mcp-reference)**

## Choose Your Workflow

| Tool    | Best For                                                  |
| ------- | --------------------------------------------------------- |
| **CLI** | Direct command-line control, scripting, CI/CD integration |
| **MCP** | Natural language interactions, AI-assisted development    |

Both tools use the same DevCycle APIs and can be used together seamlessly.

## Getting Help

- **Community**: [Discord](https://discord.gg/8uEqSsRKy5)
- **Issues**: [GitHub](https://github.com/DevCycleHQ/cli/issues)
- **Support**: [Contact Us](mailto:support@devcycle.com)
