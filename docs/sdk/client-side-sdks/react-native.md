---
title: DevCycle for React Native
sidebar_position: 5
---

# DevCycle for React Native

The DevCycle React SDK lets you easily integrate your React Native web applications with DevCycle. 

:::info

At the moment, DevCycle for React Native utilizes the [DevCycle React SDK](docs/sdk/client-side-sdks/react) as a method of interaction with DevCycle

:::

## Requirements: 

This SDK is compatible with React versions 16.8.0 and above.


## Installation

1. Install and Initialize the [DevCycle React SDK](docs/sdk/client-side-sdks/react) and follow the steps on that page.

2. Import the [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) package and set `global.DeviceInfo = DeviceInfo`.

```javascript
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'
import DeviceInfo from 'react-native-device-info'

global.DeviceInfo = DeviceInfo
```

3. Pass in the option `reactNative: true` to the withDVCProvider or asyncWithDVCProvider function. 

```jsx
export default withDVCProvider(
{
	envKey: 'ENV_KEY',
	options: {
		reactNative: true
	}
})(App)
```

## Getting Started

Please refer to the [DevCycle React SDK](docs/sdk/client-side-sdks/react) documentation.




