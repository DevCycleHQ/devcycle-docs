---
title: Feature Management
sidebar_position: 2
description: Create, update, and manage feature flags through AI
---

# Feature Management with MCP

Learn how to create, manage, and optimize feature flags using natural language through the DevCycle MCP Server. This guide covers everything from basic flag operations to advanced feature management workflows.

## Basic Feature Flag Operations

### Creating Feature Flags

The AI can create feature flags with intelligent defaults based on your description:

#### Simple Boolean Flag

```
You: "Create a feature flag for the new header design"

AI: I'll create a feature flag called 'new-header-design' with:
- Boolean variable 'enabled' (default: false)
- Available in all environments (development, staging, production)
- Targeting disabled initially
- Ready for gradual rollout when you're ready
```

#### Multi-Variation Feature

```
You: "Create a feature flag for testing different button colors with red, blue, and green options"

AI: Created 'button-color-test' feature flag with:
- String variable 'color' (default: 'blue')
- Variations: control (blue), red-variant (red), green-variant (green)
- Set up for A/B testing across variations
- Equal distribution when targeting is enabled
```

#### Complex Configuration

```
You: "Create a feature flag for the new payment flow with different processing methods and limits"

AI: Created 'new-payment-flow' feature flag with:
- Boolean variable 'enabled' (default: false)
- String variable 'processor' (options: 'stripe', 'paypal', 'bank')
- Number variable 'daily_limit' (default: 1000, max: 10000)
- Object variable 'config' for custom settings
- Available across all environments
```

### Viewing Feature Flags

Get information about existing flags:

```
You: "Show me all feature flags in this project"

AI: Here are your current feature flags:

📊 **Active Features (3)**
- new-header-design: Boolean flag for UI redesign (disabled)
- payment-optimization: A/B test for checkout flow (50% enabled)
- mobile-navigation: Mobile-specific navigation (staging only)

🔄 **In Development (2)**
- advanced-search: Search improvements (dev environment)
- user-preferences: Personalization features (dev environment)

🚫 **Archived (1)**
- old-beta-feature: Completed beta test (archived)
```

```
You: "Tell me about the payment-optimization flag"

AI: **payment-optimization** Feature Flag Details:

🎯 **Purpose**: A/B test for checkout flow optimization
📊 **Status**: Active in staging and production
🔧 **Variables**:
- enabled (Boolean): true
- variant (String): 'optimized' or 'control'
- analytics_id (String): tracking identifier

🌍 **Environment Status**:
- Development: 100% optimized variant
- Staging: 50/50 A/B test
- Production: 20% optimized, 80% control

📈 **Performance**: +12% conversion rate on optimized variant
```

### Updating Feature Flags

Modify existing flags with natural language:

#### Enable/Disable Features

```
You: "Enable the new-header-design flag in staging"

AI: ✅ Enabled 'new-header-design' in staging environment:
- Status: Active
- Targeting: 100% of users
- Variable values: enabled = true
```

```
You: "Disable the mobile-navigation flag everywhere except development"

AI: ✅ Updated 'mobile-navigation' targeting:
- Development: Enabled (100% users)
- Staging: Disabled
- Production: Disabled
```

#### Modify Variables

```
You: "Change the daily_limit variable in new-payment-flow to 5000"

AI: ✅ Updated 'new-payment-flow' variables:
- daily_limit: 1000 → 5000
- Applied to: All environments
- Effective immediately for new users
```

#### Add New Variables

```
You: "Add a theme variable to the new-header-design flag with options light, dark, and auto"

AI: ✅ Added 'theme' variable to 'new-header-design':
- Type: String
- Default: 'light'
- Options: 'light', 'dark', 'auto'
- Available in all environments
- Current users will receive default value
```

### Deleting Feature Flags

Remove flags safely with guidance:

```
You: "Delete the old-beta-feature flag"

AI: ⚠️ Before deleting 'old-beta-feature', I should check:

🔍 **Usage Analysis**:
- Code references: Found in 3 files
- Last evaluation: 2 days ago
- Active users: 0 (archived flag)

✅ **Safe to delete**:
- Flag is archived
- No active targeting
- Minimal recent usage

Would you like me to:
1. Delete the flag completely
2. Keep flag but remove all code references
3. Archive for longer before deletion
```

## Advanced Feature Management

### Bulk Operations

Manage multiple flags efficiently:

```
You: "Enable all flags with 'mobile' in the name for staging environment"

AI: ✅ Enabled mobile-related flags in staging:
- mobile-navigation: Enabled (100% users)
- mobile-checkout: Enabled (50% users)
- mobile-preferences: Enabled (10% users)

📊 **Summary**: 3 flags updated, 2,450 users affected
```

```
You: "Create feature flags for our Q1 redesign: new login, dashboard, and settings pages"

AI: ✅ Created Q1 redesign feature flag suite:

🔐 **q1-login-redesign**
- Boolean: enabled (false)
- String: theme ('default', 'modern', 'minimal')

📊 **q1-dashboard-redesign**
- Boolean: enabled (false)
- String: layout ('grid', 'list', 'cards')
- Number: items_per_page (20)

⚙️ **q1-settings-redesign**
- Boolean: enabled (false)
- Object: config (navigation, themes, preferences)

All flags ready for staged rollout across environments.
```

### Feature Flag Templates

Use intelligent templates for common patterns:

```
You: "Create a canary deployment flag for the new API version"

AI: ✅ Created 'api-v2-canary' canary deployment flag:

🚀 **Canary Configuration**:
- enabled (Boolean): false
- traffic_percentage (Number): 0 → 100 (gradual rollout)
- fallback_version (String): 'v1' (safety fallback)
- health_check_url (String): monitoring endpoint

📊 **Targeting Strategy**:
- Development: 100% v2 (for testing)
- Staging: 0% → progressive rollout
- Production: 0% → careful monitoring required

🔒 **Safety Features**:
- Automatic rollback triggers
- Performance monitoring
- Error rate thresholds
```

```
You: "Set up an A/B test for checkout optimization with 3 variants"

AI: ✅ Created 'checkout-optimization-test' A/B test:

🧪 **Test Configuration**:
- enabled (Boolean): false
- variant (String): 'control', 'optimized_v1', 'optimized_v2'
- user_segment (String): targeting criteria

📊 **Traffic Distribution**:
- Control: 40% (current checkout)
- Optimized V1: 30% (streamlined flow)
- Optimized V2: 30% (one-click option)

📈 **Success Metrics**:
- Conversion rate improvement
- Time to completion
- User satisfaction scores

Ready to start in staging when you give the go-ahead!
```

### Code Generation

Generate implementation code for your flags:

````
You: "Generate React code for the new-header-design flag"

AI: Here's the React implementation for 'new-header-design':

```jsx
import { useVariableValue } from '@devcycle/react-client-sdk'

function Header() {
  const isNewDesign = useVariableValue('new-header-design', false)
  const theme = useVariableValue('theme', 'light')

  return (
    <header className={`header ${theme}-theme`}>
      {isNewDesign ? <NewHeaderComponent /> : <LegacyHeader />}
    </header>
  )
}

// For server-side rendering
import { getVariableValue } from '@devcycle/server-sdk'

function getHeaderProps(user) {
  const isNewDesign = getVariableValue(user, 'new-header-design', false)
  const theme = getVariableValue(user, 'theme', 'light')

  return { isNewDesign, theme }
}
````

Would you like me to also generate:

- TypeScript interfaces for the variables
- Unit tests for the component
- CSS classes for the themes

```

```

You: "Generate Node.js middleware for the api-v2-canary flag"

AI: Here's the Node.js middleware for 'api-v2-canary':

```javascript
const { initializeDevCycle } = require('@devcycle/nodejs-server-sdk')

const devcycle = initializeDevCycle(process.env.DEVCYCLE_SERVER_KEY)

function apiVersionMiddleware(req, res, next) {
  const user = {
    user_id: req.user?.id || 'anonymous',
    email: req.user?.email,
    country: req.headers['cf-ipcountry'],
  }

  const isV2Enabled = devcycle.variableValue(user, 'api-v2-canary', false)
  const trafficPercentage = devcycle.variableValue(
    user,
    'traffic_percentage',
    0,
  )

  // Route to appropriate API version
  req.apiVersion = isV2Enabled ? 'v2' : 'v1'
  req.isCanaryUser = isV2Enabled

  next()
}

module.exports = { apiVersionMiddleware }
```

This middleware will:

- Check the canary flag for each request
- Route traffic based on targeting rules
- Provide fallback to v1 API
- Track canary user status for analytics

```

## Flag Lifecycle Management

### Development Workflow

Follow best practices for flag lifecycle:

```

You: "What's the recommended workflow for rolling out the new-payment-flow flag?"

AI: Here's the recommended rollout strategy for 'new-payment-flow':

🔄 **Phase 1: Development (Current)**

- Status: ✅ Complete
- Testing: Internal team validation
- Coverage: 100% in dev environment

🔄 **Phase 2: Staging Validation**

- Enable for QA team: `staging: qa_team segment`
- Run integration tests
- Validate payment processors
- Check analytics integration

🔄 **Phase 3: Production Canary (Recommended Next)**

- Start with 1% of users: `production: 1% rollout`
- Monitor error rates and performance
- Gradual increase: 1% → 5% → 10%

🔄 **Phase 4: Targeted Rollout**

- Premium users first: `user_tier = premium`
- Geographic rollout: `country = ['US', 'CA']`
- Monitor conversion metrics

🔄 **Phase 5: Full Release**

- 100% rollout once metrics confirm success
- Remove flag from code after 30 days
- Archive flag in DevCycle

Would you like me to start Phase 2 now?

```

### Cleanup and Archival

Manage flag cleanup:

```

You: "Which feature flags are ready for cleanup?"

AI: 📋 **Flag Cleanup Analysis**:

✅ **Ready for Removal (3 flags)**:

- old-navigation: 100% rollout for 60+ days, stable
- legacy-auth: Fully migrated, no code references
- beta-search: Completed beta, feature fully released

⚠️ **Consider for Cleanup (2 flags)**:

- mobile-redesign: 90% rollout for 30 days, monitoring recommended
- checkout-v2: 75% rollout, still collecting performance data

❌ **Keep Active (4 flags)**:

- payment-optimization: Active A/B test in progress
- new-api-version: Recent rollout, need more data
- seasonal-theme: Permanent feature for holidays
- emergency-maintenance: Operational flag

Would you like me to archive the ready-for-removal flags?

```

## Best Practices

### Naming Conventions

```

You: "What's a good naming convention for our feature flags?"

AI: Here are DevCycle best practices for flag naming:

📋 **Recommended Format**: `{category}-{feature}-{type}`

🏷️ **Categories**:

- `ui-` : User interface changes
- `api-` : Backend API modifications
- `exp-` : Experiments and A/B tests
- `ops-` : Operational flags
- `temp-` : Temporary flags

✅ **Good Examples**:

- `ui-header-redesign` (clear, descriptive)
- `api-payment-v2` (version indicator)
- `exp-checkout-optimization` (experiment flag)
- `ops-maintenance-mode` (operational control)

❌ **Avoid**:

- `flag1`, `test`, `new-thing` (too vague)
- `theNewAwesomeFeatureThatWillChangeEverything` (too long)
- `FEATURE_FLAG` (inconsistent casing)

🎯 **Additional Tips**:

- Use kebab-case consistently
- Include ticket/epic numbers when relevant
- Consider environment prefixes for dev-only flags

```

### Variable Design

```

You: "How should I structure variables for a complex feature?"

AI: Here's how to design variables for complex features:

🎯 **Single Responsibility Principle**:

```json
// ❌ Avoid: One variable doing everything
{
  "mega_config": {
    "enabled": true,
    "theme": "dark",
    "api_version": 2,
    "cache_timeout": 300
  }
}

// ✅ Better: Separate concerns
{
  "ui_enabled": true,
  "theme": "dark",
  "api_version": 2,
  "cache_timeout": 300
}
```

🔧 **Variable Types Best Practices**:

- **Boolean**: Simple on/off toggles
- **String**: Enums, themes, variants
- **Number**: Limits, timeouts, percentages
- **Object**: Complex configuration (use sparingly)

📊 **Example: E-commerce Feature**

```json
{
  "new_checkout_enabled": false,
  "payment_methods": ["card", "paypal", "apple_pay"],
  "express_checkout_threshold": 100,
  "checkout_theme": "modern",
  "analytics_config": {
    "track_abandonment": true,
    "session_timeout": 1800
  }
}
```

This structure allows independent control of each aspect while maintaining clarity.

```

## Troubleshooting

### Common Issues

**"Flag not taking effect"**
```

You: "The new-header-design flag isn't working in production"

AI: Let me diagnose the 'new-header-design' flag in production:

🔍 **Flag Status Check**:

- Status: ✅ Active
- Targeting: ✅ Enabled
- Variable values: ✅ Configured

🎯 **Targeting Analysis**:

- Current rule: Only users with email ending @company.com
- Your test user: user@gmail.com ❌
- **Issue**: User doesn't match targeting criteria

💡 **Solutions**:

1. Add your email to targeting rules
2. Test with a @company.com email
3. Enable flag for a broader audience
4. Use DevCycle's self-targeting for testing

Would you like me to add you to the targeting rules for testing?

```

**"Performance concerns"**
```

You: "Is the checkout-optimization flag causing performance issues?"

AI: 📊 **Performance Analysis for 'checkout-optimization'**:

⚡ **Metrics (Last 24 hours)**:

- Average page load: 2.1s (baseline: 2.0s) ⚠️
- API response time: +50ms vs control
- Error rate: 0.1% (normal: 0.05%) ⚠️
- User complaints: 3 reports of slow checkout

🔍 **Root Cause Analysis**:

- New checkout makes 2 additional API calls
- Database query on user preferences table (no index)
- Large JavaScript bundle (+200KB)

🛠️ **Recommendations**:

1. **Immediate**: Reduce rollout to 10% while optimizing
2. **Short-term**: Add database index, optimize bundle
3. **Long-term**: Implement caching strategy

Should I reduce the rollout percentage now?

```

### Debug and Monitoring

```

You: "Help me debug why users aren't seeing the new feature"

AI: 🔍 **Debug Checklist for Feature Flag Issues**:

1️⃣ **Verify Flag Status**:

- ✅ Flag exists and is active
- ✅ Correct environment selected
- ✅ Variables configured properly

2️⃣ **Check Targeting Rules**:

- Current targeting: 50% of mobile users
- User's platform: Desktop ❌
- **Issue Found**: User doesn't match mobile criteria

3️⃣ **SDK Integration**:

- SDK version: v4.2.1 ✅ (latest)
- Initialization: ✅ Proper
- User identification: ✅ Correct

4️⃣ **Code Implementation**:

- Variable key: 'new_feature_enabled' ✅
- Default value: false ✅
- Conditional logic: ✅ Implemented

💡 **Quick Fix**: Test with mobile user agent or add desktop users to targeting.

Would you like me to temporarily enable the flag for desktop users for testing?

```

## Integration with Development Workflow

### CI/CD Integration

```

You: "How can I integrate feature flags with our deployment pipeline?"

AI: Here's how to integrate DevCycle flags with your CI/CD pipeline:

🚀 **Deployment Strategy with Flags**:

```yaml
# .github/workflows/deploy.yml
name: Deploy with Feature Flags

jobs:
  deploy:
    steps:
      - name: Deploy Application
        run: |
          npm run build
          npm run deploy

      - name: Enable Flag in Staging
        run: |
          dvc targeting update \
            --feature "new-api-version" \
            --environment staging \
            --enabled true

      - name: Run Integration Tests
        run: npm run test:integration

      - name: Gradual Production Rollout
        if: success()
        run: |
          # Start with 5% rollout
          dvc targeting update \
            --feature "new-api-version" \
            --environment production \
            --percentage 5
```

🔄 **Automated Flag Management**:

- **Pre-deployment**: Disable flags in staging for testing
- **Post-deployment**: Enable flags gradually
- **Rollback**: Automatically disable flags on deployment failure
- **Cleanup**: Archive flags after successful rollouts

This ensures safe, controlled feature releases!

```

Ready to explore more advanced topics? Check out our guides on [Targeting & Rollouts](/mcp-guides/targeting) and [Environment Management](/mcp-guides/environments).
```
