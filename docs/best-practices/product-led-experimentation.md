---
title: Product-Led Experimentation
sidebar_label: Product-Led Experimentation
sidebar_position: 10
description: How product managers and engineers can collaborate effectively within DevCycle to conduct experiments, optimize software, and enhance user experiences. 
sidebar_custom_props: { icon: material-symbols:experiment }
---

# Product-Led Experimentation in DevCycle 

Experimentation is fundamental to product development, offering engineers and product managers critical insights. In this guide, we'll delve into how product managers and engineers can collaborate effectively within DevCycle to conduct experiments, optimize software, and enhance user experiences. 

We've designed experimentation to be accessible across various roles within your organization. Whether you're a product manager, a designer, or a DevOps engineer, you are able to set up experiments to generate valuable insights into feature performance, UI/UX variations, and infrastructure changes.

### Prerequisites

To complete this guide, you may want to review the following topics:

- [DevCycle Feature Hierarchy](/introduction/core-concepts/feature-hierarchy)
- [Creating and Managing Variations](/essentials/variables)
- [Random Distribution Targeting](/essentials/targeting)
- [Feature Experimentation](/essentials/feature-experimentation)
- [Creating a Metric](/extras/metrics/creating-and-managing-metrics) and [Metric Types](/extras/metrics/creating-and-managing-metrics#types)

## Conducting Experiments: A Collaborative Approach 

In DevCycle, you can run an experiment on anything that your team has wrapped a Variable around. This makes it simple to validate a feature quickly, and iterate at scale.  

## 1. Define the Experiment Structure 

Product managers lead the creation of the experiment structure - detailing hypotheses, describing the variations, and metrics that should be tracked. These structures are documented and communicated to engineering teams through experiment briefs or tickets.

Product managers often spearhead the creation of an experiment brief or structure document that includes a hypothesis, description, the intended target for the experiment, variations, mockups, and metrics you wish to measure. 

- **Hypothesis**: A hypothesis should be specific, measurable, and iterative. The simplest and most effective template for hypotheses is: "By doing [X] to [Y], we expect [Z]." 
- **Description:** Provide a high-level description of the experiment, make sure to note the location of the experiment and any relevant context.
- **Target Audience:** Depending on your experiment, you may want to target all users or an audience defined by a [custom property](/extras/advanced-targeting/custom-properties)
    - For example, you may want to run your experiment only on users in Canada or only those that have a certain subscription tier.
- **Variations:** Decide how many variations you wish to test and what those variations are.
    - For example, will you be testing a red checkout button versus a blue checkout button, or will you be testing a red versus a blue versus a green checkout button?
- **Metrics:**  Determine which metrics to include in your experiment, they should be well-defined and be directly or indirectly impacted by the changes you are making.

This framework provides engineers with clear guidance on what needs to be built.  Experiment briefs should be documented in detail and communicated to engineering teams through tickets or issues in project management tools like JIRA or Linear.

## 2. Technical Setup by Engineering & Product 

Engineers translate experiment structures into code and are often responsible for setting up the specified variations within DevCycle. A discussion between the engineers and product managers at this step is often recommended so that both parties can understand the experiment's goal and the best way to set it up in DevCycle to achieve it. 

### Creating the Feature, Variables, & Variations:

Depending on the complexity of the experiment or Feature, the engineers responsible may want to create multiple Variables. For example, engineers may want a separate flag or Variable that controls the backend logic and a separate Variable(s) that control the frontend elements. See [Feature Hierarchy](/introduction/core-concepts/feature-hierarchy) for more information on how Features and Variables relate to each other. 

![Variable Table](/mar-2024-example-variable-table.png) 

In the example above, the engineers opted to create three separate Variables to control the speed, "wink" functionality, and example text. 

From there, engineers create Variations based on the experiment structure provided by product managers. Variations are different configurations of Variable values and will serve as the different treatments in your experiment. Depending on the experiment you may set these up or leave it to the engineers.

In the example above, the two Variations are the "Base Variation" and "Spin Variation". 

### Events & Metrics Setup

After creating the necessary Variations, select the appropriate Metrics for your experiment. It is best to choose Metrics that directly result from the changes you are making so your data is not influenced by other factors.

For example, if we expect sorting search results to affect page load time significantly, we would create a Metric to track page load time and attach it to our Feature.

To calculate [Metrics](/extras/metrics/creating-and-managing-metrics), DevCycle uses custom events sent via the API or SDKs. Your team may already be passing events to DevCycle, but if not your engineering team may have to implement 
[custom event tracking](/best-practices/engineering-led-experiments#calculating-metrics-by-tracking-events) to capture all of the data you wish to use in your experiment. 

Once you have set up the SDK to send custom events, you can [create Metrics](/extras/metrics/creating-and-managing-metrics#creating-a-metric) on the Metric tab in DevCycle. You define whether a decrease or an increase in values means improvement. Metrics uses this input to clearly show whether the results were positive or negative when you start your experiment. 

![Creating a Metric](/mar-2024-create-metric.gif)

:::info
The **Event Type** in the modal must correspond to the `type` field defined in code. This is not to be confused with the Type selected from the dropdown.
:::

To [apply your Metric to a Feature](/extras/metrics/creating-and-managing-metrics#attaching-metrics-to-features), navigate to the Comparative Analysis section of the Feature page, and select the metric you wish to attach. 

![Attach a Metric](/mar-2024-attach-metric.gif)

If your team wishes to conduct experiment analysis outside of DevCycle, you can export experiment data to an external destination, e.g. [Google Analytics](/integrations/google-analytics-4) or [Snowflake](/integrations/snowflake) . If you want to send data elsewhere, you can also leverage the ["Get All Features"](//sdk/features#getting-all-features) function in an SDK, which will return a map of all of the Features that the user is currently in based on the information the SDK or API has received. 

### QA & Testing

Product managers can still actively participate during the development process, conducting QA checks in each environment. DevCycle's [Self-Targeting feature](/extras/advanced-targeting/self-targeting), allows product managers to serve themselves different Variations of Features safely without altering targeting rules in each environment.

Alternatively, you can turn on the Feature/experiment in pre-prod or prod environments & **only** target internal users so your team can test the end experience for users. 

## 3. Roll-out in Production 

Product managers are often the ones who will manage the final rollout of features and experiments alike once the work is ready to launch in the production environment.

### Setting up a Random Distribution Targeting Rule

Once you are ready to launch, navigate to Feature, and click on the Production environment in the side navigation. 

![Random Distribution](/march-2024-random-distribution-experiment-.gif)

To run an experiment, you simply have to setup a [Random Distribution Targeting rule](/extras/advanced-targeting/random-variations) and decide roll-out strategy or schedule the launch of the experiment. 

## 4. Monitor & Analyze Experiment Results

If you’ve chosen to add Metrics to your experiment, you can monitor experiment results directly on the Feature page without having to collaborate with engineers to interpret metric data and derive insights. 

Experiment data is collected on an experiment's **Insights** section of the Feature page, which displays experiment data in near-real time. 

A typical experiment generally requires a minimum of 1-2 weeks to achieve valid statistical significance with a valid cross-section of your user base. This can vary depending on the overall traffic, the observed conversion rate, and the size of the difference in conversion or values between variations. 

Once the planned time has passed, you can review the graphs created by the Metrics and determine which Variation performed best. 

![Feature Experiment Image](/feature-experiment-full.png)

After you decide which flag variation has the impact you want, you can roll that variation out to 100% of your customers by either [completing the Feature/experiment](/essentials/status-and-lifecycle#completed) or change the experiment targeting rule to serve the winning variation.

## Summary
This guide on Product-Led Experimentation in DevCycle explains how to facilitate collaboration between product managers and engineers to conduct experiments, optimize software, and improve user experiences within the DevCycle. 

Key points covered include:

- **Defining Experiment Structure**: Product managers lead the creation of experiment structures, including hypotheses, variations, and metrics. These are documented and communicated to engineering teams through experiment briefs or tickets.

- **Technical Setup by Engineering & Product**: Engineers translate experiment structures into code, creating variations within DevCycle. Metrics are set up to track the effects of changes made during experiments.

- **Roll-out in Production**: Product managers manage the final rollout of features and experiments in the production environment, setting up targeting rules for experiments.

- **Monitoring & Analyzing Experiment Results**: Experiment data is collected and displayed in near-real-time on the Feature page, allowing for the analysis of results to determine the best-performing variations.

By following the recommendations outlined in this guide, teams can effectively collaborate, conduct experiments, and make data-driven decisions to enhance their product development process.




