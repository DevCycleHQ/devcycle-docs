---
title: DataDog APM

---

DevCycle's clientside Javascript SDKs - including JS and React, can be easily integrated with [DataDog APM](https://docs.datadoghq.com/tracing/) - enhacing visibility into DataDog Traces by supplementing it with data from DevCycle.

![Datadog APM Dashboard](/integrations/datadog-apm/datadog-apm-dashboard.png)

## Configuration

The DevCycle APM integration provides Traces with more depth by passing in DevCycle variable data during it's time of execution, allowing Developers to get a better understanding of the performance impact of each Feature.

To add variable data to Traces, we'll retrieve variable data from a DevCycle SDK and add that data as metadata to the active Trace. See the example below.

#### JavaScript

Fetch the DevCycle variable and format it to our liking:

``` javascript
class DevCycleTracingPatchService {
    constructor(devcycleClient) {
        this.devcycleClient = devcycleClient;

        const originalVariable = this.devcycleClient.variable.bind(this.devcycleClient);

        this.devcycleClient.variable = (user, key, defaultValue) => {
            const variable = originalVariable(user, key, defaultValue);
            addTraceMetadata({
                [`devcycle.${key}`]: JSON.stringify(variable.value),
            });
            return variable;
        };
    }
}
```

Add the variable to the Trace as Metadata:

``` javascript
function addTraceMetadata(metadata) {
    const span = tracer.scope().active();
    if (span) {
        const rootSpan = span.context()._trace.started[0]; // Assumes specific tracer structure
        Object.entries(metadata).forEach(([key, value]) => {
            rootSpan?.setTag(key, value);
        });
    }
}
```

#### React

Fetch the DevCycle variable and format it to our liking:

``` jsx
@Injectable()
export class DevCycleTracingPatchService {
    constructor(private devcycleClient: DevCycleClient) {
        const originalVariable = this.devcycleClient.variable.bind(
            this.devcycleClient,
        )
        this.devcycleClient.variable = (user, key, defaultValue) => {
            const variable = originalVariable(user, key, defaultValue)
            addTraceMetadata({
                [`devcycle.${key}`]: JSON.stringify(variable.value),
            })
            return variable
        }
    }
}
```

Add the variable to the Trace as Metadata:

``` jsx
export function addTraceMetadata(metadata: Record<string, unknown>) {
    const span = tracer.scope().active()
    if (span) {
        const rootSpan = (span.context() as any)._trace.started[0]
        Object.entries(metadata).forEach(([key, value]) => {
            rootSpan?.setTag(key, value)
        })
    }
}
```

## Results

DevCycle data will then appear in the span within your traces. In our example, we're passing a `devcycle` object containing information that's relevant to the current action.

![Datadog APM Spam Metadata](/integrations/datadog-apm/datadog-apm-span.png)

That's it! Check out our [DataDog RUM integration](/integrations/datadog-rum) to see how we can help you enhance your RUM metrics using DevCycle Feature and Variable data.