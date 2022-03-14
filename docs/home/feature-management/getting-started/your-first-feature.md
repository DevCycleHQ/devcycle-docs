---
title: Your First Feature
sidebar_position: 2
---

## Overview

This article serves as a guide on how to create and manage Features within DevCycle. This will outline how to create and manage within the DevCycle Dashboard, however, features may also be created via the [DevCycle Management API](https://docs.devcycle.com/management-api/).

## Creating a Feature

On the DevCycle Dashboard, the "Feature Management" page can be accessed at any time via the button on the top bar. In this page there is a button to "Create new Feature". Additionally, there is a "+" button in the header bar. Both of these buttons can be used to begin the Feature creation process on the DevCycle Dashboard.

To create a Feature:

1. Click either the "+" button or the "Create new Feature" button

![DevCycle Feature Dashboard with arrows highlighting the create button on the page as well as the persistent button in the top bar](/december_create.png)

2. A screen for deciding your Feature Type will now appear:

![Screenshot of types modal showing different feature types](/december_2021_types.png)

3. Choose your feature type to begin the creation process. To read more about the feature types and their uses, read [DevCycle Feature Types](/docs/home/feature-management/getting-started/feature-types)

4. After choosing a type, the information screen will appear:

![Modal which shows information necessary to create a Feature](/december_2021_create_modal.png)

5. Enter a descriptive Feature Name

6. Enter a unique feature key. This key is how the feature and is variables will be referenced in code. (A key will be automatically suggested based on the entered name.)

7. Optionally, you may choose to provide a detailed description of the feature.

8. Click "create"

You have now created a Feature within your project!


## Targeting Across Environments

**Note: When a feature is created within DevCycle, it is automatically created across _all_ environments that are defined in your project. To read more on managing environments, read [Managing Environments](/docs/home/feature-management/organizing-your-flags-and-variables/environments).**

Within DevCycle, all targeting rules of each feature are specific to Environments. This allows you to provide different rules and access across every stage of the feature's deployment. All of an Environment's targeting can be managed directly within the Feature's page itself.

![Feature sidebar highlighting Environments](/december_2021_environments.png)

Once it is known how the feature should be managed and who it should target, you can now [turn the feature on](/docs/home/feature-management/getting-started/toggling-features).



