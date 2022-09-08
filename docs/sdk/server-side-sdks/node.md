---
title: Node.js SDK
sidebar_position: 1
---

# DevCycle NodeJS Server SDK

The NodeJS Server SDK for DevCycle.

This SDK uses local bucketing to perform all user segmentation and bucketing locally in the SDK, 
providing immediate responses to variable and feature requests for a user. 

The SDK will download the latest version of your DevCycle environments configuration from a CDN on initialization,
and will periodically poll the CDN for configuration changes.

:::

The SDK is available as a package on npm. It is also open source and can be viewed on Github.

[![Npm package version](https://badgen.net/npm/v/@devcycle/nodejs-server-sdk)](https://www.npmjs.com/package/@devcycle/nodejs-server-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Installation

Our library can be found on npm and installed by the following:

```
npm install --save @devcycle/nodejs-server-sdk
```

## Getting Started

To use the DVC Server SDK in your project, import the `@devcycle/nodejs-server-sdk` package and 
call `initialize` with your DVC environment server key. You may optionally `await` for the client
to be initialized.

JS Example:
```javascript
const DVC = require('@devcycle/nodejs-server-sdk')

const dvcClient = await DVC.initialize('<DVC_ENVIRONMENT_SERVER_KEY>').onClientInitialized()
```

Typescript Example:
```typescript
import { initialize } from '@devcycle/nodejs-server-sdk'

const dvcClient = await initialize('<DVC_ENVIRONMENT_SERVER_KEY>').onClientInitialized()
```

## Usage

### Initialization Options

The SDK exposes various initialization options which can be set on the `initialization()` method:

```javascript
const dvcClient = await DVC.initialize('<DVC_ENVIRONMENT_SERVER_KEY>', {
        configPollingIntervalMS: 60 * 1000 
    }).onClientInitialized()
```

| DVC Option | Description |
| --- | ----------- |
| configPollingIntervalMS | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second. |
| configPollingTimeoutMS | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| flushEventsMS | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds. |
| disableEventLogging | Disables logging of any events or user data to DevCycle. |
| enableCloudBucketing | Switches the SDK to use Cloud Bucketing (via the DevCycle Bucketing API) instead of Local Bucketing. |
| enableEdgeDB | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing. |

### User Object

The full user data must be passed into every method. The only required field is the `user_id`. 
The rest are optional and are used by the system for user segmentation into variables and features.

```javascript
const user = {
    user_id: 'user1@devcycle.com',
    name: 'user 1 name',
    customData: {
        customKey: 'customValue'
    }
}
const variable = dvcClient.variable(user, 'test-feature', false)
```

### Get and Use Variable by Key

To get values from your Variables, `dvcClient.variable()` is used to fetch variable values using the user data, 
variable `key`, coupled with a default value for the variable. The default variable will be used in cases where
the user is not segmented into a feature using that variable, or the project configuration is unavailable 
to be fetched from DevCycle's CDN. 

The default value can be of type string, boolean, number, or object.

```javascript
const variable = dvcClient.variable(user, 'YOUR_VARIABLE_KEY', false)
if (variable.value) {
    // Feature Flag on
}
```
See [getVariableByKey](https://docs.devcycle.com/bucketing-api/#operation/getVariableByKey) on the Bucketing API for the variable response format.

### Getting All Variables

To grab all the segmented variables for a user:

```javascript
const variables = dvcClient.allVariables(user)
```
See [getVariables](https://docs.devcycle.com/bucketing-api/#operation/getVariables) on the Bucketing API for the variable response format.

### Getting All Features

You can fetch all segmented features for a user:

```javascript
const features = dvcClient.allFeatures(user)
```
See [getFeatures](https://docs.devcycle.com/bucketing-api/#operation/getFeatures) on the Bucketing API for the feature response format.

### EdgeDB
:::info

EdgeDB is only available with Cloud Bucketing and does not have any impact on Local Bucketing.

:::

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. Read more about [EdgeDB](https://docs.devcycle.com/docs/home/feature-management/edgedb/).

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the enableEdgeDB option to turn on EdgeDB mode for the SDK:

```javascript
const DVC = require('@devcycle/nodejs-server-sdk')

const dvcClient = await DVC.initialize('<DVC_ENVIRONMENT_SERVER_KEY>', {
  enableCloudBucketing: true,
  enableEdgeDB: true
}).onClientInitialized()

const user = {
  user_id: 'test_user',
  email: 'example@example.ca',
  country: 'CA'
}

const variable = dvcClient.variable(user, 'test-feature', false)
```

This will send a request to our EdgeDB API to save the custom data under the user `test_user`.

In the example, Email and Country are associated to the user `test_user`. In your next variable call for the same `user_id`, you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features.
