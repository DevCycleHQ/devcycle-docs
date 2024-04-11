---
title: Key Features
sidebar_position: 2
---

# Key Features

DevCycle is a comprehensive feature flag management platform with a wide range of features. The following page
serves to illustrate some of the key capabilities of the platform.

#### SDKs for Every Platform
DevCycle provides SDKs for every major platform, and certain frameworks within those platforms.

See the full list on the [SDKs page](/sdk).

#### Fast Global Response Times
The APIs serving DevCycle SDKs are globally distributed and extremely fast, serving most requests in under 100ms.

For more information, see [System Architecture](/introduction/architecture).

#### Targeting and Segmentation
Precisely configure who or what should receive a flag value.
Combine conditions with boolean logic to create complex targeting rules.

[Learn more](/essentials/targeting)

#### Reusable Targeting Rules
Easily reuse a common targeting rule configuration, and apply it across multiple flags.

[Learn More](/extras/advanced-targeting/audiences)

#### A/B Testing and Experimentation 
Test multiple variations of a feature in production, and measure the impact on key metrics.

[Learn More](/extras/metrics/feature-experimentation)

#### Schedules and Rollouts
Schedule a flag to be enabled at a certain time, or gradually roll it out to percentages of users. 

[Learn More](/extras/advanced-targeting/rollouts)

#### Realtime Updates
Make changes to flag configurations and see them pushed in real time to all users. Quickly turn off broken features, or
give access to new features without requiring a refresh.

[Learn More](/sdk/features#realtime-updates)

#### Easy Overriding of Your Own Flag Values
Override the flag values being served to you, without risky modification of targeting rules. Test upcoming features 
in production, debug issues with different flag values, and more.

[Learn More](/extras/advanced-targeting/self-targeting)

#### Schematized Flags for Safe Configuration
Allow developers to hand off configuration of flags safely, by enforcing schemas that determine what values a flag
can be set to.

[Learn more](/extras/advanced-variables/variable-schemas)

#### Permissions
Govern who can access and modify flags configurations in production. 

#### Editor Integrations
Access DevCycle information directly from your editor. Detect and jump to flag usages, and quickly see whether flags are enabled
in each environment.

[Learn More](/integrations#ide-plugins)

#### Flag Usage Detection and Cleanup
Keep on top of which flags are being used in your codebase, and clean up unused ones to prevent tech debt. 

[Learn More](/best-practices/tech-debt#code-usages)

#### Type Safety and Code Generators
Ensure that your code is using flag names that actually exist, and that flag values are being used correctly.

[Learn More](/sdk/client-side-sdks/javascript/javascript-typescript)

#### Audit Log
Easily see a history of changes to flags, including who performed each change. 

[Learn More](/extras/audit-log)

#### Gitops and Terraform
Manage your DevCycle configuration as code, and apply changes to your configuration in a controlled manner using Terraform

[Learn More](/integrations/terraform)

#### Webhooks and Integrations
Notify external systems of changes to your flags. Link flags with project management tools like Jira, or see a feed
of updates in Slack. See changes in your monitoring systems and alert on potential issues.

[Learn More](/integrations)
