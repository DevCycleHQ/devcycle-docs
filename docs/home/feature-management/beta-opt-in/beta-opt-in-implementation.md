---
title: Beta Opt-In Implementation
sidebar_position: 2
---

## Overview[](https://docs.devcycle.com/docs/sdk/features/reset#overview)

Beta Opt-in is a feature that allows end users of your product to opt-in to a list of eligible beta features through a pre-built component that can be implemented in your app and website with one line of code. Your team has the ability to customize the look & feel of this component to your company's colour profile and logo. 

This article explains how to implement our Beta Opt-in functionality on your app or website. 

## Requirements

To get started with the Beta Opt-In functionality all you need are running features in DevCycle and a page that you can install the iFrame into.

## Getting Started

The Beta Opt-In functionality can be turned on from the [Organization Settings](https://docs.devcycle.com/docs/home/feature-management/organizing-your-flags-and-variables/organizations-projects#organization-settings) page.

Once here, navigate to the "Beta Opt-In" page of the settings:

![Beta Opt In Settingses](/sept-20-2022-beta-opt-in-1.png)

![Enable Beta Opt In](/sept-20-2022-beta-opt-in-2.png)

From here, you can customize the heading, colours, image, and main text of the opt-in prompt.  

![Beta Opt In](/sept-20-2022-beta-opt-in-3.png)

Under the customization settings, there is a preview of the Opt-In component as well as a code block with the component inside an iFrame. The two most important parts of the iFrame are the environment key and user ID. Make sure that you are setting the right key for the environment the widget will be displayed in and ensure you always pass the relevant user ID for the user that is interacting with the widget.

![Beta Opt In iFrame](/sept-20-2022-beta-opt-in-4.png)

## Select Features to be Eligible for Beta Opt-In

To make sure only the right features are added to the Beta Opt-In widget you need to explicitly enable Opt-In on each feature that you want to show up.

Make a specific feature eligible for Opt-in by clicking the toggle under the feature settings section. This sets  `optIn` to `true` on the Feature model

When `optIn` is true, the feature will appear in the opt-in component.

![Enable Feature for Opt In](/sept-20-2022-beta-opt-in-5.png)

### Targeting

When `optIn` is true, the `Opt In` option appears in the targeting definition dropdown. This allows teams to be explicit about what happens when a user enables a feature for themselves. It also allows you to set overrides if you would like based on the priority order of targeting rules and where the Opt-In rule sits.

![Opt In Targeting Rule](/sept-20-2022-beta-opt-in-6.png)

When it is selected, any users who have toggled the feature in the Opt-In widget will receive the selected variation. In this way if you modify the text description for a feature you can have the toggle customize what is being served however you would like.