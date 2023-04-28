---
title: DataDog RUM Integration
sidebar_position: 8
---

## Overview

DevCycle's clientside Javascript SDKs - including JS and React, can now be easily integrated with [DataDog RUM Feature Flag Tracking](https://docs.datadoghq.com/real_user_monitoring/feature_flag_tracking) - enabling the enrichment of your RUM data with DevCycle's variable data.

![DataDog RUM Feature Flag Tracking screen shot](/datadog-rum-screenshot.png)

### Table of Contents
- [Configuration](#configuration)
  - [JavaScript](#javascript)
  - [React](#react)
- [Coming Soon](#coming-soon)
  
### Configuration
Tracking variable evaluations with DataDog RUM is very simple, requiring only two steps.

1. Enable the experimental feature in your `datadogRum.init` configuration

```
datadogRum.init({
    ...
    enableExperimentalFeatures: ["feature_flags"],
    ...
});
```

2. Call `datadogRum.addFeatureFlagEvaluation(key, value)` whenever a variable is evaluated. Since the JavaScript and React SDKs [emit an event](https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-usage#subscribing-to-sdk-events) on every variable evaluation, this code should run within the subscription callback.

See below for more specific examples:

#### JavaScript

To track all variable evaluations:

```
const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions); 
...
dvcClient.subscribe(
    "variableEvaluted:*",
    (key: string, variable: DVCVariable<DVCVariableValue>) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```

To track a specific variable evaluation (in this case a variable whose key is `my-variable-key`):

```
const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions); 
...
dvcClient.subscribe(
    "variableEvaluted:my-variable-key",
    (key: string, variable: DVCVariable<DVCVariableValue>) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```

#### React

We recommend encapsulating your RUM code within a React hook, so consider the following example:

```
import { datadogRum } from '@datadog/browser-rum'
import { DVCVariableValue, useDVCClient } from '@devcycle/devcycle-react-sdk'
import { DVCVariable } from '@devcycle/devcycle-js-sdk'
import { useEffect } from 'react'

let didInit = false

export const useDatadogRum = () => {
  const dvcClient = useDVCClient()
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_DATADOG_RUM === '1' && !didInit) {
      didInit = true
      datadogRum.init({
        ...
      })
      datadogRum.startSessionReplayRecording()
      dvcClient.subscribe(
        'variableEvaluated:*',
        (key: string, variable: DVCVariable<DVCVariableValue>) => {
          datadogRum.addFeatureFlagEvaluation(key, variable.value)
        },
      )
    }
  }, [dvcClient])
}

export default useDatadogRum
```

Then simply call the hook from your root component:

```
export const App = () => {
  useDatadogRum()
  ...
  return (
    ...
  )
}
```

### Coming Soon

DevCycle plans to release similar updates for both iOS and Android.
