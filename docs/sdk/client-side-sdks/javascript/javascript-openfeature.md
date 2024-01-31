---
title: Javascript OpenFeature Web Provider
sidebar_label: OpenFeature
sidebar_position: 5
description: How to implement the OpenFeature Web Provider
sidebar_custom_props: { icon: material-symbols:toggle-off }
---

# OpenFeature Web Provider

[OpenFeature](https://openfeature.dev/) is an open standard that provides a vendor-agnostic, community-driven API for feature flagging that works with DevCycle.

DevCycle provides a Javascript implementation of the OpenFeature Web Provider interface, if you prefer to use the OpenFeature APIs to interface with DevCycle.

**Note: The OpenFeature Web SDK is still in beta, and is subject to change.**

[![Npm package version](https://badgen.net/npm/v/@devcycle/openfeature-web-provider)](https://www.npmjs.com/package/@devcycle/openfeature-web-provider)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/js-sdks/tree/main/examples/openfeature-web)

## Usage

### Installation

Install the OpenFeature Web SDK and DevCycle Web Provider:

#### NPM
```bash
npm install --save @devcycle/openfeature-web-provider
```

#### Yarn
If using `yarn` you will need to install peer-dependencies:

```bash
yarn add @openfeature/web-sdk @openfeature/core @devcycle/openfeature-web-provider
```

### Getting Started

Initialize the DevCycleProvider and set it as the provider for OpenFeature,
which will initialize the DevCycle JS Client SDK internally:

```typescript
import DevCycleProvider from '@devcycle/openfeature-web-provider'
import { OpenFeature } from '@openfeature/web-sdk'

...

const user = { user_id: 'user_id' }

// Initialize the DevCycle Provider
const devcycleProvider = new DevCycleProvider(DEVCYCLE_CLIENT_SDK_KEY)
// Set the context before the provider is set to ensure the DevCycle SDK is initialized with a user context.
await OpenFeature.setContext(user)
// Set the DevCycleProvider for OpenFeature
await OpenFeature.setProviderAndWait(devcycleProvider)
// Get the OpenFeature client
const openFeatureClient = OpenFeature.getClient()

// Retrieve a boolean flag from the OpenFeature client
const boolFlag = openFeatureClient.getBooleanValue('boolean-flag', false)
```

### Passing DevCycleOptions to the DevCycleProvider

Ensure that you pass any custom DevCycleOptions to the DevCycleProvider constructor

```typescript
const user = { user_id: 'user_id' }

const options = { logger: dvcDefaultLogger({ level: 'debug' }) }
const devcycleProvider = new DevCycleProvider(DEVCYCLE_CLIENT_SDK_KEY, options)
await OpenFeature.setProviderAndWait(devcycleProvider)
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
