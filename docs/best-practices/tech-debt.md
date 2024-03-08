---
title: Managing Tech Debt by Cleaning Up Unused Flags
sidebar_label: Managing Tech Debt
description: Practices to help minimize technical debt from feature flags
sidebar_position: 6
sidebar_custom_props: { icon: material-symbols:cleaning-services }
---

Feature flags are a powerful tool for controlling the release of new features, running experiments, and practicing
trunk-based development. However it's no secret that they come with trade-offs. A feature flag that is left in code
long after it has served its purpose can become a source of technical debt. This article will discuss the risks of
accumulating technical debt from feature flags, and how DevCycle can help you identify and remove flags that are no
longer needed.

## Risks of technical debt

Allowing tech debt to accumulate makes it significantly more difficult to maintain a system and its code.

One risk of tech debt is the increase in code complexity, making the system harder to maintain and test.
For instance, if a release flag has been completely rolled out and serves “Variation On” for all users, the code for
“Variation Off” will never get called. If you keep a dead code path for a long time, chances are that developers will
forget why it existed. Developers might avoid removing it later for fear of breaking the system.
Failing to remove feature flags and their variables at the appropriate time causes cluttered code.

Another risk of technical debt with feature flags is an unintended fallback to an undesirable value.
For example, if you’d like to redesign your application UI, it would be typical to create a flag and have the
current UI as its default while you’re still working on the new UI. Once you have completed the new UI and rolled it
out to all users, the flag no longer serves its purpose. Keeping the flag increases the chances of falling back to the
old UI if the flag is accidentally turned off or if a system fails to integrate the SDK.

It's therefore important to stay on top of your feature flags and remove them when they are no longer needed.

## When to remove a flag

The decision to remove a flag depends on what “type” of flag it is. DevCycle believes strongly in the philosophy
described in the article **[Feature toggles (aka Feature Flags)](https://martinfowler.com/articles/feature-toggles.html) by Pete Hodgson**
To summarize, there are four types of flags with varying expectations of their "lifespan" and when they should be removed:

**Release**

A flag which controls the release of a new feature. When the feature is fully released, the flag should be removed once
the team is confident that the feature is stable and does not need to be turned off.

**Experiment**

A flag which controls an A/B test between multiple possible variations. Once the results of the experiment have 
reached statistical significance and a winning variation can be determined, the flag should be replaced with the value
of that winner.

**Ops**

These flags are used to control operation aspects of the system. They are expected to be long-lived and remain in code,
and can be used for things such as turning off optional and non-essential features in the event of high load.

**Permission**

These flags are used to control access to a feature based on user permissions. They are expected to be long-lived and
remain in code, and can be used for things such as turning off features for users who do not have the correct permissions
to access them. 

As you can see, Release and Experiment flags are expected to be short-lived and removed when no longer needed, whereas
Ops and Permission flags are expected to be long-lived and remain in code.

## Lifecycle of a feature
Features that are not expected to stay in code forever (ie. Release and Experiment features) generally go through a
similar set of lifecycle steps.

For a release feature:
1. Feature Variables are added to code and the Feature is set up in DevCycle
2. Feature is enabled for various subsets of users throughout development
3. Feature is enabled for all users when it is complete
4. Feature is considered "complete" once it is fully released and stable, and the ability to turn it off is no longer
necessary
5. Feature's Variables are removed from code
6. Once it can be verified that the Variables are no longer used in any running code, the Feature on DevCycle can be 
archived

For an experiment feature:
1. Feature Variables are added to code and the Feature is set up in DevCycle
2. Feature is enabled for a subset of users that are part of the experiment
3. Feature is considered "complete" once it has reached statistical significance, and the winning variation can be determined.
4. Feature's Variables are removed from code and replaced with the winning variation's values
5. Once it can be verified that the Variables are no longer used in any running code, the Feature on DevCycle can be
   archived

## Identifying flags that should be removed
Luckily, DevCycle includes these four feature types as a first-class concept in our platform. Every time you create a 
new Feature, you are asked to choose which of these four types it falls under. You can then filter your features by those
types on the dashboard to keep track of active releases, experiments etc.

DevCycle also includes the ability to mark a feature as "completed", which is a half-way step between being done with
a feature and fully removing it from your code. Completion allows you to serve a single variation of the feature to all
users and prevent further changes to its configuration. In this state, DevCycle will ensure your code continues to 
receive the correct final state of the feature, like the "released" state of a Release-type feature. For more information,
see [Feature Status & Lifecycle](/essentials/status-and-lifecycle)

The next step is to remove the feature's variables from your code, and eventually archive the feature in DevCycle
so that it no longer appears in the list of active features.

## Safely Removing Flags
Once flags that should be removed are identified, the next step is to clean them out of the code. DevCycle provides
many helpful tools to assist with this.

### Code Usages
DevCycle's Code Usages feature allows our system to analyze your source code and automatically identify places
where a given variable is being used. 
The Code Usages feature can be used locally with our CLI, or as part of an integration with various source control
systems such as Github and Bitbucket.

#### Locally
To use it locally, make sure you have the CLI [installed and configured](https://docs.devcycle.com/cli/#setup)
You can then run the following command to list places in your code where a DevCycle variable is used:
```bash
dvc usages 
```
This will output a list like the following:
```
1. show-change-plans
	- src/components/layouts/BillingOptionsLayout/BillingOptions.tsx:L37
2. show-documentation-button
	- src/components/layouts/DashboardLayout/DashboardComponents.tsx:L167
3. show-discord-button
	- src/components/layouts/DashboardLayout/DashboardComponents.tsx:L173
```

Look for the variable you're trying to remove to identify all the places where its usage was detected.

#### VSCode Extension
You can also view usages information locally using the [VSCode Extension](/integrations/vscode-extension). Setting it up
will allow you to see usages directly in your editor, and jump to the location in source code.

#### Source Control Integration
If you have the Code Insights integration set up with your source control system, you can view the same information
directly in the DevCycle dashboard. 

![Usages in Dashboard](/code-usages/usage-in-dashboard.png)

To set up the integration, follow the instructions for your source control provider in the [Integrations section](/integrations#code-analysis).

### CLI Cleanup

Currently only supported in JavaScript, Node and React SDKs.

Our CLI provides the functionality of removing all instances of a feature flag automatically.

The `dvc cleanup` command scans your code for all instances of a DevCycle Variable through the provided key.
All evaluations are changed directly to the value provided, and any logic such as `if` statements that were checking
the variable's value will be logically simplified, eliminating dead code paths.

#### Demo Video

https://youtu.be/yIGkjdQ_Yd0

## Track and Organize Removed Flags

When a Variable is done its journey in DevCycle, the final step is to archive it. Doing so will hide the variable
from most views in the dashboard, and indicates that the Variable is no longer used in your project.

### Feature Flag Usage Detection
The DevCycle dashboard can tell you when a variable is no longer used by your application and is safe to archive in the platform.
It does this by combining two sources of information:
- usages in code, detected by the Code Insights tooling described above
- evaluation events automatically collected by the SDK

These pieces of information will give you a clear picture of whether a variable is still referenced in your code, and 
whether it is still being evaluated in your application.

When you mark a feature as "complete" in DevCycle, the dashboard will show you a list of all the variables used by that
feature, and whether they are still being used in your code. This can help you identify which variables still need to be
removed.

![Completed Feature Variable Cleanup](/code-usages/completed-cleanup.png)

When the dashboard indicates a variable is no longer used, you can now proceed to "archive" the variable, completing
its journey in DevCycle.

## Other ways to reduce feature flag tech debt

**Have human-understandable names.** Naming conventions help other developers know the purpose of each feature flag or 
variable. This makes it easier to determine what flags are still in use. Obscure names such as “flag123_dont_delete” 
make it difficult to determine its importance and use. It would be incredibly burdensome to have to examine the code 
to understand its original purpose.

**Utilize the description section**. Some helpful information you might include in a feature’s description is its 
purpose and its variables' roles. Since you are unable to change variable keys (which is how they are identified), 
the description is a useful place to store more variable context when necessary.

**Schedule flag reviews.** Scheduling monthly or quarterly flag reviews helps your team identify which flags should be
retired. These reviews can even coincide with sprints that tackle other technical debt. One way to implement flag
cleanups is to divide a set of feature flags amongst the team and have the team review them. They may make pull
requests for flags that must be removed from the code.

**Set up a time bomb** A more extreme approach, but one that is used successfully by some teams, is to start failing
CI builds with a so-called 'time bomb' when a flag that is known to be obsolete is still detected in the code. 
This can be accomplished through a combination of the CLI's `usages` command and calls to the DevCycle API to get a
list of the variables that are present in "completed" features. 

## Putting it all together
With the full set of integrations described here all set up, an end-to-end flow of keeping on top of your unused
flags emerges:
1. When a feature is complete, mark it as such in DevCycle
2. View the list of variables in the completed feature to see which ones are still in use
3. Use the Code Usages detection via the CLI, VSCode extension, or dashboard to identify places in code that need to be
modified to remove the variable
4. Remove the variable from code, or if using Javascript, use the `dvc cleanup` command to do it automatically
5. If the dashboard reports that the variable is no longer used, archive it in DevCycle.

## Summary

DevCycle provides many tools for taming your flags throughout your projects. 
They help you determine whether flags are being used, where your variables are being referenced, and whether or not it 
is safe to remove a flag from your code. Clean up your feature flags regularly to improve the quality of your code and 
the efficiency of your team.
