---
title: Node.js OpenFeature Provider
sidebar_label: OpenFeature
sidebar_position: 4
description: How to implement the OpenFeature Provider
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature Provider

OpenFeature is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides a NodeJS implementation of the [OpenFeature](https://openfeature.dev/) Provider interface
directly from the SDK using the `DevCycleProvider` class.

## Usage

### Installation

Install the DevCycle NodeJS Server SDK which includes the OpenFeature Server SDK as a dependency

#### NPM

[//]: # (wizard-install-start)

```bash
npm install --save @devcycle/nodejs-server-sdk
```

[//]: # (wizard-install-end)

#### Yarn

```bash
yarn add @devcycle/nodejs-server-sdk
```

### Getting Started

[//]: # (wizard-initialize-start)

Create the DevCycleProvider and set it as the provider for OpenFeature:

```typescript
import { OpenFeature, Client } from '@openfeature/server-sdk'
import { DevCycleProvider } from '@devcycle/nodejs-server-sdk'

const { DEVCYCLE_SERVER_SDK_KEY } = process.env
...

// Create the DevCycleProvider
const devcycleProvider = new DevCycleProvider(DEVCYCLE_SERVER_SDK_KEY)
// Set the provider for OpenFeature
await OpenFeature.setProviderAndWait(devcycleProvider)
// Create the OpenFeature client
openFeatureClient = OpenFeature.getClient()
```

[//]: # (wizard-initialize-end)

### Evaluate a Variable

[//]: # (wizard-evaluate-start)

Use a Variable value by creating the EvaluationContext, then passing the Variable key, default value, and EvaluationContext to one of the OpenFeature flag evaluation methods.

```typescript
// Set the context for the OpenFeature client, you can use 'targetingKey' or 'user_id'
const context = { targetingKey: 'node_sdk_test' }

// Retrieve a boolean flag from the OpenFeature client
const boolFlag = await openFeatureClient.getBooleanValue('boolean-flag', false, context)
```

[//]: # (wizard-evaluate-end)

### Tracking Events

You can use the OpenFeature `track` method to track events which will be sent to DevCycle as custom events. Calling `track` will queue the event, which will be sent in batches to the DevCycle servers.

```typescript
const context = { targetingKey: 'node_sdk_test' }
openFeatureClient.track('custom-event', context, {
  target: 'event-target',
  value: 100,
  metaDataField: 'value',
})
```

To track custom events with OpenFeature you are required to set the first argument as the event name, and pass the EvaluationContext as the second argument. The event name will be used as the event's `type` in DevCycle, and you can optionally set a `value` / `target` / `date` as defined in the [DevCycleEvent Typescript Schema](https://github.com/search?q=repo%3ADevCycleHQ%2Fjs-sdks+export+interface+DevCycleEvent+language%3ATypeScript+path%3A*types.ts&type=code). Any additional properties will be added to the event as `metaData` fields.

### Passing DevCycleOptions to the DevCycleProvider

Ensure that you pass any custom `DevCycleOptions` set on the `DevCycleClient` instance to the `DevCycleProvider` constructor

```typescript
const options = { logger: dvcDefaultLogger({ level: 'debug' }) }
const devcycleProvider = new DevCycleProvider(DEVCYCLE_SERVER_SDK_KEY, options)
await OpenFeature.setProviderAndWait(devcycleProvider)
```

### Accessing the DevCycleClient

If you need to access the underlying `DevCycleClient` from the provider, it is exposed using `provider.devcycleClient`:

```typescript
const devcycleProvider = new DevCycleProvider(DEVCYCLE_SERVER_SDK_KEY)
await OpenFeature.setProviderAndWait(devcycleProvider)
...
const allFeatures = devcycleProvider.devcycleClient.allFeatures(dvcUser)
```

### Required TargetingKey

For DevCycle SDK to work we require either a `targetingKey` or `user_id` to be set on the OpenFeature context.
This is used to identify the user as the `user_id` for a `DevCycleUser` in DevCycle.

### Context properties to DevCycleUser

The provider will automatically translate known `DevCycleUser` properties from the OpenFeature context to the `DevCycleUser` object.
[DevCycleUser TypeScript Interface](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/nodejs/src/models/user.ts#L16)

For example all these properties will be set on the `DevCycleUser`:

```typescript
openFeatureClient.setContext({
  user_id: 'user_id',
  email: 'email@devcycle.com',
  name: 'name',
  language: 'en',
  country: 'CA',
  appVersion: '1.0.11',
  appBuild: 1000,
  customData: { custom: 'data' },
  privateCustomData: { private: 'data' },
})
```

Context properties that are not known `DevCycleUser` properties will be automatically
added to the `customData` property of the `DevCycleUser`.

### Context Limitations

DevCycle only supports flat JSON Object properties used in the Context. Non-flat properties will be ignored.

For example `obj` will be ignored:

```typescript
openFeatureClient.setContext({
  user_id: 'user_id',
  obj: { key: 'value' },
})
```

### JSON Flag Limitations

The OpenFeature spec for JSON flags allows for any type of valid JSON value to be set as the flag value.

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
