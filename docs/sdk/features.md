---
title: Features and Functionality
sidebar_position: 1
---

DevCycle strives to ensure that all our APIs and SDKs have identical functionality (except language or platform-specific
nuances). Below is a list of all the current functionality that DevCycle supports across the SDKs.

**Universal**

- [Initialization](#initialization)
- [Evaluating Features & Using Variables](#evaluating-features--using-variables)
- [Getting All Features](#getting-all-features)
- [Getting All Variables](#getting-all-variables)
- [Identifying Users / Setting Properties](#Identifying-a-User-or-Setting-Properties)
- [Tracking Events](#tracking-custom-events)

**Limited**

- [Custom Domains](#custom-domains)
- [Realtime Updates](#realtime-updates)
- [Reset User](#reset-user)

## Initialization

This section will cover how to initialize each SDK as well as explain their starting options.

#### Client-Side SDKs

##### Caching of Configurations

When initialized, each client-side SDK will cache the retrieved configuration for the user.

This cache will be used in scenarios where on subsequent initializations a new configuration is not available. This may
be due to a lack of internet connection or a lack of connection to DevCycle.

Additionally, if the SDK is interacted with before any initialization (such as attempting to read a variable far early
on in an application before initialization), the cached value will be read.

If a variable is first read from the cache and has a listener for [realtime updates](#realtime-updates), if a new value
is retrieved after initialization, the `onUpdate` function will be triggered.

## Evaluating Features & Using Variables

This section explains how to use retrieve the Variables of a Feature as well as use their values. For information on
setting up a Feature for use, read [Variables and Variations](/essentials/variables) and
[Targeting Users](/essentials/targeting)

Every SDK provides a method to retrieve a Variable's value. It expects to receive the unique key of the Variable, and a
default value to serve in case no other value is available.

A typical Variable method would look something like this:

```typescript
const myVariableValue = devcycleClient.variableValue("my-variable-key", "default-value");
```

Each call to this method is tracked as an "evaluation" event. These events will be shown in the DevCycle dashboard and
are used to power the analytics graphs that allow you to see the effects of your Variables being used.

The default value will be returned in the following scenarios:

- The SDK has not yet finished initializing and obtaining a configuration from DevCycle
- There was an error reaching the DevCycle servers and the configuration could not be obtained
- The variable does not exist in DevCycle
- The default value's type does not align with the type of the variable being served from DevCycle. For example, a
  Boolean default value will be used if the DevCycle configuration is trying to set this variable to a String value.
  This preserves type safety and prevents the remote configuration from breaking your application at runtime.
- The SDK has finished initializing, but the user has not been targeted for a Feature that controls this Variable

For more information on how the default value is used, see
[Variable Defaults](/extras/advanced-variables/variable-defaults).

## Getting All Features

The "Get All Features" function in an SDK will return a map of all of the features that the user is currently in based
on the information the SDK or API has received.

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

Only Features that the User has satisfied [targeting rules](/essentials/targeting) for will be returned by this
function. The feature must also be **enabled** for that environment.

## Getting all Variables

The "Get All Variables" function in an SDK will return a map of all of the Variables that the user has received from the
DevCycle server based on the information the SDK or API has received.

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

Only Variables in Features that the user has satisfied [targeting rules](/essentials/targeting) for will be part of the
response in this method. The Feature must also be **enabled** for the environment this SDK is being called on.

:::caution

This method is intended to be used for debugging and analytics purposes, _not_ as a method for retrieving the value of
Variables to change code behaviour. For that purpose, we strongly recommend using the individual variable access method
described in [Evaluating Features & Using Variables](#evaluating-features--using-variables) Using this method instead
will result in no evaluation events being tracked for individual variables, and will not allow the use of other DevCycle
features such as [Code Usage detection](/integrations/github/feature-usage-action)

:::

## Identifying a User or Setting Properties

The Client-Side SDKs and Server-Side SDKs function slightly differently. This documentation will cover all of the
information needed to set user data and custom properties on both types of SDKs.

The documentation will also cover the differences between regular data and private data.

Regardless of the SDK type or the type of custom data you are looking to use, the general format of user data remains
largely the same.

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

#### Anonymous Users

:::info

If a user id is not supplied, client-side SDKs will automatically generate a user id and assign it to the current user.
This id will be cached and used between app opens / website visits until a user id is supplied or [reset](#reset-user)
is called. This will ensure you will not experience a rise in MAUs if the main experience of your application is in a
logged-out or anonymous state.

:::

:::tip

In some cases, you may be releasing a feature broadly and not to users, specifically. In these cases, you can use any
string as the "user_id". A user is not expressly required, just an identifier.

:::

#### Custom Data vs. Private Custom Data

When setting custom properties you have a choice between keeping that data completely private or allowing for the data
to be logged back to DevCycle's events database. Both options allow for the same targeting capabilities, but you should
use Private Custom Data if you are looking to avoid having user data saved to any external system.

With Private Custom Data, data is just used solely for evaluating decisions with DevCycle's Edge Workers, it is then
discarded and no record is saved anywhere.

With regular Custom Data, the data used for evaluation purposes is logged back to DevCycle's events database where it
can be used for debugging purposes or providing guidance on evaluation reasons.

:::info

**EdgeDB Usage:** Given Private Custom Data is not written to any DevCycle systems it cannot be used with EdgeDB, as
EdgeDB by its nature saves Custom Data to an Edge Database for flag evaluations.

:::

#### Client-Side SDK Usage

The Identify function is what is used on the Client-Side SDKs to set User IDs as well as custom properties. These SDKs
are built to work in a single-user context on the device. The DevCycle Client-Side SDKs contain local storage of the
current user's information for re-use with each function call. Using the Identify function will add to this storage.

Any call to the Identify function will return the list of relevant Features and Variables for the User.

If your application handles multiple users at once, simply call the Identify function with their new user object and
DevCycle will retrieve that user's set of Features and Variables.

To reset a user completely, please view [Resetting a User](#reset-user).

#### Server-Side SDK Usage

Unlike the Client-Side SDKs, Server-Side SDKs work in a multi-user context. Because of this, a single Identify function
does not make sense. Instead, you must create a User object that is passed into each function call with the relevant
user data given the current application context.

As well, unlike the Client-Side SDKs, because Server-Side SDKs poll for project configuration updates, updating the User
object that you have set will not explicitly grab new feature configurations. The User object once set can be used to
get feature, variation and variable information for a given user or entity.

## Tracking Custom Events

This article serves to explain how to use the SDKs to send up custom events to DevCycle.

The Track function in the DevCycle SDKs allows you to send up custom events which can later be used for your own data
analysis on enabled Features, and metrics on A/B tests and experiments within the DevCycle dashboard.

## Custom Domains

When using client-side SDKs, particularly web client SDKs there is the potential for Ad Blockers and browser privacy
features to block requests and third-party cookies. Custom Domains with DevCycle ensures all cookies and requests used
are first-party and will not be blocked by ensuring requests are sent through your recognized domain. A DNS CNAME needs
to be created to leverage this feature.

:::info

**Setting Up Custom Domains:**

Custom Domains is an enterprise feature and requires manual setup on both your end as well as DevCycle's. If you are
interested in getting set up these docs will guide you through the steps, but please reach out to support@devcycle.com
for assistance.

:::

#### Custom Certificate

If you'd like to have a custom certificate for the endpoint to be used, please contact your account representative. This
requires additional steps that change the flow of this process.

##### Setup Steps

1. **Identifying a Hostname**

- The first step involves **identifying** a hostname to use as the CNAME for DevCycle's endpoint. Provide this to
  DevCycle upon requesting to enable this feature. The hostname should look something like this
  `https://api-alias.your-domain.com`.
  - If there is more than one service in use, each one will need a unique CNAME. This is also true for using DevCycle on
    multiple domains. Each domain needs its own CNAME.

2. **DNS Validation** Once the setup is complete, two DNS records will be provided by DevCycle and you will need to add
   those records to your DNS provider (TXT validation records).

- The first DNS record will be a TXT verification record to ensure that you own the domain that you are asking DevCycle
  to use as a custom hostname.
- The second DNS record will be a TXT verification record to ensure that you have permission to create an SSL
  certificate for said domain. This record will conflict with any existing A/AAAA or CNAME records on the hostname and
  require them to be removed before adding the verification record.

Once these records have been added, please let DevCycle know.

3. **Additional Setup Step** Once validation is complete and DevCycle has confirmed the records are set properly, there
   may be an extra step involved here with DevCycle depending on your SDK configuration. DevCycle will let you know if
   this is needed.

4. **Creating a CNAME** Once all steps are complete, DevCycle will send the details for the DNS CNAME. Once added, the
   service will be immediately available at the given hostname.

#### SDK Implementation

Once you have completed the above setup to create a CNAME, proceed in modifying your existing SDK initialization to
include the `apiProxyURL` initialization option.

**JS SDK Initialization Update**

Add the `apiProxyURL` option and your CNAME domains as per the
[JS SDK Initialization Options](https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-gettingstarted#initialization-options).

```javascript
const devcycleClient = initializeDevCycle("<DVC_CLIENT_SDK_KEY>", user, {
  apiProxyURL: "https://api-alias.your-domain.com",
});
```

**iOS SDK Initialization Update**

Add the `apiProxyURL` option and your CNAME domains as per the
[iOS SDK DevCycle Options Builder](https://docs.devcycle.com/sdk/client-side-sdks/ios/ios-gettingstarted#devcycleoptions-builder).

```swift
let options = DevCycleOptions.builder().apiProxyURL("https://api-alias.your-domain.com").build()
let client =  try? DevCycleClient.builder()
            .sdkKey("<DEVCYCLE_SDK_KEY>")
            .user(user!)
            .options(options)
            .build(onInitialized: nil)
```

After completing the steps above, users should be able to freely maneuver around AdBlockers and prevent them from
blocking requests to our API servers and our SDK.

If you have any questions regarding this process, please reach out to our [support](mailto:support@devcycle.com) team.

## Reset User

This article serves to explain how to use the SDKs to quickly reset the user context on Client-Side SDKs.

#### Identifying a User or Setting Properties

Currently, the Identify function is only available on Client-Side SDKs. These SDKs are built to work in a single-user
context on the device. The DevCycle Client-Side SDKs contain local storage of the current user's information for re-use
with each function call. Using the Identify function will add to this storage. Using this function will completely reset
the current user in context.

## Realtime Updates

This article serves to explain how the SDKs handle realtime updates triggered by changes to your features from the
DevCycle dashboard.

DevCycle leverages Server-Sent Events (SSE) to notify the SDKs that their config has changed and that they should fetch
a new config. When a change to a feature (targeting rules, variable values, etc.) has been saved, our servers send an
SSE to anyone subscribed to that project and trigger the SDK to request a new config from DevCycle.

#### Client-Side SDK

A connection URL is included in the config that the SDK fetches, triggering the SDK to open a connection with our SSE
provider listening for any changes from the dashboard.

The following Client-Side SDKs currently have Realtime Updates:

- Javascript SDK
- React SDK
- iOS SDK
- Android SDK
- Flutter SDK

##### **Javascript SDK**, **React SDK**

If the user loses focus on the webpage for longer then the `inactivityDelay` (the default of which is set to 2 minutes,
and can be configured through the options), the SDK will disconnect from the SSE provider and will reconnect when the
user opens the tab / window again (i.e. the page's visibility state = `visible`). The SDK will also request a new
configuration during reconnection to receive any updates it may have missed while the realtime connection was closed.

##### **iOS SDK**, **Android SDK** & **Flutter SDK**

If the user backgrounds the application for some period of time, the SDK will disconnect from the SSE provider and will
reconnect again when the user brings the application to the foreground. When the application is brought to the
foreground the SDK will request a new configuration to receive any updates it may have missed while the realtime
connection was closed.
