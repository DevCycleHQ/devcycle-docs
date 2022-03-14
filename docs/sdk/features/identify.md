---
title: Identifying Users & Setting Properties
sidebar_position: 4
---

## Overview

This article serves to explain how to use the SDKs to identify users and apply properties for use within [Targeting Rules](/docs/home/feature-management/features-and-variables/targeting-users)

### Identifying a User or Setting Properties

Currently, the Identify function is only available on Client-Side SDKs. These SDKs are built to work in a single-user context on the device. The DevCycle Client-Side SDKs contain a local storage of the current user's information for re-use with each function call. Using the Identify function will add to this storage.

Any call to the Identify function will return the list of relevant Features and Variables for the User. 

If your application handles multiple users at once, simply call the Identify function with their new user object and DevCycle will retrieve that users's set of Features and Variables.

To reset a user completely, please view [Resetting a User](/docs/sdk/features/reset).


### Client-Side SDK Usage

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
client.identifyUser(user)
```

To wait on Variables that will be returned from the identify call, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await client.identifyUser(user)

// OR

client.identifyUser(user, (err, variables) => {
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
client.identifyUser(user)
```

To wait on Variables that will be returned from the identify call, you can pass in a DVCCallback:

```swift
try client.identifyUser(user) { error, variables in
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