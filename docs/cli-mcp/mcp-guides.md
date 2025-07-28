---
title: MCP User Guides
sidebar_position: 3
description: Practical guides for using DevCycle MCP with AI assistants
---

# DevCycle MCP User Guides

Learn how to effectively use the DevCycle MCP Server with AI assistants for feature flag management, testing, and monitoring.

## Best Practices

Follow these best practices for the best results with the DevCycle MCP server.

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

## Example Usage

The following are just a few examples of ways you can use the DevCycle MCP server within your workflow with AI assistants.

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

For technical details and complete tool reference, see the [MCP Reference](./mcp-reference) documentation.
