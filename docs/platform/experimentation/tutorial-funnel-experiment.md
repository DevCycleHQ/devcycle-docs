---
title: "Tutorial: Funnel Experiment"

sidebar_position: 5
---

## Funnel Experiment

Funnel experiments are a testing method that involves optimizing how users move through a series of steps toward a specific goal. Typical examples of funnels include onboarding flows or a storefront's product-page-to-checkout flow. In a funnel experiment, we want to A/B test one or multiple steps of the funnel, tracking conversions at each step.

#### Example Sign-Up Funnel

In our example, we'll use the following sign-up flow:
1. Visit landing page
2. Click on "Sign Up"
3. Create an account
4. Complete onboarding

### Creating a Feature Experiment

On DevCycle, create a new Feature using the Experiment Template.

![Image of Feature Experiment Creation](/experimentation-feature-create.png)

### Adding Variables and Variations

Define a set of Variables and Variations that will control your A/B test. Create a Variable for each step of the sign-up flow that you want to modify and A/B test. For example, you may want to try replacing the hero page on your landing page or changing the "Sign Up" button to a "Getting Started" button to see if it leads to better conversions.

![Image of Variables table](/experimentation-variables-table.png)

### Setting up the Targeting Rule

Set the Targeting Rules for your Feature. If you'd like to test the funnel with a specific subset of users, you may want to set up and target [Custom Properties](/platform/feature-flags/targeting/custom-properties). Otherwise, you can leave this at `All Users` and move on to your distribution. Typically, we'll define the distribution to be a 50/50 split between Variations so that we're able to obtain meaningful results and reach statistical significance.

![Image of Targeting Rules](/experimentation-targeting-rule-5050.png)

### Creating and Adding Metrics

Lastly, you may want to add metrics to your Feature in order to track conversions from each step. To do so, head over to the Data & Results tab and, from the Experiment Results section, [create a new Metric](/platform/experimentation/creating-and-managing-metrics) for each step.

![Image of a Metric](/experimentation-metrics-table.png)

That's it! You've completed the setup of your Feature Experiment from the DevCycle dashboard. Once you implement the new Variables and Code Events in code, you're all set.