---
title: Randomize using a Custom Property
sidebar_position: 6
---

DevCycle uses User ID as the primary key for delivering variations, rolling out a feature, and randomizing distribution. However, there are cases in which a User ID is not the primary identifier of the request to DVC, thus making the usage of DevCycle features, specifically Gradual Rollouts, difficult in these scenarios. 

This functionality allows you to set a [Custom Property](docs/platform/feature-flags/targeting/custom-properties.md) as the key to rollout / distribute on rather than User ID. Account, Organization, Tenant or Store IDs are some commonly used examples.  At DevCycle, we use this feature to gradually roll out new functionality on an organization-by-organization basis rather than on a user-by-user basis to ensure all users in the same organization see the same features.

## Minimum Supported Server SDK Versions

To use this functionality in conjunction with Server-Side SDKs, ensure that you are on the following **minimum** SDK versions. Client-side SDKs do not have any version requirements.

| SDK Type | Minimum Version |
| - | - |
| Node.js | 1.19.0 | 
| Go | 2.18.1 | 
| Java | 2.3.0 | 
| DotNet | 4.1.0 | 
| Python | 3.7.0 | 
| Ruby | 3.2.0 | 
| SDK Proxy | 2.2.0 | 

## Targeting Rule setup using a Custom Property for Randomization

Since this functionality is only relevant in specific Targeting Rule use cases, the option to randomize using a Custom Property will only appear when you:

* Serve `Random Distribution` (ie. [run an experiment](/platform/experimentation/feature-experimentation#experimentation-using-a-custom-property-for-randomization)) 
* Select a `Gradual Rollout` 
* Select a `Multi-Step Rollout` 

The `Randomize Using` field will appear at the bottom of the Targeting Rule, under the `Schedule` section. The dropdown will be populated with all existing Custom Properties from your project. Select the Custom Property you wish to use for your random distribution or rollout.

![Randomize Using field in Targeting Rules](/custom-property-randomization-rollouts.png)

If you haven't setup Custom Properties, you'll have to create them on the dashboard and define them in code. Take a look at our [Custom Properties](/platform/feature-flags/targeting/custom-properties) page for more info. Here's a sample of how that's setup with the React SDK.

```jsx
import { useDevCycleClient } from '@devcycle/react-client-sdk'

const user = {
  user_id: 'user123',
  customData: {
    // These are Custom Properties
    organization: "org_001",
    jurisdictionId: 987,
    isBetaUser: false
  },
}
const client = useDevCycleClient()
client.identifyUser(user)
```

### Behaviour when the Randomize Using Custom Property is Undefined

:::info
If a user does not have the specified Custom Property key, DevCycle will treat the non-existent Randomization key as a static null value (e.g. "Organization": null) and may continue to rollout / distribute the Feature to the user.
:::

DevCycle only considers the Targeting Rule `Definition` for eligibility in receiving a Feature and does not require a user to have the selected "Randomize Using" Custom Property defined. Users without a defined randomization key will proceed to be bucketed, but these users will all be bucketed into the same variation and rollout threshold.

If you want to ensure that you only rollout and/or distribute variants to users who have the selected Custom Property defined, then you must add a filter to your Targeting Rule Definition that targets users where the Custom Property `exists`. If this filter is included in the Targeting Rule definition, users without a value for that Custom Property will not qualify for that rule. Instead, they will be evaluated against the next rule, if one exists, or they will receive the code defaults. Example of such a targeting rule setup:

![Randomize Using Targeting Rule Setup](/custom-property-randomization-property-exists.png)

## Experimentation using a Custom Property for Randomization

In terms of Experimentation, randomization based on Custom Properties allows you to rollout specific variations of your application to user groups that share the same `Custom Property`. This gives you more flexibility to Experiment and A/B test on groups of users that are defined by your custom properties, or by another identifier that is not the User ID.

Learn more about Random Distribution within the context of Experimentation on the [Feature Experimentation](https://docs.devcycle.com/platform/experimentation/feature-experimentation/#experimentation-using-a-custom-property-for-randomization) page.