---
title: MCP Reference
sidebar_position: 2
description: Complete reference for the DevCycle Model Context Protocol Server
---

# DevCycle MCP Reference

This page provides comprehensive documentation for all 35+ DevCycle MCP tools. For setup instructions, see [MCP Getting Started](/cli-mcp/mcp-getting-started).

## Available Tools

The DevCycle MCP Server provides comprehensive feature flag management capabilities through **35+ tools** organized into **7 categories**:

- [Feature Management](#feature-management)
- [Environment Management](#environment-management)
- [Variable Management](#variable-management)
- [Targeting Rules](#targeting-rules)
- [Self-Targeting](#self-targeting)
- [Analytics & Monitoring](#analytics-and-monitoring)
- [Error Handling](#error-handling)

:::info
**Production Safety**

- Tools marked ⚠️ can affect production - confirm before proceeding
- Tools marked ⚠️⚠️ are destructive - require extra confirmation

:::

### Feature Management

#### `list_features`

List all features in the current project with optional search and pagination.

**Parameters:**

- `search` (optional): Search query to filter features
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 100, max: 1000)

#### `create_feature` ⚠️

Create a new feature flag.

**Parameters:**

- `key`: Unique feature key (pattern: `^[a-z0-9-_.]+$`)
- `name`: Human-readable name (max 100 chars)
- `description` (optional): Feature description (max 1000 chars)
- `type` (optional): Feature type (`release`, `experiment`, `permission`, `ops`)
- `tags` (optional): Array of tags for organization
- `variations` (optional): Array of variations with key, name, and variables
- `configurations` (optional): Environment-specific configurations
- `sdkVisibility` (optional): SDK visibility settings

#### `update_feature` ⚠️

Update an existing feature flag.

**Parameters:**

- `key`: Feature key to update
- `name` (optional): New name
- `description` (optional): New description
- `type` (optional): New type
- `tags` (optional): New tags
- `variations` (optional): Updated variations

#### `update_feature_status` ⚠️

Update the status of a feature flag.

**Parameters:**

- `key`: Feature key
- `status`: New status (`active`, `complete`, `archived`)
- `staticVariation` (optional): Variation to serve if status is `complete`

#### `delete_feature` ⚠️⚠️

Delete a feature flag from ALL environments.

**Parameters:**

- `key`: Feature key to delete

#### `fetch_feature_variations`

Get all variations for a feature.

**Parameters:**

- `feature_key`: Feature key

#### `create_feature_variation` ⚠️

Create a new variation within a feature.

**Parameters:**

- `feature_key`: Feature key
- `key`: Unique variation key
- `name`: Variation name
- `variables` (optional): Variable values for this variation

#### `update_feature_variation` ⚠️

Update an existing variation by key.

**Parameters:**

- `feature_key`: Feature key
- `variation_key`: Variation to update
- `_id` (optional): MongoDB ID for the variation
- `key` (optional): New variation key
- `name` (optional): New variation name
- `variables` (optional): Updated variable values

#### `get_feature_audit_log_history`

Get timeline of feature flag changes from audit log.

**Parameters:**

- `feature_key`: Feature key
- `days_back` (optional): Days to look back (default: 30, max: 365)

### Feature Targeting

#### `enable_feature_targeting` ⚠️

Enable targeting for a feature in an environment.

**Parameters:**

- `feature_key`: Feature key
- `environment_key`: Environment key

#### `disable_feature_targeting` ⚠️

Disable targeting for a feature in an environment.

**Parameters:**

- `feature_key`: Feature key
- `environment_key`: Environment key

#### `list_feature_targeting`

List targeting rules for a feature.

**Parameters:**

- `feature_key`: Feature key
- `environment_key` (optional): Specific environment (returns all if omitted)

#### `update_feature_targeting` ⚠️

Update targeting rules for a feature in an environment.

**Parameters:**

- `feature_key`: Feature key
- `environment_key`: Environment key
- `status` (optional): Targeting status (`active`, `inactive`, `archived`)
- `targets` (optional): Array of targeting rules with audience filters and distributions

### Variable Management

#### `list_variables`

List all variables in the current project.

**Parameters:**

- `search` (optional): Search query
- `page` (optional): Page number
- `per_page` (optional): Items per page

#### `create_variable` ⚠️

Create a new variable.

**Parameters:**

- `key`: Unique variable key (pattern: `^[a-z0-9-_.]+$`)
- `type`: Variable type (`String`, `Boolean`, `Number`, `JSON`)
- `name` (optional): Variable name
- `description` (optional): Variable description
- `defaultValue` (optional): Default value
- `_feature` (optional): Associated feature key
- `validationSchema` (optional): Validation rules

#### `update_variable` ⚠️

Update an existing variable.

**Parameters:**

- `key`: Variable key to update
- `name` (optional): New name
- `description` (optional): New description
- `type` (optional): New type
- `validationSchema` (optional): New validation rules

#### `delete_variable` ⚠️⚠️

Delete a variable from ALL environments.

**Parameters:**

- `key`: Variable key to delete

### Environment Management

#### `list_environments`

List all environments in the current project.

**Parameters:**

- `search` (optional): Search query (min 3 chars)
- `page` (optional): Page number
- `perPage` (optional): Items per page
- `sortBy` (optional): Sort field
- `sortOrder` (optional): Sort order (`asc`, `desc`)

#### `get_sdk_keys`

Get SDK keys for an environment.

**Parameters:**

- `environmentKey`: Environment key
- `keyType` (optional): Specific key type (`mobile`, `server`, `client`)

#### `create_environment` ⚠️

Create a new environment.

**Parameters:**

- `key`: Unique environment key
- `name`: Environment name
- `description` (optional): Environment description
- `color` (optional): Environment color

#### `update_environment` ⚠️

Update an existing environment.

**Parameters:**

- `key`: Environment key to update
- `name` (optional): New name
- `description` (optional): New description
- `color` (optional): New color

### Project Management

#### `list_projects`

List all projects in the current organization.

**Parameters:**

- `search` (optional): Search query
- `page` (optional): Page number
- `perPage` (optional): Items per page
- `sortBy` (optional): Sort field
- `sortOrder` (optional): Sort order (`asc`, `desc`)

#### `get_current_project`

Get the currently selected project.

**Parameters:** None

#### `create_project` ⚠️

Create a new project.

**Parameters:**

- `key`: Unique project key
- `name`: Project name
- `description` (optional): Project description
- `color` (optional): Project color

#### `update_project` ⚠️

Update an existing project.

**Parameters:**

- `key`: Project key to update
- `name` (optional): New name
- `description` (optional): New description
- `color` (optional): New color

### Custom Properties Management

#### `list_custom_properties`

List all custom properties in the current project.

**Parameters:**

- `search` (optional): Search query
- `page` (optional): Page number
- `perPage` (optional): Items per page

#### `create_custom_property` ⚠️

Create a new custom property for user segmentation.

**Parameters:**

- `key`: Unique property key
- `name`: Property name
- `type`: Property type (`String`, `Boolean`, `Number`)
- `propertyKey`: Property key used to identify the custom property in user data
- `schema` (optional): Schema definition with validation rules

#### `update_custom_property` ⚠️

Update an existing custom property.

**Parameters:**

- `key`: Property key to update
- `name` (optional): New name
- `type` (optional): New type
- `propertyKey` (optional): New property key
- `schema` (optional): New schema definition

#### `delete_custom_property` ⚠️⚠️

Delete a custom property from ALL environments.

**Parameters:**

- `key`: Property key to delete

### Self-Targeting & Overrides

#### `get_self_targeting_identity`

Get current DevCycle identity for self-targeting.

**Parameters:** None

#### `update_self_targeting_identity`

Update DevCycle identity for testing.

**Parameters:**

- `dvc_user_id`: DevCycle User ID (use empty string to clear)

#### `list_self_targeting_overrides`

List all active overrides for the current project.

**Parameters:** None

#### `set_self_targeting_override` ⚠️

Set an override to test a specific variation.

**Parameters:**

- `feature_key`: Feature key
- `environment_key`: Environment key
- `variation_key`: Variation to serve

#### `clear_feature_self_targeting_overrides` ⚠️

Clear overrides for a specific feature/environment.

**Parameters:**

- `feature_key`: Feature key
- `environment_key`: Environment key

#### `clear_all_self_targeting_overrides` ⚠️

Clear all overrides for the current project.

**Parameters:** None

### Results & Analytics

#### `get_feature_total_evaluations`

Get total variable evaluations per time period for a specific feature.

**Parameters:**

- `featureKey`: Feature key
- `startDate` (optional): Start date as Unix timestamp (milliseconds since epoch)
- `endDate` (optional): End date as Unix timestamp (milliseconds since epoch)
- `platform` (optional): Platform filter for evaluation results
- `variable` (optional): Variable key filter for evaluation results
- `environment` (optional): Environment key to filter results
- `period` (optional): Time aggregation period (`day`, `hour`, `month`)
- `sdkType` (optional): Filter by SDK type (`client`, `server`, `mobile`, `api`)

#### `get_project_total_evaluations`

Get total variable evaluations per time period for the entire project.

**Parameters:**

- `startDate` (optional): Start date as Unix timestamp (milliseconds since epoch)
- `endDate` (optional): End date as Unix timestamp (milliseconds since epoch)
- `platform` (optional): Platform filter for evaluation results
- `variable` (optional): Variable key filter for evaluation results
- `environment` (optional): Environment key to filter results
- `period` (optional): Time aggregation period (`day`, `hour`, `month`)
- `sdkType` (optional): Filter by SDK type (`client`, `server`, `mobile`, `api`)

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

## Error Handling

The MCP server returns structured error responses with:

- Detailed error messages
- Tool name that failed
- Suggested fixes

```json
{
  "error": true,
  "message": "Detailed error message",
  "tool": "tool_name",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Common error scenarios:

- **Authentication failures**: Check credentials and project configuration
- **API rate limits**: Implement retry logic in your automation
- **Validation errors**: Ensure parameters meet requirements (patterns, lengths, etc.)
- **Permission errors**: Verify your API key has necessary permissions

## Current Limitations

The MCP server does **NOT** currently support:

- Code analysis tools (usage scanning, cleanup)
- Git integration features
- Type generation
- MCP Resources (read-only data access)
- MCP Prompts (guided workflows)

These features are planned for future releases.

## Development & Local Testing

### Running from Source

```bash
# Clone the repository
git clone https://github.com/DevCycleHQ/cli.git
cd cli

# Install dependencies
yarn install

# Build the project
yarn build

# Run the MCP server
node dist/mcp/index.js
```

### Testing with AI Assistants

For local testing, update your AI assistant configuration to point to the local build:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "node",
      "args": ["/path/to/cli/dist/mcp/index.js"]
    }
  }
}
```

### Debug Logging

The MCP server logs all operations to stderr, which can be viewed in:

- Cursor: Developer Tools console
- Claude Desktop: Log files in the application support directory

### Environment Variables for Development

```bash
# Enable verbose logging
export DEBUG=1

# Use specific DevCycle API endpoint
export DEVCYCLE_API_URL="https://api.devcycle.com"
```

## Getting Help

- **GitHub Issues**: [GitHub Issues](https://github.com/DevCycleHQ/cli/issues)
- **General Documentation**: [DevCycle Docs](https://docs.devcycle.com)
- **DevCycle Community**: [Discord](https://discord.gg/8uEqSsRKy5)
- **Support**: [Contact Support](mailto:support@devcycle.com)
