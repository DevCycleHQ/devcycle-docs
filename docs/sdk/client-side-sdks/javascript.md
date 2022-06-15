---
title: JavaScript SDK
sidebar_position: 2
---

# DevCycle Javascript Client SDK

The JS Client SDK for DevCycle! This SDK uses local bucketing to perform all user segmentation and bucketing locally in the SDK, 
providing immediate responses to variable and feature requests for a user. 

The SDK will download the latest version of your DevCycle environments configuration from a CDN on initialization.

## Installation

Our library can be found on npm and installed by the following:

```bash
npm install --save @devcycle/devcycle-js-sdk
```

To use in your project, import the `initialize` function:

```js
import { initialize } from '@devcycle/devcycle-js-sdk'
```

## Getting Started

Call `initialize` with your client key and a user object. The user object needs either a `user_id`, or `isAnonymous` set to `true` for an anonymous user. 

```javascript
const user = { user_id: 'my_user' }
const dvcClient = initialize('YOUR_CLIENT_KEY', user)
```

## Waiting for Features 

You can wait on the features to be loaded from our servers by using `.onClientInitialized()` function. It returns a promise that you can use to wait until features are ready to be used:

```javascript
dvcClient.onClientInitialized().then(() => {
    const featureToggle = dvcClient.variable('YOUR_VARIABLE_KEY', false)
    if (featureToggle) {
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
    if (featureToggle) {
        ...
    } else {
        ...
    }
})
```

## Grabbing Variable Values

To get values from your Features, `.variable` is used to fetch variable values using the identifier `key` coupled with a default value. The default value can be of type string, boolean, number, or object.

```javascript
const variable = dvcClient.variable('YOUR_VARIABLE_KEY', 'default value')
```

To grab the value, there is a property on the object returned to grab the value: 

```javascript
const value = variable.value
```

If the value is not ready, it will return the default value passed in the creation of the variable. To get notified when the variable is loaded: 

```javascript
variable.onUpdate((value) => {
    // value returned when the value of the variable changes
})
```

See [getVariableByKey](https://docs.devcycle.com/bucketing-api/#operation/getVariableByKey) on the Bucketing API for the variable response format.

## Identifying User

To identify a different user, or the same user passed into the initialize with more attributes, pass in the entire user attribute object into `identifyUser`:

```javascript
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

```javascript
const variableSet = await dvcClient.identifyUser(user)

// OR

dvcClient.identifyUser(user, (err, variables) => {
    // variables is the variable set for the identified user
})
```

## Reset User

To reset the user into an anonymous user, `resetUser` will reset to the anonymous user created before or will create one with an anonymous `user_id`.

```javascript
dvcClient.resetUser()
```

To wait on the Features of the anonymous user, you can pass in a callback or use the Promise returned if no callback is passed in:

```javascript
const variableSet = await client.resetUser()

// OR

dvcClient.resetUser((err, variables) => {
    // variables is the variable set for the anonymous user
})
```

## Grabbing All Features / Variables

To grab all the Features or Variables returned in the config:

```javascript
const features = client.allFeatures()
const variables = client.allVariables()
```

If the SDK has not finished initializing, these methods will return an empty object.

See [getVariables](https://docs.devcycle.com/bucketing-api/#operation/getVariables) and [getFeatures](https://docs.devcycle.com/bucketing-api/#operation/getFeatures) on the Bucketing API for the response formats.


## Tracking Events

To track events, pass in an object with at least a `type` key:

```javascript
const event = {
    type: 'my_event_type', // this is required
    date: new Date(),
    target: 'my_target',
    value: 5,
    metaData: {
        key: 'value'
    }
}
dvcClient.track(event)
```

The SDK will flush events every 10s or `flushEventsMS` specified in the options. To manually flush events, call:

```javascript
await dvcClient.flushEvents()

// or 

dvcClient.flushEvents(() => {
    // called back after flushed events
})
```

## EdgeDB

EdgeDB allows you to save user data to our EdgeDB storage so that you don't have to pass in all the user data every time you identify a user. 

To get started, contact us at support@devcycle.com to enable EdgeDB for your project.

Once you have EdgeDB enabled in your project, pass in the `enableEdgeDB` option to turn on EdgeDB mode for the SDK:

```javascript
const user = { 
    user_id: 'my_user',
    customData: {
        amountSpent: 50
    }
}
const options = {
    enableEdgeDB: true
}
const dvcClient = initialize('YOUR_CLIENT_KEY', user, options)
```

This will send a request to our EdgeDB API to save the custom data under the user `my_user`.

In the example, `amountSpent` is associated to the user `my_user`. In your next `identify` call for the same `user_id`, 
you may omit any of the data you've sent already as it will be pulled from the EdgeDB storage when segmenting to experiments and features:

```
dvcClient.identifyUser({ user_id: 'my_user' }) // no need to pass in "amountSpent" any more!
```
