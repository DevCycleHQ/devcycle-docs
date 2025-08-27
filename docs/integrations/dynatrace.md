---
title: Dynatrace
---

The DevCycle Dynatrace integration allows you to correlate feature flag changes and flag evaluations with your Dynatrace instance. This provides visibility into feature flag states alongside other service monitoring data, making it easier to investigate and resolve issues.

The setup has two parts:

1. **Connect DevCycle to Dynatrace**, so that **feature flag change events** appear in Dynatrace.
2. **Configure your application** to send **flag evaluations** as part of the traces to Dynatrace

---

## Part A: Setting up Dynatrace Integration on DevCycle to receive flag change updates

Because feature flags can change independently of deployments, they often don't show up in your observability tools. Setting up this connection ensures that feature flag changes are logged in Dynatrace.

### Step 1: Create a Dynatrace Access Token

1. In Dynatrace, create a new token with the following scopes:
   - `openpipeline.events`
   - `openpipeline.events_sdlc`
   - `openpipeline.events_sdlc.custom`
2. Save this token securely — you'll need it shortly.

![Dynatrace Access Token Generation](/aug2025-dynatrace-UI-token-creation.png)

### Step 2: Add Dynatrace Environment in DevCycle

> Note: If Permissions are enabled for your Organization, please note that only **Organization Admins** can perform this step.

1. Go to your **DevCycle Organization Settings** → **Dynatrace** in the left navigation.
2. Click **Add Dynatrace Environment** and enter the following details:

   - **Environment ID**
   - **Environment URL**
   - **Access Token**

![Add Dynatrace Environment Modal](/aug2025-add-dynatrace-enc.png)

3. Assign the Dynatrace environment in the **Project Settings** for each project you want to enable.

4. In Project Settings, you'll see the **Dynatrace Integration** card.

5. Enable the integration and manage environment mapping.

![Dynatrace Integration Configuration](/aug2025-dynatrace-project-settings.png)

6. Be sure to click **Save** after making changes.

---

## Part B: Send Flag Evaluations from Your App

To capture flag evaluations in Dynatrace traces, DevCycle SDKs now support **Evaluation Hooks**.

Ensure you're using a supported SDK version:

```jsx
dotnet DevCycle.SDK.Server.Local 4.8.1
java com.devcycle:java-server-sdk:2.9.0
python devcycle-python-server-sdk 3.13.0
go github.com/devcyclehq/go-server-sdk/v2 2.24.0
js @devcycle/nodejs-server-sdk 1.55.0
```

We provide ready-made Dynatrace integration hooks in this repo [(Dynatrace Integration Hooks](https://github.com/DevCycleHQ-Sandbox/devcycle-integration-hooks)) for you to copy into your codebase.

:::info
These hooks are designed for Dynatrace OneAgent and are not supported in every language. Feel free to adapt them for your own use case.
:::

To enable in the SDK, you will have to call the client's addHook method and pass in the hook to it.

### Example: Add Hook in Java

```java
// Create DevCycle client with default options
devCycleClient = new DevCycleLocalClient(devCycleServerSdkKey);

// Add Dynatrace OneAgent SDK hook for all variable types
DynatraceOneAgentLogHook hook = new DynatraceOneAgentLogHook();
devCycleClient.addHook(hook);
```

### Example: Add Hook in C#

```csharp
// Initialize DevCycle client with standard configuration
DevCycleLocalClient client = new DevCycleLocalClientBuilder()
    .SetSDKKey("<DEVCYCLE_SERVER_SDK_KEY>")
    .SetLogger(LoggerFactory.Create(builder => builder.AddConsole()))
    .Build();

// Initialize evaluation hook with an ActivitySource for tracing
var hook = new DynatraceOneAgentHook(new ActivitySource("DevCycle.FlagEvaluations"));
client.AddEvalHook(hook);
```

When enabled, feature flag evaluations generate spans named: `feature_flag_evaluation.{feature_key}` which will have the attributes for the evaluation.

---

## Workflows & Dashboard Setup in Dynatrace

We provide a Dynatrace **workflow** and **dashboard** to help visualize and investigate feature flag data.

- **Workflow**: Automatically creates a feature flag update event for services sending spans (no need to manually map services to flags).
- **Dashboard**: Displays flag state changes over time, including response rates, throughput, and error rates in regards to a specific feature flag for a service.

You will have to import the Workflow and Dashboard into your Dynatrace instance through the following steps.

### Import Workflow

1. Download the workflow JSON: [Workflows Feature Flag.json](https://github.com/DevCycleHQ-Labs/dynatrace-integration/blob/main/Workflows%20Feature%20Flag.json)
2. In Dynatrace, go to **Workflows** → **Upload**, and import the file.

![Dynatrace Workflows Upload](/aug2025-dynatrace-workflow-import.png)

### Import Dashboard

1. Download the dashboard JSON: [Feature Flag Observability.json](https://github.com/DevCycleHQ-Labs/dynatrace-integration/blob/main/Feature%20Flag%20Observability.json)
2. In Dynatrace, go to **Dashboards** → **Upload**, and import the file.

![Dynatrace Dashboards Upload](/aug2025-dynatrace-dashboard-import.png)
