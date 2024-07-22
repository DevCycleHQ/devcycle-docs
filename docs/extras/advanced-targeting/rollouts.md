---
title: Scheduling & Rollouts
sidebar_position: 2
---

## Scheduling a Feature

By default, all targets will not have a schedule and will deliver to any users who are in a target, if the environment is enabled.

To schedule specifically when a target should receive a feature, change the Schedule option to "Specific Date and Time"

Once selected, there will be an input for a date and time. Note: Dates in the past may be selected, and will be treated as if there is no schedule. Users in such a target will receive the served variation if the feature is enabled in that environment.

The timezone is set to the DevCycle user's timezone.

:::info

If a user qualifies for a target that has a schedule, and the schedule has not yet been reached, the user will still be held in that target and not move onto a different target.

:::

## Rollouts

### Gradual Rollouts

To roll out a Feature to a Target at specific times, open the "Schedule" dropdown and select "Gradual Rollout". 

This will give you the option to create a rollout, from a start percentage to an end percentage at specific dates. Use this option to gradually roll out the feature to users and monitor the impact over time without creating an instant switch of users.

While a feature is active and a rollout has been set, you can view the current % of rollout at any time:

:::tip

To **gradually rollout** a feature, select a start percentage that's lower than the end percentage, and an end date that's later than the start date.

To **gradually rollback** a feature, select an end percentage that is lower than your start percentage, and an end date that's later than the start date.

To **instantly rollout or rollback** a feature to a specfic percentage of users at once, select the same start and end percentage, and the same start and end date. The dates chosen can be in the past.

:::

### Multi-Step Rollouts

This rollout option allows you to setup a stepped or phased rollout for your Feature. For example, you can use the Multi-Step rollout functionality to setup a rollout schedule with certain percentage milestones, e.g. rollout to 25% of users on X date, rollout to 50% of users at Y date, and then gradually rollout to the rest of users (100%) by Z date. 

To set up a Multi-Step Rollout in your Targeting Rule, open the "Schedule" dropdown and select "Multi-step Rollout". 

This will give you the option to create a custom, multi-step rollout, where you can define a start percentage, and add as many rollout steps as you wish, each with their own percentage and scheduled date.  

You must select how you would like your rollout to transition between steps by clicking on the icons below each rollout step.

![Step vs Gradual Transition](/apr-2024-step-gradual.png)

- **Step**: Transition immediately between steps. 
- **Gradual**: Transition gradually between steps. 

While a feature is active and a rollout has been set, you can view the current % of rollout at any time. 

Here is how you'd set up the phased rollout example described above: 

![Multi-step Rollout Example](/apr-2024-multi-step-rollout.png)

## FAQ about Rollouts

**How often are rollouts evaluated? / When does the rollout % update?**

Rollouts are calculated in real-time -- meaning that the rate of increase of the current % is based on the time between the start and end dates. 

**How do rollouts actually work?**

The rollout of the targeting rule is deterministic based on an algorithm leveraging the User, Feature and Target IDs. This effectively means that a user will be guaranteed to receive a feature at a specific percentage point for that targeting rule. If the rollout is higher than that percentage point, the user will recieve the feature, and if the rollout is lower than that percentage point, then the user will not receive the feature. It doesn't matter how often the rollout changes. This logic applies to all users and where each user's "percentage point" is randomly distributed.

*Example:*
Your Production evironment is targeting all users and the rollout is at 30% but you find out that you have to rollback to 0% because of an issue. Once you roll out again to 30%, the 30% of users that were originally targeted are guaranteed to receive the feature again.

**Will a user receive a Feature right away once they qualify for the rollout?**

A User will qualify for the Feature on the first config request after they are part of the rollout percentage. Rollouts will not trigger a Realtime Update on the SDK. 

**If a User meets the Targeting Rule's definition but does not qualify for the Feature by rollout, will they proceed to evaluate the next Targeting Rule?**

If a user qualifies for a target that has a rollout, and they have  _not yet_  received the rollout, the user will not proceed to the next target. Instead, they will remain in the rollout target. ex: If the rollout on the targeting rule is 0% and the user meets the targeting rule's definition, they will stay on the current targeting rule.


## Order of Targeting Rules with Schedules or Rollouts

As described above, there are many various elements that can go into a targeting rule. 

Regardless of all of the various additions to a targeting rule such as random distributions, schedules, or rollouts, if a user matches the **definition**, they will remain in that target and not be considered for targets later in the order.

For example, a set of Targeting Rules has a schedule, as well as a later Target.

There is a _schedule_ for the first target so this target will not serve any variation until the schedule has been reached. 

The address of vic@devcycle.com will **remain in** this target** even though it is not scheduled to serve the variation yet. This is because the target has been defined to *serve victor this variation *when this time comes*.

No targets below this one would impact this user in any way.

Additionally, if there is a *rollout* and a variation is being rolled out to a set of users, 
and the user qualifies for a target but still has *not received the rollout,* 
the user will *still* not receive a later target.

:::info

For modifications  to or additions of a gradual roll-out, entries in the [Audit Log](/extras/audit-log) will be marked as `Stage 1` and labelled as a `Linear` roll-out. 

:::

## Passthrough Rollouts (*effective for ALL DevCycle Projects on August 14, 2024*)

On **August 14, 2024**, we will be implementing Passthrough Rollouts for Environment Targeting. 

If your team is actively using the Scheduled Rollouts functionality for Targeting Rules,  this change may affect Targeting Rules for your Features, so we've put together resources to make this transition as smooth as possible for you.

### *What are Passthrough Rollouts?*

Currently, any user that qualifies for the rule will be held on the rule and receive default values until the schedule or rollout has triggered.

With **Passthrough Rollouts**, if a rollout or schedule hasn’t been hit for a Targeting Rule, the platform will behave as if the rule doesn’t exist, regardless if the user qualifies for the rule or not. Essentially, users will not be “stuck” on the first rule and be served the default value until the Targeting Rule’s schedule is live. 

Here is an example scenario of Passthrough Rollouts' expected behaviour:

- Let's pretend today's date is April 18th. 

- In the screenshot below, given the scheduled date for the Targeting Rule #1 is in the future and has not happened yet, all users will pass through that rule and be evaluated against Targeting Rule #2 - `Promotion` and receive the Spin variation for the next week. 

- Once April 26th arrives, users will now be evaluated against the first rule and be served the Base variation. 

- Conversely, if Passthrough Rollouts *were not* enabled, All Users would be "stuck" on and only evaluated against Targeting Rule #1 and continue to receive the default value in code until April 26th. 

![Example Passthrough Rollouts](/may-2024-example-passthrough-scenario.png)


### *What do you need to know?*

- **May 22, 2024:** Starting today, all existing projects will have a Passthrough Rollouts section in each Project’s settings page. This will give you an option to enable this setting ahead of the switchover date. All new Projects created from this date forward, will have passthrough rollouts as the default behaviour.
- **August 14, 2024:** All projects will switch to Passthrough Rollouts enabled by default, and will no longer be available as an option on the Project settings page. If your team is leveraging a server-side SDK, your team must upgrade your SDK before this date, as Passthrough Rollouts require specific DevCycle Server SDK Versions to be deployed.

### *What do you need to do?*

If your team is leveraging a server-side SDK, your team must upgrade your SDK before **August 14, 2024** as Passthrough Rollouts require specific DevCycle Server SDK Versions to be deployed (with the exception of the PHP SDK, which does not require an SDK update).


- Python: **3.5.0** [![PyPI](https://badgen.net/pypi/v/devcycle-python-server-sdk)](https://pypi.org/project/devcycle-python-server-sdk/) 
- Java: **2.2.0** [![Maven](https://badgen.net/maven/v/maven-central/com.devcycle/java-server-sdk)](https://search.maven.org/artifact/com.devcycle/java-server-sdk)
- Dotnet (Local): **3.1.0** [![Nuget Local](https://badgen.net/nuget/v/DevCycle.SDK.Server.Cloud)](https://www.nuget.org/packages/DevCycle.SDK.Server.Local/)
- Node: **1.29.0** [![Npm package version](https://badgen.net/npm/v/@devcycle/nodejs-server-sdk)](https://www.npmjs.com/package/@devcycle/nodejs-server-sdk)
- Ruby: **2.7.0** [![GitHub](https://img.shields.io/github/stars/devcyclehq/ruby-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/ruby-server-sdk)
- GO: **2.15.0** [![GitHub](https://img.shields.io/github/stars/devcyclehq/go-server-sdk.svg?style=social&label=Star&maxAge=2592000)](https://github.com/DevCycleHQ/go-server-sdk)
- Nestjs: **0.7.0** [![Npm package version](https://badgen.net/npm/v/@devcycle/nestjs-server-sdk)](https://www.npmjs.com/package/@devcycle/nestjs-server-sdk)

