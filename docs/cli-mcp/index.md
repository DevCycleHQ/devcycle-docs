---
title: CLI / MCP Overview
sidebar_position: 1
description: DevCycle Command Line Interface and Model Context Protocol Server
---

# DevCycle CLI / MCP Overview

DevCycle provides two powerful tools to help you manage feature flags and integrate with your development workflow:

## 🛠️ Command Line Interface (CLI)

The DevCycle CLI is a traditional command-line tool that provides direct access to DevCycle's features and functionality through terminal commands. Perfect for scripting, CI/CD pipelines, and developers who prefer command-line workflows.

### Key Features

- **Feature Flag Management**: Create, update, and delete feature flags
- **Environment Control**: Manage targeting across different environments
- **Project Administration**: Switch between projects and manage settings
- **Integration Ready**: Perfect for automation and CI/CD workflows
- **Local Development**: Test and validate flags locally

### Quick Start

1. Install: `npm install -g @devcycle/cli`
2. Login: `dvc login sso`
3. Select project: `dvc projects select`
4. Start using CLI commands: `dvc features list`

[**→ Browse CLI Reference**](/cli/) | [**→ View CLI User Guides**](/cli-guides/)

---

## 🤖 Model Context Protocol (MCP) Server

The DevCycle MCP Server is based on our CLI and enables AI assistants like Claude Desktop, Cursor, and other MCP-compatible clients to directly interact with your DevCycle feature flags, environments, and projects through natural language.

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

### Quick Start

1. Install the DevCycle CLI: `npm install -g @devcycle/cli`
2. Authenticate: `dvc login sso`
3. [Configure your AI client](./mcp-reference#ai-client-configuration) (Cursor, Claude Desktop, etc.)
4. Start managing feature flags with natural language!

[**→ Explore MCP Reference**](./mcp-reference) | [**→ Browse MCP User Guides**](./mcp-guides)

---

## 🤔 Which Tool Should I Use?

### Choose **CLI** if you:

- Prefer traditional command-line interfaces
- Need to script or automate feature flag operations
- Work primarily in terminal-based environments
- Want direct, precise control over API calls
- Need to integrate with existing CLI-based workflows

### Choose **MCP Server** if you:

- Want to use AI assistants for feature flag management
- Prefer natural language over command syntax
- Work primarily in AI-powered development environments (Cursor, Claude Desktop)
- Want guided workflows with built-in safety checks

### Can I Use Both?

Absolutely! Both tools interact with the same DevCycle APIs and can be used together and you can switch between then based on your needs in the moment.

---

## Getting Help

- **CLI Questions**: Browse [CLI User Guides](/cli-guides/) and [CLI Reference](/cli/)
- **MCP Questions**: Check the [MCP User Guides](./mcp-guides) and [MCP Reference](./mcp-reference)
- **General Support**: [Contact support](mailto:support@devcycle.com)
- **Community**: Join our [Discord community](https://discord.gg/8uEqSsRKy5)

Both tools are actively maintained and regularly updated with new features. Choose the approach that best fits your development style and workflow!
