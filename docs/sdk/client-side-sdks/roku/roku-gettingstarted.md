---
title: Roku SDK Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Initializing the SDK
sidebar_custom_props: { icon: material-symbols:rocket }
---

[![GitHub](https://img.shields.io/github/stars/devcyclehq/roku-client-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/roku-client-sdk)

[//]: # (wizard-initialize-start)

## Initializing the SDK

We recommend initializing the SDK once and passing around the client instance around in your app.
Initialize the DevCycle SDK by providing the DevCycle User, DevCycle mobile SDK key and any other start options along with the relevant TaskNode as defined in the `MainScene.xml`:

```xml
<!-- Within your MainScene.xml -->
<?xml version="1.0" encoding="utf-8" ?>
<component name="MainScene" extends="Scene">
    <script type="text/brightscript" uri="MainScene.brs" />
    <script
        type="text/brightscript"
        uri="pkg:/components/DevCycle/DevCycleSGClient.brs"
    />
    <children>
        <DevCycleTask id="devCycleTask" />
        <!-- Other Child Nodes / Elements -->
    </children>
</component>
```

```javascript
// Within your MainScene.brs
sub init()
    ...
    m.devCycleTask = m.top.findNode('devCycleTask')

    sdkKey = '<DEVCYCLE_MOBILE_SDK_KEY>'
    options = {
        enableEdgeDB: true,
    }
    user = {
        user_id: 'my_user_id',
    }

    InitializeDevCycleClient(sdkKey, user, options, m.devCycleTask)
    m.devcycleClient = DevCycleSGClient(m.devCycleTask)
    ...
end sub
```

[//]: # (wizard-initialize-end)

The user object may specify a unqiue `user_id` for a given User. If the `user_id` is not specified, the User is considered to be anonymous and we will utilize the Device ID as a unique identifier.

## DevCycle Client

The DevCycleClient can be built using the following methods:

[DevCycle Client](https://github.com/DevCycleHQ/roku-client-sdk/blob/main/components/DevCycle/DevCycleClient.brs#L3)

| Method  | Parameter                                                                                                          | Description             |
| ------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| sdkKey  | String                                                                                                             | DevCycle SDK Key        |
| user    | [DevCycleUser](https://github.com/DevCycleHQ/roku-client-sdk/blob/main/components/DevCycle/DevCycleUser.brs)       | DevCycle User object    |
| options | [DevCycleOptions](https://github.com/DevCycleHQ/roku-client-sdk/blob/main/components/DevCycle/DevCycleOptions.brs) | DevCycle Options object |

## DevCycle User Object

The DevCycleUser can be built using the following methods [DevCycleUser](https://github.com/DevCycleHQ/roku-client-sdk/blob/main/components/DevCycle/DevCycleUser.brs). Passing an empty string for the `user_id` will result in a thrown error. In order to create an anonymous user, omit passing a `user_id`.

| Method            | Parameter | Description                                                                                                     |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| user_id           | String    | Unique user ID                                                                                                  |
| name              | String    | User's name                                                                                                     |
| email             | String    | User's email                                                                                                    |
| country           | String    | User's country                                                                                                  |
| customData        | JSON      | Key/value map of properties to be used for targeting.                                                           |
| privateCustomData | JSON      | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

## DevCycle Options

The SDK exposes various initialization options which can be used by passing a `DevCycleOptions` object to the `options` parameter of `InitializeDevCycleClient` method:

[DevCycle Options](https://github.com/DevCycleHQ-Labs/roku-client-sdk/blob/main/components/DevCycle/DevCycleOptions.brs)

| Method                       | Parameter | Default | Description                                                                                                    |
| ---------------------------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| flushEventsIntervalMs        | Int       | 10000   | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| enableEdgeDB                 | Boolean   | false   | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| disableAutomaticEventLogging | Boolean   | false   | Disables logging of sdk generated events (e.g. variableEvaluated, variableDefaulted) to DevCycle.              |
| disableCustomEventLogging    | Boolean   | false   | Disables logging of custom events, from `track()` method, and user data to DevCycle.                           |
| apiProxyURL                  | String    | invalid | Allows the SDK to communicate with a proxy of DevCycle Client SDK API.                                         |
| eventsApiProxyURL            | String    | invalid | Allows the SDK to communicate with a proxy of DevCycle Events API.                                             |
