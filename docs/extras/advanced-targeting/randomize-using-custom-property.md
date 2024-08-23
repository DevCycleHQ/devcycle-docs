---
title: Randomize using a Custom Property
sidebar_position: 9
---

DevCycle uses User ID as the primary key for Targeting Rules and delivering variations, rolling out a feature, and randomizing distribution. However, there are cases in which a User ID is not the primary identifier of the request to DVC, thus making the usage of DevCycle features, specifically Gradual Rollouts, difficult in these scenarios. 

This functionality allows you to set a [Custom Property](docs/extras/advanced-targeting/custom-properties.md) as the key to roll out / distribute on rather than User ID, such as Account, Organization, Tenant or Store ID.  For example, at DevCycle, we would use this feature to gradually roll out new functionality on an organization-by-organization basis rather than on a user-by-user basis to ensure all users in the org see the same features.

## Setting Up a Targeting Rule using an Custom Property for Randomization
Since this functionality is only relevant in specific Targeting Rule use cases, the option to randomize using a Custom Property will only appear when you:

* Serve `Random Distribution` (ie. [run an experiment](/essentials/feature-experimentation#experimentation-using-a-custom-property-for-randomization)) 
* Select a `Gradual Rollout` 
* Select a `Multi-Step Rollout` 

The `Randomize Using` field will appear at the bottom of the Targeting Rule, under the `Schedule` section. The dropdown will also populate with all existing Custom Properties. Select the Custom Property you wish to use for your random distribution or rollout.

![Randomize Using field in Targeting Rules](/custom-property-randomization-rollouts.png)

## Expected Behaviour when Using a Custom Property as the Randomization Key

:::info
Note: If a user does not have the specficied Custom Property key, DevCycle will treat a non-existent randomization key as a static null value. (e.g. "Region" : "null") 
:::

In this case, DevCycle only considers the Targeting Rule definition and does not require a user to have the selected Custom Property defined. Users without a defined randomization key will all be bucketed into the same variation.

If you want to ensure that you only target users who have the selected Custom Property, then you must add a filter where Custom Property `exists`. If this filter is included in the Targeting Rule definition, users without a value for that Custom Property will not qualify for that rule. Instead, they will be evaluated against the next rule, if one exists, or they will receive the code default.
