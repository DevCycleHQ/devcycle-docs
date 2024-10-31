---
title: Key Features
sidebar_position: 2
---

# What Makes Us Different

DevCycle is a comprehensive feature flag management platform with a wide range of capabilities. We believe that modern software development processes require feature flagging in order to be successful. For feature flagging to provide its full value, developers need to embed it into their workflow. So DevCycle is designed for the developer first, but with the whole team in mind.

Here are the core concepts and features behind them that we think make us different.

## Protect Production Without Getting in Your Way
For feature flagging to be effective, all team members need to be able to operate without fear of breaking production. We use a balance of guardrails, permissions and observability to ensure all users have confidence in the actions they are taking.

Here's how:
- Govern who can modify flags in production using [Permissions](/platform/security-and-guardrails/permissions).
- Allow non-technical users to modify flag values safely, by enforcing [schemas](/platform/security-and-guardrails/variable-schemas).
- Easily see a [detailed history](/platform/security-and-guardrails/audit-log) of all changes to flags.
- Write type-safe code using our [Code Generators](/sdk/client-side-sdks/javascript/javascript-typescript).
- Ensure a predictable process for changing flags using Gitops and [Terraform](/integrations/terraform).

## Manage Flags Without Leaving Your Workflow
Excellent developer tools reduce context-switching away from code as much as possible. Each user has a core set of tools that they use to do their work, it is our job to make those tools better. So we've built a set of tools to help you stay in the flow regardless of how you work.

Here's how:
- Use the [CLI](/cli) and [Editor Plugins](/integrations#ide-plugins) to manage flags without interrupting your work. 
- Detect and jump to flag usages in code, and quickly see whether flags are enabled in each environment. 
- [Override](/platform/testing-and-qa/self-targeting) your own flag values for development or testing in production.

## Feature Flagging is a Team Sport
Feature flags are most valuable when all team members are part of the process. A feature flag's purpose, state and impact should be obvious and discoverable to all users.

Here's how:
- We never [bill](https://devcycle.com/pricing) on seats.
- Group multiple related flags and change their values together using [Features](/essentials/feature-hierarchy).
- Link your flags to productivity tools like [Jira](/integrations/jira) or [Slack](/integrations/slack).
- Safely QA your flags in development or right in production with [Self-Targeting](/platform/testing-and-qa/self-targeting).

## Features Aren't Complete Until Flags Have Been Removed
Old, unused flags are tech-debt that create operational risk. This means that the process of removing flags is as important as creating them.

Here's how you can keep your feature flagging environment clean in DevCycle:
- Keep on top of which flags are actually being used in your codebase with
[Code Usage Detection](/best-practices/tech-debt#code-usages). 
- Mark flags as "[completed](/platform/feature-flags/status-and-lifecycle)" when a feature is released.
- Automatically remove your flags with our [CLI Cleanup](/cli/docs/cleanup) command.

## Let Us Manage User Data
Modern architecture means distributed systems running at the edge. Relevant targeting data isn't always available in all systems or services. So we've built ways to keep our platform fast while managing targeting data for you.

Here's how:
- Store user attributes in a [fast, globally-replicated database](/platform/feature-flags/targeting/edgedb) and target flags based on those attributes. 
- Easily add a full [feature opt-in](/platform/extras/feature-opt-in) experience to your application to allow end users to control their experience.

## Integrate with Any Other Tool
Feature flagging is better when integrated into the rest of your critical tools. While we have a selection of [integrations](/integrations) built and ready for you to install, we understand you may need other integrations so we've made DevCycle as extensible as possible.

See how to integrate your own tools:
- Notify external systems of changes to your flags using [Outbound Webhooks](/platform/extras/webhooks). 
- See changes in your [monitoring systems](/integrations#observability) and alert on potential issues.
- A complete [API](/management-api) and [CLI](/cli) are available to run automations or scripts as necessary.
