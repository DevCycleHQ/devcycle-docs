---
title: MCP Reference
sidebar_position: 2
description: Complete reference for the DevCycle Model Context Protocol Server
---

# DevCycle MCP Reference

The DevCycle Model Context Protocol (MCP) Server enables AI assistants to manage feature flags, environments, and projects through natural language interactions.

## Quick Setup

### Prerequisites

- **Node.js 16+** installed
- **DevCycle CLI** installed globally: `npm install -g @devcycle/cli`
- **DevCycle account** with API credentials or SSO authentication

### Installation & Authentication

1. **Install DevCycle CLI**:

```bash
npm install -g @devcycle/cli
```

2. **Authenticate**:

```bash
dvc login sso
```

3. **Select Project**:

```bash
dvc projects select
```

### AI Client Configuration

#### Cursor

Add to `.cursor/mcp_settings.json`:

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

#### Claude Desktop

Add to `claude_desktop_config.json`:

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

#### VS Code with Continue

Add to `.continue/config.json`:

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

## Available Tools

The DevCycle MCP Server includes **35+ tools** organized into **7 categories**:

### Feature Management (9 tools)

- `list_features` - List all features with search and pagination
- `create_feature` ⚠️ - Create new feature flags
- `update_feature` ⚠️ - Update existing feature flags
- `update_feature_status` ⚠️ - Change feature status (active/complete/archived)
- `delete_feature` ⚠️⚠️ - Delete feature from ALL environments
- `fetch_feature_variations` - Get all variations for a feature
- `create_feature_variation` ⚠️ - Add new variations to features
- `update_feature_variation` ⚠️ - Modify existing variation properties
- `get_feature_audit_log_history` - Get timeline of feature changes

### Feature Targeting (4 tools)

- `enable_feature_targeting` ⚠️ - Enable targeting in environment
- `disable_feature_targeting` ⚠️ - Disable targeting in environment
- `list_feature_targeting` - View targeting configurations
- `update_feature_targeting` ⚠️ - Configure complex targeting rules

### Variable Management (3 tools)

- `list_variables` - List all variables with filtering
- `create_variable` ⚠️ - Create new variables
- `update_variable` ⚠️ - Update variable properties
- `delete_variable` ⚠️⚠️ - Remove variables from all environments

### Environment Management (3 tools)

- `list_environments` - List all environments
- `get_sdk_keys` - Retrieve SDK keys for environments
- `create_environment` ⚠️ - Create new environments
- `update_environment` ⚠️ - Update environment settings

### Project Management (3 tools)

- `list_projects` - List all available projects
- `get_current_project` - Get currently selected project
- `create_project` ⚠️ - Create new projects
- `update_project` ⚠️ - Update project settings

### Custom Properties Management (4 tools)

- `list_custom_properties` - List user segmentation properties
- `create_custom_property` ⚠️ - Create new custom property
- `update_custom_property` ⚠️ - Update custom property
- `delete_custom_property` ⚠️⚠️ - Delete custom property

### Self-Targeting & Overrides (6 tools)

- `get_self_targeting_identity` - Get current DevCycle identity
- `update_self_targeting_identity` - Set identity for testing
- `list_self_targeting_overrides` - View your current overrides
- `set_self_targeting_override` ⚠️ - Override feature variations
- `clear_feature_self_targeting_overrides` ⚠️ - Clear feature-specific overrides
- `clear_all_self_targeting_overrides` ⚠️ - Clear all project overrides

### Results & Analytics (2 tools)

- `get_feature_total_evaluations` - Get evaluation metrics for feature
- `get_project_total_evaluations` - Get evaluation metrics for project

## Production Safety

The AI assistant will always:

- Confirm before making changes to production environments
- Warn about destructive operations
- Use ⚠️ for tools that can affect production
- Use ⚠️⚠️ for destructive operations (delete actions)

## Authentication Methods

### 1. CLI Authentication (Recommended for local development)

```bash
dvc login sso
dvc projects select
```

### 2. Environment Variables (Recommended for CI/CD)

```bash
export DEVCYCLE_CLIENT_ID="your-client-id"
export DEVCYCLE_CLIENT_SECRET="your-client-secret"
export DEVCYCLE_PROJECT_KEY="your-project-key"
```

## Advanced Configuration

### Using Environment Variables with AI Clients

#### Cursor with Environment Variables

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp",
      "args": [],
      "env": {
        "DEVCYCLE_CLIENT_ID": "your-client-id",
        "DEVCYCLE_CLIENT_SECRET": "your-client-secret",
        "DEVCYCLE_PROJECT_KEY": "your-project-key"
      }
    }
  }
}
```

#### Claude Desktop with Environment Variables

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp",
      "args": [],
      "env": {
        "DEVCYCLE_CLIENT_ID": "your-client-id",
        "DEVCYCLE_CLIENT_SECRET": "your-client-secret",
        "DEVCYCLE_PROJECT_KEY": "your-project-key"
      }
    }
  }
}
```

## Example Usage

### Creating Feature Flags

```
You: "Create a feature flag for the new header design"
AI: I'll create a feature flag called 'new-header-design' with:
- Boolean variable 'enabled' (default: false)
- Available in all environments (development, staging, production)
- Targeting disabled initially
- Ready for gradual rollout when you're ready
```

### Managing Targeting

```
You: "Enable the checkout-optimization flag for 25% of users in production"
AI: ✅ Updated 'checkout-optimization' targeting in production:
- Audience: All users
- Rollout: 25% of matching users
- Environment: production
- Monitoring enabled for performance metrics
```

### Self-Targeting for Testing

```
You: "Set up my identity to test the premium user experience"
AI: I'll configure your DevCycle identity and set overrides so you see the premium variations...
```

### Analytics and Monitoring

```
You: "Show me evaluation metrics for the mobile-redesign feature over the last week"
AI: 📊 mobile-redesign Evaluation Metrics (Last 7 Days):
- Total Evaluations: 45,230
- Desktop: 28,450 (63%)
- Mobile: 16,780 (37%)
```

## Error Handling

The MCP server returns structured error responses with:

- Detailed error messages
- Tool name that failed
- Suggested fixes

Common error scenarios:

- **Authentication failures**: Check credentials and project configuration
- **API rate limits**: Implement retry logic
- **Invalid parameters**: Review tool parameters and schemas

## Current Limitations

The MCP server does **NOT** currently support:

- Code analysis tools (usage scanning, cleanup)
- Git integration features
- Type generation
- Advanced analytics and metrics
- File system operations

## Best Practices

### 1. Production Safety

- Tools marked ⚠️ can affect production - confirm before proceeding
- Tools marked ⚠️⚠️ are destructive - require extra confirmation
- Test in development/staging environments first

### 2. Naming Conventions

- Use `lowercase-kebab-case` for feature and variable keys
- Pattern: `^[a-z0-9-_.]+$` (max 100 characters)
- Be descriptive: `checkout-optimization` vs `flag1`

### 3. Self-Targeting Best Practices

- Clear overrides after testing sessions
- Use meaningful user IDs for team collaboration
- Document override purposes

### 4. Audit and Compliance

- Use `get_feature_audit_log_history` for compliance tracking
- Tag features appropriately for organization
- Review changes regularly through audit logs

## Development & Local Testing

### Running from Source

```bash
git clone https://github.com/DevCycleHQ/cli.git
cd cli
npm install
npm run build
npm link
dvc-mcp
```

### Debug Logging

```bash
export DEBUG=1
dvc-mcp
```

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/DevCycleHQ/cli/issues)
- **Documentation**: [DevCycle Docs](https://docs.devcycle.com)
- **Community**: [Discord](https://discord.gg/devcycle)
- **Support**: [Contact Support](https://devcycle.com/contact)

The MCP server logs all operations to stderr, which can be viewed in:

- Cursor: Developer Tools console
- Claude Desktop: Log files in the application support directory
- Other clients: Check client-specific logging locations
