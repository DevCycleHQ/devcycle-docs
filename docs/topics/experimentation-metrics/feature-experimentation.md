---
title: A/B Testing & Experimentation
sidebar_position: 1
---

:::info
Experimentation relies on custom events.

Experimentation is available to all customers on any plan. However, to perform experiments, events must be sent to DevCycle to calculate metrics. These events are added to your existing plan. To learn more, read about our pricing, or contact us.
:::

##  Overview

At DevCycle we believe that experimentation should be a part of the natural lifecycle of all features. So no matter the [feature type](/essentials/features) selected, can be experimented on. Experiments can be as simple as comparing any target audiences against a metric, or can be fully [randomized](/essentials/targeting#serving-a-random-variation-experimentation--random-distribution) A/B tests using statistical methodologies.

This article outlines why and how to run and analyze experiments on your features within DevCycle. 

## Why Experiment

Experimentation is crucial for testing modifications to your product. You may investigate which changes would result in the best outcomes. It's also known as split testing or A/B testing, or comparative analysis depending on who you ask.

Experimentation can be used to test new features, design changes, marketing campaigns, or anything that could potentially impact how a product or service is used. You may want to experiment on any of these things and more:

- Validate to make sure application performance remains the same or improves.
- Validate in a controlled way whether code changes increase or decrease error rates.
- Confirm that a new feature is driving more conversions or revenue.
- Measure real impacts of features on SLAs and SLOs.

You've likely been doing "Experimentation" without knowing it. Whenever you release a new feature or service, compare the before and after (and during). When combined with Features, DevCycle can give direct metrics on a feature's performance during a release, allowing you to react and make changes accordingly.

Of course, with this in mind, your team isn't restricted to a simple on or off approach. Using DevCycle, a team can have numerous Variations which are released and tested at the same time, giving an even deeper view with more flexibility.

## Using Experimentation

To run an experiment on any feature, all you need is two things:

1. At least two Variations served to your users
2. At least one metric defined and attached to your feature

### Comparing Multiple Variations

The primary concept of an experiment is the need to have at least two different experiences to compare performances. There are several ways in DevCycle to run multiple experiences for users. We go into depth on this in our [Targeting documentation](/essentials/targeting).

To get started with your first feature experiment, it is best to keep it simple and run a basic A/B test comparing two variations, one control and one treatment Variation, delivered randomly to all your users.

To set this up, create a targeting rule in Production that delivers to All Users and serves Variations randomly with percentages set equally at 50% against your first Variation, and 50% against your second Variation.

![Random Distribution 50/50](/feature-experiment-5050.png)

## Adding Metrics to Your Feature

Now that you have two segments receiving different experiences, the only other thing you need to run an experiment is a metric to evaluate the comparative performance of those experiences.

To add a metric to your feature, click “Comparative Analysis” under the “Data & Results” section on the sidebar of the feature editing page. Click the “Choose a Metric” dropdown. This will bring up the option to add a metric that has already been created in the project or to create a new one.

![Add Metrics from Feature Editing Page](/august-2022-add-metric-feature-page.png)

For the creation of new metrics check out our documentation [here](/extras/metrics/creating-and-managing-metrics).

Once you have metrics in your project, all you need to do is:
1. Select a metric you want to use to judge the performance of your experiment
2. Set the Variation that you want to use as your control Variation

![Adding a Metric](/feature-experiment-control-metric.png)

Now that you have a metric added and a control Variation selected, the performance of the experiment will be tracked over time. With the performance of the treatment Variation compared to the control Variation with Difference and Chance of Beating Baseline percentages shown and updated in real-time as the experiment runs.

![Reviewing Metric Performance](/feature-experiment-full.png)

Any number of metrics can be added to a feature for analysis, keep clicking “Choose a Metric” and add pre-existing or create new metrics as needed.

## Determining a Winner

The most important part of an experiment is determining a winner.

The length of time an experiment needs to run to determine a winner varies depending on the overall traffic, the observed conversion rate, and the size of the difference in conversion or values between the Variations. Typically experiments should be run for a minimum of 1-2 weeks to achieve valid statistical significance with a good amount of time to get a proper cross-section of your user base.

Given the time it takes, your team should generally avoid early analysis and create a process by which an experiment runs with no review of results until a pre-determined amount of time has passed.

Once this time has passed, the charts and graphs for any added metrics can be reviewed to determine which Variation performed best. When metrics are created, you define if a decrease or an increase is the targeted improvement. Our results graphs take this into account and show clearly if the metrics have driven either positive or negative results. The charts also provide guidance on if statistical significance has been achieved by providing a Chance of Beating baseline.

Statistical significance has been achieved if this number is either 0% or 100%.

**Positive Results**
![Positive Metric Results](/feature-experiment-positive-results.png)

**Negative Results**
![Negative Metric Results](/feature-experiment-negative-results.png)
