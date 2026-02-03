---
title: MCP Reference
sidebar_position: 2
description: Complete reference for the DevCycle Model Context Protocol Server
---

# DevCycle MCP Reference

This page provides comprehensive documentation for all DevCycle MCP tools. For setup instructions, see [MCP Getting Started](/cli-mcp/mcp-getting-started).

## Available Tools

The DevCycle MCP Server provides comprehensive feature flag management capabilities through tools organized into **6 categories**:

- [Feature Management](#feature-management)
- [Variable Management](#variable-management)
- [Project Management](#project-management)
- [Self-Targeting & Overrides](#self-targeting--overrides)
- [Results & Analytics](#results--analytics)
- [SDK Installation](#sdk-installation)

:::info
**Production Safety**

- Tools marked ⚠️ can affect production - confirm before proceeding
- Tools marked ⚠️⚠️ are destructive - require extra confirmation

:::

### Feature Management

#### `list_features`

List all features in the current project with optional search and pagination.

**Parameters:**

- `search` (optional): Search query to filter features (minimum 3 characters)
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 100, max: 1000)
- `sortBy` (optional): Sort field (`createdAt`, `updatedAt`, `name`, `key`, `createdBy`, `propertyKey`)
- `sortOrder` (optional): Sort order (`asc`, `desc`)
- `staleness` (optional): Filter by staleness (`all`, `unused`, `released`, `unmodified`, `notStale`)
- `createdBy` (optional): Filter by creator user ID
- `type` (optional): Feature type (`release`, `experiment`, `permission`, `ops`)
- `status` (optional): Feature status (`active`, `complete`, `archived`)

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
- `variables` (optional): Array of variables to create or reassociate with this feature
- `controlVariation` (optional): The key of the variation that is used as the control for Metrics
- `settings` (optional): Feature-level settings configuration

#### `update_feature` ⚠️

Update an existing feature flag.

**Parameters:**

- `key`: Feature key to update
- `name` (optional): New name
- `description` (optional): New description
- `type` (optional): New type
- `tags` (optional): New tags
- `variations` (optional): Updated variations
- `variables` (optional): Updated array of variables for this feature
- `settings` (optional): Updated feature-level settings configuration
- `sdkVisibility` (optional): Updated SDK visibility settings
- `controlVariation` (optional): Updated control variation key for Metrics

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

#### `cleanup_feature`

Fetch the DevCycle Feature Cleanup prompt and return its markdown content to guide safe cleanup of a completed feature and its variables in codebases.

**Parameters:**

- `featureKey`: The feature key you plan to clean up (used for context in the prompt)

#### `get_feature_audit_log_history`

Get feature flag audit log history from DevCycle. Returns audit log entities matching the DevCycle API schema with date, a0_user, and changes fields.

**Parameters:**

- `feature_key`: Feature key
- `page` (optional): Page number for pagination (default: 1)
- `perPage` (optional): Number of items per page (default: 100, max: 1000)
- `sortBy` (optional): Field to sort by (`createdAt`, `updatedAt`, `action`, `user`) (default: `createdAt`)
- `sortOrder` (optional): Sort order (`asc`, `desc`) (default: `desc`)
- `startDate` (optional): Start date for filtering (ISO 8601 format)
- `endDate` (optional): End date for filtering (ISO 8601 format)
- `environment` (optional): Environment key to filter by
- `user` (optional): User ID to filter by
- `action` (optional): Action type to filter by

### Variable Management

#### `list_variables`

List all variables in the current project.

**Parameters:**

- `search` (optional): Search query
- `page` (optional): Page number
- `perPage` (optional): Items per page

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

### SDK Installation

#### `install_devcycle_sdk`

Fetch DevCycle SDK installation instructions and follow the guide to install the SDK. Includes documentation and examples for using the SDK in your application.

**Parameters:**

- `guide`: One of `android`, `android-openfeature`, `angular`, `dotnet`, `dotnet-openfeature`, `flutter`, `go`, `go-openfeature`, `ios`, `ios-openfeature`, `java`, `java-openfeature`, `javascript`, `javascript-openfeature`, `nestjs`, `nestjs-openfeature`, `nextjs`, `nodejs`, `nodejs-openfeature`, `php`, `php-openfeature`, `python`, `python-openfeature`, `react`, `react-native`, `react-openfeature`, `roku`, `ruby`, `ruby-openfeature`

### Project Management

#### `list_projects`

List all projects in the organization.

**Parameters:**

- `search` (optional): Search query
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 100, max: 1000)
- `sortBy` (optional): Sort field (`createdAt`, `updatedAt`, `name`, `key`, `createdBy`)
- `sortOrder` (optional): Sort order (`asc`, `desc`)
- `createdBy` (optional): Filter by creator user ID

#### `get_current_project`

Get details of the currently selected project.

**Parameters:** None

#### `select_project`

Select a project to use for subsequent MCP operations. Returns the current project, its environments, and SDK keys.

**Parameters:**

- `projectKey` (optional): Project key to select (if omitted, lists available projects to choose from)

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

### Local MCP Server Installation

For users who prefer to run the DevCycle MCP server locally rather than using the hosted version, you can install and configure the local server:

#### Prerequisites

- Node.js 18+ installed
- DevCycle CLI installed globally: `npm install -g @devcycle/cli`
- DevCycle account with API credentials or SSO authentication

#### Installation

Install the DevCycle CLI which includes the local MCP server:

```bash
npm install -g @devcycle/cli
```

#### Authentication

Choose one of the following authentication methods:

**Option 1: CLI Authentication (Recommended for local development)**

```bash
# Authenticate via SSO
dvc login sso

# Select your project
dvc projects select
```

**Option 2: Environment Variables (Recommended for CI/CD)**

```bash
export DEVCYCLE_CLIENT_ID="your-client-id"
export DEVCYCLE_CLIENT_SECRET="your-client-secret"
export DEVCYCLE_PROJECT_KEY="your-project-key"
```

#### AI Editor Configuration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="mcp-clients">
<TabItem value="cursor" label="Cursor" default>

Add the following to your `~/.cursor/mcp_settings.json` file:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp"
    }
  }
}
```

</TabItem>
<TabItem value="vscode" label="VS Code">

Add the following to your `settings.json` file:

```json
{
  "mcp.servers": {
    "devcycle": {
      "command": "dvc-mcp"
    }
  }
}
```

</TabItem>
<TabItem value="claude-code" label="Claude Code">

Run the following command:

```bash
claude mcp add --transport stdio devcycle dvc-mcp
```

</TabItem>
<TabItem value="claude" label="Claude Desktop">

Locate and edit your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the following configuration:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp"
    }
  }
}
```

</TabItem>
<TabItem value="windsurf" label="Windsurf">

In Windsurf Settings → Cascade → Manage MCPs → View raw config:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp"
    }
  }
}
```

</TabItem>
<TabItem value="codex" label="Codex CLI">

Locate and edit your configuration file at `~/.codex/config.toml`:

```toml
[mcp_servers.devcycle]
command = "dvc-mcp"
```

For more details, see the [OpenAI Codex MCP documentation](https://github.com/openai/codex/blob/main/docs/config.md#mcp-servers).

</TabItem>
<TabItem value="gemini" label="Gemini CLI">

Locate and edit your configuration file at `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "devcycle": {
      "command": "dvc-mcp"
    }
  }
}
```

For more details, see the [Gemini CLI MCP documentation](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#how-to-set-up-your-mcp-server).

</TabItem>
</Tabs>

## Error Handling

The MCP server returns structured error responses:

```json
{
  "errorType": "AUTHENTICATION_ERROR",
  "errorMessage": "401 Unauthorized",
  "toolName": "list_features",
  "suggestions": [
    "Re-authenticate with DevCycle (run \"dvc login sso\" for CLI for local MCP or re-login through OAuth for remote MCP)",
    "Verify your API credentials are correct",
    "Check if your token has expired"
  ],
  "timestamp": "2025-07-01T00:00:00.000Z"
}
```

Fields:

- `errorType`: One of `AUTHENTICATION_ERROR`, `PERMISSION_ERROR`, `RESOURCE_NOT_FOUND`, `VALIDATION_ERROR`, `SCHEMA_VALIDATION_ERROR`, `RATE_LIMIT_ERROR`, `NETWORK_ERROR`, `PROJECT_ERROR`, `UNKNOWN_ERROR`.
- `errorMessage`: Human-readable error description.
- `toolName`: The MCP tool that produced the error.
- `suggestions`: Remediation steps tailored to the error type.
- `timestamp`: ISO 8601 timestamp when the error was generated.

Common error scenarios:

- **Authentication failures**: Check credentials and project configuration
- **API rate limits**: Implement retry logic in your automation
- **Validation errors**: Ensure parameters meet requirements (patterns, lengths, etc.)
- **Permission errors**: Verify your API key has necessary permissions

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
- **Support**: [Contact Support](mailto:support@devcycle.com)
