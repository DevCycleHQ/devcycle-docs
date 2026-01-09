---
title: Migrating to DevCycle with OpenFeature
sidebar_label: Migrating to DevCycle
description: Best Practices for Migrating to DevCycle with OpenFeature
sidebar_position: 7
sidebar_custom_props: { icon: carbon:migrate }
---
# Best Practices for Migrating to DevCycle with OpenFeature

## Introduction

Migrating from an existing feature flagging system to a new one can be complex, especially with a large codebase. [OpenFeature](https://openfeature.dev) provides a standardized interface that simplifies this process. This guide outlines best practices for leveraging OpenFeature and its Multi-Provider utility to ensure a smooth transition from your existing feature flagging system to DevCycle.

## Why Use OpenFeature?

### Benefits of OpenFeature

- Production-ready SDKs that take care of all the hard stuff with fetching configuration data, error handling, and verifying inputs
- Standard interface that works the same in your code regardless of which provider you use
- Reduced maintenance burden by eliminating a piece of code you have to maintain
- Integration with code analysis and automated cleanup tools designed to look for OpenFeature calls

For more benefits, visit the [OpenFeature homepage](https://openfeature.dev) and review their [documentation](https://openfeature.dev/docs/reference/intro/).

## Best Practices for Migration

### Step 1. Abstract Evaluations

Instead of directly calling a specific feature flagging solution throughout your code, abstract flag evaluations using OpenFeature.

```tsx
const existingProvider = new ExistingProvider()
await OpenFeature.setProviderAndWait(existingProvider)

const openFeatureClient = OpenFeature.getClient();
const value = await openFeatureClient.getStringValue(
  'flag-key', 
  'default value', 
  someUser
);
```

### Step 2. Implement the Multi-Provider

The Multi-Provider allows you to use multiple underlying providers as sources of flag data for the OpenFeature SDK. When a flag is being evaluated, the Multi-Provider will consult each underlying provider it is managing in order to determine the final result. Different evaluation strategies can be defined to control which providers get evaluated and which result is used.

:::warning
The Multi-Provider is currently available only for the NodeJS and Web OpenFeature SDKs
:::

#### SERVER-SIDE IMPLEMENTATION

##### Install the Multi-Provider package:

```bash
npm install @openfeature/multi-provider
```

##### Initialize the Multi-Provider in your code:

```tsx
import { MultiProvider } from '@openfeature/multi-provider';
import { OpenFeature } from '@openfeature/server-sdk';
import { DevCycleProvider } from '@devcycle/nodejs-server-sdk';

// DevCycle Provider Setup
const { DEVCYCLE_SDK_KEY } = process.env;
const user = { user_id: "user_id" };
const devcycleProvider = new DevCycleProvider(DEVCYCLE_SDK_KEY);

// Existing Provider Setup
const existingProvider = new ExistingProvider();

// Multi-provider Setup
const multiProvider = new MultiProvider([
  { provider: devcycleProvider },
  { provider: existingProvider }
]);

await OpenFeature.setContext(user);
await OpenFeature.setProviderAndWait(multiProvider);

const openFeatureClient = OpenFeature.getClient();

const value = await openFeatureClient.getStringValue(
  'flag-key',
  'default value',
  someUser
);
```

#### CLIENT-SIDE IMPLEMENTATION

##### Install the Web Multi-Provider package:

```bash
npm install @openfeature/multi-provider-web
```

##### Initialize the Web Multi-Provider in your code:

```tsx
import { WebMultiProvider } from "@openfeature/multi-provider-web";
import { OpenFeature } from "@openfeature/web-sdk";
import DevCycleProvider from "@devcycle/openfeature-web-provider";

// DevCycle Provider Setup
const { DEVCYCLE_SDK_KEY } = process.env;
const user = { user_id: "user_id" };
const devCycleProvider = new DevCycleProvider(DEVCYCLE_SDK_KEY);

// Existing Provider Setup
const existingProvider = new ExistingProvider();

// Multi-provider Setup
const multiProvider = new WebMultiProvider([
  { provider: devCycleProvider },
  { provider: existingProvider }
]);

await OpenFeature.setContext(user);
await OpenFeature.setProviderAndWait(multiProvider);

const openFeatureClient = OpenFeature.getClient();

const value = await openFeatureClient.getStringValue(
  'flag-key',
  'default value',
  someUser
);
```

#### Specifiy DevCycleMigrationStrategy

The Multi-Provider supports various strategies to control provider evaluation and result determination. The default **FirstMatchStrategy** evaluates providers in order, moving to the next if the current returns `FLAG_NOT_FOUND`. Any error will be thrown by the Multi-Provider and caught by the OpenFeature SDK, returning the default value. This strategy is ideal for migrating providers, preferring the new provider while using the old as a fallback.

While the default strategy is generally recommended for vendor migration, a special **DevCycleMigrationStrategy** has been created specifically for migrating to DevCycle. This strategy extends **FirstMatchStrategy** to accommodate DevCycle's process by returning `DEFAULT` for "flag not found" cases. 

##### SERVER-SIDE IMPLEMENTATION
```tsx
  import { DevCycleMigrationStrategy } from '@devcycle/nodejs-server-sdk/openfeature-strategy'

  const multiProvider = new MultiProvider(
     [
       { provider: devcycleProvider },
       { provider: existingProvider }
     ],
     new DevCycleMigrationStrategy()
   );
```

##### CLIENT-SIDE IMPLEMENTATION

```tsx
  import { DevCycleMigrationStrategy } from "@devcycle/openfeature-web-provider/strategy";
   
  const multiProvider = new WebMultiProvider(
     [
       { provider: devcycleProvider },
       { provider: existingProvider }
     ],
     new DevCycleMigrationStrategy()
   );
```

:::warning
To effectively use this strategy with DevCycle, ensure that all targeting rules include an "All Users" rule. This will prevent the return of `DEFAULT` for known keys.
:::

### Step 3. Port Data

Ensure all your flagging data is ported from your existing provider to DevCycle. This involves transferring flag definitions, user targeting rules, and any associated metadata. You can do this gradually by creating new flags in DevCycle while keeping existing ones in the old system until they are retired. **With that in mind, this transition period can also be seen as an exciting opportunity to clean up all your old flags.**

:::info
Did you know the DevCycle team built a [Feature Importer](https://docs.devcycle.com/integrations/feature-importer) to help with this process? It's open source and can be customized to import flags from either internal or 3rd party platforms.
:::

To ensure a seamless transition, consider the following best practices:

1. **Audit Your Current Flags:** 

- Before migrating, conduct a thorough audit of your existing flags. Identify and document active flags, deprecated flags, and any that can be immediately retired.

2. **Establish a Migration Timeline:** 

- Create a detailed timeline for the migration process. Prioritize the migration of critical flags first and schedule non-critical flags for later stages.

3. **Monitor and Validate Post-Migration:** 

- After migrating flags, continuously monitor their performance and validate that they function as expected. This ensures any discrepancies can be quickly addressed.

4. **Leverage DevCycle's Analytics:** 

- Take advantage of DevCycle's analytics to gain insights into flag performance and user interactions. Use this data to refine your feature flag strategy and optimize user experiences.

By following these steps, you can ensure a smooth transition to DevCycle, taking full advantage of its robust feature management capabilities.

### Step 4. Monitor and Log

Implement monitoring and logging to track the performance and correctness of flag evaluations. This helps in identifying and resolving any issues during the migration.

### Step 5. Test and Validate

Before fully transitioning to DevCycle, conduct thorough testing to ensure that:

- Flag evaluations return expected results.
- Performance is not negatively impacted.
- There are no regressions in existing functionality.

## Conclusion

OpenFeature’s Multi-Provider offers a powerful solution for migrating feature flag systems. By following these best practices, you can ensure a smooth transition from your Existing Provider to DevCycle, minimizing disruptions and maintaining the integrity of your feature flag evaluations.
