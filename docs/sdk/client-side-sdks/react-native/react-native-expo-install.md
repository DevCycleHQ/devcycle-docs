---
title: Expo SDK Installation
sidebar_label: Expo Installation
sidebar_position: 2
description: Installing the Expo SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Expo package version](https://badgen.net/npm/v/@devcycle/react-native-expo-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-expo-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

To get started, install the React Native Expo SDK.

## Installation

The command to install the React Native Expo SDK is:

[//]: # (wizard-install-start)

### npx

```bash
npx expo install @devcycle/react-native-expo-client-sdk
```

[//]: # (wizard-install-end)

### yarn

```bash
yarn expo install @devcycle/react-native-expo-client-sdk
```

## Install SDK Dependencies

Install the SDK dependencies, run the following command

### npx

```bash
npx expo install @react-native-async-storage/async-storage react-native-get-random-values react-native-device-info react-native-sse
```

### yarn

```bash
yarn expo install @react-native-async-storage/async-storage react-native-get-random-values react-native-device-info react-native-sse
```

## Install Pods

Add the following packages that are required for React Native Expo functionality as dependencies of your project:

```bash
npx pod-install
```

The [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) package provides the ability to leverage on Device Storage that is used for caching by the SDK.
The [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values) package provides a polyfill for cryptographic functionality used to generate random IDs.
The [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) package provides information about the current device running the SDK, which is required to correctly apply targeting rules.
The [react-native-sse](https://www.npmjs.com/package/react-native-sse) package provides SSE connection functionality to enable real-time updates.

[//]: # (wizard-initialize-start)

## Import SDK Dependencies

1.  Import the `@react-native-async-storage/async-storage` package somewhere in your code (e.g. in the `App.jsx` file). (see example below)
2.  Import the `react-native-get-random-values` package somewhere in your code (e.g. in the `App.jsx` file). (see example below)
3.  Import the `react-native-device-info` package and set `global.DeviceInfo = DeviceInfo`. (see example below)

Example of the above steps:

```javascript
import React from 'react'
import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import '@react-native-async-storage/async-storage'
import { withDevCycleProvider } from '@devcycle/react-native-expo-client-sdk'

global.DeviceInfo = DeviceInfo
```

## Wrap Application in HOC

Wrap your application component tree in either the `withDevCycleProvider` or `asyncWithDVCProvider` higher-order component (HOC), as explained in the [Getting Started](#getting-started) section.

```jsx
export default withDevCycleProvider({ sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>' })(
  App,
)
```

[//]: # (wizard-initialize-end)

## Example

A complete working example of an `App.jsx` file is below:

```jsx
import React from 'react'
import { View, Text } from 'react-native'

import 'react-native-get-random-values'
import DeviceInfo from 'react-native-device-info'
import '@react-native-async-storage/async-storage'
import { withDevCycleProvider } from '@devcycle/react-native-expo-client-sdk'

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
      <Text>My React App</Text>
    </View>
  )
}

export default withDevCycleProvider({ sdkKey: '<DEVCYCLE_CLIENT_SDK_KEY>' })(
  App,
)
```
