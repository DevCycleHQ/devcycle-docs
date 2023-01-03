---
title: Identifying Users & Setting Properties
sidebar_position: 4
---

## Overview

This article serves to explain how to use the SDKs to identify users and apply properties for use within [Targeting Rules](/docs/home/feature-management/features-and-variables/targeting-users)

## Identifying a User or Setting Properties

The Client-Side SDKs and Server-Side SDKs function slightly differently. This documentation will cover all of the information needed to set user data and custom properties on both types of SDKs.

The documentation will also cover the differences between regular data and private data.

Regardless of the SDK type or the type of custom data you are looking to use, the general format of user data remains largely the same. 

The user data object that you should use across SDKs should look something like this:

```json
{
    "user_id": "user1@devcycle.com",
    "name": "user 1 name",
    "customData": {
        "customKey": "customValue"?
    },
    "privateCustomData": {
        "privateKey": "privateValue"
    }
}
```

### Anonymous Users

:::info

If a user id is not supplied, client-side SDKs will automatically generate a user id and assign it to the current user. This id will be cached and used between app opens / website visits until a user id is supplied or [reset](/docs/sdk/features/reset) is called. This will ensure you will not experience a rise in MAUs if the main experience of your application is in a logged-out or anonymous state. 

:::

:::tip

In some cases, you may be releasing a feature broadly and not to users, specifically. In these cases, you can use any string as the "user_id". A user is not expressly required, just an identifier. 

:::

### Custom Data vs. Private Custom Data

When setting custom properties you have a choice between keeping that data completely private or allowing for the data to be logged back to DevCycle's events database. Both options allow for the same targeting capabilities, but you should use Private Custom Data if you are looking to avoid having user data saved to any external system.

With Private Custom Data, data is just used solely for evaluating decisions with DevCycle's Edge Workers, it is then discarded and no record is saved anywhere. 

With regular Custom Data, the data used for evaluation purposes is logged back to DevCycle's events database where it can be used for debugging purposes or providing guidance on evaluation reasons. 


:::info

**EdgeDB Usage:** Given Private Custom Data is not written to any DevCycle systems it cannot be used with EdgeDB, as EdgeDB by its nature saves Custom Data to an Edge Database for flag evaluations.

:::

## Client-Side SDK Usage

The Identify function is what is used on the Client-Side SDKs to set User IDs as well as custom properties. These SDKs are built to work in a single-user context on the device. The DevCycle Client-Side SDKs contain local storage of the current user's information for re-use with each function call. Using the Identify function will add to this storage.

Any call to the Identify function will return the list of relevant Features and Variables for the User. 

If your application handles multiple users at once, simply call the Identify function with their new user object and DevCycle will retrieve that user's set of Features and Variables.

To reset a user completely, please view [Resetting a User](/docs/sdk/features/reset).


### Javascript SDK

[View the Javascript Documentation for detailed info on identifying users/contexts ](/docs/sdk/client-side-sdks/javascript#identifying-user) ➡️

### React SDK

[View the React Documentation for detailed info identifying users/contexts ](/docs/sdk/client-side-sdks/react#identifying-users) ➡️

### iOS SDK

[View the iOS Documentation for detailed info identifying users/contexts ](/docs/sdk/client-side-sdks/ios#identifying-user) ➡️

### Android SDK

[View the Android Documentation for detailed info identifying users/contexts ](/docs/sdk/client-side-sdks/android#identifying-user) ➡️

## Server-Side SDK Usage

Unlike the Client-Side SDKs, Server-Side SDKs work in a multi-user context. Because of this, a single Identify function does not make sense. Instead, you must create a User object that is passed into each function call with the relevant user data given the current application context.

As well, unlike the Client-Side SDKs, because Server-Side SDKs poll for project configuration updates, updating the User object that you have set will not explicitly grab new feature configurations. The User object once set can be used to get feature, variation and variable information for a given user or entity.

### Node SDK

[View the NodeJS Documentation for detailed info identifying users/contexts ](/docs/sdk/client-side-sdks/node#user-object) ➡️

### C# / .NET Local SDK

[View the .NET Local Documentation for detailed info identifying users/contexts ](/docs/sdk/server-side-sdks/dotnet-local#user-object) ➡️

### C# / .NET Cloud SDK

[View the .NET Cloud Documentation for detailed info identifying users/contexts ](/docs/sdk/server-side-sdks/dotnet-cloud#user-object) ➡️

### Go SDK

[View the Go Documentation for detailed info identifying users/contexts ](/docs/sdk/server-side-sdks/go#user-object) ➡️

### Python SDK

[View the Python Documentation for detailed info identifying users/contexts ](/docs/sdk/server-side-sdks/python#user-object) ➡️

### Ruby SDK

[View the Ruby Documentation for detailed info identifying users/contexts ](/docs/sdk/server-side-sdks/ruby#user-object) ➡️

### PHP SDK

[View the PHP Documentation for detailed info identifying users/contexts ](/docs/sdk/server-side-sdks/php#user-object) ➡️

### Java Local SDK

[View the Java Local Documentation for detailed info identifying users/contexts ](/docs/sdk/server-side-sdks/java-local#user-object) ➡️

### Java Cloud SDK

[View the Java Local Documentation for detailed info identifying users/contexts ](/docs/sdk/server-side-sdks/java-cloud#user-object) ➡️


