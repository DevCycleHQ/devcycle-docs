---
title: Feature Experimentation
sidebar_position: 4
---

##  Overview

At DevCycle we believe that experimentation should be a part of the natural lifecycle of all features. Because of this all features, no matter the [type](/docs/home/feature-management/getting-started/feature-types) selected, can be experimented on. Experiments can be as simple as comparing any target audiences against a metric, or can be fully [randomized](/docs/home/feature-management/features-and-variables/targeting-users#serving-a-random-variation-experimentation--random-distribution) A/B tests using statistical methodologies.

This article outlines how to run and analyze experiments on your features within DevCycle. 

## Starting a Feature Experiment

To run an experiment on any feature all you need is two things:

1. At least two variations being served to your users
2. At least one metric defined and attached to your feature

## Comparing Multiple Variations

The primary concept of an experiment is the need to have at least two different experiences to compare performance against. There are a number of ways in DevCycle to run multiple experiences for users. We go into depth on this in our [Targeting documentation](/docs/home/feature-management/features-and-variables/targeting-users).

To get started with your first feature experiment it is best to keep it simple and run a basic A/B test comparing two variations, one control and one treatment variation delivered randomly to all your users.

To set this up, create a targeting rule in Production that delivers to All Users and serves variations randomly with percentages set equally at 50% against your first Variation  and 50% against your second Variation.

![Random Distribution 50/50](/feature-experiment-5050.png)

## Adding Metrics to Your Feature

Now that you have two segments receiving different experiences the only other thing you need to run an experiment is a metric to evaluate the comparative performance of those experiences.

To add a metric to your feature scroll down to the Experimentation section of the feature page and click the "Attach Metric" button.

This will bring up the option to add a metric that has already been created in the project or to create a new one.

For the creation of new metrics check out our documentation [here](/docs/home/feature-management/features-and-variables/feature-experimentation).

Once you have metrics in your project all you need to do is:
1. Select a metric you want to use to judge the performance of your experiment
2. Set the Variation that you want to use as your control variation

![Adding a Metric](/feature-experiment-control-metric.png)

Now that you have a metric added and a control variation selected the performance of the experiment will be tracked over time. With the performance of the treatment variation compared to the control variation with Difference and Chance of Beating Baseline percentages shown and updated in real-time as the experiment runs.

![Reviewing Metric Performance](/feature-experiment-full.png)

Any number of metrics can be added to a feature for analysis, just keep clicking "Attach Metric" and add pre-existing or create new metrics as needed.

## Determining a Winner

The most important part of an experiment is determining a winner.

The length of time an experiment needs to run to determine a winner varies depending on the overall traffic, the observed conversion rate and the size of the difference in conversion or values between the variations. Typically experiments should be run for a minimum of 1-2 weeks to achieve proper statistical significance with a good amount of time to get a proper cross-section of your user base.

Given the time it takes, generally your team should avoid early analysis and create a process by which an experiment runs with no review of results until a pre-determined amount of time has passed.

Once this time has passed, the charts and graphs for any added metrics can be reviewed to determine which variation performed best. When metrics are created, you define if a decrease or an increase is the targeted improvement. Our results graphs take this into account and show clearly if the metrics have driven either positive or negative results. The charts also provide guidance on if statistical signficance has been achieved by providing a Chance of Beating baseline.

Statistical significance has been achieved if this number is either 0% or 100%.

**Positive Results**
![Positive Metric Results](/feature-experiment-positive-results.png)

**Negative Results**
![Negative Metric Results](/feature-experiment-negative-results.png)