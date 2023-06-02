---
title: React Native SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: {icon: screwdriver-wrench}
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/devcycle-react-native-sdk)](https://www.npmjs.com/package/@devcycle/devcycle-react-native-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

To install the SDK, run the following command:

<!--tabs-->

### npm

  ```bash
    npm install --save @devcycle/devcycle-react-native-sdk 
  ```

### yarn

  ```bash
    yarn add @devcycle/devcycle-react-native-sdk 
  ```

<!--/tabs-->

2. Add the following packages that are required for React Native functionality as dependencies of your project:
```shell
npx pod-install
```

The [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) package provides the ability to leverage on Device Storage that is used for caching by the SDK.
The [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values) package provides a polyfill for cryptographic functionality used to generate random IDs.
The [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) package provides information about the current device running the SDK, which is required to correctly apply targeting rules.

3.  Install the SDK dependencies, run the following command

<!--tabs-->

### npm

  ```bash
    npm install --save @react-native-async-storage/async-storage react-native-get-random-values react-native-device-info
  ```

### yarn

  ```bash
    yarn add @react-native-async-storage/async-storage react-native-get-random-values react-native-device-info
  ```

<!--/tabs-->

4.  Import the `@react-native-async-storage/async-storage` package somewhere in your code (e.g. in the `App.jsx` file). (see example below)
5.  Import the `react-native-get-random-values` package somewhere in your code (e.g. in the `App.jsx` file). (see example below)
6.  Import the `react-native-device-info` package and set `global.DeviceInfo = DeviceInfo`. (see example below)

Example of the above steps:
```javascript
import React from 'react'
import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import '@react-native-async-storage/async-storage'
import { withDVCProvider } from '@devcycle/devcycle-react-native-sdk'

global.DeviceInfo = DeviceInfo
```

7. Wrap your application component tree in either the `withDVCProvider` or `asyncWithDVCProvider` higher-order component (HOC), as explained in the [Getting Started](#getting-started) section.


```jsx
export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })(App)
```

A complete working example of an `App.jsx` file is below:
```jsx
import React from 'react'
import { View, Text } from 'react-native'

import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import '@react-native-async-storage/async-storage'
import { withDVCProvider } from '@devcycle/devcycle-react-native-sdk'

global.DeviceInfo = DeviceInfo
function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Universal React with Expo</Text>
    </View>
  )
}

export default withDVCProvider({ sdkKey: '<DVC_CLIENT_SDK_KEY>' })(App)
```
