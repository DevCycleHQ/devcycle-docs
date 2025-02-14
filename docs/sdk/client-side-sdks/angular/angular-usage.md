---
title: Angular OpenFeature SDK - Usage
sidebar_label: Usage
sidebar_position: 3
description: Using the SDK
sidebar_custom_props: { icon: material-symbols:toggle-on }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/openfeature-angular-provider)](https://www.npmjs.com/package/@devcycle/openfeature-angular-provider)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Setup

As this is a DevCycle OpenFeature Provider, using the [Angular OpenFeature SDK](https://openfeature.dev/docs/reference/technologies/client/web/angular#how-to-use), you need to use the OpenFeature APIs to get the value of a variable.

If you need access to the DevCycle Client for access to the methods like `track` / `allFeatures` / `allVariables`, you can use the `devcycleClient()` method on the `DevCycleAngularProvider` object:

```typescript
const devCycleProvider = new DevCycleAngularProvider(
  environment.DEVCYCLE_CLIENT_SDK_KEY,
  { /* DevCycle Options */ }
);
const devcycleClient = devCycleProvider.devcycleClient();
const features = devcycleClient.allFeatures()
const variables = devcycleClient.allVariables()
```

You can also use the standard [OpenFeature Web SDK](https://openfeature.dev/docs/reference/technologies/client/web/) `@openfeature/web-sdk` with this DevCycle Angular Provider to access feature like `Events` and `Hooks` that are not available through the Angular SDK.

## Getting a Variable

[//]: # (wizard-evaluate-start)

### Boolean Feature Flag Directive

The OpenFeature SDK provides a `booleanFeatureFlag` directive to get the value of a boolean feature flag. See the [OpenFeature Angular SDK Documentation](https://openfeature.dev/docs/reference/technologies/client/web/angular#how-to-use) for more details on how to use this directive, including how to use `booleanFeatureElse`, `booleanFeatureInitializing`, and `booleanFeatureReconciling`.

```html
<div
  *booleanFeatureFlag="'isFeatureEnabled'; default: true; domain: 'userDomain'; else: booleanFeatureElse; initializing: booleanFeatureInitializing; reconciling: booleanFeatureReconciling">
  This is shown when the feature flag is enabled.
</div>
<ng-template #booleanFeatureElse>
  This is shown when the feature flag is disabled.
</ng-template>
<ng-template #booleanFeatureInitializing>
  This is shown when the feature flag is initializing.
</ng-template>
<ng-template #booleanFeatureReconciling>
  This is shown when the feature flag is reconciling.
</ng-template>
```

[//]: # (wizard-evaluate-end)

### Number Feature Flag Directive

The OpenFeature SDK provides a `numberFeatureFlag` directive to get the value of a number feature flag. See the [OpenFeature Angular SDK Documentation](https://openfeature.dev/docs/reference/technologies/client/web/angular#how-to-use) for more details on how to use this directive.

```html
<div
  *numberFeatureFlag="'discountRate'; value: 10; default: 5; else: numberFeatureElse; initializing: numberFeatureInitializing; reconciling: numberFeatureReconciling">
  This is shown when the feature flag matches the specified discount rate value.
</div>
<ng-template #numberFeatureElse>
  This is shown when the feature flag does not match the specified discount rate value.
</ng-template>
<ng-template #numberFeatureInitializing>
  This is shown when the feature flag is initializing.
</ng-template>
<ng-template #numberFeatureReconciling>
  This is shown when the feature flag is reconciling.
</ng-template>
```

### String Feature Flag Directive

The OpenFeature SDK provides a `stringFeatureFlag` directive to get the value of a string feature flag. See the [OpenFeature Angular SDK Documentation](https://openfeature.dev/docs/reference/technologies/client/web/angular#how-to-use) for more details on how to use this directive.

```html
<div
  *stringFeatureFlag="'themeColor'; value: 'dark'; default: 'light'; else: stringFeatureElse; initializing: stringFeatureInitializing; reconciling: stringFeatureReconciling">
  This is shown when the feature flag matches the specified theme color value.
</div>
<ng-template #stringFeatureElse>
  This is shown when the feature flag does not match the specified theme color value.
</ng-template>
<ng-template #stringFeatureInitializing>
  This is shown when the feature flag is initializing.
</ng-template>
<ng-template #stringFeatureReconciling>
  This is shown when the feature flag is reconciling.
</ng-template>
```

### Object Feature Flag Directive

The OpenFeature SDK provides a `objectFeatureFlag` directive to get the value of an object feature flag. See the [OpenFeature Angular SDK Documentation](https://openfeature.dev/docs/reference/technologies/client/web/angular#how-to-use) for more details on how to use this directive.

```html
<div
  *objectFeatureFlag="'userConfig'; value: { theme: 'dark' }; default: { theme: 'light' }; else: objectFeatureElse; initializing: objectFeatureInitializing; reconciling: objectFeatureReconciling">
  This is shown when the feature flag matches the specified user configuration object.
</div>
<ng-template #objectFeatureElse>
  This is shown when the feature flag does not match the specified user configuration object.
</ng-template>
<ng-template #objectFeatureInitializing>
  This is shown when the feature flag is initializing.
</ng-template>
<ng-template #objectFeatureReconciling>
  This is shown when the feature flag is reconciling.
</ng-template>
```

#### JSON Object Flag Limitations

The OpenFeature spec for JSON object flags allows for any type of valid JSON value to be set as the flag value.

For example the following are all valid default value types to use with OpenFeature:

```typescript
// Invalid JSON values for the DevCycle SDK, will return defaults
openFeatureClient.getObjectValue('json-flag', ['arry'])
openFeatureClient.getObjectValue('json-flag', 610)
openFeatureClient.getObjectValue('json-flag', false)
openFeatureClient.getObjectValue('json-flag', 'string')
openFeatureClient.getObjectValue('json-flag', null)
```

However, these are not valid types for the DevCycle SDK, the DevCycle SDK only supports JSON Objects:

```typescript
// Valid JSON Object as the default value, will be evaluated by the DevCycle SDK
openFeatureClient.getObjectValue('json-flag', { default: 'value' })
```

