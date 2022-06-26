---
title: How Metrics are Calculated

sidebar_position: 1
---

# How things are calculated

DevCycle uses two methods to calculate metrics created to evaluate your experiments:

- Z-Score - is used for **binary conversion goals** i.e. button clicks / app sessions goals
- Two-Tailed T-Test - is used for **value optimization goals** where the comparison is the difference between two average values

Both methods test for a 95% confidence level.

---

Below is a brief definition of the calculations used to determine the success of each type of goal when viewing the Metric Results section on a DevCycle Feature:

# Binary Conversion Goals

![https://files.readme.io/a2926c4-Taplytics-3.png](https://files.readme.io/a2926c4-Taplytics-3.png)

![https://files.readme.io/a2926c4-Taplytics-3.png](https://files.readme.io/a2926c4-Taplytics-3.png)

**Conversion Rate** This is a straight calculation of the number of events divided by the selected denominator (ie. unique users or variable evaluations)

**Conversion Rate**This is a straight calculation of the number of conversion events divided by the number of events you've chosen to be the denominator, most commonly this is app session.

**% Change**This is calculated in the following way:

> (Conversion Rate Variation - Conversion Rate Control) / Control Rate
> 

**Chance to beat Control**This number will fluctuate as your experiment accumulates more data.

Once the Chance to beat Control reaches 100% it confirms that the variation has reached a 95% confidence between Control and Variation.

# Value Optimization Goals

![https://files.readme.io/cc4fc5a-Taplytics-4.png](https://files.readme.io/cc4fc5a-Taplytics-4.png)

![https://files.readme.io/cc4fc5a-Taplytics-4.png](https://files.readme.io/cc4fc5a-Taplytics-4.png)

**Event Average**Is the calculated mean of the event average.

**Percentage Change**This number is calculated below:

> (Event Average Variation - Event Average Control) / Event Average Control
> 

**Chance to beat Control** Similar to above - this number will fluctuate as your experiment accumulates more data.

Once the Chance of Beating Baseline reaches 100% it confirms that the variation has reached a 95% confidence between Baseline and Variation.