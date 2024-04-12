---
title: Key Features
sidebar_position: 2
---

# Key Features

DevCycle is a comprehensive feature flag management platform with a wide range of features. The following page
serves to illustrate some of the key capabilities of the platform.

## Basics

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

## Cool Stuff

#### Managed Feature Opt-In
Easily add a full feature opt-in experience to your application to allow end users to control their experience.
One line of code, and DevCycle does the rest.

[Learn More](/extras/advanced-targeting/feature-opt-in)

#### Global User Database
Store user attributes in a fast, globally-replicated database and target users based on those attributes. Import data from
other systems for use in targeting rules.

[Learn More](/extras/edgedb)

## Development Tools
#### Easy Overriding of Your Own Flag Values
Override the flag values being served to you, without risky modification of targeting rules. Test upcoming features
in production, debug issues with different flag values, and more.

[Learn More](/extras/advanced-targeting/self-targeting)

#### Editor Integrations
Access DevCycle information directly from your editor. Detect and jump to flag usages, and quickly see whether flags are enabled
in each environment.

[Learn More](/integrations#ide-plugins)

#### CLI
Configure flags right in the terminal, or override your own flag values for development. 

[Learn More](/cli)

#### Flag Usage Detection and Cleanup
Keep on top of which flags are being used in your codebase, and clean up unused ones to prevent tech debt.

[Learn More](/best-practices/tech-debt#code-usages)

#### Type Safety and Code Generators
Ensure that your code is using flag names that actually exist, and that flag values are being used correctly.

[Learn More](/sdk/client-side-sdks/javascript/javascript-typescript)

#### Gitops and Terraform
Manage your DevCycle configuration as code, and apply changes to your configuration in a controlled manner using Terraform

[Learn More](/integrations/terraform)

## Safety and Compliance

#### Permissions
Govern who can access and modify flags configurations in production.

#### Schematized Flags for Safe Configuration
Allow developers to hand off configuration of flags safely, by enforcing schemas that determine what values a flag
can be set to.

[Learn more](/extras/advanced-variables/variable-schemas)

#### Audit Log
Easily see a history of changes to flags, including who performed each change. 

[Learn More](/extras/audit-log)

## Monitoring and Observability

#### Webhooks and Integrations
Notify external systems of changes to your flags. Link flags with project management tools like Jira, or see a feed
of updates in Slack. See changes in your monitoring systems and alert on potential issues.

[Learn More](/integrations)
