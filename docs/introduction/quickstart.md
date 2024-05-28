---
title: Quickstart
sidebar_position: 1
---

This page will guide you through the initial setup steps with DevCycle.

Whether you follow our guided onboarding flow, or you skip ahead to the dashboard to explore on your own, this quickstart guide will get you up and running with a Free Account and functional feature flags in just a couple minutes.

https://www.youtube.com/watch?v=bZD-pyKGwR4

---

## Create a New Account

### Sign Up

If you don't yet have an account with DevCycle, that's not a problem! [Simply make a completely free account right here.](https://app.devcycle.com/?isSignUp=true)

We have an always free tier to start and the pricing will scale with usage as you need. You can create a free account right away, and if you're curious about our pricing, [check it out here](https://devcycle.com/pricing).

### Verify Email

When you first sign up, you'll be asked to verify your email so that we can ensure security while also making Organizations that were previously created by your colleagues discoverable. After signing up please go to the inbox of the account you signed up with, where you should find an email from our team. If you run into any difficulties verifying your email, such as not receiving the verification email, remember to check your Spam folder. And always feel free to reach out to support@devcycle.com.

### Create Organization

Once you have verified your email you will be prompted to provide your name and then either create an [Organization](/essentials/organizations) or join one if we've detected one associated with your email domain. An Organization is your top-level account in DevCycle, which can contain many [Projects](/essentials/projects) and Team Members.

### Role and Tech Stack

To better guide you through onboarding, we also ask you to identify your role and the tech stack you primarily work with in your Organization. In this way we can customize the onboarding flow as well as guide you toward the code and example apps that makes the most sense for your needs.

---

Once you enter a role and your stack you'll be presented with a choice to either proceed to a focused and guided onboarding experience or to explore on your own. If you'd like to explore on your own, [skip ahead to that section of this guide](#self-exploration-with-example-app).

## Guided Onboarding

The guided onboarding experience leverages our example apps and a focused set of steps to have you up and running with some example feature flags in a matter of minutes. This flow intends to help you understand the core concepts behind DevCycle. Once you are done this onboarding flow, you'll have a fully functional set of feature flags created in your dashboard connected to a running example app that you can then explore further on your own before implementing into your own code.

### Select Language

While you have already told us your stack in the previous step, the guided onboarding focuses on one example app, so this screen allows you to select which language you'd specifically like to run the example app in. This can obviously be different than the stack you identified, just choose whichever language is easiest for you to do some simple exploration in.

### Build and Run Example App

Once you've selected an example app we'll provide you with the way to install, build and run the app locally. The platform detects a running app using your SDK key at this point, so you will be allowed to progress once you've installed and run the example app.

### Learn About Variables, Variations and Targeting

While DevCycle has a lot of unique features, some of the most important ones are how we organize and target feature flags to users. In DevCycle we call feature flags Variables. Variables live in your code and allow you to build conditionals around the values they retrieve. Variables are organized within Features in DevCycle. Features can contain one or many Variables and are the vehicle by which Variables are configured, using Variations. Variations determine a set of values to deliver to each Variable within a Feature. Which Variation a user receives is determined by Targeting Rules.

The onboarding guide steps you through Variables, Variations and Targeting to ensure these base concepts are clear.

### Toggle A Variation

As you can see the example app starts with a number of Variables already configured within the dashboard. To toggle your first Variation within DevCycle follow the instructions to choose a new Variation and observe the change in the example app you're running.

### Create Your Own Variation

Now that you've toggled between Variations you can go back and create a Variation of your own. You can select from a number of predefined values for each Variable. Once you've set up the Variation go back to the Targeting Rule and serve that Variation to yourself in the example app.

### Explore Feature In-Dash

That's it! You've done the most important actions in DevCycle.

What you have now is a fully functioning app, set up with feature flags, connected to your Project. You can now continue to the main dashboard and play around with the example app and its connected Feature however you'd like.

We'd suggest playing around with Targeting Rules and different user properties to customize how Variations are delivered.

---

## Self-Exploration With an Example App

If you choose not to follow the guided onboarding and instead skip ahead to the main dashboard you can still get started quickly and easily with DevCycle by downloading and running an example app connected to your project.

### Download Example App

The first step is to download and run the right example app for your stack. You can find our full selection of <a href="https://docs.devcycle.com/examples" target="_blank">example apps here</a>. Download whichever one you'd like and make sure you modify the app appropriately to leverage the SDK keys from your project.

The keys you need can be found either in your Project settings under Environments & Keys or via the Code Sample section of any Feature.

### Auto-Create Example Feature

Once you have your example app connected to your project and running the next step is to create a Feature to control the example app.

Most of our example apps are standardized so you can use the automated Feature creation link in the example app's README to create a Feature that contains all of the Variables necessary to control the app.

Once you've followed the steps in the Feature creation link, you'll have a Feature that contains a couple of Variables, Variations and Targeting Rules.

### Adjust Variables and Variations

If you'd like, you can edit the values of the Variables and Variations that were auto-populated or create any other Variations that you would like. Variations are the set of values that will be delivered to the example app and all of the Variables are already connected so you can feel free to edit these in any way.

### Modify Targeting

The way Variables are delivered different values to different users is via Targeting Rules. The example feature will have created some initial Targeting Rules, but feel free to modify these however you'd like. If you would like to try targeting off of user data, you can check out the documentation on [Custom Properties here](/topics/advanced-targeting/custom-properties).

### Toggle Variations

The last step is to toggle between different Variations. If you have take the initial Targeting 
Rule that was set up for the example app that is targeting a Variation to All Users you can switch the Variation that is being served to whatever you would like. Hit save and the example app should now reflect the change you just made.

That's it! That's the core functionality of DevCycle in a nutshell. You've just set up and toggled some feature flags running in a live app.

---

## Self-Exploration with Your Own App

If you'd like to get started by just implementing one of DevCycle's SDKs directly into your own app, we can help guid you through that process as well.

Assuming you've created an account, skipped the guided onboarding flow and are now on an empty DevCycle dashboard, follow these steps to get started.

### Create a Feature

On the DevCycle Dashboard, the "Feature Management" page can be accessed at any time via the `Features` button on the top navbar. Once there you can click the blue `+ Create New Feature` button (or can select the "+" button in the main navbar) to begin the Feature creation process.

To create a Feature:

1. Click either the "+" button or the "Create new Feature" button

2. A screen for deciding your Feature Type will now appear:

    a. For the purposes of getting started, just pick a Release Feature (it's the most common type of Feature). To read more about the Feature types and their uses, read [DevCycle Feature Types](/essentials/features).

3. After choosing a type, the modal will progress to allow you to name and describe your Feature where you will be prompted to enter:

    **a. A descriptive Feature name**

    **b. A unique Feature key.** This key is how the Feature and its Variables will be referenced in code. (A key will be automatically suggested based on the entered name.)

    **c. A unique Initial Variable Key.** 
    Initial Variable Key allows you to define an initial Variable key that can differ from the new Feature key name. As you type in the Feature Name, the Feature Key and the Initial Variable Key will mimic whatever input is entered in the Feature Name field formatted in kebab case.

    **d. The Initial Variable Type.** 
    Initial Variable Type allows you to select the type of Variable for the initial Variable created along with your Feature. The Variable can be Boolean, JSON, String, or Number.

    **e. Optionally, you may choose to provide a detailed description of the feature.**

    **f. Click "create"**

Congratulations! You have now created a Feature within your project.

---

### Implement the DevCycle SDK and your First Variable

Now that you have a Feature created, its time to install the SDK and implement your first Variable:

**1. Install the DevCycle SDK via the relevant dependency manager.** For example, the react SDK is installed via npm: ```npm i @devcycle/react-client-sdk```

**2. Import DevCycle and initialize it.** Depending on which [type of SDK](/sdk/) and which environment you are initializing for, the SDK Key will be different. Read more about [Environments](/essentials/environments) and [keys](/essentials/keys) in the essentials.

**3. Access your Variable.** Implement the code to evaluate the Variable that is being controlled by the Feature you just created. Read more about Variables [here](/essentials/variables).

All of these steps can be found in the Code Sample section of the Feature page. Just select the relevant Environment and SDK language and it will give you all of the code you need to get the SDK installed and your Variable implemented.

Deeper documentation can be found in the relevant SDK docs. Depending on your use case, DevCycle has various types of SDKs. [Read more about our server-side, mobile, and client-side SDKs here.](/sdk/)

### Adjust Variables and Variations

You can edit the values of the Variables and Variations that were auto-populated after creating your Feature or you can create any other Variations that you would like. Variations are the set of values that will be delivered to the example app and all of the Variables are already connected so you can feel free to edit these in any way.

### Modify Targeting

The way Variables are delivered different values to different users is via Targeting Rules. The Feature creation process will have created some initial Targeting Rules, but you can modify these however you'd like. Just make sure that Targeting is enabled, and you have at least one Targeting Rule targeting "All Users" in the Environment you chose when initializing the SDK. If you would like to try targeting off of user data, you can check out the documentation on [Custom Properties here](/topics/advanced-targeting/custom-properties).

### Toggle Variations

The last step is to toggle between different Variations. Either take one of the initial Targeting Rules that was created or one you just created and switch the Variation that is being served to whatever you would like. Hit save and your application should now reflect the change you just made.

That's it! That's the core functionality of DevCycle in a nutshell. You've just set up and toggled some feature flags running in your own app.
