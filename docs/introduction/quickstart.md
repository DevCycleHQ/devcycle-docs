---
title: Quickstart
sidebar_position: 1
---

The first thing you need to do to get started with DevCycle is to create an account and organization and add any colleagues to that organization. This page will get you up and running with a Free Account in a couple minutes.

If you already have an account feel free to skip ahead to shipping [Create a Feature](#2-create-a-feature) with DevCycle.

`youtube:https://www.youtube.com/watch?v=bZD-pyKGwR4`

---

## 1. Create a New Account

If you don't yet have an account with DevCycle that's not a problem! [Simply make a completely free account right here.](https://app.devcycle.com/?isSignUp=true)

We have an always free tier to start and the pricing will scale with usage as you need. You can create a free account right away, and if you're curious about our pricing, [check it out here](https://devcycle.com/pricing)

:::info
When you first sign up, you will notice that you will be prompted to create an [Organization](/essentials/organizations). An organization is where you'll be able to put all of your projects, and invite all of your team members. If signing up with a non-generic email, you may notice that others with your company email may have signed up and created an organization already. [Read more about organizations here.](/essentials/organizations)
:::

---

## 2. Create a Feature

This quickstart outlines how to create and manage within the DevCycle Dashboard, however, features may also be created via the [DevCycle Management API](/management-api/) or [CLI](/cli).

On the DevCycle Dashboard, the "Feature Management" page can be accessed at any time via the button on the top bar. In this page there is a button to "Create new Feature". Additionally, there is a "+" button in the header bar. Both of these buttons can be used to begin the Feature creation process on the DevCycle Dashboard.

:::info

If you are coming from another Feature Flagging or Feature Management tool, be sure to check out the [DevCycle Feature Importer](/integrations/feature-importer)

:::

To create a Feature:

1. Click either the "+" button or the "Create new Feature" button

2. A screen for deciding your Feature Type will now appear:

    a. Choose your feature type to begin the creation process. To read more about the feature types and their uses, read [DevCycle Feature Types](/essentials/features)

4. After choosing a type, an information modal will appear:

    **a. Enter a descriptive Feature Name**

    **b. Enter a unique feature key.** This key is how the feature and its variables will be referenced in code. (A key will be automatically suggested based on the entered name.)

    **c. Enter a unique Initial Variable Key.** 
    Initial Variable Key allows you to define an initial variable key that can differ from the new feature key name. As you type in the Feature Name, the feature Key and the Initial Variable Key will mimic whatever input is entered in the Feature Name field formatted in kebab case.

    **d. Select the Initial Variable Type.** 
    Initial Variable Type allows you to select the type of variable for the initial variable created along with your feature (Boolean, JSON, String, or Number).

    **e. Optionally, you may choose to provide a detailed description of the feature.**

    **f. Click "create"**

:::info
You have now created a Feature within your project!
:::

### Targeting Across Environments

Within DevCycle, all targeting rules of each feature are specific to Environments. This allows you to provide different rules and access across every stage of the feature's deployment. All of an Environment's targeting can be managed directly within the Feature's page itself.

:::info

 When a feature is created within DevCycle, it is automatically created across _all_ environments that are defined in your project. To read more on managing environments, read [Managing Environments](/essentials/environments).
 
:::

Once it is known how the feature should be managed and who it should target, you can now [turn the feature on](#).

With DevCycle, in one click any feature can instantly be shut off for all users on any of your environments. If a feature is wrapped in a DevCycle variable, then it can be managed easily remotely without needing to re-deploy your application.

To manage a Feature, navigate to the Features's page and find the Environment you wish to manage the Feature within in the `Users & Targeting` section of the `Managing Feature` sidebar.

Each Environment is managed individually and has its own toggle. To turn a Feature on or off, use the Targeting Status toggle. After the change is made, save it to propagate the change across all devices within that environment.

#### Behavior of "off" and "on" features

When a feature is either "on" or "off", the sdk or api referencing it will have different values for its variables.

**When a feature is Off**

Currently, when a feature is is in an OFF state on an environment, DevCycle will not deliver that feature to any users within that environment. Instead, DevCycle will respond with whatever default is set within the SDK or api call.

> For information on how targeting users and using features when they are turned on, read [Targeting Users](/essentials/targeting).

---

## 3. Evaluate a Variable

### Setting up a DevCycle SDK

Deeper documentation can be found in the relevant SDK docs. Depending on your use case, DevCycle has various types of SDKs. [Read more about our server-side, mobile, and client-side SDKs here.](/sdk/)

The easiest way to ensure a proper SDK setup is to first [set up a feature flag on the DevCycle dashboard or API].

Once you have chosen your preferred SDK, set up the SDK:

**1. Install the DevCycle SDK via the relevant dependency manager.** For example, the react SDK is installed via npm: ```npm i @devcycle/react-client-sdk```

**2. Import DevCycle and initialize it.** Depending on which [type of SDK](/sdk/) and which environment you are initializing for, the SDK Key the SDK is initialized with will be different. Read more about Environments and keys [here](#to-do).

**3. Access your feature flag or variables.** The SDK can return a feature, a specific variation, or a specific variation of a Feature. Read more about variables and variations [here](/essentials/variables).

**Defaults and Connectivity**

In the event that a user is not being targeted by the referenced feature, or if DevCycle has no connection, there are defaults and fallbacks in place to ensure that the SDKs still operate without concerns of crashes or no-ops.

When DevCycle initializes, it collects and stores all Feature configurations for the user. In the event that there is no connection to DevCycle, the SDK will first attempt to reference any locally stored Feature configuration. If this configuration is not available, DevCycle will always return the default configuration which is defined in the code.

> In the event that a user is not a part of the referenced Feature, the DevCycle SDKs will return the default configuration which is defined in the code.
