---
title: MCP Getting Started
displayed_sidebar: cli_mcp
---

# DevCyle MCP Getting Started

The DevCycle Model Context Protocol (MCP) Server is based on the DevCycle CLI, it enables AI-powered code editors like Cursor and Windsurf, or general-purpose tools like Claude Desktop, to interact directly with your DevCycle projects and make changes on your behalf.

## Quick Setup

### 1. **Install the DevCycle CLI**

Using NPM:

```bash
npm install -g @devcycle/cli
```

Or alternatively, using homebrew:

```bash
brew install devcycle
```

### 2. **Authenticate**

```bash
dvc login sso
```

You should be automatically prompted to select an Organization and Project to associate the CLI session with, but if you aren't, run the following command.

```bash
dvc projects select
```

### 3. **Configure Your AI Client**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="mcp-clients">
<TabItem value="cursor" label="Cursor" default>

<a href="https://cursor.com/install-mcp?name=devcycle&config=eyJjb21tYW5kIjoiZHZjLW1jcCIsImFyZ3MiOltdfQo=" className="mcp-install-button">📦 Install in Cursor</a>

To open Cursor and automatically add the DevCycle MCP, click the install button above. Alternatively, add the following to your `~/.cursor/mcp_settings.json` file. To learn more, see the [Cursor documentation](https://docs.cursor.com/advanced/mcp).

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp",
      "args": []
    }
  }
}
```

</TabItem>
<TabItem value="vscode" label="VS Code">

<a href="https://vscode.dev/redirect/mcp/install?name=devcycle&config=%7B%22command%22%3A%22dvc-mcp%22%2C%22args%22%3A%5B%5D%7D" className="mcp-install-button">📦 Install in VS Code</a>

To open VS Code and automatically add the DevCycle MCP, click the install button above. Alternatively, add the following to your `.continue/config.json` file. To learn more, see the [Continue documentation](https://docs.continue.dev/reference/Model-Context-Protocol).

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp",
      "args": []
    }
  }
}
```

</TabItem>
<TabItem value="claude" label="Claude Desktop">

Add the following to your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp",
      "args": []
    }
  }
}
```

</TabItem>
<TabItem value="windsurf" label="Windsurf">

Add the following to your Windsurf MCP configuration file `~/.windsurf/mcp_settings.json`:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp",
      "args": []
    }
  }
}
```

</TabItem>
</Tabs>

## Available Tools

The DevCycle MCP Server provides **35+ tools** for comprehensive feature flag management:

| Category               | Tools                                                                                                         | Description                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **Feature Management** | `list_features`, `create_feature`, `update_feature`, `delete_feature`                                         | Create and manage feature flags |
| **Variations**         | `fetch_feature_variations`, `create_feature_variation`, `update_feature_variation`                            | Manage feature variations       |
| **Targeting**          | `enable_feature_targeting`, `disable_feature_targeting`, `list_feature_targeting`, `update_feature_targeting` | Configure targeting rules       |
| **Variables**          | `list_variables`, `create_variable`, `update_variable`, `delete_variable`                                     | Manage feature variables        |
| **Environments**       | `list_environments`, `create_environment`, `update_environment`, `get_sdk_keys`                               | Environment configuration       |
| **Projects**           | `list_projects`, `get_current_project`, `create_project`, `update_project`                                    | Project management              |
| **Self-Targeting**     | `get_self_targeting_identity`, `set_self_targeting_override`, `clear_all_self_targeting_overrides`            | Testing and overrides           |
| **Analytics**          | `get_feature_total_evaluations`, `get_project_total_evaluations`                                              | Usage analytics                 |

## Try It Out

Once configured, try asking your AI assistant:

- _"Create a new feature flag called 'new-checkout-flow'"_
- _"List all features in my project"_
- _"Enable targeting for the header-redesign feature in production"_
- _"Show me evaluation analytics for the last 7 days"_

## Next Steps

- **[MCP Reference](/cli-mcp/mcp-reference)** - Complete tool documentation with all parameters
- **[MCP User Guides](/cli-mcp/mcp-guides)** - Practical examples and workflows
- **[CLI Reference](/cli/README)** - Learn about the underlying CLI commands

## Getting Help

- **GitHub Issues**: [GitHub Issues](https://github.com/DevCycleHQ/cli/issues)
- **General Documentation**: [DevCycle Docs](https://docs.devcycle.com)
- **DevCycle Community**: [Discord](https://discord.gg/8uEqSsRKy5)
- **Support**: [Contact Support](mailto:support@devcycle.com)
