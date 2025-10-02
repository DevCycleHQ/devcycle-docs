---
title: Point-in-time Simulation
sidebar_position: 2
---

The **Point-in-time Simulation** debugging tool lets you simulate what a user's Features and Variables would have been at a certain point in time. Select a day in the past and you can view what they would have gotten on that date!

:::warning
This is only a simulation, the results are not a historical record of what they actually received at the time specified. Features that have rollouts or schedules may not return the proper value at the datetime specified.

To check what users actually received, use the Evaluation Lookup tab.
:::

## Usage

Point-in-time Simulation allows you to test what Features and Variables a user will receive. You can input all the supported user attributes to construct a user, and use it to test if they will receive Features based on the criteria in the targeting rules of your Features!

You can choose what Environment, the SDK type, and the date you want the simulation to run in.

![image of filters](/pit-simulation-filters.png)

Build the user object by adding attributes:

![image of simulate](/pit-simulation-user.png)

You can also use the user fetched after searching with a `user_id` in the Evaluation Lookup tab. You can click `Simulate` and it will open a new tab with all the attributes filled in automatically:

![image of eval lookup user simulate](/pit-simulation-eval-lookup.png)

## Results

The results shown are the Features the user is bucketed into, the Variation the user was served, and the amount of Variables in the Feature. You can also toggle to see the list by variable!

![image of results](/pit-simulation-results.png)

You can click `View Details` to see the Evaluation reasons and the Variables in the Feature as well.

![image of slideover](/pit-simulation-slideover.png)
