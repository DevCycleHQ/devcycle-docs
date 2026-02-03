---
title: MCP Getting Started
displayed_sidebar: cli_mcp
---

# DevCyle MCP Getting Started

The DevCycle Model Context Protocol (MCP) Server is based on the DevCycle CLI, it enables AI-powered code editors like Cursor and Windsurf, or general-purpose tools like Claude Desktop, to interact directly with your DevCycle projects and make changes on your behalf.

## Quick Setup

The DevCycle MCP is hosted so there is no need to set up a local server. We'll walk you through installation and authentication with your preferred AI tools.

**Direct Connection:** For clients that natively support the MCP specification with OAuth authentication, you can connect directly to our hosted server:

```bash
https://mcp.devcycle.com/mcp
```

**Protocol Support**: Our MCP server supports both SSE and HTTP Streaming protocols, automatically negotiating the best option based on your client's capabilities.

**Alternative Endpoint**: If your client has issues with protocol negotiation, use the SSE-only endpoint:

```bash
https://mcp.devcycle.com/sse
```

**MCP Registry**: If you're using [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io), the DevCycle MCP is listed as: `com.devcycle/mcp`

:::info

These instructions use the remote DevCycle MCP server. For installation of the local MCP server, see the [reference docs](/cli-mcp/mcp-reference#local-mcp-server-installation).

:::

<br></br>

### Configure Your AI Client

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="mcp-clients">
<TabItem value="cursor" label="Cursor" default>

<a href="cursor://anysphere.cursor-deeplink/mcp/install?name=DevCycle&config=eyJ1cmwiOiAiaHR0cHM6Ly9tY3AuZGV2Y3ljbGUuY29tL21jcCJ9Cg==" className="mcp-install-button" target="_blank" rel="noopener noreferrer">📦 Install in Cursor</a>

To open Cursor and automatically add the DevCycle MCP, click the install button above. Alternatively, add the following to your `~/.cursor/mcp_settings.json` file. To learn more, see the [Cursor documentation](https://docs.cursor.com/advanced/mcp).

```json
{
  "mcpServers": {
    "DevCycle": {
      "url": "https://mcp.devcycle.com/mcp"
    }
  }
}
```

**Authentication in Cursor:**

1. After configuration, you'll see DevCycle MCP listed as **"Needs login"** with a yellow indicator
2. Click on the DevCycle MCP server to initiate the authorization process
3. This opens a browser authorization page at `mcp.devcycle.com`
4. Review and click **"Allow Access"** to grant permissions
5. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
6. You'll be redirected back to Cursor with the server now active

</TabItem>
<TabItem value="vscode" label="VS Code">

<a href="https://vscode.dev/redirect/mcp/install?name=DevCycle&config=%7B%22url%22%3A%20%22https%3A%2F%2Fmcp.devcycle.com%2Fmcp%22%7D" className="mcp-install-button" target="_blank" rel="noopener noreferrer">📦 Install in VS Code</a>

To open VS Code and automatically add the DevCycle MCP, click the install button above. Alternatively, add the following to your `.continue/config.json` file. To learn more, see the [Continue documentation](https://docs.continue.dev/reference/Model-Context-Protocol).

```json
{
  "mcpServers": {
    "DevCycle": {
      "url": "https://mcp.devcycle.com/mcp"
    }
  }
}
```

**Authentication in VS Code:**

1. After configuration, open the MCP settings panel in VS Code
2. Find the DevCycle MCP server and click **"Start Server"**
3. VS Code will show a dialog: "The MCP Server Definition 'DevCycle' wants to authenticate to mcp.devcycle.com"
4. Click **"Allow"** to proceed with authentication
5. This opens a browser authorization page at `mcp.devcycle.com`
6. Review and click **"Allow Access"** to grant permissions
7. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
8. You'll be redirected back to VS Code with the server now active

</TabItem>
<TabItem value="claude-code" label="Claude Code">

**Step 1: Open Terminal**
Open your terminal to access the Claude CLI.

**Step 2: Add DevCycle MCP Server**

```bash
claude mcp add --transport http devcycle https://mcp.devcycle.com/mcp
```

**Step 3: Manage MCP Connection**
In the Claude CLI, enter the MCP management interface:

```bash
/mcp
```

**Step 4: Authentication**
You'll see the DevCycle server listed as "disconnected • Enter to login":

1. Select the DevCycle server and press Enter to login
2. Follow the CLI prompts to initiate the Authentication process
3. This will open a browser page at `mcp.devcycle.com` for authorization
4. Review and click **"Allow Access"** to grant permissions
5. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
6. Return to Claude Code where the server will show as connected

For more details, see the [Claude Code MCP documentation](https://docs.anthropic.com/claude/docs/mcp).

</TabItem>
<TabItem value="claude" label="Claude Desktop">

**Step 1: Access MCP Configuration**

**Option 1: Through Claude Desktop Settings (Recommended)**

1. Open Claude Desktop and go to **Settings**
2. Navigate to **Developer** → **Local MCP servers**
3. Click **"Edit Config"** to open the configuration file directly

**Option 2: Manual Configuration File**
Alternatively, locate and edit your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Step 2: Add DevCycle Configuration**
Add or merge the following configuration:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "npx",
      "args": ["mcp-remote@0.1.18", "https://mcp.devcycle.com/mcp"]
    }
  }
}
```

**Step 3: Restart Claude Desktop**
Close and reopen Claude Desktop for the changes to take effect.

**Step 4: Authentication**

1. When you first use DevCycle MCP tools, Claude Desktop will prompt for authentication
2. This will open a browser page at `mcp.devcycle.com` for authorization
3. Review and click **"Allow Access"** to grant permissions
4. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
5. Return to Claude Desktop where the MCP tools will be active

</TabItem>
<TabItem value="windsurf" label="Windsurf">

**Step 1: Access MCP Configuration**

1. Open Windsurf and go to **Settings > Winsurf Settings**
2. Scroll to the **Cascade** section
3. Click **"Manage MCPs"**

**Step 2: Edit Raw Configuration**

1. In the "Manage MCP servers" interface, click **"View raw config"**
2. Add the following configuration to the JSON file:

```json
{
  "mcpServers": {
    "DevCycle": {
      "serverUrl": "https://mcp.devcycle.com/mcp"
    }
  }
}
```

**Step 3: Refresh and Authenticate**

1. Save the configuration file
2. Click **"Refresh"** in the "Manage MCP servers" interface
3. The DevCycle server will appear and prompt for authentication
4. Follow the authentication flow:
   - Browser opens at `mcp.devcycle.com` for authorization
   - Click **"Allow Access"** to grant permissions
   - If you have multiple organizations, select your desired organization at `auth.devcycle.com`
   - Return to Windsurf where DevCycle will show as "Enabled" with all tools available which can be configured independently

</TabItem>
<TabItem value="codex" label="Codex CLI">

**Step 1: Access MCP Configuration**

Locate and edit your OpenAI Codex CLI configuration file:

- **All platforms**: `~/.codex/config.toml`

**Step 2: Add DevCycle MCP Server**

Add the following TOML configuration to enable the DevCycle MCP server:

```toml
[mcp_servers.devcycle]
url = "https://mcp.devcycle.com/mcp"
```

**Step 3: Restart Codex CLI**

Restart your Codex CLI session for the changes to take effect.

**Step 4: Authentication**

1. When you first use DevCycle MCP tools, the Codex CLI will prompt for authentication
2. This will open a browser page at `mcp.devcycle.com` for authorization
3. Review and click **"Allow Access"** to grant permissions
4. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
5. Return to the Codex CLI where the DevCycle MCP tools will be active

For more details, see the [OpenAI Codex MCP documentation](https://github.com/openai/codex/blob/main/docs/config.md#mcp-servers).

</TabItem>
<TabItem value="gemini" label="Gemini CLI">

**Step 1: Access MCP Configuration**

Locate and edit your Gemini CLI settings file:

- **All platforms**: `~/.gemini/settings.json`

**Step 2: Add DevCycle MCP Server**

Add or merge the following configuration to enable the DevCycle MCP server:

```json
{
  "mcpServers": {
    "devcycle": {
      "url": "https://mcp.devcycle.com/mcp"
    }
  }
}
```

**Step 3: Restart Gemini CLI**

Restart your Gemini CLI session for the changes to take effect.

**Step 4: Authentication**

1. When you first use DevCycle MCP tools, the Gemini CLI will prompt for authentication
2. This will open a browser page at `mcp.devcycle.com` for authorization
3. Review and click **"Allow Access"** to grant permissions
4. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
5. Return to the Gemini CLI where the DevCycle MCP tools will be active

For more details, see the [Gemini CLI MCP documentation](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#how-to-set-up-your-mcp-server).

</TabItem>
</Tabs>

<br></br>

## Available Tools

The DevCycle MCP Server provides comprehensive feature flag management tools organized into **6 categories**:

| Category                       | Tools                                                                                                                                                                                                                               | Description                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Feature Management**         | `list_features`, `create_feature`, `update_feature`, `update_feature_status`, `delete_feature`, `cleanup_feature`, `get_feature_audit_log_history`                                                                                     | Create and manage feature flags             |
| **Variable Management**        | `list_variables`, `create_variable`, `update_variable`, `delete_variable`                                                                                                                                                             | Manage feature variables                    |
| **Project Management**         | `list_projects`, `get_current_project`, `select_project`                                                                                                                                                                             | Project selection and details               |
| **Self-Targeting & Overrides** | `get_self_targeting_identity`, `update_self_targeting_identity`, `list_self_targeting_overrides`, `set_self_targeting_override`, `clear_feature_self_targeting_overrides`                                                           | Testing and overrides                       |
| **Results & Analytics**        | `get_feature_total_evaluations`, `get_project_total_evaluations`                                                                                                                                                                      | Usage analytics                             |
| **SDK Installation**           | `install_devcycle_sdk`                                                                                                                                                                                                                | SDK install guides and examples             |

## Try It Out

Once configured, try asking your AI assistant:

- _"Create a new feature flag called 'new-checkout-flow'"_
- _"List all features in my project"_
- _"Enable targeting for the header-redesign feature in production"_
- _"Show me evaluation analytics for the last 7 days"_

## Next Steps

- **[MCP Reference](/cli-mcp/mcp-reference)** - Complete tool documentation with all parameters
- **[CLI Reference](/cli)** - Learn about the underlying CLI commands

## Getting Help

- **GitHub Issues**: [GitHub Issues](https://github.com/DevCycleHQ/cli/issues)
- **General Documentation**: [DevCycle Docs](https://docs.devcycle.com)
- **Support**: [Contact Support](mailto:support@devcycle.com)
