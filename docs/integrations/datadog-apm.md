---
title: DataDog APM

---

DevCycle's clientside Javascript SDKs - including JS and React, can be easily integrated with [DataDog APM](https://docs.datadoghq.com/tracing/) - enhacing visibility into DataDog Traces by supplementing it with data from DevCycle.

![Datadog APM Dashboard](/integrations/datadog-apm/datadog-apm-dashboard.png)

## Configuration

The DevCycle APM integration provides Traces with more depth by passing in DevCycle Feature and/or Variable data during its time of execution, allowing Developers to get a better understanding of the performance impact of each Feature.

### Sending Feature Data

To add Feature data to Traces, we'll retrieve all of our Feature and Variation data using a DevCycle SDK and add that data as metadata to the active Trace. In our example, we send the Feature key and Variation name to DataDog. This can be customized to your liking.


``` javascript
const features = devcycleClient.allFeatures()

const span = tracer.scope().active();
if (span) {
    const rootSpan = span.context()._trace.started[0];
    Object.entries(features).forEach(([key, metadata]) => {
        rootSpan?.setTag(key, metadata['variationName']);
    });
}
```

### Sending Variable Data

To add DevCycle Variables to Traces, we'll retrieve Variable data from a DevCycle SDK and add that data as metadata to the active Trace. A simple way to pass along multiple Variables and its values to DataDog is shown below.

``` javascript
const variableA = devcycleClient.variable('new-homepage-hero', 'defaultValue');
const variableB = devcycleClient.variable('new-homepage-layout', 'defaultValue');

const variables = {
    variableA: variableA.value,
    variableB: variableB.value,
}

const span = tracer.scope().active();
if (span) {
    const rootSpan = span.context()._trace.started[0];
    Object.entries(variables).forEach(([key, value]) => {
        rootSpan?.setTag(key, value);
    });
}
```

## Results

DevCycle data will then appear in the span within your traces. In our example, we're passing a `devcycle` object containing information that's relevant to the current action.

![Datadog APM Spam Metadata](/integrations/datadog-apm/datadog-apm-span.png)

That's it! Check out our [DataDog RUM integration](/integrations/datadog-rum) to see how we can help you enhance your RUM metrics using DevCycle Feature and Variable data.