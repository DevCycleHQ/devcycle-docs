---
title: DevCycle Overview
sidebar_position: 1
---

DevCycle is a feature flag platform built for engineering teams of any size, helping you easily create, rollout, and cleanup feature flags without disrupting your workflow.

If you’re unfamiliar with the concepts of feature flagging we suggest checking out the [Martin Fowler post on the subject](https://martinfowler.com/articles/feature-toggles.html).

To help teams fit feature flagging into their development process we’ve taken a different approach than most. This page is a great starting point to understanding how we think about feature flagging and how you can get the most of out of DevCycle.

## Getting Started

If you just want to skip ahead and get started with DevCycle, all you need to do is:

1. Create a new DevCycle [account](https://app.devcycle.com/signup)
2. Implement a DevCycle SDK ([https://docs.devcycle.com/sdk/](https://docs.devcycle.com/sdk/)) on your platform

## DevCycle Structure

The following diagram helps to illustrate the structure of DevCycle’s key concepts. You may refer to this while reading the rest of the contents below.

![devcycle-org-structure.png](/essentials/overview/devcycle-org-structure.png)

## Organizations

The top level of your account where you’ll manage your account settings and users. Typically, each account or business unit has one organization, and organizations can have multiple Projects that are separated by your products.

## Projects

Projects are the primary mechanism in DevCycle for organizing your workspaces. Projects are typically separated by product line and most features including Features, Variables, Environments and Audiences are distinct by Project. Users will have visibility into all Projects within an Organization.

## Environments

Environments in DevCycle are meant to be mapped to the environments that exist within an organization’s development lifecycle. They are used to separate the release of Features across the different environments. 

All Projects within DevCycle start with three initial Environments (these can be customized and more may be added):

- Development
- Staging
- Production

These environments, along with any you’ve added, will be included in all Features that you create eliminating the need to create a separate Feature for each environment. 

Each environment has its own set of SDK keys for Client-Side, Mobile, and Server-Side SDKs. 

## Keys

There are two types of Keys in DevCycle, an SDK Key and an API Key. 

**SDK Key:** This key is used for DevCycle SDKs and the Bucketing API. Due to unique security requirements and constraints for each platform, SDK keys are separated into Server, Mobile, and Client keys. Each Environment will have its own unique set of server, mobile and client-side SDK keys.

**API Key:** This key is used for the DevCycle Management API which is a set of endpoints that are used to replicate day-to-day tasks on the dashboard. i.e. CRUD operations for Features, Variables, Audiences, etc.

## Features

Features are the main elements that you work with in DevCycle. They are meant to map to features in your application and they are comprised of Variables and Targeting Rules that will change what your users will see in your application.

Features exist across all Environments. This means that you won’t have to create a separate Feature per Environment you work in. 

Features are unique to each project.

## Variables

Variables are the actual flags that live in your code. They can be grouped within Features and the values they deliver to your application are controlled by the Variations within Features. By default, when a Feature is created, a single Boolean Variable will be created with the same name as the Feature key. 

Features can contain multiple Variables but each Variable can only exist in one feature at a time. You may un-associate a Variable in one Feature to add it to a different Feature.

Variables may be the following types:

- Boolean
- String
- Number
- JSON

## Variations

Variations are different configurations of the Variables and their values within a Feature. For a simple Feature, a Variation can just be setting a single Variable’s value to either true or false. For a more complex Feature like an multivariate Experiment, you may have many Variations that serve different configurations across multiple Variables. By default, release Features are created with two Variations, `Variation On` and `Variation Off`, which can be edited.

## Targeting Rules

Targeting Rules are used to determine which users or entities in your application receive a given Variation of a Feature. You may use our built-in targeting properties or create your own custom properties to segment your users into smaller user groups.

Targeting Rule components:

- **Name**: The name of the targeting rule.
- **Definition**: This is where you’ll define the audience(s) and/or targeting properties.
- **Serve**: The Variation that you’re granting to the current targeting rule’s definition. For experiments, you may use the `Random Distribution` option to split traffic at a set percentage to each Variation.
- **Schedule**: This is used to schedule the distribution of a Variation of the feature at a specific date, or to implement a gradual or phased rollout of the Feature.

If you find that you are often using the same Targeting Rules for multiple Features, try creating Audiences!

### Audiences

Audiences allow you to save a definition of Targeting Rules with a name so that you may reuse them in Features without needing to recreate them each time. You’ll also be able to keep track of the features that your Audiences were used in. This is useful for managing cohorts of users like QA users, beta testers, users in specific loyalty tiers, etc. 

Audiences that you’ve created appear as an option for targeting in all Features.

## A/B Testing & Experimentation

Experimentation and A/B Testing are important parts of a Feature’s lifecycle. Experiments can be as simple as comparing any audiences against a metric or can be fully [randomized](https://docs.devcycle.com/essentials/targeting#serving-a-random-variation-experimentation--random-distribution) A/B tests using statistical methodologies. 

The primary concept of an experiment is the need to have at least two different experiences to compare performance. Any Feature in DevCycle can be turned into an experiment, and it only requires the following:

1. At least two Variations served to your users.
2. At least one Metric defined and attached to your feature.

Once set up, you can track the experiment's progress and determine whether there is a winning variant from within the Feature’s Experiment Results page.

### Metrics

Metrics (or Goals), can be used to track the impact of your Feature or Experiment against a given KPI. They may be used to quickly assess the health of your Features across Environments, visualize how quickly people are visiting your applications, or determine how much memory is being used by your servers as a feature rolls out. 

When A/B testing, metrics are used to compare the results between the different Variations in order to determine the success or failure of an experiment.

Metrics can be saved and reused across multiple Features.

## Status and Lifecycle

Features have Statuses that indicate their current position in the Development Lifecycle. The statuses are a succinct way to understand a Feature's state, and each status has its own unique properties.

DevCycle’s Feature Statuses are:

- In Progress
- In Review
- Completed

Each status has unique properties that affect how a Feature behaves, can be interacted with, or is displayed in the dashboard. Statuses only change when a user interacts with a Feature. Ex: Marking a Feature as completed.