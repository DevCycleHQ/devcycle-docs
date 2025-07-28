---
title: MCP User Guides
sidebar_position: 3
description: Practical guides for using DevCycle MCP with AI assistants
---

# DevCycle MCP User Guides

Learn how to effectively use the DevCycle MCP Server with AI assistants for feature flag management, testing, and monitoring.

## Getting Started

### Initial Setup

1. **Install and authenticate**:

```bash
npm install -g @devcycle/cli
dvc login sso
dvc projects select
```

2. **Configure your AI client** (see [MCP Reference](./mcp-reference#ai-client-configuration) for detailed setup)

3. **Test the connection**:

```
You: "List my DevCycle projects"
AI: Here are your available DevCycle projects: [shows project list]
```

### Your First Feature Flag

```
You: "Create a feature flag for testing the new navigation design"

AI: ✅ Created 'new-navigation-design' feature flag:
- Boolean variable 'enabled' (default: false)
- Available across all environments
- Targeting disabled initially
- Ready for gradual rollout

Would you like me to configure targeting or add additional variables?
```

## Feature Flag Management

### Creating Feature Flags

#### Simple Boolean Flag

```
You: "Create a feature flag called 'dark-mode' with a boolean toggle"

AI: ✅ Created 'dark-mode' feature flag:
- Variable: enabled (Boolean, default: false)
- Status: Active in all environments
- Targeting: Disabled (safe for development)
```

#### Multi-Variation Feature

```
You: "Create a feature flag for testing different button colors: red, blue, and green"

AI: ✅ Created 'button-color-test' feature flag:
- Variable: color (String, default: 'blue')
- Variations:
  - control: blue
  - red-variant: red
  - green-variant: green
- Ready for A/B testing
```

#### Complex Configuration

```
You: "Create a feature flag for the new payment system with different processors and transaction limits"

AI: ✅ Created 'payment-system-v2' feature flag:
- enabled (Boolean): Main toggle
- processor (String): 'stripe' | 'paypal' | 'square'
- daily_limit (Number): Transaction limit per day
- Features ready for gradual rollout with monitoring
```

### Updating Feature Flags

#### Enable/Disable Features

```
You: "Enable the dark-mode flag in staging environment"

AI: ✅ Enabled 'dark-mode' in staging:
- Environment: staging
- Targeting: 100% of users
- Status: Active
```

#### Modify Variables

```
You: "Change the daily_limit in payment-system-v2 to 5000"

AI: ✅ Updated 'payment-system-v2' variables:
- daily_limit: 1000 → 5000
- Applied to: All environments
- Effective immediately for new evaluations
```

#### Add New Variables

```
You: "Add a theme variable to dark-mode flag with options: auto, light, dark"

AI: ✅ Added 'theme' variable to 'dark-mode':
- Type: String
- Default: 'auto'
- Options: 'auto', 'light', 'dark'
- Available in all environments
```

### Targeting and Rollouts

#### Basic Percentage Rollout

```
You: "Enable new-navigation-design for 25% of users in production"

AI: ✅ Updated 'new-navigation-design' targeting in production:
- Rollout: 25% of all users
- Environment: production
- Gradual rollout over 1 hour
- Monitoring enabled
```

#### Advanced User Segmentation

```
You: "Enable payment-system-v2 for premium users only in production"

AI: ✅ Configured 'payment-system-v2' targeting:
- Audience: Premium users (subscription_tier = 'premium')
- Rollout: 100% of matching users
- Environment: production
- Estimated impact: ~2,500 users
```

#### Staged Rollout

```
You: "Create a gradual rollout for dark-mode starting at 5% and increasing to 100% over 7 days"

AI: ✅ Created staged rollout for 'dark-mode':
- Day 1: 5% of users
- Day 3: 25% of users
- Day 5: 50% of users
- Day 7: 100% of users
- Automatic progression with rollback triggers
```

## Testing and Quality Assurance

### Self-Targeting for Testing

#### Set Up Testing Identity

```
You: "Set up my DevCycle identity for testing premium features"

AI: ✅ Configured your testing identity:
- User ID: your-email@company.com
- Custom Properties: subscription_tier = 'premium'
- Ready for feature testing
```

#### Override Specific Features

```
You: "Override the payment-system-v2 flag to show me the new payment flow"

AI: ✅ Set self-targeting override:
- Feature: payment-system-v2
- Variation: enabled with new flow
- Environment: All environments
- You'll now see the new payment system

Remember to clear overrides when testing is complete!
```

#### Test Different User Scenarios

```
You: "Set up my identity to test the mobile user experience"

AI: ✅ Updated your identity for mobile testing:
- Device type: mobile
- Platform: iOS
- App version: latest
- You'll now see mobile-specific features and targeting
```

### QA Workflows

#### Test Feature Across Environments

```
You: "Show me the status of dark-mode flag across all environments"

AI: 📊 'dark-mode' Status Across Environments:

**Development**:
- Status: Active
- Targeting: 100% enabled
- Usage: Heavy testing

**Staging**:
- Status: Active
- Targeting: QA team + beta users
- Usage: Pre-production validation

**Production**:
- Status: Active
- Targeting: 15% gradual rollout
- Usage: Real user testing
```

#### Validate Targeting Rules

```
You: "Test if a user with email 'test@company.com' would see the new-navigation-design flag"

AI: 🔍 Targeting Analysis for 'new-navigation-design':

**User Profile**: test@company.com
- Matches targeting criteria: ✅ Yes
- Current rollout: 25% of users
- Would receive feature: ✅ Yes (user falls in enabled segment)
- Expected variation: new-design-enabled
```

### Production Testing

#### Safe Production Testing

```
You: "How can I safely test the payment-system-v2 flag in production without affecting users?"

AI: 🔒 Safe Production Testing Options:

1. **Self-Targeting Override**:
   - Override flag for your user ID only
   - Test without affecting real users
   - Clear when testing complete

2. **Internal User Segment**:
   - Target only @company.com emails
   - Test with team members first
   - Expand when validated

3. **Canary Testing**:
   - Start with 1% of users
   - Monitor metrics closely
   - Gradually increase if successful

Would you like me to set up self-targeting for you?
```

## Monitoring and Analytics

### Feature Performance Monitoring

#### Get Evaluation Metrics

```
You: "Show me evaluation metrics for new-navigation-design over the last week"

AI: 📊 'new-navigation-design' Evaluation Metrics (Last 7 Days):

📈 **Total Evaluations**: 45,230
- Unique users: 12,450
- Average per user: 3.6 evaluations

🌍 **By Environment**:
- Production: 38,200 (84.5%)
- Staging: 5,830 (12.9%)
- Development: 1,200 (2.7%)

📱 **By Platform**:
- Desktop: 28,450 (62.9%)
- Mobile: 16,780 (37.1%)

📊 **Trend**: +12% vs previous week
```

#### Monitor Feature Health

```
You: "Are there any issues with my feature flags I should know about?"

AI: 🏥 **Feature Flag Health Check**:

✅ **Healthy Flags (12 flags)**:
- Consistent evaluation patterns
- Good performance metrics
- Regular usage

⚠️ **Flags Needing Attention (2 flags)**:
- old-checkout: Low usage (-40% this month)
- beta-search: High error rate (5.2%)

🚫 **Problematic Flags (1 flag)**:
- legacy-payment: No evaluations in 30 days

**Recommendations**: Consider archiving legacy-payment, investigate beta-search errors
```

### Audit and Compliance

#### Review Feature Changes

```
You: "Show me recent changes to the payment-system-v2 feature"

AI: 📋 'payment-system-v2' Change History (Last 30 Days):

🕐 **Recent Changes**:
1. **2 hours ago** - Increased daily_limit to 5000
   - By: john@company.com
   - Environment: All environments

2. **Yesterday** - Added fraud_detection variable
   - By: security-team@company.com
   - Type: Boolean, default: true

3. **3 days ago** - Enabled targeting in production
   - By: product-manager@company.com
   - Rollout: Started at 10% of premium users

4. **1 week ago** - Created feature flag
   - By: dev-team@company.com
   - Initial setup with payment processor options
```

## Advanced Workflows

### Environment Management

#### List Environments and Keys

```
You: "Show me all environments and their SDK keys"

AI: 🌍 **DevCycle Environments**:

**development**
- Type: development
- SDK Keys:
  - Client: dvc_client_dev_****1234
  - Server: dvc_server_dev_****5678
  - Mobile: dvc_mobile_dev_****9012

**staging**
- Type: staging
- SDK Keys: [shows staging keys]

**production**
- Type: production
- SDK Keys: [shows production keys]

All keys masked for security. Use `get_sdk_keys` for full keys.
```

#### Create New Environment

```
You: "Create a new environment called 'load-testing' for performance testing"

AI: ✅ Created 'load-testing' environment:
- Name: Load Testing
- Key: load-testing
- Type: staging
- SDK keys generated
- Ready for configuration
```

### Custom Properties

#### Create User Segmentation Properties

```
You: "Create a custom property for user subscription tier with values: free, premium, enterprise"

AI: ✅ Created custom property 'subscription_tier':
- Key: subscription_tier
- Type: String
- Values: ['free', 'premium', 'enterprise']
- Property Key: user.subscription_tier

Now available for targeting rules!
```

### Bulk Operations

#### Manage Multiple Flags

```
You: "Enable all mobile-related flags in staging environment"

AI: ✅ Updated mobile flags in staging:

📱 **Flags Enabled**:
- mobile-navigation: 100% of users
- mobile-checkout: 75% of users
- mobile-search: 50% of users
- mobile-push-notifications: 25% of users

📊 **Summary**: 4 flags updated, ~3,200 users affected
```

## Troubleshooting

### Common Issues

#### Flag Not Working

```
You: "The dark-mode flag isn't working in production"

AI: 🔍 **Troubleshooting 'dark-mode' in production**:

✅ **Flag Status**: Active and properly configured
✅ **Targeting**: Enabled with 25% rollout
⚠️ **Issue Found**: Your test user (user@gmail.com) doesn't match targeting criteria

💡 **Solutions**:
1. Add your email to targeting rules
2. Use self-targeting override for testing
3. Check if you're in the 25% rollout segment

Would you like me to set up a self-targeting override for testing?
```

#### Performance Issues

```
You: "Is the new-navigation-design flag causing performance problems?"

AI: 📊 **Performance Analysis for 'new-navigation-design'**:

⚡ **Metrics (Last 24 hours)**:
- Page load time: 2.1s (baseline: 2.0s) ⚠️
- Evaluation latency: 15ms (normal: <20ms) ✅
- Error rate: 0.1% (normal: <0.5%) ✅

🔍 **Analysis**: Slight page load increase but within acceptable range
📊 **User impact**: No significant complaints or issues reported

**Recommendation**: Continue monitoring, consider A/B testing page load optimizations
```

### Getting Help

#### Debug Authentication

```
You: "I'm getting authentication errors with the MCP server"

AI: 🔧 **Authentication Troubleshooting**:

**For CLI Authentication**:
1. Check current status: `dvc status`
2. Re-authenticate: `dvc login sso`
3. Select project: `dvc projects select`

**For Environment Variables**:
1. Verify variables are set correctly
2. Check client configuration includes env vars
3. Restart AI client after changes

**Common Issues**:
- Expired SSO session: Re-run `dvc login sso`
- Wrong project selected: Use `dvc projects select`
- Missing environment variables: Check configuration

Would you like me to guide you through re-authentication?
```

## Best Practices

### 1. Development Workflow

- Start with feature flags disabled
- Test thoroughly in development/staging
- Use gradual rollouts in production
- Monitor metrics after each rollout phase

### 2. Testing Strategy

- Use self-targeting for individual testing
- Create test user segments for team testing
- Clear overrides after testing sessions
- Document testing procedures

### 3. Production Safety

- Always confirm production changes
- Start with small percentages (1-5%)
- Monitor key metrics during rollouts
- Have rollback procedures ready

### 4. Team Collaboration

- Use descriptive feature flag names
- Document feature purposes and timelines
- Communicate rollout plans with stakeholders
- Regular cleanup of unused flags

## Next Steps

Now that you understand the MCP workflows, you can:

1. **Explore Advanced Features**: Try complex targeting rules and custom properties
2. **Integrate with CI/CD**: Use environment variables for automated deployments
3. **Monitor Performance**: Set up regular monitoring of your feature flags
4. **Team Onboarding**: Share these guides with your team members

For technical details and complete tool reference, see the [MCP Reference](./mcp-reference) documentation.
