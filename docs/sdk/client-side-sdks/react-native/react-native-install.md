---
title: React Native SDK Installation
sidebar_label: Installation
sidebar_position: 1
description: Installing the SDK
sidebar_custom_props: { icon: material-symbols:install-desktop }
---

[![Npm package version](https://badgen.net/npm/v/@devcycle/react-native-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-client-sdk)
[![Npm package version](https://badgen.net/npm/v/@devcycle/react-native-expo-client-sdk)](https://www.npmjs.com/package/@devcycle/react-native-expo-client-sdk)
[![GitHub](https://img.shields.io/github/stars/devcyclehq/js-sdks.svg?style=social&label=Star&maxAge=2592000)](https://github.com/devcyclehq/js-sdks)

To get started, install the React Native SDK. If working with React native Expo, install the React Native Expo SDK.

## Installation

The command to install the React Native SDK is:

[//]: # (wizard-install-start)

### npm

```bash
  npm install --save @devcycle/react-native-client-sdk
```
[//]: # (wizard-install-end)

### yarn

```bash
  yarn add @devcycle/react-native-client-sdk
```

## Installation for React Native Expo

The command to install the React Native Expo SDK is:

### npm

```bash
  npm install --save @devcycle/react-native-expo-client-sdk
```

### yarn

```bash
  yarn add @devcycle/react-native-expo-client-sdk
```

## Install Pods

Add the following packages that are required for React Native functionality as dependencies of your project:

```shell
npx pod-install
```

The [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) package provides the ability to leverage on Device Storage that is used for caching by the SDK.
The [react-native-get-random-values](https://www.npmjs.com/package/react-native-get-random-values) package provides a polyfill for cryptographic functionality used to generate random IDs.
The [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) package provides information about the current device running the SDK, which is required to correctly apply targeting rules.

## Install SDK Dependencies

Install the SDK dependencies, run the following command

### npm

```bash
  npm install --save @react-native-async-storage/async-storage react-native-get-random-values react-native-device-info
```

### yarn

```bash
  yarn add @react-native-async-storage/async-storage react-native-get-random-values react-native-device-info
```

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
import { withDevCycleProvider } from '@devcycle/react-native-client-sdk'

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
import { withDevCycleProvider } from '@devcycle/react-native-client-sdk'

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
