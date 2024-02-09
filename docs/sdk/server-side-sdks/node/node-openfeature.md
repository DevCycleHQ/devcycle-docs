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
directly from the SDK using the `getOpenFeatureProvider()` method.

## Usage

### Installation

Install the DevCycle NodeJS Server SDK and the OpenFeature Server SDK peer dependencies:

#### NPM
```bash
npm install --save @devcycle/nodejs-server-sdk @openfeature/core @devcycle/nodejs-server-sdk
```

#### Yarn

```bash
yarn add @openfeature/server-sdk @openfeature/core @devcycle/nodejs-server-sdk
```

### Getting Started

Initialize the DevCycle SDK and set the DevCycleProvider as the provider for OpenFeature:

```typescript
import { OpenFeature, Client } from '@openfeature/server-sdk'
import { initializeDevCycle } from '@devcycle/nodejs-server-sdk'

const { DEVCYCLE_SERVER_SDK_KEY } = process.env
...

// Initialize the DevCycle SDK
const devcycleClient = initializeDevCycle(DEVCYCLE_SERVER_SDK_KEY)
// Set the provider for OpenFeature from the DevCycleClient
await OpenFeature.setProviderAndWait(devcycleClient.getOpenFeatureProvider())
// Create the OpenFeature client
openFeatureClient = OpenFeature.getClient()
// Set the context for the OpenFeature client, you can use 'targetingKey' or 'user_id'
openFeatureClient.setContext({ targetingKey: 'node_sdk_test' })


// Retrieve a boolean flag from the OpenFeature client
const boolFlag = await openFeatureClient.getBooleanValue('boolean-flag', false)
```

### Passing DevCycleOptions to the DevCycleProvider

Ensure that you pass any custom DevCycleOptions set on the `DevCycleClient` instance to the DevCycleProvider constructor

```typescript
const options = { logger: dvcDefaultLogger({ level: 'debug' }) }
const devcycleClient = initializeDevCycle(
  DEVCYCLE_SERVER_SDK_KEY,
  options,
)
await OpenFeature.setProviderAndWait(devcycleClient.getOpenFeatureProvider())
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
