---
title: Features and Functionality
sidebar_position: 1
---

DevCycle strives to ensure that all our APIs and SDKs have identical functionality 
(except language- or platform-specific nuances). Below is a list of all the current 
functionality that DevCycle supports across the SDKs.

**Universal**

- [Initialization](#initialization)
- [Evaluating Features & Using Variables](#evaluating-features--using-variables)
- [Getting All Features](#getting-all-features)
- [Getting All Variables](#getting-all-variables)
- [Identifying Users / Setting Properties](#identifying-a-user-or-setting-properties)
- [Tracking Events](#tracking-custom-events)

**Limited**

- [Custom Domains](#custom-domains)
- [Realtime Updates](#realtime-updates)

## Initialization

### Client-Side SDKs

For most client-side SDKs, the only required parameters to initialize the SDK are the SDK Key and the current user.
The SDK key is unique to each project and environment and can be found in the DevCycle dashboard.
The current user is determined by you, and should contain any details about the user that you require for your targeting
logic.

A typical initialization call looks like this
```typescript
const devcycleClient = initializeDevCycle('<DEVCYCLE_CLIENT_SDK_KEY>', user)
```

SDKs also offer a way to wait for initialization to finish, meaning that the DevCycle configuration has been obtained
and the SDK is ready to return the correct variable values for the given user.

Here is a Javascript example:
```typescript
// wait for client to initialize
await devcycleClient.onClientInitialized()
```

#### Caching of Configurations

When initialized, each client-side SDK will cache the retrieved configuration for the user.

This cache will be used in scenarios where on subsequent initializations a new configuration is not available. 
This may be due to a lack of internet connection or a lack of connection to DevCycle.

Additionally, if the SDK is interacted with before any initialization (such as attempting to read a variable far 
early on in an application before initialization), the cached value will be read.

If a variable is first read from the cache and has a listener for [realtime updates](#realtime-updates), if a 
new value is retrieved after initialization, the `onUpdate` function will be triggered.

### Server-Side SDKs
For most server-side SDKs, the only required parameter to initialize the SDK is the SDK Key.
The SDK key is unique to each project and environment and can be found in the DevCycle dashboard.

A typical initialization call looks like this
```typescript
const devcycleClient = initializeDevCycle('<DEVCYCLE_SERVER_SDK_KEY>')
```

SDKs also offer a way to wait for initialization to finish, meaning that the DevCycle configuration has been obtained
and the SDK is ready to return the correct variable values for the given user.

Here is a Javascript example:
```typescript
// wait for client to initialize
await devcycleClient.onClientInitialized()
```

## Evaluating Features & Using Variables

This section explains how to use retrieve the Variables of a Feature as well as use their values. For information 
on setting up a Feature for use, read [Variables and Variations](/essentials/variables) and [Targeting Users](/essentials/targeting)

Every SDK provides a method to retrieve a Variable's value. It expects to receive the unique key of the Variable, 
and a default value to serve in case no other value is available.

A typical Variable method would look something like this:

```typescript
const myVariableValue = devcycleClient.variableValue(
  // Variable "key"
  'my-variable-key',
  // Default value to use if DevCycle has no other value
  'default-value',
)
```

Each call to this method is tracked as an "evaluation" event. These events will be shown in the DevCycle dashboard and 
are used to power the analytics graphs that allow you to see the effects of your Variables being used.

The default value will be returned in the following scenarios:

- The SDK has not yet finished initializing and obtaining a configuration from DevCycle
- There was an error reaching the DevCycle servers and the configuration could not be obtained
- The variable does not exist in DevCycle
- The default value's type does not align with the type of the variable being served from DevCycle. For example, a Boolean default value
  will be used if the DevCycle configuration is trying to set this variable to a String value. This preserves type safety and prevents the remote
  configuration from breaking your application at runtime.
- The SDK has finished initializing, but the user has not been targeted for a Feature that controls this Variable

For more information on how the default value is used, see [Variable Defaults](/platform/advanced-variables/variable-defaults).

## Getting All Features

The "Get All Features" function in an SDK will return a map of all the features that the user is currently receiving.
The response is the following general format, with slight changes depending on the specifics of the SDK:

```json
{
  "your-cool-feature": {
    "_id": "123456",
    "key": "your-cool-feature",
    "type": "release",
    "_variation": "333345"
  },
  "another-feature": {
    "_id": "123456",
    "key": "another-feature",
    "type": "ops",
    "_variation": "444123"
  }
}
```

Only Features that the User has satisfied [targeting rules](/essentials/targeting) for will be returned by this function. 
The feature must also be **enabled** for that environment.

## Getting all Variables

The "Get All Variables" function in an SDK will return a map of all the Variables that the user is receiving.

The response is the following general format, with slight changes depending on the specifics of the SDK:

```json
{
  "my-feature-variable": {
    "_id": "617c19199db63239d2d17025",
    "key": "my-feature-variable",
    "type": "Boolean",
    "value": false
  },
  "some-string-variable": {
    "_id": "61828f25c1c23bc6ae1366e9",
    "key": "some-string-variable",
    "type": "String",
    "value": "this is a string variable value"
  }
}
```

Only Variables in Features that the user has satisfied [targeting rules](/essentials/targeting) for will be part of the response in this method. 
The Feature must also be **enabled** for the environment this SDK is being called on.

:::caution

This method is intended to be used for debugging and analytics purposes, _not_ as a method for retrieving the value of Variables to change code behaviour.
For that purpose, we strongly recommend using the individual variable access method described in [Evaluating Features & Using Variables](#evaluating-features--using-variables)
Using this method instead will result in no evaluation events being tracked for individual variables, and will not allow the use
of other DevCycle features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Identifying a User or Setting Properties

All SDKs have the concept of a user "identity" to be used for evaluating feature targeting rules. The Features
that are served to a user will be a function of the targeting rules and the user data you provide to the SDK.

:::tip

While we refer to these identities as "users", the data passed here can represent anything you want to target against.
In these cases, you can use any string that makes sense as an identifier as the "user_id". The id simply needs to be
consistent to ensure consistent random distributions and rollouts.

:::

The user data object that you should use across SDKs should look something like this:

```json
{
  "user_id": "user1@devcycle.com",
  "name": "user 1 name",
  "customData": {
    "customKey": "customValue"
  },
  "privateCustomData": {
    "privateKey": "privateValue"
  }
}
```

The identification of users functions differently on Client SDKs vs. Server SDKs

### Client SDK Identification

Client SDKs can be initialized with a user object if the user data is known at that time. All client SDKs accept
a "user" argument in their initialization function. By providing the user here, the SDK's initial configuration request
will be made with that data and the correct Variable values will be available once the SDK initializes. For that reason,
providing user data during initialization is recommended where possible.

Identifying a user can also be accomplished later by calling the `identifyUser` function and providing your
user data object. When this method is called, the SDK will retrieve a new configuration from the DevCycle servers
corresponding to that user. A typical call to this method looks like

```typescript
const user = {
  user_id: 'myUser'
}

await devCycleClient.identifyUser(user)
```

The `identifyUser` method always includes a way to wait for the operation to finish. When finished, the SDK will have
the correct configuration for the given user and all Variable evaluations from that point onward will be based on the
new user's data. This method is useful when user data can not be known at initialization time, or when the user's 
identity must be changed during the application's lifecycle.

#### Anonymous Users

:::info

If a user id is not supplied, client-side SDKs will automatically generate a user id and assign it to the current user. 
This id will be cached and used between app sessions / website visits until a user id is supplied or [reset](#reset-user) is 
called. This will ensure you will not experience a rise in MAUs if the main experience of your application is in a logged-out or anonymous state.

:::

#### Resetting a User
Client SDKs also contain a method for "resetting" a user's identity. This can be used in cases like "logging out", where there is no longer
any identifiable information to pass to the SDK. In those cases, "reset" will clear all stored data and generate a new "anonymous" user ID
to represent the user.

#### Custom Data and Private Custom Data

User data can also contain "custom data", which is a key-value map of any arbitrary data you want to use for targeting.
The provided data can be used in Targeting Rules by creating Custom Properties in the DevCycle dashboard. Learn more
about [Custom Property Targeting](/platform/advanced-targeting/custom-properties)

When setting custom properties you have a choice between keeping that data completely private or allowing 
for the data to be logged back to DevCycle's events database. Both options allow for the same targeting capabilities, 
but you should use Private Custom Data if you are looking to avoid having user data saved to any external system.

With Private Custom Data, data is used solely for targeting decisions within DevCycle's Edge Workers. 
It is then discarded and no record is saved anywhere.

With regular Custom Data, the data used for evaluation purposes is logged back to DevCycle's events database where 
it can be used for debugging purposes or providing guidance on evaluation reasons.

#### Server-Side SDK Identification

Unlike the Client-Side SDKs, Server-Side SDKs work in a multi-user context. 
Because of this, a single Identify function does not make sense. 
Instead, you must provide the user data to each function call when evaluating variables. For example:

```typescript
const user = {
    user_id: 'myUser'
}

const myVariableValue = devcycleClient.variableValue(
  // User data
  user,
  // Variable "key"
  'my-variable-key',
  // Default value to use if DevCycle has no other value
  'default-value'
)
```

In [Local Bucketing](#local-bucketing) mode (the default), these calls will quickly compute the variable value locally using the currently
stored DevCycle configuration, and no network calls will be made.

## Tracking Custom Events

The Track function in the DevCycle SDKs allows you to send custom events which can later be used for your own data analysis on enabled Features,
and metrics on A/B tests and experiments within the DevCycle dashboard.

## Custom Domains

When using client-side SDKs, particularly web client SDKs there is the potential for Ad Blockers 
and browser privacy features to block requests and third-party cookies. Custom Domains with DevCycle ensures
all cookies and requests used are first-party and will not be blocked by ensuring requests are sent through your
recognized domain. A DNS CNAME needs to be created to leverage this feature.

:::info

**Setting Up Custom Domains:**

Custom Domains is an enterprise feature and requires manual setup on both your end as well as DevCycle's. If you are interested in getting set up these docs will guide you through the steps, but please reach out to support@devcycle.com for assistance.

:::

For instructions on setting up a custom domain, see [Custom Domains](/platform/custom-domains).

## Realtime Updates

DevCycle SDKs are capable of being notified in real time that new configuration changes have been made in the DevCycle platform.
DevCycle leverages Server-Sent Events (SSE) to notify the SDKs that a feature (targeting rules, variable values, etc.)
has been saved and that they should fetch the new configuration.

#### Client-Side SDK

A connection URL is included in the config that the SDK fetches, triggering the SDK to open a connection with our SSE provider listening
for any changes from the dashboard.

The following Client-Side SDKs currently have Realtime Updates:

- Javascript SDK
- React SDK
- iOS SDK
- Android SDK
- Flutter SDK

##### **Javascript SDK**, **React SDK**

If the user loses focus on the webpage for longer then the `inactivityDelay` (the default of which is set to 2 minutes, and can be configured through the options), the SDK will disconnect from the SSE provider and will reconnect when the user opens the tab / window again (i.e. the page's visibility state = `visible`). The SDK will also request a new configuration during reconnection to receive any updates it may have missed while the realtime connection was closed.

##### **iOS SDK**, **Android SDK** & **Flutter SDK**

If the user backgrounds the application for some period of time, the SDK will disconnect from the SSE provider and will reconnect again when the user brings the application to the foreground. When the application is brought to the foreground the SDK will request a new configuration to receive any updates it may have missed while the realtime connection was closed.

## Local and Cloud Bucketing

Server SDKs have two modes, "Local Bucketing" and "Cloud Bucketing":

### Local Bucketing

Local Bucketing does all targeting decisions locally inside the server running the SDK. The DevCycle
configuration is downloaded upon initialization of the SDK, and all future SDK calls will determine flag values
based on this data and the provided user data. This approach will guarantee instantaneous, synchronous results
from the SDK.

### Cloud Bucketing

The SDK determines flag values by making an API call for each decision, using workers at the edge which are available
globally. Every function within the SDK will reach out to these edge workers and respond with
extremely low latency.

Cloud bucketing is required to use specific features such as (EdgeDB)[/platform/edgedb] and
(Feature Opt-In)[/platform/advanced-targeting/feature-opt-in]. If you aren't using these features, then Local Bucketing
is the recommended mode.
