---
title: Initialization
sidebar_position: 8
---

## Overview

This section will cover how to initialize each SDK as well as explain their starting options. 

## Client-Side SDKs

### Caching of Configurations

When initialized, each client-side SDK will cache the retrieved configuration for the user. 

This cache will be used in scenarios where on subsequent initializations a new configuration is not available. This may be due to a lack of internet connection or a lack of connection to DevCycle.

Additionally, if the SDK is interacted with before any initialization (such as attempting to read a variable far early on in an application before initialization), the cached value will be read.

If a variable is first read from the cache and has a listener for [realtime updates](/docs/sdk/features/realtime-updates), if a new value is retrieved after initialization, the `onUpdate` function will be triggered.

## [Android SDK](/docs/sdk/client-side-sdks/android)

We recommend initializing the SDK once in `onCreate` of your `Application` class or `MainActivity` to receive features as soon as possible, and to pass around the client instance around in your app.

Using the builder pattern we can initialize the DevCycle SDK by providing the `applicationContext`,
DVCUser, and DevCycle mobile environment key:

### *Kotlin example:*

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {

    ...

    val dvcClient: DVCClient = DVCClient.builder()
        .withContext(applicationContext)
        .withUser(
            DVCUser.builder()
                .withUserId("test_user")
                .build()
        )
        .withEnvironmentKey("<DEVCYCLE_MOBILE_ENVIRONMENT_KEY>")
        .build()
    
    ...
}
    //NOTE: It is not recommended to hardcode SDK keys into your application.
    //Consider storing keys securely and reading from secure storage.

```

### *Java example:*

```java
@Override
protected void onCreate(Bundle savedInstanceState) {

    ...

    DVCClient dvcClient = DVCClient.builder()
        .withContext(getApplicationContext())
        .withUser(
            DVCUser.builder()
                .withUserId("test_user")
                .build()
            )
        .withEnvironmentKey("<DEVCYCLE_MOBILE_ENVIRONMENT_KEY>")
        .build();
    
    ...
}
    //NOTE: It is not recommended to hardcode SDK keys into your application.
    //Consider storing keys securely and reading from secure storage.
```

#### DVC Client Builder

The DVCClient can be built using the following methods:

[DVCClientBuilder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCClient.kt#L459)

| Method | Parameter | Description |
|--------|-----------|-------------|
| withContext | Context | App context |
| withEnvironmentKey | String | DevCycle environment key |
| withUser | [DVCUser](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/model/DVCUser.kt#L6) | DevCycle user object |
| withOptions | [DVCOptions](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCOptions.kt#L3) | DevCycle options object |
| withLogger | Timber.Tree | Logger override to replace default logger |
| withLogLevel | [LogLevel](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/util/LogLevel.kt#L5) | Set log level of the default logger. Defaults to `LogLevel.ERROR`|

#### DVC User Builder
The DVC user can be built using the following methods:

[DVCUser Builder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/model/DVCUser.kt#L15)

| Method | Parameter | Description |
|--------|-----------|-------------|
| withUserId | String | Unique user ID |
| withIsAnonymous | Boolean | Boolean to indicate if the user is anonymous |
| withEmail | String | User's email |
| withName | String | User's name |
| withCountry | String | User's country |
| withCustomData | Map<String, Any> | Key/value map of properties to be used for targeting |
| withPrivateCustomData | Map<String, Any> | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

#### DVC Options Builder
The SDK exposes various initialization options which can be used by passing a `DVCOptions` object to the `withOptions` method of `DVCClient.builder()`:

[DVCOptions builder class](https://github.com/DevCycleHQ/android-client-sdk/blob/main/android-client-sdk/src/main/java/com/devcycle/sdk/android/api/DVCOptions.kt#L11)

| Method | Parameter | Default | Description |
|--------|-----------|---------|-------------|
| flushEventsIntervalMs | Long | 10000 | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| disableEventLogging | Boolean | false | Disables logging of SDK generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle. |  
| enableEdgeDB | Boolean | false | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. |
| configCacheTTL | Long | 604800000 | The maximum allowed age of a cached config in milliseconds, defaults to 7 days |
| disableConfigCache | Boolean | false | Disable the use of cached configs |

#### Notifying when DevCycle features are available

You can attach a callback on the client to determine when your features have been loaded:

#### Kotlin

```kotlin
dvcClient.onInitialized(object : DVCCallback<String> {
    override fun onSuccess(result: String) {
        // successfully initialized
    }

    override fun onError(t: Throwable) {
        // there was an error 
    }
})
```

#### Java

```java
dvcClient.onInitialized(new DVCCallback<String>() {
    @Override
    public void onSuccess(String result) {
        // user configuration loaded successfully from DevCycle
    }

    @Override
    public void onError(@NonNull Throwable t) {
        // user configuration failed to load from DevCycle, default values will be used for Variables.
    }
});
```

## [iOS SDK](/docs/sdk/client-side-sdks/ios)

We recommend initializing the SDK once in `didFinishLaunchingWithOptions` of your `AppDelegate` to receive features for as soon as possible, and to pass around the client instance around in your app.

### Swift
Using the builder pattern we can initialize the DevCycle SDK by providing the DVCUser and DevCycle mobile environment key:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    ...

    let user = try DVCUser.builder()
                        .userId("my-user1")
                        .build()

    guard let dvcClient = try DVCClient.builder()
            .environmentKey("<DEVCYCLE_MOBILE_ENVIRONMENT_KEY>")
            .user(user)
            .build(onInitialized: nil)
    self.dvcClient = dvcClient
    
    ...

    return true
}
```

The user object needs either a `user_id`, or `isAnonymous` set to `true` for an anonymous user. 

### Objective-C
For Objective-C we use a standard callback pattern to initialize the DevCycle SDK by providing the DVCUser and DevCycle mobile environment key:

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    ...

    DVCUser *user = [DVCUser initializeWithUserId:@"my-user1"];

    self.dvcClient = [DVCClient initialize:@"<DEVCYCLE_MOBILE_ENVIRONMENT_KEY>"
                                user:user
                            options:nil
                        onInitialized:^(NSError * _Nullable error) {
        if (error) {
            NSLog(@"DevCycle failed to initialize: %@", error);
        }
    }];

    ...

    return YES;
}
```

#### DVC Client Builder

The DVCClient can be built using the following methods:

[DVC ClientBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/4c69260ce89fd7c38245f48b99aa973e08ba05ca/DevCycle/DVCClient.swift#L371)

| Method | Parameter | Description |
|--------|-----------|-------------|
| environmentKey | String | DevCycle environment key |
| user | [DVCUser](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/DVCUser.swift#L116) | DevCycle user object |
| options | [DVCOptions](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/Models/DVCOptions.swift#L9) | DevCycle options object |

#### DVC User Builder
The DVC user can be built using the following methods:

[DVC UserBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/DVCUser.swift#L21)

| Method | Parameter | Description |
|--------|-----------|-------------|
| userId | String | Unique user ID |
| isAnonymous | Bool | Boolean to indicate if the user is anonymous |
| email | String | User's email |
| name | String | User's name |
| language | String | User's language |
| country | String | User's country |
| customData | [String: Any] | Key/value map of properties to be used for targeting |
| privateCustomData | [String: Any] | Key/value map of properties to be used for targeting. Private properties will not be included in event logging. |

#### DVC Options Builder
The SDK exposes various initialization options which can be used by passing a `DVCOptions` object to the `withOptions` method of `DVCClient.builder()`:

[DVC OptionsBuilder class](https://github.com/DevCycleHQ/ios-client-sdk/blob/main/DevCycle/Models/DVCOptions.swift#L17)

| Method | Parameter | Default | Description |
|--------|-----------|---------|-------------|
| flushEventsIntervalMs | Int | 10000 | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| disableEventLogging | Bool | false | Disables logging of SDK generated events (e.g. aggVariableEvaluated, aggVariableDefaulted) to DevCycle. |
| logLevel | LogLevel | error | Set log level of the default logger. Defaults to `error`|
| enableEdgeDB | Boolean | false | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. |
| configCacheTTL | Int | 604800000 | The maximum allowed age of a cached config in milliseconds, defaults to 7 days |
| disableConfigCache | Bool | false | Disable the use of cached configs |

#### Notifying when DevCycle features are available

In the initialize call there is an optional `onInitialized` parameter you can use to determine when your features have been loaded:

#### Swift

```swift
self.dvcClient = try? DVCClient.builder()
        .environmentKey("<DEVCYCLE_MOBILE_ENVIRONMENT_KEY>")
        .user(user)
        .options(options)
        .build(onInitialized: { error in
            if (error != nil) {
                // there was an error with building the client
            } else {
                // initialized successfully
            }
        })
```

#### Objective-C

```objc
self.dvcClient = [DVCClient initialize:@"<DEVCYCLE_MOBILE_ENVIRONMENT_KEY>"
                               user:user
                            options:nil
                      onInitialized:^(NSError * _Nullable error) {
    if (error) {
        NSLog(@"DevCycle failed to initialize: %@", error);
    } else {
        // initialized successfully
    }
}];
```

## [Javascript SDK](/docs/sdk/client-side-sdks/javascript)

### 1. NPM Module

The recommended way to include the JS SDK is by bundling it with the rest of your application code using our NPM Module.

The JS SDK library can be found on NPM. To get started, install the JS SDK using NPM:

```bash
npm install --save @devcycle/devcycle-js-sdk
```

To use the JS SDK in your project, import the `initialize` function:

```js
import { initialize } from "@devcycle/devcycle-js-sdk";
```

### 2. Using the CDN

If you want to load the JS SDK on your webpage separately from your main application bundle, you can use a script tag to do so.

Place the following code snippet as high as possible in your head tag.

```html
<script
  src="https://js.devcycle.com/devcycle.min.js"
  type="text/javascript"
></script>
```

- If the JS SDK is installed using NPM, call `initialize` with your client key, a user object, and an optional options object.
- Otherwise, If you’re using the CDN to install the JS SDK, call `DevCycle.initialize` with your client key, a user object, and an optional options object.

The user object needs either a `user_id`, or `isAnonymous` set to `true` for an anonymous user. The options object is optional, but can passed a `logWriter` for a custom logging solution and a `logLevel`, which must be one of `info`, `debug`, `warn` or `error`. The default options are to set the `logWriter` to be the console and the `logLevel` to `error`.

```javascript
const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
const dvcClient = initialize("YOUR_CLIENT_KEY", user, dvcOptions); // replace initialize with DevCycle.initialize if using the CDN
```

#### DVC User Object

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

#### Initialization Options

The SDK exposes various initialization options which can be set on the `initialization()` method:

[DVCOptions Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44)

| DVC Option           | Type                                                                                                     | Description                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| eventFlushIntervalMS | number                                                                                                   | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| enableEdgeDB         | boolean                                                                                                  | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle.                                     |
| logger               | [DVCLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2)           | Logger override to replace default logger                                                                      |
| logLevel             | [DVCDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`.        |
| apiProxyURL          | string                                                                                                   | Allows the SDK to communicate with a proxy of DVC bucketing API / client SDK API.                              |
=======

#### Waiting for Features

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

## [React SDK](/docs/sdk/client-side-sdks/React)

There are two ways to initialize the SDK:
* Non-Blocking: This loads your application and requests to initialize the SDK in the background. Once this request is complete,
  your application will be ready to use the SDK.
* Blocking: This allows you to delay the rendering of your application until the request to initialize the SDK is completed.

To use these providers, you must grab the Environment Key from the DevCycle Dashboard.
You can optionally pass in a user object to the provider to initialize the SDK.
If you do not pass in a user to the provider, it will create an anonymous user and initialize the SDK with it.
You can then call the `identifyUser` method on the client once the user has been authenticated.
See [Identifying Users & Setting Properties](/docs/sdk/features/identify) for more details.

### Non-Blocking

The withDVCProvider higher-order component (HOC) initializes the React SDK and wraps your root component. This provider may cause your app
to flicker when it is first rendered, as it is waiting for the SDK to initialize.

```js
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
export default withDVCProvider({ envKey: 'CLIENT-SDK-KEY-FOR-ENV' })(App)
```

### Blocking

The `useIsDVCInitialized` hook allows you to block the rendering of your application until SDK initialization is complete. This ensures your app does not flicker due to value changes and enables you to control what you want to be displayed when initialization isn't finished yet.

```js
import { useIsDVCInitialized, withDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
function App() {
    const dvcReady = useIsDVCInitialized()
    
    if (!dvcReady) return <LoadingState/>
    return <TheRestofYourApp/>
}
    
export default withDVCProvider({ envKey: 'CLIENT-SDK-KEY-FOR-ENV' })(App)
```

:::caution

The asyncWithDVCProvider function has been deprecated as of version 1.3.0

:::

The asyncWithDVCProvider function is similar to the withDVCProvider function but allows you to block the rendering of your application until SDK initialization is complete. This ensures your app does not flicker due to value changes.

```js
import { asyncWithDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
(async () => {
    const DVCProvider = await asyncWithDVCProvider({ envKey: 'CLIENT-SDK-KEY-FOR-ENV' })

    ReactDOM.render(
        <DVCProvider>
            <App />
        </DVCProvider>
    )
})();
```

#### Provider Config

The `withDVCProvider` function accepts a Provider Config object:

[DVC ProviderConfig Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/react/src/types.ts#L3)

| Property | Type | Description |
|------------|------|-------------|
| envKey | string | Environment key |
| user | [DVCUser](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L55) | DevCycle user object |
| options | [DVCOptions](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44) | DevCycle options object |

#### Initialization Options

The SDK exposes various initialization options which can be set by passing a `DVCOptions` object in the Provider Config:

[DVCOptions Typescript Schema](https://github.com/DevCycleHQ/js-sdks/blob/main/sdk/js/src/types.ts#L44)

| DVC Option | Type | Description |
|------------|------|-------------|
| eventFlushIntervalMS | number | Controls the interval between flushing events to the DevCycle servers in milliseconds, defaults to 10 seconds. |
| enableEdgeDB | boolean | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. |
| logger | [DVCLogger](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L2) | Logger override to replace default logger |
| logLevel | [DVCDefaultLogLevel](https://github.com/DevCycleHQ/js-sdks/blob/main/lib/shared/types/src/logger.ts#L12) | Set log level of the default logger. Options are: `debug`, `info`, `warn`, `error`. Defaults to `info`. |
| apiProxyURL | string | Allows the SDK to communicate with a proxy of DVC bucketing API / client SDK API. |
| configCacheTTL | number | The maximum allowed age of a cached config in milliseconds, defaults to 7 days |
| disableConfigCache | boolean | Disable the use of cached configs |

## [React Native SDK](/docs/sdk/client-side-sdks/react-native)

1. First install the [DevCycle React SDK](/docs/sdk/client-side-sdks/react)
```shell
npm install --save @devcycle/devcycle-react-sdk
```
2. Add the following packages that are required for React Native functionality as dependencies of your project:
```shell
npm install --save react-native-get-random-values
npm install --save react-native-device-info
npx pod-install
```

The [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values) package provides a polyfill for cryptographic functionality used to generate random IDs.
The [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) package provides information about the current device running the SDK, which is required to correctly apply targeting rules.

3. Import the `react-native-get-random-values` package somewhere in your code (e.g. in the `App.jsx` file). (see example below)
4. Import the `react-native-device-info` package and set `global.DeviceInfo = DeviceInfo`. (see example below)

Example of the above steps:
```javascript
import React from 'react'
import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'

global.DeviceInfo = DeviceInfo
```

5. Wrap your application component tree in either the `withDVCProvider` or `asyncWithDVCProvider` higher-order component (HOC), as explained in the [Getting Started](#getting-started) section.

Pass in the option `reactNative: true` to the HOC to tell the SDK to run in React Native mode.

```jsx
export default withDVCProvider(
{
	envKey: 'ENV_KEY',
	options: {
		reactNative: true
	}
})(App)
```

A complete working example of an `App.jsx` file is below:
```jsx
import React from 'react';
import { View, Text } from "react-native";


import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'

global.DeviceInfo = DeviceInfo
function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Universal React with Expo</Text>
    </View>
  );
}

export default withDVCProvider(
{
    envKey: 'client-xxxxxxxxxxxxxxxxxxx',
    options: {
        reactNative: true
    }
})(App)
```

There are two ways to initialize the SDK:
* Non-Blocking: This loads your application and makes a request to initialize the SDK in the background. Once this request is complete,
  your application will be ready to use the SDK.
* Blocking: This allows you to delay the rendering of your application until the request to initialize the SDK is completed.

To use these providers, you must grab the Environment Key from the DevCycle Dashboard.
You can optionally pass in a user object to the provider to initialize the SDK.
If you do not pass in a user to the provider, it will create an anonymous user and initialize the SDK with it.
You can then call the `identifyUser` method on the client once the user has been authenticated.
See [Identifying Users & Setting Properties](/docs/sdk/features/identify) for more details.

#### Non-Blocking

The withDVCProvider function initializes the React SDK and wraps your root component. This provider may cause your app
to flicker when it is first rendered, as it is waiting for the SDK to initialize.

```js
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
export default withDVCProvider({ envKey: 'ENV_KEY' })(App)
```

#### Blocking

The `useIsDVCInitialized` hook allows you to block the rendering of your application until SDK initialization is complete. This ensures your app 
does not flicker due to value changes and enables you to control what you want to be displayed when initialization isn't finished yet.

```js
import { useIsDVCInitialized, withDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
function App() {
    const dvcReady = useIsDVCInitialized()
    
    if (!dvcReady) return <LoadingState/>
    return <TheRestofYourApp/>
}
    
export default withDVCProvider({ envKey: 'ENV_KEY' })(App)
```

:::caution

The asyncWithDVCProvider function has been deprecated as of version 1.3.0

:::

The asyncWithDVCProvider function is similar to the withDVCProvider function but allows you to block the rendering of your application until SDK initialization is complete. This ensures your app does not flicker due to value changes.

```js
import { asyncWithDVCProvider } from '@devcycle/devcycle-react-sdk'
```
```js
(async () => {
    const DVCProvider = await asyncWithDVCProvider({ envKey: 'ENV_KEY' })

    ReactDOM.render(
        <DVCProvider>
            <App />
        </DVCProvider>
    )
})();
```

## Server-Side SDKs

## [.NET / C# SDK (Cloud)](/docs/sdk/server-side-sdks/dotnet-cloud)

Download the SDK from Nuget - https://www.nuget.org/packages/DevCycle.SDK.Server.Cloud/
and use the namespaces:

```csharp
using DevCycle.SDK.Server.Cloud.Api;
using DevCycle.SDK.Server.Common.Model;
```

### Getting Started

To start, initialize a client using the API key. 

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Cloud.Api;


namespace Example
{
    public class Example
    {
        public void main()
        {
            // using ensures REST Client resources are correctly disposed once no longer required.
            using DVCCloudClient dvcClient = (DVCCloudClient) new DVCCloudClientBuilder()
                .SetEnvironmentKey("YOUR SDK KEY")
                .Build();
        }
    }
}
```

## [.NET / C# SDK (Local)](/docs/sdk/server-side-sdks/dotnet-local)

Download the SDK from Nuget - https://nuget.info/packages/DevCycle.SDK.Server.Local/
and use the namespaces:
```csharp
using DevCycle.SDK.Server.Local.Api;
```
### Getting Started

```csharp
using System;
using System.Diagnostics;
using DevCycle.SDK.Server.Local.Api;

namespace Example
{
    public class Example
    {
        static Main(string[] args)
        {
            DVCLocalClientBuilder apiBuilder = new DVCLocalClientBuilder();
            using DVCLocalClient api = apiBuilder.SetEnvironmentKey("INSERT_SDK_KEY")
                      .Build();
        }
    }
}
```

## [Go SDK](/docs/sdk/server-side-sdks/go)

Initialization of the SDK depends on whether you want to use Cloud or Local bucketing.

Local bucketing requires an extra step to initialize the local bucketing engine _before_ calling the SDK and is the default 
mode for the SDK.

If not using local bucketing - be sure to disable it via the DVCOptions setting `DisableLocalBucketing`.

```go
package main 

import (
"github.com/devcyclehq/go-server-sdk"
"context"
)

func main() {
    environmentKey := os.Getenv("DVC_SERVER_KEY")
    user := devcycle.UserData{UserId: "test"}
    auth := context.WithValue(context.Background(), devcycle.ContextAPIKey, devcycle.APIKey{
        Key: environmentKey,
    })
    
    dvcOptions := devcycle.DVCOptions{
        EnableEdgeDB:                 false,
        DisableLocalBucketing:        false,
        EventsFlushInterval:          0,
        PollingInterval:              10 * time.Second,
        RequestTimeout:               10 * time.Second,
        DisableAutomaticEventLogging: false,
        DisableCustomEventLogging:    false,
    }
    
    // This step is not needed if using cloud bucketing. Pass nil in place of the pointer to the local bucketing engine.
    lb, err := devcycle.InitializeLocalBucketing(environmentKey, &dvcOptions)
    if err != nil {
        log.Fatal(err)
    }
    
    client, err := devcycle.NewDVCClient(environmentKey, &dvcOptions, lb)
}
```

If using local bucketing, be sure to check the error return from creating a new DVCClient - if the local bucketing engine fails to
initialize for any reason- it'll return as an error here.

## [Java SDK (Cloud)](/docs/sdk/server-side-sdks/java-cloud)

To use the DevCycle Java SDK, initialize a client object. 

```java
import com.devcycle.sdk.server.cloud.api.DVCCloudClient;

public class MyClass {
    
    private DVCCloudClient dvcCloudClient;
    
    public MyClass() {
        dvcCloudClient = new DVCCloudClient("your_server_key");
    }
}
```

### Initialization Options

| DVC Option | Description |
| --- | ----------- |
| enableEdgeDB | Enables the usage of EdgeDB for DevCycle that syncs User Data to DevCycle. <br />NOTE: This is only available with Cloud Bucketing. |

```java
import com.devcycle.sdk.server.cloud.api.DVCCloudClient;
import com.devcycle.sdk.server.cloud.model.DVCCloudOptions;

public class MyClass {
    
    private DVCCloudClient dvcCloudClient;

    private DVCCloudOptions dvcCloudOptions = DVCLocalOptions.builder()
        .enableEdgeDB(false)
        .build();
    
    public MyClass() {
        dvcCloudClient = new DVCCloudClient("your_server_key", dvcCloudOptions);
    }
}
```

## [Java SDK (Local)](/docs/sdk/server-side-sdks/java-local)

To use the DevCycle Java SDK, initialize a client object. 

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;

public class MyClass {
    
    private DVCLocalClient dvcLocalClient;
    
    public MyClass() {
        dvcLocalClient = new DVCLocalClient("your_server_key");
    }
}
```

### Initialization Options

| DVC Option | Description |
| --- | ----------- |
| configPollingIntervalMs | Controls the polling interval in milliseconds to fetch new environment config changes, defaults to 10 seconds, minimum value is 1 second. |
| configRequestTimeoutMs | Controls the request timeout to fetch new environment config changes, defaults to 5 seconds, must be less than the configPollingIntervalMS value, minimum value is 1 second. |
| eventFlushIntervalMS | Controls the interval between flushing events to the DevCycle servers, defaults to 30 seconds. |
| maxEventQueueSize | Controls the maximum number of events in queue, defaults to 2000. |
| eventRequestChunkSize | Controls the size of the number of events per request sent to the DevCycle servers, defaults to 100. |
| configCdnBaseUrl | Controls the endpoint used to fetch the project configurations from the DevCycle CDN, defaults to "https://config-cdn.devcycle.com/". |
| eventsApiBaseUrl | Controls the endpoint used to send events to the DevCycle servers, defaults to "https://events.devcycle.com/". |
| disableAutomaticEventLogging | Disables logging of any automatic events or user data to DevCycle. |
| disableCustomEventLogging | Disables logging of any Custom Events to DevCycle. |

```java
import com.devcycle.sdk.server.local.api.DVCLocalClient;
import com.devcycle.sdk.server.local.model.DVCLocalOptions;

public class MyClass {
    
    private DVCLocalClient dvcLocalClient;

    private DVCLocalOptions dvcLocalOptions = DVCLocalOptions.builder()
        .configPollingIntervalMs(60000)
        .configRequestTimeoutMs(30000)
        .eventFlushIntervalMS(10000)
        .flushEventQueueSize(1000)
        .maxEventQueueSize(2000)
        .eventRequestChunkSize(100)
        .configCdnBaseUrl("https://my-custom.config.com/")
        .eventsApiBaseUrl("https://my-custom.events.com/")
        .disableAutomaticEventLogging(false)
        .disableCustomEventLogging(false)
        .build();
    
    public MyClass() {
        dvcLocalClient = new DVCLocalClient("your_server_key", dvcLocalOptions);
    }
}
```

## [NodeJS SDK](/docs/sdk/server-side-sdks/node)

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

## [PHP SDK](/docs/sdk/server-side-sdks/php)

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

// Configure API key authorization: bearerAuth
$config = DevCycle\Configuration::getDefaultConfiguration()->setApiKey('Authorization', 'YOUR_API_KEY');

$apiInstance = new DevCycle\Api\DVCClient(
    $config,
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
);
$user_data = new \DevCycle\Model\UserData(array(
  "user_id"=>"my-user"
)); // \DevCycle\Model\UserData

try {
    $result = $apiInstance->allFeatures($user_data);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DVCClient->allFeatures: ', $e->getMessage(), PHP_EOL;
}

```

## [Python SDK](/docs/sdk/server-side-sdks/python)

```shell-session
$ pip install devcycle-python-server-sdk
```
(you may need to run `pip` with root permission: `sudo pip install devcycle-python-server-sdk`)

Then import the package:
```python
import devcycle_python_sdk 
```

```python
    from __future__ import print_function
    from devcycle_python_sdk import Configuration, DVCOptions, DVCClient, UserData, Event
    from devcycle_python_sdk.rest import ApiException
    configuration = Configuration()
    configuration.api_key['Authorization'] = 'your_server_key_here'
    # pass in an optional DVCOptions instance to store user data in EdgeDB
    options = DVCOptions(enableEdgeDB=True)
    # create an instance of the API class
    dvc = DVCClient(configuration, options)
    
    # all functions require user data to be an instance of the UserData class
    user = UserData(
        user_id='test',
        email='example@example.ca',
        country='CA'
    )
```

## [Ruby SDK](/docs/sdk/server-side-sdks/ruby)

Install the gem

`gem install devcycle-ruby-server-sdk`


```ruby
# Load the gem
require 'devcycle-server-sdk'

# Setup authorization
DevCycle.configure do |config|
  # Configure API key authorization
  config.api_key['bearerAuth'] = 'YOUR API KEY'
end

api_instance = DevCycle::DVCClient.new
user_data = DevCycle::UserData.new({user_id: 'user_id_example'}) # UserData | 

begin
  #Get all features for user data
  result = api_instance.all_features(user_data)
  p result
rescue DevCycle::ApiError => e
  puts "Exception when calling DVCClient->all_features: #{e}"
end

```

### Configure SDK
```ruby
# Load the gem
require 'devcycle-server-sdk'

# Setup authorization
DevCycle.configure do |config|
  # Configure API key authorization
  config.api_key['bearerAuth'] = 'YOUR API KEY'
end

api_instance = DevCycle::DVCClient.new
user_data = DevCycle::UserData.new({user_id: 'user_id_example'}) # UserData | 
```
