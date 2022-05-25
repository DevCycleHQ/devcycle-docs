---
title: Resetting a user
sidebar_position: 5
---

## Overview

This article serves to explain how to use the SDKs to quickly reset the user context on Client-Side SDKs.

### Identifying a User or Setting Properties

Currently, the Identify function is only available on Client-Side SDKs. These SDKs are built to work in a single-user context on the device. The DevCycle Client-Side SDKs contain a local storage of the current user's information for re-use with each function call. Using the Identify function will add to this storage. Using this function will completely reset the current user in context. 

### Client-Side SDK Usage

### **JavaScript SDK**

To reset the user into an anonymous user, `resetUser` will reset to the anonymous user created before or will create one with an anonymous `user_id`.

```js
dvcClient.resetUser()
```

To wait on the Features of the anonymous user, you can pass in a callback or use the Promise returned if no callback is passed in:

```js
const variableSet = await dvcClient.resetUser()

// OR

dvcClient.resetUser((err, variables) => {
    // variables is the variable set for the anonymous user
})
```

### **React SDK**

Refer to [JavaScript SDK](#javascript-sdk)

### **iOS SDK**

To reset the user into an anonymous user, `resetUser` will reset to the anonymous user created before
or will create one with an anonymous `user_id`.

```swift
dvcClient.resetUser()
```

To wait on the Features of the anonymous user, you can pass in a DVCCallback:

```swift
try dvcClient.resetUser { error, variables in
    // anonymous user
}
```

### **Android SDK**

To reset the user into an anonymous user, `resetUser` will reset to the anonymous user created before
or will create one with an anonymous `user_id`.

```kotlin
dvcClient.resetUser()
```

To wait on the Features of the anonymous user, you can pass in a DVCCallback:

```kotlin
dvcClient.resetUser(object : DVCCallback<Map<String, Variable<Any>>> {
    override fun onSuccess(result: Map<String, Variable<Any>>) {
        // anonymous user configuration loaded successfully from DevCycle
    }

    override fun onError(t: Throwable) {
        // user configuration failed to load from DevCycle, existing user's data will persist.
    }
})
```