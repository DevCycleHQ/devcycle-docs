---
title: MCP Getting Started
displayed_sidebar: cli_mcp
---

# DevCycle MCP Getting Started

The DevCycle Model Context Protocol (MCP) Server is based on the DevCycle CLI and enables AI coding tools like Claude Code and Cursor, or general-purpose tools like Claude Desktop, to interact directly with your DevCycle projects and make changes on your behalf.

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

<Tabs groupId="mcp-clients" className="mcp-client-tabs">
<TabItem value="claude-code" label="Claude Code" default>

**Step 1: Add DevCycle MCP Server**

Run the following command in your terminal:

```bash
claude mcp add --transport http devcycle https://mcp.devcycle.com/mcp
```

**Step 2: Manage MCP Connection**

Start Claude Code and enter the MCP management interface:

```bash
/mcp
```

**Step 3: Authentication**

You'll see the DevCycle server listed as **"Needs authentication"**:

1. Select the DevCycle server and press Enter to authenticate
2. This will open a browser page at `mcp.devcycle.com` for authorization
3. Review and click **"Allow Access"** to grant permissions
4. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
5. Return to Claude Code where the server will show as connected

For more details, see the [Claude Code MCP documentation](https://code.claude.com/docs/en/mcp).

</TabItem>
<TabItem value="claude" label="Claude Desktop">

Claude Desktop connects to the DevCycle MCP as a custom connector, so there's no configuration file to edit. Connectors added here are also available on claude.ai.

**Step 1: Add the DevCycle Connector**

1. Open Claude Desktop and go to **Customize** → **Connectors**
2. Click **"+ Add"**, then **"Add custom connector"**
3. Enter `DevCycle` as the name and `https://mcp.devcycle.com/mcp` as the remote MCP server URL, then click **"Continue"**
4. Keep the default authentication settings and click **"Add"**

**Team and Enterprise plans:** An Owner must first add the connector in **Organization settings** → **Connectors** using the same URL. Members then find DevCycle under **Customize** → **Connectors** and click **"Connect"**.

**Step 2: Authentication**

1. Click **"Connect"** on the DevCycle connector if you aren't prompted to sign in automatically
2. This will open a browser page at `mcp.devcycle.com` for authorization
3. Review and click **"Allow Access"** to grant permissions
4. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
5. Return to Claude Desktop and enable DevCycle from the **"+"** menu → **"Connectors"** in a conversation

Free plans are limited to one custom connector. For more details, see the [Claude custom connectors documentation](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).

</TabItem>
<TabItem value="codex" label="Codex CLI">

**Step 1: Access MCP Configuration**

Locate and edit your Codex configuration file. This file is shared by the Codex CLI, the Codex IDE extension, and the ChatGPT desktop app:

- **All platforms**: `~/.codex/config.toml`

**Step 2: Add DevCycle MCP Server**

Add the following TOML configuration to enable the DevCycle MCP server:

```toml
[mcp_servers.devcycle]
url = "https://mcp.devcycle.com/mcp"
```

**Step 3: Authentication**

Run the following command to log in to the DevCycle MCP server:

```bash
codex mcp login devcycle
```

1. This will open a browser page at `mcp.devcycle.com` for authorization
2. Review and click **"Allow Access"** to grant permissions
3. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
4. Start a new Codex session where the DevCycle MCP tools will be active

For more details, see the [OpenAI Codex MCP documentation](https://developers.openai.com/codex/mcp).

</TabItem>
<TabItem value="codex-app" label="Codex App">

The Codex app is now part of the ChatGPT desktop app, and shares its MCP configuration with the Codex CLI and IDE extension.

**Step 1: Add DevCycle MCP Server**

1. Open the ChatGPT desktop app and go to **Settings** → **MCP servers**
2. Click **"Add server"** and choose **Streamable HTTP**
3. Enter `devcycle` as the name and `https://mcp.devcycle.com/mcp` as the URL
4. Save the server, then click **"Restart"**

**Step 2: Authentication**

1. Click **"Authenticate"** next to the DevCycle server in the MCP servers list
2. This will open a browser page at `mcp.devcycle.com` for authorization
3. Review and click **"Allow Access"** to grant permissions
4. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
5. Return to the app where the DevCycle MCP tools will be active in Codex

For more details, see the [OpenAI Codex MCP documentation](https://developers.openai.com/codex/mcp).

</TabItem>
<TabItem value="cursor" label="Cursor">

<a href="cursor://anysphere.cursor-deeplink/mcp/install?name=DevCycle&config=eyJ1cmwiOiAiaHR0cHM6Ly9tY3AuZGV2Y3ljbGUuY29tL21jcCJ9Cg==" className="mcp-install-button" target="_blank" rel="noopener noreferrer">📦 Install in Cursor</a>

To open Cursor and automatically add the DevCycle MCP, click the install button above. Alternatively, go to **Customize** → **MCPs** in Cursor and click **"New MCP Server"**, which opens your `~/.cursor/mcp.json` file, then add the following configuration. To learn more, see the [Cursor documentation](https://cursor.com/docs/mcp).

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

1. After configuration, DevCycle MCP will be listed under **Needs Attention** as **"Needs authentication"** in **Customize** → **MCPs**
2. Click **"Authenticate"** on the DevCycle MCP server to initiate the authorization process
3. This opens a browser authorization page at `mcp.devcycle.com`
4. Review and click **"Allow Access"** to grant permissions
5. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
6. You'll be redirected back to Cursor with the server now active

</TabItem>
<TabItem value="vscode" label="VS Code">

<a href="https://vscode.dev/redirect/mcp/install?name=DevCycle&config=%7B%22url%22%3A%20%22https%3A%2F%2Fmcp.devcycle.com%2Fmcp%22%7D" className="mcp-install-button" target="_blank" rel="noopener noreferrer">📦 Install in VS Code</a>

To open VS Code and automatically add the DevCycle MCP, click the install button above. Alternatively, add the following to your workspace `.vscode/mcp.json` file, or run **"MCP: Open User Configuration"** from the Command Palette to add it for all workspaces. To learn more, see the [VS Code MCP documentation](https://code.visualstudio.com/docs/agent-customization/mcp-servers).

```json
{
  "servers": {
    "devcycle": {
      "type": "http",
      "url": "https://mcp.devcycle.com/mcp"
    }
  }
}
```

**Authentication in VS Code:**

1. After configuration, run **"MCP: List Servers"** from the Command Palette, or use the **Start** code lens in `mcp.json`
2. Select the DevCycle MCP server and start it
3. VS Code will show a dialog saying the MCP server definition wants to authenticate to `mcp.devcycle.com`
4. Click **"Allow"** to proceed with authentication
5. This opens a browser authorization page at `mcp.devcycle.com`
6. Review and click **"Allow Access"** to grant permissions
7. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
8. You'll be redirected back to VS Code with the server now active

</TabItem>
<TabItem value="opencode" label="OpenCode">

**Step 1: Add DevCycle MCP Server**

Run the following command and follow the interactive prompts to add the DevCycle MCP server (name: `devcycle`, type: `remote`, url: `https://mcp.devcycle.com/mcp`):

```bash
opencode mcp add
```

**Step 2: Authenticate**

Run the following command to authenticate with DevCycle:

```bash
opencode mcp auth devcycle
```

1. This will open a browser page at `mcp.devcycle.com` for authorization
2. Review and click **"Allow Access"** to grant permissions
3. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
4. Return to your terminal where authentication will complete

The next time you start OpenCode, the DevCycle MCP tools will be available.

For more details, see the [OpenCode MCP documentation](https://opencode.ai/docs/mcp-servers/).

</TabItem>
<TabItem value="antigravity" label="Antigravity CLI">

Antigravity CLI replaces Gemini CLI. The same MCP configuration is shared by Antigravity CLI and the Antigravity desktop app.

**Step 1: Access MCP Configuration**

Locate and edit your Antigravity MCP configuration file:

- **All platforms**: `~/.gemini/config/mcp_config.json`

**Step 2: Add DevCycle MCP Server**

Add or merge the following configuration to enable the DevCycle MCP server:

```json
{
  "mcpServers": {
    "devcycle": {
      "serverUrl": "https://mcp.devcycle.com/mcp"
    }
  }
}
```

**Step 3: Manage MCP Connection**

Start Antigravity CLI with `agy`, then enter the MCP management interface:

```bash
/mcp
```

**Step 4: Authentication**

1. Use the arrow keys to select the DevCycle server, choose **Authenticate**, and press Enter
2. This will open a browser page at `mcp.devcycle.com` for authorization
3. Review and click **"Allow Access"** to grant permissions
4. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
5. If prompted, paste the authorization code back into the terminal
6. Return to Antigravity CLI where the DevCycle MCP tools will be active

For more details, see the [Antigravity MCP documentation](https://antigravity.google/docs/mcp).

</TabItem>
<TabItem value="devin-desktop" label="Devin Desktop">

Devin Desktop (formerly Windsurf) configures MCP servers for its default Devin Local agent in the Devin config files.

**Step 1: Access MCP Configuration**

Locate and edit your Devin MCP configuration file:

- **macOS/Linux**: `~/.config/devin/mcp_config.json`
- **Windows**: `%APPDATA%\devin\mcp_config.json`

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

**Step 3: Authentication**

Run the following command to log in to the DevCycle MCP server:

```bash
devin mcp login devcycle
```

1. This will open a browser page at `mcp.devcycle.com` for authorization
2. Review and click **"Allow Access"** to grant permissions
3. If you have multiple organizations, select your desired organization at `auth.devcycle.com`
4. Return to Devin Desktop and open a new agent tab where the DevCycle MCP tools will be active

For more details, see the [Devin MCP documentation](https://docs.devin.ai/cli/extensibility/mcp/configuration).

</TabItem>
</Tabs>

<br></br>

## Available Tools

The DevCycle MCP Server provides comprehensive feature flag management tools organized into **6 categories**:

| Category                       | Tools                                                                                                                                                                                                                               | Description                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Feature Management**         | `list_features`, `create_feature`, `update_feature`, `update_feature_status`, `delete_feature`, `cleanup_feature`, `get_feature_audit_log_history`                                                                                     | Create and manage feature flags             |
| **Variable Management**        | `list_variables`, `create_variable`, `update_variable`, `delete_variable`                                                                                                                                                             | Manage feature variables                    |
| **Project Management**         | `get_current_project`, `select_project`                                                                                                                                                                             | Project selection and details               |
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
