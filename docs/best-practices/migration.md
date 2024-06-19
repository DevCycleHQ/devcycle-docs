---
title: Migrating to DevCycle with OpenFeature
sidebar_label: Vendor Migration
description: Best Practices for Migrating to DevCycle with OpenFeature
sidebar_position: 6
sidebar_custom_props: { icon: carbon:migrate }
---
# Best Practices for Migrating to DevCycle with OpenFeature

## Introduction

Migrating from an existing feature flagging system to a new one can be complex, especially with a large codebase. OpenFeature provides a standardized interface that simplifies this process. This guide outlines best practices for leveraging OpenFeature and its Multi-Provider to ensure a smooth transition from your existing feature flagging system to DevCycle.

## Why Use OpenFeature?

### Benefits of OpenFeature

- **Standardized Interface**: Provides a consistent way to evaluate feature flags, irrespective of the underlying provider.
- **Community Driven**: An open source CNCF incubating project under the Apache 2 license.

For more details, visit the [OpenFeature homepage](https://openfeature.dev) and review their [documentation](https://openfeature.dev/docs/reference/intro/).

## Best Practices for Migration

### Step 1. Abstract Evaluations

Instead of directly calling a specific Provider throughout your code, abstract flag evaluations using OpenFeature. This abstraction makes future migrations between providers easier, and enables the use of multiple providers at the same time.

```tsx
const myFlagProvider = new MyFlagProvider()
await OpenFeature.setProviderAndWait(myFlagProvider)

const openFeatureClient = OpenFeature.getClient();
const value = await openFeatureClient.getStringValue(
  'flag-key', 
  'default value', 
  someUser
);
```

### Step 2. Implement Multi-Provider

Use the Multi-Provider feature in OpenFeature to handle gradual migrations. This allows you to use multiple providers simultaneously and define rules for flag evaluation.

### Step 3. Setting Up Multi-Provider

```tsx
const multiProvider = new MultiProvider([
  { provider: new DevCycleProvider() },
  { provider: new ExistingProvider() }
]);

await OpenFeature.setProviderAndWait(multiProvider);

const openFeatureClient = OpenFeature.getClient();
const value = await openFeatureClient.getStringValue(
  'flag-key', 
  'default value', 
  someUser
);
```

#### Strategies

The Multi-Provider supports several strategies to control how providers are evaluated and how the final result is determined.

1. **FirstMatchStrategy**
This is the default strategy, and evaluates providers in order, moving to the next provider only if the current one returns a `FLAG_NOT_FOUND` result. This is useful for preferring DevCycle results while keeping the existing Provider as a fallback.
   ```tsx
   const multiProvider = new MultiProvider(
     [
       { provider: new DevCycleProvider() },
       { provider: new ExistingProvider() }
     ],
     new FirstMatchStrategy()
   );
   ```

2. **FirstSuccessfulStrategy**
Similar to `FirstMatchStrategy`, but errors from providers do not halt execution. It returns the first successful result from a provider.
   ```tsx
   const multiProvider = new MultiProvider(
     [
       { provider: new DevCycleProvider() },
       { provider: new ExistingProvider() }
     ],
     new FirstSuccessfulStrategy()
   );
   ```

3. **ComparisonStrategy**
Requires that all providers agree on a value. If they return the same value, the result is that value; otherwise, an error is returned. This is useful for validating the success of a provider migration.
   ```tsx
   const devcycleProvider = new DevCycleProvider();
   const existingProvider = new ExistingProvider();

   const onMismatch = (_resolutions: ProviderResolutionResult<FlagValue>[]) => {
     logger.warn('Provider mismatch!');
   };

   const multiProvider = new MultiProvider(
     [
       { provider: devcycleProvider },
       { provider: existingProvider }
     ],
     new ComparisonStrategy(
       existingProvider,
       onMismatch
     )
   );
   ```

### Step 4. Port Data

Ensure all your flagging data is ported from your existing Provider to DevCycle. This involves transferring flag definitions, user targeting rules, and any associated metadata.

The DevCycle team has even built a [Feature Importer](https://docs.devcycle.com/integrations/feature-importer) to help with this process that is open source and can be customized to import flags from either internal or 3rd party platforms.

### Step 5. Monitor and Log

Implement monitoring and logging to track the performance and correctness of flag evaluations. This helps in identifying and resolving any issues during the migration.

### Step 6. Test and Validate

Before fully transitioning to DevCycle, conduct thorough testing to ensure that:

- Flag evaluations return expected results.
- Performance is not negatively impacted.
- There are no regressions in existing functionality.

## Conclusion

OpenFeature’s Multi-Provider offers a powerful solution for migrating feature flag systems. By following these best practices, you can ensure a smooth transition from your Existing Provider to DevCycle, minimizing disruptions and maintaining the integrity of your feature flag evaluations.