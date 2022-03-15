---
title: Turning Features On and Off
sidebar_position: 4
---

## Overview

With DevCycle, in one click any feature can instantly be shut off for all users on any of your environments. If a feature is wrapped in a DevCycle variable, then it can be managed easily remotely without needing to re-deploy your application.

This article will cover how to easily turn a Feature on or off easily within the DevCycle dashboard.

## Toggles per Environment

To manage a Feature, navigate to the Features's page and find the Environment you wish to manage the Feature within:

![Feature sidebar highlighting Environments](/march-2022-environments.png)


Each Environment is managed individually and has its own toggle. To turn a Feature on or off, use the Targeting Status toggle:


![User Targeting Section of a Feature, arrow pointing to targeting status toggle](/december_2021_env-toggle.png)

After the change is made, save it to propagate the change across all devices within that environment.

## Behavior of "off" and "on" features

When a feature is either "on" or "off", the sdk or api referencing it will have different values for its variables.

For information on how targeting users and using features when they are turned on, read [Targeting Users](/docs/home/feature-management/features-and-variables/targeting-users).

### When a feature is Off

Currently, when a feature is is in an OFF state on an environment, DevCycle will not deliver that feature to any users within that environment. Instead, DevCycle will respond with whatever default is set within the SDK or api call.