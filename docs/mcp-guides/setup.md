---
title: Setup & Configuration
sidebar_position: 1
description: Set up the DevCycle MCP server with your AI client
---

# Setup & Configuration

This guide walks you through setting up the DevCycle MCP Server with various AI clients. The setup process involves installing the DevCycle CLI, configuring authentication, and connecting your AI client to the MCP server.

## Prerequisites

Before you begin, ensure you have:

- **DevCycle Account**: Sign up at [devcycle.com](https://devcycle.com) if you don't have one
- **API Credentials**: Management API access in your DevCycle organization
- **AI Client**: One of the supported MCP clients (Claude Desktop, Cursor, VS Code, etc.)
- **Node.js**: Version 18 or higher (for CLI installation)

## Step 1: Install DevCycle CLI

The DevCycle MCP Server is included with the DevCycle CLI. Install it globally:

```bash
npm install -g @devcycle/cli
```

Verify the installation:

```bash
dvc --version
```

## Step 2: Authentication

### Get API Credentials

1. Log into your DevCycle dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Select appropriate permissions:

   - **Read**: View feature flags and configurations
   - **Write**: Create and modify feature flags
   - **Admin**: Full access including environment management

5. Copy your **Client ID** and **Client Secret**

### Configure Authentication

Set up your credentials using one of these methods:

#### Option A: Interactive Login

```bash
dvc login
```

Follow the prompts to authenticate via your browser.

#### Option B: Environment Variables

```bash
export DVC_CLIENT_ID="your-client-id"
export DVC_CLIENT_SECRET="your-client-secret"
```

#### Option C: Configuration File

Create `~/.devcycle/config.json`:

```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "organization": "your-org-id"
}
```

## Step 3: Start MCP Server

Start the DevCycle MCP server:

```bash
dvc mcp start
```

The server will start on port `3001` by default. You should see:

```
✅ DevCycle MCP Server started on port 3001
🔗 Ready to accept connections from MCP clients
```

## Step 4: Configure Your AI Client

Choose your AI client and follow the appropriate configuration:

### Claude Desktop

1. **Locate the config file**:

   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add DevCycle MCP server**:

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

3. **Restart Claude Desktop**

### Cursor IDE

1. **Create MCP configuration** in your project root `.cursor/mcp.json`:

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

2. **Enable MCP in Cursor**:
   - Open **Cursor Settings** → **MCP**
   - Enable the DevCycle server
   - Restart Cursor

### VS Code (with MCP Extension)

1. **Install MCP extension** from the VS Code marketplace

2. **Configure in settings.json**:

```json
{
  "mcp.servers": {
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

### Windsurf

1. **Open Windsurf Settings** → **MCP**

2. **Add server configuration**:

```json
{
  "mcpServers": {
    "devcycle": {
      "serverUrl": "http://localhost:3001",
      "headers": {
        "Authorization": "Bearer your-api-token"
      }
    }
  }
}
```

## Step 5: Verify Connection

Test the connection in your AI client:

```
You: "What DevCycle tools do you have available?"

AI: I have access to DevCycle MCP tools including:
- list_features: Get all feature flags
- create_feature: Create new feature flags
- get_feature: Get feature details
- update_feature: Modify feature settings
- list_environments: View environments
- And more...
```

## Advanced Configuration

### Custom Port

Run the MCP server on a different port:

```bash
dvc mcp start --port 3002
```

Update your client configuration accordingly:

```json
{
  "command": "dvc",
  "args": ["mcp", "server", "--port", "3002"]
}
```

### Specific Project

Configure for a specific DevCycle project:

```bash
dvc mcp start --project "your-project-key"
```

Or set via environment:

```json
{
  "env": {
    "DVC_CLIENT_ID": "your-client-id",
    "DVC_CLIENT_SECRET": "your-client-secret",
    "DVC_PROJECT": "your-project-key"
  }
}
```

### Remote Server

Run the MCP server remotely and connect via HTTP:

1. **Start server with HTTP transport**:

```bash
dvc mcp start --transport http --host 0.0.0.0 --port 3001
```

2. **Configure client for HTTP**:

```json
{
  "mcpServers": {
    "devcycle": {
      "transport": {
        "type": "http",
        "url": "http://your-server:3001/mcp"
      },
      "auth": {
        "type": "bearer",
        "token": "your-api-token"
      }
    }
  }
}
```

### Docker Deployment

Deploy using Docker:

1. **Create Dockerfile**:

```dockerfile
FROM node:18-alpine
RUN npm install -g @devcycle/cli
EXPOSE 3001
CMD ["dvc", "mcp", "start", "--host", "0.0.0.0"]
```

2. **Build and run**:

```bash
docker build -t devcycle-mcp .
docker run -p 3001:3001 \
  -e DVC_CLIENT_ID="your-client-id" \
  -e DVC_CLIENT_SECRET="your-client-secret" \
  devcycle-mcp
```

## Troubleshooting

### Common Issues

**"Command not found: dvc"**

- Reinstall the CLI: `npm install -g @devcycle/cli`
- Check your PATH includes npm global binaries

**"Authentication failed"**

- Verify your Client ID and Client Secret are correct
- Check API key permissions in DevCycle dashboard
- Ensure environment variables are set correctly

**"Connection refused"**

- Verify MCP server is running: `dvc mcp status`
- Check if port 3001 is available: `lsof -i :3001`
- Try a different port: `dvc mcp start --port 3002`

**"No tools available in AI client"**

- Restart your AI client after configuration changes
- Check MCP server logs: `dvc mcp logs`
- Verify client configuration syntax is correct

### Debug Mode

Enable debug logging:

```bash
dvc mcp start --debug
```

This provides detailed logs of MCP protocol communication and API calls.

### Health Check

Check server status:

```bash
# Check if server is running
dvc mcp status

# View recent logs
dvc mcp logs

# Test API connectivity
dvc mcp test
```

## Security Considerations

### API Key Security

- **Never commit** API keys to version control
- **Use environment variables** for production deployments
- **Rotate keys** regularly in DevCycle dashboard
- **Limit permissions** to minimum required scope

### Network Security

- **Use HTTPS** for remote deployments
- **Configure firewall** rules for MCP server port
- **Consider VPN** for internal network access
- **Monitor access logs** for suspicious activity

### Client Security

- **Keep clients updated** to latest versions
- **Review MCP extensions** before installation
- **Monitor tool usage** in DevCycle audit logs
- **Use least privilege** API keys per client

## Next Steps

Now that your MCP server is configured:

1. **Explore Feature Management** → [Feature Management Guide](/mcp-guides/feature-management)
2. **Set up Targeting Rules** → [Targeting & Rollouts Guide](/mcp-guides/targeting)
3. **Manage Environments** → [Environment Management Guide](/mcp-guides/environments)
4. **Learn Best Practices** → [MCP Best Practices](/mcp-guides/best-practices)

## Getting Help

If you encounter issues:

- **Check logs**: `dvc mcp logs --tail`
- **Review documentation**: [MCP Reference](/mcp/)
- **Contact support**: Through DevCycle dashboard
- **Community**: Join our Discord for real-time help
