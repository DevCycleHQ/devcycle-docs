---
title: Key Features (new)
sidebar_position: 2
---

# What Makes Us Different

DevCycle is a comprehensive feature flag management platform with a wide range of features. Here is what we think
makes us different.

## Ensure Safety When Changing Flags
- Govern who can access and modify flags configurations in production using Permissions.
- Allow developers to hand off configuration of flags safely,
by enforcing [schemas](/extras/advanced-variables/variable-schemas) that determine what values a flag can be set to.
- Easily see a [history](/extras/audit-log) of changes to flags, including who performed each change.
- Write type-safe code using our [Code Generators](/sdk/client-side-sdks/javascript/javascript-typescript).
- Ensure a predictable and reviewable process for changing flags using Gitops and [Terraform](/integrations/terraform).

## Manage Flags Without Leaving Your Workflow
- Use the [CLI](/cli) and [Editor Plugins](/integrations#ide-plugins) to manage flags without interrupting your work. 
- Detect and jump to flag usages in code, and quickly see whether flags are enabled in each environment. 
- Override your own flag values for development.

## Switch Flag Values in Development and Test in Production
- [Override](/extras/advanced-targeting/self-targeting) the flag values being served to you, without risky modification of targeting rules.
- Test upcoming features in production, debug issues with different flag values, and more.

## Keep Your Flags Organized
- Keep on top of which flags are actually being used in your codebase with
[Code Usage Detection](/best-practices/tech-debt#code-usages). 
- Link your flags to productivity tools like [Jira](/integrations/jira) or [Slack](/integrations/slack). 
- Group multiple related flags and change their values together using [Features](/introduction/core-concepts/feature-hierarchy).
- Mark flags as "[completed](/essentials/status-and-lifecycle)" when a feature is released, then use 
Code Usage Detection to help clean them up from your code.

## Let Us Manage User Data
- Store user attributes in a [fast, globally-replicated database](/extras/edgedb) and target users based on those attributes. Import data from
other systems for use in targeting rules.
- Easily add a full [feature opt-in](/extras/advanced-targeting/feature-opt-in) experience to your application to allow end users to control their experience.
One line of code, and DevCycle does the rest.

## Integrate with Any Other Tool
- Notify external systems of changes to your flags using [Outbound Webhooks](/extras/webhooks). 
- See changes in your [monitoring systems](/integrations#observability) and alert on potential issues.
