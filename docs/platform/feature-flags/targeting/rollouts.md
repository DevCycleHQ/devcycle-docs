---
title: Scheduling & Rollouts
sidebar_position: 5
---

## Scheduling a Feature

By default, all Targeting Rules will not have a Schedule, and Features will be delivered immediately to any users who are in the target audience, once an Environment is enabled.

To schedule specifically when a target should receive a Feature, change the Schedule option to "Specific Date and Time". Once selected, you may input a date and time to release your Feature. 

**Note:** Dates in the past may be selected, and will be treated as if there is no schedule. Users in such a target will receive the served Variation if the Feature is enabled in that environment.

The timezone is set to the DevCycle user's timezone.

:::info

With Passthrough Rollouts enabled, if a user qualifies for a Targeting Rule that has a schedule, but the schedule has not yet been reached, the user will bypass that target and move onto the next Targeting Rule. See [Passthrough Rollouts](/platform/feature-flags/targeting/rollouts#passthrough-rollouts-effective-for-all-devcycle-projects---date-tbd) for more details.

:::

## Rollouts

### Gradual Rollouts

To roll out or roll back a Feature to a Target at specific times, open the "Schedule" dropdown and select "Gradual Rollout". 

This will give you the option to create a rollout, from a start percentage to an end percentage at specific dates. Use this option to gradually roll out or roll back the Feature to users and monitor the impact over time without creating an instant switch of users.

While a Feature is active and a rollout has been set, you can view the current % of rollout at any time:

:::tip

To **gradually rollout** a Feature, select a start percentage that's lower than the end percentage, and an end date that's later than the start date.

To **gradually rollback** a Feature, select an end percentage that is lower than your start percentage, and an end date that's later than the start date.

To **instantly rollout or rollback** a Feature to a specfic percentage of users at once, select the same start and end percentage, and the same start and end date. The dates chosen can be in the past.

:::

### Multi-Step Rollouts

This rollout option allows you to setup a stepped or phased rollout for your Feature. For example, you can use the Multi-Step rollout functionality to setup a rollout schedule with certain percentage milestones, e.g. rollout to 25% of users on X date, rollout to 50% of users at Y date, and then gradually rollout to the rest of users (100%) by Z date. 

To set up a Multi-Step Rollout in your Targeting Rule, open the "Schedule" dropdown and select "Multi-step Rollout". 

This will give you the option to create a custom, multi-step rollout, where you can define a start percentage, and add as many rollout steps as you wish, each with their own percentage and scheduled date.  

You must select how you would like your rollout to transition between steps by clicking on the icons below each rollout step.

![Step vs Gradual Transition](/apr-2024-step-gradual.png)

- **Step**: Transition immediately between steps. 
- **Gradual**: Transition gradually between steps. 

While a Feature is active and a rollout has been set, you can view the current % of rollout at any time. 

Here is how you'd set up the phased rollout example described above: 

![Multi-step Rollout Example](/apr-2024-multi-step-rollout.png)

### Stopping a Rollout

While the easiest way to end a rollout is to remove the targeting rule or disable the targeting for an environment dropping everyone to default values, there are times when you may want to stop a rollout, holding the percentage steady. This is relevant if you are seeing small issues that are easily resolved, where you may not want to add more users and exacerbate the issue, but you also don't want to take away a Feature from users that already have received it. This may also be relevant in scenarios where you can't rollback a Feature and regardless of the issue happening you are just trying to limit the blast radius to users who have already received the Feature.

Regardless of the scenario you find yourself in, both Gradual and Multi-Step Rollouts can be stopped at their current rollout percentage and held there indefinitely.

To stop a rollout, just click the Stop button next to the Current Rollout Percentage indicator. You will be asked to confirm the change. Once confirmed the rollout will be modified from whatever it was to a Multi-Step Rollout with the last step being the current time and current rollout percentage. This edit can still be reviewed and discarded if you would like. When you are ready to accept the change, just save the Feature.

When you are ready to continue the rollout, all you have to do is add more steps.

## FAQ about Rollouts

**How often are rollouts evaluated / When does the rollout % update?**

Rollouts are calculated in real-time -- meaning that the rate of increase of the current % is based on the time between the start and end dates. 

**How do rollouts actually work?**

The rollout of the targeting rule is deterministic based on an algorithm leveraging the User, Feature and Target IDs. This effectively means that a user will be guaranteed to receive a Feature at a specific percentage point for that targeting rule. If the rollout is higher than that percentage point, the user will receive the Feature, and if the rollout is lower than that percentage point, then the user will not receive the Feature. It doesn't matter how often the rollout changes. This logic applies to all users and where each user's "percentage point" is randomly distributed.

*Example:*
Your Production environment is targeting all users and the rollout is at 30% but you find out that you have to rollback to 0% because of an issue. Once you roll out again to 30%, the 30% of users that were originally targeted are guaranteed to receive the Feature again.

**Will a user receive a Feature right away once they qualify for the rollout?**

A User will qualify for the Feature on the first config request after they are part of the rollout percentage. Rollouts will not trigger a Realtime Update on the SDK. 

**If a User meets the Targeting Rule's definition but does not qualify for the Feature by rollout, will they proceed to evaluate the next Targeting Rule?**

If a user qualifies for a target that has a rollout, and they have  _not yet_  received the rollout, the user **may or may not** proceed to the next target depending on whether you have [Passthrough Rollouts](/platform/feature-flags/targeting/rollouts#passthrough-rollouts-effective-for-all-devcycle-projects---date-tbd)  enabled.


## Passthrough Rollouts (*effective for ALL DevCycle Projects - Date TBD*)

Passthrough Rollouts will be the default behaviour for Targeting Rules moving forward. Projects created after May 22, 2024 will already have this enabled. For projects created on or before this date, we have made Passthrough Rollouts for Environment Targeting available for **opt-in**, in Project Settings ahead of the switchover.

If your team is actively using Scheduled Rollouts in your Targeting Rules, this change may affect how your Targeting Rules behave for your Features. We've put together resources to make this transition as smooth as possible for you.

### What are Passthrough Rollouts?

Currently, any user that qualifies for a rule that contains a Scheduled Rollout, will be held on the rule and receive default values until the schedule or rollout has triggered.

With **Passthrough Rollouts**, if a rollout or schedule hasn't been hit for a Targeting Rule, the platform will treat the rule as if it doesn't exist, regardless of whether the user qualifies for the rule or not. Essentially, users will not be "stuck" on the rule, and instead, will bypass the rule and continue evaluating the next rule(s). This is especially useful when you want users to receive a different Variation of your Feature until the rollout or schedule applies to them.

Here is an example scenario of Passthrough Rollouts' expected behaviour:

- Let's pretend today's date is April 18th. 

- In the screenshot below, given the scheduled date for the Targeting Rule #1 - `Fall-through Example` is in the future and has not happened yet, all users will pass through that rule and be evaluated against Targeting Rule #2 - `Promotion` and receive the Spin variation for the next week. 

- Once April 26th arrives, users will now be evaluated against the first rule and be served the Base variation. 

- Conversely, if Passthrough Rollouts *were not* enabled, All Users would be "stuck" on and only evaluated against Targeting Rule #1 and continue to receive the default value in code until April 26th. 

![Example Passthrough Rollouts](/may-2024-example-passthrough-scenario.png)


### What do you need to know?

- **May 22, 2024:** Starting today, all existing projects will have a Passthrough Rollouts section in each Project's settings page. This will give you an option to enable this setting ahead of the switchover date. All new Projects created from this date forward, will have passthrough rollouts as the default behaviour.
- **DATE TBD:** All projects remaining will switchover to Passthrough Rollouts. If your team is leveraging a server-side SDK, your team must upgrade your SDK before this date, as Passthrough Rollouts require specific DevCycle Server SDK Versions to be deployed.

### What do you need to do?

If your team is leveraging a **server-side SDK**, your team must upgrade your SDK as Passthrough Rollouts require specific DevCycle Server SDK Versions to be deployed (with the exception of the PHP SDK, which does not require an SDK update).

Minimum versions:
- Python: **3.5.0** [![PyPI](https://badgen.net/pypi/v/devcycle-python-server-sdk)](https://pypi.org/project/devcycle-python-server-sdk/) 
- Java: **2.2.0** [![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
- Dotnet (Local): **3.1.0** [![Nuget Local](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
- Node: **1.29.0** [![Npm package version](https://badgen.net/npm/v/@devcycle/nodejs-server-sdk)](https://www.npmjs.com/package/@devcycle/nodejs-server-sdk)
- Ruby: **2.7.0** [![GitHub](https://img.shields.io/github/stars/devcyclehq/ruby-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ruby-server-sdk)
- GO: **2.15.0** [![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)
- Nestjs: **0.7.0** [![Npm package version](https://badgen.net/npm/v/@devcycle/nestjs-server-sdk)](https://www.npmjs.com/package/@devcycle/nestjs-server-sdk)

