---
title: JavaScript SDK
sidebar_position: 2
---

# DevCycle JavaScript Client SDK

The JS SDK uses local bucketing to perform all user segmentation. Furthermore, local bucketing occurs within the SDK, providing users with immediate responses to variable and feature requests.

The JS SDK is available on NPM as an open-source package that can be viewed on the DevCycle GitHub.

When initialized, the SDK will download the latest version of your DevCycle environments’ configuration from a CDN.

[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-js-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-js-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

## Installation

### I) NPM Module

The recommended way to include the JS SDK is by bundling it with the rest of your application code using our NPM Module.

The JS SDK library can be found on NPM. To get started, install the JS SDK using NPM:

```bash
npm install --save @devcycle/devcycle-js-sdk
```

To use the JS SDK in your project, import the `initialize` function:

```js
import { initialize } from "@devcycle/devcycle-js-sdk";
```

### II) Using the CDN

If you want to load the JS SDK on your webpage separately from your main application bundle, you can use a script tag to do so.

Place the following code snippet as high as possible in your <head> tag.

```bash
<script src="https://js.devcycle.com/devcycle.min.js" type="text/javascript"></script>
```

## Getting Started

- If the JS SDK is installed using NPM, call `initialize` with your client key, a user object, and an optional options object.
- Otherwise, If you’re using the CDN to install the JS SDK, call `DevCycle.initialize` with your client key, a user object, and an optional options object.

The user object needs either a `user_id`, or `isAnonymous` set to `true` for an anonymous user. The options object is optional, but can passed a `logWriter` for a custom logging solution and a `logLevel`, which must be one of `info`, `debug`, `warn` or `error`. The default options are to set the `logWriter` to be the console and the `logLevel` to `error`.

```javascript
const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
const dvcClient = initialize("YOUR_CLIENT_KEY", user, dvcOptions); // replace initialize with DevCycle.initialize if using the CDN
```

### DVC User Object

[DVCUser Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L55)

| Property          | Type    | Description                                                                                                     |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| isAnonymous       | boolean | Boolean to indicate if the user is anonymous                                                                    |
| user_id           | string  | Unique user ID                                                                                                  |
| email             | string  | User's email                                                                                                    |
| name              | string  | User's name                                                                                                     |
| language          | string  | User's language                                                                                                 |
| country           | string  | User's country                                                                                                  |
| appVersion        | string  | App version                                                                                                     |
| appBuild          | number  | App build                                                                                                       |
| customData        | DVCJSON | Key/value map of properties to be used for targeting                                                            |
| privateCustomData | DVCJSON | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

### Initialization Options

The SDK exposes various initialization options which can be set on the `initialization()` method:

[DVCOptions Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44)

| DVC Option           | Type                                                                                                     | Description                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| eventFlushIntervalMS | number                                                                                                   | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| enableEdgeDB         | boolean                                                                                                  | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| logger               | [DVCLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2)           | Logger override to replace default logger                                                                      |
| logLevel             | [DVCDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.        |
| apiProxyURL          | string                                                                                                   | Allows the SDK to communicate with a proxy of DVC bucketing API / client SDK API.                              |

## Waiting for Features

You can wait on the features to be loaded from our servers by using `.onClientInitialized()` function. It returns a promise that you can use to wait until features are ready to be used:

```javascript
dvcClient.onClientInitialized().then(() => {
    const featureToggle = dvcClient.variable('YOUR_VARIABLE_KEY', false)
    if (featureToggle.value) {
        ...
    } else {
        ...
    }
})
```

You can also pass in a callback which will get called after the features are loaded:

```javascript
dvcClient.onClientInitialized((err) => {
    if (err) {
        // error state
    }

    const featureToggle = dvcClient.variable('YOUR_VARIABLE_KEY', false)
    if (featureToggle.value) {
        ...
    } else {
        ...
    }
})
```

## Grabbing Variable Values

To get values from your Features, `.variable` is used to fetch variable values using the identifier `key` coupled with a default value. The default value can be of type string, boolean, number, or object.

```javascript
const variable = dvcClient.variable("YOUR_VARIABLE_KEY", "default value");
```

To grab the value, there is a property on the object returned to grab the value:

```javascript
const value = variable.value;
```

If the value is not ready, it will return the default value passed in the creation of the variable.

The `onUpdate` accepts a handler function that will be called whenever a variable value has changed.
This can occur as a result of a project configuration change or calls to `identifyUser` or `resetUser`. To learn more, visit our [Realtime Updates](/docs/sdk/features/realtime-updates) page.

There can only be one onUpdate function registered at a time. Subsequent calls to this method will overwrite the previous handler:

```javascript
variable.onUpdate((value) => {
  // value returned when the value of the variable changes
});
```

The `DVCVariable` type interface can be found [here](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L233).

## Identifying User

To identify a different user, or the same user passed into the initialize with more attributes, pass in the entire user attribute object into `identifyUser`:

```javascript
const user = {
  user_id: "user1",
  name: "user 1 name",
  customData: {
    customKey: "customValue",
  },
};
dvcClient.identifyUser(user);
```

To wait on Variables that will be returned from the identify call, you can pass in a callback or use the Promise returned if no callback is passed in:

```javascript
const variableSet = await dvcClient.identifyUser(user);

// OR

dvcClient.identifyUser(user, (err, variables) => {
  // variables is the variable set for the identified user
});
```

## Reset User

To reset the user into an anonymous user, `resetUser` will reset to the anonymous user created before or will create one with an anonymous `user_id`.

```javascript
dvcClient.resetUser();
```

To wait on the Features of the anonymous user, you can pass in a callback or use the Promise returned if no callback is passed in:

```javascript
const variableSet = await client.resetUser();

// OR

dvcClient.resetUser((err, variables) => {
  // variables is the variable set for the anonymous user
});
```

## Grabbing All Features / Variables

To grab all the Features or Variables returned in the config:

```javascript
const features = client.allFeatures();
const variables = client.allVariables();
```

If the SDK has not finished initializing, these methods will return an empty object.

See [getVariables](https://docs.devcycle.com/bucketing-api/#operation/getVariables) and [getFeatures](https://docs.devcycle.com/bucketing-api/#operation/getFeatures) on the Bucketing API for the response formats.

## Tracking Events

To track events, pass in an object with at least a `type` key:

```javascript
const event = {
  type: "my_event_type", // this is required
  date: new Date(),
  target: "my_target",
  value: 5,
  metaData: {
    key: "value",
  },
};
dvcClient.track(event);
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

```javascript
await dvcClient.flushEvents();

// or

dvcClient.flushEvents(() => {
  // called back after flushed events
});
```

## Subscribing to SDK Events

The SDK can emit certain events when specific actions occur which can be listened on by subscribing to them:

```javascript
dvcClient.subscribe(
  "variableUpdated:*",
  (key: string, variable: DVCVariable) => {
    // key is the variable that has been updated
    // The new value can be accessed from the variable object passed in: variable.value
    console.log(`New variable value for variable ${key}: ${variable.value}`);
  }
);
```

The first argument is the name of the event that you can subscribe to. The `subscribe` method will throw an error if you try to
subscribe to an event that doesn't exist. These are the events you can subscribe to:

| **Event**        | **Key**             | **Handler Params**                     | **Description**                                                                                                                                                                                                                                       |
| ---------------- | ------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initialized      | `initialized`       | `(initialized: boolean)`               | An initialized event is emitted once the SDK has received its first config from DevCycle. This event will only be emitted once.                                                                                                                       |
| Error            | `error`             | `(error: Error)`                       | If any error occurs in the SDK, this event emits that error.                                                                                                                                                                                          |
| Variable Updated | `variableUpdated:*` | `(key: string, variable: DVCVariable)` | This event gets triggered when a variable value changes for a user. You can subscribe to all variable updates using the `*` identifier, or you can pass in the key of the variable you want to subscribe to, e.g. `variableUpdated:my_variable_key`.  |
| Feature Updated  | `featureUpdated:*`  | `(key: string, feature: DVCFeature)`   | This event gets triggered when a feature's variation changes for a user. You can subscribe to all feature updates using the `*` identifier, or you can pass in the key of the feature you want to subscribe to, e.g. `featureUpdated:my_feature_key`. |

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user.

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the `enableEdgeDB` option to turn on EdgeDB mode for the SDK:

```javascript
const user = {
  user_id: "my_user",
  customData: {
    amountSpent: 50,
  },
};
const options = {
  enableEdgeDB: true,
};
const dvcClient = initialize("YOUR_CLIENT_KEY", user, options);
```

This will send a request to our EdgeDB API to save the custom data under the user `my_user`.

In the example, `amountSpent` is associated to the user `my_user`. In your next `identify` call for the same `user_id`,
you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features:

```
dvcClient.identifyUser({ user_id: 'my_user' }) // no need to pass in "amountSpent" any more!
```
