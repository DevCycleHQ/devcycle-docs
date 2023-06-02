---
title: Observability
sidebar_label: Observability
sidebar_position: 10
description: Observability Best Practices Using DevCycle with Datadog's RUM Feature Flag Tracking
sidebar_custom_props: {icon: microscope}
---

# Observability Best Practices Using DevCycle with Datadog's RUM Feature Flag Tracking

## Introduction

[Datadog](https://www.Datadoghq.com/) is a prominent cloud observability and security platform, offering insights into metrics, traces, and logs across your entire tech stack. One of Datadog's key features is Real User Monitoring (RUM), which allows you to visualize and analyze real-time performance and user journeys for individual users in your application. To collect events, Datadog provides an easy-to-configure RUM Browser SDK.

DevCycle offers clientside Javascript SDKs, including JS and React, which can be seamlessly integrated with Datadog RUM Feature Flag Tracking. This integration enables the enrichment of RUM data with DevCycle's variable data, giving you more granular control over data collection and event tracking based on user-specific configurations.

In this article, we'll explore best practices for setting up an integration between DevCycle's SDK and Datadog's RUM.

### 1. Configuration

To start, enable the experimental feature in your DatadogRum.init configuration by adding the enableExperimentalFeatures parameter:

```javascript
datadogRum.init({
  ...
  enableExperimentalFeatures: ["feature_flags"],
  ...
});
```

Next, call DatadogRum.addFeatureFlagEvaluation(key, value) whenever a variable is evaluated. Since the JavaScript and React SDKs emit an event on every variable evaluation, this code should run within the subscription callback.

### 2. JavaScript Integration

To track all variable evaluations, initialize the DevCycle client with your SDK key and user information. Then, subscribe to the variableEvaluated:* event and use the DatadogRum.addFeatureFlagEvaluation(key, variable.value) function within the callback:

```javascript
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
To track a specific variable evaluation, subscribe to the variableEvaluated:my-variable-key event:

```javascript
dvcClient.subscribe(
  "variableEvaluted:my-variable-key",
  (key: string, variable: DVCVariable<DVCVariableValue>) => {
    datadogRum.addFeatureFlagEvaluation(key, variable.value);
  }
)
```

### 3. React Integration
For React, we recommend encapsulating your RUM code within a React hook. Consider the following example:

```javascript
import { DatadogRum } from '@Datadog/browser-rum'
import { DVCVariableValue, useDVCClient } from '@devcycle/devcycle-react-sdk'
import { DVCVariable } from '@devcycle/devcycle-js-sdk'
import { useEffect } from 'react'

let didInit = false

export const useDatadogRum = () => {
  const dvcClient = useDVCClient()
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_Datadog_RUM === '1' && !didInit) {
      didInit = true
      DatadogRum.init({
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
  
export default useDatadogRum;
```

Now, simply call the useDatadogRum() hook from your root component:

```javascript
export const App = () => {
  useDatadogRum()
  ...
  return (
    ...
  )
}
```

### 4. Test and Monitor Your Integration

Once you have implemented the integration, test it thoroughly to ensure that Datadog RUM is receiving the appropriate feature flag evaluations from DevCycle. Monitor the Datadog RUM dashboard for any anomalies or unexpected behaviors. Regularly review the data collected and adjust your feature flag configurations as needed to optimize performance and user experience.

### 5. Segment Users for More Granular Control

With DevCycle's integration, you can segment users based on different criteria, such as browser type, location, or other custom attributes. This allows you to control the data collected for specific groups of users, offering a more targeted and efficient approach to monitoring.

### 6. Keep Your Configuration Code Modular and Maintainable

As your application grows and your monitoring needs change, it's essential to maintain clean and modular code. This will make it easier to adjust your Datadog RUM and DevCycle SDK configurations without introducing errors or conflicts. Consider using helper functions, hooks, or middleware to keep your code organized and maintainable.

## Conclusion

Integrating DevCycle's SDK with Datadog's RUM Feature Flag Tracking offers a powerful combination of tools for monitoring and managing your application. By following the best practices outlined in this article, you can ensure a smooth and efficient integration, allowing you to take full advantage of the insights and control offered by both platforms.