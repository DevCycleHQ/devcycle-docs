---
title: Feature Opt-In Implementation
sidebar_position: 2
---

## Overview

Feature Opt-in is a feature that allows end users of your product to opt-in to a list of eligible features through a pre-built component that can be implemented in your app and website with one line of code. Your team has the ability to customize the look & feel of this component to your company's colour profile and logo. 

This article explains how to implement our Feature Opt-in functionality on your app or website. 

## Requirements

To get started with the Feature Opt-In functionality all you need are running features in DevCycle and a page that you can install the iFrame into.

## Getting Started

The Feature Opt-In functionality can be turned on from the [Organization Settings](https://docs.devcycle.com/docs/home/feature-management/organizing-your-flags-and-variables/organizations-projects#organization-settings) page.

Once here, navigate to the "Feature Opt-In" page of the settings:

![Feature Opt In Settings](/oct-7-2022-feature-opt-in-1.png)

Feature Opt-In is enabled at the project level. It needs to be enabled manually because it leverages EdgeDB to manage opt-in state. This means that enabling Feature Opt-In on a project can impact billing for your account. For more information visit our [pricing page](https://devcycle.com/pricing). To enable Feature Opt-In select the desired project and toggle "Opt-In Disabled" to enabled.

![Enable Feature Opt In](/oct-7-2022-feature-opt-in-2.png)

From here, you can customize the heading, colours, image, and descriptive text of the opt-in widget. Under the customization settings, there is a preview of the Opt-In component where you can preview what the widget will look like based on the settings you choose.

![Feature Opt In](/oct-7-2022-feature-opt-in-3.png)

 Below the customization options is the iFrame code snippet and a live preview of the widget. Select the environment you would like to test or implement in the dropdown and insert any user ID to validate what the widget will look like for a given user by clicking "Open Preview".
 
 The two most important parts of the iFrame code are the environment key and user ID. Make sure that you are setting the right key for the environment the widget will be displayed in and ensure you always pass the relevant user ID for the user that is interacting with the widget.

![Feature Opt In iFrame](/oct-7-2022-feature-opt-in-4.png)

## Select Features to be Eligible for Feature Opt-In

To make sure only the right features are added to the Feature Opt-In widget you need to explicitly enable Opt-In on each feature that you want to show up.

Make a specific feature eligible for Opt-in by clicking the toggle under the feature settings section. This sets  `Opt-In` to `true` on the Feature model and when `Opt-In` is true, the feature will appear in the Feature Opt-In iFrame widget.

![Enable Feature for Opt In](/oct-7-2022-feature-opt-in-5.png)

### Targeting

When `Opt-In` is true at the feature level, a special `Opt In` targeting rule will now appear in each environment. This allows teams to be explicit about what happens when a user enables a feature for themselves. It also allows you to set overrides if you would like, based on the priority order of targeting rules and where the Opt-In rule sits.

![Opt In Targeting Rule](/oct-7-2022-feature-opt-in-6.png)

When it is selected, any users who have toggled the feature in the Opt-In widget will receive the selected variation. In this way, if you modify the text description for a feature you can have the toggle customize what is being served however you would like.

When Opt-In is enabled for a feature the special targeting rules cannot be deleted, to remove the Opt-In targeting rules you must disable Opt-In entirely for the feature. This will automatically remove all of the special targeting rules.
