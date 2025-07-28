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

The [DevCycle MCP Server](/cli-mcp/mcp-getting-started) is based on our CLI and enables AI assistants like Claude Desktop, Cursor, and other MCP-compatible clients to directly interact with your DevCycle feature flags, environments, and projects through natural language.

**Example interactions:**

- _"Create a new feature flag called 'new-checkout-flow'"_
- _"Enable targeting for my-feature in production"_
- _"An incident occurred at 5pm today, show me what changes happened within the hour before the incident"_

### What is MCP?

The Model Context Protocol (MCP) is an open standard that enables AI applications to securely connect to data sources and tools. DevCycle's MCP server acts as a bridge between AI assistants and your feature flag management, allowing you to:

- **Create and manage feature flags** using natural language
- **Configure targeting rules** without writing complex queries
- **Test features safely** using self-targeting and overrides
- **Get real-time insights** about your feature flag usage

### Key Benefits

- **Natural Language Interface**: Use commands like "Create a feature flag for the new checkout flow"
- **Production Safety**: Built-in warnings and confirmations for destructive actions
- **Comprehensive Coverage**: 35+ tools across all DevCycle operations

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
