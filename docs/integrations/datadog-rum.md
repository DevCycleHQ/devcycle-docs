---
title: DataDog
sidebar_position: 3
---

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

```jsx
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

```jsx
const user = { user_id: "my_user" };
const devcycleOptions = { logLevel: "debug" };
const devcycleClient = initialize("<DEVCYCLE_CLIENT_SDK_KEY>", user, devcycleOptions);
...
devcycleClient.subscribe(
    "variableEvaluted:*",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```

To track a specific variable evaluation (in this case a variable whose key is `my-variable-key`):

```jsx
const user = { user_id: "my_user" };
const devcycleOptions = { logLevel: "debug" };
const devcycleClient = initialize("<DEVCYCLE_CLIENT_SDK_KEY>", user, devcycleOptions);
...
devcycleClient.subscribe(
    "variableEvaluted:my-variable-key",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```

#### React

We recommend encapsulating your RUM code within a React hook, so consider the following example:

```jsx
import { datadogRum } from '@datadog/browser-rum'
import { DVCVariableValue, useDevCycleClient } from '@devcycle/react-client-sdk'
import { DVCVariable } from '@devcycle/js-client-sdk'

let didInit = false

export const useDatadogRum = () => {
  const devcycleClient = useDevCycleClient()
  if (!didInit) {
    didInit = true
    datadogRum.init({
      ...
    })
    datadogRum.startSessionReplayRecording()
    devcycleClient.subscribe(
      'variableEvaluated:*',
      (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value)
      },
    )
  }
}

export default useDatadogRum
```

Then simply call the hook from your root component:

```jsx
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

<details>
  <summary>
 <b><i className="fas fa-arrows-alt"></i> Contributing to DevCycle or creating a new Integration:</b>
  </summary>
  <div>     
    <p>
    If you would like to contribute to an existing integration or tool, all of DevCycle's tools and integrations  are <a href="https://github.com/devcycleHQ">open source on the DevCycle github repository.</a>
</p>
<p>
 Further, if you'd like to create a new tool or integration, a great starting point is <a href="/management-api/">DevCycle's Management API</a> which allows you to modify and interact with features and more within a devcycle project, as well as the <a href="/bucketing-api/">DevCycle Bucketing API</a>  which is used to give users features and variables (as used within the DevCycle SDKs!)
  </p>
  </div>
</details>
