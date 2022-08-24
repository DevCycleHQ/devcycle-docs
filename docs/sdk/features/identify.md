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

:::info

In some cases, you may be releasing a feature broadly and not to users, specifically. In these cases, you can use any string as the "user_id". A user is not expressly required, just an identifier. 

:::

### Client-Side SDK Usage

The Identify function is what is used on the Client-Side SDKs to set User IDs as well as custom properties. These SDKs are built to work in a single-user context on the device. The DevCycle Client-Side SDKs contain a local storage of the current user's information for re-use with each function call. Using the Identify function will add to this storage.

Any call to the Identify function will return the list of relevant Features and Variables for the User. 

If your application handles multiple users at once, simply call the Identify function with their new user object and DevCycle will retrieve that users's set of Features and Variables.

To reset a user completely, please view [Resetting a User](/docs/sdk/features/reset).


### **JavaScript SDK**

To identify a different user, or the same user passed into the initialize with more properties, pass in the entire user properties object into `identifyUser`:

```js
const user = {
    user_id: 'user1',
    name: 'user 1 name',
    customData: {
        customKey: 'customValue'
    }
}
dvcClient.identifyUser(user)
```

To wait on Variables that will be returned from the identify call, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await dvcClient.identifyUser(user)

// OR

dvcClient.identifyUser(user, (err, variables) => {
    // variables is the variable set for the identified user
})
```

### **React SDK**

Similar to the Javascript SDK, you can call the `identifyUser` method on the client object obtained from using the `useDVCClient` hook:

```js
import { useDVCClient } from '@devcycle/devcycle-react-sdk'

const user = {
  user_id: 'user1',
  name: 'user 1 name',
  customData: {
    customKey: 'customValue'
  }
}
const client = useDVCClient()
client.identifyUser(user)
```

### **iOS SDK**

To identify a different user, or the same user passed into the initialize method with more properties,
build a DVCUser object and pass it into `identifyUser`:

```swift
let user = try DVCUser.builder()
                    .userId("my-user1")
                    .email("my-email@email.com")
                    .appBuild(1005)
                    .appVersion("1.1.1")
                    .country("CA")
                    .name("My Name")
                    .language("EN")
                    .customData([
                        "customkey": "customValue"
                    ])
                    .privateCustomData([
                        "customkey2": "customValue2"
                    ])
                    .build()
dvcClient.identifyUser(user)
```

To wait on Variables that will be returned from the identify call, you can pass in a DVCCallback:

```swift
try dvcClient.identifyUser(user) { error, variables in
    if (error != nil) {
        // error identifying user
    } else {
        // use variables 
    }
}
```

If `error` exists the called the user's configuration will not be updated and previous user's data will persist.

### **Android SDK**

To identify a different user, or the same user passed into the initialize method with more properties,
build a DVCUser object and pass it into `identifyUser`:

```kotlin
var user = DVCUser.builder()
                .withUserId("test_user")
                .withEmail("test_user@devcycle.com")
                .withCustomData(mapOf("custom_key" to "value"))
                .build()
dvcClient.identifyUser(user)
```

To wait on Variables that will be returned from the identify call, you can pass in a DVCCallback:

```kotlin
dvcClient.identifyUser(user, object: DVCCallback<Map<String, Variable<Any>>> {
    override fun onSuccess(result: Map<String, Variable<Any>>) {
         // new user configuration loaded successfully from DevCycle
    }

    override fun onError(t: Throwable) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```

### Server-Side SDK Usage

Unlike the Client-Side SDKs, Server-Side SDKs work in a multi-user context. Because of this a single Identify function does not make sense. Instead you must create a User object that is passed in to each function call with the relevant user data given the current application context.

As well, unlike the Client-Side SDKs, because Server-Side SDKs poll for project configuration updates, updating the User object that you have set will not explicitly grab new feature configurations. The User object once set can be used to get feature, variation and variable information for a given user or entity.

### Node SDK

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

### C# SDK

The full user data must be passed into every method. The only required field is the `user_id`. 
The rest are optional and are used by the system for user segmentation into variables and features.

See the User class in [.NET User model doc](https://github.com/DevCycleHQ/dotnet-server-sdk/blob/main/docs/User.md) for all accepted fields.

```csharp
User user = new User("a_user_id");
```

## Custom Data vs. Private Custom Data

When setting custom properties you have a choice between keeping that data completely private or allowing for the data to be logged back to DevCycle's events database. Both options allow for the same targeting capabilities, but you should use Private Custom Data if you are looking to avoid having user data saved to any external system.

With Private Custom Data, data is just used solely for evaluating decisions with DevCycle's Edge Workers, it is then discarded and no record is saved anywhere. 

With regular Custom Data, the data used for evaluation purposes is logged back to DevCycle's events database where it can be used for debugging purposes or providing guidance on evaluation reasons. 


:::info

**EdgeDB Usage:** Given Private Custom Data is not written to any DevCycle systems it cannot be used with EdgeDB, as EdgeDB by its nature saves Custom Data to an Edge Database for flag evaluations.

:::

