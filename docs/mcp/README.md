# DevCycle MCP Server

DevCycle Model Context Protocol (MCP) Server provides AI assistants with direct access to your DevCycle feature flags, allowing for intelligent feature management and development workflows.

## What is MCP?

The Model Context Protocol (MCP) is an open standard that enables AI applications to securely connect to data sources and tools. Think of MCP as "USB-C for AI" - a standardized way to connect AI models to different services.

## Overview

The DevCycle MCP Server brings DevCycle's feature flag management capabilities directly into your AI development workflow. With MCP, AI assistants like Claude Desktop, Cursor, and others can:

- **Manage Feature Flags**: Create, read, update, and delete feature flags
- **Control Targeting**: Modify targeting rules and user segments
- **Monitor Environments**: Switch between development, staging, and production
- **Analyze Variables**: Inspect variable values and configurations
- **Generate Code**: Create feature flag implementation code
- **Debug Issues**: Troubleshoot feature flag problems with context

## Key Features

### 🚀 Feature Flag Management

- Create and configure new feature flags
- Update existing flag settings and variations
- Enable/disable features across environments
- Manage feature flag lifecycle

### 🎯 Intelligent Targeting

- Configure user targeting rules
- Set up percentage rollouts
- Manage audience segments
- A/B testing configuration

### 🔧 Development Integration

- Generate feature flag code snippets
- SDK configuration assistance
- Environment-specific settings
- Integration with your codebase

### 📊 Analytics & Monitoring

- Feature flag usage analytics
- Performance impact analysis
- User experience insights
- Flag health monitoring

## Architecture

The DevCycle MCP Server acts as a bridge between AI assistants and the DevCycle platform:

```
┌─────────────────────────────────────┐
│ AI Assistant (Claude, Cursor, etc.) │
│ ┌─────────────────────────────────┐ │
│ │ 🧠 LLM processes your requests  │ │
│ │ "Create a feature flag for..."  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
         │
         │ MCP Protocol
         ▼
┌─────────────────────────────────────┐
│ DevCycle MCP Server                 │
│ • Authentication                    │
│ • Tool definitions                  │
│ • API integration                   │
└─────────────────────────────────────┘
         │
         │ DevCycle Management API
         ▼
┌─────────────────────────────────────┐
│ DevCycle Platform                   │
│ • Feature Flags                     │
│ • Environments                      │
│ • Projects & Organizations          │
└─────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- DevCycle account with API access
- AI client that supports MCP (Claude Desktop, Cursor, etc.)
- Node.js 18+ or Python 3.8+

### Installation

1. **Install the DevCycle CLI** (includes MCP server):

```bash
npm install -g @devcycle/cli
```

2. **Authenticate with DevCycle**:

```bash
dvc login
```

3. **Start the MCP server**:

```bash
dvc mcp start
```

### Configuration

#### For Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc",
      "args": ["mcp", "server"],
      "env": {
        "DVC_CLIENT_ID": "your-client-id",
        "DVC_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

#### For Cursor IDE

Add to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": ["dvc", "mcp", "server"],
      "env": {
        "DVC_CLIENT_ID": "your-client-id",
        "DVC_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

## Example Usage

Once configured, you can interact with DevCycle through natural language:

### Creating Feature Flags

```
You: "Create a feature flag called 'new-checkout-flow' for the checkout redesign"

AI: I'll create that feature flag for you with appropriate variables and targeting rules.
```

### Managing Environments

```
You: "Enable the new-checkout-flow flag in staging environment"

AI: I've enabled the 'new-checkout-flow' flag in your staging environment with 100% rollout.
```

### Analyzing Performance

```
You: "Show me the performance impact of the new-checkout-flow flag"

AI: Based on your flag analytics, the new-checkout-flow has improved conversion rates by 12% with no negative performance impact.
```

## Authentication

The MCP server requires DevCycle API credentials:

1. **Get API Credentials**:

   - Go to DevCycle Dashboard → Settings → API Keys
   - Create a new API key with appropriate permissions

2. **Configure Environment Variables**:

```bash
export DVC_CLIENT_ID="your-client-id"
export DVC_CLIENT_SECRET="your-client-secret"
```

## Available Tools

The DevCycle MCP server provides these tools to AI assistants:

| Tool                | Description                               |
| ------------------- | ----------------------------------------- |
| `list_features`     | Get all feature flags in a project        |
| `create_feature`    | Create a new feature flag                 |
| `get_feature`       | Get details for a specific feature flag   |
| `update_feature`    | Update feature flag settings              |
| `delete_feature`    | Remove a feature flag                     |
| `list_environments` | Get all environments in a project         |
| `get_targeting`     | Get targeting rules for a feature         |
| `update_targeting`  | Modify targeting rules                    |
| `get_variables`     | List variables for a feature              |
| `create_variable`   | Add a new variable                        |
| `generate_code`     | Generate feature flag implementation code |

## Security & Permissions

The MCP server respects DevCycle's security model:

- **API Key Permissions**: Only operations allowed by your API key are available
- **Environment Protection**: Production environments require explicit confirmation
- **Audit Logging**: All actions are logged in DevCycle's audit trail
- **Rate Limiting**: API rate limits are enforced

## Troubleshooting

### Common Issues

**Connection Failed**

- Verify API credentials are correct
- Check network connectivity to DevCycle APIs
- Ensure MCP client is properly configured

**Permission Denied**

- Verify API key has required permissions
- Check if you have access to the specified project/environment

**Server Not Starting**

- Ensure DevCycle CLI is installed and up to date
- Check for port conflicts (default: 3001)
- Review error logs for specific issues

### Getting Help

- Check the [MCP User Guides](/mcp-guides/) for detailed examples
- Review [DevCycle API Documentation](/management-api/)
- Contact support through the DevCycle dashboard

## What's Next?

- Explore [MCP User Guides](/mcp-guides/) for detailed tutorials
- Learn about [Advanced Configuration](/mcp/configuration)
- See [Integration Examples](/mcp/examples) for your platform
- Check out [Best Practices](/mcp/best-practices) for optimal usage

---

**Note**: The DevCycle MCP Server is currently in beta. Features and API may change. Please provide feedback through our [GitHub repository](https://github.com/DevCycleHQ/cli) or support channels.
