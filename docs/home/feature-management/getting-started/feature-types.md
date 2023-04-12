---
title: Feature Types
sidebar_position: 5
---

## Overview

Feature Types within the DevCycle dashboard are a way of describing and handling Feature Toggles / Feature Flags in more complex and diverse ways. Typically one would use a Feature Flag tool to do extremely simple toggling of a feature to be on or off. In reality, this simple approach can be very limiting as you become more familiar with the concept of Feature Flags. 

With this in mind, DevCycle prefers to view Feature Toggles as a _part_ of a Feature. A Feature may have one or many toggles, and may have states other than On or Off. A Feature may have something other than a boolean that should be variable across the potential states (or Variations). 

To help with this concept, when creating a Feature in the DevCycle dashboard, you will be able to choose a Type which will pre-fill some options in the Feature and help kick-start your usage of the Feature.

This article outlines the various Feature Types, what they do, and how to think about them. 

For more information on Feature Types and using Toggles, read **[Feature toggles (aka Feature Flags)](https://martinfowler.com/articles/feature-toggles.html) by Pete Hodgson** on the Martin Fowler site. It contains deep information on when to use feature toggles, how to use them, and how to think about them. Much of the DevCycle methodology is based around the concepts in this article. 

## Types within DevCycle

### Release

**Description**

Use a Release Feature Flag to separate a feature from deployment and allow for a true continuous delivery (development) cycle. Use these flags to allow for in-progress features and code to be merged into your main branch without concerns. A release could be transitory or long-term in nature depending on your plans with it. If the Feature is completed and deemed not a risk after reaching a complete rollout, the toggle can be safely removed from your code to keep things clean. 

**Example Uses**

* Ship incomplete, untested, or otherwise unready code to production which will not be turned on.
* Allow product managers to control the release and rollout of a feature on their own schedules.
* Merge incomplete code into main branches without interfering with testing or the release process.
* Coordinate a feature release with a marketing campaign so the feature is not released early but not held back by a deploy. 
* Deploy features at the last moment possible.

**Defaults set in DevCycle**

When a Feature is created with this type, the following will be pre-set in the Feature:
When a Feature is created with this type, the following will be pre-set in the Feature. 

A variable with the chosen type will be created with the Initial Variable Key defined in the Create Feature Modal. This can be considered your "toggle" or "flag".  

There will be two Variations: Variation ON and Variation OFF.

- If you select Initial Variable Type as **Boolean**, the variable will have ON / OFF set to `true` / `false` in each Variation accordingly.
- If you select Initial Variable Type as **JSON**, the variable values for Variation ON and Variation OFF,  will be  `{ “status”:”on”}` and `{ “status”:”off”}` respectively.
- If you select Initial Variable Type as **String**, the variable values for Variation ON and Variation OFF,   are  `on` and `off`  respectively.
- If you select Initial Variable Type as **Number**, the variable values for the Variation ON and Variation OFF, are  `0` and `1` respectively.

For all initial variable types, these are the following Targeting Rule pre-sets: 

- Development and Staging Environments will automatically target "All Users". Rule will be named "All Users"
- Rules will be set to serve Variation ON.
- Development and Staging Environments will be enabled immediately.
- Production Environment will not be enabled and will not have a default rule.

### Ops

**Description**

When releasing features with unknown performance implications, use an Ops Feature Flag to ensure the safety of your systems during the deployment of the feature. These types of Features may have short-lived toggles (once safety is confirmed remove it), or may remain in the system long-term as there may be reasons to have an emergency kill switch. 

**Example Uses**

* Enable a slow rollout of the feature automatically to allow for monitoring of related systems.
* Schedule a full release date of a feature once system stability is confirmed.
* Maintain a persistent kill switch that is easy to hit at any time. 
* Connect this Feature to toggles on other features to all for rollbacks of other related infrastructure when not needed.

**Defaults set in DevCycle**

When a Feature is created with this type, the following will be pre-set in the Feature. 

A variable with the chosen type will be created with the Initial Variable Key defined in the Create Feature Modal. This can be considered your "toggle" or "flag".  

There will be two Variations: Configuration 1 and Configuration 2.

- If you select Initial Variable Type as **Boolean**, the variable values for Configuration 1 & Configuration 2 will be set to `true` / `false` in each Variation accordingly.
- If you select Initial Variable Type as **JSON**,  the variable values for Configuration 1 & Configuration 2 will be set to `{ “key”:”value”}` and `{ “key”:”value”}` in each Variation accordingly.
- If you select Initial Variable Type as **String**, the the variable values for Configuration 1 & Configuration 2 will be set to `string1` and `string2` in each Variation accordingly.
- If you select Initial Variable Type as **Number**, the variable values for Configuration 1 & Configuration 2 will be set to `0` and `1` in each Variation accordingly.

For all initial variable types, these are the following Targeting Rule pre-sets: 

- Development Environments will automatically target the current user (if email is set).
- Rule will be set to Variation Configuration 2.
- Development Environments will be enabled immediately.
- Production and Staging Environments will not be enabled
- Production will have a pre-set stepped rollout of Configuration 2 set up with empty schedules with 10%, 50%, and 100% steps.

### Experiment

**Description**

Experiments can be used to send users down various paths or provide different functionality of a single feature, either as an A/B test or multivariate testing. Experimentation is extremely useful for making data-driven decisions by monitoring the impacts of various code paths. These types of Features can change quite often and should be modified to continually optimize the results of the Experiment. The Experiment type could be used for many things such as:

**Example Uses**

* Personalization: Giving users with specific properties specific variations of a Feature
* Testing Wording on your website or application to drive more engagement or a specific action
* Setting weights as variables on an Algorithm, using various variations to test tweaks of weights
* Test multiple landing pages against each other on a website via url split testing
* Change entire Website or Application flows to reduce drop-offs
* Modify Ad timing to determine ideal length


**Defaults set in DevCycle**

When a Feature is created with this type, the following will be pre-set in the Feature:

A variable with the chosen type will be created with the Initial Variable Key defined in the Create Feature Modal. This can be considered your "toggle" or "flag".  

There will be **Three** Variations: Control, Variation A, and Variation B. Use Control to represent your applications DEFAULT behaviour so it may be compared against the other variations.

- If you select Initial Variable Type as **Boolean**, the variable values for Control, Variation A, and Variation be will be set to  `false` , `false` , and `true` respectively.
- If you select Initial Variable Type as **JSON**, the variable values for all variations will be `{ “key”:”value”}`.
- If you select Initial Variable Type as **String**, the variable values for Control, Variation A, and Variation be will be set to  `string1` , `string2` , and `string3` respectively.
- If you select Initial Variable Type as **Number**, the variable values for Control, Variation A, and Variation be will be set to  `0` , `1` , and `2` respectively.

For all initial variable types, these are the following Targeting Rule pre-sets: 

- Development Environments will automatically target ALL users. Audience name will be called "Testing group."
- Development Environments will be enabled immediately.
- Distribution will be set to 33% / 33% / 33% between Control, Variation A, and Variation B
- Production and Staging Environments will not be enabled and will not have a default rule. 

### Permission

**Description**

A Permission Feature is used to manage different product features that are gated based on specific user's properties. These Features can contain many toggles which define subsets of functionality available to users in this feature. These types of Features in DevCycle can be used for many useful things.

**Example Uses**

* Creating sets of "premium" functions that are OFF for users who are on a free plan.
* Allowing for beta opt-in for new features and functionality
* Gating users based on their permission levels within your platform, each piece of functionality behind a toggle, and each variation being a different role. 
* Allowing all internal users to have a set of features far before release.

**Defaults set in DevCycle**

When a Feature is created with this type, the following will be pre-set in the Feature:

There will be two Variations: Configuration 1 and Configuration 2.

- If you select Initial Variable Type as **Boolean**, the variable values for Configuration 1 & Configuration 2 will be set to `true` / `false` in each Variation accordingly.
- If you select Initial Variable Type as **JSON**,  the variable values for Configuration 1 & Configuration 2 will be set to `{ “key”:”value”}` and `{ “key”:”value”}` in each Variation accordingly.
- If you select Initial Variable Type as **String**, the the variable values for Configuration 1 & Configuration 2 will be set to `string1` and `string2` in each Variation accordingly.
- If you select Initial Variable Type as **Number**, the variable values for Configuration 1 & Configuration 2 will be set to `0` and `1` in each Variation accordingly.

For all initial variable types, these are the following Targeting Rule pre-sets: 

- Development, Staging, and Production Environments will automatically target your organization's Email. Rule will be named "Internal Users"
- Rules will be set to serve Variation ON.
- Development and Staging Environments will be enabled immediately.
